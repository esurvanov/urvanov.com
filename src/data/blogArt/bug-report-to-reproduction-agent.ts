// Схемы поста «Баг-репорт → агент воспроизведения»
import { type Scene, A, M, W, bandTitle } from '@/lib/infographic'

type Cv = Parameters<Scene['draw']>[0]
// Подпись на поле с тонкой пунктирной выноской к предмету
const tag = (c: Cv, from: [number, number], to: [number, number], text: string, col: string, anchor: 'start' | 'middle' | 'end' = 'middle') => {
  c.line([from, to], col, { w: 1, dash: '2 3' })
  c.text(to[0] + (anchor === 'end' ? -3 : anchor === 'start' ? 3 : 0), to[1] + (anchor === 'middle' ? -4 : 4), text, col, { size: 10, w: 600, anchor })
}

const scenes: Record<string, Scene> = {
  // Один шаг цепочки: было — QA делает всё сам, стало — агенты делают, QA принимает
  'qa-step': {
    ru: 'Один шаг цепочки: раньше QA выполняет всё сам и тратит всё время, теперь задачи делают агенты, а QA принимает результат', en: 'One step of the chain: before, QA does everything and spends all the time; now agents do the tasks and QA accepts the result',
    viewBox: [0, 0, 700, 280],
    draw: (c, l) => {
      c.caps(180, 16, l('БЫЛО', 'BEFORE'), M); c.caps(530, 16, l('СТАЛО', 'AFTER'), A)
      // Цепочка людей: кольца — участники, закрашенный — шаг QA
      c.line([[50, 44], [290, 44]], M, { w: 1.2, dash: '3 4' })
      c.dot(50, 44, 4.5, M, { ring: 1.5 })
      c.text(50, 64, l('клиент', 'client'), M, { size: 10 })
      c.dot(130, 44, 4.5, M, { ring: 1.5 })
      c.text(130, 64, l('поддержка', 'support'), M, { size: 10 })
      c.dot(210, 44, 7, M)
      c.text(210, 64, 'QA', M, { size: 10 })
      c.dot(290, 44, 4.5, M, { ring: 1.5 })
      c.text(290, 64, l('разработка', 'dev'), M, { size: 10 })
      c.line([[400, 44], [672, 44]], M, { w: 1.2, dash: '3 4' })
      c.dot(400, 44, 4.5, M, { ring: 1.5 })
      c.text(400, 64, l('клиент', 'client'), M, { size: 10 })
      c.dot(491, 44, 4.5, M, { ring: 1.5 })
      c.text(491, 64, l('поддержка', 'support'), M, { size: 10 })
      // Шаг «агенты + QA»: капсула с человеком и кубиком-агентом
      c.rect(555, 33, 54, 22, { rx: 11, fill: A, fillOp: 0.2 })
      c.dot(571, 44, 5, M)
      c.rect(585, 38, 12, 12, { rx: 3, fill: A })
      c.text(582, 64, l('агенты + QA', 'agents + QA'), A, { size: 10 })
      c.dot(672, 44, 4.5, M, { ring: 1.5 })
      c.text(672, 64, l('разработка', 'dev'), M, { size: 10 })
      const i0 = c.iso(180, 176, 26); i0.tile(-2.6, -2.6, 5.2, 5.2); i0.person(1.5, -0.4, M, ''); i0.text(1.5, -0.4, 'QA', M, { size: 11, w: 600, halo: false, dy: 14 }); i0.box(-2.2, 1.8, 0, 4.4, 0.5, 0.3, M)
      for (const [x, y] of [[168.7, 128.1], [204.8, 135.9], [139.5, 142.4], [175.5, 150.2], [135, 163.2]]) c.bug(x, y)
      c.text(112.5, 219, l('время QA', 'QA time'), M, { size: 10, w: 600 })
      tag(c, [138, 128], [92, 108], l('баги в работе', 'bugs in work'), W, 'end')
      const i1 = c.iso(530, 176, 26); i1.tile(-2.6, -2.6, 5.2, 5.2); i1.person(-1.8, -0.2, M, ''); i1.text(-1.8, -0.2, 'QA', M, { size: 11, w: 600, halo: false, dy: 14 }); i1.agent(-0.6, -0.3, A, 0.8, ''); i1.box(-2.2, 1.8, 0, 1.3, 0.5, 0.3, M); i1.agent(0.6, -0.3, A, 0.8, ''); i1.agent(1.8, -0.3, A, 0.8, '')
      i1.zone(-0.9, 1.8, 3.1, 0.5, A, { gz: 0.3 })
      c.text(462.5, 219, l('время QA', 'QA time'), M, { size: 10, w: 600 })
      tag(c, [582, 172], [632, 150], l('агенты', 'agents'), A, 'start')
      tag(c, [498, 212], [430, 238], l('освободилось', 'freed up'), A, 'end')
      c.thenArrow(334, 362, 176)
      c.text(180, 268, l('QA делает все баги сам, по очереди', 'QA does every bug himself, one by one'), M, { size: 12 })
      c.text(530, 268, l('агенты делают · QA принимает результат', 'agents do · QA accepts the result'), A, { size: 12 })
    },
  },
  // Исследование: QA сам идёт 6 шагов к багу → агент сжимает путь до 3, QA смотрит
  'investigation': {
    ru: 'Исследование: раньше QA сам идёт по шести действиям к багу, теперь агент сжимает путь до трёх, а QA смотрит результат', en: 'Investigation: before, QA walks six actions to the bug; now the agent narrows the path to three and QA reviews the result',
    viewBox: [0, 0, 700, 244],
    draw: (c, l) => {
      c.caps(180, 16, l('БЫЛО', 'BEFORE'), M); c.caps(530, 16, l('СТАЛО', 'AFTER'), A)
      // Шесть действий: площадки на изломах пути
      const stops: [number, number][] = [[-2, 1.8], [-1.2, 0.5], [-0.4, 1.5], [0.4, 0.1], [1.2, 1.1], [2, -0.2]]
      const i0 = c.iso(180, 128, 26); i0.tile(-2.6, -2.6, 5.2, 5.2); i0.path([[-2, 1.8], [-1.2, 0.5]], M, { w: 2 }); i0.path([[-1.2, 0.5], [-0.4, 1.5]], M, { w: 2 }); i0.path([[-0.4, 1.5], [0.4, 0.1]], M, { w: 2 }); i0.path([[0.4, 0.1], [1.2, 1.1]], M, { w: 2 }); i0.path([[1.2, 1.1], [2, -0.2]], M, { w: 2 }); i0.person(-1.4, -1.5, M, ''); i0.text(-1.4, -1.5, 'QA', M, { size: 11, w: 600, halo: false, dy: 14 })
      // Площадки — отдельным слоем поверх островка
      const p0 = c.iso(180, 128, 26)
      for (const [x, y] of stops) p0.pad(x, y, M, 0.28)
      c.bug(254, 146)
      c.lens(198.2516, 61.3)
      stops.forEach(([x, y], k) => i0.text(x, y, String(k + 1), M, { size: 10, w: 700, halo: false, dy: k % 2 === 0 ? 15 : -9 }))
      c.text(254, 168, l('баг', 'bug'), W, { size: 10, w: 600 })
      const i1 = c.iso(530, 128, 26); i1.tile(-2.6, -2.6, 5.2, 5.2); i1.path([[-2, 1.8], [-1.2, 0.5]], M, { w: 2, dash: '3 5', op: 0.5 }); i1.path([[-1.2, 0.5], [-0.4, 1.5]], M, { w: 2, dash: '3 5', op: 0.5 }); i1.path([[-0.4, 1.5], [0.4, 0.1]], M, { w: 2, dash: '3 5', op: 0.5 }); i1.path([[0.4, 0.1], [1.2, 1.1]], A, { w: 2 }); i1.path([[1.2, 1.1], [2, -0.2]], A, { w: 2 }); i1.agent(-1.6, -0.3, A, 0.8, ''); i1.person(0, -2, M, ''); i1.text(0, -2, 'QA', M, { size: 11, w: 600, halo: false, dy: 14 })
      // Первые три шага агент пропустил (бледные), три оставшихся — его
      const p1 = c.iso(530, 128, 26)
      stops.forEach(([x, y], k) => (k < 3 ? p1.pad(x, y, M, 0.28, 0.35) : p1.pad(x, y, A, 0.28)))
      c.bug(604, 146)
      c.eye(592, 71)
      stops.forEach(([x, y], k) => { if (k >= 3) i1.text(x, y, String(k - 2), A, { size: 10, w: 700, halo: false, dy: k === 4 ? 15 : -9 }) })
      c.text(604, 168, l('баг', 'bug'), W, { size: 10, w: 600 })
      tag(c, [490, 120], [452, 90], l('лишнее убрано', 'extras removed'), M, 'end')
      tag(c, [498, 92], [470, 62], l('агент', 'agent'), A, 'end')
      c.thenArrow(334, 362, 128)
      c.text(180, 230, l('6 действий, путь к багу ищет QA', '6 actions, QA hunts the path to the bug'), M, { size: 12 })
      c.text(530, 230, l('лишнее убрано: 3 действия · QA смотрит', 'extras removed: 3 actions · QA reviews'), A, { size: 12 })
    },
  },
  // Описание: у каждого свой вид записи → агент заполняет один шаблон и рисует схемы
  'description': {
    ru: 'Описание: раньше у каждой записи свой вид, теперь агент заполняет один шаблон и рисует схемы по запросу', en: 'Description: before, every write-up looks different; now the agent fills one template and draws diagrams on request',
    viewBox: [0, 0, 700, 244],
    draw: (c, l) => {
      c.caps(180, 16, l('БЫЛО', 'BEFORE'), M); c.caps(530, 16, l('СТАЛО', 'AFTER'), A)
      const i0 = c.iso(180, 128, 26); i0.tile(-2.6, -2.6, 5.2, 5.2); i0.person(-1.5, -2, M, ''); i0.text(-1.5, -2, 'QA', M, { size: 11, w: 600, halo: false, dy: 14 }); i0.doc(-2.3, -0.4, 0, 1.4, 1, M); i0.doc(0.9, -1.1, 0, 1.5, 0.8, M, 4); i0.doc(-0.5, 0.6, 0, 1, 1.4, M, 2)
      c.pen(206.258, 53.5)
      tag(c, [127, 104], [72, 90], l('шаги', 'steps'), M, 'end')
      tag(c, [140, 150], [72, 172], l('заметки', 'notes'), M, 'end')
      tag(c, [233, 132], [262, 78], l('ожидалось / факт', 'expected / actual'), M)
      const i1 = c.iso(530, 128, 26); i1.tile(-2.6, -2.6, 5.2, 5.2); i1.path([[-1.1, 0], [-0.5, 0]], A, { w: 1.8, arrow: true }); i1.path([[1.6, -0.4], [2.5, -0.4]], A, { w: 1.6, arrow: true }); i1.agent(-2.2, -0.4, A, 0.85, ''); i1.doc(-0.3, -0.9, 0, 1.6, 1.8, A); i1.box(1.8, -1, 0, 0.5, 0.5, 0.35, M, 0.9); i1.box(1.8, 0.1, 0, 0.5, 0.5, 0.35, M, 0.9)
      tag(c, [492, 88], [432, 62], l('агент', 'agent'), A, 'end')
      tag(c, [545, 126], [566, 70], l('шаблон', 'template'), A)
      tag(c, [595, 138], [628, 92], l('схемы: sequence, C4', 'diagrams: sequence, C4'), M)
      c.thenArrow(334, 362, 128)
      c.text(180, 230, l('QA описывает баг как ему удобно', 'QA writes the bug up in his own way'), M, { size: 12 })
      c.text(530, 230, l('агент заполняет шаблон · схемы по запросу', 'agent fills a template · diagrams on request'), A, { size: 12 })
    },
  },
  // Документирование: QA переносит в Jira руками → агент пишет в Jira через MCP
  'documentation': {
    ru: 'Документирование: раньше QA руками переносит скриншоты, ссылки и поля в Jira, теперь агент пишет в Jira через MCP, а QA правит спорное', en: 'Documentation: before, QA moves screenshots, links and fields into Jira by hand; now the agent writes to Jira through MCP and QA fixes the disputed parts',
    viewBox: [0, 0, 700, 244],
    draw: (c, l) => {
      c.caps(180, 16, l('БЫЛО', 'BEFORE'), M); c.caps(530, 16, l('СТАЛО', 'AFTER'), A)
      const i0 = c.iso(180, 128, 26); i0.tile(-2.6, -2.6, 5.2, 5.2); i0.path([[-0.7, -1.8], [0.8, -1.8]], M, { w: 1.4, dash: '4 4', arrow: true }); i0.path([[-0.7, -1.1], [0.8, -1.1]], M, { w: 1.4, dash: '4 4', arrow: true }); i0.path([[-0.7, -0.4], [0.8, -0.4]], M, { w: 1.4, dash: '4 4', arrow: true }); i0.panel(-2.5, -2.2, 1.7, 2, W, bandTitle(l('черновик', 'draft'), 6.2), 2, false); i0.panel(0.9, -2.2, 1.7, 2, M, bandTitle('Jira', 7.1), 2, false); i0.person(0, 1.5, M, ''); i0.text(0, 1.5, 'QA', M, { size: 11, w: 600, halo: false, dy: 14 })
      const i1 = c.iso(530, 128, 26); i1.tile(-2.6, -2.6, 5.2, 5.2); i1.path([[-1.5, -0.9], [1.0, -1.9]], A, { w: 2.4 }); i1.path([[1.9, 0.9], [1.9, -1.8]], M, { w: 1.4, dash: '4 4', arrow: true }); i1.agent(-2.3, -0.9, A, 0.85, ''); i1.panel(1, -2.2, 1.9, 2, M, bandTitle('Jira'), 2); i1.box(0.85, -2.15, 0, 0.36, 0.36, 0.36, A); i1.person(2, 1.4, M, ''); i1.text(2, 1.4, 'QA', M, { size: 11, w: 600, halo: false, dy: 14 })
      c.pen(527.5096, 143.2)
      c.text(548, 92, l('MCP: агент ↔ Jira', 'MCP: agent ↔ Jira'), A, { size: 10, w: 600 })
      tag(c, [496, 82], [466, 56], l('агент', 'agent'), A, 'end')
      c.text(180, 210, l('скриншоты · ссылки · поля', 'screenshots · links · fields'), M, { size: 10 })
      c.thenArrow(334, 362, 128)
      c.text(180, 230, l('QA переносит всё в Jira руками', 'QA moves everything to Jira by hand'), M, { size: 12 })
      c.text(530, 230, l('агент пишет в Jira сам · QA правит спорное', 'agent writes to Jira · QA fixes the disputed'), A, { size: 12 })
    },
  },
  // Доступы агента: Jira и документы через MCP, ломать можно только стенд в песочнице
  'access-sandbox': {
    ru: 'Агент через MCP подключён к Jira и документам, а на тестовом стенде с тестовыми данными, внутри песочницы, может пробовать и ломать', en: 'The agent is connected to Jira and documents through MCP and can try and break things on a test stand with test data, inside a sandbox',
    viewBox: [0, 0, 700, 274],
    draw: (c, l) => {
      const i0 = c.iso(120, 72, 26); i0.tile(-1.5, -1.5, 3, 3); i0.panel(-1.1, -0.2, 2.2, 1.9, M, bandTitle('Jira'), 2)
      const i1 = c.iso(120, 184, 26); i1.tile(-1.5, -1.5, 3, 3); i1.doc(-0.8, -0.5, 0, 1.6, 1.1, M, 2); i1.doc(-0.8, -0.5, 0.2, 1.6, 1.1, M, 2); i1.doc(-0.8, -0.5, 0.4, 1.6, 1.1, M, 2)
      const i2 = c.iso(340, 128, 26); i2.tile(-1.6, -1.6, 3.2, 3.2); i2.agent(-0.6, -0.6, A, 1.2, '')
      const i3 = c.iso(580, 128, 26); i3.tile(-1.9, -1.9, 3.8, 3.8, { grid: false, dash: '6 5', edge: W }); i3.panel(-1.5, -1, 2, 1.8, M, bandTitle(l('стенд', 'stand'), 8.2), 2); i3.cyl(0.9, 0.9, 0, 0.5, 0.8, M)
      // Провода MCP от агента к системам, на конце — разъём
      c.curve(270, 118, 190, 80, A, { c1: [220, 118], c2: [215, 82], w: 2.2, cap: true })
      c.curve(270, 138, 190, 182, A, { c1: [220, 138], c2: [215, 176], w: 2.2, cap: true })
      c.line([[410, 128], [500, 128]], A, { w: 2.2, cap: true })
      for (const [x, y] of [[190, 80], [190, 182], [500, 128]]) c.plug(x, y, A, { s: 10, rx: 3, halo: false })
      c.text(340, 184, 'MCP', A, { size: 12, w: 700 })
      c.text(120, 240, l('документы', 'documents'), M, { size: 12 })
      c.text(580, 206, l('песочница', 'sandbox'), W, { size: 12 })
      c.text(350, 262, l('агент подключён к системам · ломать можно только стенд', 'agent plugged into systems · only the stand can be broken'), 'currentColor', { size: 12 })
      c.text(603, 170, l('данные', 'data'), M, { w: 600, anchor: 'start' })
    },
  },
  // Конвейер: скилл → агент на каждый баг → отчёты одного формата → QA; ошибка возвращается в скилл
  'skill-pipeline': {
    ru: 'Один скилл из шести шагов запускается по агенту на каждый баг и даёт отчёты в одном формате, QA принимает их, а ошибка агента возвращается в скилл новым правилом', en: 'One six-step skill runs as one agent per bug and produces reports in one format, QA accepts them, and an agent mistake returns to the skill as a new rule',
    viewBox: [0, 0, 700, 252],
    draw: (c, l) => {
      const i0 = c.iso(100, 118, 26); i0.tile(-1.5, -1.5, 3, 3); i0.panel(-1.1, -0.1, 2.2, 2.5, A, bandTitle(l('Скилл', 'Skill')), 3)
      const i1 = c.iso(260, 118, 26); i1.tile(-1.5, -1.5, 3, 3); i1.agent(-1.3, -0.35, A, 0.7, ''); i1.agent(-0.35, -0.35, A, 0.7, ''); i1.agent(0.6, -0.35, A, 0.7, '')
      const i2 = c.iso(420, 118, 26); i2.tile(-1.5, -1.5, 3, 3); i2.doc(-1.3, -0.4, 0, 0.8, 0.8, M, 2, true); i2.doc(-0.35, -0.4, 0, 0.8, 0.8, M, 2, true); i2.doc(0.6, -0.4, 0, 0.8, 0.8, M, 2, true)
      const i3 = c.iso(580, 118, 26); i3.tile(-1.5, -1.5, 3, 3); i3.person(0, 0.2, M, '')
      c.eye(592.4968, 89.6)
      c.arrow(170, 124, 220, 124, A)
      c.arrow(330, 124, 380, 124, A)
      c.arrow(490, 124, 540, 124, A)
      // Петля обратно в скилл: пунктирная дуга под схемой и наконечник вверх
      c.curve(580, 192, 100, 192, W, { c1: [580, 238], c2: [100, 238], w: 1.8, dash: '5 5', cap: true })
      c.line([[94, 199], [100, 190], [107, 198]], W, { w: 1.8, cap: true })
      c.text(340, 238, l('ошибка агента → новое правило скилла', 'agent mistake → new skill rule'), W, { size: 12 })
      c.text(100, 184, l('Скилл', 'Skill'), A, { size: 12 })
      c.text(260, 184, 'PAY-142 · 143 · 144', M, { size: 12 })
      c.text(420, 184, l('один формат отчёта', 'one report format'), M, { size: 12 })
      c.text(580, 184, 'QA', M, { size: 12 })
    },
  },
  // Параллельно: QA делает три бага по очереди → три агента одновременно, QA принимает
  'parallel': {
    ru: 'Раньше QA делает три бага по очереди, теперь три агента работают одновременно, а QA принимает готовые отчёты', en: 'Before, QA handles three bugs one by one; now three agents work at once and QA accepts the finished reports',
    viewBox: [0, 0, 700, 250],
    draw: (c, l) => {
      c.caps(180, 16, l('БЫЛО', 'BEFORE'), M); c.caps(530, 16, l('СТАЛО', 'AFTER'), A)
      const i0 = c.iso(180, 134, 26); i0.tile(-2.6, -2.6, 5.2, 5.2); i0.path([[-1.5, 0], [-0.95, 0]], M, { w: 1.8, arrow: true }); i0.person(-2, -0.1, M, ''); i0.text(-2, -0.1, 'QA', M, { size: 11, w: 600, halo: false, dy: 14 }); i0.doc(-0.9, -0.5, 0, 1, 1, M, 0); i0.doc(0.4, -0.5, 0, 1, 1, M, 0); i0.box(-2.2, 1.8, 0, 4.4, 0.5, 0.3, M); i0.doc(1.7, -0.5, 0, 1, 1, M, 0)
      // Жуки сидят на листах, поэтому тень ниже обычного
      for (const [x, y] of [[171, 120.2], [200.3, 137.1], [229.5, 154]]) c.bug(x, y, W, 9.6)
      c.text(112.5, 177, l('время QA', 'QA time'), M, { size: 10, w: 600 })
      tag(c, [234, 148], [278, 118], l('3 бага', '3 bugs'), W, 'start')
      const i1 = c.iso(530, 134, 26); i1.tile(-2.6, -2.6, 5.2, 5.2); i1.path([[-1.3, -1.6], [-0.35, -1.6]], A, { w: 1.8, arrow: true }); i1.path([[0.9, -1.6], [1.7, -0.3]], A, { w: 1.3, dash: '3 3' }); i1.path([[-1.3, -0.3], [-0.35, -0.3]], A, { w: 1.8, arrow: true }); i1.path([[0.9, -0.3], [1.7, -0.3]], A, { w: 1.3, dash: '3 3' }); i1.path([[-1.3, 1], [-0.35, 1]], A, { w: 1.8, arrow: true }); i1.path([[0.9, 1], [1.7, -0.3]], A, { w: 1.3, dash: '3 3' }); i1.agent(-2.2, -1.95, A, 0.7, ''); i1.agent(-2.2, -0.65, A, 0.7, ''); i1.doc(-0.2, -2, 0, 1, 0.8, M, 2, true); i1.agent(-2.2, 0.65, A, 0.7, ''); i1.doc(-0.2, -0.7, 0, 1, 0.8, M, 2, true); i1.box(-2.2, 1.8, 0, 1.3, 0.5, 0.3, M); i1.doc(-0.2, 0.6, 0, 1, 0.8, M, 2, true); i1.person(2.2, -0.3, M, ''); i1.text(2.2, -0.3, 'QA', M, { size: 11, w: 600, halo: false, dy: 14 })
      i1.zone(-0.9, 1.8, 3.1, 0.5, A, { gz: 0.3 })
      c.eye(603.29, 127.7)
      c.text(462.5, 177, l('время QA', 'QA time'), M, { size: 10, w: 600 })
      tag(c, [502, 76], [470, 48], l('3 агента', '3 agents'), A, 'end')
      tag(c, [578, 106], [622, 76], l('отчёты', 'reports'), M, 'start')
      c.thenArrow(334, 362, 134)
      c.text(180, 236, l('QA берёт баги по очереди · всё время его', 'QA takes bugs one by one · all the time is his'), M, { size: 12 })
      c.text(530, 236, l('агенты работают разом · QA принимает отчёты', 'agents work at once · QA accepts reports'), A, { size: 12 })
    },
  },
  // Пример: жалоба клиента → агент сжимает путь 6 → 3 → отчёт со схемой в Jira
  'complaint-to-report': {
    ru: 'Из одной жалобы клиента агент сжимает путь с шести действий до трёх и пишет отчёт со схемой в Jira', en: 'From one client complaint the agent narrows the path from six actions to three and writes a report with a diagram in Jira',
    viewBox: [0, 0, 700, 240],
    draw: (c, l) => {
      const i0 = c.iso(120, 128, 26); i0.tile(-1.5, -1.5, 3, 3); i0.person(0, 0.3, M, '')
      c.bubble(55.2452, 42.9, 118, 38, M, { op: 0.3, rx: 9, tail: [44, 2, 9, 14] })
      c.text(114.2, 57.9, l('оплата с промокодом', 'payment with promo code'), 'currentColor', { size: 10.5, w: 500 })
      c.text(114.2, 71.9, l('не проходит', 'fails'), 'currentColor', { size: 10.5, w: 500 })
      const i1 = c.iso(350, 128, 26); i1.tile(-1.5, -1.5, 3, 3)
      // Воронка: шесть серых действий сверху, баг и три синих действия на выходе
      c.funnel(354.5, 75.4)
      for (const [x, y] of [[332.5, 65.4], [346.5, 61.4], [362.5, 66.4], [376.5, 62.4], [340.5, 55.4], [368.5, 54.4]]) c.ball(x, y, 4, M)
      c.bug(341, 143.8)
      for (const [x, y] of [[305, 124], [315.1, 129.8], [325.2, 135.7]]) c.ball(x, y, 4.5, A)
      c.text(354, 38, l('6 действий клиента', '6 client actions'), M, { size: 10, w: 600 })
      c.text(292, 114, l('3 нужных', '3 needed'), A, { size: 10, w: 600, anchor: 'end' })
      c.text(412, 96, l('агент убирает', 'agent drops'), A, { size: 10, w: 600, anchor: 'start' })
      c.text(412, 108, l('лишнее', 'the extras'), A, { size: 10, anchor: 'start' })
      c.text(360, 166, l('баг найден', 'bug found'), W, { size: 10, w: 600 })
      const i2 = c.iso(580, 128, 26); i2.tile(-1.5, -1.5, 3, 3); i2.panel(-1.2, -1, 2.4, 2.2, M, bandTitle('Jira'), 2); i2.doc(-1.1, 0.1, 0, 0.9, 0.7, M, 3); i2.box(0.3, 0.2, 0, 0.6, 0.5, 0.3, A, 0.9)
      c.text(553, 146, l('отчёт', 'report'), M, { size: 10, w: 600 })
      c.text(594, 163, l('схема', 'diagram'), A, { size: 10, w: 600 })
      c.arrow(200, 134, 262, 134, A)
      c.arrow(438, 134, 500, 134, A)
      c.step(120, 208, 1, l('жалоба клиента', 'client complaint'), M)
      c.step(350, 208, 2, l('агент сжимает путь 6 → 3', 'agent narrows the path 6 → 3'))
      c.step(580, 208, 3, l('отчёт и схема в Jira', 'report and diagram in Jira'), M)
    },
  },
  // Ворота приёмки: QA проверяет отчёт по четырём вопросам; не повторилось — обратно агенту
  'acceptance-gate': {
    ru: 'QA у ворот приёмки проверяет отчёты агента: тот ли путь, та ли ошибка, верно ли сжато и насколько важно; принятое уходит разработчику, остальное возвращается агенту', en: 'QA at the acceptance gate checks the agent’s reports: right path, right error, narrowed correctly, how important; accepted goes to the developer, the rest returns to the agent',
    viewBox: [0, 0, 700, 292],
    draw: (c, l) => {
      const i0 = c.iso(110, 184, 26); i0.tile(-1.5, -1.5, 3, 3); i0.agent(-1.2, -0.4, A, 0.9, ''); i0.doc(0, -0.25, 0, 0.45, 0.45, M, 2); i0.doc(0.6, -0.25, 0, 0.45, 0.45, M, 2); i0.doc(1.2, -0.25, 0, 0.45, 0.45, M, 2)
      const i1 = c.iso(350, 184, 26); i1.tile(-1.5, -1.5, 3, 3); i1.box(-0.9, -1, 0, 0.4, 0.4, 2.2, A); i1.box(-0.9, -1, 2.2, 0.4, 2.1, 0.3, A); i1.box(-0.9, 0.7, 0, 0.4, 0.4, 2.2, A); i1.person(0.1, -0.1, M, ''); i1.text(0.1, -0.1, 'QA', M, { size: 11, w: 600, halo: false, dy: 14 })
      c.lens(370.5032, 155)
      const i2 = c.iso(590, 184, 26); i2.tile(-1.5, -1.5, 3, 3); i2.person(0, 0, M, ''); i2.text(0, 0, l('разработчик', 'developer'), M, { size: 11, w: 600, halo: false, dy: 14 })
      c.arrow(180, 188, 262, 188, M)
      c.arrow(438, 188, 520, 188, A)
      c.text(470, 176, l('принято', 'accepted'), A, { size: 12, w: 700 })
      c.check(512, 172, 1.6, A)
      // Карточка с четырьмя вопросами QA
      c.rect(270, 8, 160, 88, { rx: 10, fill: A, fillOp: 0.12 })
      c.check(284, 29, 1.2, A)
      c.text(296, 32, l('тот ли путь', 'right path'), 'currentColor', { w: 500, anchor: 'start' })
      c.check(284, 49, 1.2, A)
      c.text(296, 52, l('та ли ошибка', 'right error'), 'currentColor', { w: 500, anchor: 'start' })
      c.check(284, 69, 1.2, A)
      c.text(296, 72, l('верно ли сжато', 'narrowed right'), 'currentColor', { w: 500, anchor: 'start' })
      c.text(284, 92, '!', W, { size: 13, w: 700 })
      c.text(296, 92, l('насколько важно', 'how important'), 'currentColor', { w: 500, anchor: 'start' })
      c.curve(350, 240, 110, 240, W, { c1: [350, 278], c2: [110, 278], w: 1.8, dash: '5 5', cap: true })
      c.line([[104, 247], [110, 238], [117, 246]], W, { w: 1.8, cap: true })
      c.text(230, 278, l('не повторилось → обратно агенту', 'not reproduced → back to the agent'), W, { size: 12 })
    },
  },
  // Старт за три шага: подключить Jira и стенд, записать скилл, прогнать на 5 закрытых багах
  'start-steps': {
    ru: 'Три шага старта: подключить Jira и стенд, записать шаги QA как скилл, прогнать на пяти закрытых багах и проверить руками', en: 'Three starting steps: connect Jira and the stand, record QA steps as a skill, run it on five closed bugs and check by hand',
    viewBox: [0, 0, 700, 234],
    draw: (c, l) => {
      const i0 = c.iso(130, 120, 26); i0.tile(-1.5, -1.5, 3, 3); i0.box(-0.18, -0.18, 0, 0.36, 0.36, 0.36, M); i0.box(-0.15, -0.15, 0.36, 0.3, 0.3, 0.5, M)
      const i1 = c.iso(350, 120, 26); i1.tile(-1.5, -1.5, 3, 3); i1.doc(-0.6, -0.7, 0, 1.2, 1.4, A, 4)
      const i2 = c.iso(570, 120, 26); i2.tile(-1.5, -1.5, 3, 3); i2.doc(-1, -0.6, 0, 0.5, 0.5, M, 0); i2.doc(-0.35, -0.6, 0, 0.5, 0.5, M, 0); i2.doc(-1, 0.1, 0, 0.5, 0.5, M, 0); i2.doc(0.3, -0.6, 0, 0.5, 0.5, M, 0); i2.doc(-0.35, 0.1, 0, 0.5, 0.5, M, 0)
      for (const [x, y] of [[561, 101.1], [575.6, 109.5], [590.3, 118], [545.2, 110.2], [559.9, 118.6]]) c.check(x, y, 0.8)
      c.flag(616.5288, 129.8)
      c.arrow(200, 126, 280, 126, A)
      c.arrow(420, 126, 500, 126, A)
      c.step(130, 190, 1, l('Jira и стенд через MCP', 'Jira and stand via MCP'))
      c.step(350, 190, 2, l('шаги QA → скилл', 'QA steps → skill'))
      c.step(570, 190, 3, l('5 закрытых багов · QA проверяет', '5 closed bugs · QA checks'))
    },
  },
  // Время QA: было — три бага по очереди руками; стало — три агента параллельно, QA только принимает
  'qa-time': {
    ru: 'Схема времени: слева QA делает баги по очереди, справа три агента работают одновременно, а QA коротко проверяет каждый результат и переходит от рутины к управлению агентами и проверке', en: 'Time diagram: top, QA handles bugs one after another; bottom, three agents work at once while QA briefly checks each result and moves from routine to managing agents and reviewing',
    viewBox: [0, 0, 700, 300],
    draw: (c, l) => {
      const head = { size: 12, w: 700, anchor: 'start' as const }, body = { size: 12, w: 400 }
      c.text(0, 22, l('БЫЛО · QA выполняет задачи сам, по очереди', 'BEFORE · QA executes tasks by hand, one by one'), M, head)
      ;['PAY-142', 'PAY-143', 'PAY-144'].forEach((t, i) => c.card(200 * i, 32, 196, 30, 'currentColor', { rx: 4, fill: 'var(--surface-2)', stroke: 'var(--line-strong)', sw: 1, lines: [{ t, dy: 20, ...body }] }))
      c.text(0, 100, l('СТАЛО · агенты выполняют одновременно, QA принимает', 'AFTER · agents execute at once, QA accepts the results'), A, head)
      ;[l('браузер · PAY-142', 'browser · PAY-142'), l('код · PAY-143', 'code · PAY-143'), 'API · PAY-144'].forEach((t, i) => c.card(0, 110 + 30 * i, 150, 24, A, { rx: 4, fill: A, stroke: 'none', lines: [{ t, dy: 16, ...body, col: '#fff' }] }))
      ;['142', '143', '144'].forEach((t, i) => c.card(154 + 34 * i, 200, 30, 24, M, { rx: 4, fill: 'none', lines: [{ t, dy: 16, size: 11, w: 600 }] }))
      c.text(0, 216, 'QA', M, head)
      c.text(262, 216, l('короткая проверка каждого отчёта', 'a short check of each report'), M, { ...body, anchor: 'start' })
      c.card(256, 236, 344, 36, M, { rx: 6, fill: 'none', sw: 1, dash: '5 4', lines: [{ t: l('время QA: управление агентами и приёмка', 'QA time: managing agents and acceptance'), dy: 22, size: 12, w: 700 }] })
      c.line([[600, 32], [600, 272]], 'var(--line-strong)', { w: 1, dash: '3 4' })
      c.text(604, 50, l('конец «было»', 'end of “before”'), M, { ...body, anchor: 'start' })
    },
  },
  // Диаграмма последовательности: оплата с промокодом, сервис промокодов отвечает 500, платёж падает
  'promo-sequence': {
    ru: 'Схема последовательности: клиент оплачивает заказ с промокодом, сервис промокодов возвращает ошибку, оплата падает', en: 'Sequence diagram: the customer pays with a promo code, the promo service returns an error, and payment fails',
    viewBox: [0, 0, 700, 250],
    draw: (c, l) => {
      ;[l('Клиент', 'Customer'), l('Сайт', 'Web'), l('Оплата', 'Payments'), l('Промокоды', 'Promo')].forEach((t, i) => c.lifeline(80 + 180 * i, 6, t, 240))
      c.message(80, 260, 66, l('оплатить', 'pay'))
      c.message(260, 440, 106, l('создать платёж', 'create payment'))
      c.message(440, 620, 146, l('применить промокод', 'apply promo'))
      c.message(620, 440, 186, l('ошибка 500', 'error 500'), W)
      c.message(440, 80, 226, l('«платёж не прошёл»', '“payment failed”'), W)
    },
  },
}
export default scenes
