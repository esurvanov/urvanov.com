import { defineBlock } from '../core'

// Панель одного из двух видов поста (см. <b-view-toggle>): pic — схемы, struct — карточки.
// Видна та панель, чей вид выбран переключателем; без переключателя видны обе
export default defineBlock({
  tag: 'view',
  title: 'Панель вида',
  doc: 'Содержимое для вида «Иллюстрация» (pic) или «Структура» (struct) из <b-view-toggle>.',
  attrs: { kind: { doc: 'вид', required: true, values: ['pic', 'struct'] } },
  render: ({ attrs, children }) => `<div class="${attrs.kind === 'pic' ? 'bk-view-pic' : 'bk-view-struct'}">${children.trim()}</div>`,
  example: {
    ru: '<b-view kind="struct"><b-why>Карточки вида «Структура».</b-why></b-view>',
    en: '<b-view kind="struct"><b-why>Cards of the “Structure” view.</b-why></b-view>',
  },
})
