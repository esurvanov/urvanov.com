import { PATTERN_CATEGORIES } from '@/data/patterns'
import { POSTS } from '@/data/blog'
import { config } from '@/data/config'

export const SITE_URL = 'https://www.urvanov.com'
export const SITE_NAME = 'Егор Урванов'

export interface PageMeta {
  path: string
  title: string
  description: string
  type?: 'website' | 'article'
  noindex?: boolean
  date?: string
  jsonLd?: Record<string, unknown>
}

const person = {
  '@type': 'Person',
  name: SITE_NAME,
  alternateName: 'Egor Urvanov',
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
}

export const GAMES = [
  {
    path: '/age-of-empires/',
    title: 'Хроники Королевств',
    text: 'Стратегия в духе Age of Empires II · 14 цивилизаций',
    long: 'Браузерная стратегия в реальном времени в духе Age of Empires II: 14 цивилизаций, строительство, добыча ресурсов и сражения. Играть можно прямо в браузере.',
  },
  {
    path: '/berezovka/',
    title: 'Березовка',
    text: '3D-игра в браузере · заснеженная деревня',
    long: '3D-игра в браузере: заснеженная русская деревня Березовка, исследование и атмосфера зимы. Запускается без установки.',
  },
  {
    path: '/sibiria/',
    title: 'Сибирь',
    text: '2D-выживание · тайга, 1993',
    long: '2D-игра на выживание в сибирской тайге, 1993 год. Играть можно в браузере без установки.',
  },
]

export function allPages(): PageMeta[] {
  const pages: PageMeta[] = [
    {
      path: '/',
      title: `${SITE_NAME} — CTO, AI, нетворк`,
      description: 'Егор Урванов: CTO, AI-разработка, менторство, Jaiora — оффлайн-LinkedIn, блог, доклады, каталог AI-паттернов и браузерные игры.',
      jsonLd: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL, inLanguage: 'ru', author: person },
    },
    {
      path: '/about',
      title: `Обо мне — ${SITE_NAME}`,
      description: 'Егор Урванов: CTO, машинное обучение, AI-разработка. Победитель соревнований, автор статьи на arXiv, ментор №1 на GetMentor, основатель Jaiora.',
      jsonLd: { '@type': 'ProfilePage', mainEntity: person },
    },
    {
      path: '/blog',
      title: `Блог — ${SITE_NAME}`,
      description: 'Заметки про AI-разработку, Spec-Driven Development, инженерное управление и сообщества.',
      noindex: POSTS.length === 0,
      jsonLd: { '@type': 'Blog', name: `Блог — ${SITE_NAME}`, url: `${SITE_URL}/blog/`, inLanguage: 'ru', author: person },
    },
    {
      path: '/links',
      title: `Ссылки — ${SITE_NAME}`,
      description: 'Профили, проекты, выступления и сообщества Егора Урванова в одном месте.',
    },
    {
      path: '/materials',
      title: `Материалы — ${SITE_NAME}`,
      description: 'Презентации, каталог AI-паттернов и браузерные игры.',
    },
    {
      path: '/materials/presentations',
      title: `Презентации — ${SITE_NAME}`,
      description: `${config.conferenceName}: «${config.talkTitle}» и каталог паттернов разработки с AI-агентами.`,
    },
    {
      path: '/materials/games',
      title: `Игры в браузере — ${SITE_NAME}`,
      description: 'Хроники Королевств, Березовка и Сибирь: браузерные игры без установки.',
    },
    {
      path: '/jaiora',
      title: 'Jaiora — оффлайн-LinkedIn: находим человека под задачу и знакомим вживую',
      description: 'Jaiora — сообщество и встречи: у любой задачи и цели есть человек, который поможет. Помогаем его найти и встретиться вживую. Городские и тематические чаты.',
      jsonLd: { '@type': 'Organization', name: 'Jaiora', url: `${SITE_URL}/jaiora/`, logo: `${SITE_URL}/jaiora/logo.svg`, founder: person },
    },
    {
      path: '/patterns',
      title: `Каталог AI-паттернов разработки — ${SITE_NAME}`,
      description: 'Паттерны разработки с AI-агентами по категориям: описание, когда применять, примеры.',
    },
    {
      path: '/slide/1',
      title: `${config.talkTitle} — ${config.conferenceName}`,
      description: `Презентация доклада «${config.talkTitle}» на ${config.conferenceName}.`,
    },
  ]
  for (const c of PATTERN_CATEGORIES) {
    pages.push({
      path: `/patterns/${c.id}`,
      title: `${c.title} — паттерны AI-разработки`,
      description: c.description,
    })
  }
  for (const p of POSTS) {
    pages.push({
      path: `/blog/${p.slug}`,
      title: `${p.title} — ${SITE_NAME}`,
      description: p.description,
      type: 'article',
      date: p.date,
      jsonLd: {
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        dateModified: p.date,
        inLanguage: 'ru',
        keywords: p.tags.join(', '),
        author: person,
        mainEntityOfPage: `${SITE_URL}/blog/${p.slug}/`,
        image: `${SITE_URL}/egor.jpg`,
      },
    })
  }
  return pages
}

export const metaFor = (path: string): PageMeta | undefined =>
  allPages().find((p) => p.path === path)
