// Схемы поста «Чем ИИ-агент отличается от ассистента, чата, чат-бота и нейросети» / «AI agent = LLM + harness»
import { type Scene, A, M, W } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Формула: модель (серый куб) + харнесс (инструменты, контекст, проверки, правила вокруг пустого места) = агент
  formula: {
    ru: 'Формула агента. Слева нейросеть: серый куб, она только пишет текст. В середине харнесс: ящик с инструментами, лоток с контекстом, планшет с проверками и табличка с правилами вокруг пустого места для модели. Справа агент: тот же харнесс, а в центре синий агент',
    en: 'The agent formula. Left: the LLM, a grey cube that only writes text. Middle: the harness, a toolbox, a context tray, a checks clipboard and a rules sign around an empty spot for the model. Right: the agent, the same harness with a blue agent in the centre',
    viewBox: [0, 0, 700, 248],
    draw: (c, l) => {
      const G = (slug: string) => l(`/materials/glossary/${slug}/`, `/en/materials/glossary/${slug}/`)
      const Y = 112, U = 30
      // Площадка харнесса: пол — ссылка на целое, каждый предмет — ссылка на свой термин (рисуем от дальних к ближним)
      const ring = (x: number, whole: string, center: () => void, mid?: () => void) => {
        c.link(whole, () => { const I = c.iso(x, Y, U); I.tile(-1.8, -1.8, 3.6, 3.6); center() })
        c.link(G('tool'), () => c.iso(x, Y, U).toolbox(-1.15, -1.15, 0.75, A))
        c.link(G('context'), () => c.iso(x, Y, U).tray(1.15, -1.15, 0.75, A))
        c.link(G('checks'), () => c.iso(x, Y, U).clipboard(-1.15, 1.15, 0.75, A))
        if (mid) c.link(whole, mid)
        c.link(G('claude-md'), () => c.iso(x, Y, U).sign(1.15, 1.15, 0.75, A, l('Правила', 'Rules')))
      }
      // Подзаголовок из слов-ссылок: ширина слова оценивается по числу букв
      const words = (cx: number, y: number, items: [string, string][]) => {
        // Слово ставим по центру его оценочной ширины, точку — посередине промежутка, чтобы ошибка оценки не съедала разделитель
        const cw = 7.2, gap = 18, wd = items.map(([t]) => t.length * cw)
        let x = cx - (wd.reduce((n, w) => n + w, 0) + gap * (items.length - 1)) / 2
        items.forEach(([t, slug], i) => {
          if (i) { c.text(x + gap / 2, y, '·', M, { size: 12.5, w: 700 }); x += gap }
          c.link(G(slug), () => c.text(x + wd[i] / 2, y, t, M, { size: 12.5, w: 500, underline: true }))
          x += wd[i]
        })
      }
      // Нейросеть
      c.link(G('llm'), () => {
        const m = c.iso(105, Y, U)
        m.tile(-1.8, -1.8, 3.6, 3.6)
        m.box(-0.65, -0.65, 0, 1.3, 1.3, 1.3, M)
        m.text(0, 0, 'LLM', '#fff', { gz: 1.3, size: 15, w: 800, dy: 5 })
        c.text(105, 200, l('Нейросеть (LLM)', 'LLM'), M, { size: 15, w: 800, underline: true })
      })
      c.text(105, 220, l('Пишет текст', 'Writes text'), M, { size: 12.5, w: 500 })
      // Харнесс: пустое место для модели в центре
      ring(350, G('harness'), () => { const h = c.iso(350, Y, U); h.zone(-0.5, -0.5, 1, 1, M, { op: 0.12 }); h.text(0, 0, '?', M, { size: 16, w: 800, dy: 5 }) })
      c.link(G('harness'), () => c.text(350, 200, l('Харнесс', 'Harness'), A, { size: 15, w: 800, underline: true }))
      words(350, 220, [[l('Инструменты', 'Tools'), 'tool'], [l('Контекст', 'Context'), 'context']])
      words(350, 238, [[l('Правила', 'Rules'), 'claude-md'], [l('Проверки', 'Checks'), 'checks']])
      // Агент
      ring(595, G('ai-agent'), () => {}, () => c.iso(595, Y, U).agent(-0.5, -0.5, A, 1.05, ''))
      c.link(G('ai-agent'), () => c.text(595, 200, l('ИИ-агент', 'AI agent'), A, { size: 15, w: 800, underline: true }))
      c.text(595, 220, l('Доводит задачу до результата', 'Drives the task to a result'), M, { size: 12.5, w: 500 })
      c.text(227, 124, '+', M, { size: 36, w: 800 })
      c.text(472, 124, '=', M, { size: 36, w: 800 })
    },
  },
  // Агентный цикл: цель → шаг → действие → проверка; при ошибке снова к шагу, при успехе результат
  loop: {
    ru: 'Агентный цикл на одной площадке. Цель (задача) идёт к агенту, агент выбирает шаг, инструмент выполняет действие, проверка смотрит результат. Если проверка не прошла, оранжевая стрелка ведёт обратно к агенту. Если прошла, получается результат',
    en: 'The agent loop on one platform. The goal (task) goes to the agent, the agent picks a step, a tool performs the action, a check looks at the result. If the check fails, an orange arrow leads back to the agent. If it passes, you get the result',
    viewBox: [0, 24, 700, 238],
    draw: (c, l) => {
      const G = (slug: string) => l(`/materials/glossary/${slug}/`, `/en/materials/glossary/${slug}/`)
      // Цель и результат — на своих площадках снаружи, внутри большой площадки только цикл
      const g = c.iso(95, 140, 20); g.tile(-1.4, -1.4, 2.8, 2.8); g.doc(-0.6, -0.45, 0, 1.2, 0.9, M, 3)
      const r = c.iso(615, 140, 20); r.tile(-1.4, -1.4, 2.8, 2.8); r.doc(-0.6, -0.45, 0, 1.2, 0.9, A, 2, true)
      const I = c.iso(350, 140, 26)
      I.tile(-2.6, -2.6, 5.2, 5.2)
      I.path([[-1, -2.2], [1, -2.2]], A, { w: 2.6, arrow: true })
      I.path([[2.2, -1], [2.2, 1]], A, { w: 2.6, arrow: true })
      I.path([[1, 2.2], [-2.2, 2.2], [-2.2, -1]], W, { w: 2.4, dash: '6 5', arrow: true })
      c.link(G('ai-agent'), () => c.iso(350, 140, 26).agent(-2.35, -2.35, A, 0.95, ''))
      c.link(G('tool'), () => c.iso(350, 140, 26).toolbox(1.9, -1.9, 0.95, A))
      c.link(G('checks'), () => c.iso(350, 140, 26).clipboard(1.9, 1.9, 0.95, A))
      c.arrow(140, 124, 318, 86, M, { w: 2.4 })
      c.arrow(372, 200, 566, 156, A, { w: 2.4 })
      c.text(95, 192, l('1 · цель', '1 · goal'), M, { size: 13, w: 800 })
      c.text(350, 48, l('2 · шаг', '2 · step'), A, { size: 13, w: 800 })
      c.text(452, 104, l('3 · действие', '3 · action'), A, { size: 13, w: 800, anchor: 'start' })
      c.text(350, 236, l('4 · проверка', '4 · check'), A, { size: 13, w: 800 })
      c.text(228, 204, l('Ошибка → снова', 'Failed → again'), W, { size: 12.5, w: 800 })
      c.text(478, 202, l('Готово', 'Done'), A, { size: 12.5, w: 800 })
      c.text(615, 192, l('Результат', 'Result'), A, { size: 13, w: 800 })
    },
  },
  // Одна задача «почини падающий тест»: что каждый видит из проекта. Сверху пять частей проекта, под ними полосы обзора
  example: {
    ru: 'Сверху пять частей проекта: ваш текст с задачей, текст теста и ошибки, который вы копируете сами, приложение, файлы проекта, терминал с запуском тестов. Под ними полосы: что видит каждый, что вы получите и что останется сделать вам. Нейросеть — только ваш текст. Чат — текст и то, что вы вставили. Чат-бот ничего из проекта не видит: полосы нет, он отвечает по своему сценарию. Ассистент — ваш текст и приложение, куда он встроен: например, документ в Word. ИИ-агент — весь проект',
    en: 'On top, five parts of the project: your text with the task, the test and error text you copy yourself, an app, the project files, the terminal that runs the tests. Below, bars show what each one sees, what you get and what is left for you. The LLM: only your text. The chat: your text and what you pasted. The chatbot sees nothing of the project: no bar, it answers from its own script. The assistant: your text and the app it lives in, such as a Word document. The AI agent: the whole project',
    viewBox: [0, 0, 700, 404],
    draw: (c, l) => {
      const G = (slug: string) => l(`/materials/glossary/${slug}/`, `/en/materials/glossary/${slug}/`)
      const X = [232, 326, 420, 514, 608], half = 44
      const parts = [l('Ваш текст', 'Your text'), l('Тест и ошибка', 'Test and error'), l('Приложение', 'An app'), l('Файлы', 'Files'), l('Терминал', 'Terminal')]
      c.caps(420, 18, l('ПРОЕКТ', 'PROJECT'), M, { size: 10.5 })
      X.forEach((x, j) => {
        const I = c.iso(x, 66, 13)
        I.tile(-1.5, -1.5, 3, 3)
        if (j === 0) I.doc(-0.6, -0.45, 0, 1.2, 0.9, M, 2)
        if (j === 1) { I.doc(-0.6, -0.45, 0, 1.2, 0.9, M, 3); const [ax, ay] = I.p(0.45, 0.35, 0.6); c.alert(ax, ay, W, 7) }
        if (j === 2) I.panel(-0.8, -0.3, 1.6, 1.9, M, '', 1)
        if (j === 3) I.cabinet(0, 0, 1.3, M)
        if (j === 4) I.monitor(0, 0, 1.3, M)
        c.text(x, 110, parts[j], M, { size: 11.5, w: 700 })
      })
      // Полосы обзора: [от столбца, до столбца] — непрерывные куски
      // [имя, цвет, что видит, подпись, термин, что делаете вы]
      const rows: [string, string, [number, number][], string, string, string][] = [
        [l('Нейросеть', 'LLM'), M, [[0, 0]], l('Только текст', 'Text only'), 'llm', l('всё сами', 'all by you')],
        [l('Чат', 'Chat'), M, [[0, 1]], l('Что вставили', 'What you pasted'), '', l('копировать и запускать', 'copy and run')],
        [l('Чат-бот', 'Chatbot'), M, [], '', '', l('через оператора', 'via an operator')],
        [l('Ассистент', 'Assistant'), M, [[0, 0], [2, 2]], l('+ его приложение', '+ its app'), '', l('командовать шагами', 'command each step')],
        [l('ИИ-агент', 'AI agent'), A, [[0, 4]], l('Весь проект', 'The whole project'), 'ai-agent', l('проверить результат', 'review the result')],
      ]
      c.caps(420, 138, l('ЧТО ВИДИТ', 'WHAT IT SEES'), M, { size: 10 })
      rows.forEach(([name, col, spans, note, slug, you], i) => {
        const y = 170 + i * 48
        const label = () => c.text(24, y + 1, name, col, { size: 13.5, w: 800, anchor: 'start', underline: !!slug })
        if (slug) c.link(G(slug), label); else label()
        c.text(24, y + 18, l('Вам: ', 'You: ') + you, col === A ? A : M, { size: 10.5, w: 600, anchor: 'start', op: col === A ? 1 : 0.85 })
        c.line([[20, y + 32], [680, y + 32]], M, { w: 1, op: 0.15 })
        if (spans.length) X.forEach((x) => c.line([[x, y - 12], [x, y + 12]], M, { w: 1, op: 0.18, dash: '2 4' }))
        // Ничего из проекта не видит: без полосы, одна подпись в начале строки
        if (!spans.length) c.text(X[0] - half + 4, y + 5, l('Проекта не видит — отвечает по своему сценарию', 'Sees no project — answers from its own script'), M, { size: 11.5, w: 700, anchor: 'start' })
        spans.forEach(([a, b], k) => {
          c.rect(X[a] - half + 4, y - 10, X[b] - X[a] + 2 * half - 8, 20, { rx: 10, fill: col, fillOp: col === A ? 0.85 : 0.45 })
          if (k === spans.length - 1 && note) {
            if (b === 4) c.text((X[a] + X[b]) / 2, y + 5, note, '#fff', { size: 12, w: 800 })
            else c.text(X[b] + half + 6, y + 5, note, col, { size: 11.5, w: 700, anchor: 'start' })
          }
        })
      })
    },
  },
  // Пять задач — пять инструментов: чат, чат-бот, ассистент, агент, агент с подтверждением человека
  choose: {
    ru: 'Пять задач и что взять. Вопрос или черновик: чат. Типовой вопрос клиента: чат-бот по сценарию. Одно действие: ассистент. Задача в несколько шагов: ИИ-агент с инструментами. Шаги с деньгами и доступами: агент и человек за оранжевым шлагбаумом подтверждения',
    en: 'Five tasks and what to use. A question or a draft: chat. A typical customer question: a scripted chatbot. One action: an assistant. A multi-step task: an AI agent with tools. Steps with money and access: an agent and a person behind an orange approval barrier',
    viewBox: [0, 0, 700, 232],
    draw: (c, l) => {
      const cols: [string, string, string, string][] = [
        [l('Вопрос, черновик', 'Question, draft'), l('Чат', 'Chat'), M, 'chat'],
        [l('Типовой вопрос', 'Typical question'), l('Чат-бот', 'Chatbot'), M, 'bot'],
        [l('Одно действие', 'One action'), l('Ассистент', 'Assistant'), M, 'assistant'],
        [l('Много шагов', 'Many steps'), l('ИИ-агент', 'AI agent'), A, 'agent'],
        [l('Деньги, доступы', 'Money, access'), l('Агент + человек', 'Agent + human'), W, 'approve'],
      ]
      cols.forEach(([task, tool, col, kind], i) => {
        const x = 70 + i * 140
        c.caps(x, 18, task.toUpperCase(), M, { size: 10.5 })
        const I = c.iso(x, 110, 17)
        I.tile(-1.9, -1.9, 3.8, 3.8, kind === 'approve' ? { dash: '5 4', edge: W } : {})
        if (kind === 'chat') { I.panel(-1.1, -0.4, 2.2, 2.4, M, '', 2) }
        if (kind === 'bot') { I.panel(-1.3, -0.9, 1.9, 2.2, M, '', 2); I.doc(0.3, 0.4, 0, 1, 0.8, M, 3) }
        if (kind === 'assistant') { I.panel(-1.3, -1, 1.9, 2.2, M, '', 1); I.person(0.8, 0.8, M, '') }
        if (kind === 'agent') { I.agent(-0.9, -0.9, A, 1, ''); I.toolbox(0.9, -0.5, 0.8, A); I.tray(-0.5, 0.9, 0.8, A); I.clipboard(0.9, 1, 0.8, A) }
        if (kind === 'approve') { I.agent(-1.75, 0.1, A, 0.8, ''); I.barrier(-0.2, -0.4, 1.2, W); I.person(1.4, -1.2, M, '') }
        c.text(x, 204, tool, col === W ? A : col, { size: 14, w: 800 })
        if (kind === 'approve') c.text(x, 222, l('С подтверждением', 'With approval'), W, { size: 11.5, w: 600 })
        if (i) c.line([[x - 70, 40], [x - 70, 214]], M, { w: 1, op: 0.3, dash: '3 5' })
      })
    },
  },
}
export default scenes
