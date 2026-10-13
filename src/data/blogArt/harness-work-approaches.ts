// Схемы поста «Подходы к работе с харнессом» (цвета задаёт CSS поста по классам rv-*).
// У каждой схемы две раскладки: широкая (class="rv") и узкая для телефона (class="rv rv-v"), CSS показывает одну из них.
import { type Canvas, type L, type Scene, marker } from '@/lib/infographic'

type Anchor = 'start' | 'middle' | 'end'
// Детали схем rv-*: узел, подпись, стрелка с маркером, галочка, крестик, цветная полоска слева у узла-запроса
const rv = (c: Canvas, mk: string) => ({
  n: (x: number, y: number, w: number, h: number, cls = '') => c.box(x, y, w, h, { cls: `rv-n${cls ? ' ' + cls : ''}`, rx: 7 }),
  t: (x: number, y: number, t: string, cls: string, anchor: Anchor = 'middle') => c.label(x, y, t, { cls, anchor }),
  e: (d: string, cls = '', m = mk) => c.edge(d, { cls: `rv-e ${cls}`, marker: m }),
  ok: (d: string, cls = '') => c.edge(d, { cls: `rv-ok${cls ? ' ' + cls : ''}` }),
  x: (d: string) => c.edge(d, { cls: 'rv-x' }),
  bar: (x: number, y: number, h: number, op?: number) => c.box(x, y, 6, h, { rx: 2, style: `fill:var(--muted)${op ? `;fill-opacity:${op}` : ''}` }),
})

const pathsAria = (l: L) => l('Если ответ не подошёл, есть три пути: модель поняла задачу — уточнить в том же чате; поняла неверно или выдумала факты — переделать запрос с недостающими данными и разрешением ответить «не знаю» и отправить в новый чат; неясно, что нужно — сначала попросить три вопроса и собрать из ответов промпт из шести частей. Каждый путь даёт новый ответ; если он снова не подошёл, цикл повторяется',
  'If the answer misses there are three paths: the model understood the task — refine in the same chat; it misunderstood or made facts up — rewrite the request with the missing data and permission to say “I don’t know”, and send it in a new chat; it is unclear what is needed — first ask for three questions and build a six-part prompt from the answers. Each path gives a new answer; if it misses again, the loop repeats')
const runsAria = (l: L) => l('Первый прогон: в запросе ограничение «только номера РФ», агент, тесты прошли, ревью нашло два пропуска. В исходном запросе ограничение убирают, два случая дописывают, и весь пайплайн запускают заново: агент, тесты и ревью, всё покрыто.',
  'First run: the request limits input to Russian numbers, agent, tests pass, review finds two gaps. The limit is removed from the original request, two cases are added, and the whole pipeline runs again: agent, tests and review, all covered.')
const pathsRu = pathsAria((r) => r), pathsEn = pathsAria((_, e) => e)
const runsRu = runsAria((r) => r), runsEn = runsAria((_, e) => e)

// Подписи узлов, общие для широкой и узкой раскладки
const T = (l: L) => ({
  refine: l('Уточнить в том же чате', 'Refine in the same chat'), refineQ: l('«короче», «мягче тон»', '“shorter”, “softer tone”'),
  redo: l('Переделать запрос', 'Rewrite the request'), redoQ: l('+ данные, «не знаю» можно', '+ data, “I don’t know” ok'),
  ask: l('Сначала 3 вопроса', 'First, 3 questions'), askQ: l('вопросы → ваши ответы', 'questions → your answers'),
  chat: l('Новый чат', 'New chat'), prompt: l('Промпт · 6 частей', 'Prompt · 6 parts'), fits: l('Подошёл', 'Fits'),
  req: l('«Нормализуй телефоны»', '“Normalise phones”'), lim: l('только номера РФ', 'Russian numbers only'),
  agent: l('Агент', 'Agent'), tests: l('Тесты', 'Tests'), review: l('Ревью', 'Review'), gaps: l('2 пропуска', '2 gaps'), covered: l('всё покрыто', 'all covered'),
  del: l('− только номера РФ', '− Russian numbers only'), add1: l('+ префикс без «+»', '+ prefix without “+”'), add2: l('+ пустая строка', '+ empty string'),
})

