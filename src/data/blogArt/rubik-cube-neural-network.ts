// Схемы поста «Нейросеть собирает кубик Рубика»: кубик, лабиринт позиций, компас, фронт, отряд, результаты.
// Лабиринт — одна маленькая схема на все сцены: комнаты 7×4, стены, выход слева, старт справа.
// Пути фронта не нарисованы руками: их считает тот же лучевой поиск, что в статье, с компасом, который ошибается
import { type Canvas, type L, type Scene, A, M, W } from '@/lib/infographic'

// ---------- лабиринт ----------
const COLS = 7, ROWS = 4
type N = [number, number]
const EXIT: N = [0, 1], START: N = [6, 2]
const key = ([c, r]: N) => `${c},${r}`
// Стены: карман (3,2) с одной дверью — в него компас заводит одиночный путь
const WALL_DEF = ['3,2|2,2', '3,2|3,1', '3,2|3,3', '1,0|1,1', '5,3|4,3']
const WALL_LIST = WALL_DEF.map((w) => w.split('|').map((q) => q.split(',').map(Number) as N))
const WALLS = new Set(WALL_DEF.flatMap((w) => [w, w.split('|').reverse().join('|')]))
const open = (a: N, b: N) => !WALLS.has(`${key(a)}|${key(b)}`)
function nbrs([c, r]: N): N[] {
  return ([[c - 1, r], [c + 1, r], [c, r - 1], [c, r + 1]] as N[]).filter(([x, y]) => x >= 0 && y >= 0 && x < COLS && y < ROWS && open([c, r], [x, y]))
}
const NODES: N[] = Array.from({ length: COLS * ROWS }, (_, i) => [i % COLS, Math.floor(i / COLS)] as N)
const EDGES: [N, N][] = NODES.flatMap((a) => nbrs(a).filter((b) => key(a) < key(b)).map((b) => [a, b] as [N, N]))
// Настоящее расстояние до выхода (обход в ширину) — высота рельефа
const DIST = new Map<string, number>([[key(EXIT), 0]])
for (let q = [EXIT]; q.length;) { const n = q.shift()!; for (const m of nbrs(n)) if (!DIST.has(key(m))) { DIST.set(key(m), DIST.get(key(n))! + 1); q.push(m) } }
function shortest(from: N): N[] {
  const p = [from]
  while (DIST.get(key(p[p.length - 1]))! > 0) p.push(nbrs(p[p.length - 1]).find((m) => DIST.get(key(m))! === DIST.get(key(p[p.length - 1]))! - 1)!)
  return p
}
// Компас схемы: настоящее расстояние плюс ошибка от −1 до +2 хода в каждой комнате (как у обученного компаса).
// Ошибки — из генератора с зерном 44: при нём ширина 1 упирается в тупик, 2 находит длинный путь, 3 — кратчайший
const ERR = new Map<string, number>()
{ let s = 44; const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280); for (let c = 0; c < COLS; c++) for (let r = 0; r < ROWS; r++) ERR.set(key([c, r]), Math.floor(rnd() * 4) - 1) }
const compass = (n: N) => DIST.get(key(n))! + ERR.get(key(n))!
/** Лучевой поиск шириной w: путь до выхода или до тупика и все комнаты, где побывал фронт */
function beam(w: number): { path: N[]; seen: N[]; found: boolean } {
  const parent = new Map<string, N | null>([[key(START), null]])
  let front: N[] = [START]
  const back = (n: N) => { const p: N[] = [n]; for (let x = parent.get(key(n)); x; x = parent.get(key(x))) p.unshift(x); return p }
  while (front.length) {
    const cand: N[] = []
    for (const n of front) for (const m of nbrs(n)) if (!parent.has(key(m))) { parent.set(key(m), n); cand.push(m) }
    if (cand.some((m) => key(m) === key(EXIT))) return { path: back(EXIT), seen: [...parent.keys()].map((k) => k.split(',').map(Number) as N), found: true }
    if (!cand.length) return { path: back(front[0]), seen: [...parent.keys()].map((k) => k.split(',').map(Number) as N), found: false }
    front = cand.sort((a, b) => compass(a) - compass(b) || key(a).localeCompare(key(b))).slice(0, w)
  }
  return { path: [START], seen: [START], found: false }
}
export const MAZE = { shortest: shortest(START).length - 1, beam1: beam(1), beam2: beam(2), beam3: beam(3) }

