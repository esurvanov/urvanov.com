import { defineBlock, icon, inline } from '../core'

// Выноска: значок и абзац на мягком фоне акцента с полосой слева. Первое **жирное** слово — акцентом
export default defineBlock({
  tag: 'callout',
  title: 'Выноска',
  doc: 'Выноска со значком: важная оговорка к разделу, жирное начало — акцентом.',
  attrs: { icon: { doc: 'значок слева', required: true } },
  render: ({ attrs, children }) => `<div class="bk-callout">${icon(attrs.icon, '1.8')}<p>${inline(children)}</p></div>`,
  example: {
    ru: '<b-callout icon="lock">**Только чтение.** Выбрать доступ только на чтение получится не всегда.</b-callout>',
    en: '<b-callout icon="lock">**Read-only.** Picking read-only access is not always possible.</b-callout>',
  },
})
