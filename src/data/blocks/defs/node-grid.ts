import { defineBlock, icon, inline } from '../core'

// Сетка карточек «значок — название — подпись»: столько колонок, сколько влезает (не уже min пикселей)
export default defineBlock({
  tag: 'node-grid',
  title: 'Сетка карточек',
  doc: 'Карточки со значком, названием и подписью; колонки подстраиваются под ширину.',
  attrs: { min: { doc: 'наименьшая ширина карточки, px (по умолчанию 150)', values: ['150', '170'] } },
  slots: {
    node: {
      doc: 'карточка; внутри — подпись',
      required: true,
      attrs: { icon: { doc: 'значок', required: true }, t: { doc: 'название', required: true }, sw: { doc: 'толщина линии значка (по умолчанию 2)' } },
    },
  },
  render: ({ attrs, slots }) => `<div class="bk-ng${attrs.min === '170' ? ' bk-ng-170' : ''}">${slots.node.map((s) =>
    `<div class="bk-ng-nd">${icon(s.attrs.icon, s.attrs.sw)}<b>${s.attrs.t}</b><small>${inline(s.html)}</small></div>`).join('')}</div>`,
  example: {
    ru: '<b-node-grid>\n  <node icon="lines" t="Jira" sw="1.8">читает задачу, пишет отчёт</node>\n  <node icon="play" t="Стенд">проходит путь как пользователь</node>\n  <node icon="shield-check" t="Права">ломать можно только стенд</node>\n</b-node-grid>',
    en: '<b-node-grid>\n  <node icon="lines" t="Jira" sw="1.8">reads the issue, writes the report</node>\n  <node icon="play" t="Stand">walks the path as a user</node>\n  <node icon="shield-check" t="Rights">only the stand may break</node>\n</b-node-grid>',
  },
})
