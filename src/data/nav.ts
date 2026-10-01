import type { L } from '@/lib/i18n'

// Единый список разделов: шапка и оглавление на главной берут порядок и названия отсюда
export interface NavItem {
  to: string
  label: L
  hint: L
  jaiora?: boolean
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/about', label: { ru: 'Обо мне', en: 'About' }, hint: { ru: 'CTO · AI · ментор №1', en: 'CTO · AI · #1 mentor' } },
  { to: '/blog', label: { ru: 'Блог', en: 'Blog' }, hint: { ru: 'AI · инженерия', en: 'AI · engineering' } },
  { to: '/materials', label: { ru: 'Материалы', en: 'Materials' }, hint: { ru: 'презентации · игры', en: 'talks · games' } },
  { to: '/links', label: { ru: 'Ссылки', en: 'Links' }, hint: { ru: 'профили · выступления', en: 'profiles · talks' } },
  { to: '/jaiora', label: { ru: 'Jaiora', en: 'Jaiora' }, hint: { ru: 'оффлайн-LinkedIn', en: 'offline LinkedIn' }, jaiora: true },
]
