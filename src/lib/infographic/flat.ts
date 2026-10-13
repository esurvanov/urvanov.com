// Плоские схемы постов (без изометрии): карточки, подписи, стрелки с наконечником-маркером, значки,
// ступени уровней, диаграмма последовательности, оси графика, шкала с порогами, ряды точек.
// Каждая функция возвращает строку SVG; на холсте их рисуют одноимённые методы Canvas (c.card, c.edge, …).
// cls — класс CSS вместо цветов: такие схемы раскрашивает CSS поста, а деталь пишет только геометрию.
import { type Pt } from './iso'
import { A, M, W, esc } from './palette'
import { badge } from './marks'

const f = (v: number) => String(+v.toFixed(4))

/** Атрибуты по порядку; undefined/false/'' пропускаются, числа — с точностью до 0.0001 */
function at(a: Record<string, string | number | undefined | false>) {
  let s = ''
  for (const [k, v] of Object.entries(a)) if (v !== undefined && v !== false && v !== '') s += ` ${k}="${typeof v === 'number' ? f(v) : v}"`
  return s
}

/** Заливка и обводка фигуры. Ничего не задано — фигура без атрибутов цвета (её красит CSS по cls) */
export interface Paint { cls?: string; fill?: string; fillOp?: number; stroke?: string; sw?: number; strokeOp?: number; dash?: string; op?: number; cap?: boolean; join?: boolean; style?: string }
const paint = (p: Paint) => at({ fill: p.fill, 'fill-opacity': p.fillOp, stroke: p.stroke, 'stroke-opacity': p.strokeOp, 'stroke-width': p.sw, 'stroke-linecap': p.cap ? 'round' : undefined, 'stroke-linejoin': p.join ? 'round' : undefined, 'stroke-dasharray': p.dash, opacity: p.op, style: p.style })

/** Прямоугольник (узел схемы, полоса, подложка) */
export const box = (x: number, y: number, w: number, h: number, o: Paint & { rx?: number } = {}) =>
  `<rect${at({ class: o.cls, x, y, width: w, height: h, rx: o.rx })}${paint(o)}/>`
/** Кружок */
export const circ = (x: number, y: number, r: number, o: Paint = {}) => `<circle${at({ class: o.cls, cx: x, cy: y, r })}${paint(o)}/>`
/** Эллипс */
export const oval = (x: number, y: number, rx: number, ry: number, o: Paint = {}) => `<ellipse${at({ class: o.cls, cx: x, cy: y, rx, ry })}${paint(o)}/>`
/** Путь по готовому d; marker — id наконечника из marker() (marker-end) */
export const edge = (d: string, o: Paint & { marker?: string } = {}) =>
  `<path${at({ class: o.cls, d })}${paint(o)}${o.marker ? ` marker-end="url(#${o.marker})"` : ''}/>`

/** Подпись: пишет только заданное (без anchor — от левого края, без col — цвет даёт CSS по cls) */
export interface Txt { size?: number; w?: number | string; col?: string; anchor?: 'start' | 'middle' | 'end'; cls?: string; op?: number; ls?: string }
export const label = (x: number, y: number, t: string, o: Txt = {}) =>
  `<text${at({ class: o.cls, x, y, 'text-anchor': o.anchor, 'font-size': o.size, 'font-weight': o.w, fill: o.col, opacity: o.op, 'letter-spacing': o.ls })}>${esc(t)}</text>`

/** Строка подписи внутри карточки: dy — от верха карточки; dx — от левого края (без dx — по центру) */
export type CardLine = Txt & { t: string; dy: number; dx?: number }
/** Карточка: скруглённый прямоугольник цвета col (полупрозрачная заливка + обводка) и строки подписи.
 *  fill/stroke можно задать отдельно (stroke: W у чужой системы, fill: 'none' у пустой рамки) */
export function card(x: number, y: number, w: number, h: number, col: string, o: Paint & { rx?: number; lines?: CardLine[] } = {}) {
  const { rx = 12, lines = [], ...p } = o
  let s = box(x, y, w, h, { rx, fill: p.fill ?? col, fillOp: p.fill === undefined ? p.fillOp ?? 0.1 : p.fillOp, stroke: p.stroke ?? col, sw: p.sw ?? 2, ...omit(p, ['fill', 'fillOp', 'stroke', 'sw']) })
  for (const { t, dy, dx, ...tx } of lines) s += label(dx === undefined ? x + w / 2 : x + dx, y + dy, t, { anchor: dx === undefined ? 'middle' : tx.anchor, col: col, ...tx })
  return s
}
const omit = <T extends object>(o: T, k: string[]) => Object.fromEntries(Object.entries(o).filter(([n]) => !k.includes(n))) as Partial<T>

