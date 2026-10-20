import { attr, defineBlock, icon } from '../core'

// Цепочка картинок-понятий со стрелками в рамке: «сегмент → кастдев → проблема → инструмент».
// Картинка шага — схема <iso-art> (art), подпись — под ней
export default defineBlock({
  tag: 'art-chain',
  title: 'Цепочка картинок',
  doc: 'Рамка с картинками-шагами и стрелками, подпись под каждой картинкой.',
  attrs: { label: { doc: 'вся цепочка словами для скринридера', required: true } },
  slots: { step: { doc: 'шаг; внутри — подпись', required: true, attrs: { art: { doc: 'схема «пост/ключ»', required: true } } } },
  render: ({ attrs, slots }) => `<div class="bk-cf" role="img" aria-label="${attr(attrs.label)}">${slots.step.map((s) =>
    `<span class="bk-cf-s"><iso-art name="${attr(s.attrs.art)}"></iso-art><small>${s.html}</small></span>`).join(`<span class="bk-cf-a" aria-hidden="true">${icon('arrow-right')}</span>`)}</div>`,
  example: {
    ru: '<b-art-chain label="сегмент → кастдев → проблема → инструмент">\n  <step art="chatgpt-enterprise-usage-report/chain-segment">сегмент</step>\n  <step art="chatgpt-enterprise-usage-report/chain-custdev">кастдев</step>\n  <step art="chatgpt-enterprise-usage-report/chain-problem">проблема</step>\n  <step art="chatgpt-enterprise-usage-report/chain-tool">инструмент</step>\n</b-art-chain>',
    en: '<b-art-chain label="segment → custdev → problem → tool">\n  <step art="chatgpt-enterprise-usage-report/chain-segment">segment</step>\n  <step art="chatgpt-enterprise-usage-report/chain-custdev">custdev</step>\n  <step art="chatgpt-enterprise-usage-report/chain-problem">problem</step>\n  <step art="chatgpt-enterprise-usage-report/chain-tool">tool</step>\n</b-art-chain>',
  },
})
