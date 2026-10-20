import { attr, defineBlock } from '../core'

// Две дорожки <b-lane> рядом (на телефоне — друг под другом): сравнение двух процессов
export default defineBlock({
  tag: 'flow',
  title: 'Две дорожки',
  doc: 'Сетка из дорожек <b-lane> в две колонки; lead — крупнее, для схемы в начале поста.',
  attrs: {
    label: { doc: 'подпись для скринридера (aria-label)', required: true },
    lead: { doc: 'вводная схема поста: значки крупнее', values: [''] },
  },
  render: ({ attrs, children }) => `<div class="bk-flow${'lead' in attrs ? ' bk-flow-lead' : ''}" aria-label="${attr(attrs.label)}">${children.trim()}</div>`,
  example: {
    ru: '<b-flow lead label="Два подхода">\n  <b-lane title="Ответ не подошёл" color="muted">\n    <node icon="x" t="Ответ">мимо задачи</node>\n    <node icon="ai-box" t="Новый ответ">и снова проверка</node>\n  </b-lane>\n  <b-lane title="Ревью нашло пропуск" color="accent">\n    <node icon="file" t="Запрос v1">исходное задание</node>\n    <node icon="check" t="Запрос v2">и весь пайплайн заново</node>\n  </b-lane>\n</b-flow>',
    en: '<b-flow lead label="Two approaches">\n  <b-lane title="Answer missed" color="muted">\n    <node icon="x" t="Answer">off the task</node>\n    <node icon="ai-box" t="New answer">checked again</node>\n  </b-lane>\n  <b-lane title="Review found a gap" color="accent">\n    <node icon="file" t="Request v1">the original task</node>\n    <node icon="check" t="Request v2">and the whole pipeline again</node>\n  </b-lane>\n</b-flow>',
  },
})
