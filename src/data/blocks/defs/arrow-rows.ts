import { color, defineBlock, inline } from '../core'

// Строки «понятие → пояснение» с цветной полосой слева: что видит, что делает, цифра и вывод.
// Цвет полосы и стрелки — у каждой строки свой; на узком экране пояснение переносится под понятие
export default defineBlock({
  tag: 'arrow-rows',
  title: 'Строки со стрелкой',
  doc: 'Список строк «понятие → пояснение» с цветной полосой слева.',
  attrs: { wide: { doc: 'колонка понятия шире (для длинных понятий)', values: [''] } },
  slots: {
    row: {
      doc: 'строка; внутри — пояснение',
      required: true,
      attrs: { t: { doc: 'понятие слева', required: true }, color: { doc: 'цвет полосы и стрелки: токен (accent, warn, muted) или CSS-цвет', required: true } },
    },
  },
  render: ({ attrs, slots }) => `<div class="bk-arw${'wide' in attrs ? ' bk-arw-wide' : ''}">${slots.row.map((s) => {
    const c = color(s.attrs.color)
    return `<div class="bk-arw-r" style="border-left-color:${c}"><b>${s.attrs.t}</b><span class="bk-arw-a" style="color:${c}">→</span><span class="bk-arw-d">${inline(s.html)}</span></div>`
  }).join('')}</div>`,
  example: {
    ru: '<b-arrow-rows>\n  <row t="Что видит" color="muted">только ваш текст</row>\n  <row t="Что делает" color="warn">дописывает недостающее правдоподобно</row>\n  <row t="0–7% против 31%" color="accent">задач решено: модель против агента</row>\n</b-arrow-rows>',
    en: '<b-arrow-rows>\n  <row t="What it sees" color="muted">only your text</row>\n  <row t="What it does" color="warn">fills in the gaps plausibly</row>\n  <row t="0–7% vs 31%" color="accent">tasks solved: model vs agent</row>\n</b-arrow-rows>',
  },
})
