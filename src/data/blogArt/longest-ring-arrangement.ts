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
    if (o.hl?.includes(v)) c.dot(x, y, r + 4.5, o.hlCol ?? A, { ring: 3 }) // выделение — обводкой, цвет шарика остаётся его номером
    c.ball(x, y, r, o.col ?? BALL[(v - 1) % BALL.length])
    if (o.labels !== false) c.text(x, y + r * 0.36, String(v), o.ink ?? 'var(--surface)', { size: o.size ?? Math.round(r * 0.95), w: 700 })
  })
  return at
}
// Цвет шарика — его номер (как наклейки кубика в посте про кубик): видно, куда переехал каждый
const BALL = ['var(--pn-i)', 'var(--py-i)', 'var(--pg-i)', 'var(--pc-i)', 'var(--pr-i)', 'var(--pp-i)']
const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i)
const MIRROR = (n: number) => [2, 1, ...range(3, n).reverse()] // зеркало с номерами от 1: (2 1 n … 3)
const FLOORS5 = [1, 3, 6, 10, 16, 24, 29, 21, 6, 3, 1] // этажи 5 шариков: этаж 0 … 10 (перебор)
const pairs = (n: number) => (n * (n - 1)) / 2

// Авторы в порядке статьи, как напечатано (латиницей — без догадок о русском написании); первые двое — равный вклад
const AUTHORS = ['Alexander Chervov', 'Mark Obozov', 'Alexander Soibelman', 'Sergey Lytkin', 'Igor Kiselev', 'Sergei Fironov', 'Andrey Lukyanenko',
  'Antonina Dolgorukova', 'Andrey Ogurtsov', 'Fedor Petrov', 'Stanislav Krymskii', 'Mikhail Evseev', 'Lilia Grunwald', 'Denis Gorodkov',
  'Grigorii Antiufeev', 'Gordey Verbii', 'Vladislav Zamkovoy', 'Liuda Cheldieva', 'Ivan Koltsov', 'Arseniy Sychev', 'Anton Eliseev',
  'Sergei Nikolenko', 'Nursultan Nanrynbaev', 'Rustem Turtaev', 'Nikita Rokotyan', 'Sviatoslav Kovalev', 'Alexei Rozanov', 'Veniamin Nelin',
  'Sergei Ermilov', 'Lidia Shishina', 'Dariya Mamayeva', 'Antonina Korolkova', 'Kirill Khoruzhii', 'Alexey Romanov']

