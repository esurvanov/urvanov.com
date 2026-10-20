import { attr, defineBlock, icon, inline } from '../core'

// Группы инструментов карточками: подпись группы, плашки продуктов (две равнозначные — через значок обмена),
// мелкие подписи. Рамка карточки говорит о группе: pair — равнозначная пара, open — открытые, chat — чат
export default defineBlock({
  tag: 'tool-groups',
  title: 'Группы инструментов',
  doc: 'Карточки групп: подпись капсом, плашки продуктов, подпись снизу; две карточки в ряд.',
  attrs: { label: { doc: 'подпись для скринридера (aria-label)', required: true } },
  slots: {
    group: {
      doc: 'группа; внутри — подпись под плашками',
      required: true,
      attrs: {
        k: { doc: 'название группы капсом', required: true },
        kind: { doc: 'рамка карточки', values: ['pair', 'open', 'chat'] },
        chips: { doc: 'плашки продуктов через | (в общем ряду)' },
        chip: { doc: 'одна плашка без ряда' },
        swap: { doc: 'подпись значка обмена между двумя плашками' },
        alts: { doc: 'мелкая строка моноширинным: аналоги' },
      },
    },
  },
  render: ({ attrs, slots }) => `<div class="bk-tg" aria-label="${attr(attrs.label)}">${slots.group.map((s) => {
    const a = s.attrs
    const chip = (t: string) => `<span class="bk-tg-chip">${t.trim()}</span>`
    let chips = ''
    if (a.chips) {
      const list = a.chips.split('|').map(chip)
      const sw = a.swap ? `<span class="bk-tg-sw">${icon('swap', '1.8')}${a.swap}</span>` : ''
      chips = `<div class="bk-tg-chips">${list[0]}${sw}${list.slice(1).join('')}</div>`
    } else if (a.chip) chips = chip(a.chip)
    const alts = a.alts ? `<small class="bk-tg-alts">${a.alts}</small>` : ''
    const sub = s.html ? `<small>${inline(s.html)}</small>` : ''
    return `<div class="bk-tg-g${a.kind ? ` bk-tg-${a.kind}` : ''}"><span class="bk-tg-k">${a.k}</span>${chips}${alts}${sub}</div>`
  }).join('')}</div>`,
  example: {
    ru: '<b-tool-groups label="Группы инструментов">\n  <group k="агенты вендоров" kind="pair" chips="Claude Code|Codex" swap="почти равнозначны"></group>\n  <group k="опенсорс-харнессы" kind="open" chips="Hermes Agent" alts="и аналоги: OpenCode, Aider">Любая модель через API или локально</group>\n  <group k="ИИ-редактор кода" chip="Cursor">Модели разных вендоров</group>\n  <group k="ИИ-ассистент в браузере" kind="chat" chip="ChatGPT, Claude">Без доступа к проекту</group>\n</b-tool-groups>',
    en: '<b-tool-groups label="Tool groups">\n  <group k="vendor agents" kind="pair" chips="Claude Code|Codex" swap="nearly equivalent"></group>\n  <group k="open-source harnesses" kind="open" chips="Hermes Agent" alts="and alternatives: OpenCode, Aider">Any model via API or locally</group>\n  <group k="AI code editor" chip="Cursor">Models from several vendors</group>\n  <group k="AI assistant in the browser" kind="chat" chip="ChatGPT, Claude">No project access</group>\n</b-tool-groups>',
  },
})
