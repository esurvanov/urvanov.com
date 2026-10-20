import { defineBlock, icon } from '../core'

// Принципы карточками в ряд (серия hdd): значок на плашке, название и пояснение мелко; четыре в ряд, на планшете по два
export default defineBlock({
  tag: 'hdd-principles',
  title: 'Принципы в ряд',
  doc: 'Четыре карточки в ряд (на планшете по две): значок на плашке, название, пояснение мелко.',
  slots: { principle: { doc: 'карточка; внутри — пояснение', required: true, attrs: { icon: { doc: 'значок', required: true }, t: { doc: 'название', required: true } } } },
  render: ({ slots }) => `<div class="bk-hpr">${slots.principle.map((s) =>
    `<div class="bk-hpr-c"><span class="bk-hpr-i">${icon(s.attrs.icon)}</span><b>${s.attrs.t}</b><small>${s.html}</small></div>`).join('')}</div>`,
  example: {
    ru: '<b-hdd-principles>\n  <principle icon="wave-line" t="Подгонки без нового предсказания">чинить правилом</principle>\n  <principle icon="flask" t="Несколько жалоб">сначала тест на общую причину</principle>\n  <principle icon="history" t="Новое правило">принимается, если старые случаи выводятся</principle>\n  <principle icon="shield-check" t="Без внешней проверки">отбросить с записью</principle>\n</b-hdd-principles>',
    en: '<b-hdd-principles>\n  <principle icon="wave-line" t="Patches without a new prediction">fix it with a rule</principle>\n  <principle icon="flask" t="Several complaints">first test for a shared cause</principle>\n  <principle icon="history" t="A new rule">accepted only if old cases follow from it</principle>\n  <principle icon="shield-check" t="No external check">discard it, with a record</principle>\n</b-hdd-principles>',
  },
})
