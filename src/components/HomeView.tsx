import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATTERN_CATEGORIES } from '@/data/patterns'
import { config } from '@/data/config'

const METRICS = [
  { icon: '🏢', value: '10', label: 'компаний' },
  { icon: '🎙', value: '35', label: 'интервью' },
  { icon: '🎓', value: '1500+', label: 'часов менторинга' },
  { icon: '⭐', value: '10 256', label: 'репутация SO' },
]

const CONTACTS = [
  { icon: '✈️', label: 'Telegram', url: 'https://t.me/eurvanov' },
  { icon: '💼', label: 'LinkedIn', url: 'https://www.linkedin.com/in/eurvanov/' },
  { icon: '🐙', label: 'GitHub', url: 'http://github.com/hedgehogues/' },
  { icon: '🧭', label: 'GetMentor', url: 'https://getmentor.dev/mentor/egor-urvanov-1077' },
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
    <div className="home-page">
      <header className="home-hero">
        <h1 className="home-name">{config.speaker}</h1>
        <p className="home-role">CTO · AI · ментор</p>
      </header>

      <section className="home-metrics">
        {METRICS.map((m) => (
          <div key={m.label} className="home-metric">
            <span className="home-metric-icon">{m.icon}</span>
            <span className="home-metric-value">{m.value}</span>
            <span className="home-metric-label">{m.label}</span>
          </div>
        ))}
      </section>

      <section className="home-cards">
        <button className="home-card" onClick={() => navigate('/patterns')}>
          <span className="home-card-icon">📚</span>
          <span className="home-card-title">Каталог паттернов</span>
          <span className="home-card-meta">
            {patternsTotal} паттернов · {PATTERN_CATEGORIES.length} категорий
          </span>
        </button>
        <button className="home-card" onClick={() => navigate('/slide/1')}>
          <span className="home-card-icon">🎤</span>
          <span className="home-card-title">Презентация</span>
          <span className="home-card-meta">
            {config.conferenceName} · {config.talkTitle}
          </span>
        </button>
      </section>

      <section className="home-contacts">
        {CONTACTS.map((c) => (
          <a key={c.label} className="home-contact" href={c.url} target="_blank" rel="noopener noreferrer">
            <span>{c.icon}</span> {c.label}
          </a>
        ))}
        <button className="home-contact" onClick={() => navigate('/links')}>
          <span>🔗</span> Все ссылки
        </button>
      </section>
    </div>
  )
}
