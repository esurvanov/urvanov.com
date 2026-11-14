// Схемы поста «Эскалация к человеку в ИИ-агентах». Одна мысль на схему: вопрос к человеку проходит через окно в разделителе;
// метрики по-разному обращаются с вопросом агента; без разрешения агенты спрашивают редко, с разрешением по-разному;
// хук обязателен, текст инструкции только направляет. Один бытовой образ: окно выдачи на проходной.
// Цвета по ролям: серый — люди и данные, синий — агент и программы, оранжевый — стоп, риск и ошибка.
import { type Scene, A, M, W } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Окно в разделителе: агент работает внутри контекста, наружу к человеку выходит только вопрос и три ответа
  window: {
    ru: 'Агент работает внутри своего ограниченного контекста. К человеку за разделителем проходит только вопрос через одно окно. Ответов три: принять, отказать, отменить. Всё остальное, что делает агент, через это окно не видно',
    en: 'The agent works inside its bounded context. Only a question passes through a single window in the separator to the person behind it. There are three answers: accept, decline, cancel. Everything else the agent does is not visible through this window',
    viewBox: [0, 0, 700, 330],
    draw: (c, l) => {
      c.text(350, 24, l('Окно в разделителе: наружу проходит только вопрос', 'A window in the separator: only the question gets out'), M, { size: 13, w: 800 })
      const a = c.iso(120, 190, 26); a.tile(-2, -2, 4, 4, { grid: false }); a.agent(-0.5, 0.3, A, 1.3, ''); a.doc(0.8, -1.0, 0, 1.0, 0.8, A, 3)
      c.text(120, 268, l('агент работает внутри', 'the agent works inside'), A, { size: 12, w: 800 })
      const g = c.iso(330, 190, 26); g.tile(-1.6, -1.6, 3.2, 3.2, { grid: false }); g.barrier(0, 0.2, 2.0, W)
      c.text(330, 268, l('разделитель', 'separator'), W, { size: 12, w: 800 })
      c.arrow(188, 182, 262, 182, A, { w: 2.4 })
      c.text(225, 168, l('вопрос', 'question'), A, { size: 11, w: 700 })
      c.arrow(392, 182, 476, 182, A, { w: 2.4 })
      c.card(480, 62, 200, 66, M, { lines: [{ t: l('принять', 'accept'), dy: 27, size: 13, w: 800 }, { t: l('человек одобрил', 'the person approved'), dy: 47, size: 11, w: 600 }] })
      c.card(480, 148, 200, 66, W, { lines: [{ t: l('отказать', 'decline'), dy: 27, size: 13, w: 800 }, { t: l('человек сказал «нет»', 'the person said “no”'), dy: 47, size: 11, w: 600 }] })
      c.card(480, 234, 200, 66, M, { lines: [{ t: l('отменить', 'cancel'), dy: 27, size: 13, w: 800 }, { t: l('закрыл, не выбрав', 'closed without choosing'), dy: 47, size: 11, w: 600 }] })
      c.icon(458, 118, 'user', M, { k: 1.1 })
    },
  },
  // Как метрики обращаются с вопросом к человеку
  metrics: {
    ru: 'Как метрики обращаются с вопросом агента к человеку: в SWE-bench, OSWorld, Terminal-Bench, GAIA, Cybench и в горизонте METR канала к человеку нет; в tau-bench перевод на человека нейтрален; в HiL-Bench вопрос награждается, молчаливая догадка наказывается; в метрике Anthropic остановка агента считается формой надзора',
    en: 'How metrics treat an agent’s question to a person: SWE-bench, OSWorld, Terminal-Bench, GAIA, Cybench and the METR horizon have no channel to a person; tau-bench is neutral about a handoff; HiL-Bench rewards a question and punishes a silent guess; Anthropic’s metrics call an agent-initiated stop a form of oversight',
    viewBox: [0, 0, 700, 330],
    draw: (c, l) => {
      c.text(350, 24, l('Что метрика делает с вопросом к человеку', 'What a metric does with a question to a person'), M, { size: 13, w: 800 })
      const rows: [number, string, string, string, string, string][] = [
        [60, 'SWE-bench, OSWorld, Terminal-Bench, GAIA, Cybench, METR', 'SWE-bench, OSWorld, Terminal-Bench, GAIA, Cybench, METR', 'канала к человеку нет', 'there is no channel to a person', M],
        [118, 'tau-bench', 'tau-bench', 'перевод на человека нейтрален', 'a handoff is neutral', M],
        [176, 'HiL-Bench (Scale AI)', 'HiL-Bench (Scale AI)', 'вопрос награждается, догадка наказывается', 'a question is rewarded, a guess is punished', A],
        [234, 'Anthropic: автономия в проде', 'Anthropic: autonomy in production', 'остановка агента — форма надзора', 'an agent-initiated stop is a form of oversight', A],
      ]
      for (const [y, ru, en, rr, re, col] of rows) {
        c.rect(30, y - 20, 640, 46, { rx: 8, fill: col, fillOp: 0.1 })
        c.text(46, y + 2, l(ru, en), M, { size: 12, w: 800, anchor: 'start' })
        c.text(46, y + 19, l(rr, re), col, { size: 12, w: 700, anchor: 'start' })
      }
      c.text(350, 300, l('Нигде не найдено: «вопрос к человеку считается потерей»', 'Not found anywhere: “asking a person counts as a loss”'), W, { size: 12, w: 800 })
    },
  },
  // Доля сессий, где агент задал вопрос (Ask Early, Ask Late, Ask Right, arXiv 2605.07937)
  'ask-rate': {
    ru: 'Доля сессий, где агент задал вопрос о цели задачи: Gemini 3 Flash 0%, Sonnet 4.5 23%, GPT-5.2 52%. Одно исследование, одни условия',
    en: 'Share of sessions where the agent asked a question about the goal: Gemini 3 Flash 0%, Sonnet 4.5 23%, GPT-5.2 52%. One study, one setup',
    viewBox: [0, 0, 700, 250],
    draw: (c, l) => {
      c.text(350, 24, l('Доля сессий с вопросом к человеку', 'Share of sessions with a question to a person'), M, { size: 13, w: 800 })
      const X0 = 230, k = 7
      const rows: [number, string, number, string][] = [
        [70, 'Gemini 3 Flash', 0, M],
        [120, 'Sonnet 4.5', 23, A],
        [170, 'GPT-5.2', 52, A],
      ]
      for (const [y, name, v, col] of rows) {
        c.text(X0 - 12, y + 5, name, M, { size: 12, w: 700, anchor: 'end' })
        if (v > 0) c.rect(X0, y - 13, v * k, 28, { rx: 6, fill: col, fillOp: 1 })
        c.text(X0 + v * k + 10, y + 5, v + '%', col, { size: 13, w: 800, anchor: 'start' })
      }
      c.text(350, 228, l('arXiv 2605.07937: ни одна модель не спрашивает в лучшее окно, около 10% выполнения', 'arXiv 2605.07937: no model asks in the best window, about 10% into the run'), M, { size: 10.5, w: 600 })
    },
  },
  // Текст инструкции против хука: что обязательно
  'hook-vs-text': {
    ru: 'Правило в тексте инструкции направляет агента, но не меняет того, что разрешает Claude Code. Хук и правила разрешений исполняет программа, а не модель. Вопрос человеку нельзя одобрить за него ни в одном режиме, даже без подтверждений',
    en: 'A rule in the instruction text guides the agent but does not change what Claude Code allows. A hook and permission rules are enforced by the program, not by the model. A question to a person cannot be approved on their behalf in any mode, even with no prompts',
    viewBox: [0, 0, 700, 270],
    draw: (c, l) => {
      c.text(350, 24, l('Кто исполняет правило', 'Who enforces the rule'), M, { size: 13, w: 800 })
      c.card(30, 52, 305, 150, W, { lines: [
        { t: l('Текст в CLAUDE.md', 'Text in CLAUDE.md'), dy: 34, size: 14, w: 800 },
        { t: l('направляет, что агент попробует', 'guides what the agent tries'), dy: 66, size: 12, w: 600 },
        { t: l('агент может не выполнить', 'the agent may not follow it'), dy: 92, size: 12, w: 700 },
      ] })
      c.card(365, 52, 305, 150, A, { lines: [
        { t: l('Хук и правила разрешений', 'Hook and permission rules'), dy: 34, size: 14, w: 800 },
        { t: l('исполняет программа, не модель', 'enforced by the program, not the model'), dy: 66, size: 12, w: 600 },
        { t: l('allow · deny · ask', 'allow · deny · ask'), dy: 92, size: 12, w: 700 },
      ] })
      c.text(350, 234, l('AskUserQuestion не одобряется автоматически ни в одном режиме', 'AskUserQuestion is not auto-approved in any mode'), M, { size: 12, w: 700 })
    },
  },

  // Вердикты по четырём тезисам
  'thesis-check': {
    ru: 'Четыре тезиса и вердикт: гейт вне контекста агента подтверждён; обучение на автономность подтверждено частично; «вопрос к человеку для метрик потеря» не подтверждён; «MCP узкое горлышко» подтверждено по смыслу, но цитаты нет',
    en: 'Four claims and the verdict: a gate outside the agent’s context is confirmed; training for autonomy is partly confirmed; “a question to a person is a loss for metrics” is not confirmed; “MCP is a bottleneck” is confirmed in meaning but has no quote',
    viewBox: [0, 0, 700, 300],
    draw: (c, l) => {
      c.text(350, 24, l('Что сказали первоисточники', 'What the primary sources said'), M, { size: 13, w: 800 })
      const rows: [number, string, string, string, string, string][] = [
        [54, 'Гейт вне контекста агента', 'A gate outside the agent’s context', 'подтверждён', 'confirmed', A],
        [112, 'Обучают на автономность', 'Training for autonomy', 'частично', 'partly', M],
        [170, 'Вопрос к человеку — потеря для метрики', 'A question is a loss for a metric', 'не подтверждён', 'not confirmed', W],
        [228, 'MCP — узкое горлышко', 'MCP is a bottleneck', 'по смыслу, без цитаты', 'in meaning, no quote', M],
      ]
      for (const [y, ru, en, vr, ve, col] of rows) {
        c.rect(30, y - 20, 640, 46, { rx: 8, fill: col, fillOp: 0.1 })
        c.text(46, y + 8, l(ru, en), M, { size: 13, w: 800, anchor: 'start' })
        c.text(654, y + 8, l(vr, ve), col, { size: 13, w: 800, anchor: 'end' })
      }
    },
  },
  // Горизонт METR: 50% и 80%
  horizon: {
    ru: 'Горизонт задач METR у лучшей общей модели: 16–20 часов при 50% успеха и 3–4 часа при 80% успеха (отчёт 19 мая 2026)',
    en: 'METR task horizon of the best shared model: 16–20 hours at 50% success and 3–4 hours at 80% success (report of 19 May 2026)',
    viewBox: [0, 0, 700, 220],
    draw: (c, l) => {
      c.text(350, 24, l('Горизонт METR: часы задачи, не часы самостоятельной работы', 'METR horizon: task hours, not hours of independent work'), M, { size: 13, w: 800 })
      const X0 = 190, k = 20
      const rows: [number, string, string, number, number, string][] = [
        [80, 'успех 50%', 'success 50%', 16, 20, A],
        [140, 'успех 80%', 'success 80%', 3, 4, W],
      ]
      for (const [y, ru, en, lo, hi, col] of rows) {
        c.text(X0 - 12, y + 5, l(ru, en), M, { size: 12, w: 700, anchor: 'end' })
        c.rect(X0, y - 13, hi * k, 28, { rx: 6, fill: col, fillOp: 0.25 })
        c.rect(X0 + lo * k, y - 13, (hi - lo) * k, 28, { rx: 4, fill: col, fillOp: 1 })
        c.text(X0 + hi * k + 10, y + 5, l(`${lo}–${hi} ч`, `${lo}–${hi} h`), col, { size: 13, w: 800, anchor: 'start' })
      }
      c.text(350, 196, l('Задач с обращением к человеку в наборе нет', 'The set has no tasks involving a person'), M, { size: 11, w: 600 })
    },
  },
  // HiL-Bench: с вопросом и без
  'hil-bench': {
    ru: 'HiL-Bench: лучшие модели решают от 67 до 91% задач при полной информации и от 1 до 39%, когда недостающее надо выяснить, задав вопрос человеку',
    en: 'HiL-Bench: the best models solve 67 to 91% of tasks with full information and 1 to 39% when the missing part must be found by asking a person',
    viewBox: [0, 0, 700, 220],
    draw: (c, l) => {
      c.text(350, 24, l('HiL-Bench: доля решённых задач', 'HiL-Bench: share of solved tasks'), M, { size: 13, w: 800 })
      const X0 = 250, k = 4
      const rows: [number, string, string, number, number, string][] = [
        [80, 'полная информация', 'full information', 67, 91, A],
        [140, 'надо спросить человека', 'a person must be asked', 1, 39, W],
      ]
      for (const [y, ru, en, lo, hi, col] of rows) {
        c.text(X0 - 12, y + 5, l(ru, en), M, { size: 12, w: 700, anchor: 'end' })
        c.rect(X0, y - 13, hi * k, 28, { rx: 6, fill: col, fillOp: 0.25 })
        c.rect(X0 + lo * k, y - 13, Math.max((hi - lo) * k, 6), 28, { rx: 4, fill: col, fillOp: 1 })
        c.text(X0 + hi * k + 10, y + 5, `${lo}–${hi}%`, col, { size: 13, w: 800, anchor: 'start' })
      }
      c.text(350, 196, l('Разброс между моделями; награда при обучении: +0,3 за вопрос по делу, −0,1 за лишний', 'Spread across models; training reward: +0.3 for a relevant question, −0.1 for an extra one'), M, { size: 10.5, w: 600 })
    },
  },
  // Режимы разрешений: сколько вопросов доходит до человека
  'modes-ladder': {
    ru: 'Режимы разрешений Claude Code: default спрашивает почти про всё; acceptEdits не спрашивает про правки; plan ничего не правит до одобрения плана; auto отдаёт решения классификатору; dontAsk отклоняет всё, что потребовало бы вопроса; bypassPermissions не спрашивает ничего. Вопрос AskUserQuestion и правила «спросить» не одобряются автоматически ни в одном режиме',
    en: 'Claude Code permission modes: default asks about almost everything; acceptEdits does not ask about edits; plan changes nothing until the plan is approved; auto hands decisions to a classifier; dontAsk rejects whatever would need a question; bypassPermissions asks nothing. AskUserQuestion and “ask” rules are not auto-approved in any mode',
    viewBox: [0, 0, 700, 330],
    draw: (c, l) => {
      c.text(350, 24, l('Режимы: сколько вопросов доходит до человека', 'Modes: how many questions reach a person'), M, { size: 13, w: 800 })
      const cards: [number, number, string, string, string, string, string][] = [
        [30, 44, 'default', 'default', 'спрашивает почти всё', 'asks almost everything', M],
        [250, 44, 'acceptEdits', 'acceptEdits', 'правки без вопроса', 'edits without a question', M],
        [470, 44, 'plan', 'plan', 'ничего не правит до плана', 'no changes before the plan', M],
        [30, 128, 'auto', 'auto', 'решает классификатор', 'a classifier decides', A],
        [250, 128, 'dontAsk', 'dontAsk', 'вопрос = отказ', 'a question = a denial', W],
        [470, 128, 'bypassPermissions', 'bypassPermissions', 'не спрашивает ничего', 'asks nothing', W],
      ]
      for (const [x, y, nr, ne, dr, de, col] of cards) {
        c.card(x, y, 200, 66, col, { lines: [{ t: l(nr, ne), dy: 27, size: 13, w: 800 }, { t: l(dr, de), dy: 47, size: 11, w: 600 }] })
      }
      c.rect(30, 226, 640, 62, { rx: 10, fill: M, fillOp: 0.12 })
      c.text(350, 252, l('Не одобряются автоматически ни в одном режиме', 'Not auto-approved in any mode'), M, { size: 12, w: 800 })
      c.text(350, 274, l('AskUserQuestion · MCP-функции «нужен человек» · явные правила «спросить»', 'AskUserQuestion · MCP functions that need a person · explicit “ask” rules'), M, { size: 11, w: 600 })
    },
  },
  // Две части решения «спросить»
  'two-parts': {
    ru: 'Решение «спросить» собирается из двух частей: в MCP живут вызов функции, схема результата, запрос человеку и права сервера; в хосте живут хуки, режимы разрешений, песочница и история диалога',
    en: 'The decision “ask” is assembled from two parts: MCP holds the function call, the result schema, the request to a person and server permissions; the host holds hooks, permission modes, the sandbox and the conversation history',
    viewBox: [0, 0, 700, 280],
    draw: (c, l) => {
      c.text(350, 24, l('Решение «спросить» складывается из двух частей', 'The decision “ask” has two parts'), M, { size: 13, w: 800 })
      c.card(30, 52, 275, 160, A, { lines: [
        { t: 'MCP', dy: 34, size: 15, w: 800 },
        { t: l('вызов функции', 'function call'), dy: 66, size: 12, w: 600 },
        { t: l('схема результата', 'result schema'), dy: 88, size: 12, w: 600 },
        { t: l('запрос человеку', 'request to a person'), dy: 110, size: 12, w: 600 },
        { t: l('права сервера', 'server permissions'), dy: 132, size: 12, w: 600 },
      ] })
      c.card(395, 52, 275, 160, W, { lines: [
        { t: l('Хост', 'Host'), dy: 34, size: 15, w: 800 },
        { t: l('хуки клиента', 'client hooks'), dy: 66, size: 12, w: 600 },
        { t: l('режимы разрешений', 'permission modes'), dy: 88, size: 12, w: 600 },
        { t: l('песочница', 'sandbox'), dy: 110, size: 12, w: 600 },
        { t: l('история диалога', 'conversation history'), dy: 132, size: 12, w: 600 },
      ] })
      c.arrow(308, 132, 392, 132, M, { w: 2.2 })
      c.arrow(392, 150, 308, 150, M, { w: 2.2 })
      c.text(350, 248, l('Любая часть в одиночку оставляет дыру', 'Either part alone leaves a hole'), M, { size: 12, w: 700 })
    },
  },

  // Гонка с финишем: метрика считает только финиш, остановка на вопрос к человеку в счёт не входит
  'finish-line': {
    ru: 'Агент едет по дороге к финишу, метрика отмечает только финиш. Сбоку стоит человек, к нему ведёт тропа вопроса, но в счёте этой тропы нет: вопрос метрика не видит',
    en: 'The agent drives along a road to the finish and the metric marks only the finish. A person stands at the side, a path of a question leads to them, but the count does not include that path: the metric does not see the question',
    viewBox: [0, 0, 700, 320],
    draw: (c, l) => {
      c.text(350, 24, l('Метрика считает финиш, вопрос в счёт не входит', 'The metric counts the finish, a question is not in the count'), M, { size: 13, w: 800 })
      const i = c.iso(350, 176, 28)
      i.tile(-3.6, -3.6, 7.2, 7.2, { grid: false })
      i.path([[-2.9, 2.9], [3.0, -3.0]], A, { w: 3.2, arrow: true })
      i.agent(-3.5, 2.1, A, 1.2, '')
      i.path([[0, 0], [-1.7, -1.4]], M, { w: 2.4, dash: '5 4', arrow: true })
      i.person(-2.2, -1.8, M, '')
      c.flag(498, 150, A)
      c.text(498, 204, l('финиш: здесь отметка', 'finish: the mark is here'), A, { size: 12, w: 800 })
      c.text(350, 58, l('вопрос человеку: в счёте нет', 'a question to a person: not counted'), M, { size: 12, w: 800 })
      c.badge(362, 152, W, '', { mark: 'cross', r: 11 })
    },
  },
  // Шлагбаум и домофон: хук хоста останавливает, окно MCP только спрашивает; обход — ответить за человека
  'barrier-intercom': {
    ru: 'Машина-агент подъезжает к шлагбауму. Шлагбаум ставит хост, это хук. Рядом домофон: через него вопрос доходит до охранника-человека, это окно MCP. Обход: нажать кнопку самому, ответить за человека',
    en: 'The agent car drives up to a barrier. The host sets the barrier, which is a hook. Next to it is an intercom: through it a question reaches the guard, a person, which is the MCP window. A bypass: press the button yourself, answer for the person',
    viewBox: [0, 0, 700, 330],
    draw: (c, l) => {
      c.text(350, 24, l('Шлагбаум и домофон: решение «спросить» в двух местах', 'Barrier and intercom: the decision “ask” in two places'), M, { size: 13, w: 800 })
      const a = c.iso(110, 200, 26); a.tile(-2, -2, 4, 4, { grid: false }); a.agent(-0.5, 0.3, A, 1.3, '')
      const g = c.iso(320, 200, 26); g.tile(-2, -2, 4, 4, { grid: false }); g.barrier(0, 0.4, 2.0, W); g.monitor(1.5, -1.3, 1.5, A)
      const h = c.iso(560, 200, 26); h.tile(-2, -2, 4, 4, { grid: false }); h.person(0, 0.2, M, '')
      c.arrow(176, 196, 262, 196, A, { w: 2.4 })
      c.arrow(392, 196, 504, 196, M, { w: 2.4, dash: '5 4' })
      c.text(110, 272, l('агент', 'agent'), A, { size: 12, w: 800 })
      c.text(300, 290, l('шлагбаум: хук хоста', 'barrier: a host hook'), W, { size: 12, w: 800 })
      c.text(392, 124, l('домофон: окно MCP', 'intercom: the MCP window'), A, { size: 12, w: 800 })
      c.text(560, 272, l('человек', 'person'), M, { size: 12, w: 800 })
      c.arrow(150, 100, 520, 100, W, { w: 2.2, dash: '5 4' })
      c.badge(330, 100, W, '', { mark: 'cross', r: 12 })
      c.text(330, 80, l('обход: ответить за человека', 'bypass: answer for the person'), W, { size: 12, w: 800 })
    },
  },
  // Две крайности: молчит и угадывает; засыпает вопросами
  'ask-extremes': {
    ru: 'Две крайности. Без разрешения спрашивать агент молчит и угадывает, догадка оборачивается багом, а человек стоит в стороне. С разрешением агент засыпает человека вопросами, и тот принимает почти всё подряд, 93% запросов',
    en: 'Two extremes. Without permission to ask the agent stays silent and guesses, the guess turns into a bug and the person stands aside. With permission the agent floods the person with questions, and they accept almost everything in a row, 93% of requests',
    viewBox: [0, 0, 700, 330],
    draw: (c, l) => {
      c.text(350, 24, l('Агент спрашивает слишком мало или слишком много', 'The agent asks too little or too much'), M, { size: 13, w: 800 })
      const L = c.iso(170, 190, 26); L.tile(-2.4, -2.4, 4.8, 4.8, { grid: false })
      L.agent(-1.3, 0.2, A, 1.3, ''); L.path([[0, 0.7], [1.3, 0.7]], W, { w: 2.4, arrow: true }); L.bug(1.9, 0.7, W); L.person(-1.5, -1.8, M, '')
      c.text(170, 268, l('без разрешения: молчит и угадывает', 'no permission: silent and guessing'), W, { size: 12, w: 800 })
      const R = c.iso(530, 190, 26); R.tile(-2.4, -2.4, 4.8, 4.8, { grid: false })
      R.agent(-2.0, -0.3, A, 1.3, ''); R.person(1.6, 0.6, M, '')
      c.bubble(468, 96, 62, 28, A, { tail: [14, 8, 10, 12] }); c.text(499, 115, '?', A, { size: 15, w: 800 })
      c.bubble(522, 76, 62, 28, A, { tail: [14, 8, 10, 12] }); c.text(553, 95, '?', A, { size: 15, w: 800 })
      c.bubble(576, 96, 62, 28, A, { tail: [14, 8, 10, 12] }); c.text(607, 115, '?', A, { size: 15, w: 800 })
      c.text(530, 268, l('с разрешением: засыпает вопросами', 'with permission: floods with questions'), A, { size: 12, w: 800 })
      c.text(530, 288, l('человек принимает 93% подряд', 'a person accepts 93% in a row'), M, { size: 11, w: 700 })
    },
  },
  // Ночной запуск: у закрытой двери агент оставляет отчёт, человек приходит утром
  'night-run': {
    ru: 'Ночью агент упирается в закрытую дверь: спросить некого. Он оставляет у двери лоток с отчётом о блокере, а человек приходит утром и забирает его',
    en: 'At night the agent runs into a closed door: nobody to ask. It leaves a tray with a blocker report at the door, and a person comes in the morning and picks it up',
    viewBox: [0, 0, 700, 320],
    draw: (c, l) => {
      c.text(350, 24, l('Ночью вопрос становится отчётом у двери', 'At night a question becomes a report at the door'), M, { size: 13, w: 800 })
      const a = c.iso(110, 196, 26); a.tile(-2, -2, 4, 4, { grid: false }); a.agent(-0.5, 0.3, A, 1.3, '')
      const d = c.iso(320, 196, 26); d.tile(-2, -2, 4, 4, { grid: false }); d.door(0, 0.4, 2.2, W); d.tray(-1.3, 0.9, 1.4, M); d.doc(-1.65, 0.65, 0.34, 0.8, 0.6, A, 3, true)
      const h = c.iso(560, 196, 26); h.tile(-2, -2, 4, 4, { grid: false, dash: '5 4' }); h.person(0, 0.2, M, '')
      c.arrow(176, 190, 258, 190, A, { w: 2.4 })
      c.arrow(392, 190, 504, 190, M, { w: 2.2, dash: '5 4' })
      c.text(110, 270, l('ночью', 'at night'), A, { size: 12, w: 800 })
      c.text(310, 274, l('дверь: некому ответить', 'door: nobody to answer'), W, { size: 12, w: 800 })
      c.text(250, 108, l('отчёт о блокере', 'blocker report'), A, { size: 12, w: 800 })
      c.text(560, 270, l('утром', 'in the morning'), M, { size: 12, w: 800 })
    },
  },
  // Форма и адрес: в форме клиент видит данные; по адресу человек уходит за дверь, клиент не видит
  'elicit-modes': {
    ru: 'Форма: человек отвечает на экране клиента, клиент видит данные. Адрес: человек уходит за отдельную дверь на внешнюю страницу, клиент и модель остаются снаружи и ничего не видят. Так вводят пароли и ключи',
    en: 'Form: the person answers on the client’s screen and the client sees the data. URL: the person goes through a separate door to an external page, and the client and the model stay outside and see nothing. That is how passwords and keys are entered',
    viewBox: [0, 0, 700, 320],
    draw: (c, l) => {
      c.text(350, 24, l('Кто видит ответ человека', 'Who sees the person’s answer'), M, { size: 13, w: 800 })
      const L = c.iso(175, 190, 26); L.tile(-2.4, -2.4, 4.8, 4.8, { grid: false })
      L.monitor(-0.2, -1.0, 1.7, A); L.person(1.2, 1.1, M, '')
      c.eye(175, 86, A)
      c.arrow(204, 218, 168, 170, M, { w: 2.2 })
      c.text(175, 272, l('форма: клиент видит данные', 'form: the client sees the data'), A, { size: 12, w: 800 })
      c.line([[350, 52], [350, 292]], M, { w: 1.4, dash: '4 4', op: 0.5 })
      const R = c.iso(525, 190, 26); R.tile(-2.4, -2.4, 4.8, 4.8, { grid: false })
      R.monitor(-1.5, -1.5, 1.4, M); R.door(1.3, -0.6, 2.0, W); R.person(-0.2, 1.0, M, '')
      c.seal(580, 156, W, 'lock', { r: 12 })
      c.badge(455, 100, W, '', { mark: 'cross', r: 11 })
      c.eye(455, 80, M)
      c.arrow(548, 212, 590, 196, W, { w: 2.2, dash: '5 4' })
      c.text(525, 272, l('адрес: клиент не видит, секреты тут', 'URL: the client sees nothing, secrets go here'), W, { size: 12, w: 800 })
    },
  },

  // Оценка по итогу: три конца дороги дают 1, 0 и 0; вопрос без канала равен ошибке
  'score-cases': {
    ru: 'Три агента получают оценку за итог. Угадал верно: документ с галочкой, оценка 1. Угадал неверно: документ с крестом, оценка 0. Спросил, а канала к человеку нет: шлагбаум закрыт, итога нет, оценка 0',
    en: 'Three agents are scored by outcome. Guessed right: a document with a check, score 1. Guessed wrong: a document with a cross, score 0. Asked with no channel to a person: the barrier is closed, no outcome, score 0',
    viewBox: [0, 0, 700, 330],
    draw: (c, l) => {
      c.text(350, 24, l('Оценку ставят за итог', 'The score is given for the outcome'), M, { size: 13, w: 800 })
      const a = c.iso(120, 160, 22); a.tile(-1.8, -1.8, 3.6, 3.6, { grid: false }); a.agent(-1.5, 0.1, A, 1.0, ''); a.path([[-0.4, 0.6], [0.6, 0.6]], A, { w: 2.6, arrow: true }); a.doc(0.9, -0.2, 0, 1.1, 0.9, A, 3, true)
      c.badge(160, 124, A, '', { mark: 'check', r: 11 })
      c.text(120, 250, l('угадал верно', 'guessed right'), M, { size: 13, w: 800 }); c.text(120, 284, '1', A, { size: 30, w: 800 })
      const b = c.iso(350, 160, 22); b.tile(-1.8, -1.8, 3.6, 3.6, { grid: false }); b.agent(-1.5, 0.1, A, 1.0, ''); b.path([[-0.4, 0.6], [0.6, 0.6]], A, { w: 2.6, arrow: true }); b.doc(0.9, -0.2, 0, 1.1, 0.9, W, 3, true)
      c.badge(390, 124, W, '', { mark: 'cross', r: 11 })
      c.text(350, 250, l('угадал неверно', 'guessed wrong'), M, { size: 13, w: 800 }); c.text(350, 284, '0', W, { size: 30, w: 800 })
      const d = c.iso(580, 160, 22); d.tile(-1.8, -1.8, 3.6, 3.6, { grid: false }); d.agent(-1.5, 0.1, A, 1.0, ''); d.path([[-0.4, 0.6], [0.4, 0.6]], A, { w: 2.6, arrow: true }); d.barrier(1.0, 0.6, 1.4, W); d.person(1.3, -1.2, M, '')
      c.text(580, 250, l('спросил, канала нет', 'asked, no channel'), M, { size: 13, w: 800 }); c.text(580, 284, '0', W, { size: 30, w: 800 })
    },
  },
  // Ход режется вопросом: один ход в 60 минут против двух ходов 40 и 20
  'turn-cut': {
    ru: 'Две полосы времени. Сверху без вопроса один ход в 60 минут. Снизу тот же труд с вопросом на сороковой минуте: человек стоит на разрыве, ход режется на 40 и 20 минут',
    en: 'Two time bars. Above, with no question, one turn of 60 minutes. Below, the same work with a question at minute 40: a person stands at the break and the turn is cut into 40 and 20 minutes',
    viewBox: [0, 0, 700, 280],
    draw: (c, l) => {
      c.text(350, 24, l('Вопрос режет ход агента', 'A question cuts the agent’s turn'), M, { size: 13, w: 800 })
      c.text(40, 66, l('без вопроса', 'no question'), M, { size: 12, w: 800, anchor: 'start' })
      c.rect(40, 78, 620, 36, { rx: 8, fill: A, fillOp: 1 })
      c.text(350, 102, l('один ход · 60 мин', 'one turn · 60 min'), W, { size: 14, w: 800 })
      c.text(40, 156, l('с вопросом на 40-й минуте', 'a question at minute 40'), M, { size: 12, w: 800, anchor: 'start' })
      c.rect(40, 168, 400, 36, { rx: 8, fill: A, fillOp: 1 })
      c.rect(480, 168, 180, 36, { rx: 8, fill: A, fillOp: 1 })
      c.text(240, 192, l('ход 1 · 40 мин', 'turn 1 · 40 min'), W, { size: 14, w: 800 })
      c.text(570, 192, l('ход 2 · 20 мин', 'turn 2 · 20 min'), W, { size: 14, w: 800 })
      const h = c.iso(460, 262, 14); h.person(0, 0, M, '')
      c.badge(460, 186, W, '?', { r: 11 })
    },
  },
  // Три мерки автономного времени: часы человека на задачу, ход от старта до остановки, задача без вмешательства
  'three-clocks': {
    ru: 'Три разные мерки. METR: сколько часов у человека занимает задача, которую агент решает. Anthropic: ход агента от старта до остановки. DeepMind: сделана ли задача без вмешательства человека',
    en: 'Three different measures. METR: how many hours a task takes a person, a task the agent solves. Anthropic: the agent’s turn from start to stop. DeepMind: whether the task is done without human intervention',
    viewBox: [0, 0, 700, 330],
    draw: (c, l) => {
      c.text(350, 24, l('Три мерки «автономного времени»', 'Three measures of “autonomous time”'), M, { size: 13, w: 800 })
      const a = c.iso(120, 170, 22); a.tile(-1.8, -1.8, 3.6, 3.6, { grid: false }); a.person(-0.8, 0.2, M, ''); a.doc(0.2, -0.8, 0, 1.1, 0.9, M, 3)
      c.text(120, 262, 'METR', M, { size: 14, w: 800 }); c.text(120, 282, l('p(успех | часы задачи) = 0,5', 'p(success | task hours) = 0.5'), M, { size: 11, w: 700 })
      const b = c.iso(350, 170, 22); b.tile(-1.8, -1.8, 3.6, 3.6, { grid: false }); b.agent(-1.5, 0.0, A, 1.0, ''); b.path([[-0.3, 0.5], [1.0, 0.5]], A, { w: 2.6, arrow: true }); b.barrier(1.5, 0.5, 1.4, W)
      c.text(350, 262, 'Anthropic', A, { size: 14, w: 800 }); c.text(350, 282, l('ход = остановка − старт', 'turn = stop − start'), A, { size: 11, w: 700 })
      const d = c.iso(580, 170, 22); d.tile(-1.8, -1.8, 3.6, 3.6, { grid: false }); d.agent(-1.3, -0.2, A, 1.0, ''); d.doc(0.0, -0.9, 0, 1.1, 0.9, A, 3, true); d.person(1.2, 1.1, M, '')
      c.badge(606, 150, W, '', { mark: 'cross', r: 11 })
      c.text(580, 262, 'DeepMind', A, { size: 14, w: 800 }); c.text(580, 282, l('доля задач без вмешательства', 'share of tasks, no intervention'), A, { size: 11, w: 700 })
    },
  },
}

export default scenes
