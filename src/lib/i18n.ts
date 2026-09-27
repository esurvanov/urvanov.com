import { useLocation } from 'react-router-dom'

export type Lang = 'ru' | 'en'
export type L<T = string> = { ru: T; en: T }

export const langOf = (pathname: string): Lang => (pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ru')
export const stripLang = (path: string): string => path.replace(/^\/en(?=\/|$)/, '') || '/'
export const withLang = (path: string, lang: Lang): string =>
  lang === 'en' ? (path === '/' ? '/en' : '/en' + path) : path
export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'ru' : 'en')

// Язык страницы берётся из адреса: /en/... — английский, остальное — русский
export function useLang(): Lang {
  return langOf(useLocation().pathname)
}

export function useT() {
  const lang = useLang()
  return {
    lang,
    t: <T,>(v: L<T>): T => v[lang],
    to: (path: string) => withLang(path, lang),
  }
}
