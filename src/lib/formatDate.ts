import { LOCALES, type Lang } from '@/lib/i18n'

// Даты на странице. Сервер (Node) и браузер должны писать их одинаково, иначе страница расходится при оживлении
// (React #418). У Chrome нет грузинской локали: он молча подставляет язык браузера («26 нояб.» на грузинской странице),
// поэтому грузинские месяцы заданы здесь — в тех же формах, что пишет Node.
const KA_MONTHS = {
  short: ['იან.', 'თებ.', 'მარ.', 'აპრ.', 'მაი.', 'ივნ.', 'ივლ.', 'აგვ.', 'სექ.', 'ოქტ.', 'ნოე.', 'დეკ.'],
  long: ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'],
}

export function formatDate(iso: string, lang: Lang, month: 'short' | 'long'): string {
  const d = new Date(iso)
  if (lang === 'ka') return `${d.getUTCDate()} ${KA_MONTHS[month][d.getUTCMonth()]}${month === 'long' ? ',' : ''} ${d.getUTCFullYear()}`
  return d.toLocaleDateString(LOCALES[lang], { day: 'numeric', month, year: 'numeric', timeZone: 'UTC' })
}
