import { attr, defineBlock, inline } from '../core'

// «Дальше по теме»: карточки-ссылки на другие посты. Карточка — ссылка с классом, поэтому общая стрелка
// сайта для ссылок в тексте (site.css, a:not([class])) к ней не цепляется
export default defineBlock({
  tag: 'links',
  title: 'Дальше по теме',
  doc: 'Карточки-ссылки на другие посты: рубрика, название, одна строка о чём.',
  attrs: { cols: { doc: 'колонок на широком экране (по умолчанию 1)', values: ['1', '2', '3'] } },
  slots: {
    item: {
      doc: 'карточка; внутри — строка-описание',
      required: true,
      attrs: {
        href: { doc: 'адрес', required: true },
        k: { doc: 'рубрика над названием', required: true },
        t: { doc: 'название', required: true },
        ext: { doc: 'внешняя ссылка: открыть в новой вкладке', values: [''] },
      },
    },
  },
  render: ({ attrs, slots }) =>
    `<div class="bk-links${attrs.cols && attrs.cols !== '1' ? ` bk-links-cols-${attrs.cols}` : ''}">${slots.item.map((s) =>
      `<a class="bk-links-link" href="${attr(s.attrs.href)}"${'ext' in s.attrs ? ' target="_blank" rel="noopener"' : ''}><div class="bk-links-k">${s.attrs.k}</div><div class="bk-links-t">${s.attrs.t}</div><div class="bk-links-d">${inline(s.html)}</div></a>`).join('')}</div>`,
  example: {
    ru: '<b-links cols="2">\n  <item href="/blog/specs-rules-skills/" k="Контекст" t="Спеки, библия, правила и скиллы">Что агент должен знать о проекте</item>\n  <item href="/blog/harness-driven-development/" k="Метод" t="Harness-Driven Development">Ошибка агента → правило окружения</item>\n</b-links>',
    en: '<b-links cols="2">\n  <item href="/en/blog/specs-rules-skills/" k="Context" t="Specs, bible, rules and skills">What an agent should know about a project</item>\n  <item href="/en/blog/harness-driven-development/" k="Method" t="Harness-Driven Development">An agent mistake → a rule of its environment</item>\n</b-links>',
  },
})
