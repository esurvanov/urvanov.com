import { color, defineBlock } from '../core'

// Покрытие в ячейке таблицы (серия gruppy): ряд цветных кружков — кто из групп попал в команду
export default defineBlock({
  tag: 'gruppy-cov',
  title: 'Кружки покрытия',
  doc: 'Ряд цветных кружков в строку, обычно в ячейке <b-table>: цвет — группа.',
  attrs: { colors: { doc: 'цвета кружков через пробел: токены или CSS-цвета', required: true } },
  render: ({ attrs }) => `<div class="bk-gcov">${attrs.colors.trim().split(/\s+/).map((c) => `<i style="background:${color(c)}"></i>`).join('')}</div>`,
  example: { ru: '<b-gruppy-cov colors="c-code c-chat c-silent c-proj"/>', en: '<b-gruppy-cov colors="c-code c-chat c-silent c-proj"/>' },
})
