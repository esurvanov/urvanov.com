// Схемы поста «Агент на каждый ограниченный контекст». Одна мысль на схему: слово с тремя смыслами, стопка задач на одном агенте
// против небольших стопок на восьми, острова с контрактами, первый шаг из двух контекстов. Цвета по ролям: серый — смыслы и данные,
// синий — агент, оранжевый — граница и риск.
import { type Scene, A, M, W } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Слева один агент и три смысла слова «заказ»; справа у каждого контекста свой агент и свой смысл
  'one-vs-per-context': {
    ru: 'Слева один агент держит три смысла слова «заказ» и путается. Справа у каждого ограниченного контекста свой агент со своим смыслом',
    en: 'On the left one agent holds three meanings of “order” and gets confused. On the right each bounded context has its own agent with its own meaning',
    viewBox: [0, 0, 700, 280],
    draw: (c, l) => {
      c.text(150, 24, l('Один агент на всё', 'One agent for everything'), M, { size: 13, w: 800 })
      c.text(480, 24, l('Агент на контекст', 'One agent per context'), A, { size: 13, w: 800 })
      const a = c.iso(150, 128, 28); a.tile(-1.8, -1.8, 3.6, 3.6); a.agent(0, 0, A, 1, '')
      const docs: [number, number, string][] = [[-1.5, -1.3, l('корзина', 'cart')], [1.3, -1.3, l('посылка', 'parcel')], [-0.1, 1.5, l('счёт', 'invoice')]]
      for (const [x, y, n] of docs) { a.doc(x - 0.4, y - 0.3, 0, 0.9, 0.7, M, 2); a.text(x, y, n, M, { dy: 20, size: 10, w: 700 }) }
      c.badge(196, 100, W, '?', { r: 11 })
      c.text(150, 252, l('одно слово, три смысла: агент путает', 'one word, three meanings: the agent mixes them up'), W, { size: 12, w: 700 })
      ;[[350, 'продажи', 'sales', 'корзина', 'cart'], [480, 'доставка', 'delivery', 'посылка', 'parcel'], [610, 'оплата', 'payment', 'счёт', 'invoice']].forEach(([x, ru, en, mr, me]) => {
        const i = c.iso(x as number, 134, 19); i.tile(-1.5, -1.5, 3, 3, { dash: '5 4', edge: W }); i.agent(-0.5, 0.2, A, 1, ''); i.doc(0.3, -0.9, 0, 0.9, 0.7, M, 2, true)
        c.text(x as number, 196, l(ru as string, en as string), A, { size: 12, w: 800 }); c.text(x as number, 212, '«' + l('заказ', 'order') + '» = ' + l(mr as string, me as string), M, { size: 10.5, w: 600 })
      })
      c.text(480, 252, l('границы смысла: у каждого агента свой', 'borders of meaning: each agent has its own'), A, { size: 12, w: 700 })
      c.line([[290, 40], [290, 256]], M, { w: 1, op: 0.4, dash: '3 5' })
    },
  },
  // Нагрузка: у одного агента растёт стопка задач, у восьми каждый держит свою небольшую
  'load-chart': {
    ru: 'Когда контекстов восемь, у одного агента вырастает стопка из восьми областей, а у восьми агентов каждый держит одну небольшую стопку',
    en: 'With eight contexts one agent ends up with a stack of eight areas, while eight agents each hold one small stack',
    viewBox: [0, 0, 700, 280],
    draw: (c, l) => {
      c.text(175, 24, l('Один агент, 8 контекстов', 'One agent, 8 contexts'), M, { size: 13, w: 800 })
      c.text(525, 24, l('8 агентов, по контексту на каждого', '8 agents, one context each'), A, { size: 13, w: 800 })
      const a = c.iso(175, 150, 28); a.tile(-1.5, -1.5, 3, 3); a.agent(-0.9, 0.5, A, 1, '')
      for (let k = 0; k < 8; k++) a.doc(0.1, -0.3, k * 0.26, 1.1, 0.8, k > 5 ? W : M, 2)
      c.badge(224, 70, W, '!', { r: 10 })
      c.text(175, 244, l('стопка растёт, агент тонет', 'the stack grows, the agent drowns'), W, { size: 12, w: 700 })
      const b = c.iso(525, 150, 28); b.tile(-1.8, -1.5, 3.6, 3, { dash: '5 4', edge: A })
      for (let r = 0; r < 2; r++) for (let q = 0; q < 4; q++) { const x = -1.35 + q * 0.9, y = -0.7 + r * 1.4; b.agent(x, y, A, 0.6, ''); b.doc(x + 0.25, y - 0.1, 0, 0.45, 0.35, M, 1) }
      c.text(525, 244, l('у каждого одна небольшая стопка', 'each holds one small stack'), A, { size: 12, w: 700 })
      c.line([[350, 40], [350, 256]], M, { w: 1, op: 0.4, dash: '3 5' })
    },
  },
  // Карта контекстов: три своих острова, события и API между ними, партнёр через границу и только по контракту
  'context-map': {
    ru: 'Три своих контекста обмениваются событиями и API, а к чужому партнёру за границей агент ходит только по контракту',
    en: 'Three own contexts exchange events and APIs, and the agent reaches the foreign partner across the border only through a contract',
    viewBox: [0, 0, 700, 290],
    draw: (c, l) => {
      const isl: [number, number, string, string, boolean][] = [[110, 130, 'продажи', 'sales', false], [330, 72, 'оплата', 'payment', false], [330, 200, 'доставка', 'delivery', false], [590, 136, 'партнёр', 'partner', true]]
      for (const [x, y, ru, en, ext] of isl) {
        const i = c.iso(x, y, 20); i.tile(-1.5, -1.5, 3, 3, { dash: ext ? '3 4' : '5 4', edge: ext ? M : A }); i.agent(-0.3, 0, ext ? M : A, 1, '')
        c.text(x, y + 52, l(ru, en), ext ? M : A, { size: 12, w: 800 })
      }
      c.badge(630, 100, W, '', { r: 11 }); c.icon(630, 100, 'lock', '#fff', { w: 1.8, round: false })
      c.arrow(172, 120, 266, 82, A, { w: 2 }); c.text(206, 90, l('событие', 'event'), A, { size: 11, w: 700 })
      c.arrow(172, 144, 266, 190, A, { w: 2 }); c.text(206, 188, 'API', A, { size: 11, w: 700 })
      c.arrow(330, 120, 330, 150, A, { w: 2 }); c.text(368, 138, l('событие', 'event'), A, { size: 11, w: 700 })
      c.line([[470, 40], [470, 262]], W, { w: 2, dash: '6 5' }); c.text(470, 34, l('граница нашего контроля', 'border of our control'), W, { size: 11, w: 800 })
      c.arrow(396, 78, 538, 122, M, { w: 2, dash: '4 4' }); c.arrow(396, 194, 538, 152, M, { w: 2, dash: '4 4' })
      c.text(462, 98, l('контракт', 'contract'), M, { size: 11, w: 700, halo: true }); c.text(462, 190, l('контракт', 'contract'), M, { size: 11, w: 700, halo: true })
      c.text(590, 214, l('чужая система: только по контракту', 'a foreign system: through a contract only'), M, { size: 11, w: 600 })
    },
  },
  // С чего начать: два соседних контекста, два агента, один контракт
  start: {
    ru: 'Первый шаг: два соседних контекста, по агенту на каждый и один контракт между ними',
    en: 'The first step: two neighbouring contexts, an agent for each and one contract between them',
    viewBox: [0, 0, 700, 250],
    draw: (c, l) => {
      for (const [x, ru, en] of [[150, 'контекст 1', 'context 1'], [550, 'контекст 2', 'context 2']] as [number, string, string][]) {
        const i = c.iso(x, 116, 26); i.tile(-1.5, -1.5, 3, 3, { dash: '5 4', edge: W }); i.agent(0, 0, A, 1.1, '')
        c.text(x, 196, l(ru, en), A, { size: 12, w: 800 }); c.text(x, 212, l('свой агент', 'its own agent'), M, { size: 11, w: 600 })
      }
      const m = c.iso(350, 120, 24); m.tile(-1, -1, 2, 2, { grid: false }); m.doc(-0.8, -0.6, 0, 1.6, 1.2, M, 3, true)
      c.arrow(236, 116, 306, 116, A, { w: 2 }); c.arrow(394, 116, 464, 116, A, { w: 2 })
      c.text(350, 196, l('один контракт', 'one contract'), M, { size: 12, w: 800 }); c.text(350, 212, l('что отдаёт, что принимает, кто владелец', 'what it gives, what it takes, who owns it'), M, { size: 11, w: 600 })
    },
  },
}
export default scenes
