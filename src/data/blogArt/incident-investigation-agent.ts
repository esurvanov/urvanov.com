// Схемы поста «Агент для расследования инцидентов»
import { type Scene, A, M, W, bandTitle } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Было/стало: человек прыгает между Sentry и Grafana → агент собирает черновик, человек решает
  'before-after': {
    ru: 'Раньше человек вручную ходит между Sentry и Grafana, теперь агент подключён к обеим системам и собирает черновик расследования, а человек решает',
    en: 'Before, a person hops between Sentry and Grafana by hand; now the agent is connected to both and assembles an investigation draft while a person decides',
    viewBox: [0, 0, 700, 236],
    draw: (c, l) => {
      c.caps(180, 16, l('БЫЛО', 'BEFORE'), M); c.caps(530, 16, l('СТАЛО', 'AFTER'), A)
      const i0 = c.iso(180, 128, 26); i0.tile(-2.6, -2.6, 5.2, 5.2); i0.panel(-2.1, -0.13, 1.3, 1.4, M, undefined, 1); i0.panel(-0.7, -1.53, 1.3, 1.4, M, undefined, 1); i0.person(0.8, 0.8, M, '')
      c.text(146.75, 57, 'Sentry', M, {size: 10, w: 700})
      c.text(209.75, 57, 'Grafana', M, {size: 10, w: 700})
      const i1 = c.iso(530, 128, 26); i1.tile(-2.6, -2.6, 5.2, 5.2); i1.panel(-2.1, -0.13, 1.3, 1.4, M, undefined, 1); i1.panel(-0.7, -1.53, 1.3, 1.4, M, undefined, 1); i1.agent(0.4, 0.4, A, 0.9, ''); i1.doc(1.6, -0.4, 0, 0.9, 0.7, A, 3); i1.person(2, 1.9, M, '')
      c.text(496.75, 57, 'Sentry', M, {size: 10, w: 700})
      c.text(559.75, 57, 'Grafana', M, {size: 10, w: 700})
      c.eye(549.2516, 147.7)
      c.arrow(180.0, 121.0, 148.5, 116.3, M, {w: 1.4, dash: '4 4'})
      c.cable(530, 121, 498.5, 116.3)
      c.arrow(180.0, 121.0, 211.5, 116.3, M, {w: 1.4, dash: '4 4'})
      c.cable(530, 121, 561.5, 116.3)
      c.thenArrow(334, 362, 128, A)
      c.text(180, 222, l('Человек прыгает между вкладками', 'A person hops between tabs'), M, {size: 12})
      c.text(530, 222, l('Агент собирает, человек решает', 'The agent gathers, a human decides'), A, {size: 12})
    },
  },
  // Три шага подключения: Sentry → Grafana на чтение → проверка на прошлом инциденте
  'setup-steps': {
    ru: 'Подключить Sentry → Подключить Grafana на чтение → Проверить на прошлом инциденте',
    en: 'Connect Sentry → Connect Grafana read-only → Test on a past incident',
    viewBox: [0, 0, 700, 238],
    draw: (c, l) => {
      const i0 = c.iso(130, 122, 26); i0.tile(-1.5, -1.5, 3, 3); i0.panel(-1, -0.6, 2, 1.6, M, bandTitle('Sentry', 6.8), 1)
      const i1 = c.iso(350, 122, 26); i1.tile(-1.5, -1.5, 3, 3); i1.panel(-1, -0.6, 2, 1.6, M, undefined, 1)
      c.text(360, 58.75, 'Grafana', M, {size: 10, w: 700})
      const i2 = c.iso(570, 122, 26); i2.tile(-1.5, -1.5, 3, 3); i2.doc(-0.9, -0.5, 0, 1.8, 1.2, A, 3, true); i2.person(1, 1, M, '')
      c.arrow(200, 128, 282, 128, A)
      c.arrow(420, 128, 502, 128, A)
      c.step(130, 192, 1, l('Подключить Sentry', 'Connect Sentry'))
      c.step(350, 192, 2, l('Подключить Grafana на чтение', 'Connect Grafana read-only'))
      c.step(570, 192, 3, l('Проверить на прошлом инциденте', 'Test on a past incident'))
    },
  },
  // Лестница прав: чтение открыто, запись с подтверждением, создание без подтверждения закрыто
  'rights-ladder': {
    ru: 'Лестница прав: чтение открыто, запись с подтверждением человека, создание инцидентов без подтверждения закрыто',
    en: 'Permission ladder: reading is open, writing needs human confirmation, creating incidents without confirmation is closed',
    viewBox: [0, 0, 700, 252],
    draw: (c, l) => {
      const i0 = c.iso(120, 178, 24); i0.tile(-1.5, -1.5, 3, 3); i0.panel(-1.1, -0.7, 2, 1.6, M, bandTitle('Jira'), 1)
      const i1 = c.iso(350, 128, 24); i1.tile(-1.5, -1.5, 3, 3); i1.doc(-1, -0.5, 0, 1.6, 1.2, A, 3); i1.person(1.2, 0.9, M, '')
      const i2 = c.iso(580, 78, 24); i2.tile(-1.5, -1.5, 3, 3); i2.doc(-1, -0.5, 0, 1.6, 1.2, W, 3)
      c.eye(122, 120, A)
      c.badge(372.2, 120.2, A, '', { r: 9, mark: 'check', k: 1.1 })
      c.badge(580, 38, W, '', { mark: 'cross' })
      c.arrow(190, 172, 282, 146, A)
      c.arrow(420, 122, 512, 96, W, {w: 1.8, dash: '4 4'})
      c.text(120, 236, l('Чтение ошибок и метрик', 'Reading errors and metrics'), A, {size: 12})
      c.text(350, 186, l('Запись с подтверждением', 'Write with confirmation'), A, {size: 12})
      c.text(580, 136, l('Создание инцидентов без подтверждения', 'Creating incidents without confirmation'), W, {size: 12})
    },
  },
  // Три шага старта: Sentry и Grafana на чтение, прошлый инцидент как проверка
  'start-steps': {
    ru: 'Три шага старта: Sentry на чтение, Grafana на чтение, прошлый инцидент как проверка',
    en: 'Three starting steps: Sentry read-only, Grafana read-only, a past incident as a test',
    viewBox: [0, 0, 700, 238],
    draw: (c, l) => {
      const i0 = c.iso(130, 122, 26); i0.tile(-1.5, -1.5, 3, 3); i0.panel(-1, -0.6, 2, 1.7, M, bandTitle('Sentry', 6.8), 1)
      const i1 = c.iso(350, 122, 26); i1.tile(-1.5, -1.5, 3, 3); i1.panel(-1, -0.6, 2, 1.7, M, undefined, 1)
      c.text(360, 56, 'Grafana', M, {size: 10, w: 700})
      const i2 = c.iso(570, 122, 26); i2.tile(-1.5, -1.5, 3, 3); i2.doc(-0.9, -0.5, 0, 1.8, 1.2, A, 3, true); i2.person(1, 1, M, '')
      c.arrow(200, 128, 282, 128, A)
      c.arrow(420, 128, 502, 128, A)
      c.step(130, 192, 1, l('Sentry на чтение', 'Sentry read-only'))
      c.step(350, 192, 2, l('Grafana на чтение', 'Grafana read-only'))
      c.step(570, 192, 3, l('прошлый инцидент как проверка', 'a past incident as a test'))
    },
  },
  // Ось времени: релиз → рост ошибок → алерт; агент ставит события на одну ось и показывает, что было раньше
  'event-timeline': {
    ru: 'Агент ставит релиз, рост ошибок и алерт на одну ось времени и показывает, что было раньше', en: 'The agent puts the release, error spike and alert on one timeline and shows what came first',
    viewBox: [0, 0, 700, 268],
    draw: (c, l) => {
      const i1 = c.iso(130, 126, 26)
      i1.tile(-1.5, -1.5, 3, 3)
      i1.box(-0.4, -0.4, 0, 0.8, 0.8, 0.7, M)
      const i2 = c.iso(350, 126, 26)
      i2.tile(-1.5, -1.5, 3, 3)
      // столбики растущих ошибок
      i2.box(-1, -0.4, 0, 0.5, 0.8, 0.4, W)
      i2.box(-0.3, -0.4, 0, 0.5, 0.8, 0.8, W)
      i2.box(0.4, -0.4, 0, 0.5, 0.8, 1.3, W)
      c.iso(570, 126, 26).tile(-1.5, -1.5, 3, 3)
      c.flag(134, 109.8, M)
      c.icon(570, 96, 'bell', M, { solid: true })
      c.arrow(200, 132, 282, 132, A)
      c.arrow(420, 132, 500, 132, A)
      c.text(130, 208, l('релиз', 'release'), M, { size: 12 })
      c.text(350, 208, l('рост ошибок', 'error spike'), W, { size: 12 })
      c.text(570, 208, l('алерт', 'alert'), M, { size: 12 })
      c.line([[130, 236], [570, 236]], A, { w: 1.5, dash: '4 4' })
      c.text(350, 256, l('агент ставит события на одну ось времени', 'the agent puts events on one timeline'), A, { size: 12, w: 700 })
    },
  },
}
export default scenes
