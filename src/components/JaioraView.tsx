import { Fragment, useEffect } from 'react'
import Page from '@/components/site/Page'
import { CITY_CHATS, THEME_CHATS, itemText, type LinkItem } from '@/data/links'
import { JAIORA, type Tile } from '@/data/jaiora'
import { useT, type Lang } from '@/lib/i18n'

const PHASE_CLASS = ['ph-me', 'ph-together', 'ph-people', 'ph-jaiora']

function Tiles({ items }: { items: Tile[] }) {
  return (
    <div className="s-bento">
      {items.map((t) => (
        <div key={t.title} className={`s-card ${items.length === 2 ? 's-span-6' : 's-span-4'} s-card-static`}>
          <span className="s-card-title">{t.title}</span>
          <span className="s-card-text">{t.text}</span>
        </div>
      ))}
    </div>
  )
}

function Chips({ items, lang }: { items: LinkItem[]; lang: Lang }) {
  return (
    <div className="s-chips">
      {items.map((c) =>
        c.url ? (
          <a key={c.label} className="s-chip" href={c.url} target="_blank" rel="noopener noreferrer">
            {itemText(c, lang).label}
          </a>
        ) : (
          <span key={c.label} className="s-chip s-chip-static">
            {itemText(c, lang).label}
          </span>
        ),
      )}
    </div>
  )
}

export default function JaioraView() {
  const { lang, t } = useT()
  const c = t(JAIORA)

  // На странице Jaiora во вкладке — знак сообщества, при уходе возвращаем личную иконку
  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    const prev = link?.href
    if (link) link.href = '/jaiora/logo.svg'
    return () => {
      if (link && prev) link.href = prev
    }
  }, [])

  const storyPhase = c.story.reduce<number[]>((acc, item, i) => {
    acc.push(item.phase ? (i === 0 ? 0 : acc[i - 1] + 1) : (acc[i - 1] ?? 0))
    return acc
  }, [])

  return (
    <Page className="site-jaiora">
      <header className="s-jhero">
        <img className="s-jlogo" src="/jaiora/logo.svg" alt="Jaiora" width="112" height="112" />
        <div>
          <p className="s-eyebrow">{c.eyebrow}</p>
          <h1 className="s-jtitle">{c.title}</h1>
          <p className="s-lead">{c.lead}</p>
        </div>
      </header>

      <section className="s-meet">
        <div>
          <p className="s-meet-when">{c.meet.when}</p>
          <p className="s-meet-title">{c.meet.title}</p>
        </div>
        <p className="s-meet-text">{c.meet.text}</p>
        <div className="s-meet-cities">
          <button
            className="s-pill s-pill-solid"
            onClick={() => document.getElementById('cities')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
          >
            {c.meet.button}
          </button>
        </div>
      </section>

      <section className="s-section">
        <h2 className="s-h2">{c.rulesTitle}</h2>
        <p className="s-lead">{c.rulesLead}</p>
        <div className="s-bento">
          {c.rules.map((r) => (
            <div key={r.title} className="s-card s-span-6 s-card-static s-feature">
              <span className="s-card-title">{r.title}</span>
              <span className="s-card-text">{r.text}</span>
            </div>
          ))}
        </div>
        <Tiles items={c.values} />
      </section>

      <section className="s-section">
        <h2 className="s-h2">{c.findTitle}</h2>
        <Tiles items={c.find} />
      </section>

      <section className="s-section">
        <h2 className="s-h2">{c.doneTitle}</h2>
        <h3 className="s-label">{c.socialTitle}</h3>
        <div className="s-bento">
          {c.social.map((s) => (
            <div key={s.title} className="s-card s-span-6 s-card-static s-feature">
              <span className="s-card-title">
                {s.title}
                <span className="s-step-year">{s.year}</span>
              </span>
              <span className="s-card-text">{s.text}</span>
            </div>
          ))}
        </div>
        <h3 className="s-label">{c.eventsTitle}</h3>
        <div className="s-bento">
          <div className="s-card s-span-12 s-card-static">
            <span className="s-card-title">{c.eventsMain}</span>
            <span className="s-card-text">{c.eventsText}</span>
            <div className="s-chips">
              {c.eventFormats.map((f) => (
                <span key={f} className="s-chip s-chip-static">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="s-section">
        <h2 className="s-h2">{c.storyTitle}</h2>
        <ol className="s-timeline">
          {c.story.map((s, i) => (
            <Fragment key={s.title}>
              {s.phase && (
                <li className={`s-phase ${PHASE_CLASS[storyPhase[i]]}`} aria-hidden="true">
                  {s.phase}
                </li>
              )}
              <li className={`s-step ${PHASE_CLASS[storyPhase[i]]}${s.pre ? ' s-step-pre' : ''}${s.year === '2026' ? ' s-step-now' : ''}${s.goal ? ' s-step-goal' : ''}`}>
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
        <h2 className="s-h2">{c.haveTitle}</h2>
        <Tiles items={c.platform} />
        <div className="s-bento">
          <div id="cities" className="s-card s-span-12 s-card-static s-anchor">
            <span className="s-card-title">{c.cityChats}</span>
            <Chips items={CITY_CHATS} lang={lang} />
          </div>
          <div className="s-card s-span-12 s-card-static">
            <span className="s-card-title">{c.themeChats}</span>
            <Chips items={THEME_CHATS} lang={lang} />
          </div>
        </div>
      </section>

      <section className="s-section">
        <h2 className="s-h2">{c.helpTitle}</h2>
        <Tiles items={c.help} />
      </section>
    </Page>
  )
}
