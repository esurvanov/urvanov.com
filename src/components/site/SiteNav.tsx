import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '@/data/nav'
import { otherLang, stripLang, useT, withLang, withSlash } from '@/lib/i18n'

// alt — адрес той же страницы на другом языке (если отличается от зеркального пути)
export default function SiteNav({ alt }: { alt?: string }) {
  const { lang, t, to } = useT()
  const { pathname } = useLocation()
  const other = otherLang(lang)
  const switchTo = alt ?? withSlash(withLang(stripLang(pathname), other))

  return (
    <header className="s-nav" data-track-section="site_nav">
      <Link to={to('/')} className="s-nav-home">{t({ ru: 'Егор Урванов', en: 'Egor Urvanov' })}</Link>
      <nav aria-label={t({ ru: 'Разделы', en: 'Sections' })}>
        {NAV_ITEMS.map((i) => (
          <NavLink key={i.to} to={to(i.to)} className={({ isActive }) => `s-nav-link${isActive ? ' is-active' : ''}`}>
            {t(i.label)}
          </NavLink>
        ))}
        <Link className="s-nav-lang" to={switchTo} data-track="cta" data-track-id="lang_switch" data-track-label={other} hrefLang={other} lang={other} title={other === 'en' ? 'English' : 'Русский'}>
          {other.toUpperCase()}
        </Link>
      </nav>
    </header>
  )
}
