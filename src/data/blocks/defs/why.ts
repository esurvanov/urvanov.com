import { defineBlock, inline, topStyle } from '../core'

// Пояснение под заголовком: зачем этот раздел и что в нём видно. Приглушённый абзац
export default defineBlock({
  tag: 'why',
  title: 'Пояснение',
  doc: 'Приглушённый абзац под заголовком: зачем раздел, что показывает схема.',
  attrs: {
    align: { doc: 'left — без выключки по ширине', values: ['left'] },
    top: { doc: 'отступ сверху в px (когда абзац идёт сразу за таблицей или схемой)' },
  },
  render: ({ attrs, children }) => `<p class="bk-why${attrs.align ? ' bk-left' : ''}"${topStyle(attrs.top)}>${inline(children)}</p>`,
  example: {
    ru: '<b-why>Путь «переделать запрос» на примере: ревью нашло пропуски, их дописали в исходный запрос.</b-why>',
    en: '<b-why>The “rewrite the request” path as an example: the review found gaps and they went into the original request.</b-why>',
  },
})
