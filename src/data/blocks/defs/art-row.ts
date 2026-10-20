import { attr, defineBlock, icon } from '../core'

// Ряд маленьких схем <iso-art> без общей рамки (рамка — у каждой схемы, класс dp-v в рецепте сцены): три в ряд,
// arrows — со стрелками между ними (последовательность), cols="1" — одна схема на всю ширину
export default defineBlock({
  tag: 'art-row',
  title: 'Ряд маленьких схем',
  doc: 'Две-три маленькие схемы в ряд, со стрелками или без; на телефоне стрелки поворачиваются вниз.',
  attrs: {
    names: { doc: 'имена сцен «пост/ключ» через пробел', required: true },
    arrows: { doc: 'стрелки между схемами', values: [''] },
    cols: { doc: '1 — одна схема на всю ширину', values: ['1'] },
  },
  render: ({ attrs }) => {
    const arts = attrs.names.trim().split(/\s+/).map((n) => `<iso-art name="${attr(n)}"></iso-art>`)
    const seq = 'arrows' in attrs
    const cls = ['bk-art-row', seq && 'bk-art-row-seq', attrs.cols === '1' && 'bk-art-row-1'].filter(Boolean).join(' ')
    return `<div class="${cls}">${arts.join(seq ? `<span class="bk-art-row-ar" aria-hidden="true">${icon('arrow-right')}</span>` : '')}</div>`
  },
  example: {
    ru: '<b-art-row names="chatgpt-enterprise-usage-report/depth-tried chatgpt-enterprise-usage-report/depth-regular chatgpt-enterprise-usage-report/depth-weekly"></b-art-row>\n<b-art-row arrows names="chatgpt-enterprise-usage-report/skill-adhoc chatgpt-enterprise-usage-report/skill-repeat chatgpt-enterprise-usage-report/shared-skill"></b-art-row>',
    en: '<b-art-row names="chatgpt-enterprise-usage-report/depth-tried chatgpt-enterprise-usage-report/depth-regular chatgpt-enterprise-usage-report/depth-weekly"></b-art-row>\n<b-art-row arrows names="chatgpt-enterprise-usage-report/skill-adhoc chatgpt-enterprise-usage-report/skill-repeat chatgpt-enterprise-usage-report/shared-skill"></b-art-row>',
  },
})
