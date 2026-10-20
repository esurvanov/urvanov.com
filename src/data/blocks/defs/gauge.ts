import { attr, color, defineBlock, inline } from '../core'

// Шкала ступеней: подпись слева, полоса заполнения и вывод справа жирным. «1 человек → случай», «анкета подтвердила → в решение»
export default defineBlock({
  tag: 'gauge',
  title: 'Шкала ступеней',
  doc: 'Строки-ступени: подпись, полоса заполнения, вывод.',
  attrs: { label: { doc: 'вся шкала словами для скринридера', required: true } },
  slots: {
    row: {
      doc: 'ступень; внутри — вывод справа',
      required: true,
      attrs: { k: { doc: 'подпись слева', required: true }, w: { doc: 'заполнение: 45%', required: true }, color: { doc: 'цвет полосы', required: true } },
    },
  },
  render: ({ attrs, slots }) => `<div class="bk-gauge" aria-label="${attr(attrs.label)}">${slots.row.map((r) =>
    `<div class="bk-gg"><span>${r.attrs.k}</span><div class="bk-gbar"><i style="width:${r.attrs.w};background:${color(r.attrs.color)}"></i></div><em>${inline(r.html)}</em></div>`).join('')}</div>`,
  example: {
    ru: '<b-gauge label="Что делать с повтором">\n  <row k="1 человек" w="15%" color="c-none">случай</row>\n  <row k="повторяется у нескольких" w="45%" color="c-light">проверить анкетой</row>\n  <row k="анкета подтвердила" w="100%" color="c-work">в процедуру решения</row>\n</b-gauge>',
    en: '<b-gauge label="What to do with a repeat">\n  <row k="1 person" w="15%" color="c-none">a case</row>\n  <row k="repeats for several" w="45%" color="c-light">check with a survey</row>\n  <row k="survey confirmed" w="100%" color="c-work">into the decision</row>\n</b-gauge>',
  },
})
