import { useNavigate } from 'react-router-dom'
import { config } from '@/data/config'
import { CITY_CHATS } from '@/data/links'

const EXAMPLES = [
  { title: 'Работа', text: 'знакомство до собеседования' },
  { title: 'Грузия', text: 'налоги и ВНЖ от тех, кто прошёл' },
  { title: 'Соавтор', text: 'второй человек для идеи' },
]

const PRINCIPLES = [
  { title: 'Открытость — подарок', text: 'бесплатно и без обязательств' },
  { title: 'Доверие не скопировать', text: 'годы не собрать за выходные' },
  { title: 'Комьюнити не продаётся', text: 'без рекламы и спонсоров' },
  { title: 'Люди важнее алгоритма', text: '«jai» по-тайски — сердце' },
  { title: 'Первый доллар важнее функции', text: 'сначала заработок, потом фичи' },
]

export default function JaioraView() {
  const navigate = useNavigate()

  return (
    <div className="home-page jaiora-page">
      <button className="jaiora-back" onClick={() => navigate('/')}>
        ← На главную
      </button>

      <header className="jaiora-hero">
        <img className="jaiora-photo" src="/egor.jpg" alt={config.speaker} width="96" height="96" />
        <div>
          <p className="jaiora-kicker">Jaiora · оффлайн-LinkedIn</p>
          <h1 className="jaiora-title">Нужный человек существует. Осталось оказаться с ним в одной комнате.</h1>
          <p className="jaiora-lead">Любая задача решается, если рядом оказывается правильный человек. Мы устраиваем такие встречи.</p>
        </div>
      </header>

      <section className="jaiora-flow" aria-label="Как это работает">
        <div className="jaiora-step">
          <span className="jaiora-step-title">Ты</span>
          <span className="jaiora-step-text">со своей задачей</span>
        </div>
        <span className="jaiora-arrow" aria-hidden="true">→</span>
        <div className="jaiora-step jaiora-step-main">
          <span className="jaiora-step-title">Площадка</span>
          <span className="jaiora-step-text">чаты · встречи · конференции</span>
        </div>
        <span className="jaiora-arrow" aria-hidden="true">→</span>
        <div className="jaiora-step">
          <span className="jaiora-step-title">Знакомство</span>
          <span className="jaiora-step-text">вживую, с нужным человеком</span>
        </div>
      </section>

      <section className="jaiora-section">
        <h2 className="jaiora-h2">Что можно найти</h2>
        <div className="jaiora-grid">
          {EXAMPLES.map((e) => (
            <div key={e.title} className="home-metric">
              <span className="jaiora-card-title">{e.title}</span>
              <span className="home-metric-label">{e.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="jaiora-section">
        <h2 className="jaiora-h2">Чаты по городам</h2>
        <div className="home-contacts">
          {CITY_CHATS.map((c) => (
            <a key={c.url} className="home-contact" href={c.url} target="_blank" rel="noopener noreferrer">
              {c.label}
            </a>
          ))}
        </div>
      </section>

      <section className="jaiora-section">
        <h2 className="jaiora-h2">На чём держится</h2>
        <div className="jaiora-grid">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="home-metric">
              <span className="jaiora-card-title">{p.title}</span>
              <span className="home-metric-label">{p.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="home-contacts">
        <a className="home-contact" href="https://t.me/eurvanov" target="_blank" rel="noopener noreferrer">
          Написать в Telegram
        </a>
      </section>
    </div>
  )
}
