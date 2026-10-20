import { attr, defineBlock, icon } from '../core'

// Состав харнесса таблицей-карточками: колонки — типы харнесса, строки — слои (человек, среда, инструменты…).
// Ячейка — значок слоя, подпись и значки источников в углу; part — слой есть частично (пунктир, бледнее),
// diff — отличие от эталонной колонки (знак ≠ в углу). Ячейки идут подряд по строкам, по числу колонок
export default defineBlock({
  tag: 'harness-matrix',
  title: 'Состав харнесса',
  doc: 'Сетка «тип харнесса × слой»: ячейки со значками, частичные — пунктиром, отличия — знаком ≠; легенда снизу.',
  attrs: {
    label: { doc: 'подпись для скринридера (aria-label)', required: true },
    diff: { doc: 'всплывающая подпись ячейки-отличия', required: true },
    legend: { doc: 'легенда: отличие | есть | частично', required: true },
  },
  slots: {
    col: { doc: 'колонка; внутри — мелкая подпись (продукты)', required: true, attrs: { icon: { doc: 'значок', required: true }, t: { doc: 'название', required: true } } },
    row: { doc: 'строка-слой', required: true, attrs: { t: { doc: 'название слоя', required: true } } },
    cell: {
      doc: 'ячейка (по порядку, строка за строкой); внутри — <b-proof>',
      required: true,
      attrs: {
        icon: { doc: 'значок', required: true },
        t: { doc: 'подпись' },
        part: { doc: 'слой есть частично', values: [''] },
        diff: { doc: 'отличие от эталонной колонки', values: [''] },
      },
    },
  },
  render: ({ attrs, slots }) => {
    const n = slots.col.length
    const head = `<div class="bk-harness-matrix-row bk-harness-matrix-h"><div></div>${slots.col.map((c) => `<div class="bk-harness-matrix-hh">${icon(c.attrs.icon, '1.75')}<span>${c.attrs.t}</span><small>${c.html}</small></div>`).join('')}</div>`
    const cell = (c: (typeof slots.cell)[number]) => {
      const cls = ['bk-harness-matrix-c', 'diff' in c.attrs ? 'bk-harness-matrix-diff' : '', 'part' in c.attrs ? 'bk-harness-matrix-part' : ''].filter(Boolean).join(' ')
      const title = 'diff' in c.attrs ? ` title="${attr(attrs.diff)}"` : ''
      return `<div${title} class="${cls}">${icon(c.attrs.icon, '1.75')}${c.attrs.t ? `<span class="bk-harness-matrix-cap">${c.attrs.t}</span>` : ''}${c.html ? `<span class="bk-harness-matrix-ps">${c.html}</span>` : ''}</div>`
    }
    const rows = slots.row.map((r, i) => `<div class="bk-harness-matrix-row"><div class="bk-harness-matrix-rl">${r.attrs.t}</div>${slots.cell.slice(i * n, i * n + n).map(cell).join('')}</div>`).join('')
    const [dif, full, part] = attrs.legend.split('|').map((x) => x.trim())
    return `<div class="bk-harness-matrix" style="--bk-hx-n:${n}" aria-label="${attr(attrs.label)}">${head}${rows}</div><div class="bk-harness-matrix-leg"><span><i class="bk-harness-matrix-li-dif"></i>${dif}</span><span><i class="bk-harness-matrix-li-full"></i>${full}</span><span><i class="bk-harness-matrix-li-part"></i>${part}</span></div>`
  },
  example: {
    ru: '<b-harness-matrix label="Состав харнесса" diff="отличие от энтерпрайза" legend="отличие от энтерпрайза|есть|частично">\n  <col icon="code-wide" t="По API">публичный API</col>\n  <col icon="laptop" t="Энтерпрайз">приватный API</col>\n  <row t="Человек"></row>\n  <row t="Среда"></row>\n  <cell icon="user-alt" t="рядом / в конце"><b-proof href="https://example.com/" quote="Источник — example.com"></b-proof></cell>\n  <cell icon="user-alt" t="каждый шаг" diff></cell>\n  <cell icon="rows" t="ваш компьютер"></cell>\n  <cell icon="cloud" t="VM провайдера" diff part></cell>\n</b-harness-matrix>',
    en: '<b-harness-matrix label="Harness layers" diff="differs from enterprise" legend="differs from enterprise|present|partial">\n  <col icon="code-wide" t="Via API">public API</col>\n  <col icon="laptop" t="Enterprise">private API</col>\n  <row t="Human"></row>\n  <row t="Environment"></row>\n  <cell icon="user-alt" t="along / at the end"><b-proof href="https://example.com/" quote="Source — example.com"></b-proof></cell>\n  <cell icon="user-alt" t="every step" diff></cell>\n  <cell icon="rows" t="your computer"></cell>\n  <cell icon="cloud" t="provider VM" diff part></cell>\n</b-harness-matrix>',
  },
})
