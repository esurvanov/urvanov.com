import { attr, defineBlock } from '../core'

// Схема <iso-art> без рамки: внутри дорожки, панели вида или рядом с карточками, где рамка уже есть вокруг
export default defineBlock({
  tag: 'art-plain',
  title: 'Схема без рамки',
  doc: 'Одна схема <iso-art> по имени, без рамки <b-art>.',
  attrs: { name: { doc: 'имя сцены «пост/ключ»', required: true } },
  render: ({ attrs }) => `<iso-art name="${attr(attrs.name.trim())}"></iso-art>`,
  example: {
    ru: '<b-art-plain name="bug-report-to-reproduction-agent/start-steps"></b-art-plain>',
    en: '<b-art-plain name="bug-report-to-reproduction-agent/start-steps"></b-art-plain>',
  },
})
