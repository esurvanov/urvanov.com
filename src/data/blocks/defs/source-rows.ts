import { attr, defineBlock, inline } from '../core'

// Список источников или инструментов строками: название акцентом, что даёт, приглушённая пометка и ссылка.
// miss — что будет без источника (строка предупреждения под описанием)
export default defineBlock({
  tag: 'source-rows',
  title: 'Строки источников',
  doc: 'Источники строками: название, что даёт, «без него», пометка и ссылка.',
  attrs: { wide: { doc: 'колонка названия шире (для длинных имён вроде 1c-mcp-toolkit)', values: [''] } },
  slots: {
    row: {
      doc: 'источник; внутри — что он даёт',
      required: true,
      attrs: {
        t: { doc: 'название', required: true },
        note: { doc: 'пометка справа: тип сервера, где взять', required: true },
        href: { doc: 'ссылка', required: true },
        link: { doc: 'текст ссылки (по умолчанию «Подробнее» / «More»)' },
        miss: { doc: 'что будет без источника' },
      },
    },
  },
  render: ({ attrs, slots, l }) => `<div class="bk-srcr${'wide' in attrs ? ' bk-srcr-wide' : ''}">${slots.row.map((s) => {
    const a = s.attrs, ext = /^https?:/.test(a.href) ? ' target="_blank" rel="noopener"' : ''
    const miss = a.miss ? `<br><span class="bk-srcr-miss"><b>${l('Без него:', 'Without it:')}</b> ${a.miss}</span>` : ''
    return `<div class="bk-srcr-r"><b>${a.t}</b><span class="bk-srcr-d">${inline(s.html)}${miss}</span><span class="bk-srcr-n">${a.note}</span><a href="${attr(a.href)}"${ext}>${a.link ?? l('Подробнее', 'More')}</a></div>`
  }).join('')}</div>`,
  example: {
    ru: '<b-source-rows>\n  <row t="GitLab" note="Официальный MCP" href="https://docs.gitlab.com/user/model_context_protocol/mcp_server/" miss="Агент додумывает код по другим контекстам">Код и запросы на слияние</row>\n  <row t="1С" note="Открытые MCP-серверы" href="/blog/mcp-1c/#what">Код конфигурации и данные учёта</row>\n</b-source-rows>',
    en: '<b-source-rows>\n  <row t="GitLab" note="Official MCP" href="https://docs.gitlab.com/user/model_context_protocol/mcp_server/" miss="The agent guesses the code from other contexts">Code and merge requests</row>\n  <row t="1C" note="Open MCP servers" href="/en/blog/mcp-1c/#what">Configuration code and accounting data</row>\n</b-source-rows>',
  },
})
