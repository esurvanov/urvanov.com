import { PATTERN_CATEGORIES } from '@/data/patterns'
import { POSTS, BLOG_CATEGORIES, blogListPath, findCategory, pageCount, postsIn } from '@/data/blog'
import { config } from '@/data/config'
import { GAME_PAGES } from '@/data/games'
import { LAB_PAGES } from '@/data/labs'
import { withLang, type Lang, type L } from '@/lib/i18n'

export const SITE_URL = 'https://www.urvanov.com'
export const SITE_NAME = 'Егор Урванов'

// Единая карточка человека — @id, по которому её собирают в один узел на любой странице
// (сама карточка строится один раз в scripts/lib.mjs и добавляется в каждую страницу через headTags)
export const PERSON_ID = `${SITE_URL}/#person`
export const JAIORA_ORG_ID = 'https://jaiora.me/#org'

export interface PageMeta {
  path: string
  lang: Lang
  title: string
  description: string
  type?: 'website' | 'article'
  noindex?: boolean
  date?: string
  // Картинка превью (абсолютный путь от корня сайта); без неё — фото автора
  image?: string
  // Заголовок для соцсетей, если в <title> стоит короткая версия
  ogTitle?: string
  jsonLd?: Record<string, unknown>
  // Дополнительные узлы разметки (например FAQPage) рядом с основным
  jsonLdExtra?: Record<string, unknown>[]
  // Файлы/данные, из которых реально собрана страница — источник честной даты lastmod в sitemap.xml
  sources?: string[]
  // Та же страница на других языках: для hreflang
  alternates: { lang: Lang; path: string }[]
  // Соседние страницы ленты блога: <link rel="prev/next">
  prev?: string
  next?: string
}

// Ссылка на канонический Person (полностью описан один раз в scripts/lib.mjs и добавляется
// в @graph каждой страницы автоматически — здесь только связываем через @id, без повтора полей)
const person = () => ({ '@id': PERSON_ID })

const url = (path: string) => SITE_URL + (path === '/' ? '/' : path.endsWith('/') ? path : path + '/')

