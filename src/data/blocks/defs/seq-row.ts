import { defineBlock } from '../core'

// Последовательность этапов в строку: номер, название, подпись; между этапами «→», на телефоне — плитка без стрелок
export default defineBlock({
  tag: 'seq-row',
  title: 'Этапы в строку',
  doc: 'Нумерованные этапы <step> в одну строку со стрелками; номера ставятся сами.',
  slots: { step: { doc: 'этап; внутри — короткая подпись', required: true, attrs: { t: { doc: 'название', required: true } } } },
  render: ({ slots }) => `<div class="bk-seq-row-seq">${slots.step.map((s, i) =>
    `<div class="bk-seq-row"><span class="bk-seq-row-n">${i + 1}</span><b>${s.attrs.t}</b><small>${s.html}</small></div>`).join('<span class="bk-seq-row-a">→</span>')}</div>`,
  example: {
    ru: '<b-seq-row>\n  <step t="Принципы">один раз на проект</step>\n  <step t="Спека">что и зачем</step>\n  <step t="План">как</step>\n  <step t="Задачи">шаги</step>\n</b-seq-row>',
    en: '<b-seq-row>\n  <step t="Principles">once per project</step>\n  <step t="Spec">what and why</step>\n  <step t="Plan">how</step>\n  <step t="Tasks">steps</step>\n</b-seq-row>',
  },
})
