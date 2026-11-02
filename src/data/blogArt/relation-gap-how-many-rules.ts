// Схемы поста «Сколько правил нужно, чтобы описать игру» (arXiv 2610.23637, ролик про разрыв соотношений).
// Концептуальные картинки: понятны без текста вокруг, слов в них минимум (одно-два слова и знаки формул).
// Игра: фишка, круг из шести точек, два хода — «шаг» x (по кругу) и «лифт» t (на этаж выше и обратно).
// Правила: x⁶ = 1 (шесть шагов — на месте); [x³, t·x²·t⁻¹] = 1 («полкруга» и «крюк» меняются местами).
// Цвета: синий — ходы и записи бухгалтера, оранжевый — игрок и лифт, серый — подписи.
import { type Canvas, type Scene, A, M, W } from '@/lib/infographic'

type Pt = [number, number]
/** Лифт и всё, что идёт вверх, — зелёный: оранжевый занят игроком */
const LIFT = 'var(--pg-i)'

/** Точка k круга из шести точек: эллипс (вид сверху под углом) с центром (cx, cy) */
const hex = (cx: number, cy: number, rx: number, ry: number, k: number): Pt => {
  const a = (Math.PI / 180) * (180 + 60 * k)
  return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]
}

/** Подпись с формулой: `_x` — нижний индекс, `^2` — верхний, `_{ab}` и `^{−1}` — группой */
const fm = (c: Canvas, x: number, y: number, src: string, col: string, o: { size?: number; w?: number; anchor?: 'start' | 'middle' | 'end' } = {}) => {
  const size = o.size ?? 14
  const e = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  let out = '', last = 0
  const re = /([_^])(\{[^}]*\}|.)/g
  for (let m = re.exec(src); m; m = re.exec(src)) {
    out += e(src.slice(last, m.index)) + `<tspan baseline-shift="${m[1] === '_' ? 'sub' : 'super'}" font-size="${Math.round(size * 0.72)}">${e(m[2].replace(/^\{|\}$/g, ''))}</tspan>`
    last = m.index + m[0].length
  }
  out += e(src.slice(last))
  c.raw(`<text x="${x}" y="${y}" text-anchor="${o.anchor ?? 'middle'}" font-size="${size}" font-weight="${o.w ?? 600}" fill="${col}">${out}</text>`)
}

/** Круг из шести точек; hl — номера выделенных рёбер (ребро k идёт от точки k к точке k+1) */
function ring(c: Canvas, cx: number, cy: number, rx: number, ry: number, o: { col?: string; w?: number; hl?: number[]; hlCol?: string; hlW?: number; r?: number; fill?: string; dash?: string; op?: number } = {}) {
  const { col = 'currentColor', w = 2, hl = [], hlCol = A, hlW = 4.2, r = 3, fill, dash, op = 1 } = o
  for (let k = 0; k < 6; k++) {
    const a = hex(cx, cy, rx, ry, k), b = hex(cx, cy, rx, ry, (k + 1) % 6)
    c.line([a, b], hl.includes(k) ? hlCol : col, { w: hl.includes(k) ? hlW : w, dash, op })
  }
  for (let k = 0; k < 6; k++) { const [px, py] = hex(cx, cy, rx, ry, k); c.dot(px, py, r, fill ?? col, { op }) }
}

/** Лист-запись: рамка и строки; tick — галочка */
function doc(c: Canvas, x: number, y: number, w: number, h: number, col: string, o: { lines?: number; lineCol?: string; tick?: boolean; fill?: boolean } = {}) {
  const { lines = 3, lineCol = col, tick = false, fill = false } = o
  c.rect(x, y, w, h, { rx: 7, stroke: col, sw: 2.2, fill: fill ? col : 'none', fillOp: fill ? 0.14 : undefined })
  for (let i = 0; i < lines; i++) {
    const yy = y + h * (0.28 + (0.44 * i) / Math.max(lines - 1, 1))
    c.line([[x + w * 0.2, yy], [x + w * (0.82 - 0.18 * (i % 2)), yy]], lineCol, { w: 2.2, op: 0.8 })
  }
  if (tick) c.badge(x + w - 2, y + 2, A, '', { r: 9, mark: 'check' })
}

/** Крюк: лифт вверх, два шага, лифт вниз */
function hook(c: Canvas, x: number, y: number, k = 1, o: { up?: string; side?: string } = {}) {
  const up = o.up ?? LIFT, side = o.side ?? A
  c.arrow(x, y + 16 * k, x, y - 16 * k, up, { w: 2.4 * k })
  c.line([[x, y - 16 * k], [x + 26 * k, y - 16 * k]], side, { w: 3.4 * k })
  c.dot(x + 13 * k, y - 16 * k, 2.6 * k, side); c.dot(x + 26 * k, y - 16 * k, 2.6 * k, side)
  c.arrow(x + 26 * k, y - 16 * k, x + 26 * k, y + 16 * k, up, { w: 2.4 * k })
}

/** Человек: голова и тело; подпись одним словом */
function person(c: Canvas, x: number, y: number, col: string, label?: string, k = 1) {
  c.rect(x - 11 * k, y - 16 * k, 22 * k, 30 * k, { rx: 11 * k, fill: col })
  c.dot(x, y - 26 * k, 8.5 * k, col)
  if (label) c.text(x, y + 30 * k, label, col, { size: 12.5, w: 700 })
}

/** Кружок-монета с числом */
const coin = (c: Canvas, x: number, y: number, r: number, n: string, col: string) => { c.ball(x, y, r, col); c.text(x, y + r * 0.34, n, 'var(--surface)', { size: Math.round(r * 0.95), w: 700 }) }

