import { useNavigate } from 'react-router-dom'
import { config } from '@/data/config'
import { CITY_CHATS, JAIORA_YOUTUBE, THEME_CHATS } from '@/data/links'

const STORY: { title: string; year?: string; text: string }[] = [
  {
    title: 'Бангкок',
    year: '2022',
    text: 'Я решил путешествовать и уехал в Бангкок. Мне не хватало живого общения, и я стал собирать людей вместе, лицом к лицу.',
  },
  { title: 'Гипотеза', text: 'При переезде человек получает социальные блага на новом месте, если его там кто-то встречает.' },
  { title: 'Работа и бренд', year: '2023', text: 'Сообщество принесло мне работу и имя.' },
  { title: 'Дананг', text: 'Ко мне подошёл незнакомец: «Мой друг тебя знает». Ни его, ни друга я не знал.' },
  { title: 'Кипр', text: 'Ещё один незнакомец сказал, что его друг меня знает. Ни его, ни друга я не знал, а сообщества на Кипре у меня нет.' },
  {
    title: 'Рост',
    year: '2024',
    text: 'Я запустил ещё несколько сообществ и начал выступать в подкастах. Сомневался, нужно ли это там, где не экспаты. Москва и Питер показали: нужно.',
  },
  { title: 'Переезды', text: 'Люди ездят из города в город, и вот мы в Батуми сидим с ребятами из Бангкока.' },
  {
    title: 'Сейчас',
    year: '2026',
    text: 'Мы хотим помогать людям решать их проблемы. Находим двоих, которым нужно друг друга, и сводим их в реальном мире. Как контакты в LinkedIn, только живые.',
  },
]

const FIND = [
  { title: 'Социализация', text: 'приехать в новый город и сразу оказаться среди своих' },
  { title: 'Найм', text: 'человека в команду или команду для себя' },
  { title: 'Инвесторы', text: 'люди с деньгами и проекты, которым они нужны' },
  { title: 'Идея', text: 'рассказать про свою идею и найти компанию' },
  { title: 'Контакт', text: 'выйти на нужного человека под любую задачу: хоть репетитора по физике ребёнку' },
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

const HELP: Tile[] = [
  { title: 'Развитие бизнеса', text: 'помогаем с продуктом, процессами и операционкой' },
  { title: 'Задачи общего плана', text: 'приходи с задачей, найдём человека или решим вместе' },
]

const PRINCIPLES = [
  { title: 'Открытость — подарок', text: 'бесплатно и без обязательств' },
  { title: 'Доверие не скопировать', text: 'годы не собрать за выходные' },
  { title: 'Комьюнити не продаётся', text: 'без рекламы и спонсоров' },
  { title: 'Люди важнее алгоритма', text: 'Jaiora — «сердечный», от тайского ใจ (jai), сердце' },
  { title: 'Польза важнее функций', text: 'сначала решаем чью-то задачу, потом делаем красиво' },
]

const TINTS = ['s-tint-coral', 's-tint-amber', 's-tint-violet', 's-tint-mint']

function Tiles({ items }: { items: Tile[] }) {
  return (
    <div className="s-bento">
      {items.map((t, i) => {
        const inner = (
          <>
            <span className="s-card-title">{t.title}</span>
            <span className="s-card-text">{t.text}</span>
          </>
        )
        const cls = `s-card s-span-4 ${TINTS[i % TINTS.length]}`
        return t.url ? (
          <a key={t.title} className={cls} href={t.url} target="_blank" rel="noopener noreferrer">
            {inner}
          </a>
        ) : (
          <div key={t.title} className={`${cls} s-card-static`}>
            {inner}
          </div>
        )
      })}
    </div>
  )
}

function Chips({ items }: { items: { url: string; label: string }[] }) {
  return (
    <div className="s-chips">
      {items.map((c) => (
        <a key={c.url} className="s-chip" href={c.url} target="_blank" rel="noopener noreferrer">
          {c.label}
        </a>
      ))}
    </div>
  )
}

export default function JaioraView() {
  const navigate = useNavigate()

  return (
    <div className="site">
      <div className="s-wrap">
        <button className="s-back" onClick={() => navigate('/')}>
          ← На главную
        </button>

        <header className="s-jhero">
          <img className="s-avatar" src="/egor.jpg" alt={config.speaker} width="128" height="128" />
          <div>
            <p className="s-eyebrow">
              <b>Jaiora</b> · оффлайн-LinkedIn
            </p>
            <h1 className="s-jtitle">Нужный человек существует. Осталось оказаться с ним в одной комнате.</h1>
            <p className="s-lead">История про новый мир, где оффлайн важнее онлайна. Чтобы у каждого был доступ к нужным людям здесь и сейчас.</p>
          </div>
        </header>

        <section className="s-section">
          <h2 className="s-h2">Как всё началось</h2>
          <ol className="s-timeline">
            {STORY.map((s, i) => (
              <li key={s.title} className={`s-step${i === STORY.length - 1 ? ' s-step-now' : ''}`}>
                <span className="s-step-name">
                  {s.title}
                  {s.year && <span className="s-step-year">{s.year}</span>}
                </span>
                <span className="s-step-text">{s.text}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="s-section">
          <h2 className="s-h2">Что можно найти</h2>
          <Tiles items={FIND} />
        </section>

        <section className="s-section">
          <h2 className="s-h2">Что у нас есть</h2>
          <Tiles items={PLATFORM} />
          <div className="s-bento">
            <div className="s-card s-span-12 s-card-static s-tint-coral">
              <span className="s-card-title">Чаты по городам</span>
              <Chips items={CITY_CHATS} />
            </div>
            <div className="s-card s-span-12 s-card-static s-tint-violet">
              <span className="s-card-title">Тематические чаты и каналы</span>
              <Chips items={THEME_CHATS} />
            </div>
          </div>
        </section>

        <section className="s-section">
          <h2 className="s-h2">Чем ещё помогаем</h2>
          <div className="s-bento">
            {HELP.map((t, i) => (
              <div key={t.title} className={`s-card s-span-6 s-card-static ${TINTS[(i + 1) % TINTS.length]}`}>
                <span className="s-card-title">{t.title}</span>
                <span className="s-card-text">{t.text}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="s-section">
          <h2 className="s-h2">На чём держится</h2>
          <div className="s-bento">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} className={`s-card s-span-6 s-card-static ${TINTS[i % TINTS.length]}`}>
                <span className="s-card-title">{p.title}</span>
                <span className="s-card-text">{p.text}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
