import { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CITY_CHATS, THEME_CHATS } from '@/data/links'

const STORY: { title: string; year?: string; text: string; pre?: boolean; phase?: string }[] = [
  {
    title: 'Люди',
    year: '2016 и раньше',
    pre: true,
    phase: 'До 2022 · Учусь работать с людьми',
    text: 'В МАИ и других сообществах я много работал с людьми: собирал, учил, организовывал, ошибался.',
  },
  {
    title: 'GetMentor',
    year: '2022',
    pre: true,
    text: 'Стал топ-1 ментором на GetMentor. Там я понял, как важны нетворк и умение работать с людьми.',
  },
  {
    title: 'Отъезд',
    year: '2022',
    phase: 'С 2022 · Собираю людей',
    text: 'В 2022-м многие вдруг очень полюбили путешествовать. Я тоже уехал, в Бангкок.',
  },
  {
    title: 'Неудача',
    year: '2023',
    text: 'Первое сообщество, которое я собрал вокруг своего кондо, развалилось.',
  },
  {
    title: 'Гипотеза',
    text: 'Я не бросил. Верил, что переезд даётся легче, если на новом месте тебя кто-то встречает.',
  },
  {
    title: 'Bangkok IT',
    text: 'Со второй попытки получилось: я создал Bangkok IT.',
  },
  { title: 'Работа и имя', year: '2024', text: 'Через сообщество я нашёл работу, меня стали узнавать и звать на подкасты.' },
  {
    title: 'Сарафан',
    text: 'В Дананге ко мне подошёл незнакомец: «Мой друг с Кипра тебя знает». Ни того, ни другого я не знал, а сообщества на Кипре у меня нет. Слух стал расходиться сам.',
  },
  {
    title: 'Рост',
    year: '2025',
    phase: 'С 2025 · Люди собирают людей',
    text: 'Появились новые сообщества. Сомневались, нужно ли это в городах без экспатов. Москва и Питер показали, что нужно.',
  },
  { title: 'Переезды', text: 'Люди стали переезжать из города в город. Недавно в Батуми мы сидели за одним столом с ребятами из Бангкока.' },
  {
    title: 'Jaiora',
    year: '2026',
    phase: 'С 2026 · Jaiora: сеть по всему миру',
    text: 'Сообщества выросли в Jaiora, нас уже 10 000 человек. Мы хотим, чтобы любой мог найти человека под свою задачу или цель и встретиться с ним вживую.',
  },
  {
    title: 'Цель',
    year: '2027',
    text: '30 городов, 30 000 человек по всему миру и свой инструмент для нетворка: оффлайн-LinkedIn, который по задаче или цели подскажет, кто в сообществе может помочь.',
  },
]

const PHASE_CLASS = ['ph-me', 'ph-together', 'ph-people', 'ph-jaiora']
const STORY_PHASE = STORY.reduce<number[]>((acc, item, i) => {
  acc.push(item.phase ? (i === 0 ? 0 : acc[i - 1] + 1) : acc[i - 1] ?? 0)
  return acc
}, [])

const SOCIAL = [
  { title: 'Батуми', year: '2026', text: 'Помогли спасти жизнь человеку и собрали деньги на лечение от рака.' },
  { title: 'Бангкок', year: '2025', text: 'Помогли найти пропавшего парня.' },
]

const EVENT_FORMATS = ['Лекция Александра Осадчиева «Что скрывает океан?»', 'Доклады', 'AI-митапы', 'Свободный микрофон «Айти Нытьё»', 'VR-игры']

const FIND = [
  { title: 'Свои люди', text: 'Приехать в новый город и в первую же субботу оказаться среди своих' },
  { title: 'Работа', text: 'Найти человека в команду или команду для себя' },
  { title: 'Инвесторы', text: 'Познакомиться с инвестором или найти, во что вложиться' },
  { title: 'Идея', text: 'Рассказать о своей идее и найти тех, кто захочет её делать' },
  { title: 'Любая задача', text: 'Юрист, врач, репетитор по физике для ребёнка: кто-то точно знает нужного человека' },
  { title: 'Переезд', text: 'На новом месте встретят, подскажут и познакомят' },
]

