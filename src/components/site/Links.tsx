import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ICONS } from '@/components/site/icons'

// Ссылки в материалах — тем же видом, что в блоге:
// в тексте — акцентная подчёркнутая ссылка (как .s-prose a), внешняя — со значком ↗ и в новой вкладке;
// «ещё по теме» — карточки как блок «Дальше по теме» в постах (подпись-рубрика, заголовок, короткое описание).

export function TextLink({ to, href, icon, children }: { to?: string; href?: string; icon?: ReactNode; children: ReactNode }) {
  if (to) return <Link className="s-link" to={to}>{icon}{children}</Link>
  return (
    <a className="s-link" href={href} target="_blank" rel="noopener">
      {icon}{children}<span className="s-link-ext">{ICONS.ext}</span>
    </a>
  )
}

// Ряд действий под заголовком игры/интерактива: одно семейство кнопок-пилюль одной высоты.
// primary — главное действие (акцентная заливка), остальные — контурные; иконка слева, внешняя — маленький ↗ внутри.
export function ActionLink({ to, href, icon, primary, track, children, ...rest }: { to?: string; href?: string; icon?: ReactNode; primary?: boolean; track?: string; children: ReactNode } & Record<`data-${string}`, string>) {
  const cls = `g-btn${primary ? ' is-primary' : ''}`
  if (to) return <Link className={cls} to={to} data-track-label={track} {...rest}>{icon}{children}</Link>
  const ext = /^https?:/.test(href ?? '')
  return (
    <a className={cls} href={href} data-track-label={track} {...rest} {...(ext ? { target: '_blank', rel: 'noopener' } : {})}>
      {icon}{children}{ext && <span className="g-btn-ext">{ICONS.ext}</span>}
    </a>
  )
}

export interface CardLink { to?: string; href?: string; k: string; t: string; d?: string }

export function CardLinks({ items }: { items: CardLink[] }) {
  return (
    <div className={`s-links${items.length === 2 || items.length === 4 ? ' two' : ''}`}>
      {items.map((c) => {
        const body = (
          <>
            <span className="k">{c.k}</span>
            <span className="t">{c.t}{c.href && <span className="s-link-ext">{ICONS.ext}</span>}</span>
            {c.d && <span className="d">{c.d}</span>}
          </>
        )
        return c.to
          ? <Link key={c.t} to={c.to}>{body}</Link>
          : <a key={c.t} href={c.href} target="_blank" rel="noopener">{body}</a>
      })}
    </div>
  )
}

// Раскрывашка на <details>: клавиатура и состояние «развёрнуто/свёрнуто» для экранного диктора — штатные.
// Заголовок целиком кликабельный, справа шеврон; в свёрнутом виде — подсказка, сколько внутри.
export function Fold({ title, hint, id, children, open }: { title: ReactNode; hint?: string; id?: string; children: ReactNode; open?: boolean }) {
  return (
    <details className="s-fold" open={open}>
      <summary>
        <h2 className="s-label" id={id}>{title}</h2>
        {hint && <span className="s-fold-hint">{hint}</span>}
        <span className="s-fold-chev">{ICONS.chevron}</span>
      </summary>
      <div className="s-fold-body">{children}</div>
    </details>
  )
}

// Список вопросов: каждый вопрос — своя строка, ответ раскрывается по клику. Короткий список (≤ 3) — сразу открытым.
export function Faq({ items }: { items: [string, string][] }) {
  if (items.length <= 3) {
    return <div className="g-faq">{items.map(([q, a]) => <div key={q}><h3>{q}</h3><p>{a}</p></div>)}</div>
  }
  return (
    <div className="s-acc">
      {items.map(([q, a]) => (
        <details key={q}>
          <summary><h3>{q}</h3><span className="s-fold-chev">{ICONS.chevron}</span></summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  )
}

// «Подробнее»/«Ещё N» внутри раздела: кнопка-ссылка с шевроном
export function More({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="s-more">
      <summary>{label}<span className="s-fold-chev">{ICONS.chevron}</span></summary>
      {children}
    </details>
  )
}
