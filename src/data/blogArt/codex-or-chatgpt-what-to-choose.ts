// Схемы поста «Codex или ChatGPT: что выбрать для работы с кодом»
import { type Scene, A, M, W } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Чат: человек переносит руками. Агент: сам открывает проект, правит и проверяет
  'chat-vs-agent': {
    ru: 'Чат и агент. Слева человек вставляет код в чат, получает текст и переносит его в проект руками. Справа агент сам открывает репозиторий, правит файлы, запускает тесты и готовит пулл-реквест',
    en: 'Chat and agent. On the left a person pastes code into a chat, gets text back and carries it into the project by hand. On the right the agent opens the repository itself, edits files, runs the tests and prepares a pull request',
    viewBox: [0, 0, 860, 320],
    draw: (c, l) => {
      c.line([[430, 14], [430, 306]], M, { w: 1.4, op: 0.4 })
      c.caps(215, 26, l('ЧАТ', 'CHAT'), M)
      c.caps(645, 26, l('АГЕНТ', 'AGENT'), A)
      const Y = 120
      // слева
      const p = c.iso(65, Y, 20); p.tile(-1.3, -1.3, 2.6, 2.6); p.panel(-1.0, -0.7, 2.0, 1.6, M, undefined, 3)
      const ch = c.iso(215, Y, 20); ch.tile(-1.3, -1.3, 2.6, 2.6); ch.panel(-1.0, -0.7, 2.0, 1.6, M, undefined, 2); ch.person(0.5, 0.7, M, '')
      const t = c.iso(365, Y, 20); t.tile(-1.3, -1.3, 2.6, 2.6); t.doc(-0.6, -0.5, 0, 1.2, 1.0, M, 3)
      c.arrow(108, Y - 6, 168, Y - 6, M, { w: 2.2 }); c.arrow(262, Y - 6, 322, Y - 6, M, { w: 2.2 })
      c.text(65, 180, l('проект', 'project'), M, { size: 13, w: 800 })
      c.text(215, 180, l('чат', 'chat'), M, { size: 13, w: 800 })
      c.text(365, 180, l('текст', 'text'), M, { size: 13, w: 800 })
      c.text(138, 62, l('вставили', 'pasted'), M, { size: 12, w: 600 })
      c.text(292, 62, l('ответ', 'reply'), M, { size: 12, w: 600 })
      c.arrow(365, 214, 70, 214, W, { w: 2.4, dash: '5 4' })
      c.text(215, 240, l('переносите руками', 'you carry it by hand'), W, { size: 14, w: 800 })
      // справа
      const r = c.iso(520, Y, 20); r.tile(-1.3, -1.3, 2.6, 2.6); r.panel(-1.0, -0.7, 2.0, 1.6, A, undefined, 3); r.agent(0.5, 0.6, A, 0.5, '')
      const ts = c.iso(670, Y, 20); ts.tile(-1.3, -1.3, 2.6, 2.6); ts.doc(-0.6, -0.5, 0, 1.2, 1.0, A, 3, true)
      const pr = c.iso(800, Y, 20); pr.tile(-1.3, -1.3, 2.6, 2.6); pr.doc(-0.6, -0.5, 0, 1.2, 1.0, A, 2); pr.doc(-0.6, -0.5, 0.6, 1.2, 1.0, A, 2, true)
      c.arrow(565, Y - 6, 625, Y - 6, A, { w: 2.2 }); c.arrow(712, Y - 6, 760, Y - 6, A, { w: 2.2 })
      c.text(520, 180, l('открыл и правит', 'opens and edits'), A, { size: 13, w: 800 })
      c.text(670, 180, l('тесты', 'tests'), A, { size: 13, w: 800 })
      c.text(800, 180, l('пулл-реквест', 'pull request'), A, { size: 13, w: 800 })
      c.pill(470, 214, 350, 44, A)
      c.text(645, 242, l('агент делает цепочку сам', 'the agent runs the chain itself'), A, { size: 14, w: 800 })
      c.pill(110, 270, 640, 38, M, { fill: M, fillOp: 0.06 })
      c.text(430, 295, l('один вопрос — чат; правка с проверкой — агент', 'one question — chat; an edit with a check — the agent'), M, { size: 14, w: 700 })
    },
  },
  // Три режима ChatGPT и что каждый выдаёт
  'three-modes': {
    ru: 'Три режима ChatGPT и результат каждого. Chat: текст как ответ на вопрос. Work: готовый результат, документ или таблица. Codex: правки в коде, результат тестов и пулл-реквест',
    en: 'The three ChatGPT modes and what each one returns. Chat: text as an answer to a question. Work: a finished result, a document or a table. Codex: code edits, test results and a pull request',
    viewBox: [0, 0, 860, 330],
    draw: (c, l) => {
      const xs = [10, 297, 584]
      const W3 = 266
      type K = { col: string; n: string; sub: [string, string]; out: [string, string][] }
      const cards: K[] = [
        { col: M, n: 'Chat', sub: ['вопрос и диалог', 'a question and a dialogue'], out: [['текст', 'text']] },
        { col: M, n: 'Work', sub: ['большая задача', 'a larger task'], out: [['документ', 'a document'], ['таблица', 'a table']] },
        { col: A, n: 'Codex', sub: ['разработка', 'development'], out: [['правки в коде', 'code edits'], ['результат тестов', 'test results'], ['пулл-реквест', 'a pull request']] },
      ]
      cards.forEach((k, i) => {
        const x = xs[i], cx = x + W3 / 2
        c.rect(x, 10, W3, 310, { rx: 14, fill: k.col, fillOp: i === 2 ? 0.1 : 0.05, stroke: k.col, sw: i === 2 ? 2.4 : 1.6 })
        c.text(cx, 40, k.n, k.col, { size: 20, w: 900 })
        c.text(cx, 60, l(k.sub[0], k.sub[1]), M, { size: 13, w: 600 })
        const f = c.iso(cx, 138, 22); f.tile(-1.5, -1.5, 3, 3)
        if (i === 0) { f.panel(-1.1, -0.7, 2.2, 1.7, M, undefined, 2); f.person(0.6, 0.8, M, '') }
        if (i === 1) { f.doc(-1.2, -0.9, 0, 1.4, 1.2, M, 3, true); f.box(0.4, -0.2, 0, 0.9, 0.9, 0.5, M) }
        if (i === 2) { f.panel(-1.1, -0.7, 2.2, 1.7, A, undefined, 3); f.agent(0.5, 0.5, A, 0.55, '') }
        c.line([[x + 24, 196], [x + W3 - 24, 196]], k.col, { w: 1, op: 0.5 })
        c.caps(cx, 216, l('НА ВЫХОДЕ', 'OUTPUT'), k.col, { size: 11 })
        k.out.forEach(([r, e], j) => {
          const y = 230 + j * 28
          c.pill(x + 30, y, W3 - 60, 24, k.col, { fill: k.col, fillOp: 0.1 })
          c.text(cx, y + 17, l(r, e), k.col, { size: 13, w: 800 })
        })
      })
    },
  },
  // Где открывается каждый режим
  'where-to-open': {
    ru: 'Где открывается каждый режим. Chat: сайт и мобильное приложение. Work: сайт, где работает в управляемом облаке, и приложение для компьютера. Codex: приложение для компьютера, терминал, расширение для IDE и облако',
    en: 'Where each mode opens. Chat: the website and the mobile app. Work: the website and the desktop app; on the web it runs in a managed cloud. Codex: the desktop app, the terminal, an IDE extension and the cloud',
    viewBox: [0, 0, 860, 360],
    draw: (c, l) => {
      const cols = [{ x: 470, n: 'Chat', col: M }, { x: 600, n: 'Work', col: M }, { x: 730, n: 'Codex', col: A }]
      const rows: [string, string, boolean, boolean, boolean][] = [
        ['Сайт', 'Website', true, true, false],
        ['Мобильное приложение', 'Mobile app', true, false, false],
        ['Приложение для компьютера', 'Desktop app', false, true, true],
        ['Терминал', 'Terminal', false, false, true],
        ['Расширение для IDE', 'IDE extension', false, false, true],
        ['Облако', 'Cloud', false, false, true],
      ]
      cols.forEach((k) => c.text(k.x, 28, k.n, k.col, { size: 18, w: 900 }))
      c.rect(675, 8, 110, 344, { rx: 12, fill: A, fillOp: 0.06 })
      rows.forEach(([r, e, a, b, d], i) => {
        const y = 50 + i * 46
        c.pill(10, y, 380, 38, M)
        c.text(26, y + 25, l(r, e), M, { size: 15, w: 700, anchor: 'start' })
        ;[a, b, d].forEach((ok, j) => {
          const k = cols[j]
          if (ok) c.badge(k.x, y + 19, k.col, '', { r: 11, mark: 'check', k: 1 })
          else c.text(k.x, y + 25, '—', M, { size: 16, w: 700, op: 0.5 })
        })
      })
      c.text(430, 340, l('«—» — в справке не названо', '“—” — not named in the help'), M, { size: 12 })
    },
  },
  // Цикл Codex
  'codex-loop': {
    ru: 'Цикл Codex в пять шагов: читает проект, правит файлы, запускает тесты, показывает дифф, готовит пулл-реквест. Если тесты упали, он возвращается к правке. Инструкции проекта берёт из файла AGENTS.md',
    en: 'The Codex loop in five steps: reads the project, edits files, runs the tests, shows the diff, prepares a pull request. If the tests fail it goes back to editing. It takes project instructions from the AGENTS.md file',
    viewBox: [0, 0, 860, 300],
    draw: (c, l) => {
      const xs = [75, 250, 430, 610, 785]
      const Y = 130
      c.pill(250, 8, 360, 38, A)
      c.text(430, 33, l('AGENTS.md — команды и запреты', 'AGENTS.md — commands and rules'), A, { size: 14, w: 800 })
      c.arrow(150, 46, 90, 84, A, { w: 2, dash: '5 4', op: 0.8 })
      const f1 = c.iso(xs[0], Y, 20); f1.tile(-1.3, -1.3, 2.6, 2.6); f1.panel(-1.0, -0.7, 2.0, 1.6, A, undefined, 3)
      c.badge(xs[0] + 34, Y - 22, A, '', { r: 10, mark: 'check', k: 0.9 })
      const f2 = c.iso(xs[1], Y, 20); f2.tile(-1.3, -1.3, 2.6, 2.6); f2.doc(-0.6, -0.5, 0, 1.2, 1.0, A, 3); f2.agent(0.5, 0.6, A, 0.45, '')
      const f3 = c.iso(xs[2], Y, 20); f3.tile(-1.3, -1.3, 2.6, 2.6); f3.panel(-1.0, -0.7, 2.0, 1.6, A, undefined, 2)
      c.badge(xs[2] + 34, Y - 22, A, '', { r: 10, mark: 'check', k: 0.9 })
      const f4 = c.iso(xs[3], Y, 20); f4.tile(-1.3, -1.3, 2.6, 2.6); f4.doc(-0.6, -0.7, 0, 1.2, 0.8, M, 2); f4.doc(-0.6, 0.1, 0, 1.2, 0.8, A, 2)
      const f5 = c.iso(xs[4], Y, 20); f5.tile(-1.3, -1.3, 2.6, 2.6); f5.doc(-0.6, -0.5, 0, 1.2, 1.0, A, 2); f5.doc(-0.6, -0.5, 0.6, 1.2, 1.0, A, 2, true)
      const t: [string, string][] = [['читает', 'reads'], ['правит', 'edits'], ['тесты', 'tests'], ['дифф', 'diff'], ['пулл-реквест', 'pull request']]
      xs.forEach((x, i) => {
        c.badge(x - 42, 82, A, String(i + 1), { r: 11, size: 13 })
        c.text(x, 190, l(t[i][0], t[i][1]), A, { size: 15, w: 800 })
        if (i < 4) c.arrow(x + 48, Y - 4, xs[i + 1] - 48, Y - 4, M, { w: 2.2 })
      })
      c.arrow(430, 224, 250, 224, W, { w: 2.4, dash: '5 4' })
      c.text(340, 250, l('тесты упали — правка заново', 'tests failed — edit again'), W, { size: 14, w: 800 })
      c.text(700, 250, l('человек смотрит дифф', 'a person reviews the diff'), M, { size: 14, w: 700 })
    },
  },
  // Один тариф — три режима
  'one-subscription': {
    ru: 'Один тариф ChatGPT открывает три режима: Chat, Work и Codex. Work и Codex входят в Free, Go, Plus, Pro, Business, Edu и Enterprise. Лимиты зависят от тарифа, Plus стоит 20 долларов в месяц',
    en: 'One ChatGPT plan opens three modes: Chat, Work and Codex. Work and Codex are included in Free, Go, Plus, Pro, Business, Edu and Enterprise. Limits depend on the plan, Plus costs 20 dollars a month',
    viewBox: [0, 0, 860, 320],
    draw: (c, l) => {
      c.pill(10, 60, 330, 130, M)
      const p = c.iso(80, 145, 20); p.tile(-1.3, -1.3, 2.6, 2.6); p.person(0, 0.3, M, '')
      c.text(215, 98, l('тариф ChatGPT', 'a ChatGPT plan'), M, { size: 16, w: 800 })
      c.text(215, 122, 'Free · Go · Plus', M, { size: 13, w: 600 })
      c.text(215, 142, 'Pro · Business', M, { size: 13, w: 600 })
      c.text(215, 162, 'Edu · Enterprise', M, { size: 13, w: 600 })
      const modes: [string, string, string][] = [['Chat', 'вопрос и диалог', 'a question and a dialogue'], ['Work', 'документ, таблица', 'a document, a table'], ['Codex', 'правки и тесты', 'edits and tests']]
      modes.forEach(([n, r, e], i) => {
        const y = 14 + i * 90
        const col = i === 2 ? A : M
        c.pill(520, y, 330, 72, col)
        c.text(540, y + 32, n, col, { size: 19, w: 900, anchor: 'start' })
        c.text(540, y + 54, l(r, e), M, { size: 13, w: 500, anchor: 'start' })
        c.badge(826, y + 36, col, '', { r: 11, mark: 'check', k: 1 })
        c.curve(342, 125, 518, y + 36, col, { w: 2.4 })
      })
      c.pill(10, 266, 840, 42, A)
      c.text(430, 293, l('лимиты зависят от тарифа · Plus — 20 $ в месяц', 'limits depend on the plan · Plus — $20 a month'), A, { size: 15, w: 800 })
    },
  },
  // Работа по ключу API
  'api-key-mode': {
    ru: 'Работа по ключу API. Оплата идёт по ставкам API. Codex в терминале, в SDK и в IDE работает, облачные функции вроде проверки на GitHub в этот режим не входят',
    en: 'Working with an API key. Billing follows API rates. Codex works in the terminal, the SDK and the IDE; cloud features such as the GitHub check are not part of this mode',
    viewBox: [0, 0, 860, 330],
    draw: (c, l) => {
      c.pill(10, 110, 250, 100, W, { fill: W, fillOp: 0.08 })
      c.key(60, 160, W)
      c.text(160, 150, l('ключ API', 'API key'), W, { size: 17, w: 800 })
      c.text(160, 174, l('оплата по ставкам API', 'billed at API rates'), M, { size: 12, w: 600 })
      const rows: [string, string, boolean][] = [['Терминал (CLI)', 'Terminal (CLI)', true], ['SDK', 'SDK', true], ['IDE', 'IDE', true], ['Облачные функции, проверка на GitHub', 'Cloud features, the GitHub check', false]]
      rows.forEach(([r, e, ok], i) => {
        const y = 14 + i * 78
        const col = ok ? A : W
        c.pill(340, y, 510, 62, col, ok ? undefined : { fill: W, fillOp: 0.1 })
        c.text(364, y + 38, l(r, e), col, { size: 16, w: 800, anchor: 'start' })
        c.badge(822, y + 31, col, '', { r: 12, mark: ok ? 'check' : 'cross', k: 1 })
        c.curve(262, 160, 338, y + 31, col, { w: 2.2 })
      })
      c.text(550, 326, l('облако работает через вход ChatGPT', 'the cloud runs through ChatGPT sign-in'), M, { size: 12 })
    },
  },
  // Дерево выбора
  'pick-tree': {
    ru: 'Дерево выбора. Понять чужой фрагмент или ошибку из лога: ChatGPT Chat. Письмо, ТЗ, сводка или презентация: ChatGPT Work. Правка репозитория с тестами и пулл-реквестом: Codex. Нужны другая модель или работа в редакторе: Claude Code или Cursor',
    en: 'The choice tree. Understanding someone’s snippet or a log error: ChatGPT Chat. A letter, a spec, a summary or a deck: ChatGPT Work. A repository edit with tests and a pull request: Codex. A different model or editor work needed: Claude Code or Cursor',
    viewBox: [0, 0, 860, 360],
    draw: (c, l) => {
      const p = c.iso(60, 215, 22); p.tile(-1.3, -1.3, 2.6, 2.6); p.person(0, 0.2, M, '')
      c.text(60, 262, l('задача', 'a task'), M, { size: 14, w: 800 })
      const rows: { q: [string, string]; a: string; col: string }[] = [
        { q: ['понять фрагмент или ошибку', 'understand a snippet or an error'], a: 'Chat', col: M },
        { q: ['письмо, ТЗ, сводка, презентация', 'a letter, a spec, a summary, a deck'], a: 'Work', col: M },
        { q: ['правка репозитория с тестами', 'a repository edit with tests'], a: 'Codex', col: A },
        { q: ['другая модель или редактор', 'another model or an editor'], a: 'Claude Code · Cursor', col: M },
      ]
      rows.forEach((r, i) => {
        const y = 12 + i * 86
        c.curve(100, 200, 138, y + 34, r.col, { w: 2.2 })
        c.pill(140, y, 360, 68, r.col)
        c.text(158, y + 40, l(r.q[0], r.q[1]), r.col, { size: 15, w: 700, anchor: 'start' })
        c.arrow(504, y + 34, 556, y + 34, r.col, { w: 2.4 })
        c.pill(560, y, 290, 68, r.col, r.col === A ? { fill: A, fillOp: 0.14 } : undefined)
        c.text(705, y + 42, r.a, r.col, { size: 20, w: 900 })
      })
    },
  },
  // Лестница старта
  'start-ladder': {
    ru: 'Лестница старта в три ступени. Первая: читать и запускать тесты, ничего не меняя. Вторая: одна правка в одном месте. Третья: пулл-реквест из готовых изменений',
    en: 'The start ladder in three steps. First: read and run the tests without changing anything. Second: one edit in one place. Third: a pull request from the finished changes',
    viewBox: [0, 0, 860, 330],
    draw: (c, l) => {
      const base = 280
      const bars: [number, number, string, string, string, string][] = [
        [30, 100, 'читать и запускать', 'read and run', 'ничего не меняется', 'nothing changes'],
        [310, 160, 'одна правка', 'one edit', 'одно место, тесты после', 'one place, tests after'],
        [590, 220, 'пулл-реквест', 'pull request', 'что изменено, как проверить', 'what changed, how to check'],
      ]
      bars.forEach(([x, h, r1, e1, r2, e2], i) => {
        c.rect(x, base - h, 240, h, { rx: 10, fill: A, fillOp: 0.08 + i * 0.05, stroke: A, sw: 2 })
        c.badge(x + 28, base - h + 28, A, String(i + 1), { r: 14, size: 16 })
        c.text(x + 52, base - h + 34, l(r1, e1), A, { size: 16, w: 800, anchor: 'start' })
        c.text(x + 120, base - 18, l(r2, e2), M, { size: 12, w: 600 })
      })
      c.arrow(270, base - 118, 306, base - 150, A, { w: 2.2 })
      c.arrow(550, base - 178, 586, base - 210, A, { w: 2.2 })
      c.pill(30, 292, 800, 34, M, { fill: M, fillOp: 0.06 })
      c.text(430, 315, l('правки — только после того, как тесты запускаются', 'edits only once the tests run'), M, { size: 13, w: 700 })
    },
  },
}
export default scenes
