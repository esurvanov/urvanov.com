import { defineBlock } from '../core'

// Пустой промежуток между блоками, у которых нет своего отступа сверху (например, схема и сетка правил)
export default defineBlock({
  tag: 'spacer',
  title: 'Промежуток',
  doc: 'Пустой промежуток заданной высоты между двумя блоками.',
  attrs: { h: { doc: 'высота в px', required: true } },
  render: ({ attrs }) => {
    if (!/^\d+$/.test(attrs.h)) throw new Error(`blocks: <b-spacer h="${attrs.h}"> — нужна высота в px числом`)
    return `<div class="bk-spacer" style="height:${attrs.h}px"></div>`
  },
  example: { ru: '<b-spacer h="12"/>', en: '<b-spacer h="12"/>' },
})
