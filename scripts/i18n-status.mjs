// Покрытие переводов на новые языки (th, ka, vi, es, fr): сколько единиц каждого модуля готово, какие ключи не переведены.
//   node scripts/i18n-status.mjs                  — сводка по всем языкам
//   node scripts/i18n-status.mjs es               — сводка по одному языку
//   node scripts/i18n-status.mjs es glossary      — недостающие ключи модуля (id.путь), по одному в строке
//   node scripts/i18n-status.mjs es glossary codex — недостающие ключи одной единицы
//   node scripts/i18n-status.mjs es ui | seo | posts — строки интерфейса / разделы / посты без перевода
// Данные берутся из тех же модулей, что у сайта: скрипт собирает серверную сборку в node_modules/.i18n-status (≈20 с).
import { execSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const OUT = 'node_modules/.i18n-status'
execSync(`npx vite build --ssr src/entry-server.tsx --outDir ${OUT} --logLevel error`, { stdio: ['ignore', 'ignore', 'inherit'] })
const { i18nStatus, I18N_PROBLEMS, NEW_LANGS } = await import(pathToFileURL(join(process.cwd(), OUT, 'entry-server.js')).href + `?t=${Date.now()}`)

const [lang, mod, unit] = process.argv.slice(2)
if (lang && !NEW_LANGS.includes(lang)) { console.error(`язык: один из ${NEW_LANGS.join(', ')}`); process.exit(1) }

// Разделы, у которых есть заголовок и описание в seo.json (страницы-разделы и хаб /ai); /materials/blocks и доклад — только ru/en
const SEO_PATHS = ['/', '/about', '/blog', '/links', '/materials', '/materials/presentations', '/materials/games', '/materials/interactive', '/materials/glossary', '/ai']

// Строки интерфейса: английский текст в t({ ru, en }), ui(lang, '…') и заголовки с titleEn/longEn. Шаблоны с ${…} не ключуются — их не считаем
const SRC = ['src/components', 'src/components/site', 'src/lib', 'src/data', 'src/data/blocks']
function uiStrings() {
  const out = new Set()
  const str = String.raw`'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|` + '`([^`$]*)`'
  const res = [
    new RegExp(String.raw`t\(\{\s*ru:\s*(?:${str}),\s*en:\s*(?:${str})\s*\}\)`, 'g'),
    new RegExp(String.raw`\bui\(\s*\w+,\s*(?:${str})\s*\)`, 'g'),
    new RegExp(String.raw`\b(?:titleEn|longEn):\s*(?:${str})`, 'g'),
    // plural(n, lang, [ru…], ['term', 'terms']): обе английские формы
    new RegExp(String.raw`\[(?:${str}),\s*(?:${str})\]\)`, 'g'),
  ]
  for (const dir of SRC) {
    for (const f of readdirSync(dir)) {
      if (!/\.(tsx?|mjs)$/.test(f) || f === 'glossary.ts' || f === 'termArt.ts') continue
      const s = readFileSync(join(dir, f), 'utf8')
      for (const re of res) for (const m of s.matchAll(re)) {
        const found = m.slice(1).filter((x) => x !== undefined)
        // у plural — обе формы, у остальных — последняя строка (английская)
        for (const en of re === res[3] ? found : found.slice(-1)) if (en && /[A-Za-z]/.test(en)) out.add(en.replace(/\\'/g, "'"))
      }
    }
  }
  // Названия разделов в хлебных крошках разметки (scripts/prerender.mjs, CRUMBS.en)
  const crumbs = /en: \{ home: [^}]*\}/.exec(readFileSync('scripts/prerender.mjs', 'utf8'))
  for (const m of crumbs?.[0].matchAll(/'([^']+)'/g) ?? []) out.add(m[1])
  return [...out].sort()
}

// Посты: content/blog/<slug>.md — русский оригинал; перевод — <slug>.<язык>.md
const posts = readdirSync('content/blog').filter((f) => /^[^.]+\.md$/.test(f)).map((f) => f.replace(/\.md$/, ''))
const postDone = (l) => posts.filter((s) => existsSync(`content/blog/${s}.${l}.md`))

const status = i18nStatus()
const strings = uiStrings()
const uiFile = (l) => (existsSync(`src/i18n/${l}/ui.json`) ? JSON.parse(readFileSync(`src/i18n/${l}/ui.json`, 'utf8')) : {})

if (lang && mod) {
  const s = status.find((x) => x.lang === lang)
  let list
  if (mod === 'ui') {
    const have = uiFile(lang)
    list = strings.filter((x) => !(x in have))
    const stale = Object.keys(have).filter((k) => !strings.includes(k))
    if (stale.length) console.error(`# ${stale.length} ключей ui.json не найдено в исходниках (английский текст сменился или строка собрана из шаблона):\n${stale.map((k) => `#   ${k}`).join('\n')}`)
  } else if (mod === 'seo') list = SEO_PATHS.filter((p) => !s.seo.includes(p))
  else if (mod === 'posts') list = posts.filter((p) => !postDone(lang).includes(p))
  else if (s.modules[mod]) list = s.modules[mod].missing.filter((k) => !unit || k.startsWith(unit + '.'))
  else { console.error(`модуль: ui, seo, posts, ${Object.keys(s.modules).join(', ')}`); process.exit(1) }
  console.log(list.join('\n'))
  process.exit(0)
}

const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : '—')
for (const s of status.filter((x) => !lang || x.lang === lang)) {
  const have = uiFile(s.lang)
  const uiDone = strings.filter((x) => x in have).length
  console.log(`\n${s.lang}`)
  console.log(`  ui           ${String(uiDone).padStart(4)} / ${String(strings.length).padEnd(4)} ${pct(uiDone, strings.length)}  строк интерфейса`)
  console.log(`  seo          ${String(s.seo.filter((p) => SEO_PATHS.includes(p)).length).padStart(4)} / ${String(SEO_PATHS.length).padEnd(4)} разделов с title и description`)
  console.log(`  posts        ${String(postDone(s.lang).length).padStart(4)} / ${String(posts.length).padEnd(4)} ${pct(postDone(s.lang).length, posts.length)}`)
  for (const [name, m] of Object.entries(s.modules)) {
    const left = m.missing.length
    console.log(name === 'links'
      ? `  ${name.padEnd(12)} ${left ? `не хватает ${left} ключей` : 'готов'}`
      : `  ${name.padEnd(12)} ${String(m.ready.length).padStart(4)} / ${String(m.units).padEnd(4)} ${pct(m.ready.length, m.units)}  ${left ? `(не хватает ${left} ключей)` : ''}`)
  }
}
if (I18N_PROBLEMS.length) {
  console.log(`\nОшибки в файлах переводов (${I18N_PROBLEMS.length}):`)
  for (const p of I18N_PROBLEMS) console.log(`  ${p}`)
  process.exitCode = 1
}
