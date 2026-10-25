// Схемы поста «Формальные модели на Quint». Сквозная метафора: карта состояний. Комната — состояние системы,
// ход — действие, красная комната — нарушенное правило. Один и тот же сетка 4×3 во всех схемах, кроме последней.
import { type Canvas, type Scene, A, M, W } from '@/lib/infographic'

const COLS = 4, ROWS = 3, STEP = 56, SZ = 28

// Центр комнаты (c, r) на карте с началом в (ox, oy)
const at = (ox: number, oy: number, c: number, r: number): [number, number] => [ox + c * STEP + SZ / 2, oy + r * STEP + SZ / 2]

// Карта: комнаты и все возможные ходы между соседними (бледные), красная комната в правом нижнем углу
function map(c: Canvas, ox: number, oy: number, o: { edges?: boolean; bad?: 'live' | 'dim' } = {}) {
  if (o.edges) {
    for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) {
      const [x, y] = at(ox, oy, q, r)
      if (q < COLS - 1) c.line([[x + SZ / 2, y], [x + STEP - SZ / 2, y]], M, { w: 1.4, op: 0.35 })
      if (r < ROWS - 1) c.line([[x, y + SZ / 2], [x, y + STEP - SZ / 2]], M, { w: 1.4, op: 0.35 })
    }
  }
  for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) {
    const bad = q === COLS - 1 && r === ROWS - 1
    c.rect(ox + q * STEP, oy + r * STEP, SZ, SZ, { rx: 8, fill: 'var(--bg, #fff)', stroke: bad ? W : M, sw: bad ? 2.2 : 1.4, op: bad && o.bad === 'dim' ? 0.4 : 1 })
  }
  const [bx, by] = at(ox, oy, COLS - 1, ROWS - 1)
  c.bug(bx, by, W, 6)
}

// Путь по комнатам: список (столбец, строка); стрелки между соседними
function walk(c: Canvas, ox: number, oy: number, pts: [number, number][], col: string, o: { dash?: string; numbered?: boolean } = {}) {
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = at(ox, oy, ...pts[i]), [x2, y2] = at(ox, oy, ...pts[i + 1])
    const dx = Math.sign(x2 - x1), dy = Math.sign(y2 - y1), g = SZ / 2 + 2
    c.arrow(x1 + dx * g, y1 + dy * g, x2 - dx * g, y2 - dy * g, col, { w: 2.2, dash: o.dash })
  }
  if (o.numbered) pts.slice(1).forEach((p, i) => { const [x, y] = at(ox, oy, ...p); c.badge(x + 12, y - 12, col, String(i + 1), { r: 8, size: 10 }) })
}

