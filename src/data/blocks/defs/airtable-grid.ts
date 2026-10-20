import { defineBlock } from '../core'

// Таблица в виде сетки Airtable: заголовки с типом поля (A, ≡, ◉, #…), номер строки слева, подвал «16 записей».
// Поля — <field>, строки — <row> с ячейками через « | »; вид колонки задаёт kind поля
const KIND: Record<string, string> = { name: 'bk-airtable-grid-nm', note: 'bk-airtable-grid-nt', mark: 'bk-airtable-grid-c', num: 'bk-airtable-grid-r' }

export default defineBlock({
  tag: 'airtable-grid',
  title: 'Таблица Airtable',
  doc: 'Широкая таблица в стиле Airtable: типы полей, номера строк, подвал; прокрутка вбок.',
  attrs: { foot: { doc: 'подвал: «16 записей · показаны 9»', required: true } },
  slots: {
    field: {
      doc: 'поле; внутри — название',
      required: true,
      attrs: {
        type: { doc: 'значок типа поля: A, ≡, ◉, ƒ, #, ▦', required: true },
        kind: { doc: 'name — имя, note — текст моноширинным, mark — знак по центру, num — число справа, ours — поле заполняет ChatGPT', values: ['name', 'note', 'mark', 'num', 'ours'] },
      },
    },
    row: { doc: 'строка: ячейки через « | »', required: true },
  },
  render: ({ attrs, slots }) => {
    const f = slots.field
    const head = `<tr><th></th>${f.map((x) => `<th${x.attrs.kind === 'ours' ? ' class="bk-airtable-grid-me"' : ''}><span class="bk-airtable-grid-ft">${x.attrs.type}</span>${x.html}</th>`).join('')}</tr>`
    const rows = slots.row.map((r, i) => {
      const cells = r.html.split(' | ')
      if (cells.length !== f.length) throw new Error(`blocks: <b-airtable-grid> строка ${i + 1}: ${cells.length} ячеек, а полей ${f.length}`)
      return `<tr><td class="bk-airtable-grid-rn">${i + 1}</td>${cells.map((c, j) => {
        const k = KIND[f[j].attrs.kind ?? '']
        return `<td${k ? ` class="${k}"` : ''}>${c.trim()}</td>`
      }).join('')}</tr>`
    }).join('')
    return `<div class="bk-airtable-grid-atbl"><table><thead>${head}</thead><tbody>${rows}</tbody><tfoot><tr><td colspan="${f.length + 1}">${attrs.foot}</td></tr></tfoot></table></div>`
  },
  example: {
    ru: '<b-airtable-grid foot="2 записи">\n  <field type="A" kind="name">Имя</field>\n  <field type="≡" kind="note">Notes</field>\n  <field type="◉" kind="ours">Частота · со слов</field>\n  <field type="ƒ" kind="mark">≠</field>\n  <field type="#" kind="num">$ / 3 мес</field>\n  <row>Hana Sato | Ведущий [00:00]: Вспомните… | <b-select-pill tone="green">каждую неделю</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 438</row>\n  <row>Luis Moreno | Ведущий [00:00]: Спасибо… | <b-select-pill tone="cyan">регулярно</b-select-pill> | <b-match-mark kind="diff">≠</b-match-mark> | 396</row>\n</b-airtable-grid>',
    en: '<b-airtable-grid foot="2 records">\n  <field type="A" kind="name">Name</field>\n  <field type="≡" kind="note">Notes</field>\n  <field type="◉" kind="ours">Frequency · self-reported</field>\n  <field type="ƒ" kind="mark">≠</field>\n  <field type="#" kind="num">$ / 3 mo</field>\n  <row>Hana Sato | Host [00:00]: Think back… | <b-select-pill tone="green">weekly</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 438</row>\n  <row>Luis Moreno | Host [00:00]: Thanks… | <b-select-pill tone="cyan">regularly</b-select-pill> | <b-match-mark kind="diff">≠</b-match-mark> | 396</row>\n</b-airtable-grid>',
  },
})
