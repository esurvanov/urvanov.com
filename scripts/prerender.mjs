// Постсборка: превращает SPA в набор готовых HTML-страниц (для поисковиков и ИИ-краулеров),
// а также пишет sitemap.xml, robots.txt, rss.xml, llms.txt и markdown-копии постов.
import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { analyticsHead, headTags, esc, urlOf, SITE_URL } from './lib.mjs'

const DIST = 'dist'
const { render, allPages, POSTS, GAMES } = await import(pathToFileURL(join(process.cwd(), 'dist-ssr/entry-server.js')).href)

const template = readFileSync(join(DIST, 'index.html'), 'utf8')
const buildDate = new Date().toISOString().slice(0, 10)
const analytics = analyticsHead()

const crumbLabels = { about: 'Обо мне', blog: 'Блог', links: 'Ссылки', materials: 'Материалы', presentations: 'Презентации', games: 'Игры', patterns: 'Паттерны', jaiora: 'Jaiora' }
function breadcrumbs(page, all) {
  if (page.path === '/') return null
  const parts = page.path.split('/').filter(Boolean)
  const items = [{ name: 'Главная', url: SITE_URL + '/' }]
  let acc = ''
  for (const part of parts) {
    acc += '/' + part
    const p = all.find((x) => x.path === acc)
    items.push({ name: crumbLabels[part] ?? p?.title.split(' — ')[0] ?? part, url: urlOf(acc) })
  }
  return { '@type': 'BreadcrumbList', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })) }
}

function build(page, all, { body, noindex } = {}) {
  const graph = [breadcrumbs(page, all), page.jsonLd && { ...page.jsonLd, '@id': urlOf(page.path) + '#main' }].filter(Boolean)
  const head = headTags({ ...page, noindex: noindex ?? page.noindex, jsonLd: graph.length ? graph : undefined })
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `${head}\n    ${analytics}`)
    .replace('<div id="root"></div>', `<div id="root">${body ?? ''}</div>`)
  return html
}

function write(file, content) {
  const path = join(DIST, file)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, content)
}

const pages = allPages()
for (const page of pages) {
  let body = ''
  try {
    // слайды грузятся лениво: для них в HTML только метатеги и текст-описание
    body = page.path.startsWith('/slide/') ? '' : render(page.path)
  } catch (e) {
    console.warn(`  ! ${page.path}: без готового HTML (${e.message}), останется клиентская отрисовка`)
  }
  write(page.path === '/' ? 'index.html' : join(page.path, 'index.html'), build(page, pages, { body }))
}

// 404: клиентская отрисовка, не индексируется
write('404.html', build({ path: '/404', title: 'Страница не найдена — Егор Урванов', description: 'Такой страницы нет.' }, pages, { noindex: true }))

// sitemap: страницы сайта + игры
const indexable = pages.filter((p) => !p.noindex)
const urls = [
  ...indexable.map((p) => ({ loc: p.path, lastmod: p.date ?? buildDate, priority: p.path === '/' ? '1.0' : p.type === 'article' ? '0.8' : '0.6' })),
  ...GAMES.map((g) => ({ loc: g.path, lastmod: buildDate, priority: '0.7' })),
]
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u.loc === '/' ? SITE_URL + '/' : urlOf(u.loc)}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`).join('\n')}\n</urlset>\n`)

// robots: обычные и ИИ-краулеры разрешены явно
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Bytespider', 'Amazonbot', 'meta-externalagent', 'cohere-ai', 'YandexAdditional', 'YandexGPT']
write('robots.txt', ['User-agent: *', 'Allow: /', 'Disallow: /presenter', '', ...AI_BOTS.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']), `Sitemap: ${SITE_URL}/sitemap.xml`, `Host: ${SITE_URL.replace('https://', '')}`, ''].join('\n'))

// RSS
const rfc = (d) => new Date(d).toUTCString()
write('rss.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>\n<title>Блог — Егор Урванов</title><link>${SITE_URL}/blog/</link><description>AI-разработка, инженерное управление, сообщества</description><language>ru</language>\n<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />\n${POSTS.map((p) => `<item><title>${esc(p.title)}</title><link>${SITE_URL}/blog/${p.slug}/</link><guid>${SITE_URL}/blog/${p.slug}/</guid><pubDate>${rfc(p.date)}</pubDate><description>${esc(p.description)}</description><content:encoded xmlns:content="http://purl.org/rss/1.0/modules/content/"><![CDATA[${p.html}]]></content:encoded></item>`).join('\n')}\n</channel></rss>\n`)

// Markdown-копии постов и llms.txt — чистый текст для ИИ
for (const p of POSTS) write(`blog/${p.slug}.md`, `# ${p.title}\n\n${p.date} · Егор Урванов\n\n${p.markdown}\n`)
write('llms.txt', [
  '# Егор Урванов',
  '',
  '> CTO, AI-разработка, машинное обучение, ментор. Основатель Jaiora — оффлайн-LinkedIn. Блог, доклады, каталог AI-паттернов и браузерные игры.',
  '',
  '## Блог',
  ...(POSTS.length ? POSTS.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}.md): ${p.description}`) : ['- Первые посты скоро']),
  '',
  '## Разделы',
  `- [Обо мне](${SITE_URL}/about): профиль, достижения, образование`,
  `- [Jaiora](${SITE_URL}/jaiora): сообщество и встречи, находим человека под задачу и знакомим вживую`,
  `- [Каталог AI-паттернов](${SITE_URL}/patterns): паттерны разработки с AI-агентами`,
  `- [Презентации](${SITE_URL}/materials/presentations): доклад про Spec-Driven Development`,
  `- [Игры](${SITE_URL}/materials/games): ${GAMES.map((g) => g.title).join(', ')}`,
  `- [Ссылки](${SITE_URL}/links): профили, выступления, сообщества`,
  '',
].join('\n'))

write('llms-full.txt', `# Егор Урванов — блог целиком\n\n${POSTS.map((p) => `## ${p.title}\n\n${SITE_URL}/blog/${p.slug}/ · ${p.date}\n\n${p.markdown}\n`).join('\n')}`)

if (existsSync('dist-ssr')) rmSync('dist-ssr', { recursive: true })
console.log(`prerender: ${pages.length} страниц, ${POSTS.length} постов`)
