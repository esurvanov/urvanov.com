import { useState } from 'react'
import { LINK_GROUPS, itemText } from '@/data/links'
import { config } from '@/data/config'
import { ICONS } from '@/components/site/icons'
import Page from '@/components/site/Page'
import { useT } from '@/lib/i18n'
import { PLACES } from '@/data/places'
import PlacesMap from '@/components/site/PlacesMap'

const CONTACTS = [
  { label: 'Telegram', icon: ICONS.telegram, url: 'https://t.me/eurvanov' },
  { label: 'LinkedIn', icon: ICONS.linkedin, url: 'https://www.linkedin.com/in/eurvanov/' },
  { label: 'GitHub', icon: ICONS.github, url: 'https://github.com/esurvanov/' },
  { label: 'Stack Overflow', icon: ICONS.stackoverflow, url: 'https://ru.stackoverflow.com/users/188116/eurvanov' },
  { label: 'GetMentor', icon: ICONS.mentor, url: 'https://getmentor.dev/mentor/egor-urvanov-1077' },
]

const MILESTONES = [
  { years: { ru: '2024 — сейчас', en: '2024 — present' }, role: 'CTO', org: { ru: 'SaaS-платформа клиентской поддержки', en: 'SaaS customer support platform' }, facts: [
    { ru: 'Время восстановления после сбоя: 5 часов → 2', en: 'Incident recovery time: 5 hours → 2' },
    { ru: 'Выход в прод: 3 месяца → 1,5', en: 'Time to market: 3 months → 1.5' } ] },
  { years: { ru: '2023 — 2024', en: '2023 — 2024' }, role: 'Head of Department', url: 'https://www.linkedin.com/company/18186001/', org: { ru: 'WebPros', en: 'WebPros' }, facts: [
    { ru: 'Руководство отделом разработки', en: 'Led the development department' } ] },
  { years: { ru: '2021 — 2022', en: '2021 — 2022' }, role: 'Head of Development', url: 'https://www.linkedin.com/company/3295154/', org: { ru: 'СберМаркет', en: 'SberMarket' }, facts: [
    { ru: 'Система на 40 000 сотрудников, экономия 170 млн ₽ в год', en: 'A system for 40,000 employees, saving 170 million RUB a year' },
    { ru: 'Маршрутизация сборки для 10 000 магазинов, 12 млн ₽ в год', en: 'Picker routing for 10,000 stores, 12 million RUB a year' },
    { ru: 'Онбординг и OKR в отделе на 200 человек', en: 'Onboarding and OKRs in a 200-person department' } ],
    links: [{ label: { ru: 'Доклад: сбор данных в интернете', en: 'Talk: web data collection (in Russian)' }, url: 'https://www.youtube.com/watch?v=V_bRcl6EjFk' }] },
  { years: { ru: '2019 — 2022', en: '2019 — 2022' }, role: 'Head of Development', url: 'https://www.linkedin.com/company/37829948/', org: { ru: 'Fless', en: 'Fless' }, facts: [
    { ru: 'От 0 до 6 000 пользователей, оборот 25 млн ₽ в год', en: 'From 0 to 6,000 users, 25 million RUB annual turnover' },
    { ru: 'Доступность системы 99,9%, 8 проектов', en: '99.9% uptime, 8 projects delivered' } ],
    links: [{ label: { ru: 'Доклад: очумелые ручки беспилотников', en: 'Talk: crazy hands of drones (in Russian)' }, url: 'https://www.youtube.com/watch?v=1LobFwBLel8' }] },
  { years: { ru: '2019 — 2020', en: '2019 — 2020' }, role: 'Software Engineer', url: 'https://www.linkedin.com/company/164715/', org: { ru: 'Леруа Мерлен', en: 'Leroy Merlin' }, facts: [
    { ru: 'Мониторинг цен конкурентов на 1 000 000 товаров', en: 'Competitor price monitoring for 1,000,000 products' } ] },
  { years: { ru: '2018 — 2019', en: '2018 — 2019' }, role: 'Software Engineer', url: 'https://www.linkedin.com/company/970369/', org: { ru: 'Ozon', en: 'Ozon' }, facts: [
    { ru: 'Переезд расчёта доставки с C# на Go, пропускная способность +250%, нагрузка 3 600 запросов в секунду', en: 'Migrated delivery pricing from C# to Go, throughput +250% at 3,600 requests per second' } ] },
  { years: { ru: '2016 — 2018', en: '2016 — 2018' }, role: 'Software Engineer', url: 'https://www.linkedin.com/company/10116760/', org: { ru: 'Спутник', en: 'Sputnik' }, facts: [
    { ru: 'Поисковый портал, распознавание речи', en: 'Search portal, speech recognition' } ] },
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
        <header className="s-about-hero">
          <div className="s-about-text">
            <p className="s-eyebrow"><b>CTO</b> · AI · {t({ ru: 'нетворк', en: 'networking' })}</p>
            <h1 className="s-name" itemProp="name">{t({ ru: config.speaker, en: 'Egor Urvanov' })}</h1>
            <p className="s-lead">{t({ ru: 'CTO, машинное обучение и AI-разработка. Менторю инженеров, выступаю, собираю людей в Jaiora.', en: 'CTO, machine learning and AI development. I mentor engineers, speak at events, and bring people together in Jaiora.' })}</p>
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
