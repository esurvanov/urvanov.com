import { useState } from 'react'
import { LINK_GROUPS, itemText } from '@/data/links'
import { config } from '@/data/config'
import { MILESTONES, ABOUT_LEAD } from '@/data/about'
import { ICONS } from '@/components/site/icons'
import Page from '@/components/site/Page'
import { useT } from '@/lib/i18n'
import { PLACES } from '@/data/places'
import PlacesMap from '@/components/site/PlacesMap'

const CONTACTS = [
  { label: 'Telegram', network: 'telegram', icon: ICONS.telegram, url: 'https://t.me/eurvanov' },
  { label: 'LinkedIn', network: 'linkedin', icon: ICONS.linkedin, url: 'https://www.linkedin.com/in/eurvanov/' },
  { label: 'GitHub', network: 'github', icon: ICONS.github, url: 'https://github.com/esurvanov/' },
  { label: 'Stack Overflow', network: 'stackoverflow', icon: ICONS.stackoverflow, url: 'https://ru.stackoverflow.com/users/188116/eurvanov' },
  { label: 'GetMentor', network: 'getmentor', icon: ICONS.mentor, url: 'https://getmentor.dev/mentor/egor-urvanov-1077' },
]

const about = LINK_GROUPS.find((g) => g.titleEn === 'About me')!
const achievements = about.blocks.find((b) => b.titleEn === 'Projects and achievements')!.items
const education = about.blocks.find((b) => b.titleEn === 'Education')!.items

export default function AboutView() {
  const { lang, t } = useT()
  const [active, setActive] = useState<number | null>(null)
  return (
    <Page>
      <article itemScope itemType="https://schema.org/Person" className="s-article-wrap">
        <header className="s-about-hero" data-track-section="hero">
          <div className="s-about-text">
            <p className="s-eyebrow"><b>CTO</b> · AI · {t({ ru: 'нетворк', en: 'networking' })}</p>
            <h1 className="s-name" itemProp="name">{t({ ru: config.speaker, en: 'Egor Urvanov' })}</h1>
            <p className="s-lead">{t(ABOUT_LEAD)}</p>
            <ul className="s-pills" aria-label="Контакты" data-track-section="contacts">
              {CONTACTS.map((c) => (
                <li key={c.label}>
                  <a className="s-pill s-icon-btn" href={c.url} target="_blank" rel="me noopener noreferrer" data-track-network={c.network} aria-label={c.label} title={c.label} itemProp="sameAs">
                    {c.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <img className="s-avatar" src="/egor.jpg" alt={t({ ru: config.speaker, en: 'Egor Urvanov' })} width="148" height="148" itemProp="image" fetchPriority="high" />
        </header>

        <section className="s-section" aria-labelledby="about-path">
          <h2 className="s-label" id="about-path">{t({ ru: 'Вехи', en: 'Milestones' })}</h2>
          <ol className="s-miles">
            {MILESTONES.map((m) => (
              <li key={m.role + m.years} className="s-mile">
                <time className="s-mile-years">{t(m.years)}</time>
                <div>
                  <h3 className="s-mile-role">{m.role}</h3>
                  <p className="s-mile-org">
                    {m.url ? <a href={m.url} target="_blank" rel="noopener noreferrer">{t(m.org)} ↗</a> : t(m.org)}
                  </p>
                  <ul className="s-mile-facts">
                    {m.facts.map((f) => <li key={f.ru}>{t(f)}</li>)}
                  </ul>
                  {m.links && (
                    <p className="s-mile-links">
                      {m.links.map((l) => <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">{t(l.label)} ↗</a>)}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="s-section" aria-labelledby="about-places">
          <h2 className="s-label" id="about-places">
            {t({ ru: 'Где я был', en: 'Places I have been' })} · {PLACES.length}
          </h2>
          <PlacesMap places={PLACES} label={{ ru: 'Карта мест, где бывал Егор', en: 'Map of places Egor has been' }} active={active} onActive={setActive} />
          <ul className="s-chips">
            {PLACES.map((p, i) => (
              <li
                key={p.name.ru}
                className={`s-chip s-chip-static${p.key ? ' is-key' : ''}${active === i ? ' is-active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {t(p.name)}
              </li>
            ))}
          </ul>
        </section>

        <section className="s-section" aria-labelledby="about-ach">
          <h2 className="s-label" id="about-ach">{t({ ru: 'Проекты и достижения', en: 'Projects and achievements' })}</h2>
          <ul className="s-list">
            {achievements.map((a) => {
              const x = itemText(a, lang)
              return (
                <li key={a.label} className="s-row">
                  <a href={a.url} target="_blank" rel="noopener noreferrer">{x.label}</a>
                  {x.comment && <span>{x.comment}</span>}
                </li>
              )
            })}
          </ul>
        </section>

        <section className="s-section" aria-labelledby="about-edu">
          <h2 className="s-label" id="about-edu">{t({ ru: 'Образование', en: 'Education' })}</h2>
          <ul className="s-list">
            {education.map((a) => {
              const x = itemText(a, lang)
              return (
                <li key={a.label} className="s-row">
                  <span itemProp="alumniOf">{x.label}</span>
                  {x.comment && <span>{x.comment}</span>}
                </li>
              )
            })}
          </ul>
        </section>
      </article>
    </Page>
  )
}
