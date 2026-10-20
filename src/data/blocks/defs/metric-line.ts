import { defineBlock, inline } from '../core'

// Одно число крупно моноширинно и подпись к нему в одну строку: «≤ 200 строк на файл»
export default defineBlock({
  tag: 'metric-line',
  title: 'Число с подписью',
  doc: 'Крупное число и подпись в одной строке-рамке.',
  attrs: { value: { doc: 'число: «≤ 200»', required: true } },
  render: ({ attrs, children }) => `<div class="bk-metric-line"><b>${attrs.value}</b><span>${inline(children)}</span></div>`,
  example: {
    ru: '<b-metric-line value="≤ 200">строк на файл CLAUDE.md</b-metric-line>',
    en: '<b-metric-line value="≤ 200">lines per CLAUDE.md file</b-metric-line>',
  },
})