/** Наконечник-маркер для edge(..., { marker: id }): треугольник 10×10, цвет — cls или style */
export const marker = (id: string, o: { cls?: string; style?: string } = {}) =>
  `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z"${at({ class: o.cls, style: o.style })}/></marker>`
/** Обёртка <defs> для маркеров и масок */
export const defs = (...items: string[]) => `<defs>${items.join('')}</defs>`
/** Маска по форме (clipPath) */
export const clip = (id: string, shape: string) => `<clipPath id="${id}" clipPathUnits="userSpaceOnUse">${shape}</clipPath>`
/** Круг одним контуром для маски: несколько кругов в одном path с evenodd дают «исключающее или» */
export const circlePath = (cx: number, cy: number, r: number) => `M${f(cx - r)},${f(cy)} A${r},${r} 0 1,0 ${f(cx + r)},${f(cy)} A${r},${r} 0 1,0 ${f(cx - r)},${f(cy)} Z`
/** Нарисованное внутри — только в пределах маски id */
export const clipped = (id: string, inner: string) => `<g clip-path="url(#${id})">${inner}</g>`

/** Печать в круге: галочка (готово, наше) или замок (закрыто, чужое). ck = [отступ слева, высота, правый конец] галочки */
export function seal(x: number, y: number, col: string, kind: 'check' | 'lock' = 'check', o: { r?: number; ck?: [number, number, number]; w?: number } = {}) {
  const { r = 15, ck = [6, 4.5, 7], w = 2.6 } = o
  const [a, b, c] = ck
  const inner = kind === 'check'
    ? `<path d="M-${a} 0l${b} ${b}L${c} -${b}" fill="none" stroke="#fff" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`
    : '<rect x="-6" y="-2" width="12" height="9" rx="2" fill="#fff"/><path d="M-3.5 -2V-5a3.5 3.5 0 0 1 7 0V-2" fill="none" stroke="#fff" stroke-width="2"/>'
  return `<g transform="translate(${f(x)},${f(y)})"><circle r="${r}" fill="${col}"/>${inner}</g>`
}

/** Кружок с нарисованным «!»: тревога, конфликт */
export const alert = (x: number, y: number, col = W, r = 10) =>
  `<g transform="translate(${f(x)},${f(y)})"><circle r="${r}" fill="${col}"/><path d="M0 -5.5V1.5" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><circle cx="0" cy="5.2" r="1.6" fill="#fff"/></g>`

/** Плоский робот-агент: (x, y) — низ ног, k — масштаб (1 ≈ 32×46 px) */
export const bot = (x: number, y: number, k = 1, col = A) =>
  `<g transform="translate(${f(x)},${f(y)}) scale(${k})"><rect x="-16" y="-34" width="32" height="30" rx="8" fill="${col}"/><circle cx="-6" cy="-22" r="3" fill="#fff"/><circle cx="6" cy="-22" r="3" fill="#fff"/>` +
  `<path d="M-5 -13q5 4 10 0" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M0 -34v-8" stroke="${col}" stroke-width="2.5"/><circle cx="0" cy="-44" r="3.5" fill="${col}"/>` +
  `<rect x="-11" y="-4" width="9" height="6" rx="2" fill="${col}" opacity=".7"/><rect x="2" y="-4" width="9" height="6" rx="2" fill="${col}" opacity=".7"/></g>`

