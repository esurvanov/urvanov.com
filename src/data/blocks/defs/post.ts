import { defineBlock, flowBody } from '../core'

// Обёртка всего поста: общие стили блоков (.bk) и токены серии. s-rich оставлен ради токенов цвета
// и схем <iso-art>, а класс серии bk-<серия> — место для её акцента (см. ../base.css)
export default defineBlock({
  tag: 'post',
  title: 'Пост',
  doc: 'Обёртка всего текста поста: одна на пост, всё остальное внутри.',
  attrs: { series: { doc: 'серия постов: задаёт акцент (prompts, harness, hdd, rec, agg, intervyu, kto, gruppy)', required: true } },
  flow: true,
  render: ({ attrs, children }) => `<div class="s-rich bk bk-post-${attrs.series}">${flowBody(children)}</div>`,
  example: {
    ru: '<b-post series="prompts"><b-why>Весь текст поста — внутри одной обёртки.</b-why></b-post>',
    en: '<b-post series="prompts"><b-why>The whole post text sits inside one wrapper.</b-why></b-post>',
  },
})
