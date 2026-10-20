import { defineBlock, inline } from '../core'

// Вводный абзац в начале поста или главы: крупнее обычного текста, без выключки
export default defineBlock({
  tag: 'lead',
  title: 'Вводный абзац',
  doc: 'Вводный абзац: о чём пост и что в нём будет.',
  attrs: { tight: { doc: 'отступы как у обычного абзаца: снизу .8em вместо 22px', values: [''] } },
  render: ({ attrs, children }) => `<p class="bk-lead${'tight' in attrs ? ' bk-tight' : ''}">${inline(children)}</p>`,
  example: {
    ru: '<b-lead>Отчёт строится из пяти выгрузок консоли и показывает, кто и как пользуется инструментом. Ниже — <a href="#demo-chapter">как его собрать</a>.</b-lead>',
    en: '<b-lead>The report is built from five console exports and shows who uses the tool and how. Below is <a href="#demo-chapter">how to build it</a>.</b-lead>',
  },
})
