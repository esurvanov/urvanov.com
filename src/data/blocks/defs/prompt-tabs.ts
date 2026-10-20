import { attr, defineBlock, icon } from '../core'

// Вкладки с примерами без скриптов: радиокнопки, ряд подписей-вкладок и панели <b-prompt-tab>, видна панель
// выбранной вкладки (CSS :checked ~). Подписи вкладок берутся из атрибутов панелей: панель отдаёт их меткой
// data-bk-tab, а вкладки собирают их и убирают метку из HTML
const TAB = /<div class="bk-tp" id="([^"]*)" data-bk-tab="([^"]*)" data-bk-label="([^"]*)">/g

const tabs = defineBlock({
  tag: 'prompt-tabs',
  title: 'Вкладки с примерами',
  doc: 'Переключатель панелей <b-prompt-tab> (до 8) без скриптов; первая открыта.',
  attrs: { name: { doc: 'имя группы радиокнопок, уникальное на странице: ex-ru', required: true } },
  render: ({ attrs, children }) => {
    const list = [...children.matchAll(TAB)].map((m) => ({ id: m[1], icon: m[2], label: m[3] }))
    if (!list.length) throw new Error('blocks: в <b-prompt-tabs> нет ни одной <b-prompt-tab>')
    const n = attrs.name
    const inputs = list.map((t, i) => `<input type="radio" name="${attr(n)}" id="${attr(`${n}-${t.id}`)}"${i ? '' : ' checked'}>`).join('')
    const nav = `<nav class="bk-tb">${list.map((t) => `<label for="${attr(`${n}-${t.id}`)}"><span class="bk-tb-i" aria-hidden="true">${icon(t.icon, '1.8')}</span>${t.label}</label>`).join('')}</nav>`
    return `<div class="bk-tabs">${inputs}${nav}${children.trim().replace(TAB, '<div class="bk-tp" id="$1">')}</div>`
  },
  example: {
    ru: '<b-prompt-tabs name="demo-tabs-ru">\n  <b-prompt-tab id="demo-one" icon="chat" label="Ответ клиенту" title="Ответ клиенту по переписке">\n    <b-why>Первая вкладка открыта сразу.</b-why>\n  </b-prompt-tab>\n  <b-prompt-tab id="demo-two" icon="calendar" label="Подготовка к встрече" title="Подготовка к встрече">\n    <b-why>Вторая — по щелчку.</b-why>\n  </b-prompt-tab>\n</b-prompt-tabs>',
    en: '<b-prompt-tabs name="demo-tabs-en">\n  <b-prompt-tab id="demo-one" icon="chat" label="Customer reply" title="Reply to a customer thread">\n    <b-why>The first tab is open right away.</b-why>\n  </b-prompt-tab>\n  <b-prompt-tab id="demo-two" icon="calendar" label="Meeting prep" title="Meeting prep">\n    <b-why>The second opens on click.</b-why>\n  </b-prompt-tab>\n</b-prompt-tabs>',
  },
})

const tab = defineBlock({
  tag: 'prompt-tab',
  title: 'Панель вкладки',
  doc: 'Панель внутри <b-prompt-tabs>: заголовок h3 и любые блоки.',
  attrs: {
    id: { doc: 'якорь панели', required: true },
    icon: { doc: 'значок на вкладке', required: true },
    label: { doc: 'подпись вкладки', required: true },
    title: { doc: 'заголовок панели', required: true },
  },
  render: ({ attrs, children }) =>
    `<div class="bk-tp" id="${attr(attrs.id)}" data-bk-tab="${attr(attrs.icon)}" data-bk-label="${attr(attrs.label)}"><h3 class="bk-tp-h">${attrs.title}</h3>${children.trim()}</div>`,
  example: {
    ru: '<b-prompt-tabs name="demo-tab-ru">\n  <b-prompt-tab id="demo-tab" icon="search" label="Исследование" title="Исследование темы">\n    <b-why>Панель — заголовок и любые блоки.</b-why>\n  </b-prompt-tab>\n</b-prompt-tabs>',
    en: '<b-prompt-tabs name="demo-tab-en">\n  <b-prompt-tab id="demo-tab" icon="search" label="Research" title="Researching a topic">\n    <b-why>A panel is a heading and any blocks.</b-why>\n  </b-prompt-tab>\n</b-prompt-tabs>',
  },
})

export default [tabs, tab]
