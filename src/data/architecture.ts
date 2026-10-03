// Архитектура игр: страницы /materials/games/<игра>/architecture/. Это не посты блога — текст и схемы живут рядом с игрой
// и меняются вместе с ней. Файлы генерирует scripts/pull-game-posts.mjs из репозитория игр: content/game-architecture/<игра>[.en].md
import { marked } from 'marked'
import { shieldEmails } from '@/data/blog'
import type { Lang } from '@/lib/i18n'

export interface Architecture {
  game: string                      // слаг игры (как в GamePage.slug)
  lang: Lang
  title: string
  description: string
  date: string
  tags: string[]
  mentions: string[]
  oldSlug: string                   // адрес, под которым статья жила в блоге: старые ссылки ведут на новую страницу
  toc: { id: string; label: string }[]
  html: string
  markdown: string
  words: number
}

const files = import.meta.glob('/content/game-architecture/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

function parse(path: string, raw: string): Architecture | null {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!m) return null
  const meta: Record<string, string> = {}
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim()
  }
  if (!meta.title || !meta.game) return null
  const lang: Lang = path.endsWith('.en.md') ? 'en' : 'ru'
  const markdown = m[2].trim()
  return {
    game: meta.game,
    lang,
    title: meta.title,
    description: meta.description ?? '',
    date: meta.date ?? '',
    tags: (meta.tags ?? '').split(',').map((t) => t.trim()).filter(Boolean),
    mentions: (meta.mentions ?? '').split(',').map((t) => t.trim()).filter(Boolean),
    oldSlug: meta.oldslug ?? '',
    toc: (meta.toc ?? '').split('|').map((s) => s.trim()).filter(Boolean).map((s) => {
      const i = s.indexOf('=')
      return { id: s.slice(0, i).trim(), label: s.slice(i + 1).trim() }
    }),
    html: shieldEmails(marked.parse(markdown, { async: false }) as string),
    markdown,
    words: markdown.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length,
  }
}

export const ARCHITECTURES: Architecture[] = Object.entries(files)
  .map(([p, raw]) => parse(p, raw))
  .filter((a): a is Architecture => a !== null)

export const findArchitecture = (game: string, lang: Lang): Architecture | undefined => ARCHITECTURES.find((a) => a.game === game && a.lang === lang)
export const architecturePath = (game: string) => `/materials/games/${game}/architecture`
// Старый адрес статьи в блоге → игра, к которой она теперь относится
export const architectureByOldSlug = (slug: string): Architecture | undefined => ARCHITECTURES.find((a) => a.oldSlug === slug)
