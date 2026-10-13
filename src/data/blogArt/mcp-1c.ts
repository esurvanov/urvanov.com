// Схемы поста «MCP для 1С: как пустить агента к базе и не сломать её»
import { type Scene, A, M, W, bandTitle } from '@/lib/infographic'

// Группа «bk bkN» для схемы с переключателем: рамка-подсветка (видна у выбранного пункта) и содержимое
const hlGroup = (c: Parameters<Scene['draw']>[0], n: number, col: string, x: number, y: number, w: number, h: number, draw: () => void) =>
  c.group(`bk bk${n}`, () => { c.group('hl', () => c.rect(x, y, w, h, { rx: 10, fill: col, fillOp: 0.08, stroke: col, sw: 1.4, dash: '4 3' })); draw() })

const scenes: Record<string, Scene> = {
  // Что даёт MCP-сервер для 1С: код и метаданные, данные базы, справку платформы, проверки; один сервер часто совмещает несколько
  'servers': {
    ru: 'Агент подключается к MCP-серверу для 1С. Сервер даёт код и метаданные конфигурации, данные базы, справку платформы или проверки и тесты. Один сервер часто совмещает несколько',
    en: 'The agent connects to an MCP server for 1C. The server gives configuration code and metadata, database data, platform help or checks and tests. One server often combines several',
    viewBox: [0, 0, 700, 316],
    draw: (c, l) => {
      c.caps(120, 16, l('АГЕНТ', 'AGENT'), A); c.caps(300, 16, l('MCP-СЕРВЕР', 'MCP SERVER'), A); c.caps(590, 16, l('ЧТО ДАЁТ', 'WHAT IT GIVES'), M)
      const i1 = c.iso(120, 156, 28)
      i1.tile(-1.3, -1.3, 2.6, 2.6)
      i1.agent(-0.4, -0.4, A, 1.1, '')
      c.text(120, 220, l('Агент', 'Agent'), A, { size: 12, w: 700 })
      c.cable(166, 150, 250, 150)
      const i2 = c.iso(300, 156, 28)
      i2.tile(-1.2, -1.2, 2.4, 2.4)
      i2.plug(0.1, 0.1, 1.4, A, M)
      c.text(300, 220, l('MCP-сервер', 'MCP server'), A, { size: 12, w: 700 })
      const items: [number, string, string, (I: ReturnType<typeof c.iso>) => void, string][] = [
        [56, l('Код и метаданные', 'Code and metadata'), l('Модули, объекты, формы', 'Modules, objects, forms'), (I) => I.panel(-0.8, -0.7, 1.6, 1.3, M, bandTitle('BSL', 6.5), 1), M],
        [124, l('Данные базы', 'Database data'), l('Запросы и отчёты', 'Queries and reports'), (I) => I.cyl(-0.3, -0.3, 0, 0.6, 0.9, M), M],
        [192, l('Справка платформы', 'Platform help'), l('Методы и синтаксис', 'Methods and syntax'), (I) => I.doc(-0.6, -0.5, 0, 1.2, 1, M, 3), M],
        [260, l('Проверки и тесты', 'Checks and tests'), l('Ошибки, автотесты', 'Errors, autotests'), (I) => I.clipboard(0, 0, 1.2, A), A],
      ]
      for (const [y, name, sub, draw, col] of items) {
        c.curve(344, 150, 470, y, A, { dash: '4 4' })
        const I = c.iso(500, y, 18)
        I.tile(-1.2, -1.2, 2.4, 2.4, { grid: false })
        draw(I)
        c.text(546, y - 2, name, col, { size: 12.5, w: 700, anchor: 'start' })
        c.text(546, y + 14, sub, M, { anchor: 'start' })
      }
      c.text(300, 298, l('Один сервер часто совмещает несколько', 'One server often combines several'), A, { size: 12, w: 700 })
    },
  },
  // Одна сетка клеток для GitLab и 1С: Агент, Копия, Проверка у агента | MCP | Среда, Программа, Проверка в системе.
  // Пустая клетка — пунктирная зона; клетка, которая ломает путь, — оранжевая зона с жуком. Разница — в заполнении клеток и в стрелках
  'pipeline': {
    ru: 'Путь программы по средам: локально, версии, тест, прод. У GitLab агент правит файлы и запускает тесты у себя, git отправляет их в репозиторий с проверкой, а на тесте и проде программа и данные лежат отдельно. У 1С агент правит выгрузку и загружает её в локальную базу, правки уходят в хранилище конфигурации, а на тесте и проде у каждой среды своя база, где программа и данные вместе',
    en: 'The program path across environments: local, versions, test, production. In GitLab the agent edits files and runs tests locally, git sends them to the repository with a check, and on test and production the program and the data are kept apart. In 1C the agent edits the dump and loads it into a local database, changes go to the configuration storage, and on test and production each environment has its own database where program and data live together',
    viewBox: [0, 0, 700, 548],
    draw: (c, l) => {
      // Две колонки (GitLab, 1С) × четыре среды; у 1С программа и данные в одной базе в каждой среде, у GitLab — врозь
      const Y = [88, 212, 336, 460], GX = 231, CX = 600
      const isle = (x: number, y: number) => { const I = c.iso(x, y, 12); I.tile(-1.2, -1.2, 2.4, 2.4); return I }
      const name = (x: number, y: number, t: string, col: string) => c.text(x, y + 36, t, col, { size: 10.5, w: 700 })
      const go = (x1: number, x2: number, y: number) => c.arrow(x1 + 26, y, x2 - 26, y, A, { w: 1.6 })
      const ok = (x: number, y: number) => c.badge(x + 20, y - 22, A, '', { r: 7, mark: 'check' })
      const doc = (x: number, y: number) => isle(x, y).doc(-0.6, -0.5, 0, 1.2, 1, M, 3)
      const data = (x: number, y: number) => isle(x, y).cyl(-0.3, -0.3, 0, 0.6, 0.9, M)
      // Пара «программа + данные»: у 1С в одной рамке «база», у GitLab — отдельно
      const pair = (x: number, y: number, base: boolean) => {
        if (base) { c.rect(x - 72, y - 44, 144, 92, { rx: 8, fill: M, fillOp: 0.05, stroke: M, sw: 1, dash: '3 4' }); c.text(x - 64, y - 32, l('база', 'database'), M, { size: 9.5, w: 800, anchor: 'start' }) }
        doc(x - 35, y); name(x - 35, y, l('Программа', 'Program'), M)
        data(x + 35, y); name(x + 35, y, l('Данные', 'Data'), M)
      }
      c.caps(GX, 20, 'GITLAB', M); c.caps(CX - 60, 20, '1С', M)
      const stages = [l('ЛОКАЛЬНО', 'LOCAL'), l('ВЕРСИИ', 'VERSIONS'), l('ТЕСТ', 'TEST'), l('ПРОД', 'PROD')]
      Y.forEach((y, k) => {
        c.text(10, y + 4, stages[k], k === 0 ? A : M, { size: 10.5, w: 800, anchor: 'start', ls: '.06em' })
        const col = k === 0 ? A : M
        c.rect(84, y - 50, 294, 100, { rx: 10, fill: col, fillOp: 0.05, stroke: col, sw: 1, op: 0.9 })
        c.rect(394, y - 50, 294, 100, { rx: 10, fill: col, fillOp: 0.05, stroke: col, sw: 1, op: 0.9 })
      })
      c.text(92, Y[0] - 38, l('Компьютер агента', 'Agent computer'), A, { size: 9.5, w: 700, anchor: 'start' }); c.text(402, Y[0] - 38, l('Компьютер агента', 'Agent computer'), A, { size: 9.5, w: 700, anchor: 'start' })
      // ── GitLab
      isle(160, Y[0]).agent(-0.35, -0.35, A, 0.8, ''); name(160, Y[0], l('Агент', 'Agent'), A)
      doc(GX, Y[0]); name(GX, Y[0], l('Файлы', 'Files'), M)
      isle(302, Y[0]).clipboard(0, 0, 1, A); ok(302, Y[0]); name(302, Y[0], l('Тесты', 'Tests'), A)
      go(160, GX, Y[0]); go(GX, 302, Y[0])
      doc(GX - 35, Y[1]); name(GX - 35, Y[1], l('Репозиторий', 'Repository'), M)
      isle(GX + 35, Y[1]).clipboard(0, 0, 1, A); ok(GX + 35, Y[1]); name(GX + 35, Y[1], l('Проверка', 'Check'), A)
      pair(GX, Y[2], false); pair(GX, Y[3], false)
      // ── 1С
      isle(425, Y[0]).agent(-0.35, -0.35, A, 0.8, ''); name(425, Y[0], l('Агент', 'Agent'), A)
      doc(490, Y[0]); name(490, Y[0], l('Выгрузка', 'Dump'), M)
      go(425, 490, Y[0]); c.arrow(490 + 26, Y[0], CX - 35 - 26, Y[0], A, { w: 1.6 })
      c.rect(CX - 72, Y[0] - 44, 144, 92, { rx: 8, fill: M, fillOp: 0.05, stroke: M, sw: 1, dash: '3 4' })
      doc(CX - 35, Y[0]); name(CX - 35, Y[0], l('Программа', 'Program'), M); data(CX + 35, Y[0]); name(CX + 35, Y[0], l('Данные', 'Data'), M); ok(CX + 35, Y[0])
      isle(CX, Y[1]).cabinet(0, 0, 1.1, M); name(CX, Y[1], l('Хранилище', 'Storage'), M)
      pair(CX, Y[2], true); pair(CX, Y[3], true)
      // Переходы между средами
      const step = (x: number, k: number, t: string) => { c.arrow(x, Y[k] + 50, x, Y[k + 1] - 50, A, { w: 1.6 }); c.text(x + 8, Y[k] + 66, t, A, { size: 10, w: 700, anchor: 'start' }) }
      step(GX, 0, 'git'); step(GX, 1, l('выкладка', 'deploy')); step(GX, 2, l('выкладка', 'deploy'))
      step(CX, 0, l('в хранилище', 'to storage')); step(CX, 1, l('обновление', 'update')); step(CX, 2, l('обновление', 'update'))
      c.text(350, 540, l('GitLab: программа и данные врозь · 1С: в каждой среде своя база, программа и данные вместе', 'GitLab: program and data apart · 1C: each environment has its own database with program and data together'), A, { size: 12, w: 700 })
    },
  },
  // Где ломается агент в 1С и почему: путь программы по средам и MCP; номера совпадают со строками таблицы
  'breaks': {
    ru: 'Путь программы в 1С: файлы выгрузки, локальная база, хранилище, тестовая база, рабочая база; агент правит файлы, MCP-сервер ведёт его прямо в базу. Где ломается: 1 — агент плохо знает язык 1С; 2 — служебные файлы нельзя править как текст; 3 — формы и отчёты собираются мышкой; 4 — загрузка в базу долгая; 5 — правка уходит в основную конфигурацию мимо расширения; 6 — запись через MCP в рабочую базу мимо хранилища и теста',
    en: 'The 1C program path: dump files, local database, storage, test database, production; the agent edits the files, and an MCP server takes it straight into a database. Where it breaks: 1 — the agent knows the 1C language poorly; 2 — service files cannot be edited as text; 3 — forms and reports are built with the mouse; 4 — loading into the database is slow; 5 — an edit lands in the main configuration instead of an extension; 6 — a write through MCP to production skips storage and test',
    viewBox: [0, 0, 700, 322],
    draw: (c, l) => {
      const X = [60, 215, 345, 470, 610], Y0 = 104, Y1 = 262
      const isle = (x: number, y: number) => { const I = c.iso(x, y, 13); I.tile(-1.2, -1.2, 2.4, 2.4); return I }
      const name = (x: number, y: number, t: string, col: string) => c.text(x, y + 38, t, col, { size: 11, w: 700 })
      const why = (x: number, y: number, t: string) => c.text(x, y + 53, t, W, { size: 10, w: 700 })
      const num = (x: number, y: number, n: number) => c.badge(x, y, W, String(n), { r: 9, size: 11 })
      // Проблема n — группа «bk bkN»: номер, причина и рамка-подсветка; страница гасит невыбранные и показывает рамку у выбранной
      const bk = (n: number, x: number, y: number, w: number, h: number, draw: () => void) => c.group(`bk bk${n}`, () => {
        c.group('hl', () => c.rect(x - w / 2, y, w, h, { rx: 10, fill: W, fillOp: 0.08, stroke: W, sw: 1.4, dash: '4 3' }))
        draw()
      })
      c.caps(335, 20, l('ПУТЬ ПРОГРАММЫ В 1С', '1C PROGRAM PATH'), M)
      // Верхний ряд: среды
      isle(X[0], Y0).doc(-0.6, -0.5, 0, 1.2, 1, M, 3); name(X[0], Y0, l('Файлы', 'Files'), M)
      isle(X[1], Y0).cyl(-0.3, -0.3, 0, 0.6, 0.9, M); name(X[1], Y0, l('Локальная база', 'Local database'), M)
      isle(X[2], Y0).cabinet(0, 0, 1.1, M); name(X[2], Y0, l('Хранилище', 'Storage'), M)
      isle(X[3], Y0).cyl(-0.3, -0.3, 0, 0.6, 0.9, M); name(X[3], Y0, l('Тестовая база', 'Test database'), M)
      const ip = c.iso(X[4], Y0, 13); ip.tile(-1.2, -1.2, 2.4, 2.4); ip.zone(-1.05, -1.05, 2.1, 2.1, W, { op: 0.18 }); ip.cyl(-0.3, -0.3, 0, 0.6, 0.9, M)
      name(X[4], Y0, l('Рабочая база', 'Production'), W)
      for (let k = 0; k < 4; k++) c.arrow(X[k] + 34, Y0, X[k + 1] - 34, Y0, M, { w: 1.6 })
      // Нижний ряд: агент правит файлы, MCP ведёт прямо в базу
      isle(X[0], Y1).agent(-0.35, -0.35, A, 0.8, ''); name(X[0], Y1, l('Агент', 'Agent'), A)
      isle(X[1], Y1).plug(0.1, 0.1, 1.3, A, M); name(X[1], Y1, l('MCP-сервер', 'MCP server'), A)
      c.arrow(X[0] - 24, Y1 - 30, X[0] - 24, Y0 + 62, A, { w: 1.8 })
      c.arrow(X[0] + 34, Y1, X[1] - 34, Y1, A, { w: 1.8 })
      c.arrow(X[1] - 24, Y1 - 30, X[1] - 24, Y0 + 62, A, { w: 1.8 })
      c.line([[X[1] + 34, Y1], [X[3], Y1]], A, { w: 1.8 }); c.arrow(X[3], Y1, X[3], Y0 + 50, A, { w: 1.8 }); c.badge(X[3] + 16, Y0 + 72, A, '', { r: 8, mark: 'check' })
      // Шесть мест поломки
      bk(1, X[0], Y1 - 40, 120, 98, () => { why(X[0], Y1, l('не знает 1С', 'weak at 1C')); num(X[0] + 24, Y1 - 26, 1) })
      bk(2, X[0], Y0 - 40, 116, 104, () => { why(X[0], Y0, l('файлы ≠ база', 'files ≠ database')); num(X[0] + 24, Y0 - 26, 2) })
      bk(3, X[1], Y0 - 40, 120, 104, () => { why(X[1], Y0, l('формы мышкой', 'forms by mouse')); num(X[1] + 24, Y0 - 26, 3) })
      bk(4, (X[0] + X[1]) / 2, Y0 - 32, 70, 48, () => { num((X[0] + X[1]) / 2, Y0, 4); c.text((X[0] + X[1]) / 2, Y0 - 16, l('долго', 'slow'), W, { size: 10, w: 700 }) })
      bk(5, X[2], Y0 - 40, 120, 104, () => { why(X[2], Y0, l('мимо расширения', 'not the extension')); num(X[2] + 24, Y0 - 26, 5) })
      bk(6, X[4], Y0 - 40, 120, 104, () => {
        why(X[4], Y0, l('мимо теста', 'skips the test')); num(X[4] + 24, Y0 - 26, 6)
        c.line([[X[3], Y1], [X[4], Y1]], W, { w: 1.8, dash: '5 4' }); c.arrow(X[4], Y1, X[4], Y0 + 70, W, { w: 1.8, dash: '5 4' })
      })
    },
  },
  // Что ломается на практике: семь случаев из чатов на одной схеме «сотрудник → агент → MCP → базы»; номера совпадают с вкладками
  'cases': {
    ru: 'Сотрудник спрашивает агента, агент ходит к облачной модели и через MCP-сервер к базам 1С и отчитывается. Где случались поломки: 1 — рабочая база; 2 — другие базы на сервере; 3 — общая учётка сервера; 4 — журналы с паролями; 5 — отчёт «готово»; 6 — ответ агента; 7 — облако модели',
    en: 'An employee asks the agent; the agent goes to a cloud model and through an MCP server to 1C databases, then reports back. Where things broke: 1 — production; 2 — other databases on the server; 3 — the shared server account; 4 — logs with passwords; 5 — the done report; 6 — the agent answer; 7 — the model cloud',
    viewBox: [0, 0, 700, 336],
    draw: (c, l) => {
      const Y0 = 76, Y1 = 186, Y2 = 292
      const isle = (x: number, y: number) => { const I = c.iso(x, y, 13); I.tile(-1.2, -1.2, 2.4, 2.4); return I }
      const name = (x: number, y: number, t: string, col: string) => c.text(x, y + 38, t, col, { size: 11, w: 700 })
      const num = (x: number, y: number, n: number) => c.badge(x + 24, y - 26, W, String(n), { r: 9, size: 11 })
      const bk = (n: number, x: number, y: number, draw: () => void, w = 120, h = 92) => c.group(`bk bk${n}`, () => {
        c.group('hl', () => c.rect(x - w / 2, y - 40, w, h, { rx: 10, fill: W, fillOp: 0.08, stroke: W, sw: 1.4, dash: '4 3' }))
        draw()
      })
      // Узлы
      isle(60, Y1).person(0, 0, M, ''); name(60, Y1, l('Сотрудник', 'Employee'), M)
      isle(200, Y1).agent(-0.35, -0.35, A, 0.8, ''); name(200, Y1, l('Агент', 'Agent'), A)
      isle(350, Y1).plug(0.1, 0.1, 1.3, A, M); name(350, Y1, l('MCP-сервер', 'MCP server'), A)
      const ip = c.iso(510, Y1, 13); ip.tile(-1.2, -1.2, 2.4, 2.4); ip.zone(-1.05, -1.05, 2.1, 2.1, W, { op: 0.18 }); ip.cyl(-0.3, -0.3, 0, 0.6, 0.9, M); name(510, Y1, l('Рабочая база', 'Production'), W)
      const ib = isle(640, Y1); ib.cyl(-0.75, -0.2, 0, 0.45, 0.7, M); ib.cyl(-0.1, -0.55, 0, 0.45, 0.7, M); ib.cyl(0.2, 0.25, 0, 0.45, 0.7, M); name(640, Y1, l('Другие базы', 'Other databases'), M)
      // Облако модели: плоское облако из кругов
      for (const [dx, dy, r] of [[-16, 4, 13], [0, -6, 17], [17, 3, 13], [0, 8, 12]] as const) c.circ(200 + dx, Y0 + dy, r, { fill: M, fillOp: 0.85 })
      c.text(200, Y0 - 32, l('Облако модели', 'Model cloud'), M, { size: 11, w: 700 })
      c.key(350, Y0, M); c.text(350, Y0 + 38, l('Учётка сервера', 'Server account'), M, { size: 11, w: 700 })
      isle(490, Y0).tray(0, 0, 1.1, M); name(490, Y0, l('Журналы', 'Logs'), M)
      isle(130, Y2).clipboard(0, 0, 1, A); name(130, Y2, l('«Готово»', '“Done”'), A)
      // Связи
      c.arrow(60 + 32, Y1 - 6, 200 - 32, Y1 - 6, M, { w: 1.6 })
      c.arrow(200, Y1 - 32, 200, Y0 + 26, A, { w: 1.6 }); c.arrow(200 + 12, Y0 + 26, 200 + 12, Y1 - 32, A, { w: 1.6 })
      c.arrow(200 + 32, Y1, 350 - 32, Y1, A, { w: 1.8 })
      c.line([[350, Y1 - 32], [350, Y0 + 50]], M, { w: 1.4, dash: '3 3' })
      c.line([[378, Y1 - 18], [490, Y1 - 18]], A, { w: 1.4 }); c.arrow(490, Y1 - 18, 490, Y0 + 52, A, { w: 1.4 })
      c.arrow(350 + 32, Y1 + 4, 510 - 32, Y1 + 4, A, { w: 1.8 })
      c.line([[350, Y1 + 50], [350, Y1 + 62], [640, Y1 + 62]], A, { w: 1.6 }); c.arrow(640, Y1 + 62, 640, Y1 + 52, A, { w: 1.6 })
      c.line([[200, Y1 + 50], [200, Y2]], A, { w: 1.6 }); c.arrow(200, Y2, 130 + 32, Y2, A, { w: 1.6 })
      c.line([[130 - 32, Y2], [60, Y2]], A, { w: 1.6 }); c.arrow(60, Y2, 60, Y1 + 52, A, { w: 1.6 })
      // Семь случаев
      bk(1, 510, Y1, () => num(510, Y1, 1))
      bk(2, 640, Y1, () => num(640, Y1, 2))
      bk(3, 350, Y0, () => c.badge(350 + 24, Y0 - 16, W, '3', { r: 9, size: 11 }), 120, 84)
      bk(4, 490, Y0, () => num(490, Y0, 4), 110, 84)
      bk(5, 130, Y2, () => num(130, Y2, 5), 110, 84)
      bk(6, 200, Y1, () => num(200, Y1, 6))
      bk(7, 200, Y0 - 12, () => c.badge(200 + 34, Y0 - 8, W, '7', { r: 9, size: 11 }), 120, 76)
    },
  },
  // Безопасная схема: рабочую базу агент только читает, пишет в тестовую, перенос — после проверки человеком
  'safe-scheme': {
    ru: 'Три шага. Чтение: агент читает рабочую базу под своим пользователем, запись в неё закрыта. Запись: агент пишет в тестовую базу. Проверка и перенос: автотесты, человек проверяет, изменения уходят в хранилище, и рабочую базу обновляют из него',
    en: 'Three steps. Read: the agent reads production under its own user; writing to it is closed. Write: the agent writes to a test database. Check and move: autotests run, a person reviews, changes go to the storage, and production is updated from it',
    viewBox: [0, 0, 700, 300],
    draw: (c, l) => {
      const Y0 = 86, Y1 = 228, X = [100, 260, 430, 600]
      const isle = (x: number, y: number) => { const I = c.iso(x, y, 15); I.tile(-1.2, -1.2, 2.4, 2.4); return I }
      const name = (x: number, y: number, t: string, col: string) => c.text(x, y + 42, t, col, { size: 11, w: 700 })
      const num = (x: number, y: number, n: number) => c.badge(x, y, A, String(n), { r: 9, size: 11 })
      isle(350, Y0).agent(-0.35, -0.35, A, 0.8, ''); name(350, Y0, l('Агент', 'Agent'), A)
      // 1. Чтение рабочей базы, запись в неё закрыта
      hlGroup(c, 1, A, 34, Y0 - 52, 280, 120, () => {
        const ip = c.iso(X[0], Y0, 15); ip.tile(-1.2, -1.2, 2.4, 2.4); ip.zone(-1.05, -1.05, 2.1, 2.1, W, { op: 0.14 }); ip.cyl(-0.3, -0.3, 0, 0.6, 0.9, M); name(X[0], Y0, l('Рабочая база', 'Production'), M)
        c.arrow(350 - 38, Y0 - 14, X[0] + 38, Y0 - 14, W, { w: 1.8, dash: '4 4' }); c.badge(225, Y0 - 14, W, '', { r: 9, mark: 'cross' }); c.text(225, Y0 - 32, l('Запись', 'Write'), W, { size: 11, w: 700 })
        c.arrow(X[0] + 38, Y0 + 12, 350 - 38, Y0 + 12, A, { w: 1.8, dash: '4 4' }); c.eye(225, Y0 + 30, A); c.text(225, Y0 + 52, l('Чтение', 'Read'), A, { size: 11, w: 700 })
        num(X[0] - 40, Y0 - 34, 1)
      })
      // 2. Запись в тестовую базу
      hlGroup(c, 2, A, 390, Y0 - 52, 276, 120, () => {
        isle(X[3], Y0).cyl(-0.3, -0.3, 0, 0.6, 0.9, M); name(X[3], Y0, l('Тестовая база', 'Test database'), M)
        c.arrow(350 + 38, Y0, X[3] - 38, Y0, A, { w: 1.8 }); c.badge(475, Y0 + 18, A, '', { r: 9, mark: 'check' }); c.text(475, Y0 - 12, l('Запись', 'Write'), A, { size: 11, w: 700 })
        num(X[3] + 44, Y0 - 34, 2)
      })
      // 3. Автотесты → человек → хранилище → обновление рабочей базы
      hlGroup(c, 3, A, 34, Y1 - 52, 632, 116, () => {
        isle(X[3], Y1).clipboard(0, 0, 1.1, A); c.badge(X[3] + 26, Y1 - 28, A, '', { r: 8, mark: 'check' }); name(X[3], Y1, l('Автотесты', 'Autotests'), A)
        isle(X[2], Y1).person(0, 0, M, ''); c.badge(X[2] + 26, Y1 - 28, A, '', { r: 8, mark: 'check' }); name(X[2], Y1, l('Человек проверяет', 'A person reviews'), M)
        isle(X[1], Y1).cabinet(0, 0, 1.1, M); name(X[1], Y1, l('Хранилище', 'Storage'), M)
        c.arrow(X[3] - 38, Y1, X[2] + 38, Y1, M, { w: 1.8 }); c.arrow(X[2] - 38, Y1, X[1] + 38, Y1, M, { w: 1.8 })
        c.line([[X[1] - 38, Y1], [X[0], Y1]], M, { w: 1.8 }); c.arrow(X[0], Y1, X[0], Y0 + 70, M, { w: 1.8 })
        c.text(X[0] + 10, Y1 - 40, l('обновление', 'update'), M, { size: 11, w: 700, anchor: 'start' })
        num(48, Y1 - 36, 3)
      })
      c.arrow(X[3], Y0 + 52, X[3], Y1 - 34, A, { w: 1.8 })
    },
  },
  // Права: лестница доступа в 1С — четыре ступени, последняя закрыта для агента
  'rights': {
    ru: 'Лестница прав агента в 1С: 1 — чтение кода сразу; 2 — чтение данных на копии базы; 3 — запись в тестовую базу с автотестами; 4 — запись в рабочую базу закрыта для агента, её делает только человек',
    en: 'The agent rights ladder in 1C: 1 — read code right away; 2 — read data on a database copy; 3 — write to a test database with autotests; 4 — writing to production is closed to the agent, only a person does it',
    viewBox: [0, 0, 700, 300],
    draw: (c, l) => {
      const P: [number, number][] = [[150, 216], [290, 174], [430, 132], [580, 90]]
      const isle = (x: number, y: number) => { const I = c.iso(x, y, 15); I.tile(-1.2, -1.2, 2.4, 2.4); return I }
      const name = (x: number, y: number, t: string, col: string) => c.text(x, y + 42, t, col, { size: 11, w: 700 })
      const when = (x: number, y: number, t: string, col: string) => c.text(x, y + 57, t, col, { size: 10, w: 700 })
      isle(40, 248).agent(-0.35, -0.35, A, 0.8, '')
      c.text(40, 248 + 42, l('Агент', 'Agent'), A, { size: 11, w: 700 })
      for (let k = 0; k < 3; k++) c.arrow(P[k][0] + 36, P[k][1] - 6, P[k + 1][0] - 36, P[k + 1][1] + 6, A, { w: 1.6, dash: '4 4' })
      c.arrow(40 + 34, 248 - 8, P[0][0] - 36, P[0][1] + 4, A, { w: 1.6, dash: '4 4' })
      const steps: [string, string, string, string, (I: ReturnType<typeof c.iso>) => void][] = [
        [l('Чтение кода', 'Read code'), l('сразу', 'right away'), A, A, (I) => I.panel(-0.8, -0.7, 1.6, 1.3, M, bandTitle('BSL', 6.5), 1)],
        [l('Чтение данных', 'Read data'), l('на копии базы', 'on a copy'), A, A, (I) => I.cyl(-0.3, -0.3, 0, 0.6, 0.9, M)],
        [l('Запись в тест', 'Write to test'), l('с автотестами', 'with autotests'), A, A, (I) => I.cyl(-0.3, -0.3, 0, 0.6, 0.9, M)],
        [l('Запись в рабочую', 'Write to production'), l('только человек', 'a person only'), W, W, (I) => { I.zone(-1.05, -1.05, 2.1, 2.1, W, { op: 0.18 }); I.cyl(-0.3, -0.3, 0, 0.6, 0.9, M) }],
      ]
      steps.forEach(([t, w, col, wc, draw], k) => {
        const [x, y] = P[k]
        hlGroup(c, k + 1, col, x - 62, y - 50, 124, 118, () => {
          draw(isle(x, y)); name(x, y, t, k === 3 ? W : M); when(x, y, w, wc)
          c.badge(x + 28, y - 30, col, String(k + 1), { r: 9, size: 11 })
          if (k === 1) c.eye(x - 26, y - 26, A)
          if (k === 2) c.pen(x - 26, y - 26, A)
          if (k === 3) c.badge(x - 28, y - 30, W, '', { r: 8, mark: 'cross' })
        })
      })
    },
  },
  // Проверка результата: «готово» агента проходит четыре проверки до результата
  'checks': {
    ru: 'Отчёт агента «готово» проходит четыре проверки: 1 — проверка ошибок среды; 2 — автотесты; 3 — сверка с отчётом 1С; 4 — просмотр изменений человеком. Только после них — результат',
    en: 'The agent “done” passes four checks: 1 — IDE error check; 2 — autotests; 3 — cross-check with a 1C report; 4 — a person reviews the changes. Only then is it a result',
    viewBox: [0, 0, 700, 186],
    draw: (c, l) => {
      const X = [50, 170, 290, 410, 530, 650], Y = 88
      const isle = (x: number, y: number) => { const I = c.iso(x, y, 14); I.tile(-1.2, -1.2, 2.4, 2.4); return I }
      const name = (x: number, t: string, col: string) => c.text(x, Y + 40, t, col, { size: 11, w: 700 })
      isle(X[0], Y).agent(-0.35, -0.35, A, 0.8, ''); name(X[0], l('Агент', 'Agent'), A); c.text(X[0], Y + 55, l('«готово»', '“done”'), M, { size: 10, w: 700 })
      for (let k = 0; k < 5; k++) c.arrow(X[k] + 34, Y, X[k + 1] - 34, Y, A, { w: 1.8 })
      const items: [string, string, (I: ReturnType<typeof c.iso>) => void][] = [
        [l('Ошибки среды', 'IDE errors'), l('синтаксис', 'syntax'), (I) => I.panel(-0.8, -0.7, 1.6, 1.3, M, bandTitle('BSL', 6.5), 1)],
        [l('Автотесты', 'Autotests'), l('сценарий', 'scenario'), (I) => I.clipboard(0, 0, 1.1, A)],
        [l('Сверка с 1С', '1C cross-check'), l('цифры', 'figures'), (I) => I.doc(-0.6, -0.5, 0, 1.2, 1, M, 3)],
        [l('Человек', 'A person'), l('изменения', 'changes'), (I) => I.person(0, 0, M, '')],
      ]
      items.forEach(([t, w, draw], k) => {
        const x = X[k + 1]
        hlGroup(c, k + 1, A, x - 56, Y - 52, 112, 122, () => {
          draw(isle(x, Y)); name(x, t, k === 1 ? A : M); c.text(x, Y + 55, w, M, { size: 10, w: 700 })
          c.badge(x + 26, Y - 30, A, String(k + 1), { r: 9, size: 11 })
        })
      })
      isle(X[5], Y).doc(-0.6, -0.5, 0, 1.2, 1, A, 3); c.badge(X[5] + 26, Y - 30, A, '', { r: 9, mark: 'check' }); name(X[5], l('Результат', 'Result'), A)
    },
  },
  // Где настройка: у каждого агента свой файл настроек, сервер и база одни
  'agents': {
    ru: 'Claude Code, Codex и Cursor подключают один и тот же MCP-сервер для 1С, у каждого свой файл настроек: команда claude mcp add, config.toml и mcp.json',
    en: 'Claude Code, Codex and Cursor connect the same MCP server for 1C; each has its own settings: the claude mcp add command, config.toml and mcp.json',
    viewBox: [0, 0, 700, 270],
    draw: (c, l) => {
      const Y = [56, 134, 212], XS = 470, XB = 620
      const isle = (x: number, y: number) => { const I = c.iso(x, y, 13); I.tile(-1.2, -1.2, 2.4, 2.4); return I }
      const rows: [string, string][] = [['Claude Code', 'claude mcp add'], ['Codex', 'config.toml'], ['Cursor', 'mcp.json']]
      rows.forEach(([a, f], k) => {
        const y = Y[k]
        hlGroup(c, k + 1, A, 22, y - 42, 380, 82, () => {
          isle(70, y).agent(-0.35, -0.35, A, 0.8, ''); c.text(130, y + 4, a, A, { size: 12, w: 800, anchor: 'start' })
          isle(290, y).doc(-0.6, -0.5, 0, 1.2, 1, M, 3); c.text(290, y + 34, f, M, { size: 10.5, w: 700 })
          c.badge(330, y - 24, A, String(k + 1), { r: 9, size: 11 })
          c.line([[290 + 34, y], [XS - 60, y], [XS - 60, Y[1]]], A, { w: 1.6 })
        })
      })
      c.arrow(XS - 60, Y[1], XS - 34, Y[1], A, { w: 1.8 })
      isle(XS, Y[1]).plug(0.1, 0.1, 1.3, A, M); c.text(XS, Y[1] + 40, l('MCP-сервер', 'MCP server'), A, { size: 11, w: 700 })
      c.arrow(XS + 34, Y[1], XB - 34, Y[1], A, { w: 1.8 })
      isle(XB, Y[1]).cyl(-0.3, -0.3, 0, 0.6, 0.9, M); c.text(XB, Y[1] + 40, l('База 1С', '1C database'), M, { size: 11, w: 700 })
    },
  },
  // С чего начать: копия базы и чтение → запись в тестовую → перенос после проверки
  'start-steps': {
    ru: 'Копия базы и MCP только на чтение → Запись в тестовую базу и автотесты → Перенос в рабочую базу после проверки человеком',
    en: 'A database copy and read-only MCP → Writing to a test database with autotests → Moving to production after a person reviews',
    viewBox: [0, 0, 700, 238],
    draw: (c, l) => {
      const i1 = c.iso(130, 122, 26)
      i1.tile(-1.5, -1.5, 3, 3)
      i1.cyl(-0.4, -0.4, 0, 0.8, 1.1, M)
      c.eye(176, 92, A)
      const i2 = c.iso(350, 122, 26)
      i2.tile(-1.5, -1.5, 3, 3)
      i2.cyl(-0.9, -0.2, 0, 0.7, 1, M)
      i2.doc(0.3, -0.9, 0, 0.8, 0.7, A, 2, true)
      const i3 = c.iso(570, 122, 26)
      i3.tile(-1.5, -1.5, 3, 3)
      i3.cyl(-0.9, -0.2, 0, 0.7, 1, M)
      i3.person(0.7, 0.5, M, '')
      c.badge(598, 92, A, '', { r: 8, mark: 'check', k: 1 })
      c.arrow(200, 128, 282, 128, A)
      c.arrow(420, 128, 502, 128, A)
      c.step(130, 192, 1, l('Копия базы, только чтение', 'A copy, read only'))
      c.step(350, 192, 2, l('Запись в тест и автотесты', 'Write to test, autotests'))
      c.step(570, 192, 3, l('Перенос после проверки', 'Move after review'))
    },
  },
}
export default scenes
