import { defineBlock } from '../core'

// Плашка с названием: инструмент, команда, правило. Ряд плашек — в <b-chips>
export default defineBlock({
  tag: 'chip',
  // Общий класс: плашку выводят и блоки-схемы (ctx-map, probe-check, rfc-levels), её вид — только здесь
  shared: ['bk-chip'],
  title: 'Плашка',
  doc: 'Плашка с коротким названием; on — выбранная.',
  attrs: { on: { doc: 'выбранная (залита акцентом)', values: [''] } },
  render: ({ attrs, children }) => `<span class="bk-chip${'on' in attrs ? ' bk-chip-on' : ''}">${children.trim()}</span>`,
  example: { ru: '<p><b-chip>MUST = SHALL</b-chip> <b-chip on>Инструмент: Work</b-chip></p>', en: '<p><b-chip>MUST = SHALL</b-chip> <b-chip on>Tool: Work</b-chip></p>' },
})