/** Линейные значки (контур); координаты — от точки привязки icon(x, y, …) */
export const ICONS = {
  /** книга с плюсом: библия проекта (рамка 24×24, привязка — левый верхний угол) */
  book: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11M12 7v4M10 9h4"/>',
  /** реплика чата (центр) */
  chat: '<path d="M-9 -7h18v11h-8l-4 4v-4h-6z"/>',
  /** треугольник с «!» (центр) */
  warn: '<path d="M0 -9l10 17h-20z"/><path d="M0 -3v5M0 5h.01"/>',
  /** файл с загнутым углом (центр) */
  file: '<path d="M-7 -9h9l6 6v12h-15z"/><path d="M2 -9v6h6"/>',
  /** замок на подложке (низ дужки) */
  lock: '<rect x="-7" y="0" width="14" height="10" rx="2" fill="var(--surface-2)"/><path d="M-4 0v-4a4 4 0 0 1 8 0v4"/>',
  /** колокольчик-алерт, рисуется заливкой (центр купола) */
  bell: '<path d="M-9 8V-1a9 9 0 0 1 18 0V8l3 3H-12z"/><circle cx="0" cy="14" r="3"/>',
  /** человек: голова и плечи (центр головы) */
  user: '<circle cx="0" cy="0" r="3.5"/><path d="M-5.6 11.2c0-3.9 2.6-6.3 5.6-6.3s5.6 2.4 5.6 6.3"/>',
  /** документ со строками (левый верхний угол) */
  doc: '<path d="M0 0h10l4 4v14h-14z"/><path d="M3 7h8"/><path d="M3 11h8"/><path d="M3 15h5"/>',
  /** чек-лист: рамка и три строки с галочками (левый верхний угол) */
  checklist: '<rect x="0" y="0" width="24" height="32" rx="3"/><path d="M4 8l2 2 3-3M12 9h8"/><path d="M4 16l2 2 3-3M12 17h8"/><path d="M4 24l2 2 3-3M12 25h8"/>',
} as const
export type IconName = keyof typeof ICONS
/** Значок из ICONS: контур цвета col толщины w (или заливка: solid), k — масштаб; round: false — без скруглённых концов */
export function icon(x: number, y: number, name: IconName, col = M, o: { k?: number; w?: number; solid?: boolean; round?: boolean } = {}) {
  const { k = 1, w = 2, solid = false, round = true } = o
  const tr = `translate(${f(x)},${f(y)})${k !== 1 ? ` scale(${k})` : ''}`
  const st = solid ? ` fill="${col}"` : ` fill="none" stroke="${col}" stroke-width="${w}"${round ? ' stroke-linecap="round" stroke-linejoin="round"' : ''}`
  return `<g transform="${tr}"${st}>${ICONS[name]}</g>`
}

/** Ступень лестницы уровней (модель OSI, слои): плашка w×h с номером, названием и подписью или своими метками.
 *  Номер — (x + 14, y + 15), название — (x + 32, y + 15), подпись — (x + 32, y + 30) */
export function layer(x: number, y: number, w: number, n: number | string, name: string, o: { h?: number; sub?: string; col?: string; fillOp?: number; rx?: number } = {}) {
  const { h = 36, sub, col = M, fillOp = 0.1, rx = 8 } = o
  let s = box(x, y, w, h, { rx, fill: col, fillOp, stroke: col, sw: 1.5 })
  s += label(x + 14, y + 15, String(n), { size: 13, w: 800, col }) + label(x + 32, y + 15, name, { size: 12.5, col: 'currentColor' })
  if (sub) s += label(x + 32, y + 30, sub, { size: 10.5, col })
  return s
}
/** Маленькая метка шага с подписью справа (внутри ступени): кружок r = 7 с цифрой, текст на 10 px правее */
export const stepTag = (x: number, y: number, n: number | string, t: string, col = W, tcol = M) =>
  badge(x, y, col, String(n), { r: 7, size: 9.5, dy: 3, w: 800 }) + label(x + 10, y + 3, t, { size: 10.5, col: tcol })

/** Участник диаграммы последовательности: шапка w×h с центром x и пунктирная линия жизни до y2 */
export function lifeline(x: number, y: number, t: string, y2: number, o: { w?: number; h?: number; col?: string; fill?: string } = {}) {
  const { w = 110, h = 30, col = 'var(--line-strong)', fill = 'var(--surface-2)' } = o
  return box(x - w / 2, y, w, h, { rx: 4, fill, stroke: col }) + label(x, y + 20, t, { anchor: 'middle', size: 13, w: 700, col: 'currentColor' }) +
    `<path d="M${f(x)} ${f(y + h)}V${f(y2)}" stroke="${col}" stroke-dasharray="4 4"/>`
}
/** Сообщение между линиями жизни: горизонтальная стрелка x1 → x2 на высоте y с подписью над серединой */
export function message(x1: number, x2: number, y: number, t: string, col = 'currentColor') {
  const k = x2 > x1 ? -8 : 8
  return `<path d="M${f(x1)} ${f(y)}H${f(x2)}" stroke="${col}" stroke-width="2"/><path d="M${f(x2 + k)} ${f(y - 5)}L${f(x2)} ${f(y)}L${f(x2 + k)} ${f(y + 5)}" fill="none" stroke="${col}" stroke-width="2"/>` +
    label((x1 + x2) / 2, y - 7, t, { anchor: 'middle', size: 12, col })
}

/** Оси графика в рамке x0..x1 × yTop..yBot: заголовок, сетка с подписями yTicks (снизу вверх, поровну),
 *  засечки и подписи xTicks (поровну слева направо), подпись оси x. Возвращает svg и pt(i, доля 0..1) → точка на графике */
