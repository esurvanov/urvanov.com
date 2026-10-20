import { attr, defineBlock } from '../core'

// Диаграмма Венна из библиотеки схем в рамке: области подсвечиваются при наведении. Стили областей
// (классы v-* и rg внутри сцены) — в venn.css
export default defineBlock({
  tag: 'venn',
  title: 'Диаграмма Венна',
  doc: 'Схема-диаграмма Венна <iso-art> в рамке; при наведении на область остальные бледнеют.',
  attrs: { name: { doc: 'имя сцены «пост/ключ»', required: true } },
  render: ({ attrs }) => `<div class="bk-venn"><iso-art name="${attr(attrs.name.trim())}"></iso-art></div>`,
  example: {
    ru: '<b-venn name="ai-in-code-harness-and-tools/venn"></b-venn>',
    en: '<b-venn name="ai-in-code-harness-and-tools/venn"></b-venn>',
  },
})
