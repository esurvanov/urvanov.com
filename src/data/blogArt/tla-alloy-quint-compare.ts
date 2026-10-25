// Схемы поста «TLA+, Alloy и Quint». Одна мысль на схему: одно правило и три языка, шаги во времени против связей между объектами,
// выбор двери. Цвета по ролям: серый — запись и данные, синий — инструмент и агент, оранжевый — нарушение.
import { type Canvas, type Scene, A, M, W } from '@/lib/infographic'


// Корзина, оплата, заказ: три площадки подряд со стрелками; bad — сбой на последнем шаге
function steps(c: Canvas, l: (ru: string, en: string) => string, cx: number, y: number, col: string, bad: boolean) {
  const st: [number, string, string][] = [[-115, 'корзина', 'cart'], [0, 'оплата', 'payment'], [115, 'заказ', 'order']]
  st.forEach(([dx, ru, en], i) => {
    const last = bad && i === 2
    const b = c.iso(cx + dx, y, 15); b.tile(-1.2, -1.2, 2.4, 2.4); b.box(-0.5, -0.5, 0, 1.0, 1.0, 0.7, last ? W : col)
    c.text(cx + dx, y + 46, l(ru, en), last ? W : col, { size: 12.5, w: 800 })
    if (i < 2) c.arrow(cx + dx + 40, y, cx + dx + 74, y, col, { w: 2 })
  })
}
// Сотрудник и два начальника: один снимок связей, оранжевые стрелки — нарушенное правило
function alloySnapshot(c: Canvas, l: (ru: string, en: string) => string, cx: number, y: number, U: number) {
  const o = c.iso(cx, y, U); o.tile(-2.2, -2.2, 4.4, 4.4)
  o.path([[-0.9, 1.5], [0.4, 1.5]], W, { w: 2.2, arrow: true }); o.path([[1.5, -0.9], [1.5, 0.4]], W, { w: 2.2, arrow: true })
  o.person(-1.5, 1.5, M, l('начальник', 'boss')); o.person(1.5, -1.5, M, l('начальник', 'boss')); o.person(1.5, 1.5, M, l('сотрудник', 'employee'))
}

