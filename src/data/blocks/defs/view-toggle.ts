import { attr, defineBlock } from '../core'

// Переключатель двух видов одного раздела («Просто / Подробно») без скрипта: две радиокнопки и соседние блоки.
// Внутри вида — любые блоки (дорожки, пояснения). id — имя группы радиокнопок, уникальное на странице
export default defineBlock({
  tag: 'view-toggle',
  title: 'Два вида',
  doc: 'Переключатель двух видов раздела без скрипта: вкладки-пилюли и два блока под ними.',
  attrs: { id: { doc: 'имя группы радиокнопок, уникальное на странице', required: true } },
  slots: { view: { doc: 'вид (ровно два); внутри — блоки', required: true, attrs: { label: { doc: 'подпись вкладки', required: true } } } },
  render: ({ attrs, slots }) => {
    if (slots.view.length !== 2) throw new Error(`blocks: <b-view-toggle id="${attrs.id}"> — нужно ровно два <view>`)
    const id = attr(attrs.id), [a, b] = slots.view
    return `<div class="bk-vt"><input type="radio" class="bk-vt-a" name="${id}" id="${id}-a" checked><input type="radio" class="bk-vt-b" name="${id}" id="${id}-b">`
      + `<div class="bk-vt-tabs" role="group"><label class="bk-vt-la" for="${id}-a">${a.attrs.label}</label><label class="bk-vt-lb" for="${id}-b">${b.attrs.label}</label></div>`
      + `<div class="bk-vt-va">${a.html}</div><div class="bk-vt-vb">${b.html}</div></div>`
  },
  example: {
    ru: '<b-view-toggle id="vt-demo">\n  <view label="Просто"><b-why>Короткое объяснение.</b-why></view>\n  <view label="Подробно"><b-why>Подробное объяснение со схемами.</b-why></view>\n</b-view-toggle>',
    en: '<b-view-toggle id="vt-demo">\n  <view label="Simple"><b-why>A short explanation.</b-why></view>\n  <view label="Detailed"><b-why>A detailed explanation with diagrams.</b-why></view>\n</b-view-toggle>',
  },
})
