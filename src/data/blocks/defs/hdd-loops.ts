import { defineBlock } from '../core'

// Одинарная и двойная петля рядом (серия hdd): рисунок петли, название моноширинным капсом и пояснение.
// Рисунки петель — здесь, выбор по kind; on — выделенная карточка
const LOOPS = {
  single: '<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="34" class="bk-hdl-c1"/><path d="M88,40 l6,-10 l4,11" class="bk-hdl-c1"/></svg>',
  double: '<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="24" class="bk-hdl-c1"/><circle cx="60" cy="60" r="46" class="bk-hdl-c2"/><path d="M100,34 l6,-10 l4,11" class="bk-hdl-c2"/></svg>',
}

export default defineBlock({
  tag: 'hdd-loops',
  title: 'Одинарная и двойная петля',
  doc: 'Две карточки с рисунком петли: single — один круг, double — круг в круге; on — выделить карточку.',
  slots: {
    loop: {
      doc: 'карточка; внутри — пояснение',
      required: true,
      attrs: {
        kind: { doc: 'рисунок', required: true, values: ['single', 'double'] },
        t: { doc: 'название', required: true },
        on: { doc: 'выделить рамкой и заливкой', values: [''] },
      },
    },
  },
  render: ({ slots }) => `<div class="bk-hdl">${slots.loop.map((s) =>
    `<div class="bk-hdl-a${'on' in s.attrs ? ' bk-on' : ''}">${LOOPS[s.attrs.kind as keyof typeof LOOPS]}<b>${s.attrs.t}</b><small>${s.html}</small></div>`).join('')}</div>`,
  example: {
    ru: '<b-hdd-loops>\n  <loop kind="single" t="одинарная петля">исправить действие по тем же правилам</loop>\n  <loop kind="double" t="двойная петля" on>изменить сами правила</loop>\n</b-hdd-loops>',
    en: '<b-hdd-loops>\n  <loop kind="single" t="single loop">fix the action under the same rules</loop>\n  <loop kind="double" t="double loop" on>change the rules themselves</loop>\n</b-hdd-loops>',
  },
})
