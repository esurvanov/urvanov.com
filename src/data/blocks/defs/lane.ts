import { color, defineBlock, icon, inline, topStyle } from '../core'

// Карточка с цветной меткой-заголовком. Внутри — что угодно (схема, iframe) и/или цепочка шагов <node>,
// между шагами сами встают стрелки
export default defineBlock({
  tag: 'lane',
  title: 'Дорожка',
  doc: 'Карточка с цветным заголовком; шаги <node> выстраиваются в цепочку со стрелками.',
  attrs: {
    title: { doc: 'заголовок капсом', required: true },
    color: { doc: 'цвет метки: токен (accent, muted, warn, c-chat…) или CSS-цвет', required: true },
    top: { doc: 'отступ сверху в px' },
  },
  slots: {
    node: {
      doc: 'шаг цепочки; внутри — короткая подпись под названием',
      attrs: { icon: { doc: 'значок шага', required: true }, t: { doc: 'название шага', required: true } },
    },
  },
  render: ({ attrs, slots, children }) => {
    const c = color(attrs.color)
    const nodes = (slots.node ?? []).map((s) => `<span class="bk-nd">${icon(s.attrs.icon)}<b>${s.attrs.t}</b><small>${inline(s.html)}</small></span>`)
    const row = nodes.length ? `<div class="bk-chainrow">${nodes.join(`<span class="bk-ar">${icon('arrow-right')}</span>`)}</div>` : ''
    return `<div class="bk-lane"${topStyle(attrs.top)}><div class="bk-lane-h" style="color:${c}"><span class="bk-dot" style="background:${c}"></span>${attrs.title}</div>${children.trim()}${row}</div>`
  },
  example: {
    ru: '<b-lane title="Ответ не подошёл" color="muted">\n  <node icon="x" t="Ответ">мимо задачи</node>\n  <node icon="refresh" t="Один из трёх путей">уточнить, переделать, спросить</node>\n  <node icon="ai-box" t="Новый ответ">и снова проверка</node>\n</b-lane>',
    en: '<b-lane title="Answer missed" color="muted">\n  <node icon="x" t="Answer">off the task</node>\n  <node icon="refresh" t="One of three paths">refine, redo, ask</node>\n  <node icon="ai-box" t="New answer">checked again</node>\n</b-lane>',
  },
})
