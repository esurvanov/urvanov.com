// Переводы на новые языки (th, ka, vi, es, fr). Исходники — пары { ru, en } в src/data/*.ts — не трогаем:
// переводы лежат в src/i18n/<язык>/<модуль>.json и при загрузке подмешиваются в те же пары полем <язык>
// (компоненты читают их через t() / tr() из src/lib/i18n.ts: перевод → строка ui.json → английский).
//
// Правило «страница существует, только если переведена» (подробно — src/i18n/README.md):
//   единица перевода (термин, оффер, игра, …) переведена на язык, когда у каждой её пары { ru, en } есть значение
//   на этом языке. Пары, где ru и en совпадают (имена, код, «yes/no» в таблицах), переводить не нужно — они нейтральны.
//   Поля из optional модуля (например, match у терминов) переводятся по желанию и готовность не держат.
//   Страница на новом языке собирается, попадает в sitemap, hreflang и переключатель языков, только если готовы
//   все единицы, из которых она собрана (см. правила в src/data/seo.ts, allPages). Иначе адреса нет (404).
import { ALL_TERMS, TERM_SETS } from '@/data/glossary'
import { NAV_ITEMS } from '@/data/nav'
import { AI_GROUPS, AI_OFFERS, AI_PROOF } from '@/data/aiOffers'
import { GAME_PAGES } from '@/data/games'
import { LAB_PAGES } from '@/data/labs'
import { BLOG_CATEGORIES, addPosts } from '@/data/blog'
import { ABOUT_LEAD, MILESTONES } from '@/data/about'
import { BIO, CITIES, CURRENT_ROLE, TOPICS } from '@/data/profile'
import { PLACES } from '@/data/places'
import { CITY_CHATS, LINK_GROUPS, LINK_TR, THEME_CHATS, type LinkItem } from '@/data/links'
import { NEW_LANGS, UI, isNewLang, markLangLoaded, withoutPageIndex, type NewLang } from '@/lib/i18n'

type Obj = Record<string, unknown>
interface Module {
  /** Единицы перевода: [стабильный id, объект с парами { ru, en } внутри] */
  units: () => [string, object][]
  /** Поля верхнего уровня единицы, которые переводятся по желанию и не держат готовность */
  optional?: string[]
  /** Поля верхнего уровня, которые не обходятся вовсе (вложенные единицы другого модуля) */
  skip?: string[]
}

// Модули с парами { ru, en }: файл src/i18n/<язык>/<модуль>.json = { "<id единицы>": { "<путь к паре>": перевод } }
export const MODULES: Record<string, Module> = {
  nav: { units: () => NAV_ITEMS.map((i) => [i.to, i]), optional: ['href'] },
  glossary: { units: () => ALL_TERMS.map((t) => [t.slug, t]), optional: ['match'] },
  glossarySets: { units: () => TERM_SETS.map((s) => [s.slug, s]), skip: ['terms'] },
  aiOffers: { units: () => AI_OFFERS.map((o) => [o.slug, o]) },
  ai: { units: () => [...AI_GROUPS.map((g): [string, object] => [`group:${g.id}`, g]), ...AI_PROOF.map((p): [string, object] => [`proof:${p.value}`, p])] },
  games: { units: () => GAME_PAGES.map((g) => [g.slug, g]) },
  labs: { units: () => LAB_PAGES.map((x) => [x.slug, x]) },
  blog: { units: () => BLOG_CATEGORIES.map((c) => [c.slug, c]) },
  about: { units: () => [['lead', { lead: ABOUT_LEAD }], ['milestones', MILESTONES]] },
  profile: { units: () => [['profile', { bio: BIO, role: CURRENT_ROLE, cities: CITIES, topics: TOPICS }]] },
  places: { units: () => [['places', PLACES]] },
}

