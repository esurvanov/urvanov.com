import { useNavigate } from 'react-router-dom'

const PRINCIPLES = [
  {
    title: 'Открытость — это подарок',
    text: 'Чаты, встречи и доступ к сети открыты всем. Ничего не нужно отдавать взамен, и мы не ведём счёт.',
  },
  {
    title: 'Доверие не скопировать',
    text: 'Бот, чат и юрлицо получатся у любого. Годы, за которые люди привыкли доверять друг другу, никто не соберёт за выходные.',
  },
  {
    title: 'Комьюнити не продаётся',
    text: 'В чатах нет рекламы и спонсоров. Зарабатываем рядом: на найме и консультациях.',
  },
  {
    title: 'Люди важнее алгоритма',
    text: 'Само слово пришло из тайского «jai», сердце. Поэтому мы стараемся говорить «познакомить», а «автоматизировать» оставляем другим.',
  },
  {
    title: 'Первый доллар важнее новой функции',
    text: 'Пока нет первого заработка, делаем то, что к нему ведёт. Остальное подождёт, даже если очень хочется.',
  },
]

const EXAMPLES = [
  { title: 'Работа', text: 'Кандидат и работодатель сначала знакомятся на встрече, и только потом обсуждают условия.' },
  { title: 'Грузия', text: 'Налоги и ВНЖ: разбираем вместе с тем, кто уже прошёл этот путь.' },
  { title: 'Соавтор', text: 'Есть идея, но нужен второй человек: находим его среди тех, кто уже пришёл на встречу.' },
]

export default function JaioraView() {
  const navigate = useNavigate()

  return (
    <div className="home-page jaiora-page">
      <button className="jaiora-back" onClick={() => navigate('/')}>
        ← На главную
      </button>

      <header className="home-hero">
        <h1 className="home-name">Jaiora</h1>
        <p className="home-role">Оффлайн-LinkedIn</p>
        <p className="jaiora-lead">
          В LinkedIn найти можно кого угодно, но написать незнакомому человеку и дождаться ответа — отдельное приключение. Мы
          начинаем с другого конца: сводим людей вживую, за одним столом, а разговор о делах приходит сам.
        </p>
      </header>

      <section className="jaiora-flow" aria-label="Как это работает">
        <div className="jaiora-step">
          <span className="jaiora-step-title">Ты</span>
          <span className="jaiora-step-text">приходишь со своей задачей</span>
        </div>
        <span className="jaiora-arrow" aria-hidden="true">→</span>
        <div className="jaiora-step jaiora-step-main">
          <span className="jaiora-step-title">Площадка</span>
          <span className="jaiora-step-text">чаты, конференции, встречи: всё, где люди уже разговаривают</span>
        </div>
        <span className="jaiora-arrow" aria-hidden="true">→</span>
        <div className="jaiora-step">
          <span className="jaiora-step-title">Встреча</span>
          <span className="jaiora-step-text">с тем, кто нужен, вживую</span>
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
        <h2 className="jaiora-h2">На чём всё держится</h2>
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
