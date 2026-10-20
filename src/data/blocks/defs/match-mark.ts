import { defineBlock } from '../core'

// Знак сверки двух значений: «=» совпало, «≠» расходится (например, частота «со слов» и «по отчёту»)
export default defineBlock({
  tag: 'match-mark',
  title: 'Знак сверки',
  doc: 'Цветной знак совпадения или расхождения двух значений.',
  attrs: { kind: { doc: 'same — совпало (зелёный), diff — расходится (предупреждение)', required: true, values: ['same', 'diff'] } },
  render: ({ attrs, children }) => `<span class="bk-mm bk-mm-${attrs.kind}">${children.trim()}</span>`,
  example: {
    ru: '<p><b-match-mark kind="same">=</b-match-mark> совпало, <b-match-mark kind="diff">≠</b-match-mark> расходится</p>',
    en: '<p><b-match-mark kind="same">=</b-match-mark> matches, <b-match-mark kind="diff">≠</b-match-mark> differs</p>',
  },
})
