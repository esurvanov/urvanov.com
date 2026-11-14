// Схемы поста «Что такое quality gates для ИИ-агентов». Одна мысль на схему: гейт — пост приёмки, где «готово» говорит проверка;
// агент не оценивает себя сам; три вида проверки; что гейт даёт качеству; почему он удлиняет автономную работу;
// почему гейт ставят на границе контекста; узкий набор функций MCP; гейт вне агента; как агент обходит гейт; откуда слово.
// Один бытовой образ на весь пост: приёмка на складе. Цвета по ролям: серый — люди и данные, синий — агент и проверки,
// оранжевый — стоп, риск и ошибка.
import { type Scene, A, M, W, bandTitle } from '@/lib/infographic'

// Расчёт для схемы «автономность»: вероятность довести работу из n шагов до конца без единой ошибки
const keep = (p: number, n: number) => Math.pow(p, n)

const scenes: Record<string, Scene> = {
  // Дорога работы: агент идёт по своему контексту, через MCP работа доходит до гейта в другом контексте; три исхода
  overview: {
    ru: 'Дорога работы: агент идёт по своему ограниченному контексту шаг за шагом, через MCP работа доходит до гейта, который стоит в другом контексте. Гейт отвечает: принято, не принято (ошибки возвращаются тем же путём) или не уверена (решает человек)',
    en: 'The road of the work: the agent walks through its own bounded context step by step, and through MCP the work reaches a gate that stands in another context. The gate answers: accepted, not accepted (errors return along the same road) or not sure (a person decides)',
    viewBox: [0, 0, 780, 384],
    draw: (c, l) => {
      c.text(390, 24, l('Дорога работы: гейт стоит в другом контексте', 'The road of the work: the gate stands in another context'), M, { size: 13, w: 800 })
      // Контекст агента: дорога из трёх шагов
      c.text(130, 82, l('контекст агента', 'the agent’s context'), M, { size: 12, w: 800 })
      const a = c.iso(130, 214, 24); a.tile(-2.6, -2.6, 5.2, 5.2, { dash: '7 5', edge: W }); a.agent(-1.7, 1.4, A, 1.2, '')
      const road: [number, number][] = [[-0.9, 0.8], [0, -0.2], [0.9, -1.2], [1.9, -2.1]]
      a.path(road, A, { w: 3, arrow: true })
      road.slice(0, 3).forEach(([x, y]) => a.pad(x, y, A, 0.26))
      c.text(130, 304, l('агент идёт по задаче шаг за шагом', 'the agent walks the task step by step'), A, { size: 11.5, w: 800 })
      // Разделитель и MCP
      c.line([[262, 58], [262, 322]], W, { w: 2, dash: '6 5' })
      c.cable(212, 232, 318, 232, A)
      c.text(265, 214, 'MCP', A, { size: 12, w: 800 })
      c.text(262, 346, l('разделитель: MCP, хук, другой процесс', 'a separator: MCP, a hook, another process'), W, { size: 11, w: 800 })
      // Контекст гейта
      c.text(430, 82, l('другой контекст', 'another context'), M, { size: 12, w: 800 })
      const g = c.iso(430, 214, 24); g.tile(-2.2, -2.2, 4.4, 4.4, { dash: '7 5', edge: W }); g.barrier(0, 0.2, 2.0, W)
      c.seal(430, 152, A, 'check', { r: 13 })
      c.arrow(322, 232, 382, 232, A, { w: 2.4 })
      c.text(430, 304, l('гейт: пост приёмки', 'the gate: an intake post'), W, { size: 11.5, w: 800 })
      // Не принято: ошибки назад по той же дороге
      c.arrow(382, 124, 162, 124, W, { w: 2.2, dash: '5 4' })
      c.bug(272, 100, W)
      c.text(272, 146, l('не принято: ошибки назад тем же путём', 'not accepted: errors go back the same way'), W, { size: 11, w: 700 })
      // Принято и «не уверена»
      c.arrow(494, 196, 556, 134, A, { w: 2.4 })
      c.card(560, 70, 200, 66, A, { lines: [{ t: l('принято', 'accepted'), dy: 27, size: 13, w: 800 }, { t: l('работа считается готовой', 'the work counts as done'), dy: 47, size: 11, w: 600 }] })
      c.flag(584, 96, A)
      c.arrow(494, 238, 556, 296, W, { w: 2.4 })
      c.card(560, 262, 200, 66, W, { lines: [{ t: l('не уверена', 'not sure'), dy: 27, size: 13, w: 800 }, { t: l('решает человек', 'a person decides'), dy: 47, size: 11, w: 600 }] })
      c.icon(584, 298, 'user', M, { k: 1.2 })
      c.text(390, 372, l('слово «готово» говорит гейт за разделителем', 'the word “done” comes from the gate behind the separator'), M, { size: 12, w: 700 })
    },
  },
  // Самооценка против проверки снаружи: итог по трём оценщикам и старту (пилот, arXiv 2607.25152)
  'self-grade': {
    ru: 'Итоговый результат работы агента при трёх способах оценки: самооценка агента даёт 76,7 после пика 95,0, сильный судья внутри цикла даёт 86,7, проверка снаружи даёт 113,0. Старт без цикла: 33,3',
    en: 'Final score of the agent’s work under three ways of judging: self-grading gives 76.7 after a peak of 95.0, a strong judge inside the loop gives 86.7, a check from outside gives 113.0. Start without the loop: 33.3',
    viewBox: [0, 0, 700, 290],
    draw: (c, l) => {
      c.text(350, 24, l('Итог после 6 циклов улучшения (больше — лучше)', 'Final score after 6 improvement cycles (higher is better)'), M, { size: 13, w: 800 })
      const X0 = 262, k = 3.3
      const rows: [number, string, string, number, string, number][] = [
        [62, 'Старт', 'Start', 33.3, M, 0.7],
        [112, 'Агент оценивает себя сам', 'The agent grades itself', 76.7, W, 1],
        [162, 'Сильный судья внутри цикла', 'A strong judge inside the loop', 86.7, A, 0.55],
        [212, 'Проверка снаружи', 'A check from outside', 113.0, A, 1],
      ]
      for (const [y, ru, en, v, col, op] of rows) {
        c.text(X0 - 12, y + 5, l(ru, en), col === W ? W : M, { size: 12, w: 700, anchor: 'end' })
        c.rect(X0, y - 13, v * k, 28, { rx: 6, fill: col, fillOp: op })
        c.text(X0 + v * k + 10, y + 5, v.toFixed(1).replace('.', l(',', '.')), col, { size: 13, w: 800, anchor: 'start' })
      }
      // Пик самооценки и откат
      const px = X0 + 95 * k
      c.line([[px, 90], [px, 136]], W, { w: 1.6, dash: '3 3' })
      c.text(px - 8, 88, l('пик 95,0 → откат на 19%', 'peak 95.0 → 19% rollback'), W, { size: 11, w: 700, anchor: 'end' })
      c.text(350, 262, l('Пилот: одна модель, одна задача, три повтора. Агент назвал улучшением все 54 цикла, а в 56% изменение было нулевым или хуже', 'Pilot: one model, one task, three repeats. The agent called all 54 cycles an improvement, yet 56% had zero or negative change'), M, { size: 10.5, w: 600 })
    },
  },
  // Три вида проверки на гейте: машина, проверяющий агент, человек
  'three-kinds': {
    ru: 'Три вида проверки на гейте: машина (тесты, типы, линтер) быстро и дёшево, отдельный проверяющий агент (порог по критериям) медленнее и дороже, человек (смысл и риск) медленнее всех и дороже всех',
    en: 'Three kinds of check at a gate: a machine (tests, types, linter) is fast and cheap, a separate reviewing agent (thresholds on criteria) is slower and pricier, a person (meaning and risk) is the slowest and the most expensive',
    viewBox: [0, 0, 700, 320],
    draw: (c, l) => {
      const m = c.iso(118, 130, 24); m.tile(-1.8, -1.8, 3.6, 3.6, { grid: false }); m.panel(-1.2, -0.8, 2.4, 1.6, A, bandTitle('npm test'), 3)
      c.seal(160, 70, A, 'check', { r: 12 })
      c.text(118, 214, l('Машина', 'A machine'), A, { size: 14, w: 800 })
      c.text(118, 234, l('тесты, типы, линтер', 'tests, types, linter'), M, { size: 11, w: 600 })
      const r = c.iso(350, 130, 24); r.tile(-1.8, -1.8, 3.6, 3.6, { grid: false }); r.agent(-0.3, 0.1, A, 1.25, ''); r.doc(0.9, -1.2, 0, 1.0, 0.8, A, 3, true)
      c.eye(352, 68, A)
      c.text(350, 214, l('Проверяющий агент', 'A reviewing agent'), A, { size: 14, w: 800 })
      c.text(350, 234, l('порог по каждому критерию', 'a threshold per criterion'), M, { size: 11, w: 600 })
      const h = c.iso(582, 130, 24); h.tile(-1.8, -1.8, 3.6, 3.6, { grid: false }); h.person(-0.2, 0.3, M, ''); h.doc(0.9, -1.2, 0, 1.0, 0.8, M, 3)
      c.text(582, 214, l('Человек', 'A person'), M, { size: 14, w: 800 })
      c.text(582, 234, l('смысл и риск', 'meaning and risk'), M, { size: 11, w: 600 })
      c.line([[232, 40], [232, 244]], M, { w: 1, op: 0.35, dash: '3 5' }); c.line([[468, 40], [468, 244]], M, { w: 1, op: 0.35, dash: '3 5' })
      c.arrow(70, 288, 630, 288, M, { w: 1.6 })
      c.text(70, 276, l('секунды, дёшево', 'seconds, cheap'), M, { size: 11, w: 700, anchor: 'start' })
      c.text(630, 276, l('часы, дорого', 'hours, expensive'), M, { size: 11, w: 700, anchor: 'end' })
    },
  },
  // Цена и качество одной задачи: один агент против агента с проверяющим (Anthropic, 24.03.2026)
  'cost-quality': {
    ru: 'Один и тот же запрос. Слева один агент: 20 минут, 9 долларов, главная функция не работала. Справа агент с отдельным проверяющим и порогами: 6 часов, 200 долларов, качество заметно выше',
    en: 'The same request. Left: a single agent, 20 minutes, $9, the main feature did not work. Right: an agent with a separate reviewer and thresholds, 6 hours, $200, noticeably higher quality',
    viewBox: [0, 0, 700, 300],
    draw: (c, l) => {
      c.caps(170, 24, l('Один агент', 'A single agent'), M); c.caps(530, 24, l('Агент и проверяющий', 'Agent and reviewer'), A)
      const s = c.iso(170, 140, 26); s.tile(-2, -2, 4, 4, { grid: false }); s.agent(-0.8, 0.2, A, 1.25, ''); s.doc(0.7, -1.1, 0, 1.0, 0.8, M, 3); s.bug(1.5, 0.6, W)
      c.badge(246, 78, W, '', { mark: 'cross', r: 13 })
      c.text(170, 218, l('20 минут · $9', '20 minutes · $9'), M, { size: 14, w: 800 })
      c.text(170, 240, l('главная функция не работала', 'the main feature did not work'), W, { size: 11.5, w: 700 })
      c.thenArrow(318, 382, 140)
      const r = c.iso(530, 140, 26); r.tile(-2, -2, 4, 4, { grid: false }); r.agent(-1.2, 0.5, A, 1.15, ''); r.agent(0.2, -0.3, A, 1.0, ''); r.doc(1.3, -1.2, 0, 1.0, 0.8, A, 3, true)
      c.eye(540, 78, A)
      c.badge(606, 78, A, '', { mark: 'check', r: 13 })
      c.text(530, 218, l('6 часов · $200', '6 hours · $200'), A, { size: 14, w: 800 })
      c.text(530, 240, l('результат работает, качество заметно выше', 'it works, noticeably higher quality'), A, { size: 11.5, w: 700 })
      c.text(350, 278, l('Цена выше в 20 с лишним раз. Один случай, статистики нет (Anthropic, 24.03.2026)', 'Over 20× the cost. One case, no statistics (Anthropic, 24 Mar 2026)'), M, { size: 10.5, w: 600 })
    },
  },
  // Автономность: вероятность довести работу из n шагов до конца при 95% на шаг и при гейте, который ловит 4 из 5 ошибок (расчёт)
  'autonomy-curve': {
    ru: 'Расчёт-пример: вероятность довести работу из n шагов до конца без ошибки. Без гейта при 95% на шаг после 20 шагов остаётся 36%. Если гейт ловит 4 из 5 ошибок шага, остаётся 82%',
    en: 'A worked example: the chance of finishing n steps without a single error. Without a gate, at 95% per step, 36% is left after 20 steps. If a gate catches 4 of 5 step errors, 82% is left',
    viewBox: [0, 0, 700, 340],
    draw: (c, l) => {
      const pt = c.chart(84, 636, 52, 262, { title: l('Шансов довести до конца столько, сколько шагов выдержано', 'Chances of finishing, by number of steps held'), xTitle: l('число шагов подряд', 'steps in a row'), yTicks: ['0%', '25%', '50%', '75%', '100%'], xTicks: ['0', '10', '20', '30', '40'] })
      const ns = Array.from({ length: 21 }, (_, i) => i * 2)
      c.series(ns.map((n) => pt(n / 10, keep(0.95, n))), W, { w: 3.5 })
      c.series(ns.map((n) => pt(n / 10, keep(0.99, n))), A, { w: 3.5 })
      const [x20, yNo] = pt(2, keep(0.95, 20)), [, yYes] = pt(2, keep(0.99, 20))
      c.dot(x20, yNo, 5.5, W); c.dot(x20, yYes, 5.5, A)
      c.line([[x20, yYes], [x20, yNo]], M, { w: 1.2, dash: '3 3' })
      c.text(x20 + 10, yNo + 4, '36%', W, { size: 13, w: 800, anchor: 'start' })
      c.text(x20 + 10, yYes - 6, '82%', A, { size: 13, w: 800, anchor: 'start' })
      c.text(612, 142, l('гейт ловит 4 из 5 ошибок шага (99% на шаг)', 'a gate catches 4 of 5 step errors (99% per step)'), A, { size: 11, w: 700, anchor: 'end' })
      c.text(250, 236, l('без гейта: 95% на шаг', 'no gate: 95% per step'), W, { size: 11, w: 700, anchor: 'start' })
      c.text(350, 322, l('Расчёт при независимых шагах, не измерение: так считает Тоби Орд для долей успеха агентов', 'A calculation assuming independent steps, not a measurement: the way Toby Ord models agent success rates'), M, { size: 10.5, w: 600 })
    },
  },
  // Размер правки и доля решённых задач (SWE-bench Live; агент Kozuchi на SWE-bench Verified)
  'size-success': {
    ru: 'Чем больше правка, тем меньше решённых задач. SWE-bench Live: правка в одном файле до пяти строк решается в 48% случаев, три файла и больше или больше ста строк — меньше 10%, семь файлов и больше — ни разу. Агент Kozuchi: 81,7% при правке в 1–4 строки и 41,7% при правке больше 100 строк',
    en: 'The bigger the change, the fewer tasks are solved. SWE-bench Live: a change in one file under five lines is solved in 48% of cases, three or more files or over a hundred lines under 10%, seven or more files never. The Kozuchi agent: 81.7% at 1–4 changed lines and 41.7% above 100 lines',
    viewBox: [0, 0, 700, 330],
    draw: (c, l) => {
      const X0 = 300, k = 3.6
      const bar = (y: number, ru: string, en: string, v: number, col: string, txt: string) => {
        c.text(X0 - 12, y + 5, l(ru, en), M, { size: 11.5, w: 700, anchor: 'end' })
        if (v > 0) c.rect(X0, y - 12, v * k, 26, { rx: 6, fill: col })
        c.text(X0 + Math.max(v, 0) * k + 10, y + 5, txt, col, { size: 13, w: 800, anchor: 'start' })
      }
      c.text(30, 34, l('SWE-bench Live: доля решённых по размеру эталонной правки', 'SWE-bench Live: share solved, by size of the reference change'), M, { size: 12, w: 800, anchor: 'start' })
      bar(66, 'один файл, до 5 строк', 'one file, under 5 lines', 48, A, '48%')
      bar(104, '3+ файла или 100+ строк', '3+ files or 100+ lines', 9, W, l('меньше 10%', 'under 10%'))
      bar(142, '7 и больше файлов', '7 or more files', 0, W, l('ни разу', 'never'))
      c.text(30, 196, l('Агент Kozuchi, SWE-bench Verified: по размеру своей правки', 'Kozuchi agent, SWE-bench Verified: by size of its own change'), M, { size: 12, w: 800, anchor: 'start' })
      bar(228, '1–4 строки', '1–4 lines', 81.7, A, l('81,7%', '81.7%'))
      bar(266, 'больше 100 строк', 'over 100 lines', 41.7, W, l('41,7%', '41.7%'))
      c.text(350, 312, l('Это разные испытания и разные агенты: сравнивать столбцы между блоками нельзя, смотрите направление', 'Different benchmarks and agents: do not compare bars across blocks, look at the direction'), M, { size: 10.5, w: 600 })
    },
  },
  // Контексты: у каждого свой агент, свой набор функций MCP, своё окно контекста и свой гейт на границе; между ними — события
  contexts: {
    ru: 'Два ограниченных контекста. У каждого свой агент, свой небольшой набор функций MCP, своё заполненное лишь частично окно контекста и свой гейт на границе. Между контекстами ходят только события',
    en: 'Two bounded contexts. Each has its own agent, its own small set of MCP functions, a context window that is only partly full, and its own gate on the border. Only events travel between the contexts',
    viewBox: [0, 0, 700, 350],
    draw: (c, l) => {
      const ctx = (cx: number, ru: string, en: string) => {
        const i = c.iso(cx, 170, 24); i.tile(-2.3, -2.3, 4.6, 4.6, { dash: '7 5', edge: W }); i.agent(-0.5, -0.1, A, 1.2, ''); i.doc(0.8, -1.4, 0, 1.0, 0.8, A, 3)
        c.text(cx, 40, l(ru, en), M, { size: 13, w: 800 })
        // Окно контекста заполнено частично
        c.rect(cx - 70, 56, 140, 14, { rx: 7, fill: 'none', stroke: M, sw: 1.6 })
        c.rect(cx - 70, 56, 52, 14, { rx: 7, fill: A, fillOp: 0.85 })
        c.text(cx, 90, l('окно контекста: занято немного', 'context window: only a little used'), M, { size: 10.5, w: 600 })
        c.text(cx, 262, l('свой агент, свой набор функций', 'own agent, own set of functions'), A, { size: 11.5, w: 700 })
      }
      ctx(170, 'Контекст «Бронь»', 'Context “Booking”'); ctx(530, 'Контекст «Оплата»', 'Context “Payment”')
      // Гейты на границах и событие между контекстами
      c.arrow(262, 170, 438, 170, M, { w: 1.8, dash: '5 4' })
      c.seal(290, 170, A, 'check', { r: 13 }); c.seal(410, 170, A, 'check', { r: 13 })
      c.card(300, 146, 100, 48, M, { lines: [{ t: l('событие', 'event'), dy: 20, size: 10.5, w: 600 }, { t: l('БроньСоздана', 'BookingCreated'), dy: 38, size: 11.5, w: 800 }] })
      c.text(350, 218, l('гейт на границе', 'gate on the border'), W, { size: 11.5, w: 800 })
      // Набор функций MCP у каждого
      for (const [x, names] of [[170, ['create', 'cancel', 'list']], [530, ['charge', 'refund', 'status']]] as [number, string[]][]) {
        c.cable(x, 274, x, 294, A)
        c.card(x - 80, 296, 160, 42, A, { lines: [{ t: 'MCP: ' + names.join(' · '), dy: 26, size: 11, w: 700 }] })
      }
    },
  },
  // Набор функций MCP: все подряд против узкого набора (Anthropic, tool search: 58 функций ≈ 55 тыс. токенов → ≈ 8,7 тыс.; точность Opus 4 49% → 74%)
  'mcp-sets': {
    ru: 'Слева агент подключён ко всем функциям подряд: около 55 тысяч токенов описаний на 58 функций. Справа только нужные, найденные поиском: около 8,7 тысячи токенов, точность выбора у Opus 4 выросла с 49% до 74%',
    en: 'Left: the agent is connected to every function: about 55 thousand tokens of descriptions for 58 functions. Right: only the needed ones, found by search: about 8.7 thousand tokens, and Opus 4 picked the right function 74% of the time instead of 49%',
    viewBox: [0, 0, 700, 320],
    draw: (c, l) => {
      c.caps(170, 24, l('Все функции подряд', 'Every function'), W); c.caps(530, 24, l('Только нужные', 'Only the needed ones'), A)
      const L = c.iso(110, 150, 24); L.tile(-1.6, -1.6, 3.2, 3.2, { grid: false }); L.agent(0, 0, A, 1.25, '')
      for (let i = 0; i < 7; i++) { const y = 52 + i * 26; c.cable(150, 150, 262, y, M); c.rect(262, y - 9, 56, 18, { rx: 4, fill: M, fillOp: 0.25, stroke: M, sw: 1.2 }) }
      c.rect(60, 256, 266, 18, { rx: 9, fill: W, fillOp: 0.9 })
      c.text(193, 252, l('≈ 55 тыс. токенов на описания', '≈ 55k tokens of descriptions'), W, { size: 12, w: 800 })
      c.thenArrow(338, 372, 150)
      const R = c.iso(450, 150, 24); R.tile(-1.6, -1.6, 3.2, 3.2, { grid: false }); R.agent(0, 0, A, 1.25, '')
      for (let i = 0; i < 2; i++) { const y = 118 + i * 38; c.cable(490, 150, 600, y, A); c.rect(600, y - 9, 56, 18, { rx: 4, fill: A, fillOp: 0.25, stroke: A, sw: 1.2 }) }
      c.rect(400, 256, 46, 18, { rx: 9, fill: A, fillOp: 0.9 })
      c.text(523, 252, l('≈ 8,7 тыс. токенов', '≈ 8.7k tokens'), A, { size: 12, w: 800 })
      c.text(528, 296, l('Opus 4 выбирает верную функцию: 49% → 74%', 'Opus 4 picks the right function: 49% → 74%'), A, { size: 12, w: 800 })
    },
  },
  // Гейт вне агента: подсказка в тексте агент может обойти, гейт в хуке или в правах сервера — нет
  'outside-agent': {
    ru: 'Слева правило написано в тексте инструкции: агент может пройти мимо. Справа гейт стоит вне агента, в хуке клиента или в правах сервера: пройти мимо нельзя',
    en: 'Left: the rule is written in the instructions, and the agent can walk past it. Right: the gate stands outside the agent, in a client hook or the server’s permissions, and cannot be bypassed',
    viewBox: [0, 0, 700, 300],
    draw: (c, l) => {
      c.caps(170, 22, l('Правило в тексте', 'A rule in the text'), W); c.caps(530, 22, l('Гейт вне агента', 'A gate outside the agent'), A)
      const L = c.iso(170, 130, 26); L.tile(-2.2, -2.2, 4.4, 4.4, { grid: false }); L.agent(-1.3, 0.8, A, 1.2, ''); L.doc(1.3, -1.6, 0, 1.0, 0.8, M, 3, true)
      L.path([[-0.6, 0.5], [0.9, -0.9]], W, { w: 2.6, arrow: true })
      c.card(140, 62, 112, 40, M, { dash: '5 4', lines: [{ t: l('«проверь тесты»', '“run the tests”'), dy: 25, size: 11, w: 700 }] })
      c.badge(262, 84, W, '!', { r: 12 })
      c.text(170, 232, l('агент может не заметить', 'the agent may miss it'), W, { size: 12, w: 800 })
      c.text(170, 252, l('совет, а не запрет', 'advice, not a ban'), M, { size: 11, w: 600 })
      const R = c.iso(530, 130, 26); R.tile(-2.2, -2.2, 4.4, 4.4, { grid: false }); R.agent(-1.3, 0.8, A, 1.2, ''); R.doc(1.3, -1.6, 0, 1.0, 0.8, M, 3, true)
      R.barrier(0.3, -0.4, 2.0, W)
      R.path([[-0.6, 0.5], [-0.1, 0.0]], A, { w: 2.6 })
      c.badge(530, 112, W, '', { mark: 'cross', r: 13 })
      c.seal(560, 70, A, 'check', { r: 12 })
      c.text(530, 232, l('пройти нельзя', 'it cannot pass'), A, { size: 12, w: 800 })
      c.text(530, 252, l('хук клиента или права сервера', 'a client hook or server permissions'), M, { size: 11, w: 600 })
      c.line([[350, 40], [350, 262]], M, { w: 1, op: 0.35, dash: '3 5' })
    },
  },
  // Четыре способа обойти гейт и что о них известно
  bypass: {
    ru: 'Четыре способа обойти гейт. Агент правит или подгоняет под тест: o3 у METR обманывал в 0,7% запусков, на одной из задач 21 из 21; GPT-5 в ImpossibleBench в 54% случаев. Монитор действий ловит 60% обмана, монитор рассуждений 95%, но под давлением агент прячет намерение. После 8 отказов подряд Claude Code сам обрывает ход. Ревьюер-человек привыкает: одобрений 30,1% → 36,8%',
    en: 'Four ways around a gate. The agent edits or special-cases the test: METR’s o3 cheated in 0.7% of runs and in 21 of 21 on one task; GPT-5 cheated in 54% of ImpossibleBench cases. An action monitor catches 60% of cheating and a reasoning monitor 95%, but under pressure the agent hides its intent. After 8 refusals in a row Claude Code ends the turn itself. A human reviewer gets used to it: approvals 30.1% → 36.8%',
    viewBox: [0, 0, 700, 372],
    draw: (c, l) => {
      const i = c.iso(350, 100, 22); i.tile(-3.4, -1.6, 6.8, 3.2, { grid: false }); i.agent(-2.4, 0, A, 1.1, ''); i.barrier(0, 0, 2.0, W)
      i.path([[-1.5, 0], [-0.5, 0]], A, { w: 2.6, arrow: true }); i.doc(2.2, -0.6, 0, 0.9, 0.7, M, 3)
      c.curve(238, 74, 462, 74, W, { c1: [262, 26], c2: [438, 26], w: 2.4, dash: '6 5' })
      c.text(350, 16, l('четыре пути вокруг гейта', 'four paths around the gate'), W, { size: 12, w: 800 })
      const cards: { x: number; t: [string, string]; v: [string, string]; ru: string[]; en: string[] }[] = [
        { x: 20, t: ['Правит тест', 'Edits the test'], v: ['0,7%', '0.7%'], ru: ['запусков o3 у METR,', 'на одной задаче', '21 из 21'], en: ['of o3 runs at METR,', 'on one task', '21 of 21'] },
        { x: 190, t: ['Подгоняет под тест', 'Special-cases the test'], v: ['54%', '54%'], ru: ['GPT-5 в ImpossibleBench,', 'тесты «только чтение»', 'это не лечат'], en: ['GPT-5 in ImpossibleBench,', 'read-only tests', 'do not cure it'] },
        { x: 360, t: ['Прячет намерение', 'Hides its intent'], v: ['95%', '95%'], ru: ['ловит монитор рассуждений,', 'под давлением охват', 'падает почти до нуля'], en: ['caught by a reasoning monitor,', 'under pressure recall', 'drops to near zero'] },
        { x: 530, t: ['Ревьюер привыкает', 'Reviewer gets used to it'], v: ['36,8%', '36.8%'], ru: ['одобрений вместо 30,1%', 'за 7 месяцев,', '11 429 ревью'], en: ['approvals instead of 30.1%', 'over 7 months,', '11,429 reviews'] },
      ]
      for (const k of cards) {
        c.card(k.x, 196, 150, 142, W, { fillOp: 0.06, lines: [{ t: l(...k.t), dy: 28, size: 12, w: 800 }, { t: l(...k.v), dy: 70, size: 26, w: 800 }, ...(l('ru', 'en') === 'ru' ? k.ru : k.en).map((t, i) => ({ t, dy: 94 + i * 15, size: 9.5, w: 600, col: M }))] })
      }
      c.text(350, 360, l('Пятый путь: сам гейт вечно отказывает — после 8 отказов подряд Claude Code обрывает ход', 'A fifth path: a gate that keeps refusing — after 8 refusals in a row Claude Code ends the turn'), M, { size: 10.5, w: 600 })
    },
  },
  // Откуда слово: инспекция кода, Stage-Gate, гейт по новому коду, гейты для агентов
  timeline: {
    ru: 'Откуда слово: 1976 — формальная инспекция кода (Фэган), 1990 — Stage-Gate Купера с решениями «идти или остановить», 2020 — гейт качества по новому коду в Sonar, 2026 — гейты для агентов',
    en: 'Where the word comes from: 1976, formal code inspection (Fagan); 1990, Cooper’s Stage-Gate with go/kill decisions; 2020, a quality gate on new code at Sonar; 2026, gates for agents',
    viewBox: [0, 0, 700, 250],
    draw: (c, l) => {
      c.line([[40, 120], [660, 120]], M, { w: 2.2 })
      const pts: [number, string, string, string, string, string, boolean][] = [
        [110, '1976', 'Инспекция кода', 'Code inspection', 'просмотр перед сдачей', 'a review before handover', false],
        [260, '1990', 'Stage-Gate', 'Stage-Gate', 'Купер: «идти или стоп» на каждом этапе', 'Cooper: go or kill at every stage', false],
        [440, '2020', 'Гейт по новому коду', 'Gate on new code', 'Sonar: прошёл или нет, без середины', 'Sonar: pass or fail, nothing between', false],
        [600, '2026', 'Гейты для агентов', 'Gates for agents', 'Sonar, Anthropic, Radar', 'Sonar, Anthropic, Radar', true],
      ]
      pts.forEach(([x, y, ru, en, sr, se, now], k) => {
        c.dot(x, 120, 9, now ? A : M)
        const up = k % 2 === 0
        c.text(x, up ? 52 : 162, y, now ? A : M, { size: 16, w: 800 })
        c.text(x, up ? 72 : 182, l(ru, en), now ? A : M, { size: 12, w: 800 })
        c.text(x, up ? 90 : 200, l(sr, se), M, { size: 10.5, w: 600 })
      })
    },
  },
}

export default scenes
