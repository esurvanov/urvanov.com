import { defineBlock } from '../core'

// Сетка точек «n человек, выделены on»: картинка для карточки <b-dir-map>. on — номера точек с нуля через запятую
export default defineBlock({
  tag: 'dot-grid',
  title: 'Сетка точек',
  doc: 'Мелкие точки по 24 в ряд; выделенные — цветом.',
  attrs: { n: { doc: 'всего точек', required: true }, on: { doc: 'выделенные точки: номера с нуля через запятую', required: true } },
  render: ({ attrs }) => {
    const n = Number(attrs.n)
    const on = new Set(attrs.on.split(',').map((x) => Number(x.trim())))
    if (!(n > 0 && n <= 2000) || [...on].some((x) => !(x >= 0 && x < n))) throw new Error(`blocks: <b-dot-grid n="${attrs.n}" on="${attrs.on}"> — номера точек от 0 до n-1`)
    return `<div class="bk-dot-grid" aria-hidden="true">${Array.from({ length: n }, (_, i) => (on.has(i) ? '<i class="bk-dot-grid-on"></i>' : '<i></i>')).join('')}</div>`
  },
  example: { ru: '<b-dot-grid n="96" on="5,31,58,77"></b-dot-grid>', en: '<b-dot-grid n="96" on="5,31,58,77"></b-dot-grid>' },
})
