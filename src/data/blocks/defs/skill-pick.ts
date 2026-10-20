import { defineBlock } from '../core'

// Как агент выбирает скилл: на старте сессии видны только имена (<skill>, выбранный — on), после выбора
// загружается файл скилла целиком. Слева — момент, справа — что попадает в контекст
export default defineBlock({
  tag: 'skill-pick',
  title: 'Выбор скилла',
  doc: 'Две строки «момент — что видно — что в контексте» и выбор между ними.',
  attrs: {
    start: { doc: 'подпись первой строки: «Старт сессии»', required: true },
    'start-note': { doc: 'что в контексте на старте', required: true },
    picked: { doc: 'строка выбора между строками', required: true },
    call: { doc: 'подпись второй строки: «Вызов»', required: true },
    'call-note': { doc: 'что в контексте после вызова', required: true },
    file: { doc: 'файл скилла', required: true },
    'file-note': { doc: 'что в файле', required: true },
  },
  slots: { skill: { doc: 'скилл; внутри — имя', required: true, attrs: { on: { doc: 'выбранный', values: [''] } } } },
  render: ({ attrs, slots }) => `<div class="bk-pl"><div class="bk-pl-r"><span class="bk-pl-k">${attrs.start}</span><div class="bk-pl-cs">${slots.skill.map((s) =>
    `<span class="bk-pl-c${'on' in s.attrs ? ' bk-on' : ''}">${s.html}</span>`).join('')}</div><span class="bk-pl-s">${attrs['start-note']}</span></div>`
    + `<div class="bk-pl-d">${attrs.picked}</div>`
    + `<div class="bk-pl-r"><span class="bk-pl-k">${attrs.call}</span><div class="bk-pl-x"><code>${attrs.file}</code><span>${attrs['file-note']}</span></div><span class="bk-pl-s">${attrs['call-note']}</span></div></div>`,
  example: {
    ru: '<b-skill-pick start="Старт сессии" start-note="имя + описание" picked="↓ агент выбрал «ревью PR»" call="Вызов" call-note="тело целиком" file="SKILL.md" file-note="инструкция, примеры, скрипты">\n  <skill>отчёт</skill>\n  <skill on>ревью PR</skill>\n  <skill>релиз</skill>\n</b-skill-pick>',
    en: '<b-skill-pick start="Session start" start-note="name + description" picked="↓ the agent picked “PR review”" call="Call" call-note="the whole body" file="SKILL.md" file-note="instructions, examples, scripts">\n  <skill>report</skill>\n  <skill on>PR review</skill>\n  <skill>release</skill>\n</b-skill-pick>',
  },
})
