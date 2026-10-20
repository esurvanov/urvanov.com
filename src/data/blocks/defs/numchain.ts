import { defineBlock, icon, inline } from '../core'

// Нумерованная цепочка шагов: карточки «номер + короткая подпись» со стрелками, три в ряд (серия harness,
// «С чего начать»). Номера ставятся сами; на узком экране — столбиком, стрелки вниз
export default defineBlock({
  tag: 'numchain',
  title: 'Цепочка шагов',
  doc: 'Карточки с номером и короткой подписью, между ними стрелки; три в ряд, на телефоне — столбиком.',
  slots: { step: { doc: 'шаг; внутри — короткая подпись', required: true } },
  render: ({ slots }) => `<div class="bk-numchain">${slots.step.map((s, i) =>
    `<div class="bk-numchain-nd"><b>${i + 1}</b><small>${inline(s.html)}</small></div>`).join(`<span class="bk-numchain-ar">${icon('arrow-right')}</span>`)}</div>`,
  example: {
    ru: '<b-numchain>\n  <step>нарисовать карту контекстов</step>\n  <step>назначить агента на каждый</step>\n  <step>записать контракты на границах</step>\n</b-numchain>',
    en: '<b-numchain>\n  <step>draw the context map</step>\n  <step>assign an agent to each</step>\n  <step>write contracts at the borders</step>\n</b-numchain>',
  },
})
