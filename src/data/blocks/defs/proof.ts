import { attr, defineBlock, icon } from '../core'

// Значок источника рядом с утверждением: ссылка на первоисточник, цитата — подсказкой при наведении (CSS ::after).
// Ставится вплотную к слову, без пробела: «…ответить „не знаю“<b-proof …/>.»
export default defineBlock({
  tag: 'proof',
  title: 'Источник',
  doc: 'Значок-ссылка на источник с цитатой во всплывающей подсказке.',
  attrs: {
    href: { doc: 'адрес источника', required: true },
    quote: { doc: 'цитата для подсказки: «Кто: „текст“ — адрес»', required: true },
  },
  render: ({ attrs, l }) =>
    `<a class="bk-proof" href="${attr(attrs.href)}" target="_blank" rel="noopener" data-quote="${attr(attrs.quote)}" aria-label="${l('Источник', 'Source')}">${icon('external')}</a>`,
  example: {
    ru: '<p>Утверждение со ссылкой на источник<b-proof href="https://example.com/" quote="Автор: «цитата, на которую опирается утверждение» — example.com"></b-proof>.</p>',
    en: '<p>A claim with a link to its source<b-proof href="https://example.com/" quote="Author: “the quote the claim relies on” — example.com"></b-proof>.</p>',
  },
})
