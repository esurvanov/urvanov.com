import { defineBlock, icon } from '../core'

// Режимы рядом (серия hdd): крупный значок слева, моноширинное название и пояснение — например, snapshot и live
export default defineBlock({
  tag: 'hdd-modes',
  title: 'Режимы рядом',
  doc: 'Две карточки в ряд: крупный значок, моноширинное название и пояснение; на телефоне — одна под другой.',
  slots: { mode: { doc: 'карточка; внутри — пояснение', required: true, attrs: { icon: { doc: 'значок', required: true }, t: { doc: 'название', required: true } } } },
  render: ({ slots }) => `<div class="bk-hmm">${slots.mode.map((s) => `<div class="bk-hmm-c">${icon(s.attrs.icon)}<b>${s.attrs.t}</b><small>${s.html}</small></div>`).join('')}</div>`,
  example: {
    ru: '<b-hdd-modes>\n  <mode icon="table" t="snapshot">таблица, обновляется по факту нового измерения</mode>\n  <mode icon="broadcast-pole" t="live">протокол, каждый раз заново, без хранения</mode>\n</b-hdd-modes>',
    en: '<b-hdd-modes>\n  <mode icon="table" t="snapshot">a table, updated after each new measurement</mode>\n  <mode icon="broadcast-pole" t="live">a protocol, fresh every time, nothing stored</mode>\n</b-hdd-modes>',
  },
})
