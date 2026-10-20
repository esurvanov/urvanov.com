import { attr, defineBlock, icon } from '../core'

// Источники данных карточками: значок, раздел-ссылка (вся карточка кликабельна), адрес, что в нём есть,
// и кружок «i» с подсказкой «Что внутри» — она скрыта и появляется при наведении или фокусе с клавиатуры
export default defineBlock({
  tag: 'sources',
  title: 'Источники данных',
  doc: 'Карточки разделов-источников с адресом и подсказкой «Что внутри» по наведению.',
  slots: {
    src: {
      doc: 'источник; внутри — текст подсказки',
      required: true,
      attrs: {
        icon: { doc: 'значок', required: true },
        href: { doc: 'адрес раздела', required: true },
        t: { doc: 'название раздела', required: true },
        path: { doc: 'путь в консоли', required: true },
        what: { doc: 'что в разделе, одна строка', required: true },
        'tip-label': { doc: 'подпись кружка «i» для скринридера', required: true },
      },
    },
  },
  render: ({ slots, l }) => `<div class="bk-sources">${slots.src.map((s) =>
    `<div class="bk-src"><div class="bk-src-ico" aria-hidden="true">${icon(s.attrs.icon, '1.8')}</div>`
    + `<div><div class="bk-src-name"><a href="${attr(s.attrs.href)}" target="_blank" rel="noopener">${s.attrs.t}</a></div><div class="bk-src-path">${s.attrs.path}</div><div class="bk-src-what">${s.attrs.what}</div></div>`
    + `<span class="bk-tip" tabindex="0" aria-label="${attr(s.attrs['tip-label'])}">i<span class="bk-tip-body" role="tooltip"><span class="bk-tip-k">${l('Что внутри', 'What&#39;s inside')}</span>${s.html}</span></span></div>`).join('')}</div>`,
  example: {
    ru: '<b-sources>\n  <src icon="users-alt" href="https://chatgpt.com/admin/usage/users" t="Пользователи" path="chatgpt.com/admin/usage/users" what="Сообщения, даты активности и встроенные инструменты каждого человека" tip-label="Что внутри раздела Пользователи">Экспорт CSV за период до 12 месяцев. Поля: messages, tool_messages, department, last_day_active.</src>\n</b-sources>',
    en: '<b-sources>\n  <src icon="users-alt" href="https://chatgpt.com/admin/usage/users" t="Users" path="chatgpt.com/admin/usage/users" what="Messages, activity dates, and built-in tools for each person" tip-label="What is inside the Users section">CSV export for a period of up to 12 months. Fields: messages, tool_messages, department, last_day_active.</src>\n</b-sources>',
  },
})
