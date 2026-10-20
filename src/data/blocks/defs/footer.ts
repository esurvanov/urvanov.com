import { defineBlock, inline } from '../core'

// Подвал поста: на чём основан текст, оговорки об источниках
export default defineBlock({
  tag: 'footer',
  title: 'Подвал',
  doc: 'Последняя строка поста: на чём основан текст.',
  // compact — отступы подвала постов про спеки (rec, agg): ближе к последней главе
  attrs: { compact: { doc: 'меньше отступ сверху (40px вместо 56px)', values: [''] } },
  render: ({ attrs, children }) => `<footer class="bk-footer${'compact' in attrs ? ' bk-footer-compact' : ''}">${inline(children)}</footer>`,
  example: {
    ru: '<b-footer>Приёмы — по официальным руководствам, источник у значка рядом с утверждением.</b-footer>',
    en: '<b-footer>Techniques follow official guides; the source is behind the icon next to each claim.</b-footer>',
  },
})
