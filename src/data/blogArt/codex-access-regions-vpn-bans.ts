// Схемы поста «Codex в России: доступ, VPN и блокировки»
import { type Scene, A, M, W, bandTitle } from '@/lib/infographic'
import { WORLD, MAP_LABELS } from '@/lib/worldMapPaths'

const scenes: Record<string, Scene> = {
  // Карта по списку стран OpenAI
  'world-map': {
    ru: 'Карта мира по списку стран OpenAI. Синим закрашены страны из списка OpenAI, штриховкой — страны, которые есть только у OpenAI (Афганистан, Мьянма, Йемен, Гренландия), оранжевым — страны, которых в списке нет: Россия, Беларусь, Китай, Иран, Сирия, Северная Корея, Куба, Венесуэла, а также Гонконг, Макао и Косово. Украина показана частично: в списке она с исключениями. Синие точки — мелкие страны из списка, серым закрашены места без записи в списке.',
    en: 'World map by the OpenAI country list. Blue marks countries on the OpenAI list, hatching marks countries only OpenAI has (Afghanistan, Myanmar, Yemen, Greenland), orange marks countries not on the list: Russia, Belarus, China, Iran, Syria, North Korea, Cuba, Venezuela, plus Hong Kong, Macao and Kosovo. Ukraine is partial: the list has exceptions. Blue dots are small countries on the list; grey marks places with no entry in the list.',
    viewBox: [0, 0, 860, 805],
    legend: false,
    draw: (c, l) => {
      c.raw('<defs><pattern id="wm-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="5" height="5" fill="' + A + '" fill-opacity=".12"/><line x1="0" y1="0" x2="0" y2="5" stroke="' + A + '" stroke-width="2.2"/></pattern><pattern id="wm-part" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="' + A + '" fill-opacity=".62"/><line x1="0" y1="0" x2="0" y2="6" stroke="' + W + '" stroke-width="2.6"/></pattern></defs>')
      const land = (d: string, fill: string, op: number, extra = '') => c.raw('<path d="' + d + '" fill="' + fill + '" fill-opacity="' + op + '" stroke="var(--bg)" stroke-width=".7" stroke-linejoin="round"' + extra + '/>')
      c.raw('<g transform="translate(0 8)">')
      land(WORLD.neutral, M, 0.35)
      land(WORLD.both, A, 0.62)
      land(WORLD.oai, 'url(#wm-hatch)', 1, ' stroke="' + A + '" stroke-opacity=".7"')
      land(WORLD.part, 'url(#wm-part)', 1)
      land(WORLD.out, W, 0.85)
      land(WORLD.ru, W, 1, ' stroke="' + W + '" stroke-width="1.4"')
      for (const [x, y] of WORLD.dots) c.raw('<circle cx="' + x + '" cy="' + y + '" r="2.8" fill="' + A + '" stroke="#fff" stroke-width="1"/>')
      for (const [x, y] of WORLD.dotsOut) c.raw('<circle cx="' + x + '" cy="' + y + '" r="2.8" fill="' + W + '" stroke="#fff" stroke-width="1"/>')
      const L = MAP_LABELS
      c.text(L.Russia[0] - 30, L.Russia[1] + 16, l('Россия', 'Russia'), '#fff', { size: 18, w: 800, halo: false })
      const nums: [string, number, string][] = [['Belarus', 1, 'o'], ['China', 2, 'o'], ['Iran', 3, 'o'], ['Syria', 4, 'o'], ['North Korea', 5, 'o'], ['Cuba', 6, 'o'], ['Venezuela', 7, 'o'], ['Afghanistan', 8, 'b'], ['Myanmar', 9, 'b'], ['Yemen', 10, 'b'], ['Greenland', 11, 'b'], ['W. Sahara', 12, 'g'], ['N. Cyprus', 13, 'g'], ['Somaliland', 14, 'g'], ['Falkland Is.', 15, 'g']]
      const off: Record<string, [number, number]> = { 'N. Cyprus': [-17, -3], Somaliland: [8, 16] }
      for (const [n, k, g] of nums) c.badge(L[n][0] + (off[n]?.[0] ?? 0), L[n][1] + 8 + (off[n]?.[1] ?? 0), g === 'o' ? W : g === 'g' ? M : A, String(k), { r: 9, size: 11 })
      c.raw('</g>')
      // легенда
      const y0 = 452
      const row = (y: number, sw: () => void, title: string, body: string, body2?: string) => { sw(); c.text(40, y + 4, title, M, { size: 14, w: 800, anchor: 'start' }); c.text(40, y + 24, body, M, { size: 13, w: 500, anchor: 'start' }); if (body2) c.text(40, y + 41, body2, M, { size: 13, w: 500, anchor: 'start' }) }
      const chips = (y: number, items: [number, string][], col: string) => { let x = 40; for (const [n, t] of items) { if (n) { c.badge(x + 9, y + 20, col, String(n), { r: 9, size: 11 }); x += 24 } c.text(x, y + 24, t, M, { size: 13, w: 500, anchor: 'start' }); x += t.length * 7.4 + 18 } }
      row(y0, () => c.rect(10, y0 - 10, 18, 18, { rx: 4, fill: A, fillOp: 0.62 }), l('В списке OpenAI — почти весь мир', 'On the OpenAI list — almost the whole world'), l('Например Казахстан, Грузия, Армения, Узбекистан.', 'For example Kazakhstan, Georgia, Armenia, Uzbekistan.'))
      row(y0 + 52, () => c.raw('<circle cx="19" cy="' + (y0 + 51) + '" r="4.5" fill="' + A + '" stroke="#fff" stroke-width="1.2"/>'), l('Точки — мелкие страны из списка', 'Dots — small countries on the list'), l('Их контур на карте не разглядеть.', 'Too small to see their outline on the map.'))
      row(y0 + 104, () => c.rect(10, y0 + 94, 18, 18, { rx: 4, fill: 'url(#wm-hatch)', stroke: A, sw: 1 }), l('Только в списке OpenAI', 'Only on the OpenAI list'), '', l('У Anthropic этих записей нет.', 'Anthropic has no entry for these.'))
      chips(y0 + 104, [[8, l('Афганистан', 'Afghanistan')], [9, l('Мьянма', 'Myanmar')], [10, l('Йемен', 'Yemen')], [11, l('Гренландия', 'Greenland')]], A)
      row(y0 + 170, () => c.rect(10, y0 + 160, 18, 18, { rx: 4, fill: 'url(#wm-part)' }), l('Частично — Украина', 'Partly — Ukraine'), l('В списке запись «Ukraine (with certain exceptions)».', 'The list entry reads “Ukraine (with certain exceptions)”.'))
      row(y0 + 222, () => c.rect(10, y0 + 212, 18, 18, { rx: 4, fill: W, fillOp: 0.9 }), l('Оранжевый — в списке нет', 'Orange — not on the list'), '', l('Россия (крупная подпись на карте). Оранжевые точки: Гонконг, Макао, Косово.', 'Russia (large label on the map). Orange dots: Hong Kong, Macao, Kosovo.'))
      chips(y0 + 222, [[1, l('Беларусь', 'Belarus')], [2, l('Китай', 'China')], [3, l('Иран', 'Iran')], [4, l('Сирия', 'Syria')], [5, l('Северная Корея', 'North Korea')], [6, l('Куба', 'Cuba')], [7, l('Венесуэла', 'Venezuela')]], W)
      row(y0 + 286, () => c.rect(10, y0 + 276, 18, 18, { rx: 4, fill: M, fillOp: 0.35 }), l('Серый — спорные территории', 'Grey — disputed territories'), '', l('Отдельной записи в списке нет, вывода о доступе сделать нельзя.', 'The list has no separate entry, so no conclusion about access can be drawn.'))
      chips(y0 + 286, [[12, l('Западная Сахара', 'Western Sahara')], [13, l('Северный Кипр', 'Northern Cyprus')], [14, l('Сомалиленд', 'Somaliland')], [15, l('Фолклендские острова', 'Falkland Islands')]], M)
    },
  },
  // Один список — одни ворота
  'list-gate': {
    ru: 'Одни ворота — список стран OpenAI. Человек из страны в списке проходит к Codex. Человек из страны вне списка остановлен у ворот, приходит ответ «not available there»', en: 'One gate: the OpenAI country list. A person from a country on the list reaches Codex. A person from a country off the list is stopped at the gate and gets “not available there”',
    viewBox: [0, 0, 860, 320],
    draw: (c, l) => {
      const inn = c.iso(80, 92, 22); inn.tile(-1.2, -1.2, 2.4, 2.4); inn.person(0, 0.2, M, '')
      c.badge(110, 52, M, '', { r: 11, mark: 'check', k: 1 })
      const out = c.iso(80, 232, 22); out.tile(-1.2, -1.2, 2.4, 2.4); out.person(0, 0.2, M, '')
      c.text(80, 138, l('в списке', 'on the list'), M, { size: 14, w: 700 })
      c.text(80, 278, l('вне списка', 'off the list'), W, { size: 14, w: 700 })
      const g = c.iso(330, 170, 26); g.tile(-1.6, -1.6, 3.2, 3.2); g.box(-1.2, -0.4, 0, 0.5, 0.8, 2.2, A); g.box(0.8, -0.4, 0, 0.5, 0.8, 2.2, A); g.box(-1.2, -0.4, 2.2, 2.5, 0.8, 0.45, A)
      c.text(330, 286, l('список стран OpenAI', 'OpenAI country list'), A, { size: 14, w: 700 })
      c.arrow(122, 104, 256, 150, M, { w: 2.4 })
      c.line([[400, 150], [520, 150]], A, { w: 2.4 })
      c.arrow(520, 150, 580, 150, A, { w: 2.4 })
      const cx = c.iso(700, 150, 24); cx.tile(-1.4, -1.4, 2.8, 2.8); cx.panel(-1.1, -0.7, 2.2, 1.7, A, undefined, 2); cx.agent(0.4, 0.2, A, 0.55, '')
      c.text(700, 224, 'Codex', A, { size: 15, w: 800 })
      c.arrow(122, 232, 238, 204, W, { w: 2.6 })
      c.badge(250, 202, W, '', { r: 12, mark: 'cross' })
      c.pill(430, 244, 260, 44, W); c.text(560, 272, 'not available there', W, { size: 15, w: 700 })
    },
  },
  // Два пути входа
  'login-paths': {
    ru: 'Два пути входа в Codex: аккаунт ChatGPT или ключ API. Данные входа лежат в файле ~/.codex/auth.json или в хранилище системы', en: 'Two ways to sign in to Codex: a ChatGPT account or an API key. The sign-in data lives in the file ~/.codex/auth.json or in the system store',
    viewBox: [0, 0, 860, 320],
    draw: (c, l) => {
      const you = c.iso(60, 150, 22); you.tile(-1.2, -1.2, 2.4, 2.4); you.person(0, 0.2, M, '')
      c.text(60, 206, l('вы', 'you'), M, { size: 14, w: 700 })
      const paths: [number, string, string][] = [[70, 'аккаунт ChatGPT', 'ChatGPT account'], [230, 'ключ API', 'API key']]
      paths.forEach(([y, ru, en]) => {
        c.curve(102, 150, 154, y, M, { w: 2.4 })
        c.pill(158, y - 28, 220, 56, M); c.text(268, y + 6, l(ru, en), M, { size: 16, w: 700 })
        c.curve(380, y, 440, 150, M, { w: 2.4 }); c.arrow(436, 150, 446, 150, M, { w: 2.4 })
      })
      const cx = c.iso(500, 150, 24); cx.tile(-1.4, -1.4, 2.8, 2.8); cx.panel(-1.1, -0.7, 2.2, 1.7, A, undefined, 2); cx.agent(0.4, 0.2, A, 0.55, '')
      c.text(500, 224, 'Codex', A, { size: 15, w: 800 })
      const st: [number, string, string][] = [[70, '~/.codex/auth.json', '~/.codex/auth.json'], [230, 'хранилище системы', 'system store']]
      st.forEach(([y, ru, en]) => {
        c.curve(556, 150, 620, y, A, { w: 2.4 }); c.arrow(616, y, 626, y, A, { w: 2.4 })
        c.pill(630, y - 28, 210, 56, A); c.text(735, y + 6, l(ru, en), A, { size: 15, w: 700 })
      })
      c.text(735, 28, l('где лежат данные входа', 'where sign-in data lives'), M, { size: 13, w: 600 })
    },
  },
  // Что сказано о VPN
  'vpn-rules': {
    ru: 'О VPN сказано три вещи: слова VPN в справке и условиях нет; запрет обходить ограничения и защитные меры есть; прямого ответа «разрешён» или «запрещён» нет — это пунктир и вопрос', en: 'Three things about VPN: the word VPN is not in the help pages or terms; a ban on circumventing restrictions and safeguards exists; there is no direct “allowed” or “prohibited” — shown dashed with a question mark',
    viewBox: [0, 0, 860, 300],
    draw: (c, l) => {
      const cards: [number, string, string, string, string, string, string][] = [
        [150, M, 'слово «VPN»', 'the word “VPN”', 'справка и условия', 'help pages and terms', ''],
        [430, W, 'обход ограничений', 'circumventing limits', 'и защитных мер', 'and safeguards', ''],
        [710, M, 'прямой ответ', 'a direct answer', '«можно» или «нельзя»', '“allowed” or “banned”', ''],
      ]
      cards.forEach(([x, col, t1r, t1e, t2r, t2e], i) => {
        c.rect(x - 124, 20, 248, 260, { rx: 16, fill: col, fillOp: 0.07, stroke: col, sw: 2.2, dash: i === 2 ? '6 5' : undefined })
        const d = c.iso(x, 120, 24); d.tile(-1.3, -1.3, 2.6, 2.6)
        if (i === 0) d.zone(-0.8, -0.8, 1.6, 1.6, col, { op: 0.15, dash: '4 3' })
        else d.doc(-0.6, -0.55, 0, 1.2, 1, col, 3)
        if (i === 0) c.badge(x, 108, M, '', { r: 13, mark: 'cross' })
        if (i === 1) c.badge(x + 36, 84, W, '', { r: 13, mark: 'cross' })
        if (i === 2) c.badge(x + 36, 84, M, '?', { r: 14, size: 18 })
        c.text(x, 196, l(t1r, t1e), col, { size: 15, w: 700 })
        c.text(x, 218, l(t2r, t2e), M, { size: 13 })
      })
      c.pill(70, 236, 160, 30, M); c.text(150, 256, l('в тексте нет', 'not in the text'), M, { size: 13, w: 700 })
      c.pill(350, 236, 160, 30, W); c.text(430, 256, l('запрещено', 'prohibited'), W, { size: 13, w: 700 })
      c.pill(630, 236, 160, 30, M); c.text(710, 256, l('не найдено', 'not found'), M, { size: 13, w: 700 })
    },
  },
  // Четыре запрета
  'four-bans': {
    ru: 'Четыре запрета из условий OpenAI: обходить ограничения и защитные меры, передавать аккаунт другому, использовать в странах под эмбарго США и для лиц под ограничениями, нарушать условия и правила', en: 'Four prohibitions from the OpenAI terms: circumventing restrictions and safeguards, handing the account to someone else, use in countries under a US embargo and by restricted persons, breaking the terms and rules',
    viewBox: [0, 0, 860, 300],
    draw: (c, l) => {
      const xs = [105, 320, 535, 750]
      const heads: [string, string, string, string][] = [
        ['Обход защиты', 'Circumvention', 'ограничений и защитных мер', 'of limits and safeguards'],
        ['Чужой аккаунт', 'Account handover', 'передача другому человеку', 'giving it to another person'],
        ['Эмбарго США', 'US embargo', 'страны и лица под ограничениями', 'countries and restricted persons'],
        ['Нарушение правил', 'Rule breaking', 'условий и политик', 'of the terms and policies'],
      ]
      xs.forEach((x, i) => {
        const iso = c.iso(x, 120, 22); iso.tile(-1.5, -1.5, 3, 3)
        if (i === 0) { iso.panel(-1.1, -0.8, 2.2, 1.8, W, undefined, 3); iso.agent(0.3, 0.9, A, 0.5, '') }
        if (i === 1) { iso.person(-0.8, 0.3, M, ''); iso.person(0.9, 0.5, M, ''); iso.doc(-0.3, -0.5, 0.2, 0.7, 0.6, W, 2) }
        if (i === 2) { iso.panel(-1.2, -0.9, 2.4, 1.6, W, undefined, 2); iso.person(0.2, 1.0, M, '') }
        if (i === 3) { iso.doc(-0.6, -0.6, 0, 1.2, 1.1, W, 3); iso.bug(0.7, 0.8) }
        c.badge(x + 42, 60, W, '', { r: 11, mark: 'cross' })
        c.text(x, 218, l(heads[i][0], heads[i][1]), W, { size: 15, w: 800 })
        c.text(x, 238, l(heads[i][2], heads[i][3]), M, { size: 12, w: 500 })
      })
    },
  },
  // Ступени блокировки
  'ban-ladder': {
    ru: 'Ступени по открытым страницам: основание, приостановка или закрытие доступа, апелляция через поддержку. Сроки ответа и исход апелляции в пунктирной рамке: в открытых страницах их нет', en: 'Steps from the public pages: a ground, access suspended or closed, an appeal through support. Response times and the appeal outcome sit in a dashed frame: the public pages do not have them',
    viewBox: [0, 0, 860, 320],
    draw: (c, l) => {
      const a = c.iso(110, 120, 22); a.tile(-1.4, -1.4, 2.8, 2.8); a.doc(-0.7, -0.6, 0, 1.4, 1.1, W, 3)
      c.text(110, 194, l('1. Основание', '1. A ground'), W, { size: 15, w: 800 })
      c.text(110, 214, l('нарушение условий', 'a terms violation'), M, { size: 12, w: 500 })
      c.arrow(188, 120, 282, 120, M, { w: 2.2 })
      const b = c.iso(360, 120, 22); b.tile(-1.4, -1.4, 2.8, 2.8); b.panel(-1.1, -0.7, 2.2, 1.7, W, undefined, 2)
      c.badge(360, 100, W, '', { r: 12, mark: 'cross' })
      c.text(360, 194, l('2. Доступ закрыт', '2. Access closed'), W, { size: 15, w: 800 })
      c.text(360, 214, l('приостановка или закрытие', 'suspended or closed'), M, { size: 12, w: 500 })
      c.arrow(440, 120, 534, 120, M, { w: 2.2 })
      const d = c.iso(620, 120, 22); d.tile(-1.4, -1.4, 2.8, 2.8); d.doc(-0.7, -0.6, 0, 1.4, 1.1, M, 3); d.person(1.0, 0.8, M, '')
      c.text(620, 194, l('3. Апелляция', '3. Appeal'), M, { size: 15, w: 800 })
      c.text(620, 214, l('через поддержку', 'through support'), M, { size: 12, w: 500 })
      c.rect(40, 244, 780, 62, { rx: 14, fill: 'none', stroke: M, sw: 2, dash: '6 5' })
      c.badge(70, 275, M, '?', { r: 14, size: 18 })
      c.text(100, 281, l('в открытых страницах нет: сроки ответа, исход', 'not on the public pages: response times, outcome'), M, { size: 14, w: 700, anchor: 'start' })
      c.arrow(735, 150, 735, 240, M, { w: 2, dash: '5 4' })
    },
  },
  // Что уходит на сервер
  'data-flows': {
    ru: 'Запросы к модели уходят на сервер всегда. Аналитика, метрики и /feedback включены по умолчанию и выключаются в config.toml. Тексты запросов в OpenTelemetry уходят только по явному согласию', en: 'Requests to the model always go to the server. Analytics, metrics and /feedback are on by default and can be turned off in config.toml. Prompt texts in OpenTelemetry go only with explicit consent',
    viewBox: [0, 0, 860, 410],
    draw: (c, l) => {
      const p = c.iso(70, 190, 24); p.tile(-1.4, -1.4, 2.8, 2.8); p.panel(-1.1, -0.7, 2.2, 1.7, A, undefined, 2); p.agent(0.4, 0.2, A, 0.55, '')
      c.text(70, 262, 'Codex', A, { size: 15, w: 800 })
      const s = c.iso(790, 190, 24); s.tile(-1.5, -1.5, 3, 3); s.panel(-1.3, -0.9, 2.6, 1.9, M, bandTitle('OpenAI', 5), 3)
      c.text(790, 268, l('сервер', 'server'), M, { size: 14, w: 700 })
      c.arrow(130, 50, 712, 50, M, { w: 12, head: true })
      c.text(426, 28, l('запросы к модели — всегда', 'requests to the model — always'), M, { size: 15, w: 700 })
      const rows: [string, string][] = [['аналитика', 'analytics'], ['метрики', 'metrics'], ['/feedback', '/feedback']]
      rows.forEach(([ru, en], i) => {
        const y = 128 + i * 56
        c.arrow(130, y, 712, y, W, { w: 3 })
        c.text(180, y - 10, l(ru, en), W, { size: 15, w: 700, anchor: 'start' })
      })
      c.text(712, 138 + 2 * 56 + 6, l('включены по умолчанию', 'on by default'), M, { size: 12, anchor: 'end' })
      c.rect(150, 100, 575, 176, { rx: 14, fill: 'none', stroke: A, sw: 2, dash: '6 5' })
      c.text(437, 300, 'config.toml', A, { size: 15, w: 800 })
      c.text(437, 320, l('здесь выключаются', 'turn them off here'), A, { size: 13 })
      // тексты запросов
      c.arrow(130, 364, 712, 364, M, { w: 3, dash: '5 4' })
      c.text(180, 352, l('тексты запросов в OpenTelemetry', 'prompt texts in OpenTelemetry'), M, { size: 15, w: 700, anchor: 'start' })
      c.text(712, 388, l('только по явному согласию', 'only with explicit consent'), M, { size: 12, anchor: 'end' })
    },
  },
  // Два списка
  'compare-lists': {
    ru: 'Codex проверяет по списку стран OpenAI. Claude Code проверяет по списку Anthropic и ещё по месту, регистрации и собственникам. России нет в обоих. Афганистан, Мьянма и Йемен есть только у OpenAI', en: 'Codex checks the OpenAI country list. Claude Code checks the Anthropic list plus place, registration and owners. Russia is on neither. Afghanistan, Myanmar and Yemen are only on the OpenAI list',
    viewBox: [0, 0, 860, 340],
    draw: (c, l) => {
      const a1 = c.iso(60, 90, 22); a1.tile(-1.2, -1.2, 2.4, 2.4); a1.agent(0, 0.2, A, 0.55, '')
      c.text(60, 140, 'Codex', A, { size: 14, w: 800 })
      const a2 = c.iso(60, 250, 22); a2.tile(-1.2, -1.2, 2.4, 2.4); a2.agent(0, 0.2, A, 0.55, '')
      c.text(60, 300, 'Claude Code', A, { size: 14, w: 800 })
      c.arrow(100, 90, 156, 90, M, { w: 2.2 })
      c.arrow(100, 250, 156, 250, M, { w: 2.2 })
      c.pill(160, 62, 230, 56, A); c.text(275, 96, l('список OpenAI', 'OpenAI list'), A, { size: 16, w: 700 })
      c.pill(160, 214, 230, 44, A); c.text(275, 243, l('список Anthropic', 'Anthropic list'), A, { size: 16, w: 700 })
      c.pill(160, 266, 230, 36, M); c.text(275, 290, l('место · регистрация · владельцы', 'place · registration · owners'), M, { size: 11.5, w: 700 })
      // только OpenAI
      c.arrow(392, 82, 536, 60, A, { w: 2.4 })
      c.pill(540, 34, 300, 56, A); c.text(690, 60, l('только у OpenAI', 'only on OpenAI'), A, { size: 14, w: 800 }); c.text(690, 78, l('Афганистан · Мьянма · Йемен', 'Afghanistan · Myanmar · Yemen'), M, { size: 12, w: 600 })
      // Россия нет в обоих
      c.curve(392, 100, 536, 176, W, { w: 2.4 }); c.curve(392, 236, 536, 190, W, { w: 2.4 })
      c.pill(540, 142, 300, 66, W, { fill: W, fillOp: 0.1 }); c.text(690, 172, l('Россия', 'Russia'), W, { size: 17, w: 800 }); c.text(690, 194, l('нет в обоих списках', 'on neither list'), W, { size: 13, w: 700 })
      c.badge(540, 142, W, '', { r: 12, mark: 'cross' })
    },
  },
  // Законные пути
  'legal-paths': {
    ru: 'Четыре законных пути: найти страну в списке OpenAI, прочитать условия, написать в поддержку, выбрать другой агент', en: 'Four legitimate paths: find the country on the OpenAI list, read the terms, write to support, pick another agent',
    viewBox: [0, 0, 860, 360],
    draw: (c, l) => {
      const you = c.iso(70, 170, 24); you.tile(-1.2, -1.2, 2.4, 2.4); you.person(0, 0.2, M, '')
      c.text(70, 226, l('вы', 'you'), M, { size: 14, w: 700 })
      const doors: [string, string, string, string][] = [
        ['найти страну', 'find the country', 'в списке OpenAI', 'on the OpenAI list'],
        ['прочитать условия', 'read the terms', 'Terms of Use, Usage Policies', 'Terms of Use, Usage Policies'],
        ['написать в поддержку', 'write to support', 'спросить про свой случай', 'ask about your case'],
        ['выбрать другой агент', 'pick another agent', 'для работы с кодом', 'for coding work'],
      ]
      doors.forEach(([r1, e1, r2, e2], i) => {
        const y = 42 + i * 92
        c.curve(120, 170, 306, y, A, { w: 2.4 }); c.arrow(302, y, 316, y, A, { w: 2.4 })
        c.pill(320, y - 32, 460, 64, A); c.text(550, y - 4, l(r1, e1), A, { size: 17, w: 700 }); c.text(550, y + 20, l(r2, e2), M, { size: 13 })
        c.badge(780, y - 32, A, '', { r: 12, mark: 'check', k: 1 })
      })
    },
  },
}
export default scenes