export function chart(x0: number, x1: number, yTop: number, yBot: number, o: { title?: string; xTitle?: string; yTicks?: string[]; xTicks?: string[] }) {
  const { title, xTitle, yTicks = [], xTicks = [] } = o
  const mx = (x0 + x1) / 2, H = yBot - yTop
  const X = (i: number) => x0 + ((x1 - x0) * i) / Math.max(xTicks.length - 1, 1)
  let s = title ? label(mx, yTop - 18, title, { anchor: 'middle', size: 13.5, w: 800, col: 'currentColor' }) : ''
  yTicks.forEach((t, i) => {
    const y = yBot - (H * i) / Math.max(yTicks.length - 1, 1)
    s += `<path d="M${f(x0)} ${f(y)}H${f(x1)}" stroke="currentColor" stroke-opacity=".15" stroke-dasharray="3 4"/>` + label(x0 - 6, y + 4, t, { anchor: 'end', size: 11, w: 400, col: M })
  })
  s += `<path d="M${f(x0)} ${f(yTop)}V${f(yBot)}H${f(x1)}" fill="none" stroke="${M}" stroke-width="1.5"/>`
  xTicks.forEach((t, i) => { s += `<path d="M${f(X(i))} ${f(yBot)}v4" stroke="${M}"/>` + label(X(i), yBot + 16, t, { anchor: 'middle', size: 11, w: 400, col: M }) })
  if (xTitle) s += label(mx, yBot + 34, xTitle, { anchor: 'middle', size: 12, w: 600, col: M })
  const pt = (i: number, v: number): Pt => [X(i), yBot - H * v]
  return { svg: s, pt }
}
/** Линия ряда данных по точкам; dots — радиус точек на каждом значении */
export function series(pts: Pt[], col: string, o: { w?: number; dots?: number; join?: boolean } = {}) {
  const { w = 3.5, dots, join = true } = o
  let s = `<path d="${pts.map(([x, y], i) => `${i ? 'L' : 'M'}${f(x)} ${f(y)}`).join('')}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"${join ? ' stroke-linejoin="round"' : ''}/>`
  if (dots) for (const [x, y] of pts) s += `<circle cx="${f(x)}" cy="${f(y)}" r="${dots}" fill="${col}"/>`
  return s
}

/** Отрезок шкалы: ширина, цвет, заголовок над полосой, строки под ней, значок в середине полосы */
export interface Band { w: number; col: string; title: string; lines: string[]; icon?: IconName; fillOp?: number }
/** Шкала с порогами: полосы подряд от x на высоте y (высота h), пороги между ними с подписями ticks,
 *  start — подпись в начале, unit — в конце (под шкалой) */
export function scale(x: number, y: number, bands: Band[], o: { h?: number; ticks?: string[]; start?: string; unit?: string } = {}) {
  const { h = 26, ticks = [], start, unit } = o
  let s = '', cx = x
  const bounds: number[] = []
  for (const b of bands) {
    const mx = cx + b.w / 2
    s += box(cx, y, b.w, h, { fill: b.col, fillOp: b.fillOp ?? 0.18, stroke: b.col, sw: 1.5 }) + label(mx, y - 18, b.title, { anchor: 'middle', size: 12.5, w: 700, col: b.col })
    b.lines.forEach((t, i) => { s += label(mx, y + 52 + 16 * i, t, { anchor: 'middle', size: 11.5, col: 'currentColor' }) })
    cx += b.w
    bounds.push(cx)
  }
  cx = x
  for (const b of bands) { if (b.icon) s += icon(cx + b.w / 2, y + h / 2, b.icon, b.col); cx += b.w }
  ticks.forEach((t, i) => { const bx = bounds[i]; s += `<path d="M${f(bx)} ${f(y - 8)}V${f(y + h + 8)}" stroke="currentColor" stroke-width="2"/>` + label(bx, y + 90, t, { anchor: 'middle', size: 12, w: 700, col: 'currentColor' }) })
  if (start) s += label(x, y + 90, start, { anchor: 'start', size: 11, col: M })
  if (unit) s += label(cx, y + 90, unit, { anchor: 'end', size: 11, col: M })
  return s
}

/** Ряд кружков-счётчиков: n штук с шагом gap, первые filled залиты цветом col, остальные — пустые кольца цвета ring */
export function dotRow(x: number, y: number, n: number, filled: number, col: string, o: { gap?: number; r?: number; ring?: string } = {}) {
  const { gap = 8.4, r = 3, ring = 'var(--line-2)' } = o
  let s = ''
  for (let i = 0; i < n; i++) {
    const cx = x + gap * i
    s += i < filled ? `<circle cx="${f(cx)}" cy="${f(y)}" r="${r}" fill="${col}" stroke="none"/>` : `<circle cx="${f(cx)}" cy="${f(y)}" r="${r}" fill="none" stroke="${ring}" stroke-width="1.2"/>`
  }
  return s
}
