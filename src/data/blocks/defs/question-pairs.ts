import { defineBlock, inline } from '../core'

// Пары формулировок «плохо → хорошо»: тип ошибки слева, неудачный вопрос (✕) и исправленный (✓)
export default defineBlock({
  tag: 'question-pairs',
  title: 'Пары «плохо — хорошо»',
  doc: 'Строки: тип ошибки, неудачная формулировка и исправленная.',
  slots: {
    pair: {
      doc: 'пара; внутри — исправленная формулировка',
      required: true,
      attrs: { tag: { doc: 'тип ошибки: «наводящий»', required: true }, bad: { doc: 'неудачная формулировка', required: true } },
    },
  },
  render: ({ slots }) => `<div class="bk-question-pairs-pairs">${slots.pair.map((p) =>
    `<div class="bk-question-pairs"><span class="bk-question-pairs-tg">${p.attrs.tag}</span><div class="bk-question-pairs-no">${p.attrs.bad}</div><div class="bk-question-pairs-yes">${inline(p.html)}</div></div>`).join('')}</div>`,
  example: {
    ru: '<b-question-pairs>\n  <pair tag="наводящий" bad="Насколько вам удобно пользоваться инструментом?">Опишите последнюю рабочую задачу, которая заняла у вас заметное время.</pair>\n  <pair tag="двойной" bad="Что вы делаете в инструменте и как часто?">Какую последнюю задачу вы делали с помощью AI?</pair>\n</b-question-pairs>',
    en: '<b-question-pairs>\n  <pair tag="leading" bad="How convenient is the tool for you?">Describe the last work task that took you noticeable time.</pair>\n  <pair tag="double" bad="What do you do in the tool and how often?">What was the last task you did with AI?</pair>\n</b-question-pairs>',
  },
})
