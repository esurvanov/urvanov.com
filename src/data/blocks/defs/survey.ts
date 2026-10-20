import { color, defineBlock, inline } from '../core'

// Вопросы анкеты карточками: номер (цвет — какие вопросы из интервью), вопрос, варианты ответа и что он замеряет
export default defineBlock({
  tag: 'survey',
  title: 'Анкета',
  doc: 'Нумерованные вопросы анкеты: вопрос, варианты ответа, что замеряет.',
  slots: {
    q: {
      doc: 'вопрос; внутри — варианты ответа',
      required: true,
      attrs: {
        t: { doc: 'вопрос', required: true },
        tag: { doc: 'что замеряет вопрос', required: true },
        color: { doc: 'цвет номера (по умолчанию c-work)' },
      },
    },
  },
  render: ({ slots }) => `<ol class="bk-qlist">${slots.q.map((s, i) =>
    `<li><span class="bk-qn"${s.attrs.color ? ` style="background:${color(s.attrs.color)}"` : ''}>${i + 1}</span><div><b>${s.attrs.t}</b><span class="bk-bl">${inline(s.html)}</span><span class="bk-bl">${s.attrs.tag}</span></div></li>`).join('')}</ol>`,
  example: {
    ru: '<b-survey>\n  <q t="Какие из этих задач вы делаете по работе?" color="c-proj" tag="задачи">выбор: задачи из интервью · другое — открытое поле</q>\n  <q t="Что ещё важно, но не вошло в вопросы?" tag="неучтённое">открытое поле</q>\n</b-survey>',
    en: '<b-survey>\n  <q t="Which of these tasks do you do at work?" color="c-proj" tag="tasks">choice: tasks from interviews · other — open field</q>\n  <q t="What else matters but was not asked?" tag="unaccounted">open field</q>\n</b-survey>',
  },
})
