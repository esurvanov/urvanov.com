import { attr, defineBlock, icon } from '../core'

// Слои зрелости (серия hdd): строка — значок, название, полоса-процент и пометка справа; всё в одной карточке
export default defineBlock({
  tag: 'hdd-layers',
  title: 'Слои с полосой зрелости',
  doc: 'Строки «значок — название — полоса — пометка» в одной карточке; на телефоне полоса и пометка уходят под название.',
  attrs: { label: { doc: 'подпись для скринридера (aria-label)', required: true } },
  slots: {
    layer: {
      doc: 'строка; внутри — пометка справа',
      required: true,
      attrs: {
        icon: { doc: 'значок', required: true },
        t: { doc: 'название', required: true },
        value: { doc: 'длина полосы в процентах', required: true },
        sw: { doc: 'толщина линии значка (по умолчанию 2)' },
      },
    },
  },
  render: ({ attrs, slots }) => `<div class="bk-hly" role="img" aria-label="${attr(attrs.label)}">${slots.layer.map((s) =>
    `<div class="bk-hly-r"><span class="bk-hly-i">${icon(s.attrs.icon, s.attrs.sw)}</span><b>${s.attrs.t}</b><div class="bk-hly-bar"><i style="width:${s.attrs.value}%"></i></div><span class="bk-hly-m">${s.html}</span></div>`).join('')}</div>`,
  example: {
    ru: '<b-hdd-layers label="Три слоя проверок">\n  <layer icon="brush" t="Качество кода" value="88">зрелый</layer>\n  <layer icon="modules" t="Архитектура" value="55">растёт</layer>\n  <layer icon="user-round" t="Поведение" value="25" sw="1.8">сложнее всего</layer>\n</b-hdd-layers>',
    en: '<b-hdd-layers label="Three check layers">\n  <layer icon="brush" t="Code quality" value="88">mature</layer>\n  <layer icon="modules" t="Architecture" value="55">growing</layer>\n  <layer icon="user-round" t="Behavior" value="25" sw="1.8">hardest</layer>\n</b-hdd-layers>',
  },
})
