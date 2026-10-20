import { defineBlock, icon } from '../core'
import { ICONS } from '../icons'

// Значок из общего набора посреди текста или в таблице: <b-icon name="check"/>
export default defineBlock({
  tag: 'icon',
  title: 'Значок',
  doc: 'Значок из общего набора (src/data/blocks/icons.ts) по имени.',
  attrs: { name: { doc: `имя: ${Object.keys(ICONS).join(', ')}`, required: true }, sw: { doc: 'толщина линии (по умолчанию 2)' } },
  render: ({ attrs }) => icon(attrs.name, attrs.sw),
  example: {
    ru: `<p class="bk-icons">${Object.keys(ICONS).map((n) => `<span title="${n}"><b-icon name="${n}"></b-icon>${n}</span>`).join('')}</p>`,
    en: `<p class="bk-icons">${Object.keys(ICONS).map((n) => `<span title="${n}"><b-icon name="${n}"></b-icon>${n}</span>`).join('')}</p>`,
  },
})
