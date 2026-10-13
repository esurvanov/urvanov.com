// Сцена для поста: рецепт рисунка на двух языках. В отличие от frame(), без подписи внутри —
// у фигуры в посте свой заголовок и вывод вокруг; легенда цветов добавляется под рисунком.
// Сцена — это холст: на нём несколько изометрических «островков» (у каждого свой пол и начало координат)
// плюс стрелки и подписи в координатах картинки.
import { DEFS, Iso, type Pt } from './iso'
import * as K from './marks'
import * as F from './flat'
import { bounds, legendRow } from './frame'
import { type Lang, A, M, S2, esc, f } from './palette'

export type L = (ru: string, en: string) => string

export class Canvas {
  lang: Lang
  private layers: (Iso | string)[] = []
  constructor(lang: Lang) { this.lang = lang }
  /** Новый изометрический островок: начало координат (ox, oy) в пикселях картинки, размер клетки U */
  iso(ox: number, oy: number, U = 24): Iso { const I = new Iso(ox, oy, U); I.lang = this.lang; this.layers.push(I); return I }
  /** Полупрозрачная группа: то, чего в этом варианте нет, рисуется призраком */
  ghost(op: number, draw: () => void) { this.layers.push(`<g opacity="${op}">`); draw(); this.layers.push('</g>') }
  /** Группа с классом: CSS страницы может подсвечивать или гасить её (например, по выбранной вкладке) */
  group(cls: string, draw: () => void) { this.layers.push(`<g class="${cls}">`); draw(); this.layers.push('</g>') }
  /** Прямая стрелка в координатах картинки (наконечник в конце) */
  arrow(x1: number, y1: number, x2: number, y2: number, col: string, o: { w?: number; dash?: string; head?: boolean; op?: number; cls?: string } = {}) {
    const { w = 2, dash, head = true, op, cls } = o
    const a = Math.atan2(y2 - y1, x2 - x1), k = 7
    const st = ` stroke="${col}" stroke-width="${w}" stroke-linecap="round"${op !== undefined ? ` opacity="${op}"` : ''}`
    let s = `<path${cls ? ` class="${cls}"` : ''} d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}"${st}${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
    if (head) s += `<path d="M${f(x2 - k * Math.cos(a - 0.5))} ${f(y2 - k * Math.sin(a - 0.5))}L${f(x2)} ${f(y2)}L${f(x2 - k * Math.cos(a + 0.5))} ${f(y2 - k * Math.sin(a + 0.5))}" fill="none"${st} stroke-linejoin="round"/>`
    this.layers.push(s)
  }
  /** Подпись в координатах картинки; ls — разрядка ('.08em'), underline — подчёркнутая (ссылка) */
  text(x: number, y: number, t: string, col: string, o: { size?: number; w?: number; anchor?: 'start' | 'middle' | 'end'; halo?: boolean; op?: number; ls?: string; underline?: boolean } = {}) {
    const { size = 11, w, anchor = 'middle', halo = false, op, ls, underline } = o
    this.layers.push(`<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-size="${size}"${w ? ` font-weight="${w}"` : ''} fill="${col}"${ls ? ` letter-spacing="${ls}"` : ''}${underline ? ' text-decoration="underline"' : ''}${op !== undefined ? ` opacity="${op}"` : ''}${halo ? ' stroke="var(--surface)" stroke-width="3.5" stroke-linejoin="round" paint-order="stroke"' : ''}>${esc(t)}</text>`)
  }
  /** Заголовок колонки капсом с разрядкой: БЫЛО / СТАЛО, РУКАМИ / С АГЕНТОМ */
  caps(x: number, y: number, t: string, col: string, o: { size?: number; ls?: string } = {}) { this.text(x, y, t, col, { size: o.size ?? 11, w: 700, ls: o.ls ?? '.08em' }) }
  /** Нумерованный шаг: синий кружок с цифрой и подпись на 30 px ниже */
  step(x: number, y: number, n: number | string, label?: string, col = A) {
    this.badge(x, y, col, String(n), { size: 12 })
    if (label !== undefined) this.text(x, y + 30, label, col, { size: 12 })
  }
  /** Клавиша с надписью (Ctrl+C): (x, y) — левый верхний угол, ширина w */
  keycap(x: number, y: number, t: string, col = M, w = 42) {
    this.rect(x, y, w, 18, { rx: 4, fill: S2, stroke: col, sw: 1.8 })
    this.text(+(x + w / 2).toFixed(2), y + 13.2, t, col, { size: 10, w: 700 })
  }
  /** Всё, что нарисовано внутри draw, становится ссылкой; внешняя (http…) открывается в новой вкладке */
  link(href: string, draw: () => void) {
    this.layers.push(`<a href="${href}"${/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : ''} style="cursor:pointer">`)
    draw()
    this.layers.push('</a>')
  }
  // Детали из marks.ts в координатах картинки (описания — там)
  dot(x: number, y: number, r: number, col: string, o?: { ring?: number; op?: number }) { this.layers.push(K.dot(x, y, r, col, o)) }
  ball(x: number, y: number, r: number, col: string) { this.layers.push(K.ball(x, y, r, col)) }
  rect(x: number, y: number, w: number, h: number, o?: Parameters<typeof K.rect>[4]) { this.layers.push(K.rect(x, y, w, h, o)) }
  pill(x: number, y: number, w: number, h: number, col: string, o?: Parameters<typeof K.pill>[5]) { this.layers.push(K.pill(x, y, w, h, col, o)) }
  badge(x: number, y: number, col: string, glyph?: string, o?: Parameters<typeof K.badge>[4]) { this.layers.push(K.badge(x, y, col, glyph, o)) }
  check(x: number, y: number, k?: number, col?: string, w?: number) { this.layers.push(K.check(x, y, k, col, w)) }
  tick(x: number, y: number, col?: string) { this.layers.push(K.tick(x, y, col)) }
  eye(x: number, y: number, col?: string) { this.layers.push(K.eye(x, y, col)) }
  key(x: number, y: number, col?: string) { this.layers.push(K.key(x, y, col)) }
  lens(x: number, y: number, col?: string) { this.layers.push(K.lens(x, y, col)) }
  pen(x: number, y: number, col?: string) { this.layers.push(K.pen(x, y, col)) }
  film(x: number, y: number, col?: string) { this.layers.push(K.film(x, y, col)) }
  flag(x: number, y: number, col?: string) { this.layers.push(K.flag(x, y, col)) }
  bug(x: number, y: number, col?: string, sh?: number) { this.layers.push(K.bug(x, y, col, sh)) }
  extLink(x: number, y: number, col?: string, s?: number, w?: number) { this.layers.push(K.extLink(x, y, col, s, w)) }
  bubble(x: number, y: number, w: number, h: number, col?: string, o?: Parameters<typeof K.bubble>[5]) { this.layers.push(K.bubble(x, y, w, h, col, o)) }
  plug(x: number, y: number, col?: string, o?: Parameters<typeof K.plug>[3]) { this.layers.push(K.plug(x, y, col, o)) }
  cable(x1: number, y1: number, x2: number, y2: number, col?: string) { this.layers.push(K.cable(x1, y1, x2, y2, col)) }
  line(pts: Pt[], col: string, o?: Parameters<typeof K.line>[2]) { this.layers.push(K.line(pts, col, o)) }
  curve(x1: number, y1: number, x2: number, y2: number, col: string, o?: Parameters<typeof K.curve>[5]) { this.layers.push(K.curve(x1, y1, x2, y2, col, o)) }
  thenArrow(x1: number, x2: number, y: number, col?: string, w?: number) { this.layers.push(K.thenArrow(x1, x2, y, col, w)) }
  funnel(x: number, y: number, col?: string, o?: Parameters<typeof K.funnel>[3]) { this.layers.push(K.funnel(x, y, col, o)) }
  // Плоские детали из flat.ts (описания — там)
  box(x: number, y: number, w: number, h: number, o?: Parameters<typeof F.box>[4]) { this.layers.push(F.box(x, y, w, h, o)) }
  circ(x: number, y: number, r: number, o?: F.Paint) { this.layers.push(F.circ(x, y, r, o)) }
  oval(x: number, y: number, rx: number, ry: number, o?: F.Paint) { this.layers.push(F.oval(x, y, rx, ry, o)) }
  edge(d: string, o?: Parameters<typeof F.edge>[1]) { this.layers.push(F.edge(d, o)) }
  label(x: number, y: number, t: string, o?: F.Txt) { this.layers.push(F.label(x, y, t, o)) }
  card(x: number, y: number, w: number, h: number, col: string, o?: Parameters<typeof F.card>[5]) { this.layers.push(F.card(x, y, w, h, col, o)) }
  seal(x: number, y: number, col: string, kind?: 'check' | 'lock', o?: Parameters<typeof F.seal>[4]) { this.layers.push(F.seal(x, y, col, kind, o)) }
  alert(x: number, y: number, col?: string, r?: number) { this.layers.push(F.alert(x, y, col, r)) }
  bot(x: number, y: number, k?: number, col?: string) { this.layers.push(F.bot(x, y, k, col)) }
  icon(x: number, y: number, name: F.IconName, col?: string, o?: Parameters<typeof F.icon>[4]) { this.layers.push(F.icon(x, y, name, col, o)) }
  layer(x: number, y: number, w: number, n: number | string, name: string, o?: Parameters<typeof F.layer>[5]) { this.layers.push(F.layer(x, y, w, n, name, o)) }
  stepTag(x: number, y: number, n: number | string, t: string, col?: string, tcol?: string) { this.layers.push(F.stepTag(x, y, n, t, col, tcol)) }
  lifeline(x: number, y: number, t: string, y2: number, o?: Parameters<typeof F.lifeline>[4]) { this.layers.push(F.lifeline(x, y, t, y2, o)) }
  message(x1: number, x2: number, y: number, t: string, col?: string) { this.layers.push(F.message(x1, x2, y, t, col)) }
  /** Оси графика; возвращает pt(i, доля) — точку на графике для series() */
  chart(x0: number, x1: number, yTop: number, yBot: number, o: Parameters<typeof F.chart>[4]) { const r = F.chart(x0, x1, yTop, yBot, o); this.layers.push(r.svg); return r.pt }
  series(pts: Pt[], col: string, o?: Parameters<typeof F.series>[2]) { this.layers.push(F.series(pts, col, o)) }
  scale(x: number, y: number, bands: F.Band[], o?: Parameters<typeof F.scale>[3]) { this.layers.push(F.scale(x, y, bands, o)) }
  dotRow(x: number, y: number, n: number, filled: number, col: string, o?: Parameters<typeof F.dotRow>[5]) { this.layers.push(F.dotRow(x, y, n, filled, col, o)) }
  /** Маркеры наконечников, маски и прочие <defs> схемы */
  defs(...items: string[]) { this.layers.push(F.defs(...items)) }
  /** Всё, что нарисовано внутри draw, обрезается маской id (из F.clip в c.defs) */
  clipped(id: string, draw: () => void) {
    this.layers.push(`<g clip-path="url(#${id})">`)
    draw()
    this.layers.push('</g>')
  }
  /** Всплывающая подсказка рисунка (<title>) */
  title(t: string) { this.layers.push(`<title>${esc(t)}</title>`) }
  /** Произвольный кусок SVG, когда готовой детали нет (лучше добавить деталь в библиотеку) */
  raw(svg: string) { this.layers.push(svg) }
  render() { return this.layers.map((x) => (typeof x === 'string' ? x : x.render())).join('') }
}

export interface Scene {
  /** Описание для скринридера (aria-label) */
  ru: string
  en: string
  /** Рамка рисунка [x, y, ширина, высота]; без неё — по нарисованному с полями */
  viewBox?: [number, number, number, number]
  /** false — без легенды (когда цвета на схеме не про роли) */
  legend?: false
  /** Класс <svg> (схемы, которые раскрашивает CSS поста) */
  cls?: string
  /** Свой style у <svg> вместо стандартного; '' — без style (размер задаёт CSS) */
  style?: string
  /** Прочие атрибуты <svg>, которые наследуют детали (fill="none", stroke="currentColor", …) */
  attrs?: Record<string, string>
  draw: (c: Canvas, l: L) => void
}

export function renderScene(sc: Scene, lang: Lang, o: { legend?: boolean } = {}): string {
  const c = new Canvas(lang)
  const l: L = (ru, en) => (lang === 'ru' ? ru : en)
  sc.draw(c, l)
  const body = c.render()
  let [vx, vy, vw, vh] = sc.viewBox ?? (() => { const [x0, y0, x1, y1] = bounds(body); return [x0 - 12, y0 - 12, x1 - x0 + 24, y1 - y0 + 24] })()
  const legend = sc.legend !== false && o.legend !== false ? legendRow(body, vx + vw / 2, vy + vh + 14, lang) : ''
  if (legend) vh += 26
  const label = lang === 'ru' ? sc.ru : sc.en
  const style = sc.style ?? 'width:100%;height:auto;display:block;margin-top:10px'
  const extra = Object.entries(sc.attrs ?? {}).map(([k, v]) => ` ${k}="${v}"`).join('')
  return `<svg${sc.cls ? ` class="${sc.cls}"` : ''} viewBox="${f(vx)} ${f(vy)} ${f(vw)} ${f(vh)}" role="img" aria-label="${esc(label)}"${style ? ` style="${style}"` : ''}${extra}>${DEFS}${body}${legend}</svg>`
}
