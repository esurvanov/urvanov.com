import { defineBlock, icon, inline } from '../core'

// Плашка «как сделать» цветом акцента; <warn> под пунктиром — оговорка со значком цветом предупреждения
export default defineBlock({
  tag: 'howto',
  title: 'Как сделать',
  doc: 'Плашка с инструкцией; внизу может быть оговорка <warn>.',
  slots: { warn: { doc: 'оговорка под пунктиром; внутри — текст', attrs: { icon: { doc: 'значок', required: true } } } },
  render: ({ children, slots }) => `<div class="bk-howto">${inline(children)}${(slots.warn ?? []).map((w) =>
    `<div class="bk-howto-w"><span class="bk-howto-wi">${icon(w.attrs.icon)}</span><span>${inline(w.html)}</span></div>`).join('')}</div>`,
  example: {
    ru: '<b-howto><b>Как выгружать.</b> Выгрузку удобно поручить браузерному агенту: он открывает раздел, ставит фильтр и сохраняет CSV.<warn icon="shield-alert"><b>Доступ.</b> API консоли доступен не всегда: политики безопасности часто ограничивают ключи.</warn></b-howto>',
    en: '<b-howto><b>How to export.</b> A browser agent can do the export: it opens the section, sets the filter and saves the CSV.<warn icon="shield-alert"><b>Access.</b> The console API is not always available: security policies often restrict keys.</warn></b-howto>',
  },
})