export const GAMES = [
  {
    // Реальная страница игры: index.html — только редирект (см. scripts/patch-games.mjs)
    path: '/age-of-empires/web/',
    title: 'Хроники Королевств',
    titleEn: 'Chronicles of Kingdoms',
    text: 'Стратегия в духе Age of Empires II · 14 цивилизаций',
    long: 'Браузерная стратегия в реальном времени в духе Age of Empires II: 14 цивилизаций, строительство, добыча ресурсов и сражения. Играть можно прямо в браузере.',
    longEn: 'A browser real-time strategy in the spirit of Age of Empires II: 14 civilizations, building, gathering resources, and battles. Play right in the browser.',
  },
  {
    path: '/berezovka/',
    title: 'Березовка',
    titleEn: 'Berezovka',
    text: '3D-игра в браузере · заснеженная деревня',
    long: '3D-игра в браузере: заснеженная русская деревня Березовка, исследование и атмосфера зимы. Запускается без установки.',
    longEn: 'A 3D browser game: the snowy Russian village of Berezovka, exploration, and winter atmosphere. Runs without installation.',
  },
  {
    path: '/sibiria/',
    title: 'Сибирь',
    titleEn: 'Siberia',
    text: '2D-выживание · тайга, 1993',
    long: '2D-игра на выживание в сибирской тайге, 1993 год. Играть можно в браузере без установки.',
    longEn: 'A 2D survival game in the Siberian taiga, 1993. Play in the browser, no installation.',
  },
  {
    path: '/ekho-razloma/',
    title: 'Эхо Разлома',
    titleEn: 'Echo of the Rift',
    text: '3D открытый мир с сюжетом · полярный остров',
    long: '3D-игра с открытым миром и сюжетом: пилот разбился на полярном острове под северным сиянием. Станция, отшельник, три кристальных шпиля, поющий разлом во льду, снег, который помнит каждый шаг, и два финала. Играть в браузере без установки.',
    longEn: 'A 3D open-world story game: a pilot crashes on a polar island under the northern lights. A station, a hermit, three crystal spires, a singing rift in the ice, snow that remembers every step, and two endings. Play in the browser, no installation.',
  },
  {
    path: '/severny-razlom/',
    title: 'Северный Разлом',
    titleEn: 'Northern Rift',
    text: '3D-аркада · полёт по ледяному каньону',
    long: '3D-аркада в браузере: маленький корабль летит по бесконечному ледяному каньону под северным сиянием. Собирай осколки, копи энергию, пробивай ледяные стены и держи множитель до ×8. Один файл, без установки.',
    longEn: 'A 3D browser arcade: a small ship flies down an endless ice canyon under the northern lights. Collect shards, build energy, burst through the ice walls and keep a combo of up to ×8. One file, no installation.',
  },
  {
    path: '/skhodka/',
    title: 'Сходка',
    titleEn: 'Skhodka',
    text: '3D · субботняя IT-сходка в баре Батуми',
    long: '3D-игра в браузере: субботний вечер IT-сообщества в баре SushiGO в Батуми, с 19:00 до 01:00. Знакомься с гостями, находи общие темы, обменивайся контактами и своди тех, кто нужен друг другу. Саксофон, караоке, дождь и общее фото в конце. Играть в браузере без установки.',
    longEn: 'A 3D browser game: a Saturday evening of the IT community at the SushiGO bar in Batumi, 19:00 to 01:00. Meet the guests, find common topics, swap contacts and introduce people who need each other. Sax, karaoke, rain and a group photo at the end. Play in the browser, no installation.',
  },
  {
    path: '/zhitie/',
    title: 'Житьё',
    titleEn: 'Zhitiyo',
    text: 'Симулятор жизни в духе The Sims · район из десяти семей',
    long: 'Браузерная симуляция жизни в духе The Sims 1: изометрическое 3D в low-poly, район из десяти семей, потребности, карьера, навыки и отношения. Обставляй и достраивай дом в режимах «Покупка» и «Стройка». Играть можно прямо в браузере.',
    longEn: 'A browser life sim in the spirit of The Sims 1: isometric low-poly 3D, a neighbourhood of ten households, needs, careers, skills, and relationships. Furnish and extend the house in Buy and Build modes. Play right in the browser.',
  },
  {
    path: '/work-programmer/',
    title: 'Аптайм',
    titleEn: 'Uptime',
    text: 'Игра про работу инженера · собери сервис и переживи аварии',
    long: 'Игра в браузере про работу инженера: собери сервис из блоков, пусти поток пользователей и посмотри, что сломается первым. 43 уровня от одного сервера до распила монолита: кэши, очереди, Kubernetes, мультирегион, мониторинг. Разбор решения после каждого уровня. Без установки.',
    longEn: 'A browser game about an engineer’s job: build a service from blocks, send a stream of users through it and see what breaks first. 43 levels from a single server to splitting a monolith: caches, queues, Kubernetes, multi-region, monitoring. A debrief of your decision after every level. No installation.',
  },
]

// Интерактивные учебные страницы: живут в отдельном репозитории project-euler и копируются при выкладке
// (см. .github/workflows/pages.yml и scripts/patch-games.mjs)
export const LABS = [
  {
    path: '/methods-lab/',
    title: 'Мастерская методов',
    titleEn: 'Methods workshop',
    long: '60 приёмов решения математических и алгоритмических задач в 3D, шаг за шагом: задача, решение в лоб, что замечаем и как решаем быстрее. На русском и английском, прямо в браузере.',
    longEn: '60 problem-solving methods from maths and algorithms in step-by-step 3D: the task, the head-on way, what we notice and how to solve it faster. In Russian and English, right in the browser.',
    source: {
      ru: 'Приёмы собраны из решения задач Project Euler+ на HackerRank',
      en: 'Methods drawn from solving Project Euler+ on HackerRank',
      links: [
        { href: 'https://www.hackerrank.com/contests/projecteuler/leaderboard', ru: 'HackerRank · 6-е место из ≈256 000', en: 'HackerRank · 6th of ≈256,000' },
        { href: 'https://github.com/esurvanov/project-euler', ru: 'Решения на GitHub', en: 'Solutions on GitHub' },
      ],
    },
  },
]

