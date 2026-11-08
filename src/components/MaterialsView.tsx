import { Link } from 'react-router-dom'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'
import { GAMES, LABS } from '@/data/seo'
import { PATTERN_CATEGORIES } from '@/data/patterns'
import { config } from '@/data/config'
import { localHref, tr, useT, withSlash, type Lang } from '@/lib/i18n'
import { gamePageByPlay } from '@/data/games'
import { LAB_PAGES } from '@/data/labs'
import { TextLink } from '@/components/site/Links'
import { plural } from '@/lib/plural'
import { ALL_TERMS, TERM_SETS } from '@/data/glossary'

const patternsTotal = PATTERN_CATEGORIES.reduce((s, c) => s + c.patterns.length, 0)

interface Row { to?: string; href?: string; title: string; hint: string; meta?: string; note?: { text: string; links: { href: string; label: string }[] } }

// Списки разделов — карточками, как лента блога: подпись, заголовок-ссылка (вся карточка кликабельна), описание
function Rows({ items }: { items: Row[] }) {
  return (
    <ol className="s-posts s-mat-list">
      {items.map((r) => (
        <li key={r.title}>
          <article className="s-card s-post">
            {r.meta && <p className="s-post-meta"><span>{r.meta}</span></p>}
            <h2 className="s-card-title">
              {r.to ? <Link to={r.to}>{r.title}</Link> : <a href={r.href}>{r.title}</a>}
            </h2>
            <p className="s-card-text">{r.hint}</p>
            {r.note && (
              <p className="s-post-note">
                {r.note.text}:{' '}
                {r.note.links.map((l, j) => (
                  <span key={l.href}>{j > 0 && ' · '}<TextLink href={l.href}>{l.label}</TextLink></span>
                ))}
              </p>
            )}
          </article>
        </li>
      ))}
    </ol>
  )
}

// Слайды и каталог паттернов только на русском: ссылки ведут на русские адреса
const presentationRows = (lang: Lang): Row[] => [
  { meta: tr({ ru: 'Доклад · интерактивные слайды', en: 'Talk · interactive slides' }, lang), href: '/decks/ai-agent-architecture/', title: tr({ ru: 'Работа AI-агента: архитектура, защита, экономика', en: 'AI agent in production: architecture, protection, economics' }, lang), hint: tr({ ru: 'Podlodka AI Crew · prompt injection, Data plane и Control plane, стек · 3D-слайды в браузере', en: 'Podlodka AI Crew · prompt injection, Data plane and Control plane, the stack · 3D slides in the browser (in Russian)' }, lang) },
  { meta: tr({ ru: 'Доклад', en: 'Talk' }, lang), to: '/talk/spec-driven-development/', title: tr({ ru: config.talkTitle, en: config.talkTitleEn }, lang), hint: tr({ ru: `${config.conferenceName} · текст доклада целиком`, en: `${config.conferenceName} · full talk text (in Russian)` }, lang) },
  { meta: tr({ ru: 'Каталог', en: 'Catalog' }, lang), to: '/patterns/', title: tr({ ru: 'Каталог AI-паттернов', en: 'AI patterns catalog' }, lang), hint: tr({ ru: `${patternsTotal} паттернов · ${PATTERN_CATEGORIES.length} категорий`, en: `${patternsTotal} patterns · ${PATTERN_CATEGORIES.length} categories (in Russian)` }, lang) },
]

const gameRows = (lang: Lang): Row[] => GAMES.map((g) => {
  const lp = gamePageByPlay(g.path)
  const title = tr({ ru: g.title, en: g.titleEn }, lang), hint = tr({ ru: g.long, en: g.longEn }, lang)
  // страница игры (описание, скриншоты, управление, ссылка на игру) — единственная ссылка; индексируется она, а не холст игры
  return lp
    ? { to: withSlash(localHref(`/materials/games/${lp.slug}`, lang)), title, hint, meta: tr(lp.genre, lang) }
    : { href: g.path, title, hint }
})
const labRows = (lang: Lang): Row[] => LABS.map((l) => {
  const lp = LAB_PAGES.find((x) => x.play === l.path)
  const title = tr({ ru: l.title, en: l.titleEn }, lang), hint = tr({ ru: l.long, en: l.longEn }, lang)
  const note = { text: tr(l.source, lang), links: l.source.links.map((x) => ({ href: x.href, label: tr(x, lang) })) }
  // страница интерактива (описание для поиска) — основная ссылка; сам интерактив открывается оттуда
  const meta = tr({ ru: 'Интерактив', en: 'Interactive' }, lang)
  return lp ? { to: withSlash(localHref(`/materials/interactive/${lp.slug}`, lang)), title, hint, note, meta } : { href: l.path, title, hint, note, meta }
})