const scenes: Record<string, Scene> = {
  // Одно правило записывают на трёх языках
  trio: {
    ru: 'Одну и ту же задачу решают три языка: TLA+ и Quint описывают шаги во времени, Alloy описывает объекты и связи, а Quint записывается как обычный код',
    en: 'Three languages solve the same task: TLA+ and Quint describe steps in time, Alloy describes objects and links, and Quint is written like ordinary code',
    viewBox: [0, 0, 700, 330],
    draw: (c, l) => {
      c.text(350, 24, l('одна задача: описать правила и найти, где они нарушаются', 'one task: describe the rules and find where they break'), M, { size: 13.5, w: 800 })
      const cols: [number, string, string, string, string, string][] = [
        [120, 'TLA+', 'шаги во времени', 'steps in time', 'запись формулами', 'written in formulas'],
        [350, 'Alloy', 'объекты и связи', 'objects and links', 'запись формулами', 'written in formulas'],
        [580, 'Quint', 'шаги во времени', 'steps in time', 'запись как код', 'written like code'],
      ]
      for (const [x, n, d1, d1e, d2, d2e] of cols) {
        const col = n === 'Quint' ? A : M
        const i = c.iso(x, 130, 22); i.tile(-1.5, -1.5, 3, 3); i.doc(-0.8, -0.7, 0, 1.6, 1.3, col, 3, n === 'Quint')
        c.text(x, 202, n, col, { size: 15, w: 800 }); c.text(x, 224, l(d1, d1e), M, { size: 12.5, w: 700 }); c.text(x, 244, l(d2, d2e), col, { size: 12.5, w: 700 })
      }
      c.text(350, 300, l('у всех троих на выходе: найденное нарушение правила', 'all three output: a found violation of a rule'), W, { size: 12.5, w: 800 })
    },
  },
  // Шаги во времени против связей между объектами
  kinds: {
    ru: 'TLA+ и Quint описывают, что происходит одно за другим: корзина, оплата, заказ. Alloy описывает, кто с кем связан: у сотрудника два начальника',
    en: 'TLA+ and Quint describe what happens one after another: cart, payment, order. Alloy describes who is linked to whom: an employee with two bosses',
    viewBox: [0, 0, 700, 300],
    draw: (c, l) => {
      c.text(175, 26, 'TLA+ / Quint', A, { size: 14, w: 800 }); c.text(525, 26, 'Alloy', M, { size: 14, w: 800 })
      steps(c, l, 175, 120, A, false)
      alloySnapshot(c, l, 525, 100, 26)
      c.text(175, 226, l('что происходит одно за другим', 'what happens one after another'), A, { size: 12.5, w: 800 })
      c.text(525, 226, l('кто с кем связан', 'who is linked to whom'), M, { size: 12.5, w: 800 })
      c.text(525, 250, l('у сотрудника два начальника', 'an employee has two bosses'), W, { size: 12, w: 700 })
      c.line([[350, 44], [350, 268]], M, { w: 1.4, dash: '5 5', op: 0.5 })
    },
  },
  // Пара: TLA+ и Alloy
  'tla-vs-alloy': {
    ru: 'TLA+ показывает цепочку шагов: корзина, оплата, заказ, и где в ней сбой. Alloy показывает один снимок: сотрудник с двумя начальниками',
    en: 'TLA+ shows a chain of steps: cart, payment, order, and where it fails. Alloy shows one snapshot: an employee with two bosses',
    viewBox: [0, 0, 700, 300],
    draw: (c, l) => {
      c.text(175, 26, 'TLA+', M, { size: 15, w: 800 }); c.text(525, 26, 'Alloy', M, { size: 15, w: 800 })
      steps(c, l, 175, 120, M, true)
      alloySnapshot(c, l, 525, 100, 26)
      c.text(175, 232, l('цепочка шагов', 'a chain of steps'), M, { size: 13.5, w: 800 })
      c.text(525, 232, l('один снимок', 'one snapshot'), M, { size: 13.5, w: 800 })
      c.text(175, 256, l('где в цепочке сбой', 'where the chain fails'), W, { size: 12.5, w: 700 })
      c.text(525, 256, l('где нарушено правило', 'where the rule is broken'), W, { size: 12.5, w: 700 })
      c.line([[350, 44], [350, 270]], M, { w: 1.4, dash: '5 5', op: 0.5 })
    },
  },
  // Пара: TLA+ и Quint
  'tla-vs-quint': {
    ru: 'TLA+ и Quint описывают одну и ту же цепочку: корзина, оплата, заказ. TLA+ записывает её формулами, Quint кодом. Проверяют обе записи одни и те же программы, TLC и Apalache',
    en: 'TLA+ and Quint describe the same chain: cart, payment, order. TLA+ writes it in formulas, Quint in code. The same programs check both, TLC and Apalache',
    viewBox: [0, 0, 700, 340],
    draw: (c, l) => {
      const d1 = c.iso(90, 100, 22); d1.tile(-1.2, -1.2, 2.4, 2.4); d1.doc(-0.8, -0.65, 0, 1.6, 1.3, M, 4)
      const d2 = c.iso(610, 100, 22); d2.tile(-1.2, -1.2, 2.4, 2.4); d2.doc(-0.8, -0.65, 0, 1.6, 1.3, A, 4, true)
      c.text(90, 176, 'TLA+', M, { size: 15, w: 800 }); c.text(90, 196, l('формулы', 'formulas'), M, { size: 12.5, w: 700 })
      c.text(610, 176, 'Quint', A, { size: 15, w: 800 }); c.text(610, 196, l('код', 'code'), A, { size: 12.5, w: 700 })
      steps(c, l, 350, 100, M, false)
      c.arrow(150, 100, 216, 100, M, { w: 2 }); c.arrow(550, 100, 484, 100, A, { w: 2 })
      c.arrow(120, 214, 270, 262, M, { w: 2 }); c.arrow(580, 214, 430, 262, A, { w: 2 })
      c.lens(350, 252, M)
      c.pill(262, 270, 80, 28, M); c.text(302, 289, 'TLC', M, { size: 13, w: 800 })
      c.pill(358, 270, 100, 28, M); c.text(408, 289, 'Apalache', M, { size: 13, w: 800 })
      c.text(350, 326, l('обе записи проверяют одни и те же программы', 'the same programs check both'), M, { size: 12.5, w: 800 })
    },
  },
  // Пара: Alloy и Quint
  'alloy-vs-quint': {
    ru: 'Alloy проверяет один снимок, сотрудника с двумя начальниками, своей программой Alloy Analyzer. Quint проверяет цепочку шагов, корзина, оплата, заказ, программами TLC и Apalache',
    en: 'Alloy checks one snapshot, an employee with two bosses, with its own program Alloy Analyzer. Quint checks a chain of steps, cart, payment, order, with the programs TLC and Apalache',
    viewBox: [0, 0, 700, 330],
    draw: (c, l) => {
      c.text(175, 26, 'Alloy', M, { size: 15, w: 800 }); c.text(525, 26, 'Quint', A, { size: 15, w: 800 })
      alloySnapshot(c, l, 175, 100, 26)
      steps(c, l, 525, 120, A, false)
      c.text(175, 226, l('один снимок', 'one snapshot'), M, { size: 13.5, w: 800 })
      c.text(525, 226, l('цепочка шагов', 'a chain of steps'), A, { size: 13.5, w: 800 })
      c.lens(175, 256, M); c.pill(80, 274, 190, 28, M); c.text(175, 293, 'Alloy Analyzer', M, { size: 13, w: 800 })
      c.lens(525, 256, A); c.pill(425, 274, 80, 28, A); c.text(465, 293, 'TLC', A, { size: 13, w: 800 })
      c.pill(515, 274, 100, 28, A); c.text(565, 293, 'Apalache', A, { size: 13, w: 800 })
      c.line([[350, 44], [350, 312]], M, { w: 1.4, dash: '5 5', op: 0.5 })
    },
  },
  // Выбор
  choose: {
    ru: 'Правила продукта во времени и команда без математики: Quint. Строгие доказательства для сложных систем: TLA+. Устройство данных и права доступа: Alloy',
    en: 'Product rules over time and a team without maths: Quint. Strict proofs for complex systems: TLA+. The structure of data and access rights: Alloy',
    viewBox: [0, 0, 700, 330],
    draw: (c, l) => {
      const h = c.iso(350, 50, 18); h.tile(-1, -1, 2, 2); h.person(0, 0, M, '')
      c.badge(392, 36, M, '?', { r: 10 })
      const doors: [number, string, string, string, string, string, string][] = [
        [120, 'Quint', 'Quint', 'правила продукта во времени', 'product rules over time', 'команда без математики', 'a team without maths'],
        [350, 'TLA+', 'TLA+', 'строгие доказательства', 'strict proofs', 'сложные системы', 'complex systems'],
        [580, 'Alloy', 'Alloy', 'устройство данных', 'the structure of data', 'права доступа', 'access rights'],
      ]
      for (const [x, n, , d1, d1e, d2, d2e] of doors) {
        const col = n === 'Quint' ? A : M
        const i = c.iso(x, 176, 22); i.tile(-1.5, -1.5, 3, 3); i.door(0, 0, 1.3, col)
        c.text(x, 238, n, col, { size: 14, w: 800 }); c.text(x, 258, l(d1, d1e), M, { size: 12, w: 700 }); c.text(x, 276, l(d2, d2e), M, { size: 12, w: 600 })
        c.arrow(350 + (x - 350) * 0.3, 96, x, 118, col === A ? A : M, { w: 1.8, op: col === A ? 1 : 0.6 })
      }
    },
  },
}
export default scenes
