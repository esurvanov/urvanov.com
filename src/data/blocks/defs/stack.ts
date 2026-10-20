import { attr, color, defineBlock } from '../core'

// Полоса из цветных отрезков: доли групп. Ширина отрезка — w (число — доля, «20.9%» — точная ширина)
export default defineBlock({
  tag: 'stack',
  title: 'Полоса долей',
  doc: 'Горизонтальная полоса из цветных отрезков с числами; рядом обычно <b-legend>.',
  attrs: { label: { doc: 'подпись для скринридера (aria-label)' } },
  slots: {
    seg: {
      doc: 'отрезок; внутри — число на нём',
      required: true,
      attrs: { w: { doc: 'доля: 2 (flex) или 20.9%', required: true }, color: { doc: 'фон: токен или CSS-цвет', required: true }, ink: { doc: 'цвет текста (по умолчанию белый)' } },
    },
  },
  render: ({ attrs, slots }) => `<div class="bk-stack"${attrs.label ? ` aria-label="${attr(attrs.label)}"` : ''}>${slots.seg.map((s) => {
    const w = s.attrs.w.endsWith('%') ? `width:${s.attrs.w}` : `flex:${s.attrs.w}`
    return `<div class="bk-stack-seg" style="${w};background:${color(s.attrs.color)}${s.attrs.ink ? `;color:${color(s.attrs.ink)}` : ''}">${s.html}</div>`
  }).join('')}</div>`,
  example: {
    ru: '<b-stack label="Распределение интервью по группам">\n  <seg w="2" color="c-code">2</seg>\n  <seg w="3" color="c-work">3</seg>\n  <seg w="2" color="c-chat">2</seg>\n  <seg w="1" color="c-none" ink="ink">1</seg>\n</b-stack>',
    en: '<b-stack label="Interviews by group">\n  <seg w="2" color="c-code">2</seg>\n  <seg w="3" color="c-work">3</seg>\n  <seg w="2" color="c-chat">2</seg>\n  <seg w="1" color="c-none" ink="ink">1</seg>\n</b-stack>',
  },
})
