import { color, defineBlock, inline } from '../core'

// Сравнение способов набора (серия gruppy): колонки с меткой «мало / полно», рядом цветных точек и итогом
export default defineBlock({
  tag: 'gruppy-compare',
  title: 'Сравнение выборок',
  doc: 'Колонки рядом: метка-оценка, название, ряд цветных точек (кто попал) и итог под ним.',
  slots: {
    way: {
      doc: 'колонка; внутри — итог под точками (строчный markdown)',
      required: true,
      attrs: {
        kind: { doc: 'оценка: bad — красная метка, good — синяя', required: true, values: ['bad', 'good'] },
        s: { doc: 'текст метки', required: true },
        t: { doc: 'название', required: true },
        dots: { doc: 'цвета точек через пробел', required: true },
      },
    },
  },
  render: ({ slots }) => `<div class="bk-gruppy-compare">${slots.way.map((s) =>
    `<div class="bk-gruppy-compare-${s.attrs.kind}"><div class="bk-gruppy-compare-h"><span class="bk-gruppy-compare-s">${s.attrs.s}</span>${s.attrs.t}</div><div class="bk-gruppy-compare-row" aria-hidden="true">${
      s.attrs.dots.trim().split(/\s+/).map((c) => `<i style="background:${color(c)}"></i>`).join('')}</div><div class="bk-gruppy-compare-m">${inline(s.html)}</div></div>`).join('')}</div>`,
  example: {
    ru: '<b-gruppy-compare>\n  <way kind="bad" s="мало" t="Топ по сообщениям" dots="c-chat c-chat c-chat c-work c-chat c-chat">сценариев: **2 из 8**</way>\n  <way kind="good" s="полно" t="Полярные группы" dots="c-code c-work c-chat c-silent c-none c-light">сценариев: **8 из 8**</way>\n</b-gruppy-compare>',
    en: '<b-gruppy-compare>\n  <way kind="bad" s="few" t="Top by messages" dots="c-chat c-chat c-chat c-work c-chat c-chat">scenarios: **2 of 8**</way>\n  <way kind="good" s="full" t="Polar groups" dots="c-code c-work c-chat c-silent c-none c-light">scenarios: **8 of 8**</way>\n</b-gruppy-compare>',
  },
})
