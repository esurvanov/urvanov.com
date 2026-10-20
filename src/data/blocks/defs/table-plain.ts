import { defineBlock } from '../core'

// Таблица без рамки и прокрутки — сразу в тексте главы, строки разделены линиями. Внутри — HTML-таблица.
// В рамке, с прокруткой на узком экране — <b-table>
export default defineBlock({
  tag: 'table-plain',
  title: 'Таблица без рамки',
  doc: 'HTML-таблица прямо в тексте: без рамки и прокрутки, строки разделены линиями.',
  render: ({ children }) => {
    const t = children.trim()
    if (!t.startsWith('<table>')) throw new Error('blocks: <b-table-plain> — внутри нужна HTML-таблица <table>…</table>')
    return t.replace(/^<table>/, '<table class="bk-tblp">')
  },
  example: {
    ru: '<b-table-plain>\n<table><thead><tr><th>Часть ответа</th><th>Опора</th></tr></thead><tbody><tr><td>Шаги воспроизведения</td><td>Jira, заявка PAY-142</td></tr><tr><td>Где падает код</td><td>GitLab, файл и строка</td></tr></tbody></table>\n</b-table-plain>',
    en: '<b-table-plain>\n<table><thead><tr><th>Part of the answer</th><th>Grounding</th></tr></thead><tbody><tr><td>Steps to reproduce</td><td>Jira, ticket PAY-142</td></tr><tr><td>Where the code fails</td><td>GitLab, file and line</td></tr></tbody></table>\n</b-table-plain>',
  },
})
