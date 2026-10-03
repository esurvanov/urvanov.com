import { marked } from 'marked'
import type { Lang, L } from '@/lib/i18n'

// Рубрики блога: у каждого поста одна, задаётся полем `category` во фронтматтере (у перевода — та же).
// Сведены из тегов: харнесс / спеки / промпты и ревью / custdev и исследования.
export const BLOG_CATEGORIES = [
  {
    slug: 'harness',
    icon: 'harness',
    name: { ru: 'Харнесс', en: 'Harness' },
    description: {
      ru: 'Харнесс для AI-агентов: Claude Code, Codex, Cursor и как превращать ошибки агента в правила окружения.',
      en: 'Harnesses for AI agents: Claude Code, Codex, Cursor, and turning agent mistakes into rules of its environment.',
    },
  },
  {
    slug: 'specs',
    icon: 'specs',
    name: { ru: 'Спеки и контекст', en: 'Specs and context' },
    description: {
      ru: 'Спеки, правила и скиллы для AI-агентов: что агент должен знать о проекте, спеки по агрегатам и петля сверки.',
      en: 'Specs, rules and skills for AI agents: what an agent should know about a project, specs by aggregate, and a reconcile loop.',
    },
  },
  {
    slug: 'prompts',
    icon: 'prompts',
    name: { ru: 'Промпты и ревью', en: 'Prompts and review' },
    description: {
      ru: 'Промпты для рабочих задач и ревью ответа модели: из чего собрать запрос и что делать, если ответ не подошёл.',
      en: 'Prompts for work tasks and reviewing model output: how to build a request and what to do when the answer misses.',
    },
  },
  {
    slug: 'research',
    icon: 'research',
    name: { ru: 'Исследования', en: 'Research' },
    description: {
      ru: 'Интервью и исследования использования AI в компании: кого опрашивать, как не подсказывать ответ, что показывают отчёты.',
      en: 'Interviews and research on AI use in a company: who to interview, how to avoid leading questions, what usage reports show.',
    },
  },
] as const satisfies readonly { slug: string; icon: string; name: L; description: L }[]

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]
export type CategorySlug = BlogCategory['slug']
export const findCategory = (slug: string | undefined): BlogCategory | undefined => BLOG_CATEGORIES.find((c) => c.slug === slug)

/** Постов на одной странице ленты (и в рубрике) */
export const PER_PAGE = 6

export interface Post {
  slug: string
  lang: Lang
  title: string
  description: string
  date: string
  tags: string[]
  category: CategorySlug
  html: string
  markdown: string
  minutes: number
  /** Широкий пост с инфографикой: колонка шире и оглавление сбоку */
  wide: boolean
  toc: { id: string; label: string }[]
  /** Картинка превью для соцсетей и поисковиков: путь от корня сайта */
  image?: string
  /** Продукты и понятия, о которых пост (для разметки schema.org) */
  mentions: string[]
  /** Чистый текст поста в markdown для .md-копий и llms-full.txt (если вёрстка сложная) */
  text?: string
  words: number
}

const files = import.meta.glob('/content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
// Текстовые копии широких постов: content/blog-text/<тот же файл>.md
const texts = import.meta.glob('/content/blog-text/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

// Cloudflare «Email Obfuscation» переписывает адреса в HTML в ссылки /cdn-cgi/l/email-protection, которых нет на GitHub Pages
// (битые ссылки). Адреса в тексте поста (примеры вида hana@example.com) прячем от него официальной меткой email_off
// и «@» сущностью — читатель видит обычный текст. Трогаем только текст между тегами, не атрибуты.
const EMAIL = /([A-Za-z0-9._%+-]+)@([A-Za-z0-9.-]+\.[A-Za-z]{2,})/g
export const shieldEmails = (html: string): string =>
  html.split(/(<[^>]*>)/).map((part) => (part.startsWith('<') ? part : part.replace(EMAIL, '<!--email_off-->$1&#64;$2<!--/email_off-->'))).join('')

function parse(path: string, raw: string): Post | null {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!m) return null
  const meta: Record<string, string> = {}
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '')
  }
  if (meta.draft === 'true' || !meta.title || !meta.date) return null
  // Файл slug.md — русская версия, slug.en.md — английская
  const file = path.split('/').pop()!.replace(/\.md$/, '')
  const lang: Lang = file.endsWith('.en') ? 'en' : 'ru'
  const slug = file.replace(/\.en$/, '')
  const category = findCategory(meta.category)
  // Рубрика обязательна: без неё пост выпал бы из фильтров — лучше упасть на сборке
  if (!category) throw new Error(`${path}: category «${meta.category ?? ''}» — нужна одна из: ${BLOG_CATEGORIES.map((c) => c.slug).join(', ')}`)
  const markdown = m[2].trim()
  const text = texts[`/content/blog-text/${file}.md`]?.trim()
  const words = (text ?? markdown.replace(/<[^>]+>/g, ' ')).split(/\s+/).filter(Boolean).length
  return {
    slug,
    lang,
    title: meta.title,
    description: meta.description ?? '',
    date: meta.date,
    tags: (meta.tags ?? '').split(',').map((t) => t.trim()).filter(Boolean),
    category: category.slug,
    html: shieldEmails(marked.parse(markdown, { async: false }) as string),
    markdown,
    // HTML-разметку внутри поста не считаем за слова
    minutes: Math.max(1, Math.round(words / (lang === 'en' ? 220 : 180))),
    words,
    text,
    image: meta.image || undefined,
    mentions: (meta.mentions ?? '').split(',').map((t) => t.trim()).filter(Boolean),
    wide: meta.layout === 'wide',
    // toc: id=Подпись | id=Подпись
    toc: (meta.toc ?? '').split('|').map((s) => s.trim()).filter(Boolean).map((s) => {
      const i = s.indexOf('=')
      return { id: s.slice(0, i).trim(), label: s.slice(i + 1).trim() }
    }),
  }
}

export const POSTS: Post[] = Object.entries(files)
  .map(([p, raw]) => parse(p, raw))
  .filter((p): p is Post => p !== null)
  .sort((a, b) => b.date.localeCompare(a.date))

export const formatDate = (iso: string, lang: Lang = 'ru') =>
  new Date(iso).toLocaleDateString(lang === 'en' ? 'en-US' : 'ru-RU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

export const postsFor = (lang: Lang): Post[] => POSTS.filter((p) => p.lang === lang)
export const findPost = (slug: string, lang: Lang): Post | undefined => POSTS.find((p) => p.slug === slug && p.lang === lang)

export const postsIn = (lang: Lang, category?: string): Post[] => postsFor(lang).filter((p) => !category || p.category === category)
export const pageCount = (n: number): number => Math.max(1, Math.ceil(n / PER_PAGE))

// Адреса ленты без языкового префикса: первая страница — без /page/1/
export const blogListPath = (category?: string, page = 1): string =>
  (category ? `/blog/category/${category}` : '/blog') + (page > 1 ? `/page/${page}` : '')
