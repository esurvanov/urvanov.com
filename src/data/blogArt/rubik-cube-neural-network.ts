// Схемы поста «Нейросеть собирает кубик Рубика»: кубик, лабиринт позиций, компас, фронт, отряд, результаты.
// Кубик — настоящая модель из наклеек: повороты слоёв считаются, а не рисуются руками, цвета наклеек — данные (как серии графика).
// Лабиринт — одна схема 8×5 на все сцены; пути фронта и отряда считает тот же лучевой поиск, что в статье,
// с компасом, который ошибается на −1…+2 хода в каждой комнате
import { type Canvas, type L, type Scene, A, M, W } from '@/lib/infographic'

const f1 = (n: number) => n.toFixed(1)
const ru = (n: number, one: string, few: string, many: string) => {
  const a = n % 10, b = n % 100
  return a === 1 && b !== 11 ? one : a >= 2 && a <= 4 && (b < 12 || b > 14) ? few : many
}
const movesRu = (n: number) => `${n} ${ru(n, 'ход', 'хода', 'ходов')}`
const movesEn = (n: number) => `${n} move${n === 1 ? '' : 's'}`
const lcg = (seed: number) => { let s = seed; return () => ((s = (s * 9301 + 49297) % 233280) / 233280) }

// ---------- кубик из наклеек ----------
type V3 = [number, number, number]
interface Sticker { p: V3; n: V3; col: string }
type Cube = { N: number; st: Sticker[] }
// Цвета граней по нормали: верх белый, перед зелёный, право красное (видимые); низ, зад, лево — жёлтый, синий, оранжевый
const FACE_COL: Record<string, string> = { '0,0,1': 'var(--pn-i)', '0,0,-1': 'var(--py-i)', '0,1,0': 'var(--pg-i)', '0,-1,0': 'var(--pc-i)', '1,0,0': 'var(--pr-i)', '-1,0,0': 'var(--warn)' }
/** Собранный кубик N×N×N; координаты деталей — удвоенные, от −(N−1) до N−1 с шагом 2 */
function solved(N = 3): Cube {
  const st: Sticker[] = [], k = N - 1
  for (let x = -k; x <= k; x += 2) for (let y = -k; y <= k; y += 2) for (let z = -k; z <= k; z += 2) {
    const p: V3 = [x, y, z]
    for (let a = 0; a < 3; a++) if (Math.abs(p[a]) === k) { const n: V3 = [0, 0, 0]; n[a] = Math.sign(p[a]); st.push({ p, n, col: FACE_COL[n.join(',')] }) }
  }
  return { N, st }
}
/** Поворот на 90° вокруг оси a (0 — x, 1 — y, 2 — z), dir = ±1 */
function rot(v: V3, a: number, dir: number): V3 {
  const [i, j] = [[1, 2], [2, 0], [0, 1]][a], r: V3 = [...v] as V3
  r[i] = -dir * v[j]; r[j] = dir * v[i]
  return r
}
/** Повернуть внешний слой: ось a, сторона side = ±1 (какая грань), dir = 1 — по часовой, если смотреть на эту грань */
function turn(c: Cube, a: number, side: number, dir: number): Cube {
  const k = c.N - 1, d = -dir * side
  return { N: c.N, st: c.st.map((s) => (s.p[a] === side * k ? { p: rot(s.p, a, d), n: rot(s.n, a, d), col: s.col } : s)) }
}
const FACES: [number, number, string, string][] = [[2, 1, 'верх', 'top'], [2, -1, 'низ', 'bottom'], [1, 1, 'перед', 'front'], [1, -1, 'зад', 'back'], [0, 1, 'право', 'right'], [0, -1, 'лево', 'left']]
function scramble(c: Cube, n: number, seed: number): Cube {
  const r = lcg(seed)
  for (let i = 0; i < n; i++) { const [a, side] = FACES[Math.floor(r() * 6)]; c = turn(c, a, side, r() < 0.5 ? 1 : -1) }
  return c
}
const kind = (c: Cube, s: Sticker) => s.p.filter((v) => Math.abs(v) === c.N - 1).length // 3 — уголок, 2 — ребро, 1 — центр
/** Нарисовать кубик: (ox, oy) — верхняя точка, U — клетка; видны верх, перед (слева) и право */
function drawCube(c: Canvas, cube: Cube, ox: number, oy: number, U: number, o: { keep?: (s: Sticker) => boolean } = {}) {
  const N = cube.N, k = N - 1
  oy += N * U // верхняя точка кубика — угол (0, 0, N)
  const P = (gx: number, gy: number, gz: number) => `${f1(ox + (gx - gy) * 0.866 * U)},${f1(oy + (gx + gy) * 0.5 * U - gz * U)}`
  const quad = (pts: string[], fill: string, extra = '') => c.raw(`<polygon points="${pts.join(' ')}" fill="${fill}"${extra}/>`)
  const body = ' stroke="var(--line-2)" stroke-width="1" stroke-linejoin="round"'
  quad([P(0, 0, N), P(N, 0, N), P(N, N, N), P(0, N, N)], 'var(--surface-2)', body)
  quad([P(0, N, 0), P(N, N, 0), P(N, N, N), P(0, N, N)], 'var(--surface-2)', body)
  quad([P(N, 0, 0), P(N, N, 0), P(N, N, N), P(N, 0, N)], 'var(--surface-2)', body)
  const g = 0.09
  for (const s of cube.st) {
    const i = (v: number) => (v + k) / 2 // номер клетки 0…N−1
    const op = o.keep && !o.keep(s) ? 0.12 : 1
    let pts: string[] | null = null, shade = 0
    if (s.n[2] === 1) { const x = i(s.p[0]), y = i(s.p[1]); pts = [P(x + g, y + g, N), P(x + 1 - g, y + g, N), P(x + 1 - g, y + 1 - g, N), P(x + g, y + 1 - g, N)] }
    if (s.n[1] === 1) { const x = i(s.p[0]), z = i(s.p[2]); pts = [P(x + g, N, z + g), P(x + 1 - g, N, z + g), P(x + 1 - g, N, z + 1 - g), P(x + g, N, z + 1 - g)]; shade = 0.12 }
    if (s.n[0] === 1) { const y = i(s.p[1]), z = i(s.p[2]); pts = [P(N, y + g, z + g), P(N, y + 1 - g, z + g), P(N, y + 1 - g, z + 1 - g), P(N, y + g, z + 1 - g)]; shade = 0.26 }
    if (!pts) continue
    quad(pts, s.col, ` opacity="${op}"`)
    if (shade) quad(pts, '#000', ` opacity="${f1(shade * op)}"`)
  }
}
/** Размер кубика на картинке: половина ширины и полная высота */
const cubeBox = (N: number, U: number) => ({ hw: N * 0.866 * U, h: 2 * N * U })

