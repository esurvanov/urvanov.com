import { color, defineBlock } from '../core'

// Мини-воронка для карточки <b-dir-map>: полосы по центру, ширина — доля
export default defineBlock({
  tag: 'mini-funnel',
  title: 'Мини-воронка',
  doc: 'Полосы-ступени по центру с процентами; картинка для карточки карты направлений.',
  slots: {
    seg: {
      doc: 'ступень; внутри — подпись',
      required: true,
      attrs: { w: { doc: 'ширина: 47%', required: true }, color: { doc: 'фон', required: true }, ink: { doc: 'цвет подписи' } },
    },
  },
  render: ({ slots }) => `<div class="bk-fun">${slots.seg.map((s) =>
    `<div style="width:${s.attrs.w};background:${color(s.attrs.color)}${s.attrs.ink ? `;color:${color(s.attrs.ink)}` : ''}">${s.html}</div>`).join('')}</div>`,
  example: {
    ru: '<div style="width:200px"><b-mini-funnel><seg w="82%" color="d-rare" ink="d-rare-t">82%</seg><seg w="47%" color="d-reg" ink="d-reg-t">47%</seg><seg w="21%" color="d-week" ink="d-week-t">21%</seg></b-mini-funnel></div>',
    en: '<div style="width:200px"><b-mini-funnel><seg w="82%" color="d-rare" ink="d-rare-t">82%</seg><seg w="47%" color="d-reg" ink="d-reg-t">47%</seg><seg w="21%" color="d-week" ink="d-week-t">21%</seg></b-mini-funnel></div>',
  },
})
