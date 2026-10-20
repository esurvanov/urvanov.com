import { attr, defineBlock, icon } from '../core'

// Карточка-превью таблицы Airtable: шапка (значок, название, подпись, число записей) и несколько строк.
// Колонки задаёт <col> (ширина w, на телефоне — mw; колонка без mw на телефоне скрыта), строки — <row> с ячейками через « | »
export default defineBlock({
  tag: 'airtable-preview',
  title: 'Превью таблицы Airtable',
  doc: 'Карточка с шапкой и мини-таблицей; на телефоне — только колонки с mw.',
  attrs: {
    icon: { doc: 'значок в шапке', required: true },
    title: { doc: 'название (можно ссылкой)', required: true },
    sub: { doc: 'подпись рядом с названием', required: true },
    count: { doc: 'справа в шапке: «16 записей»', required: true },
  },
  slots: {
    col: {
      doc: 'колонка; внутри — заголовок',
      required: true,
      attrs: {
        w: { doc: 'ширина в сетке: 1fr, .9fr', required: true },
        mw: { doc: 'ширина на телефоне; без неё колонка на телефоне скрыта' },
        kind: { doc: 'note — текст моноширинным, ours — заголовок цветом «заполняет ChatGPT»', values: ['note', 'ours', 'wide'] },
      },
    },
    row: { doc: 'строка: ячейки через « | »', required: true },
  },
  render: ({ attrs, slots }) => {
    const cols = slots.col
    // Классы ячейки: шапка, моноширинный текст, скрыта на телефоне, «заполняет ChatGPT», последняя строка
    const span = (html: string, k: (string | false)[]) => {
      const c = k.filter(Boolean).join(' ')
      return `<span${c ? ` class="${c}"` : ''}>${html}</span>`
    }
    const head = cols.map((c) => span(c.html, ['bk-mh', c.attrs.kind === 'note' && 'bk-mnt', !c.attrs.mw && 'bk-mwide', c.attrs.kind === 'ours' && 'bk-mours']))
    const rows = slots.row.map((r, i) => {
      const cells = r.html.split(' | ')
      if (cells.length !== cols.length) throw new Error(`blocks: <b-airtable-preview> строка ${i + 1}: ${cells.length} ячеек, а колонок ${cols.length}`)
      const last = i === slots.row.length - 1
      return cells.map((x, j) => span(x.trim(), [cols[j].attrs.kind === 'note' && 'bk-mnt', !cols[j].attrs.mw && 'bk-mwide', last && 'bk-mlast'])).join('')
    })
    const grid = `--cols:${cols.map((c) => c.attrs.w).join(' ')};--cols-m:${cols.filter((c) => c.attrs.mw).map((c) => c.attrs.mw).join(' ')}`
    return `<div class="bk-sink"><div class="bk-sink-h">${icon(attrs.icon)}<b>${attrs.title}</b><span>${attrs.sub}</span><small>${attrs.count}</small></div>`
      + `<div class="bk-mini" style="${attr(grid)}">${head.join('')}${rows.join('')}</div></div>`
  },
  example: {
    ru: '<b-airtable-preview icon="table" title="Airtable" sub="Всё в одной таблице" count="16 записей">\n  <col w="1.1fr" mw="1.2fr">Имя</col>\n  <col w="1.7fr" kind="note">Notes</col>\n  <col w="1fr" mw="1fr" kind="ours">Со слов</col>\n  <col w="1fr" mw="1fr">По отчёту</col>\n  <row>Hana Sato | Ведущий [00:00]: Вспомните… | <b-select-pill tone="green">каждую неделю</b-select-pill> | <b-select-pill tone="green">каждую неделю</b-select-pill></row>\n  <row>Pavel Novak | [27.09 10:15] Ведущий: Опишите… | <b-select-pill tone="cyan">регулярно</b-select-pill> | <b-select-pill tone="red">не пользуется</b-select-pill></row>\n</b-airtable-preview>',
    en: '<b-airtable-preview icon="table" title="Airtable" sub="All in one table" count="16 records">\n  <col w="1.1fr" mw="1.2fr">Name</col>\n  <col w="1.7fr" kind="note">Notes</col>\n  <col w="1fr" mw="1fr" kind="ours">Self-reported</col>\n  <col w="1fr" mw="1fr">By report</col>\n  <row>Hana Sato | Host [00:00]: Think back… | <b-select-pill tone="green">weekly</b-select-pill> | <b-select-pill tone="green">weekly</b-select-pill></row>\n  <row>Pavel Novak | [27.09 10:15] Host: Describe… | <b-select-pill tone="cyan">regularly</b-select-pill> | <b-select-pill tone="red">not using</b-select-pill></row>\n</b-airtable-preview>',
  },
})
