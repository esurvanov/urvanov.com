import { defineBlock, icon, inline, topStyle } from '../core'

// Три пронумерованных шага в ряд со стрелками (на телефоне — столбиком). Номера ставятся сами, start — с какого
export default defineBlock({
  tag: 'num-chain',
  title: 'Шаги в ряд',
  doc: 'Пронумерованные шаги-карточки в ряд по три со стрелками; на телефоне — столбиком.',
  attrs: {
    start: { doc: 'номер первого шага (по умолчанию 1)' },
    top: { doc: 'отступ сверху в px (по умолчанию 36)' },
  },
  slots: { step: { doc: 'шаг; внутри — подпись', required: true } },
  render: ({ attrs, slots }) => {
    const n0 = Number(attrs.start ?? 1)
    return `<div class="bk-num-chain"${topStyle(attrs.top)}>${slots.step.map((s, i) => `<div class="bk-num-chain-nd"><b>${n0 + i}</b><small>${inline(s.html)}</small></div>`).join(`<span class="bk-num-chain-arr">${icon('arrow-right')}</span>`)}</div>`
  },
  example: {
    ru: '<b-num-chain top="6">\n  <step>прочитать задачу</step>\n  <step>пройти критический путь на стенде</step>\n  <step>сжать до минимума</step>\n</b-num-chain>',
    en: '<b-num-chain top="6">\n  <step>read the issue</step>\n  <step>walk the critical path on the stand</step>\n  <step>narrow it down</step>\n</b-num-chain>',
  },
})