/** Нарисовать лабиринт: (x, y) — левый верхний угол, s — шаг сетки; возвращает координаты комнаты */
function maze(c: Canvas, x: number, y: number, s: number, o: { dim?: boolean; exit?: boolean; start?: boolean; lab?: L } = {}) {
  const P = ([cc, r]: N): [number, number] => [x + cc * s, y + r * s]
  for (const [a, b] of EDGES) c.line([P(a), P(b)], M, { w: 1.6, op: o.dim ? 0.25 : 0.4 })
  // Стены — поперечные черты между комнатами, где двери нет
  for (const w of WALL_LIST) {
    const [[ax, ay], [bx, by]] = w.map(P), mx = (ax + bx) / 2, my = (ay + by) / 2, h = s * 0.32
    c.line(ax === bx ? [[mx - h, my], [mx + h, my]] : [[mx, my - h], [mx, my + h]], 'currentColor', { w: 4, op: o.dim ? 0.4 : 0.8 })
  }
  for (const n of NODES) { const [px, py] = P(n); c.rect(px - s * 0.13, py - s * 0.13, s * 0.26, s * 0.26, { rx: 3, fill: M, fillOp: o.dim ? 0.25 : 0.45 }) }
  if (o.exit !== false) { const [ex, ey] = P(EXIT); c.rect(ex - s * 0.17, ey - s * 0.17, s * 0.34, s * 0.34, { rx: 4, fill: M }); c.flag(ex - 4, ey - s * 0.2 - 16, M) }
  if (o.start !== false) { const [sx, sy] = P(START); c.dot(sx, sy, s * 0.2, M, { ring: 2.5 }) }
  if (o.lab) {
    const [ex, ey] = P(EXIT), [sx, sy] = P(START)
    c.text(ex, ey + s * 0.2 + 16, o.lab('выход', 'exit'), M, { size: 13, w: 700, halo: true })
    if (o.start !== false) c.text(sx, sy + s * 0.2 + 16, o.lab('старт', 'start'), M, { size: 13, w: 700, halo: true })
  }
  return P
}
const route = (c: Canvas, P: (n: N) => [number, number], p: N[], col: string, o: { w?: number; dash?: string; op?: number } = {}) => c.line(p.map(P), col, { w: o.w ?? 4, dash: o.dash, op: o.op })
const moves = (p: N[]) => p.length - 1

// ---------- кубик ----------
/** Кубик 3×3×3 из деталей; lift — насколько поднят верхний слой (поворот грани), shade — оттенки «наклеек» */
function cube(c: Canvas, ox: number, oy: number, U: number, o: { lift?: number; seed?: number } = {}) {
  const i = c.iso(ox, oy, U)
  const lift = o.lift ?? 0
  let s = o.seed ?? 1
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
  for (let z = 0; z < 3; z++) for (let x = 0; x < 3; x++) for (let y = 0; y < 3; y++) {
    const op = o.seed === undefined ? 1 : [0.45, 0.7, 1][Math.floor(rnd() * 3)]
    i.box(x * 1.04, y * 1.04, z * 1.04 + (z === 2 ? lift : 0), 1, 1, 1, M, op)
  }
  return i
}

