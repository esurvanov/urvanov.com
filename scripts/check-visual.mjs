// Визуальное сравнение: скриншоты постов блога (и витрины блоков) из эталонной сборки и из текущей dist/
// на 1280 и 390 px, попиксельная разница (pixelmatch). Анимации и переходы выключены, ждём шрифты и ленивые картинки.
// Картинки разницы — в node_modules/.cache/site-checks/visual (или --out <dir>).
//
//   npm run check:visual -- [--base <dir>] [--dist <dir>] [--only /blog/x/] [--all] [--threshold 0.1] [--out <dir>]
//   --threshold — доля изменённых пикселей в %, выше которой страница считается изменённой (по умолчанию 0.1)
//   --all       — все страницы из sitemap, а не только посты
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'
import { DEFAULT_BASELINE, parseArgs, ms, sitePages, serve, pool, launchChrome, isolatePage, FREEZE_CSS, EXTRA_PAGES, outDir } from './checks-lib.mjs'

const t0 = Date.now()
const args = parseArgs()
const BASE = args.base || DEFAULT_BASELINE
const DIST = args.dist || 'dist'
const ONLY = typeof args.only === 'string' ? args.only : ''
const WIDTHS = String(args.widths || '1280,390').split(',').map(Number)
const THRESHOLD = Number(args.threshold ?? 0.1)
const CONCURRENCY = Number(args.concurrency || 6)
const OUT = outDir(args, 'visual')

for (const d of [BASE, DIST]) if (!existsSync(join(d, 'sitemap.xml'))) {
  console.error(`Нет сборки: ${d}/sitemap.xml`)
  process.exit(2)
}

// Посты: по markdown-копиям, которые prerender кладёт рядом со страницами (blog/<slug>.md, en/blog/<slug>.md)
function postPages(dir) {
  const out = []
  for (const prefix of ['blog', 'en/blog']) {
    const d = join(dir, prefix)
    if (!existsSync(d)) continue
    for (const f of readdirSync(d)) if (f.endsWith('.md')) out.push(`/${prefix}/${f.slice(0, -3)}/`)
  }
  return out
}
let pages = args.all ? sitePages(DIST) : postPages(DIST)
for (const p of EXTRA_PAGES) if (!pages.includes(p) && existsSync(join(DIST, p, 'index.html'))) pages.push(p)
if (ONLY) pages = pages.filter((p) => p.startsWith(ONLY))
pages.sort()

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })

const [srvBase, srvCur] = await Promise.all([serve(BASE), serve(DIST)])
const browser = await launchChrome()

async function shot(origin, path, width) {
  const page = await browser.newPage()
  try {
    await isolatePage(page, origin)
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1, isMobile: width < 600, hasTouch: width < 600 })
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }, { name: 'prefers-color-scheme', value: 'light' }])
    await page.evaluateOnNewDocument((css) => {
      document.addEventListener('DOMContentLoaded', () => { const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s) })
    }, FREEZE_CSS)
    const res = await page.goto(origin + path, { waitUntil: 'load', timeout: 30000 })
    if (!res || res.status() >= 400) return null
    await page.evaluate(() => document.fonts.ready)
    // Окно растягиваем на всю высоту страницы: всё «на экране» сразу — ленивые картинки и виджеты с IntersectionObserver
    // монтируются, а подсветка оглавления не зависит от того, куда успела докрутиться страница (иначе снимки нестабильны)
    let h = 0
    for (let i = 0; i < 3; i++) {
      const sh = await page.evaluate(() => Math.ceil(document.documentElement.scrollHeight))
      if (sh === h) break
      h = sh
      await page.setViewport({ width, height: Math.min(h, 32000), deviceScaleFactor: 1, isMobile: width < 600, hasTouch: width < 600 })
      await new Promise((r) => setTimeout(r, 300))
    }
    await page.evaluate(async () => {
      await Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 3000) })))
    })
    // Тяжёлые виджеты (3D-сцены, интерактивы) догружают модули и данные уже после load — ждём тишины в сети
    await page.waitForNetworkIdle({ idleTime: 500, timeout: 5000 }).catch(() => {})
    await new Promise((r) => setTimeout(r, 600)) // анимации framer-motion идут из JS — даём им закончиться
    return await fullShot(page, width)
  } finally {
    await page.close().catch(() => {})
  }
}

// Снимок всей страницы кусками по 4000 px: на длинных страницах (мобильная ширина, 15–20 тыс. px) Chrome
// одним снимком либо падает («Unable to capture screenshot»), либо повторяет начало страницы внизу
const CHUNK = 4000
// Возвращает { width, height, chunks: [PNG-буферы] } — без декодирования: одинаковые куски дальше сравниваются побайтно
async function fullShot(page, width) {
  const height = await page.evaluate(() => Math.ceil(document.documentElement.scrollHeight))
  const chunks = []
  for (let y = 0; y < height; y += CHUNK) {
    const h = Math.min(CHUNK, height - y)
    chunks.push(Buffer.from(await page.screenshot({ clip: { x: 0, y, width, height: h }, captureBeyondViewport: false, optimizeForSpeed: true })))
  }
  return { width, height, chunks }
}

