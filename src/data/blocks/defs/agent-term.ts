import { defineBlock, inline } from '../core'

// Окно терминала Claude Code с диалогом: что просит агент и что отвечаете вы. Тёмное в обеих темах, как настоящий
// терминал. Строки идут по порядку, вид строки — kind: ask (ваш запрос), req (агент просит вас), you (ваш ответ),
// act (шаг агента), out (вывод шага). У req и you справа пометка note
const LOGO = '<svg class="bk-agent-term-logo" viewBox="0 0 22 11" width="52" height="26" shape-rendering="crispEdges" aria-hidden="true">'
  + [[2, 0, 18, 9], [0, 3, 2, 2], [20, 3, 2, 2], [6, 3, 2, 2, 1], [14, 3, 2, 2, 1], [3, 9, 2, 2], [6, 9, 2, 2], [14, 9, 2, 2], [17, 9, 2, 2]]
    .map(([x, y, w, h, eye]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${eye ? '#1b1b1d' : '#d99090'}"/>`).join('')
  + '</svg>'

export default defineBlock({
  tag: 'agent-term',
  title: 'Терминал агента',
  doc: 'Окно терминала Claude Code: запросы, просьбы агента, ваши ответы и шаги агента по порядку.',
  attrs: {
    app: { doc: 'название в шапке (Claude&#8203; Code — с невидимым пробелом, чтобы не стало ссылкой глоссария)', required: true },
    ver: { doc: 'версия рядом с названием', required: true },
    model: { doc: 'строка модели под названием', required: true },
    path: { doc: 'папка проекта', required: true },
  },
  slots: {
    line: {
      doc: 'строка диалога; внутри — текст',
      required: true,
      attrs: { kind: { doc: 'ask, req, you, act, out', required: true, values: ['ask', 'req', 'you', 'act', 'out'] }, note: { doc: 'пометка справа (для req и you)' } },
    },
  },
  render: ({ attrs, slots }) => {
    const line = (s: { attrs: Record<string, string>; html: string }) => {
      const t = inline(s.html), note = s.attrs.note ? `<span class="bk-agent-term-n">${s.attrs.note}</span>` : ''
      switch (s.attrs.kind) {
        case 'ask': return `<div class="bk-agent-term-ask">› ${t}</div>`
        case 'req': return `<div class="bk-agent-term-req"><span><span class="bk-agent-term-m">●</span> ${t}</span>${note}</div>`
        case 'you': return `<div class="bk-agent-term-you"><span><span class="bk-agent-term-m">›</span> ${t}</span>${note}</div>`
        case 'act': return `<div class="bk-agent-term-act"><span class="bk-agent-term-m">●</span> ${t}</div>`
        default: return `<div class="bk-agent-term-out">⎿ ${t}</div>`
      }
    }
    return `<div class="bk-agent-term"><div class="bk-agent-term-h">${LOGO}<div class="bk-agent-term-id"><div><b>${attrs.app}</b> <span>${attrs.ver}</span></div><div>${attrs.model}</div><div>${attrs.path}</div></div></div>${slots.line.map(line).join('')}</div>`
  },
  example: {
    ru: '<b-agent-term app="Claude&#8203; Code" ver="v2.1" model="Sonnet 5.5 · Claude Max" path="~/projects/shop">\n  <line kind="ask">Почини падающий тест</line>\n  <line kind="req" note="агент просит вас">Запустите `npm test` и пришлите вывод.</line>\n  <line kind="you" note="вы: сделай сам">Запусти сам и прочитай вывод.</line>\n  <line kind="act">Bash(npm test)</line>\n  <line kind="out">2 failed: auth.test.ts</line>\n</b-agent-term>',
    en: '<b-agent-term app="Claude&#8203; Code" ver="v2.1" model="Sonnet 5.5 · Claude Max" path="~/projects/shop">\n  <line kind="ask">Fix the failing test</line>\n  <line kind="req" note="the agent asks you">Run `npm test` and send me the output.</line>\n  <line kind="you" note="you: do it yourself">Run it yourself and read the output.</line>\n  <line kind="act">Bash(npm test)</line>\n  <line kind="out">2 failed: auth.test.ts</line>\n</b-agent-term>',
  },
})
