import { attr, defineBlock, flowBody } from '../core'

// Подраздел главы: заголовок h3 (с якорем) и содержимое, отделён от предыдущего тонкой линией.
// Первый подраздел главы — без линии. Внутри — блоки и markdown абзацами
export default defineBlock({
  tag: 'subsection',
  title: 'Подраздел',
  doc: 'Часть главы с заголовком h3 и тонкой линией сверху; внутри — блоки и markdown.',
  attrs: { title: { doc: 'заголовок h3', required: true }, id: { doc: 'якорь заголовка (для ссылок и оглавления)' } },
  flow: true,
  render: ({ attrs, children }) => `<div class="bk-subsection"><h3${attrs.id ? ` id="${attr(attrs.id)}"` : ''}>${attrs.title}</h3>${flowBody(children)}</div>`,
  example: {
    ru: '<b-subsection id="demo-sub" title="Глубина проникновения"><b-why>Сколько людей пользуются хоть раз, регулярно и каждую неделю.</b-why></b-subsection>\n<b-subsection title="Однородность"><b-why>Насколько равномерно инструмент вошёл в разные команды.</b-why></b-subsection>',
    en: '<b-subsection id="demo-sub" title="Penetration depth"><b-why>How many people use it at least once, regularly and every week.</b-why></b-subsection>\n<b-subsection title="Uniformity"><b-why>How evenly the tool reached different teams.</b-why></b-subsection>',
  },
})
