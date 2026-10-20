import { defineBlock, inline } from '../core'

// Благодарность и источник метода: по чьим рекомендациям сделано
export default defineBlock({
  tag: 'credit',
  title: 'Благодарность',
  doc: 'Строка «по рекомендациям …» под разделом.',
  attrs: { tight: { doc: 'отступы как у обычного абзаца (первой строкой поста): 0 сверху, .8em снизу', values: [''] } },
  render: ({ attrs, children }) => `<p class="bk-credit${'tight' in attrs ? ' bk-tight' : ''}">${inline(children)}</p>`,
  example: {
    ru: '<b-credit>Дизайн выборки — по рекомендациям <a href="https://example.com/" target="_blank" rel="noopener">@author</a></b-credit>',
    en: '<b-credit>Sample design follows recommendations by <a href="https://example.com/" target="_blank" rel="noopener">@author</a></b-credit>',
  },
})
