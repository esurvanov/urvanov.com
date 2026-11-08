import { Link, useLocation } from 'react-router-dom'
import { metaFor } from '@/data/seo'
import { unloadedLangsOf } from '@/i18n/pageLangs'
import { LANGS, LANG_NAMES, isNewLang, otherLang, stripLang, useT, withLang, withSlash, type Lang } from '@/lib/i18n'

// Переключатель языка: только языки, на которых эта страница есть (те же, что в hreflang).
// Один другой язык — кнопка с его кодом, как раньше (EN ↔ RU); несколько — короткий список с родными названиями.
// alt — куда вести на второй исходный язык (ru ↔ en), если перевода этой страницы нет (например, в ленту блога).
export default function LangSwitch({ alt, className = 's-nav-lang' }: { alt?: string; className?: string }) {
  const { lang } = useT()
  const { pathname } = useLocation()
  const meta = metaFor(pathname.replace(/(.)\/$/, '$1'))
  const has = new Map<Lang, string>((meta?.alternates ?? []).map((a) => [a.lang, withSlash(a.path)]))
  // Языки, чьи переводы ещё не загружены: берём из списка адресов, собранного при сборке
  for (const l of unloadedLangsOf(stripLang(pathname).replace(/(.)\/$/, '$1'))) if (!has.has(l)) has.set(l, withSlash(withLang(stripLang(pathname), l)))
  const other = otherLang(lang)
  // Второй исходный язык есть всегда: перевод страницы, иначе alt, иначе тот же путь (как было до новых языков)
  if (!has.has(other)) has.set(other, alt ?? withSlash(withLang(stripLang(pathname), other)))
  if (isNewLang(lang) && !has.has('en')) has.set('en', withSlash(stripLang(pathname)))
  const items = LANGS.filter((l) => l !== lang && has.has(l)).map((l) => ({ lang: l, to: has.get(l)! }))

  const track = (l: Lang) => ({ 'data-track': 'cta', 'data-track-id': 'lang_switch', 'data-track-label': l, hrefLang: l, lang: l })
  if (items.length === 1) {
    const [x] = items
    return <Link className={className} to={x.to} {...track(x.lang)} title={LANG_NAMES[x.lang]}>{x.lang.toUpperCase()}</Link>
  }
  return (
    <details className="s-lang" key={pathname}>
      <summary className={className} title={LANG_NAMES[lang]} aria-label={`${LANG_NAMES[lang]} · ${items.map((x) => LANG_NAMES[x.lang]).join(', ')}`}>{lang.toUpperCase()}</summary>
      <ul className="s-lang-list">
        {items.map((x) => (
          <li key={x.lang}><Link to={x.to} {...track(x.lang)}><b>{x.lang.toUpperCase()}</b> {LANG_NAMES[x.lang]}</Link></li>
        ))}
      </ul>
    </details>
  )
}
