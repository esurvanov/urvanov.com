import { defineBlock, inline } from '../core'

// Порядок работы (серия gruppy): как <b-steps>, но номер в круге и пояснение по ширине — вид шагов этой серии
export default defineBlock({
  tag: 'gruppy-steps',
  title: 'Шаги с номером в круге',
  doc: 'Нумерованные шаги карточками: номер в круге, название и пояснение по ширине.',
  slots: { step: { doc: 'шаг; внутри — пояснение', required: true, attrs: { t: { doc: 'название шага', required: true } } } },
  render: ({ slots }) => `<ol class="bk-gruppy-steps">${slots.step.map((s, i) =>
    `<li><span class="bk-gruppy-steps-n">${i + 1}</span><div><div class="bk-gruppy-steps-t">${s.attrs.t}</div>${s.html ? `<div class="bk-gruppy-steps-d">${inline(s.html)}</div>` : ''}</div></li>`).join('')}</ol>`,
  example: {
    ru: '<b-gruppy-steps>\n  <step t="Собрать кандидатов в группы">По порогам из отчёта и по анкете</step>\n  <step t="Оставить по 2 человека в группе">Из разных команд, если есть выбор</step>\n</b-gruppy-steps>',
    en: '<b-gruppy-steps>\n  <step t="Collect candidates into groups">From report thresholds and the questionnaire</step>\n  <step t="Keep 2 people per group">From different teams if you have a choice</step>\n</b-gruppy-steps>',
  },
})
