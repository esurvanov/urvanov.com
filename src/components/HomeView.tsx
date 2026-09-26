import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { config } from '@/data/config'
import { POSTS } from '@/data/blog'
import { ICONS } from '@/components/site/icons'
import Page from '@/components/site/Page'

const CONTACTS = [
  { label: 'Telegram', icon: ICONS.telegram, url: 'https://t.me/eurvanov' },
  { label: 'LinkedIn', icon: ICONS.linkedin, url: 'https://www.linkedin.com/in/eurvanov/' },
  { label: 'GitHub', icon: ICONS.github, url: 'https://github.com/esurvanov/' },
  { label: 'GetMentor', icon: ICONS.mentor, url: 'https://getmentor.dev/mentor/egor-urvanov-1077' },
]

export default function HomeView() {
  useEffect(() => {
    try {
      sessionStorage.removeItem('lastSlide')
    } catch {
      /* без sessionStorage просто идём дальше */
    }
  }, [])

  return (
    <Page>
      <header className="s-hero">
        <div>
          <p className="s-eyebrow"><b>CTO</b> · AI · нетворк</p>
          <h1 className="s-name">{config.speaker}</h1>
          <ul className="s-pills" aria-label="Контакты">
            {CONTACTS.map((c) => (
              <li key={c.label}>
                <a className="s-pill s-icon-btn" href={c.url} target="_blank" rel="me noopener noreferrer" aria-label={c.label} title={c.label}>
                  {c.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <img className="s-avatar" src="/egor.jpg" alt={config.speaker} width="148" height="148" fetchPriority="high" />
      </header>

      <section className="s-section" aria-label="Разделы">
        <div className="s-bento">
          <Link className="s-card s-feature s-feature-jaiora s-span-12" to="/jaiora">
            <span className="s-arrow" aria-hidden="true">↗</span>
            <img className="s-feature-logo" src="/jaiora/logo.svg" alt="" width="48" height="48" />
            <h2 className="s-card-title">Jaiora</h2>
            <span className="s-card-text">Оффлайн-LinkedIn: находим человека под твою задачу или цель и знакомим вживую</span>
          </Link>
          <Link className="s-card s-span-4" to="/about">
            <span className="s-card-icon">{ICONS.mentor}</span>
            <h2 className="s-card-title">Обо мне</h2>
            <span className="s-card-text">CTO · ML · ментор №1</span>
          </Link>
          <Link className="s-card s-span-4" to="/blog">
            <span className="s-card-icon">{ICONS.patterns}</span>
            <h2 className="s-card-title">Блог</h2>
            <span className="s-card-text">{POSTS.length > 0 ? `${POSTS.length} постов` : 'Скоро'}</span>
          </Link>
          <Link className="s-card s-span-4" to="/links">
            <span className="s-card-icon">{ICONS.links}</span>
            <h2 className="s-card-title">Ссылки</h2>
            <span className="s-card-text">Профили · выступления · чаты</span>
          </Link>
          <Link className="s-card s-span-6" to="/materials/presentations">
            <span className="s-card-icon">{ICONS.talk}</span>
            <h2 className="s-card-title">Презентации</h2>
            <span className="s-card-text">Доклад про SDD · каталог AI-паттернов</span>
          </Link>
          <Link className="s-card s-span-6" to="/materials/games">
            <span className="s-card-icon">{ICONS.game}</span>
            <h2 className="s-card-title">Игры</h2>
            <span className="s-card-text">Три игры в браузере</span>
          </Link>
        </div>
      </section>
    </Page>
  )
}
