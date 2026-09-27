import { PATTERN_CATEGORIES } from '@/data/patterns'
import { POSTS } from '@/data/blog'
import { config } from '@/data/config'
import { CITY_CHATS } from '@/data/links'
import { withLang, type Lang, type L } from '@/lib/i18n'

export const SITE_URL = 'https://www.urvanov.com'
export const SITE_NAME = 'Егор Урванов'

// Единая карточка человека — @id, по которому её собирают в один узел на любой странице
// (сама карточка строится один раз в scripts/lib.mjs и добавляется в каждую страницу через headTags)
export const PERSON_ID = `${SITE_URL}/#person`
export const JAIORA_ORG_ID = `${SITE_URL}/jaiora/#org`

export interface PageMeta {
  path: string
  lang: Lang
  title: string
  description: string
  type?: 'website' | 'article'
  noindex?: boolean
  date?: string
  jsonLd?: Record<string, unknown>
  // Файлы/данные, из которых реально собрана страница — источник честной даты lastmod в sitemap.xml
  sources?: string[]
  // Та же страница на других языках: для hreflang
  alternates: { lang: Lang; path: string }[]
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
    path: '/lars/',
    title: 'Ларс',
    titleEn: 'Lars',
    text: '3D от первого лица · очередь на Верхнем Ларсе, 2022',
    long: '3D-игра от первого лица: сентябрь 2022 года, очередь на КПП Верхний Ларс в Дарьяльском ущелье. Живая очередь из тысяч людей, слухи, цены, холод, выборы без правильных ответов. Голоса персонажей и живой разговор через OpenAI — по желанию. Играть в браузере без установки.',
    longEn: 'A first-person 3D game: September 2022, the queue at the Verkhny Lars border crossing in the Darial gorge. A living queue of thousands of people, rumours, prices, cold, and choices with no right answers. Optional OpenAI character voices and live conversation. Play in the browser, no installation.',
  },
  {
    path: '/ekho-razloma/',
    title: 'Эхо Разлома',
    titleEn: 'Echo of the Rift',
    text: '3D открытый мир с сюжетом · полярный остров',
    long: '3D-игра с открытым миром и сюжетом: пилот разбился на полярном острове под северным сиянием. Станция, отшельник, три кристальных шпиля, поющий разлом во льду, снег, который помнит каждый шаг, и два финала. Играть в браузере без установки.',
    longEn: 'A 3D open-world story game: a pilot crashes on a polar island under the northern lights. A station, a hermit, three crystal spires, a singing rift in the ice, snow that remembers every step, and two endings. Play in the browser, no installation.',
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
    ru: { title: `Материалы — ${SITE_NAME}`, description: 'Презентации, каталог AI-паттернов и браузерные игры.' },
    en: { title: 'Materials — Egor Urvanov', description: 'Presentations, an AI patterns catalog, and browser games.' },
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
    ru: { title: `Игры в браузере — ${SITE_NAME}`, description: 'Хроники Королевств, Березовка и Сибирь: браузерные игры без установки.' },
    en: { title: 'Browser games — Egor Urvanov', description: 'Chronicles of Kingdoms, Berezovka, and Siberia: browser games, no installation.' },
    sources: ['src/components/MaterialsView.tsx', 'src/data/seo.ts'],
  },
  {
    path: '/jaiora',
    ru: { title: 'Jaiora — оффлайн-LinkedIn: находим человека под задачу и знакомим вживую', description: 'Jaiora — сообщество и встречи: у любой задачи и цели есть человек, который поможет. Помогаем его найти и встретиться вживую. Городские и тематические чаты.' },
    en: { title: 'Jaiora — offline LinkedIn: we find the right person and introduce you in person', description: 'Jaiora is a community and meetups: every task and goal has a person who can help. We help you find them and meet in person. City and topic chats.' },
    jsonLd: (l) => ({
      '@type': 'Organization',
      '@id': JAIORA_ORG_ID,
      name: 'Jaiora',
      alternateName: l === 'en' ? 'Jaiora' : 'Джайора',
      slogan: l === 'en' ? 'The right person exists. You just need to be in the same room.' : 'Нужный человек существует. Осталось оказаться с ним в одной комнате.',
      description: l === 'en'
        ? 'Offline LinkedIn: a networking community and meetups. Every task and goal has a person who can help — we help you find them and meet in person. 10,000 members across 11 cities today, with a 2027 goal of 30 cities and 30,000 members.'
        : 'Оффлайн-LinkedIn: сообщество нетворкинга и встречи вживую. У любой задачи и цели есть человек, который поможет её решить — мы помогаем его найти и встретиться. Сейчас 10 000 участников в 11 городах, цель на 2027 год — 30 городов и 30 000 участников.',
      url: url(withLang('/jaiora', l)),
      logo: `${SITE_URL}/jaiora/logo.svg`,
      foundingDate: '2026',
      founder: person(),
      areaServed: CITY_CHATS.map((c) => ({ '@type': 'City', name: l === 'en' ? (c.en?.label ?? c.label) : c.label })),
      sameAs: CITY_CHATS.map((c) => c.url),
    }),
    sources: ['src/components/JaioraView.tsx', 'src/data/jaiora.ts', 'src/data/links.ts'],
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
  for (const p of POSTS) {
    const tr = POSTS.find((x) => x.slug === p.slug && x.lang !== p.lang)
    const alternates = [{ lang: p.lang, path: withLang(`/blog/${p.slug}`, p.lang) }, ...(tr ? [{ lang: tr.lang, path: withLang(`/blog/${p.slug}`, tr.lang) }] : [])]
    pages.push({
      path: withLang(`/blog/${p.slug}`, p.lang),
      lang: p.lang,
      title: `${p.title} — ${p.lang === 'en' ? 'Egor Urvanov' : SITE_NAME}`,
      description: p.description,
      type: 'article',
      date: p.date,
      alternates,
      jsonLd: {
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        dateModified: p.date,
        inLanguage: p.lang,
        keywords: p.tags.join(', '),
        author: person(),
        mainEntityOfPage: url(withLang(`/blog/${p.slug}`, p.lang)),
        image: `${SITE_URL}/egor.jpg`,
      },
    })
  }
  return pages
}

export const metaFor = (path: string): PageMeta | undefined => allPages().find((p) => p.path === path)
