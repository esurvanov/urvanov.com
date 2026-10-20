import { color, defineBlock, icon, topStyle } from '../core'

// Дорожка со значком в заголовке вместо цветной точки: этап процесса и его схема или ряды «было / стало».
// Вид карточки — как у <b-lane>
export default defineBlock({
  tag: 'icon-lane',
  title: 'Дорожка со значком',
  doc: 'Карточка-дорожка с заголовком капсом и значком перед ним; внутри — схема, ряды или карточки.',
  attrs: {
    icon: { doc: 'значок заголовка', required: true },
    title: { doc: 'заголовок капсом', required: true },
    color: { doc: 'цвет заголовка (по умолчанию accent)' },
    top: { doc: 'отступ сверху в px' },
  },
  render: ({ attrs, children }) =>
    `<div class="bk-lane"${topStyle(attrs.top)}><div class="bk-lane-h" style="color:${color(attrs.color ?? 'accent')}"><span class="bk-il-ico">${icon(attrs.icon, '1.8')}</span>${attrs.title}</div>${children.trim()}</div>`,
  example: {
    ru: '<b-icon-lane icon="search-alt" title="Исследование"><b-art-plain name="bug-report-to-reproduction-agent/investigation"></b-art-plain></b-icon-lane>',
    en: '<b-icon-lane icon="search-alt" title="Investigation"><b-art-plain name="bug-report-to-reproduction-agent/investigation"></b-art-plain></b-icon-lane>',
  },
})
