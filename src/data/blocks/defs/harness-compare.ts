import { attr, defineBlock, icon } from '../core'

// Сравнение харнессов строками: что видит (вложенные рамки: проект целиком → открытая часть → только диалог),
// что делает сам (четыре значка-действия, есть / нет), сколько моделей (точки), стоимость (значки $) и источники.
// Подписи колонок и действий — атрибутами блока; строка — продукт
const ACT_ICONS = ['edit', 'terminal', 'refresh-cw', 'package']
const HEAD_ICONS = ['eye', 'wrench', 'cpu', 'dollar', 'link']

// Рамки «что видит»: scope — сколько рамок изнутри закрашено (3 — всё, 1 — только внутренняя)
const scopeSvg = (scope: number, label: string) =>
  `<svg class="bk-cv-scope" viewBox="0 0 96 64" role="img" aria-label="${attr(label)}"><title>${label}</title>${[[4, 4, 88, 56], [18, 14, 60, 36], [32, 24, 32, 16]].map(([x, y, w, h], i) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" class="${3 - i <= scope ? 'bk-on' : 'bk-off'}"/>`).join('')}</svg>`

const usd = (n: number, sm = false, label?: string) =>
  `<span class="bk-cv-usd${sm ? ' bk-sm' : ''}"${label ? ` title="${attr(label)}" aria-label="${attr(label)}"` : ''}>${'<i class="bk-on">$</i>'.repeat(n)}</span>`

// Значки источников из HTML содержимого строки: первые n — к стоимости, остальные — в колонку источников
const splitProofs = (html: string, n: number): [string, string] => {
  const all = html.match(/<a class="bk-proof"[\s\S]*?<\/a>/g) ?? []
  return [all.slice(0, n).join(''), all.slice(n).join('')]
}

export default defineBlock({
  tag: 'harness-compare',
  title: 'Сравнение харнессов',
  doc: 'Строки-продукты: что видит, какие действия делает сам, сколько моделей, стоимость в $ и источники; легенда снизу.',
  attrs: {
    label: { doc: 'подпись для скринридера (aria-label)', required: true },
    heads: { doc: 'подписи колонок через |: видит | делает | модели | стоимость | источники', required: true },
    acts: { doc: 'четыре действия через |: правит файлы | запускает команды | цикл правка-тест | изолированная среда', required: true },
    yes: { doc: 'слово «есть» в подписи действия', required: true },
    no: { doc: 'слово «нет» в подписи действия', required: true },
    cheap: { doc: 'легенда: подпись к одному $', required: true },
    dear: { doc: 'легенда: подпись к $$$', required: true },
  },
  slots: {
    row: {
      doc: 'продукт; внутри — <b-proof>: сначала costproofs к стоимости, затем источники',
      required: true,
      attrs: {
        t: { doc: 'название', required: true },
        scope: { doc: 'что видит: 3 — кодовая база, 2 — открытый проект, 1 — только диалог', required: true, values: ['1', '2', '3'] },
        scopelabel: { doc: 'подпись «что видит»', required: true },
        acts: { doc: 'действия флагами 1/0 по порядку, например 1110', required: true },
        models: { doc: 'число точек-моделей', required: true },
        modelslabel: { doc: 'подпись моделей', required: true },
        cost: { doc: 'число значков $', required: true },
        costlabel: { doc: 'подпись стоимости', required: true },
        costproofs: { doc: 'сколько первых источников относится к стоимости', required: true },
      },
    },
  },
  render: ({ attrs, slots }) => {
    const heads = attrs.heads.split('|').map((x) => x.trim())
    const acts = attrs.acts.split('|').map((x) => x.trim())
    const head = `<div class="bk-cv-h"><span></span>${heads.map((h, i) => `<span class="bk-cv-hi" title="${attr(h)}" aria-label="${attr(h)}">${icon(HEAD_ICONS[i])}</span>`).join('')}</div>`
    const rows = slots.row.map((s) => {
      const a = s.attrs
      const [cp, src] = splitProofs(s.html, Number(a.costproofs))
      const actsHtml = acts.map((name, i) => {
        const on = a.acts[i] === '1'
        const t = `${name}: ${on ? attrs.yes : attrs.no}`
        return `<span class="bk-cv-a${on ? ' bk-on' : ''}" title="${attr(t)}" aria-label="${attr(t)}">${icon(ACT_ICONS[i])}</span>`
      }).join('')
      return `<div class="bk-cv-r"><div class="bk-cv-n">${a.t}</div><div class="bk-cv-c">${scopeSvg(Number(a.scope), a.scopelabel)}</div>`
        + `<div class="bk-cv-c bk-cv-acts">${actsHtml}</div>`
        + `<div class="bk-cv-c"><span class="bk-cv-v" title="${attr(a.modelslabel)}" aria-label="${attr(a.modelslabel)}">${'<i></i>'.repeat(Number(a.models))}</span></div>`
        + `<div class="bk-cv-c bk-cv-cost">${usd(Number(a.cost), false, a.costlabel)}<span class="bk-cv-cp">${cp}</span></div>`
        + `<div class="bk-cv-c bk-cv-p">${src}</div></div>`
    }).join('')
    const leg = `<div class="bk-cv-leg"><span class="bk-cv-li">${usd(1, true)}<small>${attrs.cheap}</small>${usd(3, true)}<small>${attrs.dear}</small></span>${acts.map((name, i) =>
      `<span class="bk-cv-li"><span class="bk-cv-a bk-on">${icon(ACT_ICONS[i])}</span><small>${name}</small></span>`).join('')}</div>`
    return `<div class="bk-cv" aria-label="${attr(attrs.label)}">${head}${rows}${leg}</div>`
  },
  example: {
    ru: '<b-harness-compare label="Что видит · Что делает сам · Модели" heads="Что видит|Что делает сам|Модели|Стоимость|Источники" acts="Правит файлы проекта|Запускает команды на вашем компьютере|Самостоятельно проходит цикл «правка → тест → правка»|Работает в изолированной среде" yes="есть" no="нет" cheap="дешевле" dear="дороже">\n  <row t="Cursor" scope="2" scopelabel="Открытый проект" acts="1100" models="4" modelslabel="Модели 4 вендоров" cost="2" costlabel="от $20/мес." costproofs="1"><b-proof href="https://example.com/" quote="Цены — example.com"></b-proof><b-proof href="https://example.com/" quote="Документация — example.com"></b-proof></row>\n</b-harness-compare>',
    en: '<b-harness-compare label="What it sees · What it does on its own · Models" heads="What it sees|What it does on its own|Models|Cost|Sources" acts="Edits project files|Runs commands on your computer|Runs the “edit → test → edit” loop on its own|Works in an isolated environment" yes="yes" no="no" cheap="cheaper" dear="pricier">\n  <row t="Cursor" scope="2" scopelabel="Open project" acts="1100" models="4" modelslabel="Models from 4 vendors" cost="2" costlabel="from $20/mo." costproofs="1"><b-proof href="https://example.com/" quote="Pricing — example.com"></b-proof><b-proof href="https://example.com/" quote="Docs — example.com"></b-proof></row>\n</b-harness-compare>',
  },
})
