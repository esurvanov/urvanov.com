import type { Lang } from '@/lib/i18n'

// Шрифты с буквами языков, которых нет в Manrope и Inter. Подключаются только на страницах этих языков:
// в готовом HTML — scripts/prerender.mjs (те же адреса), при переходе внутри SPA — usePageMeta.
export const LANG_FONTS: Partial<Record<Lang, string>> = {
  th: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600;700;800&display=swap',
  ka: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@400;500;600;700;800&display=swap',
}

export function ensureLangFont(lang: Lang) {
  const href = LANG_FONTS[lang]
  if (!href || document.head.querySelector(`link[href="${href}"]`)) return
  document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'stylesheet', href }))
}
