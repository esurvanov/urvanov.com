import { attr, color, defineBlock, icon } from '../core'

// Путь данных карточками со стрелками: у карточки цветная верхняя граница и значок того же цвета.
// На телефоне — столбиком, стрелки вниз
export default defineBlock({
  tag: 'pipe',
  title: 'Путь данных',
  doc: 'Карточки инструментов со стрелками: откуда и куда идут данные.',
  attrs: { label: { doc: 'весь путь словами для скринридера', required: true } },
  slots: {
    node: {
      doc: 'карточка; внутри — название (можно ссылкой)',
      required: true,
      attrs: {
        icon: { doc: 'значок', required: true },
        color: { doc: 'цвет границы и значка: токен или CSS-цвет', required: true },
        sub: { doc: 'подпись под названием', required: true },
      },
    },
  },
  render: ({ attrs, slots }) => `<div class="bk-pipe" aria-label="${attr(attrs.label)}">${slots.node.map((n) =>
    `<span class="bk-pn" style="--c:${color(n.attrs.color)}">${icon(n.attrs.icon)}<span>${n.html}</span><small>${n.attrs.sub}</small></span>`).join(`<span class="bk-pipe-ar">${icon('arrow-right')}</span>`)}</div>`,
  example: {
    ru: '<b-pipe label="Агент заполняет таблицу">\n  <node icon="terminal" color="c-code" sub="Или любой агент с MCP">Claude Code</node>\n  <node icon="plug" color="c-light" sub="Чтение и запись таблицы">Airtable MCP</node>\n  <node icon="table" color="c-proj" sub="Все поля и статусы">Airtable</node>\n</b-pipe>',
    en: '<b-pipe label="The agent fills the table">\n  <node icon="terminal" color="c-code" sub="Or any agent with MCP">Claude Code</node>\n  <node icon="plug" color="c-light" sub="Reads and writes the table">Airtable MCP</node>\n  <node icon="table" color="c-proj" sub="All fields and statuses">Airtable</node>\n</b-pipe>',
  },
})
