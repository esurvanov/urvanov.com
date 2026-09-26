import { useNavigate } from 'react-router-dom'
import { config } from '@/data/config'
import { CITY_CHATS, JAIORA_YOUTUBE, THEME_CHATS } from '@/data/links'

const STORY = [
  { title: 'Бангкок, 2022', text: 'Я решил путешествовать и уехал в Бангкок. Мне не хватало живого общения, и я стал собирать людей вместе, лицом к лицу.' },
  { title: 'Гипотеза', text: 'При переезде человек получает социальные блага на новом месте, если его там кто-то встречает.' },
  { title: 'Работа и бренд', text: 'Сообщество принесло мне работу и имя в профессии.' },
  {
    title: 'Кипр',
    text: 'Ко мне подошёл незнакомец: «Мой друг тебя знает». Ни его, ни друга я не знал, а сообщества на Кипре у меня нет.',
  },
  { title: 'Другие города', text: 'Я сомневался, нужно ли это там, где не экспаты. Москва и Питер показали: нужно.' },
  { title: 'Переезды', text: 'Люди ездят из города в город, и вот мы в Батуми сидим с ребятами из Бангкока.' },
]

const FIND = [
  { title: 'Социализация', text: 'прийти в новый город и сразу оказаться среди своих' },
  { title: 'Найм', text: 'человека в команду или команду для себя' },
  { title: 'Инвесторы', text: 'люди с деньгами и проекты, которым они нужны' },
  { title: 'Контакт', text: 'выйти на нужного человека под задачу' },
  { title: 'Переезды', text: 'на новом месте встретят, подскажут, познакомят' },
]

interface Tile {
  title: string
  text: string
  url?: string
}

const PLATFORM: Tile[] = [
  { title: 'Встречи', text: 'вживую, регулярно, в городах' },
  { title: 'Конференции', text: 'специалисты и идеи в одном зале' },
  { title: 'YouTube', text: 'записи и разборы', url: JAIORA_YOUTUBE },
]

const SERVICES: Tile[] = [
  { title: 'Агент-кодинг', text: 'чат и разборы про разработку с ИИ-агентами', url: 'https://t.me/agent_coding' },
  { title: 'ПТД и ВНЖ', text: 'гайд и консультации по легализации в Грузии', url: 'https://t.me/ptd_vnzh_georgia' },
  { title: 'Развитие бизнеса', text: 'продукт, процессы, операционка' },
  { title: 'Задачи общего плана', text: 'приходи с задачей, найдём человека или решим вместе' },
]

const PRINCIPLES = [
  { title: 'Открытость — подарок', text: 'бесплатно и без обязательств' },
  { title: 'Доверие не скопировать', text: 'годы не собрать за выходные' },
  { title: 'Комьюнити не продаётся', text: 'без рекламы и спонсоров' },
  { title: 'Люди важнее алгоритма', text: '«jai» по-тайски — сердце' },
  { title: 'Первый доллар важнее функции', text: 'сначала заработок, потом фичи' },
]

function Tiles({ items }: { items: Tile[] }) {
  return (
    <div className="jaiora-grid">
      {items.map((t) => {
        const body = (
          <>
            <span className="jaiora-card-title">{t.title}</span>
            <span className="home-metric-label">{t.text}</span>
          </>
        )
        return t.url ? (
          <a key={t.title} className="home-metric jaiora-card-link" href={t.url} target="_blank" rel="noopener noreferrer">
            {body}
          </a>
        ) : (
          <div key={t.title} className="home-metric">
            {body}
          </div>
        )
      })}
    </div>
  )
}

function Chips({ items }: { items: { url: string; label: string }[] }) {
  return (
    <div className="home-contacts">
      {items.map((c) => (
        <a key={c.url} className="home-contact" href={c.url} target="_blank" rel="noopener noreferrer">
          {c.label}
        </a>
      ))}
    </div>
  )
}

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
          <p className="jaiora-lead">Чтобы у каждого был доступ к нужным людям здесь и сейчас.</p>
        </div>
      </header>

      <section className="jaiora-section">
        <h2 className="jaiora-h2">Как всё началось</h2>
        <ol className="jaiora-story">
          {STORY.map((s) => (
            <li key={s.title} className="jaiora-story-item">
              <span className="jaiora-story-title">{s.title}</span>
              <span className="jaiora-story-text">{s.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="jaiora-section">
        <h2 className="jaiora-h2">Что можно найти</h2>
        <Tiles items={FIND} />
      </section>

      <section className="jaiora-section">
        <h2 className="jaiora-h2">Что у нас есть</h2>

        <h3 className="home-group-title">Площадка</h3>
        <Tiles items={PLATFORM} />
        <Chips items={CITY_CHATS} />
        <Chips items={THEME_CHATS} />

        <h3 className="home-group-title jaiora-sub">Услуги</h3>
        <Tiles items={SERVICES} />
      </section>

      <details className="jaiora-details">
        <summary className="jaiora-h2 jaiora-summary">На чём держится</summary>
        <div className="jaiora-grid">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="home-metric">
              <span className="jaiora-card-title">{p.title}</span>
              <span className="home-metric-label">{p.text}</span>
            </div>
          ))}
        </div>
      </details>

      <section className="home-contacts">
        <a className="home-contact" href="https://t.me/eurvanov" target="_blank" rel="noopener noreferrer">
          Написать в Telegram
        </a>
      </section>
    </div>
  )
}
