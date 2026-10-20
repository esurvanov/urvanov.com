import { defineBlock } from '../core'

// Дорожки столбиком с ровным зазором: сетка в одну колонку, все дорожки одной ширины — по самой широкой
export default defineBlock({
  tag: 'lane-stack',
  title: 'Дорожки столбиком',
  doc: 'Несколько <b-lane> / <b-icon-lane> друг под другом с зазором 10px и общей шириной.',
  render: ({ children }) => `<div class="bk-lane-stack">${children.trim()}</div>`,
  example: {
    ru: '<b-lane-stack>\n  <b-lane title="Было" color="muted"><b-cap>Первая дорожка.</b-cap></b-lane>\n  <b-lane title="Стало" color="accent"><b-cap>Вторая дорожка.</b-cap></b-lane>\n</b-lane-stack>',
    en: '<b-lane-stack>\n  <b-lane title="Before" color="muted"><b-cap>The first lane.</b-cap></b-lane>\n  <b-lane title="Now" color="accent"><b-cap>The second lane.</b-cap></b-lane>\n</b-lane-stack>',
  },
})
