// Витрина библиотеки блоков (/materials/blocks/): каждый блок своим примером, тем же путём, что текст поста —
// метки → HTML → markdown → схемы <iso-art>. Страница служит и для автоматической проверки вёрстки.
import { marked } from 'marked'
import { withBlogArt } from '@/data/blogArt'
import type { Lang } from '@/lib/i18n'
import { blockList, withBlocks } from './index'
import { ICONS } from './icons'

export interface ShowcaseItem {
  tag: string
  title: string
  doc: string
  attrs: { name: string; required: boolean; doc: string }[]
  slots: { name: string; doc: string; attrs: string[] }[]
  html: string
}

export const showcase = (lang: Lang): ShowcaseItem[] => blockList().map((b) => ({
  tag: b.tag,
  title: b.title,
  doc: b.doc,
  attrs: Object.entries(b.attrs ?? {}).map(([name, s]) => ({ name, required: !!s.required, doc: !s.values ? s.doc : s.values.join() === '' ? `${s.doc}; флаг без значения` : `${s.doc}: ${s.values.join(' | ')}` })),
  slots: Object.entries(b.slots ?? {}).map(([name, s]) => ({ name, doc: s.doc, attrs: Object.entries(s.attrs ?? {}).map(([k, a]) => (a.required ? `${k}*` : k)) })),
  html: withBlogArt(marked.parse(withBlocks(b.example[lang], lang, `витрина <b-${b.tag}>`, 0, b.tag), { async: false }) as string, lang),
}))

export const iconCount = (): number => Object.keys(ICONS).length
