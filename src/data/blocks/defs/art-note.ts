import { defineBlock, inline, topStyle } from '../core'

// Мелкая приглушённая строка вплотную под схемой: отступ сверху задаётся (по умолчанию 8px), снизу — как у абзаца.
// <b-cap> — то же без отступа сверху и с подчёркнутыми ссылками
export default defineBlock({
  tag: 'art-note',
  title: 'Примечание под схемой',
  doc: 'Мелкое примечание вплотную под схемой; top — отступ сверху в px (по умолчанию 8).',
  attrs: {
    top: { doc: 'отступ сверху в px' },
    align: { doc: 'left — без выключки по ширине', values: ['left'] },
  },
  render: ({ attrs, children }) => `<p class="bk-art-note${attrs.align ? ' bk-art-note-left' : ''}"${topStyle(attrs.top)}>${inline(children)}</p>`,
  example: {
    ru: '<b-art-note top="6">Порог 25 000 можно поднять настройкой окружения.</b-art-note>',
    en: '<b-art-note top="6">The 25,000 threshold can be raised with an environment setting.</b-art-note>',
  },
})
