// Схема поста «Уровни зрелости работы с ИИ-агентами»: шесть ступеней на примере недельного отчёта по продажам.
// На каждой ступени знание уходит из головы человека в файл или код. Цвета по ролям: серый — человек,
// синий — агент и всё, что записано для него (спека, скилл, скрипт, проверки), оранжевый — риск (приходится объяснять заново).
import { type Canvas, type Iso, type L, type Scene, A, M, W } from '@/lib/infographic'

type Draw = Canvas
type Lf = L

// Что стоит на островке каждой ступени
const objects: ((i: Iso) => void)[] = [
  (i) => i.person(0, 0, M, ''),
  (i) => i.agent(0, 0, A, 1, ''),
  (i) => i.doc(-0.6, -0.5, 0, 1.3, 1, A, 3),
  (i) => { i.box(-0.7, -0.7, 0, 1.4, 1.4, 0.35, A, 0.55); i.doc(-0.5, -0.4, 0.35, 1, 0.8, A, 3, true) },
  (i) => { i.box(-0.6, -0.6, 0, 1.2, 1.2, 1, A); i.text(0, 0, '{ }', '#fff', { gz: 1, size: 12, w: 800 }) },
  (i) => { i.agent(-1.0, 0.1, A, 0.9, ''); i.doc(0.1, -1.1, 0, 0.9, 0.7, A, 2, true); i.bug(1.2, 1.1, W) },
]

const names = (l: Lf) => [l('Чат', 'Chat'), l('Агент', 'Agent'), l('Спека', 'Spec'), l('Скилл', 'Skill'), l('Скрипт', 'Script'), l('Система', 'System')]
const notes = (l: Lf) => [
  l('объяснять заново', 'explain again'), l('делает и забывает', 'does it, then forgets'), l('что нужно — в файле', 'what to do is in a file'),
  l('как делать — в файле', 'how to do it is in a file'), l('шаги делает код', 'code runs the steps'), l('ошибка → правило', 'mistake → rule'),
]
const places = (l: Lf) => [l('в голове', 'in the head'), l('в сессии', 'in the session'), 'spec.md', 'SKILL.md', 'report.py', l('в репозитории', 'in the repo')]

const aria = (l: Lf) => l(
  'Шесть ступеней на примере недельного отчёта по продажам. Чат: человек объясняет заново каждый раз, знание в голове. Агент: делает сам, но забывает, знание в сессии. Спека: что нужно, лежит в файле spec.md. Скилл: как делать, лежит в файле SKILL.md. Скрипт: шаги делает код report.py. Система: ошибка становится новым правилом, знание в репозитории',
  'Six steps on the example of a weekly sales report. Chat: a person explains it again every time, the knowledge is in their head. Agent: does it but forgets, the knowledge is in the session. Spec: what is needed lies in spec.md. Skill: how to do it lies in SKILL.md. Script: code report.py runs the steps. System: a mistake becomes a new rule, the knowledge is in the repository',
)

function step(c: Draw, l: Lf, k: number, x: number, y: number) {
  const i = c.iso(x, y, 19)
  i.tile(-1.5, -1.5, 3, 3)
  objects[k](i)
  c.text(x, y + 50, names(l)[k], k === 0 ? M : A, { size: 13, w: 800 })
  c.text(x, y + 66, notes(l)[k], k === 0 ? W : M, { size: 10, w: 600 })
  c.text(x, y + 80, places(l)[k], M, { size: 10, w: 700 })
  if (k === 0) c.badge(x + 24, y - 34, W, '!', { r: 10 })
}

