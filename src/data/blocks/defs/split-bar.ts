import { color, defineBlock } from '../core'

// Маленькая полоска-соотношение в ячейке таблицы: доли двух-трёх продуктов у человека («Chat / Work»)
export default defineBlock({
  tag: 'split-bar',
  title: 'Полоска-соотношение',
  doc: 'Короткая полоска из долей; parts — «цвет:доля» через пробел.',
  attrs: { parts: { doc: 'доли: «c-chat:28% c-work:72%»', required: true } },
  render: ({ attrs }) => `<div class="bk-split-bar">${attrs.parts.trim().split(/\s+/).map((p) => {
    const [c, w] = p.split(':')
    if (!w?.endsWith('%')) throw new Error(`blocks: <b-split-bar parts="${attrs.parts}"> — доля «цвет:NN%»`)
    return `<span style="width:${w};background:${color(c)}"></span>`
  }).join('')}</div>`,
  example: { ru: '<b-split-bar parts="c-chat:28% c-work:72%"></b-split-bar>', en: '<b-split-bar parts="c-chat:28% c-work:72%"></b-split-bar>' },
})
