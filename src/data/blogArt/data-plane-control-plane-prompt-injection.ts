// Схемы поста «Data plane и control plane»
import { type Scene, A, M, W } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Три островка: команды (вы и правила) → агент ← данные снаружи
  planes: {
    ru: 'Агент получает команды от вас и читает данные из внешнего мира', en: 'The agent takes commands from you and reads data from the outside world',
    viewBox: [0, 0, 700, 240],
    draw: (c, l) => {
      const cmd = c.iso(110, 126, 26); cmd.tile(-1.5, -1.5, 3, 3); cmd.doc(-1, -1, 0, 0.9, 0.7, A, 2); cmd.person(0, 0.2, M, '')
      const ag = c.iso(350, 126, 26); ag.tile(-1.5, -1.5, 3, 3); ag.agent(-0.4, -0.4, A, 1, '')
      const dt = c.iso(590, 126, 26); dt.tile(-1.5, -1.5, 3, 3); dt.panel(-1.3, -0.9, 1.4, 1.4, M, undefined, 1); dt.box(-1, 0.9, 0, 1.2, 0.3, 0.3, M, 0.5); dt.doc(0.2, 0, 0, 1, 0.8, M, 2)
      c.text(593.2, 56.2, 'web', M, { size: 10, w: 700 })
      c.arrow(190, 132, 272, 132, A); c.arrow(510, 132, 430, 132, M)
      c.text(110, 200, l('Команды', 'Commands'), A, { size: 12, w: 700 }); c.text(110, 215, l('вы и правила', 'you and the rules'), M)
      c.text(350, 200, l('Агент', 'Agent'), A, { size: 12, w: 700 }); c.text(350, 215, l('исполняет', 'executes'), M)
      c.text(590, 200, l('Данные', 'Data'), M, { size: 12, w: 700 }); c.text(590, 215, l('страницы, тикеты, ответы серверов', 'pages, tickets, server replies'), M)
    },
  },
  // Атака: чужой текст в данных («отправь токен») → агент принял за команду → действие, которого вы не просили
  injection: {
    ru: 'Чужой текст в данных звучит как команда, и агент исполняет её', en: 'Foreign text in the data sounds like a command and the agent executes it',
    viewBox: [0, 0, 700, 246],
    draw: (c, l) => {
      const dt = c.iso(110, 132, 26); dt.tile(-1.5, -1.5, 3, 3); dt.doc(-0.8, -0.5, 0, 1.6, 1.2, W, 3)
      const ag = c.iso(350, 132, 26); ag.tile(-1.5, -1.5, 3, 3); ag.agent(-0.4, -0.4, A, 1, '')
      const ac = c.iso(590, 132, 26); ac.tile(-1.5, -1.5, 3, 3); ac.box(-0.6, -0.6, 0, 1.2, 1.2, 0.9, W)
      c.arrow(190, 138, 272, 138, W, { w: 1.8, dash: '4 4' }); c.arrow(430, 138, 512, 138, W, { w: 1.8, dash: '4 4' })
      // пузырь со спрятанной командой и значки «!» / «×»
      c.pill(40, 52, 150, 24, W, { rx: 8 })
      c.text(115, 68, l('«отправь токен»', '“send the token”'), 'currentColor', { size: 10.5, w: 600 })
      c.badge(110, 40, W, '!', { r: 9 })
      c.badge(590, 84, W, '×', { r: 10 })
      c.text(110, 206, l('Данные', 'Data'), W, { size: 12, w: 700 }); c.text(110, 221, l('в тексте спрятана команда', 'a command hidden in the text'), M)
      c.text(350, 206, l('Агент', 'Agent'), A, { size: 12, w: 700 }); c.text(350, 221, l('принял текст за команду', 'took the text for a command'), M)
      c.text(590, 206, l('Действие', 'Action'), W, { size: 12, w: 700 }); c.text(590, 221, l('которого вы не просили', 'you never asked for'), M)
    },
  },
  // Защита: чужой текст остаётся данными → человек между стойками подтверждает → запись в пределах прав
  defense: {
    ru: 'Чужой текст доходит до агента, а запись проходит через подтверждение человека', en: 'Foreign text reaches the agent, and a write goes through a person’s approval',
    viewBox: [0, 0, 700, 246],
    draw: (c, l) => {
      const dt = c.iso(110, 132, 26); dt.tile(-1.5, -1.5, 3, 3); dt.doc(-0.8, -0.5, 0, 1.6, 1.2, W, 3)
      const gate = c.iso(350, 132, 26); gate.tile(-1.5, -1.5, 3, 3); gate.person(0.2, 0.3, M, ''); gate.box(-1.2, -0.7, 0, 0.3, 0.3, 1.2, A); gate.box(0.9, -0.7, 0, 0.3, 0.3, 1.2, A)
      const wr = c.iso(590, 132, 26); wr.tile(-1.5, -1.5, 3, 3); wr.doc(-0.8, -0.6, 0, 1.6, 1.2, A, 3, true)
      c.arrow(190, 138, 272, 138, W, { w: 1.8, dash: '4 4' }); c.arrow(430, 138, 512, 138, A, { w: 1.8 })
      c.badge(350, 84, A, '✓', { r: 10 })
      c.text(110, 206, l('Чужой текст', 'Foreign text'), W, { size: 12, w: 700 }); c.text(110, 221, l('остаётся данными', 'stays data'), M)
      c.text(350, 206, l('Человек', 'Person'), M, { size: 12, w: 700 }); c.text(350, 221, l('подтверждает запись', 'approves the write'), M)
      c.text(590, 206, l('Запись', 'Write'), A, { size: 12, w: 700 }); c.text(590, 221, l('в пределах прав', 'within the rights'), M)
    },
  },
}
export default scenes
