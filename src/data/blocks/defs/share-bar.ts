import { attr, color, defineBlock } from '../core'

// Полоса долей трёх видов: time — минуты сценария (цифры моноширинным), status — статусы приглашённых (низкая,
// цвета Airtable), wide — крупная полоса групп с подписями «164 · Chat». Ширина отрезка — w: число (доля) или «20.9%»
export default defineBlock({
  tag: 'share-bar',
  title: 'Полоса долей: минуты, статусы, группы',
  doc: 'Полоса из цветных отрезков с подписями; вид задаёт высоту и шрифт.',
  attrs: {
    kind: { doc: 'time — минуты, status — статусы, wide — крупная с подписями', required: true, values: ['time', 'status', 'wide'] },
    label: { doc: 'подпись для скринридера (aria-label)' },
  },
  slots: {
    seg: {
      doc: 'отрезок; внутри — подпись на нём',
      required: true,
      attrs: { w: { doc: 'доля: 2 (flex) или 20.9%', required: true }, color: { doc: 'фон: токен или CSS-цвет', required: true }, ink: { doc: 'цвет текста' } },
    },
  },
  render: ({ attrs, slots }) => `<div class="bk-sbar bk-sbar-${attrs.kind}"${attrs.label ? ` aria-label="${attr(attrs.label)}"` : ''}>${slots.seg.map((s) => {
    const w = s.attrs.w.endsWith('%') ? `width:${s.attrs.w}` : `flex:${s.attrs.w}`
    return `<div style="${w};background:${color(s.attrs.color)}${s.attrs.ink ? `;color:${color(s.attrs.ink)}` : ''}">${s.html}</div>`
  }).join('')}</div>`,
  example: {
    ru: '<b-share-bar kind="time" label="30 минут">\n  <seg w="2" color="c-none" ink="ink">2</seg>\n  <seg w="8" color="c-chat">8</seg>\n  <seg w="5" color="c-work">5</seg>\n</b-share-bar>\n<b-share-bar kind="status" label="Статусы">\n  <seg w="9" color="pg" ink="pg-i">Успех · 9</seg>\n  <seg w="2" color="py" ink="py-i">2</seg>\n  <seg w="1" color="pr" ink="pr-i">1</seg>\n</b-share-bar>\n<b-share-bar kind="wide">\n  <seg w="48.2%" color="c-chat">164 · Chat</seg>\n  <seg w="25%" color="c-work">85 · Work</seg>\n  <seg w="26.8%" color="c-none" ink="ink">91 · без трат</seg>\n</b-share-bar>',
    en: '<b-share-bar kind="time" label="30 minutes">\n  <seg w="2" color="c-none" ink="ink">2</seg>\n  <seg w="8" color="c-chat">8</seg>\n  <seg w="5" color="c-work">5</seg>\n</b-share-bar>\n<b-share-bar kind="status" label="Statuses">\n  <seg w="9" color="pg" ink="pg-i">Done · 9</seg>\n  <seg w="2" color="py" ink="py-i">2</seg>\n  <seg w="1" color="pr" ink="pr-i">1</seg>\n</b-share-bar>\n<b-share-bar kind="wide">\n  <seg w="48.2%" color="c-chat">164 · Chat</seg>\n  <seg w="25%" color="c-work">85 · Work</seg>\n  <seg w="26.8%" color="c-none" ink="ink">91 · no spend</seg>\n</b-share-bar>',
  },
})
