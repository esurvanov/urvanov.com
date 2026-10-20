import { attr, defineBlock, topStyle } from '../core'

// Схема <iso-art> в карточке дорожки без заголовка: рамка и поля как у <b-lane> (у <b-art> поля уже).
// Вид берёт из lane.css (класс bk-lane), своих стилей нет
export default defineBlock({
  tag: 'lane-art',
  title: 'Схема в карточке',
  doc: 'Схема <iso-art> в карточке дорожки без заголовка: поля как у <b-lane>.',
  attrs: {
    names: { doc: 'имена сцен «пост/ключ» через пробел', required: true },
    top: { doc: 'отступ сверху в px' },
  },
  render: ({ attrs }) => `<div class="bk-lane"${topStyle(attrs.top)}>${attrs.names.trim().split(/\s+/).map((n) => `<iso-art name="${attr(n)}"></iso-art>`).join('')}</div>`,
  example: {
    ru: '<b-lane-art names="ai-agent-llm-harness/formula"/>',
    en: '<b-lane-art names="ai-agent-llm-harness/formula"/>',
  },
})
