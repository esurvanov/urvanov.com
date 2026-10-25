// Схемы поста «Quint против тестовых движков и TLA+». Каждая схема — одна мысль: два разных инструмента, код есть или нет,
// порог входа, общий движок, выбор двери. Цвета по ролям: серый — человек и код, синий — модель и агент, оранжевый — граница.
import { type Scene, A, M, W } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Два похожих названия: QUnit проверяет функцию на заданном входе, Quint проверяет правила на всех цепочках ходов
  names: {
    ru: 'QUnit проверяет готовую функцию: вход, ответ, галочка. Quint проверяет правила: перебирает цепочки ходов и находит ту, где деньги ушли без заказа',
    en: 'QUnit checks a finished function: input, answer, tick. Quint checks rules: it tries chains of moves and finds the one where money goes without an order',
    viewBox: [0, 0, 700, 290],
    draw: (c, l) => {
      c.text(175, 24, 'QUnit', M, { size: 15, w: 800 }); c.text(525, 24, 'Quint', A, { size: 15, w: 800 })
      c.badge(350, 112, M, '≠', { r: 14 })
      const item = (x: number, y: number, kind: 'doc' | 'box' | 'tick' | 'bad', col: string, ru: string, en: string) => {
        const i = c.iso(x, y, 15); i.tile(-1.3, -1.3, 2.6, 2.6)
        if (kind === 'box') i.box(-0.5, -0.5, 0, 1.0, 1.0, 0.8, col)
        else if (kind === 'bad') { i.box(-0.5, -0.5, 0, 1.0, 1.0, 0.8, col); i.bug(0.7, 0.5, W) }
        else i.doc(-0.7, -0.5, 0, 1.4, 1.0, col, 2, kind === 'tick')
        l(ru, en).split('|').forEach((line, k) => c.text(x, y + 44 + k * 15, line, col, { size: 11.5, w: 700 }))
      }
      item(52, 112, 'doc', M, 'вход:|1 и 2', 'input:|1 and 2'); item(165, 112, 'box', M, 'функция|сложения', 'the add|function'); item(278, 112, 'tick', A, 'ответ 3:|верно', 'answer 3:|right')
      c.arrow(82, 112, 135, 112, M, { w: 2 }); c.arrow(195, 112, 248, 112, M, { w: 2 })
      item(422, 112, 'box', A, 'оплата', 'payment'); item(536, 112, 'box', M, 'сбой|связи', 'connection|lost'); item(650, 112, 'bad', W, 'деньги ушли,|заказа нет', 'money gone,|no order')
      c.arrow(452, 112, 506, 112, A, { w: 2 }); c.arrow(566, 112, 620, 112, W, { w: 2 })
      c.text(175, 232, l('проверяет функцию на заданном входе', 'checks a function on a given input'), M, { size: 12.5, w: 800 })
      c.text(525, 232, l('проверяет правила на всех цепочках ходов', 'checks rules on every chain of moves'), A, { size: 12.5, w: 800 })
      c.text(175, 254, l('один сценарий, который вы придумали', 'one scenario that you thought up'), M, { size: 11.5, w: 600 })
      c.text(525, 254, l('в том числе те, о которых никто не подумал', 'including those nobody thought of'), M, { size: 11.5, w: 600 })
      c.line([[350, 44], [350, 268]], M, { w: 1.4, dash: '5 5', op: 0.5 })
    },
  },
  // Развилка в магазине: тест проходит одну дорогу, которую придумали, модель обходит обе и находит дорогу, где деньги ушли, а заказа нет
  when: {
    ru: 'После оплаты в магазине две дороги: заказ создан или оборвалась связь и деньги ушли без заказа. Тест проходит только первую, которую придумали. Модель обходит обе и находит вторую',
    en: 'After payment a shop has two roads: the order is created, or the connection drops and the money goes without an order. A test walks only the first one, the one it was made for. A model walks both and finds the second',
    viewBox: [0, 0, 700, 330],
    draw: (c, l) => {
      c.text(175, 24, l('Тест', 'A test'), M, { size: 14, w: 800 }); c.text(525, 24, 'Quint', A, { size: 14, w: 800 })
      const panel = (L: number, model: boolean) => {
        const s0 = c.iso(L + 56, 150, 20); s0.tile(-1.3, -1.3, 2.6, 2.6); s0.person(0, 0, M, '')
        c.text(L + 56, 204, l('оплата', 'payment'), M, { size: 12, w: 800 })
        const up = c.iso(L + 262, 90, 20); up.tile(-1.3, -1.3, 2.6, 2.6); up.box(-0.5, -0.5, 0, 1.0, 1.0, 0.7, A); up.doc(-0.35, -0.35, 0.7, 0.7, 0.7, A, 1, true)
        c.text(L + 262, 132, l('заказ создан', 'order created'), A, { size: 12, w: 800 })
        const dn = c.iso(L + 262, 222, 20); dn.tile(-1.3, -1.3, 2.6, 2.6, model ? {} : { dash: '4 3' }); dn.cyl(-0.3, 0, 0, 0.5, 0.25, model ? W : M); dn.cyl(-0.3, 0, 0.25, 0.5, 0.25, model ? W : M)
        if (model) dn.bug(0.7, 0.5, W)
        c.text(L + 262, 266, l('деньги ушли, заказа нет', 'money gone, no order'), model ? W : M, { size: 12, w: 800 })
        c.arrow(L + 104, 138, L + 208, 98, A, { w: 2.6 })
        c.arrow(L + 104, 164, L + 208, 208, model ? W : M, { w: 2.6, dash: model ? undefined : '5 5', op: model ? 1 : 0.55 })
        c.badge(L + 296, 70, A, '', { r: 11, mark: 'check' })
        if (model) c.badge(L + 296, 200, W, '!', { r: 11 }); else c.badge(L + 296, 200, M, '?', { r: 11 })
        c.text(L + 138, 100, l('прошли', 'walked'), A, { size: 11, w: 700 })
        c.text(L + 132, 208, model ? l('прошли', 'walked') : l('не проверяли', 'not checked'), model ? W : M, { size: 11, w: 700 })
      }
      panel(0, false); panel(350, true)
      c.text(175, 296, l('прошёл одну дорогу, которую придумали', 'walked the one road that was thought of'), M, { size: 12.5, w: 800 })
      c.text(525, 296, l('прошла обе и нашла ту, где деньги ушли без заказа', 'walked both and found the one where money goes without an order'), A, { size: 12.5, w: 800 })
      c.line([[350, 40], [350, 280]], M, { w: 1.4, dash: '5 5', op: 0.5 })
    },
  },
  // Одно правило, две записи: на Quint читается как обычный текст, на TLA+ как формула из учебника
  notation: {
    ru: 'Одно и то же правило магазина записано на двух языках: Quint читается как обычный текст, TLA+ выглядит как формула из учебника, и её нужно учить',
    en: 'The same shop rule written in two languages: Quint reads like ordinary text, TLA+ looks like a textbook formula that has to be learned',
    viewBox: [0, 0, 700, 300],
    draw: (c, l) => {
      c.text(350, 22, l('Одно и то же правило, два языка записи', 'The same rule, two languages'), M, { size: 14, w: 800 })
      c.text(350, 42, l('правило: деньги не списаны без заказа', 'the rule: no money charged without an order'), M, { size: 12, w: 600 })
      c.bubble(30, 62, 290, 56, A, { op: 0.14, rx: 12 })
      c.text(175, 97, 'paid implies hasOrder', A, { size: 17, w: 700 })
      c.bubble(380, 62, 290, 56, M, { op: 0.14, rx: 12 })
      c.text(525, 97, '□ ( paid ⇒ ∃ o ∈ Orders )', M, { size: 17, w: 700 })
      c.text(175, 138, l('implies значит «из этого следует»', 'implies means “this leads to”'), A, { size: 11.5, w: 600 })
      c.text(525, 138, l('□ всегда · ⇒ следует · ∃ существует · ∈ входит в', '□ always · ⇒ leads to · ∃ exists · ∈ belongs to'), M, { size: 11.5, w: 600 })
      const a = c.iso(175, 200, 24); a.tile(-1.4, -1.4, 2.8, 2.8); a.person(0, 0, M, '')
      c.badge(203, 172, A, '', { r: 11, mark: 'check' })
      const b = c.iso(525, 200, 24); b.tile(-1.4, -1.4, 2.8, 2.8); b.person(0, 0, M, '')
      c.badge(553, 172, W, '?', { r: 11 })
      c.text(175, 252, l('Quint: читается почти как текст', 'Quint: reads almost like text'), A, { size: 13, w: 800 }); c.text(175, 272, l('понятно без подготовки', 'clear without preparation'), M, { size: 12, w: 600 })
      c.text(525, 252, l('TLA+ и Alloy: как формула', 'TLA+ and Alloy: like a formula'), M, { size: 13, w: 800 }); c.text(525, 272, l('сначала нужно выучить знаки', 'the symbols have to be learned first'), M, { size: 12, w: 600 })
      c.line([[350, 130], [350, 285]], M, { w: 1.4, dash: '5 5', op: 0.5 })
    },
  },
  // Две записи, две проверяющие программы, один результат
  engine: {
    ru: 'И Quint, и TLA+ проверяют одни и те же две программы: TLC перебирает состояния по одному, Apalache рассуждает обо всех сразу; результат один: цепочка шагов до нарушения',
    en: 'Both Quint and TLA+ are checked by the same two programs: TLC goes through states one by one, Apalache reasons about all at once; the result is one: a chain of steps to the violation',
    viewBox: [0, 0, 700, 340],
    draw: (c, l) => {
      c.text(100, 22, l('Что пишут', 'What is written'), M, { size: 12, w: 700 }); c.text(350, 22, l('Чем проверяют', 'What checks'), M, { size: 12, w: 700 }); c.text(600, 22, l('Что получают', 'What comes out'), M, { size: 12, w: 700 })
      const sheet = (y: number, col: string, n: string) => { const i = c.iso(100, y, 17); i.tile(-1.5, -1.5, 3, 3); i.doc(-0.8, -0.7, 0, 1.6, 1.3, col, 3); c.text(100, y + 42, n, col, { size: 13, w: 800 }) }
      sheet(80, A, 'Quint'); sheet(240, M, 'TLA+')
      const mach = (y: number, col: string, n: string, d: string, de: string) => { const i = c.iso(350, y, 19); i.tile(-1.5, -1.5, 3, 3); i.cyl(0, 0, 0, 0.9, 1.1, col); c.text(350, y + 46, n, col, { size: 14, w: 800 }); c.text(350, y + 64, l(d, de), M, { size: 11.5, w: 600 }) }
      mach(80, M, 'TLC', 'перебирает состояния по одному', 'goes through states one by one'); mach(240, A, 'Apalache', 'рассуждает обо всех сразу', 'reasons about all at once')
      c.arrow(150, 76, 296, 76, M, { w: 1.8, dash: '5 4' }); c.text(222, 66, l('через перевод в TLA+', 'via translation to TLA+'), M, { size: 10.5, w: 600 })
      c.arrow(146, 98, 300, 222, A, { w: 2 })
      c.arrow(146, 222, 300, 98, M, { w: 2 })
      c.arrow(150, 244, 296, 244, A, { w: 2 })
      const o = c.iso(600, 160, 21); o.tile(-1.5, -1.5, 3, 3); o.doc(-0.8, -0.7, 0, 1.6, 1.3, W, 3); o.bug(0.7, 0.6, W)
      c.arrow(404, 84, 540, 140, M, { w: 2 }); c.arrow(404, 232, 540, 180, A, { w: 2 })
      c.text(600, 212, l('нарушение правила', 'a rule violation'), W, { size: 12.5, w: 800 }); c.text(600, 230, l('и цепочка шагов до него', 'and the chain of steps to it'), M, { size: 11.5, w: 600 })
      c.text(350, 326, l('оба языка проверяют одни и те же две программы', 'both languages are checked by the same two programs'), M, { size: 12.5, w: 700 })
    },
  },
  // Зрелость: полоса — сколько лет существует; чем длиннее, тем дольше язык или программа живёт
  maturity: {
    ru: 'Сколько лет существует: Alloy 29, TLA+ 27, Apalache 11, Quint 5. Чем длиннее полоса, тем дольше живёт язык или программа',
    en: 'How many years they exist: Alloy 29, TLA+ 27, Apalache 11, Quint 5. The longer the bar, the longer the language or program has lived',
    viewBox: [0, 0, 700, 270],
    draw: (c, l) => {
      const X = (y: number) => 200 + ((y - 1995) / 31) * 400
      const rows: [number, string, string, number, string][] = [[56, 'Alloy', 'Alloy', 1997, M], [108, 'TLA+', 'TLA+', 1999, M], [160, 'Apalache', 'Apalache', 2015, M], [212, 'Quint', 'Quint', 2021, A]]
      c.line([[X(2026), 28], [X(2026), 240]], W, { w: 1.6, dash: '5 4', op: 0.8 }); c.text(X(2026), 20, l('2026, сегодня', '2026, today'), W, { size: 11.5, w: 700 })
      for (const [y, ru, en, from, col] of rows) {
        c.text(24, y + 5, l(ru, en), col, { size: 15, w: 800, anchor: 'start' }); c.text(24, y + 22, l(`с ${from} года`, `since ${from}`), M, { size: 11.5, w: 600, anchor: 'start' })
        c.rect(X(from), y - 13, X(2026) - X(from), 26, { rx: 7, fill: col, fillOp: 0.35, stroke: col, sw: 1.6 })
        c.text(X(2026) + 12, y + 6, l(`${2026 - from} лет`, `${2026 - from} years`), col, { size: 15, w: 800, anchor: 'start' })
      }
    },
  },
  // Выбор: человек с задачей перед тремя дверями
  choose: {
    ru: 'Тест выбирают для проверки готовой функции, Quint для правил продукта, а TLA+ для тяжёлых доказательств',
    en: 'A test is for checking a finished function, Quint for product rules, and TLA+ for heavy proofs',
    viewBox: [0, 0, 700, 280],
    draw: (c, l) => {
      const h = c.iso(350, 50, 18); h.tile(-1, -1, 2, 2); h.person(0, 0, M, '')
      c.badge(392, 36, M, '?', { r: 10 })
      const doors: [number, string, string, string, string, string][] = [
        [130, 'Тест', 'Test', 'готовая функция', 'a finished function', M],
        [350, 'Quint', 'Quint', 'правила продукта', 'product rules', A],
        [570, 'TLA+', 'TLA+', 'тяжёлые доказательства', 'heavy proofs', M],
      ]
      for (const [x, ru, en, dru, den, col] of doors) {
        const i = c.iso(x, 176, 24); i.tile(-1.5, -1.5, 3, 3); i.door(0, 0, 1.3, col)
        c.text(x, 242, l(ru, en), col, { size: 12, w: 700, anchor: 'middle' }); c.text(x, 258, l(dru, den), M, { anchor: 'middle' })
        c.arrow(350 + (x - 350) * 0.3, 96, x, 118, col === A ? A : M, { w: 1.6, op: col === A ? 1 : 0.6 })
      }
    },
  },
}
export default scenes
