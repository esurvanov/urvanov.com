import { defineBlock, inline } from '../core'

// Частые вопросы карточками в две колонки: вопрос h3 и короткий ответ
export default defineBlock({
  tag: 'qa',
  title: 'Вопросы и ответы',
  doc: 'Частые вопросы: заголовок-вопрос и абзац-ответ, две колонки.',
  attrs: { cols: { doc: 'колонок (по умолчанию 2)', values: ['2', '3'] } },
  slots: { q: { doc: 'вопрос; внутри — ответ', required: true, attrs: { t: { doc: 'вопрос', required: true } } } },
  render: ({ attrs, slots }) => `<div class="bk-qa${attrs.cols === '3' ? ' bk-qa-cols-3' : ''}">${slots.q.map((s) => `<div><h3>${s.attrs.t}</h3><p>${inline(s.html)}</p></div>`).join('')}</div>`,
  example: {
    ru: '<b-qa>\n  <q t="Claude Code или Codex">По доступу к проекту и действиям они совпадают, различаются моделью.</q>\n  <q t="Аналоги Claude Code">Codex, Cursor и Hermes Agent — с разными моделями и оплатой.</q>\n</b-qa>',
    en: '<b-qa>\n  <q t="Claude Code or Codex">They match on project access and actions and differ in the model.</q>\n  <q t="Claude Code alternatives">Codex, Cursor and Hermes Agent — with different models and pricing.</q>\n</b-qa>',
  },
})
