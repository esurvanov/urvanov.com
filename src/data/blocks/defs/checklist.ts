import { defineBlock, inline } from '../core'

// Чек-лист в одну колонку: квадратик, дело, пояснение и, если нужно, ссылки-плашки <b-link-chips> под ним.
// Крупнее и просторнее двухколоночного <b-todo>
export default defineBlock({
  tag: 'checklist',
  title: 'Чек-лист в столбик',
  doc: 'Дела с квадратиками в одну колонку; под пояснением могут быть <b-link-chips>.',
  slots: { item: { doc: 'дело; внутри — пояснение и ссылки', required: true, attrs: { t: { doc: 'что сделать', required: true } } } },
  render: ({ slots }) => `<ul class="bk-check">${slots.item.map((s) => {
    // Ссылки-плашки идут отдельным блоком после пояснения
    const i = s.html.indexOf('<div class="bk-lchips"')
    const [d, links] = i < 0 ? [s.html, ''] : [s.html.slice(0, i), s.html.slice(i)]
    return `<li><span class="bk-check-box" aria-hidden="true"></span><div><b>${s.attrs.t}</b>${d.trim() ? `<span class="bk-check-d">${inline(d)}</span>` : ''}${links}</div></li>`
  }).join('')}</ul>`,
  example: {
    ru: '<b-checklist>\n  <item t="Выгрузить пользователей и таблицу лидеров за три месяца">Выгрузку можно поручить браузерному агенту<b-link-chips><item href="https://claude.com/claude-in-chrome" icon="arrow-up-right">Claude in Chrome</item></b-link-chips></item>\n  <item t="Посчитать глубину проникновения">Хоть раз / регулярно / каждую неделю</item>\n</b-checklist>',
    en: '<b-checklist>\n  <item t="Export users and the leaderboard for three months">A browser agent can do the export<b-link-chips><item href="https://claude.com/claude-in-chrome" icon="arrow-up-right">Claude in Chrome</item></b-link-chips></item>\n  <item t="Compute penetration depth">At least once / regularly / weekly</item>\n</b-checklist>',
  },
})
