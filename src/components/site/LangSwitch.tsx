import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { metaFor } from '@/data/seo'
import { unloadedLangsOf } from '@/i18n/pageLangs'
import LangFlag from '@/components/site/LangFlag'
import { loadLang } from '@/i18n/packs'
import { LANGS, LANG_NAMES, isLangLoaded, isNewLang, otherLang, stripLang, useT, withLang, withSlash, type Lang } from '@/lib/i18n'

// Переключатель языка: только языки, на которых эта страница есть (те же, что в hreflang).
// Один другой язык — кнопка с его кодом, как раньше (EN ↔ RU); несколько — короткий список с родными названиями.
// alt — куда вести на второй исходный язык (ru ↔ en), если перевода этой страницы нет (например, в ленту блога).
export default function LangSwitch({ alt, className = 's-nav-lang' }: { alt?: string; className?: string }) {
  const { lang } = useT()
  const { pathname } = useLocation()
  const box = useRef<HTMLDetailsElement>(null)
  // Язык, чьи переводы грузятся после клика: переход случится, когда пакет загрузится (useSmoothNavigation),
  // а до тех пор пункт показывает загрузку — иначе клик выглядит несработавшим и его повторяют
  const [busy, setBusy] = useState<Lang | null>(null)
  useEffect(() => setBusy(null), [pathname])
  // Начать загрузку заранее: при наведении, фокусе или касании пункта (до самого клика проходит 100–300 мс)
  const warm = (l: Lang) => { if (isNewLang(l) && !isLangLoaded(l)) void loadLang(l).catch(() => {}) }
  const pick = (l: Lang) => { if (isNewLang(l) && !isLangLoaded(l)) setBusy(l) }
  // Список закрывается кликом мимо него и клавишей Esc (у <details> этого нет по умолчанию)
  useEffect(() => {
    const close = (e: Event) => {
      const d = box.current
      if (!d?.open) return
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !d.contains(e.target as Node)) {
        d.open = false
        if (e instanceof KeyboardEvent) d.querySelector('summary')?.focus()
      }
    }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', close)
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', close) }
  }, [])
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
    return <Link className={className} to={x.to} {...track(x.lang)} title={LANG_NAMES[x.lang]} aria-busy={busy === x.lang || undefined} onPointerEnter={() => warm(x.lang)} onFocus={() => warm(x.lang)} onPointerDown={() => warm(x.lang)} onClick={() => pick(x.lang)}><LangFlag lang={x.lang} />{x.lang.toUpperCase()}</Link>
  }
  return (
    <details className="s-lang" key={pathname} ref={box}>
      <summary className={className} title={LANG_NAMES[lang]} aria-label={`${LANG_NAMES[lang]} · ${items.map((x) => LANG_NAMES[x.lang]).join(', ')}`}><LangFlag lang={lang} />{lang.toUpperCase()}</summary>
      <ul className="s-lang-list">
        {items.map((x) => (
          <li key={x.lang}><Link to={x.to} {...track(x.lang)} aria-busy={busy === x.lang || undefined} onPointerEnter={() => warm(x.lang)} onFocus={() => warm(x.lang)} onPointerDown={() => warm(x.lang)} onClick={() => pick(x.lang)}><LangFlag lang={x.lang} /><b>{x.lang.toUpperCase()}</b><span>{LANG_NAMES[x.lang]}</span></Link></li>
        ))}
      </ul>
    </details>
  )
}