const scenes: Record<string, Scene> = {
  // Лестница из шести островков: чем выше, тем больше знания лежит в файле или коде
  ladder: {
    ru: aria((r) => r), en: aria((_, e) => e),
    viewBox: [0, 0, 740, 290], cls: 'rv', style: '',
    draw: (c, l) => {
      c.title(aria(l))
      c.text(20, 22, l('Один и тот же недельный отчёт по продажам', 'The same weekly sales report'), M, { size: 13, w: 800, anchor: 'start' })
      for (let k = 0; k < 6; k++) step(c, l, k, 70 + 120 * k, 190 - 24 * k)
      for (let k = 0; k < 5; k++) c.arrow(70 + 120 * k + 48, 190 - 24 * k - 6, 70 + 120 * (k + 1) - 48, 190 - 24 * (k + 1) + 6, A, { w: 2 })
    },
  },
  // Чат: три понедельника подряд человек объясняет одно и то же
  chat: {
    ru: 'Три понедельника подряд человек заново объясняет в чате одно и то же: какие колонки, в какой валюте, откуда данные. Знание остаётся в голове',
    en: 'Three Mondays in a row a person explains the same thing in a chat again: which columns, which currency, where the data comes from. The knowledge stays in the head',
    viewBox: [0, 0, 700, 270],
    draw: (c, l) => {
      const qs = [l('какие колонки?', 'which columns?'), l('в какой валюте?', 'which currency?'), l('откуда данные?', 'where is the data?')]
      ;[130, 350, 570].forEach((x, k) => {
        c.text(x, 30, l(`Понедельник ${k + 1}`, `Monday ${k + 1}`), M, { size: 13, w: 800 })
        const i = c.iso(x, 150, 19); i.tile(-1.5, -1.5, 3, 3); i.person(0, 0, M, '')
        c.bubble(x - 58, 50, 118, 30, M, { tail: [48, 6, 12, 14] }); c.text(x + 1, 70, qs[k], M, { size: 11.5, w: 700 })
        c.text(x, 222, l('объясняет заново', 'explains again'), W, { size: 12, w: 800 })
      })
      c.badge(603, 108, W, '!', { r: 10 })
      c.arrow(196, 150, 284, 150, W, { w: 2, dash: '5 4' }); c.arrow(416, 150, 504, 150, W, { w: 2, dash: '5 4' })
      c.text(350, 254, l('ничего не записано: в следующий раз всё то же самое', 'nothing is written down: next time it is the same again'), M, { size: 12, w: 700 })
    },
  },
  // Агент и правила: ошибка → строка в файле правил → следующая сессия без ошибки
  'agent-rules': {
    ru: 'Агент считает суммы в долларах, человек добавляет в файл правил строку «суммы в рублях», и следующая сессия агента читает файл и не повторяет ошибку',
    en: 'The agent counts sums in dollars, a person adds the line “sums in roubles” to the rules file, and the agent’s next session reads the file and does not repeat the mistake',
    viewBox: [0, 0, 700, 270],
    draw: (c, l) => {
      const a = c.iso(120, 140, 19); a.tile(-1.5, -1.5, 3, 3); a.agent(-0.5, 0.2, A, 1, ''); a.doc(0.2, -1.0, 0, 1, 0.8, W, 3); a.bug(1.2, 0.9, W)
      c.text(120, 212, l('1. Агент ошибся', '1. The agent erred'), W, { size: 13, w: 800 }); c.text(120, 230, l('суммы в долларах', 'sums in dollars'), M, { size: 11.5, w: 600 })
      const b = c.iso(350, 140, 19); b.tile(-1.5, -1.5, 3, 3); b.doc(-0.7, -0.7, 0, 1.4, 1.1, A, 4)
      c.pen(392, 98, M)
      c.text(350, 212, l('2. Строка в файле правил', '2. A line in the rules file'), A, { size: 13, w: 800 }); c.text(350, 230, l('«суммы — в рублях»', '“sums — in roubles”'), M, { size: 11.5, w: 600 })
      const d = c.iso(580, 140, 19); d.tile(-1.5, -1.5, 3, 3); d.agent(-0.6, 0.2, A, 1, ''); d.doc(0.2, -1.0, 0, 1, 0.8, A, 3, true)
      c.text(580, 212, l('3. Следующая сессия', '3. The next session'), A, { size: 13, w: 800 }); c.text(580, 230, l('читает файл и не повторяет', 'reads the file, no repeat'), M, { size: 11.5, w: 600 })
      c.arrow(188, 140, 282, 140, A, { w: 2 }); c.arrow(418, 140, 512, 140, A, { w: 2 })
      c.text(350, 258, l('одна строка на одно плохое поведение агента', 'one line per bad agent behaviour'), M, { size: 12, w: 700 })
    },
  },
  // Четыре уровня зрелости спеки
  'spec-levels': {
    ru: 'Четыре уровня зрелости спеки: написана до кода, живёт после задачи, код генерируется из неё, спеку поправляет работающая система',
    en: 'Four maturity levels of a spec: written before the code, living on after the task, the code generated from it, the spec corrected by the running system',
    viewBox: [0, 0, 700, 270],
    draw: (c, l) => {
      const xs = [90, 265, 440, 615]
      const names = ['Spec-first', 'Spec-anchored', 'Spec-as-source', 'Spec-in-the-loop']
      const subs = [l('спека до кода', 'spec before code'), l('живёт после задачи', 'lives after the task'), l('код из спеки', 'code from the spec'), l('учится у системы', 'learns from the system')]
      const progs = ['Spec Kit', 'OpenSpec', 'Tessl', l('готовых нет', 'none yet')]
      xs.forEach((x, k) => {
        const i = c.iso(x, 115, 19); i.tile(-1.8, -1.8, 3.6, 3.6, k === 3 ? { dash: '5 4', edge: M } : {})
        if (k === 0) { i.doc(-1.2, -0.7, 0, 1.1, 0.9, A, 3); i.box(0.5, 0.0, 0, 0.9, 0.9, 0.5, A, 0.55); i.path([[-0.1, 0.3], [0.4, 0.3]], A, { arrow: true }) }
        if (k === 1) { i.doc(-1.2, -0.7, 0, 1.1, 0.9, A, 3); i.doc(-1.2, -0.7, 0.22, 1.1, 0.9, A, 3); i.doc(-1.2, -0.7, 0.44, 1.1, 0.9, A, 3, true); i.box(0.5, 0.0, 0, 0.9, 0.9, 0.5, A, 0.55) }
        if (k === 2) { i.doc(-1.4, -0.9, 0, 1.4, 1.1, A, 4, true); i.box(0.5, 0.0, 0, 0.9, 0.9, 0.5, A, 0.25); i.path([[0.1, 0.3], [0.4, 0.3]], A, { arrow: true, dash: '3 3' }) }
        if (k === 3) { i.doc(-1.4, -1.0, 0, 1.1, 0.9, A, 3); i.cyl(1.0, 0.7, 0, 0.45, 0.6, M); i.path([[0.5, 0.6], [-0.2, 0.1]], A, { arrow: true }) }
        c.text(x, 190, names[k], A, { size: 12.5, w: 800 }); c.text(x, 207, subs[k], M, { size: 11, w: 600 }); c.text(x, 224, progs[k], M, { size: 11, w: 700 })
      })
      c.badge(662, 62, A, '↻', { r: 10 })
      c.text(350, 258, l('четвёртый уровень добавлен в докладе автора сайта; готовых программ для него нет', 'the fourth level is added in the site author’s talk; there are no ready programs for it'), M, { size: 11, w: 600 })
    },
  },
  // Спека и скилл: что делать и как делать, и как скилл попадает в контекст
  'spec-skill': {
    ru: 'Спека говорит агенту, что нужно получить, и лежит в контексте задачи. Скилл говорит, как это делается: название и описание агент видит всегда, а целиком скилл подгружается по вызову',
    en: 'A spec tells the agent what to produce and sits in the task context. A skill tells how it is done: the agent always sees its name and description, and the skill is loaded in full on call',
    viewBox: [0, 0, 700, 280],
    draw: (c, l) => {
      const s = c.iso(110, 130, 19); s.tile(-1.5, -1.5, 3, 3); s.doc(-0.7, -0.7, 0, 1.4, 1.1, A, 4)
      c.text(110, 200, l('Спека · ЧТО', 'Spec · WHAT'), A, { size: 13, w: 800 }); c.text(110, 218, l('цель и признаки готовности', 'goal and done criteria'), M, { size: 11, w: 600 })
      const g = c.iso(350, 130, 19); g.tile(-1.5, -1.5, 3, 3); g.agent(0, 0, A, 1.15, '')
      c.text(350, 200, l('Агент', 'Agent'), A, { size: 13, w: 800 }); c.text(350, 218, l('делает задачу', 'does the task'), M, { size: 11, w: 600 })
      const k = c.iso(590, 130, 19); k.tile(-1.5, -1.5, 3, 3); k.box(-0.8, -0.8, 0, 1.6, 1.6, 0.35, A, 0.55); k.doc(-0.6, -0.5, 0.35, 1.2, 0.9, A, 3, true)
      c.text(590, 200, l('Скилл · КАК', 'Skill · HOW'), A, { size: 13, w: 800 }); c.text(590, 218, 'SKILL.md', M, { size: 11, w: 700 })
      c.arrow(180, 126, 292, 126, A, { w: 2.5 }); c.text(236, 114, l('в контексте задачи', 'in the task context'), A, { size: 10.5, w: 700 })
      c.arrow(520, 112, 408, 112, A, { w: 1.6, dash: '3 4' }); c.text(464, 100, l('всегда: название и описание', 'always: name and description'), M, { size: 10.5, w: 700 })
      c.arrow(520, 146, 408, 146, A, { w: 3 }); c.text(464, 166, l('по вызову: целиком', 'on call: in full'), A, { size: 10.5, w: 800 })
      c.text(350, 260, l('занимает место в контексте только то, что нужно сейчас', 'only what is needed now takes space in the context'), M, { size: 12, w: 700 })
    },
  },
  // Скилл против скрипта: десять запусков
  'skill-script': {
    ru: 'Десять запусков скилла дают заметно разные результаты и тратят токены на каждый запуск. Десять запусков скрипта дают один и тот же результат и не тратят токены',
    en: 'Ten runs of a skill give noticeably different results and spend tokens on every run. Ten runs of a script give the same result and spend no tokens',
    viewBox: [0, 0, 700, 290],
    draw: (c, l) => {
      const a = c.iso(170, 130, 19); a.tile(-2, -1.8, 4, 3.6); a.agent(-0.2, -0.9, A, 1, '')
      for (let n = 0; n < 10; n++) a.doc(-1.6 + n * 0.32, 0.9, 0, 0.24, 0.3, [2, 5, 8].includes(n) ? W : M, 1)
      c.text(170, 208, l('Скилл · 10 запусков', 'Skill · 10 runs'), A, { size: 13, w: 800 }); c.text(170, 226, l('результаты немного разные', 'results differ a little'), W, { size: 11.5, w: 700 }); c.text(170, 243, l('токены на каждый запуск', 'tokens on every run'), M, { size: 11, w: 600 })
      const b = c.iso(530, 130, 19); b.tile(-2, -1.8, 4, 3.6); b.box(-0.5, -1.2, 0, 1, 1, 0.9, A); b.text(0, -0.7, '{ }', '#fff', { gz: 0.9, size: 12, w: 800 })
      for (let n = 0; n < 10; n++) b.doc(-1.6 + n * 0.32, 0.9, 0, 0.24, 0.3, A, 1)
      c.text(530, 208, l('Скрипт · 10 запусков', 'Script · 10 runs'), A, { size: 13, w: 800 }); c.text(530, 226, l('результат один и тот же', 'the same result'), M, { size: 11.5, w: 700 }); c.text(530, 243, l('0 токенов, секунды', '0 tokens, seconds'), M, { size: 11, w: 600 })
      c.line([[350, 40], [350, 262]], M, { w: 1, op: 0.4, dash: '3 5' })
      c.text(350, 280, l('повторяется, дорого или должно быть предсказуемо — скрипт', 'repeats, is expensive or must be predictable — a script'), M, { size: 11.5, w: 700 })
    },
  },
  // Три режима Malik: повышение и возврат
  'crystal-modes': {
    ru: 'Три режима из статьи Malik: агент, гибрид и код. Вверх по лестнице поведение повышают после десяти и пятидесяти успешных запусков, а при сбое возвращают на ступень ниже',
    en: 'The three modes from Malik’s paper: agent, hybrid and code. Behaviour is promoted after ten and fifty successful runs and demoted one step on a failure',
    viewBox: [0, 0, 700, 330],
    draw: (c, l) => {
      const xs = [110, 350, 590]
      const names = [l('Агент · Type 3', 'Agent · Type 3'), l('Гибрид · Type 2', 'Hybrid · Type 2'), l('Код · Type 1', 'Code · Type 1')]
      const m1 = [l('одинаково в ~50%', 'same in ~50%'), l('одинаково в ~90%', 'same in ~90%'), l('одинаково в 100%', 'same in 100%')]
      const m2 = [l('10–50 тыс. токенов', '10–50k tokens'), l('1–5 тыс. токенов', '1–5k tokens'), l('0 токенов', '0 tokens')]
      xs.forEach((x, k) => {
        const i = c.iso(x, 150, 19); i.tile(-1.5, -1.5, 3, 3)
        if (k === 0) i.agent(0, 0, A, 1.1, '')
        if (k === 1) { i.agent(-0.8, 0.3, A, 0.8, ''); i.box(0.1, -0.9, 0, 1, 1, 0.8, A) }
        if (k === 2) { i.box(-0.5, -0.5, 0, 1, 1, 0.9, A); i.text(0, 0, '{ }', '#fff', { gz: 0.9, size: 12, w: 800 }) }
        c.text(x, 222, names[k], A, { size: 13, w: 800 }); c.text(x, 240, m1[k], M, { size: 11.5, w: 600 }); c.text(x, 256, m2[k], M, { size: 11.5, w: 600 })
      })
      c.arrow(176, 90, 284, 90, A, { w: 2.5 }); c.text(230, 78, l('≥10 успешных запусков', '≥10 successful runs'), A, { size: 10.5, w: 700 })
      c.arrow(416, 90, 524, 90, A, { w: 2.5 }); c.text(470, 78, l('≥50 гибридных запусков', '≥50 hybrid runs'), A, { size: 10.5, w: 700 })
      c.arrow(524, 290, 416, 290, W, { w: 2, dash: '5 4' }); c.arrow(284, 290, 176, 290, W, { w: 2, dash: '5 4' })
      c.text(350, 312, l('сбой, нарушение безопасности или провал тестов — на ступень ниже', 'a failure, a safety violation or failing tests — one step down'), W, { size: 12, w: 700 })
    },
  },
  // Цикл Every: Plan → Work → Review → Compound, и записи, которые делают следующий круг лучше
  'compound-loop': {
    ru: 'Цикл из четырёх шагов: план, работа, ревью и запись урока. Шаг записи кладёт урок в файл правил, документ с решением и скилл, и следующая задача идёт лучше',
    en: 'A loop of four steps: plan, work, review and recording the lesson. The recording step puts the lesson into the rules file, a solution document and a skill, so the next task goes better',
    viewBox: [0, 0, 700, 365],
    draw: (c, l) => {
      const xs = [90, 250, 410, 590]
      const names = ['Plan', 'Work', 'Review', 'Compound']
      const subs = [l('идея → план', 'idea → plan'), l('агент по плану', 'agent follows it'), l('агенты проверяют', 'agents check'), l('урок записан', 'lesson recorded')]
      xs.forEach((x, k) => {
        const i = c.iso(x, 110, 17); i.tile(-1.5, -1.5, 3, 3, k === 3 ? { dash: '5 4', edge: A } : {})
        if (k === 0) i.doc(-0.7, -0.6, 0, 1.3, 1, A, 3)
        if (k === 1) i.agent(0, 0, A, 1, '')
        if (k === 2) { i.agent(-0.8, 0.2, A, 0.75, ''); i.agent(0.7, -0.6, A, 0.75, ''); i.bug(0.9, 0.8, W) }
        if (k === 3) { i.doc(-1.3, -0.9, 0, 0.8, 0.7, A, 2, true); i.doc(-0.3, -0.9, 0, 0.8, 0.7, A, 2, true); i.doc(-0.8, 0.1, 0, 0.8, 0.7, A, 2, true) }
        c.text(x, 176, names[k], A, { size: 13, w: 800 }); c.text(x, 193, subs[k], M, { size: 11, w: 600 })
      })
      ;[[150, 190], [310, 350], [470, 530]].forEach(([a, b]) => c.arrow(a, 110, b, 110, A, { w: 2.5 }))
      c.curve(590, 250, 90, 250, A, { c1: [590, 340], c2: [90, 340], w: 2, dash: '5 4' })
      c.text(340, 345, l('следующая задача начинается уже с записанным уроком', 'the next task starts with the lesson already written down'), A, { size: 12, w: 800 })
      c.text(590, 212, 'CLAUDE.md · docs/solutions', M, { size: 10.5, w: 700 }); c.text(590, 226, l('скиллы · новые агенты', 'skills · new agents'), M, { size: 10.5, w: 700 })
    },
  },
  // Матрица: какую ступень у какого автора описано
  matrix: {
    ru: 'Матрица семи источников и шести ступеней: у каждого автора описана часть ступеней, и ни у кого нет всех шести, а шесть ступеней статьи собраны из этих отрезков',
    en: 'A matrix of seven sources and six steps: each author describes part of the steps and nobody has all six; the six steps of this article are assembled from these stretches',
    viewBox: [0, 0, 700, 380],
    draw: (c, l) => {
      const cols = [l('Чат', 'Chat'), l('Агент', 'Agent'), l('Спека', 'Spec'), l('Скилл', 'Skill'), l('Скрипт', 'Script'), l('Система', 'System')]
      const cx = (k: number) => 270 + 75 * k
      cols.forEach((t, k) => c.text(cx(k), 30, t, A, { size: 12.5, w: 800 }))
      const F = 2, R = 1, N = 0
      const rows: [string, number[]][] = [
        ['Every', [F, F, R, R, N, F]], ['Hashimoto', [F, F, N, N, F, F]], ['Eledath', [F, F, N, F, R, F]], ['Rezvov', [F, F, F, N, R, F]],
        ['Clark', [F, F, F, N, R, R]], ['Shapiro', [F, F, F, F, N, F]], ['Red Hat', [F, F, F, F, N, R]], [l('Эта статья', 'This article'), [F, F, F, F, F, F]],
      ]
      rows.forEach(([name, v], r) => {
        const y = 66 + 38 * r
        if (r === rows.length - 1) c.rect(14, y - 20, 672, 38, { rx: 8, fill: A, fillOp: 0.1, stroke: A, sw: 1.2 })
        c.text(30, y + 4, name, r === rows.length - 1 ? A : M, { size: 12.5, w: 800, anchor: 'start' })
        v.forEach((m, k) => { if (m === F) c.dot(cx(k), y, 9, A); else if (m === R) c.dot(cx(k), y, 8, A, { ring: 2 }); else c.dot(cx(k), y, 2.5, M, { op: 0.5 }) })
      })
      c.dot(200, 356, 6, A); c.text(212, 360, l('есть явно', 'explicit'), M, { size: 11, w: 600, anchor: 'start' })
      c.dot(310, 356, 6, A, { ring: 2 }); c.text(322, 360, l('близкий смысл', 'close in meaning'), M, { size: 11, w: 600, anchor: 'start' })
      c.dot(450, 356, 2.5, M, { op: 0.5 }); c.text(460, 360, l('нет', 'none'), M, { size: 11, w: 600, anchor: 'start' })
    },
  },
  // Та же лестница для телефона: две колонки по три ступени
  'ladder-mobile': {
    ru: aria((r) => r), en: aria((_, e) => e),
    viewBox: [0, 0, 380, 480], cls: 'rv rv-v', style: '',
    draw: (c, l) => {
      c.title(aria(l))
      c.text(190, 20, l('Один и тот же недельный отчёт по продажам', 'The same weekly sales report'), M, { size: 11.5, w: 800 })
      for (let k = 0; k < 6; k++) step(c, l, k, 95 + 190 * (k % 2), 90 + 150 * Math.floor(k / 2))
      for (let k = 0; k < 5; k++) {
        const x1 = 95 + 190 * (k % 2), y1 = 90 + 150 * Math.floor(k / 2), x2 = 95 + 190 * ((k + 1) % 2), y2 = 90 + 150 * Math.floor((k + 1) / 2)
        if (k % 2 === 0) c.arrow(x1 + 48, y1, x2 - 48, y2, A, { w: 2 })
        else c.arrow(x1 - 30, y1 + 96, x2 + 30, y2 - 52, A, { w: 2, dash: '4 4' })
      }
    },
  },
}
export default scenes
