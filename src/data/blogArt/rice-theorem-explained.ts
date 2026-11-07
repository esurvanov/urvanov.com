// Схемы поста «Теорема Райса простыми словами». Развилка CAP и проверки: пока время не ограничено, есть ровно два
// взаимоисключающих выхода — ждать или ответить сейчас; ограничение времени снимает развилку только для проверки программ.
// Цвета по ролям: серый — данные и вопрос, синий — проверка и верный ответ, оранжевый — риск (нет ответа или неверный ответ).
import { type Scene, A, M, W, S2 } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Три свойства проверки (верх) и что получается, если уступить в одном (низ). Все три сразу — проверяющего нет
  conditions: {
    ru: 'Проверка читает правку кода оплаты и отвечает, спишет ли та деньги без заказа. Верной проверке нужны три свойства: ответ про поведение, про любую правку и ответ всегда, без «не знаю». Все три сразу невозможны. Убрать одно: спросить про текст кода, проверять маленькую модель или отдавать трудное человеку',
    en: 'A check reads an edit to the payment code and answers whether it will charge money without an order. A correct check would need three properties: an answer about behaviour, about any edit and always an answer, no “don’t know”. All three at once are impossible. Remove one: ask about the code text, check a small model, or hand hard cases to a person',
    viewBox: [0, 0, 700, 390],
    // Легенда общего словаря («агент и харнесс») здесь не к месту: синее — проверка, оранжевое — запрет
    legend: false,
    draw: (c, l) => {
      const X = [115, 350, 585]
      // Задача: проверяющий смотрит программу и отвечает на вопрос
      const q = c.iso(250, 40, 16); q.agent(-0.6, -0.6, A, 1.2, '')
      c.arrow(282, 40, 318, 40, A, { w: 2 })
      const qd = c.iso(345, 42, 18); qd.doc(-0.6, -0.45, 0, 1.2, 0.9, M, 2)
      c.badge(392, 40, W, '?', { r: 11 })
      c.text(412, 45, l('спишет без заказа?', 'charges without an order?'), M, { size: 12, w: 800, anchor: 'start' })
      const head: [string, string][] = [['про поведение', 'about behaviour'], ['любая правка', 'any edit'], ['ответ всегда', 'always an answer']]
      const foot: [string, string][] = [['текст кода', 'code text'], ['маленькая модель', 'a small model'], ['«не знаю» → человеку', '“don’t know” → a person']]
      // Колонка свойства k — группа bk bkk: вкладка k (../blocks/defs/pick-tabs) или наведение на колонку k таблицы #rice-wishes оставляет её яркой
      const col = (k: number, top: () => void, bottom: () => void) => c.group(`bk bk${k + 1}`, () => {
        c.badge(X[k] - 66, 96, M, String(k + 1), { r: 10 }); c.text(X[k] - 50, 101, l(head[k][0], head[k][1]), M, { size: 13, w: 800, anchor: 'start' })
        top(); c.arrow(X[k], 256, X[k], 278, A, { w: 2 }); bottom()
        c.text(X[k], 362, l(foot[k][0], foot[k][1]), A, { size: 12, w: 800 })
      })
      // 1. Запуски: веер в бесконечность → текст кода, конечный и проверенный
      col(0, () => {
        const a = c.iso(70, 150, 20); a.doc(-0.6, -0.45, 0, 1.2, 0.9, M, 2)
        for (let k = 0; k < 5; k++) c.line([[92, 150], [168, 118 + k * 16]], W, { w: 1.6, op: k === 4 ? 0.5 : 0.9, dash: k === 4 ? '3 4' : undefined })
        c.text(182, 186, '∞', W, { size: 16, w: 800 })
      }, () => {
        const d = c.iso(108, 312, 22); d.doc(-0.7, -0.5, 0, 1.4, 1.0, A, 3)
        c.badge(150, 304, A, '', { mark: 'check', r: 10 })
      })
      // 2. Любая программа, среди них написанная против проверки → маленькая модель, все варианты перебраны
      col(1, () => {
        const b = c.iso(350, 150, 18)
        for (let k = 0; k < 4; k++) b.doc(-3.2 + k * 1.35, -0.4, 0, 1.1, 0.8, M, 2)
        b.doc(-3.2 + 4 * 1.35, -0.4, 0, 1.1, 0.8, W, 2)
        c.text(412, 196, l('против проверки', 'against the check'), W, { size: 11, w: 800 })
      }, () => { for (let r = 0; r < 3; r++) c.dotRow(300, 298 + r * 15, 5, 5, A, { gap: 25, r: 5 }) })
      // 3. Только «да» или «нет», «не знаю» запрещено → «не знаю» уходит человеку
      col(2, () => {
        c.badge(545, 150, A, '', { mark: 'check', r: 14 }); c.badge(585, 150, M, '', { mark: 'cross', r: 14 })
        c.badge(625, 150, S2, '?', { r: 14 }); c.line([[611, 164], [639, 136]], W, { w: 2.4 })
      }, () => {
        c.badge(555, 314, W, '?', { r: 14 }); c.arrow(574, 314, 598, 314, M, { w: 1.6 })
        const e = c.iso(614, 320, 20); e.person(0, 0, M, '')
      })
      // Все три сразу — нельзя
      c.rect(120, 218, 460, 32, { rx: 10, fill: W, fillOp: 0.1, stroke: W, sw: 1.6 })
      c.text(350, 239, l('все три сразу — нельзя', 'all three at once: impossible'), W, { size: 13, w: 800 })
      c.text(X[1] + 12, 272, l('убрать одно', 'remove one'), A, { size: 10.5, w: 700, anchor: 'start' })
    },
  },
  // Треугольник трёх свойств: в вершинах свойства, на сторонах выходы (пара свойств без третьего), в центре — все три нельзя
  triangle: {
    ru: 'Треугольник: в вершинах три свойства проверки, все три сразу нельзя. Выбранная сторона — пара свойств, которую оставляем; от вершины напротив отказываемся',
    en: 'A triangle: the three properties of a check at the corners, all three at once impossible. The chosen side is the pair we keep; the opposite corner is given up',
    viewBox: [0, 0, 700, 400],
    legend: false,
    draw: (c, l) => {
      const P: [number, number][] = [[350, 70], [150, 318], [550, 318]]
      const lab: [string, string, number][] = [['про поведение', 'about behaviour', -24], ['любая правка', 'any edit', 36], ['ответ всегда', 'always an answer', 36]]
      // Вкладка n (../blocks/defs/pick-tabs) — сторона без вершины n-1: яркие части с классом bkn, слой hl виден только у выбранной
      const keep: [number, number][] = [[1, 2], [0, 2], [0, 1]]
      c.group('bk bk1', () => { c.line([P[1], P[2]], A, { w: 3 }); c.text(350, 352, l('текст кода', 'code text'), A, { size: 13, w: 800 }) })
      c.group('bk bk2', () => { c.line([P[0], P[2]], A, { w: 3 }); c.text(472, 190, l('маленькая модель', 'a small model'), A, { size: 13, w: 800, anchor: 'start' }) })
      c.group('bk bk3', () => { c.line([P[0], P[1]], A, { w: 3 }); c.text(228, 190, l('«не знаю» → человеку', '“don’t know” → a person'), A, { size: 13, w: 800, anchor: 'end' }) })
      // Ободок «оставляем» под вершинами выбранной пары
      keep.forEach((pair, k) => c.group(`bk bk${k + 1}`, () => c.group('hl', () => pair.forEach((v) => {
        const [x, y] = P[v]; c.badge(x, y, A, '', { r: 20 })
        c.text(x, y + lab[v][2] + (lab[v][2] < 0 ? -18 : 18), l('оставляем', 'keep'), A, { size: 11, w: 800 })
      }))))
      const vcls = ['bk bk2 bk3', 'bk bk1 bk3', 'bk bk1 bk2']
      P.forEach(([x, y], v) => c.group(vcls[v], () => { c.badge(x, y, M, String(v + 1), { r: 14 }); c.text(x, y + lab[v][2], l(lab[v][0], lab[v][1]), M, { size: 13, w: 800 }) }))
      // Крестик «отказываемся» на вершине напротив выбранной стороны
      ;[0, 1, 2].forEach((v) => c.group(`bk bk${v + 1}`, () => c.group('hl', () => {
        const [x, y] = P[v]; c.badge(x, y, W, '', { mark: 'cross', r: 15 })
        c.text(x, y + lab[v][2] + (lab[v][2] < 0 ? -18 : 18), l('отказываемся', 'give up'), W, { size: 11, w: 800 })
      })))
      c.badge(350, 216, W, '', { mark: 'cross', r: 16 })
      c.text(350, 256, l('все три — нельзя', 'all three: impossible'), W, { size: 12.5, w: 800 })
    },
  },
  // Выход 2: правила оплаты на малых числах, перебор всех порядков событий; код и большие числа — за пределами модели
  'small-model': {
    ru: 'Короткая запись правил оплаты для 3 заказов и 2 клиентов. Программа перебирает все порядки событий до конца: либо правило держится, либо находится цепочка шагов к нарушению. Код и большие числа остаются за пределами модели',
    en: 'A short description of the payment rules for 3 orders and 2 customers. A program tries every order of events to the end: either the rule holds or a chain of steps to a breach is found. The code and large numbers stay outside the model',
    viewBox: [0, 0, 700, 290],
    draw: (c, l) => {
      const d = c.iso(90, 118, 22); d.doc(-0.7, -0.5, 0, 1.4, 1.0, A, 3)
      c.text(90, 168, l('правила оплаты', 'payment rules'), A, { size: 12, w: 800 })
      c.text(90, 186, l('3 заказа · 2 клиента', '3 orders · 2 customers'), M, { size: 11, w: 700 })
      c.arrow(150, 118, 205, 118, A, { w: 2 })
      c.text(330, 52, l('все порядки событий', 'every order of events'), M, { size: 11.5, w: 800 })
      for (let r = 0; r < 4; r++) c.dotRow(240, 76 + r * 28, 6, 6, A, { gap: 26, r: 6 })
      c.badge(318, 132, W, '', { r: 7 })
      c.text(330, 196, l('перебрано до конца', 'tried to the end'), A, { size: 11.5, w: 800 })
      c.arrow(420, 118, 470, 118, A, { w: 2 })
      c.badge(492, 88, A, '', { mark: 'check', r: 12 }); c.text(512, 92, l('правило держится', 'the rule holds'), A, { size: 12, w: 800, anchor: 'start' })
      c.badge(492, 148, W, '!', { r: 12 }); c.text(512, 152, l('цепочка шагов к нарушению', 'a chain of steps to a breach'), W, { size: 12, w: 800, anchor: 'start' })
      c.rect(120, 226, 460, 34, { rx: 10, fill: M, fillOp: 0.06, stroke: M, sw: 1.2, dash: '5 4' })
      c.text(350, 248, l('за пределами модели: сам код и тысячи заказов', 'outside the model: the code itself and thousands of orders'), M, { size: 12, w: 700 })
    },
  },
  // Выход 3: проверка смотрит любую правку, но у неё три ответа; «не знаю» уходит человеку
  human: {
    ru: 'Проверка смотрит любую правку и отвечает одним из трёх: «соблюдено» — правка проходит, «нарушено» — блокируется, «не знаю» — правку смотрит человек',
    en: 'The check looks at any edit and gives one of three answers: “holds” lets the edit through, “broken” blocks it, “don’t know” sends it to a person',
    viewBox: [0, 0, 700, 270],
    draw: (c, l) => {
      const d = c.iso(80, 135, 22); d.doc(-0.7, -0.5, 0, 1.4, 1.0, M, 3)
      c.text(80, 184, l('любая правка', 'any edit'), M, { size: 12, w: 800 })
      c.arrow(135, 135, 190, 135, M, { w: 2 })
      const q = c.iso(232, 135, 20); q.agent(-0.65, -0.65, A, 1.3, '')
      c.text(232, 184, l('проверка', 'the check'), A, { size: 12, w: 800 })
      const ys = [62, 135, 208]
      ys.forEach((y) => c.arrow(272, 135, 340, y, M, { w: 1.6 }))
      c.badge(362, 62, A, '', { mark: 'check', r: 13 }); c.text(384, 66, l('соблюдено → проходит', 'holds → goes through'), A, { size: 12.5, w: 800, anchor: 'start' })
      c.badge(362, 135, M, '', { mark: 'cross', r: 13 }); c.text(384, 139, l('нарушено → блок', 'broken → blocked'), M, { size: 12.5, w: 800, anchor: 'start' })
      c.badge(362, 208, W, '?', { r: 13 }); c.text(384, 212, l('не знаю', 'don’t know'), W, { size: 12.5, w: 800, anchor: 'start' })
      c.arrow(450, 208, 520, 208, W, { w: 1.8 })
      const h = c.iso(552, 214, 20); h.person(0, 0, M, '')
      c.text(578, 212, l('человек', 'a person'), M, { size: 12, w: 800, anchor: 'start' })
    },
  },
  'cap-fork': {
    ru: 'Пока время ожидания не ограничено, выход один из двух: ждать и, возможно, не ответить никогда, или ответить сейчас и, возможно, ошибиться. Ограничение времени снимает развилку для проверки программ, а в сети только убирает неизвестность: связи нет, но данные свежее не стали',
    en: 'While waiting time is unbounded there is one of two ways out: wait and maybe never answer, or answer now and maybe be wrong. Bounding the time removes the fork for program checks, while in a network it only removes the uncertainty: the link is down, but the data is no fresher',
    viewBox: [0, 0, 700, 400],
    draw: (c, l) => {
      // Верх: вопрос при неограниченном времени
      c.text(350, 22, l('время ожидания не ограничено', 'waiting time is unbounded'), M, { size: 12, w: 700 })
      c.card(215, 34, 270, 56, M, { lines: [{ t: l('пришёл ли ответ соседа?', 'has the neighbour answered?'), dy: 23, size: 12.5, w: 800 }, { t: l('закончится ли программа?', 'will the program finish?'), dy: 42, size: 12.5, w: 800 }] })
      c.arrow(300, 92, 175, 130, M, { w: 2 }); c.arrow(400, 92, 525, 130, M, { w: 2 })
      c.text(350, 122, l('выбрать одно из двух', 'pick one of two'), M, { size: 11, w: 700 })
      // Две взаимоисключающие ветки
      c.card(30, 134, 290, 92, W, { lines: [{ t: l('ждать', 'wait'), dy: 24, size: 14, w: 800 }, { t: l('ответ будет верным,', 'the answer will be right,'), dy: 48, size: 11.5, w: 600 }, { t: l('но может не прийти никогда', 'but it may never come'), dy: 66, size: 11.5, w: 700 }] })
      c.card(380, 134, 290, 92, W, { lines: [{ t: l('ответить сейчас', 'answer now'), dy: 24, size: 14, w: 800 }, { t: l('ответ есть всегда,', 'there is always an answer,'), dy: 48, size: 11.5, w: 600 }, { t: l('но может быть неверным', 'but it may be wrong'), dy: 66, size: 11.5, w: 700 }] })
      c.text(350, 186, '×', W, { size: 22, w: 800 })
      c.text(350, 244, l('одно исключает другое', 'one rules out the other'), W, { size: 11.5, w: 700 })
      // Низ: ограничить время — меняет условие, развилки нет
      c.line([[30, 262], [670, 262]], M, { w: 1, op: 0.4, dash: '3 5' })
      c.text(350, 284, l('ограничить время', 'bound the time'), A, { size: 12, w: 800 })
      c.card(110, 298, 480, 86, A, { lines: [{ t: l('ждать не дольше предела', 'wait no longer than a limit'), dy: 26, size: 13, w: 800 }, { t: l('проверка программ: ответ приходит и верный', 'program check: the answer comes and is right'), dy: 50, size: 11.5, w: 700 }, { t: l('сеть: ясно, что связи нет, но данные не свежее', 'network: the link is known down, data no fresher'), dy: 68, size: 11.5, w: 600 }] })
    },
  },
}

export default scenes