interface Base {
  path: string
  ru: { title: string; description: string }
  en?: { title: string; description: string }
  noindex?: L<boolean>
  jsonLd?: (lang: Lang) => Record<string, unknown>
  // Файлы/данные страницы — для честного lastmod (см. scripts/prerender.mjs, gitDate)
  sources: string[]
}

const BASE: Base[] = [
  {
    path: '/',
    ru: { title: `${SITE_NAME} — CTO, AI, нетворк`, description: 'Егор Урванов: CTO, AI-разработка, менторство, Jaiora — оффлайн-LinkedIn, блог, доклады, каталог AI-паттернов и браузерные игры.' },
    en: { title: 'Egor Urvanov — CTO, AI, networking', description: 'Egor Urvanov: CTO, AI development, mentoring, Jaiora — offline LinkedIn, blog, talks, an AI patterns catalog, and browser games.' },
    jsonLd: (l) => ({ '@type': 'WebSite', name: l === 'en' ? 'Egor Urvanov' : SITE_NAME, url: url(withLang('/', l)), inLanguage: l, author: person() }),
    sources: ['src/components/HomeView.tsx', 'src/data/nav.ts', 'src/data/profile.ts'],
  },
  {
    path: '/about',
    ru: { title: `Обо мне — ${SITE_NAME}`, description: 'Егор Урванов: CTO, машинное обучение, AI-разработка. Путь от инженера до CTO, победитель соревнований, автор статьи на arXiv, ментор №1 на GetMentor, основатель Jaiora.' },
    en: { title: 'About — Egor Urvanov', description: 'Egor Urvanov: CTO, machine learning, AI development. Career from engineer to CTO, competition winner, arXiv author, #1 mentor on GetMentor, founder of Jaiora.' },
    jsonLd: () => ({ '@type': 'ProfilePage', mainEntity: person() }),
    sources: ['src/components/AboutView.tsx', 'src/data/about.ts', 'src/data/links.ts', 'src/data/places.ts'],
  },
  {
    path: '/blog',
    ru: { title: `Блог — ${SITE_NAME}`, description: 'Заметки про AI-разработку, Spec-Driven Development, инженерное управление и сообщества.' },
    en: { title: 'Blog — Egor Urvanov', description: 'Notes on AI development, Spec-Driven Development, engineering management, and communities.' },
    noindex: { ru: POSTS.filter((p) => p.lang === 'ru').length === 0, en: POSTS.filter((p) => p.lang === 'en').length === 0 },
    jsonLd: (l) => ({ '@type': 'Blog', name: l === 'en' ? 'Blog — Egor Urvanov' : `Блог — ${SITE_NAME}`, url: url(withLang('/blog', l)), inLanguage: l, author: person() }),
    sources: ['src/data/blog.ts', 'content/blog'],
  },
  {
    path: '/links',
    ru: { title: `Ссылки — ${SITE_NAME}`, description: 'Профили, проекты, выступления и телеграм-каналы Егора Урванова в одном месте.' },
    en: { title: 'Links — Egor Urvanov', description: 'Profiles, projects, talks, and Telegram channels of Egor Urvanov in one place.' },
    sources: ['src/components/LinksView.tsx', 'src/data/links.ts'],
  },
  {
    path: '/materials',
    ru: { title: `Материалы — ${SITE_NAME}`, description: 'Презентации, каталог AI-паттернов, мастерская методов в 3D и браузерные игры.' },
    en: { title: 'Materials — Egor Urvanov', description: 'Presentations, an AI patterns catalog, a 3D methods workshop, and browser games.' },
    sources: ['src/components/MaterialsView.tsx'],
  },
  {
    path: '/materials/presentations',
    ru: { title: `Презентации — ${SITE_NAME}`, description: `${config.conferenceName}: «${config.talkTitle}» и каталог паттернов разработки с AI-агентами.` },
    en: { title: 'Presentations — Egor Urvanov', description: `${config.conferenceName}: “Spec-Driven Development in practice” (in Russian) and a catalog of AI-agent development patterns.` },
    sources: ['src/components/MaterialsView.tsx', 'src/data/config.ts'],
  },
  {
    path: '/materials/games',
    ru: { title: `Игры в браузере — ${SITE_NAME}`, description: 'Семь бесплатных браузерных игр без установки: стратегия Хроники Королевств, выживание Сибирь, 3D-миры Эхо Разлома и Березовка, аркада, симулятор жизни и Сходка.' },
    en: { title: 'Browser games — Egor Urvanov', description: 'Seven free browser games, no install: the RTS Chronicles of Kingdoms, the survival game Sibiria, 3D worlds Echo of the Rift and Berezovka, an arcade, a life sim and Skhodka.' },
    sources: ['src/components/MaterialsView.tsx', 'src/data/seo.ts', 'src/data/games.ts'],
  },
  {
    path: '/materials/interactive',
    ru: { title: `Интерактивы — ${SITE_NAME}`, description: 'Интерактивные страницы: приёмы решения задач в 3D, шаг за шагом, прямо в браузере.' },
    en: { title: 'Interactive — Egor Urvanov', description: 'Interactive pages: problem-solving methods in step-by-step 3D, right in the browser.' },
    sources: ['src/components/MaterialsView.tsx', 'src/data/labs.ts'],
  },
  {
    path: '/talk/spec-driven-development',
    ru: {
      title: `${config.talkTitle} — ${config.conferenceName}`,
      description: `Доклад «${config.talkTitle}» на ${config.conferenceName}: полный текст всех слайдов — индустрия AI-разработки, теория Spec-Driven Development и воркшоп по OpenSpec.`,
    },
    en: {
      title: `${config.talkTitleEn} — ${config.conferenceName}`,
      description: `The talk “${config.talkTitleEn}” at ${config.conferenceName} (in Russian): full slide text, from the state of AI development to Spec-Driven Development theory and an OpenSpec workshop.`,
    },
    jsonLd: (l) => ({
      '@type': 'PresentationDigitalDocument',
      name: l === 'en' ? config.talkTitleEn : config.talkTitle,
      description: l === 'en'
        ? `A talk on Spec-Driven Development at ${config.conferenceName}, given by Egor Urvanov (in Russian).`
        : `Доклад о Spec-Driven Development на ${config.conferenceName}, автор — Егор Урванов.`,
      author: person(),
      about: ['Spec-Driven Development', 'AI agents', 'OpenSpec'],
      inLanguage: 'ru',
      isPartOf: url(withLang('/materials/presentations', l)),
    }),
    sources: ['src/components/TalkView.tsx', 'src/data/slides.ts', 'src/slides'],
  },
]

