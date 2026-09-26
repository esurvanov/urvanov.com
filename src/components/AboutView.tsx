import { LINK_GROUPS } from '@/data/links'
import { config } from '@/data/config'
import { ICONS } from '@/components/site/icons'
import Page from '@/components/site/Page'

const CONTACTS = [
  { label: 'Telegram', icon: ICONS.telegram, url: 'https://t.me/eurvanov' },
  { label: 'LinkedIn', icon: ICONS.linkedin, url: 'https://www.linkedin.com/in/eurvanov/' },
  { label: 'GitHub', icon: ICONS.github, url: 'https://github.com/esurvanov/' },
  { label: 'GetMentor', icon: ICONS.mentor, url: 'https://getmentor.dev/mentor/egor-urvanov-1077' },
]

const STATS = [
  { n: '1-й', t: 'ментор на GetMentor' },
  { n: '1500+', t: 'часов менторства' },
  { n: '10 256', t: 'репутации на Stack Overflow' },
  { n: '6-е', t: 'место Project Euler+ из 256 000' },
]

const about = LINK_GROUPS.find((g) => g.title === 'Обо мне')!
const achievements = about.blocks.find((b) => b.title === 'Проекты и достижения')!.items
const education = about.blocks.find((b) => b.title === 'Образование')!.items

export default function AboutView() {
  return (
    <Page>
      <article itemScope itemType="https://schema.org/Person" className="s-article-wrap">
        <header className="s-hero">
          <div>
            <p className="s-eyebrow"><b>CTO</b> · AI · нетворк</p>
            <h1 className="s-name" itemProp="name">{config.speaker}</h1>
            <p className="s-lead">CTO, машинное обучение и AI-разработка. Менторю инженеров, выступаю, собираю людей в Jaiora.</p>
            <ul className="s-pills" aria-label="Контакты">
              {CONTACTS.map((c) => (
                <li key={c.label}>
                  <a className="s-pill s-icon-btn" href={c.url} target="_blank" rel="me noopener noreferrer" aria-label={c.label} title={c.label} itemProp="sameAs">
                    {c.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <img className="s-avatar" src="/egor.jpg" alt={config.speaker} width="148" height="148" itemProp="image" fetchPriority="high" />
        </header>

        <section className="s-section" aria-labelledby="about-stats">
          <h2 className="s-label" id="about-stats">В цифрах</h2>
          <dl className="s-stats">
            {STATS.map((s) => (
              <div key={s.t} className="s-stat">
                <dt><b>{s.n}</b></dt>
                <dd>{s.t}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="s-section" aria-labelledby="about-ach">
          <h2 className="s-label" id="about-ach">Проекты и достижения</h2>
          <ul className="s-list">
            {achievements.map((a) => (
              <li key={a.label} className="s-row">
                <a href={a.url} target="_blank" rel="noopener noreferrer">{a.label}</a>
                {a.comment && <span>{a.comment}</span>}
              </li>
            ))}
          </ul>
        </section>

        <section className="s-section" aria-labelledby="about-edu">
          <h2 className="s-label" id="about-edu">Образование</h2>
          <ul className="s-list">
            {education.map((a) => (
              <li key={a.label} className="s-row">
                <span itemProp="alumniOf">{a.label}</span>
                {a.comment && <span>{a.comment}</span>}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </Page>
  )
}
