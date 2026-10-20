import { attr, defineBlock } from '../core'

// Встроенная сцена из /embed/*.html (3D, анимация с графиком): во всю ширину, с заданными пропорциями,
// грузится лениво. title — что на сцене, для скринридера
export default defineBlock({
  tag: 'embed-frame',
  title: 'Встроенная сцена',
  doc: 'Iframe со сценой из /embed/: во всю ширину, пропорции из ratio.',
  attrs: {
    src: { doc: 'адрес страницы сцены (/embed/…)', required: true },
    title: { doc: 'что показывает сцена (для скринридера)', required: true },
    ratio: { doc: 'пропорции, как в CSS aspect-ratio: 16/9, 4/4', required: true },
  },
  render: ({ attrs }) => `<iframe class="bk-embed-frame" src="${attr(attrs.src)}" title="${attr(attrs.title)}" loading="lazy" style="aspect-ratio:${attrs.ratio}"></iframe>`,
  example: {
    ru: '<b-embed-frame src="/embed/agent-hands.html" title="Агенты тянут блоки, вы руководите (3D-сцена)" ratio="16/9"/>',
    en: '<b-embed-frame src="/embed/agent-hands.html" title="Agents haul the blocks, you direct (3D scene)" ratio="16/9"/>',
  },
})
