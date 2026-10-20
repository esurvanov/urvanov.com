import { defineBlock, icon, inline, topStyle } from '../core'

// Дорожка «один человек — несколько агентов»: плашки агентов по задачам, плашка-итог и подпись под ними
export default defineBlock({
  tag: 'agents-lane',
  title: 'Несколько агентов',
  doc: 'Дорожка с плашками агентов (значок бота), выделенной плашкой-итогом и подписью.',
  attrs: {
    title: { doc: 'заголовок капсом', required: true },
    agents: { doc: 'подписи плашек агентов через |', required: true },
    note: { doc: 'плашка-итог после агентов' },
    top: { doc: 'отступ сверху в px' },
  },
  render: ({ attrs, children }) => {
    const chips = attrs.agents.split('|').map((a) => `<span class="bk-agents-lane-chip">${icon('bot')}${a.trim()}</span>`).join('')
    const note = attrs.note ? `<span class="bk-agents-lane-note">${attrs.note}</span>` : ''
    const cap = children.trim() ? `<p class="bk-agents-lane-cap">${inline(children)}</p>` : ''
    return `<div class="bk-lane"${topStyle(attrs.top)}><div class="bk-lane-h" style="color:var(--accent)"><span class="bk-lane-dot" style="background:var(--accent)"></span>${attrs.title}</div><div class="bk-agents-lane">${chips}${note}</div>${cap}</div>`
  },
  example: {
    ru: '<b-agents-lane title="Один QA — несколько агентов сразу" agents="агент · PAY-142|агент · PAY-143" note="QA принимает">Каждый агент берёт свой баг.</b-agents-lane>',
    en: '<b-agents-lane title="One QA — several agents at once" agents="agent · PAY-142|agent · PAY-143" note="QA accepts">Each agent takes its own bug.</b-agents-lane>',
  },
})
