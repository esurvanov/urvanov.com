import { defineBlock, inline } from '../core'

// Нумерованные шаги карточками: номер, название, пояснение. Номера ставятся сами
export default defineBlock({
  tag: 'steps',
  title: 'Шаги',
  doc: 'Нумерованный список шагов карточками.',
  slots: {
    step: {
      doc: 'шаг; внутри — пояснение',
      required: true,
      attrs: { t: { doc: 'название шага', required: true }, hl: { doc: 'выделить шаг рамкой акцента', values: [''] } },
    },
  },
  render: ({ slots }) => `<ol class="bk-steps">${slots.step.map((s, i) =>
    `<li${'hl' in s.attrs ? ' class="bk-hl"' : ''}><span class="bk-step-n">${i + 1}</span><div><div class="bk-step-t">${s.attrs.t}</div>${s.html ? `<div class="bk-step-d">${inline(s.html)}</div>` : ''}</div></li>`).join('')}</ol>`,
  example: {
    ru: '<b-steps>\n  <step t="Агент подключит Jira">одной командой, вы ничего не вводите</step>\n  <step t="Откроется страница Jira — главный шаг" hl>вы входите и подтверждаете, пароль агент не видит</step>\n  <step t="Агент прочитает задачу">откроет задачу с комментариями и перескажет их</step>\n</b-steps>',
    en: '<b-steps>\n  <step t="The agent connects Jira">with one command, you type nothing</step>\n  <step t="A Jira page opens — the key step" hl>you sign in and confirm; the agent never sees the password</step>\n  <step t="The agent reads the issue">opens it with comments and sums them up</step>\n</b-steps>',
  },
})
