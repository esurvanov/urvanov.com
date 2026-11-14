// Постсборка: превращает SPA в набор готовых HTML-страниц на двух языках (для поисковиков и ИИ-краулеров),
// а также пишет sitemap.xml, robots.txt, rss.xml, llms.txt и markdown-копии постов.
import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { execSync } from 'node:child_process'
import { analyticsHead, headTags, esc, urlOf, SITE_URL, RSS_TITLE } from './lib.mjs'

const DIST = 'dist'
const {
  render, allPages, POSTS, ALL_TERMS, TERM_SETS, TERM_DATES, GAMES, GAME_PAGES, ARCHITECTURES, LABS, config,
  MILESTONES, ABOUT_LEAD, PLACES, LINK_GROUPS, itemText, CITY_CHATS, THEME_CHATS, BIO,
  ui, LANG_FONTS, I18N_PROBLEMS,
} = await import(pathToFileURL(join(process.cwd(), 'dist-ssr/entry-server.js')).href)

const template = readFileSync(join(DIST, 'index.html'), 'utf8')
// Файлы переводов (src/i18n/<язык>/*.json) с ошибками: сборку не роняют, но видны в логе (подробно — npm run i18n:status)
if (I18N_PROBLEMS.length) console.warn(`prerender: в файлах переводов ${I18N_PROBLEMS.length} ошибок:\n  ${I18N_PROBLEMS.slice(0, 20).join('\n  ')}`)
// Файл поста на языке: slug.md — русский, slug.en.md — английский, slug.<язык>.md — новые языки
const postFile = (p) => `content/blog/${p.slug}${p.lang === 'ru' ? '' : `.${p.lang}`}.md`
// Префикс языка в адресе: английский — в корне, остальные — /<язык>
const prefixOf = (lang) => (lang === 'en' ? '' : `/${lang}`)
const LANG_LABEL = { en: 'English', ru: 'Русский', th: 'ไทย (Thai)', ka: 'ქართული (Georgian)', vi: 'Tiếng Việt (Vietnamese)', es: 'Español (Spanish)', fr: 'Français (French)' }
// RSS-ленты новых языков: у языка есть лента, если на нём есть хотя бы один пост; заголовок — раздел /blog из seo.json
const NEW_LANGS_RSS = [...new Set(POSTS.map((p) => p.lang))].filter((l) => l !== 'en' && l !== 'ru' && existsSync(`src/i18n/${l}/seo.json`))
for (const l of NEW_LANGS_RSS) RSS_TITLE[l] = JSON.parse(readFileSync(`src/i18n/${l}/seo.json`, 'utf8'))['/blog']?.title ?? RSS_TITLE.en
const buildDate = new Date().toISOString().slice(0, 10)
const analytics = analyticsHead()

// Честная дата изменения: последний коммит, затронувший реальные источники страницы (не дата сборки).
// Без git (например, локальный архив без .git) — тихо откатываемся на дату сборки.
const gitDateCache = new Map()

