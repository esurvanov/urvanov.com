import { defineBlock, icon } from '../core'

// Переключатель вида всего поста: «Иллюстрация» (схемы) или «Структура» (те же сведения карточками).
// Без скрипта: две радиокнопки и :has() на обёртке поста прячут ненужные панели <b-view>. Ставится один раз,
// первым в посте, и прилипает к верху экрана при прокрутке
export default defineBlock({
  tag: 'view-toggle',
  title: 'Переключатель вида',
  doc: 'Кнопки «Иллюстрация / Структура» для всего поста; панели — <b-view kind="pic|struct">.',
  render: ({ lang, l }) => {
    const id = `vt-${lang}`
    return `<div class="bk-vt"><input class="bk-vt-ic" type="radio" name="${id}" id="${id}-c" checked><input class="bk-vt-is" type="radio" name="${id}" id="${id}-s"><div class="bk-vt-b"><label class="bk-vt-lc" for="${id}-c">${icon('sparkle-sm')}${l('Иллюстрация', 'Illustration')}</label><label class="bk-vt-ls" for="${id}-s">${icon('grid')}${l('Структура', 'Structure')}</label></div></div>`
  },
  example: {
    ru: '<b-view-toggle></b-view-toggle>\n<b-view kind="pic"><b-why>Панель «Иллюстрация»: здесь схема.</b-why></b-view>\n<b-view kind="struct"><b-why>Панель «Структура»: те же сведения карточками.</b-why></b-view>',
    en: '<b-view-toggle></b-view-toggle>\n<b-view kind="pic"><b-why>The “Illustration” panel: a diagram goes here.</b-why></b-view>\n<b-view kind="struct"><b-why>The “Structure” panel: the same facts as cards.</b-why></b-view>',
  },
})
