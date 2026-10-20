import { attr, defineBlock } from '../core'

// Схема <iso-art> как есть, без рамки: внутри дорожки, раскрывашки или сразу в главе, когда у схемы свой фон.
// Рамку даёт <b-art>, поля дорожки — <b-lane-art>
export default defineBlock({
  tag: 'scene',
  title: 'Схема без рамки',
  doc: 'Схема <iso-art> без рамки: внутри <b-lane>, <b-details> или прямо в главе.',
  attrs: { names: { doc: 'имена сцен «пост/ключ» через пробел', required: true } },
  render: ({ attrs }) => attrs.names.trim().split(/\s+/).map((n) => `<iso-art name="${attr(n)}"></iso-art>`).join(''),
  example: {
    ru: '<b-scene names="mcp-agent-access/start-small"/>',
    en: '<b-scene names="mcp-agent-access/start-small"/>',
  },
})