// Дата обновления — сигнал поисковикам (lastmod в sitemap.xml, article:modified_time, dateModified).
// Поэтому сборка падает, если текст статьи правился позже её даты updated: правку без новой даты не выложить.
// Правка одной строки updated: сама по себе правкой текста не считается.
{
  const sh = (cmd) => { try { return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 1 << 26 }).trim() } catch { return '' } }
  const real = (diff) => diff.split('\n').some((s) => /^[+-]/.test(s) && !/^(\+\+\+|---)/.test(s) && !/^[+-]updated: /.test(s))
  const today = new Date().toLocaleDateString('sv-SE')
  const contentDate = (file) => {
    if (real(sh(`git diff -U0 HEAD -- '${file}'`))) return today
    for (const line of sh(`git log --format='%H %cs' -- '${file}'`).split('\n').filter(Boolean)) {
      const [hash, day] = line.split(' ')
      if (real(sh(`git show --format= -U0 ${hash} -- '${file}'`))) return day
    }
    return ''
  }
  if (sh('git rev-parse --is-inside-work-tree') === 'true') {
    const stale = []
    for (const p of POSTS) {
      const file = postFile(p)
      if (!existsSync(file)) continue
      const changed = contentDate(file)
      const updated = p.updated ?? p.date
      if (changed && updated < changed) stale.push(`${file}: updated ${updated}, правка текста ${changed}`)
    }
    if (stale.length) {
      console.error(`prerender: у статей устарела дата обновления — поставьте updated не раньше даты правки:\n  ${stale.join('\n  ')}`)
      process.exit(1)
    }
  }
}
// Ошибки, которые видит посетитель и которые раньше находили только вручную: сборка падает, пока они есть.
// 1) На английской и новых языковых страницах нет кириллицы в подписи ссылки (<item t="…">) и в цитате-доказательстве (<b-proof quote="…">).
// 2) Английское определение термина не повторяет своё начало («A demo environment is a demo environment is where…»).
{
  const cyr = /[А-Яа-яЁё]/
  const problems = []
  for (const p of POSTS) {
    if (p.lang === 'ru') continue
    const file = postFile(p)
    if (!existsSync(file)) continue
    const text = readFileSync(file, 'utf8')
    for (const m of text.matchAll(/<item [^>]*?\bt="([^"]*)"/g)) if (cyr.test(m[1])) problems.push(`${file}: русский текст в подписи ссылки «${m[1].slice(0, 70)}»`)
    for (const m of text.matchAll(/<b-proof [^>]*?\bquote="([^"]*)"/g)) if (cyr.test(m[1])) problems.push(`${file}: русский текст в цитате-доказательстве «${m[1].slice(0, 70)}»`)
  }
  for (const x of ALL_TERMS) {
    const en = String(x.def?.en ?? '').replace(/`/g, '')
    if (/^\s*(?:an?\s+)?(.{3,60}?)\s+(?:is|are)\s+(?:an?\s+)?\1\b/i.test(en)) problems.push(`глоссарий ${x.slug}: английское определение повторяет начало «${en.slice(0, 70)}»`)
  }
  if (problems.length) {
    console.error(`prerender: ошибки на страницах, видимые посетителю:\n  ${problems.join('\n  ')}`)
    process.exit(1)
  }
}
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
  ru: { home: 'Главная', about: 'Обо мне', blog: 'Блог', links: 'Ссылки', materials: 'Материалы', presentations: 'Презентации', glossary: 'Глоссарий', games: 'Игры', patterns: 'Паттерны', jaiora: 'Jaiora', talk: 'Доклад' },
  en: { home: 'Home', about: 'About', blog: 'Blog', links: 'Links', materials: 'Materials', presentations: 'Presentations', glossary: 'Glossary', games: 'Games', patterns: 'Patterns', jaiora: 'Jaiora', talk: 'Talk' },
}

// Новые языки: названия разделов — из ui.json по английскому названию (нет перевода — английское)
const crumbsOf = (lang) => CRUMBS[lang] ?? Object.fromEntries(Object.entries(CRUMBS.en).map(([k, v]) => [k, ui(lang, v)]))

function breadcrumbs(page, all) {
  const parts = page.path.split('/').filter(Boolean)
  const pre = prefixOf(page.lang)
  if (pre) parts.shift()
  if (parts.length === 0) return null
  const names = crumbsOf(page.lang)
  // Главной на новом языке может ещё не быть — тогда крошка ведёт на английскую
  const items = [{ name: names.home, url: urlOf(pre && all.some((x) => x.path === pre) ? pre : '/') }]
  let acc = pre
  for (const part of parts) {
    acc += '/' + part
    const p = all.find((x) => x.path === acc)
    // Служебные сегменты без своей страницы (/blog/category/, /blog/page/) в крошки не попадают
    if (!p && !CRUMBS.en[part]) continue
    // На новом языке раздел может быть ещё не переведён: крошка ведёт на английскую страницу
    const url = p || page.lang === 'ru' || page.lang === 'en' ? urlOf(acc) : urlOf(acc.slice(pre.length) || '/')
    items.push({ name: names[part] ?? p?.crumb ?? p?.title.split(' — ')[0] ?? part, url })
  }
  return { '@type': 'BreadcrumbList', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })) }
}

// Пакет переводов языка (dist/assets/<язык>-<хэш>.js, см. src/i18n/packs): страница на этом языке ждёт его до оживления,
// поэтому в её HTML он подгружается сразу, не дожидаясь основного скрипта
const LANG_PACKS = new Map(readdirSync(join(DIST, 'assets')).flatMap((f) => (/^(th|ka|vi|es|fr)-[\w-]+\.js$/.test(f) ? [[f.split('-')[0], f]] : [])))
const packLink = (lang) => (LANG_PACKS.has(lang) ? `\n    <link rel="modulepreload" crossorigin href="/assets/${LANG_PACKS.get(lang)}">` : '')

function build(page, all, { body, noindex, skipStructured } = {}) {
  // Свой @id (например, у Organization/PresentationDigitalDocument) важнее заглушки #main
  const graph = skipStructured ? [] : [breadcrumbs(page, all), page.jsonLd && { '@id': urlOf(page.path) + '#main', ...page.jsonLd }, ...(page.jsonLdExtra ?? [])].filter(Boolean)
  const head = headTags({ ...page, noindex: noindex ?? page.noindex, jsonLd: graph.length ? graph : undefined, canonical: !skipStructured, font: LANG_FONTS[page.lang] })
  return template
    .replace('<html lang="en">', `<html lang="${page.lang}">`)
    // Замена функцией: в строке-замене JS «$$» и «$&» — спецсимволы, и «$$$» в тексте поста превращался бы в «$$»
    .replace(/<title>[\s\S]*?<\/title>/, () => `${head}\n    ${analytics}`)
    .replace('<div id="root"></div>', () => `<div id="root">${body ?? ''}</div>`)
    .replace('</head>', () => `${packLink(page.lang)}\n  </head>`)
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
  // Ошибку внутри компонента React при отрисовке на сервере не бросает, а прячет в HTML и отдаёт страницу
  // браузеру — так ошибка сборки (например, проверка блоков на витрине) прошла бы молча. Здесь она останавливает сборку
  const swallowed = /Switched to client rendering because the server rendering errored:\s*([\s\S]*?)" data-stck/.exec(body)
  if (swallowed) {
    console.error(`  ✗ ${page.path}: ошибка при отрисовке на сервере:\n    ${swallowed[1].replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&').trim()}`)
    process.exit(1)
  }
  // слайды без текста не индексируем: иначе это пустой дубль /talk/spec-driven-development/ с тем же заголовком
  const noindex = page.path.startsWith('/slide/') || undefined
  write(page.path === '/' ? 'index.html' : join(page.path, 'index.html'), build(page, pages, { body, noindex }))
}

// Jaiora переехала на jaiora.me: старые адреса не отдают 404, а переправляют туда и не индексируются
const jaioraMoved = (to) => `<!doctype html>\n<html lang="ru"><head><meta charset="utf-8"><title>Jaiora → jaiora.me</title><meta name="robots" content="noindex"><link rel="canonical" href="${to}"><meta http-equiv="refresh" content="0; url=${to}"></head><body><a href="${to}">${to}</a></body></html>\n`
write('jaiora/index.html', jaioraMoved('https://jaiora.me/en/'))
write('ru/jaiora/index.html', jaioraMoved('https://jaiora.me/'))
write('en/jaiora/index.html', jaioraMoved('https://jaiora.me/en/'))

// Английский переехал из /en/… в корень: старые адреса переправляют на новые
const moved = (to, title, lang) => jaioraMoved(to).replace('Jaiora → jaiora.me', title).replace('lang="ru"', `lang="${lang}"`)
// Закрытый от индекса английский адрес доклада тоже переправляется: он был в поиске по старому адресу /en/talk/…
for (const p of pages.filter((x) => x.lang === 'en' && (!x.noindex || x.path === '/talk/spec-driven-development'))) write(join('en', p.path, 'index.html'), moved(urlOf(p.path), p.title, 'en'))

// Убранные термины глоссария: старые адреса переправляют на тот, что их заменил
for (const [from, to, ru, en] of [['ai', 'ai-agent', 'ИИ-агент', 'AI agent'], ['language-model', 'llm', 'LLM', 'LLM']]) {
  for (const pre of ['', 'ru/', 'en/']) write(`${pre}materials/glossary/${from}/index.html`, moved(urlOf(`${pre === 'ru/' ? '/ru' : ''}/materials/glossary/${to}`), pre === 'ru/' ? ru : en, pre === 'ru/' ? 'ru' : 'en'))
}

// Архитектура игр жила в блоге (/blog/<игра>-architecture/): старые адреса переправляют на страницу рядом с игрой
for (const a of ARCHITECTURES) {
  const target = urlOf(`${a.lang === 'ru' ? '/ru' : ''}/materials/games/${a.game}/architecture`)
  for (const pre of a.lang === 'ru' ? ['ru/'] : ['', 'en/']) write(`${pre}blog/${a.oldSlug}/index.html`, moved(target, a.title, a.lang))
}

// Рубрики «Архитектура» в блоге больше нет: её старые адреса (до 06.11 корень был русским) ведут в раздел игр
for (const [from, lang] of [['blog/category/architecture', 'ru'], ['ru/blog/category/architecture', 'ru'], ['en/blog/category/architecture', 'en']]) {
  const target = urlOf(`${lang === 'ru' ? '/ru' : ''}/materials/games`)
  const title = lang === 'ru' ? 'Игры' : 'Games'
  for (const sub of ['', '/page/2']) write(`${from}${sub}/index.html`, moved(target, title, lang))
}

// 404: реальная страница (NotFoundView), без canonical и хлебных крошек — адреса /404/ не существует
let body404 = ''
try {
  body404 = render('/404')
} catch (e) {
  console.warn(`  ! /404: без готового HTML (${e.message})`)
}
write('404.html', build({ path: '/404', lang: 'en', alternates: [], title: 'Страница не найдена / Page not found — Егор Урванов', description: 'Такой страницы нет. Ссылки на главные разделы сайта на русском и английском.' }, pages, { noindex: true, skipStructured: true, body: body404 }))

// sitemap: страницы сайта на обоих языках со связями hreflang. Сами игры и интерактивы (холст) сюда не входят:
// индексируются их посадочные страницы /materials/games/<игра>/ и /materials/interactive/<имя>/
// /slide/1 намеренно вне sitemap: почти без текста для ботов, канонический разбор доклада — /talk/spec-driven-development/
const indexable = pages.filter((p) => !p.noindex && p.path !== '/slide/1')
const loc = (p) => (p === '/' ? SITE_URL + '/' : urlOf(p))
const urls = [
  ...indexable.map((p) => {
    // hreflang: все языковые версии страницы; x-default — английская (если она есть)
    const en = p.alternates.find((a) => a.lang === 'en')
    const alt = p.alternates.length > 1
      ? p.alternates.map((a) => `<xhtml:link rel="alternate" hreflang="${a.lang}" href="${loc(a.path)}"/>`).join('')
        + (en ? `<xhtml:link rel="alternate" hreflang="x-default" href="${loc(en.path)}"/>` : '')
      : ''
    const lastmod = p.modified ?? p.date ?? gitDate(p.sources)
    return `  <url><loc>${loc(p.path)}</loc><lastmod>${lastmod}</lastmod><priority>${p.path === '/' || p.path === '/ru' ? '1.0' : p.type === 'article' || /\/materials\/(games|interactive)\/[^/]+$/.test(p.path) ? '0.8' : '0.6'}</priority>${alt}</url>`
  }),
]
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`)

// robots: обычные и ИИ-краулеры разрешены явно
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Bytespider', 'Amazonbot', 'meta-externalagent', 'cohere-ai', 'YandexAdditional', 'YandexGPT']
write('robots.txt', ['User-agent: *', 'Allow: /', 'Disallow: /presenter', '', ...AI_BOTS.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']), `Sitemap: ${SITE_URL}/sitemap.xml`, `Host: ${SITE_URL.replace('https://', '')}`, ''].join('\n'))

// RSS по языкам
const rfc = (d) => new Date(d).toUTCString()
const postUrl = (p) => urlOf(`${prefixOf(p.lang)}/blog/${p.slug}`)
// Термины глоссария идут в ту же ленту: запись на термин с датой создания; на новых языках — только переведённые термины с готовой страницей
const rssPlain = (t) => t.replace(/`/g, '').replace(/\$([^$]*)\$/g, '$1')
const rssTranslations = (lang) => { const o = {}; for (const f of ['glossary', 'glossary.a', 'glossary.b', 'glossary.d']) { const fp = `src/i18n/${lang}/${f}.json`; if (existsSync(fp)) Object.assign(o, JSON.parse(readFileSync(fp, 'utf8'))) } return o }
const rssTerms = (lang) => {
  const tr = lang === 'en' || lang === 'ru' ? null : rssTranslations(lang)
  const label = lang === 'ru' ? 'Глоссарий' : 'Glossary'
  return ALL_TERMS.flatMap((x) => {
    const name = tr ? tr[x.slug]?.name ?? x.name.en : x.name[lang]
    const def = tr ? tr[x.slug]?.def : x.def[lang]
    const url = urlOf(`${prefixOf(lang)}/materials/glossary/${x.slug}`)
    if (!def || !existsSync(join(DIST, prefixOf(lang), 'materials/glossary', x.slug, 'index.html'))) return []
    const date = TERM_DATES[x.slug]?.[0] ?? '2026-10-13'
    return [{ date, xml: `<item><title>${esc(name)}</title><link>${url}</link><guid>${url}</guid><pubDate>${rfc(date)}</pubDate><category>${label}</category><description>${esc(rssPlain(def))}</description></item>` }]
  })
}
const RSS_LANGS = ['en', 'ru', ...NEW_LANGS_RSS]
for (const lang of RSS_LANGS) {
  const posts = POSTS.filter((p) => p.lang === lang)
  if (!posts.length) continue
  const prefix = prefixOf(lang)
  const seo = lang === 'en' || lang === 'ru' ? null : JSON.parse(readFileSync(`src/i18n/${lang}/seo.json`, 'utf8'))['/blog']
  const title = RSS_TITLE[lang] ?? seo.title
  const desc = lang === 'en' ? 'AI development, engineering management, communities' : lang === 'ru' ? 'AI-разработка, инженерное управление, сообщества' : seo.description
  write(`${prefix}/rss.xml`.replace(/^\//, ''), `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>\n<title>${title}</title><link>${urlOf(prefix + '/blog')}</link><description>${desc}</description><language>${lang}</language>\n<atom:link href="${SITE_URL}${prefix}/rss.xml" rel="self" type="application/rss+xml" />\n${[...posts.map((p) => ({ date: p.date, xml: `<item><title>${esc(p.title)}</title><link>${postUrl(p)}</link><guid>${postUrl(p)}</guid><pubDate>${rfc(p.date)}</pubDate><description>${esc(p.description)}</description><content:encoded xmlns:content="http://purl.org/rss/1.0/modules/content/"><![CDATA[${p.html}]]></content:encoded></item>` })), ...rssTerms(lang)].sort((a, b) => new Date(b.date) - new Date(a.date)).map((x) => x.xml).join('\n')}\n</channel></rss>\n`)
}

// Старый адрес английской ленты
write('en/rss.xml', readFileSync(join(DIST, 'rss.xml'), 'utf8'))

// Markdown-копии постов
const mdPath = (p) => `${prefixOf(p.lang).slice(1)}${p.lang === 'en' ? '' : '/'}blog/${p.slug}.md`
// у широких постов с инфографикой — чистый текст (content/blog-text), а не вёрстка
const postMd = (p) => `# ${p.title}\n\n${p.date} · ${p.lang === 'ru' ? 'Егор Урванов' : 'Egor Urvanov'} · ${postUrl(p)}\n\n> ${p.description}\n\n${p.text ?? p.markdown}\n`
for (const p of POSTS) write(mdPath(p), postMd(p))

// Архитектура игр: markdown-копии рядом со страницами (схемы-картинки заменены подписями)
const archUrl = (a) => urlOf(`${a.lang === 'ru' ? '/ru' : ''}/materials/games/${a.game}/architecture`)
const archMdPath = (a) => `${a.lang === 'ru' ? 'ru/' : ''}materials/games/${a.game}/architecture.md`
const archMd = (a) => `# ${a.title}\n\n${archUrl(a)}\n\n> ${a.description}\n\n${a.markdown.replace(/<figure class="arch">.*?<figcaption>(.*?)<\/figcaption><\/figure>/g, '[Схема / Diagram: $1]').replace(/<section class="arch-next">[\s\S]*$/, '').replace(/<h2 id="[^"]*">(.*?)<\/h2>/g, '## $1').trim()}\n`
for (const a of ARCHITECTURES) write(archMdPath(a), archMd(a))

// Глоссарий для ИИ: каждый термин отдельной строкой со ссылкой, в полном файле — определение и частые вопросы
const termUrl = (x, lang) => `${SITE_URL}${lang === 'ru' ? '/ru' : ''}/materials/glossary/${x.slug}/`
const plain = (s) => s.replace(/`/g, '').replace(/\$([^$]*)\$/g, '$1')
const firstSentence = (s) => { const m = plain(s).match(/^[\s\S]*?[.!?](?=\s|$)/); return (m ? m[0] : plain(s)).trim() }
const termLines = (lang) => ALL_TERMS.map((x) => `- [${x.name[lang]}](${termUrl(x, lang)}): ${firstSentence(x.def[lang])}`)
const termMd = (x, lang) => [
  `### ${x.name[lang]}`, '', termUrl(x, lang), '', plain(x.def[lang]), '',
  ...(x.faq ? [lang === 'en' ? '#### Frequently asked questions' : '#### Частые вопросы', '', ...x.faq.flatMap((f) => [`**${plain(f.q[lang])}**`, plain(f.a[lang]), '']) ] : []),
].join('\n')

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
  '## Глоссарий (RU)', ...termLines('ru'), '',
  '## Glossary (EN)', ...termLines('en'), '',
  '## Разделы / Sections',
  `- [Обо мне](${SITE_URL}/ru/about/) · [About](${SITE_URL}/about/): профиль, достижения, образование / profile, achievements, education`,
  `- [Jaiora](https://jaiora.me/): сообщество и встречи, отдельный сайт / community and meetups, a separate site`,
  `- [Доклад: ${config.talkTitle}](${SITE_URL}/ru/talk/spec-driven-development/) · [Talk](${SITE_URL}/talk/spec-driven-development/): полный текст слайдов / full slide text (RU)`,
  `- [Каталог AI-паттернов](${SITE_URL}/patterns/): паттерны разработки с AI-агентами (RU)`,
  `- [Глоссарий](${SITE_URL}/ru/materials/glossary/) · [Glossary](${SITE_URL}/materials/glossary/): ${ALL_TERMS.map((x) => x.name.ru).join(', ')} / ${TERM_SETS.map((s) => s.name.en).join(', ')}`,
  `- [Презентации](${SITE_URL}/ru/materials/presentations/) · [Presentations](${SITE_URL}/materials/presentations/)`,
  ...LABS.map((l) => `- [${l.title}](${SITE_URL}/ru/materials/interactive/${l.path.replace(/\//g, '')}/) · [${l.titleEn}](${SITE_URL}/materials/interactive/${l.path.replace(/\//g, '')}/): ${l.long} (RU/EN)`),
  `- [Игры](${SITE_URL}/ru/materials/games/) · [Games](${SITE_URL}/materials/games/): ${GAMES.map((g) => g.title).join(', ')}`,
  ...GAME_PAGES.flatMap((g) => [
    `  - [${g.name.ru}](${SITE_URL}/ru/materials/games/${g.slug}/) · [${g.name.en}](${SITE_URL}/materials/games/${g.slug}/): ${g.tagline.ru} / ${g.tagline.en} (играть: ${SITE_URL}${g.play})`,
    ...ARCHITECTURES.filter((a) => a.game === g.slug).map((a) => `    - [${a.title}](${SITE_URL}/${archMdPath(a)}): ${a.description}`),
  ]),
  `- [Ссылки](${SITE_URL}/ru/links/) · [Links](${SITE_URL}/links/)`,
  '',
  '## Языки / Languages',
  'Сайт на семи языках: оригинал статей — русский, остальные версии — переводы; у каждой страницы в sitemap.xml и в <head> перечислены её версии (hreflang). / The site is in seven languages: posts are written in Russian, other versions are translations; every page lists its versions (hreflang) in sitemap.xml and in <head>.',
  ...['en', 'ru', ...NEW_LANGS_RSS].map((l) => `- ${LANG_LABEL[l]}: ${SITE_URL}${prefixOf(l)}/ · RSS ${SITE_URL}${prefixOf(l)}/rss.xml`),
  '',
  '## Полный текст / Full text',
  `- [llms-full.txt](${SITE_URL}/llms-full.txt): «Обо мне», все посты блога и глоссарий с частыми вопросами целиком, RU и EN / “About”, all blog posts and the glossary with FAQs in full, RU and EN`,
  '',
].join('\n'))

// llms-full.txt — полный текст «Обо мне», RU и EN. Собран из тех же данных, что рендерит
// AboutView (src/data/about.ts, src/data/links.ts), а не переписан руками.
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

write('llms-full.txt', [
  '# Егор Урванов / Egor Urvanov — «Обо мне», блог и глоссарий целиком',
  '',
  aboutSection('ru'),
  aboutSection('en'),
  // llms-full — только русский и английский (переводы на новые языки сюда не входят)
  ...(POSTS.length ? ['## Блог / Blog', '', ...POSTS.filter((p) => p.lang === 'ru' || p.lang === 'en').map((p) => postMd(p).replace(/^# /, '### '))] : []),
  ...(ARCHITECTURES.length ? ['## Архитектура игр / Game architecture', '', ...ARCHITECTURES.map((a) => archMd(a).replace(/^# /, '### '))] : []),
  '## Глоссарий (RU)', '', ...ALL_TERMS.map((x) => termMd(x, 'ru')),
  '## Glossary (EN)', '', ...ALL_TERMS.map((x) => termMd(x, 'en')),
].join('\n'))

if (existsSync('dist-ssr')) rmSync('dist-ssr', { recursive: true })
console.log(`prerender: ${pages.length} страниц, ${POSTS.length} постов`)
