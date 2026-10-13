// Схемы поста «MCP: доступ агента к системам»
import { type Scene, A, M, W, bandTitle } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Было/стало: вы пересказываете задачу из Jira агенту → агент читает Jira сам по кабелю MCP
  'retell-vs-mcp': {
    ru: 'Раньше человек пересказывает задачу из Jira в диалог, и агент видит только пересказ. Теперь агент подключён к Jira кабелем MCP и читает саму задачу, а человек проверяет',
    en: 'Before, a person retells a Jira task in the conversation and the agent sees only the retelling. Now the agent is plugged into Jira with an MCP cable and reads the task itself, while the person reviews',
    viewBox: [0, 0, 700, 250],
    draw: (c, l) => {
      c.caps(180, 16, l('РУКАМИ', 'BY HAND'), M); c.caps(530, 16, l('С АГЕНТОМ', 'WITH AGENT'), A)
      const i1 = c.iso(180, 128, 26)
      i1.tile(-2.6, -2.6, 5.2, 5.2)
      i1.panel(-2.677, 2.193, 1.2, 1.3, M, undefined, 1)
      c.text(80.3, 81.8, 'Jira', M, { size: 10, w: 700 })
      const i2 = c.iso(180, 128, 26)
      i2.doc(0.424, -0.973, 0, 0.8, 0.7, W, 2)
      i2.agent(1.912, -2.436, A, 0.8, '')
      i2.person(-0.624, 0.824, M, '')
      const i3 = c.iso(530, 128, 26)
      i3.tile(-2.6, -2.6, 5.2, 5.2)
      i3.panel(-2, 1.517, 1.2, 1.3, M, undefined, 1)
      c.text(460.7, 81.8, 'Jira', M, { size: 10, w: 700 })
      const i4 = c.iso(530, 128, 26)
      i4.agent(-0.3, -0.3, A, 0.9, '')
      i4.person(1.6, -1.4, M, '')
      c.eye(614.548, 99.6)
      c.arrow(133.4, 115.2, 98.1, 115.2, M, { w: 1.6, dash: '4 4' })
      c.arrow(161.4, 115.2, 198.6, 115.2, M, { w: 1.6, dash: '4 4' })
      c.arrow(226.6, 115.2, 261.9, 115.2, M, { w: 1.6, dash: '4 4' })
      c.badge(277.9446, 81.2, W, '?', { r: 10, size: 14 })
      c.text(147.4, 148.6, l('Вы', 'You'), M, { size: 10.5, w: 700 })
      c.text(212.6, 148.6, l('Пересказ', 'Retelling'), W, { size: 10.5, w: 700 })
      c.text(277.9, 148.6, l('Агент', 'Agent'), A, { size: 10.5, w: 700 })
      // Клавиши Ctrl+C → Ctrl+V: пересказ руками
      c.keycap(151.6482, 63.2, 'Ctrl+C')
      c.line([[197.6482, 72.2], [205.6482, 72.2]], M, { w: 1.8, cap: true }); c.line([[202.1482, 68.7], [205.6482, 72.2], [202.1482, 75.7]], M, { w: 1.8, cap: true })
      c.keycap(211.6482, 63.2, 'Ctrl+V')
      c.cable(472.5, 121.2, 516, 121.2)
      c.arrow(583.5, 115.2, 544, 115.2, A, { w: 1.4, dash: '4 4' })
      c.text(530, 148.6, l('Агент', 'Agent'), A, { size: 10.5, w: 700 })
      c.text(597.5, 148.6, l('Вы', 'You'), M, { size: 10.5, w: 700 })
      c.thenArrow(334, 362, 128, A)
      c.text(180, 236, l('Агент видит пересказ', 'Agent sees a retelling'), W, { size: 12 })
      c.text(530, 236, l('Агент работает в самой Jira', 'Agent works inside Jira'), A, { size: 12 })
    },
  },
  // Наш контекст (диалог и файлы) против других контекстов (GitLab, Jira, tldv, Confluence) за MCP-клиентом и сервером
  'contexts': {
    ru: 'Слева наш контекст: диалог с агентом и файлы проекта, которые агент видит сразу. Справа другие контексты: GitLab, Jira, tldv с записями встреч, Confluence с базой знаний, 1С и другие. Агент их не видит, пока нет MCP: клиента у агента и сервера у системы',
    en: 'On the left is our context: the conversation with the agent and project files the agent sees at once. On the right are other contexts: GitLab, Jira, tldv meeting recordings, Confluence knowledge base, 1C and more. The agent cannot see them until MCP is set up: a client on the agent side and a server on the system side',
    viewBox: [0, 0, 700, 372],
    draw: (c, l) => {
      c.caps(150, 16, l('НАШ КОНТЕКСТ', 'OUR CONTEXT'), A); c.caps(560, 16, l('ДРУГИЕ КОНТЕКСТЫ', 'OTHER CONTEXTS'), 'currentColor')
      const ru = c.lang === 'ru'
      const i1 = c.iso(150, 150, 28)
      i1.tile(-2.1, -2.1, 4.2, 4.2, { dash: '6 5', edge: 'var(--accent)' })
      i1.agent(-1.6, -0.5, A, 1.2, '')
      i1.panel(-0.1, -1.9, 2.2, 1.3, M, bandTitle(l('Диалог', 'Dialogue'), ru ? 8.5 : 6.7), 1)
      const i2 = c.iso(150, 150, 28)
      i2.panel(-0.1, 0.5, 2.2, 1.3, M, bandTitle(l('Файлы', 'Files')), 1)
      c.link('/blog/ai-in-code-harness-and-tools/', () => {
        c.pill(88, 205, 124, 28, A, { fill: A, fillOp: 0.22, sw: 1.6 })
        c.text(139, 224, l('Харнесс', 'Harness'), A, { size: 13, w: 700, underline: true })
        c.extLink(ru ? 171.3 : 172, 213, A, 8, 1.8)
      })
      c.text(150, 250, l('агент и всё вокруг него', 'the agent and everything around it'), M)
      c.text(30, 46, l('Локальная машина', 'Local machine'), M, { size: 11, w: 700, anchor: 'start' })
      c.pill(262, 116, 90, 24, A)
      c.text(307, 132, l('MCP-клиент', 'MCP client'), A, { w: 700 })
      c.pill(366, 116, 90, 24, A)
      c.text(411, 132, l('MCP-сервер', 'MCP server'), A, { w: 700 })
      c.line([[352, 128], [366, 128]], A, { w: 2, dash: '4 4' })
      // Другие контексты: каждая система — островок-ссылка на её MCP-сервер; x значка ↗ — после названия
      const atl = 'https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/'
      const systems: [string, string, string, number, number][] = [
        ['GitLab', l('Код и MR', 'Code and MRs'), 'https://docs.gitlab.com/user/model_context_protocol/mcp_server/', 62, 602.2],
        ['Jira', l('Задачи и требования', 'Tasks and requirements'), atl, 124, 583.7],
        ['tldv', l('Записи встреч', 'Meeting recordings'), 'https://doc.tldv.io', 186, 585.5],
        ['Confluence', l('База знаний', 'Knowledge base'), atl, 248, 634.6],
        [l('1С', '1C'), l('Код и данные учёта', 'Code and accounting data'), '/blog/mcp-1c/#what', 310, 0],
      ]
      for (const [name, sub, href, y, ix] of systems) {
        c.curve(456, 128, 484, y, A, { dash: '4 4' })
        c.link(href, () => {
          const I = c.iso(512, y, 18)
          I.tile(-1.2, -1.2, 2.4, 2.4, { grid: false })
          I.panel(-0.8, -0.7, 1.6, 1.3, M, undefined, 1)
          c.text(556, y - 2, name, M, { size: 13, w: 700, anchor: 'start', underline: true })
          if (ix) c.extLink(ix, y - 11)
          c.text(556, y + 14, sub, M, { anchor: 'start' })
        })
      }
      c.text(556, 362, l('И другие', 'And more'), M, { size: 12, w: 600, anchor: 'start' })
    },
  },
  // Было три ручных действия → одна фраза агенту, он подключает Jira сам, вы только входите через браузер
  'one-phrase-setup': {
    ru: 'Раньше человек сам выполняет три действия подряд. Теперь он говорит агенту одну фразу, агент подключает Jira сам, а человеку остаётся войти в браузере',
    en: 'Before, a person performs three actions in a row. Now they tell the agent one phrase, the agent connects Jira itself, and the person only logs in via the browser',
    viewBox: [0, 0, 700, 250],
    draw: (c, l) => {
      c.caps(180, 16, l('РУКАМИ', 'BY HAND'), M); c.caps(530, 16, l('С АГЕНТОМ', 'WITH AGENT'), A)
      const i1 = c.iso(180, 128, 26)
      i1.tile(-2.6, -2.6, 5.2, 5.2)
      // Три ручных действия — площадки с номерами
      for (const [x, y] of [[-0.65, 0.85], [0.85, -0.65], [2.35, -2.15]]) i1.pad(x, y, M, 0.9)
      const i2 = c.iso(180, 128, 26)
      i2.person(-2.15, 2.35, M, '')
      c.badge(146.2, 128.6, M, '1', { r: 9, size: 11, shade: true })
      c.badge(213.8, 128.6, M, '2', { r: 9, size: 11, shade: true })
      c.badge(281.3, 128.6, M, '3', { r: 9, size: 11, shade: true })
      const i3 = c.iso(530, 128, 26)
      i3.tile(-2.6, -2.6, 5.2, 5.2)
      i3.panel(1, -1.48, 1.2, 1.3, M, undefined, 1)
      c.text(595.7, 81.8, 'Jira', M, { size: 10, w: 700 })
      const i4 = c.iso(530, 128, 26)
      i4.agent(-0.3, -0.3, A, 0.9, '')
      i4.person(-1.4, 1.6, M, '')
      c.arrow(90.7, 127.6, 134.2, 127.6, M, { w: 1.6, dash: '4 4' })
      c.arrow(158.2, 127.6, 201.8, 127.6, M, { w: 1.6, dash: '4 4' })
      c.arrow(225.8, 127.6, 269.3, 127.6, M, { w: 1.6, dash: '4 4' })
      c.text(78.7, 148.6, l('Вы', 'You'), M, { size: 10.5, w: 700 })
      c.text(146.2, 164.6, l('Добавить', 'Add'), M, { size: 10.5, w: 700 })
      c.text(213.8, 164.6, l('Войти', 'Sign in'), M, { size: 10.5, w: 700 })
      c.text(281.3, 164.6, l('Проверить', 'Check'), M, { size: 10.5, w: 700 })
      c.bubble(432.452, 53.6, 100, 24, M, { tail: [30, -2, 8, 7] })
      c.text(482.5, 69.6, l('«подключи Jira»', '“connect Jira”'), 'currentColor', { size: 10.5, w: 600 })
      c.key(438.452, 115.6, W)
      c.text(438.5, 131.6, l('вход', 'sign-in'), W, { size: 9.5, w: 700 })
      c.arrow(476.5, 115.2, 516, 115.2, A, { w: 1.6, dash: '4 4' })
      c.cable(544, 121.2, 587.5, 121.2)
      c.text(462.5, 148.6, l('Вы', 'You'), M, { size: 10.5, w: 700 })
      c.text(530, 148.6, l('Агент', 'Agent'), A, { size: 10.5, w: 700 })
      c.thenArrow(334, 362, 128, A)
      c.text(180, 236, l('Вручную: три действия', 'By hand: three actions'), M, { size: 12 })
      c.text(530, 236, l('Агент делает сам, вы входите в браузере', 'The agent does it, you log in via browser'), A, { size: 12 })
    },
  },
  // Три шага: добавить сервер → войти через браузер → проверить на тестовой задаче
  'setup-steps': {
    ru: 'Добавить сервер → Войти через браузер → Проверить на тестовой задаче',
    en: 'Add the server → Log in via browser → Test on a sample task',
    viewBox: [0, 0, 700, 238],
    draw: (c, l) => {
      const i1 = c.iso(130, 122, 26)
      i1.tile(-1.5, -1.5, 3, 3)
      i1.panel(-1.1, -0.6, 2.2, 1.6, A, bandTitle('mcp add', 7), 1)
      const i2 = c.iso(350, 122, 26)
      i2.tile(-1.5, -1.5, 3, 3)
      i2.panel(-1.1, -0.8, 1.9, 1.5, M, undefined, 1)
      c.text(361, 56.7, 'Atlassian', M, { size: 10, w: 700 })
      const i3 = c.iso(350, 122, 26)
      i3.person(1, 0.9, M, '')
      c.key(332.2516, 131.7, W)
      const i4 = c.iso(570, 122, 26)
      i4.tile(-1.5, -1.5, 3, 3)
      i4.panel(-1.2, -0.8, 1.5, 1.4, M, undefined, 1)
      c.text(574.3, 55.4, 'Jira', M, { size: 10, w: 700 })
      const i5 = c.iso(570, 122, 26)
      i5.doc(0.5, 0.3, 0, 0.9, 0.8, M, 2, A)
      c.arrow(200, 128, 282, 128, A)
      c.arrow(420, 128, 502, 128, A)
      c.step(130, 192, 1, l('Добавить сервер', 'Add the server'))
      c.step(350, 192, 2, l('Войти через браузер', 'Log in via browser'))
      c.step(570, 192, 3, l('Проверить на тестовой задаче', 'Test on a sample task'))
    },
  },
  // Три области видимости: local, project, user
  'scopes': {
    ru: 'Три области: local — вы и один проект, project — вся команда через репозиторий, user — вы и все ваши проекты',
    en: 'Three scopes: local is you and one project, project is the whole team through the repo, user is you and all your projects',
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
  // Было: размытый запрос и три круга правок с ошибками; стало: точный запрос по источнику за один проход
  'exact-request': {
    ru: 'Раньше неточный запрос даёт неточный ответ, правки копят ошибки за три захода, теперь точный запрос по источнику решается за один заход',
    en: 'Before, a vague request gets a vague answer and fixes pile up errors over three passes; now an exact request against the source resolves in one pass',
    viewBox: [0, 0, 700, 356],
    draw: (c, l) => {
      c.caps(180, 16, l('РУКАМИ', 'BY HAND'), M); c.caps(530, 16, l('С АГЕНТОМ', 'WITH AGENT'), A)
      const i1 = c.iso(180, 128, 26)
      i1.tile(-2.6, -2.6, 5.2, 5.2)
      i1.doc(0.424, -0.973, 0, 0.8, 0.7, M, 2)
      i1.doc(-1.024, 0.475, 0, 0.8, 0.7, M, 2)
      i1.doc(1.874, -2.423, 0, 0.8, 0.7, M, 2)
      i1.person(-2.074, 2.274, M, '')
      const i2 = c.iso(530, 128, 26)
      i2.tile(-2.6, -2.6, 5.2, 5.2)
      i2.doc(1.2, -1.75, 0, 0.8, 0.7, M, 2, A)
      const i3 = c.iso(530, 128, 26)
      i3.agent(-0.3, -0.3, A, 0.9, '')
      i3.person(-1.4, 1.6, M, '')
      c.arrow(96.1, 123.6, 133.4, 123.6, M, { w: 1.6, dash: '4 4' })
      c.arrow(161.4, 123.6, 198.6, 123.6, M, { w: 1.6, dash: '4 4' })
      c.arrow(226.6, 123.6, 263.9, 123.6, M, { w: 1.6, dash: '4 4' })
      c.badge(147.4, 107.8, W, '!', { r: 7.5, size: 11 })
      c.badge(212.6, 107.8, W, '!', { r: 7.5, size: 11 })
      c.badge(212.6, 90.8, W, '!', { r: 7.5, size: 11 })
      c.badge(277.9, 107.8, W, '!', { r: 7.5, size: 11 })
      c.badge(277.9, 90.8, W, '!', { r: 7.5, size: 11 })
      c.badge(277.9, 73.8, W, '!', { r: 7.5, size: 11 })
      c.text(82.1, 148.6, l('Запрос', 'Request'), M, { size: 10.5, w: 700 })
      c.text(147.4, 148.6, l('Ответ', 'Answer'), M, { size: 10.5, w: 700 })
      c.text(212.6, 148.6, l('Правка', 'Fix'), M, { size: 10.5, w: 700 })
      c.text(277.9, 148.6, l('Ответ', 'Answer'), M, { size: 10.5, w: 700 })
      c.arrow(476.5, 117.4, 516, 117.4, A, { w: 1.6, dash: '4 4' })
      c.arrow(544, 117.4, 583.5, 117.4, A, { w: 1.6, dash: '4 4' })
      c.text(462.5, 148.6, l('Запрос', 'Request'), M, { size: 10.5, w: 700 })
      c.text(530, 148.6, l('Агент', 'Agent'), A, { size: 10.5, w: 700 })
      c.text(597.5, 148.6, l('Ответ', 'Answer'), M, { size: 10.5, w: 700 })
      const ru = c.lang === 'ru'
      if (ru) c.pill(467.8, 34, 124.4, 22, A); else c.pill(458.2, 34, 143.6, 22, A)
      c.text(530, 49, l('1 заход вместо 3', '1 pass instead of 3'), A, { size: 11.5, w: 700 })
      if (ru) c.pill(82.6, 34, 194.8, 22, W); else c.pill(85.8, 34, 188.4, 22, W)
      c.text(180, 49, l('3 захода, ошибок всё больше', '3 passes, ever more errors'), W, { size: 11.5, w: 700 })
      c.thenArrow(334, 362, 128, A)
      c.text(180, 236, l('Неточный запрос: ошибки копятся', 'A vague request: errors pile up'), W, { size: 12 })
      c.text(530, 236, l('Точный запрос: ответ из источника', 'An exact request: answer from the source'), A, { size: 12 })
      // Столбики накопленных ошибок: слева растут, справа вместо них пунктир — сэкономлено
      c.caps(350, 268, l('ОБЪЁМ НАКОПЛЕННЫХ ОШИБОК (СХЕМА УСЛОВНАЯ)', 'ACCUMULATED ERRORS (ILLUSTRATIVE)'), M, { ls: '.06em' })
      c.line([[60, 338], [640, 338]], M, { w: 1.2, op: 0.6 })
      c.rect(93, 330, 34, 8, { rx: 3, fill: W })
      c.text(110, 325, '1', W, { w: 700 })
      c.text(110, 352, l('шаг 1', 'step 1'), M, { size: 10 })
      c.rect(163, 314, 34, 24, { rx: 3, fill: W })
      c.text(180, 309, '3', W, { w: 700 })
      c.text(180, 352, l('шаг 2', 'step 2'), M, { size: 10 })
      c.rect(233, 290, 34, 48, { rx: 3, fill: W })
      c.text(250, 285, '6', W, { w: 700 })
      c.text(250, 352, l('шаг 3', 'step 3'), M, { size: 10 })
      c.rect(453, 330, 34, 8, { rx: 3, fill: A })
      c.text(470, 325, '1', A, { w: 700 })
      c.text(470, 352, l('шаг 1', 'step 1'), M, { size: 10 })
      c.rect(523, 314, 34, 24, { rx: 3, fill: 'none', stroke: W, dash: '4 3', op: 0.7 })
      c.text(540, 352, l('шаг 2', 'step 2'), M, { size: 10 })
      c.rect(593, 290, 34, 48, { rx: 3, fill: 'none', stroke: W, dash: '4 3', op: 0.7 })
      c.text(610, 352, l('шаг 3', 'step 3'), M, { size: 10 })
      c.text(540, 280, l('сэкономлено', 'saved'), A, { size: 10.5, w: 700 })
    },
  },
  // Вы спрашиваете, агент смотрит в данные и отвечает; где данных нет — додумывает
  'fills-gaps': {
    ru: 'Вы спрашиваете агента, он ищет в данных и отвечает: где данных нет, он додумывает',
    en: 'You ask the agent, it looks in the data and answers: where data is missing, it fills in',
    viewBox: [0, 0, 700, 330],
    draw: (c, l) => {
      const i1 = c.iso(70, 168, 22)
      i1.tile(-1.2, -1.2, 2.4, 2.4)
      i1.person(0, 0.1, M, '')
      const i2 = c.iso(240, 168, 22)
      i2.tile(-1.3, -1.3, 2.6, 2.6)
      i2.agent(-0.4, -0.4, A, 1, '')
      const i3 = c.iso(470, 66, 28)
      i3.tile(-2.3, -2.3, 4.6, 4.6)
      // Пустые места на месте недостающих документов и записей
      i3.zone(0.1, -0.85, 0.8, 0.7, W, { gz: 0.02 }); i3.zone(1.1, -1.85, 0.8, 0.7, W, { gz: 0.02 })
      const i4 = c.iso(470, 66, 28)
      i4.doc(-1.9, 1.15, 0, 0.8, 0.7, M, 2)
      i4.doc(-0.9, 0.15, 0, 0.8, 0.7, M, 2)
      const i5 = c.iso(470, 214, 28)
      i5.tile(-2.3, -2.3, 4.6, 4.6)
      i5.zone(0.15, -0.85, 0.7, 0.7, W, { gz: 0.02 }); i5.zone(1.15, -1.85, 0.7, 0.7, W, { gz: 0.02 })
      const i6 = c.iso(470, 214, 28)
      i6.box(-1.8, 1.2, 0, 0.6, 0.6, 0.6, M)
      i6.box(-0.8, 0.2, 0, 0.6, 0.6, 0.6, M)
      c.bubble(14, 30, 226, 26, M, { rx: 9, stroke: true, tail: [46.1, 8, 68.1, 14] })
      c.text(127, 47.5, l('«Какие шаги у бага PAY-142?»', '“What are the steps of bug PAY-142?”'), 'currentColor', { w: 600 })
      c.arrow(112, 164, 196, 164, M, { w: 1.8 })
      c.text(154, 154, l('вопрос', 'question'), M, { size: 10.5, w: 700 })
      c.arrow(272, 150, 372, 100, A, { w: 1.6, dash: '4 4' })
      c.arrow(272, 178, 372, 206, A, { w: 1.8 })
      c.text(318, 106, l('ищет', 'looks up'), A, { size: 10.5, w: 700, anchor: 'end' })
      c.arrow(397.3, 90, 397.3, 170, A, { w: 1.7 })
      c.arrow(445.8, 90, 445.8, 170, A, { w: 1.7 })
      c.arrow(494.2, 90, 494.2, 170, W, { w: 1.7, dash: '4 4' })
      c.arrow(542.7, 90, 542.7, 170, W, { w: 1.7, dash: '4 4' })
      c.badge(494.2, 180, W, '?', { r: 10, size: 14 })
      c.badge(542.7, 180, W, '?', { r: 10, size: 14 })
      c.text(600, 70, l('Данные', 'Data'), M, { size: 10.5, w: 700, anchor: 'start' })
      c.text(600, 86, l('Jira закрыта', 'Jira is closed'), W, { size: 10.5, w: 700, anchor: 'start' })
      c.text(600, 218, l('Ответ', 'Answer'), M, { size: 10.5, w: 700, anchor: 'start' })
      c.text(240, 214, l('Агент', 'Agent'), A, { size: 10.5, w: 700 })
      c.text(70, 214, l('Вы', 'You'), M, { size: 10.5, w: 700 })
      c.text(400, 300, l('Есть в данных', 'In the data'), A, { size: 12, w: 700 })
      c.text(400, 315, l('ответ из источника', 'answer from the source'), M)
      c.text(540, 300, l('Не хватает', 'Missing'), W, { size: 12, w: 700 })
      c.text(540, 315, l('агент додумывает', 'the agent fills in'), M)
    },
  },
  // Лестница прав: сначала чтение, потом запись с подтверждением, запись без подтверждения закрыта
  'rights-ladder': {
    ru: 'Лестница прав: сначала только чтение, затем запись с подтверждением человека, запись без подтверждения закрыта',
    en: 'Permission ladder: read only first, then write with human confirmation, write without confirmation is closed',
    viewBox: [0, 0, 700, 252],
    draw: (c, l) => {
      const i1 = c.iso(120, 178, 24)
      i1.tile(-1.5, -1.5, 3, 3)
      i1.panel(-1.1, -0.7, 2, 1.6, M, bandTitle('Jira'), 1)
      const i2 = c.iso(350, 128, 24)
      i2.tile(-1.7, -1.7, 3.4, 3.4)
      i2.doc(-1.5, -0.9, 0, 1.5, 1.1, A, 3)
      i2.person(1.3, 0.8, M, '')
      const i3 = c.iso(580, 78, 24)
      i3.tile(-1.5, -1.5, 3, 3)
      i3.doc(-1, -0.5, 0, 1.6, 1.2, W, 3)
      c.eye(122, 120, A)
      c.badge(378.4, 114.2, A, '', { r: 10, mark: 'check' })
      c.badge(580, 38, W, '', { mark: 'cross' })
      c.arrow(190, 172, 282, 146, A)
      c.arrow(420, 122, 512, 96, W, { w: 1.8, dash: '4 4' })
      c.text(120, 236, l('Чтение', 'Read'), A, { size: 12 })
      c.text(350, 190, l('Запись + подтверждение', 'Write + confirm'), A, { size: 12 })
      c.text(580, 136, l('Запись без подтверждения', 'Write without confirm'), W, { size: 12 })
    },
  },
  // Путь: один сервер на чтение → 5 запросов проверены руками → запись с подтверждением
  'start-small': {
    ru: 'Один сервер на чтение → 5 запросов с проверкой руками → Запись с подтверждением',
    en: 'One read-only server → 5 queries checked by hand → Write with confirmation',
    viewBox: [0, 0, 700, 238],
    draw: (c, l) => {
      const i1 = c.iso(130, 122, 26)
      i1.tile(-1.5, -1.5, 3, 3)
      i1.panel(-1.1, -0.7, 2.2, 1.8, M, bandTitle('Jira'), 2)
      const i2 = c.iso(350, 122, 26)
      i2.tile(-1.5, -1.5, 3, 3)
      i2.doc(-1.2, -0.6, 0, 0.65, 0.6, A, 0, true)
      i2.doc(-0.35, -0.6, 0, 0.65, 0.6, A, 0, true)
      i2.doc(-1.2, 0.3, 0, 0.65, 0.6, A, 0, true)
      i2.doc(0.5, -0.6, 0, 0.65, 0.6, A, 0, true)
      i2.doc(-0.35, 0.3, 0, 0.65, 0.6, A, 0, true)
      const i3 = c.iso(570, 122, 26)
      i3.tile(-1.5, -1.5, 3, 3)
      i3.panel(-1.1, -0.9, 2, 1.6, M, bandTitle('Jira'), 1)
      const i4 = c.iso(570, 122, 26)
      i4.person(1, 0.9, M, '')
      c.badge(588.3, 113.7, A, '', { r: 8, mark: 'check', k: 1 })
      c.arrow(200, 128, 282, 128, A)
      c.arrow(420, 128, 502, 128, A)
      c.step(130, 192, 1, l('Один сервер на чтение', 'One read-only server'))
      c.step(350, 192, 2, l('5 запросов с проверкой руками', '5 queries checked by hand'))
      c.step(570, 192, 3, l('Запись с подтверждением', 'Write with confirmation'))
    },
  },
  // Три кейса: баг на стенде, отчёт из базы, разбор инцидента через Sentry и Grafana
  'three-cases': {
    ru: 'Три кейса: воспроизведение бага на стенде, аналитический отчёт из базы, расследование инцидента через Sentry и Grafana',
    en: 'Three cases: reproducing a bug on a stand, an analytical report from a database, an incident investigation through Sentry and Grafana',
    viewBox: [0, 0, 700, 212],
    draw: (c, l) => {
      const i1 = c.iso(130, 120, 26)
      i1.tile(-1.6, -1.6, 3.2, 3.2)
      i1.panel(-1.2, -0.8, 1.8, 1.5, M, bandTitle(l('стенд', 'stand'), 6.5), 1)
      c.bug(134.5, 138.4)
      const i2 = c.iso(350, 120, 26)
      i2.tile(-1.6, -1.6, 3.2, 3.2)
      i2.cyl(-0.7, 0.1, 0, 0.5, 0.8, M)
      i2.doc(0, -0.6, 0, 1, 1, M, 3, A)
      const i3 = c.iso(570, 120, 26)
      i3.tile(-1.6, -1.6, 3.2, 3.2)
      i3.panel(-1.4, -0.9, 1.3, 1.4, M, undefined, 1)
      c.text(569.8, 48.2, 'Sentry', M, { size: 10, w: 700 })
      const i4 = c.iso(570, 120, 26)
      i4.panel(0.1, -0.9, 1.3, 1.4, M, undefined, 1)
      c.text(603.5, 67.7, 'Grafana', M, { size: 10, w: 700 })
      // Подписи — ссылки на посты про каждый кейс
      const cases: [number, string, string][] = [
        [130, '/blog/bug-report-to-reproduction-agent/', l('QA: воспроизвести баг →', 'QA: reproduce a bug →')],
        [350, '/blog/analytics-reports-agent/', l('Отчёты: данные из базы →', 'Reports: data from a database →')],
        [570, '/blog/incident-investigation-agent/', l('Инциденты: Sentry и Grafana →', 'Incidents: Sentry and Grafana →')],
      ]
      for (const [x, href, t] of cases) c.link(href, () => c.text(x, 196, t, A, { size: 12, underline: true }))
    },
  },
  // Шкала размера ответа MCP в токенах: до 10 000 — в диалог, 10–25 тысяч — с предупреждением, больше — в файл
  'reply-size-scale': {
    ru: 'Шкала размера ответа в токенах: до 10 000 идёт в диалог, от 10 000 до 25 000 с предупреждением, больше 25 000 сохраняется в файл', en: 'Reply size scale in tokens: up to 10,000 goes into the conversation, 10,000 to 25,000 with a warning, over 25,000 is saved to a file',
    viewBox: [0, 0, 700, 176],
    legend: false,
    draw: (c, l) => {
      c.scale(40, 70, [
        { w: 210, col: A, title: l('До 10 000', 'Up to 10,000'), lines: [l('ответ идёт в диалог', 'the reply goes into the'), l(' как есть', ' conversation as is')], icon: 'chat' },
        { w: 200, col: W, fillOp: 0.22, title: l('10 000 – 25 000', '10,000 – 25,000'), lines: [l('Claude Code предупреждает,', 'Claude Code warns that'), l('что ответ большой', 'the reply is large')], icon: 'warn' },
        { w: 210, col: M, title: l('Больше 25 000', 'Over 25,000'), lines: [l('ответ сохраняется в файл,', 'the reply is saved to a file,'), l('в диалоге только путь к нему', 'the conversation gets only its path')], icon: 'file' },
      ], { ticks: ['10 000', '25 000'], start: '0', unit: l('токенов в ответе', 'tokens in the reply') })
    },
  },
}
export default scenes
