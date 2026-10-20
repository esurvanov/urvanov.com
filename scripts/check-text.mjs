// Проверка «для поисковиков ничего не поменялось»: сравнивает dist/ с эталонной сборкой постранично.
// Сравнивает title, description, canonical, hreflang, robots, прочие meta, JSON-LD (по структуре),
// заголовки h1–h4, видимый текст <main>, alt/aria-label картинок, внутренние ссылки,
// а также sitemap.xml (набор URL), robots.txt, llms*.txt, rss.xml (набор записей) и markdown-копии постов.
// Даты изменения (git-даты: lastmod, dateModified, article:modified_time) по умолчанию не сравниваются — флаг --dates.
//
//   npm run check:text -- [--base <dir>] [--dist <dir>] [--only /blog/] [--dates] [--full]
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'
import { parse } from 'node-html-parser'
import { DEFAULT_BASELINE, parseArgs, ms } from './checks-lib.mjs'

const t0 = Date.now()
const args = parseArgs()
const BASE = args.base || DEFAULT_BASELINE
const DIST = args.dist || 'dist'
const ONLY = typeof args.only === 'string' ? args.only : ''
const DATES = Boolean(args.dates)
const FULL = Boolean(args.full) // показывать все расхождения, а не первые несколько
const MAX_HUNKS = FULL ? Infinity : 3
const SITE = 'https://www.urvanov.com'

if (!existsSync(BASE)) {
  console.error(`Нет эталонной сборки: ${BASE} (укажите --base <dir> или BASELINE_DIST)`)
  process.exit(2)
}

const isDateKey = (k) => !DATES && /modified|lastmod|lastBuildDate/i.test(k)

// ---------- сравнение последовательностей ----------

// Построчный diff (LCS) с обрезкой общего начала и конца; возвращает куски { del: [...], add: [...], at }
function diffSeq(a, b) {
  let s = 0
  while (s < a.length && s < b.length && a[s] === b[s]) s++
  let ea = a.length, eb = b.length
  while (ea > s && eb > s && a[ea - 1] === b[eb - 1]) { ea--; eb-- }
  const A = a.slice(s, ea), B = b.slice(s, eb)
  if (!A.length && !B.length) return []
  const n = A.length, m = B.length
  // Слишком большой хвост — без DP, одним куском
  if (n * m > 4e6) return [{ at: s, del: A, add: B }]
  const L = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1))
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = A[i] === B[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1])
  const hunks = []
  let cur = null, i = 0, j = 0
  const flush = () => { if (cur) hunks.push(cur); cur = null }
  while (i < n || j < m) {
    if (i < n && j < m && A[i] === B[j]) { flush(); i++; j++ }
    else if (j < m && (i === n || L[i][j + 1] >= L[i + 1][j])) { (cur ??= { at: s + i, del: [], add: [] }).add.push(B[j++]) }
    else { (cur ??= { at: s + i, del: [], add: [] }).del.push(A[i++]) }
  }
  flush()
  return hunks
}

const clip = (s, n = 160) => (s.length > n ? s.slice(0, n - 1) + '…' : s)

// Внутри пары предложений показываем только отличающуюся середину с небольшим контекстом
function inlineDiff(x, y) {
  let s = 0
  while (s < x.length && s < y.length && x[s] === y[s]) s++
  let ex = x.length, ey = y.length
  while (ex > s && ey > s && x[ex - 1] === y[ey - 1]) { ex--; ey-- }
  const pre = s > 40 ? '…' + x.slice(s - 40, s) : x.slice(0, s)
  const post = (z, e) => (z.length - e > 40 ? z.slice(e, e + 40) + '…' : z.slice(e))
  return [`${pre}[${clip(x.slice(s, ex), 200)}]${post(x, ex)}`, `${pre}[${clip(y.slice(s, ey), 200)}]${post(y, ey)}`]
}

function describeHunks(hunks) {
  const out = []
  for (const h of hunks.slice(0, MAX_HUNKS)) {
    if (h.del.length === 1 && h.add.length === 1) {
      const [d, a] = inlineDiff(h.del[0], h.add[0])
      out.push(`      − ${d}`, `      + ${a}`)
    } else {
      for (const d of h.del.slice(0, 3)) out.push(`      − ${clip(d)}`)
      if (h.del.length > 3) out.push(`      − … ещё ${h.del.length - 3}`)
      for (const a of h.add.slice(0, 3)) out.push(`      + ${clip(a)}`)
      if (h.add.length > 3) out.push(`      + … ещё ${h.add.length - 3}`)
    }
  }
  if (hunks.length > MAX_HUNKS) out.push(`      … ещё ${hunks.length - MAX_HUNKS} мест(а) (--full)`)
  return out
}

