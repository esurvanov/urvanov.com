// Схемы поста «Claude in Chrome»
import { type Scene, A, M, W, bandTitle } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Цепочка: Claude Code в терминале → расширение → ваш Chrome с вашим входом
  'terminal-to-browser': {
    ru: 'Claude Code в терминале управляет вкладками Chrome через расширение и пользуется вашим входом', en: 'Claude Code in the terminal drives Chrome tabs through the extension and uses your login',
    viewBox: [0, 0, 700, 224],
    draw: (c, l) => {
      const cc = c.iso(120, 126, 26); cc.tile(-1.5, -1.5, 3, 3); cc.panel(-1.1, -0.6, 2.2, 1.9, A, undefined, 2); cc.agent(0.5, 0.3, A, 0.6, '')
      c.text(129.9, 54.9, 'Claude Code', A, { size: 10, w: 700 })
      const ext = c.iso(350, 126, 26); ext.tile(-1.5, -1.5, 3, 3); ext.box(-0.6, -0.6, 0, 1.2, 1.2, 0.9, A); ext.box(-0.25, -0.25, 0.9, 0.5, 0.5, 0.4, A)
      const br = c.iso(580, 126, 26); br.tile(-1.7, -1.7, 3.4, 3.4); br.panel(-1.4, -1.0, 2.6, 2.0, A, bandTitle('Chrome'), 3); br.person(1.0, 0.9, M, '')
      c.key(556.2516, 121.7, A)
      c.arrow(200, 132, 272, 132, A); c.arrow(430, 132, 498, 132, A)
      c.text(120, 208, 'Claude Code', A, { size: 12 }); c.text(350, 208, l('расширение', 'extension'), A, { size: 12 }); c.text(580, 208, l('ваш браузер и ваш вход', 'your browser and your login'), A, { size: 12 })
    },
  },
  // Три шага подключения: расширение → запуск claude --chrome → проверка /chrome (галочка)
  'setup-steps': {
    ru: 'Поставить расширение → Запустить claude --chrome → Проверить /chrome', en: 'Install the extension → Run claude --chrome → Check /chrome',
    viewBox: [0, 0, 700, 238],
    draw: (c, l) => {
      const ext = c.iso(130, 122, 26); ext.tile(-1.5, -1.5, 3, 3); ext.box(-0.6, -0.6, 0, 1.2, 1.2, 0.9, A); ext.box(-0.25, -0.25, 0.9, 0.5, 0.5, 0.4, A)
      const run = c.iso(350, 122, 26); run.tile(-1.5, -1.5, 3, 3); run.panel(-1.1, -0.6, 2.2, 1.6, A, bandTitle('--chrome', 6.1), 2)
      const chk = c.iso(570, 122, 26); chk.tile(-1.5, -1.5, 3, 3); chk.panel(-1.1, -0.8, 1.9, 1.5, A, bandTitle('Chrome', 6.1), 2)
      chk.doc(0.6, 0.5, 0, 0.8, 0.7, A, 0, true)
      c.arrow(200, 128, 282, 128, A); c.arrow(420, 128, 502, 128, A)
      const steps = [l('Поставить расширение', 'Install the extension'), l('Запустить claude --chrome', 'Run claude --chrome'), l('Проверить /chrome', 'Check /chrome')]
      steps.forEach((t, i) => c.step(130 + i * 220, 192, i + 1, t))
    },
  },
  // Chrome в центре, вокруг четыре дела агента: консоль, формы и тесты, документы под вашим входом, данные и GIF
  'browser-uses': {
    ru: 'Агент в браузере: читает консоль, проходит сценарии, работает с документами под вашим входом, выгружает данные и записывает GIF', en: 'The agent in the browser: reads the console, runs scenarios, works with documents under your login, extracts data and records GIFs',
    viewBox: [0, 0, 700, 326],
    draw: (c, l) => {
      const br = c.iso(350, 150, 26); br.tile(-1.8, -1.8, 3.6, 3.6); br.panel(-1.5, -1.0, 3.0, 2.0, A, bandTitle('Chrome'), 3)
      const con = c.iso(110, 66, 26); con.tile(-1.5, -1.5, 3, 3); con.panel(-1.0, -0.4, 2.0, 1.5, A, undefined, 2)
      con.bug(0.9, 0.9)
      c.text(115.4, 7.9, 'console', A, { size: 10, w: 700 })
      const form = c.iso(110, 234, 26); form.tile(-1.5, -1.5, 3, 3); form.doc(-0.6, -0.6, 0, 1.2, 1.2, A, 3, true)
      const docs = c.iso(590, 66, 26); docs.tile(-1.5, -1.5, 3, 3); for (const k of [0, 1, 2]) docs.doc(-0.6, -0.6, k * 0.2, 1.3, 1.0, A, 2)
      const data = c.iso(590, 234, 26); data.tile(-1.5, -1.5, 3, 3); data.cyl(-0.4, 0.2, 0, 0.55, 0.8, A)
      c.film(601.258, 227.9)
      for (const [x1, y1, x2, y2] of [[178, 92, 268, 128], [178, 208, 268, 172], [522, 92, 432, 128], [522, 208, 432, 172]]) c.arrow(x1, y1, x2, y2, A, { w: 1.6, dash: '4 4' })
      const cap = (x: number, y: number, t1: string, t2: string) => { c.text(x, y, t1, A, { size: 12, w: 700 }); c.text(x, y + 15, t2, M) }
      cap(110, 128, l('консоль и DOM', 'console and DOM'), l('отладка, проверка дизайна', 'debugging, design check'))
      cap(110, 296, l('формы и тесты', 'forms and tests'), l('сценарии, загрузка файлов', 'scenarios, file uploads'))
      cap(590, 128, l('документы под вашим входом', 'documents under your login'), 'Docs, Gmail, Notion')
      cap(590, 296, l('данные и GIF', 'data and GIFs'), l('выгрузка, запись шагов', 'extraction, step recording'))
    },
  },
  // Заявка → агент проходит путь на стенде → ошибка в консоли → отчёт с GIF
  'ticket-to-report': {
    ru: 'Заявка PAY-142: агент проходит путь на стенде, находит ошибку в консоли и приносит отчёт с GIF', en: 'Ticket PAY-142: the agent walks the path on the stand, finds the console error and brings a report with a GIF',
    viewBox: [0, 0, 700, 224],
    draw: (c, l) => {
      const tk = c.iso(100, 126, 26); tk.tile(-1.5, -1.5, 3, 3); tk.panel(-1.0, -0.4, 2.0, 1.8, M, undefined, 2)
      c.text(105.4, 60.1, 'PAY-142', M, { size: 10, w: 700 })
      const st = c.iso(260, 126, 26); st.tile(-1.5, -1.5, 3, 3); st.panel(-1.3, -1.1, 2.0, 1.6, M, bandTitle(l('стенд', 'stand'), 8.2), 2); st.agent(0.5, 0.3, A, 0.6, '')
      const er = c.iso(420, 126, 26); er.tile(-1.5, -1.5, 3, 3); er.panel(-1.1, -0.4, 2.2, 1.8, W, bandTitle('console', 7), 2); er.bug(0.8, 0.9)
      const rp = c.iso(580, 126, 26); rp.tile(-1.5, -1.5, 3, 3); rp.doc(-1.0, -0.4, 0, 1.0, 0.8, A, 3, true)
      c.film(595.258, 123.1)
      for (const x of [170, 330, 490]) c.arrow(x, 132, x + 50, 132, A)
      c.text(100, 208, l('заявка', 'ticket'), M, { size: 12 }); c.text(260, 208, l('путь на стенде', 'path on the stand'), A, { size: 12 })
      c.text(420, 208, l('ошибка в консоли', 'console error'), W, { size: 12 }); c.text(580, 208, l('отчёт и GIF', 'report and GIF'), A, { size: 12 })
    },
  },
  // Вы разрешаете сайты: на разрешённых агент работает (галочки), закрытый недоступен (крест)
  'site-permissions': {
    ru: 'Агент спрашивает разрешение, работает на разрешённых сайтах, а закрытый сайт остаётся недоступным', en: 'The agent asks permission, works on allowed sites, and a blocked site stays out of reach',
    viewBox: [0, 0, 700, 224],
    draw: (c, l) => {
      const you = c.iso(120, 130, 26); you.tile(-1.5, -1.5, 3, 3); you.person(0, 0.3, M, '')
      c.bubble(69.2452, 52.9, 100, 26, M, { tail: [26, -2, 8, 8] })
      c.text(119.2, 69.9, l('разрешить?', 'allow?'), 'currentColor', { size: 10.5, w: 600 })
      const ok = c.iso(350, 130, 26); ok.tile(-1.7, -1.7, 3.4, 3.4); ok.panel(-1.7, -0.9, 1.3, 1.5, A, undefined, 2); ok.panel(0.1, -0.9, 1.3, 1.5, A, undefined, 2)
      c.text(343.0, 51.7, l('сайт A', 'site A'), A, { size: 10, w: 700 }); c.text(383.5, 75.1, l('сайт B', 'site B'), A, { size: 10, w: 700 })
      const no = c.iso(580, 130, 26); no.tile(-1.7, -1.7, 3.4, 3.4); no.panel(-1.0, -0.6, 2.0, 1.8, W, bandTitle(l('сайт C', 'site C'), 6.8), 2)
      c.arrow(200, 136, 272, 136, A)
      for (const x of [307, 380]) c.badge(x, 100, A, '', { r: 9, mark: 'check', k: 1 })
      c.badge(590, 100, W, '', { r: 10, mark: 'cross' })
      c.arrow(430, 136, 500, 136, W, { w: 1.6, dash: '4 4' })
      c.text(120, 208, l('вы решаете', 'you decide'), M, { size: 12 }); c.text(350, 208, l('разрешено', 'allowed'), A, { size: 12 }); c.text(580, 208, l('закрыто', 'blocked'), W, { size: 12 })
    },
  },
  // Старт в три шага: расширение → claude --chrome → Chrome с галочкой
  'start-steps': {
    ru: 'Три шага старта: поставить расширение, запустить claude --chrome, проверить статус', en: 'Three starting steps: install the extension, run claude --chrome, check the status',
    viewBox: [0, 0, 700, 238],
    draw: (c, l) => {
      const ext = c.iso(130, 122, 26); ext.tile(-1.5, -1.5, 3, 3); ext.box(-0.6, -0.6, 0, 1.2, 1.2, 0.9, A); ext.box(-0.25, -0.25, 0.9, 0.5, 0.5, 0.4, A)
      const run = c.iso(350, 122, 26); run.tile(-1.5, -1.5, 3, 3); run.panel(-1.1, -0.5, 2.2, 1.8, A, undefined, 2)
      c.text(357.7, 54.8, 'claude --chrome', A, { size: 10, w: 700 })
      const br = c.iso(570, 122, 26); br.tile(-1.5, -1.5, 3, 3); br.panel(-1.1, -0.7, 2.2, 1.9, A, bandTitle('Chrome', 8.2), 2)
      c.badge(560.9936, 131, A, '', { mark: 'check', k: 1.4 })
      c.arrow(200, 128, 282, 128, A); c.arrow(420, 128, 502, 128, A)
      const steps = [l('поставить расширение', 'install the extension'), 'claude --chrome', l('проверить /chrome', 'check /chrome')]
      steps.forEach((t, i) => c.step(130 + i * 220, 192, i + 1, t))
    },
  },
}
export default scenes
