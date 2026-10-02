// Статьи из репозитория игр. Текст и схемы лежат рядом с игрой: games/<игра>/docs/<папка>/post.json
// (+ markdown на двух языках и diagrams/<язык>/*.svg). При каждой сборке они превращаются в посты блога:
// content/blog/<slug>.md и <slug>.en.md. Файлы генерируются и не коммитятся (см. .gitignore).
// Папка игр: ./games (в workflow) или GAMES_DIR (локально). Нет папки — шаг пропускается.
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'

const GAMES = process.env.GAMES_DIR || 'games'
if (!existsSync(GAMES)) { console.log(`pull-game-posts: нет папки ${GAMES} — статьи из репозитория игр пропущены`); process.exit(0) }

const found = []
for (const game of readdirSync(GAMES)) {
  const docs = join(GAMES, game, 'docs')
  if (!existsSync(docs) || !statSync(docs).isDirectory()) continue
  for (const d of readdirSync(docs)) { const f = join(docs, d, 'post.json'); if (existsSync(f)) found.push(f) }
}

const inlineSvg = (dir, file, caption, alt) => {
  const svg = readFileSync(join(dir, file), 'utf8').replace(/<\?xml[^>]*\?>/, '').replace(/>\s+</g, '><').replace(/\n\s*/g, '').trim()
  // всё в одну строку: markdown не должен разрывать HTML-блок пустой строкой
  return `<figure class="arch">${svg}<figcaption>${(caption || alt).replace(/&/g, '&amp;').replace(/</g, '&lt;')}</figcaption></figure>`
}

const REPO = 'https://github.com/esurvanov/awesome-games/tree/main/'
// Соседняя страница игры (docs/page/page.json) — чтобы статья вела на неё; нет страницы — блока нет.
// Блок оформлен как «Дальше по теме» в других постах блога: главная карточка и три карточки-ссылки (стили .arch-next в site.css)
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
const PLAY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9.5v5l4.5-2.5z"/></svg>'
function gameLinks(dir, lang) {
  const pageFile = join(dir, '..', 'page', 'page.json')
  if (!existsSync(pageFile)) return ''
  const g = JSON.parse(readFileSync(pageFile, 'utf8')), en = lang === 'en'
  const pre = en ? '/en' : ''
  const T = en
    ? { h: 'About the game', k: 'Game page', cards: [['Game', 'Play in the browser', 'no install, no sign-up', g.play], ['Repository', 'Source code', 'this article and the diagrams live next to the game', `${REPO}${g.repoDir}/docs/architecture`], ['More', 'All games', 'pages of the other games', `${pre}/materials/games/`]] }
    : { h: 'Об игре', k: 'Страница игры', cards: [['Игра', 'Играть в браузере', 'без установки и регистрации', g.play], ['Репозиторий', 'Исходники', 'статья и схемы лежат рядом с игрой', `${REPO}${g.repoDir}/docs/architecture`], ['Ещё', 'Все игры', 'страницы остальных игр', `${pre}/materials/games/`]] }
  const cards = T.cards.map(([k, t, d, href]) => `<a href="${href}"><div class="k">${k}</div><div class="t">${t}</div><div class="d">${d}</div></a>`).join('')
  const cta = `<a class="ev-cta" href="${pre}/materials/games/${g.slug}/"><span class="ev-ci">${PLAY}</span><span class="ev-ct"><small>${T.k}</small><b>${g.name[lang]}</b><span>${g.tagline[lang]}</span></span><span class="ev-ca">${ARROW}</span></a>`
  return `\n\n<section class="arch-next"><h2>${T.h}</h2>${cta}<div class="links three">${cards}</div></section>\n`
}

for (const file of found) {
  const dir = dirname(file), post = JSON.parse(readFileSync(file, 'utf8'))
  for (const lang of ['ru', 'en']) {
    const m = post[lang]; if (!m) continue
    let body = readFileSync(join(dir, m.file), 'utf8').replace(/^# .*\n+/, '')          // заголовок задаёт шапка поста
    for (const t of m.toc || []) body = body.replace(new RegExp(`^## ${t.heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[ \\t]*$`, 'm'), `<h2 id="${t.id}">${t.heading}</h2>`)  // [ \t], не \s: пустая строка после заголовка нужна, иначе markdown под ним не разбирается
    body = body.replace(/!\[([^\]]*)\]\(([^)\s]+\.svg)(?:\s+"([^"]*)")?\)/g, (_, alt, src, cap) => inlineSvg(dir, src, cap, alt))
    const head = ['---', `title: ${m.title}`, `date: ${post.date}`, `description: ${m.description}`, `tags: ${m.tags}`, `category: ${post.category || 'architecture'}`, `layout: ${post.layout || 'wide'}`,
      `mentions: ${post.mentions || ''}`, `toc: ${(m.toc || []).map((t) => `${t.id}=${t.label}`).join(' | ')}`, '---', '', ''].join('\n')
    const out = join('content', 'blog', lang === 'en' ? `${post.slug}.en.md` : `${post.slug}.md`)
    writeFileSync(out, head + body.replace(/\s*$/, '') + gameLinks(dir, lang))
    console.log(`pull-game-posts: ${file} → ${out}`)
  }
}
