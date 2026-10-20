import { attr, defineBlock, icon } from '../core'

// Карточка агрегата: слева — строки записи словаря моноширинно, справа — номер и что эта часть значит.
// Текст записи — как есть, перенос строки внутри части — сущность &#10;
export default defineBlock({
  tag: 'aggregate-card',
  title: 'Карточка агрегата',
  doc: 'Запись агрегата по частям <field>: код части слева, номер, значок и пояснение справа.',
  attrs: { label: { doc: 'вся карточка словами для скринридера', required: true } },
  slots: {
    field: {
      doc: 'часть записи; внутри — текст как в словаре (перенос — &#10;)',
      required: true,
      attrs: { icon: { doc: 'значок пояснения', required: true }, t: { doc: 'пояснение', required: true }, sw: { doc: 'толщина линии значка' } },
    },
  },
  render: ({ attrs, slots }) => `<div class="bk-aggregate-card" role="img" aria-label="${attr(attrs.label)}">${slots.field.map((s, i) =>
    `<div class="bk-aggregate-card-r"><pre class="bk-aggregate-card-c">${s.html}</pre><div class="bk-aggregate-card-n"><span class="bk-aggregate-card-nb">${i + 1}</span>${icon(s.attrs.icon, s.attrs.sw)}<span>${s.attrs.t}</span></div></div>`).join('')}</div>`,
  example: {
    ru: '<b-aggregate-card label="Пример записи агрегата Reservation">\n  <field icon="id-card" t="адрес: контекст::имя">## [booking::Reservation]&#10;Class: aggregate</field>\n  <field icon="list-check" sw="1.8" t="требования → проверки">Invariants:&#10;  - MUST: брони не пересекаются</field>\n  <field icon="link" t="связи по id">Depends on: [[booking::Room]]</field>\n</b-aggregate-card>',
    en: '<b-aggregate-card label="An example Reservation aggregate entry">\n  <field icon="id-card" t="address: context::name">## [booking::Reservation]&#10;Class: aggregate</field>\n  <field icon="list-check" sw="1.8" t="requirements → checks">Invariants:&#10;  - MUST: bookings do not overlap</field>\n  <field icon="link" t="links by id">Depends on: [[booking::Room]]</field>\n</b-aggregate-card>',
  },
})