const scenes: Record<string, Scene> = {
  // Тест идёт одной нитью и не доходит до красной комнаты; модель обходит все ходы и показывает путь к ней
  explore: {
    ru: 'Тест проходит одним путём, а модель проверяет все пути и показывает цепочку шагов до нарушения правила',
    en: 'A test follows one path, while a model checks every path and shows the chain of steps to the broken rule',
    viewBox: [0, 0, 700, 270],
    draw: (c, l) => {
      const L = 50, R = 390, Y = 50
      c.caps(L, 28, l('Тест', 'Test'), M); c.caps(R, 28, l('Модель', 'Model'), A)
      map(c, L, Y)
      walk(c, L, Y, [[0, 0], [1, 0], [2, 0], [3, 0]], M)
      c.badge(...at(L, Y, 0, 0), M, '▶', { r: 9, size: 8 })
      map(c, R, Y, { edges: true })
      walk(c, R, Y, [[0, 0], [0, 1], [1, 1], [2, 1], [2, 2], [3, 2]], A, { numbered: true })
      c.badge(...at(R, Y, 0, 0), A, '▶', { r: 9, size: 8 })
      c.text(L + 112, 232, l('Один придуманный сценарий', 'One imagined scenario'), M, { size: 12, w: 700, anchor: 'middle' })
      c.text(L + 112, 247, l('красная комната не найдена', 'the red room stays unfound'), M, { anchor: 'middle' })
      c.text(R + 112, 232, l('Все ходы, пять шагов до нарушения', 'Every move, five steps to the violation'), A, { size: 12, w: 700, anchor: 'middle' })
      c.text(R + 112, 247, l('цепочка шагов — готовый контрпример', 'the chain of steps is a ready counterexample'), M, { anchor: 'middle' })
    },
  },
  // Пара: те же ходы; в current путь доходит до красной комнаты, в fixed перед ней барьер
  pair: {
    ru: 'В модели «как есть» путь доходит до нарушения, в исправленной модели перед красной комнатой стоит барьер',
    en: 'In the as-is model the path reaches the violation, in the fixed model a barrier stands before the red room',
    viewBox: [0, 0, 700, 270],
    draw: (c, l) => {
      const L = 50, R = 390, Y = 50
      const route: [number, number][] = [[0, 0], [0, 1], [1, 1], [2, 1], [2, 2], [3, 2]]
      c.caps(L, 28, 'current', W); c.caps(R, 28, 'fixed', A)
      c.thenArrow(L + 238, R - 22, 120, M)
      map(c, L, Y, { edges: true })
      walk(c, L, Y, route, W, { numbered: true })
      map(c, R, Y, { edges: true, bad: 'dim' })
      walk(c, R, Y, route.slice(0, 5), A, { numbered: true })
      // барьер на последнем ходу и галочка
      const [bx, by] = at(R, Y, 2, 2)
      c.rect(bx + 18, by - 20, 7, 40, { rx: 2, fill: A, stroke: A, sw: 1 })
      c.badge(bx + 21, by - 30, A, '', { r: 9, mark: 'check' })
      c.text(L + 112, 232, l('Код как есть', 'The code as is'), W, { size: 12, w: 700, anchor: 'middle' })
      c.text(L + 112, 247, l('правило нарушается, баг воспроизведён', 'the rule breaks, the bug is reproduced'), M, { anchor: 'middle' })
      c.text(R + 112, 232, l('Требование', 'The requirement'), A, { size: 12, w: 700, anchor: 'middle' })
      c.text(R + 112, 247, l('одна правка закрывает последний ход', 'one fix closes the last move'), M, { anchor: 'middle' })
    },
  },
  // Испорченная копия: сторож поймал порчу — правило работает; сторож пропустил — правило ничего не проверяет
  mutant: {
    ru: 'Правило проверяют намеренно испорченной копией: если правило не сработало, оно ничего не проверяет',
    en: 'A rule is tested with a deliberately broken copy: if the rule did not fire, it checks nothing',
    viewBox: [0, 0, 700, 250],
    draw: (c, l) => {
      // кто портит: агент или человек
      const w = c.iso(62, 118, 16); w.tile(-1.5, -1.5, 3, 3); w.agent(-0.5, -0.5, A, 1, '')
      const h = c.iso(62, 180, 12); h.tile(-1.2, -1.2, 2.4, 2.4); h.person(0, 0, M, '')
      c.text(62, 62, l('агент', 'agent'), A, { size: 13, w: 800, anchor: 'middle' }); c.text(62, 78, l('или человек', 'or a person'), M, { size: 12, w: 700, anchor: 'middle' })
      c.text(62, 226, l('портит нарочно', 'breaks it on purpose'), W, { size: 12, w: 800, anchor: 'middle' })
      c.arrow(112, 130, 148, 130, W, { w: 2.2 })
      // копия модели с порчей
      c.rect(152, 58, 190, 122, { rx: 10, fill: 'var(--bg, #fff)', stroke: M, sw: 1.8 })
      c.rect(152, 58, 190, 24, { rx: 10, fill: M, fillOp: 0.3, stroke: M, sw: 1.8 })
      c.text(247, 75, l('копия модели', 'model copy'), M, { size: 12, w: 800, anchor: 'middle' })
      c.text(247, 108, l('деньги списаны', 'money charged'), M, { size: 13, w: 700, anchor: 'middle' })
      c.text(247, 140, l('если есть заказ', 'if there is an order'), M, { size: 13, w: 700, anchor: 'middle' })
      c.line([[172, 136], [322, 136]], W, { w: 2.6 })
      c.bug(326, 166, W, 6)
      c.text(247, 202, l('убрали условие «нужен заказ»', 'the “order needed” condition removed'), W, { size: 12, w: 800, anchor: 'middle' })
      c.arrow(346, 120, 388, 120, A, { w: 2.2 })
      // проверка
      const k = c.iso(430, 124, 20); k.tile(-1.5, -1.5, 3, 3); k.clipboard(0, 0, 1.4, A)
      c.text(430, 168, l('правило', 'the rule'), A, { size: 13, w: 800, anchor: 'middle' }); c.text(430, 184, l('проверяет копию', 'checks the copy'), M, { size: 11.5, w: 600, anchor: 'middle' })
      c.arrow(470, 108, 524, 74, A, { w: 2.2 }); c.arrow(470, 140, 524, 176, W, { w: 2.2 })
      // исходы
      c.badge(546, 70, A, '', { r: 16, mark: 'check' })
      c.text(572, 62, l('заметила', 'noticed'), A, { size: 14, w: 800, anchor: 'start' }); c.text(572, 80, l('проверка работает', 'the check works'), A, { size: 12, w: 700, anchor: 'start' })
      c.badge(546, 180, W, '', { r: 16, mark: 'cross' })
      c.text(572, 168, l('не заметила', 'did not notice'), W, { size: 14, w: 800, anchor: 'start' }); c.text(572, 186, l('проверка ничего', 'the check checks'), W, { size: 12, w: 700, anchor: 'start' }); c.text(572, 202, l('не проверяет', 'nothing'), W, { size: 12, w: 700, anchor: 'start' })
    },
  },
  // Граница: пропала ли запись — отвечает модель; перегружена ли панель — отвечает только человек
  boundary: {
    ru: 'Пропала ли запись, модель проверит перебором. Перегружена ли панель, решит только человек глазами',
    en: 'Whether a recording vanished, a model checks by exploration. Whether a panel is overloaded, only a person decides by eye',
    viewBox: [0, 0, 700, 310],
    draw: (c, l) => {
      c.text(175, 24, l('Модель', 'Model'), A, { size: 15, w: 800 }); c.text(525, 24, l('Человек', 'A person'), M, { size: 15, w: 800 })
      c.text(175, 44, l('правила «всегда» и «никогда»', 'rules of “always” and “never”'), M, { size: 11.5, w: 600 }); c.text(525, 44, l('оценка глазами', 'judging by eye'), M, { size: 11.5, w: 600 })
      const d = c.iso(70, 150, 17); d.tile(-1.5, -1.5, 3, 3); d.zone(-1.0, -0.8, 2.0, 1.6, W, { op: 0.18 }); d.bug(0.3, 0.1, W)
      c.text(70, 206, l('запись', 'the recording'), W, { size: 12.5, w: 800 }); c.text(70, 223, l('пропала', 'has vanished'), W, { size: 12.5, w: 800 })
      c.arrow(122, 150, 196, 150, A, { w: 2.2 })
      const q = c.iso(260, 150, 17); q.tile(-1.5, -1.5, 3, 3); q.cyl(0, 0, 0, 0.9, 1.1, A)
      c.badge(288, 112, A, '', { r: 11, mark: 'check' })
      c.text(260, 206, l('модель', 'the model'), A, { size: 12.5, w: 800 }); c.text(260, 223, l('это найдёт', 'will find it'), A, { size: 12.5, w: 800 })
      c.rect(405, 92, 140, 112, { rx: 10, fill: 'var(--bg, #fff)', stroke: M, sw: 1.8 })
      c.rect(405, 92, 140, 18, { rx: 10, fill: M, fillOp: 0.3, stroke: M, sw: 1.8 })
      for (let r = 0; r < 4; r++) for (let q2 = 0; q2 < 3; q2++) c.rect(415 + q2 * 42, 120 + r * 20, 36, 14, { rx: 4, fill: M, fillOp: 0.22, stroke: M, sw: 1 })
      c.text(475, 226, l('панель перегружена?', 'is the panel overloaded?'), M, { size: 12.5, w: 800 })
      c.arrow(551, 150, 598, 150, M, { w: 2.2 })
      const h = c.iso(640, 156, 13); h.tile(-1.3, -1.3, 2.6, 2.6); h.person(0, 0, M, '')
      c.badge(656, 122, W, '?', { r: 11 })
      c.text(640, 226, l('решает', 'decides'), M, { size: 12.5, w: 800 }); c.text(640, 243, l('человек', 'a person'), M, { size: 12.5, w: 800 })
      c.line([[350, 60], [350, 262]], W, { w: 2, dash: '6 5' }); c.text(350, 56, l('граница', 'border'), W, { size: 12, w: 800 })
      c.text(350, 292, l('что записывается правилом, проверяет модель; что оценивается глазами, проверяет человек', 'what can be written as a rule, a model checks; what is judged by eye, a person checks'), M, { size: 12, w: 700 })
    },
  },
  // Гонка: одна дверь, два человека. Было: оба вошли разом, сессия осталась без файла. Стало: у двери замок, люди по очереди
  race: {
    ru: 'У одной двери два человека одновременно оставляют сессию без файла, с замком они проходят по очереди',
    en: 'Two people at one door at once leave a session without its file; with a lock they go through in turn',
    viewBox: [0, 0, 700, 250],
    draw: (c, l) => {
      const a = c.iso(170, 112, 33); a.tile(-2, -1.5, 4, 3); a.door(-0.4, -1.0, 1.3, M); a.person(-1.3, 0.8, M, ''); a.person(0.5, 0.8, M, '')
      a.doc(1.0, -1.3, 0, 0.9, 0.7, W, 2)
      c.badge(...a.p(1.45, -0.95, 1.2), W, '?', { r: 11 })
      const b = c.iso(530, 112, 33); b.tile(-2, -1.5, 4, 3); b.door(-0.4, -1.0, 1.3, M); b.barrier(-0.4, -0.1, 1.5, A); b.person(-1.3, 1.1, M, ''); b.person(0.5, 1.1, M, '')
      b.doc(1.0, -1.3, 0, 0.9, 0.7, A, 2, true)
      c.line([[350, 36], [350, 214]], M, { w: 1.4, dash: '5 5', op: 0.5 })
      c.text(170, 216, l('Как было', 'Before'), W, { size: 13, w: 800, anchor: 'middle' }); c.text(170, 234, l('вошли разом, файла нет', 'both at once, file gone'), M, { size: 12, anchor: 'middle' })
      c.text(530, 216, l('Как стало', 'After'), A, { size: 13, w: 800, anchor: 'middle' }); c.text(530, 234, l('замок, по очереди, файл цел', 'a lock, in turn, file safe'), M, { size: 12, anchor: 'middle' })
    },
  },
  // Падение: запись идёт, обрыв, и на месте отметки пусто
  crash: {
    ru: 'Запись оборвалась до того, как её объявили, и на месте отметки пусто',
    en: 'The recording broke off before it was announced, and the mark is missing',
    viewBox: [0, 0, 700, 250],
    draw: (c, l) => {
      const a = c.iso(190, 112, 26); a.tile(-1.5, -1.5, 3, 3); a.agent(-1.0, 0, A, 1, ''); a.path([[-0.4, 0], [0.3, 0]], A, { arrow: true }); a.bug(0.6, 0.4, W); a.doc(1.0, -0.7, 0, 0.8, 0.8, M, 2)
      const b = c.iso(510, 112, 26); b.tile(-1.5, -1.5, 3, 3); b.zone(-1.1, -1.1, 2.2, 2.2, W, { op: 0.16 }); b.sign(0, 0, 1.1, M, '')
      c.badge(510, 70, W, '?', { r: 10 })
      c.arrow(300, 124, 410, 124, W, { w: 1.6, dash: '4 4' })
      c.text(190, 202, l('Пишет', 'Recording'), A, { size: 12, w: 700, anchor: 'middle' }); c.text(190, 218, l('и падает на ходу', 'and crashes mid-way'), M, { anchor: 'middle' })
      c.text(510, 202, l('Отметки нет', 'No mark'), W, { size: 12, w: 700, anchor: 'middle' }); c.text(510, 218, l('следа в облаке нет', 'no trace in the cloud'), M, { anchor: 'middle' })
    },
  },
  // Автопроверка: правка модели → планшет проверок → агент; нарушение возвращается агенту, он чинит
  hook: {
    ru: 'Каждая правка модели проходит планшет проверок, а нарушение возвращается агенту, и он чинит до зелёного',
    en: 'Every model edit passes the checklist, and a violation goes back to the agent, which fixes it until green',
    viewBox: [0, 0, 700, 270],
    draw: (c, l) => {
      const a = c.iso(130, 104, 26); a.tile(-1.5, -1.5, 3, 3); a.doc(-0.8, -0.6, 0, 1.6, 1.2, M, 3)
      const b = c.iso(350, 104, 26); b.tile(-1.5, -1.5, 3, 3); b.clipboard(0, 0.2, 1.5, A)
      const g = c.iso(570, 104, 26); g.tile(-1.5, -1.5, 3, 3); g.agent(-0.3, -0.3, A, 1, '')
      c.arrow(200, 110, 275, 110, A, { w: 1.8 }); c.arrow(425, 110, 500, 110, A, { w: 1.8 })
      c.badge(350, 40, W, '!', { r: 9 })
      c.line([[570, 204], [570, 230], [130, 230]], W, { w: 1.8, dash: '5 4' }); c.arrow(130, 230, 130, 204, W, { w: 1.8, dash: '5 4' })
      c.text(130, 192, l('Правка', 'Edit'), M, { size: 12, w: 700, anchor: 'middle' })
      c.text(350, 192, l('Проверка', 'Check'), A, { size: 12, w: 700, anchor: 'middle' })
      c.text(570, 192, l('Агент', 'Agent'), A, { size: 12, w: 700, anchor: 'middle' })
      c.text(350, 248, l('нарушение возвращается, агент чинит до зелёного', 'a violation returns, the agent fixes it until green'), W, { anchor: 'middle' })
    },
  },
  // Контексты: у каждой границы смысла свой агент и своя модель правил
  contexts: {
    ru: 'У каждого ограниченного контекста свой агент и своя формальная модель правил, а между контекстами только контракты',
    en: 'Each bounded context has its own agent and its own formal model of rules, with only contracts between contexts',
    viewBox: [0, 0, 700, 270],
    draw: (c, l) => {
      const names: [number, string, string][] = [[130, 'Продажи', 'Sales'], [350, 'Доставка', 'Delivery'], [570, 'Оплата', 'Payment']]
      for (const [x, ru, en] of names) {
        const i = c.iso(x, 156, 24); i.tile(-1.5, -1.5, 3, 3, { dash: '5 4', edge: W }); i.agent(-0.6, 0.2, A, 1, ''); i.clipboard(0.8, -0.3, 1.1, A)
        c.text(x, 222, l(ru, en), W, { size: 12, w: 700, anchor: 'middle' }); c.text(x, 238, l('агент и модель', 'agent and model'), M, { anchor: 'middle' })
      }
      c.arrow(206, 160, 274, 160, M, { w: 1.4, dash: '3 3' }); c.arrow(426, 160, 494, 160, M, { w: 1.4, dash: '3 3' })
      c.text(240, 150, l('контракт', 'contract'), M, { size: 10, anchor: 'middle' }); c.text(460, 150, l('контракт', 'contract'), M, { size: 10, anchor: 'middle' })
      const h = c.iso(350, 54, 20); h.tile(-1, -1, 2, 2); h.person(0, 0, M, '')
      c.text(420, 52, l('человек решает, какие правила нужны', 'a person decides which rules matter'), M, { anchor: 'start' })
    },
  },
  // Вводная метафора: фонарик освещает одну дорожку, прожектор — всё поле, и в тени находится жук
  intro: {
    ru: 'Тест освещает одну дорожку, а модель освещает всё поле и находит жука в тени',
    en: 'A test lights one lane, while a model lights the whole field and finds the bug in the shadow',
    viewBox: [0, 0, 700, 250],
    draw: (c, l) => {
      const a = c.iso(175, 112, 28); a.tile(-1.5, -1.5, 3, 3); a.zone(-1.5, -0.3, 3, 0.6, A, { op: 0.5 }); a.path([[-1.3, 0], [1.2, 0]], A, { arrow: true }); a.bug(0.9, 1.0, M)
      const b = c.iso(525, 112, 28); b.tile(-1.5, -1.5, 3, 3); b.zone(-1.5, -1.5, 3, 3, A, { op: 0.28 }); b.bug(0.9, 1.0, W)
      c.badge(560, 100, W, '!', { r: 9 })
      c.text(175, 202, l('Тест', 'Test'), M, { size: 12, w: 700, anchor: 'middle' }); c.text(175, 218, l('одна дорожка, жук в тени', 'one lane, the bug in shadow'), M, { anchor: 'middle' })
      c.text(525, 202, l('Модель', 'Model'), A, { size: 12, w: 700, anchor: 'middle' }); c.text(525, 218, l('всё поле, жук найден', 'the whole field, bug found'), M, { anchor: 'middle' })
    },
  },
  // Как начать с агентом: на одном примере магазина агент пишет два списка требований; логику проверяет Quint, экран проверяет человек
  agent: {
    ru: 'Агент пишет два списка требований. «Деньги не списаны без заказа» проверяет Quint и находит цепочку, где правило ломается. «Понятна ли серая кнопка» проверяет только человек',
    en: 'The agent writes two lists of requirements. “No money charged without an order” is checked by Quint, which finds the chain where the rule breaks. “Is the grey button clear” can be checked only by a person',
    viewBox: [0, 0, 700, 340],
    draw: (c, l) => {
      const g = c.iso(350, 40, 13); g.tile(-1.2, -1.2, 2.4, 2.4); g.agent(0, 0, A, 0.9, '')
      c.text(384, 40, l('агент пишет', 'the agent writes'), A, { size: 12, w: 800, anchor: 'start' }); c.text(384, 56, l('два списка требований', 'two lists of requirements'), A, { size: 12, w: 700, anchor: 'start' })
      c.arrow(322, 56, 150, 112, A, { w: 1.8 }); c.arrow(372, 70, 500, 112, A, { w: 1.8 })
      c.text(110, 24, l('Логика', 'Logic'), A, { size: 15, w: 800 }); c.text(560, 24, l('Экран (UX)', 'Screen (UX)'), M, { size: 15, w: 800 })
      // логика: правило -> Quint -> найденная цепочка
      c.bubble(40, 118, 220, 50, A, { op: 0.14, rx: 12 })
      c.text(150, 139, l('правило:', 'the rule:'), M, { size: 11, w: 600 }); c.text(150, 157, l('деньги не списаны без заказа', 'no money charged without an order'), A, { size: 13, w: 800 })
      c.arrow(150, 172, 150, 196, A, { w: 2.2 })
      const q = c.iso(150, 222, 15); q.tile(-1.5, -1.5, 3, 3); q.cyl(0, 0, 0, 0.9, 1.1, A)
      c.text(150, 262, l('Quint перебирает все ходы', 'Quint tries every move'), A, { size: 12, w: 800 })
      c.arrow(214, 222, 262, 222, A, { w: 2.2 })
      const r = c.iso(310, 222, 14); r.tile(-1.3, -1.3, 2.6, 2.6); r.box(-0.5, -0.5, 0, 1.0, 1.0, 0.8, W); r.bug(0.7, 0.5, W)
      c.text(310, 262, l('нашёл: оплата, сбой,', 'found: payment, failure,'), W, { size: 11.5, w: 700 }); c.text(310, 278, l('деньги ушли без заказа', 'money gone, no order'), W, { size: 11.5, w: 700 })
      // экран: макет с серой кнопкой -> человек
      c.rect(410, 118, 150, 100, { rx: 10, fill: 'var(--bg, #fff)', stroke: M, sw: 1.8 })
      c.rect(410, 118, 150, 20, { rx: 10, fill: M, fillOp: 0.3, stroke: M, sw: 1.8 })
      c.rect(436, 164, 98, 30, { rx: 7, fill: M, fillOp: 0.18, stroke: M, sw: 1.6, dash: '4 3' })
      c.text(485, 183, l('Оплатить', 'Pay'), M, { size: 12, w: 700, op: 0.6 })
      c.text(485, 238, l('кнопка серая, причины нет', 'the button is grey, no reason'), W, { size: 11.5, w: 700 })
      c.arrow(566, 168, 604, 168, M, { w: 2.2 })
      const h = c.iso(640, 172, 13); h.tile(-1.3, -1.3, 2.6, 2.6); h.person(0, 0, M, '')
      c.badge(658, 140, W, '?', { r: 11 })
      c.text(640, 262, l('понятно ли?', 'is it clear?'), M, { size: 12.5, w: 800 }); c.text(640, 278, l('решает человек', 'a person decides'), M, { size: 11.5, w: 600 })
      c.line([[380, 108], [380, 292]], W, { w: 2, dash: '6 5' })
      c.text(350, 322, l('две отдельные просьбы и две разные проверки', 'two separate requests and two different checks'), W, { size: 13.5, w: 800 })
    },
  },
}
export default scenes
