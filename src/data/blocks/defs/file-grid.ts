import { defineBlock, icon } from '../core'

// Набор файлов плиткой по три: значок файла, имя кодом, что в нём
export default defineBlock({
  tag: 'file-grid',
  title: 'Файлы',
  doc: 'Файлы <file> плиткой по три в ряд: имя и что в нём.',
  slots: { file: { doc: 'файл; внутри — что в нём', required: true, attrs: { name: { doc: 'имя файла', required: true } } } },
  render: ({ slots }) => `<div class="bk-file-grid">${slots.file.map((s) => `<div class="bk-file-grid-fl">${icon('file')}<code>${s.attrs.name}</code><small>${s.html}</small></div>`).join('')}</div>`,
  example: {
    ru: '<b-file-grid>\n  <file name="projectbrief.md">цели и требования</file>\n  <file name="techContext.md">стек и ограничения</file>\n  <file name="progress.md">что готово, что осталось</file>\n</b-file-grid>',
    en: '<b-file-grid>\n  <file name="projectbrief.md">goals and requirements</file>\n  <file name="techContext.md">stack and constraints</file>\n  <file name="progress.md">what is done, what is left</file>\n</b-file-grid>',
  },
})
