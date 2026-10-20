import { defineBlock, icon, inline } from '../core'

// Цепочка участников с одним широким звеном «QA»: как меняется шаг QA, когда рутину берут агенты.
// Обычное звено — значок, название, подпись. Широкое звено kind="solo" — QA всё делает сам (плашки работ,
// полоса времени целиком занята), kind="pair" — QA в паре с агентами (инструменты агентов × N, приёмка,
// полоса времени поделена). Ставится внутрь <b-lane>; на витрине и в постах серии harness
const list = (s?: string) => (s ?? '').split('|').map((x) => x.trim()).filter(Boolean)

const time = (label: string, bar: string) => `<div class="bk-qr-tm"><div class="bk-qr-tl"><span>${icon('clock')}</span>${label}</div>${bar}</div>`

function solo(a: Record<string, string>, html: string): string {
  const chips = list(a.chips).map((c) => `<span class="bk-qr-chip">${c}</span>`).join('')
  return `<div class="bk-qr-nd bk-qr-big"><div class="bk-qr-solo">${icon(a.icon ?? 'user')}<b>${a.t}</b><small>${inline(html)}</small><div class="bk-qr-chips">${chips}</div></div>`
    + time(a.time ?? '', `<div class="bk-qr-bar"></div><div class="bk-qr-bl">${list(a.bar).join('')}</div>`) + '</div>'
}

function pair(a: Record<string, string>, html: string): string {
  const tools = list(a.tools).map((x) => {
    const [ic, ...t] = x.split(':')
    return `<div class="bk-qr-tool"><span>${icon(ic.trim())}</span>${t.join(':').trim()}</div>`
  }).join('')
  const [b1, b2] = list(a.bar)
  const share = a.share ?? '30'
  return `<div class="bk-qr-nd bk-qr-big bk-qr-pair"><div class="bk-qr-fr"><span class="bk-qr-frl">${a.frame ?? ''}</span><div class="bk-qr-tools">${tools}<div class="bk-qr-n">${a.n ?? ''}</div></div><span class="bk-qr-plus">+</span><div class="bk-qr-qa">${icon(a.icon ?? 'check')}<b>${a.t}</b><small>${inline(html)}</small></div></div>`
    + time(a.time ?? '', `<div class="bk-qr-bar2"><div style="width:${share}%"></div><div></div></div><div class="bk-qr-bl2"><span style="width:${share}%">${b1 ?? ''}</span><span>${b2 ?? ''}</span></div>`) + '</div>'
}

export default defineBlock({
  tag: 'qa-route',
  title: 'Цепочка с шагом QA',
  doc: 'Звенья со стрелками; широкое звено QA: solo — делает всё сам, pair — в паре с агентами.',
  slots: {
    node: {
      doc: 'звено; внутри — подпись под названием',
      required: true,
      attrs: {
        t: { doc: 'название', required: true },
        icon: { doc: 'значок (у solo по умолчанию user, у pair — check)' },
        kind: { doc: 'широкое звено QA', values: ['solo', 'pair'] },
        chips: { doc: 'solo: работы QA через |' },
        frame: { doc: 'pair: подпись пунктирной рамки' },
        tools: { doc: 'pair: инструменты агентов «значок:название» через |' },
        n: { doc: 'pair: подпись под инструментами (× N)' },
        time: { doc: 'подпись полосы времени' },
        bar: { doc: 'подписи под полосой: solo — одна, pair — две через |' },
        share: { doc: 'pair: доля первой части полосы, % (по умолчанию 30)' },
      },
    },
  },
  render: ({ slots }) => `<div class="bk-qr">${slots.node.map((s) => {
    const a = s.attrs
    if (a.kind === 'solo') return solo(a, s.html)
    if (a.kind === 'pair') return pair(a, s.html)
    return `<div class="bk-qr-nd">${icon(a.icon ?? 'user')}<b>${a.t}</b><small>${inline(s.html)}</small></div>`
  }).join(`<span class="bk-qr-ar">${icon('arrow-right')}</span>`)}</div>`,
  example: {
    ru: '<b-lane title="Стало" color="accent">\n  <b-qa-route>\n    <node icon="user" t="поддержка">принимает</node>\n    <node kind="pair" t="QA" frame="в паре" tools="monitor-screen:Claude in Chrome|code:API" n="× N" time="время QA на задачу" bar="приёмка|управление агентами">приёмка</node>\n    <node icon="user" t="разработчик">чинит</node>\n  </b-qa-route>\n</b-lane>',
    en: '<b-lane title="Now" color="accent">\n  <b-qa-route>\n    <node icon="user" t="support">takes it</node>\n    <node kind="pair" t="QA" frame="paired" tools="monitor-screen:Claude in Chrome|code:API" n="× N" time="QA time per task" bar="acceptance|managing agents">acceptance</node>\n    <node icon="user" t="developer">fixes</node>\n  </b-qa-route>\n</b-lane>',
  },
})
