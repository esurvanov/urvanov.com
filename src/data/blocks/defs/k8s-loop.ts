import { attr, defineBlock, icon } from '../core'

// Петля сверки «как в Kubernetes»: строки-системы по четырём ролям (желаемое → исполнитель → фактическое → замер)
// со стрелками между ячейками; сверху — кто меняет желаемое, снизу — возврат замера по кругу.
// Строка — <b-k8s-row> внутри петли. На телефоне сетка становится карточками, и у каждой ячейки
// появляется подпись её роли: петля сама подставляет её из cols по порядку ячеек
const loop = defineBlock({
  tag: 'k8s-loop',
  title: 'Петля сверки',
  doc: 'Таблица «система × роль» со стрелками по строке и подписью возврата по кругу; строки — <b-k8s-row>.',
  attrs: {
    label: { doc: 'вся схема словами для скринридера', required: true },
    cols: { doc: 'роли-колонки через « | »: желаемое | исполнитель | фактическое | замер', required: true },
    human: { doc: 'плашка сверху: кто меняет желаемое', required: true },
    back: { doc: 'подпись возврата по кругу внизу', required: true },
  },
  render: ({ attrs, children }) => {
    const cols = attrs.cols.split('|').map((s) => s.trim())
    let i = 0
    const body = children.trim().replace(/<small class="bk-kl-m"><\/small>/g, () => `<small class="bk-kl-m">${cols[i++ % cols.length]}</small>`)
    return `<div class="bk-kl" role="img" aria-label="${attr(attrs.label)}"><div class="bk-kl-hu">${icon('user')}${attrs.human} <span aria-hidden="true">↓</span></div>`
      + `<div class="bk-kl-g"><div class="bk-kl-c"></div>${cols.map((c) => `<div class="bk-kl-h">${c}</div>`).join('')}${body}</div>`
      + `<div class="bk-kl-bk">${icon('cycle')}${attrs.back}</div></div>`
  },
  example: {
    ru: '<b-k8s-loop label="Kubernetes и спеки: человек меняет желаемое, исполнитель сверяет замер по кругу" cols="желаемое | исполнитель | фактическое | замер" human="человек меняет желаемое" back="замер → исполнитель, по кругу">\n  <b-k8s-row icon="hub" sw="1.6" t="Kubernetes">\n    <cell on>чарт · манифест</cell>\n    <cell>контроллер</cell>\n    <cell>ноды · поды</cell>\n    <cell>пробы · метрики</cell>\n  </b-k8s-row>\n  <b-k8s-row icon="book" t="Спеки">\n    <cell on>словарь · MUST</cell>\n    <cell hz>агент</cell>\n    <cell>код</cell>\n    <cell hz>тесты · качество</cell>\n  </b-k8s-row>\n</b-k8s-loop>',
    en: '<b-k8s-loop label="Kubernetes and specs: a human changes the desired state, the actor reconciles the measurement" cols="desired | actor | actual | measure" human="a human changes the desired state" back="measure → actor, in a loop">\n  <b-k8s-row icon="hub" sw="1.6" t="Kubernetes">\n    <cell on>chart · manifest</cell>\n    <cell>controller</cell>\n    <cell>nodes · pods</cell>\n    <cell>probes · metrics</cell>\n  </b-k8s-row>\n  <b-k8s-row icon="book" t="Specs">\n    <cell on>dictionary · MUST</cell>\n    <cell hz>agent</cell>\n    <cell>code</cell>\n    <cell hz>tests · quality</cell>\n  </b-k8s-row>\n</b-k8s-loop>',
  },
})

// Строка петли: система (значок и название) и её ячейки по ролям; on — желаемое (заливка), hz — где петля
// держится на человеке или агенте (рамка акцента)
const row = defineBlock({
  tag: 'k8s-row',
  title: 'Строка петли сверки',
  doc: 'Строка внутри <b-k8s-loop>: система и ячейки <cell> по ролям.',
  attrs: {
    icon: { doc: 'значок системы', required: true },
    t: { doc: 'название системы', required: true },
    sw: { doc: 'толщина линии значка (по умолчанию 2)' },
  },
  slots: {
    cell: {
      doc: 'ячейка роли; внутри — текст',
      required: true,
      attrs: { on: { doc: 'залита акцентом', values: [''] }, hz: { doc: 'рамка акцента', values: [''] } },
    },
  },
  render: ({ attrs, slots }) => `<div class="bk-kl-r">${icon(attrs.icon, attrs.sw)}<b>${attrs.t}</b></div>${slots.cell.map((s) =>
    `<div class="bk-kl-x${'on' in s.attrs ? ' bk-on' : ''}${'hz' in s.attrs ? ' bk-hz' : ''}"><small class="bk-kl-m"></small>${s.html}</div>`).join('')}`,
  example: {
    ru: '<b-k8s-loop label="Строка петли" cols="желаемое | исполнитель | фактическое | замер" human="человек меняет желаемое" back="по кругу">\n  <b-k8s-row icon="book" t="Спеки">\n    <cell on>словарь</cell>\n    <cell hz>агент</cell>\n    <cell>код</cell>\n    <cell hz>тесты</cell>\n  </b-k8s-row>\n</b-k8s-loop>',
    en: '<b-k8s-loop label="A loop row" cols="desired | actor | actual | measure" human="a human changes the desired state" back="in a loop">\n  <b-k8s-row icon="book" t="Specs">\n    <cell on>dictionary</cell>\n    <cell hz>agent</cell>\n    <cell>code</cell>\n    <cell hz>tests</cell>\n  </b-k8s-row>\n</b-k8s-loop>',
  },
})

export default [loop, row]
