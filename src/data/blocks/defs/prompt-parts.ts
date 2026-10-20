import { defineBlock, icon } from '../core'

// Какие части промпта есть в примере: плашки со значком, отсутствующие (off) — бледные
export default defineBlock({
  tag: 'prompt-parts',
  title: 'Части в примере',
  doc: 'Ряд плашек <part>: есть часть в промпте или нет (off).',
  slots: {
    part: {
      doc: 'часть; внутри — название',
      required: true,
      attrs: { icon: { doc: 'значок', required: true }, off: { doc: 'части нет в этом промпте', values: [''] } },
    },
  },
  render: ({ slots }) => `<div class="bk-parts">${slots.part.map((s) => `<span class="bk-pt${'off' in s.attrs ? ' bk-off' : ''}">${icon(s.attrs.icon)}${s.html}</span>`).join('')}</div>`,
  example: {
    ru: '<b-prompt-parts>\n  <part icon="user-alt">Роль</part>\n  <part icon="help-circle" off>Кому и зачем</part>\n  <part icon="file-text">Данные целиком</part>\n  <part icon="checklist">Пример</part>\n  <part icon="lines-alt">Формат</part>\n</b-prompt-parts>',
    en: '<b-prompt-parts>\n  <part icon="user-alt">Role</part>\n  <part icon="help-circle" off>Audience and goal</part>\n  <part icon="file-text">The whole data</part>\n  <part icon="checklist">Example</part>\n  <part icon="lines-alt">Format</part>\n</b-prompt-parts>',
  },
})
