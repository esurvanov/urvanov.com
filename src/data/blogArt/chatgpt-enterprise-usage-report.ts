// Схемы поста «Отчёт об использовании ChatGPT Enterprise» (маленькие значки-данные; цвет — currentColor и цвета CSS поста)
import { type Scene } from '@/lib/infographic'

const ink = { fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.8' }

const scenes: Record<string, Scene> = {
  // Три группы команд по частоте использования (точки — недели), стрелка сценариев от сильных к отстающим
  'team-groups': {
    ru: 'Команды делятся на три группы: сильные A и B, средняя C, отстающие D и E; сценарии идут от сильных к отстающим', en: 'Teams fall into three groups: strong A and B, middle C, lagging D and E; scenarios move from the strong to the lagging',
    viewBox: [0, 0, 310, 72],
    legend: false,
    cls: 'dp-v',
    style: 'color:var(--accent);max-height:120px',
    attrs: ink,
    draw: (c) => {
      const line = 'var(--line-2)'
      const groups: [number, number, string, number[]][] = [[6, 38, 'var(--d-week)', [7, 7]], [108, 24, 'var(--d-reg)', [5]], [210, 38, 'var(--d-rare)', [3, 2]]]
      for (const [x, h, col, rows] of groups) {
        c.box(x, 8, 94, h, { rx: 5, stroke: line })
        rows.forEach((n, i) => c.dotRow(x + 9, 20 + 14 * i, 10, n, col))
      }
      c.curve(53, 46, 257, 46, 'currentColor', { c1: [90, 76], c2: [216, 76], w: 1.8, cap: true })
      c.edge('M251 44l6 2-2 6', { stroke: 'currentColor' })
    },
  },
  // Общий навык: один чек-лист расходится в три команды, у каждой одинаковый результат
  'shared-skill': {
    ru: 'Общий навык: одинаковый результат в нескольких командах', en: 'A shared skill: the same result across several teams',
    viewBox: [0, 0, 150, 64],
    legend: false,
    cls: 'dp-v',
    style: 'color:var(--accent)',
    attrs: { ...ink, stroke: 'currentColor' },
    draw: (c) => {
      const o = { w: 1.8 }
      c.icon(6, 16, 'checklist', 'currentColor', o)
      c.edge('M32 32C48 32 52 11 68 11M32 32H68M32 32C48 32 52 53 68 53')
      for (const y of [0, 21, 42]) {
        c.icon(80, 6 + y, 'user', 'var(--ink-2)', o)
        c.icon(94, 6 + y, 'user', 'var(--ink-2)', o)
        c.icon(110, 2 + y, 'doc', 'currentColor', o)
      }
    },
  },
}
export default scenes
