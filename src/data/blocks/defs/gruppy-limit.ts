import { defineBlock, icon, inline } from '../core'

// Ограничение метода (серия gruppy): плашка тёплого цвета с восклицательным знаком, жирное начало и текст
export default defineBlock({
  tag: 'gruppy-limit',
  title: 'Ограничение',
  doc: 'Предупреждающая плашка: где метод не работает. Начинается жирной фразой из атрибута t.',
  attrs: { t: { doc: 'жирное начало, например «Ограничение.»', required: true } },
  render: ({ attrs, children }) => `<div class="bk-glim"><span class="bk-glim-i" aria-hidden="true">${icon('exclaim', '2.4')}</span><div><b>${attrs.t}</b> ${inline(children)}</div></div>`,
  example: {
    ru: '<b-gruppy-limit t="Ограничение.">16 интервью показывают, какие проблемы встречаются, но не сколько людей с ними сталкивается.</b-gruppy-limit>',
    en: '<b-gruppy-limit t="Limitation.">16 interviews show which problems occur, but not how many people face them.</b-gruppy-limit>',
  },
})
