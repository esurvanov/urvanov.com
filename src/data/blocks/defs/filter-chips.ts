import { defineBlock } from '../core'

// Ряд фильтров таблицы над ней: плашки, выбранный фильтр залит акцентом. Крупнее плашек <b-chips>
export default defineBlock({
  tag: 'filter-chips',
  title: 'Фильтры таблицы',
  doc: 'Плашки-фильтры над таблицей; on — выбранный.',
  slots: { f: { doc: 'фильтр; внутри — подпись', required: true, attrs: { on: { doc: 'выбранный', values: [''] } } } },
  render: ({ slots }) => `<div class="bk-filter-chips">${slots.f.map((f) => `<span class="bk-filter-chips-filter${'on' in f.attrs ? ' bk-filter-chips-on' : ''}">${f.html}</span>`).join('')}</div>`,
  example: {
    ru: '<b-filter-chips>\n  <f>Команда B</f>\n  <f>Активность: каждую неделю</f>\n  <f on>Инструмент: Work</f>\n</b-filter-chips>',
    en: '<b-filter-chips>\n  <f>Team B</f>\n  <f>Activity: weekly</f>\n  <f on>Tool: Work</f>\n</b-filter-chips>',
  },
})
