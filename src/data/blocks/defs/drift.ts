import { defineBlock, icon, inline } from '../core'

// Пометка «срез»: сведения актуальны на дату и быстро устаревают. Отдельной строкой над схемой
// или sm — внутри текста
export default defineBlock({
  tag: 'drift',
  title: 'Пометка «срез»',
  doc: 'Капсула с круговыми стрелками: сведения на дату, могут устареть; sm — в строке текста.',
  attrs: { sm: { doc: 'маленькая, внутри строки', values: [''] } },
  render: ({ attrs, children }) => `<span class="bk-drift${'sm' in attrs ? ' bk-drift-sm' : ''}">${icon('refresh')}${inline(children)}</span>`,
  example: {
    ru: '<p>Пометка <b-drift sm>срез</b-drift> — сведения на дату.</p>\n<b-drift>срез · сентябрь 2026</b-drift>',
    en: '<p>The <b-drift sm>snapshot</b-drift> tag means facts as of a date.</p>\n<b-drift>snapshot · September 2026</b-drift>',
  },
})
