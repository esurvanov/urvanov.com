import { defineBlock, inline } from '../core'

// Свёрнутый раздел <details>: «Как это делается руками», «Если не подключается». Внутри — блоки и markdown абзацами
export default defineBlock({
  tag: 'spoiler',
  title: 'Свёрнутый раздел',
  doc: 'Раскрывающийся раздел: заголовок-кнопка, под ним блоки и markdown абзацами.',
  attrs: { summary: { doc: 'надпись, по которой раскрывается', required: true } },
  flow: true,
  // Пустые строки — только там, где они есть в посте (вокруг markdown-абзацев): если добавить их перед схемой
  // <iso-art> в начале, markdown принял бы её за абзац и обернул в <p>
  render: ({ attrs, children }) => `<details class="bk-spoiler"><summary>${inline(attrs.summary)}</summary>${children}</details>`,
  example: {
    ru: '<b-spoiler summary="Как это делается руками">\n\nСписок серверов: `claude mcp list`.\n\n</b-spoiler>',
    en: '<b-spoiler summary="How to do it by hand">\n\nList of servers: `claude mcp list`.\n\n</b-spoiler>',
  },
})
