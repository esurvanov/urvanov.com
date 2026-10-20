import { defineBlock, icon } from '../core'

// Стрелки вниз под дорожками <b-flow>: обе дорожки сходятся в одном блоке ниже. Занимает всю ширину сетки
export default defineBlock({
  tag: 'drop-arrows',
  title: 'Стрелки вниз',
  doc: 'Ряд стрелок вниз на всю ширину <b-flow>: дорожки сходятся в блок под ними.',
  attrs: { n: { doc: 'сколько стрелок (обычно по числу дорожек)', required: true } },
  render: ({ attrs }) => {
    const n = Number(attrs.n)
    if (!(n >= 1 && n <= 6)) throw new Error(`blocks: <b-drop-arrows n="${attrs.n}"> — нужно число от 1 до 6`)
    return `<div class="bk-drop" aria-hidden="true">${icon('arrow-down-iv').repeat(n)}</div>`
  },
  example: { ru: '<b-drop-arrows n="2"></b-drop-arrows>', en: '<b-drop-arrows n="2"></b-drop-arrows>' },
})
