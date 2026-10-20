import { defineBlock, inline } from '../core'

// Строка задачи из трекера: ключ жирным и заголовок задачи. Обычно внутри <b-lane>
export default defineBlock({
  tag: 'ticket',
  title: 'Задача',
  doc: 'Ключ задачи жирным и её заголовок одной строкой.',
  attrs: { key: { doc: 'ключ задачи (PAY-142)', required: true } },
  render: ({ attrs, children }) => `<p class="bk-ticket"><b>${attrs.key}</b> · ${inline(children)}</p>`,
  example: {
    ru: '<b-ticket key="PAY-142">Не проходит оплата картой, если ввести промокод</b-ticket>',
    en: '<b-ticket key="PAY-142">Card payment fails when a promo code is entered</b-ticket>',
  },
})
