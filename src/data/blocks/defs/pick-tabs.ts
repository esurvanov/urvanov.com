import { attr, defineBlock, inline } from '../core'

// Переключатель карточек под схемой без скрипта: номер-вкладка → карточка из трёх колонок <b-pick-cell>.
// Внутри <b-lane> рядом со схемой: части схемы с классами bk bk1…bk8 (../../blogArt) приглушаются, кроме выбранной.
// tone: warn — проблемы (номера и выбранная вкладка оранжевые), accent — шаги и варианты
export default [
  defineBlock({
    tag: 'pick-tabs',
    title: 'Вкладки под схемой',
    doc: 'Номера-вкладки под схемой, под ними карточка выбранного пункта; внутри <b-lane> подсвечивает часть схемы.',
    attrs: {
      id: { doc: 'имя группы радиокнопок, уникальное на странице (вкладки — id1, id2…)', required: true },
      tone: { doc: 'warn — проблемы, accent — шаги', required: true, values: ['warn', 'accent'] },
    },
    slots: { tab: { doc: 'пункт; внутри — колонки <b-pick-cell>', required: true, attrs: { t: { doc: 'подпись вкладки', required: true } } } },
    render: ({ attrs, slots }) => {
      if (slots.tab.length > 8) throw new Error(`blocks: <b-pick-tabs id="${attrs.id}"> — не больше 8 вкладок`)
      const id = attr(attrs.id)
      return `<div class="bk-pick-tabs${attrs.tone === 'accent' ? ' bk-pick-tabs-a' : ''}">`
        + slots.tab.map((_, i) => `<input type="radio" name="${id}" id="${id}${i + 1}"${i ? '' : ' checked'}>`).join('')
        + `<div class="bk-pick-tabs-row">${slots.tab.map((s, i) => `<label for="${id}${i + 1}"><i>${i + 1}</i>${s.attrs.t}</label>`).join('')}</div>`
        + slots.tab.map((s, i) => `<div class="bk-pick-tabs-p bk-pick-tabs-p${i + 1}">${s.html}</div>`).join('')
        + '</div>'
    },
    example: {
      ru: '<b-pick-tabs id="pk-demo" tone="warn">\n  <tab t="Не знает 1С">\n    <b-pick-cell k="Особенность" t="Модели плохо знают язык 1С"/>\n    <b-pick-cell k="Что ломается" tone="warn">выдуманные методы</b-pick-cell>\n    <b-pick-cell k="Что помогает" tone="accent">справка платформы через MCP</b-pick-cell>\n  </tab>\n  <tab t="Файлы ≠ база">\n    <b-pick-cell k="Особенность" t="Служебные файлы нельзя править как текст"/>\n    <b-pick-cell k="Что ломается" tone="warn">проект расходится с базой</b-pick-cell>\n    <b-pick-cell k="Что помогает" tone="accent">правки только через MCP-сервер</b-pick-cell>\n  </tab>\n</b-pick-tabs>',
      en: '<b-pick-tabs id="pk-demo" tone="warn">\n  <tab t="Does not know 1C">\n    <b-pick-cell k="Trait" t="Models know the 1C language poorly"/>\n    <b-pick-cell k="What breaks" tone="warn">made-up methods</b-pick-cell>\n    <b-pick-cell k="What helps" tone="accent">platform help via MCP</b-pick-cell>\n  </tab>\n  <tab t="Files ≠ base">\n    <b-pick-cell k="Trait" t="Service files cannot be edited as text"/>\n    <b-pick-cell k="What breaks" tone="warn">the project drifts from the base</b-pick-cell>\n    <b-pick-cell k="What helps" tone="accent">edits only via the MCP server</b-pick-cell>\n  </tab>\n</b-pick-tabs>',
    },
  }),
  defineBlock({
    tag: 'pick-cell',
    title: 'Колонка карточки вкладки',
    doc: 'Колонка карточки в <b-pick-tabs>: подпись капсом, жирное название и/или текст.',
    attrs: {
      k: { doc: 'подпись капсом', required: true },
      tone: { doc: 'цвет подписи: warn или accent (по умолчанию серая)', values: ['warn', 'accent'] },
      t: { doc: 'жирное название под подписью' },
    },
    render: ({ attrs, children }) => {
      const k = `<span class="bk-pick-tabs-k${attrs.tone ? ` bk-pick-tabs-k-${attrs.tone === 'warn' ? 'w' : 'a'}` : ''}">${attrs.k}</span>`
      const d = children.trim() ? `<span>${inline(children)}</span>` : ''
      return `<div>${k}${attrs.t ? `<b>${attrs.t}</b>` : ''}${d}</div>`
    },
    example: {
      ru: '<b-pick-cell k="Что помогает" tone="accent">справка платформы через MCP</b-pick-cell>',
      en: '<b-pick-cell k="What helps" tone="accent">platform help via MCP</b-pick-cell>',
    },
  }),
]
