import { defineBlock, inline } from '../core'

// Нумерованные шаги карточками с круглым номером и пояснением по ширине — вид серии harness
// (у <b-steps> номер квадратный, пояснение без выключки). Номера ставятся сами
export default defineBlock({
  tag: 'steps-round',
  title: 'Шаги с круглым номером',
  doc: 'Нумерованные шаги карточками: круглый номер, название, пояснение по ширине.',
  slots: {
    step: {
      doc: 'шаг; внутри — пояснение',
      required: true,
      attrs: { t: { doc: 'название шага', required: true }, hl: { doc: 'выделить шаг рамкой акцента', values: [''] } },
    },
  },
  render: ({ slots }) => `<ol class="bk-steps-round">${slots.step.map((s, i) =>
    `<li${'hl' in s.attrs ? ' class="bk-steps-round-hl"' : ''}><span class="bk-steps-round-n">${i + 1}</span><div><div class="bk-steps-round-t">${s.attrs.t}</div>${s.html ? `<div class="bk-steps-round-d">${inline(s.html)}</div>` : ''}</div></li>`).join('')}</ol>`,
  example: {
    ru: '<b-steps-round>\n  <step t="Агент подключит Jira">одной командой, вы ничего не вводите</step>\n  <step hl t="Откроется страница Jira — главный шаг">вы входите и подтверждаете доступ</step>\n  <step t="Агент прочитает PAY-142">откроет задачу и перескажет комментарии</step>\n</b-steps-round>',
    en: '<b-steps-round>\n  <step t="The agent connects Jira">with one command, you type nothing</step>\n  <step hl t="A Jira page opens — the key step">you sign in and confirm access</step>\n  <step t="The agent reads PAY-142">opens the task and retells the comments</step>\n</b-steps-round>',
  },
})
