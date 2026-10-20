import { defineBlock, inline } from '../core'

// Крупный абзац в начале главы: постановка задачи («Бизнес-задача: …»), с выключкой как обычный текст
export default defineBlock({
  tag: 'lead-large',
  title: 'Крупный абзац',
  doc: 'Абзац крупнее обычного, приглушённый: главная задача главы.',
  render: ({ children }) => `<p class="bk-lead-large">${inline(children)}</p>`,
  example: {
    ru: '<b-lead-large><b>Бизнес-задача:</b> определить, для каких рабочих задач текущего набора AI-инструментов недостаточно.</b-lead-large>',
    en: '<b-lead-large><b>Business task:</b> find which work tasks the current set of AI tools does not cover.</b-lead-large>',
  },
})
