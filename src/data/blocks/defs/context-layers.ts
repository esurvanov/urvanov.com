import { defineBlock, icon } from '../core'

// Четыре слоя постоянного контекста агента — спека, библия, правила, скилл. У слоя свой цвет (оттенок акцента)
// и значок; вид слоя задаёт kind, текст пишется в посте. Три блока: карточки слоёв <b-ctx-layers>,
// метка слоя в тексте или таблице <b-ctx-layer> и таблица про слои <b-ctx-table> с раскладкой для телефона
const KIND: Record<string, [string, string]> = {
  spec: ['var(--accent)', 'file-lines'],
  bible: ['color-mix(in srgb, var(--accent) 70%, var(--ink))', 'notebook'],
  rules: ['color-mix(in srgb, var(--accent) 65%, var(--muted))', 'list-arrow'],
  skill: ['color-mix(in srgb, var(--accent) 40%, var(--muted))', 'zap'],
}
const kindAttr = { doc: 'слой: spec, bible, rules, skill', required: true, values: Object.keys(KIND) }

const layers = defineBlock({
  tag: 'ctx-layers',
  title: 'Слои контекста',
  doc: 'Карточки слоёв <layer> в ряд: значок, название, что внутри и когда попадает в контекст.',
  slots: {
    layer: {
      doc: 'слой; внутри — что в нём',
      required: true,
      attrs: { kind: kindAttr, t: { doc: 'название', required: true }, when: { doc: 'когда в контексте (плашка внизу)', required: true } },
    },
  },
  render: ({ slots }) => `<div class="bk-ly">${slots.layer.map((s) => {
    const [c, ic] = KIND[s.attrs.kind]
    return `<div class="bk-ly-c" style="--c:${c}"><span class="bk-ly-i">${icon(ic)}</span><b>${s.attrs.t}</b><small>${s.html}</small><span class="bk-ly-w">${s.attrs.when}</span></div>`
  }).join('')}</div>`,
  example: {
    ru: '<b-ctx-layers>\n  <layer kind="spec" t="Спека" when="на время задачи">что сделать в одной задаче</layer>\n  <layer kind="bible" t="Библия" when="в начале задачи">что это за продукт</layer>\n  <layer kind="rules" t="Правила" when="в каждой сессии">как работать в проекте</layer>\n  <layer kind="skill" t="Скилл" when="по вызову">как выполнить процедуру</layer>\n</b-ctx-layers>',
    en: '<b-ctx-layers>\n  <layer kind="spec" t="Spec" when="for one task">what to do in one task</layer>\n  <layer kind="bible" t="Bible" when="at task start">what the product is</layer>\n  <layer kind="rules" t="Rules" when="every session">how to work in the project</layer>\n  <layer kind="skill" t="Skill" when="on call">how to run a procedure</layer>\n</b-ctx-layers>',
  },
})

const layer = defineBlock({
  tag: 'ctx-layer',
  title: 'Метка слоя',
  doc: 'Значок и название слоя его цветом — в таблице или тексте.',
  attrs: { kind: kindAttr },
  render: ({ attrs, children }) => {
    const [c, ic] = KIND[attrs.kind]
    return `<span class="bk-ly-t" style="--c:${c}">${icon(ic)}${children.trim()}</span>`
  },
  example: {
    ru: '<p><b-ctx-layer kind="spec">Спека</b-ctx-layer> <b-ctx-layer kind="bible">Библия</b-ctx-layer> <b-ctx-layer kind="rules">Правила</b-ctx-layer> <b-ctx-layer kind="skill">Скилл</b-ctx-layer></p>',
    en: '<p><b-ctx-layer kind="spec">Spec</b-ctx-layer> <b-ctx-layer kind="bible">Bible</b-ctx-layer> <b-ctx-layer kind="rules">Rules</b-ctx-layer> <b-ctx-layer kind="skill">Skill</b-ctx-layer></p>',
  },
})

// Таблица в рамке таблицы (класс bk-tbl из ./table.css), на телефоне — без прокрутки вбок:
// hide4 прячет четвёртую колонку, wrap разрешает перенос в последней
const table = defineBlock({
  tag: 'ctx-table',
  title: 'Таблица слоёв',
  doc: 'HTML-таблица в рамке, которая на телефоне ужимается до ширины экрана.',
  attrs: { phone: { doc: 'на телефоне: hide4 — без 4-й колонки, wrap — перенос в последней', required: true, values: ['hide4', 'wrap'] } },
  render: ({ attrs, children }) => `<div class="bk-tbl bk-lt bk-lt-${attrs.phone}">${children.trim()}</div>`,
  example: {
    ru: '<b-ctx-table phone="wrap"><table><thead><tr><th>Если это…</th><th>Куда</th></tr></thead><tbody><tr><td>команда, стиль или запрет, нужные в каждой задаче</td><td><b-ctx-layer kind="rules">Правила</b-ctx-layer></td></tr><tr><td>требования к одной задаче</td><td><b-ctx-layer kind="spec">Спека</b-ctx-layer></td></tr></tbody></table></b-ctx-table>',
    en: '<b-ctx-table phone="wrap"><table><thead><tr><th>If it is…</th><th>Where</th></tr></thead><tbody><tr><td>a command, style or ban needed in every task</td><td><b-ctx-layer kind="rules">Rules</b-ctx-layer></td></tr><tr><td>requirements for one task</td><td><b-ctx-layer kind="spec">Spec</b-ctx-layer></td></tr></tbody></table></b-ctx-table>',
  },
})

export default [layers, layer, table]
