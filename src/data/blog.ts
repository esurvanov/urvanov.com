import { marked } from 'marked'
import type { Lang } from '@/lib/i18n'

export interface Post {
  slug: string
  lang: Lang
  title: string
  description: string
  date: string
  tags: string[]
  html: string
  markdown: string
  minutes: number
  /** Широкий пост с инфографикой: колонка шире и оглавление сбоку */
  wide: boolean
  toc: { id: string; label: string }[]
}

const files = import.meta.glob('/content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

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
  const markdown = m[2].trim()
  return {
    slug,
    lang,
    title: meta.title,
    description: meta.description ?? '',
    date: meta.date,
    tags: (meta.tags ?? '').split(',').map((t) => t.trim()).filter(Boolean),
    html: marked.parse(markdown, { async: false }) as string,
    markdown,
    // HTML-разметку внутри поста не считаем за слова
    minutes: Math.max(1, Math.round(markdown.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / (lang === 'en' ? 220 : 180))),
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
