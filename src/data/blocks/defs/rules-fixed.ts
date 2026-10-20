import { defineBlock, icon, inline, topStyle } from '../core'

// Карточки правил в сетке с постоянным числом колонок (и на телефоне тоже): когда карточки короткие и сравниваются
// в ряд. Значок необязателен. Карточки — те же, что у <b-rules> (классы bk-rule из rules.css)
export default defineBlock({
  tag: 'rules-fixed',
  title: 'Правила в ряд',
  doc: 'Карточки правил в постоянное число колонок на любом экране; значок необязателен.',
  attrs: {
    cols: { doc: 'колонок на любом экране', required: true, values: ['2', '3'] },
    top: { doc: 'отступ сверху в px' },
    sw: { doc: 'толщина линии значков (по умолчанию 2)' },
  },
  slots: {
    rule: {
      doc: 'правило; внутри — пояснение',
      required: true,
      attrs: { t: { doc: 'название', required: true }, icon: { doc: 'значок над названием' } },
    },
  },
  render: ({ attrs, slots }) => {
    const top = topStyle(attrs.top).replace(/^ style="|"$/g, '')
    return `<div class="bk-rfx" style="grid-template-columns:repeat(${attrs.cols},1fr)${top ? ';' + top : ''}">${slots.rule.map((s) =>
      `<div class="bk-rule">${s.attrs.icon ? `<span class="bk-ri">${icon(s.attrs.icon, attrs.sw)}</span>` : ''}<b>${s.attrs.t}</b><span>${inline(s.html)}</span></div>`).join('')}</div>`
  },
  example: {
    ru: '<b-rules-fixed cols="3" top="12">\n  <rule t="Только рассуждает">Модель выдумывает ответ.</rule>\n  <rule t="Только действует">Вызывает всё подряд.</rule>\n  <rule t="Чередует">Берёт ровно то, чего не хватает.</rule>\n</b-rules-fixed>',
    en: '<b-rules-fixed cols="3" top="12">\n  <rule t="Only reasons">The model makes up an answer.</rule>\n  <rule t="Only acts">Calls everything in a row.</rule>\n  <rule t="Alternates">Takes exactly what is missing.</rule>\n</b-rules-fixed>',
  },
})
