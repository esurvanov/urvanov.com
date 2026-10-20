import { attr, defineBlock, icon } from '../core'

// Ссылки-плашки со значком справа под шагом или делом: «Кого звать на интервью ↗». Внешние — в новой вкладке
export default defineBlock({
  tag: 'link-chips',
  title: 'Ссылки-плашки',
  doc: 'Маленькие плашки-ссылки в ряд; внутри шага <b-steps> или дела <b-checklist>.',
  slots: {
    item: {
      doc: 'ссылка; внутри — подпись',
      required: true,
      attrs: { href: { doc: 'адрес', required: true }, icon: { doc: 'значок справа', required: true } },
    },
  },
  render: ({ slots }) => `<div class="bk-lchips">${slots.item.map((s) =>
    `<a class="bk-lchip" href="${attr(s.attrs.href)}"${/^https?:/.test(s.attrs.href) ? ' target="_blank" rel="noopener"' : ''}>${s.html} ${icon(s.attrs.icon)}</a>`).join('')}</div>`,
  example: {
    ru: '<b-link-chips>\n  <item href="/blog/who-to-interview-before-buying-ai-tools/" icon="arrow-right">Кого звать на интервью</item>\n  <item href="https://claude.com/claude-in-chrome" icon="arrow-up-right">Claude in Chrome</item>\n</b-link-chips>',
    en: '<b-link-chips>\n  <item href="/en/blog/who-to-interview-before-buying-ai-tools/" icon="arrow-right">Who to interview</item>\n  <item href="https://claude.com/claude-in-chrome" icon="arrow-up-right">Claude in Chrome</item>\n</b-link-chips>',
  },
})
