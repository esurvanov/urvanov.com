import { defineBlock, icon, inline } from '../core'

// Цепочка из трёх шагов без значков: название и подпись в серой карточке, между шагами стрелки.
// На телефоне — столбиком, стрелки поворачиваются вниз. Колонки: шаг, стрелка, шаг…
export default defineBlock({
  tag: 'step-chain',
  title: 'Цепочка шагов',
  doc: 'Шаги в серых карточках со стрелками между ними: название и подпись.',
  slots: { node: { doc: 'шаг; внутри — подпись под названием', required: true, attrs: { t: { doc: 'название шага', required: true } } } },
  render: ({ slots }) => {
    const cols = slots.node.map(() => '1fr').join(' 28px ')
    return `<div class="bk-step-chain" style="--bk-stc-cols:${cols}">${slots.node.map((s) => `<div class="bk-step-chain-n"><b>${s.attrs.t}</b><small>${inline(s.html)}</small></div>`)
      .join(`<span class="bk-step-chain-a">${icon('arrow-right')}</span>`)}</div>`
  },
  example: {
    ru: '<b-step-chain>\n  <node t="1">Дать доступ</node>\n  <node t="2">Записать в библию</node>\n  <node t="3">Напомнить фразой</node>\n</b-step-chain>',
    en: '<b-step-chain>\n  <node t="1">Give access</node>\n  <node t="2">Write it into the bible</node>\n  <node t="3">Remind with a phrase</node>\n</b-step-chain>',
  },
})
