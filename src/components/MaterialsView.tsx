import { Link } from 'react-router-dom'
import { ICONS } from '@/components/site/icons'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'
import { GAMES } from '@/data/seo'
import { PATTERN_CATEGORIES } from '@/data/patterns'
import { config } from '@/data/config'

const patternsTotal = PATTERN_CATEGORIES.reduce((s, c) => s + c.patterns.length, 0)

export function PresentationCards() {
  return (
    <div className="s-bento">
      <Link className="s-card s-span-6" to="/patterns">
        <span className="s-card-icon">{ICONS.patterns}</span>
        <h3 className="s-card-title">Каталог AI-паттернов</h3>
        <span className="s-card-text">{patternsTotal} паттернов · {PATTERN_CATEGORIES.length} категорий</span>
      </Link>
      <Link className="s-card s-span-6" to="/slide/1">
        <span className="s-card-icon">{ICONS.talk}</span>
        <h3 className="s-card-title">Презентация</h3>
        <span className="s-card-text">{config.conferenceName} · {config.talkTitle}</span>
      </Link>
    </div>
  )
}

const GAME_ICONS = [ICONS.castle, ICONS.game, ICONS.taiga]

export function GameCards() {
  return (
    <div className="s-bento">
      {GAMES.map((g, i) => (
        <a key={g.path} className="s-card s-span-4" href={g.path}>
          <span className="s-card-icon">{GAME_ICONS[i]}</span>
          <h3 className="s-card-title">{g.title}</h3>
          <span className="s-card-text">{g.text}</span>
        </a>
      ))}
    </div>
  )
}

export function MaterialsView() {
  return (
    <Page>
      <Crumbs items={[{ to: '/', label: 'Главная' }, { label: 'Материалы' }]} />
      <h1 className="s-page-title">Материалы</h1>
      <section className="s-section" aria-labelledby="m-pres">
        <h2 className="s-label" id="m-pres"><Link to="/materials/presentations">Презентации</Link></h2>
        <PresentationCards />
      </section>
      <section className="s-section" aria-labelledby="m-games">
        <h2 className="s-label" id="m-games"><Link to="/materials/games">Игры</Link></h2>
        <GameCards />
      </section>
    </Page>
  )
}

export function PresentationsView() {
  return (
    <Page>
      <Crumbs items={[{ to: '/', label: 'Главная' }, { to: '/materials', label: 'Материалы' }, { label: 'Презентации' }]} />
      <h1 className="s-page-title">Презентации</h1>
      <PresentationCards />
    </Page>
  )
}

export function GamesView() {
  return (
    <Page>
      <Crumbs items={[{ to: '/', label: 'Главная' }, { to: '/materials', label: 'Материалы' }, { label: 'Игры' }]} />
      <h1 className="s-page-title">Игры</h1>
      <p className="s-lead">Играть можно прямо в браузере, без установки.</p>
      <GameCards />
      <ul className="s-list">
        {GAMES.map((g) => (
          <li key={g.path} className="s-row"><a href={g.path}>{g.title}</a><span>{g.long}</span></li>
        ))}
      </ul>
    </Page>
  )
}
