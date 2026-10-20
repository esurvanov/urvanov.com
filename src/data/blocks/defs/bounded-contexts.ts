import { defineBlock, icon } from '../core'

// Ограниченные контексты словаря агрегатов — четыре связанных блока, их обычно ставят подряд:
// <b-ctx-map> — контексты карточками с агрегатами-плашками, <b-ctx-links> — связи между контекстами по id,
// <b-ctx-clash> — одно слово в двух контекстах, <b-ctx-rules> — правила словаря плашками со значком
const chips = (s: string) => s.split(',').map((x) => `<span class="bk-chip">${x.trim()}</span>`).join('')

const map = defineBlock({
  tag: 'ctx-map',
  title: 'Контексты и агрегаты',
  doc: 'Контексты <ctx> карточками по три в ряд: имя кодом и агрегаты плашками.',
  slots: {
    ctx: { doc: 'контекст; внутри — агрегаты через запятую', required: true, attrs: { name: { doc: 'имя контекста', required: true } } },
  },
  render: ({ slots }) => `<div class="bk-ctx-map">${slots.ctx.map((s) =>
    `<div class="bk-ctx-map-b"><div class="bk-ctx-map-t">${icon('workflow', '1.8')}<code>${s.attrs.name}</code></div><div class="bk-ctx-map-a">${chips(s.html)}</div></div>`).join('')}</div>`,
  example: {
    ru: '<b-ctx-map>\n  <ctx name="booking">Reservation, Room, TimeSlot</ctx>\n  <ctx name="billing">Invoice, Tariff</ctx>\n  <ctx name="access">Pass, Level</ctx>\n</b-ctx-map>',
    en: '<b-ctx-map>\n  <ctx name="booking">Reservation, Room, TimeSlot</ctx>\n  <ctx name="billing">Invoice, Tariff</ctx>\n  <ctx name="access">Pass, Level</ctx>\n</b-ctx-map>',
  },
})

const links = defineBlock({
  tag: 'ctx-links',
  title: 'Связи между контекстами',
  doc: 'Пунктирная рамка: правило связи и пары <ref from to> со стрелкой.',
  attrs: { t: { doc: 'правило связи сверху', required: true }, arrow: { doc: 'подпись стрелки (по умолчанию «→ id →»)' } },
  slots: { ref: { doc: 'связь «откуда → куда»', required: true, attrs: { from: { doc: 'откуда', required: true }, to: { doc: 'куда', required: true } } } },
  render: ({ attrs, slots }) => `<div class="bk-ctx-map-ls"><small>${icon('link')}${attrs.t}</small>${slots.ref.map((s) =>
    `<span class="bk-ctx-map-l"><code>${s.attrs.from}</code><span class="bk-ctx-map-ar">${attrs.arrow ?? '→ id →'}</span><code>${s.attrs.to}</code></span>`).join('')}</div>`,
  example: {
    ru: '<b-ctx-links t="связи между контекстами — только по id">\n  <ref from="billing::Invoice" to="booking::Reservation"></ref>\n  <ref from="access::Pass" to="booking::Reservation"></ref>\n</b-ctx-links>',
    en: '<b-ctx-links t="links between contexts — by id only">\n  <ref from="billing::Invoice" to="booking::Reservation"></ref>\n  <ref from="access::Pass" to="booking::Reservation"></ref>\n</b-ctx-links>',
  },
})

const clash = defineBlock({
  tag: 'ctx-clash',
  title: 'Одно слово — два термина',
  doc: 'Слово крупно и его значения <sense> в разных контекстах, подпись снизу.',
  attrs: { word: { doc: 'слово', required: true }, note: { doc: 'подпись снизу', required: true } },
  slots: { sense: { doc: 'значение; внутри — подпись в интерфейсе', required: true, attrs: { code: { doc: 'термин в контексте', required: true } } } },
  render: ({ attrs, slots }) => `<div class="bk-ctx-map-w"><div class="bk-ctx-map-wq">${attrs.word}</div><div class="bk-ctx-map-ws">${slots.sense.map((s) =>
    `<div><code>${s.attrs.code}</code><span class="bk-chip">${s.html}</span></div>`).join('')}</div><small>${attrs.note}</small></div>`,
  example: {
    ru: '<b-ctx-clash word="«Уровень»" note="одно слово — два термина, разные подписи">\n  <sense code="booking::Room.floor">Этаж</sense>\n  <sense code="access::Level">Допуск</sense>\n</b-ctx-clash>',
    en: '<b-ctx-clash word="“Level”" note="one word, two terms, different labels">\n  <sense code="booking::Room.floor">Floor</sense>\n  <sense code="access::Level">Clearance</sense>\n</b-ctx-clash>',
  },
})

const rules = defineBlock({
  tag: 'ctx-rules',
  title: 'Правила словаря',
  doc: 'Короткие правила плашками со значком, четыре в ряд.',
  slots: { rule: { doc: 'правило; внутри — текст', required: true, attrs: { icon: { doc: 'значок', required: true } } } },
  render: ({ slots }) => `<div class="bk-ctx-map-rules">${slots.rule.map((s) => `<span class="bk-ctx-map-rl">${icon(s.attrs.icon)}${s.html}</span>`).join('')}</div>`,
  example: {
    ru: '<b-ctx-rules>\n  <rule icon="id-card">термин = одна запись</rule>\n  <rule icon="link">ссылка [[ctx::Name]]</rule>\n  <rule icon="fork">совпало слово — разные записи</rule>\n  <rule icon="cycle">словарь меняется вместе со спекой</rule>\n</b-ctx-rules>',
    en: '<b-ctx-rules>\n  <rule icon="id-card">a term = one entry</rule>\n  <rule icon="link">link [[ctx::Name]]</rule>\n  <rule icon="fork">same word — separate entries</rule>\n  <rule icon="cycle">the dictionary changes with the spec</rule>\n</b-ctx-rules>',
  },
})

export default [map, links, clash, rules]