const scenes: Record<string, Scene> = {
  // Ответ не подошёл: три пути (уточнить, переделать запрос в новом чате, сначала 3 вопроса) → новый ответ, иначе новый круг
  'answer-paths': {
    ru: pathsRu, en: pathsEn,
    viewBox: [0, 0, 930, 390], legend: false, cls: 'rv', style: '',
    draw: (c, l) => {
      const { n, t, e, ok, x, bar } = rv(c, 'it-ar'), s = T(l)
      c.title(pathsAria(l))
      c.defs(marker('it-ar', { cls: 'rv-arh' }), marker('it-arb', { style: 'fill:var(--warn)' }))
      n(10, 20, 140, 290, 'bad')
      x('M69,140 l22,22 M91,140 l-22,22')
      t(80, 190, l('Ответ', 'Answer'), 'rv-t')
      t(80, 210, l('не подошёл', 'missed'), 'rv-t')
      e('M150,65 L288,65')
      t(219, 57, l('понял задачу', 'task understood'), 'rv-el')
      bar(290, 30, 70)
      n(290, 30, 230, 70, 'req')
      t(308, 60, s.refine, 'rv-t', 'start')
      t(308, 82, s.refineQ, 'rv-q', 'start')
      e('M520,65 L710,65')
      t(615, 57, l('тот же контекст', 'same context'), 'rv-el')
      e('M150,165 L288,165')
      t(219, 157, l('понял неверно', 'misunderstood'), 'rv-el')
      t(219, 183, l('или выдумал факты', 'or made facts up'), 'rv-el')
      bar(290, 130, 70, 0.7)
      n(290, 130, 230, 70, 'req')
      t(308, 160, s.redo, 'rv-t', 'start')
      t(308, 182, s.redoQ, 'rv-q', 'start')
      e('M520,165 L544,165')
      n(546, 136, 150, 58, 'key')
      t(621, 170, s.chat, 'rv-t sm')
      e('M696,165 L710,165')
      e('M150,265 L288,265')
      t(219, 257, l('неясно, что нужно', 'needs unclear'), 'rv-el')
      bar(290, 230, 70, 0.45)
      n(290, 230, 230, 70, 'req')
      t(308, 260, s.ask, 'rv-t', 'start')
      t(308, 282, s.askQ, 'rv-q', 'start')
      e('M520,265 L544,265')
      n(546, 236, 150, 58, 'key')
      t(621, 270, s.prompt, 'rv-t sm')
      e('M696,265 L710,265')
      n(712, 20, 88, 290)
      t(756, 160, l('Новый', 'New'), 'rv-t')
      t(756, 180, l('ответ', 'answer'), 'rv-t')
      e('M800,165 L818,165')
      n(820, 130, 100, 70, 'good plain')
      ok('M858,150 l7,7 l14,-15', 'big plain')
      t(870, 186, s.fits, 'rv-t sm')
      e('M756,310 L756,350 L80,350 L80,314', 'back', 'it-arb')
      t(416, 374, l('↺ не подошёл — новый круг', '↺ missed again — next round'), 'rv-bl')
    },
  },
  // То же для телефона: пути друг под другом
  'answer-paths-mobile': {
    ru: pathsRu, en: pathsEn,
    viewBox: [0, 0, 360, 738], legend: false, cls: 'rv rv-v', style: '',
    draw: (c, l) => {
      const { n, t, e, ok, x, bar } = rv(c, 'it-arv'), s = T(l)
      c.defs(marker('it-arv', { cls: 'rv-arh' }), marker('it-arvb', { style: 'fill:var(--warn)' }))
      n(24, 10, 326, 50, 'bad')
      x('M40,27 l16,16 M56,27 l-16,16')
      t(187, 41, l('Ответ не подошёл', 'Answer missed'), 'rv-t')
      const newAnswer = (y: number) => { n(24, y, 326, 40); t(187, y + 26, l('Новый ответ', 'New answer'), 'rv-t sm') }
      const path = (y: number, run: string, op: number | undefined, title: string, q: string) => {
        t(24, y, run, 'rv-run', 'start')
        bar(24, y + 8, 56, op)
        n(24, y + 8, 326, 56, 'req')
        t(40, y + 32, title, 'rv-t', 'start')
        t(40, y + 52, q, 'rv-q sm', 'start')
        e(`M187,${y + 64} L187,${y + 80}`)
      }
      path(86, l('1 · понял задачу', '1 · task understood'), undefined, s.refine, s.refineQ)
      newAnswer(168)
      path(236, l('2 · понял неверно или выдумал', '2 · misread or made up'), 0.7, s.redo, s.redoQ)
      n(24, 318, 326, 40, 'key')
      t(187, 344, s.chat, 'rv-t sm')
      e('M187,358 L187,374')
      newAnswer(376)
      path(444, l('3 · неясно, что нужно', '3 · needs unclear'), 0.45, s.ask, s.askQ)
      n(24, 526, 326, 40, 'key')
      t(187, 552, s.prompt, 'rv-t sm')
      e('M187,566 L187,582')
      newAnswer(584)
      e('M187,624 L187,642')
      n(24, 644, 326, 40, 'good plain')
      ok('M40,664 l7,7 l14,-15', 'big plain')
      t(187, 670, s.fits, 'rv-t sm')
      t(187, 710, l('↺ не подошёл — новый круг', '↺ missed again — next round'), 'rv-bl')
      e('M84,716 L84,728 L8,728 L8,35 L22,35', 'back', 'it-arvb')
    },
  },
  // Два прогона: ревью нашло пропуски → правим исходный запрос (v2) и прогоняем весь пайплайн заново
  'two-runs': {
    ru: runsRu, en: runsEn,
    viewBox: [0, 0, 930, 360], legend: false, cls: 'rv', style: '',
    draw: (c, l) => {
      const { n, t, e, ok, x } = rv(c, 'rv-ar'), s = T(l)
      c.title(runsAria(l))
      c.defs(marker('rv-ar', { cls: 'rv-arh' }))
      const pipeline = (y: number) => {
        e(`M240,${y + 29} L278,${y + 29}`)
        n(280, y, 110, 58, 'key'); t(335, y + 35, s.agent, 'rv-t')
        e(`M390,${y + 29} L428,${y + 29}`)
        n(430, y, 120, 58, 'sen'); t(478, y + 35, s.tests, 'rv-t'); ok(`M516,${y + 29} l6,6 l12,-13`)
        e(`M550,${y + 29} L588,${y + 29}`)
        n(590, y, 110, 58, 'sen'); t(645, y + 35, s.review, 'rv-t')
        e(`M700,${y + 29} L738,${y + 29}`)
      }
      t(10, 22, l('прогон 1', 'run 1'), 'rv-run', 'start')
      n(10, 32, 230, 76, 'req')
      t(26, 54, l('Запрос v1', 'Request v1'), 'rv-k', 'start')
      t(26, 76, s.req, 'rv-q', 'start')
      t(26, 96, s.lim, 'rv-q rv-lim', 'start')
      pipeline(32)
      n(740, 32, 180, 58, 'bad')
      x('M760,51 l18,18 M778,51 l-18,18')
      t(850, 67, s.gaps, 'rv-t')
      t(10, 226, l('прогон 2 · весь пайплайн заново', 'run 2 · the whole pipeline again'), 'rv-run', 'start')
      n(10, 236, 230, 114, 'req v2')
      t(26, 258, l('Запрос v2', 'Request v2'), 'rv-k', 'start')
      t(26, 280, s.req, 'rv-q', 'start')
      t(26, 300, s.del, 'rv-del', 'start')
      t(26, 320, s.add1, 'rv-add', 'start')
      t(26, 338, s.add2, 'rv-add', 'start')
      pipeline(236)
      n(740, 236, 180, 58, 'good')
      ok('M760,265 l8,8 l16,-17', 'big')
      t(850, 271, s.covered, 'rv-t')
      e('M830,90 C 830,185 420,170 244,254', 'back')
      t(560, 162, l('правим исходный запрос', 'fix the original request'), 'rv-bl')
    },
  },
  // То же для телефона: два прогона столбиками
  'two-runs-mobile': {
    ru: runsRu, en: runsEn,
    viewBox: [0, 0, 360, 454], legend: false, cls: 'rv rv-v', style: '',
    draw: (c, l) => {
      const { n, t, e, ok, x } = rv(c, 'rv-arv'), s = T(l)
      c.defs(marker('rv-arv', { cls: 'rv-arh' }))
      t(10, 24, l('прогон 1', 'run 1'), 'rv-run', 'start')
      t(190, 24, l('прогон 2', 'run 2'), 'rv-run', 'start')
      // столбик пайплайна: агент, тесты, ревью от высоты y; x0 — левый край
      const pipeline = (x0: number, y: number) => {
        const cx = x0 + 80
        e(`M${cx},${y - 22} L${cx},${y - 2}`)
        n(x0, y, 160, 44, 'key'); t(cx, y + 28, s.agent, 'rv-t')
        e(`M${cx},${y + 44} L${cx},${y + 64}`)
        n(x0, y + 66, 160, 44, 'sen'); t(cx, y + 94, s.tests, 'rv-t'); ok(`M${x0 + 126},${y + 88} l5,5 l10,-11`)
        e(`M${cx},${y + 110} L${cx},${y + 130}`)
        n(x0, y + 132, 160, 44, 'sen'); t(cx, y + 160, s.review, 'rv-t')
        e(`M${cx},${y + 176} L${cx},${y + 196}`)
      }
      n(10, 40, 160, 68, 'req')
      t(20, 57, l('Запрос v1', 'Request v1'), 'rv-k', 'start')
      t(20, 76, s.req, 'rv-q sm', 'start')
      t(20, 96, s.lim, 'rv-q sm rv-lim', 'start')
      pipeline(10, 130)
      n(10, 328, 160, 50, 'bad')
      x('M24,344 l16,16 M40,344 l-16,16')
      t(104, 359, s.gaps, 'rv-t')
      n(190, 40, 160, 104, 'req v2')
      t(200, 57, l('Запрос v2', 'Request v2'), 'rv-k', 'start')
      t(200, 76, s.req, 'rv-q sm', 'start')
      t(200, 96, s.del, 'rv-del sm', 'start')
      t(200, 114, s.add1, 'rv-add sm', 'start')
      t(200, 132, s.add2, 'rv-add sm', 'start')
      pipeline(190, 166)
      n(190, 364, 160, 50, 'good')
      ok('M204,389 l7,7 l14,-15', 'big')
      t(284, 395, s.covered, 'rv-t')
      e('M90,378 C 90,402 180,402 180,130 C 180,90 185,80 188,72', 'back')
      t(10, 444, l('↺ правим исходный запрос', '↺ fix the original request'), 'rv-bl sm', 'start')
    },
  },
}
export default scenes
