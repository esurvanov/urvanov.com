import { attr, defineBlock, icon } from '../core'

// Ряд ссылок на инструменты: значок, название, мелкая подпись. Открываются в новой вкладке
export default defineBlock({
  tag: 'tool-links',
  title: 'Ссылки на инструменты',
  doc: 'Плашки-ссылки на внешние сервисы с короткой подписью.',
  slots: {
    item: {
      doc: 'ссылка; внутри — название',
      required: true,
      attrs: { href: { doc: 'адрес', required: true }, icon: { doc: 'значок', required: true }, sub: { doc: 'подпись', required: true } },
    },
  },
  render: ({ slots }) => `<div class="bk-srcs">${slots.item.map((s) =>
    `<a class="bk-srcs-a" href="${attr(s.attrs.href)}" target="_blank" rel="noopener">${icon(s.attrs.icon)}${s.html}<small>${s.attrs.sub}</small></a>`).join('')}</div>`,
  example: {
    ru: '<b-tool-links>\n  <item href="https://airtable.com" icon="external" sub="База и формы">Airtable</item>\n  <item href="https://tldv.io" icon="external" sub="Заметки и расшифровка звонков">tl;dv</item>\n</b-tool-links>',
    en: '<b-tool-links>\n  <item href="https://airtable.com" icon="external" sub="Base and forms">Airtable</item>\n  <item href="https://tldv.io" icon="external" sub="Call notes and transcripts">tl;dv</item>\n</b-tool-links>',
  },
})
