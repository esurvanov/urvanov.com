import { attr, defineBlock, icon } from '../core'

// Шкала стоимости (серия hdd): этапы слева направо в одной полосе, у каждого значок в круге, название, пояснение
// и цена знаками «$»; первые два этапа подкрашены акцентом, последний — предупреждающим цветом
export default defineBlock({
  tag: 'hdd-cost',
  title: 'Шкала стоимости',
  doc: 'Четыре этапа в одной полосе (на телефоне 2 × 2): значок, название, пояснение и цена «$…$».',
  attrs: { label: { doc: 'подпись для скринридера (aria-label)', required: true } },
  slots: {
    stage: {
      doc: 'этап; внутри — пояснение мелко',
      required: true,
      attrs: {
        icon: { doc: 'значок', required: true },
        t: { doc: 'название', required: true },
        cost: { doc: 'цена: $, $$…', required: true },
        sw: { doc: 'толщина линии значка (по умолчанию 2)' },
      },
    },
  },
  render: ({ attrs, slots }) => `<div class="bk-hsh" role="img" aria-label="${attr(attrs.label)}">${slots.stage.map((s) =>
    `<div class="bk-hsh-s"><span class="bk-hsh-i">${icon(s.attrs.icon, s.attrs.sw)}</span><b>${s.attrs.t}</b><small>${s.html}</small><span class="bk-hsh-usd">${s.attrs.cost}</span></div>`).join('')}</div>`,
  example: {
    ru: '<b-hdd-cost label="Чем раньше проверка, тем дешевле ошибка">\n  <stage icon="arrow-right" t="До работы" cost="$">инструкции · спеки</stage>\n  <stage icon="cpu" t="При записи" cost="$$">хуки · линтер</stage>\n  <stage icon="refresh-cw" t="В CI" cost="$$$" sw="1.8">тесты · сборка</stage>\n  <stage icon="user-round" t="На ревью" cost="$$$$" sw="1.8">человек</stage>\n</b-hdd-cost>',
    en: '<b-hdd-cost label="The earlier a check runs, the cheaper the mistake">\n  <stage icon="arrow-right" t="Before work" cost="$">instructions · specs</stage>\n  <stage icon="cpu" t="On write" cost="$$">hooks · linter</stage>\n  <stage icon="refresh-cw" t="In CI" cost="$$$" sw="1.8">tests · build</stage>\n  <stage icon="user-round" t="At review" cost="$$$$" sw="1.8">a person</stage>\n</b-hdd-cost>',
  },
})
