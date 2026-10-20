import { attr, defineBlock } from '../core'

// Переключатель двух видов одного раздела («Просто / Подробно») без скрипта: две радиокнопки и соседние блоки.
// Внутри вида — любые блоки (дорожки, пояснения). id — имя группы радиокнопок, уникальное на странице
export default defineBlock({
  tag: 'view-switch',
  title: 'Два вида',
  doc: 'Переключатель двух видов раздела без скрипта: вкладки-пилюли и два блока под ними.',
  attrs: { id: { doc: 'имя группы радиокнопок, уникальное на странице', required: true } },
  slots: { view: { doc: 'вид (ровно два); внутри — блоки', required: true, attrs: { label: { doc: 'подпись вкладки', required: true } } } },
  render: ({ attrs, slots }) => {
    if (slots.view.length !== 2) throw new Error(`blocks: <b-view-switch id="${attrs.id}"> — нужно ровно два <view>`)
    const id = attr(attrs.id), [a, b] = slots.view
    return `<div class="bk-vs"><input type="radio" class="bk-vs-a" name="${id}" id="${id}-a" checked><input type="radio" class="bk-vs-b" name="${id}" id="${id}-b">`
      + `<div class="bk-vs-tabs" role="group"><label class="bk-vs-la" for="${id}-a">${a.attrs.label}</label><label class="bk-vs-lb" for="${id}-b">${b.attrs.label}</label></div>`
      + `<div class="bk-vs-va">${a.html}</div><div class="bk-vs-vb">${b.html}</div></div>`
  },
  example: {
    ru: '<b-view-switch id="vt-demo">\n  <view label="Просто"><b-why>Короткое объяснение.</b-why></view>\n  <view label="Подробно"><b-why>Подробное объяснение со схемами.</b-why></view>\n</b-view-switch>',
    en: '<b-view-switch id="vt-demo">\n  <view label="Simple"><b-why>A short explanation.</b-why></view>\n  <view label="Detailed"><b-why>A detailed explanation with diagrams.</b-why></view>\n</b-view-switch>',
  },
})
