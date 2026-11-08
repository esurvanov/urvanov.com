// Загрузка пакетов языков (src/i18n/packs/<язык>.ts): каждый — отдельный кусок сборки, браузер берёт только нужный
import { isLangLoaded, isNewLang, type Lang } from '@/lib/i18n'

const LOADERS = {
  th: () => import('./th'),
  ka: () => import('./ka'),
  vi: () => import('./vi'),
  es: () => import('./es'),
  fr: () => import('./fr'),
}
const pending = new Map<string, Promise<void>>()

/** Загрузить переводы языка; ru и en уже в основной сборке. Повторный вызов отдаёт тот же запрос */
export function loadLang(lang: Lang): Promise<void> {
  if (!isNewLang(lang) || isLangLoaded(lang)) return Promise.resolve()
  let p = pending.get(lang)
  if (!p) {
    p = LOADERS[lang]().then(() => undefined)
    // Неудачная загрузка (сеть) не должна залипать: следующая попытка пойдёт заново
    p.catch(() => pending.delete(lang))
    pending.set(lang, p)
  }
  return p
}
