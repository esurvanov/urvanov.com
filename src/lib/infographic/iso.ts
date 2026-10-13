// Изометрический мини-мир: пол, фигуры (человек, агент, куб, документ, панель, цилиндр), стрелки, подписи, бегущая точка.
// Сцена собирается вызовами методов и отдаётся строкой SVG через render(); рамку с легендой и подписью даёт frame().
import { type Lang, S2, W, esc, f } from './palette'
import { bug } from './marks'

export const DEFS =
  '<defs>' +
  '<filter id="isb" filterUnits="userSpaceOnUse" x="-40" y="-40" width="800" height="360"><feGaussianBlur stdDeviation="3.2"/></filter>' +
  '<radialGradient id="iss" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></radialGradient>' +
  '<linearGradient id="isl" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>' +
  '</defs>'

export type Pt = [number, number]

export class Iso {
  lang: Lang = 'ru'
  ground: string[] = []
  grp = ''
  wrap(s: string) { return this.grp ? `<g ${this.grp}>${s}</g>` : s }
  obj: [number, string][] = []
  ox: number
  oy: number
  U: number
  constructor(ox: number, oy: number, U = 24) { this.ox = ox; this.oy = oy; this.U = U }
  p(gx: number, gy: number, gz = 0): Pt {
    return [this.ox + (gx - gy) * 0.866 * this.U, this.oy + (gx + gy) * 0.5 * this.U - gz * this.U]
  }
  pl(pts: Pt[], fill: string, op = 1, extra = '') {
    const d = pts.map(([x, y]) => `${f(x)},${f(y)}`).join(' ')
    return `<polygon points="${d}" fill="${fill}" fill-opacity="${op}" ${extra}/>`
  }
  boxSvg(gx: number, gy: number, gz: number, w: number, d: number, h: number, col: string, op = 1, sh: [number, number] = [0.16, 0.34]) {
    const P = (x: number, y: number, z: number) => this.p(x, y, z)
    const top = [P(gx, gy, gz + h), P(gx + w, gy, gz + h), P(gx + w, gy + d, gz + h), P(gx, gy + d, gz + h)]
    const left = [P(gx, gy + d, gz), P(gx + w, gy + d, gz), P(gx + w, gy + d, gz + h), P(gx, gy + d, gz + h)]
    const right = [P(gx + w, gy, gz), P(gx + w, gy + d, gz), P(gx + w, gy + d, gz + h), P(gx + w, gy, gz + h)]
    return this.pl(left, col, op) + this.pl(left, '#000', sh[0] * op) + this.pl(right, col, op) + this.pl(right, '#000', sh[1] * op) + this.pl(top, col, op) + this.pl(top, '#fff', 0.14 * op)
  }
  shadow(gx: number, gy: number, rx = 15, op = 0.38) {
    const [x, y] = this.p(gx, gy)
    return `<ellipse cx="${f(x)}" cy="${f(y + 1)}" rx="${rx}" ry="${f(rx * 0.5)}" fill="#000" opacity="${op}" filter="url(#isb)"/>`
  }
  add(depth: number, svg: string) { this.obj.push([depth, this.wrap(svg)]) }
  tile(gx: number, gy: number, w: number, d: number, o: { col?: string; h?: number; grid?: boolean; dash?: string; edge?: string } = {}) {
    const { col = S2, h = 0.35, grid = true, dash, edge } = o
    const g0 = this.ground.length
    this.ground.push(this.boxSvg(gx, gy, -h, w, d, h, col, 1, [0.25, 0.45]))
    const P = (x: number, y: number) => this.p(x, y, 0)
    if (grid) {
      let l = ''
      for (let i = 1; i < Math.floor(w); i++) { const a = P(gx + i, gy), b = P(gx + i, gy + d); l += `M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}` }
      for (let j = 1; j < Math.floor(d); j++) { const a = P(gx, gy + j), b = P(gx + w, gy + j); l += `M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}` }
      this.ground.push(`<path d="${l}" stroke="currentColor" stroke-width=".6" opacity=".09" fill="none"/>`)
    }
    if (dash || edge) {
      const q = [P(gx, gy), P(gx + w, gy), P(gx + w, gy + d), P(gx, gy + d)]
      this.ground.push(this.pl(q, 'none', 1, `stroke="${edge || 'currentColor'}" stroke-width="1.6" stroke-dasharray="${dash || 'none'}" stroke-linejoin="round"`))
    }
    this.ground.push(this.wrap(this.ground.splice(g0).join('')))
  }
  box(gx: number, gy: number, gz: number, w: number, d: number, h: number, col: string, op = 1) {
    this.add(gx + gy + (w + d) / 2 + gz * 0.01, this.boxSvg(gx, gy, gz, w, d, h, col, op))
  }
  sphere(x: number, y: number, r: number, col: string) {
    return `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${col}"/><circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="url(#iss)"/>`
  }
  person(gx: number, gy: number, col: string, label?: string, gz = 0) {
    if (label === undefined) label = this.lang === 'ru' ? 'вы' : 'you'
    const [x, y] = this.p(gx, gy, gz)
    let sv = this.shadow(gx, gy)
    sv += `<rect x="${f(x - 8)}" y="${f(y - 21)}" width="16" height="21" rx="8" fill="${col}"/><rect x="${f(x - 8)}" y="${f(y - 21)}" width="16" height="21" rx="8" fill="url(#isl)"/>`
    sv += this.sphere(x, y - 29, 7.5, col)
    sv += `<circle cx="${f(x - 2.6)}" cy="${f(y - 29.5)}" r="1.1" fill="#000" opacity=".65"/><circle cx="${f(x + 2.6)}" cy="${f(y - 29.5)}" r="1.1" fill="#000" opacity=".65"/>`
    if (label) sv += `<text x="${f(x)}" y="${f(y + 14)}" text-anchor="middle" font-size="12" font-weight="700" fill="${col}" stroke="var(--surface)" stroke-width="3.5" stroke-linejoin="round" paint-order="stroke">${esc(label)}</text>`
    this.add(gx + gy + 0.3, sv)
  }
  agent(gx: number, gy: number, col: string, k = 1, label?: string) {
    if (label === undefined) label = this.lang === 'ru' ? 'агент' : 'agent'
    let sv = this.shadow(gx + 0.45, gy + 0.45, 13 * k) + this.boxSvg(gx, gy, 0, 0.9 * k, 0.9 * k, 0.85 * k, col)
    const a = this.p(gx + 0.45 * k, gy + 0.45 * k, 0.85 * k)
    sv += this.sphere(a[0], a[1] - 8 * k, 3 * k, col) + `<path d="M${f(a[0])} ${f(a[1])}V${f(a[1] - 6 * k)}" stroke="${col}" stroke-width="1.5"/>`
    for (const e of [0.28, 0.62]) { const q = this.p(gx + e * k, gy + 0.9 * k, 0.5 * k); sv += `<circle cx="${f(q[0])}" cy="${f(q[1])}" r="${f(1.9 * k)}" fill="#000" opacity=".6"/>` }
    if (label) { const q = this.p(gx + 0.45 * k, gy + 0.45 * k, 0); sv += `<text x="${f(q[0])}" y="${f(q[1] + 15)}" text-anchor="middle" font-size="12" font-weight="700" fill="${col}" stroke="var(--surface)" stroke-width="3.5" stroke-linejoin="round" paint-order="stroke">${esc(label)}</text>` }
    this.add(gx + gy + k, sv)
  }
  /** tick: true — галочка цвета документа, строка — галочка этого цвета */
  doc(gx: number, gy: number, gz: number, w: number, d: number, col: string, lines = 3, tick: boolean | string = false) {
    let sv = this.shadow(gx + w / 2, gy + d / 2, w * 10, 0.25) + this.boxSvg(gx, gy, gz, w, d, 0.14, col)
    for (let i = 0; i < lines; i++) {
      const yy = lines > 1 ? gy + d * (0.22 + ((0.5 * i) / Math.max(lines - 1, 1)) * 0.9) : gy + d / 2
      const a = this.p(gx + 0.18 * w, yy, gz + 0.14), b = this.p(gx + w * (0.85 - 0.2 * (i % 2)), yy, gz + 0.14)
      sv += `<path d="M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}" stroke="#fff" stroke-opacity=".75" stroke-width="1.7" stroke-linecap="round"/>`
    }
    if (tick) {
      const c = this.p(gx + w * 0.8, gy + d * 0.8, gz + 0.3), tc = typeof tick === 'string' ? tick : col
      sv += `<circle cx="${f(c[0])}" cy="${f(c[1] - 2)}" r="6" fill="${tc}"/><circle cx="${f(c[0])}" cy="${f(c[1] - 2)}" r="6" fill="url(#iss)"/><path d="M${f(c[0] - 3)} ${f(c[1] - 2)}l2.2 2.4 4-4.6" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
    }
    this.add(gx + gy + (w + d) / 2, sv)
  }
  /** title: строка или { text, size = 8.5, x = 1.1 } — кегль и отступ надписи вдоль шапки (в клетках от левого края) */
  panel(gx: number, gy: number, w: number, h: number, col: string, title?: string | { text: string; size?: number; x?: number }, rows = 0, filled = true, gz = 0, d = 0.16) {
    const P = (x: number, y: number, z: number) => this.p(x, y, z)
    let sv = this.shadow(gx + w / 2, gy + d, w * 9, 0.3) + this.boxSvg(gx, gy, gz, w, d, h, col)
    sv += this.pl([P(gx, gy + d, gz + h), P(gx + w, gy + d, gz + h), P(gx + w, gy + d, gz + h - 0.55), P(gx, gy + d, gz + h - 0.55)], '#000', 0.28)
    for (let i = 0; i < 3; i++) { const q = P(gx + 0.25 + i * 0.22, gy + d, gz + h - 0.28); sv += `<circle cx="${f(q[0])}" cy="${f(q[1])}" r="1.5" fill="#fff" opacity=".8"/>` }
    if (title) { const t = typeof title === 'string' ? { text: title } : title, q = P(gx + (t.x ?? 1.1), gy + d, gz + h - 0.38); sv += `<text transform="matrix(0.866 0.5 0 1 ${f(q[0])} ${f(q[1])})" font-size="${t.size ?? 8.5}" font-weight="700" fill="#fff" opacity=".95">${esc(t.text)}</text>` }
    for (let i = 0; i < rows; i++) {
      const zz = gz + h - 1.05 - i * 0.5
      if (zz < gz + 0.25) break
      const p1 = P(gx + 0.3, gy + d, zz), p2 = P(gx + w - 0.3 - (i % 2) * 0.7, gy + d, zz)
      sv += `<path d="M${f(p1[0])} ${f(p1[1])}L${f(p2[0])} ${f(p2[1])}" stroke="#fff" stroke-opacity="${filled ? 0.8 : 0.45}" stroke-width="2.2" stroke-linecap="round"${filled ? '' : ' stroke-dasharray="3 3"'}/>`
    }
    this.add(gx + gy + (w + d) / 2, sv)
  }
  cyl(gx: number, gy: number, gz: number, r: number, h: number, col: string) {
    const [x, y] = this.p(gx, gy, gz), R = r * this.U
    const body = `M${f(x - R)} ${f(y - h * this.U)}V${f(y)}a${f(R)} ${f(R * 0.5)} 0 0 0 ${f(2 * R)} 0V${f(y - h * this.U)}Z`
    let sv = this.shadow(gx, gy, R * 1.1, 0.3) + `<path d="${body}" fill="${col}"/><path d="${body}" fill="url(#isl)"/>`
    sv += `<ellipse cx="${f(x)}" cy="${f(y - h * this.U)}" rx="${f(R)}" ry="${f(R * 0.5)}" fill="${col}"/><ellipse cx="${f(x)}" cy="${f(y - h * this.U)}" rx="${f(R)}" ry="${f(R * 0.5)}" fill="#fff" opacity=".18"/>`
    this.add(gx + gy + r, sv)
  }
  path(pts: Pt[], col: string, o: { w?: number; dash?: string; arrow?: boolean; op?: number; z?: number; cls?: string } = {}) {
    const { w = 2.2, dash, arrow = false, op = 1, z = 0, cls } = o
    const P = pts.map(([x, y]) => this.p(x, y, z))
    let s = `<path${cls ? ` class="${cls}"` : ''} d="M${P.map(([x, y]) => `${f(x)} ${f(y)}`).join('L')}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${op}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
    if (arrow) {
      const [x1, y1] = P[P.length - 2], [x2, y2] = P[P.length - 1]
      const a = Math.atan2(y2 - y1, x2 - x1)
      s += `<path d="M${f(x2 - 7 * Math.cos(a - 0.5))} ${f(y2 - 7 * Math.sin(a - 0.5))}L${f(x2)} ${f(y2)}L${f(x2 - 7 * Math.cos(a + 0.5))} ${f(y2 - 7 * Math.sin(a + 0.5))}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${op}"/>`
    }
    this.ground.push(this.wrap(s))
  }
  // Светящаяся точка бежит по маршруту: показывает, в каком порядке идёт работа
  pulse(pts: Pt[], col: string, dur = 6) {
    const d = pts.map(([x, y], i) => { const [a, b] = this.p(x, y); return `${i ? 'L' : 'M'}${f(a)} ${f(b)}` }).join('')
    this.add(998, `<g class="pulse"><circle r="9" fill="${col}" opacity=".25"><animateMotion dur="${dur}s" repeatCount="indefinite" path="${d}"/></circle><circle r="4.5" fill="${col}"><animateMotion dur="${dur}s" repeatCount="indefinite" path="${d}"/></circle></g>`)
  }
  /** Площадка на полу; op — прозрачность цветного диска (пройденный/пропущенный шаг) */
  pad(gx: number, gy: number, col: string, r = 0.34, op?: number) {
    const [x, y] = this.p(gx, gy), R = r * this.U * 1.2
    this.ground.push(`<ellipse cx="${f(x)}" cy="${f(y + 2)}" rx="${f(R)}" ry="${f(R * 0.5)}" fill="#000" opacity=".3"/><ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(R)}" ry="${f(R * 0.5)}" fill="${col}"${op !== undefined ? ` opacity="${op}"` : ''}/>`)
  }
  /** Жук-баг, стоящий на полу в (gx, gy) */
  bug(gx: number, gy: number, col = W, gz = 0) {
    const [x, y] = this.p(gx, gy, gz).map((v) => +f(v))
    this.add(gx + gy + 0.2, bug(x, y - 6, col))
  }
  /** Плоская зона на высоте gz: полупрозрачная заливка и пунктирный контур (недостающее, сэкономленное, «здесь пусто») */
  zone(gx: number, gy: number, w: number, d: number, col: string, o: { gz?: number; op?: number; dash?: string } = {}) {
    const { gz = 0, op = 0.2, dash = '4 3' } = o
    const P = (x: number, y: number) => this.p(x, y, gz)
    this.add(gx + gy + (w + d) / 2 + gz * 0.01, this.pl([P(gx, gy), P(gx + w, gy), P(gx + w, gy + d), P(gx, gy + d)], col, op, `stroke="${col}" stroke-width="1.4" stroke-dasharray="${dash}" stroke-linejoin="round"`))
  }
  /** ls — разрядка (letter-spacing), например '.08em' */
  // Значок из 24×24 (как у иконок интерфейса), лежащий на плоскости z = gz; k — сторона в клетках
  glyph(gx: number, gy: number, gz: number, k: number, d: string, col = '#fff', w = 2) {
    const s = (k * this.U) / 24, [ex, ey] = this.p(gx - k / 2, gy - k / 2, gz), m = (n: number) => n.toFixed(3)
    return `<path d="${d}" transform="matrix(${m(0.866 * s)} ${m(0.5 * s)} ${m(-0.866 * s)} ${m(0.5 * s)} ${f(ex)} ${f(ey)})" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`
  }
  // Плитка-жетон со значком сверху: единый вид для частей харнесса. Значок стоит прямо, лицом к зрителю, чтобы читался
  token(gx: number, gy: number, k: number, d: string, col: string, h = 0.35) {
    let sv = this.shadow(gx, gy, k * 13, 0.3) + this.boxSvg(gx - k / 2, gy - k / 2, 0, k, k, h, col)
    const [cx, cy] = this.p(gx, gy, h), px = k * this.U * 0.62, s = px / 24
    sv += `<path d="${d}" transform="translate(${f(cx - px / 2)} ${f(cy - px / 2 - 2)}) scale(${s.toFixed(3)})" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`
    this.add(gx + gy + k, sv)
  }
  text(gx: number, gy: number, t: string, col: string, o: { gz?: number; size?: number; w?: number; dx?: number; dy?: number; halo?: boolean; ls?: string; anchor?: 'start' | 'middle' | 'end' } = {}) {
    const { gz = 0, size = 11, w = 600, dx = 0, dy = 0, halo = t !== '' && col !== '#fff', ls, anchor = 'middle' } = o
    const [x, y] = this.p(gx, gy, gz)
    this.add(999, `<text x="${f(x + dx)}" y="${f(y + dy)}" text-anchor="${anchor}" font-size="${size}" font-weight="${w}" fill="${col}"${ls ? ` letter-spacing="${ls}"` : ''}${halo ? ' stroke="var(--surface)" stroke-width="3.5" stroke-linejoin="round" paint-order="stroke"' : ''}>${esc(t)}</text>`)
  }
  render() { return this.ground.join('') + [...this.obj].sort((a, b) => a[0] - b[0]).map((t) => t[1]).join('') }

  // ── Словарь предметов: одно понятие — один объёмный предмет на всех схемах. (gx, gy) — центр, k — размер в клетках
  private ln(pts: [number, number, number][], col: string, w = 1.6, op = 1) {
    const d = pts.map(([x, y, z], i) => { const [a, b] = this.p(x, y, z); return `${i ? 'L' : 'M'}${f(a)} ${f(b)}` }).join('')
    return `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${op}"/>`
  }
  private face(pts: [number, number, number][], fill: string, op = 1) { return this.pl(pts.map(([x, y, z]) => this.p(x, y, z)), fill, op) }
  private sheet(x: number, y: number, z: number, w: number, d: number, lines = 2) {
    let sv = this.boxSvg(x, y, z, w, d, 0.05, '#fff', 0.92)
    for (let i = 0; i < lines; i++) { const yy = y + d * (0.3 + i * 0.25); sv += this.ln([[x + w * 0.15, yy, z + 0.05], [x + w * (0.8 - (i % 2) * 0.2), yy, z + 0.05]], '#000', 1.3, 0.35) }
    return sv
  }
  // Контекст: лоток со стопкой листов
  tray(gx: number, gy: number, k: number, col: string) {
    let sv = this.shadow(gx, gy, k * 13, 0.3) + this.boxSvg(gx - k / 2, gy - k * 0.4, 0, k, k * 0.8, 0.14, col)
    for (let i = 0; i < 3; i++) sv += this.sheet(gx - k * 0.38, gy - k * 0.3, 0.14 + i * 0.09, k * 0.76, k * 0.6, i === 2 ? 3 : 0)
    this.add(gx + gy + k, sv)
  }
  // Тул: ящик с инструментами и ручкой
  toolbox(gx: number, gy: number, k: number, col: string) {
    const w = k * 0.9, d = k * 0.55, h = k * 0.42, x = gx - w / 2, y = gy - d / 2
    let sv = this.shadow(gx, gy, k * 13, 0.3) + this.boxSvg(x, y, 0, w, d, h, col) + this.boxSvg(x - 0.03, y - 0.03, h, w + 0.06, d + 0.06, 0.07, col)
    sv += this.ln([[x + w * 0.42, y + d, h * 0.55], [x + w * 0.58, y + d, h * 0.55]], '#fff', 2.2, 0.8)
    const hz = h + 0.07
    sv += this.boxSvg(gx - w * 0.28, gy - 0.04, hz, 0.07, 0.08, 0.24, col) + this.boxSvg(gx + w * 0.21, gy - 0.04, hz, 0.07, 0.08, 0.24, col) + this.boxSvg(gx - w * 0.28, gy - 0.04, hz + 0.24, w * 0.56, 0.08, 0.07, col)
    this.add(gx + gy + k, sv)
  }
  // Проверки: планшет-чеклист на подставке
  clipboard(gx: number, gy: number, k: number, col: string) {
    const w = k * 0.8, x = gx - w / 2, yf = gy + 0.06, H = k * 0.95
    let sv = this.shadow(gx, gy, k * 12, 0.3) + this.boxSvg(gx - k * 0.35, gy - k * 0.2, 0, k * 0.7, k * 0.4, 0.08, col) + this.boxSvg(x, gy - 0.06, 0.08, w, 0.12, H, col)
    sv += this.face([[x + 0.08, yf + 0.001, 0.16], [x + w - 0.08, yf + 0.001, 0.16], [x + w - 0.08, yf + 0.001, H - 0.04], [x + 0.08, yf + 0.001, H - 0.04]], '#fff', 0.92)
    for (let i = 0; i < 3; i++) {
      const z = H - 0.22 - i * (H - 0.4) / 2.6, cx = x + 0.2
      sv += this.ln([[cx - 0.06, yf, z], [cx, yf, z - 0.07], [cx + 0.12, yf, z + 0.08]], col, 2.2) + this.ln([[cx + 0.22, yf, z], [x + w - 0.18 - (i % 2) * 0.12, yf, z]], '#000', 1.3, 0.35)
    }
    this.add(gx + gy + k, sv)
  }
  // CLAUDE.md и подобные файлы инструкций: табличка на ножках с надписью
  sign(gx: number, gy: number, k: number, col: string, title: string) {
    const w = k, x = gx - w / 2, z0 = k * 0.28, H = k * 0.55
    let sv = this.shadow(gx, gy, k * 12, 0.3) + this.boxSvg(x + 0.1, gy - 0.03, 0, 0.06, 0.06, z0, col) + this.boxSvg(x + w - 0.16, gy - 0.03, 0, 0.06, 0.06, z0, col) + this.boxSvg(x, gy - 0.05, z0, w, 0.1, H, col)
    const [tx, ty] = this.p(x + w * 0.08, gy + 0.05, z0 + H * 0.36)
    sv += `<text transform="matrix(0.866 0.5 0 1 ${f(tx)} ${f(ty)})" font-size="${f(k * 6.2)}" font-weight="800" fill="#fff">${esc(title)}</text>`
    this.add(gx + gy + k, sv)
  }
  // Библия проекта: толстая книга, корешок к зрителю слева, страницы справа
  book(gx: number, gy: number, k: number, col: string) {
    const w = k * 0.9, d = k * 0.64, x = gx - w / 2, y = gy - d / 2, T = k * 0.32
    let sv = this.shadow(gx, gy, k * 13, 0.3) + this.boxSvg(x, y, 0, w, d, 0.06, col) + this.boxSvg(x + 0.03, y + 0.02, 0.06, w - 0.06, d - 0.06, T, '#fff', 0.9)
    for (let i = 1; i < 4; i++) sv += this.ln([[x + w - 0.03, y + 0.04, 0.06 + T * i / 4], [x + w - 0.03, y + d - 0.06, 0.06 + T * i / 4]], '#000', 0.8, 0.25)
    sv += this.boxSvg(x, y + d - 0.06, 0, w, 0.06, T + 0.12, col) + this.boxSvg(x, y, T + 0.06, w, d, 0.06, col)
    sv += this.ln([[x + w * 0.25, y + d * 0.45, T + 0.12], [x + w * 0.75, y + d * 0.45, T + 0.12]], '#fff', 2, 0.8)
    this.add(gx + gy + k, sv)
  }
  // Скиллы: ящик-картотека с карточками и цветными вкладками
  cards(gx: number, gy: number, k: number, col: string) {
    const w = k * 0.8, d = k * 0.6, x = gx - w / 2, y = gy - d / 2, h = k * 0.3
    let sv = this.shadow(gx, gy, k * 13, 0.3)
    for (let i = 0; i < 4; i++) {
      const cx = x + 0.08 + i * (w - 0.2) / 3, ch = h + k * (0.22 + (i % 2) * 0.1)
      sv += this.boxSvg(cx, y + 0.06, 0.04, 0.05, d - 0.12, ch, '#fff', 0.92) + this.boxSvg(cx, y + 0.06 + (i * 0.13) % (d - 0.3), ch + 0.04, 0.05, 0.16, 0.08, col)
    }
    sv += this.boxSvg(x, y, 0, w, d, h * 0.55, col)
    this.add(gx + gy + k, sv)
  }
  // Память: шкаф с выдвижными ящиками
  cabinet(gx: number, gy: number, k: number, col: string) {
    const w = k * 0.7, d = k * 0.6, x = gx - w / 2, y = gy - d / 2, H = k * 0.75, yf = y + d
    let sv = this.shadow(gx, gy, k * 12, 0.3) + this.boxSvg(x, y, 0, w, d, H, col)
    for (let i = 0; i < 3; i++) {
      const z0 = H * i / 3, zm = z0 + H / 6
      if (i) sv += this.ln([[x + 0.04, yf, z0], [x + w - 0.04, yf, z0]], '#000', 1.4, 0.4)
      sv += this.ln([[gx - w * 0.15, yf, zm], [gx + w * 0.15, yf, zm]], '#fff', 2.4, 0.9)
    }
    this.add(gx + gy + k, sv)
  }
  // Логи: рулон с разматывающейся лентой записей
  roll(gx: number, gy: number, k: number, col: string) {
    let sv = this.shadow(gx, gy, k * 12, 0.25) + this.sheet(gx - k * 0.12, gy - k * 0.22, 0, k * 0.62, k * 0.44, 3)
    const [cx, cy] = this.p(gx - k * 0.28, gy, 0), R = k * 0.2 * this.U, H = k * 0.5 * this.U
    const body = `M${f(cx - R)} ${f(cy - H)}V${f(cy)}a${f(R)} ${f(R * 0.5)} 0 0 0 ${f(2 * R)} 0V${f(cy - H)}Z`
    sv += `<path d="${body}" fill="${col}"/><path d="${body}" fill="url(#isl)"/><ellipse cx="${f(cx)}" cy="${f(cy - H)}" rx="${f(R)}" ry="${f(R * 0.5)}" fill="#fff" opacity=".9"/><ellipse cx="${f(cx)}" cy="${f(cy - H)}" rx="${f(R * 0.35)}" ry="${f(R * 0.17)}" fill="${col}"/>`
    this.add(gx + gy + k, sv)
  }
  // MCP: разъём-блок с вилкой и кабелем
  plug(gx: number, gy: number, k: number, col: string, metal: string, label = 'MCP') {
    const w = k * 0.6, d = k * 0.6, x = gx - w / 2 - k * 0.1, y = gy - d / 2, h = k * 0.42
    let sv = this.shadow(gx, gy, k * 12, 0.3) + this.ln([[x, gy, 0.05], [x - k * 0.25, gy + k * 0.15, 0.05], [x - k * 0.3, gy + k * 0.45, 0.05]], col, 3)
    sv += this.boxSvg(x, y, 0, w, d, h, col)
    for (const oy of [-0.17, 0.09]) sv += this.boxSvg(x + w, gy + k * oy, h * 0.4, k * 0.26, 0.07, 0.07, metal)
    const [tx, ty] = this.p(x + w / 2, y + d / 2, h)
    sv += `<text x="${f(tx)}" y="${f(ty + 3)}" text-anchor="middle" font-size="${f(k * 8)}" font-weight="800" fill="#fff">${label}</text>`
    this.add(gx + gy + k, sv)
  }
  // Терминал: монитор на подставке с приглашением «>_»
  monitor(gx: number, gy: number, k: number, col: string) {
    const w = k, x = gx - w / 2, z0 = k * 0.28, H = k * 0.62, yf = gy + 0.07
    let sv = this.shadow(gx, gy, k * 12, 0.3) + this.boxSvg(gx - k * 0.2, gy - k * 0.15, 0, k * 0.4, k * 0.3, 0.05, col) + this.boxSvg(gx - 0.05, gy - 0.03, 0.05, 0.1, 0.06, z0, col)
    sv += this.boxSvg(x, gy - 0.07, z0, w, 0.14, H, col) + this.face([[x + 0.07, yf + 0.001, z0 + 0.07], [x + w - 0.07, yf + 0.001, z0 + 0.07], [x + w - 0.07, yf + 0.001, z0 + H - 0.07], [x + 0.07, yf + 0.001, z0 + H - 0.07]], '#000', 0.55)
    const zt = z0 + H * 0.55
    sv += this.ln([[x + 0.18, yf, zt + 0.08], [x + 0.3, yf, zt], [x + 0.18, yf, zt - 0.08]], '#fff', 2) + this.ln([[x + 0.36, yf, zt - 0.1], [x + 0.56, yf, zt - 0.1]], '#fff', 2)
    this.add(gx + gy + k, sv)
  }
  // Хуки: шлагбаум перед действием
  barrier(gx: number, gy: number, k: number, col: string) {
    const x = gx - k * 0.5, H = k * 0.5, L = k
    let sv = this.shadow(gx, gy, k * 12, 0.25) + this.boxSvg(x, gy - 0.1, 0, 0.2, 0.2, H, col) + this.boxSvg(x + L - 0.1, gy - 0.05, 0, 0.1, 0.1, H * 0.75, col)
    sv += this.boxSvg(x + 0.1, gy - 0.04, H * 0.78, L, 0.08, 0.1, col)
    for (let i = 0; i < 4; i++) { const a = x + 0.2 + i * L / 4.2; sv += this.face([[a, gy + 0.041, H * 0.78], [a + 0.1, gy + 0.041, H * 0.78], [a + 0.1, gy + 0.041, H * 0.78 + 0.1], [a, gy + 0.041, H * 0.78 + 0.1]], '#fff', 0.9) }
    this.add(gx + gy + k, sv)
  }
  // Права доступа: дверца с навесным замком
  door(gx: number, gy: number, k: number, col: string) {
    const w = k * 0.75, x = gx - w / 2, H = k * 0.95, yf = gy + 0.06
    let sv = this.shadow(gx, gy, k * 12, 0.3) + this.boxSvg(x, gy - 0.06, 0, w, 0.12, H, col)
    sv += this.ln([[x + 0.08, yf, 0.06], [x + 0.08, yf, H - 0.08], [x + w - 0.08, yf, H - 0.08], [x + w - 0.08, yf, 0.06]], '#000', 1.2, 0.3)
    const lx = gx, lz = H * 0.42, lw = k * 0.11
    sv += this.ln([[lx - lw * 0.6, yf + 0.02, lz + 0.1], [lx - lw * 0.6, yf + 0.02, lz + 0.2], [lx, yf + 0.02, lz + 0.26], [lx + lw * 0.6, yf + 0.02, lz + 0.2], [lx + lw * 0.6, yf + 0.02, lz + 0.1]], '#fff', 2.2)
    sv += this.boxSvg(lx - lw, yf, lz - 0.08, lw * 2, 0.05, 0.2, '#fff', 0.95)
    this.add(gx + gy + k, sv)
  }
  // Оркестрация: большой агент раздаёт работу трём маленьким
  orch(gx: number, gy: number, k: number, col: string) {
    const kids: Pt[] = [[gx + k * 0.15, gy - k * 0.55], [gx + k * 0.5, gy + k * 0.05], [gx - k * 0.05, gy + k * 0.5]]
    for (const [x, y] of kids) this.path([[gx - k * 0.25, gy - k * 0.25], [x, y]], col, { w: 1.6, op: 0.7 })
    this.agent(gx - k * 0.55, gy - k * 0.55, col, k * 0.6, '')
    for (const [x, y] of kids) this.agent(x - k * 0.15, y - k * 0.15, col, k * 0.32, '')
  }

}

/** Точка на полу в координатах сетки */
export const tw = (gx: number, gy: number) => [gx, gy] as Pt
/** Пунктирная стрелка по умолчанию */
export const dash = { dash: '4 3', arrow: true }
/** Пустая сцена с полом: tile = [x, y, ширина, глубина] в клетках */
export const isoScene = (t: [number, number, number, number] = [-3, -3, 6, 6]) => { const I = new Iso(350, 226, 40); I.tile(...t); return I }
