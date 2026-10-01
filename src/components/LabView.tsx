import { Link, useParams } from 'react-router-dom'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'
import NotFoundView from '@/components/NotFoundView'
import { labPage } from '@/data/labs'
import { LABS } from '@/data/seo'
import { useT } from '@/lib/i18n'

// Посадочная страница интерактива: то, что может прочитать поисковик. Сам интерактив — на своём адресе, открывается кнопкой.
export function LabView() {
  const { slug } = useParams()
  const x = slug ? labPage(slug) : undefined
  const { lang, t, to } = useT()
  if (!x) return <NotFoundView />
  const lab = LABS.find((l) => l.path === x.play)
  return (
    <Page>
      <Crumbs items={[{ to: to('/'), label: t({ ru: 'Главная', en: 'Home' }) }, { to: to('/materials'), label: t({ ru: 'Материалы', en: 'Materials' }) }, { to: to('/materials/interactive'), label: t({ ru: 'Интерактивы', en: 'Interactive' }) }, { label: t(x.name) }]} />
      <h1 className="s-page-title is-long">{t(x.name)}</h1>
      <p className="s-lead">{t(x.tagline)}</p>
      <p className="g-actions">
        <a className="g-play" href={x.play} data-track-label={`play_${x.slug}`}>▶ {t({ ru: 'Открыть', en: 'Open' })}</a>
      </p>

      <section className="s-section" aria-labelledby="l-about">
        <h2 className="s-label" id="l-about">{t({ ru: 'О чём', en: 'About' })}</h2>
        <div className="s-prose">{t(x.intro).map((p) => <p key={p}>{p}</p>)}</div>
      </section>

      <section className="s-section" aria-labelledby="l-features">
        <h2 className="s-label" id="l-features">{t({ ru: 'Что внутри', en: 'What is inside' })}</h2>
        <ul className="g-list">{t(x.features).map((f) => <li key={f}>{f}</li>)}</ul>
      </section>

      <section className="s-section" aria-labelledby="l-facts">
        <h2 className="s-label" id="l-facts">{t({ ru: 'Коротко', en: 'At a glance' })}</h2>
        <dl className="g-facts">{t(x.facts).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </section>

      {lab && (
        <section className="s-section" aria-labelledby="l-src">
          <h2 className="s-label" id="l-src">{t({ ru: 'Источники', en: 'Sources' })}</h2>
          <ul className="g-list">
            {lab.source.links.map((l) => <li key={l.href}><a href={l.href} target="_blank" rel="noopener">{l[lang]}</a></li>)}
          </ul>
        </section>
      )}

      <p className="g-genre"><Link to={to('/materials/interactive')}>{t({ ru: 'Все интерактивы', en: 'All interactive pages' })}</Link></p>
    </Page>
  )
}
