// Схемы поста «Какую расстановку шариков на кольце распутывать дольше всех» (arXiv 2502.18663, ролик про кольцо).
// Кольцо — шарики с номерами по кругу, окошко наверху (два первых места), ходы: влево, вправо, обмен в окошке.
// Этажи и потолки посчитаны перебором (обход в ширину от порядка) в репозитории роликов, papers/2502.18663-ring/ring3d.py
import { type Canvas, type Scene, A, M, W } from '@/lib/infographic'

// ---------- кольцо ----------
type Pt = [number, number]
/** Гнездо k кольца из n шариков: окошко (гнёзда 0 и 1) наверху, дальше по часовой стрелке */
const slot = (cx: number, cy: number, R: number, n: number, k: number): Pt => {
  const a = Math.PI / 2 + Math.PI / n - (2 * Math.PI * k) / n
  return [cx + R * Math.cos(a), cy - R * Math.sin(a)]
}
/** Кольцо: обод, окошко, шарики с номерами (с единицы). arr[k] — номер шарика в гнезде k */
function ring(c: Canvas, cx: number, cy: number, R: number, arr: number[], o: { r?: number; col?: string; hl?: number[]; hlCol?: string; window?: boolean; labels?: boolean; size?: number; ink?: string; under?: (at: (v: number) => Pt) => void } = {}) {
  const n = arr.length, r = o.r ?? 14
  c.dot(cx, cy, R, M, { ring: 2, op: 0.5 })
  if (o.window !== false) {
    const [x0, y0] = slot(cx, cy, R, n, 0), [x1] = slot(cx, cy, R, n, 1)
    c.rect(x0 - r * 1.35, y0 - r * 1.35, x1 - x0 + r * 2.7, r * 2.7, { rx: r * 0.6, stroke: 'currentColor', sw: 2, fill: 'none' })
  }
  const at = (v: number): Pt => slot(cx, cy, R, n, arr.indexOf(v))
  o.under?.(at) // то, что лежит под шариками (линии троек)
  arr.forEach((v, k) => {
    const [x, y] = slot(cx, cy, R, n, k)
    const col = o.hl?.includes(v) ? (o.hlCol ?? A) : (o.col ?? M)
    c.ball(x, y, r, col)
    if (o.labels !== false) c.text(x, y + r * 0.36, String(v), o.ink ?? '#fff', { size: o.size ?? Math.round(r * 0.95), w: 700 })
  })
  return at
}
const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i)
const MIRROR = (n: number) => [2, 1, ...range(3, n).reverse()] // зеркало с номерами от 1: (2 1 n … 3)
const FLOORS5 = [1, 3, 6, 10, 16, 24, 29, 21, 6, 3, 1] // этажи 5 шариков: этаж 0 … 10 (перебор)
const pairs = (n: number) => (n * (n - 1)) / 2

