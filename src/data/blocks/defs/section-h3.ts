import { defineBlock, inline, topStyle } from '../core'

// Подзаголовок h3 размера заголовка раздела (20px) с отступом сверху: часть главы со своей темой.
// Мельче, над промптом — <b-subhead>
export default defineBlock({
  tag: 'section-h3',
  title: 'Заголовок части главы',
  doc: 'Заголовок h3 части главы (20px); top — отступ сверху в px.',
  attrs: { top: { doc: 'отступ сверху в px' } },
  render: ({ attrs, children }) => `<h3 class="bk-sh3"${topStyle(attrs.top)}>${inline(children)}</h3>`,
  example: { ru: '<b-section-h3 top="14">Что записать в библию</b-section-h3>', en: '<b-section-h3 top="14">What to write into the bible</b-section-h3>' },
})
