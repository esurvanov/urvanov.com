import { defineBlock } from '../core'

// Ряд плашек <b-chip> с переносом: фильтры, набор признаков
export default defineBlock({
  tag: 'chips',
  title: 'Ряд плашек',
  doc: 'Ряд плашек <b-chip> с переносом строк.',
  render: ({ children }) => `<div class="bk-chips">${children.trim()}</div>`,
  example: {
    ru: '<b-chips><b-chip>Команда B</b-chip><b-chip>Активность: каждую неделю</b-chip><b-chip on>Инструмент: Work</b-chip></b-chips>',
    en: '<b-chips><b-chip>Team B</b-chip><b-chip>Activity: weekly</b-chip><b-chip on>Tool: Work</b-chip></b-chips>',
  },
})
