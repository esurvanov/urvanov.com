import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { postsFor } from '@/data/blog'
import { NAV_ITEMS } from '@/data/nav'
import Page from '@/components/site/Page'
import { otherLang, stripLang, useT, withLang } from '@/lib/i18n'

const CONTACTS = [
  { label: 'Telegram', url: 'https://t.me/eurvanov' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/eurvanov/' },
  { label: 'GitHub', url: 'https://github.com/esurvanov/' },
  { label: 'Stack Overflow', url: 'https://ru.stackoverflow.com/users/188116/eurvanov' },
  { label: 'GetMentor', url: 'https://getmentor.dev/mentor/egor-urvanov-1077' },
]

export default function HomeView() {
  const { lang, t, to } = useT()
  const { pathname } = useLocation()
  const other = otherLang(lang)
  const posts = postsFor(lang).length

  useEffect(() => {
    try {
      sessionStorage.removeItem('lastSlide')
    } catch {
      /* без sessionStorage просто идём дальше */
    }
  }, [])

  const [first, last] = t({ ru: 'Егор Урванов', en: 'Egor Urvanov' }).split(' ')

  return (
    <Page nav={false}>
      <Link className="s-nav-lang s-home-lang" to={withLang(stripLang(pathname), other)} hrefLang={other} lang={other}>
        {other.toUpperCase()}
      </Link>
      <header className="s-home-hero">
        <p className="s-eyebrow">CTO · AI · {t({ ru: 'нетворк', en: 'networking' })}</p>
        <h1 className="s-home-name">
          {first}
          <br />
          <span>{last}</span>
        </h1>
      </header>

      <nav aria-label={t({ ru: 'Разделы', en: 'Sections' })}>
        <ol className="s-index">
          {NAV_ITEMS.map((s, i) => (
            <li key={s.to}>
              <Link to={to(s.to)} className={s.jaiora ? 'jai' : undefined}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <span className="t">{t(s.label)}</span>
                <span className="h">
                  {s.to === '/blog' && posts > 0 ? t({ ru: `${posts} постов`, en: `${posts} posts` }) : t(s.hint)}
                </span>
                <span className="ar" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <ul className="s-home-contacts" aria-label={t({ ru: 'Контакты', en: 'Contacts' })}>
        {CONTACTS.map((c) => (
          <li key={c.label}>
            <a href={c.url} target="_blank" rel="me noopener noreferrer">{c.label}</a>
          </li>
        ))}
      </ul>
    </Page>
  )
}
