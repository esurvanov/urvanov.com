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

for (const file of found) {
  const dir = dirname(file), post = JSON.parse(readFileSync(file, 'utf8'))
  for (const lang of ['ru', 'en']) {
    const m = post[lang]; if (!m) continue
    let body = readFileSync(join(dir, m.file), 'utf8').replace(/^# .*\n+/, '')          // заголовок задаёт шапка поста
    for (const t of m.toc || []) body = body.replace(new RegExp(`^## ${t.heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[ \\t]*$`, 'm'), `<h2 id="${t.id}">${t.heading}</h2>`)  // [ \t], не \s: пустая строка после заголовка нужна, иначе markdown под ним не разбирается
    body = body.replace(/!\[([^\]]*)\]\(([^)\s]+\.svg)(?:\s+"([^"]*)")?\)/g, (_, alt, src, cap) => inlineSvg(dir, src, cap, alt))
    const head = ['---', `title: ${m.title}`, `date: ${post.date}`, `description: ${m.description}`, `tags: ${m.tags}`, `layout: ${post.layout || 'wide'}`,
      `mentions: ${post.mentions || ''}`, `toc: ${(m.toc || []).map((t) => `${t.id}=${t.label}`).join(' | ')}`, '---', '', ''].join('\n')
    const out = join('content', 'blog', lang === 'en' ? `${post.slug}.en.md` : `${post.slug}.md`)
    writeFileSync(out, head + body)
    console.log(`pull-game-posts: ${file} → ${out}`)
  }
}
