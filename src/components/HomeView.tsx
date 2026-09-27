import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { postsFor } from '@/data/blog'
import { NAV_ITEMS } from '@/data/nav'
import { BIO } from '@/data/profile'
import Page from '@/components/site/Page'
import { otherLang, stripLang, useT, withLang, withSlash } from '@/lib/i18n'

const CONTACTS = [
  { label: 'Telegram', network: 'telegram', url: 'https://t.me/eurvanov' },
  { label: 'LinkedIn', network: 'linkedin', url: 'https://www.linkedin.com/in/eurvanov/' },
  { label: 'GitHub', network: 'github', url: 'https://github.com/esurvanov/' },
  { label: 'Stack Overflow', network: 'stackoverflow', url: 'https://ru.stackoverflow.com/users/188116/eurvanov' },
  { label: 'GetMentor', network: 'getmentor', url: 'https://getmentor.dev/mentor/egor-urvanov-1077' },
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
      <Link className="s-nav-lang s-home-lang" to={withSlash(withLang(stripLang(pathname), other))} data-track="cta" data-track-id="lang_switch" data-track-label={other} hrefLang={other} lang={other}>
        {other.toUpperCase()}
      </Link>
      <header className="s-home-hero">
        <p className="s-eyebrow">CTO · AI · {t({ ru: 'нетворк', en: 'networking' })}</p>
        <h1 className="s-home-name">
          {first}
          <br />
          <span>{last}</span>
        </h1>
        <p className="s-lead">{t(BIO)}</p>
      </header>

      <nav aria-label={t({ ru: 'Разделы', en: 'Sections' })} data-track-section="home_index">
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

      <ul className="s-home-contacts" data-track-section="contacts" aria-label={t({ ru: 'Контакты', en: 'Contacts' })}>
        {CONTACTS.map((c) => (
          <li key={c.label}>
            <a href={c.url} target="_blank" rel="me noopener noreferrer" data-track-network={c.network}>{c.label}</a>
          </li>
        ))}
      </ul>
    </Page>
  )
}
