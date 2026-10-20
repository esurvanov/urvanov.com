import { marked } from 'marked'
import { attr, defineBlock } from '../core'

// Таблица в рамке с прокруткой на узком экране. Внутри — обычный <table> или таблица markdown (| a | b |).
// Числовая колонка: <td class="bk-r">, метки «да/нет» — <b-tag>
export default defineBlock({
  tag: 'table',
  title: 'Таблица',
  doc: 'Таблица в рамке; внутри HTML-таблица или markdown-таблица.',
  attrs: { id: { doc: 'якорь' } },
  // Строки markdown-таблицы должны остаться строками: содержимое не склеивается в одну строку
  flow: true,
  render: ({ attrs, children }) => {
    const body = children.trim().startsWith('|') ? (marked.parse(children.trim(), { async: false }) as string).trim().replace(/>\n</g, '><') : children.trim()
    return `<div class="bk-tbl"${attrs.id ? ` id="${attr(attrs.id)}"` : ''}>${body}</div>`
  },
  example: {
    ru: '<b-table>\n| Команда | Регулярно | Статус |\n|---|---|---|\n| Команда A | <b-bar value="74"></b-bar> | <b-tag kind="ok">покрыта</b-tag> |\n| Команда B | <b-bar value="31"></b-bar> | <b-tag kind="no">нет людей</b-tag> |\n</b-table>',
    en: '<b-table>\n| Team | Regular | Status |\n|---|---|---|\n| Team A | <b-bar value="74"></b-bar> | <b-tag kind="ok">covered</b-tag> |\n| Team B | <b-bar value="31"></b-bar> | <b-tag kind="no">no people</b-tag> |\n</b-table>',
  },
})
