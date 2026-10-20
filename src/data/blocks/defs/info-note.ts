import { defineBlock, icon, inline } from '../core'

// Заметка на полях: значок акцента слева и короткий текст на светлой плашке акцента
export default defineBlock({
  tag: 'info-note',
  title: 'Заметка',
  doc: 'Плашка акцента со значком: оговорка или совет к разделу.',
  attrs: { icon: { doc: 'значок', required: true } },
  render: ({ attrs, children }) => `<div class="bk-note"><span class="bk-note-i">${icon(attrs.icon)}</span><div>${inline(children)}</div></div>`,
  example: {
    ru: '<b-info-note icon="flag-alt"><b>Важно.</b> Выберите из группы «изредка» 5–10 человек и узнайте на интервью, как они решают свои задачи.</b-info-note>',
    en: '<b-info-note icon="flag-alt"><b>Important.</b> Pick 5–10 people from the “occasional” group and learn in interviews how they solve their tasks.</b-info-note>',
  },
})
