import { defineBlock } from '../core'
import { askTitle, copyButton } from './say-agent'

// Код или шаблон моноширинным блоком: команды терминала, JSON конфига. copy — кнопка «Копировать» в углу
// (скрипт в BlogPostView копирует без строк-комментариев «# …»; крючки скрипта — классы cb и pq-copy).
// Текст берётся как есть: переносы строк сохраняются, общий отступ срезается, < и & экранируются сами
export default defineBlock({
  tag: 'codebox',
  title: 'Код',
  doc: 'Код или шаблон как есть, моноширинным блоком; copy — кнопка «Копировать», title — заголовок h3 над ним.',
  attrs: {
    title: { doc: 'заголовок h3 над кодом' },
    copy: { doc: 'кнопка «Копировать»', values: [''] },
  },
  raw: true,
  render: ({ attrs, raw, l }) => {
    const lines = raw.replace(/^[ \t]*\n|\n[ \t]*$/g, '').split('\n')
    const pad = Math.min(...lines.filter((x) => x.trim()).map((x) => /^[ \t]*/.exec(x)![0].length))
    // Переносы строк настоящие (как в <b-copy-code>): в .md-копии и llms-full код остаётся по строкам, а слова соседних
    // строк не склеиваются при подсчёте. Только пустая строка — сущностью &#10;: она оборвала бы HTML-блок для markdown
    const text = lines.map((x) => x.slice(pad)).join('\n').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n(?=[ \t]*(\n|$))/g, '&#10;')
    const pre = `<pre class="bk-codebox"><code>${text}</code></pre>`
    return askTitle(attrs.title) + ('copy' in attrs ? `<div class="bk-codebox-wrap cb">${pre}${copyButton(l)}</div>` : pre)
  },
  example: {
    ru: '<b-codebox copy>\n  claude --chrome\n  /chrome   # статус, права\n</b-codebox>',
    en: '<b-codebox copy>\n  claude --chrome\n  /chrome   # status, permissions\n</b-codebox>',
  },
})
