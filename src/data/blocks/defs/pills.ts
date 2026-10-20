import { defineBlock, inline } from '../core'

// Ряд крупных плашек по центру: поддерживаемые браузеры, виды кейсов (серия harness). На телефоне — столбиком
export default defineBlock({
  tag: 'pills',
  title: 'Крупные плашки',
  doc: 'Ряд крупных плашек с рамкой по центру, с переносом; на телефоне — столбиком.',
  slots: { pill: { doc: 'плашка; внутри — короткая подпись', required: true } },
  render: ({ slots }) => `<div class="bk-pills">${slots.pill.map((s) => `<span class="bk-pills-pill">${inline(s.html)}</span>`).join('')}</div>`,
  example: {
    ru: '<b-pills>\n  <pill>Chrome</pill>\n  <pill>Edge</pill>\n  <pill>WSL: нет</pill>\n</b-pills>',
    en: '<b-pills>\n  <pill>Chrome</pill>\n  <pill>Edge</pill>\n  <pill>WSL: no</pill>\n</b-pills>',
  },
})
