import { useLocation } from 'react-router-dom'

export type Lang = 'ru' | 'en'
export type L<T = string> = { ru: T; en: T }

export const langOf = (pathname: string): Lang => (pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ru')
export const stripLang = (path: string): string => path.replace(/^\/en(?=\/|$)/, '') || '/'
export const withLang = (path: string, lang: Lang): string =>
  lang === 'en' ? (path === '/' ? '/en' : '/en' + path) : path
export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'ru' : 'en')

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
