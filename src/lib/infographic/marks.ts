// Мелкие детали схем в координатах картинки: значки, кружки-метки, плашки, пузыри, кабель MCP, кривые.
// Каждая функция возвращает строку SVG; на холсте их рисуют одноимённые методы Canvas (c.badge, c.eye, …),
// на изометрическом островке — Iso.bug / Iso.zone или I.add(глубина, деталь(...I.p(gx, gy, gz))).
import { type Pt } from './iso'
import { A, HALO, M, W } from './palette'

// Координаты деталей — с точностью до 0.0001 px: деталь встаёт ровно туда, куда её поставили
const f = (v: number) => String(+v.toFixed(4))
const tr = (x: number, y: number) => `translate(${f(x)},${f(y)})`
const n1 = (v: number) => +v.toFixed(1)

/** Кружок: залитый, или кольцо с толщиной обводки ring */
export function dot(x: number, y: number, r: number, col: string, o: { ring?: number; op?: number } = {}) {
  const op = o.op !== undefined ? ` opacity="${o.op}"` : ''
  return o.ring ? `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="none" stroke="${col}" stroke-width="${o.ring}"${op}/>` : `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${col}"${op}/>`
}

/** Шарик с объёмом (кружок + блик): точки данных, бусины, шаги на площадках */
export const ball = (x: number, y: number, r: number, col: string) => `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${col}"/><circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="url(#iss)"/>`

/** Прямоугольник: столбик диаграммы, клавиша, подложка; fill: 'none' — только контур */
export function rect(x: number, y: number, w: number, h: number, o: { rx?: number; fill?: string; fillOp?: number; stroke?: string; sw?: number; dash?: string; op?: number } = {}) {
  const { rx = 0, fill = M, fillOp, stroke, sw = 1.4, dash, op } = o
  return `<rect x="${f(x)}" y="${f(y)}" width="${n1(w)}" height="${n1(h)}"${rx ? ` rx="${rx}"` : ''} fill="${fill}"${fillOp !== undefined ? ` fill-opacity="${fillOp}"` : ''}${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ''}${dash ? ` stroke-dasharray="${dash}"` : ''}${op !== undefined ? ` opacity="${op}"` : ''}/>`
}

/** Плашка-капсула с обводкой цвета col на светлой подложке (подпись к ней — отдельным текстом) */
export const pill = (x: number, y: number, w: number, h: number, col: string, o: { rx?: number; fill?: string; fillOp?: number; sw?: number } = {}) =>
  rect(x, y, w, h, { rx: o.rx ?? h / 2, fill: o.fill ?? HALO, fillOp: o.fillOp, stroke: col, sw: o.sw ?? 1.4 })

/** Галочка: (x, y) — середина, k — размер (1 ≈ 6×4.5 px), w — толщина */
export const check = (x: number, y: number, k = 1, col = '#fff', w = 3) =>
  `<path d="M${f(x - 3 * k)} ${f(y)}l${n1(2 * k)} ${n1(2 * k)} ${n1(4 * k)} -${n1(4.5 * k)}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`

/** Крестик ×: (x, y) — центр, s — полуразмер */
export const cross = (x: number, y: number, col = '#fff', s = 4, w = 2.4) =>
  `<g transform="${tr(x, y)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"><path d="M-${s} -${s}l${2 * s} ${2 * s}M${s} -${s}l-${2 * s} ${2 * s}"/></g>`

/** Кружок-метка со знаком: цифра шага, !, ?, ✓, ×, ↗ (текстом) или нарисованная галочка/крест (mark).
 *  r — радиус, size — кегль знака, shade — объёмный блик, k — размер нарисованной галочки */
export function badge(x: number, y: number, col: string, glyph = '', o: { r?: number; size?: number; dy?: number; shade?: boolean; mark?: 'check' | 'cross'; k?: number; w?: number } = {}) {
  const { r = 11, size = 13, shade = false, mark, k = 1.2 } = o
  const dy = o.dy ?? Math.round(size * 0.7) / 2
  let s = shade ? ball(x, y, r, col) : dot(x, y, r, col)
  if (mark === 'check') s += check(x, y, k)
  else if (mark === 'cross') s += cross(x, y)
  if (glyph) s += `<text x="${f(x)}" y="${f(y + dy)}" text-anchor="middle" font-size="${size}" font-weight="${o.w ?? 700}" fill="#fff">${glyph}</text>`
  return s
}

