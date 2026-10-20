import { defineBlock } from '../core'

// Режимы в ряд: название и короткая подпись моноширинно, слева черта цвета правил (когда правило попадает в контекст)
export default defineBlock({
  tag: 'rule-modes',
  title: 'Режимы',
  doc: 'Плитки режимов <mode> по четыре в ряд: название и подпись.',
  slots: { mode: { doc: 'режим; внутри — подпись', required: true, attrs: { t: { doc: 'название', required: true } } } },
  render: ({ slots }) => `<div class="bk-rule-modes">${slots.mode.map((s) => `<div class="bk-rule-modes-md"><b>${s.attrs.t}</b><small>${s.html}</small></div>`).join('')}</div>`,
  example: {
    ru: '<b-rule-modes>\n  <mode t="Всегда">каждый чат</mode>\n  <mode t="По описанию">агент решает сам</mode>\n  <mode t="По файлам">совпал шаблон пути</mode>\n  <mode t="Вручную">@rule</mode>\n</b-rule-modes>',
    en: '<b-rule-modes>\n  <mode t="Always">every chat</mode>\n  <mode t="By description">the agent decides</mode>\n  <mode t="By files">a path pattern matched</mode>\n  <mode t="Manually">@rule</mode>\n</b-rule-modes>',
  },
})
