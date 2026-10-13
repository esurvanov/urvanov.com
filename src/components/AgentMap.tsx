import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent, type PointerEvent, type WheelEvent } from 'react'
import { Link } from 'react-router-dom'
import { findTerm, glossaryPath, termShort, noCode } from '@/data/glossary'
import { useT } from '@/lib/i18n'

type Focus = { z?: string; t?: string[]; s?: string[] }
type VB = [number, number, number, number]
type Txt = { ru: string; en: string }

const ZONES: (Txt & { z: string; ic: string })[] = [
  { z: 'know', ic: 'M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h10', ru: 'Что знает', en: 'Knows' },
  { z: 'act', ic: 'M4 5h16v14H4zM8 10l3 2-3 2M13 15h3', ru: 'Песочница', en: 'Sandbox' },
  { z: 'guard', ic: 'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z', ru: 'Ограничения', en: 'Limits' },
  { z: 'watch', ic: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z', ru: 'Что видно', en: 'Visible' },
]

const STEPS: (Txt & Focus)[] = [
  { z: 'know', t: ['context'], s: ['k'], ru: 'Задача, правила, знания и память собираются в контекст', en: 'The task, rules, knowledge and memory gather in context' },
  { t: ['context', 'llm'], s: ['s1'], ru: 'Модель читает контекст и решает следующий шаг', en: 'The model reads context and picks the next step' },
  { z: 'act', t: ['llm', 'tool'], s: ['s2', 'a', 'm'], ru: 'Тул выполняется: команды в песочнице, MCP рядом', en: 'The tool runs: commands in the sandbox, MCP next to it' },
  { z: 'guard', t: ['tool', 'checks'], s: ['s3', 'g'], ru: 'Проверки и хуки ловят ошибки, важное решаете вы', en: 'Checks and hooks catch errors, you decide the key steps' },
  { t: ['checks', 'context'], s: ['s4'], ru: 'Результат возвращается в контекст, цикл идёт дальше', en: 'The result returns to context and the loop goes on' },
  { z: 'watch', t: ['llm'], s: ['w'], ru: 'Снаружи видно каждый шаг: логи и оркестрация', en: 'Every step is visible from outside: logs and orchestration' },
]

// Схема агента: наведение на зону приглушает остальное, клик по предмету показывает термин, «Шаг» ведёт по кольцу
export default function AgentMap({ svg, wide }: { svg: string; wide: boolean }) {
  const { lang, t, to } = useT()
  const ref = useRef<HTMLDivElement>(null)
  const [zone, setZone] = useState<string | null>(null)
  const [step, setStep] = useState(-1)
  const [sel, setSel] = useState<string | null>(null)
  const [hov, setHov] = useState<Focus | null>(null)
  // Последний термин под курсором: держится, пока не наведут на другой, чтобы успеть нажать «Открыть»
  const [tip, setTip] = useState<string | null>(null)

  // Приближение: меняем viewBox у svg. Кнопки ± и щипок на тачпаде, перетаскивание двигает, кнопка зоны подлетает к зоне
  const base = useRef<VB | null>(null), vb = useRef<VB | null>(null), anim = useRef(0), drag = useRef<{ x: number; y: number; moved: boolean } | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const svgEl = () => ref.current?.querySelector('svg') ?? null
  useEffect(() => {
    const el = svgEl(); if (!el) return
    base.current = vb.current = el.getAttribute('viewBox')!.split(/\s+/).map(Number) as VB
    setZoomed(false)
  }, [svg])
  // React может заново вставить svg при перерисовке: возвращаем текущий viewBox после каждой
  useLayoutEffect(() => { if (vb.current) svgEl()?.setAttribute('viewBox', vb.current.map((n) => n.toFixed(1)).join(' ')) })
  const apply = (v: VB) => { vb.current = v; svgEl()?.setAttribute('viewBox', v.map((n) => n.toFixed(1)).join(' ')); setZoomed(v[2] < base.current![2] - 1) }
  const fly = (to: VB) => {
    const from = vb.current!, t0 = performance.now()
    clearTimeout(anim.current)
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / 350), e = 1 - (1 - k) ** 3
      apply(from.map((a, i) => a + (to[i] - a) * e) as VB)
      if (k < 1) anim.current = window.setTimeout(() => tick(performance.now()), 16)
    }
    tick(t0)
  }
  // Держим пропорции исходной картинки и не выходим за её края
  const fit = (cx: number, cy: number, w: number): VB => {
    const [bx, by, bw, bh] = base.current!, ww = Math.min(bw, Math.max(bw / 4, w)), hh = ww * bh / bw
    return [Math.min(bx + bw - ww, Math.max(bx, cx - ww / 2)), Math.min(by + bh - hh, Math.max(by, cy - hh / 2)), ww, hh]
  }
  const zoomBy = (k: number, cx?: number, cy?: number) => {
    const [x, y, w, h] = vb.current!, nx = cx ?? x + w / 2, ny = cy ?? y + h / 2
    return fit(nx - (nx - x - w / 2) * k, ny - (ny - y - h / 2) * k, w * k)
  }
  const zoomToZone = (z: string) => {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
    ref.current?.querySelectorAll<SVGGraphicsElement>(`[data-z~="${z}"]`).forEach((el) => { const b = el.getBBox(); x0 = Math.min(x0, b.x); y0 = Math.min(y0, b.y); x1 = Math.max(x1, b.x + b.width); y1 = Math.max(y1, b.y + b.height) })
    if (x0 === Infinity) return
    const [, , bw, bh] = base.current!, w = Math.max(x1 - x0 + 60, (y1 - y0 + 60) * bw / bh)
    fly(fit((x0 + x1) / 2, (y0 + y1) / 2, w))
  }
  const toSvg = (cx: number, cy: number) => { const r = svgEl()!.getBoundingClientRect(), [x, y, w, h] = vb.current!; return [x + (cx - r.left) / r.width * w, y + (cy - r.top) / r.height * h] }
  const onWheel = (e: WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return
    e.preventDefault()
    const [sx, sy] = toSvg(e.clientX, e.clientY)
    apply(zoomBy(Math.exp(e.deltaY * 0.01), sx, sy))
  }
  const onDown = (e: PointerEvent) => { if (zoomed) drag.current = { x: e.clientX, y: e.clientY, moved: false } }
  const onMove = (e: PointerEvent) => {
    const d = drag.current; if (!d) return
    const dx = e.clientX - d.x, dy = e.clientY - d.y
    if (!d.moved && Math.hypot(dx, dy) < 4) return
    d.moved = true; d.x = e.clientX; d.y = e.clientY
    const r = svgEl()!.getBoundingClientRect(), [x, y, w] = vb.current!
    apply(fit(x + w / 2 - dx / r.width * w, y + vb.current![3] / 2 - dy / r.height * vb.current![3], w))
  }
  const onUp = () => { setTimeout(() => { drag.current = null }, 0) }

  const focus: Focus | null = step >= 0 ? STEPS[step] : sel ? { t: [sel] } : hov ?? (zone ? { z: zone } : null)

  useEffect(() => {
    ref.current?.querySelectorAll<SVGGElement>('[data-z]').forEach((el) => {
      const zs = el.dataset.z!.split(' '), tt = el.dataset.t, sg = el.dataset.s
      // Отрезки пути горят только в своём шаге; без шага — вместе со своей зоной
      const lit = !focus || (sg ? (focus.s ? focus.s.includes(sg) : !!focus.z && zs.includes(focus.z)) : (!!focus.z && zs.includes(focus.z)) || (!!tt && !!focus.t?.includes(tt)) || (zs[0] === 'ring' && !tt))
      el.classList.toggle('dim', !lit)
      el.classList.toggle('show', !!focus && lit)
    })
  })

  const hit = (e: MouseEvent) => (e.target as Element).closest<SVGGElement>('[data-z]')
  const onOver = (e: MouseEvent) => {
    if (step >= 0 || sel) return
    const el = hit(e)
    setHov(el ? (el.dataset.t ? { t: [el.dataset.t] } : { z: el.dataset.z!.split(' ').pop() }) : null)
    if (el?.dataset.t) setTip(el.dataset.t)
  }
  const onClick = (e: MouseEvent) => {
    if (drag.current?.moved) return
    const tt = hit(e)?.dataset.t
    setStep(-1); setSel(tt && tt !== sel ? tt : null)
  }
  const reset = () => { setZone(null); setStep(-1); setSel(null); setHov(null); setTip(null); if (base.current) fly(base.current) }

  const shown = sel ?? (step < 0 ? tip : null)
  const term = shown ? findTerm(shown) : undefined

  return (
    <div className={wide ? 's-art s-art-wide am' : 's-art am'}>
      <div className="am-bar" role="toolbar" aria-label={t({ ru: 'Схема агента', en: 'Agent map' })}>
        {ZONES.map((z) => (
          <button key={z.z} type="button" className={`am-btn${zone === z.z && step < 0 && !sel ? ' is-on' : ''}`} aria-pressed={zone === z.z}
            onClick={() => { setStep(-1); setSel(null); const off = zone === z.z; setZone(off ? null : z.z); if (off) fly(base.current!); else zoomToZone(z.z) }}>
            <svg className="am-ic" viewBox="0 0 24 24" aria-hidden><path d={z.ic} /></svg>{t(z)}
          </button>
        ))}
        <span className="am-sp" />
        <button type="button" className="am-btn" onClick={() => fly(zoomBy(1.4))} disabled={!zoomed} aria-label={t({ ru: 'Отдалить', en: 'Zoom out' })}><span aria-hidden>−</span></button>
        <button type="button" className="am-btn" onClick={() => fly(zoomBy(1 / 1.4))} aria-label={t({ ru: 'Приблизить', en: 'Zoom in' })}><span aria-hidden>+</span></button>
        <button type="button" className={`am-btn${step >= 0 ? ' is-on' : ''}`} onClick={() => { setSel(null); setZone(null); setStep((step + 1) % STEPS.length) }}>
          <span aria-hidden>▶</span>{t({ ru: 'Шаг', en: 'Step' })}{step >= 0 && ` ${step + 1}/${STEPS.length}`}
        </button>
        <button type="button" className="am-btn" onClick={reset} aria-label={t({ ru: 'Сброс', en: 'Reset' })}><span aria-hidden>↺</span></button>
      </div>
      <div ref={ref} className={`am-svg${zoomed ? ' is-zoomed' : ''}`} onWheel={onWheel} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp} onMouseOver={onOver} onMouseLeave={() => setHov(null)} onClick={onClick} dangerouslySetInnerHTML={{ __html: svg }} />
      <p className="am-info" aria-live="polite">
        {step >= 0 ? <><b>{step + 1}/{STEPS.length}</b> {t(STEPS[step])}</>
          : term ? <><b>{t(term.name)}</b> {noCode(termShort(term, lang))} <Link className="s-link" to={to(glossaryPath(term.slug))}>{t({ ru: 'Открыть →', en: 'Open →' })}</Link></>
          : <span className="am-hint">{t({ ru: 'Наведите на зону или нажмите ▶ Шаг', en: 'Hover a zone or press ▶ Step' })}</span>}
      </p>
    </div>
  )
}
