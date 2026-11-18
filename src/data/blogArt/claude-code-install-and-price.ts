// Схемы поста «Claude Code: установка и цена, тарифы и доступ»
import { type Scene, A, M, W, bandTitle } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Путь установки по порядку: одна идея на три системы
  'install-flow': {
    ru: 'Путь установки Claude Code в пять шагов: открыть терминал, вставить одну команду своей системы, открыть новое окно терминала, проверить claude --version, войти через браузер. На macOS, Linux и Windows шаги одни и те же, различается только команда',
    en: 'The Claude Code install path in five steps: open a terminal, paste one command for your system, open a new terminal window, run claude --version, sign in through the browser. The steps are the same on macOS, Linux and Windows; only the command differs',
    viewBox: [0, 0, 860, 300],
    draw: (c, l) => {
      const xs = [75, 250, 430, 610, 785]
      const Y = 112
      const f1 = c.iso(xs[0], Y, 22); f1.tile(-1.3, -1.3, 2.6, 2.6); f1.panel(-1.0, -0.7, 2.0, 1.6, A, undefined, 2)
      const f2 = c.iso(xs[1], Y, 22); f2.tile(-1.3, -1.3, 2.6, 2.6); f2.doc(-0.65, -0.55, 0, 1.3, 1.1, A, 3)
      const f3 = c.iso(xs[2], Y, 22); f3.tile(-1.3, -1.3, 2.6, 2.6); f3.panel(-1.2, -0.9, 1.7, 1.4, M, undefined, 1, true); f3.panel(-0.3, -0.5, 1.7, 1.4, A, undefined, 2)
      const f4 = c.iso(xs[3], Y, 22); f4.tile(-1.3, -1.3, 2.6, 2.6); f4.panel(-1.0, -0.7, 2.0, 1.6, A, undefined, 2)
      c.badge(xs[3] + 30, Y - 22, A, '', { r: 11, mark: 'check', k: 1 })
      const f5 = c.iso(xs[4], Y, 22); f5.tile(-1.3, -1.3, 2.6, 2.6); f5.panel(-1.0, -0.7, 2.0, 1.6, M, undefined, 2); f5.person(0.4, 0.6, M, '')
      const t: [string, string, string, string][] = [
        ['терминал', 'terminal', 'откройте окно', 'open a window'],
        ['одна команда', 'one command', 'своя для ОС', 'one per OS'],
        ['новое окно', 'new window', 'терминал заново', 'reopen terminal'],
        ['claude --version', 'claude --version', '«(Claude Code)»', '“(Claude Code)”'],
        ['вход', 'sign-in', 'через браузер', 'in the browser'],
      ]
      xs.forEach((x, i) => {
        c.badge(x - 44, 52, A, String(i + 1), { r: 12, size: 14 })
        c.text(x, 180, l(t[i][0], t[i][1]), A, { size: 14, w: 800 })
        c.text(x, 200, l(t[i][2], t[i][3]), M, { size: 12, w: 500 })
        if (i < 4) c.arrow(x + 50, Y + 4, xs[i + 1] - 50, Y + 4, M, { w: 2.2 })
      })
      c.pill(110, 232, 640, 44, M)
      c.text(430, 260, l('macOS · Linux · Windows — те же пять шагов', 'macOS · Linux · Windows — the same five steps'), M, { size: 14, w: 700 })
    },
  },
  // Три окна и три команды: окно узнают по строке приглашения
  'which-shell': {
    ru: 'Три окна и три команды. В окне macOS, Linux и WSL работает команда curl … | bash. В строке приглашения PowerShell есть «PS» — берут irm … | iex. В строке приглашения CMD «PS» нет — берут curl … install.cmd',
    en: 'Three windows and three commands. In macOS, Linux and WSL the curl … | bash command works. The PowerShell prompt contains “PS” — use irm … | iex. The CMD prompt has no “PS” — use curl … install.cmd',
    viewBox: [0, 0, 860, 340],
    draw: (c, l) => {
      const xs = [10, 297, 584]
      const W3 = 266
      const cards: { col: string; ru: string; en: string; cmd: string[]; verdict: [string, string] }[] = [
        { col: M, ru: 'macOS · Linux · WSL', en: 'macOS · Linux · WSL', cmd: ['curl -fsSL https://claude.ai/install.sh', '| bash'], verdict: ['нет «PS»: $ или %', 'no “PS”: $ or %'] },
        { col: A, ru: 'PowerShell', en: 'PowerShell', cmd: ['irm https://claude.ai/install.ps1', '| iex'], verdict: ['«PS» есть', '“PS” is there'] },
        { col: M, ru: 'CMD', en: 'CMD', cmd: ['curl -fsSL https://claude.ai/install.cmd', '-o install.cmd && install.cmd', '&& del install.cmd'], verdict: ['«PS» нет', 'no “PS”'] },
      ]
      cards.forEach((cd, i) => {
        const x = xs[i], cx = x + W3 / 2
        c.rect(x, 10, W3, 320, { rx: 14, fill: cd.col, fillOp: 0.06, stroke: cd.col, sw: 2 })
        c.text(cx, 40, l(cd.ru, cd.en), cd.col, { size: 16, w: 800 })
        const p = c.iso(cx, 96, 20); p.tile(-1.2, -1.2, 2.4, 2.4); p.panel(-0.9, -0.6, 1.8, 1.5, cd.col, undefined, 2)
        // строка приглашения
        c.rect(x + 14, 134, W3 - 28, 34, { rx: 8, fill: '#000', fillOp: 0.08, stroke: cd.col, sw: 1.2 })
        if (i === 0) c.text(x + 28, 156, 'you@mac ~ %', M, { size: 14, w: 700, anchor: 'start' })
        if (i === 1) { c.text(x + 28, 156, 'PS', A, { size: 16, w: 900, anchor: 'start' }); c.text(x + 56, 156, 'C:\\Users\\you>', M, { size: 14, w: 700, anchor: 'start' }); c.pill(x + 22, 138, 30, 26, A, { fill: A, fillOp: 0.12 }) }
        if (i === 2) { c.text(x + 28, 156, 'C:\\Users\\you>', M, { size: 14, w: 700, anchor: 'start' }) }
        // команда
        c.rect(x + 14, 184, W3 - 28, 84, { rx: 8, fill: cd.col, fillOp: 0.08 })
        cd.cmd.forEach((s, k) => c.text(x + 24, 208 + k * 20, s, M, { size: 11, w: 600, anchor: 'start' }))
        // вердикт
        if (i === 2) c.badge(x + 36, 302, M, '', { r: 10, mark: 'cross', k: 0.9 })
        if (i === 1) c.badge(x + 36, 302, A, '', { r: 10, mark: 'check', k: 0.9 })
        c.text(cx + 8, 308, l(cd.verdict[0], cd.verdict[1]), cd.col, { size: 14, w: 800 })
      })
    },
  },
  // Способы установки: автообновление только у установщика
  'install-methods': {
    ru: 'Пять способов установки. Установщик обновляется сам, в фоне. Homebrew, WinGet, npm, apt, dnf и apk обновляют вручную или обычным обновлением системы. Через npm ставят без sudo',
    en: 'Five ways to install. The installer updates itself in the background. Homebrew, WinGet, npm, apt, dnf and apk are updated by hand or with the normal system update. Install with npm without sudo',
    viewBox: [0, 0, 860, 340],
    draw: (c, l) => {
      c.rect(10, 20, 290, 290, { rx: 16, fill: A, fillOp: 0.07, stroke: A, sw: 2.2 })
      const a = c.iso(155, 120, 26); a.tile(-1.5, -1.5, 3, 3); a.panel(-1.2, -0.8, 2.4, 1.9, A, undefined, 3); a.agent(0.4, 0.3, A, 0.6, '')
      c.badge(155, 250, A, '', { r: 12, mark: 'check', k: 1 })
      c.text(155, 224, l('Установщик', 'Installer'), A, { size: 17, w: 800 })
      c.text(155, 278, l('обновляется само, в фоне', 'updates itself in the background'), A, { size: 13, w: 700 })
      c.text(155, 296, l('рекомендован', 'recommended'), M, { size: 12 })
      const rows: [string, string, string, string][] = [
        ['Homebrew · macOS', 'Homebrew · macOS', 'brew upgrade claude-code', 'brew upgrade claude-code'],
        ['WinGet · Windows', 'WinGet · Windows', 'winget upgrade Anthropic.ClaudeCode', 'winget upgrade Anthropic.ClaudeCode'],
        ['npm · Node.js 22+', 'npm · Node.js 22+', 'повторить установку', 'repeat the install'],
        ['apt · dnf · apk', 'apt · dnf · apk', 'обновление системы', 'system update'],
      ]
      c.text(590, 34, l('обновление вручную', 'updated by hand'), M, { size: 14, w: 800 })
      rows.forEach(([r1, e1, r2, e2], i) => {
        const y = 52 + i * 58
        c.pill(330, y, 520, 48, M)
        c.text(346, y + 30, l(r1, e1), M, { size: 14, w: 800, anchor: 'start' })
        c.text(836, y + 30, l(r2, e2), M, { size: 12, w: 600, anchor: 'end' })
      })
      c.pill(330, 288, 520, 40, W, { fill: W, fillOp: 0.1 })
      c.badge(352, 308, W, '', { r: 11, mark: 'cross' })
      c.text(600, 314, l('npm: без sudo — иначе права и обновление', 'npm: no sudo — breaks permissions and updates'), W, { size: 14, w: 700 })
    },
  },
  // Windows: три режима, изоляция команд только в WSL 2
  'windows-modes': {
    ru: 'Три режима на Windows. Windows напрямую: изоляция команд не поддерживается. WSL 2: изоляция поддерживается. WSL 1: изоляция не поддерживается. Команду для Linux запускают внутри окна WSL, не в PowerShell',
    en: 'Three modes on Windows. Native Windows: command isolation is not supported. WSL 2: isolation is supported. WSL 1: isolation is not supported. The Linux command runs inside the WSL window, not in PowerShell',
    viewBox: [0, 0, 860, 340],
    draw: (c, l) => {
      const xs = [150, 430, 710]
      const cards: { col: string; ru: string; en: string; ok: boolean }[] = [
        { col: M, ru: 'Windows напрямую', en: 'Native Windows', ok: false },
        { col: A, ru: 'WSL 2', en: 'WSL 2', ok: true },
        { col: M, ru: 'WSL 1', en: 'WSL 1', ok: false },
      ]
      cards.forEach((cd, i) => {
        const x = xs[i]
        c.rect(x - 130, 10, 260, 250, { rx: 14, fill: cd.col, fillOp: cd.ok ? 0.1 : 0.05, stroke: cd.col, sw: cd.ok ? 2.4 : 1.6 })
        const f = c.iso(x, 104, 22); f.tile(-1.5, -1.5, 3, 3)
        if (i === 0) { f.panel(-1.1, -0.7, 2.2, 1.7, A, undefined, 2); f.agent(0.4, 0.2, A, 0.55, '') }
        else { f.zone(-1.3, -1.1, 2.6, 2.2, cd.col, { op: 0.15, dash: cd.ok ? '1 0' : '4 3' }); f.panel(-0.9, -0.6, 1.8, 1.5, A, undefined, 2); f.agent(0.3, 0.2, A, 0.5, '') }
        c.text(x, 190, l(cd.ru, cd.en), cd.col, { size: 17, w: 800 })
        c.text(x, 210, i === 0 ? l('программы под Windows', 'programs for Windows') : l('внутри окна WSL', 'inside the WSL window'), M, { size: 12, w: 500 })
        c.pill(x - 100, 220, 200, 32, cd.ok ? A : W, { fill: cd.ok ? A : W, fillOp: 0.1 })
        if (cd.ok) c.badge(x - 82, 236, A, '', { r: 9, mark: 'check', k: 0.8 }); else c.badge(x - 82, 236, W, '', { r: 9, mark: 'cross', k: 0.8 })
        c.text(x + 10, 241, cd.ok ? l('изоляция команд: да', 'isolation: yes') : l('изоляция команд: нет', 'isolation: no'), cd.ok ? A : W, { size: 13, w: 700 })
      })
      c.pill(110, 282, 640, 44, A)
      c.text(430, 310, l('команду для Linux — внутри окна WSL, не в PowerShell', 'the Linux command goes inside the WSL window, not PowerShell'), A, { size: 14, w: 700 })
    },
  },
  // Четыре способа входа в один Claude Code
  'login-paths': {
    ru: 'Четыре способа входа ведут в один Claude Code: подписка Pro, Max или Ultra для одного человека; Team или Enterprise по приглашению администратора; Claude Console с оплатой по API и предоплаченными кредитами; облачные провайдеры Amazon Bedrock, Google Cloud и Microsoft Foundry',
    en: 'Four ways to sign in lead to one Claude Code: a Pro, Max or Ultra subscription for one person; Team or Enterprise by administrator invitation; Claude Console with API billing and prepaid credits; cloud providers Amazon Bedrock, Google Cloud and Microsoft Foundry',
    viewBox: [0, 0, 860, 340],
    draw: (c, l) => {
      const rows: [string, string, string, string, string][] = [
        ['Подписка Pro · Max · Ultra', 'Pro · Max · Ultra subscription', 'один человек, аккаунт claude.ai', 'one person, claude.ai account', M],
        ['Team · Enterprise', 'Team · Enterprise', 'по приглашению администратора', 'by administrator invitation', M],
        ['Claude Console', 'Claude Console', 'оплата по API, кредиты', 'API billing, credits', M],
        ['Bedrock · Google Cloud · Foundry', 'Bedrock · Google Cloud · Foundry', 'облачный провайдер организации', 'the organization’s cloud provider', A],
      ]
      rows.forEach(([r1, e1, r2, e2, col], i) => {
        const y = 12 + i * 80
        c.pill(10, y, 400, 62, col)
        c.text(26, y + 28, l(r1, e1), col, { size: 15, w: 800, anchor: 'start' })
        c.text(26, y + 48, l(r2, e2), M, { size: 12, w: 500, anchor: 'start' })
        c.curve(412, y + 31, 622, 170, col, { w: 2.4 })
      })
      const cc = c.iso(730, 160, 28); cc.tile(-1.6, -1.6, 3.2, 3.2); cc.panel(-1.3, -0.9, 2.6, 2.0, A, bandTitle('claude', 6.4), 3); cc.agent(0.5, 0.4, A, 0.65, '')
      c.text(730, 250, 'Claude Code', A, { size: 17, w: 800 })
      c.text(730, 272, l('один и тот же', 'the same one'), M, { size: 13 })
    },
  },
  // Лестница тарифов
  'plans-ladder': {
    ru: 'Лестница тарифов. Free за 0 $ без Claude Code. Pro 20 $, Max 100 $ в пять раз больше Pro, Ultra 200 $ в десять раз больше Pro в неделю. Claude Code есть, начиная с Pro. Рядом места за подписку для команд: Team 25 $ и расширенное 125 $, Enterprise от 20 мест',
    en: 'The plan ladder. Free at $0 has no Claude Code. Pro $20, Max $100 with five times the Pro usage, Ultra $200 with ten times the Pro usage every week. Claude Code is included from Pro up. Beside it, team seats: Team $25 and premium $125, Enterprise from 20 seats',
    viewBox: [0, 0, 860, 340],
    draw: (c, l) => {
      const base = 250
      const bars: [number, string, string, string, string, number, string][] = [
        [30, 'Free', '0 $', 'без Claude Code', 'no Claude Code', 20, M],
        [150, 'Pro', '20 $', 'базовый объём', 'base usage', 70, A],
        [270, 'Max', '100 $', '5× Pro', '5× Pro', 120, A],
        [390, 'Ultra', '200 $', '10× Pro в неделю', '10× Pro weekly', 165, A],
      ]
      c.line([[150, 22], [490, 22]], A, { w: 2.4 })
      c.line([[150, 22], [150, 32]], A, { w: 2.4 }); c.line([[490, 22], [490, 32]], A, { w: 2.4 })
      c.badge(320, 8, A, '', { r: 9, mark: 'check', k: 0.8 })
      c.text(340, 13, l('Claude Code — с Pro', 'Claude Code — from Pro'), A, { size: 13, w: 800, anchor: 'start' })
      bars.forEach(([x, n, price, ru, en, h, col], i) => {
        const free = i === 0
        c.rect(x, base - h, 100, h, { rx: 8, fill: col, fillOp: free ? 0.06 : 0.16, stroke: col, sw: 2, dash: free ? '5 4' : undefined })
        c.text(x + 50, base - h - 12, price, col, { size: 22, w: 900 })
        if (free) c.badge(x + 50, base - h / 2, W, '', { r: 9, mark: 'cross', k: 0.8 })
        c.text(x + 50, base + 24, n, col, { size: 16, w: 800 })
        c.text(x + 50, base + 44, l(ru, en), M, { size: 12, w: 500 })
      })
      // места для команд
      c.text(695, 40, l('места для команд', 'seats for teams'), M, { size: 14, w: 800 })
      const seats: [string, string, string, string, string, string][] = [
        ['Team', 'Team', '25 $', 'обычное место', 'standard seat', M],
        ['Team', 'Team', '125 $', 'расширенное, 5× места', 'premium, 5× a seat', M],
        ['Enterprise', 'Enterprise', 'от 20 мест', 'по договору', 'by contract', M],
      ]
      seats.forEach(([r1, e1, price, r2, e2], i) => {
        const y = 62 + i * 76
        c.pill(540, y, 310, 62, M)
        c.text(556, y + 26, l(r1, e1), M, { size: 15, w: 800, anchor: 'start' })
        c.text(556, y + 47, l(r2, e2), M, { size: 12, w: 500, anchor: 'start' })
        c.text(834, y + 36, price, M, { size: 18, w: 900, anchor: 'end' })
      })
      c.text(695, 330, l('цена за место в месяц', 'price per seat per month'), M, { size: 12 })
      c.text(190, 330, l('цена в месяц при помесячной оплате', 'monthly price, billed monthly'), M, { size: 12 })
    },
  },
  // Лимиты: сессия, неделя, общий расход чата и Claude Code, кредиты
  'limits': {
    ru: 'Лимиты. У Pro и Max два: пятичасовой лимит сессии и недельный. У Ultra недельный; пятичасового лимита у проверенных аккаунтов нет. Лимит общий для чата Claude и Claude Code. Когда он исчерпан, можно включить дополнительное использование за кредиты',
    en: 'Limits. Pro and Max have two: a five-hour session limit and a weekly one. Ultra has a weekly limit; checked accounts have no five-hour limit. The limit is shared by Claude chat and Claude Code. When it runs out you can turn on extra usage paid with credits',
    viewBox: [0, 0, 860, 360],
    draw: (c, l) => {
      c.text(10, 28, 'Pro · Max', M, { size: 16, w: 800, anchor: 'start' })
      c.rect(150, 10, 200, 36, { rx: 18, fill: A, fillOp: 0.16, stroke: A, sw: 2 }); c.text(250, 34, l('сессия: 5 часов', 'session: 5 hours'), A, { size: 14, w: 800 })
      c.rect(370, 10, 330, 36, { rx: 18, fill: A, fillOp: 0.16, stroke: A, sw: 2 }); c.text(535, 34, l('неделя', 'week'), A, { size: 14, w: 800 })
      c.text(10, 98, 'Ultra', M, { size: 16, w: 800, anchor: 'start' })
      c.rect(150, 80, 200, 36, { rx: 18, fill: 'none', stroke: M, sw: 1.8, dash: '5 4' }); c.text(250, 104, l('нет у проверенных', 'none on checked ones'), M, { size: 13, w: 700 })
      c.rect(370, 80, 330, 36, { rx: 18, fill: A, fillOp: 0.16, stroke: A, sw: 2 }); c.text(535, 104, l('неделя', 'week'), A, { size: 14, w: 800 })
      // общий лимит
      const Y = 250
      const chat = c.iso(70, Y, 20); chat.tile(-1.2, -1.2, 2.4, 2.4); chat.panel(-0.9, -0.6, 1.8, 1.5, M, undefined, 2); chat.person(0.5, 0.6, M, '')
      c.text(70, Y + 60, l('чат Claude', 'Claude chat'), M, { size: 13, w: 700 })
      const cc = c.iso(200, Y, 20); cc.tile(-1.2, -1.2, 2.4, 2.4); cc.panel(-0.9, -0.6, 1.8, 1.5, A, undefined, 2); cc.agent(0.4, 0.3, A, 0.5, '')
      c.text(200, Y + 60, 'Claude Code', A, { size: 13, w: 700 })
      c.arrow(100, Y + 38, 300, Y + 38, M, { w: 2 }); c.arrow(246, Y + 6, 296, Y + 6, A, { w: 2 })
      const lim = c.iso(340, Y, 22); lim.tile(-1.2, -1.2, 2.4, 2.4); lim.cyl(0, 0, 0, 0.8, 1.0, M)
      c.text(340, Y + 60, l('один общий лимит', 'one shared limit'), M, { size: 13, w: 700 })
      c.arrow(396, Y + 4, 480, Y + 4, W, { w: 2.4 })
      c.pill(486, Y - 28, 140, 56, W, { fill: W, fillOp: 0.1 }); c.text(556, Y + 5, l('исчерпан', 'used up'), W, { size: 15, w: 800 })
      c.arrow(628, Y + 4, 672, Y + 4, A, { w: 2.4 })
      c.pill(676, Y - 40, 176, 80, A)
      c.text(764, Y - 14, l('за кредиты', 'with credits'), A, { size: 15, w: 800 })
      c.text(764, Y + 6, l('дополнительное', 'extra'), M, { size: 12 })
      c.text(764, Y + 24, l('использование', 'usage'), M, { size: 12 })
    },
  },
  // Подписка или ключ API: что оплачивается и как вернуться
  'api-vs-subscription': {
    ru: 'Два способа оплаты одного Claude Code. Подписка: фиксированная цена и лимиты. Ключ ANTHROPIC_API_KEY: оплата за объём. Если ключ задан в системе, он берётся вместо подписки; unset ANTHROPIC_API_KEY возвращает к подписке, /status показывает, какой способ действует',
    en: 'Two ways to pay for the same Claude Code. Subscription: a fixed price and limits. The ANTHROPIC_API_KEY key: pay for volume. If the key is set in the system it is used instead of the subscription; unset ANTHROPIC_API_KEY returns to the subscription, /status shows which method is active',
    viewBox: [0, 0, 860, 340],
    draw: (c, l) => {
      c.pill(10, 30, 300, 70, M)
      c.text(26, 58, l('Подписка', 'Subscription'), M, { size: 17, w: 800, anchor: 'start' })
      c.text(26, 82, l('фиксированная цена и лимиты', 'fixed price and limits'), M, { size: 13, w: 500, anchor: 'start' })
      c.pill(10, 240, 300, 70, W, { fill: W, fillOp: 0.1 })
      c.text(26, 268, 'ANTHROPIC_API_KEY', W, { size: 16, w: 800, anchor: 'start' })
      c.text(26, 292, l('оплата за объём', 'pay for volume'), M, { size: 13, w: 500, anchor: 'start' })
      const cc = c.iso(490, 170, 28); cc.tile(-1.6, -1.6, 3.2, 3.2); cc.panel(-1.3, -0.9, 2.6, 2.0, A, undefined, 3); cc.agent(0.5, 0.4, A, 0.65, '')
      c.text(490, 252, 'Claude Code', A, { size: 16, w: 800 })
      c.curve(312, 65, 428, 150, M, { w: 2.4, c1: [380, 65], c2: [390, 130] })
      c.curve(312, 275, 428, 190, W, { w: 3.4, c1: [380, 275], c2: [390, 210] })
      c.badge(374, 202, W, '!', { r: 10, size: 13 })
      // возврат к подписке
      c.arrow(150, 238, 150, 104, A, { w: 2.2, dash: '5 4' })
      c.text(164, 172, 'unset ANTHROPIC_API_KEY', A, { size: 13, w: 800, anchor: 'start' })
      // проверка способа
      c.arrow(556, 170, 640, 170, A, { w: 2.2 })
      c.pill(644, 134, 206, 72, A)
      c.eye(676, 170, A)
      c.text(770, 164, '/status', A, { size: 17, w: 800 })
      c.text(770, 186, l('какой способ действует', 'which method is active'), M, { size: 12 })
    },
  },
  // Пять проверок: команда и ответ
  'check-ladder': {
    ru: 'Пять проверок. claude --version: номер версии и «(Claude Code)». claude doctor: отчёт об установке. /status: способ входа, подписка или ключ. Вопрос «what does this project do?»: краткое описание проекта. claude update: «Claude Code is up to date»',
    en: 'Five checks. claude --version: a version number and “(Claude Code)”. claude doctor: an install report. /status: the sign-in method, subscription or key. The question “what does this project do?”: a short project description. claude update: “Claude Code is up to date”',
    viewBox: [0, 0, 860, 390],
    draw: (c, l) => {
      const rows: [string, string, string, string, string, string][] = [
        ['claude --version', 'claude --version', 'в терминале', 'in the terminal', '2.1.211 (Claude Code)', '2.1.211 (Claude Code)'],
        ['claude doctor', 'claude doctor', 'в терминале', 'in the terminal', 'отчёт об установке', 'an install report'],
        ['/status', '/status', 'внутри сессии', 'inside a session', 'способ входа: подписка или ключ', 'sign-in: subscription or key'],
        ['what does this project do?', 'what does this project do?', 'внутри сессии', 'inside a session', 'краткое описание проекта', 'a short project description'],
        ['claude update', 'claude update', 'в терминале', 'in the terminal', 'Claude Code is up to date', 'Claude Code is up to date'],
      ]
      rows.forEach(([r1, e1, w1, w2, r2, e2], i) => {
        const y = 14 + i * 74
        c.badge(24, y + 31, A, String(i + 1), { r: 13, size: 15 })
        c.pill(56, y, 320, 62, A)
        c.text(72, y + 28, l(r1, e1), A, { size: 15, w: 800, anchor: 'start' })
        c.text(72, y + 48, l(w1, w2), M, { size: 12, w: 500, anchor: 'start' })
        c.arrow(380, y + 31, 440, y + 31, M, { w: 2.2 })
        c.pill(444, y, 380, 62, M)
        c.text(460, y + 38, l(r2, e2), M, { size: 14, w: 700, anchor: 'start' })
        c.badge(824, y + 31, A, '', { r: 11, mark: 'check', k: 1 })
      })
    },
  },
  // Дерево ошибок установки: что видите, причина, что делать
  'install-errors': {
    ru: 'Семь ошибок установки: что видите, причина, что делать. command not found: claude — папка не в PATH; ошибка про «&&» или «irm» — команда не для этого окна; 403 — прокси, фильтр или страна; EACCES — нет прав на папку; TLS connect error — сертификаты; Killed — не хватает памяти; App unavailable in region — страны нет в списке',
    en: 'Seven install errors: what you see, the cause, what to do. command not found: claude — the folder is not in PATH; an error about “&&” or “irm” — the command is not for this window; 403 — a proxy, a filter or the country; EACCES — no rights on the folder; TLS connect error — certificates; Killed — not enough memory; App unavailable in region — the country is not on the list',
    viewBox: [0, 0, 860, 450],
    draw: (c, l) => {
      c.text(160, 20, l('что видите', 'what you see'), W, { size: 13, w: 800 })
      c.text(454, 20, l('причина', 'cause'), M, { size: 13, w: 800 })
      c.text(729, 20, l('что делать', 'what to do'), A, { size: 13, w: 800 })
      type R = { see: string[]; why: [string[], string[]]; fix: [string[], string[]] }
      const rows: R[] = [
        { see: ['command not found: claude'], why: [['папка не в PATH'], ['folder is not in PATH']], fix: [['новое окно терминала;', '~/.local/bin в PATH'], ['a new terminal window;', '~/.local/bin in PATH']] },
        { see: ['The token \'&&\' … / \'irm\'', 'is not recognized'], why: [['команда для другого окна:', 'CMD и PowerShell'], ['a command for another window:', 'CMD and PowerShell']], fix: [['взять команду своего окна:', 'irm … | iex или curl … .cmd'], ['use your window’s command:', 'irm … | iex or curl … .cmd']] },
        { see: ['curl: (22) … 403'], why: [['прокси, фильтр', 'или страна вне списка'], ['proxy, filter', 'or country off the list']], fix: [['проверить сеть', 'и список стран'], ['check the network', 'and the country list']] },
        { see: ['EACCES: permission denied'], why: [['нет прав на папку'], ['no rights on the folder']], fix: [['исправить права,', 'sudo не использовать'], ['fix the rights,', 'do not use sudo']] },
        { see: ['TLS connect error'], why: [['старые сертификаты', 'или проверка трафика'], ['old certificates', 'or traffic inspection']], fix: [['обновить сертификаты', 'системы'], ['update the system', 'certificates']] },
        { see: ['Killed'], why: [['не хватает памяти', 'на Linux'], ['not enough memory', 'on Linux']], fix: [['освободить память', 'или добавить swap'], ['free memory', 'or add swap']] },
        { see: ['App unavailable in region'], why: [['страны нет в списке', 'Anthropic'], ['the country is not on', 'the Anthropic list']], fix: [['смотреть список стран'], ['check the country list']] },
      ]
      const two = (x: number, y: number, lines: string[], col: string, size: number, w: number, anchor: 'middle' | 'start' = 'middle') => {
        if (lines.length === 1) c.text(x, y + 5, lines[0], col, { size, w, anchor })
        else { c.text(x, y - 4, lines[0], col, { size: size - 1, w, anchor }); c.text(x, y + 13, lines[1], col, { size: size - 1, w, anchor }) }
      }
      rows.forEach((r, i) => {
        const y = 62 + i * 56
        const last = i === rows.length - 1
        c.pill(10, y - 23, 300, 46, W, { fill: W, fillOp: last ? 0.16 : 0.07 })
        two(160, y, r.see, W, 14, 800)
        c.arrow(312, y, 336, y, M, { w: 2 })
        c.pill(340, y - 23, 228, 46, M)
        two(454, y, l(r.why[0].join('|'), r.why[1].join('|')).split('|'), M, 13, 700)
        c.arrow(570, y, 594, y, A, { w: 2 })
        c.pill(598, y - 23, 252, 46, A)
        two(724, y, l(r.fix[0].join('|'), r.fix[1].join('|')).split('|'), A, 13, 700)
      })
    },
  },
  // Четыре аналога: чей и где работает
  'alternatives-map': {
    ru: 'Четыре аналога Claude Code. OpenCode: открытый агент, модель выбираете сами; работает в терминале, приложении и вебе. Codex: агент OpenAI, модели GPT; ChatGPT, приложение, терминал, IDE. Cursor: редактор с агентом; работает в редакторе. Gemini CLI от Google перешёл в Antigravity CLI; терминал и приложение Antigravity',
    en: 'Four Claude Code alternatives. OpenCode: an open agent, you choose the model; works in the terminal, an app and the web. Codex: the OpenAI agent, GPT models; ChatGPT, an app, a terminal, an IDE. Cursor: an editor with an agent; works in the editor. Gemini CLI from Google moved into Antigravity CLI; terminal and the Antigravity app',
    viewBox: [0, 0, 860, 340],
    draw: (c, l) => {
      const xs = [10, 225, 440, 655]
      const CW = 195
      type K = { n1: string; n2: string; who: [string, string]; model: [string, string]; where: [string[], string[]] }
      const cards: K[] = [
        { n1: 'OpenCode', n2: '', who: ['открытый агент', 'an open agent'], model: ['модель выбираете сами', 'you choose the model'], where: [['терминал, приложение,', 'веб'], ['terminal, app,', 'web']] },
        { n1: 'Codex', n2: '', who: ['OpenAI', 'OpenAI'], model: ['модели GPT', 'GPT models'], where: [['ChatGPT, приложение,', 'терминал, IDE'], ['ChatGPT, app,', 'terminal, IDE']] },
        { n1: 'Cursor', n2: '', who: ['Anysphere', 'Anysphere'], model: ['редактор с агентом', 'an editor with an agent'], where: [['редактор'], ['the editor']] },
        { n1: 'Gemini CLI →', n2: 'Antigravity CLI', who: ['Google', 'Google'], model: ['модели Gemini', 'Gemini models'], where: [['терминал,', 'приложение Antigravity'], ['terminal,', 'Antigravity app']] },
      ]
      cards.forEach((k, i) => {
        const x = xs[i], cx = x + CW / 2
        c.rect(x, 8, CW, 322, { rx: 14, fill: A, fillOp: 0.06, stroke: A, sw: 1.8 })
        const f = c.iso(cx, 84, 20); f.tile(-1.2, -1.2, 2.4, 2.4)
        if (i === 0) { f.panel(-0.9, -0.6, 1.8, 1.5, A, undefined, 2); f.agent(0.4, 0.3, A, 0.5, '') }
        if (i === 1) { f.agent(0, 0.1, A, 0.8, '') }
        if (i === 2) { f.panel(-1.0, -0.7, 2.0, 1.6, A, bandTitle('Cursor', 6), 3); f.agent(0.5, 0.5, A, 0.45, '') }
        if (i === 3) { f.panel(-1.0, -0.7, 2.0, 1.6, A, undefined, 2); f.agent(0.4, 0.3, A, 0.5, '') }
        c.text(cx, 160, k.n1, A, { size: 16, w: 800 })
        if (k.n2) c.text(cx, 180, k.n2, A, { size: 16, w: 800 })
        c.text(cx, 208, l(k.who[0], k.who[1]), M, { size: 13, w: 700 })
        c.text(cx, 227, l(k.model[0], k.model[1]), M, { size: 12, w: 500 })
        c.line([[x + 20, 244], [x + CW - 20, 244]], A, { w: 1, op: 0.5 })
        c.text(cx, 264, l('где работает', 'where it runs'), A, { size: 12, w: 800 })
        const wh = l(k.where[0].join('|'), k.where[1].join('|')).split('|')
        wh.forEach((s, j) => c.text(cx, 284 + j * 17, s, M, { size: 12, w: 500 }))
      })
    },
  },
}
export default scenes
