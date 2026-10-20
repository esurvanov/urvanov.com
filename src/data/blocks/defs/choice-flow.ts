import { attr, defineBlock, icon, inline } from '../core'

// Шаги до развилки и варианты после неё в одной полосе: «Приглашение → Готов созвониться? → да: голос / нет: текст»
export default defineBlock({
  tag: 'choice-flow',
  title: 'Шаги и развилка',
  doc: 'Полоса: шаги со стрелками, в конце — варианты ответа с плашкой Airtable.',
  attrs: { label: { doc: 'вся схема словами для скринридера', required: true } },
  slots: {
    step: { doc: 'шаг; внутри — подпись под названием', required: true, attrs: { t: { doc: 'название шага', required: true } } },
    opt: {
      doc: 'вариант после развилки; внутри — что тогда делаем',
      required: true,
      attrs: {
        k: { doc: 'ответ: «да», «нет»', required: true },
        pill: { doc: 'текст плашки', required: true },
        tone: { doc: 'цвет плашки, как у <b-select-pill>', required: true, values: ['green', 'yellow', 'red', 'cyan', 'gray', 'purple'] },
      },
    },
  },
  render: ({ attrs, slots }) => {
    const ar = `<span class="bk-mix-ar">${icon('arrow-right')}</span>`
    const steps = slots.step.map((s) => `<span class="bk-mx">${s.attrs.t}<small>${inline(s.html)}</small></span>`).join(ar)
    const opts = slots.opt.map((o) => `<div><em>${o.attrs.k}</em><span class="bk-at bk-at-${o.attrs.tone}">${o.attrs.pill}</span> ${inline(o.html)}</div>`).join('')
    return `<div class="bk-mix" aria-label="${attr(attrs.label)}">${steps}${ar}<div class="bk-mxo">${opts}</div></div>`
  },
  example: {
    ru: '<b-choice-flow label="Голос или текст — выбирает респондент">\n  <step t="Приглашение">В личном сообщении</step>\n  <step t="Готов созвониться?">30 минут</step>\n  <opt k="да" tone="cyan" pill="голос">звонок с ассистентом для заметок</opt>\n  <opt k="нет" tone="purple" pill="текст">те же вопросы в переписке</opt>\n</b-choice-flow>',
    en: '<b-choice-flow label="Voice or text — the respondent chooses">\n  <step t="Invitation">In a direct message</step>\n  <step t="Ready for a call?">30 minutes</step>\n  <opt k="yes" tone="cyan" pill="voice">a call with a note-taking assistant</opt>\n  <opt k="no" tone="purple" pill="text">the same questions in chat</opt>\n</b-choice-flow>',
  },
})
