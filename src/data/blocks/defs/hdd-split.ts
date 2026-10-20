import { attr, defineBlock, icon } from '../core'

// Доли работы (серия hdd): две панели 3 : 1 — заголовок со значком, квадратики-доли и подпись.
// Первая панель — основная (квадратики акцентом), вторая — в рамке толще, квадратики серые
export default defineBlock({
  tag: 'hdd-split',
  title: 'Доли работы 3 : 1',
  doc: 'Две панели рядом в пропорции 3 : 1: заголовок со значком, n квадратиков и подпись мелко.',
  attrs: { label: { doc: 'подпись для скринридера (aria-label)', required: true } },
  slots: {
    side: {
      doc: 'панель (их две); внутри — подпись мелко',
      required: true,
      attrs: {
        icon: { doc: 'значок', required: true },
        t: { doc: 'заголовок', required: true },
        n: { doc: 'сколько квадратиков', required: true },
        sw: { doc: 'толщина линии значка (по умолчанию 2)' },
      },
    },
  },
  render: ({ attrs, slots }) => `<div class="bk-hdd-split" role="img" aria-label="${attr(attrs.label)}">${slots.side.map((s, i) =>
    `<div class="bk-hdd-split-${i ? 'b' : 'a'}"><div class="bk-hdd-split-h">${icon(s.attrs.icon, s.attrs.sw)}${s.attrs.t}</div><div class="bk-hdd-split-dots">${'<i></i>'.repeat(Number(s.attrs.n))}</div><small>${s.html}</small></div>`).join('')}</div>`,
  example: {
    ru: '<b-hdd-split label="Рутину берёт харнесс, решения — человек">\n  <side icon="sun" t="Харнесс" n="18">стиль · типы · тесты</side>\n  <side icon="user-round" t="Человек" n="3" sw="1.8">архитектура · продукт</side>\n</b-hdd-split>',
    en: '<b-hdd-split label="The harness takes routine, a person takes decisions">\n  <side icon="sun" t="Harness" n="18">style · types · tests</side>\n  <side icon="user-round" t="Person" n="3" sw="1.8">architecture · product</side>\n</b-hdd-split>',
  },
})