interface Tile {
  title: string
  text: string
  url?: string
}

const PLATFORM: Tile[] = [
  { title: 'Конференции', text: 'Доклады и знакомства в одном зале' },
  { title: 'YouTube', text: 'Записи выступлений и разборы' },
]

const HELP: Tile[] = [
  { title: 'Развитие бизнеса', text: 'Помогаем с продуктом, процессами и операционкой' },
  { title: 'Задачи общего плана', text: 'Приходи с задачей: найдём человека или решим вместе' },
]

const RULES = [
  { title: 'Открытость', text: 'Прийти может любой. Без взносов, отбора и условий.' },
  { title: 'Нетоксичность', text: 'Спорить можно, обижать нельзя.' },
]

const VALUES = [
  { title: 'Польза сообществу', text: 'Рекламы нет. Здесь советуют друг другу проверенных людей и места.' },
  { title: 'Доверие', text: 'Его не купишь, оно копится годами.' },
  { title: 'Сердце', text: 'Jaiora от тайского ใจ (jai), «сердце». В центре люди, технологии им только помогают.' },
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

  // На странице Jaiora во вкладке — знак сообщества, при уходе возвращаем личную иконку
  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    const prev = link?.href
    if (link) link.href = '/jaiora/logo.svg'
    return () => {
      if (link && prev) link.href = prev
    }
  }, [])

  return (
    <div className="site site-jaiora">
      <div className="s-wrap">
        <button className="s-back" onClick={() => navigate('/')}>
          ← На главную
        </button>

        <header className="s-jhero">
          <img className="s-jlogo" src="/jaiora/logo.svg" alt="Jaiora" width="112" height="112" />
          <div>
            <p className="s-eyebrow">
              <b>Jaiora</b> · оффлайн-LinkedIn
            </p>
            <h1 className="s-jtitle">Нужный человек существует. Осталось оказаться с ним в одной комнате.</h1>
            <p className="s-lead">У любой задачи и цели есть человек, который поможет её решить. Мы помогаем его найти и встретиться вживую. Здесь рады всем.</p>
          </div>
        </header>

        <section className="s-meet">
          <div>
            <p className="s-meet-when">Каждую субботу · 19:00</p>
            <p className="s-meet-title">Встречаемся в большинстве наших городов</p>
          </div>
          <p className="s-meet-text">Говорим о работе и о жизни, и не только про IT. Можно прийти одному, с другом или с задачей.</p>
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
          <h2 className="s-h2">На чём держится</h2>
          <p className="s-lead">У нас всего два правила.</p>
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

        <section className="s-section">
          <h2 className="s-h2">Что можно найти</h2>
          <Tiles items={FIND} />
        </section>

        <section className="s-section">
          <h2 className="s-h2">Что уже получилось</h2>
          <h3 className="s-label">Помогли людям</h3>
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
          <h3 className="s-label">Не только субботы</h3>
          <div className="s-bento">
            <div className="s-card s-span-12 s-card-static">
              <span className="s-card-title">Около десяти митапов в Бангкоке и регулярные в Дананге</span>
              <span className="s-card-text">Вход свободный, можно просто прийти.</span>
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
          <h2 className="s-h2">Как всё началось</h2>
          <ol className="s-timeline">
            {STORY.map((s, i) => (
              <Fragment key={s.title}>
                {s.phase && (
                  <li className={`s-phase ${PHASE_CLASS[STORY_PHASE[i]]}`} aria-hidden="true">
                    {s.phase}
                  </li>
                )}
                <li className={`s-step ${PHASE_CLASS[STORY_PHASE[i]]}${s.pre ? ' s-step-pre' : ''}${s.year === '2026' ? ' s-step-now' : ''}${s.title === 'Цель' ? ' s-step-goal' : ''}`}>
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
      </div>
    </div>
  )
}
