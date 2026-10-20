import { defineBlock, inline } from '../core'

// Сетка сравнения в три колонки: заголовки <h>, ячейки <c> по строкам. На телефоне — столбиком, без заголовков,
// строки разделены жирной линией
export default defineBlock({
  tag: 'vs-grid',
  title: 'Сетка сравнения',
  doc: 'Три колонки: заголовки и ячейки по строкам, слева направо.',
  slots: {
    h: { doc: 'заголовок колонки (три)', required: true },
    c: { doc: 'ячейка; по три на строку', required: true },
  },
  render: ({ slots }) => {
    if (slots.h.length !== 3 || slots.c.length % 3) throw new Error('blocks: <b-vs-grid> — три <h> и ячейки <c> по три на строку')
    return `<div class="bk-vs">${slots.h.map((h) => `<div class="bk-vs-h">${h.html}</div>`).join('')}${slots.c.map((c) => `<div>${inline(c.html)}</div>`).join('')}</div>`
  },
  example: {
    ru: '<b-vs-grid>\n  <h>Замер в интервью</h>\n  <h>Пара в отчёте</h>\n  <h>Если не совпало — уточнить</h>\n  <c>**Как часто пользуется**</c>\n  <c>[активность по неделям](#)</c>\n  <c>какими инструментами и для каких задач</c>\n  <c>**Сколько времени экономит**</c>\n  <c>нет пары</c>\n  <c>только со слов</c>\n</b-vs-grid>',
    en: '<b-vs-grid>\n  <h>Interview measure</h>\n  <h>Report pair</h>\n  <h>If they differ — ask</h>\n  <c>**How often they use it**</c>\n  <c>[weekly activity](#)</c>\n  <c>which tools and for which tasks</c>\n  <c>**Time saved**</c>\n  <c>no pair</c>\n  <c>self-reported only</c>\n</b-vs-grid>',
  },
})
