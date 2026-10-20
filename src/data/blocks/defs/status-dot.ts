import { color, defineBlock } from '../core'

// Статус с цветной точкой в ячейке таблицы: «● активен», «● код»
export default defineBlock({
  tag: 'status-dot',
  title: 'Статус с точкой',
  doc: 'Цветная точка и короткая подпись, обычно в ячейке таблицы.',
  attrs: { color: { doc: 'цвет точки: токен или CSS-цвет', required: true } },
  render: ({ attrs, children }) => `<span class="bk-status-dot"><i style="background:${color(attrs.color)}"></i>${children.trim()}</span>`,
  example: {
    ru: '<p><b-status-dot color="c-work">активен</b-status-dot> <b-status-dot color="c-none">заброшен</b-status-dot></p>',
    en: '<p><b-status-dot color="c-work">active</b-status-dot> <b-status-dot color="c-none">abandoned</b-status-dot></p>',
  },
})