/** Галочка «готово» в кружке, как на документе Iso.doc(..., tick): (x, y) — центр кружка */
export const tick = (x: number, y: number, col = A) =>
  `<circle cx="${f(x)}" cy="${f(y)}" r="6" fill="${col}"/><circle cx="${f(x)}" cy="${f(y)}" r="6" fill="url(#iss)"/><path d="M${f(x - 3)} ${f(y)}l2.2 2.4 4-4.6" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`

/** Глаз: человек смотрит, проверяет результат */
export const eye = (x: number, y: number, col = M) =>
  `<g transform="${tr(x, y)}" fill="none" stroke="${col}" stroke-width="2" stroke-linejoin="round"><path d="M-10 0s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z"/><circle r="2.8" fill="${col}" stroke="none"/></g>`

/** Ключ: вход, доступ, секрет; (x, y) — центр кольца */
export const key = (x: number, y: number, col = A) =>
  `<g transform="${tr(x, y)}" fill="none" stroke="${col}" stroke-width="2" stroke-linecap="round"><circle cx="0" cy="0" r="4"/><path d="M4 0h10M10 0v4M14 0v3"/></g>`

/** Лупа: поиск, исследование; (x, y) — центр стекла */
export const lens = (x: number, y: number, col = M) =>
  `<g transform="${tr(x, y)}"><circle cx="0" cy="0" r="6" fill="none" stroke="${col}" stroke-width="2"/><path d="M4.5 4.5l6 6" stroke="${col}" stroke-width="2.6" stroke-linecap="round"/></g>`

/** Карандаш: ручная запись */
export const pen = (x: number, y: number, col = M) =>
  `<g transform="${tr(x, y)} rotate(40)"><rect x="-2.5" y="-9" width="5" height="14" rx="1" fill="${col}"/><path d="M-2.5 5L0 10l2.5-5z" fill="${col}" opacity=".7"/></g>`

