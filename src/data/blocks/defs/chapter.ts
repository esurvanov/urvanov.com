import { attr, defineBlock, flowBody, icon } from '../core'

// Глава с номером (счётчик в CSS) и заголовком h2. id нужен оглавлению (toc во фронтматтере);
// глава id="next" — «Дальше по теме»: страница поста выносит её вниз, к блоку «С теми же терминами»
export default defineBlock({
  tag: 'chapter',
  title: 'Глава',
  doc: 'Раздел поста с номером и заголовком; внутри — блоки и markdown абзацами.',
  attrs: {
    id: { doc: 'якорь для оглавления', required: true },
    title: { doc: 'заголовок h2', required: true },
    icon: { doc: 'значок перед заголовком (имя из icons.ts)' },
    // В старых постах у отдельных глав значок был с линией 2, а не 1.8
    sw: { doc: 'толщина линии значка (по умолчанию 1.8)' },
  },
  flow: true,
  render: ({ attrs, children }) =>
    `<section class="bk-chapter" id="${attr(attrs.id)}"><h2>${attrs.icon ? `<span class="bk-ico" aria-hidden="true">${icon(attrs.icon, attrs.sw ?? '1.8')}</span>` : ''}${attrs.title}</h2>${flowBody(children)}</section>`,
  example: {
    ru: '<b-chapter id="demo-chapter" title="Заголовок главы" icon="refresh"><b-why>Глава — номер, заголовок и содержимое.</b-why>\n\nОбычный абзац markdown внутри главы.\n\n</b-chapter>',
    en: '<b-chapter id="demo-chapter" title="Chapter heading" icon="refresh"><b-why>A chapter is a number, a heading and content.</b-why>\n\nA plain markdown paragraph inside the chapter.\n\n</b-chapter>',
  },
})
