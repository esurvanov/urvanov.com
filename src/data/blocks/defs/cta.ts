import { attr, defineBlock, icon, inline } from '../core'

// Карточка «следующий шаг» — ссылка на продолжение в другом посте. С icon — вариант со значком слева и стрелкой
export default defineBlock({
  tag: 'cta',
  title: 'Следующий шаг',
  doc: 'Крупная карточка-ссылка на продолжение темы.',
  attrs: {
    href: { doc: 'адрес', required: true },
    k: { doc: 'метка над заголовком: «Следующий шаг · HDD»', required: true },
    t: { doc: 'заголовок', required: true },
    icon: { doc: 'значок слева (тогда справа — стрелка)' },
  },
  render: ({ attrs, children }) => attrs.icon
    ? `<a class="bk-cta bk-cta-i" href="${attr(attrs.href)}"><span class="bk-cta-ic">${icon(attrs.icon)}</span><span class="bk-cta-b"><span class="bk-cta-k">${attrs.k}</span><b>${attrs.t}</b><span class="bk-cta-d">${inline(children)}</span></span><span class="bk-cta-ar">${icon('arrow-right')}</span></a>`
    : `<a class="bk-cta" href="${attr(attrs.href)}"><span class="bk-cta-k">${attrs.k}</span><b>${attrs.t}</b><span class="bk-cta-d">${inline(children)}</span></a>`,
  example: {
    ru: '<b-cta href="/blog/harness-driven-development/" k="Следующий шаг · HDD" t="Harness-Driven Development">Как повторяющийся пропуск перенести из запроса в правила харнесса</b-cta>\n<b-cta href="/blog/spec-reconcile-loop/" k="Продолжение" t="Петля сверки для спек" icon="refresh-cw">как в Kubernetes: желаемое, замер и среда агента</b-cta>',
    en: '<b-cta href="/en/blog/harness-driven-development/" k="Next step · HDD" t="Harness-Driven Development">How to move a recurring gap from the request into harness rules</b-cta>\n<b-cta href="/en/blog/spec-reconcile-loop/" k="Continued" t="A reconcile loop for specs" icon="refresh-cw">like Kubernetes: desired state, probes and the agent’s environment</b-cta>',
  },
})
