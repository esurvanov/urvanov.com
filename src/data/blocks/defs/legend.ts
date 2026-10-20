import { color, defineBlock } from '../core'

// Легенда к схеме или полосе: цветной квадратик и подпись
export default defineBlock({
  tag: 'legend',
  title: 'Легенда',
  doc: 'Подписи цветов под схемой или полосой.',
  slots: { item: { doc: 'цвет и подпись', required: true, attrs: { color: { doc: 'токен (c-code, accent…) или CSS-цвет', required: true } } } },
  render: ({ slots }) => `<div class="bk-legend">${slots.item.map((s) => `<span><i style="background:${color(s.attrs.color)}"></i>${s.html}</span>`).join('')}</div>`,
  example: {
    ru: '<b-legend>\n  <item color="c-code">код</item>\n  <item color="c-work">агент</item>\n  <item color="c-chat">ресёрч</item>\n  <item color="c-none">неактивные</item>\n</b-legend>',
    en: '<b-legend>\n  <item color="c-code">code</item>\n  <item color="c-work">agent</item>\n  <item color="c-chat">research</item>\n  <item color="c-none">inactive</item>\n</b-legend>',
  },
})
