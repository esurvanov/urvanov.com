import { Link } from 'react-router-dom'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'
import { GAMES, LABS } from '@/data/seo'
import { PATTERN_CATEGORIES } from '@/data/patterns'
import { config } from '@/data/config'
import { useT, withLang, withSlash } from '@/lib/i18n'
import { gamePageByPlay } from '@/data/games'
import { LAB_PAGES } from '@/data/labs'

const patternsTotal = PATTERN_CATEGORIES.reduce((s, c) => s + c.patterns.length, 0)

interface Row { to?: string; href?: string; title: string; hint: string; note?: { text: string; links: { href: string; label: string }[] } }

function Rows({ items }: { items: Row[] }) {
  return (
    <ol className="s-index s-index-desc">
      {items.map((r, i) => (
        <li key={r.title}>
          {r.to ? (
            <Link to={r.to}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <span className="t">{r.title}</span>
              <span className="ar" aria-hidden="true">→</span>
              <span className="h">{r.hint}</span>
            </Link>
          ) : (
            <a href={r.href}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <span className="t">{r.title}</span>
              <span className="ar" aria-hidden="true">→</span>
              <span className="h">{r.hint}</span>
            </a>
          )}
          {r.note && (
            <p className="s-index-note">
              {r.note.text}:{' '}
              {r.note.links.map((l, j) => (
                <span key={l.href}>{j > 0 && ' · '}<a href={l.href} target="_blank" rel="noopener">{l.label}</a></span>
              ))}
            </p>
          )}
        </li>
      ))}
    </ol>
  )
}

// Слайды и каталог паттернов только на русском: ссылки ведут на русские адреса
const presentationRows = (lang: 'ru' | 'en'): Row[] => [
  { to: '/talk/spec-driven-development/', title: lang === 'en' ? config.talkTitleEn : config.talkTitle, hint: lang === 'en' ? `${config.conferenceName} · full talk text (in Russian)` : `${config.conferenceName} · текст доклада целиком` },
  { to: '/slide/1/', title: lang === 'en' ? 'Open the slide deck' : 'Открыть презентацию', hint: lang === 'en' ? 'Slides in the browser (in Russian)' : 'Слайды в браузере' },
  { to: '/patterns/', title: lang === 'en' ? 'AI patterns catalog' : 'Каталог AI-паттернов', hint: lang === 'en' ? `${patternsTotal} patterns · ${PATTERN_CATEGORIES.length} categories (in Russian)` : `${patternsTotal} паттернов · ${PATTERN_CATEGORIES.length} категорий` },
]

const gameRows = (lang: 'ru' | 'en'): Row[] => GAMES.map((g) => {
  const lp = gamePageByPlay(g.path)
  const title = lang === 'en' ? g.titleEn : g.title, hint = lang === 'en' ? g.longEn : g.long
  // страница игры (описание, скриншоты, управление, ссылка на игру) — единственная ссылка; индексируется она, а не холст игры
  return lp
    ? { to: withSlash(withLang(`/materials/games/${lp.slug}`, lang)), title, hint }
    : { href: g.path, title, hint }
})
const labRows = (lang: 'ru' | 'en'): Row[] => LABS.map((l) => {
  const lp = LAB_PAGES.find((x) => x.play === l.path)
  const title = lang === 'en' ? l.titleEn : l.title, hint = lang === 'en' ? l.longEn : l.long
  const note = { text: l.source[lang], links: l.source.links.map((x) => ({ href: x.href, label: x[lang] })) }
  // страница интерактива (описание для поиска) — основная ссылка; сам интерактив открывается оттуда
  return lp ? { to: withSlash(withLang(`/materials/interactive/${lp.slug}`, lang)), title, hint, note } : { href: l.path, title, hint, note }
})

// /materials/ — только группы: раздел, сколько в нём, названия внутри. Описания и ссылки на сами материалы — на странице раздела.
export function MaterialsView() {
  const { lang, t, to } = useT()
  const groups = [
    { path: '/materials/games', label: t({ ru: 'Игры', en: 'Games' }), hint: t({ ru: 'в браузере, без установки', en: 'in the browser, no install' }), names: gameRows(lang).map((r) => r.title) },
    { path: '/materials/interactive', label: t({ ru: 'Интерактивы', en: 'Interactive' }), hint: t({ ru: 'приёмы решения задач в 3D', en: 'problem-solving methods in 3D' }), names: labRows(lang).map((r) => r.title) },
    { path: '/materials/presentations', label: t({ ru: 'Презентации', en: 'Presentations' }), hint: t({ ru: 'доклад, слайды, каталог паттернов', en: 'talk, slides, patterns catalog' }), names: presentationRows(lang).map((r) => r.title) },
  ]
  return (
    <Page>
      <Crumbs items={[{ to: to('/'), label: t({ ru: 'Главная', en: 'Home' }) }, { label: t({ ru: 'Материалы', en: 'Materials' }) }]} />
      <h1 className="s-page-title">{t({ ru: 'Материалы', en: 'Materials' })}</h1>
      <nav aria-label={t({ ru: 'Разделы материалов', en: 'Materials sections' })} className="m-groups">
        {groups.map((x) => (
          <Link key={x.path} to={withSlash(to(x.path))} className="m-group">
            <span className="m-g-head"><b>{x.label}</b><span className="m-g-n">{x.names.length}</span></span>
            <span className="m-g-hint">{x.hint}</span>
            <span className="m-g-names">{x.names.join(' · ')}</span>
            <span className="ar" aria-hidden="true">→</span>
          </Link>
        ))}
      </nav>
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
    <Page>
      <Crumbs items={[{ to: to('/'), label: t({ ru: 'Главная', en: 'Home' }) }, { to: to('/materials'), label: t({ ru: 'Материалы', en: 'Materials' }) }, { label: t({ ru: 'Игры', en: 'Games' }) }]} />
      <h1 className="s-page-title">{t({ ru: 'Игры', en: 'Games' })}</h1>
      <p className="s-lead">{t({ ru: 'Играть можно прямо в браузере, без установки.', en: 'Play right in the browser, no installation.' })}</p>
      <Rows items={gameRows(lang)} />
    </Page>
  )
}
