import { useLocation } from 'react-router-dom'

export type Lang = 'ru' | 'en'
export type L<T = string> = { ru: T; en: T }

// Английский — в корне, русский — под /ru/. Старый префикс /en/ остаётся рабочим: роутер и сборка переправляют его в корень.
// Страницы только на русском (каталог паттернов, слайды доклада) живут в корне без префикса.
const RU_ONLY = /^\/(patterns|slide|presenter)(?=\/|$)/
export const langOf = (pathname: string): Lang => (pathname === '/ru' || pathname.startsWith('/ru/') || RU_ONLY.test(pathname) ? 'ru' : 'en')
export const stripLang = (path: string): string => path.replace(/^\/(ru|en)(?=\/|$)/, '') || '/'
export const withLang = (path: string, lang: Lang): string =>
  lang === 'ru' && !RU_ONLY.test(path) ? (path === '/' ? '/ru' : '/ru' + path) : path
export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'ru' : 'en')

// Внутренние ссылки в тексте постов и блоков: /blog/…, /materials/… — без языка; язык подставляется по странице.
// Ссылки на файлы и движки (/decks, /games, /blog-media, /patterns) не трогаем.
const ROUTE = /^\/(about|blog|materials|ai|links|talk)(?=\/|$)/
export const localizePath = (path: string, lang: Lang): string => {
  const bare = stripLang(path)
  return bare === '/' || ROUTE.test(bare) ? withLang(bare, lang) : path
}
export const localizeLinks = (s: string, lang: Lang): string =>
  s.replace(/(href="|\]\()(\/[^"\s)]*)/g, (_, pre: string, path: string) => pre + localizePath(path, lang))

// Канонический адрес — всегда с хвостовым слэшем (как в sitemap.xml): для ссылок в разметке.
// PageMeta.path (data/seo.ts) слэш не хранит — так его ждёт usePageMeta при сверке при переходах в SPA.
export const withSlash = (path: string): string => (path.endsWith('/') ? path : path + '/')

// Язык страницы берётся из адреса: /en/... — английский, остальное — русский
export function useLang(): Lang {
  return langOf(useLocation().pathname)
}

export function useT() {
  const lang = useLang()
  return {
    lang,
    t: <T,>(v: L<T>): T => v[lang],
    to: (path: string) => withSlash(withLang(path, lang)),
  }
}
