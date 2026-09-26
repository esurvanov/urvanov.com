import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { config } from '@/data/config'
import { CITY_CHATS, THEME_CHATS } from '@/data/links'

const STORY: { title: string; year?: string; text: string; pre?: boolean }[] = [
  {
    title: 'Люди',
    year: '2016 и раньше',
    pre: true,
    text: 'В МАИ и других сообществах я много работал с людьми: собирал, учил, организовывал.',
  },
  {
    title: 'GetMentor',
    year: '2022',
    pre: true,
    text: 'Стал топ-1 ментором на GetMentor. Там я понял, как важны нетворк и умение работать с людьми.',
  },
  {
    title: 'Бангкок',
    year: '2023',
    text: 'Уехал путешествовать в Бангкок, и мне не хватало живого общения. Первая попытка не удалась: сообщество вокруг моего кондо развалилось.',
  },
  { title: 'Гипотеза', text: 'Я предположил, что переезд проходит легче, если на новом месте тебя кто-то встречает.' },
  { title: 'Работа и имя', year: '2024', text: 'Через сообщество я нашёл работу, и меня стали узнавать.' },
  {
    title: 'Сарафан',
    text: 'В Дананге ко мне подошёл незнакомец: «Мой друг с Кипра тебя знает». Ни его, ни друга я не знал, а сообщества на Кипре у меня нет.',
  },
  {
    title: 'Рост',
    year: '2025',
    text: 'Запустил ещё несколько сообществ, стал ходить на подкасты. Сомневался, нужно ли это в городах без экспатов. Москва и Питер ответили, что нужно.',
  },
  { title: 'Переезды', text: 'Люди стали переезжать из города в город. Недавно в Батуми мы сидели за одним столом с ребятами из Бангкока.' },
  {
    title: 'Сейчас',
    year: '2026',
    text: 'Хочу, чтобы любой мог найти нужного человека рядом и встретиться с ним вживую. Этим мы и занимаемся.',
  },
]

const SOCIAL = [
  { title: 'Батуми', year: '2026', text: 'Помогли спасти жизнь человеку и собрали деньги на лечение от рака.' },
  { title: 'Бангкок', year: '2025', text: 'Помогли найти пропавшего парня.' },
]

const EVENT_FORMATS = ['лекция учёного «Что скрывает океан?»', 'доклады', 'AI-митапы', 'свободный микрофон «Айти Нытьё»', 'VR-игры']

const FIND = [
  { title: 'Свои люди', text: 'приехать в новый город и в первую же субботу оказаться среди своих' },
  { title: 'Работа', text: 'человек в команду или команда для себя' },
  { title: 'Инвесторы', text: 'деньги для проекта или проект для денег' },
  { title: 'Идея', text: 'рассказать о своей идее и найти для неё компанию' },
  { title: 'Любая задача', text: 'хоть юрист, хоть репетитор по физике для ребёнка' },
  { title: 'Переезд', text: 'встретят, подскажут, познакомят' },
]

interface Tile {
  title: string
  text: string
  url?: string
}

const PLATFORM: Tile[] = [
  { title: 'Конференции', text: 'доклады и знакомства в одном зале' },
  { title: 'YouTube', text: 'записи выступлений и разборы' },
]

const HELP: Tile[] = [
  { title: 'Развитие бизнеса', text: 'продукт, процессы, операционка' },
  { title: 'Задачи общего плана', text: 'приходи с задачей: найдём человека или решим вместе' },
]

const RULES = [
  { title: 'Открытость', text: 'Рады всем. Без взносов, отбора и условий.' },
  { title: 'Нетоксичность', text: 'Спорить можно, обижать нельзя.' },
]

const VALUES = [
  { title: 'Польза сообществу', text: 'Рекламы и спонсоров нет. Советовать друг другу можно, и это бесплатно.' },
  { title: 'Доверие', text: 'Его не купить и не скопировать, его набирают годами.' },
  { title: 'Сердце', text: 'Jaiora от тайского ใจ (jai), «сердце». Мы про людей, алгоритмы тут на вторых ролях.' },
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
        const cls = `s-card ${items.length === 2 ? 's-span-6' : 's-span-4'} ${TINTS[i % TINTS.length]}`
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
            <p className="s-lead">История про новый мир, где оффлайн важнее онлайна. Рады всем, рамок нет.</p>
          </div>
        </header>

        <section className="s-meet">
          <div>
            <p className="s-meet-when">Каждую субботу · 19:00</p>
            <p className="s-meet-title">Встречи в большинстве наших городов</p>
          </div>
          <p className="s-meet-text">О работе и о жизни, и не только про IT. Приходи один, с другом или с задачей: рады всем.</p>
          <div className="s-meet-cities">
            <button
              className="s-pill s-pill-solid"
              onClick={() => document.getElementById('cities')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            >
              Выбрать свой город ↓
            </button>
          </div>
        </section>

        <section className="s-section">
          <h2 className="s-h2">Как всё началось</h2>
          <ol className="s-timeline">
            {STORY.map((s, i) => (
              <Fragment key={s.title}>
                {i > 0 && STORY[i - 1].pre && !s.pre && (
                  <li className="s-phase" aria-hidden="true">
                    С 2023 · Jaiora
                  </li>
                )}
                {i === 0 && s.pre && (
                  <li className="s-phase s-phase-pre" aria-hidden="true">
                    Предыстория
                  </li>
                )}
                <li className={`s-step${s.pre ? ' s-step-pre' : ''}${i === STORY.length - 1 ? ' s-step-now' : ''}`}>
                  <span className="s-step-name">
                    {s.title}
                    {s.year && <span className="s-step-year">{s.year}</span>}
                  </span>
                  <span className="s-step-text">{s.text}</span>
                </li>
              </Fragment>
            ))}
          </ol>
        </section>

        <section className="s-section">
          <h2 className="s-h2">Что уже получилось</h2>
          <h3 className="s-label">Социальные активности</h3>
          <div className="s-bento">
            {SOCIAL.map((c) => (
              <div key={c.title} className="s-card s-span-6 s-card-static s-feature">
                <span className="s-card-title">
                  {c.title}
                  <span className="s-step-year">{c.year}</span>
                </span>
                <span className="s-card-text">{c.text}</span>
              </div>
            ))}
          </div>
          <h3 className="s-label">Встречи сверх суббот</h3>
          <div className="s-bento">
            <div className="s-card s-span-12 s-card-static">
              <span className="s-card-title">Около 10 митапов в Бангкоке, регулярные митапы в Дананге</span>
              <span className="s-card-text">Бесплатно и без регистрации</span>
              <div className="s-chips">
                {EVENT_FORMATS.map((f) => (
                  <span key={f} className="s-chip s-chip-static">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="s-section">
          <h2 className="s-h2">Что можно найти</h2>
          <Tiles items={FIND} />
        </section>

        <section className="s-section">
          <h2 className="s-h2">Что у нас есть</h2>
          <Tiles items={PLATFORM} />
          <div className="s-bento">
            <div id="cities" className="s-card s-span-12 s-card-static s-tint-coral s-anchor">
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
          <p className="s-lead">Правил всего два.</p>
          <div className="s-bento">
            {RULES.map((r) => (
              <div key={r.title} className="s-card s-span-6 s-card-static s-feature">
                <span className="s-card-title">{r.title}</span>
                <span className="s-card-text">{r.text}</span>
              </div>
            ))}
          </div>
          <div className="s-bento">
            {VALUES.map((v) => (
              <div key={v.title} className="s-card s-span-4 s-card-static">
                <span className="s-card-title">{v.title}</span>
                <span className="s-card-text">{v.text}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
