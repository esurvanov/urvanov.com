import { defineBlock, icon } from '../core'

// Два списка рядом: что стабильно и что меняется. Список warn — с полосой и точками цвета предупреждения;
// внутри метки списка — значки источников к заголовку
export default defineBlock({
  tag: 'two-lists',
  title: 'Два списка',
  doc: 'Две карточки-списка рядом: заголовок со значком и пункты; warn — меняющееся.',
  slots: {
    list: {
      doc: 'карточка-список; внутри — <b-proof> к заголовку',
      required: true,
      attrs: {
        icon: { doc: 'значок заголовка', required: true },
        t: { doc: 'заголовок капсом', required: true },
        items: { doc: 'пункты через |', required: true },
        warn: { doc: 'меняющееся: полоса и точки цвета предупреждения', values: [''] },
      },
    },
  },
  render: ({ slots }) => `<div class="bk-two-lists">${slots.list.map((s) =>
    `<div${'warn' in s.attrs ? ' class="bk-two-lists-mv"' : ''}><div class="bk-two-lists-sh">${icon(s.attrs.icon)}${s.attrs.t}${s.html}</div><ul>${s.attrs.items.split('|').map((i) => `<li>${i.trim()}</li>`).join('')}</ul></div>`).join('')}</div>`,
  example: {
    ru: '<b-two-lists>\n  <list icon="lock" t="Стабильно" items="семейство моделей|устройство харнесса"></list>\n  <list icon="refresh" t="Меняется каждую неделю" warn items="функции и режимы|модели, тарифы и лимиты"><b-proof href="https://example.com/" quote="Источник: список версий — example.com"></b-proof></list>\n</b-two-lists>',
    en: '<b-two-lists>\n  <list icon="lock" t="Stable" items="model family|how a harness is built"></list>\n  <list icon="refresh" t="Changes every week" warn items="features and modes|models, plans and limits"><b-proof href="https://example.com/" quote="Source: release list — example.com"></b-proof></list>\n</b-two-lists>',
  },
})
