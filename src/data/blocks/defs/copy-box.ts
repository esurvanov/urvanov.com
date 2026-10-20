import { defineBlock, icon, inline } from '../core'

// Текст с кнопкой «Копировать»: команды (<b-copy-code>) и готовая фраза агенту (<b-copy-quote>).
// Кнопку оживляет страница поста (BlogPostView): она ищет классы pq-copy, cb / pq и pq-text / code —
// эти имена оставлены в разметке как зацепки для скрипта, вид задают классы bk-*
const button = (l: (ru: string, en: string) => string) => {
  const label = l('Копировать', 'Copy')
  return `<button type="button" class="bk-cpy pq-copy" data-label="${label}" data-done="${l('Скопировано', 'Copied')}" aria-label="${label}" title="${label}">`
    + icon('copy').replace('<svg ', '<svg class="bk-cpy-ic" ')
    + icon('check', '2.4').replace('<svg ', '<svg class="bk-cpy-ok" ')
    + `<span class="bk-cpy-sr">${label}</span></button>`
}

// Текст как есть: общий отступ строк из поста срезается. Переносы — настоящие (слова в счётчике слов поста
// не склеиваются), а пустая строка — сущностью &#10;: настоящая пустая строка оборвала бы HTML-блок для markdown
const codeText = (raw: string) => {
  const lines = raw.replace(/^[ \t]*\n|\n[ \t]*$/g, '').split('\n')
  const pad = Math.min(...lines.filter((x) => x.trim()).map((x) => /^[ \t]*/.exec(x)![0].length))
  return lines.map((x) => (x.trim() ? x.slice(pad) : '&#10;')).join('\n').replace(/\n&#10;/g, '&#10;').replace(/</g, '&lt;')
}
const WRAP = { doc: 'длинные строки переносятся (для правил текстом, а не команд)', values: [''] }

export default [
  defineBlock({
    tag: 'copy-code',
    title: 'Команды с копированием',
    doc: 'Блок кода с кнопкой «Копировать»: строки как в посте, в буфер идут команды без комментариев «# …».',
    attrs: { wrap: WRAP },
    raw: true,
    render: ({ attrs, raw, l }) =>
      `<div class="bk-cb cb"><pre class="bk-cb-pre${'wrap' in attrs ? ' bk-cb-wrap' : ''}"><code>${codeText(raw)}</code></pre>${button(l)}</div>`,
    example: {
      ru: '<b-copy-code>\n  claude mcp add --transport http atlassian https://mcp.atlassian.com/v2/mcp\n  claude mcp list     # статус подключения\n</b-copy-code>',
      en: '<b-copy-code>\n  claude mcp add --transport http atlassian https://mcp.atlassian.com/v2/mcp\n  claude mcp list     # connection status\n</b-copy-code>',
    },
  }),
  defineBlock({
    tag: 'code-text',
    title: 'Текст правил',
    doc: 'Тот же блок кода, но без кнопки копирования: строки как в посте.',
    attrs: { wrap: WRAP },
    raw: true,
    render: ({ attrs, raw }) => `<pre class="bk-cb-pre bk-cb-nb${'wrap' in attrs ? ' bk-cb-wrap' : ''}"><code>${codeText(raw)}</code></pre>`,
    example: {
      ru: '<b-code-text wrap>\n  Сначала пробуй, оценку давай после пробы.\n  Если можешь сделать сам, делай.\n</b-code-text>',
      en: '<b-code-text wrap>\n  Try first, estimate after the try.\n  If you can do it yourself, do it.\n</b-code-text>',
    },
  }),
  defineBlock({
    tag: 'copy-quote',
    title: 'Фраза агенту',
    doc: 'Готовая фраза агенту в кавычках с кнопкой «Копировать».',
    render: ({ children, l }) => `<blockquote class="bk-pq pq"><div class="bk-pq-text pq-text">${inline(children)}</div>${button(l)}</blockquote>`,
    example: {
      ru: '<b-copy-quote>Подключи MCP-сервер Jira по инструкции Atlassian и проверь на задаче PAY-142.</b-copy-quote>',
      en: '<b-copy-quote>Connect the Jira MCP server following the Atlassian guide and test it on PAY-142.</b-copy-quote>',
    },
  }),
]
