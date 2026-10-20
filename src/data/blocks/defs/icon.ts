import { defineBlock, icon } from '../core'
import { ICONS } from '../icons'

// Значок из общего набора посреди текста или в таблице: <b-icon name="check"/>
export default defineBlock({
  tag: 'icon',
  title: 'Значок',
  doc: 'Значок из общего набора (src/data/blocks/icons.ts) по имени.',
  attrs: { name: { doc: `имя: ${Object.keys(ICONS).join(', ')}`, required: true }, sw: { doc: 'толщина линии (по умолчанию 2)' } },
  // Класс bk-icon-i — чтобы размер «со строку» в абзаце и ячейке получали только эти значки, а не значки других блоков
  render: ({ attrs }) => icon(attrs.name, attrs.sw).replace('<svg ', '<svg class="bk-icon-i" '),
  example: {
    ru: `<p class="bk-icon">${Object.keys(ICONS).map((n) => `<span title="${n}"><b-icon name="${n}"></b-icon>${n}</span>`).join('')}</p>`,
    en: `<p class="bk-icon">${Object.keys(ICONS).map((n) => `<span title="${n}"><b-icon name="${n}"></b-icon>${n}</span>`).join('')}</p>`,
  },
})
