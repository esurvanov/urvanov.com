import type { Lang } from '@/lib/i18n'

// «5 вопросов» / «5 questions»: ru — три формы (1, 2–4, 5+), en — две
export function plural(n: number, lang: Lang, ru: [string, string, string], en: [string, string]): string {
  if (lang === 'en') return `${n} ${n === 1 ? en[0] : en[1]}`
  const m10 = n % 10, m100 = n % 100
  const form = m10 === 1 && m100 !== 11 ? ru[0] : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? ru[1] : ru[2]
  return `${n} ${form}`
}