// ---------- лабиринт ----------
const COLS = 8, ROWS = 5
type N2 = [number, number]
const EXIT: N2 = [0, 2], START: N2 = [7, 2]
const key = ([c, r]: N2) => `${c},${r}`
// Стены подобраны так, что одиночный путь по компасу упирается в тупик, а фронт шириной 3 находит кратчайший путь
const WALL_DEF = ['0,0|1,0', '0,2|0,3', '1,1|1,2', '1,2|1,3', '1,3|1,4', '1,4|2,4', '2,1|3,1', '2,3|3,3', '3,2|4,2', '4,1|5,1', '4,3|5,3', '4,4|5,4', '5,0|5,1', '5,2|5,3', '5,3|6,3', '6,4|7,4', '7,0|7,1']
const WALL_LIST = WALL_DEF.map((w) => w.split('|').map((q) => q.split(',').map(Number) as N2))
const WALLS = new Set(WALL_DEF.flatMap((w) => [w, w.split('|').reverse().join('|')]))
function nbrs([c, r]: N2): N2[] {
  return ([[c - 1, r], [c + 1, r], [c, r - 1], [c, r + 1]] as N2[]).filter(([x, y]) => x >= 0 && y >= 0 && x < COLS && y < ROWS && !WALLS.has(`${key([c, r])}|${key([x, y])}`))
}
const NODES: N2[] = Array.from({ length: COLS * ROWS }, (_, i) => [i % COLS, Math.floor(i / COLS)] as N2)
// Настоящее расстояние до выхода (обход в ширину)
const DIST = new Map<string, number>([[key(EXIT), 0]])
for (const q = [EXIT]; q.length;) { const n = q.shift()!; for (const m of nbrs(n)) if (!DIST.has(key(m))) { DIST.set(key(m), DIST.get(key(n))! + 1); q.push(m) } }
const dist = (n: N2) => DIST.get(key(n))!
function shortest(from: N2): N2[] {
  const p = [from]
  while (dist(p[p.length - 1]) > 0) p.push(nbrs(p[p.length - 1]).find((m) => dist(m) === dist(p[p.length - 1]) - 1)!)
  return p
}
// Компас: настоящее расстояние плюс ошибка −1…+2 в каждой комнате, у каждого компаса свои ошибки (зерно)
function compass(seed: number) {
  const r = lcg(seed), E = new Map<string, number>()
  for (let c = 0; c < COLS; c++) for (let rr = 0; rr < ROWS; rr++) E.set(key([c, rr]), Math.floor(r() * 4) - 1)
  return (n: N2) => dist(n) + E.get(key(n))!
}
type Beam = { path: N2[]; seen: N2[]; steps: Map<string, number>; found: boolean }
/** Лучевой поиск шириной w: путь до выхода (или до тупика), все комнаты, где побывал фронт, и шаг, на котором они были во фронте */
function beam(w: number, est: (n: N2) => number): Beam {
  const parent = new Map<string, N2 | null>([[key(START), null]]), steps = new Map<string, number>([[key(START), 0]])
  const back = (n: N2) => { const p: N2[] = [n]; for (let x = parent.get(key(n)); x; x = parent.get(key(x))) p.unshift(x); return p }
  const seen = () => [...parent.keys()].map((k) => k.split(',').map(Number) as N2)
  let front: N2[] = [START]
  for (let step = 1; front.length; step++) {
    const cand: N2[] = []
    for (const n of front) for (const m of nbrs(n)) if (!parent.has(key(m))) { parent.set(key(m), n); cand.push(m) }
    if (cand.some((m) => key(m) === key(EXIT))) { steps.set(key(EXIT), step); return { path: back(EXIT), seen: seen(), steps, found: true } }
    if (!cand.length) return { path: back(front[0]), seen: seen(), steps, found: false }
    front = cand.sort((a, b) => est(a) - est(b) || key(a).localeCompare(key(b))).slice(0, w)
    for (const n of front) steps.set(key(n), step)
  }
  return { path: [START], seen: [START], steps, found: false }
}
const MAIN = compass(20)
const B1 = beam(1, MAIN), B2 = beam(2, MAIN), B3 = beam(3, MAIN)
const SQUAD = [19, 3, 2].map((s) => beam(1, compass(s)))
const SHORT = dist(START)
const moves = (p: N2[]) => p.length - 1
// Прогулка от выхода: случайные ходы без шага назад
function walk(seed: number, n: number): N2[] {
  const r = lcg(seed), p: N2[] = [EXIT]
  while (p.length <= n) { const prev = p[p.length - 2], opts = nbrs(p[p.length - 1]).filter((m) => !prev || key(m) !== key(prev)); p.push(opts[Math.floor(r() * opts.length)]) }
  return p
}
// Для сцены «компас завышает»: прогулка в 8 ходов, которая заканчивается близко к выходу
const LOOP = (() => { for (let s = 1; s < 500; s++) { const w = walk(s, 8); if (dist(w[8]) <= 2) return w } return walk(1, 8) })()

/** Лабиринт классикой: клетки-комнаты, стены — толстые линии; возвращает центр комнаты */
function maze(c: Canvas, x: number, y: number, s: number, o: { fill?: (n: N2) => [string, number] | null; label?: (n: N2) => [string, string] | null; icons?: boolean; lab?: L } = {}) {
  const P = ([cc, r]: N2): [number, number] => [x + cc * s + s / 2, y + r * s + s / 2]
  for (const n of NODES) {
    const fc = o.fill?.(n)
    c.rect(x + n[0] * s + 1.5, y + n[1] * s + 1.5, s - 3, s - 3, { rx: Math.min(6, s / 8), fill: fc ? fc[0] : M, fillOp: fc ? fc[1] : 0.1 })
  }
  for (const [a, b] of WALL_LIST) {
    if (a[1] === b[1]) { const wx = x + Math.max(a[0], b[0]) * s; c.line([[wx, y + a[1] * s], [wx, y + (a[1] + 1) * s]], 'currentColor', { w: 4 }) }
    else { const wy = y + Math.max(a[1], b[1]) * s; c.line([[x + a[0] * s, wy], [x + (a[0] + 1) * s, wy]], 'currentColor', { w: 4 }) }
  }
  c.rect(x, y, COLS * s, ROWS * s, { rx: 2, fill: 'none', stroke: 'currentColor', sw: 4 })
  if (o.label) for (const n of NODES) { const t = o.label(n); if (t) { const [px, py] = P(n); c.text(px, py + 5, t[0], t[1], { size: Math.max(11, Math.round(s * 0.3)), w: 700 }) } }
  if (o.icons !== false) {
    const U = s / 9.5, { h } = cubeBox(3, U)
    const [ex, ey] = P(EXIT), [sx, sy] = P(START)
    drawCube(c, solved(), ex, ey - h / 2, U)
    drawCube(c, scramble(solved(), 20, 7), sx, sy - h / 2, U)
  }
  if (o.lab) {
    const [, ey] = P(EXIT), [, sy] = P(START)
    c.text(x - 12, ey - 4, o.lab('выход', 'exit'), 'currentColor', { size: 14, w: 700, anchor: 'end' })
    c.text(x - 12, ey + 14, o.lab('собранный', 'solved'), M, { size: 12, anchor: 'end' })
    c.text(x - 12, ey + 29, o.lab('кубик', 'cube'), M, { size: 12, anchor: 'end' })
    c.text(x + COLS * s + 12, sy - 4, o.lab('старт', 'start'), 'currentColor', { size: 14, w: 700, anchor: 'start' })
    c.text(x + COLS * s + 12, sy + 14, o.lab('ваш', 'your'), M, { size: 12, anchor: 'start' })
    c.text(x + COLS * s + 12, sy + 29, o.lab('кубик', 'cube'), M, { size: 12, anchor: 'start' })
  }
  return P
}
const route = (c: Canvas, P: (n: N2) => [number, number], p: N2[], col: string, o: { w?: number; dash?: string; op?: number } = {}) => c.line(p.map(P), col, { w: o.w ?? 5, dash: o.dash, op: o.op })

