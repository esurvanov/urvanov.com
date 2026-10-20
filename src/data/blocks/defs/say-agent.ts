import { defineBlock, icon, inline } from '../core'

// Готовая фраза для агента с кнопкой «Копировать» (серия harness: «Скажите агенту»). Кнопку оживляет
// BlogPostView — он ищет классы pq-copy / pq / pq-text, поэтому они стоят рядом с bk-классами как крючки для скрипта.
// plain — короткий вариант из ранних постов: кнопка без галочки «скопировано» и без скрытой подписи
export const copyButton = (l: (ru: string, en: string) => string, plain = false): string => {
  const label = l('Копировать', 'Copy')
  const head = `<button type="button" class="bk-copy pq-copy" data-label="${label}" data-done="${l('Скопировано', 'Copied')}" aria-label="${label}"`
  if (plain) return `${head}>${icon('copy', '1.8')}</button>`
  const ic = icon('copy').replace('<svg ', '<svg class="bk-copy-ic" ')
  const ok = icon('check', '2.4').replace('<svg ', '<svg class="bk-copy-ok" ')
  return `${head} title="${label}">${ic}${ok}<span class="bk-sr">${label}</span></button>`
}

/** Заголовок h3 над фразой или кодом: «Скажите агенту», «Шаблон одного пункта» */
export const askTitle = (t?: string): string => (t ? `<h3 class="bk-ask-h">${t}</h3>` : '')

export default defineBlock({
  tag: 'say-agent',
  title: 'Скажите агенту',
  doc: 'Фраза для агента курсивом в кавычках с кнопкой «Копировать»; title — заголовок h3 над ней.',
  attrs: {
    title: { doc: 'заголовок h3 над фразой: «Скажите агенту»' },
    plain: { doc: 'короткая кнопка: без галочки «скопировано» и скрытой подписи', values: [''] },
  },
  render: ({ attrs, children, l }) => {
    const text = inline(children)
    const body = 'plain' in attrs
      ? `<div class="bk-say pq">${copyButton(l, true)}<span class="bk-say-text pq-text">${text}</span></div>`
      : `<blockquote class="bk-say pq"><div class="bk-say-text pq-text">${text}</div>${copyButton(l)}</blockquote>`
    return askTitle(attrs.title) + body
  },
  example: {
    ru: '<b-say-agent title="Скажите агенту">Подключи базу аналитики только на чтение и покажи схему таблицы orders.</b-say-agent>',
    en: '<b-say-agent title="Tell the agent">Connect the analytics database read-only and show the schema of the orders table.</b-say-agent>',
  },
})
