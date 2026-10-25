import { defineBlock } from '../core'

// Одинарная и двойная петля рядом (серия hdd): рисунок петли, название моноширинным капсом и пояснение.
// Рисунки петель — здесь, выбор по kind; on — выделенная карточка. Стрелка — дуга почти в полный круг с наконечником по касательной
const LOOPS = {
  single: '<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M77,30.6 A34,34 0 1 1 36,36" class="bk-hdd-loops-c1"/><path d="M27.4,38.6 L36,36 L33.3,44.6" class="bk-hdd-loops-c1"/></svg>',
  double: '<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="24" class="bk-hdd-loops-c1"/><path d="M83,20.2 A46,46 0 1 1 27.5,27.5" class="bk-hdd-loops-c2"/><path d="M18.9,30.1 L27.5,27.5 L24.8,36.1" class="bk-hdd-loops-h"/></svg>',
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
  render: ({ slots }) => `<div class="bk-hdd-loops">${slots.loop.map((s) =>
    `<div class="bk-hdd-loops-a${'on' in s.attrs ? ' bk-hdd-loops-on' : ''}">${LOOPS[s.attrs.kind as keyof typeof LOOPS]}<b>${s.attrs.t}</b><small>${s.html}</small></div>`).join('')}</div>`,
  example: {
    ru: '<b-hdd-loops>\n  <loop kind="single" t="одинарная петля">исправить действие по тем же правилам</loop>\n  <loop kind="double" t="двойная петля" on>изменить сами правила</loop>\n</b-hdd-loops>',
    en: '<b-hdd-loops>\n  <loop kind="single" t="single loop">fix the action under the same rules</loop>\n  <loop kind="double" t="double loop" on>change the rules themselves</loop>\n</b-hdd-loops>',
  },
})
