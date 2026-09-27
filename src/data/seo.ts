import { PATTERN_CATEGORIES } from '@/data/patterns'
import { POSTS } from '@/data/blog'
import { config } from '@/data/config'
import { CITY_CHATS } from '@/data/links'
import { withLang, type Lang, type L } from '@/lib/i18n'

export const SITE_URL = 'https://www.urvanov.com'
export const SITE_NAME = 'Егор Урванов'

export interface PageMeta {
  path: string
  lang: Lang
  title: string
  description: string
  type?: 'website' | 'article'
  noindex?: boolean
  date?: string
  jsonLd?: Record<string, unknown>
  // Та же страница на других языках: для hreflang
  alternates: { lang: Lang; path: string }[]
}

const person = (lang: Lang) => ({
  '@type': 'Person',
  name: lang === 'en' ? 'Egor Urvanov' : SITE_NAME,
  alternateName: lang === 'en' ? SITE_NAME : 'Egor Urvanov',
  url: SITE_URL,
  image: `${SITE_URL}/egor.jpg`,
  jobTitle: 'CTO',
  sameAs: [
    'https://t.me/eurvanov',
    'https://www.linkedin.com/in/eurvanov/',
    'https://github.com/esurvanov/',
    'https://getmentor.dev/mentor/egor-urvanov-1077',
    'https://ru.stackoverflow.com/users/188116/eurvanov',
  ],
})

const url = (path: string) => SITE_URL + (path === '/' ? '/' : path.endsWith('/') ? path : path + '/')

