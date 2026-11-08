import { useLocation } from 'react-router-dom'

// Языки сайта. Английский — в корне, русский — под /ru/, остальные — под своим префиксом (/th/, /ka/, /vi/, /es/, /fr/).
// Исходные тексты живут парами { ru, en } прямо в данных (src/data/*.ts). Переводы на новые языки лежат отдельно:
// src/i18n/<язык>/<модуль>.json (см. src/i18n/README.md) и подмешиваются в те же пары при загрузке (src/i18n/index.ts).
export const NEW_LANGS = ['th', 'ka', 'vi', 'es', 'fr'] as const
export type BaseLang = 'ru' | 'en'
export type NewLang = (typeof NEW_LANGS)[number]
export type Lang = BaseLang | NewLang
// Порядок в переключателе языков
export const LANGS: Lang[] = ['en', 'ru', ...NEW_LANGS]
export const LANG_NAMES: Record<Lang, string> = { en: 'English', ru: 'Русский', th: 'ไทย', ka: 'ქართული', vi: 'Tiếng Việt', es: 'Español', fr: 'Français' }
export const LOCALES: Record<Lang, string> = { en: 'en-US', ru: 'ru-RU', th: 'th-TH', ka: 'ka-GE', vi: 'vi-VN', es: 'es-ES', fr: 'fr-FR' }
export const isNewLang = (l: string): l is NewLang => (NEW_LANGS as readonly string[]).includes(l)
// Язык исходных текстов, на который откатывается страница: для новых языков — английский
export const baseOf = (l: Lang): BaseLang => (l === 'ru' ? 'ru' : 'en')

// Пара текстов на двух исходных языках; переводы на новые языки — необязательные поля, их заполняет src/i18n/index.ts
export type L<T = string> = { ru: T; en: T } & { [K in NewLang]?: T }

// Общие строки интерфейса: src/i18n/<язык>/ui.json (приходят в пакете языка), ключ — английский текст строки (как в t({ ru, en })).
// Сменился английский текст — перевод перестаёт находиться и строка показывается по-английски (scripts/i18n-status.mjs покажет такие ключи).
// Заполняет registerLang (src/i18n/index.ts) при загрузке пакета языка (src/i18n/packs/<язык>.ts)
export const UI: Partial<Record<NewLang, Record<string, string>>> = {}
/** Строка интерфейса на языке lang по её английскому тексту; нет перевода — английский текст */
export const ui = (lang: Lang, en: string): string => (isNewLang(lang) ? UI[lang]?.[en] ?? en : en)

/** Значение пары на языке lang: перевод из данных → строка из ui.json (по английскому тексту) → английский */
export function tr<T>(v: L<T>, lang: Lang): T {
  if (lang === 'ru' || lang === 'en') return v[lang]
  const own = v[lang]
  if (own !== undefined) return own
  if (typeof v.en === 'string') return ui(lang, v.en) as T
  return v.en
}

// Английский — в корне, русский — под /ru/. Старый префикс /en/ остаётся рабочим: роутер и сборка переправляют его в корень.
// Страницы только на русском (каталог паттернов, слайды доклада) живут в корне без префикса.
const RU_ONLY = /^\/(patterns|slide|presenter)(?=\/|$)/
const PREFIX = new RegExp(`^/(ru|${NEW_LANGS.join('|')})(?=/|$)`)
const ANY_PREFIX = new RegExp(`^/(ru|en|${NEW_LANGS.join('|')})(?=/|$)`)
export const langOf = (pathname: string): Lang => {
  const m = PREFIX.exec(pathname)
  if (m) return m[1] as Lang
  return RU_ONLY.test(pathname) ? 'ru' : 'en'
}
export const stripLang = (path: string): string => path.replace(ANY_PREFIX, '') || '/'
export const withLang = (path: string, lang: Lang): string =>
  lang === 'en' || RU_ONLY.test(path) ? path : path === '/' ? `/${lang}` : `/${lang}${path}`
/** Второй исходный язык (для пары ru ↔ en) */
export const otherLang = (lang: Lang): BaseLang => (baseOf(lang) === 'en' ? 'ru' : 'en')

// Пакеты языков. Переводы каждого нового языка (ui.json, модули, посты) лежат в отдельном куске сборки: страница
// на языке L показывается, только когда его пакет загружен (src/main.tsx ждёт его до отрисовки, переключатель языка — до перехода).
// Сборка для prerender (SSR) подключает все пакеты сразу.
const loadedLangs = new Set<Lang>(['en', 'ru'])
const packListeners: (() => void)[] = []
export const isLangLoaded = (l: Lang): boolean => loadedLangs.has(l)
export const markLangLoaded = (l: Lang) => { loadedLangs.add(l); packListeners.forEach((f) => f()) }
/** Подписка на загрузку пакета языка (сбросить кэши, зависящие от переводов) */
export const onLangLoaded = (f: () => void) => { packListeners.push(f) }

// Какие страницы реально существуют: реестр заполняет src/data/seo.ts (allPages). На новом языке ссылка ведёт
// на свою версию страницы, только если она переведена; иначе — на английскую. До заполнения реестра (разбор постов при загрузке)
// ссылки на новых языках остаются английскими, страница поста досчитывает их при отрисовке (см. localizeLinks).
let pageIndex: ((path: string) => boolean) | null = null
let pageIndexOff = 0
/** Выполнить f так, будто реестр страниц ещё пуст (разбор постов при загрузке пакета языка: ссылки досчитывает страница) */
export const withoutPageIndex = <T>(f: () => T): T => { pageIndexOff++; try { return f() } finally { pageIndexOff-- } }
export const setPageIndex = (f: (path: string) => boolean) => { pageIndex = f }
const bare = (p: string) => p.replace(/[?#].*$/, '').replace(/(.)\/$/, '$1')
export const hasPage = (path: string): boolean => (pageIndex && !pageIndexOff ? pageIndex(bare(path)) : false)
/** Адрес страницы на языке lang, если она там есть; для новых языков без перевода — английский адрес */
export const localHref = (path: string, lang: Lang): string => {
  const p = withLang(path, lang)
  return !isNewLang(lang) || hasPage(p) ? p : path
}

// Внутренние ссылки в тексте постов и блоков: /blog/…, /materials/… — без языка; язык подставляется по странице.
// Ссылки на файлы и движки (/decks, /games, /blog-media, /patterns) не трогаем.
const ROUTE = /^\/(about|blog|materials|ai|links|talk)(?=\/|$)/
export const localizePath = (path: string, lang: Lang): string => {
  const b = stripLang(path)
  return b === '/' || ROUTE.test(b) ? localHref(b, lang) : path
}
export const localizeLinks = (s: string, lang: Lang): string =>
  s.replace(/(href="|\]\()(\/[^"\s)]*)/g, (_, pre: string, path: string) => pre + localizePath(path, lang))

// Канонический адрес — всегда с хвостовым слэшем (как в sitemap.xml): для ссылок в разметке.
// PageMeta.path (data/seo.ts) слэш не хранит — так его ждёт usePageMeta при сверке при переходах в SPA.
export const withSlash = (path: string): string => (path.endsWith('/') ? path : path + '/')

// Язык страницы берётся из адреса: /ru/... — русский, /th/... и т. п. — свой язык, остальное — английский
export function useLang(): Lang {
  return langOf(useLocation().pathname)
}

export function useT() {
  const lang = useLang()
  return {
    lang,
    t: <T,>(v: L<T>): T => tr(v, lang),
    to: (path: string) => withSlash(localHref(path, lang)),
  }
}
