import { defineBlock, inline } from '../core'

// Благодарность и источник метода: по чьим рекомендациям сделано
export default defineBlock({
  tag: 'credit',
  title: 'Благодарность',
  doc: 'Строка «по рекомендациям …» под разделом.',
  // Отступы абзаца: так стояла строка благодарности в начале старых постов (общее правило абзацев перебивало её отступ)
  attrs: { para: { doc: 'отступы обычного абзаца: 0 сверху, 0.8em снизу', values: [''] } },
  render: ({ attrs, children }) => `<p class="bk-credit${'para' in attrs ? ' bk-credit-para' : ''}">${inline(children)}</p>`,
  example: {
    ru: '<b-credit>Дизайн выборки — по рекомендациям <a href="https://example.com/" target="_blank" rel="noopener">@author</a></b-credit>',
    en: '<b-credit>Sample design follows recommendations by <a href="https://example.com/" target="_blank" rel="noopener">@author</a></b-credit>',
  },
})
