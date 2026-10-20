import { attr, defineBlock } from '../core'

// Оценка точками «4 из 5» в ячейке таблицы; warn — точки цветом предупреждения (для риска: больше — хуже)
export default defineBlock({
  tag: 'rating',
  title: 'Оценка точками',
  doc: 'Ряд точек: закрашено value из of; подпись для скринридера — label.',
  attrs: {
    value: { doc: 'сколько точек закрашено', required: true },
    of: { doc: 'всего точек', required: true },
    label: { doc: 'оценка словами для скринридера: «4 из 5»', required: true },
    warn: { doc: 'точки цветом предупреждения', values: [''] },
  },
  render: ({ attrs }) => {
    const v = Number(attrs.value), n = Number(attrs.of)
    if (!(n >= 1 && n <= 10 && v >= 0 && v <= n)) throw new Error(`blocks: <b-rating value="${attrs.value}" of="${attrs.of}"> — нужно 0 ≤ value ≤ of ≤ 10`)
    const dots = Array.from({ length: n }, (_, i) => (i < v ? '<i class="bk-on"></i>' : '<i></i>')).join('')
    return `<span class="bk-rt${'warn' in attrs ? ' bk-rt-w' : ''}" aria-label="${attr(attrs.label)}">${dots}</span>`
  },
  example: {
    ru: '<b-table>\n| Критерий | <b-icon name="mic" sw="2.2"></b-icon> Голос | <b-icon name="lines" sw="2.2"></b-icon> Текст |\n|---|---|---|\n| Глубина ответа | <b-rating value="5" of="5" label="5 из 5"></b-rating> | <b-rating value="2" of="5" label="2 из 5"></b-rating> |\n| Риск уйти в сторону | <b-rating value="4" of="5" warn label="4 из 5"></b-rating> | <b-rating value="1" of="5" warn label="1 из 5"></b-rating> |\n</b-table>',
    en: '<b-table>\n| Criterion | <b-icon name="mic" sw="2.2"></b-icon> Voice | <b-icon name="lines" sw="2.2"></b-icon> Text |\n|---|---|---|\n| Answer depth | <b-rating value="5" of="5" label="5 of 5"></b-rating> | <b-rating value="2" of="5" label="2 of 5"></b-rating> |\n| Risk of drifting | <b-rating value="4" of="5" warn label="4 of 5"></b-rating> | <b-rating value="1" of="5" warn label="1 of 5"></b-rating> |\n</b-table>',
  },
})
