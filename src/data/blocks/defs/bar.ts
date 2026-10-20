import { color, defineBlock } from '../core'

// Тонкая полоска-процент в ячейке таблицы: «регулярно пользуются 74%»
export default defineBlock({
  tag: 'bar',
  title: 'Полоска-процент',
  doc: 'Тонкая полоска заполнения, обычно в ячейке таблицы.',
  attrs: { value: { doc: 'процент заполнения, 0–100', required: true }, color: { doc: 'цвет заполнения (по умолчанию c-chat)' } },
  render: ({ attrs }) => {
    const v = Number(attrs.value)
    if (!(v >= 0 && v <= 100)) throw new Error(`blocks: <b-bar value="${attrs.value}"> — нужен процент от 0 до 100`)
    return `<div class="bk-dbar"><span style="width:${attrs.value}%${attrs.color ? `;background:${color(attrs.color)}` : ''}"></span></div>`
  },
  example: { ru: '<b-bar value="74"></b-bar>', en: '<b-bar value="74"></b-bar>' },
})
