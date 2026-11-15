// Проверка длины заголовка и описания страниц в dist/: Google обрезает заголовок около 60 знаков, описание около 155.
// Правила: <title> до 60 знаков, meta description от 70 до 160. Страницы с noindex и редиректы не проверяются.
// Старые нарушения записаны в scripts/seo-length-baseline.json: они не валят проверку, а новые — валят.
// Нарушение пропало из страницы — запись из базы надо убрать (проверка скажет об этом и тоже упадёт), так база только сокращается.
//
//   npm run check:seo [-- --dist dist] [--update]   # --update переписывает базу по текущей сборке
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'node-html-parser'

const args = process.argv.slice(2)
const DIST = args.includes('--dist') ? args[args.indexOf('--dist') + 1] : 'dist'
const UPDATE = args.includes('--update')
const BASELINE = 'scripts/seo-length-baseline.json'
const TITLE_MAX = 60
const DESC_MIN = 70
const DESC_MAX = 160
const len = (s) => [...s].length

function* pagesOf(dir, rel = '') {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) {
      // игры, мастерская методов и ассеты копируются в dist отдельно и своих правил не имеют
      if (rel === '' && /^(assets|games|methods-lab|berezovka|sibiria|severny-razlom|skhodka|zhitie|work-programmer|malenkie-bombery|age-of-empires|ekho-razloma|decks|embed|blog-media|og|models)$/.test(name)) continue
      yield* pagesOf(full, `${rel}/${name}`)
    } else if (name === 'index.html') yield { path: rel || '/', file: full }
  }
}

const found = {}
for (const { path, file } of pagesOf(DIST)) {
  // Страницы игр собираются из репозитория игр (games.lock), их тексты здесь не правятся
  if (/\/materials\/games\//.test(path)) continue
  const root = parse(readFileSync(file, 'utf8'))
  if (/noindex/i.test(root.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '')) continue
  if (root.querySelector('meta[http-equiv="refresh"]')) continue
  const title = (root.querySelector('title')?.text ?? '').trim()
  const desc = (root.querySelector('meta[name="description"]')?.getAttribute('content') ?? '').trim()
  const bad = []
  if (len(title) > TITLE_MAX) bad.push(`title ${len(title)}`)
  if (len(desc) > DESC_MAX) bad.push(`description ${len(desc)}`)
  else if (len(desc) < DESC_MIN) bad.push(`description ${len(desc)} (меньше ${DESC_MIN})`)
  if (bad.length) found[path] = bad.map((b) => b.split(' ')[0])
}

if (UPDATE) {
  writeFileSync(BASELINE, JSON.stringify(Object.fromEntries(Object.entries(found).sort()), null, 1) + '\n')
  console.log(`check-seo-length: база обновлена, нарушений ${Object.keys(found).length}`)
  process.exit(0)
}

const base = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')) : {}
const fresh = Object.entries(found).filter(([p, kinds]) => kinds.some((k) => !(base[p] ?? []).includes(k)))
const gone = Object.entries(base).filter(([p, kinds]) => kinds.some((k) => !(found[p] ?? []).includes(k)))
for (const [p, kinds] of fresh) console.error(`новое нарушение: ${p} — ${kinds.join(', ')}`)
for (const [p] of gone) console.error(`исправлено, уберите из базы: ${p}`)
console.log(`check-seo-length: нарушений ${Object.keys(found).length} (в базе ${Object.keys(base).length}), новых ${fresh.length}, исправленных ${gone.length}`)
if (fresh.length || gone.length) {
  if (gone.length) console.error('Запустите: npm run check:seo -- --update')
  process.exit(1)
}
