import { color, defineBlock } from '../core'

// Горизонтальные полосы-счётчики: подпись слева, полоса, число справа («Slack ▬▬▬ 520»)
export default defineBlock({
  tag: 'count-bars',
  title: 'Полосы-счётчики',
  doc: 'Список полос: название, длина полосы, число справа.',
  slots: {
    bar: {
      doc: 'полоса; внутри — число справа',
      required: true,
      attrs: { k: { doc: 'подпись слева', required: true }, w: { doc: 'длина: 65%', required: true }, color: { doc: 'цвет полосы', required: true } },
    },
  },
  render: ({ slots }) => `<div class="bk-bars">${slots.bar.map((b) =>
    `<div class="bk-cbar"><span class="bk-cbar-l">${b.attrs.k}</span><span class="bk-cbar-tr"><span style="width:${b.attrs.w};background:${color(b.attrs.color)}"></span></span><span class="bk-cbar-v">${b.html}</span></div>`).join('')}</div>`,
  example: {
    ru: '<b-count-bars>\n  <bar k="Slack" w="100%" color="c-work">520</bar>\n  <bar k="Notion" w="65%" color="c-work">340</bar>\n  <bar k="GitHub" w="40%" color="c-work">210</bar>\n</b-count-bars>',
    en: '<b-count-bars>\n  <bar k="Slack" w="100%" color="c-work">520</bar>\n  <bar k="Notion" w="65%" color="c-work">340</bar>\n  <bar k="GitHub" w="40%" color="c-work">210</bar>\n</b-count-bars>',
  },
})
