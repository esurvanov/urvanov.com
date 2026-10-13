import { Link, useLocation, useParams } from 'react-router-dom'
import Page from '@/components/site/Page'
import ThemeToggle from '@/components/site/ThemeToggle'
import NotFoundView from '@/components/NotFoundView'
import { AI_CONTACT, AI_GROUPS, AI_OFFERS, AI_PROOF, aiOfferPath } from '@/data/aiOffers'
import { otherLang, stripLang, useT, withLang, withSlash } from '@/lib/i18n'

// Страница, не сайт: без меню, свой верх с возвратом, языком и темой
function Top({ back }: { back?: boolean }) {
  const { lang, t, to } = useT()
  const { pathname } = useLocation()
  const other = otherLang(lang)
  return (
    <div className="ai-top">
      {back ? <Link to={to('/ai')}>← {t({ ru: 'Все офферы', en: 'All offers' })}</Link> : <span className="s-eyebrow">{t({ ru: 'Егор Урванов', en: 'Egor Urvanov' })}</span>}
      <span style={{ display: 'flex', gap: 8 }}>
        <ThemeToggle />
        <Link className="s-nav-lang" to={withSlash(withLang(stripLang(pathname), other))} data-track="cta" data-track-id="lang_switch" data-track-label={other} hrefLang={other} lang={other}>{other.toUpperCase()}</Link>
      </span>
    </div>
  )
}

function Cta({ id, label }: { id: string; label?: string }) {
  const { t } = useT()
  return (
    <a className="s-pill s-pill-solid ai-cta" href={AI_CONTACT} target="_blank" rel="noopener noreferrer" data-track="cta" data-track-id={id}>
      {label ?? t({ ru: 'Разобрать мою задачу', en: 'Review my task' })} <i aria-hidden="true">↗</i>
    </a>
  )
}

function Hint() {
  const { t } = useT()
  return <small className="ai-hint">{t({ ru: 'Telegram · опишите задачу в двух строках', en: 'Telegram · describe your task in two lines' })}</small>
}

// Кто ведёт: четыре проверяемых факта со ссылками на источник
function Proof() {
  const { t, to } = useT()
  return (
    <ul className="ai-proof" data-track-section="ai_proof" aria-label={t({ ru: 'Кто ведёт', en: 'Who leads' })}>
      {AI_PROOF.map((x) => {
        const ext = x.href.startsWith('http')
        return (
          <li key={x.value}>
            <a href={ext ? x.href : to(x.href)} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              <b>{x.value}</b>
              <span>{t(x.label)}</span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

const two = (s: string) => {
  const w = s.split(' ')
  const last = w.pop()
  return <>{w.join(' ')} <span>{last}</span></>
}

export function AiHubView() {
  const { t, to } = useT()
  return (
    <Page nav={false}>
      <Top />
      <header className="ai-hero">
        <p className="s-eyebrow">AI · <b>{t({ ru: 'обучение и внедрение', en: 'training and adoption' })}</b></p>
        <h1 className="s-page-title">{two(t({ ru: 'Чего вы хотите добиться с AI?', en: 'What do you want to achieve with AI?' }))}</h1>
        <p className="s-lead">{t({ ru: 'Выберите задачу: покажу, как её решить и что получите.', en: 'Pick the job: I will show how to solve it and what you get.' })}</p>
      </header>

      <Proof />

      <ol className="s-index ai-jobs" data-track-section="ai_jobs">
        {AI_OFFERS.map((o, i) => (
          <li key={o.slug}>
            <Link to={to(aiOfferPath(o.slug))}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <span className="t">{t(o.job)}</span>
              <span className="h">{t(o.short)}</span>
              <span className="ar" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ol>
    </Page>
  )
}

export function AiOfferView() {
  const { slug } = useParams()
  const { t, to } = useT()
  const o = AI_OFFERS.find((x) => x.slug === slug)
  if (!o) return <NotFoundView />
  const group = AI_GROUPS.find((g) => g.id === o.group)!
  return (
    <Page nav={false}>
      <Top back />
      <header className="ai-hero">
        <span className="ai-tag">{o.icon} · {t(group.name)}</span>
        <h1 className="s-page-title">{two(t(o.name))}</h1>
        <p className="s-lead">{t(o.hook)}</p>
        <div className="ai-cta-wrap"><Cta id={`ai_${o.slug}_top`} /><Hint /></div>
      </header>

      <Proof />

      <div className="s-main">
        <section className="s-section" data-track-section="ai_flow">
          <h2 className="s-h2">{t({ ru: 'Было и станет', en: 'Before and after' })}</h2>
          <div className="ai-flow">
            <div className="ai-flow-head"><span>{t({ ru: 'Сейчас', en: 'Now' })}</span><span>{t({ ru: 'После', en: 'After' })}</span></div>
            <ul className="no">{t(o.pains).map((x) => <li key={x}>{x}</li>)}</ul>
            <ul className="yes">{t(o.outcomes).map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </section>

        <section className="s-section" data-track-section="ai_program">
          <h2 className="s-h2">{t({ ru: 'Программа', en: 'Program' })}</h2>
          <ol className="ai-rail">
            {t(o.program).map((x, i) => (
              <li key={x}><b>{String(i + 1).padStart(2, '0')}</b>{x}</li>
            ))}
          </ol>
          <div className="s-pills">{t(o.format).map((x) => <span key={x} className="s-pill">{x}</span>)}</div>
        </section>

        <section className="s-section ai-end" data-track-section="ai_end">
          <h2 className="s-h2">{t({ ru: 'Начнём с вашей задачи', en: 'Let’s start with your task' })}</h2>
          <div className="ai-cta-wrap"><Cta id={`ai_${o.slug}_bottom`} /><Hint /></div>
        </section>

        <Link to={to('/ai')} className="ai-back">← {t({ ru: 'Это не моя роль: выбрать другую', en: 'Not my role: pick another' })}</Link>
      </div>
      <div className="ai-sticky"><Cta id={`ai_${o.slug}_sticky`} /></div>
    </Page>
  )
}
