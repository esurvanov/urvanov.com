import { defineBlock, inline } from '../core'

// Первые шаги (серия hdd): как <b-steps>, но плотнее — меньше отступы и номер, название жирнее; первая буква пояснения — заглавная
export default defineBlock({
  tag: 'hdd-steps',
  title: 'Шаги плотным списком',
  doc: 'Нумерованные шаги карточками поплотнее: номер на квадратной плашке, название и пояснение (можно со ссылкой).',
  slots: { step: { doc: 'шаг; внутри — пояснение', required: true, attrs: { t: { doc: 'название шага', required: true } } } },
  render: ({ slots }) => `<ol class="bk-hdd-steps">${slots.step.map((s, i) =>
    `<li><span class="bk-hdd-steps-n">${i + 1}</span><div><div class="bk-hdd-steps-t">${s.attrs.t}</div>${s.html ? `<div class="bk-hdd-steps-d">${inline(s.html)}</div>` : ''}</div></li>`).join('')}</ol>`,
  example: {
    ru: '<b-hdd-steps>\n  <step t="Файл инструкций для агента">AGENTS.md или CLAUDE.md в корне проекта</step>\n  <step t="Журнал ошибок агента">каждая исправленная вручную ошибка — строка с причиной</step>\n</b-hdd-steps>',
    en: '<b-hdd-steps>\n  <step t="An instructions file for the agent">AGENTS.md or CLAUDE.md in the project root</step>\n  <step t="An agent mistake log">every mistake fixed by hand gets a line with its cause</step>\n</b-hdd-steps>',
  },
})
