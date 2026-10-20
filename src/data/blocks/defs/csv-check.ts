import { color, defineBlock, icon } from '../core'

// Сверка выгрузок для карточки <b-dir-map>: стопка файлов-выгрузок «= ✓»
export default defineBlock({
  tag: 'csv-check',
  title: 'Сверка выгрузок',
  doc: 'Цветные плашки выгрузок, знак «=» и круг с галочкой; картинка для карточки карты направлений.',
  slots: { file: { doc: 'выгрузка; внутри — короткое имя', required: true, attrs: { color: { doc: 'фон плашки', required: true } } } },
  render: ({ slots }) => `<div class="bk-chk"><div class="bk-csv">${slots.file.map((f) => `<span style="background:${color(f.attrs.color)}">${f.html}</span>`).join('')}</div>`
    + `<span class="bk-chk-eq">=</span><span class="bk-chk-ok">${icon('check-thin', '2.6')}</span></div>`,
  example: {
    ru: '<b-csv-check><file color="c-chat">CHAT</file><file color="c-work">WORK</file><file color="c-code">CODEX</file></b-csv-check>',
    en: '<b-csv-check><file color="c-chat">CHAT</file><file color="c-work">WORK</file><file color="c-code">CODEX</file></b-csv-check>',
  },
})
