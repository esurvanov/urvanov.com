// Схемы поста «Сколько правил нужно, чтобы описать игру» (arXiv 2610.23637, ролик про разрыв соотношений).
// Игра: фишка, круг из шести точек, два хода — «шаг» (по кругу) и «лифт» (на этаж выше и обратно).
// Правила: 6 шагов = на месте; «полкруга» (3 шага) и «крюк» (лифт, 2 шага, спуск) можно менять местами.
// В статье: G = ⟨x, t | x⁶, [x³, t·x²·t⁻¹]⟩ (теорема A при p = 3, q = 2).
import { type Scene, A, M, W } from '@/lib/infographic'

type Pt = [number, number]
/** Точка k круга из шести точек: эллипс (вид сверху под углом) с центром (cx, cy) */
const hex = (cx: number, cy: number, rx: number, ry: number, k: number): Pt => {
  const a = (Math.PI / 180) * (180 + 60 * k)
  return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]
}

const scenes: Record<string, Scene> = {
  // Карта игры: круг внизу, у каждой точки свой лифт на свой круг этажом выше
  map: {
    ru: 'Карта игры: внизу круг из шести точек, шаг двигает фишку по кругу; из точек круга лифты поднимают фишку на свои круги этажом выше',
    en: 'The game map: a circle of six points at the bottom, a step moves the token along the circle; lifts from the points raise the token to their own circles one floor up',
    viewBox: [0, 0, 660, 312], legend: false,
    draw: (c, l) => {
      const base = { cx: 330, cy: 196, rx: 150, ry: 40 }
      const ring = (cx: number, cy: number, rx: number, ry: number, col: string, w: number, op = 1) => {
        const pts = [0, 1, 2, 3, 4, 5, 0].map((k) => hex(cx, cy, rx, ry, k))
        c.line(pts, col, { w, op })
      }
      // верхние круги: свой у каждой из трёх точек
      const tops: [number, number][] = [[130, 78], [330, 62], [530, 78]]
      const from = [0, 2, 3] // точки основания, откуда идут лифты (без пересечений с кругом)
      tops.forEach(([x, y], i) => {
        ring(x, y, 66, 20, A, 2, 0.7)
        for (let k = 0; k < 6; k++) { const [px, py] = hex(x, y, 66, 20, k); c.dot(px, py, 3.5, A, { op: 0.7 }) }
        c.text(x, y - 34, l(`свой круг ${i + 1}`, `own circle ${i + 1}`), M, { size: 12 })
      })
      ring(base.cx, base.cy, base.rx, base.ry, 'currentColor', 2.4)
      for (let k = 0; k < 6; k++) {
        const [px, py] = hex(base.cx, base.cy, base.rx, base.ry, k)
        c.dot(px, py, 6, 'currentColor')
        c.text(px + (px < base.cx ? -16 : 16), py + 4, String(k), M, { size: 12, w: 700 })
      }
      // лифты
      from.forEach((k, i) => {
        const [px, py] = hex(base.cx, base.cy, base.rx, base.ry, k)
        const [tx, ty] = tops[i]
        c.arrow(px, py - 9, tx, ty + 24, A, { w: 2.2 })
      })
      // фишка и шаг по кругу
      const [fx, fy] = hex(base.cx, base.cy, base.rx, base.ry, 0)
      c.ball(fx, fy - 14, 9, W)
      c.text(fx - 20, fy - 28, l('фишка', 'token'), W, { size: 12, w: 700, anchor: 'end' })
      const [sx, sy] = hex(base.cx, base.cy, base.rx, base.ry, 1)
      c.arrow(fx + (sx - fx) * 0.25 + 8, fy + (sy - fy) * 0.25 + 12, fx + (sx - fx) * 0.8 + 6, fy + (sy - fy) * 0.8 + 12, W, { w: 2.4 })
      c.text(40, 268, l('шаг — по кругу', 'step: along the circle'), W, { size: 13, w: 700, anchor: 'start' })
      c.text(620, 268, l('лифт — этажом выше', 'lift: one floor up'), A, { size: 13, w: 700, anchor: 'end' })
      c.text(40, 298, l('этаж 0 — внизу, этаж 1 — вверху; лифт вниз везёт обратно · шесть шагов — и фишка на месте: это первое правило', 'floor 0 below, floor 1 above; a lift down brings the token back · six steps and it is home: the first rule'), M, { size: 11.5, anchor: 'start' })
    },
  },
  // Второе правило: полкруга и крюк можно менять местами
  swap: {
    ru: 'Второе правило: полкруга (три шага) и крюк (лифт вверх, два шага, лифт вниз) можно менять местами — оба порядка приводят в одну точку',
    en: 'The second rule: a half-circle (three steps) and a hook (lift up, two steps, lift down) can be swapped: both orders end at the same point',
    viewBox: [0, 0, 660, 270], legend: false,
    draw: (c, l) => {
      const S: Pt = [150, 210], R: Pt = [510, 210], U: Pt = [150, 62], T: Pt = [510, 62]
      const gap = 14
      c.arrow(S[0] + gap, S[1], R[0] - gap, R[1], A, { w: 2.6 }) // полкруга
      c.arrow(U[0] + gap, U[1], T[0] - gap, T[1], A, { w: 2.6 })
      c.arrow(S[0], S[1] - gap, U[0], U[1] + gap, W, { w: 2.6 }) // крюк
      c.arrow(R[0], R[1] - gap, T[0], T[1] + gap, W, { w: 2.6 })
      c.dot(S[0], S[1], 8, 'currentColor'); c.dot(R[0], R[1], 8, M); c.dot(U[0], U[1], 8, M)
      c.dot(T[0], T[1], 10, 'currentColor'); c.dot(T[0], T[1], 16, 'currentColor', { ring: 2 })
      c.text(S[0] - 18, S[1] + 5, l('старт', 'start'), 'currentColor', { size: 13, w: 700, anchor: 'end' })
      c.text(T[0] + 24, T[1] + 5, l('одна и та же точка', 'the same point'), 'currentColor', { size: 13, w: 700, anchor: 'start' })
      c.text(330, S[1] + 28, l('полкруга: три шага подряд', 'half-circle: three steps in a row'), A, { size: 13, w: 700 })
      c.text(330, U[1] - 14, l('полкруга', 'half-circle'), A, { size: 13, w: 700 })
      c.text(S[0] - 18, 136, l('крюк', 'hook'), W, { size: 13, w: 700, anchor: 'end' })
      c.text(S[0] - 18, 154, l('лифт, 2 шага,', 'lift, 2 steps,'), M, { size: 11.5, anchor: 'end' })
      c.text(S[0] - 18, 168, l('спуск', 'lift down'), M, { size: 11.5, anchor: 'end' })
      c.text(R[0] + 18, 140, l('крюк', 'hook'), W, { size: 13, w: 700, anchor: 'start' })
      c.text(330, 262, l('полкруга, потом крюк = крюк, потом полкруга: ходы можно менять местами', 'half-circle then hook = hook then half-circle: the moves can be swapped'), M, { size: 12 })
    },
  },
  // Два счёта: игрок и бухгалтер
  counts: {
    ru: 'Два счёта правил: игрок получает два правила, бухгалтер — одну запись',
    en: 'Two counts of rules: the player gets two rules, the accountant gets one entry',
    viewBox: [0, 0, 660, 290], legend: false,
    draw: (c, l) => {
      const col = (x: number, title: string, sub: string, items: string[], n: string, color: string) => {
        c.caps(x, 30, title, color, { size: 12 })
        c.text(x, 50, sub, M, { size: 12 })
        items.forEach((t, i) => {
          const y = 70 + i * 54
          c.rect(x - 120, y, 240, 42, { rx: 9, stroke: color, sw: 2, fill: 'none' })
          c.text(x, y + 26, t, 'currentColor', { size: 13, w: 600 })
        })
        c.text(x, 238, n, color, { size: 54, w: 700 })
      }
      col(170, l('ИГРОК', 'PLAYER'), l('честный счёт: порядок ходов важен', 'honest count: the order of moves matters'),
        [l('6 шагов — на месте', '6 steps: back home'), l('полкруга ⇄ крюк', 'half-circle ⇄ hook')], '2', W)
      col(490, l('БУХГАЛТЕР', 'ACCOUNTANT'), l('быстрый счёт: порядок ходов не помнит', 'fast count: forgets the order of moves'),
        [l('одна хитрая запись', 'one clever entry')], '1', A)
      c.text(330, 232, '>', M, { size: 44, w: 700 })
      c.text(330, 276, l('игроку нужно два правила, бухгалтеру хватает одной записи', 'the player needs two rules, the accountant needs one entry'), M, { size: 12 })
    },
  },
  // Друзья по Ньюману
  friends: {
    ru: 'Друзья хода «полкруга»: два шага по тому же кругу и крюк; между собой они не дружат, поэтому одного правила мало',
    en: 'Friends of the “half-circle” move: two steps along the same circle and a hook; they are not friends with each other, so one rule is not enough',
    viewBox: [0, 0, 660, 290], legend: false,
    draw: (c, l) => {
      const top: Pt = [330, 52], a: Pt = [140, 208], b: Pt = [520, 208]
      const card = (p: Pt, t: string, col: string, w = 210) => {
        c.rect(p[0] - w / 2, p[1] - 22, w, 44, { rx: 10, stroke: col, sw: 2, fill: 'none' })
        c.text(p[0], p[1] + 5, t, 'currentColor', { size: 13.5, w: 700 })
      }
      c.line([[top[0] - 40, top[1] + 22], [a[0] + 30, a[1] - 22]], A, { w: 2.4 })
      c.line([[top[0] + 40, top[1] + 22], [b[0] - 30, b[1] - 22]], A, { w: 2.4 })
      c.badge(228, 124, A, '', { r: 11, mark: 'check' }); c.badge(432, 124, A, '', { r: 11, mark: 'check' })
      c.text(188, 108, l('дружат', 'commute'), A, { size: 12, w: 700, anchor: 'end' })
      c.text(472, 108, l('дружат', 'commute'), A, { size: 12, w: 700, anchor: 'start' })
      c.line([[a[0] + 105, a[1]], [b[0] - 105, b[1]]], W, { w: 2.4, dash: '6 5' })
      c.badge(330, 208, W, '', { r: 12, mark: 'cross' })
      c.text(330, 240, l('между собой не дружат', 'do not commute with each other'), W, { size: 12.5, w: 700 })
      card(top, l('полкруга', 'half-circle'), 'currentColor', 190)
      card(a, l('два шага по тому же кругу', 'two steps along the same circle'), M, 220)
      card(b, l('крюк', 'hook'), M, 150)
      c.text(330, 276, l('Ньюман, 1973: при одном правиле друзья любого хода дружат между собой — здесь это не так', 'Newman, 1973: with one rule, the friends of any move commute with each other — not here'), M, { size: 12 })
    },
  },
  // Монеты: из 3 и 2 собирается 1
  coins: {
    ru: 'Из трёх и двух собирается единица: три рубля отдать, два рубля получить сдачей — на руках один рубль',
    en: 'One is built from three and two: pay three, get two back as change — one remains',
    viewBox: [0, 0, 660, 230], legend: false,
    draw: (c, l) => {
      const coin = (x: number, y: number, n: string, col: string) => {
        c.ball(x, y, 30, col)
        c.text(x, y + 9, n, 'var(--surface)', { size: 28, w: 700 })
      }
      coin(90, 90, '3', A)
      c.text(165, 100, '−', 'currentColor', { size: 36, w: 700 })
      coin(240, 90, '2', M)
      c.text(315, 100, '=', 'currentColor', { size: 36, w: 700 })
      coin(390, 90, '1', W)
      c.text(90, 150, l('даём', 'pay'), A, { size: 13, w: 700 })
      c.text(240, 150, l('сдача', 'change'), M, { size: 13, w: 700 })
      c.text(390, 150, l('осталось', 'left'), W, { size: 13, w: 700 })
      c.rect(470, 52, 160, 76, { rx: 10, stroke: A, sw: 2, fill: 'none' })
      c.text(550, 82, l('наибольший общий', 'greatest common'), 'currentColor', { size: 12.5 })
      c.text(550, 99, l('делитель', 'divisor'), 'currentColor', { size: 12.5 })
      c.text(550, 120, l('НОД(3, 2) = 1', 'gcd(3, 2) = 1'), A, { size: 15, w: 700 })
      c.text(330, 205, l('у чисел 3 и 2 нет общего делителя, поэтому из двух записей получается одна', 'the numbers 3 and 2 share no divisor, so two entries can be merged into one'), M, { size: 12 })
    },
  },
}

export default scenes