export function allPages(): PageMeta[] {
  const pages: PageMeta[] = []
  for (const b of BASE) {
    const langs: Lang[] = b.en ? ['ru', 'en'] : ['ru']
    const alternates = langs.map((l) => ({ lang: l, path: withLang(b.path, l) }))
    for (const l of langs) {
      const m = b[l]!
      pages.push({ path: withLang(b.path, l), lang: l, title: m.title, description: m.description, noindex: b.noindex?.[l], jsonLd: b.jsonLd?.(l), sources: b.sources, alternates })
    }
  }
  // Слайды и каталог паттернов только на русском
  pages.push(
    { path: '/patterns', lang: 'ru', title: `Каталог AI-паттернов разработки — ${SITE_NAME}`, description: 'Паттерны разработки с AI-агентами по категориям: описание, когда применять, примеры.', sources: ['src/data/patterns.ts'], alternates: [{ lang: 'ru', path: '/patterns' }] },
    { path: '/slide/1', lang: 'ru', title: `${config.talkTitle} — ${config.conferenceName}`, description: `Презентация доклада «${config.talkTitle}» на ${config.conferenceName}.`, sources: ['src/data/slides.ts', 'src/slides'], alternates: [{ lang: 'ru', path: '/slide/1' }] },
  )
  for (const c of PATTERN_CATEGORIES) {
    pages.push({ path: `/patterns/${c.id}`, lang: 'ru', title: `${c.title} — паттерны AI-разработки`, description: c.description, sources: ['src/data/patterns.ts'], alternates: [{ lang: 'ru', path: `/patterns/${c.id}` }] })
  }
  for (const p of pages) {
    if (p.path === withLang('/blog', p.lang) && pageCount(postsIn(p.lang).length) > 1) p.next = withLang(blogListPath(undefined, 2), p.lang)
  }
  pages.push(...blogListPages())
  for (const p of POSTS) {
    const tr = POSTS.find((x) => x.slug === p.slug && x.lang !== p.lang)
    const alternates = [{ lang: p.lang, path: withLang(`/blog/${p.slug}`, p.lang) }, ...(tr ? [{ lang: tr.lang, path: withLang(`/blog/${p.slug}`, tr.lang) }] : [])]
    pages.push({
      path: withLang(`/blog/${p.slug}`, p.lang),
      lang: p.lang,
      // В выдаче длинный заголовок обрезается: в <title> — суть до двоеточия, полный — в соцсетях и разметке
      title: `${p.title.split(': ')[0]} — ${p.lang === 'en' ? 'Egor Urvanov' : SITE_NAME}`,
      ogTitle: p.title,
      description: p.description,
      type: 'article',
      date: p.date,
      image: p.image,
      alternates,
      jsonLd: {
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        dateModified: p.date,
        inLanguage: p.lang,
        keywords: p.tags.join(', '),
        articleSection: findCategory(p.category)!.name[p.lang],
        wordCount: p.words,
        timeRequired: `PT${p.minutes}M`,
        isAccessibleForFree: true,
        author: person(),
        publisher: person(),
        mainEntityOfPage: url(withLang(`/blog/${p.slug}`, p.lang)),
        image: p.image ? { '@type': 'ImageObject', url: `${SITE_URL}${p.image}`, width: 1200, height: 630 } : `${SITE_URL}/egor.jpg`,
        ...(p.mentions.length ? { mentions: p.mentions.map((name) => ({ '@type': 'Thing', name })) } : {}),
        ...(p.toc.length ? { hasPart: p.toc.map((t) => ({ '@type': 'WebPageElement', name: t.label, url: `${url(withLang(`/blog/${p.slug}`, p.lang))}#${t.id}` })) } : {}),
        // русская версия — оригинал, английская — перевод
        ...(tr ? { [p.lang === 'ru' ? 'workTranslation' : 'translationOfWork']: { '@id': url(withLang(`/blog/${p.slug}`, tr.lang)) + '#main' } } : {}),
      },
    })
  }
  // Посадочные страницы игр: текст для поиска + разметка VideoGame/WebApplication + FAQPage (сама игра на отдельном адресе)
  for (const g of GAME_PAGES) {
    const alternates = (['ru', 'en'] as Lang[]).map((l) => ({ lang: l, path: withLang(`/materials/games/${g.slug}`, l) }))
    for (const l of ['ru', 'en'] as Lang[]) {
      const path = withLang(`/materials/games/${g.slug}`, l), pageUrl = url(path), image = `/games/${g.slug}/${g.shots[0].file}`
      pages.push({
        path, lang: l,
        title: l === 'en' ? `${g.name.en} — play free in your browser` : `${g.name.ru} — играть онлайн в браузере`,
        description: g.description[l],
        image, alternates, sources: ['src/data/games.ts', 'src/components/GameView.tsx'],
        jsonLd: {
          '@type': ['VideoGame', 'WebApplication'],
          name: g.name[l], description: g.description[l], url: pageUrl, image: SITE_URL + image,
          screenshot: g.shots.map((s) => ({ '@type': 'ImageObject', contentUrl: `${SITE_URL}/games/${g.slug}/${s.file}`, caption: s.alt[l] })),
          genre: g.genre[l], keywords: g.keywords[l].join(', '), applicationCategory: 'GameApplication', gamePlatform: 'Web browser', operatingSystem: 'Any (web browser)',
          playMode: 'SinglePlayer', inLanguage: l, isAccessibleForFree: true, license: 'https://opensource.org/licenses/MIT',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          author: person(), publisher: person(), isPartOf: { '@id': `${SITE_URL}/#person` },
          sameAs: [`https://github.com/esurvanov/awesome-games/tree/main/${g.repoDir}`],
          potentialAction: { '@type': 'PlayAction', target: SITE_URL + g.play },
          mainEntityOfPage: pageUrl,
        },
        jsonLdExtra: [{
          '@type': 'FAQPage',
          mainEntity: g.faq[l].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
        }],
      })
    }
  }
  // Посадочные страницы интерактивов: индексируется она, а не сам интерактив (он на отдельном адресе)
  for (const x of LAB_PAGES) {
    const alternates = (['ru', 'en'] as Lang[]).map((l) => ({ lang: l, path: withLang(`/materials/interactive/${x.slug}`, l) }))
    for (const l of ['ru', 'en'] as Lang[]) {
      const pageUrl = url(withLang(`/materials/interactive/${x.slug}`, l))
      pages.push({
        path: withLang(`/materials/interactive/${x.slug}`, l), lang: l,
        title: l === 'en' ? `${x.name.en} — interactive, in your browser` : `${x.name.ru} — интерактив в браузере`,
        description: x.description[l], alternates, sources: ['src/data/labs.ts', 'src/components/LabView.tsx'],
        jsonLd: {
          '@type': 'LearningResource', '@id': `${pageUrl}#main`, name: x.name[l], description: x.description[l], url: pageUrl,
          inLanguage: ['ru', 'en'], learningResourceType: 'Interactive visualization', isAccessibleForFree: true,
          author: person(), isPartOf: url(withLang('/materials/interactive', l)),
          potentialAction: { '@type': 'ViewAction', target: SITE_URL + x.play },
        },
      })
    }
  }
  return pages
}

