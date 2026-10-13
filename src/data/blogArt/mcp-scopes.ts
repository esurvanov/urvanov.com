// Схемы поста «Области MCP: local, project, user»
import { type Scene, A, M, W } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Три области: local (вы и проект), project (команда), user (вы и все проекты)
  scopes: {
    ru: 'Три области: local — вы и один проект, project — вся команда через репозиторий, user — вы и все ваши проекты', en: 'Three scopes: local is you and one project, project is the whole team through the repo, user is you and all your projects',
    viewBox: [0, 0, 700, 240],
    draw: (c, l) => {
      const i1 = c.iso(130, 128, 26)
      i1.tile(-1.8, -1.8, 3.6, 3.6)
      i1.box(0.1, -0.9, 0, 1, 1, 0.8, M)
      i1.person(-0.6, 0.5, M, '')
      const i2 = c.iso(350, 128, 26)
      i2.tile(-1.8, -1.8, 3.6, 3.6)
      i2.box(-0.5, -1.1, 0, 1, 1, 0.8, M)
      i2.person(-1.2, 0.7, M, '')
      i2.doc(0.8, -1, 0, 0.8, 0.7, A, 2, true)
      i2.person(-0.4, 0.7, M, '')
      i2.person(0.4, 0.7, M, '')
      const i3 = c.iso(570, 128, 26)
      i3.tile(-1.8, -1.8, 3.6, 3.6)
      i3.box(-0.5, -1, 0, 0.6, 0.6, 0.6, M)
      i3.person(-1.2, 0.6, M, '')
      i3.box(0.3, -1, 0, 0.6, 0.6, 0.6, M)
      i3.box(1.1, -1, 0, 0.6, 0.6, 0.6, M)
      c.text(130, 204, 'Local', A, { size: 12, w: 700 })
      c.text(130, 219, l('вы · этот проект', 'you · this project'), M)
      c.text(350, 204, 'Project', A, { size: 12, w: 700 })
      c.text(350, 219, l('вся команда', 'the whole team'), M)
      c.text(570, 204, 'User', A, { size: 12, w: 700 })
      c.text(570, 219, l('вы · все проекты', 'you · all projects'), M)
    },
  },
  // Что класть в какую область: те же три островка с подписями
  'what-where': {
    ru: 'Local: личные и пробные серверы, серверы с личными ключами; Project: общие инструменты команды; User: личные утилиты для всех проектов', en: 'Local: personal and trial servers, servers with private keys; Project: shared team tools; User: personal utilities for all projects',
    viewBox: [0, 0, 700, 240],
    draw: (c, l) => {
      const i1 = c.iso(130, 128, 26)
      i1.tile(-1.8, -1.8, 3.6, 3.6)
      i1.box(0.1, -0.9, 0, 1, 1, 0.8, M)
      i1.person(-0.6, 0.5, M, '')
      const i2 = c.iso(350, 128, 26)
      i2.tile(-1.8, -1.8, 3.6, 3.6)
      i2.box(-0.5, -1.1, 0, 1, 1, 0.8, M)
      i2.person(-1.2, 0.7, M, '')
      i2.doc(0.8, -1, 0, 0.8, 0.7, A, 2, true)
      i2.person(-0.4, 0.7, M, '')
      i2.person(0.4, 0.7, M, '')
      const i3 = c.iso(570, 128, 26)
      i3.tile(-1.8, -1.8, 3.6, 3.6)
      i3.box(-0.5, -1, 0, 0.6, 0.6, 0.6, M)
      i3.person(-1.2, 0.6, M, '')
      i3.box(0.3, -1, 0, 0.6, 0.6, 0.6, M)
      i3.box(1.1, -1, 0, 0.6, 0.6, 0.6, M)
      c.text(130, 204, 'Local', A, { size: 12, w: 700 })
      c.text(130, 219, l('личные и пробные серверы, серверы с личными ключами', 'personal and trial servers, servers with private keys'), M)
      c.text(350, 204, 'Project', A, { size: 12, w: 700 })
      c.text(350, 219, l('общие инструменты команды', 'shared team tools'), M)
      c.text(570, 204, 'User', A, { size: 12, w: 700 })
      c.text(570, 219, l('личные утилиты для всех проектов', 'personal utilities for all projects'), M)
    },
  },
  // В .mcp.json имена переменных, а ключи у каждого свои
  'env-keys': {
    ru: 'В файле .mcp.json лежат имена переменных, а настоящий ключ у каждого разработчика свой', en: 'The .mcp.json file holds variable names, and every developer has their own real key',
    viewBox: [0, 0, 700, 240],
    draw: (c, l) => {
      const i1 = c.iso(140, 130, 26)
      i1.tile(-1.7, -1.7, 3.4, 3.4)
      i1.panel(-1.1, -0.4, 2.2, 1.8, A, undefined, 2)
      const i2 = c.iso(450, 130, 26)
      i2.tile(-2.2, -2.2, 4.4, 4.4)
      i2.person(-1.5, 0.5, M, '')
      i2.person(-0.1, 0.5, M, '')
      i2.person(1.3, 0.5, M, '')
      c.text(145.4, 64.1, '.mcp.json', A, { size: 10, w: 700 })
      c.arrow(220, 134, 330, 134, A)
      c.key(392.968, 102, W); c.key(424.4904, 120.2, W); c.key(456.0128, 138.4, W)
      c.text(140, 204, l('в файле', 'in the file'), A, { size: 12, w: 700 })
      c.text(140, 219, '${API_KEY}', M)
      c.text(450, 204, l('у каждого свой ключ', 'everyone has their own key'), A, { size: 12, w: 700 })
      c.text(450, 219, l('в переменной окружения', 'in an environment variable'), M)
    },
  },
  // Три шага наведения порядка: список, общее в project, ключи в переменные
  steps: {
    ru: 'Три шага: посмотреть, где что лежит, перенести общий сервер в project, вынести ключи в переменные', en: 'Three steps: see what lives where, move the shared server to project, move keys into variables',
    viewBox: [0, 0, 700, 238],
    draw: (c, l) => {
      const i1 = c.iso(130, 122, 26)
      i1.tile(-1.5, -1.5, 3, 3)
      i1.panel(-1.1, -0.5, 2.2, 1.8, A, undefined, 2)
      const i2 = c.iso(350, 122, 26)
      i2.tile(-1.5, -1.5, 3, 3)
      i2.doc(-0.9, -0.6, 0, 1.8, 1.3, A, 3, true)
      const i3 = c.iso(570, 122, 26)
      i3.tile(-1.5, -1.5, 3, 3)
      i3.person(0, 0.3, M, '')
      c.text(137.7, 54.8, 'claude mcp list', A, { size: 10, w: 700 })
      c.key(551.2452, 110.9, W)
      c.arrow(200, 128, 282, 128, A)
      c.arrow(420, 128, 502, 128, A)
      c.step(130, 192, 1, l('посмотреть список', 'see the list'))
      c.step(350, 192, 2, l('общее в project', 'share via project'))
      c.step(570, 192, 3, l('ключи в переменные', 'keys into variables'))
    },
  },
  // Слои приоритета MCP стопкой: сверху local (главный), ниже project, user, плагины, коннекторы claude.ai, managed
  'priority-layers': {
    ru: 'Слои приоритета сверху вниз: local, project, user, плагины, коннекторы claude.ai, managed MCP', en: 'Priority layers top to bottom: local, project, user, plugins, claude.ai connectors, managed MCP',
    viewBox: [0, 0, 700, 260],
    draw: (c, l) => {
      const i = c.iso(230, 156, 26)
      i.tile(-1.8, -1.8, 3.6, 3.6)
      const names = ['Managed MCP (v2.1.259+)', l('коннекторы claude.ai', 'claude.ai connectors'), l('плагины', 'plugins'), 'User', 'Project', 'Local']
      ;[0.35, 0.45, 0.55, 0.7, 0.85, 1].forEach((op, k) => i.box(-1.3, -1.3, 0.05 + 0.62 * k, 2.6, 2.6, 0.5, A, op))
      names.forEach((t, k) => {
        const y = 165.1 - 16.12 * k, top = k === names.length - 1
        c.line([[259.3, y], [470, y]], M, { w: 1, dash: '3 3', op: 0.6 })
        c.text(478, y + 4, t, top ? A : 'currentColor', { size: 12, w: top ? 700 : 500, anchor: 'start' })
      })
      c.text(350, 248, l('берётся запись верхнего слоя целиком, поля не смешиваются', 'the entry from the top layer is used whole, fields are not merged'), M, { size: 12 })
    },
  },
}
export default scenes
