import { defineBlock, topStyle } from '../core'

// Раскрывашка «как это делается руками»: подробности, которые нужны не всем. Внутри — любые блоки
export default defineBlock({
  tag: 'details-more',
  title: 'Раскрывашка',
  doc: 'Свёрнутые подробности: заголовок-кнопка, внутри любые блоки.',
  attrs: {
    summary: { doc: 'текст заголовка', required: true },
    top: { doc: 'отступ сверху в px' },
  },
  render: ({ attrs, children }) => `<details class="bk-details-more"${topStyle(attrs.top)}><summary>${attrs.summary}</summary>${children.trim()}</details>`,
  example: {
    ru: '<b-details-more summary="Как это делается руками" top="12"><b-copy-code>claude mcp list</b-copy-code></b-details-more>',
    en: '<b-details-more summary="How it is done by hand" top="12"><b-copy-code>claude mcp list</b-copy-code></b-details-more>',
  },
})
