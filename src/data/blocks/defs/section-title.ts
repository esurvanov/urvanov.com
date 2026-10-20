import { attr, defineBlock, inline, topStyle } from '../core'

// Заголовок h3 с якорем посреди главы (на него ссылаются из других постов), без рамки подраздела
export default defineBlock({
  tag: 'section-title',
  title: 'Заголовок с якорем',
  doc: 'Заголовок h3 с якорем внутри главы; top — отступ сверху.',
  attrs: { id: { doc: 'якорь', required: true }, top: { doc: 'отступ сверху в px' } },
  render: ({ attrs, children }) => `<h3 id="${attr(attrs.id)}"${topStyle(attrs.top)}>${inline(children)}</h3>`,
  example: {
    ru: '<b-section-title id="demo-decision" top="22">Как ответы превращаются в решение о закупке</b-section-title>',
    en: '<b-section-title id="demo-decision" top="22">How answers turn into a purchase decision</b-section-title>',
  },
})
