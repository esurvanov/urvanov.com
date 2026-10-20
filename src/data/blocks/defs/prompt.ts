import { defineBlock } from '../core'

// Текст промпта, который читатель копирует как есть: моноширинный, переносы строк сохраняются.
// Содержимое не разбирается (в промпте бывают [скобки] и <теги>); отступ строк из поста срезается
export default defineBlock({
  tag: 'prompt',
  title: 'Промпт',
  doc: 'Готовый текст промпта: моноширинный, переносы строк как в посте.',
  raw: true,
  render: ({ raw }) => {
    const lines = raw.replace(/^[ \t]*\n|\n[ \t]*$/g, '').split('\n')
    const pad = Math.min(...lines.filter((x) => x.trim()).map((x) => /^[ \t]*/.exec(x)![0].length))
    // Перенос — сущностью &#10;: настоящий перевод строки внутри HTML markdown мог бы принять за конец блока
    const text = lines.map((x) => x.slice(pad)).join('&#10;').replace(/<(?![a-z/!])/g, '&lt;')
    return `<pre class="bk-prompt">${text}</pre>`
  },
  example: {
    ru: '<b-prompt>\n  [описание задачи]\n  Прежде чем выполнять задачу, задай мне 3 вопроса. Не начинай работу, пока я не отвечу.\n</b-prompt>',
    en: '<b-prompt>\n  [task description]\n  Before doing the task, ask me 3 questions. Do not start the work until I answer.\n</b-prompt>',
  },
})