/** Плёнка с кнопкой «играть»: запись видео/GIF */
export const film = (x: number, y: number, col = A) =>
  `<g transform="${tr(x, y)}"><rect x="-13" y="-9" width="26" height="18" rx="3" fill="${col}"/>` +
  [[-7, -4], [-7, 4], [7, -4], [7, 4]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="1.6" fill="#fff" opacity=".8"/>`).join('') +
  `<path d="M-2 -4l6 4-6 4z" fill="#fff"/></g>`

/** Флажок: финиш, цель; (x, y) — низ древка */
export const flag = (x: number, y: number, col = A) =>
  `<g transform="${tr(x, y)}" fill="${col}"><rect x="0" y="-26" width="2" height="26"/><path d="M2 -26h15l-4 5 4 5H2z"/></g>`

/** Жук-баг объёмом: брюшко-толщина снизу, два надкрылья (левое освещено, правое в тени, как грани кубов),
 *  блик сверху, голова-шарик с усиками, шесть лапок. Повёрнут по оси изометрии (−30°), смотрит вправо-вверх.
 *  (x, y) — центр спинки; sh — на сколько ниже пол (6 — жук стоит на полу).
 *  Все координаты в абсолютных числах, без transform: по ним считаются границы картинки */
export function bug(x: number, y: number, col = W, sh = 6) {
  const R = (u: number, v: number, dy = 0) => `${f(x + 0.866 * u + 0.5 * v)} ${f(y + dy - 0.5 * u + 0.866 * v)}`
  const half = (side: 1 | -1, dy = 0) => `M${R(-10, 0, dy)}A10 6.5 -30 0 ${side > 0 ? 0 : 1} ${R(10, 0, dy)}Z`
  const body = (dy = 0) => `M${R(-10, 0, dy)}A10 6.5 -30 0 1 ${R(10, 0, dy)}A10 6.5 -30 0 1 ${R(-10, 0, dy)}Z`
  const dark = (d: string, w: number, op: number) => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#000" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${op}"/>`
  let s = `<ellipse cx="${f(x)}" cy="${f(y + sh)}" rx="12" ry="4.5" fill="#000" opacity="0.35" filter="url(#isb)"/>`
  for (const u of [-5, 0, 5]) for (const v of [-1, 1]) s += dark(`M${R(u, v * 5, 2)}L${R(u - 1, v * 9.5, 2)}L${R(u - 3, v * 11.5, 3)}`, 1.7, 0.45)
  s += `<path d="${body(3.2)}" fill="${col}"/><path d="${body(3.2)}" fill="#000" opacity=".5"/>`
  s += dark(`M${R(12.5, -1.8)}Q${R(15, -3.5)} ${R(18.5, -7.3)}M${R(12.5, 1.8)}Q${R(15, 3.5)} ${R(18.5, 7.3)}`, 1.3, 0.4)
  const [hx, hy] = R(11, 0).split(' ').map(Number)
  s += `<circle cx="${f(hx)}" cy="${f(hy)}" r="4.3" fill="${col}"/><circle cx="${f(hx)}" cy="${f(hy)}" r="4.3" fill="#000" opacity=".45"/><circle cx="${f(hx)}" cy="${f(hy)}" r="4.3" fill="url(#iss)"/>`
  for (const v of [-1.8, 1.8]) { const [ex, ey] = R(13, v).split(' ').map(Number); s += `<circle cx="${f(ex)}" cy="${f(ey)}" r="0.9" fill="#fff"/>` }
  s += `<path d="${body()}" fill="${col}"/><path d="${half(-1)}" fill="#fff" opacity=".14"/><path d="${half(1)}" fill="#000" opacity=".26"/>`
  s += `<path d="M${R(-10, 0)}L${R(8.5, 0)}" stroke="#000" stroke-width="1" opacity=".45"/>`
  for (const [u, v] of [[-4, -3.2], [2, -3.4], [-5, 3], [1.5, 3.4], [6, -1.6]]) { const [cx, cy] = R(u, v).split(' ').map(Number); s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="1.5" fill="#000" opacity=".32"/>` }
  const [bx, by] = R(-1, -3.6).split(' ').map(Number)
  s += `<ellipse cx="${f(bx)}" cy="${f(by)}" rx="4.5" ry="1.4" transform="rotate(-30 ${f(bx)} ${f(by)})" fill="#fff" opacity=".35"/>`
  return s
}

/** Значок внешней ссылки ↗ размера s: ставится после подписи-ссылки; (x, y) — левый верхний угол */
export const extLink = (x: number, y: number, col = M, s = 7, w = 1.6) =>
  `<g transform="${tr(x, y)}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"><path d="M0 ${s}L${s} 0M2 0H${s}V${s - 2}"/></g>`

/** Пузырь реплики: (x, y) — левый верхний угол. tail = [отступ основания хвоста от x, сдвиг кончика по x, длина вниз, ширина основания].
 *  По умолчанию полупрозрачная заливка цветом col; stroke — светлая подложка с обводкой col */
export function bubble(x: number, y: number, w: number, h: number, col = M, o: { op?: number; rx?: number; tail?: [number, number, number, number]; stroke?: boolean } = {}) {
  const { op = 0.22, rx = 8, tail, stroke = false } = o
  const fill = stroke ? `fill="${HALO}" stroke="${col}" stroke-width="1.4"` : `fill="${col}" fill-opacity="${op}"`
  let s = `<rect x="${f(x)}" y="${f(y)}" width="${w}" height="${h}" rx="${rx}" ${fill}/>`
  if (tail) {
    const [at, dx, dy, bw] = tail, x0 = x + at, y0 = y + h
    s += `<path d="M${f(x0)} ${f(y0)}l${dx} ${dy} ${n1(bw - dx)} -${dy}z" ${fill}${stroke ? ' stroke-linejoin="round"' : ''}/>`
    // у обведённого пузыря закрываем шов между телом и хвостом
    if (stroke) s += `<rect x="${f(x0 + 1)}" y="${f(y0 - 1)}" width="${bw - 2}" height="3" fill="${HALO}"/>`
  }
  return s
}

/** Разъём кабеля MCP: квадратик s×s с центром (x, y); halo — светлая обводка */
export const plug = (x: number, y: number, col = A, o: { s?: number; rx?: number; halo?: boolean } = {}) => {
  const { s = 8, rx = 2, halo = true } = o
  return `<rect x="${f(x - s / 2)}" y="${f(y - s / 2)}" width="${s}" height="${s}" rx="${rx}"${halo ? ` stroke="${HALO}" stroke-width="2"` : ''} fill="${col}"/>`
}

/** Кабель MCP: толстая линия на светлой подложке и разъёмы на обоих концах */
export const cable = (x1: number, y1: number, x2: number, y2: number, col = A) => {
  const d = `M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`
  return `<path d="${d}" stroke="${HALO}" stroke-width="7" stroke-linecap="round"/><path d="${d}" stroke="${col}" stroke-width="3.2" stroke-linecap="round"/>` + plug(x1, y1, col) + plug(x2, y2, col)
}

/** Ломаная по точкам картинки (без наконечника): ось, черта, самодельный наконечник */
export function line(pts: Pt[], col: string, o: { w?: number; dash?: string; op?: number; cap?: boolean } = {}) {
  const { w = 2, dash, op, cap = false } = o
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${f(x)} ${f(y)}`).join('')
  return `<path d="${d}"${pts.length > 2 ? ' fill="none"' : ''} stroke="${col}" stroke-width="${w}"${cap ? ' stroke-linecap="round" stroke-linejoin="round"' : ''}${dash ? ` stroke-dasharray="${dash}"` : ''}${op !== undefined ? ` opacity="${op}"` : ''}/>`
}

