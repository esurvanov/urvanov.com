import { defineBlock, inline } from '../core'

// Карточки «ключ → значение» в ряд (обычно три): вход, что делает, решение на выходе
export default defineBlock({
  tag: 'io',
  title: 'Карточки «ключ — значение»',
  doc: 'Три карточки в ряд: подпись капсом и текст.',
  slots: { item: { doc: 'карточка; внутри — текст', required: true, attrs: { k: { doc: 'подпись капсом', required: true } } } },
  render: ({ slots }) => `<div class="bk-io">${slots.item.map((s) => `<div><div class="bk-k">${s.attrs.k}</div><div class="bk-v">${inline(s.html)}</div></div>`).join('')}</div>`,
  example: {
    ru: '<b-io>\n  <item k="Вход">Таблица людей из отчёта и анкета на всю компанию</item>\n  <item k="Что делает метод">Отбирает по 2 человека на каждый способ решать задачи</item>\n  <item k="Решение на выходе">С кем говорить перед покупкой и что проверять</item>\n</b-io>',
    en: '<b-io>\n  <item k="Input">The people table from the report and a company-wide survey</item>\n  <item k="What the method does">Picks 2 people for each way of solving tasks</item>\n  <item k="Decision">Whom to talk to before buying and what to check</item>\n</b-io>',
  },
})
