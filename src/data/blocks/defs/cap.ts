import { defineBlock, inline } from '../core'

// Подпись под схемой или таблицей: мелко, приглушённо; ссылки в ней обычные
export default defineBlock({
  tag: 'cap',
  title: 'Подпись',
  doc: 'Мелкая подпись под схемой, таблицей или блоком.',
  render: ({ children }) => `<p class="bk-cap">${inline(children)}</p>`,
  example: {
    ru: '<b-cap>Оба подхода работают в любом харнессе: по <a href="https://example.com/" target="_blank" rel="noopener">руководству</a>.</b-cap>',
    en: '<b-cap>Both approaches work in any harness: see the <a href="https://example.com/" target="_blank" rel="noopener">guide</a>.</b-cap>',
  },
})
