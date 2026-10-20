import { attr, defineBlock, icon } from '../core'

// Схема «два входа → узел → два выхода» (серия hdd): Ожидание + Наблюдение → Луп → патч / пересмотр.
// Изогнутые стрелки рисуются здесь, на телефоне их заменяют стрелки «↓» между столбцами. Под схемой — строка-пометка <note>
const ARROW_IN = '<svg viewBox="0 0 80 120" aria-hidden="true"><path d="M4,26 C 40,26 40,60 74,60" class="bk-hfi-e"/><path d="M4,94 C 40,94 40,60 74,60" class="bk-hfi-e"/><path d="M66,54 L76,60 L66,66" class="bk-hfi-e"/></svg>'
const ARROW_OUT = '<svg viewBox="0 0 80 120" aria-hidden="true"><path d="M4,60 C 40,60 40,26 72,26" class="bk-hfi-e"/><path d="M4,60 C 40,60 40,94 72,94" class="bk-hfi-e"/><path d="M64,21 L74,26 L64,31 M64,89 L74,94 L64,99" class="bk-hfi-e"/></svg>'

export default defineBlock({
  tag: 'hdd-fanin',
  title: 'Два входа → узел → два выхода',
  doc: 'Схема сведения: два входа <in>, узел <mid> с пометкой, два выхода <out>; под ней пометка <note>.',
  attrs: { label: { doc: 'подпись для скринридера (aria-label)', required: true } },
  slots: {
    in: { doc: 'вход (их два); внутри — название', required: true, attrs: { icon: { doc: 'значок', required: true } } },
    mid: { doc: 'узел; внутри — название', required: true, attrs: { icon: { doc: 'значок', required: true }, note: { doc: 'красная пометка под узлом', required: true } } },
    out: { doc: 'выход (их два); внутри — название', required: true, attrs: { alt: { doc: 'пунктирная рамка с заливкой', values: [''] } } },
    note: {
      doc: 'строка под схемой: значки «из → в» и текст, части через «·»',
      attrs: { from: { doc: 'значок «из»', required: true }, to: { doc: 'значок «в»', required: true } },
    },
  },
  render: ({ attrs, slots }) => {
    const mid = slots.mid[0]
    const note = (slots.note ?? []).map((n) => `<div class="bk-hfi-note"><span>${icon(n.attrs.from)}→${icon(n.attrs.to)}</span>${n.html.split('·').map((x) => x.trim()).join('<i>·</i>')}</div>`).join('')
    return `<div class="bk-hfi" role="img" aria-label="${attr(attrs.label)}"><div class="bk-hfi-l">${slots.in.map((s) => `<span class="bk-hfi-n">${icon(s.attrs.icon)}${s.html}</span>`).join('')}</div>`
      + `<div class="bk-hfi-ar">${ARROW_IN}</div><div class="bk-hfi-m"><span class="bk-hfi-n bk-hfi-key">${icon(mid.attrs.icon)}${mid.html}</span><span class="bk-hfi-no">${mid.attrs.note}</span></div>`
      + `<div class="bk-hfi-ar">${ARROW_OUT}</div><div class="bk-hfi-r">${slots.out.map((s) => `<span class="bk-hfi-o${'alt' in s.attrs ? ' bk-alt' : ''}">${s.html}</span>`).join('')}</div></div>${note}`
  },
  example: {
    ru: '<b-hdd-fanin label="Ожидание + Наблюдение → Луп → патч / пересмотр правил">\n  <in icon="target">Ожидание</in>\n  <in icon="eye">Наблюдение</in>\n  <mid icon="refresh-cw" note="✕ обратной ссылки нет">Луп</mid>\n  <out>патч</out>\n  <out alt>пересмотр правил</out>\n  <note from="sun" to="book">скилл → спека своего домена · направление проверяет скрипт на коммит</note>\n</b-hdd-fanin>',
    en: '<b-hdd-fanin label="Expectation + Observation → Loop → patch / revise rules">\n  <in icon="target">Expectation</in>\n  <in icon="eye">Observation</in>\n  <mid icon="refresh-cw" note="✕ no reverse link">Loop</mid>\n  <out>patch</out>\n  <out alt>revise rules</out>\n  <note from="sun" to="book">skill → spec of its domain · a commit hook script checks the direction</note>\n</b-hdd-fanin>',
  },
})