const scenes: Record<string, Scene> = {
  // Ход и позиция: собранный кубик, один поворот, перемешанный
  turn: {
    ru: 'Собранный кубик Рубика; после одного хода — поворота верхней грани на четверть оборота; после 20 случайных ходов', en: 'A solved Rubik’s Cube; after one move — a quarter turn of the top face; after 20 random moves',
    viewBox: [0, 0, 640, 260], legend: false,
    draw: (c, l) => {
      const U = 19, { h } = cubeBox(3, U), oy = 34
      const s0 = solved(), s1 = turn(s0, 2, 1, 1), s2 = scramble(s0, 20, 7)
      drawCube(c, s0, 110, oy, U); drawCube(c, s1, 320, oy, U); drawCube(c, s2, 530, oy, U)
      c.curve(282, 40, 358, 40, A, { c1: [300, 8], c2: [340, 8], w: 3 })
      c.arrow(352, 34, 358, 40, A, { w: 3 })
      c.thenArrow(186, 244, oy + h / 2, M); c.thenArrow(396, 454, oy + h / 2, M)
      c.text(215, oy + h / 2 - 12, l('1 ход', '1 move'), A, { size: 13, w: 700 })
      c.text(425, oy + h / 2 - 12, l('ещё 19', '19 more'), M, { size: 13, w: 700 })
      const y = oy + h + 34
      c.text(110, y, l('собран', 'solved'), 'currentColor', { size: 15, w: 700 }); c.text(110, y + 20, l('цель любой сборки', 'the goal of any solve'), M, { size: 12 })
      c.text(320, y, l('верхняя грань ↻ на ¼', 'top face ↻ by ¼'), 'currentColor', { size: 15, w: 700 }); c.text(320, y + 20, l('ход = поворот одной грани', 'move = turning one face'), M, { size: 12 })
      c.text(530, y, l('перемешан', 'scrambled'), 'currentColor', { size: 15, w: 700 }); c.text(530, y + 20, l('позиция = раскраска граней', 'position = how faces are colored'), M, { size: 12 })
    },
  },
  // Откуда 43 квинтиллиона: 8 уголков и 12 рёбер
  pieces: {
    ru: 'Уголков 8, у каждого 3 цвета: 8!·3⁷ ≈ 88 млн вариантов. Рёбер 12, у каждого 2 цвета: 12!·2¹¹ ≈ 981 млрд. Половина сочетаний недостижима: всего 43 252 003 274 489 856 000', en: '8 corners with 3 colors each: 8!·3⁷ ≈ 88 million options. 12 edges with 2 colors each: 12!·2¹¹ ≈ 981 billion. Half the combinations are unreachable: 43,252,003,274,489,856,000 in total',
    viewBox: [0, 0, 640, 370], legend: false,
    draw: (c, l) => {
      const U = 24, s = scramble(solved(), 20, 7)
      drawCube(c, s, 165, 20, U, { keep: (q) => kind(s, q) === 3 })
      drawCube(c, s, 475, 20, U, { keep: (q) => kind(s, q) === 2 })
      c.text(320, 112, '×', M, { size: 34, w: 700 })
      const col = (x: number, t: string, a: string, b: string, fm: string) => {
        c.text(x, 210, t, 'currentColor', { size: 17, w: 700 })
        c.text(x, 232, a, M, { size: 13 }); c.text(x, 250, b, M, { size: 13 })
        c.text(x, 280, fm, 'currentColor', { size: 17, w: 700 })
      }
      col(165, l('8 уголков', '8 corners'), l('у каждого 3 цвета', '3 colors each'), l('8! мест × 3⁷ поворотов', '8! places × 3⁷ twists'), l('≈ 88 млн', '≈ 88 million'))
      col(475, l('12 рёбер', '12 edges'), l('у каждого 2 цвета', '2 colors each'), l('12! мест × 2¹¹ переворотов', '12! places × 2¹¹ flips'), l('≈ 981 млрд', '≈ 981 billion'))
      c.line([[40, 304], [600, 304]], M, { w: 1, op: 0.35 })
      c.text(320, 332, l('88 млн × 981 млрд ÷ 2 = 43 252 003 274 489 856 000', '88 M × 981 B ÷ 2 = 43,252,003,274,489,856,000'), 'currentColor', { size: 16, w: 700 })
      c.text(320, 354, l('÷ 2: половину раскрасок на настоящем кубике не собрать · центры граней не двигаются', '÷ 2: half the colorings can’t occur on a real cube · face centers never move'), M, { size: 12 })
    },
  },
  // Полный перебор: миллиард позиций в секунду, 2025 → 3395
  years: {
    ru: 'Перебор всех позиций обычного кубика со скоростью миллиард в секунду: с 2025 до 3395 года, около 1370 лет', en: 'Checking every position of a regular cube at a billion per second: from 2025 to 3395, about 1,370 years',
    viewBox: [0, 0, 640, 150], legend: false,
    draw: (c, l) => {
      const x0 = 50, x1 = 590, X = (yr: number) => x0 + ((yr - 2025) / 1370) * (x1 - x0)
      c.rect(x0, 62, x1 - x0, 16, { rx: 8, fill: M, fillOp: 0.15 })
      c.rect(x0, 62, X(2026) - x0 + 4, 16, { rx: 8, fill: A })
      for (const yr of [2025, 2500, 3000, 3395]) { c.line([[X(yr), 84], [X(yr), 92]], M, { w: 1.5 }); c.text(X(yr), 110, String(yr), yr === 3395 ? 'currentColor' : M, { size: 14, w: yr === 3395 ? 700 : 500 }) }
      c.flag(X(3395) - 4, 36, M)
      c.text(x0, 44, l('старт · 1 млрд позиций в секунду', 'start · 1 billion positions per second'), A, { size: 13, w: 700, anchor: 'start' })
      c.text(320, 140, l('≈ 1370 лет на один кубик 3×3×3', '≈ 1,370 years for one 3×3×3 cube'), 'currentColor', { size: 15, w: 700 })
    },
  },
  // Сколько позиций у кубиков: длина полосы — число цифр, атомы Земли — пунктир
  sizes: {
    ru: 'Позиций: 3×3×3 — 4,3·10¹⁹, 4×4×4 — 7,4·10⁴⁵, 5×5×5 — 2,8·10⁷⁴; атомов на Земле около 10⁵⁰', en: 'Positions: 3×3×3 — 4.3·10¹⁹, 4×4×4 — 7.4·10⁴⁵, 5×5×5 — 2.8·10⁷⁴; atoms on Earth are about 10⁵⁰',
    viewBox: [0, 0, 640, 210], legend: false,
    draw: (c, l) => {
      const x0 = 110, k = 6.2
      const rows: [string, number, string][] = [['3×3×3', 19, '4,3·10¹⁹'], ['4×4×4', 45, '7,4·10⁴⁵'], ['5×5×5', 74, '2,8·10⁷⁴']]
      rows.forEach(([n, e, v], j) => {
        const y = 30 + j * 50
        c.text(x0 - 14, y + 17, n, 'currentColor', { size: 15, w: 700, anchor: 'end' })
        c.rect(x0, y, e * k, 24, { rx: 5, fill: M, fillOp: j === 2 ? 0.9 : 0.5 })
        c.text(x0 + e * k - 10, y + 17, l(v, v.replace(',', '.')), j === 2 ? 'var(--surface)' : 'currentColor', { size: 14, w: 700, anchor: 'end' })
      })
      const xa = x0 + 50 * k
      c.line([[xa, 18], [xa, 172]], W, { w: 2, dash: '5 4' })
      c.text(xa, 194, l('атомов на Земле ≈ 10⁵⁰', 'atoms on Earth ≈ 10⁵⁰'), W, { size: 13, w: 700 })
      c.text(x0, 194, l('длина полосы — число цифр', 'bar length = number of digits'), M, { size: 12, anchor: 'start' })
    },
  },
  // Соревнование и результат: тысяча команд, средняя длина решения
  race: {
    ru: 'Kaggle Santa 2023: больше 1000 команд. Средняя длина решения: 4×4×4 — лучшие команды 53,5 хода, CayleyPy 46,5; 5×5×5 — 96,6 и 92,2', en: 'Kaggle Santa 2023: over 1,000 teams. Average solution length: 4×4×4 — best teams 53.5 moves, CayleyPy 46.5; 5×5×5 — 96.6 and 92.2',
    viewBox: [0, 0, 640, 280], legend: false,
    draw: (c, l) => {
      c.text(110, 26, 'Kaggle Santa 2023', 'currentColor', { size: 15, w: 700 })
      for (let k = 0; k < 100; k++) c.dot(38 + (k % 10) * 16, 50 + Math.floor(k / 10) * 16, 5, M, { op: 0.75 })
      c.text(110, 226, l('1000+ команд', '1,000+ teams'), 'currentColor', { size: 15, w: 700 })
      c.text(110, 246, l('1 точка ≈ 10 команд', '1 dot ≈ 10 teams'), M, { size: 12 })
      c.text(110, 264, l('счёт — сумма ходов', 'score = total moves'), M, { size: 12 })
      const x0 = 270, x1 = 600
      c.text(x0, 26, l('средняя длина решения, ходов', 'average solution length, moves'), 'currentColor', { size: 15, w: 700, anchor: 'start' })
      const rows: [string, number, number][] = [['4×4×4', 53.49, 46.51], ['5×5×5', 96.58, 92.16]]
      const n1 = (v: number) => l(v.toFixed(1).replace('.', ','), v.toFixed(1))
      rows.forEach(([n, best, ours], j) => {
        const y = 56 + j * 100, max = j === 0 ? 60 : 100, X = (v: number) => (v / max) * (x1 - x0)
        c.text(x0, y, n, 'currentColor', { size: 14, w: 700, anchor: 'start' })
        c.rect(x0, y + 10, X(best), 22, { rx: 4, fill: M, fillOp: 0.45 })
        c.text(x0 + 8, y + 26, l(`лучшие команды · ${n1(best)}`, `best teams · ${n1(best)}`), 'currentColor', { size: 13, w: 700, anchor: 'start' })
        c.rect(x0, y + 38, X(ours), 22, { rx: 4, fill: A })
        c.text(x0 + 8, y + 54, `CayleyPy · ${n1(ours)}`, 'var(--surface)', { size: 13, w: 700, anchor: 'start' })
        c.text(x0 + X(ours) + 8, y + 54, `−${n1(best - ours)}`, A, { size: 13, w: 700, anchor: 'start' })
      })
      c.text(x0, 264, l('короче — лучше · кубики 4×4×4: 43 задачи, 5×5×5: 19', 'shorter is better · 4×4×4: 43 tasks, 5×5×5: 19'), M, { size: 12, anchor: 'start' })
    },
  },
  // 12 авторов статьи
  authors: {
    ru: 'Авторы статьи: Александр Червов, Кирилл Хоружий, Никита Бухал, Джалал Нагиев, Владислав Замковой, Иван Кольцов, Людмила Челдиева, Арсений Сычев, Арсений Ленин, Марк Обозов, Егор Урванов, Алексей Романов', en: 'Paper authors: Alexander Chervov, Kirill Khoruzhii, Nikita Bukhal, Jalal Naghiyev, Vladislav Zamkovoy, Ivan Koltsov, Lyudmila Cheldieva, Arsenii Sychev, Arsenii Lenin, Mark Obozov, Egor Urvanov, Alexey Romanov',
    viewBox: [0, 0, 640, 268], legend: false,
    draw: (c, l) => {
      const names: [string, string, string, string][] = [['Александр', 'Червов', 'Alexander', 'Chervov'], ['Кирилл', 'Хоружий', 'Kirill', 'Khoruzhii'], ['Никита', 'Бухал', 'Nikita', 'Bukhal'], ['Джалал', 'Нагиев', 'Jalal', 'Naghiyev'], ['Владислав', 'Замковой', 'Vladislav', 'Zamkovoy'], ['Иван', 'Кольцов', 'Ivan', 'Koltsov'], ['Людмила', 'Челдиева', 'Lyudmila', 'Cheldieva'], ['Арсений', 'Сычев', 'Arsenii', 'Sychev'], ['Арсений', 'Ленин', 'Arsenii', 'Lenin'], ['Марк', 'Обозов', 'Mark', 'Obozov'], ['Егор', 'Урванов', 'Egor', 'Urvanov'], ['Алексей', 'Романов', 'Alexey', 'Romanov']]
      names.forEach(([fr, lr, fe, le], k) => {
        const x = 58 + (k % 6) * 105, y = 20 + Math.floor(k / 6) * 108, me = k === 10
        c.dot(x, y + 10, 9, M); c.rect(x - 11, y + 22, 22, 26, { rx: 10, fill: M })
        c.text(x, y + 68, l(fr, fe), me ? 'currentColor' : M, { size: 12, w: me ? 700 : 500 })
        c.text(x, y + 84, l(lr, le), me ? 'currentColor' : M, { size: 13, w: 700 })
        if (me) c.text(x, y + 100, l('автор этого блога', 'author of this blog'), A, { size: 11, w: 700 })
      })
      c.text(320, 258, l('12 авторов · CayleyPy · Москва, Париж, Мюнхен · arXiv, 18 февраля 2025', '12 authors · CayleyPy · Moscow, Paris, Munich · arXiv, 18 February 2025'), 'currentColor', { size: 13, w: 700 })
    },
  },
  // Комната и дверь: поворот грани переводит кубик в соседнюю комнату
  rooms: {
    ru: 'Комната — одна раскраска кубика. Дверь — поворот грани: правая грань повернулась, и кубик оказался в соседней комнате', en: 'A room is one coloring of the cube. A door is a face turn: the right face turned and the cube is in the neighboring room',
    viewBox: [0, 0, 640, 290], legend: false,
    draw: (c, l) => {
      const room = (ox: number) => { const i = c.iso(ox, 175, 22); i.tile(-2.4, -2.4, 4.8, 4.8) }
      room(150); room(490)
      const s0 = scramble(solved(), 20, 11), s1 = turn(s0, 0, 1, 1), U = 18, { h } = cubeBox(3, U)
      drawCube(c, s0, 150, 175 - h + 10, U); drawCube(c, s1, 490, 175 - h + 10, U)
      c.rect(298, 100, 44, 70, { rx: 6, fill: M, fillOp: 0.12, stroke: 'currentColor', sw: 2.5 })
      c.dot(332, 137, 3.5, 'currentColor')
      c.arrow(250, 135, 290, 135, A, { w: 3 }); c.arrow(350, 135, 390, 135, A, { w: 3 })
      c.text(320, 196, l('дверь', 'door'), 'currentColor', { size: 15, w: 700 })
      c.text(320, 214, l('правая грань ↻', 'right face ↻'), A, { size: 13, w: 700 })
      c.text(150, 262, l('комната = одна раскраска', 'room = one coloring'), 'currentColor', { size: 15, w: 700 })
      c.text(490, 262, l('соседняя комната', 'neighboring room'), 'currentColor', { size: 15, w: 700 })
      c.text(490, 282, l('отличается правой гранью', 'differs by the right face'), M, { size: 12 })
    },
  },
  // 12 дверей: каждая грань в две стороны — 12 соседних раскрасок
  doors: {
    ru: 'Из каждой комнаты 12 дверей: 6 граней, каждую можно повернуть по часовой или против; за каждой дверью — своя раскраска', en: 'Every room has 12 doors: 6 faces, each turned clockwise or counterclockwise; behind each door is a different coloring',
    viewBox: [0, 0, 640, 310], legend: false,
    draw: (c, l) => {
      const s0 = scramble(solved(), 20, 11)
      const Ub = 16, B = cubeBox(3, Ub)
      drawCube(c, s0, 82, 80, Ub)
      c.text(82, 80 + B.h + 26, l('сейчас', 'now'), 'currentColor', { size: 15, w: 700 })
      c.text(82, 80 + B.h + 44, l('12 дверей →', '12 doors →'), A, { size: 13, w: 700 })
      const U = 7.5, b = cubeBox(3, U)
      FACES.forEach(([a, side, rn, en], fi) => [1, -1].forEach((dir, di) => {
        const k = fi * 2 + di, col = k % 6, row = Math.floor(k / 6), x = 232 + col * 72, y = 16 + row * 140
        drawCube(c, turn(s0, a, side, dir), x, y, U)
        c.text(x, y + b.h + 22, l(rn, en), 'currentColor', { size: 13, w: 700 })
        c.text(x, y + b.h + 40, dir === 1 ? '↻' : '↺', dir === 1 ? A : M, { size: 16, w: 700 })
      }))
      c.text(412, 302, l('↻ по часовой · ↺ против — если смотреть прямо на эту грань', '↻ clockwise · ↺ counterclockwise — looking straight at that face'), M, { size: 12 })
    },
  },
  // Рельеф: высота комнаты — сколько ходов до выхода; путь вниз по ступеням
  relief: {
    ru: `Рельеф лабиринта: высота и число на комнате — сколько ходов до выхода. От старта (${SHORT}) кратчайший путь спускается по ступеням до выхода (0)`, en: `Maze relief: a room’s height and number show how many moves are left to the exit. From the start (${SHORT}) the shortest path steps down to the exit (0)`,
    viewBox: [0, 0, 640, 320], legend: false,
    draw: (c, l) => {
      const i = c.iso(262, 46, 30)
      i.tile(-0.2, -0.2, COLS + 0.4, ROWS + 0.4)
      const path = new Set(shortest(START).map(key)), top = SHORT + 3
      for (const n of NODES) { const d = dist(n); i.box(n[0] + 0.06, n[1] + 0.06, 0, 0.88, 0.88, 0.1 + d * 0.17, path.has(key(n)) ? A : M, path.has(key(n)) ? 1 : 0.3 + 0.6 * (d / top)) }
      for (const n of shortest(START)) { const [x, y] = i.p(n[0] + 0.5, n[1] + 0.5, 0.1 + dist(n) * 0.17); c.text(x, y + 4, String(dist(n)), 'currentColor', { size: 13, w: 700, halo: true }) }
      c.text(24, 210, l('выход · 0', 'exit · 0'), 'currentColor', { size: 14, w: 700, anchor: 'start' })
      c.text(24, 228, l('собранный кубик', 'the solved cube'), M, { size: 12, anchor: 'start' })
      c.text(616, 120, l(`старт · ${SHORT}`, `start · ${SHORT}`), 'currentColor', { size: 14, w: 700, anchor: 'end' })
      c.text(616, 138, l('ваш кубик', 'your cube'), M, { size: 12, anchor: 'end' })
      c.text(320, 296, l('высота = сколько ходов до выхода · синие ступени — кратчайший путь вниз', 'height = moves to the exit · blue steps = the shortest way down'), 'currentColor', { size: 14, w: 700 })
    },
  },
  // Карта сверху: выход, старт, стены и кратчайший путь
  map: {
    ru: `Лабиринт сверху: слева выход — собранный кубик, справа старт — ваш перемешанный кубик; кратчайший путь между ними — ${SHORT} ходов`, en: `The maze from above: the exit on the left is the solved cube, the start on the right is your scrambled cube; the shortest path between them is ${SHORT} moves`,
    viewBox: [0, 0, 640, 330], legend: false,
    draw: (c, l) => {
      const P = maze(c, 116, 20, 51, { lab: l })
      const sp = shortest(START)
      route(c, P, sp, 'currentColor', { w: 4, op: 0.8 })
      sp.slice(1, -1).forEach((n, k) => { const [x, y] = P(n); c.badge(x, y, 'currentColor', String(sp.length - 2 - k), { r: 10, size: 11 }) })
      c.text(320, 304, l(`кратчайший путь — ${movesRu(SHORT)} · цифра — сколько ходов осталось`, `shortest path — ${movesEn(SHORT)} · number = moves left`), 'currentColor', { size: 14, w: 700 })
      c.text(320, 324, l('толстая линия — стена · у комнаты-кубика 12 дверей, на схеме до 4', 'thick line = wall · a cube room has 12 doors, the sketch has up to 4'), M, { size: 12 })
    },
  },
  // Прогулки от выхода и записи «кубик → число ходов»
  walks: {
    ru: 'Прогулка: случайные ходы от собранного кубика. После каждого хода записывают раскраску и сколько ходов сделано', en: 'A walk: random moves away from the solved cube. After each move the coloring and the number of moves made are recorded',
    viewBox: [0, 0, 640, 300], legend: false,
    draw: (c, l) => {
      const P = maze(c, 20, 30, 44, { icons: false })
      const w = walk(5, 7)
      const [ex, ey] = P(EXIT); drawCube(c, solved(), ex, ey - 13, 4.6)
      route(c, P, w, A, { w: 4 })
      w.slice(1).forEach((n, k) => { const [x, y] = P(n); c.badge(x, y, A, String(k + 1), { r: 10, size: 11 }) })
      c.text(196, 280, l('прогулка от выхода · цифра — номер хода', 'walk from the exit · number = move count'), 'currentColor', { size: 13, w: 700 })
      const bx = 420
      c.text(bx + 90, 26, l('записи для обучения', 'training records'), 'currentColor', { size: 14, w: 700 })
      ;[1, 2, 3, 7].forEach((k, j) => {
        const y = 42 + j * 58
        drawCube(c, scramble(solved(), k, 31), bx + 30, y, 7.5)
        c.text(bx + 80, y + 30, '→', M, { size: 18 })
        c.text(bx + 110, y + 30, l(movesRu(k), movesEn(k)), A, { size: 15, w: 700, anchor: 'start' })
      })
      c.text(bx + 90, 290, l('миллиарды таких пар', 'billions of such pairs'), M, { size: 12 })
    },
  },
  // Компас завышает: прогулка петляет
  loop: {
    ru: `Прогулка дошла до комнаты за 8 ходов, а настоящий путь до неё — ${dist(LOOP[8])}: компас, обученный на прогулках, завышает расстояние`, en: `The walk reached the room in 8 moves, but it is really ${dist(LOOP[8])} away: a compass trained on walks overestimates distance`,
    viewBox: [0, 0, 640, 300], legend: false,
    draw: (c, l) => {
      const P = maze(c, 20, 30, 44, { icons: false })
      const [ex, ey] = P(EXIT); drawCube(c, solved(), ex, ey - 13, 4.6)
      route(c, P, LOOP, M, { w: 3.5, dash: '7 5' })
      route(c, P, shortest(LOOP[8]), A, { w: 5 })
      const [tx, ty] = P(LOOP[8]); c.dot(tx, ty, 15, A, { ring: 3 })
      c.text(196, 280, l('пунктир — прогулка · синий — настоящий путь', 'dashed = walk · blue = real path'), 'currentColor', { size: 13, w: 700 })
      const x = 510
      c.text(x, 60, l('запомнила прогулка', 'the walk recorded'), M, { size: 13, w: 700 })
      c.text(x, 96, l('8 ходов', '8 moves'), M, { size: 30, w: 700 })
      c.text(x, 144, l('на самом деле', 'actually'), A, { size: 13, w: 700 })
      c.text(x, 180, l(movesRu(dist(LOOP[8])), movesEn(dist(LOOP[8]))), A, { size: 30, w: 700 })
      c.text(x, 222, l('компас завышает,', 'the compass overestimates,'), 'currentColor', { size: 13, w: 700 })
      c.text(x, 240, l('но чем дальше от выхода,', 'but farther from the exit'), M, { size: 12 })
      c.text(x, 256, l('тем больше его число', 'still means a bigger number'), M, { size: 12 })
    },
  },
  // Компас: кубик → нейросеть → число ходов
  net: {
    ru: 'Компас — нейросеть: на входе раскраска кубика (54 наклейки), 10 слоёв и 4 млн настроек, на выходе — оценка, сколько ходов до сборки', en: 'The compass is a neural network: a cube coloring (54 stickers) goes in, 10 layers with 4 million parameters, an estimate of moves to solve comes out',
    viewBox: [0, 0, 640, 220], legend: false,
    draw: (c, l) => {
      drawCube(c, scramble(solved(), 20, 7), 90, 16, 14)
      c.text(90, 180, l('вход', 'input'), A, { size: 13, w: 700 }); c.text(90, 198, l('раскраска · 54 наклейки', 'coloring · 54 stickers'), M, { size: 12 })
      c.thenArrow(160, 200, 100, M)
      for (let k = 0; k < 10; k++) {
        const x = 222 + k * 22, h = k === 0 || k === 9 ? 80 : 130
        c.rect(x, 100 - h / 2, 14, h, { rx: 3, fill: A, fillOp: 0.35 + k * 0.06 })
      }
      c.text(330, 180, l('нейросеть', 'neural network'), A, { size: 13, w: 700 }); c.text(330, 198, l('10 слоёв · 4 млн настроек', '10 layers · 4 M parameters'), M, { size: 12 })
      c.thenArrow(450, 490, 100, M)
      c.text(560, 112, '≈ 17', A, { size: 34, w: 700 })
      c.text(560, 180, l('выход', 'output'), A, { size: 13, w: 700 }); c.text(560, 198, l('ходов до сборки', 'moves to solve'), M, { size: 12 })
    },
  },
  // Одиночный путь по компасу: числа компаса в комнатах и тупик
  deadend: {
    ru: 'Числа в комнатах — оценка компаса. Одиночный путь каждый раз идёт в соседнюю комнату с меньшим числом и упирается в тупик', en: 'Numbers in rooms are compass estimates. A single path always steps to the neighbor with the smaller number and runs into a dead end',
    viewBox: [0, 0, 640, 330], legend: false,
    draw: (c, l) => {
      const onPath = new Set(B1.path.map(key))
      const P = maze(c, 116, 20, 51, { lab: l, label: (n) => (key(n) === key(EXIT) || key(n) === key(START) ? null : [String(MAIN(n)), onPath.has(key(n)) ? A : M]) })
      route(c, P, B1.path, A, { w: 4, op: 0.6 })
      const [x, y] = P(B1.path[B1.path.length - 1])
      c.badge(x, y, W, '', { r: 14, mark: 'cross' })
      c.text(x, y + 32, l('тупик', 'dead end'), W, { size: 14, w: 700, halo: true })
      c.text(320, 304, l('число — сколько ходов до выхода, по мнению компаса (он ошибается на −1…+2)', 'number = moves to the exit according to the compass (off by −1…+2)'), 'currentColor', { size: 14, w: 700 })
      c.text(320, 324, l('одиночный путь верит компасу и не может вернуться', 'a single path trusts the compass and can’t turn back'), M, { size: 12 })
    },
  },
  // Фронт шириной 3: номер шага в каждой комнате фронта
  front: {
    ru: `Фронт шириной 3 с тем же компасом: цифра — на каком шаге комната была во фронте. Фронт обходит тупик и находит путь в ${moves(B3.path)} ходов`, en: `A front of width 3 with the same compass: the number is the step at which a room was in the front. The front gets around the dead end and finds a ${moves(B3.path)}-move path`,
    viewBox: [0, 0, 640, 330], legend: false,
    draw: (c, l) => {
      const P = maze(c, 116, 20, 51, { lab: l, fill: (n) => (B3.steps.has(key(n)) ? [A, 0.3] : null), label: (n) => (B3.steps.has(key(n)) && key(n) !== key(START) && key(n) !== key(EXIT) ? [String(B3.steps.get(key(n))), 'currentColor'] : null) })
      route(c, P, B3.path, A, { w: 4, op: 0.6 })
      c.text(320, 304, l(`синие комнаты — фронт · цифра — номер шага · путь — ${movesRu(moves(B3.path))}`, `blue rooms = front · number = step · path — ${movesEn(moves(B3.path))}`), 'currentColor', { size: 14, w: 700 })
      c.text(320, 324, l('на каждом шаге во фронте остаются 3 самые многообещающие комнаты', 'each step keeps the 3 most promising rooms'), M, { size: 12 })
    },
  },
  // Отряд: три компаса с разными ошибками, берётся самый короткий путь
  squad: {
    ru: `Три компаса с разными ошибками находят пути в ${SQUAD.map((b) => moves(b.path)).join(', ')} ходов; в ответ идёт самый короткий`, en: `Three compasses with different errors find paths of ${SQUAD.map((b) => moves(b.path)).join(', ')} moves; the shortest becomes the answer`,
    viewBox: [0, 0, 640, 240], legend: false,
    draw: (c, l) => {
      const best = Math.min(...SQUAD.map((b) => moves(b.path)))
      SQUAD.forEach((b, j) => {
        const x = 14 + j * 210, P = maze(c, x + 7, 24, 24.5, { icons: false }), win = moves(b.path) === best
        route(c, P, b.path, win ? A : M, { w: 3.5 })
        const [ex, ey] = P(EXIT); c.dot(ex, ey, 6, 'currentColor')
        const [sx, sy] = P(START); c.dot(sx, sy, 6, 'currentColor', { ring: 2 })
        c.text(x + 105, 176, l(`компас ${j + 1}`, `compass ${j + 1}`), win ? A : M, { size: 13, w: 700 })
        c.text(x + 105, 202, l(movesRu(moves(b.path)), movesEn(moves(b.path))), win ? A : M, { size: 20, w: 700 })
        if (win) c.badge(x + 172, 196, A, '', { r: 11, mark: 'check' })
      })
      c.text(320, 232, l('● выход · ○ старт · каждый компас учился на своих прогулках · ответ — самый короткий путь', '● exit · ○ start · each compass learned from its own walks · the answer is the shortest'), 'currentColor', { size: 12, w: 700 })
    },
  },
  // Ширина фронта: 1, 2, 3 с одним и тем же компасом
  width: {
    ru: `Тот же компас: ширина 1 — тупик, ширина 2 — ${moves(B2.path)} ходов, ширина 3 — ${moves(B3.path)} (кратчайший)`, en: `Same compass: width 1 — dead end, width 2 — ${moves(B2.path)} moves, width 3 — ${moves(B3.path)} (shortest)`,
    viewBox: [0, 0, 640, 262], legend: false,
    draw: (c, l) => {
      ;[B1, B2, B3].forEach((b, j) => {
        const x = 14 + j * 210, seen = new Set(b.seen.map(key))
        const P = maze(c, x + 7, 24, 24.5, { icons: false, fill: (n) => (seen.has(key(n)) ? [A, 0.3] : null) })
        route(c, P, b.path, A, { w: 3.5 })
        const [ex, ey] = P(EXIT); c.dot(ex, ey, 6, 'currentColor')
        if (!b.found) { const [px, py] = P(b.path[b.path.length - 1]); c.badge(px, py, W, '', { r: 9, mark: 'cross' }) }
        c.text(x + 105, 176, l(`ширина ${j + 1}`, `width ${j + 1}`), A, { size: 13, w: 700 })
        c.text(x + 105, 202, b.found ? l(movesRu(moves(b.path)), movesEn(moves(b.path))) : l('тупик', 'dead end'), b.found ? A : W, { size: 20, w: 700 })
        c.text(x + 105, 222, l(`осмотрено комнат: ${b.seen.length}`, `rooms checked: ${b.seen.length}`), M, { size: 12 })
      })
      c.text(320, 254, l('синие комнаты — где побывал фронт · шире фронт — больше ошибок компаса прощено', 'blue rooms = visited by the front · wider front = more compass errors forgiven'), 'currentColor', { size: 13, w: 700 })
    },
  },
  // 5×5×5: короче лучших команд в 19 задачах из 19
  checks: {
    ru: 'Кубик 5×5×5: в каждой из 19 задач соревнования решение CayleyPy короче лучших команд, в среднем 92,2 хода против 96,6', en: '5×5×5 cube: on every one of the 19 competition tasks the CayleyPy solution is shorter than the best teams, 92.2 moves vs 96.6 on average',
    viewBox: [0, 0, 640, 230], legend: false,
    draw: (c, l) => {
      for (let k = 0; k < 19; k++) {
        const col = k % 10, row = Math.floor(k / 10), x = 46 + col * 61 + row * 30, y = 10 + row * 92
        drawCube(c, scramble(solved(5), 30, 100 + k), x, y, 4.2)
        c.badge(x, y + 62, A, '', { r: 9, mark: 'check' })
      }
      c.text(320, 210, l('19 задач из 19 · 92,2 хода против 96,6 в среднем', '19 of 19 tasks · 92.2 moves vs 96.6 on average'), 'currentColor', { size: 15, w: 700 })
    },
  },
  // Неожиданное: данные, размер сети, время
  surprises: {
    ru: 'Данных больше 8 млрд — не лучше; сеть в 4 млн настроек точнее сети в 14,7 млн; обучение 4 ч 40 мин против 86 ч 25 мин', en: 'Beyond 8 billion positions data doesn’t help; a 4M-parameter network beats a 14.7M one; training takes 4 h 40 min vs 86 h 25 min',
    viewBox: [0, 0, 640, 262], legend: false,
    draw: (c, l) => {
      const panel = (x: number, title: string, sub: string, bars: [string, number, string, boolean][], max: number) => {
        c.text(x + 100, 22, title, 'currentColor', { size: 14, w: 700 })
        c.text(x + 100, 40, sub, M, { size: 12 })
        bars.forEach(([k, v, t, hl], j) => {
          const bw = 52, gap = 10, bx = x + 100 - (bars.length * bw + (bars.length - 1) * gap) / 2 + j * (bw + gap), h = (v / max) * 140
          c.rect(bx, 210 - h, bw, h, { rx: 4, fill: hl ? A : M, fillOp: hl ? 1 : 0.45 })
          c.text(bx + bw / 2, 204 - h, t, hl ? A : 'currentColor', { size: 13, w: 700 })
          c.text(bx + bw / 2, 230, k, M, { size: 12 })
        })
      }
      const n = (s: string) => l(s, s.replace(',', '.'))
      panel(0, l('данных больше — не лучше', 'more data is not better'), l('средний путь 4×4×4 · млрд позиций', 'avg 4×4×4 path · billion positions'), [['4', 55.4, n('55,4'), false], ['8', 55.1, n('55,1'), true], ['16', 55.8, n('55,8'), false]], 60)
      panel(220, l('маленькая сеть точнее', 'a small network is better'), l('настройки, млн', 'parameters, millions'), [[l('прошлые', 'previous'), 14.7, n('14,7'), false], [l('компас', 'compass'), 4, '4', true]], 16)
      panel(440, l('быстрее', 'faster'), l('обучение, часы', 'training, hours'), [[l('прошлые', 'previous'), 86.4, n('86,4'), false], [l('компас', 'compass'), 4.7, n('4,7'), true]], 92)
      c.text(320, 256, l('синее — CayleyPy; сборка кубика на том же компьютере в 26 раз быстрее: 10,9 с против 287,8 с', 'blue = CayleyPy; solving on the same machine is 26× faster: 10.9 s vs 287.8 s'), M, { size: 12 })
    },
  },
  // Позиция — перестановка наклеек
  perm: {
    ru: 'Позиция — перестановка 54 наклеек: для каждой записано, куда она переехала; ход двигает 20 наклеек', en: 'A position is a permutation of 54 stickers: for each, where it moved; a move shifts 20 stickers',
    viewBox: [0, 0, 640, 220], legend: false,
    draw: (c, l) => {
      const n = 9, x0 = 96, gap = 50
      const p = [0, 1, 2, 5, 8, 7, 6, 3, 4]
      for (let k = 0; k < n; k++) {
        const x = x0 + k * gap
        c.rect(x - 17, 40, 34, 34, { rx: 5, fill: M, fillOp: 0.25 + 0.075 * k })
        c.text(x, 63, String(k), 'currentColor', { size: 14, w: 700 })
        const t = x0 + p[k] * gap
        c.curve(x, 78, t, 128, p[k] === k ? M : A, { c1: [x, 104], c2: [t, 104], w: p[k] === k ? 1.2 : 2 })
        c.rect(t - 17, 132, 34, 34, { rx: 5, fill: M, fillOp: 0.25 + 0.075 * k })
        c.text(t, 155, String(k), 'currentColor', { size: 14, w: 700 })
      }
      c.text(x0 + n * gap - 10, 63, '… 53', M, { size: 14, anchor: 'start' })
      c.text(x0 + n * gap - 10, 155, '… 53', M, { size: 14, anchor: 'start' })
      c.text(66, 62, l('до', 'before'), M, { size: 12, w: 700, anchor: 'end' })
      c.text(66, 154, l('после', 'after'), M, { size: 12, w: 700, anchor: 'end' })
      c.text(320, 200, l('позиция = (p(0), …, p(53)) · ход двигает 20 наклеек', 'position = (p(0), …, p(53)) · a move shifts 20 stickers'), 'currentColor', { size: 14, w: 700 })
    },
  },
  // Шаг лучевого поиска
  beam: {
    ru: 'Шаг лучевого поиска: фронт из W комнат, все соседи, убрать повторы, оценить компасом, оставить W лучших', en: 'One beam search step: a front of W rooms, all neighbors, remove repeats, rate with the compass, keep the W best',
    viewBox: [0, 0, 640, 200], legend: false,
    draw: (c, l) => {
      const steps: [string, string, number][] = [[l('фронт', 'front'), 'W', 3], [l('соседи', 'neighbors'), 'W × 12', 9], [l('без повторов', 'no repeats'), '', 7], [l('оценка компасом', 'compass score'), '', 7], [l('W лучших', 'W best'), 'W', 3]]
      steps.forEach(([t, s, k], j) => {
        const x = 64 + j * 128
        for (let q = 0; q < k; q++) {
          const y = 96 - ((k - 1) * 13) / 2 + q * 13
          const on = j === 4 || (j === 3 && q < 3)
          c.rect(x - 22, y - 5, 44, 10, { rx: 3, fill: on ? A : M, fillOp: on ? 0.9 : 0.4 })
        }
        if (j < 4) c.arrow(x + 32, 96, x + 94, 96, M, { w: 2 })
        c.text(x, 172, t, j === 3 || j === 4 ? A : M, { size: 13, w: 700 })
        if (s) c.text(x, 192, s, M, { size: 12 })
      })
      c.text(320, 24, l('повторять, пока во фронте не окажется собранный кубик', 'repeat until the solved cube is in the front'), 'currentColor', { size: 14, w: 700 })
    },
  },
}
/** Числа схем — для подписей в тексте поста */
export const FACTS = { SHORT, B1: moves(B1.path), B1found: B1.found, B2: moves(B2.path), B3: moves(B3.path), squad: SQUAD.map((b) => moves(b.path)), loop: dist(LOOP[8]) }
export default scenes