// Файлы переводов приходят пакетами языка (src/i18n/packs/<язык>.ts → registerLang): у каждого языка свой кусок сборки.
// Модуль может лежать в нескольких файлах: <модуль>.json и <модуль>.<часть>.json (например, glossary.a.json у второго
// переводчика) — они сливаются по id единицы, чтобы двое не правили один файл
const MERGED = new Map<string, Obj>()
const fileOf = (lang: NewLang, mod: string): Obj | undefined => MERGED.get(`${lang}/${mod}`)

/** Ошибки файлов переводов: неизвестный id или путь, тип не совпадает с английским. Печатает сборка и scripts/i18n-status.mjs */
export const I18N_PROBLEMS: string[] = []

// Проверка имён всех файлов переводов (вызывает только сборка страниц): опечатка в языке или модуле иначе молча не применилась бы
export function checkI18nFiles(files: string[]) {
  for (const file of files) {
    const [, , , lang, name] = file.split('/')
    const mod = name.split('.')[0]
    if (!isNewLang(lang)) I18N_PROBLEMS.push(`src/i18n/${lang}/: такого языка нет (есть ${NEW_LANGS.join(', ')})`)
    else if (!(mod in MODULES) && !['ui', 'seo', 'links'].includes(mod)) I18N_PROBLEMS.push(`src/i18n/${lang}/${name}: такого модуля нет`)
  }
}

const isL = (o: unknown): o is Obj => !!o && typeof o === 'object' && !Array.isArray(o) && 'ru' in o && 'en' in o
const neutral = (o: Obj) => JSON.stringify(o.ru) === JSON.stringify(o.en)
const sameShape = (a: unknown, b: unknown): boolean =>
  Array.isArray(a) ? Array.isArray(b) && a.length === b.length && a.every((x, i) => sameShape(x, b[i])) : typeof a === typeof b

/** Все пары { ru, en } внутри единицы: [путь через точку, пара]. Путь — то, что пишется ключом в JSON */
export function pairs(unit: unknown, mod?: Module, path = '', out: [string, Obj][] = []): [string, Obj][] {
  if (Array.isArray(unit)) unit.forEach((x, i) => pairs(x, undefined, path ? `${path}.${i}` : String(i), out))
  else if (unit && typeof unit === 'object') {
    if (isL(unit)) out.push([path, unit])
    for (const [k, v] of Object.entries(unit)) {
      if (k === 'ru' || k === 'en' || isNewLang(k)) continue
      if (!path && mod?.skip?.includes(k)) continue
      pairs(v, undefined, path ? `${path}.${k}` : k, out)
    }
  }
  return out
}

export interface LangPack {
  /** src/i18n/<язык>/*.json */
  json: Record<string, unknown>
  /** content/blog/*.<язык>.md (сырой текст) */
  posts: Record<string, string>
  /** content/blog-text/*.<язык>.md */
  texts: Record<string, string>
}

/** Подключает пакет языка: строки интерфейса, переводы в данные, ссылки, посты. Вызывает сам пакет при загрузке */
export function registerLang(lang: NewLang, pack: LangPack) {
  const files = Object.entries(pack.json as Record<string, Obj>).sort(([a], [b]) => a.localeCompare(b))
  for (const [file, data] of files) {
    const name = file.split('/')[4]
    const key = `${lang}/${name.split('.')[0]}`
    const into = MERGED.get(key) ?? {}
    for (const [id, keys] of Object.entries(data)) into[id] = keys && typeof keys === 'object' && !Array.isArray(keys) ? { ...(into[id] as Obj | undefined), ...(keys as Obj) } : keys
    MERGED.set(key, into)
  }
  const ui = pack.json[`/src/i18n/${lang}/ui.json`]
  if (ui) UI[lang] = ui as Record<string, string>
  mix(lang)
  // Посты разбираются без реестра страниц: ссылки на новых языках досчитывает страница при отрисовке (localizeLinks)
  withoutPageIndex(() => addPosts(pack.posts, pack.texts))
  markLangLoaded(lang)
}

