import { attr, defineBlock, icon } from '../core'

// Короткая цепочка понятий со стрелками: значок, название, код под ним. На телефоне — столбиком
export default defineBlock({
  tag: 'hchain',
  title: 'Цепочка понятий',
  doc: 'Цепочка карточек со стрелками: значок, название, код.',
  attrs: { label: { doc: 'вся цепочка словами для скринридера', required: true } },
  slots: {
    step: {
      doc: 'звено цепочки; внутри — код под названием',
      required: true,
      attrs: { icon: { doc: 'значок', required: true }, t: { doc: 'название', required: true }, sw: { doc: 'толщина линии значка (по умолчанию 2)' } },
    },
  },
  render: ({ attrs, slots }) => `<div class="bk-hchain" role="img" aria-label="${attr(attrs.label)}">${slots.step.map((s) =>
    `<div class="bk-hchain-s">${icon(s.attrs.icon, s.attrs.sw)}<b>${s.attrs.t}</b><code>${s.html}</code></div>`).join('<span class="bk-hchain-a" aria-hidden="true">→</span>')}</div>`,
  example: {
    ru: '<b-hchain label="Цепочка петли сверки: желаемое — спека, исполнитель — агент, фактическое — код">\n  <step icon="file-text" t="Желаемое">спека</step>\n  <step icon="bot" t="Исполнитель">агент</step>\n  <step icon="code" t="Фактическое">код</step>\n</b-hchain>',
    en: '<b-hchain label="The reconcile loop: desired — spec, executor — agent, actual — code">\n  <step icon="file-text" t="Desired">spec</step>\n  <step icon="bot" t="Executor">agent</step>\n  <step icon="code" t="Actual">code</step>\n</b-hchain>',
  },
})