/** Плавная кривая от (x1, y1) к (x2, y2). Без c1/c2 — S-образная по горизонтали (контрольные точки на середине по x) */
export function curve(x1: number, y1: number, x2: number, y2: number, col: string, o: { c1?: Pt; c2?: Pt; w?: number; dash?: string; cap?: boolean } = {}) {
  const mx = (x1 + x2) / 2
  const { c1 = [mx, y1], c2 = [mx, y2], w = 1.6, dash, cap = false } = o
  return `<path d="M${f(x1)} ${f(y1)}C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(x2)} ${f(y2)}" fill="none" stroke="${col}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}${cap ? ' stroke-linecap="round"' : ''}/>`
}

/** Стрелка «было → стало» между двумя колонками: горизонтальная, с широким открытым наконечником */
export const thenArrow = (x1: number, x2: number, y: number, col = M, w = 2) =>
  `<path d="M${f(x1)} ${f(y)}H${f(x2)}M${f(x2 - 7)} ${f(y - 6)}l7 6-7 6" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`

/** Воронка: (x, y) — центр верхнего края; rx — полуширина горла сверху, neck — полуширина снизу, h — высота */
export function funnel(x: number, y: number, col = A, o: { rx?: number; neck?: number; h?: number } = {}) {
  const { rx = 36, neck = 9, h = 42 } = o
  const body = `M${f(x - rx)} ${f(y)}L${f(x + rx)} ${f(y)}L${f(x + neck)} ${f(y + h)}L${f(x - neck)} ${f(y + h)}Z`
  return `<ellipse cx="${f(x)}" cy="${f(y + h + 9)}" rx="${rx - 2}" ry="${f((rx - 2) / 2)}" fill="#000" opacity="0.35" filter="url(#isb)"/>` +
    `<path d="${body}" fill="${col}"/><path d="${body}" fill="url(#isl)"/>` +
    `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${rx}" ry="${rx / 4}" fill="${col}"/><ellipse cx="${f(x)}" cy="${f(y)}" rx="${rx}" ry="${rx / 4}" fill="#fff" opacity=".2"/>`
}

/** Надпись на тёмной шапке окна Iso.panel, как в схемах постов: ближе к трём точкам окна (x = 0.95 клетки), кегль size (8.5) */
export const bandTitle = (text: string, size?: number) => ({ text, size, x: 0.95 })
