import { attr, defineBlock } from '../core'

// Рамка для схемы из библиотеки инфографики (../blogArt): <b-art names="пост/схема пост/схема-mobile"/>.
// Обычно две схемы — широкая и узкая для телефона, CSS схем показывает одну из них
export default defineBlock({
  tag: 'art',
  title: 'Схема',
  doc: 'Рамка со схемой <iso-art>: имена сцен через пробел (широкая и мобильная).',
  attrs: { names: { doc: 'имена сцен «пост/ключ» через пробел', required: true } },
  render: ({ attrs }) => `<div class="bk-art">${attrs.names.trim().split(/\s+/).map((n) => `<iso-art name="${attr(n)}"></iso-art>`).join('')}</div>`,
  example: {
    ru: '<b-art names="harness-work-approaches/two-runs harness-work-approaches/two-runs-mobile"></b-art>',
    en: '<b-art names="harness-work-approaches/two-runs harness-work-approaches/two-runs-mobile"></b-art>',
  },
})
