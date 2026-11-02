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

  // Три детали игры и кому каждая нужна
  three: {
    ru: 'Три детали игры и кому они нужны: шесть шагов и друзья, которые не меняются местами, нужны игроку; числа три и два нужны бухгалтеру',
    en: 'Three details of the game and who needs them: six steps and friends that do not swap are for the player; the numbers three and two are for the accountant',
    viewBox: [0, 0, 660, 300], legend: false,
    draw: (c, l) => {
      const card = (y: number, title: string, sub: string, icon: (x: number, y: number) => void) => {
        c.rect(30, y, 300, 64, { rx: 10, stroke: M, sw: 1.6, fill: 'none' })
        icon(70, y + 32)
        c.text(112, y + 28, title, 'currentColor', { size: 13.5, w: 700, anchor: 'start' })
        c.text(112, y + 47, sub, M, { size: 11.5, anchor: 'start' })
      }
      card(24, l('шесть шагов — на месте', 'six steps bring you back'), l('круг из шести точек', 'a circle of six points'), (x, y) => {
        c.line([0, 1, 2, 3, 4, 5, 0].map((k) => hex(x, y, 24, 11, k)), 'currentColor', { w: 2 })
        for (let k = 0; k < 6; k++) { const [px, py] = hex(x, y, 24, 11, k); c.dot(px, py, 2.6, 'currentColor') }
      })
      card(118, l('полкруга ⇄ крюк', 'half-circle ⇄ hook'), l('эти ходы можно менять местами', 'these moves can be swapped'), (x, y) => {
        c.arrow(x - 22, y + 14, x + 20, y + 14, A, { w: 2 }); c.arrow(x - 22, y + 14, x - 22, y - 16, W, { w: 2 })
        c.arrow(x - 22, y - 16, x + 20, y - 16, A, { w: 2 }); c.arrow(x + 20, y + 14, x + 20, y - 16, W, { w: 2 })
      })
      card(212, l('числа 3 и 2', 'the numbers 3 and 2'), l('у них нет общего делителя', 'they share no divisor'), (x, y) => {
        c.ball(x - 12, y, 14, A); c.text(x - 12, y + 5, '3', 'var(--surface)', { size: 15, w: 700 })
        c.ball(x + 16, y, 11, M); c.text(x + 16, y + 4, '2', 'var(--surface)', { size: 12, w: 700 })
      })
      const who = (y: number, h: number, t: string, sub: string[], col: string) => {
        c.rect(450, y, 190, h, { rx: 12, stroke: col, sw: 2.4, fill: 'none' })
        c.text(545, y + 30, t, col, { size: 17, w: 700 })
        sub.forEach((ln, i) => c.text(545, y + 54 + i * 17, ln, 'currentColor', { size: 12.5 }))
      }
      who(24, 158, l('ИГРОК', 'PLAYER'), [l('считает правила честно,', 'counts rules honestly,'), l('порядок ходов важен:', 'the order of moves matters:'), l('ему нужны первые', 'needs the first'), l('две детали', 'two details')], W)
      who(212, 64, l('БУХГАЛТЕР', 'ACCOUNTANT'), [], A)
      c.text(545, 262, l('нужна третья деталь', 'needs the third'), 'currentColor', { size: 12.5 })
      c.arrow(334, 56, 446, 80, W, { w: 2.2 }); c.arrow(334, 150, 446, 118, W, { w: 2.2 }); c.arrow(334, 244, 446, 244, A, { w: 2.2 })
    },
  },
  // Список правил игрока: лишние вычёркиваются
  player: {
    ru: 'Список правил игрока: двенадцать шагов и обмен с шестью шагами — следствия первого правила и вычёркиваются; остаются два правила',
    en: 'The player\'s list of rules: twelve steps and swapping with six steps follow from the first rule and are crossed out; two rules remain',
    viewBox: [0, 0, 660, 270], legend: false,
    draw: (c, l) => {
      const rows: [string, string, boolean][] = [
        [l('x⁶ = 1: шесть шагов — и фишка на месте', 'x⁶ = 1: six steps and the token is home'), l('первое правило', 'first rule'), true],
        [l('x¹² = 1: двенадцать шагов — на месте', 'x¹² = 1: twelve steps and it is home'), l('первое правило дважды', 'the first rule twice'), false],
        [l('x³ и крюк t·x²·t⁻¹ меняются местами', 'x³ and the hook t·x²·t⁻¹ swap places'), l('второе правило', 'second rule'), true],
        [l('x⁶ и крюк меняются местами', 'x⁶ and the hook swap places'), l('следствие первого', 'follows from the first'), false],
      ]
      c.caps(240, 24, l('КАНДИДАТЫ В СПИСОК', 'CANDIDATES FOR THE LIST'), M, { size: 11 })
      rows.forEach(([t, why, keep], i) => {
        const y = 40 + i * 54, col = keep ? A : W
        c.rect(40, y, 400, 42, { rx: 9, stroke: col, sw: 2, fill: 'none', op: keep ? 1 : 0.8 })
        c.text(56, y + 26, t, keep ? 'currentColor' : M, { size: 13, w: keep ? 700 : 500, anchor: 'start' })
        if (!keep) c.line([[52, y + 21], [424, y + 21]], W, { w: 2, op: 0.9 })
        c.text(456, y + 26, why, col, { size: 12, w: 700, anchor: 'start' })
        c.badge(630, y + 21, col, '', { r: 10, mark: keep ? 'check' : 'cross' })
      })
      c.text(330, 262, l('в списке остаются два правила: короче игрок его составить не может', 'two rules stay on the list: the player cannot make it shorter'), M, { size: 12 })
    },
  },
  // Запись бухгалтера: счётчик проходов по отрезкам
  loops: {
    ru: 'Запись бухгалтера: две петли по одному квадрату с разным стартом дают одну и ту же запись — сколько раз пройден каждый отрезок',
    en: 'The accountant\'s entry: two loops around the same square with different starts give the same entry, how many times each segment was passed',
    viewBox: [0, 0, 660, 290], legend: false,
    draw: (c, l) => {
      const sq = (ox: number, oy: number, startK: number) => {
        const P: Pt[] = [[ox, oy], [ox + 90, oy], [ox + 90, oy + 90], [ox, oy + 90]]
        P.forEach((p, k) => { const q = P[(k + 1) % 4]; c.arrow(p[0] + (q[0] - p[0]) * 0.12, p[1] + (q[1] - p[1]) * 0.12, p[0] + (q[0] - p[0]) * 0.88, p[1] + (q[1] - p[1]) * 0.88, A, { w: 2.6 }) })
        P.forEach((p, k) => c.dot(p[0], p[1], k === startK ? 8 : 5, k === startK ? W : 'currentColor'))
        return P
      }
      sq(60, 60, 0); sq(240, 60, 2)
      c.text(105, 40, l('петля 1: старт в точке A', 'loop 1: start at point A'), 'currentColor', { size: 12.5, w: 700 })
      c.text(285, 40, l('петля 2: старт в точке C', 'loop 2: start at point C'), 'currentColor', { size: 12.5, w: 700 })
      c.text(105, 178, l('A → B → C → D → A', 'A → B → C → D → A'), M, { size: 12 })
      c.text(285, 178, l('C → D → A → B → C', 'C → D → A → B → C'), M, { size: 12 })
      c.text(55, 56, 'A', M, { size: 12, w: 700, anchor: 'end' }); c.text(158, 56, 'B', M, { size: 12, w: 700, anchor: 'start' })
      c.text(158, 164, 'C', M, { size: 12, w: 700, anchor: 'start' }); c.text(55, 164, 'D', M, { size: 12, w: 700, anchor: 'end' })
      c.text(235, 56, 'A', M, { size: 12, w: 700, anchor: 'end' }); c.text(338, 56, 'B', M, { size: 12, w: 700, anchor: 'start' })
      c.text(338, 164, 'C', M, { size: 12, w: 700, anchor: 'start' }); c.text(235, 164, 'D', M, { size: 12, w: 700, anchor: 'end' })
      c.text(396, 120, '=', 'currentColor', { size: 34, w: 700 })
      c.caps(520, 40, l('ЗАПИСЬ', 'ENTRY'), A, { size: 12 })
      ;[['AB', '+1'], ['BC', '+1'], ['CD', '+1'], ['DA', '+1']].forEach(([seg, n], i) => {
        const y = 56 + i * 34
        c.rect(440, y, 160, 26, { rx: 7, stroke: A, sw: 1.6, fill: 'none' })
        c.text(456, y + 18, l(`отрезок ${seg}`, `segment ${seg}`), 'currentColor', { size: 12.5, anchor: 'start' })
        c.text(586, y + 18, n, A, { size: 13, w: 700, anchor: 'end' })
      })
      c.text(520, 214, l('пройден вперёд +1, назад −1:', 'passed forward +1, backward −1:'), M, { size: 11.5 })
      c.text(520, 230, l('порядок и старт не запоминаются', 'order and start are not remembered'), M, { size: 11.5 })
      c.text(330, 276, l('поэтому записи можно складывать в любом порядке и переносить в любое место карты', 'so entries can be added in any order and moved to any place on the map'), M, { size: 12 })
    },
  },
  // Две записи сливаются в одну
  merge: {
    ru: 'Одна хитрая запись v: из её копий запись второго правила получается за одно действие, запись первого — за три; это возможно, потому что у чисел 3 и 2 нет общего делителя',
    en: 'One clever entry v: from its copies the entry of the second rule comes out in one action, the entry of the first in three; possible because 3 and 2 share no divisor',
    viewBox: [0, 0, 660, 290], legend: false,
    draw: (c, l) => {
      const node = (x: number, y: number, w: number, t: string, sub: string, col: string) => {
        c.rect(x - w / 2, y - 28, w, 56, { rx: 11, stroke: col, sw: 2.4, fill: 'none' })
        c.text(x, y - 5, t, 'currentColor', { size: 14, w: 700 }); c.text(x, y + 14, sub, M, { size: 11.5 })
      }
      node(330, 52, 250, l('хитрая запись v', 'the clever entry v'), l('смесь записей обоих правил', 'a mix of the entries of both rules'), A)
      node(150, 196, 230, l('запись второго правила', 'entry of the second rule'), l('полкруга ⇄ крюк', 'half-circle ⇄ hook'), W)
      node(510, 196, 230, l('запись первого правила', 'entry of the first rule'), l('шесть шагов — на месте', 'six steps bring you back'), W)
      c.arrow(270, 84, 180, 164, A, { w: 2.6 }); c.arrow(390, 84, 480, 164, A, { w: 2.6 })
      c.text(196, 114, l('сразу: 1 действие', 'at once: 1 action'), A, { size: 12.5, w: 700, anchor: 'end' })
      c.text(464, 114, l('за 3 действия', 'in 3 actions'), A, { size: 12.5, w: 700, anchor: 'start' })
      c.rect(120, 244, 420, 32, { rx: 16, stroke: M, sw: 1.6, fill: 'none' })
      c.text(330, 265, l('получается, потому что у 3 и 2 нет общего делителя: 1 = 3 − 2', 'works because 3 and 2 share no divisor: 1 = 3 − 2'), 'currentColor', { size: 12.5, w: 600 })
    },
  },
  // Словарь «ролик — статья»
  dict: {
    ru: 'Словарь: слова ролика и их запись в статье — шаг x, лифт t, первое правило x⁶ = 1, второе правило — коммутатор, счёт игрока 2, счёт бухгалтера 1',
    en: 'Dictionary: words of the film and their notation in the paper: step x, lift t, first rule x⁶ = 1, second rule a commutator, player\'s count 2, accountant\'s count 1',
    viewBox: [0, 0, 660, 318], legend: false,
    draw: (c, l) => {
      c.caps(130, 24, l('В РОЛИКЕ', 'IN THE FILM'), M, { size: 11 }); c.caps(470, 24, l('В СТАТЬЕ', 'IN THE PAPER'), A, { size: 11 })
      const rows: [string, string, string][] = [
        [l('шаг', 'step'), 'x', A], [l('лифт', 'lift'), 't', A],
        [l('шесть шагов — на месте', 'six steps bring you back'), 'x⁶ = 1', W],
        [l('полкруга ⇄ крюк', 'half-circle ⇄ hook'), '[x³, t·x²·t⁻¹] = 1', W],
        [l('счёт игрока: два правила', 'player: two rules'), l('соотношений: 2', 'relations: 2'), 'currentColor'],
        [l('счёт бухгалтера: одна запись', 'accountant: one entry'), l('образующих модуля: 1', 'module generators: 1'), 'currentColor'],
      ]
      rows.forEach(([a, b, col], i) => {
        const y = 40 + i * 44
        c.rect(30, y, 200, 34, { rx: 9, stroke: M, sw: 1.6, fill: 'none' }); c.text(130, y + 22, a, 'currentColor', { size: 12.5, w: 600 })
        c.arrow(236, y + 17, 296, y + 17, M, { w: 2 })
        c.rect(302, y, 328, 34, { rx: 9, stroke: col, sw: 2, fill: 'none' }); c.text(466, y + 23, b, col, { size: 14.5, w: 700 })
      })
      c.text(330, 308, l('x — ход «шаг», t — ход «лифт», t⁻¹ — лифт вниз, [u, v] = u·v·u⁻¹·v⁻¹: «u и v меняются местами»', 'x is the move “step”, t the move “lift”, t⁻¹ a lift down, [u, v] = u·v·u⁻¹·v⁻¹: “u and v can be swapped”'), M, { size: 11 })
    },
  },
}

export default scenes
