import { defineBlock, icon } from '../core'

// Уровни требований RFC 2119: слово, значение, сила полоской и чем проверяется. s — сила (5 — обязательно,
// 3 — по умолчанию, 1 — допустимо) задаёт цвет слова и полоски. Под таблицей — синонимы плашками <syn>
const ICON: Record<string, [string, string?]> = { test: ['flask'], review: ['eye'], none: ['x', '2.6'] }

export default defineBlock({
  tag: 'rfc-levels',
  title: 'Уровни требований',
  doc: 'Строки «слово — значение — сила — проверка» (<level>) с заголовком cols и синонимами <syn> под ними.',
  attrs: { cols: { doc: 'заголовки четырёх колонок через « | »', required: true } },
  slots: {
    level: {
      doc: 'уровень; внутри — значение слова',
      required: true,
      attrs: {
        k: { doc: 'слово: MUST, SHOULD…', required: true },
        s: { doc: 'сила: 5, 3 или 1', required: true, values: ['5', '3', '1'] },
        w: { doc: 'длина полоски силы, %', required: true },
        check: { doc: 'чем проверяется: test, review, none', required: true, values: ['test', 'review', 'none'] },
        t: { doc: 'проверка словами', required: true },
        note: { doc: 'что бывает при нарушении', required: true },
      },
    },
    syn: { doc: 'синоним плашкой под таблицей: «MUST = SHALL»' },
  },
  render: ({ attrs, slots }) => {
    const head = `<div class="bk-rfc-levels-r bk-rfc-levels-th">${attrs.cols.split('|').map((c) => `<span>${c.trim()}</span>`).join('')}</div>`
    const rows = slots.level.map((s) => {
      const [name, sw] = ICON[s.attrs.check]
      return `<div class="bk-rfc-levels-r bk-rfc-levels-s${s.attrs.s}"><code class="bk-rfc-levels-k">${s.attrs.k}</code><span class="bk-rfc-levels-m">${s.html}</span><span class="bk-rfc-levels-b"><i style="width:${s.attrs.w}%"></i></span><span class="bk-rfc-levels-c">${icon(name, sw)}${s.attrs.t}<small>${s.attrs.note}</small></span></div>`
    }).join('')
    const syn = slots.syn ? `<div class="bk-rfc-levels-syn">${slots.syn.map((s) => `<span class="bk-chip">${s.html}</span>`).join('')}</div>` : ''
    return `<div class="bk-rfc-levels">${head}${rows}</div>${syn}`
  },
  example: {
    ru: '<b-rfc-levels cols="Слово | Значение | Сила | Проверка">\n  <level k="MUST" s="5" w="100" check="test" t="автотест" note="блокирует">обязательно</level>\n  <level k="SHOULD" s="3" w="60" check="review" t="ревью" note="предупреждает">по умолчанию, отступ с причиной</level>\n  <level k="MAY" s="1" w="20" check="none" t="нет" note="не проверяется">допустимо</level>\n  <syn>MUST = SHALL</syn>\n</b-rfc-levels>',
    en: '<b-rfc-levels cols="Word | Meaning | Strength | Check">\n  <level k="MUST" s="5" w="100" check="test" t="autotest" note="blocks">required</level>\n  <level k="SHOULD" s="3" w="60" check="review" t="review" note="warns">default, deviate with a reason</level>\n  <level k="MAY" s="1" w="20" check="none" t="none" note="not checked">allowed</level>\n  <syn>MUST = SHALL</syn>\n</b-rfc-levels>',
  },
})
