import { attr, defineBlock, icon } from '../core'

// Матрица «строки × колонки» с плашками в клетках (серия hdd): угол, шапки колонок, затем по строке — шапка строки и её клетки.
// canons — устройство харнесса 3 × 3: на телефоне шапки колонок прячутся, а в каждой клетке появляется подпись её колонки;
// guides — направляющие и датчики 2 × 2: на телефоне всё в столбик, у шапки строки может быть шкала скорости (speed)
const chips = (s: string) => s.split('|').map((x) => x.trim()).filter(Boolean).map((x) => `<span class="bk-hdd-matrix-chip">${x}</span>`).join('')

export default defineBlock({
  tag: 'hdd-matrix',
  title: 'Матрица с плашками',
  doc: 'Таблица-сетка: шапки колонок <column>, строки <row>, клетки <cell> с плашками через «|». Клеток — строки × колонки.',
  attrs: {
    label: { doc: 'подпись для скринридера (aria-label)', required: true },
    kind: { doc: 'вид: canons — 3 колонки, на телефоне подписи в клетках; guides — 2 колонки, на телефоне столбиком', required: true, values: ['canons', 'guides'] },
  },
  slots: {
    column: { doc: 'шапка колонки; внутри — пояснение мелко', required: true, attrs: { icon: { doc: 'значок', required: true }, t: { doc: 'название', required: true } } },
    row: {
      doc: 'шапка строки; внутри — пояснение мелко',
      required: true,
      attrs: { icon: { doc: 'значок', required: true }, t: { doc: 'название', required: true }, speed: { doc: 'шкала из трёх делений: сколько закрашено (1–3)' } },
    },
    cell: { doc: 'клетка: плашки через «|»; с empty — пустая клетка с текстом-пометкой', required: true, attrs: { empty: { doc: 'пустая клетка: пунктирная рамка, текст мелко', values: [''] } } },
  },
  render: ({ attrs, slots }) => {
    const head = (s: { attrs: Record<string, string>; html: string }, cls: string) => `<div class="${cls}">${icon(s.attrs.icon)}<b>${s.attrs.t}</b><small>${s.html}</small>${
      s.attrs.speed ? `<span class="bk-hdd-matrix-spd">${[1, 2, 3].map((i) => (i <= Number(s.attrs.speed) ? '<i class="bk-hdd-matrix-on"></i>' : '<i></i>')).join('')}</span>` : ''}</div>`
    const cols = slots.column.length
    const keys = attrs.kind === 'canons'
    const rows = slots.row.map((r, i) => head(r, 'bk-hdd-matrix-r') + slots.cell.slice(i * cols, (i + 1) * cols).map((c, j) => {
      const empty = 'empty' in c.attrs
      const k = keys ? `<em class="bk-hdd-matrix-k">${icon(slots.column[j].attrs.icon)}${slots.column[j].attrs.t}</em>` : ''
      return `<div class="bk-hdd-matrix-x${empty ? ' bk-hdd-matrix-empty' : ''}">${k}${empty ? `<small>${c.html}</small>` : chips(c.html)}</div>`
    }).join('')).join('')
    if (slots.cell.length !== slots.row.length * cols) throw new Error(`blocks: <b-hdd-matrix> — клеток ${slots.cell.length}, нужно ${slots.row.length * cols} (строки × колонки)`)
    return `<div class="bk-hdd-matrix bk-hdd-matrix-${attrs.kind}" role="img" aria-label="${attr(attrs.label)}"><div class="bk-hdd-matrix-c"></div>${slots.column.map((h) => head(h, 'bk-hdd-matrix-h')).join('')}${rows}</div>`
  },
  example: {
    ru: '<b-hdd-matrix kind="guides" label="Направляющие и датчики">\n  <column icon="arrow-right" t="Направляющие">до действия</column>\n  <column icon="eye" t="Датчики">после действия</column>\n  <row icon="cpu" t="Вычислимые" speed="3">быстро · надёжно</row>\n  <cell>типы | генераторы</cell>\n  <cell>тесты | линтер</cell>\n  <row icon="sparkle-4" t="Через ИИ" speed="1">гибко · дороже</row>\n  <cell>скиллы | спеки</cell>\n  <cell empty>пока пусто</cell>\n</b-hdd-matrix>',
    en: '<b-hdd-matrix kind="guides" label="Guides and sensors">\n  <column icon="arrow-right" t="Guides">before the action</column>\n  <column icon="eye" t="Sensors">after the action</column>\n  <row icon="cpu" t="Computational" speed="3">fast · reliable</row>\n  <cell>types | generators</cell>\n  <cell>tests | linter</cell>\n  <row icon="sparkle-4" t="AI-based" speed="1">flexible · costlier</row>\n  <cell>skills | specs</cell>\n  <cell empty>empty for now</cell>\n</b-hdd-matrix>',
  },
})