const scenes: Record<string, Scene> = {
  // Ход — поворот одной грани: верхний слой кубика поднят и поворачивается
  turn: {
    ru: 'Кубик Рубика: верхняя грань поворачивается на четверть оборота — это один ход', en: 'A Rubik’s Cube: the top face turns a quarter turn — that is one move',
    viewBox: [0, 0, 640, 250], legend: false,
    draw: (c, l) => {
      cube(c, 170, 110, 22, { seed: 3 })
      c.thenArrow(270, 360, 140, M)
      cube(c, 470, 110, 22, { seed: 7, lift: 0.55 })
      c.curve(392, 66, 548, 66, M, { c1: [430, 30], c2: [510, 30], w: 2.5 })
      c.arrow(540, 60, 548, 66, M, { w: 2.5 })
      c.text(170, 236, l('позиция', 'position'), M, { size: 14, w: 700 })
      c.text(470, 236, l('новая позиция', 'new position'), M, { size: 14, w: 700 })
      c.text(315, 124, l('1 ход', '1 move'), M, { size: 14, w: 700 })
      c.text(470, 24, l('поворот грани на ¼', 'quarter turn of a face'), M, { size: 13 })
    },
  },
  // Откуда 43 квинтиллиона: 8 уголков и 12 рёбер
  pieces: {
    ru: '8 уголков: 8!·3⁷ ≈ 88 млн вариантов; 12 рёбер: 12!·2¹¹ ≈ 981 млрд; половина недостижима; итого 4,3·10¹⁹', en: '8 corners: 8!·3⁷ ≈ 88 million options; 12 edges: 12!·2¹¹ ≈ 981 billion; half unreachable; total 4.3·10¹⁹',
    viewBox: [0, 0, 640, 270], legend: false,
    draw: (c, l) => {
      const i1 = c.iso(120, 70, 18)
      for (let k = 0; k < 8; k++) i1.box((k % 4) * 1.3, Math.floor(k / 4) * 1.3, 0, 1, 1, 1, M)
      const i2 = c.iso(360, 60, 18)
      for (let k = 0; k < 12; k++) i2.box((k % 6) * 1.25, Math.floor(k / 6) * 1.3, 0, 1, 0.55, 1, M, 0.7)
      c.text(120, 168, l('8 уголков', '8 corners'), M, { size: 15, w: 700 })
      c.text(120, 190, l('переставить · повернуть', 'permute · twist'), M, { size: 12 })
      c.text(120, 214, '8! · 3⁷ ≈ ' + l('88 млн', '88 M'), 'currentColor', { size: 15, w: 700 })
      c.text(400, 168, l('12 рёбер', '12 edges'), M, { size: 15, w: 700 })
      c.text(400, 190, l('переставить · перевернуть', 'permute · flip'), M, { size: 12 })
      c.text(400, 214, '12! · 2¹¹ ≈ ' + l('981 млрд', '981 B'), 'currentColor', { size: 15, w: 700 })
      c.text(260, 120, '×', M, { size: 28, w: 700 })
      c.line([[40, 236], [600, 236]], M, { w: 1, op: 0.3 })
      c.text(320, 262, l('88 млн × 981 млрд ÷ 2 (половина недостижима) = 4,3·10¹⁹', '88 M × 981 B ÷ 2 (half unreachable) = 4.3·10¹⁹'), 'currentColor', { size: 15, w: 700 })
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
  // Сколько позиций у кубиков: степень десяти, атомы Земли — пунктир
  sizes: {
    ru: 'Позиций: 3×3×3 — 10¹⁹, 4×4×4 — 10⁴⁵, 5×5×5 — 10⁷⁴; атомов на Земле около 10⁵⁰', en: 'Positions: 3×3×3 — 10¹⁹, 4×4×4 — 10⁴⁵, 5×5×5 — 10⁷⁴; atoms on Earth are about 10⁵⁰',
    viewBox: [0, 0, 640, 210], legend: false,
    draw: (c, l) => {
      const x0 = 110, k = 6.2
      const rows: [string, number, string][] = [['3×3×3', 19, '4,3·10¹⁹'], ['4×4×4', 45, '7,4·10⁴⁵'], ['5×5×5', 74, '1,2·10⁷⁴']]
      rows.forEach(([n, e, v], j) => {
        const y = 30 + j * 50
        c.text(x0 - 14, y + 17, n, 'currentColor', { size: 15, w: 700, anchor: 'end' })
        c.rect(x0, y, e * k, 24, { rx: 5, fill: M, fillOp: j === 2 ? 0.9 : 0.5 })
        c.text(x0 + e * k - 10, y + 17, l(v, v.replace(',', '.')), j === 2 ? 'var(--surface)' : 'currentColor', { size: 14, w: 700, anchor: 'end' })
      })
      const xa = x0 + 50 * k
      c.line([[xa, 18], [xa, 172]], W, { w: 2, dash: '5 4' })
      c.text(xa, 194, l('атомов на Земле ≈ 10⁵⁰', 'atoms on Earth ≈ 10⁵⁰'), W, { size: 13, w: 700 })
      c.text(x0, 194, l('длина — число цифр', 'length = number of digits'), M, { size: 12, anchor: 'start' })
    },
  },
  // Соревнование: тысяча команд и программа авторов впереди
  race: {
    ru: 'Соревнование Kaggle Santa 2023: больше тысячи команд, программа авторов CayleyPy собирает большие кубики короче всех', en: 'The Kaggle Santa 2023 competition: over a thousand teams; the authors’ CayleyPy program solves big cubes in fewer moves than all of them',
    viewBox: [0, 0, 640, 230],
    draw: (c, l) => {
      const i = c.iso(250, 70, 22)
      i.tile(-1, -1, 6.5, 5)
      for (let a = 0; a < 4; a++) for (let b = 0; b < 3; b++) i.person(a * 1.2 + 0.2, b * 1.3 + 0.3, M, '')
      const j = c.iso(520, 90, 22)
      j.tile(-1.3, -1.3, 2.8, 2.8)
      j.agent(-0.45, -0.45, A, 1.2, '')
      c.flag(536, 32, A)
      c.thenArrow(400, 450, 120, M)
      c.text(250, 214, l('1000+ команд · 2023', '1,000+ teams · 2023'), M, { size: 14, w: 700 })
      c.text(520, 214, l('CayleyPy · 2025', 'CayleyPy · 2025'), A, { size: 14, w: 700 })
    },
  },
  // Комната и дверь: поворот грани переводит кубик в соседнюю комнату
  rooms: {
    ru: 'Комната — одна раскраска кубика; дверь — поворот грани, он ведёт в соседнюю комнату', en: 'A room is one coloring of the cube; a door is a face turn that leads to the neighboring room',
    viewBox: [0, 0, 640, 240], legend: false,
    draw: (c, l) => {
      const room = (ox: number) => { const i = c.iso(ox, 120, 24); i.tile(-2.2, -2.2, 4.4, 4.4); return i }
      room(170); cube(c, 170, 74, 13, { seed: 3 })
      room(470); cube(c, 470, 74, 13, { seed: 7, lift: 0.5 })
      c.rect(298, 92, 44, 64, { rx: 6, fill: M, fillOp: 0.12, stroke: M, sw: 2 })
      c.dot(332, 126, 3, M)
      c.arrow(250, 124, 290, 124, M, { w: 2.5 }); c.arrow(350, 124, 390, 124, M, { w: 2.5 })
      c.text(320, 180, l('дверь = поворот грани', 'door = face turn'), 'currentColor', { size: 14, w: 700 })
      c.text(170, 226, l('комната = раскраска', 'room = coloring'), M, { size: 14, w: 700 })
      c.text(470, 226, l('соседняя комната', 'neighboring room'), M, { size: 14, w: 700 })
    },
  },
  // 12 дверей: 6 граней × 2 стороны
  doors: {
    ru: 'Из каждой комнаты обычного кубика 12 дверей: 6 граней, каждую можно повернуть в две стороны', en: 'Every room of a regular cube has 12 doors: 6 faces, each turned in two directions',
    viewBox: [0, 0, 640, 300], legend: false,
    draw: (c, l) => {
      const cx = 220, cy = 150, R = 110
      const faces = ['U', 'D', 'F', 'B', 'L', 'R']
      faces.flatMap((f) => [f, f + '′']).forEach((t, k) => {
        const a = (k / 12) * Math.PI * 2 - Math.PI / 2, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a)
        c.line([[cx + 34 * Math.cos(a), cy + 34 * Math.sin(a)], [x - 18 * Math.cos(a), y - 18 * Math.sin(a)]], M, { w: 1.6, op: 0.6 })
        c.rect(x - 15, y - 15, 30, 30, { rx: 5, fill: M, fillOp: 0.35 })
        c.text(x, y + 5, t, 'currentColor', { size: 13, w: 700 })
      })
      c.rect(cx - 26, cy - 26, 52, 52, { rx: 8, fill: M })
      c.text(cx, cy + 5, l('сейчас', 'now'), '#fff', { size: 12, w: 700 })
      c.text(420, 120, '6 × 2 = 12', 'currentColor', { size: 26, w: 700, anchor: 'start' })
      c.text(420, 150, l('6 граней, 2 стороны', '6 faces, 2 directions'), M, { size: 14, anchor: 'start' })
      c.text(420, 178, l('U′ — та же грань обратно', 'U′ — same face, other way'), M, { size: 13, anchor: 'start' })
    },
  },
  // Рельеф: высота комнаты — расстояние до выхода
  relief: {
    ru: 'Рельеф лабиринта: чем дальше комната от выхода, тем выше она стоит; выход — внизу', en: 'Maze relief: the farther a room is from the exit, the higher it stands; the exit is at the bottom',
    viewBox: [0, 0, 640, 300], legend: false,
    draw: (c, l) => {
      const i = c.iso(290, 60, 34)
      i.tile(-0.3, -0.3, COLS + 0.6, ROWS + 0.6)
      const top = Math.max(...DIST.values())
      for (const n of NODES) { const d = DIST.get(key(n))!; i.box(n[0], n[1], 0, 0.8, 0.8, 0.12 + d * 0.16, M, 0.35 + 0.65 * (d / top)) }
      const [ex, ey] = i.p(EXIT[0] + 0.4, EXIT[1] + 0.4, 0.2)
      c.flag(ex - 4, ey - 26, M)
      c.text(ex - 40, ey + 34, l('выход · 0', 'exit · 0'), 'currentColor', { size: 13, w: 700, halo: true })
      const [sx, sy] = i.p(START[0] + 0.8, START[1] + 0.4, 0.12 + DIST.get(key(START))! * 0.16)
      c.text(sx + 26, sy - 6, l(`старт · ${DIST.get(key(START))}`, `start · ${DIST.get(key(START))}`), 'currentColor', { size: 13, w: 700, halo: true, anchor: 'start' })
      c.text(320, 290, l('высота = сколько ходов до выхода', 'height = moves to the exit'), M, { size: 14, w: 700 })
    },
  },
  // Карта сверху и кратчайший путь
  map: {
    ru: `Карта лабиринта сверху: кратчайший путь от старта к выходу — ${MAZE.shortest} ходов`, en: `The maze from above: the shortest path from start to exit is ${MAZE.shortest} moves`,
    viewBox: [0, 0, 640, 280], legend: false,
    draw: (c, l) => {
      const P = maze(c, 140, 40, 60, { lab: l })
      route(c, P, shortest(START), M, { w: 5 })
      c.text(320, 266, l(`кратчайший путь — ${MAZE.shortest} ходов`, `shortest path — ${MAZE.shortest} moves`), 'currentColor', { size: 15, w: 700 })
    },
  },
  // Прогулки от выхода: записи «позиция → число ходов»
  walks: {
    ru: 'Случайные прогулки от выхода; после каждого хода записывают позицию и сколько ходов сделано', en: 'Random walks from the exit; after each move the position and the number of moves are recorded',
    viewBox: [0, 0, 640, 270], legend: false,
    draw: (c, l) => {
      const P = maze(c, 40, 50, 56, { start: false, lab: l })
      const w1: N[] = [[0, 1], [0, 2], [1, 2], [2, 2], [2, 3], [3, 3], [4, 3], [4, 2]]
      const w2: N[] = [[0, 1], [0, 0], [1, 0], [2, 0], [2, 1], [3, 1], [3, 0]]
      route(c, P, w2, M, { w: 3, dash: '6 5', op: 0.6 })
      route(c, P, w1, M, { w: 3.5 })
      w1.slice(1).forEach((n, k) => { const [x, y] = P(n); c.badge(x, y, M, String(k + 1), { r: 10, size: 11 }) })
      const bx = 530
      c.text(bx, 64, l('запись', 'record'), M, { size: 12, w: 700, ls: '.08em' })
      ;[1, 2, 3, 7].forEach((k, j) => {
        const y = 92 + j * 30
        c.rect(bx - 60, y - 16, 22, 22, { rx: 4, fill: M, fillOp: 0.45 })
        c.text(bx - 2, y, '→', M, { size: 14 })
        c.text(bx + 34, y, l(`${k} ход${k === 1 ? '' : k < 5 ? 'а' : 'ов'}`, `${k} move${k === 1 ? '' : 's'}`), 'currentColor', { size: 14, w: 700 })
      })
      c.text(320, 262, l('позиция → сколько ходов сделано', 'position → moves made'), 'currentColor', { size: 15, w: 700 })
    },
  },
  // Компас завышает: прогулка петляет
  loop: {
    ru: 'Прогулка дошла до комнаты за 8 ходов, а на самом деле до неё 2: компас, обученный на прогулках, завышает', en: 'The walk reached the room in 8 moves, but it is really 2 away: a compass trained on walks overestimates',
    viewBox: [0, 0, 640, 270],
    draw: (c, l) => {
      const P = maze(c, 40, 50, 56, { start: false, lab: l })
      const walk: N[] = [[0, 1], [0, 2], [0, 3], [1, 3], [2, 3], [2, 2], [1, 2], [1, 1], [2, 1]]
      route(c, P, walk, M, { w: 3, dash: '6 5' })
      route(c, P, shortest([2, 1]), A, { w: 5 })
      const [tx, ty] = P([2, 1]); c.dot(tx, ty, 14, A, { ring: 3 })
      c.text(520, 90, l('прогулка', 'walk'), M, { size: 14, w: 700 })
      c.text(520, 118, l('8 ходов', '8 moves'), M, { size: 22, w: 700 })
      c.text(520, 160, l('на самом деле', 'really'), A, { size: 14, w: 700 })
      c.text(520, 188, l('2 хода', '2 moves'), A, { size: 22, w: 700 })
      c.text(320, 262, l('компас ошибается в большую сторону, но направление верное', 'the compass overestimates, but points the right way'), 'currentColor', { size: 14, w: 700 })
    },
  },
  // Один путь по компасу — тупик
  deadend: {
    ru: 'Одиночный путь по компасу заходит в тупик', en: 'A single path following the compass runs into a dead end',
    viewBox: [0, 0, 640, 280],
    draw: (c, l) => {
      const P = maze(c, 140, 40, 60, { lab: l })
      route(c, P, MAZE.beam1.path, A, { w: 5 })
      const [x, y] = P(MAZE.beam1.path[MAZE.beam1.path.length - 1])
      c.badge(x, y, W, '', { r: 13, mark: 'cross' })
      c.text(x, y - 22, l('тупик', 'dead end'), W, { size: 14, w: 700, halo: true })
      c.text(320, 266, l('одна ошибка компаса — и путь упирается в стену', 'one compass error and the path hits a wall'), 'currentColor', { size: 14, w: 700 })
    },
  },
  // Фронт шириной 3: где побывал и какой путь нашёл
  front: {
    ru: `Фронт шириной 3 с тем же компасом обходит тупик и находит путь в ${moves(MAZE.beam3.path)} ходов`, en: `A front of width 3 with the same compass gets around the dead end and finds a ${moves(MAZE.beam3.path)}-move path`,
    viewBox: [0, 0, 640, 280],
    draw: (c, l) => {
      const P = maze(c, 140, 40, 60, { lab: l })
      for (const n of MAZE.beam3.seen) { const [x, y] = P(n); c.rect(x - 11, y - 11, 22, 22, { rx: 4, fill: A, fillOp: 0.35 }) }
      route(c, P, MAZE.beam3.path, A, { w: 5 })
      c.text(320, 266, l(`подсвечены комнаты, где побывал фронт · путь ${moves(MAZE.beam3.path)} ходов`, `rooms the front visited are highlighted · path of ${moves(MAZE.beam3.path)} moves`), 'currentColor', { size: 14, w: 700 })
    },
  },
  // Отряд: три компаса, разные пути, берётся самый короткий
  squad: {
    ru: 'Три компаса находят пути в 11, 9 и 7 ходов; в ответ идёт самый короткий', en: 'Three compasses find paths of 11, 9 and 7 moves; the shortest becomes the answer',
    viewBox: [0, 0, 640, 250],
    draw: (c, l) => {
      const paths: N[][] = [
        [[6, 2], [6, 1], [6, 0], [5, 0], [4, 0], [3, 0], [3, 1], [2, 1], [2, 2], [1, 2], [1, 1], [0, 1]],
        [[6, 2], [5, 2], [4, 2], [4, 3], [3, 3], [2, 3], [2, 2], [1, 2], [1, 1], [0, 1]],
        shortest(START),
      ]
      paths.forEach((p, j) => {
        const x = 14 + j * 210
        const P = maze(c, x + 18, 40, 28)
        const best = j === 2
        route(c, P, p, best ? A : M, { w: best ? 4 : 3, op: best ? 1 : 0.8 })
        c.text(x + 105, 178, l(`компас ${j + 1}`, `compass ${j + 1}`), A, { size: 13, w: 700 })
        c.text(x + 105, 204, l(`${moves(p)} ходов`, `${moves(p)} moves`), best ? A : M, { size: 18, w: 700 })
        if (best) c.badge(x + 160, 198, A, '', { r: 11, mark: 'check' })
      })
      c.text(320, 240, l('ответ = самый короткий из найденных', 'answer = the shortest one found'), 'currentColor', { size: 14, w: 700 })
    },
  },
  // Ширина фронта: 1, 2, 3 с одним и тем же компасом
  width: {
    ru: `Тот же компас: ширина 1 — тупик, ширина 2 — ${moves(MAZE.beam2.path)} ходов, ширина 3 — ${moves(MAZE.beam3.path)} ходов`, en: `Same compass: width 1 — dead end, width 2 — ${moves(MAZE.beam2.path)} moves, width 3 — ${moves(MAZE.beam3.path)} moves`,
    viewBox: [0, 0, 640, 240],
    draw: (c, l) => {
      ;[MAZE.beam1, MAZE.beam2, MAZE.beam3].forEach((b, j) => {
        const x = 14 + j * 210
        const P = maze(c, x + 18, 40, 28)
        for (const n of b.seen) { const [px, py] = P(n); c.rect(px - 6, py - 6, 12, 12, { rx: 2, fill: A, fillOp: 0.35 }) }
        route(c, P, b.path, A, { w: 4 })
        if (!b.found) { const [px, py] = P(b.path[b.path.length - 1]); c.badge(px, py, W, '', { r: 9, mark: 'cross' }) }
        c.text(x + 105, 178, l(`ширина ${j + 1}`, `width ${j + 1}`), A, { size: 13, w: 700 })
        c.text(x + 105, 204, b.found ? l(`${moves(b.path)} ходов`, `${moves(b.path)} moves`) : l('тупик', 'dead end'), b.found ? A : W, { size: 18, w: 700 })
      })
      c.text(320, 234, l('шире фронт — больше ошибок компаса прощено', 'wider front — more compass errors forgiven'), 'currentColor', { size: 14, w: 700 })
    },
  },
  // 5×5×5: короче лучших команд в 19 задачах из 19
  checks: {
    ru: 'Кубик 5×5×5: в каждой из 19 задач соревнования решение CayleyPy короче лучших команд', en: '5×5×5 cube: on every one of the 19 competition tasks the CayleyPy solution is shorter than the best teams',
    viewBox: [0, 0, 640, 200],
    draw: (c, l) => {
      for (let k = 0; k < 19; k++) {
        const col = k % 10, row = Math.floor(k / 10), x = 62 + col * 58 + row * 29, y = 50 + row * 70
        const i = c.iso(x, y, 7)
        for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) for (let z = 0; z < 2; z++) i.box(a * 1.05, b * 1.05, z * 1.05, 1, 1, 1, M, 0.75)
        c.badge(x, y + 32, A, '', { r: 9, mark: 'check' })
      }
      c.text(320, 190, l('19 из 19 · 92,2 хода против 96,6', '19 of 19 · 92.2 moves vs 96.6'), 'currentColor', { size: 15, w: 700 })
    },
  },
  // Неожиданное: данные, размер сети, время
  surprises: {
    ru: 'Данных больше 8 млрд — не лучше; сеть в 4 млн настроек точнее сети в 14,7 млн; обучение 4 ч 40 мин против 86 ч 25 мин', en: 'Beyond 8 billion positions data doesn’t help; a 4M-parameter network beats a 14.7M one; training takes 4 h 40 min vs 86 h 25 min',
    viewBox: [0, 0, 640, 250], legend: false,
    draw: (c, l) => {
      const panel = (x: number, title: string, bars: [string, number, string, boolean][], max: number) => {
        c.text(x + 90, 28, title, 'currentColor', { size: 14, w: 700 })
        bars.forEach(([k, v, t, hl], j) => {
          const bw = 52, gap = 8, bx = x + 90 - (bars.length * bw + (bars.length - 1) * gap) / 2 + j * (bw + gap), h = (v / max) * 140
          c.rect(bx, 200 - h, bw, h, { rx: 4, fill: hl ? A : M, fillOp: hl ? 1 : 0.45 })
          c.text(bx + bw / 2, 194 - h, t, hl ? A : M, { size: 13, w: 700 })
          c.text(bx + bw / 2, 220, k, M, { size: 12 })
        })
      }
      panel(10, l('данные, млрд', 'data, billions'), [['4', 55.4, '55,4', false], ['8', 55.1, '55,1', true], ['16', 55.8, '55,8', false]].map(([a, b, t, h]) => [a as string, b as number, l(t as string, (t as string).replace(',', '.')), h as boolean]), 60)
      panel(230, l('настройки сети, млн', 'parameters, millions'), [['14,7', 14.7, l('прошлые', 'previous'), false], ['4', 4, l('компас', 'compass'), true]].map(([a, b, t, h]) => [l(a as string, (a as string).replace(',', '.')), b as number, t as string, h as boolean]), 16)
      panel(450, l('обучение, часы', 'training, hours'), [['86,4', 86.4, l('прошлые', 'previous'), false], ['4,7', 4.7, l('компас', 'compass'), true]].map(([a, b, t, h]) => [l(a as string, (a as string).replace(',', '.')), b as number, t as string, h as boolean]), 92)
      c.text(100, 244, l('средний путь 4×4×4, ходов', 'avg 4×4×4 path, moves'), M, { size: 11 })
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
    viewBox: [0, 0, 640, 200],
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
export default scenes
