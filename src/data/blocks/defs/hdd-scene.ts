import { attr, defineBlock } from '../core'

// Схема <iso-art> поста HDD в своей рамке: loop — карточка с прокруткой вбок (петля «ошибка → правило»),
// fig — схема без рамки с отступом сверху (одна ошибка и три уровня исправления). Цвета схем — в hdd-scene.css
export default defineBlock({
  tag: 'hdd-scene',
  title: 'Схема HDD',
  doc: 'Схема <iso-art> в рамке серии hdd: loop — карточка, fig — без рамки; обе прокручиваются вбок на телефоне.',
  attrs: {
    name: { doc: 'имя сцены «пост/ключ»', required: true },
    frame: { doc: 'рамка: loop — карточка, fig — без рамки', required: true, values: ['loop', 'fig'] },
  },
  render: ({ attrs }) => {
    const art = `<iso-art name="${attr(attrs.name)}"></iso-art>`
    return attrs.frame === 'loop' ? `<div class="bk-hdd-scene">${art}</div>` : `<figure class="bk-hdd-scene-hfig"><div class="bk-hdd-scene-hsc">${art}</div></figure>`
  },
  example: {
    ru: '<b-hdd-scene name="harness-driven-development/loop" frame="loop"></b-hdd-scene>',
    en: '<b-hdd-scene name="harness-driven-development/loop" frame="loop"></b-hdd-scene>',
  },
})
