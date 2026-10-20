import { defineBlock, inline } from '../core'

// Подвал поста: на чём основан текст, оговорки об источниках
export default defineBlock({
  tag: 'footer',
  title: 'Подвал',
  doc: 'Последняя строка поста: на чём основан текст.',
  render: ({ children }) => `<footer class="bk-footer">${inline(children)}</footer>`,
  example: {
    ru: '<b-footer>Приёмы — по официальным руководствам, источник у значка рядом с утверждением.</b-footer>',
    en: '<b-footer>Techniques follow official guides; the source is behind the icon next to each claim.</b-footer>',
  },
})
