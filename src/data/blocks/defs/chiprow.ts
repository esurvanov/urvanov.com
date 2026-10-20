import { defineBlock, inline, topStyle } from '../core'

// Ряд крупных плашек с обводкой: признаки, шаги пути. Плашку можно вычеркнуть (del) или обвести акцентом (on).
// По умолчанию ряд по центру, start — от левого края; на телефоне плашки столбиком.
// Текст внутри метки помимо плашек — подпись под рядом
export default defineBlock({
  tag: 'chiprow',
  title: 'Ряд крупных плашек',
  doc: 'Плашки с обводкой в ряд с переносом; del — вычеркнутая, on — обведённая акцентом; текст вне плашек — подпись под рядом.',
  attrs: {
    start: { doc: 'ряд от левого края, а не по центру', values: [''] },
    top: { doc: 'отступ сверху в px' },
  },
  slots: { chip: { doc: 'плашка; внутри — текст', required: true, attrs: { kind: { doc: 'вид плашки', values: ['del', 'on'] } } } },
  render: ({ attrs, slots, children }) => {
    const row = `<div class="bk-cr${'start' in attrs ? ' bk-cr-start' : ''}"${topStyle(attrs.top)}>${slots.chip.map((s) =>
      `<span class="bk-cr-chip${s.attrs.kind ? ` bk-cr-${s.attrs.kind}` : ''}">${s.html}</span>`).join('')}</div>`
    return row + (children.trim() ? `<p class="bk-cr-cap">${inline(children)}</p>` : '')
  },
  example: {
    ru: '<b-chiprow start>\n  <chip kind="del">вход</chip>\n  <chip kind="del">каталог</chip>\n  <chip kind="on">корзина</chip>\n  <chip kind="on">промокод</chip>\n  <chip>оплата</chip>\n  Вычеркнуто то, без чего баг всё равно воспроизводится.\n</b-chiprow>',
    en: '<b-chiprow start>\n  <chip kind="del">sign-in</chip>\n  <chip kind="del">catalogue</chip>\n  <chip kind="on">cart</chip>\n  <chip kind="on">promo code</chip>\n  <chip>payment</chip>\n  Struck out: the bug still reproduces without these.\n</b-chiprow>',
  },
})
