import { Link } from 'react-router-dom'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'
import { GAMES, LABS } from '@/data/seo'
import { PATTERN_CATEGORIES } from '@/data/patterns'
import { config } from '@/data/config'
import { useT, withLang, withSlash } from '@/lib/i18n'
import { gamePageByPlay } from '@/data/games'
import { LAB_PAGES } from '@/data/labs'
import { TextLink } from '@/components/site/Links'
import { plural } from '@/lib/plural'

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
const presentationRows = (lang: 'ru' | 'en'): Row[] => [
  { meta: lang === 'en' ? 'Talk' : 'Доклад', to: '/talk/spec-driven-development/', title: lang === 'en' ? config.talkTitleEn : config.talkTitle, hint: lang === 'en' ? `${config.conferenceName} · full talk text (in Russian)` : `${config.conferenceName} · текст доклада целиком` },
  { meta: lang === 'en' ? 'Slides' : 'Слайды', to: '/slide/1/', title: lang === 'en' ? 'Open the slide deck' : 'Открыть презентацию', hint: lang === 'en' ? 'Slides in the browser (in Russian)' : 'Слайды в браузере' },
  { meta: lang === 'en' ? 'Catalog' : 'Каталог', to: '/patterns/', title: lang === 'en' ? 'AI patterns catalog' : 'Каталог AI-паттернов', hint: lang === 'en' ? `${patternsTotal} patterns · ${PATTERN_CATEGORIES.length} categories (in Russian)` : `${patternsTotal} паттернов · ${PATTERN_CATEGORIES.length} категорий` },
]

const gameRows = (lang: 'ru' | 'en'): Row[] => GAMES.map((g) => {
  const lp = gamePageByPlay(g.path)
  const title = lang === 'en' ? g.titleEn : g.title, hint = lang === 'en' ? g.longEn : g.long
  // страница игры (описание, скриншоты, управление, ссылка на игру) — единственная ссылка; индексируется она, а не холст игры
  return lp
    ? { to: withSlash(withLang(`/materials/games/${lp.slug}`, lang)), title, hint, meta: lp.genre[lang] }
    : { href: g.path, title, hint }
})
const labRows = (lang: 'ru' | 'en'): Row[] => LABS.map((l) => {
  const lp = LAB_PAGES.find((x) => x.play === l.path)
  const title = lang === 'en' ? l.titleEn : l.title, hint = lang === 'en' ? l.longEn : l.long
  const note = { text: l.source[lang], links: l.source.links.map((x) => ({ href: x.href, label: x[lang] })) }
  // страница интерактива (описание для поиска) — основная ссылка; сам интерактив открывается оттуда
  const meta = lang === 'en' ? 'Interactive' : 'Интерактив'
  return lp ? { to: withSlash(withLang(`/materials/interactive/${lp.slug}`, lang)), title, hint, note, meta } : { href: l.path, title, hint, note, meta }
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
          const title = lang === 'en' ? g.titleEn : g.title
          const href = lp ? withSlash(withLang(`/materials/games/${lp.slug}`, lang)) : g.path
          const shot = lp?.shots[0]
          return (
            <li key={g.path}>
              <Link to={href} className="g-tile">
                {lp && shot && <img src={`/games/${lp.slug}/${shot.file}`} alt={t(shot.alt)} width={shot.w} height={shot.h} loading="lazy" decoding="async" />}
                <span className="g-tile-body">
                  {lp && <small>{t(lp.genre)}</small>}
                  <b>{lp ? t(lp.name) : title}</b>
                  <span>{lp ? t(lp.tagline) : (lang === 'en' ? g.longEn : g.long)}</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </Page>
  )
}