// /materials/ — только группы: раздел и что в нём. Описания и ссылки на сами материалы — на странице раздела.
export function MaterialsView() {
  const { lang, t, to } = useT()
  const group = (path: string, title: string, rows: Row[]): Row => ({ to: withSlash(to(path)), title, hint: rows.map((r) => r.title).join(' · '), meta: plural(rows.length, lang, ['материал', 'материала', 'материалов'], ['item', 'items']) })
  return (
    <Page>
      <Crumbs items={[{ to: to('/'), label: t({ ru: 'Главная', en: 'Home' }) }, { label: t({ ru: 'Материалы', en: 'Materials' }) }]} />
      <h1 className="s-page-title">{t({ ru: 'Материалы', en: 'Materials' })}</h1>
      <Rows items={[
        group('/materials/games', t({ ru: 'Игры', en: 'Games' }), gameRows(lang)),
        group('/materials/interactive', t({ ru: 'Интерактивы', en: 'Interactive' }), labRows(lang)),
        group('/materials/presentations', t({ ru: 'Презентации', en: 'Presentations' }), presentationRows(lang)),
        { to: withSlash(to('/materials/glossary')), title: t({ ru: 'Глоссарий', en: 'Glossary' }), hint: TERM_SETS.map((s) => t(s.name)).join(' · '), meta: plural(ALL_TERMS.length, lang, ['термин', 'термина', 'терминов'], ['term', 'terms']) },
      ]} />
    </Page>
  )
}

export function InteractiveView() {
  const { lang, t, to } = useT()
  return (
    <Page>
      <Crumbs items={[{ to: to('/'), label: t({ ru: 'Главная', en: 'Home' }) }, { to: to('/materials'), label: t({ ru: 'Материалы', en: 'Materials' }) }, { label: t({ ru: 'Интерактивы', en: 'Interactive' }) }]} />
      <h1 className="s-page-title">{t({ ru: 'Интерактивы', en: 'Interactive' })}</h1>
      <p className="s-lead">{t({ ru: 'Открываются прямо в браузере, без установки.', en: 'Open right in the browser, no installation.' })}</p>
      <Rows items={labRows(lang)} />
    </Page>
  )
}

export function PresentationsView() {
  const { lang, t, to } = useT()
  return (
    <Page>
      <Crumbs items={[{ to: to('/'), label: t({ ru: 'Главная', en: 'Home' }) }, { to: to('/materials'), label: t({ ru: 'Материалы', en: 'Materials' }) }, { label: t({ ru: 'Презентации', en: 'Presentations' }) }]} />
      <h1 className="s-page-title">{t({ ru: 'Презентации', en: 'Presentations' })}</h1>
      <Rows items={presentationRows(lang)} />
    </Page>
  )
}

export function GamesView() {
  const { lang, t, to } = useT()
  return (
    <Page className="s-wide">
      <Crumbs items={[{ to: to('/'), label: t({ ru: 'Главная', en: 'Home' }) }, { to: to('/materials'), label: t({ ru: 'Материалы', en: 'Materials' }) }, { label: t({ ru: 'Игры', en: 'Games' }) }]} />
      <h1 className="s-page-title">{t({ ru: 'Игры', en: 'Games' })}</h1>
      <p className="s-lead">{t({ ru: 'Играть можно прямо в браузере, без установки.', en: 'Play right in the browser, no installation.' })}</p>
      <ul className="g-tiles">
        {GAMES.map((g) => {
          const lp = gamePageByPlay(g.path)
          const title = tr({ ru: g.title, en: g.titleEn }, lang)
          const href = lp ? withSlash(localHref(`/materials/games/${lp.slug}`, lang)) : g.path
          const shot = lp?.shots[0]
          return (
            <li key={g.path}>
              <Link to={href} className="g-tile">
                {lp && shot && <img src={`/games/${lp.slug}/${shot.file}`} alt={t(shot.alt)} width={shot.w} height={shot.h} loading="lazy" decoding="async" />}
                <span className="g-tile-body">
                  {lp && <small>{t(lp.genre)}</small>}
                  <b>{lp ? t(lp.name) : title}</b>
                  <span>{lp ? t(lp.tagline) : (tr({ ru: g.long, en: g.longEn }, lang))}</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </Page>
  )
}