const scenes: Record<string, Scene> = {
  // Авторы: 34 человека; двое с равным вкладом, Антюфеев — позже доказал нижнюю границу
  authors: {
    ru: `Авторы в порядке статьи: ${AUTHORS.join(', ')}`, en: `Authors in paper order: ${AUTHORS.join(', ')}`,
    viewBox: [0, 0, 660, 320], legend: false,
    draw: (c, l) => {
      AUTHORS.forEach((name, k) => {
        const x = 70 + (k % 5) * 130, y = 22 + Math.floor(k / 5) * 37
        const first = name.split(' ')[0], last = name.split(' ').slice(1).join(' ')
        const hl = k < 2 || last === 'Antiufeev'
        c.dot(x - 50, y + 4, 6, hl ? A : M)
        c.text(x - 40, y, first, M, { size: 10.5, anchor: 'start' })
        c.text(x - 40, y + 13, last, hl ? A : 'currentColor', { size: 12, w: 700, anchor: 'start' })
      })
      c.text(330, 290, l('34 автора · CayleyPy · arXiv, 25 февраля 2025 · журнал ATMP, 2026', '34 authors · CayleyPy · arXiv, 25 February 2025 · ATMP journal, 2026'), 'currentColor', { size: 13, w: 700 })
      c.text(330, 310, l('синим — равный вклад (первые двое) и автор доказательства 2026 года', 'blue — equal contribution (first two) and the author of the 2026 proof'), M, { size: 11.5 })
    },
  },
  // Компас — нейросеть: расстановка на входе, оценка этажа на выходе
  net: {
    ru: 'Компас — нейросеть: на входе расстановка шариков, внутри простая сеть (часто хватает одного слоя на 128 нейронов), на выходе — оценка, сколько ходов до порядка', en: 'The compass is a neural network: an arrangement of balls goes in, a simple network inside (one layer of 128 neurons is often enough), an estimate of moves to order comes out',
    viewBox: [0, 0, 660, 220], legend: false,
    draw: (c, l) => {
      ring(c, 90, 92, 52, [3, 5, 1, 4, 2], { r: 13 })
      c.text(90, 182, l('вход', 'input'), A, { size: 13, w: 700 }); c.text(90, 200, l('расстановка', 'arrangement'), M, { size: 12 })
      c.thenArrow(165, 215, 92, M)
      for (let k = 0; k < 12; k++) { const y = 26 + k * 12; c.line([[250, 50 + (k % 5) * 21], [300, y]], A, { w: 1, op: 0.3 }); c.line([[300, y], [360, 92]], A, { w: 1, op: 0.3 }) }
      for (let k = 0; k < 5; k++) c.dot(250, 50 + k * 21, 4.5, A, { op: 0.6 })
      for (let k = 0; k < 12; k++) c.dot(300, 26 + k * 12, 4.5, A)
      c.dot(360, 92, 7, A)
      c.text(305, 182, l('нейросеть', 'neural network'), A, { size: 13, w: 700 }); c.text(305, 200, l('часто хватает 1 слоя · 128 нейронов', 'often 1 layer · 128 neurons'), M, { size: 12 })
      c.thenArrow(420, 470, 92, M)
      c.text(555, 104, '≈ 7', A, { size: 34, w: 700 })
      c.text(555, 182, l('выход', 'output'), A, { size: 13, w: 700 }); c.text(555, 200, l('этаж: ходов до порядка', 'floor: moves to order'), M, { size: 12 })
    },
  },
  // Три хода на кольце из шести шариков
  moves: {
    ru: 'Кольцо из шести шариков с номерами; ходы: повернуть кольцо влево, вправо или поменять два шарика в окошке наверху', en: 'A ring of six numbered balls; moves: turn the ring left, turn it right, or swap the two balls in the window at the top',
    viewBox: [0, 0, 660, 276], legend: false,
    draw: (c, l) => {
      c.text(330, 266, l('рамка — окошко: менять местами можно только два шарика в нём · цвет шарика = его номер', 'frame — the window: only the two balls in it can be swapped · ball color = its number'), M, { size: 12 })
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
      c.text(470, 196, l('ширина полосы —', 'bar width —'), M, { size: 12, anchor: 'start' })
      c.text(470, 212, l('сколько расстановок', 'arrangements'), M, { size: 12, anchor: 'start' })
      c.text(470, 228, l('на этаже', 'on the floor'), M, { size: 12, anchor: 'start' })
    },
  },
  // Зеркало и задом наперёд
  mirror: {
    ru: 'Зеркало — кольцо, отражённое через окошко: у шести шариков оно на 15-м этаже, на потолке; задом наперёд — на 13-м', en: 'The mirror is the ring reflected through the window: for six balls it sits on floor 15, the ceiling; the reversed order sits on floor 13',
    viewBox: [0, 0, 660, 290], legend: false,
    draw: (c, l) => {
      c.text(330, 280, l('пунктир — ось через окошко: шарики меняются местами парами напротив оси', 'dashed line — the axis through the window: balls swap in pairs across it'), M, { size: 12 })
      ring(c, 110, 125, 66, [1, 2, 3, 4, 5, 6], { r: 15 })
      c.text(110, 238, l('порядок', 'in order'), M, { size: 14, w: 700 })
      c.thenArrow(195, 245, 125, M)
      ring(c, 330, 125, 66, MIRROR(6), { r: 15 })
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
    viewBox: [0, 0, 660, 264], legend: false,
    draw: (c, l) => {
      const draw = (cx: number, n: number) => {
        const pts = range(0, n - 1).map((k) => slot(cx, 120, 72, n, k))
        for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) c.line([pts[i], pts[j]], A, { w: 1.8, op: 0.75 })
        pts.forEach(([x, y], k) => c.ball(x, y, 12, BALL[k % BALL.length]))
      }
      draw(150, 5); draw(420, 6)
      c.text(150, 226, l('5 шариков: 10 пар = потолок 10', '5 balls: 10 pairs = ceiling 10'), 'currentColor', { size: 14, w: 700 })
      c.text(420, 226, l('6 шариков: 15 пар = потолок 15', '6 balls: 15 pairs = ceiling 15'), 'currentColor', { size: 14, w: 700 })
      c.text(600, 120, 'n·(n−1)/2', A, { size: 16, w: 700 })
      c.text(330, 252, l('каждая линия — одна пара шариков; пар столько же, сколько ходов до потолка', 'each line is one pair of balls; there are as many pairs as moves to the ceiling'), M, { size: 12 })
    },
  },
  // Классическая программа: 217 944 хода против 190 пар
  gap: {
    ru: 'Кольцо из 20 шариков: классическая программа нашла путь в 217 944 хода за 41 минуту, а пар всего 190 — в 1147 раз меньше', en: 'A 20-ball ring: the classic program found a 217,944-move path in 41 minutes, while there are only 190 pairs — 1,147 times fewer',
    viewBox: [0, 0, 660, 205], legend: false,
    draw: (c, l) => {
      const x0 = 210
      c.text(x0 - 14, 62, l('пар', 'pairs'), 'currentColor', { size: 14, w: 700, anchor: 'end' })
      c.rect(x0, 46, 4, 24, { rx: 2, fill: A })
      c.text(x0 + 14, 63, '190', A, { size: 15, w: 700, anchor: 'start' })
      c.text(x0 - 14, 122, l('классическая программа', 'classic program'), 'currentColor', { size: 14, w: 700, anchor: 'end' })
      c.rect(x0, 106, 400, 24, { rx: 5, fill: W, fillOp: 0.6 })
      c.line([[x0 + 300, 100], [x0 + 312, 136]], 'var(--surface)', { w: 5 }); c.line([[x0 + 310, 100], [x0 + 322, 136]], 'var(--surface)', { w: 5 })
      c.text(x0 + 395, 123, l('217 944', '217,944'), '#fff', { size: 15, w: 700, anchor: 'end' })
      c.text(330, 196, l('по гипотезе короче числа пар не бывает — программа даёт путь в тысячу раз длиннее', 'by the conjecture nothing beats the pairs — the program gives a path a thousand times longer'), 'currentColor', { size: 13, w: 700 })
      c.text(330, 168, l('41 минута · в 1147 раз длиннее · столбик с разрывом, не в масштабе', '41 minutes · 1,147 times longer · bar broken, not to scale'), M, { size: 13 })
    },
  },
  // Прогулка: шаг прогулки против настоящего этажа
  walk: {
    ru: 'Прогулка из 12 случайных ходов от порядка на кольце из пяти шариков: шаг растёт до 12, а настоящий этаж к концу — 6', en: 'A walk of 12 random moves from order on a five-ball ring: the step count grows to 12, while the true floor at the end is 6',
    viewBox: [0, 0, 660, 300], legend: false,
    draw: (c, l) => {
      c.text(330, 292, l('серая — сколько шагов сделала прогулка, синяя — настоящий этаж: прогулка завышает', 'grey — steps the walk made, blue — the true floor: the walk overestimates'), M, { size: 12 })
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
    viewBox: [0, 0, 660, 210], legend: false,
    draw: (c, l) => {
      c.text(330, 202, l('под числом — сколько шариков; синие — найден путь ровно в число пар, серые — путь длиннее', 'number — balls; blue — path of exactly the pairs, grey — a longer path'), M, { size: 12 })
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
    viewBox: [0, 0, 660, 192], legend: false,
    draw: (c, l) => {
      const ns = [2, 5, 10, 20, 40, 80, 120, 160, 200]
      ns.forEach((n, j) => {
        const x = 50 + j * 70, R = 8 + Math.sqrt(n) * 1.6
        c.dot(x, 60, R, M, { ring: 2.2 })
        c.text(x, 60 + R + 16, String(n), M, { size: 12, w: 700 })
        c.badge(x, 60 + R + 36, A, '', { r: 8, mark: 'check' })
      })
      c.text(330, 182, l('размер кольца растёт с числом шариков · галочка — дошли ровно до числа пар', 'ring size grows with the number of balls · check — reached exactly the pairs'), M, { size: 12 })
      c.text(330, 162, l('короче числа пар — 0 решений', 'shorter than the pairs — 0 solutions'), 'currentColor', { size: 14, w: 700 })
    },
  },
  // Тройки: поворот не переворачивает, обмен — переворачивает
  triples: {
    ru: 'Тройка шариков 1, 2, 4 идёт по часовой; поворот кольца это не меняет, обмен в окошке переворачивает её против часовой', en: 'The triple 1, 2, 4 runs clockwise; turning the ring keeps that, a swap in the window flips it counterclockwise',
    viewBox: [0, 0, 660, 280], legend: false,
    draw: (c, l) => {
      c.text(330, 270, l('обведены шарики 1, 2, 4 · линия — их тройка · стрелка — направление обхода', 'balls 1, 2, 4 are circled · the line is their triple · the arrow is the direction'), M, { size: 12 })
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
