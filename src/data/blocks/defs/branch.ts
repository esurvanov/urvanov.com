import { defineBlock, icon, inline } from '../core'

// Ветка сценария «если…, то…»: круглый значок акцента, условие жирным и что делать
export default defineBlock({
  tag: 'branch',
  title: 'Ветка «если…»',
  doc: 'Плашка акцентного цвета: условие и что делать в этом случае.',
  attrs: { icon: { doc: 'значок в кружке', required: true }, t: { doc: 'условие', required: true } },
  render: ({ attrs, children }) => `<div class="bk-branch"><span class="bk-branch-bi">${icon(attrs.icon)}</span><div><b>${attrs.t}</b><span>${inline(children)}</span></div></div>`,
  example: {
    ru: '<b-branch icon="git-branch" t="Если человек не упоминает AI">Не спрашивать, почему он им не пользуется. Спросить, как он решил задачу</b-branch>',
    en: '<b-branch icon="git-branch" t="If the person does not mention AI">Do not ask why they do not use it. Ask how they solved the task</b-branch>',
  },
})
