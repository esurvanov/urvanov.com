import { attr, color, defineBlock, icon } from '../core'

// Цепочка этапов отбора (серия gruppy): карточка с картинкой-подсчётом и крупным числом, между карточками стрелки.
// Картинка — одна из трёх: поле точек с отмеченными (dots + on), цветные значки (icons) или цветные кружки (circles)
const list = (s?: string) => (s ?? '').trim().split(/\s+/).filter(Boolean)

export default defineBlock({
  tag: 'gruppy-chain',
  title: 'Цепочка отбора',
  doc: 'Этапы «сколько было → сколько осталось»: картинка-подсчёт, число и подпись; на телефоне — столбиком.',
  attrs: { label: { doc: 'подпись для скринридера (aria-label)', required: true } },
  slots: {
    stage: {
      doc: 'этап; картинка — одно из dots, icons, circles',
      required: true,
      attrs: {
        n: { doc: 'крупное число', required: true },
        t: { doc: 'подпись под числом', required: true },
        dots: { doc: 'сколько точек в поле' },
        on: { doc: 'отмеченные точки: «номер:цвет» через пробел, номер с нуля' },
        icons: { doc: 'значки на цветных плашках: «значок:цвет» через пробел' },
        circles: { doc: 'цвета кружков через пробел' },
      },
    },
  },
  render: ({ attrs, slots }) => {
    const viz = (a: Record<string, string>) => {
      if (a.dots) {
        const on = new Map(list(a.on).map((x) => { const [i, c] = x.split(':'); return [Number(i), c] as const }))
        return `<div class="bk-gch-dots" aria-hidden="true">${Array.from({ length: Number(a.dots) }, (_, i) =>
          on.has(i) ? `<i class="bk-on" style="background:${color(on.get(i)!)}"></i>` : '<i></i>').join('')}</div>`
      }
      if (a.icons) return `<div class="bk-gch-icons" aria-hidden="true">${list(a.icons).map((x) => { const [n, c] = x.split(':'); return `<i style="background:${color(c)}">${icon(n, '2.2')}</i>` }).join('')}</div>`
      return `<div class="bk-gch-circles" aria-hidden="true">${list(a.circles).map((c) => `<i style="background:${color(c)}"></i>`).join('')}</div>`
    }
    return `<div class="bk-gch" aria-label="${attr(attrs.label)}">${slots.stage.map((s) =>
      `<div class="bk-gch-st"><div class="bk-gch-viz">${viz(s.attrs)}</div><div class="bk-gch-big">${s.attrs.n}<small>${s.attrs.t}</small></div></div>`)
      .join(`<div class="bk-gch-arr" aria-hidden="true">${icon('arrow-right')}</div>`)}</div>`
  },
  example: {
    ru: '<b-gruppy-chain label="От отчёта к списку интервью">\n  <stage n="120" t="Человек в отчёте" dots="120" on="5:c-code 40:c-work 77:c-chat 101:c-none"/>\n  <stage n="4" t="Группы" icons="code-alt:c-code zap-alt:c-work search-alt:c-chat slash:c-none"/>\n  <stage n="8" t="Интервью" circles="c-code c-code c-work c-work c-chat c-chat c-none c-none"/>\n</b-gruppy-chain>',
    en: '<b-gruppy-chain label="From the report to the interview list">\n  <stage n="120" t="People in the report" dots="120" on="5:c-code 40:c-work 77:c-chat 101:c-none"/>\n  <stage n="4" t="Groups" icons="code-alt:c-code zap-alt:c-work search-alt:c-chat slash:c-none"/>\n  <stage n="8" t="Interviews" circles="c-code c-code c-work c-work c-chat c-chat c-none c-none"/>\n</b-gruppy-chain>',
  },
})