// Множества: что пропало, что появилось
function diffSet(a, b) {
  const A = new Set(a), B = new Set(b)
  return { del: [...A].filter((x) => !B.has(x)), add: [...B].filter((x) => !A.has(x)) }
}
function describeSet({ del, add }) {
  const out = []
  const lim = FULL ? Infinity : 5
  for (const d of del.slice(0, lim)) out.push(`      − ${clip(d)}`)
  if (del.length > lim) out.push(`      − … ещё ${del.length - lim}`)
  for (const a of add.slice(0, lim)) out.push(`      + ${clip(a)}`)
  if (add.length > lim) out.push(`      + … ещё ${add.length - lim}`)
  return out
}

// Структурное сравнение JSON: список путей, где значения отличаются
function diffJson(a, b, path = '$', out = []) {
  if (out.length > 50) return out
  const ta = Array.isArray(a) ? 'array' : typeof a, tb = Array.isArray(b) ? 'array' : typeof b
  if (ta !== tb || a === null || b === null || ta !== 'object' && ta !== 'array') {
    if (a !== b) out.push(`${path}: ${clip(JSON.stringify(a) ?? '∅', 80)} → ${clip(JSON.stringify(b) ?? '∅', 80)}`)
    return out
  }
  if (ta === 'array') {
    for (let i = 0; i < Math.max(a.length, b.length); i++) diffJson(a[i], b[i], `${path}[${i}]`, out)
    return out
  }
  for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
    if (isDateKey(k)) continue
    diffJson(a[k], b[k], `${path}.${k}`, out)
  }
  return out
}

// ---------- извлечение из HTML ----------

const norm = (s) => s.replace(/\s+/g, ' ').trim()
const BLOCK = new Set('address article aside blockquote br dd details div dl dt fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hr li main nav ol p pre section summary table tbody td tfoot th thead tr ul button'.split(' '))
const SKIP = new Set(['script', 'style', 'noscript', 'template'])

// Видимый текст: блочные элементы разделяются переводом строки, строчные — склеиваются как в браузере
function visibleText(node) {
  const parts = []
  const walk = (n) => {
    if (n.nodeType === 3) { parts.push(n.rawText); return }
    if (n.nodeType !== 1) return
    const tag = n.rawTagName?.toLowerCase()
    if (SKIP.has(tag) || n.getAttribute?.('hidden') !== undefined) return
    const block = BLOCK.has(tag)
    if (block) parts.push('\n')
    for (const c of n.childNodes) walk(c)
    if (block) parts.push('\n')
  }
  walk(node)
  return decode(parts.join(''))
    .split('\n').map(norm).filter(Boolean)
}

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', mdash: '—', ndash: '–', laquo: '«', raquo: '»', hellip: '…', copy: '©', rarr: '→', larr: '←', times: '×', middot: '·', thinsp: ' ' }
function decode(s) {
  return s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10))
    return ENT[e.toLowerCase()] ?? m
  }).replace(/ /g, ' ')
}

