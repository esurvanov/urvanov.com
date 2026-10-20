import { defineBlock, inline } from '../core'

// Пояснение под заголовком: зачем этот раздел и что в нём видно. Приглушённый абзац
export default defineBlock({
  tag: 'why',
  title: 'Пояснение',
  doc: 'Приглушённый абзац под заголовком: зачем раздел, что показывает схема.',
  attrs: { align: { doc: 'left — без выключки по ширине', values: ['left'] } },
  render: ({ attrs, children }) => `<p class="bk-why${attrs.align ? ' bk-left' : ''}">${inline(children)}</p>`,
  example: {
    ru: '<b-why>Путь «переделать запрос» на примере: ревью нашло пропуски, их дописали в исходный запрос.</b-why>',
    en: '<b-why>The “rewrite the request” path as an example: the review found gaps and they went into the original request.</b-why>',
  },
})
