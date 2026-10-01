// Страницы игр из репозитория игр: games/<игра>/docs/page/page.json → src/data/games.generated.json
// и скриншоты → public/games/<slug>/. Текст страницы правится в репозитории игры, здесь его только забирают.
// Папка игр: ./games (в workflow) или GAMES_DIR (локально). Нет папки — остаётся прежний games.generated.json, если он есть.
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, copyFileSync } from 'node:fs'
import { join, basename } from 'node:path'

const GAMES = process.env.GAMES_DIR || 'games'
const OUT = 'src/data/games.generated.json'
if (!existsSync(GAMES)) {
  if (existsSync(OUT)) { console.log(`pull-game-pages: нет папки ${GAMES} — оставлен прежний ${OUT}`); process.exit(0) }
  console.error(`pull-game-pages: нет папки ${GAMES} и нет ${OUT}. Укажите GAMES_DIR=путь/к/awesome-games`)
  process.exit(1)
}

const REQUIRED = ['slug', 'play', 'repoDir', 'name', 'tagline', 'genre', 'description', 'intro', 'features', 'controls', 'facts', 'faq', 'shots', 'related', 'keywords']
const pages = []
for (const dir of readdirSync(GAMES).sort()) {
  const f = join(GAMES, dir, 'docs', 'page', 'page.json')
  if (!existsSync(f)) continue
  const g = JSON.parse(readFileSync(f, 'utf8'))
  const missing = REQUIRED.filter((k) => !(k in g))
  if (missing.length) { console.error(`pull-game-pages: ${f}: нет полей ${missing.join(', ')}`); process.exit(1) }
  if (g.repoDir !== dir) { console.error(`pull-game-pages: ${f}: repoDir «${g.repoDir}» ≠ папке «${dir}»`); process.exit(1) }
  // статья об архитектуре лежит рядом (docs/architecture/post.json): страница игры ссылается на неё в блоге
  const postFile = join(GAMES, dir, 'docs', 'architecture', 'post.json')
  if (existsSync(postFile)) {
    const post = JSON.parse(readFileSync(postFile, 'utf8'))
    g.architecture = { slug: post.slug, path: `${dir}/docs/architecture` }
  }
  const dest = join('public', 'games', g.slug)
  mkdirSync(dest, { recursive: true })
  g.shots = g.shots.map((s) => {
    const src = join(GAMES, dir, s.file)
    if (!existsSync(src)) { console.error(`pull-game-pages: ${f}: нет файла ${s.file}`); process.exit(1) }
    copyFileSync(src, join(dest, basename(s.file)))
    return { ...s, file: basename(s.file) }
  })
  pages.push(g)
}
if (!pages.length) { console.error(`pull-game-pages: в ${GAMES} нет ни одного docs/page/page.json`); process.exit(1) }
writeFileSync(OUT, JSON.stringify(pages, null, 2) + '\n')
console.log(`pull-game-pages: ${pages.length} страниц (${pages.map((p) => p.slug).join(', ')}) → ${OUT}`)