const scenes: Record<string, Scene> = {
  // Три хода на кольце из шести шариков
  moves: {
    ru: 'Кольцо из шести шариков с номерами; ходы: повернуть кольцо влево, вправо или поменять два шарика в окошке наверху', en: 'A ring of six numbered balls; moves: turn the ring left, turn it right, or swap the two balls in the window at the top',
    viewBox: [0, 0, 660, 250], legend: false,
    draw: (c, l) => {
      const base = [1, 2, 3, 4, 5, 6]
      const panels: [number, number[], string][] = [
        [110, base, l('порядок', 'in order')],
        [330, [2, 3, 4, 5, 6, 1], l('↺ влево', '↺ left')],
        [550, [2, 1, 3, 4, 5, 6], l('⇄ обмен в окошке', '⇄ swap in the window')],
      ]
      panels.forEach(([x, arr, t], j) => {
        ring(c, x, 120, 62, arr, { hl: j === 2 ? [1, 2] : [], r: 15 })
        c.text(x, 226, t, j ? 'currentColor' : M, { size: 14, w: 700 })
      })
      c.text(330, 22, l('↻ вправо — то же в другую сторону', '↻ right — the same the other way'), M, { size: 12 })
    },
  },
  // Башня: 120 расстановок пяти шариков по этажам
  tower: {
    ru: 'Все 120 расстановок пяти шариков по этажам: этаж — сколько ходов до порядка; внизу порядок, на десятом этаже — одна расстановка', en: 'All 120 arrangements of five balls by floor: the floor is the number of moves to order; order at the bottom, a single arrangement on floor 10',
    viewBox: [0, 0, 660, 330], legend: false,
    draw: (c, l) => {
      const cx = 260, k = 7.2, h = 22
      FLOORS5.forEach((m, f) => {
        const y = 290 - f * (h + 3), w = Math.max(10, m * k)
        const col = f === 10 ? 'currentColor' : f === 0 ? A : M
        c.rect(cx - w / 2, y - h, w, h, { rx: 4, fill: col, fillOp: f === 0 || f === 10 ? 0.9 : 0.4 })
        c.text(cx - 130, y - 6, String(f), M, { size: 12, anchor: 'end' })
        c.text(cx + w / 2 + 8, y - 6, String(m), f === 10 ? 'currentColor' : M, { size: 12, w: f === 10 ? 700 : 500, anchor: 'start' })
      })
      c.text(cx - 130, 20, l('этаж', 'floor'), M, { size: 12, w: 700, anchor: 'end' })
      c.text(470, 46, l('потолок: 10 ходов', 'ceiling: 10 moves'), 'currentColor', { size: 15, w: 700, anchor: 'start' })
      c.text(470, 68, l('на нём ровно одна', 'exactly one sits there'), M, { size: 13, anchor: 'start' })
      c.text(470, 286, l('порядок', 'in order'), A, { size: 14, w: 700, anchor: 'start' })
      c.text(470, 170, l('всего 120', '120 in total'), M, { size: 13, anchor: 'start' })
    },
  },
  // Зеркало и задом наперёд
  mirror: {
    ru: 'Зеркало — кольцо, отражённое через окошко: у шести шариков оно на 15-м этаже, на потолке; задом наперёд — на 13-м', en: 'The mirror is the ring reflected through the window: for six balls it sits on floor 15, the ceiling; the reversed order sits on floor 13',
    viewBox: [0, 0, 660, 270], legend: false,
    draw: (c, l) => {
      ring(c, 110, 125, 66, [1, 2, 3, 4, 5, 6], { r: 15 })
      c.text(110, 238, l('порядок', 'in order'), M, { size: 14, w: 700 })
      c.thenArrow(195, 245, 125, M)
      ring(c, 330, 125, 66, MIRROR(6), { r: 15, col: 'currentColor', ink: 'var(--surface)' })
      c.line([[330, 30], [330, 210]], 'currentColor', { w: 1.6, dash: '5 4' })
      c.text(330, 238, l('зеркало · этаж 15', 'mirror · floor 15'), 'currentColor', { size: 14, w: 700 })
      ring(c, 550, 125, 66, [6, 5, 4, 3, 2, 1], { r: 15 })
      c.text(550, 238, l('задом наперёд · этаж 13', 'reversed · floor 13'), M, { size: 14, w: 700 })
      c.text(330, 22, l('ось — через окошко', 'axis through the window'), M, { size: 12 })
    },
  },
  // Перебор: число расстановок растёт как n!
  count: {
    ru: 'Сколько расстановок у кольца: 5 шариков — 120, 15 — больше триллиона, 20 — 2,4·10¹⁸; перебор доведён до 15', en: 'How many arrangements a ring has: 5 balls — 120, 15 — over a trillion, 20 — 2.4·10¹⁸; exhaustive search went up to 15',
    viewBox: [0, 0, 660, 300], legend: false,
    draw: (c, l) => {
      const rows: [number, string, number][] = [[5, '120', 3], [8, '40 320', 5], [10, l('3,6 млн', '3.6 M'), 7], [12, l('479 млн', '479 M'), 9], [15, l('1,3 трлн', '1.3 T'), 13], [20, '2,4·10¹⁸', 19]]
      const x0 = 150, k = 22
      rows.forEach(([n, t, digits], j) => {
        const y = 30 + j * 40
        const over = n > 15
        c.text(x0 - 14, y + 17, l(`${n} шариков`, `${n} balls`), 'currentColor', { size: 14, w: 700, anchor: 'end' })
        c.rect(x0, y, digits * k, 24, { rx: 5, fill: over ? W : A, fillOp: over ? 0.5 : 0.55 })
        c.text(x0 + digits * k + 10, y + 17, l(t, t.replace(',', '.')), over ? W : 'currentColor', { size: 14, w: 700, anchor: 'start' })
      })
      c.line([[40, 222], [620, 222]], W, { w: 2, dash: '5 4' })
      c.text(330, 284, l('предел перебора — 15 шариков, несколько дней счёта', 'exhaustive search limit — 15 balls, several days of compute'), W, { size: 13, w: 700 })
    },
  },
  // Пары: 5 шариков — 10 линий
  pairs: {
    ru: 'Пять шариков соединяются в пары десятью линиями, и потолок у них — 10; у шести — 15 пар и потолок 15', en: 'Five balls form ten pairs, and their ceiling is 10; six balls form 15 pairs and the ceiling is 15',
    viewBox: [0, 0, 660, 260], legend: false,
    draw: (c, l) => {
      const draw = (cx: number, n: number) => {
        const pts = range(0, n - 1).map((k) => slot(cx, 120, 72, n, k))
        for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) c.line([pts[i], pts[j]], A, { w: 1.8, op: 0.75 })
        pts.forEach(([x, y]) => c.ball(x, y, 12, M))
      }
      draw(150, 5); draw(420, 6)
      c.text(150, 226, l('5 шариков: 10 пар = потолок 10', '5 balls: 10 pairs = ceiling 10'), 'currentColor', { size: 14, w: 700 })
      c.text(420, 226, l('6 шариков: 15 пар = потолок 15', '6 balls: 15 pairs = ceiling 15'), 'currentColor', { size: 14, w: 700 })
      c.text(600, 120, 'n·(n−1)/2', A, { size: 16, w: 700 })
    },
  },
  // Классическая программа: 217 944 хода против 190 пар
  gap: {
    ru: 'Кольцо из 20 шариков: классическая программа нашла путь в 217 944 хода за 41 минуту, а пар всего 190 — в 1147 раз меньше', en: 'A 20-ball ring: the classic program found a 217,944-move path in 41 minutes, while there are only 190 pairs — 1,147 times fewer',
    viewBox: [0, 0, 660, 200], legend: false,
    draw: (c, l) => {
      const x0 = 210
      c.text(x0 - 14, 62, l('пар', 'pairs'), 'currentColor', { size: 14, w: 700, anchor: 'end' })
      c.rect(x0, 46, 4, 24, { rx: 2, fill: A })
      c.text(x0 + 14, 63, '190', A, { size: 15, w: 700, anchor: 'start' })
      c.text(x0 - 14, 122, l('классическая программа', 'classic program'), 'currentColor', { size: 14, w: 700, anchor: 'end' })
      c.rect(x0, 106, 400, 24, { rx: 5, fill: W, fillOp: 0.6 })
      c.line([[x0 + 300, 100], [x0 + 312, 136]], 'var(--surface)', { w: 5 }); c.line([[x0 + 310, 100], [x0 + 322, 136]], 'var(--surface)', { w: 5 })
      c.text(x0 + 395, 123, l('217 944', '217,944'), '#fff', { size: 15, w: 700, anchor: 'end' })
      c.text(x0, 168, l('41 минута · в 1147 раз длиннее · столбик с разрывом, не в масштабе', '41 minutes · 1,147 times longer · bar broken, not to scale'), M, { size: 13, anchor: 'start' })
    },
  },
  // Прогулка: шаг прогулки против настоящего этажа
  walk: {
    ru: 'Прогулка из 12 случайных ходов от порядка на кольце из пяти шариков: шаг растёт до 12, а настоящий этаж к концу — 6', en: 'A walk of 12 random moves from order on a five-ball ring: the step count grows to 12, while the true floor at the end is 6',
    viewBox: [0, 0, 660, 280], legend: false,
    draw: (c, l) => {
      const fl = [0, 1, 2, 3, 4, 4, 5, 6, 6, 7, 6, 5, 6]
      const xt = range(0, 12).map((i) => (i % 4 ? '' : String(i)))
      const pt = c.chart(70, 600, 40, 220, { yTicks: ['0', '3', '6', '9', '12'], xTicks: xt, xTitle: l('шаг прогулки', 'walk step'), title: l('ходов от порядка', 'moves from order') })
      c.series(fl.map((_, i) => pt(i, i / 12)), M, { w: 2.5, dots: 3 })
      c.series(fl.map((f, i) => pt(i, f / 12)), A, { w: 3.5, dots: 4 })
      const [ex, ey] = pt(12, 6 / 12), [wx, wy] = pt(12, 1)
      c.text(wx + 10, wy + 5, l('шаг 12', 'step 12'), M, { size: 13, w: 700, anchor: 'start' })
      c.text(ex + 10, ey + 5, l('этаж 6', 'floor 6'), A, { size: 13, w: 700, anchor: 'start' })
    },
  },
  // Фронт: до 28 шариков — ровно число пар, до 44 — длиннее
  front: {
    ru: 'Компас с фронтом без подсказки: до 28 шариков путь ровно равен числу пар, от 29 до 44 — находится, но длиннее', en: 'Compass with a beam, no hint: up to 28 balls the path equals the number of pairs exactly, from 29 to 44 it is found but longer',
    viewBox: [0, 0, 660, 190], legend: false,
    draw: (c, l) => {
      // таблицы 2–3 статьи: длина пути / число пар
      const data: [number, number][] = [[9, 1], [12, 1], [16, 1], [20, 1], [24, 1], [28, 1], [29, 408 / 406], [32, 508 / 496], [36, 834 / 630], [40, 926 / 780], [44, 1060 / 946]]
      data.forEach(([n, q], j) => {
        const x = 50 + j * 54, ok = q === 1
        const hgt = 50 * q
        c.rect(x - 14, 130 - hgt, 28, hgt, { rx: 4, fill: ok ? A : M, fillOp: ok ? 0.8 : 0.5 })
        c.text(x, 150, String(n), ok ? A : M, { size: 13, w: 700 })
      })
      c.line([[30, 80], [630, 80]], 'currentColor', { w: 1.4, dash: '4 4' })
      c.text(30, 72, l('= число пар', '= pairs'), 'currentColor', { size: 12, w: 700, anchor: 'start' })
      c.text(185, 178, l('ровно число пар', 'exactly the pairs'), A, { size: 13, w: 700 })
      c.text(480, 178, l('находится, но длиннее', 'found, but longer'), M, { size: 13, w: 700 })
      c.text(630, 20, l('высота — путь / число пар', 'height — path / pairs'), M, { size: 12, anchor: 'end' })
    },
  },
  // Подсказка: в окошке уже по порядку — не меняем
  hint: {
    ru: 'Подсказка в одну строчку: если два шарика в окошке уже по порядку, их не меняют; предел — с 40 до 100 шариков', en: 'A one-line hint: if the two balls in the window are already in order, do not swap them; the limit grows from 40 to 100 balls',
    viewBox: [0, 0, 660, 240], legend: false,
    draw: (c, l) => {
      ring(c, 130, 130, 70, [3, 4, 1, 6, 2, 5], { r: 15, hl: [3, 4] })
      c.badge(130, 34, W, '', { r: 11, mark: 'cross' })
      c.text(130, 228, l('3 и 4 уже по порядку — не меняем', '3 and 4 already in order — no swap'), A, { size: 13, w: 700 })
      const x0 = 300, x1 = 620, X = (n: number) => x0 + ((n - 20) / 90) * (x1 - x0)
      c.rect(x0, 92, x1 - x0, 14, { rx: 7, fill: M, fillOp: 0.15 })
      c.rect(x0, 92, X(40) - x0, 14, { rx: 7, fill: M, fillOp: 0.6 })
      c.rect(X(40), 92, X(100) - X(40), 14, { rx: 7, fill: A, fillOp: 0.85 })
      for (const n of [20, 40, 100]) c.text(X(n), 132, String(n), n === 100 ? A : M, { size: 14, w: 700 })
      c.text(X(40), 80, l('без подсказки', 'no hint'), M, { size: 12 })
      c.text(X(100) - 6, 80, l('с подсказкой', 'with hint'), A, { size: 12, w: 700, anchor: 'end' })
      c.text(460, 176, l('100 шариков: 9 часов, путь 16 632 при 4 950 парах', '100 balls: 9 hours, path 16,632 vs 4,950 pairs'), 'currentColor', { size: 13, w: 700 })
    },
  },
  // Соревнование: кольца от 2 до 200 шариков
  contest: {
    ru: 'Открытое соревнование: кольца от 2 до 200 шариков; участники дошли до пути ровно в число пар, короче — никто', en: 'An open competition: rings from 2 to 200 balls; participants reached paths of exactly the number of pairs, nobody went shorter',
    viewBox: [0, 0, 660, 170], legend: false,
    draw: (c, l) => {
      const ns = [2, 5, 10, 20, 40, 80, 120, 160, 200]
      ns.forEach((n, j) => {
        const x = 50 + j * 70, R = 8 + Math.sqrt(n) * 1.6
        c.dot(x, 60, R, M, { ring: 2.2 })
        c.text(x, 60 + R + 16, String(n), M, { size: 12, w: 700 })
        c.badge(x, 60 + R + 36, A, '', { r: 8, mark: 'check' })
      })
      c.text(330, 162, l('короче числа пар — 0 решений', 'shorter than the pairs — 0 solutions'), 'currentColor', { size: 14, w: 700 })
    },
  },
  // Тройки: поворот не переворачивает, обмен — переворачивает
  triples: {
    ru: 'Тройка шариков 1, 2, 4 идёт по часовой; поворот кольца это не меняет, обмен в окошке переворачивает её против часовой', en: 'The triple 1, 2, 4 runs clockwise; turning the ring keeps that, a swap in the window flips it counterclockwise',
    viewBox: [0, 0, 660, 260], legend: false,
    draw: (c, l) => {
      const panel = (x: number, arr: number[], t: string, flip: boolean) => {
        ring(c, x, 120, 62, arr, { r: 14, hl: [1, 2, 4], under: (at) => c.line([1, 2, 4, 1].map(at), flip ? W : A, { w: 2.5, op: 0.8 }) })
        c.text(x, 226, (flip ? '↺ ' : '↻ ') + t, flip ? W : 'currentColor', { size: 13, w: 700 })
      }
      panel(110, [1, 2, 3, 4, 5, 6], l('по часовой', 'clockwise'), false)
      panel(330, [3, 4, 5, 6, 1, 2], l('после поворота — так же', 'after a turn — the same'), false)
      panel(550, [2, 1, 3, 4, 5, 6], l('после обмена — против', 'after a swap — flipped'), true)
      c.thenArrow(190, 250, 120, M); c.thenArrow(410, 470, 120, M)
    },
  },
  // Вилка: доказанные границы потолка
  fork: {
    ru: 'Вилка: потолок доказанно лежит между «пары − половина шариков − 1» и «пары + 3 хода на шарик»; для 20 шариков — от 179 до 250, гипотеза 190', en: 'The fork: the ceiling provably lies between “pairs − half the balls − 1” and “pairs + 3 moves per ball”; for 20 balls — 179 to 250, conjecture 190',
    viewBox: [0, 0, 660, 230], legend: false,
    draw: (c, l) => {
      const XC = 330, SC = 300
      ;[10, 20, 100].forEach((n, j) => {
        const lo = pairs(n) - n / 2 - 1, mid = pairs(n), hi = pairs(n) + 3 * n, y = 50 + j * 60
        const X = (v: number) => XC + SC * (v / mid - 1)
        c.text(110, y + 5, l(`${n} шариков`, `${n} balls`), 'currentColor', { size: 14, w: 700, anchor: 'end' })
        c.rect(X(lo), y - 11, X(hi) - X(lo), 22, { rx: 5, fill: A, fillOp: 0.3, stroke: A, sw: 1.5 })
        c.line([[XC, y - 17], [XC, y + 17]], 'currentColor', { w: 3 })
        c.text(X(lo) - 8, y + 5, String(lo), A, { size: 12, w: 700, anchor: 'end' })
        c.text(X(hi) + 8, y + 5, String(hi), A, { size: 12, w: 700, anchor: 'start' })
        c.text(XC, y - 21, String(mid), 'currentColor', { size: 12, w: 700 })
      })
      c.text(330, 222, l('черта — гипотеза «число пар»; чем больше шариков, тем уже вилка относительно потолка', 'line — the “pairs” conjecture; the more balls, the narrower the fork relative to the ceiling'), M, { size: 12 })
    },
  },
}
export default scenes
