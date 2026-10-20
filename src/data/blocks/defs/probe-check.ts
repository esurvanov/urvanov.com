import { defineBlock, icon } from '../core'

// «Что видит замер»: панели систем рядом (первая уже второй), в каждой — проверки с исходом и вывод внизу.
// Под панелями — ряд правил-плашек. Панель — <b-probe-panel> внутри <b-probe-check>
const check = defineBlock({
  tag: 'probe-check',
  title: 'Что видит замер',
  doc: 'Панели <b-probe-panel> в две колонки (1 : 1.4) и ряд правил <rule> под ними.',
  slots: { rule: { doc: 'правило-плашка под панелями' } },
  render: ({ children, slots }) => `<div class="bk-sn">${children.trim()}</div>${slots.rule ? `<div class="bk-sn-rules">${slots.rule.map((s) => `<span class="bk-chip">${s.html}</span>`).join('')}</div>` : ''}`,
  example: {
    ru: '<b-probe-check>\n  <b-probe-panel icon="hub" sw="1.6" t="Kubernetes" verdict="проба зелёная, сервис не работает">\n    <probe kind="ok">/healthz → 200</probe>\n    <probe kind="no">очередь заказов стоит</probe>\n  </b-probe-panel>\n  <b-probe-panel icon="book" t="Спеки" verdict="тесты зелёные, одно MUST не проверено">\n    <probe kind="ok" note="тест">MUST · не пересекаются</probe>\n    <probe kind="no" note="нет проверки">MUST · 15 мин → closed</probe>\n    <probe kind="eye" note="ревью">SHOULD · канал</probe>\n    <cov t="MUST покрыто" value="67">2 / 3</cov>\n  </b-probe-panel>\n  <rule>каждое MUST → своя проверка</rule>\n  <rule>зелёный ≠ верный</rule>\n</b-probe-check>',
    en: '<b-probe-check>\n  <b-probe-panel icon="hub" sw="1.6" t="Kubernetes" verdict="the probe is green, the service is down">\n    <probe kind="ok">/healthz → 200</probe>\n    <probe kind="no">the order queue is stuck</probe>\n  </b-probe-panel>\n  <b-probe-panel icon="book" t="Specs" verdict="tests are green, one MUST is unchecked">\n    <probe kind="ok" note="test">MUST · no overlaps</probe>\n    <probe kind="no" note="no check">MUST · 15 min → closed</probe>\n    <probe kind="eye" note="review">SHOULD · channel</probe>\n    <cov t="MUST covered" value="67">2 / 3</cov>\n  </b-probe-panel>\n  <rule>every MUST → its own check</rule>\n  <rule>green ≠ correct</rule>\n</b-probe-check>',
  },
})

// Значок исхода проверки: ok — галочка, no — крестик, eye — смотрят глазами на ревью
const MARK: Record<string, [string, string?]> = { ok: ['check', '2.6'], no: ['x', '2.6'], eye: ['eye'] }

const panel = defineBlock({
  tag: 'probe-panel',
  title: 'Панель замера',
  doc: 'Панель внутри <b-probe-check>: система, проверки <probe>, покрытие <cov> и вывод.',
  attrs: {
    icon: { doc: 'значок системы', required: true },
    t: { doc: 'название системы', required: true },
    verdict: { doc: 'вывод внизу панели (цвет предупреждения)', required: true },
    sw: { doc: 'толщина линии значка (по умолчанию 2)' },
  },
  slots: {
    probe: {
      doc: 'проверка; внутри — что проверяется',
      required: true,
      attrs: { kind: { doc: 'исход', required: true, values: ['ok', 'no', 'eye'] }, note: { doc: 'чем проверяется, справа' } },
    },
    cov: { doc: 'полоса покрытия; внутри — счёт «2 / 3»', attrs: { t: { doc: 'подпись', required: true }, value: { doc: 'заполнение, %', required: true } } },
  },
  render: ({ attrs, slots }) => {
    const probes = slots.probe.map((s) => {
      const [name, sw] = MARK[s.attrs.kind]
      return `<div class="bk-sn-i bk-${s.attrs.kind}">${icon(name, sw)}<code>${s.html}</code>${s.attrs.note ? `<span>${s.attrs.note}</span>` : ''}</div>`
    }).join('')
    const cov = (slots.cov ?? []).map((s) => `<div class="bk-sn-cov"><span>${s.attrs.t}</span><span class="bk-sn-bar"><i style="width:${s.attrs.value}%"></i></span><b>${s.html}</b></div>`).join('')
    return `<div class="bk-sn-p"><div class="bk-sn-h">${icon(attrs.icon, attrs.sw)}<b>${attrs.t}</b></div>${probes}${cov}<div class="bk-sn-v">${attrs.verdict}</div></div>`
  },
  example: {
    ru: '<b-probe-check>\n  <b-probe-panel icon="book" t="Спеки" verdict="одно MUST не проверено">\n    <probe kind="ok" note="тест">MUST · только вперёд</probe>\n    <probe kind="no" note="нет проверки">MUST · 15 мин → closed</probe>\n    <cov t="MUST покрыто" value="50">1 / 2</cov>\n  </b-probe-panel>\n</b-probe-check>',
    en: '<b-probe-check>\n  <b-probe-panel icon="book" t="Specs" verdict="one MUST is unchecked">\n    <probe kind="ok" note="test">MUST · forward only</probe>\n    <probe kind="no" note="no check">MUST · 15 min → closed</probe>\n    <cov t="MUST covered" value="50">1 / 2</cov>\n  </b-probe-panel>\n</b-probe-check>',
  },
})

export default [check, panel]