export const GAMES = [
  {
    path: '/age-of-empires/',
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
]

interface Base {
  path: string
  ru: { title: string; description: string }
  en?: { title: string; description: string }
  noindex?: L<boolean>
  jsonLd?: (lang: Lang) => Record<string, unknown>
}

const BASE: Base[] = [
  {
    path: '/',
    ru: { title: `${SITE_NAME} — CTO, AI, нетворк`, description: 'Егор Урванов: CTO, AI-разработка, менторство, Jaiora — оффлайн-LinkedIn, блог, доклады, каталог AI-паттернов и браузерные игры.' },
    en: { title: 'Egor Urvanov — CTO, AI, networking', description: 'Egor Urvanov: CTO, AI development, mentoring, Jaiora — offline LinkedIn, blog, talks, an AI patterns catalog, and browser games.' },
    jsonLd: (l) => ({ '@type': 'WebSite', name: l === 'en' ? 'Egor Urvanov' : SITE_NAME, url: url(withLang('/', l)), inLanguage: l, author: person(l) }),
  },
  {
    path: '/about',
    ru: { title: `Обо мне — ${SITE_NAME}`, description: 'Егор Урванов: CTO, машинное обучение, AI-разработка. Путь от инженера до CTO, победитель соревнований, автор статьи на arXiv, ментор №1 на GetMentor, основатель Jaiora.' },
    en: { title: 'About — Egor Urvanov', description: 'Egor Urvanov: CTO, machine learning, AI development. Career from engineer to CTO, competition winner, arXiv author, #1 mentor on GetMentor, founder of Jaiora.' },
    jsonLd: (l) => ({ '@type': 'ProfilePage', mainEntity: person(l) }),
  },
  {
    path: '/blog',
    ru: { title: `Блог — ${SITE_NAME}`, description: 'Заметки про AI-разработку, Spec-Driven Development, инженерное управление и сообщества.' },
    en: { title: 'Blog — Egor Urvanov', description: 'Notes on AI development, Spec-Driven Development, engineering management, and communities.' },
    noindex: { ru: POSTS.filter((p) => p.lang === 'ru').length === 0, en: POSTS.filter((p) => p.lang === 'en').length === 0 },
    jsonLd: (l) => ({ '@type': 'Blog', name: l === 'en' ? 'Blog — Egor Urvanov' : `Блог — ${SITE_NAME}`, url: url(withLang('/blog', l)), inLanguage: l, author: person(l) }),
  },
  {
    path: '/links',
    ru: { title: `Ссылки — ${SITE_NAME}`, description: 'Профили, проекты, выступления и телеграм-каналы Егора Урванова в одном месте.' },
    en: { title: 'Links — Egor Urvanov', description: 'Profiles, projects, talks, and Telegram channels of Egor Urvanov in one place.' },
  },
  {
    path: '/materials',
    ru: { title: `Материалы — ${SITE_NAME}`, description: 'Презентации, каталог AI-паттернов и браузерные игры.' },
    en: { title: 'Materials — Egor Urvanov', description: 'Presentations, an AI patterns catalog, and browser games.' },
  },
  {
    path: '/materials/presentations',
    ru: { title: `Презентации — ${SITE_NAME}`, description: `${config.conferenceName}: «${config.talkTitle}» и каталог паттернов разработки с AI-агентами.` },
    en: { title: 'Presentations — Egor Urvanov', description: `${config.conferenceName}: “Spec-Driven Development in practice” (in Russian) and a catalog of AI-agent development patterns.` },
  },
  {
    path: '/materials/games',
    ru: { title: `Игры в браузере — ${SITE_NAME}`, description: 'Хроники Королевств, Березовка и Сибирь: браузерные игры без установки.' },
    en: { title: 'Browser games — Egor Urvanov', description: 'Chronicles of Kingdoms, Berezovka, and Siberia: browser games, no installation.' },
  },
  {
    path: '/jaiora',
    ru: { title: 'Jaiora — оффлайн-LinkedIn: находим человека под задачу и знакомим вживую', description: 'Jaiora — сообщество и встречи: у любой задачи и цели есть человек, который поможет. Помогаем его найти и встретиться вживую. Городские и тематические чаты.' },
    en: { title: 'Jaiora — offline LinkedIn: we find the right person and introduce you in person', description: 'Jaiora is a community and meetups: every task and goal has a person who can help. We help you find them and meet in person. City and topic chats.' },
    jsonLd: (l) => ({ '@type': 'Organization', name: 'Jaiora', url: url(withLang('/jaiora', l)), logo: `${SITE_URL}/jaiora/logo.svg`, founder: person(l), areaServed: CITY_CHATS.map((c) => ({ '@type': 'City', name: l === 'en' ? (c.en?.label ?? c.label) : c.label })) }),
  },
]

export function allPages(): PageMeta[] {
  const pages: PageMeta[] = []
  for (const b of BASE) {
    const langs: Lang[] = b.en ? ['ru', 'en'] : ['ru']
    const alternates = langs.map((l) => ({ lang: l, path: withLang(b.path, l) }))
    for (const l of langs) {
      const m = b[l]!
      pages.push({ path: withLang(b.path, l), lang: l, title: m.title, description: m.description, noindex: b.noindex?.[l], jsonLd: b.jsonLd?.(l), alternates })
    }
  }
  // Слайды и каталог паттернов только на русском
  pages.push(
    { path: '/patterns', lang: 'ru', title: `Каталог AI-паттернов разработки — ${SITE_NAME}`, description: 'Паттерны разработки с AI-агентами по категориям: описание, когда применять, примеры.', alternates: [{ lang: 'ru', path: '/patterns' }] },
    { path: '/slide/1', lang: 'ru', title: `${config.talkTitle} — ${config.conferenceName}`, description: `Презентация доклада «${config.talkTitle}» на ${config.conferenceName}.`, alternates: [{ lang: 'ru', path: '/slide/1' }] },
  )
  for (const c of PATTERN_CATEGORIES) {
    pages.push({ path: `/patterns/${c.id}`, lang: 'ru', title: `${c.title} — паттерны AI-разработки`, description: c.description, alternates: [{ lang: 'ru', path: `/patterns/${c.id}` }] })
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
        author: person(p.lang),
        mainEntityOfPage: url(withLang(`/blog/${p.slug}`, p.lang)),
        image: `${SITE_URL}/egor.jpg`,
      },
    })
  }
  return pages
}

export const metaFor = (path: string): PageMeta | undefined => allPages().find((p) => p.path === path)
