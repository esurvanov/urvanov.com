import { defineBlock } from '../core'

// Значение поля-выбора Airtable: цветная капсула «Успех», «голос», «изредка». Цвета — токены --pg/--py/… из rich-post.css
export default defineBlock({
  tag: 'select-pill',
  // Общие классы: цветную пилюлю выводит и choice-flow
  shared: ['bk-select-pill', 'bk-select-pill-*'],
  title: 'Значение поля Airtable',
  doc: 'Цветная капсула значения поля-выбора (single select) в таблице или тексте.',
  attrs: { tone: { doc: 'цвет капсулы', required: true, values: ['green', 'yellow', 'red', 'cyan', 'gray', 'purple'] } },
  render: ({ attrs, children }) => `<span class="bk-select-pill bk-select-pill-${attrs.tone}">${children.trim()}</span>`,
  example: {
    ru: '<p><b-select-pill tone="green">Успех</b-select-pill> <b-select-pill tone="yellow">Не все вопросы</b-select-pill> <b-select-pill tone="cyan">Жду ответа</b-select-pill> <b-select-pill tone="gray">В работе</b-select-pill> <b-select-pill tone="red">Отказ</b-select-pill> <b-select-pill tone="purple">текст</b-select-pill></p>',
    en: '<p><b-select-pill tone="green">Done</b-select-pill> <b-select-pill tone="yellow">Partial</b-select-pill> <b-select-pill tone="cyan">Waiting</b-select-pill> <b-select-pill tone="gray">In progress</b-select-pill> <b-select-pill tone="red">Declined</b-select-pill> <b-select-pill tone="purple">text</b-select-pill></p>',
  },
})
