import { defineBlock, inline } from '../core'

// Поля отчёта строками: подпись капсом слева, значение справа, строки разделены чертой. Обычно внутри <b-lane>
export default defineBlock({
  tag: 'kv-rows',
  title: 'Поля строками',
  doc: 'Строки «подпись — значение» с чертой между ними: поля отчёта, карточки задачи.',
  slots: { row: { doc: 'строка; внутри — значение', required: true, attrs: { k: { doc: 'подпись капсом', required: true } } } },
  render: ({ slots }) => slots.row.map((s) => `<div class="bk-kv"><span>${s.attrs.k}</span>${inline(s.html)}</div>`).join(''),
  example: {
    ru: '<b-kv-rows>\n  <row k="Шаги">корзина → промокод → оплата картой</row>\n  <row k="Ожидалось">платёж проходит со скидкой</row>\n</b-kv-rows>',
    en: '<b-kv-rows>\n  <row k="Steps">cart → promo code → card payment</row>\n  <row k="Expected">the payment goes through with the discount</row>\n</b-kv-rows>',
  },
})
