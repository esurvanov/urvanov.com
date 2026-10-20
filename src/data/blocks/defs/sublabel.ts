import { defineBlock, inline, topStyle } from '../core'

// Подзаголовок-метка капсом внутри главы: «Шаг 1», «Путь 3: …». top — отступ сверху в px
export default defineBlock({
  tag: 'sublabel',
  title: 'Метка',
  doc: 'Мелкий подзаголовок капсом внутри главы.',
  attrs: { top: { doc: 'отступ сверху в px (22 — от предыдущего блока, 12 — между шагами)' } },
  render: ({ attrs, children }) => `<div class="bk-sublabel"${topStyle(attrs.top)}>${inline(children)}</div>`,
  example: { ru: '<b-sublabel top="22">Шаг 1</b-sublabel>', en: '<b-sublabel top="22">Step 1</b-sublabel>' },
})
