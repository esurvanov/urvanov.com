// Общие типы и помощники библиотеки блоков статей. Сами блоки лежат в ./defs — по файлу на блок,
// движок (разбор меток и подстановка HTML) — в ./index.ts.
import { marked } from 'marked'
import type { Lang } from '@/lib/i18n'
import { icon } from './icons'

export type { Lang }

/** Описание атрибута: в README и на витрине, обязательный — ошибка сборки, если его нет */
export interface AttrSpec {
  doc: string
  required?: boolean
  /** Допустимые значения: другое значение — ошибка сборки */
  values?: readonly string[]
}

/** Вложенный элемент блока (<item>, <step>, <node>…): разбирает только сам блок, вне блока он ошибка */
export interface SlotSpec {
  doc: string
  required?: boolean
  attrs?: Record<string, AttrSpec>
}

/** Вложенный элемент, уже разобранный: атрибуты и готовый HTML содержимого */
export interface SlotItem {
  attrs: Record<string, string>
  html: string
}

export interface BlockCtx {
  lang: Lang
  /** Атрибуты метки — значения как в HTML: сущности (&amp;, &#39;) остаются как есть */
  attrs: Record<string, string>
  /** Содержимое без вложенных элементов-слотов: вложенные блоки уже развёрнуты в HTML */
  children: string
  /** Вложенные элементы по именам, в порядке появления */
  slots: Record<string, SlotItem[]>
  /** Содержимое как написано в посте (для raw-блоков: отступы и переносы строк сохранены) */
  raw: string
  /** Перевод подписи по языку поста */
  l: (ru: string, en: string) => string
}

export interface Block {
  /** Имя метки без префикса: 'finding' → <b-finding> */
  tag: string
  /** Название на витрине и в README */
  title: string
  doc: string
  attrs?: Record<string, AttrSpec>
  slots?: Record<string, SlotSpec>
  /** Внутри можно писать markdown абзацами (через пустую строку): глава, обёртка поста */
  flow?: boolean
  /** Текст внутри как есть, без склейки строк (промпт) */
  raw?: boolean
  render: (ctx: BlockCtx) => string
  /** Пример для витрины на обоих языках (полная метка с содержимым) */
  example: { ru: string; en: string }
}

/** Строчный markdown внутри блока: **жирный**, `код`, [ссылка](/путь/). HTML проходит как есть */
export const inline = (s: string): string => (s.trim() ? (marked.parseInline(s, { async: false }) as string) : '')

/** Значение атрибута для вставки внутрь другого атрибута: кавычки экранируются */
export const attr = (s: string): string => s.replace(/"/g, '&quot;')

/** Цвет из атрибута: имя токена (accent, muted, c-chat) → var(--имя), иначе как есть */
export const color = (s: string): string => (/^[a-z][a-z0-9-]*$/.test(s) && !['red', 'green', 'blue', 'black', 'white', 'transparent', 'currentColor'].includes(s) ? `var(--${s})` : s)

/** Значок из общего набора по имени (./icons.ts) */
export { icon }

/** Тело блока-«потока»: если внутри есть markdown абзацами, отделяем его пустыми строками от HTML вокруг */
export const flowBody = (s: string): string => (s.includes('\n\n') ? `\n\n${s.trim()}\n\n` : s)

/** Отступ сверху из атрибута top="22" → style="margin-top:22px" (как было в постах) */
export const topStyle = (top?: string): string => (top ? ` style="margin-top:${/^\d+(\.\d+)?$/.test(top) ? top + 'px' : top}"` : '')

export const defineBlock = (b: Block): Block => b
