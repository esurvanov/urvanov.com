// Схемы поста «Агент на каждый ограниченный контекст»
import { type Scene, A, M, W } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Слева один агент на три контекста (конфликт смыслов), справа у каждого контекста свой агент
  'one-vs-per-context': {
    ru: 'Слева один агент держит три смысла слова «заказ». Справа у каждого ограниченного контекста свой агент со своим словарём и своими спеками', en: 'On the left one agent holds three meanings of “order”. On the right each bounded context has its own agent with its own vocabulary and specs',
    viewBox: [0, 0, 700, 296],
    draw: (c, l) => {
      c.text(175, 22, l('Один агент на всё', 'One agent for everything'), M, { size: 14, w: 800 })
      c.text(525, 22, l('Агент на контекст', 'One agent per context'), A, { size: 14, w: 800 })
      c.bot(175, 150, 1.6)
      c.alert(216, 128)
      const ctx: [string, number, number][] = [[l('продажи', 'sales'), 60, 56], [l('доставка', 'delivery'), 240, 56], [l('оплата', 'payment'), 150, 196]]
      for (const [t, x, y] of ctx) c.card(x, y, 100, 34, M, { rx: 9, fillOp: 0.12, sw: 1.8, lines: [{ t, dy: 22, size: 12.5, w: 700 }] })
      for (const [x, y] of [[110, 90], [290, 90], [200, 196]]) c.line([[175, 112], [x, y]], W, { w: 2, dash: '4 4' })
      c.text(175, 278, l('«заказ» значит три разных вещи', '"order" means three different things'), W, { size: 12.5, w: 600 })
      ctx.forEach(([t], i) => {
        const x = 372 + 105 * i, cx = x + 48
        c.card(x, 46, 96, 190, A, { fillOp: 0.08, dash: '6 5', lines: [{ t, dy: 22, size: 13, w: 800 }] })
        c.bot(cx, 160, 1.2)
        c.text(cx, 204, l('свой словарь', 'own vocabulary'), M, { size: 11.5, w: 600 })
        c.text(cx, 222, l('свои спеки', 'own specs'), M, { size: 11.5, w: 600 })
      })
      for (const x of [467, 572]) { c.line([[x, 120], [x + 12, 120]], A, { w: 2.2, cap: true }); c.line([[x + 8, 114], [x + 14, 120], [x + 8, 126]], A, { w: 2.2, cap: true }) }
      c.text(525, 278, l('границы = контракты между агентами', 'boundaries = contracts between agents'), M, { size: 12.5, w: 600 })
      c.line([[350, 40], [350, 260]], M, { w: 1, op: 0.4, dash: '3 5' })
    },
  },
  // Два графика: нагрузка на одного агента растёт с числом контекстов; число агентов равно числу контекстов
  'load-chart': {
    ru: 'Два графика. Нагрузка на одного агента растёт вместе с числом контекстов, если агент один, и остаётся ровной, если агент на каждый контекст. Число агентов равно числу контекстов (цифры условные)', en: 'Two charts. The load on a single agent grows with the number of contexts if there is one agent, and stays flat with one agent per context. The number of agents equals the number of contexts (illustrative numbers)',
    viewBox: [0, 0, 700, 270],
    legend: false,
    draw: (c, l) => {
      const xTicks = ['1', '2', '3', '4', '5', '6', '7', '8'], xTitle = l('число ограниченных контекстов', 'number of bounded contexts')
      const p1 = c.chart(60, 320, 36, 200, { title: l('Нагрузка на одного агента', 'Load on one agent'), xTitle, xTicks, yTicks: ['0%', '50%', '100%'] })
      const load = xTicks.map((_, i) => p1(i, (12 + (i * 88) / 7) / 100))
      c.series(load, M)
      c.series(load.slice(6), W, { join: false })
      c.dot(320, 36, 5, W)
      c.series([p1(0, 0.12), p1(7, 0.12)], A, { join: false })
      c.text(310, 28, l('один агент на всё', 'one agent for all'), M, { size: 11.5, w: 800, anchor: 'end' })
      c.text(320, 172.32, l('агент на контекст', 'agent per context'), A, { size: 11.5, w: 800, anchor: 'end' })
      const p2 = c.chart(410, 670, 36, 200, { title: l('Число агентов', 'Number of agents'), xTitle, xTicks, yTicks: ['0', '4', '8'] })
      c.series(xTicks.map((_, i) => p2(i, (i + 1) / 8)), A, { dots: 4, join: false })
      c.text(447.14, 85.2, l('1 контекст = 1 агент', '1 context = 1 agent'), A, { size: 11.5, w: 800, anchor: 'start' })
      c.text(350, 262, l('цифры условные', 'illustrative numbers'), M, { size: 11.5, w: 400 })
    },
  },
  // Карта контекстов: свои агенты, события и API между ними, к партнёру — только по контракту
  'context-map': {
    ru: 'Четыре ограниченных контекста: продажи, оплата, доставка и чужой партнёр. У каждого свой агент, между ними события и API, а к чужому контексту агент ходит только по контракту', en: 'Four bounded contexts: sales, payment, delivery and a foreign partner. Each has its own agent, with events and APIs between them, and the agent reaches the foreign context only through a contract',
    viewBox: [0, 0, 700, 250],
    draw: (c, l) => {
      c.text(350, 20, l('Карта контекстов и контракты', 'Context map and contracts'), 'currentColor', { size: 13.5, w: 800 })
      const ctx: [string, number, number, string][] = [[l('продажи', 'sales'), 68, 86, A], [l('оплата', 'payment'), 288, 36, A], [l('доставка', 'delivery'), 288, 156, A], [l('партнёр', 'partner'), 508, 86, M]]
      for (const [t, x, y, col] of ctx) {
        c.card(x, y, 124, 68, col, { dash: col === M ? '5 4' : undefined, lines: [{ t, dy: 20, size: 13, w: 800 }] })
        c.bot(x + 62, y + 60, 0.75)
      }
      c.icon(614, 90, 'lock', W, { w: 1.8, round: false })
      const links: [number, number, number, number, string, string][] = [
        [192, 112, 288, 78, A, l('событие', 'event')], [192, 128, 288, 182, A, 'API'],
        [412, 70, 508, 108, M, l('контракт', 'contract')], [412, 190, 508, 134, M, l('контракт', 'contract')], [350, 104, 350, 156, A, l('событие', 'event')],
      ]
      for (const [x1, y1, x2, y2, col, t] of links) {
        c.line([[x1, y1], [x2, y2]], col, { w: 2.4, dash: '1 6', cap: true })
        c.text((x1 + x2) / 2, (y1 + y2) / 2 - 4, t, col, { size: 11.5, w: 700 })
      }
      c.text(570, 206, l('не под нашим контролем', 'not under our control'), M, { size: 11.5, w: 700 })
      c.text(570, 222, l('агент только по контракту', 'the agent works through the contract only'), M, { size: 11, w: 500 })
    },
  },
}
export default scenes
