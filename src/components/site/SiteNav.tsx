import { Link, NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '@/data/nav'
import { useT } from '@/lib/i18n'
import LangSwitch from '@/components/site/LangSwitch'
import ThemeToggle from '@/components/site/ThemeToggle'

// alt — адрес той же страницы на втором исходном языке (ru ↔ en), если перевода нет: см. LangSwitch
export default function SiteNav({ alt }: { alt?: string }) {
  const { lang, t, to } = useT()

  return (
    <header className="s-nav" data-track-section="site_nav">
      <Link to={to('/')} className="s-nav-home">{t({ ru: 'Егор Урванов', en: 'Egor Urvanov' })}</Link>
      <nav aria-label={t({ ru: 'Разделы', en: 'Sections' })}>
        {NAV_ITEMS.map((i) => i.external ? (
          <a key={i.to} href={i.href?.[lang] ?? i.to} className="s-nav-link" rel="noopener">{t(i.label)}</a>
        ) : (
          <NavLink key={i.to} to={to(i.to)} className={({ isActive }) => `s-nav-link${isActive ? ' is-active' : ''}`}>
            {t(i.label)}
          </NavLink>
        ))}
        <LangSwitch alt={alt} />
        <ThemeToggle />
      </nav>
    </header>
  )
}
