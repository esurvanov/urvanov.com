import { defineBlock, inline } from '../core'

// Частые вопросы столбиком: вопрос акцентом, ответ строкой ниже, каждый в своей серой карточке
export default defineBlock({
  tag: 'faq-cards',
  title: 'Вопросы столбиком',
  doc: 'Частые вопросы карточками в одну колонку: вопрос акцентом, ответ под ним.',
  slots: { q: { doc: 'вопрос; внутри — ответ', required: true, attrs: { t: { doc: 'вопрос', required: true } } } },
  render: ({ slots }) => `<div class="bk-faq-cards">${slots.q.map((s) => `<div><b>${s.attrs.t}</b><br>${inline(s.html)}</div>`).join('')}</div>`,
  example: {
    ru: '<b-faq-cards>\n  <q t="Чем ИИ-агент отличается от чат-бота?">Чат-бот отвечает по сценарию. Агент действует в ваших системах и проверяет результат.</q>\n  <q t="ChatGPT — это агент?">В обычном режиме это чат.</q>\n</b-faq-cards>',
    en: '<b-faq-cards>\n  <q t="How is an AI agent different from a chatbot?">A chatbot follows a script. An agent acts in your systems and checks the result.</q>\n  <q t="Is ChatGPT an agent?">In normal mode it is a chat.</q>\n</b-faq-cards>',
  },
})
