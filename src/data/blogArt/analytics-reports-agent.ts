// Схемы поста «Агент для аналитических отчётов»
import { type Scene, A, M, W, bandTitle } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Было/стало: руками из базы в таблицу, график и текст → агент собирает, человек проверяет
  'before-after': {
    ru: 'Раньше человек руками переносит данные из базы в таблицу, график и текст, теперь агент подключён к источникам и собирает отчёт, а человек проверяет цифры',
    en: 'Before, a person moves data from the database into a table, chart and text by hand; now the agent is connected to the sources and assembles the report while a person checks the numbers',
    viewBox: [0, 0, 700, 236],
    draw: (c, l) => {
      c.caps(180, 16, l('БЫЛО', 'BEFORE'), M); c.caps(530, 16, l('СТАЛО', 'AFTER'), A)
      const i0 = c.iso(180, 128, 26); i0.tile(-2.6, -2.6, 5.2, 5.2); i0.box(-0.77, -1.43, 0, 0.34, 0.5, 0.5, M); i0.doc(-1.675, -0.62, 0, 1, 0.8, M, 3); i0.doc(0.23, -2.525, 0, 1, 0.8, M, 2); i0.box(-0.35, -1.42, 0, 0.34, 0.5, 0.9, M); i0.box(0.06, -1.43, 0, 0.34, 0.5, 0.7, M); i0.cyl(-2.13, 0.73, 0, 0.5, 0.7, M); i0.person(0.9, 0.9, M, '')
      const i1 = c.iso(530, 128, 26); i1.tile(-2.6, -2.6, 5.2, 5.2); i1.box(-0.77, -1.43, 0, 0.34, 0.5, 0.5, M); i1.doc(-1.675, -0.62, 0, 1, 0.8, M, 3); i1.doc(0.23, -2.525, 0, 1, 0.8, M, 2); i1.box(-0.35, -1.42, 0, 0.34, 0.5, 0.9, M); i1.box(0.06, -1.43, 0, 0.34, 0.5, 0.7, M); i1.cyl(-2.13, 0.73, 0, 0.5, 0.7, M); i1.agent(0.5, 0.5, A, 0.9, ''); i1.person(2.1, 1.7, M, '')
      c.eye(556.0064, 146.4)
      c.arrow(180.0, 123.6, 115.8, 117.6, M, {w: 1.4, dash: '4 4'})
      c.cable(530, 123.6, 465.8, 117.6)
      c.arrow(180.0, 123.6, 158.6, 117.6, M, {w: 1.4, dash: '4 4'})
      c.cable(530, 123.6, 508.6, 117.6)
      c.arrow(180.0, 123.6, 201.4, 117.6, M, {w: 1.4, dash: '4 4'})
      c.cable(530, 123.6, 551.4, 117.6)
      c.arrow(180.0, 123.6, 244.2, 117.6, M, {w: 1.4, dash: '4 4'})
      c.cable(530, 123.6, 594.2, 117.6)
      c.thenArrow(334, 362, 128, A)
      c.text(180, 222, l('Руками: выгрузка, таблица, график, текст', 'By hand: export, table, chart, text'), M, {size: 12})
      c.text(530, 222, l('Агент собирает, человек проверяет', 'The agent assembles, a human checks'), A, {size: 12})
    },
  },
  // Агент через MCP к пяти источникам, у каждого свои права
  'source-rights': {
    ru: 'Агент подключён через MCP к пяти источникам: Jira, документ, таблица, стенд, база. У каждого свои права: чтение, запись с подтверждением, только тестовая среда',
    en: 'The agent is connected through MCP to five sources: Jira, a document, a sheet, a stand, a database. Each has its own rights: read, write with confirmation, test environment only',
    viewBox: [0, 0, 700, 252],
    draw: (c, l) => {
      c.caps(350, 16, l('ПРАВА ПО КАЖДОМУ ИСТОЧНИКУ', 'PERMISSIONS PER SOURCE'), 'currentColor')
      const i0 = c.iso(350, 128, 26); i0.tile(-1.4, -1.4, 2.8, 2.8); i0.agent(-0.5, -0.5, A, 1, '')
      const i1 = c.iso(190, 50, 18); i1.tile(-1.2, -1.2, 2.4, 2.4); i1.panel(-0.8, -0.7, 1.6, 1.3, M, undefined, 1)
      c.text(140, 47, 'Jira', M, {size: 13, w: 700, anchor: 'end'})
      c.text(140, 63, l('Только чтение', 'Read only'), M, {anchor: 'end'})
      c.curve(310, 128, 236, 50, A, { dash: '4 4' })
      const i2 = c.iso(190, 130, 18); i2.tile(-1.2, -1.2, 2.4, 2.4); i2.doc(-0.7, -0.5, 0, 1.4, 1, M, 3)
      c.text(140, 127, l('Док', 'Doc'), M, {size: 13, w: 700, anchor: 'end'})
      c.text(140, 143, l('Только чтение', 'Read only'), M, {anchor: 'end'})
      c.curve(310, 128, 236, 130, A, { dash: '4 4' })
      const i3 = c.iso(190, 210, 18); i3.tile(-1.2, -1.2, 2.4, 2.4); i3.panel(-0.8, -0.7, 1.6, 1.3, M, undefined, 1)
      c.text(140, 207, l('Таблица', 'Sheet'), M, {size: 13, w: 700, anchor: 'end'})
      c.text(140, 223, l('Запись · ОК', 'Write · OK'), M, {anchor: 'end'})
      c.curve(310, 128, 236, 210, A, { dash: '4 4' })
      const i4 = c.iso(510, 80, 18); i4.tile(-1.2, -1.2, 2.4, 2.4); i4.panel(-0.8, -0.7, 1.6, 1.3, M, undefined, 1)
      c.text(560, 77, l('Стенд', 'Stand'), M, {size: 13, w: 700, anchor: 'start'})
      c.text(560, 93, l('Только тестовый', 'Test only'), W, {anchor: 'start'})
      c.curve(390, 128, 464, 80, W, { dash: '4 4' })
      const i5 = c.iso(510, 185, 18); i5.tile(-1.2, -1.2, 2.4, 2.4); i5.cyl(0, 0, 0, 0.6, 0.9, M)
      c.text(560, 182, l('База', 'DB'), M, {size: 13, w: 700, anchor: 'start'})
      c.text(560, 198, l('Только чтение', 'Read only'), M, {anchor: 'start'})
      c.curve(390, 128, 464, 185, A, { dash: '4 4' })
      c.text(350, 196, 'MCP', A, {size: 12, w: 700})
    },
  },
  // Три шага подключения: пользователь только на чтение → сервер → проверочный запрос
  'setup-steps': {
    ru: 'Пользователь базы только на чтение → Добавить сервер → Проверить запросом',
    en: 'A read-only database user → Add the server → Check with a query',
    viewBox: [0, 0, 700, 238],
    draw: (c, l) => {
      const i0 = c.iso(130, 122, 26); i0.tile(-1.5, -1.5, 3, 3); i0.cyl(-0.3, 0.2, 0, 0.6, 0.9, M); i0.person(1, 0.9, M, '')
      c.key(112.2516, 131.7, A)
      const i1 = c.iso(350, 122, 26); i1.tile(-1.5, -1.5, 3, 3); i1.panel(-1.1, -0.6, 2.2, 1.6, A, bandTitle('mcp add', 7), 1)
      const i2 = c.iso(570, 122, 26); i2.tile(-1.5, -1.5, 3, 3); i2.doc(-0.9, -0.6, 0, 1.8, 1.2, A, 3, true)
      c.arrow(200, 128, 282, 128, A)
      c.arrow(420, 128, 502, 128, A)
      c.step(130, 192, 1, l('Пользователь базы только на чтение', 'A read-only database user'))
      c.step(350, 192, 2, l('Добавить сервер', 'Add the server'))
      c.step(570, 192, 3, l('Проверить запросом', 'Check with a query'))
    },
  },
  // Агент показывает запрос и сводку, человек пересчитывает одно число
  'check-number': {
    ru: 'Агент показывает запрос и результат, человек пересчитывает одно число другим способом',
    en: 'The agent shows the query and result, and a person recomputes one number another way',
    viewBox: [0, 0, 700, 224],
    draw: (c, l) => {
      const i0 = c.iso(130, 126, 26); i0.tile(-1.5, -1.5, 3, 3); i0.doc(-1, -0.7, 0, 2, 1.4, A, 4)
      const i1 = c.iso(350, 126, 26); i1.tile(-1.5, -1.5, 3, 3); i1.doc(-1, -0.7, 0, 2, 1.4, A, 3)
      const i2 = c.iso(570, 126, 26); i2.tile(-1.5, -1.5, 3, 3); i2.person(-0.3, 0.3, M, '')
      c.eye(573.4904, 95)
      c.arrow(200, 132, 282, 132, A)
      c.arrow(420, 132, 500, 132, A)
      c.badge(594, 115.8, M, '', { mark: 'check' })
      c.text(130, 208, l('запрос и результат', 'query and result'), A, {size: 12})
      c.text(350, 208, l('сводка и график', 'summary and chart'), A, {size: 12})
      c.text(570, 208, l('человек пересчитывает число', 'a human recomputes one number'), M, {size: 12})
    },
  },
  // Три шага старта: база на чтение, один отчёт, сверка числа
  'start-steps': {
    ru: 'Три шага старта: база на чтение, один отчёт, сверка числа',
    en: 'Three starting steps: a read-only database, one report, checking one number',
    viewBox: [0, 0, 700, 238],
    draw: (c, l) => {
      const i0 = c.iso(130, 122, 26); i0.tile(-1.5, -1.5, 3, 3); i0.cyl(0, 0.1, 0, 0.6, 0.9, M)
      const i1 = c.iso(350, 122, 26); i1.tile(-1.5, -1.5, 3, 3); i1.doc(-0.9, -0.6, 0, 1.8, 1.2, A, 3, true)
      const i2 = c.iso(570, 122, 26); i2.tile(-1.5, -1.5, 3, 3); i2.person(-0.3, 0.3, M, '')
      c.key(578.4904, 107, M)
      c.arrow(200, 128, 282, 128, A)
      c.arrow(420, 128, 502, 128, A)
      c.step(130, 192, 1, l('база на чтение', 'read-only database'))
      c.step(350, 192, 2, l('один отчёт', 'one report'))
      c.step(570, 192, 3, l('сверка числа', 'check one number'))
    },
  },
}
export default scenes
