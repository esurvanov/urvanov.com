import { defineBlock, icon, inline } from '../core'

// Правила карточками со значком: три в ряд (cols="2" — две)
export default defineBlock({
  tag: 'rules',
  title: 'Правила',
  doc: 'Карточки правил: значок, название, пояснение; три в ряд.',
  attrs: { cols: { doc: 'колонок (по умолчанию 3)', values: ['2', '3'] }, sw: { doc: 'толщина линии значков (по умолчанию 2; 1.8 — как в постах серии harness)' } },
  slots: {
    rule: {
      doc: 'правило; внутри — пояснение',
      required: true,
      attrs: { icon: { doc: 'значок', required: true }, t: { doc: 'название', required: true } },
    },
  },
  render: ({ attrs, slots }) => `<div class="bk-rules${attrs.cols === '2' ? ' bk-cols-2' : ''}">${slots.rule.map((s) =>
    `<div class="bk-rule"><span class="bk-ri">${icon(s.attrs.icon, attrs.sw)}</span><b>${s.attrs.t}</b><span>${inline(s.html)}</span></div>`).join('')}</div>`,
  example: {
    ru: '<b-rules>\n  <rule icon="pause" t="Пауза 5 секунд">После ответа молчать: люди сами добавляют главное</rule>\n  <rule icon="help" t="Один вопрос за раз">Без «и ещё…» в той же фразе</rule>\n  <rule icon="ban" t="Не предлагать решения">Ни своих идей, ни названий других продуктов</rule>\n</b-rules>',
    en: '<b-rules>\n  <rule icon="pause" t="A 5-second pause">Stay silent after an answer: people add the key point themselves</rule>\n  <rule icon="help" t="One question at a time">No “and also…” in the same sentence</rule>\n  <rule icon="ban" t="Do not suggest solutions">Neither your ideas nor names of other products</rule>\n</b-rules>',
  },
})
