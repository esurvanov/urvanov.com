import { defineBlock, inline } from '../core'

// Карточки «ключ → значение» в ряд (обычно три): вход, что делает, решение на выходе
export default defineBlock({
  tag: 'io',
  title: 'Карточки «ключ — значение»',
  doc: 'Три карточки в ряд: подпись капсом и текст.',
  // justify — текст карточек по ширине с переносами, как в постах серии prompts
  attrs: { justify: { doc: 'текст карточек по ширине', values: [''] } },
  slots: {
    item: {
      doc: 'карточка; внутри — текст',
      required: true,
      attrs: {
        k: { doc: 'подпись капсом', required: true },
        mono: { doc: 'подпись — имя файла: моноширинно, без капса', values: [''] },
        eq: { doc: 'приписка к подписи без капса: «≈ правила»' },
      },
    },
  },
  render: ({ attrs, slots }) => `<div class="bk-io${'justify' in attrs ? ' bk-io-justify' : ''}">${slots.item.map((s) => `<div><div class="bk-io-k${'mono' in s.attrs ? ' bk-io-mono' : ''}">${s.attrs.k}${s.attrs.eq ? ` <span class="bk-io-k-eq">${s.attrs.eq}</span>` : ''}</div><div class="bk-io-v">${inline(s.html)}</div></div>`).join('')}</div>`,
  example: {
    ru: '<b-io>\n  <item k="Вход">Таблица людей из отчёта и анкета на всю компанию</item>\n  <item k="Что делает метод">Отбирает по 2 человека на каждый способ решать задачи</item>\n  <item k="Решение на выходе">С кем говорить перед покупкой и что проверять</item>\n</b-io>',
    en: '<b-io>\n  <item k="Input">The people table from the report and a company-wide survey</item>\n  <item k="What the method does">Picks 2 people for each way of solving tasks</item>\n  <item k="Decision">Whom to talk to before buying and what to check</item>\n</b-io>',
  },
})
