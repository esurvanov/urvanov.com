import { attr, defineBlock, icon } from '../core'

// Три шага со стрелками (серия hdd): спека → харнесс → принятый код. На телефоне — столбиком
export default defineBlock({
  tag: 'hdd-specflow',
  title: 'Три шага со стрелками',
  doc: 'Три карточки «значок — название — пояснение» со стрелками между ними.',
  attrs: { label: { doc: 'подпись для скринридера (aria-label)', required: true } },
  slots: {
    node: {
      doc: 'шаг; внутри — пояснение мелко',
      required: true,
      attrs: { icon: { doc: 'значок', required: true }, t: { doc: 'название', required: true } },
    },
  },
  render: ({ attrs, slots }) => `<div class="bk-hsf" role="img" aria-label="${attr(attrs.label)}">${slots.node.map((s) =>
    `<div class="bk-hsf-n">${icon(s.attrs.icon)}<b>${s.attrs.t}</b><small>${s.html}</small></div>`).join(`<div class="bk-hsf-x">${icon('arrow-right')}</div>`)}</div>`,
  example: {
    ru: '<b-hdd-specflow label="Спека задаёт цель, харнесс проверяет">\n  <node icon="target" t="Спека">какой результат нужен</node>\n  <node icon="sun" t="Харнесс">как проверить, что он получен</node>\n  <node icon="check-circle-alt" t="Принятый код">без ручного контроля каждой строки</node>\n</b-hdd-specflow>',
    en: '<b-hdd-specflow label="The spec sets the goal, the harness checks it">\n  <node icon="target" t="Spec">the result you need</node>\n  <node icon="sun" t="Harness">how to check you got it</node>\n  <node icon="check-circle-alt" t="Accepted code">no line-by-line manual review</node>\n</b-hdd-specflow>',
  },
})