// Лента блога: страницы 2…N и рубрики (со своими страницами). Первая страница ленты — '/blog' из BASE.
// У каждой страницы canonical на себя, prev/next — на соседей; /page/1/ не существует (первая — без номера).
function blogListPages(): PageMeta[] {
  const pages: PageMeta[] = []
  const name = (l: Lang) => (l === 'en' ? 'Egor Urvanov' : SITE_NAME)
  const lists: (typeof BLOG_CATEGORIES[number] | undefined)[] = [undefined, ...BLOG_CATEGORIES]
  for (const cat of lists) {
    for (const l of ['ru', 'en'] as Lang[]) {
      const total = postsIn(l, cat?.slug).length
      if (!total) continue
      const n = pageCount(total)
      for (let page = 1; page <= n; page++) {
        // первая страница самой ленты уже есть в BASE (rel=next ей дописывает allPages)
        if (!cat && page === 1) continue
        const path = withLang(blogListPath(cat?.slug, page), l)
        const prev = page > 1 ? withLang(blogListPath(cat?.slug, page - 1), l) : undefined
        const next = page < n ? withLang(blogListPath(cat?.slug, page + 1), l) : undefined
        const other: Lang = l === 'en' ? 'ru' : 'en'
        const alternates = [{ lang: l, path }, ...(pageCount(postsIn(other, cat?.slug).length) >= page && postsIn(other, cat?.slug).length ? [{ lang: other, path: withLang(blogListPath(cat?.slug, page), other) }] : [])]
        const head = cat ? cat.name[l] : l === 'en' ? 'Blog' : 'Блог'
        const pageSuffix = page > 1 ? (l === 'en' ? `, page ${page}` : `, страница ${page}`) : ''
        const blogOf = l === 'en' ? 'blog of Egor Urvanov' : 'блог Егора Урванова'
        pages.push({
          path,
          lang: l,
          title: cat ? `${head}${pageSuffix} — ${blogOf}` : `${head}${pageSuffix} — ${name(l)}`,
          description: (cat ? cat.description[l] : l === 'en' ? 'Notes on AI development, Spec-Driven Development, engineering management, and communities.' : 'Заметки про AI-разработку, Spec-Driven Development, инженерное управление и сообщества.')
            + (page > 1 ? (l === 'en' ? ` Page ${page} of ${n}.` : ` Страница ${page} из ${n}.`) : ''),
          prev,
          next,
          alternates,
          jsonLd: {
            '@type': 'CollectionPage',
            name: cat ? cat.name[l] : head,
            url: url(path),
            inLanguage: l,
            isPartOf: { '@type': 'Blog', url: url(withLang('/blog', l)) },
          },
          sources: ['src/data/blog.ts', 'content/blog'],
        })
      }
    }
  }
  return pages
}

export const metaFor = (path: string): PageMeta | undefined => allPages().find((p) => p.path === path)
