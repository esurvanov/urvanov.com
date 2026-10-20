import { attr, defineBlock } from '../core'

// Ссылка цветом текста вокруг (название сервиса посреди подписи или схемы): подчёркнута, plain — без подчёркивания.
// Без класса, с data-атрибутом: так у ссылки в абзаце, ячейке и подписи остаётся общая стрелка сайта (site.css)
export default defineBlock({
  tag: 'ink-link',
  title: 'Ссылка цветом текста',
  doc: 'Ссылка, которая не выделяется цветом: только подчёркивание (plain — и без него).',
  attrs: { href: { doc: 'адрес; внешний открывается в новой вкладке', required: true }, plain: { doc: 'без подчёркивания', values: [''] } },
  render: ({ attrs, children }) =>
    `<a href="${attr(attrs.href)}"${/^https?:/.test(attrs.href) ? ' target="_blank" rel="noopener"' : ''} data-bk-ink${'plain' in attrs ? '="plain"' : ''}>${children.trim()}</a>`,
  example: {
    ru: '<p>Транскрипт из <b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> или <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> копируется в поле Notes; <b-ink-link href="https://airtable.com" plain>Airtable</b-ink-link> — без подчёркивания.</p>',
    en: '<p>The transcript from <b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> or <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> goes into the Notes field; <b-ink-link href="https://airtable.com" plain>Airtable</b-ink-link> — without underline.</p>',
  },
})
