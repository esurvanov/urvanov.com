import { defineBlock, icon } from '../core'

// Рост спек: две панели рядом — «спека на фичу» (сетка файлов, где понятие повторяется) и «словарь агрегатов»
// (записи с точками-требованиями), у каждой итог и плашка; под ними — путь новой фичи по шагам <step>
const growth = defineBlock({
  tag: 'spec-growth',
  title: 'Рост спек',
  doc: 'Две панели <b-growth-panel> рядом и путь новой фичи <step> под ними.',
  slots: { step: { doc: 'шаг пути; внутри — код, em — прирост справа', attrs: { em: { doc: 'прирост: «+1 MUST»' } } } },
  render: ({ children, slots }) => `<div class="bk-gw">${children.trim()}</div>${slots.step ? `<div class="bk-gw-flow">${slots.step.map((s) =>
    `<span class="bk-gw-fs"><code>${s.html}</code>${s.attrs.em ? `<em>${s.attrs.em}</em>` : ''}</span>`).join('<span class="bk-gw-ar">→</span>')}</div>` : ''}`,
  example: {
    ru: '<b-spec-growth>\n  <b-growth-panel icon="file" t="Спека на фичу" sub="понятие описано в каждой фиче" files="101101" n="6 файлов" note="«Бронь» — в 4" chip="растёт с фичами"></b-growth-panel>\n  <b-growth-panel good icon="cube" t="Словарь агрегатов" sub="понятие описано один раз" n="2 записи" note="«Бронь» — в 1" chip="растёт с доменом">\n    <agg dots="5">Reservation</agg>\n    <agg dots="3">Room</agg>\n  </b-growth-panel>\n  <step>Фича 13</step>\n  <step em="+1 MUST">[booking::Reservation]</step>\n  <step em="+1">тест</step>\n</b-spec-growth>',
    en: '<b-spec-growth>\n  <b-growth-panel icon="file" t="Spec per feature" sub="a concept is described in every feature" files="101101" n="6 files" note="“Booking” — in 4" chip="grows with features"></b-growth-panel>\n  <b-growth-panel good icon="cube" t="Aggregate dictionary" sub="a concept is described once" n="2 entries" note="“Booking” — in 1" chip="grows with the domain">\n    <agg dots="5">Reservation</agg>\n    <agg dots="3">Room</agg>\n  </b-growth-panel>\n  <step>Feature 13</step>\n  <step em="+1 MUST">[booking::Reservation]</step>\n  <step em="+1">test</step>\n</b-spec-growth>',
  },
})

// Панель: заголовок со значком, тело — сетка файлов (files: 1 — файл с понятием, 0 — без) или записи <agg>,
// итог n и пометка note; good — панель-решение (рамка акцента, зелёная пометка и плашка)
const panel = defineBlock({
  tag: 'growth-panel',
  title: 'Панель роста спек',
  doc: 'Панель внутри <b-spec-growth>: файлы или записи агрегатов, итог и плашка.',
  attrs: {
    icon: { doc: 'значок', required: true },
    t: { doc: 'название', required: true },
    sub: { doc: 'подпись под названием', required: true },
    n: { doc: 'итог крупно: «12 файлов»', required: true },
    note: { doc: 'пометка рядом с итогом', required: true },
    chip: { doc: 'плашка внизу', required: true },
    files: { doc: 'сетка файлов: 1 — файл с понятием (выделен), 0 — без' },
    good: { doc: 'панель-решение: акцент вместо предупреждения', values: [''] },
  },
  slots: { agg: { doc: 'запись агрегата; внутри — имя', attrs: { dots: { doc: 'число требований-точек', required: true } } } },
  render: ({ attrs, slots }) => {
    const good = 'good' in attrs
    const files = attrs.files ? `<div class="bk-gw-files">${[...attrs.files].map((c) => `<i class="${c === '1' ? 'bk-on' : ''}">${icon('file')}</i>`).join('')}</div>` : ''
    const aggs = slots.agg ? `<div class="bk-gw-aggs">${slots.agg.map((s) => `<div class="bk-gw-ag"><code>${s.html}</code><span class="bk-gw-d">${'<i></i>'.repeat(Number(s.attrs.dots))}</span></div>`).join('')}</div>` : ''
    return `<div class="bk-gw-p${good ? ' bk-on' : ''}"><div class="bk-gw-h">${icon(attrs.icon)}<b>${attrs.t}</b><small>${attrs.sub}</small></div>${files}${aggs}`
      + `<div class="bk-gw-n"><b>${attrs.n}</b><span class="${good ? 'bk-good' : 'bk-warn'}">${attrs.note}</span></div><span class="bk-gw-c ${good ? 'bk-good' : 'bk-bad'}">${attrs.chip}</span></div>`
  },
  example: {
    ru: '<b-spec-growth>\n  <b-growth-panel icon="file" t="Спека на фичу" sub="понятие в каждой фиче" files="110" n="3 файла" note="«Бронь» — в 2" chip="растёт с фичами"></b-growth-panel>\n</b-spec-growth>',
    en: '<b-spec-growth>\n  <b-growth-panel icon="file" t="Spec per feature" sub="a concept in every feature" files="110" n="3 files" note="“Booking” — in 2" chip="grows with features"></b-growth-panel>\n</b-spec-growth>',
  },
})

export default [growth, panel]