/** Коммутирующий квадрат: два пути из старта в одну точку */
function square(c: Canvas, x: number, y: number, s: number, o: { token?: boolean; flag?: boolean } = {}) {
  const S: Pt = [x, y + s], R: Pt = [x + s, y + s], U: Pt = [x, y], T: Pt = [x + s, y], g = 11
  c.arrow(S[0] + g, S[1], R[0] - g, R[1], A, { w: 2.6 }); c.arrow(U[0] + g, U[1], T[0] - g, T[1], A, { w: 2.6 })
  c.arrow(S[0], S[1] - g, U[0], U[1] + g, LIFT, { w: 2.6 }); c.arrow(R[0], R[1] - g, T[0], T[1] + g, LIFT, { w: 2.6 })
  c.dot(S[0], S[1], 5, M); c.dot(R[0], R[1], 5, M); c.dot(U[0], U[1], 5, M); c.dot(T[0], T[1], 5, M)
  if (o.token) c.ball(S[0], S[1] - 2, 8, W)
  if (o.flag) c.flag(T[0] + 2, T[1] - 10, A)
}

const scenes: Record<string, Scene> = {
  // Карта игры: круг внизу, у точек свои лифты на круги этажом выше
  map: {
    ru: 'Карта игры: внизу круг из шести точек, шаг двигает фишку по кругу; из точек круга лифты поднимают фишку на свои круги этажом выше',
    en: 'The game map: a circle of six points at the bottom, a step moves the token along the circle; lifts from the points raise the token to their own circles one floor up',
    viewBox: [0, 0, 660, 290], legend: false,
    draw: (c, l) => {
      const base = { cx: 330, cy: 196, rx: 150, ry: 40 }
      const tops: Pt[] = [[130, 78], [330, 62], [530, 78]]
      const from = [0, 2, 3]
      tops.forEach(([x, y]) => ring(c, x, y, 66, 20, { col: A, w: 2, op: 0.75, r: 3.5 }))
      c.text(640, 40, l('этаж 1', 'floor 1'), M, { size: 12, anchor: 'end' }); c.text(640, 250, l('этаж 0', 'floor 0'), M, { size: 12, anchor: 'end' })
      ring(c, base.cx, base.cy, base.rx, base.ry, { w: 2.6, r: 6 })
      from.forEach((k, i) => { const [px, py] = hex(base.cx, base.cy, base.rx, base.ry, k); c.arrow(px, py - 9, tops[i][0], tops[i][1] + 24, LIFT, { w: 2.4 }) })
      const [fx, fy] = hex(base.cx, base.cy, base.rx, base.ry, 0), [sx, sy] = hex(base.cx, base.cy, base.rx, base.ry, 1)
      c.ball(fx, fy - 14, 9, W)
      c.arrow(fx + (sx - fx) * 0.25 + 8, fy + (sy - fy) * 0.25 + 12, fx + (sx - fx) * 0.8 + 6, fy + (sy - fy) * 0.8 + 12, A, { w: 2.6 })
      fm(c, 40, 274, l('шаг  x', 'step  x'), A, { size: 16, w: 700, anchor: 'start' })
      fm(c, 620, 274, l('лифт  t', 'lift  t'), LIFT, { size: 16, w: 700, anchor: 'end' })
    },
  },
  // Второе правило: полкруга и крюк меняются местами
  swap: {
    ru: 'Второе правило: полкруга (три шага) и крюк (лифт вверх, два шага, лифт вниз) можно менять местами — оба порядка приводят в одну точку',
    en: 'The second rule: a half-circle (three steps) and a hook (lift up, two steps, lift down) can be swapped: both orders end at the same point',
    viewBox: [0, 0, 660, 270], legend: false,
    draw: (c) => {
      square(c, 190, 50, 280, { token: true, flag: true })
      ring(c, 330, 232, 22, 9, { hl: [0, 1, 2], r: 2.4, w: 1.6 }); fm(c, 362, 245, 'x^3', A, { size: 16, w: 700, anchor: 'start' })
      ring(c, 330, 26, 22, 9, { hl: [0, 1, 2], r: 2.4, w: 1.6 }); fm(c, 362, 39, 'x^3', A, { size: 16, w: 700, anchor: 'start' })
      hook(c, 120, 140, 0.9); fm(c, 110, 190, 't·x^2·t^{−1}', LIFT, { size: 14, w: 700, anchor: 'end' })
      hook(c, 500, 140, 0.9); fm(c, 540, 190, 't·x^2·t^{−1}', LIFT, { size: 14, w: 700, anchor: 'start' })
    },
  },
  // Коммутатор: u, v, обратные — и вернулся в старт
  commutator: {
    ru: 'Коммутатор: сделать u, потом v, потом отменить u и v — если ходы можно менять местами, вернёшься ровно в старт',
    en: 'The commutator: do u, then v, then undo u and v — if the moves can be swapped you land exactly at the start',
    viewBox: [0, 0, 660, 250], legend: false,
    draw: (c) => {
      const s = 150, x = 250, y = 40, g = 12
      const S: Pt = [x, y + s], R: Pt = [x + s, y + s], T: Pt = [x + s, y], U: Pt = [x, y]
      c.arrow(S[0] + g, S[1], R[0] - g, R[1], A, { w: 3 }); c.arrow(R[0], R[1] - g, T[0], T[1] + g, LIFT, { w: 3 })
      c.arrow(T[0] - g, T[1], U[0] + g, U[1], A, { w: 3 }); c.arrow(U[0], U[1] + g, S[0], S[1] - g, LIFT, { w: 3 })
      ;[S, R, T, U].forEach(([px, py]) => c.dot(px, py, 5, M))
      c.ball(S[0], S[1] - 2, 9, W)
      fm(c, 325, 232, 'u', A, { size: 20, w: 700 }); fm(c, 420, 118, 'v', LIFT, { size: 20, w: 700, anchor: 'start' })
      fm(c, 325, 26, 'u^{−1}', A, { size: 20, w: 700 }); fm(c, 228, 118, 'v^{−1}', LIFT, { size: 20, w: 700, anchor: 'end' })
      fm(c, 325, 122, '= 1', 'currentColor', { size: 30, w: 700 })
      c.badge(325, 150, A, '', { r: 11, mark: 'check' })
    },
  },
  // Запись игры: буквы ходов | правила
  present: {
    ru: 'Запись игры одной строкой: слева от черты буквы ходов (шаг x и лифт t), справа правила (шесть шагов — на месте; полкруга и крюк меняются местами)',
    en: 'The game in one line: left of the bar the letters of the moves (step x and lift t), right of it the rules (six steps bring you back; half-circle and hook swap)',
    viewBox: [0, 0, 660, 250], legend: false,
    draw: (c, l) => {
      c.text(36, 128, 'G =', 'currentColor', { size: 26, w: 700, anchor: 'start' })
      c.text(110, 148, '⟨', M, { size: 110, w: 300 }); c.text(622, 148, '⟩', M, { size: 110, w: 300 })
      c.arrow(140, 108, 190, 108, A, { w: 3.4 }); fm(c, 165, 140, 'x', A, { size: 20, w: 700 })
      c.arrow(236, 130, 236, 78, LIFT, { w: 3.4 }); fm(c, 236, 152, 't', LIFT, { size: 20, w: 700 })
      c.line([[282, 52], [282, 168]], M, { w: 2.4 })
      ring(c, 362, 100, 38, 15, { r: 3.4, w: 2.4 }); fm(c, 362, 150, 'x^6', 'currentColor', { size: 18, w: 700 })
      c.text(432, 112, ',', M, { size: 30 })
      square(c, 480, 56, 80, {}); fm(c, 520, 170, '[x^3, t·x^2·t^{−1}]', 'currentColor', { size: 14, w: 700 })
      c.text(165, 232, l('ходы', 'moves'), M, { size: 13, w: 700 }); c.text(440, 232, l('правила', 'rules'), M, { size: 13, w: 700 })
      c.line([[130, 214], [200, 214]], M, { w: 1.6 }); c.line([[300, 214], [580, 214]], M, { w: 1.6 })
    },
  },
  // Общий вид: p шагов в полукруге, q шагов в крюке, pq — круг
  general: {
    ru: 'Общий случай: круг из pq точек, полукруг — p шагов подряд, крюк — q шагов наверху; числа p и q не имеют общего делителя',
    en: 'The general case: a circle of pq points, the half-circle is p steps in a row, the hook is q steps upstairs; p and q share no divisor',
    viewBox: [0, 0, 660, 230], legend: false,
    draw: (c, l) => {
      ring(c, 150, 105, 92, 34, { hl: [0, 1, 2], r: 4, w: 2.4, hlW: 5.2 })
      fm(c, 150, 112, 'pq', 'currentColor', { size: 26, w: 700 })
      fm(c, 150, 188, 'p', A, { size: 24, w: 700 })
      c.text(150, 208, l('шагов — полкруга', 'steps: the half-circle'), M, { size: 12 })
      hook(c, 340, 110, 1.3, {})
      fm(c, 380, 188, 'q', W, { size: 24, w: 700 })
      c.text(380, 208, l('шагов наверху — крюк', 'steps upstairs: the hook'), M, { size: 12 })
      c.rect(480, 62, 160, 96, { rx: 12, stroke: A, sw: 2.4, fill: 'none' })
      coin(c, 515, 92, 18, 'p', A); coin(c, 565, 92, 15, 'q', M)
      c.text(560, 138, l('НОД(p, q) = 1', 'gcd(p, q) = 1'), A, { size: 15, w: 700 })
    },
  },
  // Три детали игры и кому каждая нужна
  three: {
    ru: 'Три детали игры и кому они нужны: шесть шагов и друзья, которые не меняются местами, нужны игроку; числа три и два нужны бухгалтеру',
    en: 'Three details of the game and who needs them: six steps and friends that do not swap are for the player; the numbers three and two are for the accountant',
    viewBox: [0, 0, 660, 300], legend: false,
    draw: (c, l) => {
      const card = (y: number, word: string, icon: (x: number, y: number) => void) => {
        c.rect(30, y, 280, 70, { rx: 12, stroke: M, sw: 1.8, fill: 'none' })
        icon(100, y + 35)
        c.text(222, y + 40, word, 'currentColor', { size: 14, w: 700 })
      }
      card(20, l('6 шагов — на месте', '6 steps: back home'), (x, y) => ring(c, x, y, 34, 14, { r: 3.6, w: 2.4 }))
      card(115, l('меняются местами', 'can be swapped'), (x, y) => square(c, x - 26, y - 24, 52, {}))
      card(210, l('3 и 2', '3 and 2'), (x, y) => { coin(c, x - 14, y, 22, '3', A); coin(c, x + 24, y, 16, '2', M) })
      person(c, 545, 70, W, l('игрок', 'player'), 1.3); doc(c, 590, 40, 38, 50, W, { lines: 2 }); doc(c, 590, 96, 38, 50, W, { lines: 2 })
      person(c, 545, 240, A, l('бухгалтер', 'accountant'), 1.3); doc(c, 590, 215, 38, 50, A, { lines: 3, tick: true })
      c.arrow(316, 55, 492, 80, W, { w: 2.4 }); c.arrow(316, 150, 492, 100, W, { w: 2.4 }); c.arrow(316, 245, 492, 245, A, { w: 2.4 })
    },
  },
  // Вопрос: два способа считать
  methods: {
    ru: 'Два способа считать правила: игрок идёт по карте, и порядок ходов важен; бухгалтер ведёт счётчик проходов, и порядок не важен',
    en: 'Two ways to count rules: the player walks the map and the order of moves matters; the accountant keeps a tally of passes and the order does not matter',
    viewBox: [0, 0, 660, 290], legend: false,
    draw: (c, l) => {
      person(c, 90, 60, W, l('игрок', 'player'), 1.2)
      const s = 120, x = 60, y = 120
      c.arrow(x + 8, y + s, x + s - 8, y + s, W, { w: 3 }); c.arrow(x + s, y + s - 8, x + s, y + 8, W, { w: 3 })
      c.arrow(x, y + s - 8, x, y + 8, M, { w: 2.4, dash: '5 4', op: 0.8 }); c.arrow(x + 8, y, x + s - 8, y, M, { w: 2.4, dash: '5 4', op: 0.8 })
      c.badge(x + s / 2, y + s + 14, W, '1', { r: 8, size: 10 }); c.badge(x + s + 14, y + s / 2, W, '2', { r: 8, size: 10 })
      c.badge(x - 14, y + s / 2, M, '1', { r: 8, size: 10 }); c.badge(x + s / 2, y - 14, M, '2', { r: 8, size: 10 })
      c.ball(x, y + s - 2, 8, W); c.flag(x + s + 2, y - 10, A)
      c.text(x + s / 2, 276, l('порядок важен', 'the order matters'), M, { size: 12.5 })
      c.line([[330, 40], [330, 270]], M, { w: 1.2, dash: '4 5', op: 0.5 })
      person(c, 490, 60, A, l('бухгалтер', 'accountant'), 1.2)
      doc(c, 420, 110, 140, 150, A, { lines: 0 })
      ;['+1', '+1', '−1', '0'].forEach((t, i) => {
        const yy = 130 + i * 32
        c.line([[436, yy + 18], [544, yy + 18]], M, { w: 1, op: 0.4 })
        c.rect(436, yy + 2, 40, 14, { rx: 4, fill: A, fillOp: 0.25 }); c.text(520, yy + 14, t, A, { size: 14, w: 700 })
      })
      c.text(490, 276, l('порядок не важен', 'the order does not matter'), M, { size: 12.5 })
    },
  },
  // Список правил игрока: лишние вычёркиваются
  player: {
    ru: 'Список правил игрока: двенадцать шагов и обмен с шестью шагами — следствия первого правила и вычёркиваются; остаются два правила',
    en: 'The player\'s list of rules: twelve steps and swapping with six steps follow from the first rule and are crossed out; two rules remain',
    viewBox: [0, 0, 660, 260], legend: false,
    draw: (c, l) => {
      const cards: [string, boolean][] = [['x^6 = 1', true], ['x^3 ⇄ t·x^2·t^{−1}', true], ['x^{12} = 1', false], ['x^6 ⇄ t·x^2·t^{−1}', false]]
      cards.forEach(([f, keep], i) => {
        const x = 20 + i * 150 + (i > 1 ? 24 : 0), col = keep ? A : W
        c.rect(x, 30, 130, 96, { rx: 12, stroke: col, sw: 2.4, fill: 'none', op: keep ? 1 : 0.85 })
        fm(c, x + 65, 86, f, keep ? 'currentColor' : M, { size: keep ? 14 : 13, w: 700 })
        if (!keep) c.line([[x + 10, 100], [x + 120, 52]], W, { w: 2.6, op: 0.9 })
        c.badge(x + 65, 146, col, '', { r: 11, mark: keep ? 'check' : 'cross' })
      })
      c.line([[328, 24], [328, 150]], M, { w: 1.4, dash: '4 5', op: 0.5 })
      c.line([[24, 186], [300, 186]], A, { w: 3 }); c.text(170, 238, '2', A, { size: 52, w: 700 })
      c.text(480, 190, l('следствия', 'consequences'), W, { size: 13, w: 700 })
      c.text(170, 174, l('правила', 'rules'), A, { size: 13, w: 700 })
    },
  },
  // Запись бухгалтера: счётчик проходов по отрезкам
  loops: {
    ru: 'Запись бухгалтера: две петли по одному квадрату с разным стартом дают одну и ту же запись — сколько раз пройден каждый отрезок',
    en: 'The accountant\'s entry: two loops around the same square with different starts give the same entry, how many times each segment was passed',
    viewBox: [0, 0, 660, 250], legend: false,
    draw: (c, l) => {
      const sq = (ox: number, oy: number, startK: number) => {
        const P: Pt[] = [[ox, oy], [ox + 90, oy], [ox + 90, oy + 90], [ox, oy + 90]]
        P.forEach((p, k) => { const q = P[(k + 1) % 4]; c.arrow(p[0] + (q[0] - p[0]) * 0.12, p[1] + (q[1] - p[1]) * 0.12, p[0] + (q[0] - p[0]) * 0.88, p[1] + (q[1] - p[1]) * 0.88, A, { w: 2.6 }) })
        P.forEach((p, k) => c.dot(p[0], p[1], k === startK ? 8 : 5, k === startK ? W : 'currentColor'))
        c.text(ox + 45, oy + 124, l('старт', 'start'), W, { size: 12, w: 700 })
      }
      sq(60, 50, 0); sq(240, 50, 2)
      c.text(396, 105, '=', 'currentColor', { size: 36, w: 700 })
      doc(c, 432, 38, 176, 146, A, { lines: 0 })
      ;['AB', 'BC', 'CD', 'DA'].forEach((seg, i) => {
        const y = 46 + i * 34
        c.rect(444, y, 152, 26, { rx: 7, stroke: A, sw: 1.6, fill: 'none' })
        c.text(460, y + 18, seg, M, { size: 12.5, w: 700, anchor: 'start' }); c.text(582, y + 18, '+1', A, { size: 14, w: 700, anchor: 'end' })
      })
      c.text(520, 212, l('один счётчик проходов', 'one tally of passes'), M, { size: 12.5 })
    },
  },
  // Две записи сливаются в одну
  merge: {
    ru: 'Одна хитрая запись v: из её копий запись второго правила получается за одно действие, запись первого — за три; это возможно, потому что у чисел 3 и 2 нет общего делителя',
    en: 'One clever entry v: from its copies the entry of the second rule comes out in one action, the entry of the first in three; possible because 3 and 2 share no divisor',
    viewBox: [0, 0, 660, 280], legend: false,
    draw: (c) => {
      doc(c, 276, 22, 108, 74, A, { lines: 0, fill: true }); fm(c, 330, 70, 'v', 'currentColor', { size: 26, w: 700 })
      doc(c, 90, 168, 96, 66, W, { lines: 3 }); fm(c, 138, 258, 'u', W, { size: 20, w: 700 })
      doc(c, 474, 168, 96, 66, A, { lines: 3 }); ring(c, 522, 201, 26, 10, { fill: A, col: A, r: 3, w: 1.8 }); fm(c, 522, 258, 'N_x', A, { size: 20, w: 700 })
      c.arrow(300, 100, 170, 160, W, { w: 2.8 }); c.badge(236, 124, W, '1', { r: 12, size: 14 })
      c.arrow(360, 100, 490, 160, A, { w: 2.8 }); c.badge(424, 124, A, '3', { r: 12, size: 14 })
      coin(c, 288, 200, 16, '3', A); c.text(315, 206, '−', 'currentColor', { size: 24, w: 700 }); coin(c, 342, 200, 13, '2', M); c.text(368, 206, '=', 'currentColor', { size: 24, w: 700 }); coin(c, 394, 200, 13, '1', W)
    },
  },
  // Ответ: два против одного
  counts: {
    ru: 'Два счёта правил: игрок получает два правила, бухгалтер — одну запись',
    en: 'Two counts of rules: the player gets two rules, the accountant gets one entry',
    viewBox: [0, 0, 660, 270], legend: false,
    draw: (c, l) => {
      c.text(165, 90, '2', W, { size: 84, w: 700 }); c.text(495, 90, '1', A, { size: 84, w: 700 }); c.text(330, 76, '>', M, { size: 56, w: 700 })
      doc(c, 100, 110, 56, 70, W, { lines: 2 }); doc(c, 174, 110, 56, 70, W, { lines: 2 })
      doc(c, 467, 106, 56, 78, A, { lines: 3, tick: true })
      person(c, 165, 222, W, l('игрок', 'player'), 1.1); person(c, 495, 222, A, l('бухгалтер', 'accountant'), 1.1)
    },
  },
  // Друзья по Ньюману
  friends: {
    ru: 'Друзья хода «полкруга»: два шага по тому же кругу и крюк; с полкругом они дружат, между собой нет, поэтому одного правила мало',
    en: 'Friends of the “half-circle” move: two steps along the same circle and a hook; they commute with it but not with each other, so one rule is not enough',
    viewBox: [0, 0, 660, 300], legend: false,
    draw: (c, l) => {
      const node = (x: number, y: number, w: number, h: number, icon: (x: number, y: number) => void, word: string, col: string) => {
        c.rect(x - w / 2, y - h / 2, w, h, { rx: 12, stroke: col, sw: 2.4, fill: 'none' })
        icon(x, y - 8); c.text(x, y + h / 2 - 10, word, 'currentColor', { size: 12.5, w: 700 })
      }
      const top: Pt = [330, 56], a: Pt = [130, 228], b: Pt = [530, 228]
      c.line([[top[0] - 40, top[1] + 48], [a[0] + 40, a[1] - 48]], A, { w: 2.6 }); c.line([[top[0] + 40, top[1] + 48], [b[0] - 40, b[1] - 48]], A, { w: 2.6 })
      c.badge(222, 142, A, '', { r: 11, mark: 'check' }); c.badge(438, 142, A, '', { r: 11, mark: 'check' })
      c.line([[a[0] + 90, a[1]], [b[0] - 80, b[1]]], W, { w: 2.6, dash: '7 6' }); c.badge(330, 228, W, '', { r: 13, mark: 'cross' })
      node(top[0], top[1], 190, 84, (x, y) => ring(c, x, y, 32, 13, { hl: [0, 1, 2], r: 3, w: 2, hlW: 5 }), l('полкруга', 'half-circle'), 'currentColor')
      node(a[0], a[1], 170, 84, (x, y) => ring(c, x, y, 32, 13, { hl: [0, 1], r: 3, w: 2, hlW: 5 }), l('два шага', 'two steps'), M)
      node(b[0], b[1], 150, 84, (x, y) => hook(c, x - 13, y + 2, 0.9), l('крюк', 'hook'), M)
    },
  },
  // Свободное произведение C3 и Z: дерево, где ходы не сходятся
  free: {
    ru: 'Что остаётся от игры, если стянуть полкруга в точку: треугольник из трёх шагов и бесконечная прямая; вместе они дают дерево, где два пути не встречаются',
    en: 'What remains of the game when the half-circle is collapsed: a triangle of three steps and an infinite line; together they form a tree where two paths never meet',
    viewBox: [0, 0, 660, 230], legend: false,
    draw: (c) => {
      const tri: Pt[] = [[80, 150], [150, 150], [115, 90]]
      c.line([tri[0], tri[1], tri[2], tri[0]], A, { w: 3 }); tri.forEach(([x, y]) => c.dot(x, y, 6, A)); fm(c, 115, 188, 'C_3', A, { size: 20, w: 700 })
      c.text(205, 130, '∗', M, { size: 40, w: 700 })
      c.line([[240, 120], [350, 120]], W, { w: 3 })
      for (let i = 0; i < 5; i++) c.dot(256 + i * 20, 120, 3.6, W)
      fm(c, 296, 188, 'ℤ', W, { size: 22, w: 700 })
      c.text(392, 130, '=', 'currentColor', { size: 36, w: 700 })
      const root: Pt = [520, 50]
      const kids: Pt[] = [[450, 120], [520, 130], [590, 120]]
      kids.forEach(([x, y], i) => { c.line([root, [x, y]], i === 1 ? W : A, { w: 2.6 }); c.dot(x, y, 5, 'currentColor'); const dx = i - 1; c.line([[x, y], [x + dx * 24 - 14, y + 56]], A, { w: 2, op: 0.8 }); c.line([[x, y], [x + dx * 24 + 14, y + 56]], W, { w: 2, op: 0.8 }) })
      c.dot(root[0], root[1], 7, W)
    },
  },
  // Монеты: из 3 и 2 собирается 1
  coins: {
    ru: 'Из трёх и двух собирается единица: три рубля отдать, два рубля получить сдачей — на руках один рубль',
    en: 'One is built from three and two: pay three, get two back as change — one remains',
    viewBox: [0, 0, 660, 180], legend: false,
    draw: (c, l) => {
      coin(c, 110, 80, 34, '3', A); c.text(190, 92, '−', 'currentColor', { size: 44, w: 700 })
      coin(c, 270, 80, 26, '2', M); c.text(340, 92, '=', 'currentColor', { size: 44, w: 700 })
      coin(c, 410, 80, 22, '1', W)
      c.text(110, 140, l('даём', 'pay'), A, { size: 13, w: 700 }); c.text(270, 140, l('сдача', 'change'), M, { size: 13, w: 700 }); c.text(410, 140, l('осталось', 'left'), W, { size: 13, w: 700 })
      c.rect(500, 44, 130, 74, { rx: 12, stroke: A, sw: 2.2, fill: 'none' })
      c.text(565, 74, l('НОД', 'gcd'), M, { size: 13, w: 700 }); fm(c, 565, 102, '(3, 2) = 1', A, { size: 20, w: 700 })
    },
  },
  // Формулы (3): три равенства с суммами
  f1: {
    ru: 'Три равенства: сумма «стоять или повернуть на полкруга» применённая к кругу даёт каждой точке вес два; применённая к записи второго правила даёт круг минус сдвинутый крюком круг и круг, поднятый лифтом, минус он же, повернутый на полкруга',
    en: 'Three identities: the sum “stay or turn by a half-circle” applied to the circle gives every point weight two; applied to the entry of the second rule it gives the circle minus its hook-shifted copy, and the lifted circle minus its half-turned copy',
    viewBox: [0, 0, 660, 250], legend: false,
    draw: (c) => {
      ring(c, 110, 90, 54, 20, { fill: A, col: A, r: 6, w: 2.4 })
      for (let k = 0; k < 6; k++) { const [px, py] = hex(110, 90, 54, 20, k); c.badge(px, py - 16, W, '2', { r: 8, size: 10 }) }
      fm(c, 110, 160, 'N_a·N_x = 2N_x', 'currentColor', { size: 15, w: 700 })
      doc(c, 250, 52, 34, 44, W, { lines: 2 }); fm(c, 267, 118, 'u', W, { size: 16, w: 700 }); c.arrow(292, 74, 322, 74, M, { w: 2.2 }); fm(c, 307, 62, 'N_a', M, { size: 12, w: 700 })
      ring(c, 372, 66, 30, 11, { fill: A, col: A, r: 3.6, w: 2 }); c.text(412, 72, '−', 'currentColor', { size: 24, w: 700 }); ring(c, 452, 66, 30, 11, { col: A, r: 3.6, w: 2, dash: '4 3', op: 0.8 }); fm(c, 452, 96, 'b', A, { size: 13, w: 700 })
      fm(c, 450, 128, 'N_a·u = (1 − b)·N_x', 'currentColor', { size: 15, w: 700 })
      doc(c, 250, 164, 34, 44, W, { lines: 2 }); c.arrow(292, 186, 322, 186, M, { w: 2.2 }); fm(c, 307, 174, 'N_b', M, { size: 12, w: 700 })
      ring(c, 372, 178, 30, 11, { fill: A, col: A, r: 3.6, w: 2 }); c.text(412, 184, '−', 'currentColor', { size: 24, w: 700 }); ring(c, 452, 178, 30, 11, { col: A, r: 3.6, w: 2, dash: '4 3', op: 0.8 }); fm(c, 452, 208, 'a', A, { size: 13, w: 700 })
      fm(c, 450, 236, 'N_b·u = (a − 1)·t·N_x', 'currentColor', { size: 15, w: 700 })
    },
  },
  // Формула (4): хитрая запись
  f2: {
    ru: 'Хитрая запись v: круг плюс две копии записи второго правила, сдвинутые крюком один раз и два раза',
    en: 'The clever entry v: the circle plus two copies of the entry of the second rule, shifted by the hook once and twice',
    viewBox: [0, 0, 660, 190], legend: false,
    draw: (c) => {
      ring(c, 90, 80, 48, 18, { fill: A, col: A, r: 5.5, w: 2.4 }); fm(c, 90, 128, 'N_x', A, { size: 18, w: 700 })
      c.text(170, 90, '+', 'currentColor', { size: 36, w: 700 })
      doc(c, 200, 52, 54, 68, W, { lines: 2 }); fm(c, 227, 140, 'b·u', W, { size: 16, w: 700 })
      c.text(284, 90, '+', 'currentColor', { size: 36, w: 700 })
      doc(c, 314, 52, 54, 68, W, { lines: 2 }); fm(c, 341, 140, 'b^2·u', W, { size: 16, w: 700 })
      c.text(404, 90, '=', 'currentColor', { size: 36, w: 700 })
      doc(c, 440, 40, 130, 92, A, { lines: 0, fill: true }); fm(c, 505, 98, 'v', 'currentColor', { size: 34, w: 700 })
    },
  },
  // Формула (5): умножаем v на суммы
  f3: {
    ru: 'Умножение хитрой записи на суммы: на «стоять или полкруга» получается круг и сдвинутый крюком круг; на «крюк ноль, один или два раза» — круги и два подъёма с полкругом',
    en: 'Multiplying the clever entry by the sums: by “stay or half-circle” gives the circle and its hook-shifted copy; by “hook zero, one or two times” gives circles and two lifts with a half-circle',
    viewBox: [0, 0, 660, 230], legend: false,
    draw: (c) => {
      doc(c, 40, 24, 62, 52, A, { lines: 0, fill: true }); fm(c, 71, 98, 'v', 'currentColor', { size: 20, w: 700 })
      c.arrow(112, 50, 180, 50, M, { w: 2.4 }); fm(c, 146, 38, 'N_a', M, { size: 14, w: 700 })
      ring(c, 250, 48, 38, 14, { fill: A, col: A, r: 4.4 }); c.text(310, 56, '+', 'currentColor', { size: 28, w: 700 }); ring(c, 370, 48, 38, 14, { col: A, r: 4.4, w: 2, dash: '4 3', op: 0.8 }); fm(c, 370, 80, 'b', A, { size: 14, w: 700 })
      fm(c, 560, 56, 'N_a·v = (1 + b)·N_x', 'currentColor', { size: 14, w: 700 })
      doc(c, 40, 134, 62, 52, A, { lines: 0, fill: true }); fm(c, 71, 208, 'v', 'currentColor', { size: 20, w: 700 })
      c.arrow(112, 160, 180, 160, M, { w: 2.4 }); fm(c, 146, 148, 'N_b', M, { size: 14, w: 700 })
      ring(c, 250, 158, 38, 14, { fill: A, col: A, r: 4.4 }); fm(c, 250, 188, 'N_b·N_x', A, { size: 12, w: 700 }); c.text(310, 166, '+', 'currentColor', { size: 28, w: 700 })
      ring(c, 370, 146, 30, 11, { fill: W, col: W, r: 3.4, w: 1.8 }); c.text(412, 166, '−', 'currentColor', { size: 24, w: 700 }); ring(c, 450, 146, 30, 11, { col: W, r: 3.4, w: 1.8, dash: '4 3', op: 0.8 }); c.badge(480, 128, W, '2', { r: 9, size: 11 })
      fm(c, 560, 190, '… + 2(a − 1)·t·N_x', 'currentColor', { size: 13, w: 700 })
    },
  },
  // Формулы (6): упрощение
  f4: {
    ru: 'После упрощения: одна комбинация сумм даёт круг с весом два, другая — круг и два поднятых круга',
    en: 'After simplifying: one combination of sums gives the circle with weight two, another gives the circle and two lifted circles',
    viewBox: [0, 0, 660, 200], legend: false,
    draw: (c) => {
      doc(c, 40, 20, 56, 48, A, { lines: 0, fill: true }); fm(c, 68, 90, 'v', 'currentColor', { size: 18, w: 700 })
      c.arrow(104, 44, 190, 44, M, { w: 2.4 }); fm(c, 147, 32, '(1 − b + b^2)·N_a', M, { size: 11, w: 700 })
      ring(c, 260, 42, 38, 14, { fill: A, col: A, r: 4.4 }); c.badge(298, 28, W, '2', { r: 10, size: 12 }); fm(c, 260, 78, 'N_x', A, { size: 14, w: 700 })
      doc(c, 40, 118, 56, 48, A, { lines: 0, fill: true }); fm(c, 68, 188, 'v', 'currentColor', { size: 18, w: 700 })
      c.arrow(104, 142, 190, 142, M, { w: 2.4 }); fm(c, 147, 130, 'N_b − b·N_a', M, { size: 11, w: 700 })
      ring(c, 260, 140, 38, 14, { fill: A, col: A, r: 4.4 }); c.text(322, 146, '+', 'currentColor', { size: 26, w: 700 })
      ring(c, 380, 134, 28, 10, { fill: W, col: W, r: 3.2, w: 1.8 }); c.badge(408, 120, W, '2', { r: 9, size: 11 })
      fm(c, 540, 148, 'N_x + 2(a − 1)·t·N_x', 'currentColor', { size: 13, w: 700 })
    },
  },
  // Итог: из v получаются обе записи
  f5: {
    ru: 'Итог: из хитрой записи v получается запись первого правила, а затем и второго — значит, одной записи хватает',
    en: 'The result: from the clever entry v the entry of the first rule comes out, and then the second — so one entry is enough',
    viewBox: [0, 0, 660, 170], legend: false,
    draw: (c) => {
      doc(c, 30, 40, 100, 80, A, { lines: 0, fill: true }); fm(c, 80, 106, 'v', 'currentColor', { size: 32, w: 700 })
      c.arrow(142, 80, 262, 80, A, { w: 3 }); fm(c, 202, 66, '(N_b − b·N_a − …)', A, { size: 11, w: 700 })
      ring(c, 330, 80, 56, 21, { fill: A, col: A, r: 6, w: 2.6 }); fm(c, 330, 126, 'N_x', A, { size: 20, w: 700 })
      c.arrow(400, 80, 480, 80, W, { w: 3 }); fm(c, 440, 66, 'v = N_x + …u', W, { size: 11, w: 700 })
      doc(c, 492, 46, 70, 68, W, { lines: 2 }); fm(c, 527, 134, 'u', W, { size: 22, w: 700 })
      c.badge(610, 80, A, '', { r: 16, mark: 'check' })
    },
  },
  // Словарь «ролик — статья»
  dict: {
    ru: 'Словарь: картинки ролика и их запись в статье — шаг x, лифт t, первое правило x⁶ = 1, второе правило — коммутатор, счёт игрока 2, счёт бухгалтера 1',
    en: 'Dictionary: pictures of the film and their notation in the paper: step x, lift t, first rule x⁶ = 1, second rule a commutator, player\'s count 2, accountant\'s count 1',
    viewBox: [0, 0, 660, 330], legend: false,
    draw: (c) => {
      const rows: ((x: number, y: number) => void)[] = [
        (x, y) => c.arrow(x - 24, y, x + 24, y, A, { w: 3.4 }),
        (x, y) => c.arrow(x, y + 16, x, y - 16, LIFT, { w: 3.4 }),
        (x, y) => ring(c, x, y, 30, 12, { r: 3, w: 2.2 }),
        (x, y) => square(c, x - 18, y - 16, 34, {}),
        (x, y) => { doc(c, x - 32, y - 18, 28, 36, W, { lines: 2 }); doc(c, x + 4, y - 18, 28, 36, W, { lines: 2 }) },
        (x, y) => doc(c, x - 16, y - 20, 32, 40, A, { lines: 3, tick: true }),
      ]
      const syms = ['x', 't', 'x^6 = 1', '[x^3, t·x^2·t^{−1}] = 1', '2', '1']
      const cols = [A, LIFT, 'currentColor', 'currentColor', W, A]
      rows.forEach((icon, i) => {
        const y = 36 + i * 50
        c.rect(30, y - 22, 190, 44, { rx: 10, stroke: M, sw: 1.6, fill: 'none' }); icon(125, y)
        c.arrow(230, y, 290, y, M, { w: 2.2 })
        c.rect(300, y - 22, 330, 44, { rx: 10, stroke: cols[i] === 'currentColor' ? A : cols[i], sw: 2.2, fill: 'none' })
        fm(c, 465, y + 7, syms[i], cols[i], { size: i < 2 ? 22 : i > 3 ? 28 : 17, w: 700 })
      })
    },
  },
  // Главное: путь рассуждения картинками
  summary: {
    ru: 'Путь рассуждения: игра из двух ходов, игрок с двумя правилами, бухгалтер с одной записью — разрыв «два против одного»',
    en: 'The line of reasoning: a game of two moves, a player with two rules, an accountant with one entry — the gap “two against one”',
    viewBox: [0, 0, 660, 250], legend: false,
    draw: (c, l) => {
      c.rect(20, 20, 140, 170, { rx: 14, stroke: M, sw: 1.8, fill: 'none' }); c.rect(190, 20, 140, 170, { rx: 14, stroke: M, sw: 1.8, fill: 'none' })
      c.rect(360, 20, 140, 170, { rx: 14, stroke: M, sw: 1.8, fill: 'none' }); c.rect(530, 20, 110, 170, { rx: 14, stroke: A, sw: 2.6, fill: 'none' })
      ring(c, 90, 100, 46, 17, { r: 4.6, w: 2.4 }); const [bx, by] = hex(90, 100, 46, 17, 0); c.ball(bx, by - 12, 7, W); c.arrow(hex(90, 100, 46, 17, 3)[0], hex(90, 100, 46, 17, 3)[1] - 8, hex(90, 100, 46, 17, 3)[0], 38, LIFT, { w: 2.4 })
      c.text(90, 176, l('игра', 'game'), 'currentColor', { size: 13, w: 700 })
      person(c, 260, 98, W, undefined, 1.1); doc(c, 218, 132, 24, 34, W, { lines: 2 }); doc(c, 278, 132, 24, 34, W, { lines: 2 }); c.text(260, 182, l('игрок', 'player'), W, { size: 13, w: 700 })
      person(c, 430, 98, A, undefined, 1.1); doc(c, 414, 132, 32, 38, A, { lines: 3, tick: true }); c.text(430, 182, l('бухгалтер', 'accountant'), A, { size: 13, w: 700 })
      c.text(585, 118, '2 > 1', A, { size: 30, w: 700 }); c.text(585, 176, l('разрыв', 'gap'), A, { size: 13, w: 700 })
      ;[165, 335, 505].forEach((x) => c.arrow(x, 105, x + 22, 105, M, { w: 2.6 }))
      c.text(330, 236, '2', W, { size: 30, w: 700 }); c.text(362, 234, '→', M, { size: 26 }); c.text(394, 236, '1', A, { size: 30, w: 700 })
    },
  },
  // Где встречается
  uses: {
    ru: 'Где встречается: системы компьютерной алгебры и топология — прямо; кубик Рубика, анализ данных и спецификации — по аналогии',
    en: 'Where it shows up: computer algebra systems and topology directly; the Rubik\'s cube, data analysis and specifications by analogy',
    viewBox: [0, 0, 660, 200], legend: false,
    draw: (c, l) => {
      const card = (i: number, col: string, tag: string, word: string, icon: (x: number, y: number) => void) => {
        const x = 18 + i * 126
        c.rect(x, 14, 114, 150, { rx: 12, stroke: col, sw: 2.2, fill: 'none' }); icon(x + 57, 70)
        c.text(x + 57, 122, word, 'currentColor', { size: 12.5, w: 700 })
        c.pill(x + 14, 134, 86, 20, col, { sw: 1.4 }); c.text(x + 57, 148, tag, col, { size: 11, w: 700 })
      }
      card(0, A, l('прямо', 'direct'), 'GAP, Magma', (x, y) => { c.rect(x - 28, y - 22, 56, 44, { rx: 6, stroke: A, sw: 2.2, fill: 'none' }); c.text(x, y + 7, '>_', A, { size: 20, w: 700 }) })
      card(1, W, l('условно', 'conditional'), l('топология D2', 'topology D2'), (x, y) => { c.rect(x - 24, y - 18, 40, 40, { rx: 4, stroke: W, sw: 2.2, fill: 'none' }); c.line([[x + 16, y - 18], [x + 28, y - 28], [x + 28, y + 12], [x + 16, y + 22]], W, { w: 2.2 }); c.line([[x - 24, y - 18], [x - 12, y - 28], [x + 28, y - 28]], W, { w: 2.2 }) })
      card(2, M, l('аналогия', 'analogy'), l('кубик', 'cube'), (x, y) => { for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) c.rect(x - 27 + i * 19, y - 27 + j * 19, 17, 17, { rx: 3, fill: [A, W, M][(i + j) % 3], fillOp: 0.8 }) })
      card(3, M, l('аналогия', 'analogy'), l('данные', 'data'), (x, y) => { [[-20, -14], [-6, 10], [14, -8], [22, 14], [-24, 12], [6, -20]].forEach(([dx, dy]) => c.dot(x + dx, y + dy, 4, M)); c.dot(x, y, 12, A, { ring: 2 }) })
      card(4, M, l('аналогия', 'analogy'), l('спеки', 'specs'), (x, y) => doc(c, x - 20, y - 26, 40, 52, M, { lines: 3, tick: true }))
    },
  },
}

export default scenes