// Предложения — удобная единица для diff: правка в одном месте не тянет за собой абзац целиком
const sentences = (lines) => lines.flatMap((l) => l.split(/(?<=[.!?…])\s+(?=[A-ZА-ЯЁ«"(\d])/u))

function extract(html) {
  const root = parse(html, { comment: false, blockTextElements: { script: true, style: true, noscript: true, pre: true } })
  const head = root.querySelector('head')
  const attr = (sel, a) => head?.querySelector(sel)?.getAttribute(a) ?? null
  const meta = []
  for (const m of head?.querySelectorAll('meta') ?? []) {
    const key = m.getAttribute('name') || m.getAttribute('property') || m.getAttribute('http-equiv')
    if (!key || /^(description|robots|viewport)$/.test(key) || isDateKey(key)) continue
    meta.push(`${key} = ${decode(m.getAttribute('content') ?? '')}`)
  }
  const jsonld = []
  for (const s of root.querySelectorAll('script[type="application/ld+json"]')) {
    try { jsonld.push(JSON.parse(s.text)) } catch { jsonld.push({ __invalid: s.text.slice(0, 200) }) }
  }
  const main = root.querySelector('main') || root.querySelector('#root') || root.querySelector('body') || root
  const body = root.querySelector('body') || root
  const internal = (h) => h && (h.startsWith('/') && !h.startsWith('//') || h.startsWith(SITE) || h.startsWith('#'))
  return {
    title: decode(head?.querySelector('title')?.text ?? ''),
    description: decode(attr('meta[name="description"]', 'content') ?? ''),
    canonical: attr('link[rel="canonical"]', 'href') ?? '',
    robots: attr('meta[name="robots"]', 'content') ?? '',
    hreflang: (head?.querySelectorAll('link[rel="alternate"][hreflang]') ?? []).map((l) => `${l.getAttribute('hreflang')} → ${l.getAttribute('href')}`).sort(),
    meta: meta.sort(),
    jsonld,
    headings: body.querySelectorAll('h1, h2, h3, h4').map((h) => `${h.rawTagName.toLowerCase()}: ${norm(decode(h.text))}`),
    // Блоки склеиваем пробелом: замена div на span и обратно не должна давать ложных отличий по строкам
    text: sentences([visibleText(main).join(' ')]),
    alts: [
      ...body.querySelectorAll('img').map((i) => `img: ${decode(i.getAttribute('alt') ?? '∅')}`),
      ...body.querySelectorAll('[role="img"][aria-label]').map((i) => `role=img: ${decode(i.getAttribute('aria-label'))}`),
    ],
    links: [...new Set(body.querySelectorAll('a[href]').map((a) => decode(a.getAttribute('href'))).filter(internal))].sort(),
  }
}

// Текст без HTML-разметки — для markdown-копий, llms*.txt и RSS (там лежит HTML блоков постов)
const textLines = (x) => decode(x.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ').replace(/<\/?(p|div|li|h\d|pre|tr|table|ul|ol|section|blockquote|br|figure|figcaption|summary|details)\b[^>]*>/gi, '\n').replace(/<[^>]+>/g, ''))
  .split('\n').map(norm).filter(Boolean)

// ---------- обход файлов ----------

function walk(dir, base = dir, out = []) {
  if (!existsSync(dir)) return out
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'assets' && dir === base) continue
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p, base, out)
    else if (/\.(html|md|txt|xml)$/.test(e.name)) out.push(relative(base, p))
  }
  return out
}
const urlOf = (rel) => '/' + rel.replace(/(^|\/)index\.html$/, '$1')

const filesA = walk(BASE), filesB = walk(DIST)
const all = [...new Set([...filesA, ...filesB])].filter((f) => urlOf(f).startsWith(ONLY)).sort()
const setA = new Set(filesA), setB = new Set(filesB)

const report = [] // { file, lines }
const markupOnly = [] // .md/.txt, где поменялась только разметка
const add = (file, lines) => lines.length && report.push({ file, lines })
const read = (dir, f) => readFileSync(join(dir, f), 'utf8')

const FIELDS = {
  title: 'title', description: 'meta description', canonical: 'canonical', robots: 'robots',
  hreflang: 'hreflang', meta: 'прочие meta', headings: 'заголовки h1–h4', text: 'текст <main>', alts: 'alt / aria-label', links: 'внутренние ссылки',
}

let pagesCompared = 0
for (const f of all) {
  if (!setA.has(f)) { add(f, ['  + новый файл (нет в эталоне)']); continue }
  if (!setB.has(f)) { add(f, ['  − файл пропал (есть только в эталоне)']); continue }
  const a = read(BASE, f), b = read(DIST, f)
  if (a === b) { if (f.endsWith('.html')) pagesCompared++; continue }
  const lines = []

  if (f.endsWith('.html')) {
    pagesCompared++
    const A = extract(a), B = extract(b)
    for (const k of ['title', 'description', 'canonical', 'robots']) {
      if (A[k] !== B[k]) lines.push(`  ${FIELDS[k]}:`, ...describeHunks([{ del: [A[k]], add: [B[k]] }]))
    }
    for (const k of ['hreflang', 'meta', 'links']) {
      const d = diffSet(A[k], B[k])
      if (d.del.length || d.add.length) lines.push(`  ${FIELDS[k]}:`, ...describeSet(d))
    }
    const j = diffJson(A.jsonld, B.jsonld)
    if (j.length) lines.push('  JSON-LD:', ...j.slice(0, FULL ? Infinity : 5).map((x) => `      ${x}`), ...(j.length > 5 && !FULL ? [`      … ещё ${j.length - 5}`] : []))
    for (const k of ['headings', 'alts', 'text']) {
      const h = diffSeq(A[k], B[k])
      if (!h.length) continue
      // Отличие только в пробелах между словами (например, «Шаг 2» → «Шаг2» из-за смены разметки) — предупреждение
      const squash = (x) => x.join('').replace(/\s+/g, '')
      if (squash(A[k]) === squash(B[k])) markupOnly.push(`${urlOf(f)} (${FIELDS[k]}: только пробелы)`)
      else lines.push(`  ${FIELDS[k]}:`, ...describeHunks(h))
    }
  } else if (f === 'sitemap.xml') {
    const urls = (x) => [...x.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => {
      const loc = m[1].match(/<loc>([^<]+)/)?.[1]
      const alts = [...m[1].matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map((r) => `${r[1]}=${r[2]}`).sort().join(' ')
      const lastmod = DATES ? ' ' + (m[1].match(/<lastmod>([^<]+)/)?.[1] ?? '') : ''
      return { loc, full: `${loc}${lastmod} [${alts}]` }
    })
    const A = urls(a), B = urls(b)
    const d = diffSet(A.map((u) => u.loc), B.map((u) => u.loc))
    if (d.del.length || d.add.length) lines.push(`  набор URL (было ${A.length}, стало ${B.length}):`, ...describeSet(d))
    const d2 = diffSet(A.map((u) => u.full), B.map((u) => u.full))
    const changed = d2.add.filter((x) => !d.add.some((u) => x.startsWith(u + ' ') || x.startsWith(u + '[')))
    if (changed.length) lines.push('  hreflang/даты у URL:', ...changed.slice(0, 5).map((x) => `      ~ ${clip(x)}`))
  } else if (f.endsWith('rss.xml')) {
    // Записи по ссылке: пропавшие/новые целиком, изменённые — только отличающийся фрагмент
    const items = (x) => new Map([...x.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => [m[1].match(/<link>([^<]+)/)?.[1] ?? m[1], norm(m[1])]))
    const A = items(a), B = items(b)
    const d = diffSet([...A.keys()], [...B.keys()])
    if (d.del.length || d.add.length) lines.push('  набор записей RSS:', ...describeSet(d))
    // Текст записи сравниваем без разметки (RSS экранирует HTML поста — сначала раскодируем)
    const txt = (v) => textLines(decode(v)).join(' ')
    const changed = [...A.keys()].filter((k) => B.has(k) && txt(A.get(k)) !== txt(B.get(k)))
    if (changed.length) lines.push('  изменённые записи RSS:', ...describeHunks(changed.flatMap((k) => diffSeq(textLines(decode(A.get(k))), textLines(decode(B.get(k)))))))
    else if ([...A.keys()].some((k) => B.has(k) && A.get(k) !== B.get(k))) markupOnly.push(f)
  } else if (f.endsWith('.xml')) {
    const h = diffSeq(a.split('\n'), b.split('\n'))
    if (h.length) lines.push('  содержимое:', ...describeHunks(h))
  } else {
    // .md / .txt: сравниваем текст без HTML-разметки (в markdown-копиях постов лежит HTML блоков).
    // Если текст тот же, а поменялась только разметка — это предупреждение, а не ошибка.
    const h = diffSeq(textLines(a), textLines(b))
    if (h.length) lines.push('  текст:', ...describeHunks(h))
    else markupOnly.push(f)
  }
  add(f, lines)
}

// ---------- отчёт ----------
const label = (f) => (f.endsWith('.html') ? urlOf(f) : f)
for (const { file, lines } of report) {
  console.log(`\n● ${label(file)}`)
  for (const l of lines) console.log(l)
}
if (markupOnly.length) console.log(`\n⚠ только разметка/пробелы, текст тот же (не ошибка): ${markupOnly.join(', ')}`)
const htmlDiff = report.filter((r) => r.file.endsWith('.html')).length
console.log(`\ncheck:text — эталон ${BASE}\n  страниц сравнено: ${pagesCompared}, с отличиями: ${htmlDiff}; прочих файлов с отличиями: ${report.length - htmlDiff}; время ${ms(t0)}`)
if (report.length) {
  console.log('  ✗ есть отличия от эталона')
  process.exit(1)
}
console.log('  ✓ отличий нет')
