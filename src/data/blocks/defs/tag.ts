import { defineBlock } from '../core'

// Короткая цветная метка в таблице или тексте: да / нет / нейтрально
export default defineBlock({
  tag: 'tag',
  title: 'Метка',
  doc: 'Цветная метка «да / нет» в ячейке таблицы.',
  attrs: { kind: { doc: 'ok — акцент, no — предупреждение, plain — серая', required: true, values: ['ok', 'no', 'plain'] } },
  render: ({ attrs, children }) => `<span class="bk-tag bk-${attrs.kind}">${children.trim()}</span>`,
  example: {
    ru: '<p><b-tag kind="ok">да</b-tag> <b-tag kind="no">галлюцинации</b-tag> <b-tag kind="plain">частично</b-tag></p>',
    en: '<p><b-tag kind="ok">yes</b-tag> <b-tag kind="no">hallucinations</b-tag> <b-tag kind="plain">partly</b-tag></p>',
  },
})
