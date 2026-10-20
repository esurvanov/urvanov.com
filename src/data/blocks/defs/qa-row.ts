import { defineBlock, icon } from '../core'

// Ряд «было / стало»: метка слева и короткая цепочка шагов со стрелками. Ряд «было» приглушён.
// Обычно два ряда подряд внутри <b-icon-lane>
export default defineBlock({
  tag: 'qa-row',
  title: 'Ряд «было / стало»',
  doc: 'Метка (Было / Стало) и цепочка коротких шагов со значками; now — ряд «стало» акцентом.',
  attrs: {
    label: { doc: 'метка слева', required: true },
    now: { doc: 'ряд «стало»: метка акцентом, цепочка не приглушена', values: [''] },
  },
  slots: { node: { doc: 'шаг; внутри — название', required: true, attrs: { icon: { doc: 'значок', required: true } } } },
  render: ({ attrs, slots }) => {
    const now = 'now' in attrs
    const nodes = slots.node.map((s) => `<div class="bk-qrow-nd">${icon(s.attrs.icon)}<b>${s.html}</b></div>`)
    return `<div class="bk-qrow"><span class="bk-qrow-k${now ? ' bk-on' : ''}">${attrs.label}</span><div class="bk-qrow-c${now ? '' : ' bk-was'}">${nodes.join(`<span class="bk-qrow-ar">${icon('arrow-right')}</span>`)}</div></div>`
  },
  example: {
    ru: '<b-qa-row label="Было">\n  <node icon="user">QA</node>\n  <node icon="refresh-cw">повтор</node>\n</b-qa-row>\n<b-qa-row label="Стало" now>\n  <node icon="bot">Агент</node>\n  <node icon="play">путь на стенде</node>\n</b-qa-row>',
    en: '<b-qa-row label="Before">\n  <node icon="user">QA</node>\n  <node icon="refresh-cw">repeat</node>\n</b-qa-row>\n<b-qa-row label="Now" now>\n  <node icon="bot">Agent</node>\n  <node icon="play">path on the stand</node>\n</b-qa-row>',
  },
})
