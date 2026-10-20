import { defineBlock, inline } from '../core'

// Чек-лист карточками в две колонки: пустой квадратик, дело, пояснение
export default defineBlock({
  tag: 'todo',
  title: 'Чек-лист',
  doc: 'Список дел с квадратиками, две колонки.',
  slots: { item: { doc: 'дело; внутри — пояснение', required: true, attrs: { t: { doc: 'что сделать', required: true } } } },
  render: ({ slots }) => `<ul class="bk-todo">${slots.item.map((s) =>
    `<li><span class="bk-box" aria-hidden="true"></span><div><b>${s.attrs.t}</b>${s.html ? `<span class="bk-d">${inline(s.html)}</span>` : ''}</div></li>`).join('')}</ul>`,
  example: {
    ru: '<b-todo>\n  <item t="Предупредить про ассистента для заметок">В приглашении и в начале звонка</item>\n  <item t="Выгрузить пользователей за три месяца">Выгрузку можно поручить браузерному агенту</item>\n  <item t="Сверить ответы с отчётом">Расхождения обсудить с человеком</item>\n</b-todo>',
    en: '<b-todo>\n  <item t="Mention the note-taking assistant">In the invite and at the start of the call</item>\n  <item t="Export users for three months">A browser agent can do the export</item>\n  <item t="Check answers against the report">Discuss differences with the person</item>\n</b-todo>',
  },
})
