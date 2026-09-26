import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATTERN_CATEGORIES } from '@/data/patterns'
import { config } from '@/data/config'
import { ICONS } from '@/components/site/icons'

const STATS = [
  { value: '1500+', label: 'часов менторинга' },
  { value: '10 256', label: 'репутация на SO' },
  { value: '#6', label: 'из 256 000 · Project Euler' },
]

const CONTACTS = [
  { label: 'Telegram', url: 'https://t.me/eurvanov' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/eurvanov/' },
  { label: 'GitHub', url: 'https://github.com/esurvanov/' },
  { label: 'GetMentor', url: 'https://getmentor.dev/mentor/egor-urvanov-1077' },
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
                <a key={c.label} className="s-pill" href={c.url} target="_blank" rel="noopener noreferrer">
                  {c.label}
                </a>
              ))}
              <button className="s-pill s-pill-solid" onClick={() => navigate('/links')}>
                Все ссылки →
              </button>
            </nav>
          </div>
          <img className="s-avatar" src="/egor.jpg" alt={config.speaker} width="148" height="148" />
        </header>

        <ul className="s-stats">
          {STATS.map((s) => (
            <li key={s.label} className="s-stat">
              <b>{s.value}</b>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>

        <section className="s-section">
          <h2 className="s-label">Проект</h2>
          <div className="s-bento">
            <button className="s-card s-feature s-span-12 s-tint-coral" onClick={() => navigate('/jaiora')}>
              <span className="s-arrow" aria-hidden="true">↗</span>
              <span className="s-card-icon">{ICONS.jaiora}</span>
              <span className="s-card-title">Jaiora</span>
              <span className="s-card-text">Оффлайн-LinkedIn. История про новый мир, где оффлайн важнее онлайна</span>
            </button>
          </div>
        </section>

        <section className="s-section">
          <h2 className="s-label">Материалы</h2>
          <div className="s-bento">
            <button className="s-card s-span-6 s-tint-amber" onClick={() => navigate('/patterns')}>
              <span className="s-card-icon">{ICONS.patterns}</span>
              <span className="s-card-title">Каталог паттернов</span>
              <span className="s-card-text">
                {patternsTotal} паттернов · {PATTERN_CATEGORIES.length} категорий
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
            <a className="s-card s-span-6 s-tint-mint" href="/berezovka/">
              <span className="s-card-icon">{ICONS.game}</span>
              <span className="s-card-title">Березовка</span>
              <span className="s-card-text">3D-игра в браузере · заснеженная деревня</span>
            </a>
            <a className="s-card s-span-6 s-tint-amber" href="/sibiria/">
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
