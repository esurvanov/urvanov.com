// Схемы поста «Где ставить проверку работы ИИ-агента». Одна мысль на схему: проверка любой программы сводится к вопросу
// об остановке (теорема Райса); три способа сузить проверку; агрегат как пост проверки, внутри которого пишет агент;
// размер контекста по тому, доходит ли его модель до конца. Цвета по ролям: серый — данные и люди, синий — агент и проверки,
// оранжевый — граница, нарушение, «не знаю».
import { type Scene, A, M, W } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Программа Q: сначала чужая P(w), потом B(x), которая нарушает правило. Проверка Q отвечает, остановится ли P(w)
  rice: {
    ru: 'Программа Q сначала запускает чужую программу P, а когда та закончится, выполняет шаг B, который нарушает правило. Q нарушает правило ровно тогда, когда P останавливается, поэтому проверка Q отвечала бы на вопрос об остановке',
    en: 'Program Q first runs someone else’s program P, and when it finishes runs step B, which breaks the rule. Q breaks the rule exactly when P halts, so checking Q would answer the halting question',
    viewBox: [0, 0, 700, 300],
    draw: (c, l) => {
      c.text(190, 26, l('Программа $Q(x)$', 'Program $Q(x)$'), M, { size: 13, w: 800 })
      c.card(30, 40, 320, 150, M, { fillOp: 0.04, dash: '6 5', sw: 1.6 })
      c.card(44, 80, 116, 70, M, { lines: [{ t: '$P(w)$', dy: 34, size: 16, w: 800 }, { t: l('любая программа', 'any program'), dy: 54, size: 10.5, w: 600 }] })
      c.arrow(164, 115, 216, 115, M, { w: 2 })
      c.text(190, 70, l('кончилась →', 'done →'), M, { size: 10.5, w: 700 })
      c.card(220, 80, 116, 70, W, { lines: [{ t: '$B(x)$', dy: 34, size: 16, w: 800 }, { t: l('нарушает правило', 'breaks the rule'), dy: 54, size: 10.5, w: 600 }] })
      c.text(190, 176, l('сначала $P$, потом $B$', 'first $P$, then $B$'), M, { size: 11, w: 600 })
      // Проверяющий
      c.arrow(356, 115, 420, 115, A, { w: 2.4 })
      const i = c.iso(470, 118, 24); i.tile(-1.2, -1.2, 2.4, 2.4, { grid: false }); i.agent(0, 0, A, 1, '')
      c.badge(498, 76, W, '?', { r: 12 })
      c.text(470, 176, l('проверка правила', 'rule check'), A, { size: 12, w: 800 })
      // Два исхода
      c.card(540, 44, 150, 58, W, { lines: [{ t: l('$P(w)$ остановилась', '$P(w)$ halted'), dy: 24, size: 11, w: 800 }, { t: l('→ $Q$ нарушает', '→ $Q$ breaks it'), dy: 42, size: 11, w: 700 }] })
      c.card(540, 128, 150, 58, M, { lines: [{ t: l('$P(w)$ крутится вечно', '$P(w)$ runs forever'), dy: 24, size: 11, w: 800 }, { t: l('→ $Q$ чиста', '→ $Q$ is clean'), dy: 42, size: 11, w: 700 }] })
      c.line([[520, 115], [536, 73]], M, { w: 1.4, op: 0.6 }); c.line([[520, 115], [536, 157]], M, { w: 1.4, op: 0.6 })
      c.rect(30, 220, 660, 54, { rx: 12, fill: W, fillOp: 0.08, stroke: W, sw: 1.6 })
      c.text(360, 244, l('ответ проверки = ответ «остановится ли $P(w)$»', 'the check’s answer = “will $P(w)$ halt?”'), W, { size: 13, w: 800 })
      c.text(360, 264, l('а этот вопрос не решается ни одной программой', 'and no program can decide that'), W, { size: 11.5, w: 600 })
    },
  },
  // Три способа сузить проверку: маленький мир, узкий язык, честное «не знаю»
  'three-ways': {
    ru: 'Три способа сделать проверку конечной: перебрать маленький мир целиком, оставить один путь записи и разрешить ответ «не знаю», который уходит человеку',
    en: 'Three ways to make a check finite: try a small world in full, leave one write path, and allow a “don’t know” answer that goes to a person',
    viewBox: [0, 0, 700, 290],
    draw: (c, l) => {
      const head: [number, string, string][] = [[115, 'Сузить мир', 'Narrow the world'], [350, 'Сузить язык', 'Narrow the language'], [585, 'Разрешить «не знаю»', 'Allow “don’t know”']]
      for (const [x, ru, en] of head) c.text(x, 26, l(ru, en), A, { size: 13, w: 800 })
      // Мир: 3 комнаты × 5 броней — все клетки проверены
      c.text(115, 52, l('3 комнаты × 5 броней', '3 rooms × 5 bookings'), M, { size: 11, w: 600 })
      for (let r = 0; r < 3; r++) c.dotRow(65, 78 + r * 26, 5, 5, A, { gap: 25, r: 8 })
      c.seal(115, 172, A, 'check')
      c.text(115, 210, l('перебраны все состояния', 'every state tried'), A, { size: 11.5, w: 700 })
      c.text(115, 228, 'Quint', M, { size: 11, w: 600 })
      // Язык: один писатель, обходы перекрыты
      const j = c.iso(350, 116, 24); j.tile(-2, -2, 4, 4, { grid: false })
      j.agent(-1.5, -1.5, A, 0.85, ''); j.cyl(1.1, 1.1, 0, 0.55, 0.9, M)
      j.path([[-0.9, -0.9], [0.5, 0.5]], A, { w: 3, arrow: true })
      j.path([[1.9, -1.9], [1.2, 0.3]], W, { w: 2, dash: '4 4' }); j.path([[-1.9, 1.9], [0.3, 1.2]], W, { w: 2, dash: '4 4' })
      const x1 = j.p(1.6, -1.0), x2 = j.p(-1.0, 1.6)
      c.badge(x1[0], x1[1], W, '', { mark: 'cross', r: 9 }); c.badge(x2[0], x2[1], W, '', { mark: 'cross', r: 9 })
      c.text(350, 210, l('один путь записи', 'one write path'), A, { size: 11.5, w: 700 })
      c.text(350, 228, l('проверить: нет ли обхода', 'check: is there a bypass'), M, { size: 11, w: 600 })
      // «Не знаю» → человек
      c.badge(530, 80, A, '', { mark: 'check', r: 13 }); c.text(560, 84, l('доказано', 'proved'), A, { size: 11, w: 700, anchor: 'start' })
      c.badge(530, 116, W, '', { mark: 'cross', r: 13 }); c.text(560, 120, l('нарушено', 'broken'), W, { size: 11, w: 700, anchor: 'start' })
      c.badge(530, 152, W, '?', { r: 13 }); c.text(560, 156, l('не уверена', 'not sure'), W, { size: 11, w: 700, anchor: 'start' })
      c.arrow(640, 152, 664, 176, W, { w: 2 })
      const p = c.iso(668, 192, 18); p.person(0, 0, M, '')
      c.text(585, 228, l('третий ответ — человеку', 'the third answer goes to a person'), M, { size: 11, w: 600 })
      c.line([[232, 44], [232, 240]], M, { w: 1, op: 0.35, dash: '3 5' }); c.line([[468, 44], [468, 240]], M, { w: 1, op: 0.35, dash: '3 5' })
      c.text(350, 274, l('внутри рамки ответ точный', 'inside the frame the answer is exact'), A, { size: 12.5, w: 800 })
    },
  },
  // Агрегат: команды входят через пост проверки, события выходят через него же; внутри работает агент
  gate: {
    ru: 'Агрегат «Бронь»: команды входят и события выходят через пост проверки на границе, там же стоит правило «брони одной комнаты не пересекаются». Внутри границы код пишет агент',
    en: 'The Booking aggregate: commands come in and events go out through a checkpoint on the border, where the rule “bookings of one room never overlap” also sits. Inside the border the agent writes the code',
    viewBox: [0, 0, 700, 320],
    draw: (c, l) => {
      const g = c.iso(350, 150, 30); g.tile(-2.4, -2.4, 4.8, 4.8, { dash: '7 5', edge: W })
      g.agent(-0.3, -0.2, A, 1.2, ''); g.doc(0.8, -1.4, 0, 1.0, 0.8, A, 3); g.doc(-1.6, 0.8, 0, 1.0, 0.8, A, 3)
      c.text(350, 248, l('внутри: код пишет агент', 'inside: the agent writes code'), A, { size: 12, w: 800 })
      c.text(350, 32, l('агрегат «Бронь»', 'Booking aggregate'), M, { size: 13, w: 800 })
      // Вход: команды
      c.card(18, 96, 150, 64, M, { lines: [{ t: l('команда', 'command'), dy: 24, size: 11, w: 600 }, { t: l('Забронировать', 'Book a room'), dy: 44, size: 12.5, w: 800 }] })
      c.arrow(170, 128, 222, 140, A, { w: 2.4 })
      c.seal(212, 112, A, 'check', { r: 13 })
      // Выход: события
      c.card(532, 96, 150, 64, M, { lines: [{ t: l('событие', 'event'), dy: 24, size: 11, w: 600 }, { t: l('БроньСоздана', 'BookingCreated'), dy: 44, size: 12.5, w: 800 }] })
      c.arrow(476, 140, 528, 128, A, { w: 2.4 })
      c.seal(488, 112, A, 'check', { r: 13 })
      // Инвариант и модель чтения
      c.card(180, 268, 340, 42, A, { lines: [{ t: l('правило: брони комнаты не пересекаются', 'rule: a room’s bookings never overlap'), dy: 26, size: 11.5, w: 700 }] })
      c.card(532, 200, 150, 50, M, { lines: [{ t: l('модель чтения', 'read model'), dy: 20, size: 10.5, w: 600 }, { t: l('расписание комнаты', 'room schedule'), dy: 38, size: 11.5, w: 800 }] })
      c.arrow(470, 196, 528, 220, M, { w: 1.6, dash: '4 4' })
      c.text(110, 200, l('граница =', 'border ='), W, { size: 12, w: 800 })
      c.text(110, 218, l('пост проверки', 'checkpoint'), W, { size: 12, w: 800 })
    },
  },
  // Размер контекста: большая модель отвечает «не уверена», после разреза каждая модель доходит до конца
  size: {
    ru: 'Слева бронь, оплата и уведомления в одной модели: состояний слишком много, проверка отвечает «не уверена». Справа два контекста, модель каждого перебирается до конца',
    en: 'On the left booking, payment and notifications sit in one model: too many states, and the check answers “not sure”. On the right two contexts, each model is checked to the end',
    viewBox: [0, 0, 700, 280],
    draw: (c, l) => {
      c.text(170, 26, l('Один большой контекст', 'One big context'), M, { size: 13, w: 800 })
      c.text(520, 26, l('Разрезали по проверке', 'Split by checkability'), A, { size: 13, w: 800 })
      const b = c.iso(170, 128, 22); b.tile(-2.6, -2.6, 5.2, 5.2, { dash: '6 5', edge: W })
      b.box(-1.8, -1.8, 0, 1, 1, 0.8, M); b.box(0.6, -1.6, 0, 1, 1, 0.8, M); b.box(-0.6, 0.6, 0, 1, 1, 0.8, M)
      b.text(-1.3, -1.3, l('бронь', 'booking'), M, { gz: 1, dy: -14, size: 10, w: 700 }); b.text(1.1, -1.1, l('оплата', 'payment'), M, { gz: 1, dy: -14, size: 10, w: 700 }); b.text(-0.1, 1.1, l('уведомления', 'notices'), M, { dy: 24, size: 10, w: 700, halo: true })
      c.badge(250, 70, W, '?', { r: 14 })
      c.text(170, 236, l('проверка: «не уверена»', 'check: “not sure”'), W, { size: 12, w: 800 })
      c.text(170, 254, l('состояний слишком много', 'too many states'), M, { size: 11, w: 600 })
      c.thenArrow(318, 382, 128)
      for (const [x, ru, en] of [[460, 'бронь', 'booking'], [590, 'оплата', 'payment']] as [number, string, string][]) {
        const i = c.iso(x, 128, 22); i.tile(-1.4, -1.4, 2.8, 2.8, { dash: '6 5', edge: W }); i.box(-0.5, -0.5, 0, 1, 1, 0.8, M)
        c.text(x, 196, l(ru, en), M, { size: 11.5, w: 800 }); c.seal(x + 34, 82, A, 'check', { r: 12 })
      }
      c.arrow(500, 150, 552, 150, M, { w: 1.6, dash: '4 4' }); c.text(526, 168, l('событие', 'event'), M, { size: 10, w: 700 })
      c.text(525, 236, l('каждая модель: до конца', 'each model: to the end'), A, { size: 12, w: 800 })
      c.text(525, 254, l('между ними только события', 'only events between them'), M, { size: 11, w: 600 })
    },
  },
  // Первая нарезка: таблицы, связанные одним правилом, в одной части; общее ядро с одним владельцем; история правок двигает границу
  'first-cut': {
    ru: 'Таблицы, которые связывает одно правило, лежат в одной части. Статус репорта нужен обеим частям, поэтому он стал общим ядром с одним владельцем. Если файлы двух частей часто меняются вместе, границу сдвигают',
    en: 'Tables linked by one rule sit in one part. The report status is needed by both parts, so it becomes a shared core with one owner. If files of two parts often change together, the border is moved',
    viewBox: [0, 0, 700, 300],
    draw: (c, l) => {
      c.curve(250, 52, 450, 52, W, { c1: [300, 14], c2: [400, 14], w: 2, dash: '5 4' })
      c.text(350, 24, l('часто меняются вместе → сдвинуть границу', 'often change together → move the border'), W, { size: 11.5, w: 800, halo: true })
      const groups: [number, string, string, string, string, string, string][] = [
        [30, 'эпики', 'epics', 'репорты', 'reports', 'в закрытом эпике нет открытого репорта', 'a closed epic has no open report'],
        [400, 'токены', 'tokens', 'проекты', 'projects', 'токен видит только свои проекты', 'a token sees only its own projects'],
      ]
      for (const [x, a1, a2, b1, b2, r1, r2] of groups) {
        c.rect(x, 52, 270, 124, { rx: 14, fill: W, fillOp: 0.04, stroke: W, sw: 1.6, dash: '6 5' })
        c.card(x + 18, 78, 100, 44, M, { lines: [{ t: l(a1, a2), dy: 27, size: 12.5, w: 800 }] })
        c.card(x + 152, 78, 100, 44, M, { lines: [{ t: l(b1, b2), dy: 27, size: 12.5, w: 800 }] })
        c.line([[x + 118, 100], [x + 152, 100]], A, { w: 3 })
        c.text(x + 135, 150, l(r1, r2), A, { size: 10.5, w: 700 })
      }
      c.card(230, 222, 240, 60, A, { lines: [{ t: l('статус репорта', 'report status'), dy: 25, size: 12.5, w: 800 }, { t: l('общее ядро, один владелец', 'shared core, one owner'), dy: 45, size: 10.5, w: 600 }] })
      c.arrow(165, 178, 262, 220, M, { w: 1.6, dash: '4 4' })
      c.card(560, 230, 100, 44, M, { lines: [{ t: l('доска', 'board'), dy: 27, size: 12.5, w: 800 }] }); c.arrow(558, 252, 474, 252, M, { w: 1.6, dash: '4 4' })
      c.text(150, 214, l('только через владельца', 'only via the owner'), M, { size: 10.5, w: 600 })
      c.text(516, 242, l('тоже через него', 'also via it'), M, { size: 10, w: 600 })
    },
  },
  // Коротко: три вложенные зоны — внутри агрегата пишет агент, на границе агрегата стоит проверка, границу контекста держит человек
  overview: {
    ru: 'Три зоны: внутри агрегата код пишет агент; на границе агрегата команды и события проходят проверку, там же записано правило; границу контекста держит человек',
    en: 'Three zones: inside the aggregate the agent writes code; on the aggregate border commands and events pass a check, and the rule is written there; the context border is held by a person',
    viewBox: [0, 0, 700, 390],
    draw: (c, l) => {
      // 3. Граница контекста
      c.rect(16, 16, 668, 360, { rx: 18, fill: W, fillOp: 0.03, stroke: W, sw: 1.8, dash: '7 5' })
      c.step(42, 44, 3, '', W); c.text(62, 48, l('граница контекста «Бронирование» — держит человек', 'context border “Booking”: held by a person'), W, { size: 12.5, w: 800, anchor: 'start' })
      const p = c.iso(640, 62, 16); p.person(0, 0, M, '')
      // 2. Граница агрегата
      c.rect(176, 78, 348, 232, { rx: 16, fill: A, fillOp: 0.04, stroke: A, sw: 2, dash: '6 5' })
      c.step(202, 104, 2, '', A); c.text(222, 108, l('граница агрегата «Бронь» — проверка', 'aggregate border “Booking”: the check'), A, { size: 12, w: 800, anchor: 'start' })
      // Команда входит, событие выходит, на границе — печати проверки
      c.card(30, 168, 124, 58, M, { lines: [{ t: l('команда', 'command'), dy: 22, size: 10.5, w: 600 }, { t: l('Забронировать', 'Book a room'), dy: 42, size: 12, w: 800 }] })
      c.arrow(156, 197, 196, 197, A, { w: 2.4 }); c.seal(176, 197, A, 'check', { r: 12 })
      c.card(546, 168, 124, 58, M, { lines: [{ t: l('событие', 'event'), dy: 22, size: 10.5, w: 600 }, { t: l('БроньСоздана', 'BookingCreated'), dy: 42, size: 12, w: 800 }] })
      c.arrow(504, 197, 544, 197, A, { w: 2.4 }); c.seal(524, 197, A, 'check', { r: 12 })
      // 1. Внутри агрегата
      const g = c.iso(350, 186, 24); g.tile(-1.8, -1.8, 3.6, 3.6, { grid: false })
      g.agent(-0.4, -0.4, A, 1.1, ''); g.doc(0.7, -1.4, 0, 0.9, 0.7, A, 3); g.doc(-1.5, 0.6, 0, 0.9, 0.7, A, 3)
      c.step(272, 254, 1, '', A); c.text(290, 258, l('внутри: код пишет агент', 'inside: the agent writes code'), A, { size: 12, w: 800, anchor: 'start' })
      c.pill(232, 272, 236, 28, A); c.text(350, 291, l('правило: брони не пересекаются', 'rule: bookings never overlap'), A, { size: 11.5, w: 800 })
      c.text(350, 350, l('человек проверяет границы, агент свободен внутри', 'the person checks borders, the agent is free inside'), M, { size: 12, w: 700 })
    },
  },
  // Практический приём: было — в таблицу платежей пишут три модуля, вопрос о поведении; стало — пишет один, база отвергает платёж без заказа, вопрос о тексте
  'rewrite-rule': {
    ru: 'Было: к данным о платежах ведут три входа, и за каждым не уследить. Стало: вход один и с замком, остальные закрыты, и проверить нужно только одно — нет ли других входов',
    en: 'Before: three entrances lead to the payment data, and you can’t watch each one. After: there is one entrance with a lock, the others are closed, and only one thing needs checking: are there other entrances',
    viewBox: [0, 0, 700, 300],
    draw: (c, l) => {
      const room = (cx: number, after: boolean) => {
        const i = c.iso(cx, 130, 26); i.tile(-2.6, -2.6, 5.2, 5.2, { grid: false })
        i.cyl(0, 0, 0, 0.8, 1.0, M)
        const doors: [number, number][] = [[-2.1, 0], [0, -2.1], [2.1, 0]]
        doors.forEach(([x, y], k) => {
          if (after && k > 0) { i.barrier(x, y, 1.0, W); return }
          i.door(x, y, 1.0, after ? A : M)
          i.path([[x * 0.75, y * 0.75], [x * 0.35, y * 0.35]], after ? A : W, { w: 2.4, arrow: true })
        })
      }
      c.caps(170, 22, l('было', 'before'), W); c.caps(530, 22, l('стало', 'after'), A)
      room(170, false); room(530, true)
      c.badge(250, 66, W, '?', { r: 13 }); c.badge(610, 66, A, '', { mark: 'check', r: 13 })
      c.text(170, 236, l('три входа к данным', 'three entrances to the data'), M, { size: 12.5, w: 800 })
      c.text(170, 256, l('за каждым не уследить', 'you can’t watch each one'), W, { size: 11.5, w: 700 })
      c.text(530, 236, l('один вход с замком', 'one entrance with a lock'), A, { size: 12.5, w: 800 })
      c.text(530, 256, l('проверить: нет ли других входов', 'check: are there other entrances'), A, { size: 11.5, w: 700 })
      c.thenArrow(318, 382, 130)
      c.text(350, 288, l('вход — модуль, который пишет в таблицу платежей; замок — ограничение в базе', 'an entrance is a module writing to the payments table; the lock is a database constraint'), M, { size: 11, w: 600 })
    },
  },
  // Открытый вопрос о рамке: прошлое известно (история правок, планы), будущие правки — нет; одна ляжет в рамку, другая её разорвёт
  'frame-question': {
    ru: 'Одна рамка и две возможные правки: одна ляжет внутрь рамки, другая пересечёт её границу. Какая придёт, заранее неизвестно',
    en: 'One frame and two possible edits: one lands inside the frame, the other crosses its border. Which one comes is unknown in advance',
    viewBox: [0, 0, 700, 300],
    legend: false,
    draw: (c, l) => {
      const names: [string, string][] = [['брони', 'bookings'], ['комнаты', 'rooms'], ['счета', 'invoices']]
      const xs = [150, 300, 470], y = 128
      c.rect(86, y - 20, 278, 84, { rx: 14, fill: A, fillOp: 0.06, stroke: A, sw: 2.2, dash: '7 5' })
      c.text(225, y + 84, l('рамка', 'frame'), A, { size: 12, w: 800 })
      xs.forEach((x, k) => c.card(x - 50, y - 4, 100, 48, M, { lines: [{ t: l(...names[k]), dy: 30, size: 13.5, w: 800 }] }))
      // Правка 1 — сверху, внутри рамки
      c.curve(xs[0], y - 6, xs[1], y - 6, A, { c1: [xs[0], y - 70], c2: [xs[1], y - 70], w: 3 })
      c.badge(225, y - 66, A, '', { mark: 'check', r: 12 })
      c.text(225, y - 88, l('правка 1: внутри рамки', 'edit 1: inside the frame'), A, { size: 12.5, w: 800 })
      // Правка 2 — снизу, через границу
      c.curve(xs[0], y + 46, xs[2], y + 46, W, { c1: [xs[0], y + 140], c2: [xs[2], y + 140], w: 3, dash: '7 5' })
      c.badge(310, y + 116, W, '', { mark: 'cross', r: 12 })
      c.text(310, y + 148, l('правка 2: через границу — рамку сдвигать', 'edit 2: across the border, move the frame'), W, { size: 12.5, w: 800 })
      c.badge(610, y + 20, W, '?', { r: 18 })
      c.text(610, y + 58, l('какая придёт?', 'which will come?'), W, { size: 12.5, w: 800 })
    },
  },
}

export default scenes
