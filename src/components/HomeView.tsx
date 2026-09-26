import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATTERN_CATEGORIES } from '@/data/patterns'
import { config } from '@/data/config'
import { ICONS } from '@/components/site/icons'

const CONTACTS = [
  { label: 'Telegram', icon: ICONS.telegram, url: 'https://t.me/eurvanov' },
  { label: 'LinkedIn', icon: ICONS.linkedin, url: 'https://www.linkedin.com/in/eurvanov/' },
  { label: 'GitHub', icon: ICONS.github, url: 'https://github.com/esurvanov/' },
  { label: 'GetMentor', icon: ICONS.mentor, url: 'https://getmentor.dev/mentor/egor-urvanov-1077' },
]

const patternsTotal = PATTERN_CATEGORIES.reduce((sum, c) => sum + c.patterns.length, 0)

export default function HomeView() {
  const navigate = useNavigate()

  useEffect(() => {
    try {
      sessionStorage.removeItem('lastSlide')
    } catch {
      /* без sessionStorage просто идём дальше */
    }
  }, [])

  return (
    <div className="site">
      <div className="s-wrap">
        <header className="s-hero">
          <div>
            <p className="s-eyebrow">
              <b>CTO</b> · AI · нетворк
            </p>
            <h1 className="s-name">{config.speaker}</h1>
            <nav className="s-pills" aria-label="Контакты">
              {CONTACTS.map((c) => (
                <a
                  key={c.label}
                  className="s-pill s-icon-btn"
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={c.label}
                  title={c.label}
                >
                  {c.icon}
                </a>
              ))}
              <button
                className="s-pill s-pill-solid s-icon-btn"
                onClick={() => navigate('/links')}
                aria-label="Все ссылки"
                title="Все ссылки"
              >
                {ICONS.links}
              </button>
            </nav>
          </div>
          <img className="s-avatar" src="/egor.jpg" alt={config.speaker} width="148" height="148" />
        </header>

        <section className="s-section">
          <h2 className="s-label">Проект</h2>
          <div className="s-bento">
            <button className="s-card s-feature s-feature-jaiora s-span-12" onClick={() => navigate('/jaiora')}>
              <span className="s-arrow" aria-hidden="true">↗</span>
              <img className="s-feature-logo" src="/jaiora/logo.svg" alt="" width="48" height="48" />
              <span className="s-card-title">Jaiora</span>
              <span className="s-card-text">Оффлайн-LinkedIn: находим человека под твою задачу или цель и знакомим вживую</span>
            </button>
          </div>
        </section>

        <section className="s-section">
          <h2 className="s-label">Материалы</h2>
          <div className="s-bento">
            <button className="s-card s-span-6 s-tint-amber" onClick={() => navigate('/patterns')}>
              <span className="s-card-icon">{ICONS.patterns}</span>
              <span className="s-card-title">Каталог AI-паттернов</span>
              <span className="s-card-text">
                {patternsTotal} паттернов разработки с AI-агентами · {PATTERN_CATEGORIES.length} категорий
              </span>
            </button>
            <button className="s-card s-span-6 s-tint-violet" onClick={() => navigate('/slide/1')}>
              <span className="s-card-icon">{ICONS.talk}</span>
              <span className="s-card-title">Презентация</span>
              <span className="s-card-text">
                {config.conferenceName} · {config.talkTitle}
              </span>
            </button>
          </div>
        </section>

        <section className="s-section">
          <h2 className="s-label">Игры</h2>
          <div className="s-bento">
            <a className="s-card s-span-4 s-tint-coral" href="/age-of-empires/">
              <span className="s-card-icon">{ICONS.castle}</span>
              <span className="s-card-title">Хроники Королевств</span>
              <span className="s-card-text">Стратегия в духе Age of Empires II · 14 цивилизаций</span>
            </a>
            <a className="s-card s-span-4 s-tint-mint" href="/berezovka/">
              <span className="s-card-icon">{ICONS.game}</span>
              <span className="s-card-title">Березовка</span>
              <span className="s-card-text">3D-игра в браузере · заснеженная деревня</span>
            </a>
            <a className="s-card s-span-4 s-tint-amber" href="/sibiria/">
              <span className="s-card-icon">{ICONS.taiga}</span>
              <span className="s-card-title">Сибирь</span>
              <span className="s-card-text">2D-выживание · тайга, 1993</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
