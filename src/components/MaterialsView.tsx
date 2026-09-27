import { Link } from 'react-router-dom'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'
import { GAMES, LABS } from '@/data/seo'
import { PATTERN_CATEGORIES } from '@/data/patterns'
import { config } from '@/data/config'
import { useT } from '@/lib/i18n'

const patternsTotal = PATTERN_CATEGORIES.reduce((s, c) => s + c.patterns.length, 0)

interface Row { to?: string; href?: string; title: string; hint: string }

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

const gameRows = (lang: 'ru' | 'en'): Row[] => GAMES.map((g) => ({ href: g.path, title: lang === 'en' ? g.titleEn : g.title, hint: lang === 'en' ? g.longEn : g.long }))
const labRows = (lang: 'ru' | 'en'): Row[] => LABS.map((l) => ({ href: l.path, title: lang === 'en' ? l.titleEn : l.title, hint: lang === 'en' ? l.longEn : l.long }))

export function MaterialsView() {
  const { lang, t, to } = useT()
  return (
    <Page>
      <Crumbs items={[{ to: to('/'), label: t({ ru: 'Главная', en: 'Home' }) }, { label: t({ ru: 'Материалы', en: 'Materials' }) }]} />
      <h1 className="s-page-title">{t({ ru: 'Материалы', en: 'Materials' })}</h1>
      <section className="s-section" aria-labelledby="m-pres">
        <h2 className="s-label" id="m-pres"><Link to={to('/materials/presentations')}>{t({ ru: 'Презентации', en: 'Presentations' })}</Link></h2>
        <Rows items={presentationRows(lang)} />
      </section>
      <section className="s-section" aria-labelledby="m-labs">
        <h2 className="s-label" id="m-labs">{t({ ru: 'Интерактивы', en: 'Interactive' })}</h2>
        <Rows items={labRows(lang)} />
      </section>
      <section className="s-section" aria-labelledby="m-games">
        <h2 className="s-label" id="m-games"><Link to={to('/materials/games')}>{t({ ru: 'Игры', en: 'Games' })}</Link></h2>
        <Rows items={gameRows(lang)} />
      </section>
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
