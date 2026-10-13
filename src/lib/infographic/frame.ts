// Рамка схемы: подгоняет viewBox под нарисованное, добавляет легенду цветов и подпись снизу
import { DEFS, type Iso } from './iso'
import { LEGEND, type Lang, esc, f } from './palette'

// Границы нарисованного: по точкам многоугольников, путям, кругам и подписям, чтобы схема занимала всё место
export function bounds(body: string): [number, number, number, number] {
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9
  const add = (x: number, y: number, px = 0, py = px) => { x0 = Math.min(x0, x - px); x1 = Math.max(x1, x + px); y0 = Math.min(y0, y - py); y1 = Math.max(y1, y + py) }
  for (const m of body.matchAll(/points="([^"]+)"/g)) for (const q of m[1].trim().split(/\s+/)) { const [x, y] = q.split(',').map(Number); add(x, y) }
  for (const m of body.matchAll(/ d="(M[-\d.LM ]+)"/g)) for (const q of m[1].matchAll(/(-?\d+\.?\d*)[ ,](-?\d+\.?\d*)/g)) add(Number(q[1]), Number(q[2]), 2)
  for (const m of body.matchAll(/<(?:circle|ellipse) cx="([-\d.]+)" cy="([-\d.]+)" r(?:x)?="([-\d.]+)"/g)) add(Number(m[1]), Number(m[2]), Number(m[3]))
  // Ширина подписи прикидывается по числу букв; у выровненных по краю подпись уходит в одну сторону от x
  for (const m of body.matchAll(/<text[^>]*? x="([-\d.]+)" y="([-\d.]+)"([^>]*)>([^<]*)</g)) {
    const x = Number(m[1]), y = Number(m[2]), wd = m[4].length * 6.2, an = /text-anchor="(start|end)"/.exec(m[3])?.[1]
    if (an === 'start') { add(x, y, 0, 10); add(x + wd, y, 0, 10) } else if (an === 'end') { add(x - wd, y, 0, 10); add(x, y, 0, 10) } else add(x, y, m[4].length * 4.8, 10)
  }
  return [x0, y0, x1, y1]
}

/** Строка легенды по центру (cx, y): только те цвета словаря, что есть в нарисованном; пустая строка, если таких нет */
export function legendRow(body: string, cx: number, y: number, lang: Lang): string {
  const leg = LEGEND.filter(([c]) => body.includes(`"${c}"`))
  if (!leg.length) return ''
  return `<text x="${f(cx)}" y="${f(y)}" text-anchor="middle" font-size="12" font-weight="700">${leg.map(([c, ru, en]) => `<tspan fill="${c}">●\u2009${esc(lang === 'ru' ? ru : en)}</tspan>`).join('<tspan>\u2003\u2003</tspan>')}</text>`
}

/** Готовый <svg>: сцена + легенда (только цвета, что есть на схеме; legend: false — без неё) + подпись */
export function frame(I: Iso, o: { caption: string; lang: Lang; legend?: boolean }): string {
  const { caption, lang, legend: withLegend = true } = o
  const body = I.render()
  const [x0, y0, x1, y1] = bounds(body)
  const w = Math.max(x1 - x0 + 40, caption.length * 9.8 + 40, 560), cx = (x0 + x1) / 2
  const legend = withLegend ? legendRow(body, cx, y1 + 36, lang) : ''
  const legH = legend ? 30 : 0
  const vx = cx - w / 2, vy = y0 - 16, vh = y1 - y0 + 32 + 38 + legH
  return `<svg viewBox="${f(vx)} ${f(vy)} ${f(w)} ${f(vh)}" role="img" aria-label="${esc(caption)}" xmlns="http://www.w3.org/2000/svg">${DEFS}${body}${legend}<text x="${f(cx)}" y="${f(vy + vh - 10)}" text-anchor="middle" font-size="16" font-weight="600" fill="currentColor">${esc(caption)}</text></svg>`
}
