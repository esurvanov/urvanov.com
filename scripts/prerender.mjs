// Постсборка: превращает SPA в набор готовых HTML-страниц на двух языках (для поисковиков и ИИ-краулеров),
// а также пишет sitemap.xml, robots.txt, rss.xml, llms.txt и markdown-копии постов.
import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { execSync } from 'node:child_process'
import { analyticsHead, headTags, esc, urlOf, SITE_URL } from './lib.mjs'

const DIST = 'dist'
const {
  render, allPages, POSTS, GAMES, config,
  MILESTONES, ABOUT_LEAD, PLACES, LINK_GROUPS, itemText, CITY_CHATS, THEME_CHATS, JAIORA, BIO,
} = await import(pathToFileURL(join(process.cwd(), 'dist-ssr/entry-server.js')).href)

const template = readFileSync(join(DIST, 'index.html'), 'utf8')
const buildDate = new Date().toISOString().slice(0, 10)
const analytics = analyticsHead()

// Честная дата изменения: последний коммит, затронувший реальные источники страницы (не дата сборки).
// Без git (например, локальный архив без .git) — тихо откатываемся на дату сборки.
const gitDateCache = new Map()
function gitDate(sources) {
  if (!sources || !sources.length) return buildDate
  const key = sources.join('|')
  if (gitDateCache.has(key)) return gitDateCache.get(key)
  let d = buildDate
  try {
    const out = execSync(`git log -1 --format=%cI -- ${sources.map((p) => `'${p}'`).join(' ')}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    if (out) d = out.slice(0, 10)
  } catch {
    /* нет git или git log ничего не нашёл — оставляем дату сборки */
  }
  gitDateCache.set(key, d)
  return d
}

const CRUMBS = {
  ru: { home: 'Главная', about: 'Обо мне', blog: 'Блог', links: 'Ссылки', materials: 'Материалы', presentations: 'Презентации', games: 'Игры', patterns: 'Паттерны', jaiora: 'Jaiora', talk: 'Доклад' },
  en: { home: 'Home', about: 'About', blog: 'Blog', links: 'Links', materials: 'Materials', presentations: 'Presentations', games: 'Games', patterns: 'Patterns', jaiora: 'Jaiora', talk: 'Talk' },
}

function breadcrumbs(page, all) {
  const parts = page.path.split('/').filter(Boolean)
  if (page.lang === 'en') parts.shift()
  if (parts.length === 0) return null
  const home = page.lang === 'en' ? '/en' : '/'
  const items = [{ name: CRUMBS[page.lang].home, url: urlOf(home) }]
  let acc = page.lang === 'en' ? '/en' : ''
  for (const part of parts) {
    acc += '/' + part
    const p = all.find((x) => x.path === acc)
    items.push({ name: CRUMBS[page.lang][part] ?? p?.title.split(' — ')[0] ?? part, url: urlOf(acc) })
  }
  return { '@type': 'BreadcrumbList', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })) }
}

function build(page, all, { body, noindex, skipStructured } = {}) {
  // Свой @id (например, у Organization/PresentationDigitalDocument) важнее заглушки #main
  const graph = skipStructured ? [] : [breadcrumbs(page, all), page.jsonLd && { '@id': urlOf(page.path) + '#main', ...page.jsonLd }].filter(Boolean)
  const head = headTags({ ...page, noindex: noindex ?? page.noindex, jsonLd: graph.length ? graph : undefined, canonical: !skipStructured })
  return template
    .replace('<html lang="ru">', `<html lang="${page.lang}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `${head}\n    ${analytics}`)
    .replace('<div id="root"></div>', `<div id="root">${body ?? ''}</div>`)
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
    // слайды грузятся лениво: для них в HTML только метатеги
    body = page.path.startsWith('/slide/') ? '' : render(page.path)
  } catch (e) {
    console.warn(`  ! ${page.path}: без готового HTML (${e.message}), останется клиентская отрисовка`)
  }
  write(page.path === '/' ? 'index.html' : join(page.path, 'index.html'), build(page, pages, { body }))
}

// 404: реальная страница (NotFoundView), без canonical и хлебных крошек — адреса /404/ не существует
let body404 = ''
try {
  body404 = render('/404')
} catch (e) {
  console.warn(`  ! /404: без готового HTML (${e.message})`)
}
write('404.html', build({ path: '/404', lang: 'ru', alternates: [], title: 'Страница не найдена / Page not found — Егор Урванов', description: 'Такой страницы нет. Ссылки на главные разделы сайта на русском и английском.' }, pages, { noindex: true, skipStructured: true, body: body404 }))

// sitemap: страницы сайта на обоих языках со связями hreflang + игры
// /slide/1 намеренно вне sitemap: почти без текста для ботов, канонический разбор доклада — /talk/spec-driven-development/
const indexable = pages.filter((p) => !p.noindex && p.path !== '/slide/1')
const loc = (p) => (p === '/' ? SITE_URL + '/' : urlOf(p))
const urls = [
  ...indexable.map((p) => {
    const alt = p.alternates.length > 1
      ? p.alternates.map((a) => `<xhtml:link rel="alternate" hreflang="${a.lang}" href="${loc(a.path)}"/>`).join('')
        + `<xhtml:link rel="alternate" hreflang="x-default" href="${loc(p.alternates.find((a) => a.lang === 'ru').path)}"/>`
      : ''
    const lastmod = p.date ?? gitDate(p.sources)
    return `  <url><loc>${loc(p.path)}</loc><lastmod>${lastmod}</lastmod><priority>${p.path === '/' || p.path === '/en' ? '1.0' : p.type === 'article' ? '0.8' : '0.6'}</priority>${alt}</url>`
  }),
  // Дата игр честно проставляется позже, в scripts/patch-games.mjs — там доступна их отдельная история git
  ...GAMES.map((g) => `  <url><loc>${SITE_URL}${g.path}</loc><lastmod>${buildDate}</lastmod><priority>0.7</priority></url>`),
]
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`)

// robots: обычные и ИИ-краулеры разрешены явно
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Bytespider', 'Amazonbot', 'meta-externalagent', 'cohere-ai', 'YandexAdditional', 'YandexGPT']
write('robots.txt', ['User-agent: *', 'Allow: /', 'Disallow: /presenter', '', ...AI_BOTS.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']), `Sitemap: ${SITE_URL}/sitemap.xml`, `Host: ${SITE_URL.replace('https://', '')}`, ''].join('\n'))

// RSS по языкам
const rfc = (d) => new Date(d).toUTCString()
const postUrl = (p) => urlOf(p.lang === 'en' ? `/en/blog/${p.slug}` : `/blog/${p.slug}`)
for (const lang of ['ru', 'en']) {
  const posts = POSTS.filter((p) => p.lang === lang)
  const prefix = lang === 'en' ? '/en' : ''
  const title = lang === 'en' ? 'Blog — Egor Urvanov' : 'Блог — Егор Урванов'
  const desc = lang === 'en' ? 'AI development, engineering management, communities' : 'AI-разработка, инженерное управление, сообщества'
  write(`${prefix}/rss.xml`.replace(/^\//, ''), `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>\n<title>${title}</title><link>${urlOf(prefix + '/blog')}</link><description>${desc}</description><language>${lang}</language>\n<atom:link href="${SITE_URL}${prefix}/rss.xml" rel="self" type="application/rss+xml" />\n${posts.map((p) => `<item><title>${esc(p.title)}</title><link>${postUrl(p)}</link><guid>${postUrl(p)}</guid><pubDate>${rfc(p.date)}</pubDate><description>${esc(p.description)}</description><content:encoded xmlns:content="http://purl.org/rss/1.0/modules/content/"><![CDATA[${p.html}]]></content:encoded></item>`).join('\n')}\n</channel></rss>\n`)
}

// Markdown-копии постов
const mdPath = (p) => (p.lang === 'en' ? `en/blog/${p.slug}.md` : `blog/${p.slug}.md`)
for (const p of POSTS) write(mdPath(p), `# ${p.title}\n\n${p.date} · ${p.lang === 'en' ? 'Egor Urvanov' : 'Егор Урванов'}\n\n${p.markdown}\n`)

// llms.txt — факты в первом абзаце, пустые разделы блога не выводим, пока постов нет
const postLines = (lang) => POSTS.filter((p) => p.lang === lang).map((p) => `- [${p.title}](${SITE_URL}/${mdPath(p)}): ${p.description}`)
const ruPosts = postLines('ru')
const enPosts = postLines('en')
write('llms.txt', [
  '# Егор Урванов / Egor Urvanov',
  '',
  '> CTO, AI-разработка, машинное обучение, ментор. Основатель Jaiora — оффлайн-LinkedIn. / CTO, AI development, machine learning, mentor. Founder of Jaiora, an offline LinkedIn.',
  '',
  BIO.ru,
  '',
  BIO.en,
  '',
  ...(ruPosts.length ? ['## Блог (RU)', ...ruPosts, ''] : []),
  ...(enPosts.length ? ['## Blog (EN)', ...enPosts, ''] : []),
  '## Разделы / Sections',
  `- [Обо мне](${SITE_URL}/about/) · [About](${SITE_URL}/en/about/): профиль, достижения, образование / profile, achievements, education`,
  `- [Jaiora](${SITE_URL}/jaiora/) · [EN](${SITE_URL}/en/jaiora/): сообщество и встречи / community and meetups`,
  `- [Доклад: ${config.talkTitle}](${SITE_URL}/talk/spec-driven-development/) · [Talk](${SITE_URL}/en/talk/spec-driven-development/): полный текст слайдов / full slide text (RU)`,
  `- [Каталог AI-паттернов](${SITE_URL}/patterns/): паттерны разработки с AI-агентами (RU)`,
  `- [Презентации](${SITE_URL}/materials/presentations/) · [Presentations](${SITE_URL}/en/materials/presentations/)`,
  `- [Игры](${SITE_URL}/materials/games/) · [Games](${SITE_URL}/en/materials/games/): ${GAMES.map((g) => g.title).join(', ')}`,
  `- [Ссылки](${SITE_URL}/links/) · [Links](${SITE_URL}/en/links/)`,
  '',
  '## Полный текст / Full text',
  `- [llms-full.txt](${SITE_URL}/llms-full.txt): «Обо мне» и Jaiora целиком, RU и EN / “About” and Jaiora in full, RU and EN`,
  '',
].join('\n'))

// llms-full.txt — полный текст «Обо мне» и Jaiora, RU и EN. Собран из тех же данных, что рендерят
// AboutView/JaioraView (src/data/about.ts, src/data/jaiora.ts, src/data/links.ts), а не переписан руками.
const about = LINK_GROUPS.find((g) => g.titleEn === 'About me')
const achievements = about.blocks.find((b) => b.titleEn === 'Projects and achievements').items
const education = about.blocks.find((b) => b.titleEn === 'Education').items

function aboutSection(lang) {
  const L = (v) => v[lang]
  const lines = [
    `## ${lang === 'en' ? 'About' : 'Обо мне'} (${lang.toUpperCase()})`,
    '',
    L(ABOUT_LEAD),
    '',
    `### ${lang === 'en' ? 'Milestones' : 'Вехи'}`,
    ...MILESTONES.map((m) => `- ${L(m.years)} — ${m.role} · ${L(m.org)}: ${m.facts.map(L).join('; ')}`),
    '',
    `### ${lang === 'en' ? 'Projects and achievements' : 'Проекты и достижения'}`,
    ...achievements.map((a) => { const x = itemText(a, lang); return `- ${x.label}${x.comment ? `: ${x.comment}` : ''}` }),
    '',
    `### ${lang === 'en' ? 'Education' : 'Образование'}`,
    ...education.map((a) => { const x = itemText(a, lang); return `- ${x.label}${x.comment ? `: ${x.comment}` : ''}` }),
    '',
    `${lang === 'en' ? 'Places visited' : 'Мест, где бывал'}: ${PLACES.length}`,
    '',
  ]
  return lines.join('\n')
}

function jaioraSection(lang) {
  const c = JAIORA[lang]
  const cityNames = (lang === 'en' ? CITY_CHATS.map((x) => x.en?.label ?? x.label) : CITY_CHATS.map((x) => x.label))
  const themeNames = (lang === 'en' ? THEME_CHATS.map((x) => x.en?.label ?? x.label) : THEME_CHATS.map((x) => x.label))
  const lines = [
    `## Jaiora (${lang.toUpperCase()})`,
    '',
    `${c.eyebrow} — ${c.title}`,
    '',
    c.lead,
    '',
    `### ${c.rulesTitle}`,
    c.rulesLead,
    ...c.rules.map((r) => `- ${r.title}: ${r.text}`),
    ...c.values.map((v) => `- ${v.title}: ${v.text}`),
    '',
    `### ${c.findTitle}`,
    ...c.find.map((f) => `- ${f.title}: ${f.text}`),
    '',
    `### ${c.doneTitle}`,
    `#### ${c.socialTitle}`,
    ...c.social.map((s) => `- ${s.title} (${s.year}): ${s.text}`),
    `#### ${c.eventsTitle}`,
    `${c.eventsMain}. ${c.eventsText}`,
    ...c.eventFormats.map((f) => `- ${f}`),
    '',
    `### ${c.storyTitle}`,
    ...c.story.map((s) => `- ${s.phase ? `[${s.phase}] ` : ''}${s.title}${s.year ? ` (${s.year})` : ''}: ${s.text}`),
    '',
    `### ${c.haveTitle}`,
    ...c.platform.map((p) => `- ${p.title}: ${p.text}`),
    `${c.cityChats}: ${cityNames.join(', ')}`,
    `${c.themeChats}: ${themeNames.join(', ')}`,
    '',
    `### ${c.helpTitle}`,
    ...c.help.map((h) => `- ${h.title}: ${h.text}`),
    '',
  ]
  return lines.join('\n')
}

write('llms-full.txt', [
  '# Егор Урванов / Egor Urvanov — «Обо мне» и Jaiora целиком',
  '',
  aboutSection('ru'),
  aboutSection('en'),
  jaioraSection('ru'),
  jaioraSection('en'),
].join('\n'))

if (existsSync('dist-ssr')) rmSync('dist-ssr', { recursive: true })
console.log(`prerender: ${pages.length} страниц, ${POSTS.length} постов`)
