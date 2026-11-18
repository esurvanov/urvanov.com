// Схемы поста «Claude Code в России: доступ, VPN, блокировки»
import { type Scene, A, M, W, bandTitle } from '@/lib/infographic'
import { WORLD, MAP_LABELS } from '@/lib/worldMapPaths'

const scenes: Record<string, Scene> = {
  // Как, по двум постам, принимается решение о блокировке и какие звенья подтверждены официально.
  // Сплошная линия и галочка — документ Anthropic; пунктир и «?» — утверждение автора поста, публично не подтверждено.
  'ban-decision': {
    ru: 'Решение о блокировке принимает сервер Anthropic. Официально подтверждено только звено «страна, аккаунт, платёжка, телефон или документ»; остальные звенья — утверждения автора поста', en: 'The server at Anthropic makes the ban decision. Only the link “country, account, payment, phone or ID” is confirmed officially; the other links are the post author’s claims',
    viewBox: [0, 0, 860, 318],
    draw: (c, l) => {
      const Y = 176
      // вы
      const you = c.iso(60, Y, 22); you.tile(-1.2, -1.2, 2.4, 2.4); you.person(0, 0.2, M, '')
      // Claude Code на устройстве
      const cc = c.iso(215, Y, 22); cc.tile(-1.4, -1.4, 2.8, 2.8); cc.panel(-1.1, -0.7, 2.2, 1.7, A, undefined, 2); cc.agent(0.4, 0.2, A, 0.55, '')
      // сервер с профилем аккаунта
      const sv = c.iso(480, Y, 22); sv.tile(-1.5, -1.5, 3, 3); sv.panel(-1.3, -0.9, 2.6, 1.9, M, bandTitle('Anthropic', 6.4), 3)
      // решение на сервере
      const de = c.iso(650, Y, 22); de.tile(-1.2, -1.2, 2.4, 2.4); de.doc(-0.55, -0.5, 0, 1.1, 0.9, M, 3)
      // доступ отозван
      const re = c.iso(790, Y, 22); re.tile(-1.2, -1.2, 2.4, 2.4); re.panel(-0.9, -0.6, 1.8, 1.5, W, undefined, 2)
      c.badge(790, Y - 16, W, '', { r: 11, mark: 'cross' })

      // ④ официально: страна, аккаунт, платёжка, телефон — сплошная дуга от вас к профилю на сервере
      c.curve(60, Y - 62, 480, Y - 66, M, { c1: [110, 30], c2: [430, 30], w: 2.4 })
      c.arrow(476, Y - 76, 480, Y - 66, M, { w: 2.4 })
      c.text(270, 28, l('страна · платёжка · телефон/ID', 'country · payment · phone/ID'), M, { size: 13, w: 700 })
      c.badge(270, 50, M, '4', { r: 12, size: 13 })
      c.badge(300, 50, M, '', { r: 9, mark: 'check', k: 1 })

      // вы → программа (обычный вход, без номера)
      c.arrow(100, Y + 8, 150, Y + 8, M, { w: 2 })
      // ①②③ — три сигнала программы на сервер, пунктир: утверждения автора
      const rows: [number, string, string][] = [[1, 'токен', 'token'], [2, 'ключ устройства', 'device key'], [3, 'поведение', 'behavior']]
      rows.forEach(([n, ru, en], i) => {
        const y = Y - 48 + i * 48
        c.arrow(286, y, 408, y, A, { w: 2, dash: '5 4' })
        c.text(347, y - 9, l(ru, en), A, { size: 13, w: 600 })
        c.badge(300, y + 14, M, String(n), { r: 10, size: 12 })
        c.badge(322, y + 14, M, '?', { r: 8, size: 11 })
      })
      // ⑤ решение на сервере, ⑥ отзыв доступа — пунктир
      c.arrow(540, Y + 8, 594, Y + 8, M, { w: 2, dash: '5 4' })
      c.badge(560, Y - 12, M, '5', { r: 10, size: 12 }); c.badge(581, Y - 12, M, '?', { r: 8, size: 11 })
      c.arrow(704, Y + 8, 736, Y + 8, W, { w: 2, dash: '5 4' })
      c.badge(706, Y - 12, W, '6', { r: 10, size: 12 }); c.badge(727, Y - 12, W, '?', { r: 8, size: 11 })

      // подписи под фигурами
      const cap = (x: number, col: string, t1: string, t2: string) => { c.text(x, 252, t1, col, { size: 13, w: 700 }); c.text(x, 269, t2, M, { size: 12 }) }
      cap(60, M, l('вы', 'you'), l('страна', 'country'))
      cap(215, A, 'Claude Code', l('на вашем устройстве', 'on your device'))
      cap(480, M, l('сервер Anthropic', 'Anthropic server'), l('профиль аккаунта', 'account profile'))
      cap(650, M, l('решение', 'decision'), l('на сервере', 'on the server'))
      cap(790, W, l('доступ отозван', 'access revoked'), l('без предупреждения', 'no warning'))

      // ключ линий
      c.line([[250, 298], [286, 298]], M, { w: 2.4 }); c.badge(300, 298, M, '', { r: 8, mark: 'check', k: 0.8 })
      c.text(314, 302, l('официально', 'official'), M, { size: 12, anchor: 'start' })
      c.line([[420, 298], [456, 298]], M, { w: 2.4, dash: '5 4' })
      c.text(464, 302, l('утверждение автора поста, не подтверждено', 'post author’s claim, unconfirmed'), M, { size: 12, anchor: 'start' })
    },
  },
  // Карта: какие страны есть в списках Anthropic и OpenAI и как они группируются
  'world-map': {
    ru: 'Карта мира. Синим закрашены страны из списков Anthropic и OpenAI, штриховкой — страны только из списка OpenAI (Афганистан, Мьянма, Йемен, Гренландия), оранжевым — страны, которых нет ни в одном списке: Россия, Беларусь, Китай, Иран, Сирия, Северная Корея, Куба, Венесуэла, а также Гонконг, Макао и Косово. Украина показана частично: в списке она без Крыма и четырёх областей. Синие точки — мелкие страны из списка Anthropic, серым закрашены места без записи в списках.',
    en: 'World map. Blue marks countries on both the Anthropic and OpenAI lists, hatching marks countries only on the OpenAI list (Afghanistan, Myanmar, Yemen, Greenland), orange marks countries on neither list: Russia, Belarus, China, Iran, Syria, North Korea, Cuba, Venezuela, plus Hong Kong, Macao and Kosovo. Ukraine is partial: the list excludes Crimea and four regions. Blue dots are small countries from the Anthropic list; grey marks places with no entry in the lists.',
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
      // легенда: группы и страны
      const y0 = 452
      const row = (y: number, sw: () => void, title: string, body: string, body2?: string) => { sw(); c.text(40, y + 4, title, M, { size: 14, w: 800, anchor: 'start' }); c.text(40, y + 24, body, M, { size: 13, w: 500, anchor: 'start' }); if (body2) c.text(40, y + 41, body2, M, { size: 13, w: 500, anchor: 'start' }) }
      const chips = (y: number, items: [number, string][], col: string) => { let x = 40; for (const [n, t] of items) { if (n) { c.badge(x + 9, y + 20, col, String(n), { r: 9, size: 11 }); x += 24 } c.text(x, y + 24, t, M, { size: 13, w: 500, anchor: 'start' }); x += t.length * 7.4 + 18 } }
      row(y0, () => c.rect(10, y0 - 10, 18, 18, { rx: 4, fill: A, fillOp: 0.62 }), l('В списках Anthropic и OpenAI — почти весь мир', 'On both lists — almost the whole world'), l('Например Казахстан, Грузия, Турция, Таиланд, Вьетнам, Мексика, Индия. У Anthropic 185 записей.', 'For example Kazakhstan, Georgia, Turkey, Thailand, Vietnam, Mexico, India. Anthropic lists 185 entries.'))
      row(y0 + 52, () => c.raw('<circle cx="19" cy="' + (y0 + 51) + '" r="4.5" fill="' + A + '" stroke="#fff" stroke-width="1.2"/>'), l('Точки — мелкие страны из списка Anthropic', 'Dots — small countries on the Anthropic list'), l('Андорра, Мальта, Сингапур, Бахрейн, Мальдивы, Маврикий, Монако, Самоа и ещё 21 страна.', 'Andorra, Malta, Singapore, Bahrain, Maldives, Mauritius, Monaco, Samoa and 21 more.'))
      row(y0 + 104, () => c.rect(10, y0 + 94, 18, 18, { rx: 4, fill: 'url(#wm-hatch)', stroke: A, sw: 1 }), l('Только в списке OpenAI', 'Only on the OpenAI list'), '', l('Ещё 19 территорий, в основном мелких: Аруба, Бермуды, Фареры.', '19 more territories, mostly small: Aruba, Bermuda, Faroe Islands.'))
      chips(y0 + 104, [[8, l('Афганистан', 'Afghanistan')], [9, l('Мьянма', 'Myanmar')], [10, l('Йемен', 'Yemen')], [11, l('Гренландия', 'Greenland')]], A)
      row(y0 + 170, () => c.rect(10, y0 + 160, 18, 18, { rx: 4, fill: 'url(#wm-part)' }), l('Частично — Украина', 'Partly — Ukraine'), l('В списке Anthropic она записана без Крыма, Донецкой, Херсонской, Луганской и Запорожской областей.', 'The Anthropic list excludes Crimea and the Donetsk, Kherson, Luhansk and Zaporizhzhia regions.'))
      row(y0 + 222, () => c.rect(10, y0 + 212, 18, 18, { rx: 4, fill: W, fillOp: 0.9 }), l('Оранжевый — в обоих списках нет, использовать нельзя', 'Orange — on neither list, not supported'), '', l('Россия (крупная подпись на карте). Оранжевые точки: Гонконг, Макао, Косово.', 'Russia (large label on the map). Orange dots: Hong Kong, Macao, Kosovo.'))
      chips(y0 + 222, [[1, l('Беларусь', 'Belarus')], [2, l('Китай', 'China')], [3, l('Иран', 'Iran')], [4, l('Сирия', 'Syria')], [5, l('Северная Корея', 'North Korea')], [6, l('Куба', 'Cuba')], [7, l('Венесуэла', 'Venezuela')]], W)
      row(y0 + 286, () => c.rect(10, y0 + 276, 18, 18, { rx: 4, fill: M, fillOp: 0.35 }), l('Серый — спорные территории', 'Grey — disputed territories'), '', l('Отдельной записи нет ни у Anthropic, ни у OpenAI, вывода о доступе сделать нельзя.', 'Neither Anthropic nor OpenAI has a separate entry, so no conclusion about access can be drawn.'))
      chips(y0 + 286, [[12, l('Западная Сахара', 'Western Sahara')], [13, l('Северный Кипр', 'Northern Cyprus')], [14, l('Сомалиленд', 'Somaliland')], [15, l('Фолклендские острова', 'Falkland Islands')]], M)
    },
  },
  // Ступени справки: предупреждение, блокировка, разбор командой безопасности; антифрод в пунктире — как он работает, не описано
  'ban-ladder': {
    ru: 'Ступени из справки Anthropic: предупреждение, блокировка, разбор командой безопасности Safeguards. Системы антифрода стоят в пунктирной рамке: как они работают, страницы не объясняют.',
    en: 'The steps in the Anthropic help article: warning, block, review by the Safeguards team. Anti-fraud systems sit in a dashed frame: the pages do not explain how they work.',
    viewBox: [0, 0, 860, 300],
    draw: (c, l) => {
      c.rect(14, 40, 150, 170, { rx: 12, fill: M, fillOp: 0.06, stroke: W, sw: 2, dash: '6 5' })
      c.eye(89, 100, W)
      c.text(89, 150, l('антифрод', 'anti-fraud'), W, { size: 15, w: 800 })
      c.text(89, 176, l('как работает —', 'how it works —'), M, { size: 12, w: 600 })
      c.text(89, 192, l('не описано', 'not described'), M, { size: 12, w: 600 })
      c.badge(89, 58, M, '?', { r: 11, size: 13 })
      c.arrow(166, 124, 228, 124, W, { w: 2, dash: '5 4' })
      const a = c.iso(300, 150, 22); a.tile(-1.4, -1.4, 2.8, 2.8); a.doc(-0.7, -0.6, 0, 1.4, 1.1, W, 3); a.person(1.0, 0.8, M, '')
      c.text(300, 224, l('1. Предупреждение', '1. Warning'), M, { size: 14, w: 800 })
      c.text(300, 244, l('вы пишете в поддержку: ситуация', 'you write to support: the situation'), M, { size: 12, w: 500 })
      c.text(300, 260, l('и данные аккаунта', 'and your account details'), M, { size: 12, w: 500 })
      c.arrow(388, 150, 462, 150, M, { w: 2.2 })
      const b = c.iso(540, 150, 22); b.tile(-1.4, -1.4, 2.8, 2.8); b.panel(-1.1, -0.7, 2.2, 1.7, W, undefined, 2)
      c.badge(540, 130, W, '', { r: 12, mark: 'cross' })
      c.text(540, 224, l('2. Блокировка', '2. Block'), W, { size: 14, w: 800 })
      c.text(540, 244, l('аккаунт отключён', 'the account is disabled'), M, { size: 12, w: 500 })
      c.arrow(618, 150, 692, 150, M, { w: 2.2 })
      c.badge(655, 130, M, '', { r: 9, mark: 'check', k: 1 })
      const t = c.iso(770, 150, 22); t.tile(-1.4, -1.4, 2.8, 2.8); t.agent(-0.6, 0, A, 0.55, ''); t.agent(0.6, 0.4, A, 0.55, '')
      c.text(770, 224, l('3. Команда Safeguards', '3. Safeguards team'), A, { size: 14, w: 800 })
      c.text(770, 244, l('может выяснить, почему', 'can look into why'), M, { size: 12, w: 500 })
      c.text(770, 260, l('аккаунт отключили', 'the account was disabled'), M, { size: 12, w: 500 })
    },
  },
  // Четыре ответа справки и политики: сроки, данные, письмо, второй аккаунт
  'help-facts': {
    ru: 'Четыре вопроса после блокировки и ответы справки: сроки ответа дольше обычного и без цифр; выгрузка данных доступна всем заблокированным; обязательных полей в апелляции нет; второй аккаунт политика называет отдельным нарушением.',
    en: 'Four questions after a block and the help-article answers: response times are longer than normal with no figures; data export is open to all banned users; the appeal has no required fields; a second account is a separate violation under the policy.',
    viewBox: [0, 0, 860, 300],
    legend: false,
    draw: (c, l) => {
      const cards: [number, number, string, string, string, 'q' | 'ok' | 'no'][] = [
        [14, 14, l('Когда придёт ответ', 'When a reply comes'), l('дольше обычного, цифр на странице нет', 'longer than normal, no figures on the page'), '', 'q'],
        [440, 14, l('Что с данными', 'What happens to data'), l('выгрузка доступна всем заблокированным', 'export is open to all banned users'), '', 'ok'],
        [14, 156, l('Какое письмо писать', 'What to write'), l('обязательных полей нет', 'no required fields'), '', 'ok'],
        [440, 156, l('Второй аккаунт', 'A second account'), l('политика называет это отдельным нарушением', 'the policy calls it a separate violation'), '', 'no'],
      ]
      for (const [x, y, t, sub, , k] of cards) {
        const col = k === 'no' ? W : M
        c.rect(x, y, 406, 126, { rx: 12, fill: col, fillOp: 0.07, stroke: col, sw: 1.6 })
        if (k === 'q') c.badge(x + 40, y + 63, M, '?', { r: 20, size: 24 })
        if (k === 'ok') c.badge(x + 40, y + 63, M, '', { r: 20, mark: 'check', k: 1.4 })
        if (k === 'no') c.badge(x + 40, y + 63, W, '', { r: 20, mark: 'cross', k: 1.4 })
        c.text(x + 78, y + 56, t, col, { size: 17, w: 800, anchor: 'start' })
        c.text(x + 78, y + 82, sub, M, { size: 13, w: 500, anchor: 'start' })
      }
    },
  },
  // Четыре запрета из Consumer Terms и Usage Policy
  'four-bans': {
    ru: 'Четыре запрета из условий Anthropic: делиться доступом, обходить блокировку новым аккаунтом, перепродавать или проксировать доступ, давать доступ в нарушение политики регионов.',
    en: 'Four prohibitions from the Anthropic terms: sharing access, getting around a ban with a new account, reselling or proxying access, giving access in violation of the regions policy.',
    viewBox: [0, 0, 860, 300],
    draw: (c, l) => {
      const xs = [105, 320, 535, 750]
      const heads: [string, string, string, string][] = [
        ['Делиться доступом', 'Sharing access', 'логин и ключ API — только ваши', 'login and API key stay yours'],
        ['Новый аккаунт', 'New account', 'после бана — нарушение', 'after a ban is a violation'],
        ['Перепродажа доступа', 'Reselling access', 'и проксирование', 'and proxying'],
        ['Доступ вне списка', 'Access off the list', 'нарушает политику регионов', 'breaks the regions policy'],
      ]
      xs.forEach((x, i) => {
        const iso = c.iso(x, 120, 22); iso.tile(-1.5, -1.5, 3, 3)
        if (i === 0) { iso.person(-0.8, 0.3, M, ''); iso.person(0.9, 0.5, M, ''); iso.doc(-0.3, -0.5, 0.2, 0.7, 0.6, W, 2) }
        if (i === 1) { iso.panel(-1.2, -0.9, 1.4, 1.3, W, undefined, 1, true); iso.panel(0.3, -0.5, 1.1, 1.3, W, undefined, 1); iso.person(0.2, 1.0, M, '') }
        if (i === 2) { iso.person(-1.0, 0.6, M, ''); iso.box(-0.4, -0.2, 0, 0.9, 0.9, 0.9, W, 0.8); iso.agent(1.0, 0.6, A, 0.5, '') }
        if (i === 3) { iso.panel(-1.1, -0.8, 2.2, 1.8, W, undefined, 3); iso.agent(0.3, 0.9, A, 0.5, '') }
        c.badge(x + 42, 60, W, '', { r: 11, mark: 'cross' })
        c.text(x, 218, l(heads[i][0], heads[i][1]), W, { size: 14, w: 800 })
        c.text(x, 238, l(heads[i][2], heads[i][3]), M, { size: 12, w: 500 })
      })
    },
  },
  // Три места, где ломается путь установки: сеть, роутер или провайдер, список стран
  'stop-points': {
    ru: 'Путь установки Claude Code и три места, где он обрывается: офисный файрвол закрывает адрес загрузки; домашний роутер или провайдер отвечает 403; страны нет в списке Anthropic и приходит «App unavailable in region».',
    en: 'The Claude Code install path and three places where it breaks: an office firewall blocks the download address; a home router or provider returns 403; the country is not on the Anthropic list and “App unavailable in region” appears.',
    viewBox: [0, 0, 860, 340],
    draw: (c, l) => {
      const xs = [70, 265, 465, 700]
      const you = c.iso(xs[0], 130, 22); you.tile(-1.2, -1.2, 2.4, 2.4); you.person(0, 0.2, M, '')
      const off = c.iso(xs[1], 130, 22); off.tile(-1.3, -1.3, 2.6, 2.6); off.panel(-1, -0.7, 2, 1.6, M, undefined, 2)
      const rt = c.iso(xs[2], 130, 22); rt.tile(-1.3, -1.3, 2.6, 2.6); rt.cyl(0, 0, 0, 0.7, 0.9, M)
      const gate = c.iso(xs[3], 130, 22); gate.tile(-1.4, -1.4, 2.8, 2.8); gate.doc(-0.7, -0.6, 0, 1.4, 1.1, A, 4)
      for (let i = 0; i < 3; i++) c.arrow(xs[i] + 42, 130, xs[i + 1] - 42, 130, i === 2 ? W : M, { w: 2.2, dash: i === 2 ? '5 4' : undefined })
      c.text(xs[0], 190, l('вы', 'you'), M, { size: 13, w: 700 })
      c.text(xs[1], 190, l('сеть офиса', 'office network'), M, { size: 13, w: 700 })
      c.text(xs[2], 190, l('роутер, провайдер', 'router, provider'), M, { size: 13, w: 700 })
      c.text(xs[3], 190, l('список стран Anthropic', 'Anthropic country list'), A, { size: 13, w: 700 })
      const stops: [number, string, string, string, string][] = [
        [1, 'Астана', 'Astana', 'файрвол закрыл адрес загрузки', 'a firewall blocks the download address'],
        [2, 'Лион', 'Lyon', 'фильтр отвечает 403', 'a filter returns 403'],
        [3, 'Россия', 'Russia', 'страны нет в списке', 'the country is not on the list'],
      ]
      stops.forEach(([n, ru, en, r1, r2], i) => {
        const x = xs[i + 1]
        c.badge(x, 70, W, '', { r: 12, mark: 'cross' })
        c.badge(x - 30, 70, W, String(n), { r: 10, size: 12 })
        c.text(x, 238, l(ru, en), W, { size: 15, w: 800 })
        c.text(x, 258, l(r1, r2), M, { size: 12, w: 500 })
      })
    },
  },
  // Один список стран Anthropic — одни ворота на все входы
  'list-gate': {
    ru: 'Одни ворота на все продукты: страна из списка Anthropic проходит к приложениям, API и облакам, страна вне списка остановлена у ворот', en: 'One gate for every product: a country on the Anthropic list reaches the apps, the API and the clouds, a country off the list is stopped at the gate',
    viewBox: [0, 0, 860, 320],
    draw: (c, l) => {
      const inn = c.iso(80, 92, 22); inn.tile(-1.2, -1.2, 2.4, 2.4); inn.person(0, 0.2, M, '')
      c.badge(110, 52, M, '', { r: 11, mark: 'check', k: 1 })
      const out = c.iso(80, 232, 22); out.tile(-1.2, -1.2, 2.4, 2.4); out.person(0, 0.2, M, '')
      c.text(80, 138, l('в списке', 'on the list'), M, { size: 14, w: 700 })
      c.text(80, 278, l('вне списка', 'off the list'), W, { size: 14, w: 700 })
      // ворота
      const g = c.iso(330, 170, 26); g.tile(-1.6, -1.6, 3.2, 3.2); g.box(-1.2, -0.4, 0, 0.5, 0.8, 2.2, A); g.box(0.8, -0.4, 0, 0.5, 0.8, 2.2, A); g.box(-1.2, -0.4, 2.2, 2.5, 0.8, 0.45, A)
      c.text(330, 286, l('список стран Anthropic', 'Anthropic country list'), A, { size: 14, w: 700 })
      c.arrow(122, 104, 256, 150, M, { w: 2.4 })
      c.line([[400, 150], [500, 150]], A, { w: 2.4 })
      const rows: [number, string, string][] = [[56, 'Claude.ai · Claude Code · Cowork', 'Claude.ai · Claude Code · Cowork'], [160, 'API и платформа', 'API and platform'], [264, 'облака и реселлеры', 'clouds and resellers']]
      rows.forEach(([y, ru, en]) => {
        c.curve(500, 150, 590, y, A, { w: 2.4 }); c.arrow(586, y, 596, y, A, { w: 2.4 })
        c.pill(600, y - 24, 240, 48, A); c.text(720, y + 5, l(ru, en), A, { size: 14, w: 700 })
      })
      c.arrow(122, 232, 238, 204, W, { w: 2.6 })
      c.badge(250, 202, W, '', { r: 12, mark: 'cross' })
    },
  },
  // Три признака: человек, компания, владелец; гражданства среди них нет
  'three-signs': {
    ru: 'Закрыть доступ может любой из трёх признаков: где человек физически находится, где зарегистрирована компания, кто владеет более чем 50%. Гражданства среди них нет', en: 'Any one of three signs closes access: where the person physically is, where the company is registered, who owns more than 50%. Citizenship is not among them',
    viewBox: [0, 0, 860, 320],
    draw: (c, l) => {
      const ys = [60, 160, 260]
      const h = c.iso(60, ys[0], 20); h.tile(-1.2, -1.2, 2.4, 2.4); h.person(0, 0.2, M, '')
      const co = c.iso(60, ys[1], 20); co.tile(-1.2, -1.2, 2.4, 2.4); co.panel(-0.9, -0.6, 1.8, 1.6, M, undefined, 2)
      const ow = c.iso(60, ys[2], 20); ow.tile(-1.2, -1.2, 2.4, 2.4); ow.person(0, 0.2, M, ''); ow.cyl(0.9, 0.9, 0, 0.35, 0.5, M)
      const t: [string, string, string, string][] = [['человек', 'person', 'где физически находится', 'where physically located'], ['компания', 'company', 'где зарегистрирована', 'where registered'], ['владелец', 'owner', 'контролирует более 50%', 'controls more than 50%']]
      t.forEach(([r1, e1, r2, e2], i) => {
        c.text(112, ys[i] - 2, l(r1, e1), M, { size: 15, w: 700, anchor: 'start' })
        c.text(112, ys[i] + 18, l(r2, e2), M, { size: 13, anchor: 'start' })
        c.arrow(330, ys[i], 440, 160 + (ys[i] - 160) * 0.35, W, { w: 2.6 })
      })
      const g = c.iso(500, 180, 26); g.tile(-1.6, -1.6, 3.2, 3.2); g.box(-1.2, -0.4, 0, 0.5, 0.8, 2.2, A); g.box(0.8, -0.4, 0, 0.5, 0.8, 2.2, A); g.box(-1.2, -0.4, 2.2, 2.5, 0.8, 0.45, A)
      c.badge(500, 146, W, '', { r: 14, mark: 'cross' })
      c.text(500, 296, l('достаточно одного', 'one is enough'), W, { size: 14, w: 700 })
      c.rect(650, 90, 190, 140, { rx: 14, fill: 'none', stroke: M, sw: 2, dash: '6 5', op: 0.9 })
      c.badge(745, 138, M, '?', { r: 16, size: 20 })
      c.text(745, 186, l('гражданство', 'citizenship'), M, { size: 15, w: 700 })
      c.text(745, 207, l('в правилах не названо', 'not named in the rules'), M, { size: 12 })
    },
  },
  // Слово VPN, обход защитных мер, совместимость с VPN: три разных места в документах
  'vpn-rules': {
    ru: 'Про VPN сказано три вещи в трёх документах: слова VPN в правилах регионов нет, обход защитных мер запрещён условиями, а совместимость с VPN в документации Claude Code касается сети', en: 'Three things about VPN in three documents: the region rules do not contain the word VPN, the terms ban circumventing safeguards, and the Claude Code docs mention VPN compatibility for network issues',
    viewBox: [0, 0, 860, 300],
    draw: (c, l) => {
      const cards: [number, string, string, string, string, string, string, string, string][] = [
        [150, M, 'слово «VPN»', 'the word “VPN”', 'правила регионов, условия', 'region rules, terms', 'в тексте нет', 'not in the text', ''],
        [430, W, 'обход защитных мер', 'circumventing safeguards', 'условия использования', 'terms of use', 'запрещено', 'prohibited', ''],
        [710, A, 'совместим с VPN', 'works with VPN', 'документация Claude Code', 'Claude Code docs', 'про сетевые сбои', 'about network issues', ''],
      ]
      cards.forEach(([x, col, t1r, t1e, t2r, t2e, t3r, t3e], i) => {
        c.rect(x - 124, 20, 248, 260, { rx: 16, fill: col, fillOp: 0.07, stroke: col, sw: 2.2 })
        const d = c.iso(x, 120, 24); d.tile(-1.3, -1.3, 2.6, 2.6)
        if (i === 0) d.zone(-0.8, -0.8, 1.6, 1.6, col, { op: 0.15, dash: '4 3' })
        else d.doc(-0.6, -0.55, 0, 1.2, 1, col, 3)
        if (i === 0) c.badge(x, 108, M, '', { r: 13, mark: 'cross' })
        if (i === 1) c.badge(x + 36, 84, W, '', { r: 13, mark: 'cross' })
        if (i === 2) c.badge(x + 36, 84, A, '', { r: 13, mark: 'check', k: 1 })
        c.text(x, 196, l(t1r, t1e), col, { size: 15, w: 700 })
        c.text(x, 218, l(t2r, t2e), M, { size: 13 })
        c.pill(x - 80, 236, 160, 30, col); c.text(x, 256, l(t3r, t3e), col, { size: 13, w: 700 })
      })
    },
  },
  // Блокировка: причины названы, апелляция есть, исход не гарантирован
  'ban-path': {
    ru: 'Справка называет причины блокировки и даёт форму апелляции, но исход не обещает: ответ приходит, результат не гарантирован', en: 'The help page names the reasons for a ban and gives an appeal form but does not promise the outcome: a reply comes, the result is not guaranteed',
    viewBox: [0, 0, 860, 320],
    draw: (c, l) => {
      const causes: [string, string][] = [['повторные нарушения политики', 'repeated policy violations'], ['аккаунт из неподдерживаемого места', 'account from an unsupported place'], ['нарушение условий', 'terms violation']]
      causes.forEach(([ru, en], i) => {
        const y = 60 + i * 100
        c.pill(10, y - 24, 270, 48, M); c.text(145, y + 5, l(ru, en), M, { size: 14, w: 700 })
        c.curve(282, y, 334, 160, W, { w: 2.4 })
      })
      const b = c.iso(380, 160, 24); b.tile(-1.4, -1.4, 2.8, 2.8); b.panel(-1.0, -0.7, 2.0, 1.7, W, undefined, 2); b.bug(0.6, 0.8)
      c.text(380, 242, l('блокировка', 'ban'), W, { size: 15, w: 700 })
      c.arrow(440, 164, 516, 164, M, { w: 2.4 })
      const f = c.iso(570, 160, 24); f.tile(-1.4, -1.4, 2.8, 2.8); f.doc(-0.6, -0.6, 0, 1.2, 1.1, M, 3)
      c.text(570, 242, l('форма апелляции', 'appeal form'), M, { size: 15, w: 700 }); c.text(570, 262, l('вход заблокированным', 'sign in with the'), M, { size: 12 }); c.text(570, 278, l('аккаунтом', 'banned account'), M, { size: 12 })
      c.arrow(628, 164, 724, 164, M, { w: 2.4 })
      const a = c.iso(780, 160, 22); a.tile(-1.3, -1.3, 2.6, 2.6); a.doc(-0.55, -0.5, 0, 1.1, 0.9, M, 2)
      c.badge(806, 118, M, '?', { r: 14, size: 18 })
      c.text(780, 242, l('ответ приходит', 'a reply comes'), M, { size: 15, w: 700 }); c.text(780, 262, l('результат', 'result'), M, { size: 12 }); c.text(780, 278, l('не гарантирован', 'not guaranteed'), M, { size: 12 })
    },
  },
  // Две проверки: телефон и документ
  'phone-id': {
    ru: 'Две разные проверки привязаны к реальному человеку: телефон из поддерживаемой локации и физический документ с селфи', en: 'Two different checks tie the account to a real person: a phone from a supported location and a physical ID with a selfie',
    viewBox: [0, 0, 860, 340],
    draw: (c, l) => {
      const p = c.iso(190, 66, 22); p.tile(-1.2, -1.2, 2.4, 2.4); p.panel(-0.5, -0.9, 1.0, 1.9, M, undefined, 2)
      c.text(190, 124, l('телефон', 'phone'), M, { size: 16, w: 700 }); c.text(190, 143, l('номер из поддерживаемой локации', 'number from a supported location'), M, { size: 12 })
      ;[['VoIP', 'VoIP'], ['Google Voice', 'Google Voice'], ['стационарный', 'landline']].forEach(([ru, en], i) => {
        const x = 72 + i * 118
        c.pill(x - 54, 164, 108, 32, W); c.text(x, 185, l(ru, en), W, { size: 13, w: 700 }); c.badge(x + 46, 164, W, '', { r: 9, mark: 'cross', k: 0.8 })
      })
      c.text(190, 220, l('не принимаются', 'not accepted'), W, { size: 13, w: 700 })
      c.pill(70, 242, 240, 32, M); c.text(190, 263, l('до 3 аккаунтов на номер', 'up to 3 accounts per number'), M, { size: 13, w: 700 })
      const d = c.iso(670, 66, 22); d.tile(-1.2, -1.2, 2.4, 2.4); d.doc(-0.7, -0.5, 0, 1.4, 1.0, M, 2); d.person(0.6, 0.6, M, '')
      c.text(670, 124, l('документ', 'ID'), M, { size: 16, w: 700 }); c.text(670, 143, l('физический, с фото и селфи', 'physical, with photo and selfie'), M, { size: 12 })
      ;[['копии', 'copies'], ['скриншоты', 'screenshots']].forEach(([ru, en], i) => {
        const x = 610 + i * 120
        c.pill(x - 54, 164, 108, 32, W); c.text(x, 185, l(ru, en), W, { size: 13, w: 700 }); c.badge(x + 42, 164, W, '', { r: 9, mark: 'cross', k: 0.8 })
      })
      c.text(670, 220, l('не принимаются', 'not accepted'), W, { size: 13, w: 700 })
      c.pill(590, 242, 160, 32, M); c.text(670, 263, l('хранит Persona', 'kept by Persona'), M, { size: 13, w: 700 })
      const h = c.iso(430, 66, 22); h.tile(-1.2, -1.2, 2.4, 2.4); h.person(0, 0.2, M, '')
      c.text(430, 124, l('реальный человек', 'a real person'), M, { size: 14, w: 700 })
      c.arrow(300, 70, 366, 70, M, { w: 2.2 }); c.arrow(560, 70, 494, 70, M, { w: 2.2 })
    },
  },
  // Дерево ошибок
  'error-tree': {
    ru: 'Ошибка с текстом про регион говорит о стране; голый 403 при установке чаще связан с прокси или сетевым фильтром и одной страны не доказывает', en: 'An error that mentions the region points to the country; a bare 403 on install is more often a proxy or network filter and does not prove a single country',
    viewBox: [0, 0, 860, 330],
    draw: (c, l) => {
      const s = c.iso(80, 170, 24); s.tile(-1.4, -1.4, 2.8, 2.8); s.panel(-1.1, -0.8, 2.2, 1.8, M, undefined, 2); s.bug(0.5, 0.8)
      c.text(80, 240, l('ошибка на экране', 'error on screen'), M, { size: 14, w: 700 })
      c.curve(140, 160, 232, 62, M, { w: 2.4 }); c.curve(140, 180, 232, 250, M, { w: 2.4 })
      c.pill(236, 36, 230, 52, W); c.text(351, 68, 'App unavailable in region', W, { size: 14, w: 700 })
      c.arrow(468, 62, 530, 62, W, { w: 2.4 })
      c.pill(534, 30, 300, 64, W, { fill: W, fillOp: 0.1 }); c.text(684, 56, l('Claude Code недоступен', 'Claude Code unavailable'), W, { size: 14, w: 700 }); c.text(684, 78, l('в стране', 'in the country'), W, { size: 14, w: 700 })
      c.pill(236, 224, 230, 52, M); c.text(351, 256, l('403 при установке', '403 on install'), M, { size: 14, w: 700 })
      c.curve(468, 244, 530, 214, M, { w: 2.4 }); c.curve(468, 256, 530, 290, M, { w: 2.4, dash: '5 4' })
      c.pill(534, 184, 300, 58, M); c.text(684, 218, l('чаще прокси или сетевой фильтр', 'more often a proxy or filter'), M, { size: 14, w: 700 })
      c.rect(534, 262, 300, 52, { rx: 26, fill: 'none', stroke: M, sw: 2, dash: '5 4' }); c.text(684, 294, l('либо регион', 'or the region'), M, { size: 14, w: 700 })
    },
  },
  // Цепочка оплаты
  'pay-chain': {
    ru: 'У оплаты своя цепочка проверок: карта, адрес выставления счёта, список стран для карт, подписка; звено со списком стран первоисточник не подтвердил', en: 'Payment has its own chain of checks: card, billing address, card country list, subscription; the country-list link is not confirmed by the primary source',
    viewBox: [0, 0, 860, 320],
    draw: (c, l) => {
      const Y = 120
      const card = c.iso(70, Y, 22); card.tile(-1.2, -1.2, 2.4, 2.4); card.panel(-0.9, -0.6, 1.8, 1.3, M, undefined, 1)
      const adr = c.iso(260, Y, 22); adr.tile(-1.2, -1.2, 2.4, 2.4); adr.doc(-0.6, -0.55, 0, 1.2, 1, M, 3)
      const lst = c.iso(470, Y, 22); lst.tile(-1.2, -1.2, 2.4, 2.4); lst.doc(-0.6, -0.55, 0, 1.2, 1, M, 3)
      const sub = c.iso(720, Y, 22); sub.tile(-1.2, -1.2, 2.4, 2.4); sub.panel(-0.9, -0.6, 1.8, 1.5, A, undefined, 2); sub.agent(0.3, 0.3, A, 0.5, '')
      c.arrow(112, Y + 4, 212, Y + 4, M, { w: 2.4 }); c.arrow(304, Y + 4, 422, Y + 4, M, { w: 2.4 }); c.arrow(516, Y + 4, 658, Y + 4, M, { w: 2.4, dash: '5 4' })
      c.badge(470, Y - 52, M, '?', { r: 14, size: 18 })
      const cap = (x: number, t: string, col = M) => c.text(x, 196, t, col, { size: 14, w: 700 })
      cap(70, l('карта', 'card')); cap(260, l('адрес выставления счёта', 'billing address')); cap(470, l('список стран для карт', 'card country list')); cap(720, l('подписка', 'subscription'), A)
      c.text(470, 216, l('страница не открывалась', 'page did not open'), M, { size: 12 })
      c.pill(250, 252, 360, 40, W); c.text(430, 278, l('PayPal и Venmo не принимаются', 'PayPal and Venmo not accepted'), W, { size: 14, w: 700 })
      c.badge(268, 252, W, '', { r: 11, mark: 'cross' })
    },
  },
  // Куда ходит программа и где её может остановить файрвол.
  // Сплошная линия и галочка — адрес из документации Claude Code; пунктир и «?» — только по разбору автора поста.
  'network-hosts': {
    ru: 'Программа обращается к нескольким адресам Anthropic. Адреса из списка документации — сплошные линии; адреса только по разбору автора поста — пунктир. Если файрвол или прокси закрыл адрес, установка отвечает 403', en: 'The program talks to several Anthropic addresses. Addresses from the documentation list are solid lines; addresses only from the post author’s analysis are dashed. If a firewall or proxy blocks an address, the install answers 403',
    viewBox: [0, 0, 860, 410],
    draw: (c, l) => {
      const Y = 190
      const cc = c.iso(70, Y, 24); cc.tile(-1.4, -1.4, 2.8, 2.8); cc.panel(-1.1, -0.7, 2.2, 1.7, A, undefined, 2); cc.agent(0.4, 0.2, A, 0.55, '')
      c.text(70, Y + 72, 'Claude Code', A, { size: 14, w: 700 }); c.text(70, Y + 90, l('на вашем устройстве', 'on your device'), M, { size: 12 })
      // файрвол или прокси
      const g = c.iso(300, Y, 24); g.tile(-1.6, -1.6, 3.2, 3.2); g.box(-1.3, -0.3, 0, 2.6, 0.6, 1.8, M)
      c.text(300, Y + 72, l('файрвол или прокси', 'firewall or proxy'), M, { size: 14, w: 700 })
      c.arrow(122, Y + 4, 236, Y + 4, M, { w: 2.4 })
      // адреса справа
      const rows: [string, string, boolean, string, string][] = [
        ['api.anthropic.com', 'api.anthropic.com', true, 'запросы к модели', 'model requests'],
        ['claude.ai · platform.claude.com', 'claude.ai · platform.claude.com', true, 'вход, продукты', 'sign-in, products'],
        ['downloads.claude.ai', 'downloads.claude.ai', true, 'загрузка', 'download'],
        ['code.claude.com', 'code.claude.com', true, 'документация', 'documentation'],
        ['support.claude.com', 'support.claude.com', false, 'справка', 'help'],
      ]
      const X = 540, PW = 300
      rows.forEach(([r, e, off, d1, d2], i) => {
        const y = 36 + i * 64
        c.curve(366, Y + 4, X - 4, y, M, { w: 2.2, dash: off ? undefined : '5 4' })
        c.pill(X, y - 24, PW, 48, M); c.text(X + PW / 2, y - 3, l(r, e), M, { size: 14, w: 700 }); c.text(X + PW / 2, y + 14, l(d1, d2), M, { size: 12 })
        if (off) c.badge(X + PW, y - 24, M, '', { r: 9, mark: 'check', k: 0.8 }); else c.badge(X + PW, y - 24, M, '?', { r: 9, size: 11 })
      })
      // служебный адрес стейджинга
      c.curve(366, Y + 4, X - 4, 356, M, { w: 2, dash: '2 5' })
      c.rect(X, 332, PW, 48, { rx: 24, fill: 'none', stroke: M, sw: 1.6, dash: '4 4', op: 0.6 })
      c.text(X + PW / 2, 353, 'api-staging.anthropic.com', M, { size: 13, w: 700 }); c.text(X + PW / 2, 370, l('служебный, не нужен', 'internal, not needed'), M, { size: 12 })
      // здесь появляется 403
      c.badge(452, 168, W, '', { r: 13, mark: 'cross' })
      c.text(300, Y + 114, l('здесь появляется 403', 'this is where 403 appears'), W, { size: 14, w: 700 })
      // ключ линий
      c.line([[10, 360], [46, 360]], M, { w: 2.4 }); c.badge(58, 360, M, '', { r: 8, mark: 'check', k: 0.8 })
      c.text(72, 364, l('есть в документации', 'in the documentation'), M, { size: 12, anchor: 'start' })
      c.line([[10, 384], [46, 384]], M, { w: 2.4, dash: '5 4' }); c.badge(58, 384, M, '?', { r: 8, size: 11 })
      c.text(72, 388, l('только по разбору автора поста', 'post author’s analysis only'), M, { size: 12, anchor: 'start' })
    },
  },
  // Законные пути: три двери открыты, обход правил закрыт
  'legal-paths': {
    ru: 'Законные варианты есть: страна из списка, корпоративный доступ у поставщика, другой агент для кода. Обход правил не входит ни в один из них', en: 'Legitimate options exist: a country on the list, corporate access through a provider, another coding agent. Getting around the rules is part of none of them',
    viewBox: [0, 0, 860, 380],
    draw: (c, l) => {
      const you = c.iso(70, 120, 24); you.tile(-1.2, -1.2, 2.4, 2.4); you.person(0, 0.2, M, '')
      c.text(70, 176, l('вы', 'you'), M, { size: 14, w: 700 })
      const doors: [string, string, string, string][] = [
        ['страна из списка', 'country on the list', 'работать из неё', 'work from there'],
        ['корпоративный доступ', 'corporate access', 'облако или реселлер', 'cloud or reseller'],
        ['другой агент', 'another agent', 'Codex, OpenCode', 'Codex, OpenCode'],
      ]
      doors.forEach(([r1, e1, r2, e2], i) => {
        const y = 44 + i * 76
        c.arrow(120, 120, 336, y, A, { w: 2.4 })
        c.pill(340, y - 28, 420, 56, A); c.text(550, y - 3, l(r1, e1), A, { size: 15, w: 700 }); c.text(550, y + 16, l(r2, e2), M, { size: 12 })
        c.badge(760, y - 28, A, '', { r: 12, mark: 'check', k: 1 })
      })
      // закрытая дверь
      c.line([[40, 262], [820, 262]], M, { w: 1.4, dash: '3 5', op: 0.5 })
      c.arrow(100, 150, 330, 322, W, { w: 2.4, dash: '5 4' })
      c.rect(340, 294, 420, 56, { rx: 28, fill: W, fillOp: 0.1, stroke: W, sw: 2 })
      c.text(550, 328, l('обход правил', 'getting around the rules'), W, { size: 15, w: 700 })
      c.badge(760, 294, W, '', { r: 13, mark: 'cross' })
      c.badge(334, 316, W, '', { r: 11, mark: 'cross' })
    },
  },
  // Что уходит на сервер
  'data-flows': {
    ru: 'Метрики, отчёты об ошибках, /feedback и опросы отключаются; обмен с моделью, то есть промпты и ответы, остаётся всегда', en: 'Metrics, error reports, /feedback and surveys can be turned off; the exchange with the model, meaning prompts and replies, always stays',
    viewBox: [0, 0, 860, 410],
    draw: (c, l) => {
      const p = c.iso(70, 190, 24); p.tile(-1.4, -1.4, 2.8, 2.8); p.panel(-1.1, -0.7, 2.2, 1.7, A, undefined, 2); p.agent(0.4, 0.2, A, 0.55, '')
      c.text(70, 262, 'Claude Code', A, { size: 14, w: 700 })
      const s = c.iso(790, 190, 24); s.tile(-1.5, -1.5, 3, 3); s.panel(-1.3, -0.9, 2.6, 1.9, M, bandTitle('Anthropic', 6.4), 3)
      c.text(790, 268, l('сервер', 'server'), M, { size: 14, w: 700 })
      c.arrow(130, 50, 712, 50, M, { w: 12, head: true })
      c.text(426, 28, l('промпты и ответы — всегда', 'prompts and replies — always'), M, { size: 15, w: 700 })
      const rows: [string, string, string][] = [
        ['метрики', 'metrics', 'DISABLE_TELEMETRY'],
        ['отчёты об ошибках', 'error reports', 'DISABLE_ERROR_REPORTING'],
        ['/feedback', '/feedback', 'DISABLE_FEEDBACK_COMMAND'],
        ['опросы', 'surveys', 'CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY'],
      ]
      rows.forEach(([ru, en, v], i) => {
        const y = 128 + i * 56
        c.arrow(130, y, 712, y, W, { w: 3 })
        c.text(180, y - 10, l(ru, en), W, { size: 14, w: 700, anchor: 'start' })
        c.text(712, y + 18, v, M, { size: 11.5, anchor: 'end' })
      })
      c.rect(150, 100, 575, 236, { rx: 14, fill: 'none', stroke: A, sw: 2, dash: '6 5' })
      c.text(437, 366, 'CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC', A, { size: 14, w: 700 })
      c.text(437, 388, l('закрывает несущественное сразу', 'closes the nonessential at once'), A, { size: 13 })
    },
  },
  // Порядок действий после блокировки
  'help-path': {
    ru: 'После блокировки: войти заблокированным аккаунтом, подать апелляцию, сохранить письма, дождаться ответа; запасной план — другой агент; новый аккаунт для обхода не вариант', en: 'After a ban: sign in with the banned account, file the appeal, keep the emails, wait for the reply; the fallback is another agent; a new account to get around it is off the table',
    viewBox: [0, 0, 860, 340],
    draw: (c, l) => {
      const xs = [100, 300, 500, 700]
      const a = c.iso(xs[0], 90, 22); a.tile(-1.2, -1.2, 2.4, 2.4); a.person(0, 0.2, M, '')
      const b = c.iso(xs[1], 90, 22); b.tile(-1.2, -1.2, 2.4, 2.4); b.doc(-0.55, -0.5, 0, 1.1, 0.9, M, 3)
      const m = c.iso(xs[2], 90, 22); m.tile(-1.2, -1.2, 2.4, 2.4); for (const k of [0, 1, 2]) m.doc(-0.5, -0.5, k * 0.2, 1.1, 0.9, M, 2)
      const r = c.iso(xs[3], 90, 22); r.tile(-1.2, -1.2, 2.4, 2.4); r.doc(-0.55, -0.5, 0, 1.1, 0.9, M, 2)
      const t: [string, string][] = [['войти заблокированным|аккаунтом', 'sign in with the|banned account'], ['форма апелляции', 'appeal form'], ['сохранить письма', 'keep the emails'], ['ответ', 'reply']]
      xs.forEach((x, i) => {
        c.badge(x - 40, 52, M, String(i + 1), { r: 12, size: 14 })
        const [a1, a2] = l(t[i][0], t[i][1]).split('|'); c.text(x, 152, a1, M, { size: 14, w: 700 }); if (a2) c.text(x, 170, a2, M, { size: 14, w: 700 })
        if (i < 3) c.arrow(x + 50, 92, xs[i + 1] - 50, 92, M, { w: 2.4 })
      })
      c.curve(700, 184, 300, 232, A, { w: 2.2, dash: '5 4', c1: [700, 215], c2: [300, 185] })
      const f = c.iso(250, 270, 20); f.tile(-1.2, -1.2, 2.4, 2.4); f.agent(0, 0.2, A, 0.55, '')
      c.text(320, 262, l('запасной план: другой агент', 'fallback: another agent'), A, { size: 14, w: 700, anchor: 'start' })
      c.text(320, 284, 'Codex, OpenCode', A, { size: 13, anchor: 'start' })
      c.pill(560, 244, 290, 52, W); c.text(715, 276, l('новый аккаунт для обхода', 'new account to get around it'), W, { size: 14, w: 700 })
      c.badge(578, 244, W, '', { r: 12, mark: 'cross' })
    },
  },
}
export default scenes