// Подмешиваем переводы в данные: пара получает поле <язык>
function mix(lang: NewLang) {
  for (const [name, mod] of Object.entries(MODULES)) {
    const file = fileOf(lang, name)
    if (!file) continue
    const units = new Map(mod.units())
    for (const [id, keys] of Object.entries(file)) {
      const unit = units.get(id)
      if (!unit) { I18N_PROBLEMS.push(`${lang}/${name}.json: нет единицы «${id}»`); continue }
      const byPath = new Map(pairs(unit, mod))
      for (const [path, value] of Object.entries(keys as Obj)) {
        const pair = byPath.get(path)
        if (!pair) { I18N_PROBLEMS.push(`${lang}/${name}.json: ${id}: нет пары «${path}»`); continue }
        if (!sameShape(pair.en, value)) { I18N_PROBLEMS.push(`${lang}/${name}.json: ${id}.${path}: вид значения не как у английского (строка / список той же длины)`); continue }
        pair[lang] = value
      }
    }
  }
  // Ссылки (src/data/links.ts): записи без пар { ru, en }, перевод по url записи
  const links = fileOf(lang, 'links')
  if (links) LINK_TR[lang] = links as Record<string, { label?: string; comment?: string }>
}

/** Ключи «<id>.<путь>», которых не хватает модулю на языке (пустой список — модуль готов) */
export function missing(name: string, lang: NewLang, only?: string): string[] {
  if (name === 'links') return missingLinks(lang)
  const mod = MODULES[name]
  const out: string[] = []
  for (const [id, unit] of mod.units()) {
    if (only !== undefined && id !== only) continue
    for (const [path, pair] of pairs(unit, mod)) {
      if (pair[lang] !== undefined || neutral(pair)) continue
      if (mod.optional?.includes(path.split('.')[0])) continue
      out.push(`${id}.${path}`)
    }
  }
  return out
}
/** Единица (термин, оффер, игра…) переведена на язык целиком */
export const unitReady = (name: string, id: string, lang: NewLang) => missing(name, lang, id).length === 0
/** Модуль переведён на язык целиком */
export const moduleReady = (name: string, lang: NewLang) => missing(name, lang).length === 0

// Ссылки: подпись нужна, если у записи есть отдельная английская подпись; комментарий — если он есть
const linkItems = (): LinkItem[] => [...LINK_GROUPS.flatMap((g) => g.blocks.flatMap((b) => b.items)), ...CITY_CHATS, ...THEME_CHATS]
function missingLinks(lang: NewLang): string[] {
  const tr = LINK_TR[lang] ?? {}
  const out = new Set<string>()
  for (const item of linkItems()) {
    if (item.en?.label && !tr[item.url]?.label) out.add(`${item.url}.label`)
    const comment = item.en && 'comment' in item.en ? item.en.comment : item.comment
    if (comment && !tr[item.url]?.comment) out.add(`${item.url}.comment`)
  }
  return [...out]
}

// Заголовок и описание страниц-разделов (BASE в src/data/seo.ts и хаб /ai): src/i18n/<язык>/seo.json = { "<путь>": { title, description } }
export function seoMeta(path: string, lang: NewLang): { title: string; description: string } | undefined {
  const m = fileOf(lang, 'seo')?.[path] as { title?: string; description?: string } | undefined
  return m?.title && m.description ? { title: m.title, description: m.description } : undefined
}

/** Сводка для scripts/i18n-status.mjs */
export function i18nStatus() {
  return NEW_LANGS.map((lang) => ({
    lang,
    ui: Object.keys(UI[lang] ?? {}).length,
    seo: Object.keys(fileOf(lang, 'seo') ?? {}),
    modules: Object.fromEntries([...Object.keys(MODULES), 'links'].map((name) => {
      const units = name === 'links' ? [] : MODULES[name].units()
      const ready = units.filter(([id]) => unitReady(name, id, lang)).map(([id]) => id)
      return [name, { units: units.length, ready, missing: missing(name, lang) }]
    })),
  }))
}
