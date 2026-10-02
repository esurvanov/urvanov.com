import { useParams } from 'react-router-dom'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'
import NotFoundView from '@/components/NotFoundView'
import { CardLinks, TextLink } from '@/components/site/Links'
import { LAB_PAGES, labPage } from '@/data/labs'
import { LABS } from '@/data/seo'
import { useT } from '@/lib/i18n'
import { plural } from '@/lib/plural'

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
          <ul className="g-list g-links">
            {lab.source.links.map((l) => <li key={l.href}><TextLink href={l.href}>{l[lang]}</TextLink></li>)}
          </ul>
        </section>
      )}

      <section className="s-section" aria-labelledby="l-more">
        <h2 className="s-label" id="l-more">{t({ ru: 'Ещё', en: 'More' })}</h2>
        <CardLinks items={[
          ...LAB_PAGES.filter((o) => o.slug !== x.slug).map((o) => ({ to: to(`/materials/interactive/${o.slug}`), k: t({ ru: 'Интерактив', en: 'Interactive' }), t: t(o.name), d: t(o.tagline) })),
          { to: to('/materials/interactive'), k: t({ ru: 'Раздел', en: 'Section' }), t: t({ ru: 'Все интерактивы', en: 'All interactive pages' }), d: plural(LAB_PAGES.length, lang, ['интерактив', 'интерактива', 'интерактивов'], ['page', 'pages']) },
          { to: to('/materials'), k: t({ ru: 'Раздел', en: 'Section' }), t: t({ ru: 'Все материалы', en: 'All materials' }), d: t({ ru: 'игры, интерактивы, презентации', en: 'games, interactive, talks' }) },
        ]} />
      </section>
    </Page>
  )
}
