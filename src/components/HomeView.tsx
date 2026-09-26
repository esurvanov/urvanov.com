import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATTERN_CATEGORIES } from '@/data/patterns'
import { config } from '@/data/config'
import type { ReactNode } from 'react'

// Однотонные линейные значки (stroke = currentColor), 24×24
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const ICONS = {
  company: (
    <Icon>
      <path d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M14 9h5a1 1 0 0 1 1 1v11M2 21h20M8 8h2M8 12h2M8 16h2" />
    </Icon>
  ),
  interview: (
    <Icon>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </Icon>
  ),
  mentor: (
    <Icon>
      <path d="M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" />
    </Icon>
  ),
  trophy: (
    <Icon>
      <path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v1a3 3 0 0 0 4 2.8M16 6h4v1a3 3 0 0 1-4 2.8M12 13v4M8 21h8M10 17h4" />
    </Icon>
  ),
  paper: (
    <Icon>
      <path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7" />
    </Icon>
  ),
  rep: (
    <Icon>
      <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
    </Icon>
  ),
  patterns: (
    <Icon>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19a2 2 0 0 1 2-2h13M9 7h6" />
    </Icon>
  ),
  game: (
    <Icon>
      <path d="M6 8h12a4 4 0 0 1 4 4v3a3 3 0 0 1-5.2 2L15 15H9l-1.8 2A3 3 0 0 1 2 15v-3a4 4 0 0 1 4-4zM7 11v3M5.5 12.5h3M16 11.5h.01M18 13.5h.01" />
    </Icon>
  ),
  jaiora: (
    <Icon>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
    </Icon>
  ),
  taiga: (
    <Icon>
      <path d="M12 3l4 6h-2.5l3.5 5h-3l3 5H7l3-5H7l3.5-5H8zM12 19v3" />
    </Icon>
  ),
  talk: (
    <Icon>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 21l4-5 4 5M12 16v0" />
    </Icon>
  ),
}

const METRICS = [
  { icon: ICONS.company, value: '10', label: 'компаний' },
  { icon: ICONS.interview, value: '35', label: 'интервью' },
  { icon: ICONS.mentor, value: '1500+', label: 'часов менторинга' },
  { icon: ICONS.rep, value: '10 256', label: 'репутация SO' },
  { icon: ICONS.trophy, value: '#6', label: 'из 256 000 · Project Euler' },
  { icon: ICONS.paper, value: 'NeurIPS', label: 'статья про кубик Рубика' },
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
    <div className="home-page">
      <header className="home-hero">
        <h1 className="home-name">{config.speaker}</h1>
        <p className="home-role">CTO · AI · нетворк</p>
        <div className="home-contacts home-contacts-hero">
        {CONTACTS.map((c) => (
          <a key={c.label} className="home-contact" href={c.url} target="_blank" rel="noopener noreferrer">
            {c.label}
          </a>
        ))}
        <button className="home-contact" onClick={() => navigate('/links')}>
          Все ссылки
        </button>
        </div>
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
        <button className="home-card home-card-wide" onClick={() => navigate('/jaiora')}>
          <span className="home-card-icon">{ICONS.jaiora}</span>
          <span className="home-card-title">Jaiora</span>
          <span className="home-card-meta">Оффлайн-LinkedIn: находим нужного человека и сводим вживую</span>
        </button>
      </section>

      <section className="home-group">
        <h2 className="home-group-title">Материалы</h2>
        <div className="home-cards">
          <button className="home-card" onClick={() => navigate('/patterns')}>
            <span className="home-card-icon">{ICONS.patterns}</span>
            <span className="home-card-title">Каталог паттернов</span>
            <span className="home-card-meta">
              {patternsTotal} паттернов · {PATTERN_CATEGORIES.length} категорий
            </span>
          </button>
          <button className="home-card" onClick={() => navigate('/slide/1')}>
            <span className="home-card-icon">{ICONS.talk}</span>
            <span className="home-card-title">Презентация</span>
            <span className="home-card-meta">
              {config.conferenceName} · {config.talkTitle}
            </span>
          </button>
        </div>
      </section>

      <section className="home-group">
        <h2 className="home-group-title">Игры</h2>
        <div className="home-cards">
          <a className="home-card" href="/berezovka/">
            <span className="home-card-icon">{ICONS.game}</span>
            <span className="home-card-title">Березовка</span>
            <span className="home-card-meta">3D-игра в браузере · заснеженная деревня</span>
          </a>
          <a className="home-card" href="/sibiria/">
            <span className="home-card-icon">{ICONS.taiga}</span>
            <span className="home-card-title">Сибирь</span>
            <span className="home-card-meta">2D-выживание · тайга, 1993</span>
          </a>
        </div>
      </section>
    </div>
  )
}
