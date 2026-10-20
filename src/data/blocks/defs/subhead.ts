import { defineBlock, inline } from '../core'

// Подзаголовок h3 внутри главы: перед промптом или отдельной частью раздела
export default defineBlock({
  tag: 'subhead',
  title: 'Подзаголовок',
  doc: 'Заголовок h3 внутри главы, например над промптом.',
  render: ({ children }) => `<h3 class="bk-subhead">${inline(children)}</h3>`,
  example: { ru: '<b-subhead>Промпт для анализа интервью</b-subhead>', en: '<b-subhead>A prompt for interview analysis</b-subhead>' },
})
