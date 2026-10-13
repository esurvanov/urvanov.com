// Схемы поста «Агент возвращает работу вам»
import { type Scene, A, M, W } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Было: агент-надсмотрщик на пирамиде гоняет вас таскать блок; стало: вы наверху руководите, три агента таскают блоки.
  // Сцена есть только в английской версии поста
  'before-after': {
    ru: 'Раньше агент — надсмотрщик на стройке пирамиды и раздаёт человеку задания: беги, копируй, найди, а человек тащит блок. Теперь человек стоит наверху и руководит, а три агента таскают блоки',
    en: 'Before, the agent acts as an Egyptian overseer on a pyramid site handing the person tasks: run, copy, find, and the person hauls the block. Now the person stands on top and directs while three agents haul the blocks',
    viewBox: [0, 0, 700, 236],
    draw: (c, l) => {
      // Ступени пирамиды: 2 → 1.4 → 0.8 → 0.4 клетки, каждая на 0.5 выше
      const steps = (I: ReturnType<typeof c.iso>, top: boolean) => {
        I.box(-2.4, -2.4, 0, 2, 2, 0.5, M); I.box(-2.1, -2.1, 0.5, 1.4, 1.4, 0.5, M); I.box(-1.8, -1.8, 1, 0.8, 0.8, 0.5, M)
        if (top) I.box(-1.6, -1.6, 1.5, 0.4, 0.4, 0.4, M)
      }
      c.caps(180, 16, l('БЫЛО', 'BEFORE'), M); c.caps(530, 16, l('СТАЛО', 'AFTER'), M)
      // Было
      const b = c.iso(180, 128, 26)
      b.tile(-2.6, -2.6, 5.2, 5.2)
      b.path([[0.7, 1], [0.2, 1.5]], M, { w: 2 })
      steps(b, false)
      b.box(1.1, -2.3, 0, 1.2, 1.2, 0.8, A)
      // Надсмотрщик: синий куб-агент, нарисован вручную (пропорции и тень не как у I.agent)
      c.raw('<ellipse cx="256.6" cy="129.0" rx="15" ry="7.5" fill="#000" opacity="0.38" filter="url(#isb)"/>')
      c.iso(180, 128, 26).box(1.08, -2.32, 0.8, 0.62, 0.62, 0.77, A)
      c.raw('<path d="M256.6 79.1V71.1" stroke="var(--accent)" stroke-width="1.5"/><circle cx="256.6" cy="69.1" r="3" fill="var(--accent)"/><circle cx="256.6" cy="69.1" r="3" fill="url(#iss)"/><circle cx="247.6" cy="94.2" r="1.9" fill="#000" opacity=".6"/><circle cx="252.6" cy="96.6" r="1.9" fill="#000" opacity=".6"/><path d="M264.6 91.2L278.6 75.2Q296.6 67.2 292.6 99.2" fill="none" stroke="var(--warn)" stroke-width="2" stroke-linecap="round"/>')
      const b2 = c.iso(180, 128, 26)
      b2.box(-0.8, 1.2, 0, 1, 1, 0.8, M)
      b2.person(0.7, 1, M, '')
      c.text(173.2, 164.1, l('Вы', 'You'), M, { w: 600 })
      c.text(250, 36, l('Беги! Копируй! Найди!', 'Run! Copy! Find!'), W, { size: 12, w: 700 })
      // Стало
      const a = c.iso(530, 128, 26)
      a.tile(-2.6, -2.6, 5.2, 5.2)
      a.path([[0.9, 0.1], [0.3, 0.1]], A, { w: 2 })
      a.path([[1.5, 1.3], [0.9, 1.3]], A, { w: 2 })
      a.path([[0.5, 2.1], [-0.1, 2.1]], A, { w: 2 })
      steps(a, true)
      a.box(1.1, -2.3, 0, 1.2, 1.2, 0.8, M)
      a.box(-0.3, -0.15, 0, 0.7, 0.7, 0.6, M)
      a.person(1.7, -1.7, M, '', 0.8)
      // Шапка фараона на человеке
      c.raw('<path d="M598.6 77.2Q606.6 65.2 614.6 77.2L617.6 90.2L613.6 86.2L599.6 86.2L595.6 90.2Z" fill="var(--muted)"/><path d="M598.6 77.2Q606.6 65.2 614.6 77.2" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.3"/><path d="M601.6 81.2H611.6" stroke="#fff" stroke-opacity=".6" stroke-width="1.3"/>')
      const a2 = c.iso(530, 128, 26)
      a2.agent(0.9, -0.2, A, 0.7, '')
      a2.box(-0.7, 1.85, 0, 0.7, 0.7, 0.6, M)
      a2.box(0.3, 1.05, 0, 0.7, 0.7, 0.6, M)
      a2.agent(0.5, 1.8, A, 0.7, '')
      a2.agent(1.5, 1, A, 0.7, '')
      c.thenArrow(334, 362, 150)
      c.text(180, 222, l('агент гоняет вас, как надсмотрщик на стройке', 'the agent drives you like an overseer on a building site'), M, { size: 12 })
      c.text(530, 222, l('агенты таскают блоки, вы руководите', 'agents haul the blocks, you direct'), A, { size: 12 })
    },
  },
  // Слева что агент делает сам, справа что остаётся только вам
  split: {
    ru: 'Слева то, что агент делает сам: читать, искать, копировать, запускать, писать. Справа то, что остаётся человеку: вход в систему, пароли и секреты, подтверждение записи, оплата', en: 'On the left is what the agent does itself: read, search, copy, run, write. On the right is what stays with the person: logging in, passwords and secrets, confirming a write, payments',
    viewBox: [0, 0, 700, 236],
    draw: (c, l) => {
      c.caps(180, 16, l('АГЕНТ ДЕЛАЕТ САМ', 'AGENT DOES IT'), A); c.caps(530, 16, l('ТОЛЬКО ВЫ', 'ONLY YOU'), M)
      const i1 = c.iso(180, 128, 26)
      i1.tile(-2.6, -2.6, 5.2, 5.2)
      i1.doc(-2.4, -2.4, 0, 1.3, 0.9, A, 3)
      i1.doc(0.9, -2.4, 0, 1.3, 0.9, A, 3)
      i1.doc(-2.4, 1.2, 0, 1.3, 0.9, A, 3)
      i1.agent(-0.5, -0.5, A, 1, '')
      i1.doc(0.9, 1.2, 0, 1.3, 0.9, A, 3)
      const i2 = c.iso(530, 128, 26)
      i2.tile(-2.6, -2.6, 5.2, 5.2, { dash: '5 4', edge: W })
      i2.box(-2.25, -2.3, 0, 0.9, 0.9, 0.9, W)
      i2.box(1.05, -2.3, 0, 0.9, 0.9, 0.9, W)
      i2.box(-2.25, 1.3, 0, 0.9, 0.9, 0.9, W)
      i2.person(-0.2, 0.2, M, '')
      i2.box(1.05, 1.3, 0, 0.9, 0.9, 0.9, W)
      c.text(180, 222, l('читает, ищет, копирует, запускает', 'reads, searches, copies, runs'), A, { size: 12 })
      c.text(530, 222, l('вход, секреты, подтверждение, оплата', 'login, secrets, confirmation, payment'), W, { size: 12 })
    },
  },
  // Объём рисёрча: в наших сервисах одна проба, в чужой системе склада много проб вслепую
  'research-volume': {
    ru: 'Объём рисёрча: в наших сервисах код виден, проба одна; в чужой системе склада чёрный ящик, нужно много проб вслепую', en: 'Research volume: our services show their code, one probe is enough; the warehouse is a black box that needs many blind probes',
    viewBox: [0, 0, 700, 176],
    draw: (c, l) => {
      c.text(20, 48, l('A · наши сервисы: код и тесты у нас', 'A · our services: we have code and tests'), M, { size: 12.5, w: 800, anchor: 'start' })
      c.card(330, 28, 38, 38, A, { rx: 8, fillOp: 0.12, lines: [{ t: '✓', dy: 25, size: 16, w: 800 }] })
      c.text(384, 52, l('мало', 'little'), M, { size: 12, anchor: 'start' })
      c.text(20, 108, l('B · склад: чёрный ящик, щупаем вслепую', 'B · warehouse: a black box, probed blind'), M, { size: 12.5, w: 800, anchor: 'start' })
      for (let i = 0; i < 6; i++) c.card(330 + 46 * i, 88, 38, 38, W, { rx: 8, fillOp: 0.08, dash: '4 3', lines: [{ t: '?', dy: 25, size: 16, w: 800 }] })
      c.line([[330, 148], [606, 148]], M, { w: 1.5 })
      c.line([[600, 143], [607, 148], [600, 153]], M, { w: 1.5 })
      c.text(330, 168, l('объём рисёрча', 'research volume'), M, { size: 11.5, w: 700, anchor: 'start' })
      c.text(610, 112, l('много', 'a lot'), M, { size: 12, anchor: 'start' })
    },
  },
  // Нужны ли чужие правки: два наших сервиса (всё у нас) против системы склада другой команды (закрыто)
  'whose-changes': {
    ru: 'Нужны ли чужие правки. Скидка в сервисе заказов: оба сервиса наши, чужих правок не нужно. Остатки со склада: нужна система другой команды, правки у её владельца', en: 'Are foreign changes needed. One system: our service and our database, no foreign changes. Two systems: our service and another team’s system, its owner must change things',
    viewBox: [0, 0, 700, 270],
    draw: (c, l) => {
      const order = l('сервис заказов', 'order service'), t = { size: 13, w: 800 }
      c.text(20, 22, l('A · скидка: два наших сервиса', 'A · discount: two of our services'), M, { ...t, anchor: 'start' })
      c.card(20, 32, 170, 50, M, { lines: [{ t: order, dy: 30, ...t }] })
      c.line([[190, 57], [510, 57]], M, { w: 3, cap: true, dash: '1 7' })
      c.seal(350, 57, A)
      c.card(510, 32, 170, 50, M, { lines: [{ t: l('сервис скидок', 'discount service'), dy: 30, ...t }] })
      c.text(20, 108, l('всё у нас: агент правит и проверяет сам', 'all ours: the agent changes and checks it'), A, { ...t, anchor: 'start' })
      c.text(20, 146, l('B · остатки со склада другой команды', 'B · stock levels from another team’s warehouse'), M, { ...t, anchor: 'start' })
      c.card(20, 156, 170, 56, M, { lines: [{ t: order, dy: 33, ...t }] })
      c.line([[190, 184], [510, 184]], W, { w: 3, cap: true, dash: '1 7' })
      c.seal(350, 184, W, 'lock')
      c.card(510, 156, 170, 56, M, { stroke: W, dash: '5 4', lines: [{ t: l('система склада', 'warehouse system'), dy: 33, ...t }] })
      c.text(680, 234, l('команда склада, не под нашим контролем', 'warehouse team, not under our control'), M, { size: 12, w: 700, anchor: 'end' })
      c.text(20, 262, l('нужны правки у команды склада: доступ к их API, открыть порт', 'the warehouse team must change things: API access, open a port'), W, { ...t, anchor: 'start' })
    },
  },
  // Уровни OSI, вариант A: скидка — оба сервиса наши, запрос проходит один прикладной уровень
  'layers-discount': {
    ru: 'Скидка: оба сервиса наши, запрос проходит один уровень', en: 'Discount: both services are ours, the request passes one layer',
    viewBox: [0, 0, 700, 132],
    draw: (c, l) => {
      const h = { size: 12.5, w: 800 }
      c.text(350, 22, l('сервис заказов', 'order service'), 'currentColor', h)
      c.text(470, 22, l('сервис скидок', 'discount service'), 'currentColor', h)
      for (const x of [298, 418]) c.card(x, 36, 104, 52, M, { fillOp: 0.08, sw: 1.5 })
      c.layer(20, 44, 256, 7, l('Прикладной', 'Application'), { sub: l('вызов сервиса скидок', 'call to the discount service') })
      c.line([[278, 62], [652, 62]], M, { w: 1, op: 0.4, dash: '3 4' })
      c.line([[350, 62], [470, 62]], M, { w: 3, cap: true, dash: '1 7' })
      c.seal(410, 62, M, 'check', { r: 13, ck: [5, 4, 6], w: 2.4 })
      c.text(20, 116, l('один уровень, оба наши: правок нет', 'one layer, both ours: no changes'), M, { size: 12, w: 800, anchor: 'start' })
    },
  },
  // Уровни OSI, вариант B: остатки со склада — путь вниз через транспортный и сетевой уровни чужой сети, шаги 1–6
  'layers-warehouse': {
    ru: 'B · остатки со склада: путь через три уровня', en: 'B · stock from the warehouse: path through three layers',
    viewBox: [0, 0, 700, 372],
    draw: (c, l) => {
      const h = { size: 12.5, w: 800 }
      c.text(350, 22, l('сервис заказов', 'order service'), 'currentColor', h)
      c.text(470, 22, l('сеть склада', 'warehouse network'), 'currentColor', h)
      c.text(590, 22, l('система склада', 'warehouse system'), 'currentColor', h)
      for (const x of [298, 418, 538]) c.card(x, 36, 104, 324, M, { fillOp: 0.08, strokeOp: 0.5, sw: 1.5, dash: '4 4' })
      c.text(470, 334, l('не под нашим', 'not under our'), M, { size: 10.5 })
      c.text(470, 348, l('контролем', 'control'), M, { size: 10.5 })
      const rows: [string, string, [number, string, number, string] | string][] = [
        [l('Прикладной', 'Application'), '', [1, l('запрос остатков', 'stock request'), 6, l('ответ получен', 'stock received')]],
        [l('Представления', 'Presentation'), l('формат ответа JSON', 'JSON reply format'), ''],
        [l('Сеансовый', 'Session'), l('сессия с API склада', 'API session with the warehouse'), ''],
        [l('Транспортный', 'Transport'), '', [2, l('порт закрыт', 'port blocked'), 4, l('шлюз склада', 'warehouse gateway')]],
        [l('Сетевой', 'Network'), '', [3, l('нужен VPN', 'VPN needed'), 5, l('маршрут к складу', 'route to warehouse')]],
        [l('Канальный', 'Data link'), l('локальная сеть склада', 'warehouse LAN'), ''],
        [l('Физический', 'Physical'), l('серверы склада', 'warehouse servers'), ''],
      ]
      rows.forEach(([name, sub, tags], i) => {
        const y = 44 + 44 * i
        c.layer(20, y, 256, 7 - i, name, { sub: sub || undefined, fillOp: 0.08 + 0.02 * i })
        if (typeof tags !== 'string') { c.stepTag(56, y + 27, tags[0], tags[1]); c.stepTag(168, y + 27, tags[2], tags[3]) }
        c.line([[278, y + 18], [652, y + 18]], M, { w: 1, op: 0.4, dash: '3 4' })
      })
      const path: [number, number][] = [[350, 62], [350, 194], [470, 238], [470, 194], [590, 238], [590, 62]]
      c.line(path, W, { w: 3, cap: true, dash: '1 7' })
      path.forEach(([x, y], i) => c.badge(x, y, W, String(i + 1), { r: 10, size: 11, dy: 4, w: 800 }))
    },
  },
  // Библия проекта в центре: агент читает её каждую сессию; вокруг правила, скиллы, описание продукта
  'project-bible': {
    ru: 'Библия проекта в центре: агент читает её в каждой сессии, в ней правила, скиллы и описание продукта', en: 'The project bible at the centre: the agent reads it every session; it holds rules, skills and the product description',
    viewBox: [0, 0, 700, 270],
    draw: (c, l) => {
      const sub = { size: 11, w: 400, col: M }
      c.card(285, 8, 130, 34, A, { fillOp: 0.14, lines: [{ t: l('агент', 'agent'), dy: 22, size: 13, w: 800 }] })
      c.line([[350, 44], [350, 84]], A, { w: 2.5, cap: true })
      c.line([[344, 78], [350, 86], [356, 78]], A, { w: 2.5, cap: true })
      c.card(235, 88, 230, 76, A, { fillOp: 0.14 })
      c.icon(250, 108, 'book', A, { k: 1.7, w: 1.6 })
      c.text(300, 122, l('Библия проекта', 'Project bible'), A, { size: 15, w: 800, anchor: 'start' })
      c.text(300, 142, l('читается в каждой сессии', 'read in every session'), M, { size: 11, w: 400, anchor: 'start' })
      const dots = { w: 2.5, cap: true, dash: '1 6' }
      c.line([[235, 126], [214, 126]], A, dots)
      c.line([[465, 126], [486, 126]], A, dots)
      c.line([[350, 164], [350, 196]], A, dots)
      c.card(20, 92, 194, 68, A, { fillOp: 0.08, lines: [{ t: l('Правила', 'Rules'), dy: 26, size: 14, w: 800 }, { t: l('делай сам, а не проси', 'do it, do not ask'), dy: 44, ...sub }, { t: 'CLAUDE.md · AGENTS.md', dy: 59, size: 10.5, w: 700 }] })
      c.card(486, 92, 194, 68, A, { fillOp: 0.08, lines: [{ t: l('Скиллы', 'Skills'), dy: 26, size: 14, w: 800 }, { t: l('повторяющиеся процессы', 'repeating processes'), dy: 46, ...sub }] })
      c.card(235, 198, 230, 56, A, { fillOp: 0.08, lines: [{ t: l('Описание продукта', 'Product description'), dy: 24, size: 14, w: 800 }, { t: l('зачем, для кого, что решено', 'why, for whom, what is decided'), dy: 42, ...sub }] })
    },
  },
}
export default scenes