// Кусок в RGBA размера w×h: недостающее дополняется белым (у страниц разной высоты разница уходит в «добавленную» полосу)
function decodeChunk(buf, w, h) {
  const out = new PNG({ width: w, height: h })
  out.data.fill(255)
  if (!buf) return out
  const part = PNG.sync.read(buf)
  const cw = Math.min(w, part.width), ch = Math.min(h, part.height)
  for (let r = 0; r < ch; r++) part.data.copy(out.data, r * w * 4, r * part.width * 4, (r * part.width + cw) * 4)
  return out
}

// Склейка кусков в одну картинку — только для сохранения на диск
function stitch(parts, w) {
  const out = new PNG({ width: w, height: parts.reduce((s, p) => s + p.height, 0) })
  let y = 0
  for (const p of parts) { p.data.copy(out.data, y * w * 4); y += p.height }
  return out
}

const slug = (p, w) => `${p.replace(/^\/|\/$/g, '').replace(/\//g, '__') || 'home'}@${w}`
const tasks = pages.flatMap((p) => WIDTHS.map((w) => ({ path: p, width: w })))
const results = await pool(tasks, CONCURRENCY, async ({ path, width }) => {
  try {
    const [a, b] = await Promise.all([shot(srvBase.origin, path, width), shot(srvCur.origin, path, width)])
    if (!a || !b) return { path, width, error: !a ? 'нет в эталоне' : 'нет в текущей сборке' }
    const w = width, H = Math.max(a.height, b.height)
    let n = 0
    const parts = { a: [], b: [], d: [] }
    for (let i = 0, y = 0; y < H; i++, y += CHUNK) {
      const h = Math.min(CHUNK, H - y)
      // Совпали байт в байт (и высота та же) — пикселей не считаем, это основной случай и главная экономия времени
      if (a.height === b.height && a.chunks[i] && b.chunks[i] && a.chunks[i].equals(b.chunks[i])) { parts.a.push(null); parts.b.push(null); parts.d.push(null); continue }
      const A = decodeChunk(a.chunks[i], w, h), B = decodeChunk(b.chunks[i], w, h)
      const D = new PNG({ width: w, height: h })
      n += pixelmatch(A.data, B.data, D.data, w, h, { threshold: 0.1, includeAA: false, alpha: 0.3 })
      parts.a.push(A); parts.b.push(B); parts.d.push(D)
    }
    const pct = (n / (w * H)) * 100
    // Картинки сохраняем только для заметных изменений (кодирование PNG высотой 20 тыс. px — секунды на каждую)
    if (pct > THRESHOLD || args.full) {
      const name = slug(path, width)
      const opts = { deflateLevel: 1 }
      const fill = (arr, src) => arr.map((p, i) => p ?? decodeChunk(src.chunks[i], w, Math.min(CHUNK, H - i * CHUNK)))
      writeFileSync(join(OUT, `${name}.base.png`), PNG.sync.write(stitch(fill(parts.a, a), w), opts))
      writeFileSync(join(OUT, `${name}.cur.png`), PNG.sync.write(stitch(fill(parts.b, b), w), opts))
      // в совпавших кусках карты разницы просто эталон — для ориентира
      writeFileSync(join(OUT, `${name}.diff.png`), PNG.sync.write(stitch(fill(parts.d, a), w), opts))
    }
    return { path, width, pct, n, dh: b.height - a.height }
  } catch (e) {
    return { path, width, error: String(e.message || e).slice(0, 200) }
  }
})
await browser.close()
srvBase.close()
srvCur.close()

// ---------- отчёт ----------
const bar = (pct) => '█'.repeat(Math.min(20, Math.ceil(pct / 5))).padEnd(20, '·')
const changed = results.filter((r) => r.error || r.pct > THRESHOLD).sort((x, y) => (y.pct ?? 101) - (x.pct ?? 101))
const minor = results.filter((r) => !r.error && r.pct > 0 && r.pct <= THRESHOLD)
if (changed.length) {
  console.log(`\nИзменились (> ${THRESHOLD}% пикселей):`)
  for (const r of changed) {
    if (r.error) { console.log(`  ✗ ${r.path} @${r.width}: ${r.error}`); continue }
    const dh = r.dh ? `, высота ${r.dh > 0 ? '+' : ''}${r.dh}px` : ''
    console.log(`  ${bar(r.pct)} ${r.pct.toFixed(2).padStart(6)}%  ${r.path} @${r.width}${dh}`)
  }
}
// Шум сглаживания шрифтов даёт тысячные доли процента — показываем только сводку (подробно — --full)
if (minor.length) {
  const max = minor.reduce((m, r) => (r.pct > m.pct ? r : m))
  console.log(`\nМелкие отличия (≤ ${THRESHOLD}%, обычно шум): ${minor.length} снимков, максимум ${max.pct.toFixed(3)}% (${max.path} @${max.width})`)
  if (args.full) for (const r of minor) console.log(`  ${r.pct.toFixed(3)}%  ${r.path} @${r.width}`)
}
console.log(`\ncheck:visual — ${tasks.length} скриншотов-пар (${pages.length} стр. × ${WIDTHS.join('/')} px), время ${ms(t0)}`)
if (changed.length) console.log(`  картинки (base / cur / diff): ${OUT}`)
if (changed.length) {
  console.log(`  ✗ изменилось: ${changed.length}`)
  process.exit(1)
}
console.log('  ✓ визуально без изменений')
