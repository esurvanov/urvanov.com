import { defineBlock } from '../core'

// Строчная метка «да / нет / частично» в таблицах харнесса: в строку текста, высотой со строку
// (у <b-tag> — отдельная плашка с собственной высотой строки, поэтому ячейки таблицы выходят выше)
export default defineBlock({
  tag: 'tag-inline',
  title: 'Строчная метка',
  doc: 'Цветная метка в строку текста: да / нет / частично.',
  attrs: { kind: { doc: 'ok — акцент, no — предупреждение, muted — серая бледная', required: true, values: ['ok', 'no', 'muted'] } },
  render: ({ attrs, children }) => `<span class="bk-tag-inline bk-tag-inline-${attrs.kind}">${children.trim()}</span>`,
  example: {
    ru: '<p><b-tag-inline kind="ok">да</b-tag-inline> <b-tag-inline kind="no">нет</b-tag-inline> <b-tag-inline kind="muted">частично</b-tag-inline></p>',
    en: '<p><b-tag-inline kind="ok">yes</b-tag-inline> <b-tag-inline kind="no">no</b-tag-inline> <b-tag-inline kind="muted">partly</b-tag-inline></p>',
  },
})
