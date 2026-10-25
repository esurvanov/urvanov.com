// Схемы поста «Jest, Vitest и QUnit». Одна мысль на схему: общая задача и три характера, одна настройка вместо двух,
// где запускается QUnit, выбор двери. Цвета по ролям: серый — код и данные, синий — инструмент, оранжевый — лишнее и риск.
import { type Scene, A, M, W } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Где живёт каждый движок и в чём отличие: Jest отдельной программой рядом, Vitest внутри сборщика сайта, QUnit в браузере и на сервере
  common: {
    ru: 'Jest стоит отдельной программой рядом с проектом, Vitest встроен в сборщик сайта Vite, QUnit запускается и в браузере, и на сервере',
    en: 'Jest stands as a separate program next to the project, Vitest is built into the Vite site builder, QUnit runs both in the browser and on a server',
    viewBox: [0, 0, 700, 340],
    draw: (c, l) => {
      c.text(350, 22, l('Один и тот же тест, но три разных места жизни', 'The same test, but three different places to live'), M, { size: 13.5, w: 800 })
      const j = c.iso(117, 128, 30); j.tile(-1.5, -1.5, 3, 3); j.box(-1.0, -0.8, 0, 1.2, 1.2, 1.1, M, 0.85); j.cyl(0.8, 0.6, 0, 0.62, 1.0, M); j.path([[0.3, -0.2], [0.5, 0.2]], M, { w: 2.4 })
      const v = c.iso(350, 128, 30); v.tile(-1.5, -1.5, 3, 3); v.pad(0, 0, A, 1.3, 0.28); v.cyl(0, 0, 0, 0.8, 1.2, A)
      const q = c.iso(583, 128, 30); q.tile(-1.5, -1.5, 3, 3); q.panel(-1.3, -1.1, 1.6, 1.5, M, undefined, 2, true); q.cyl(0.8, 0.7, 0, 0.62, 1.0, M)
      const cols: [number, string, string, string, string, string, string][] = [
        [117, 'Jest', 'отдельная программа', 'a separate program', 'рядом с проектом', 'next to the project', 'всё нужное в комплекте'],
        [350, 'Vitest', 'встроен в сборщик', 'built into the builder', 'сайта Vite', 'of the Vite site', 'настройки общие'],
        [583, 'QUnit', 'идёт в браузере', 'runs in the browser', 'и на сервере', 'and on a server', 'лёгкий, без настроек'],
      ]
      for (const [x, n, l1, l1e, l2, l2e, l3] of cols) {
        const col = n === 'Vitest' ? A : M
        c.text(x, 236, n, col, { size: 16, w: 800 }); c.text(x, 258, l(l1, l1e), col, { size: 12.5, w: 700 }); c.text(x, 275, l(l2, l2e), col, { size: 12.5, w: 700 })
        c.text(x, 301, l(l3, ({ 'всё нужное в комплекте': 'everything in the kit', 'настройки общие': 'shared setup', 'лёгкий, без настроек': 'light, no setup' } as Record<string, string>)[l3]), M, { size: 11.5, w: 600 })
      }
      c.line([[233, 52], [233, 316]], M, { w: 1.2, dash: '4 5', op: 0.45 }); c.line([[467, 52], [467, 316]], M, { w: 1.2, dash: '4 5', op: 0.45 })
    },
  },
  // Настройки: нужно поменять правила сборки. Jest правят в двух местах, Vitest в одном, у QUnit настроек почти нет
  vite: {
    ru: 'Когда меняют правила сборки, у Jest правку вносят в две настройки, у Vitest в одну общую, а у QUnit настроек почти нет, править нечего',
    en: 'When the build rules change, Jest needs the edit in two setups, Vitest in one shared setup, and QUnit has almost no setup, so there is nothing to edit',
    viewBox: [0, 0, 700, 330],
    draw: (c, l) => {
      c.text(350, 22, l('Нужно поменять правила сборки: сколько мест править?', 'The build rules must change: how many places to edit?'), M, { size: 13.5, w: 800 })
      const edit = (x: number, col: string, ru: string, en: string) => {
        c.pen(x, 78, col); c.arrow(x, 96, x, 118, col, { w: 2.2 })
        const i = c.iso(x, 160, 16); i.tile(-1.4, -1.4, 2.8, 2.8); i.doc(-0.8, -0.6, 0, 1.6, 1.2, col === W ? M : col, 3)
        c.text(x, 204, l(ru, en), col === W ? M : col, { size: 12, w: 700 })
      }
      // Jest: два места
      edit(50, W, 'для сайта', 'for the site'); edit(170, W, 'для тестов', 'for the tests')
      c.badge(110, 40, W, '×2', { r: 13, size: 11 })
      // Vitest: одно место
      edit(350, A, 'общие настройки Vite', 'shared Vite setup'); c.badge(386, 62, A, '×1', { r: 13, size: 11 })
      // QUnit: почти нет
      c.pen(560, 78, M); c.badge(596, 62, M, '×0', { r: 13, size: 11 })
      const q = c.iso(590, 160, 16); q.tile(-1.4, -1.4, 2.8, 2.8, { dash: '4 3' }); q.zone(-0.9, -0.7, 1.8, 1.4, M, { op: 0.12 })
      c.text(590, 204, l('настроек почти нет', 'almost no setup'), M, { size: 12, w: 700 })
      c.text(110, 262, 'Jest', M, { size: 15, w: 800 }); c.text(110, 284, l('правку вносят дважды', 'the edit is made twice'), W, { size: 12.5, w: 800 })
      c.text(350, 262, 'Vitest', A, { size: 15, w: 800 }); c.text(350, 284, l('правку вносят один раз', 'the edit is made once'), A, { size: 12.5, w: 800 })
      c.text(590, 262, 'QUnit', M, { size: 15, w: 800 }); c.text(590, 284, l('править нечего', 'nothing to edit'), M, { size: 12.5, w: 800 })
      c.line([[235, 44], [235, 300]], M, { w: 1.2, dash: '4 5', op: 0.45 }); c.line([[470, 44], [470, 300]], M, { w: 1.2, dash: '4 5', op: 0.45 })
    },
  },
  // QUnit запускается там, где есть JavaScript
  'qunit-env': {
    ru: 'QUnit запускается там, где есть JavaScript: в браузере, в Node.js и в фоновом потоке страницы',
    en: 'QUnit runs wherever there is JavaScript: in the browser, in Node.js and in a background thread of a page',
    viewBox: [0, 0, 700, 290],
    draw: (c, l) => {
      const q = c.iso(130, 140, 24); q.tile(-1.5, -1.5, 3, 3); q.cyl(0, 0, 0, 0.9, 1.1, M)
      c.text(130, 202, 'QUnit', M, { size: 15, w: 800 })
      const env: [number, string, string, 'panel' | 'cyl' | 'box'][] = [[60, 'браузер', 'a browser', 'panel'], [145, 'Node.js', 'Node.js', 'cyl'], [230, 'фоновый поток страницы', 'a background thread of a page', 'box']]
      env.forEach(([y, ru, en, kind]) => {
        const i = c.iso(400, y, 15); i.tile(-1.3, -1.3, 2.6, 2.6)
        if (kind === 'panel') i.panel(-1.0, -0.8, 2.0, 1.6, A, undefined, 2, true); else if (kind === 'cyl') i.cyl(0, 0, 0, 0.7, 0.9, A); else i.box(-0.5, -0.5, 0, 1.0, 1.0, 0.7, A)
        c.text(470, y + 4, l(ru, en), A, { size: 13, w: 800, anchor: 'start' })
        c.arrow(200, 140, 350, y, M, { w: 2, op: 0.8 })
      })
    },
  },
  // Выбор: три двери и условия
  choose: {
    ru: 'Если проект уже на Vite, берут Vitest; если Jest уже есть и работает, его оставляют; если нужны проверки в браузере без сборки, берут QUnit',
    en: 'If the project is already on Vite, take Vitest; if Jest is already there and works, keep it; if you need checks in the browser without a build, take QUnit',
    viewBox: [0, 0, 700, 330],
    draw: (c, l) => {
      const h = c.iso(350, 50, 18); h.tile(-1, -1, 2, 2); h.person(0, 0, M, '')
      c.badge(392, 36, M, '?', { r: 10 })
      const doors: [number, string, string, string, string, string, string][] = [
        [120, 'Jest', 'Jest', 'Jest уже есть', 'Jest is already there', 'и всё работает', 'and everything works'],
        [350, 'Vitest', 'Vitest', 'проект уже на Vite', 'the project is on Vite', 'настройки общие', 'one shared setup'],
        [580, 'QUnit', 'QUnit', 'проверки в браузере', 'checks in the browser', 'без сборки', 'without a build'],
      ]
      for (const [x, n, , d1, d1e, d2, d2e] of doors) {
        const col = n === 'Vitest' ? A : M
        const i = c.iso(x, 176, 22); i.tile(-1.5, -1.5, 3, 3); i.door(0, 0, 1.3, col)
        c.text(x, 238, n, col, { size: 14, w: 800 }); c.text(x, 258, l(d1, d1e), M, { size: 12, w: 700 }); c.text(x, 276, l(d2, d2e), M, { size: 12, w: 600 })
        c.arrow(350 + (x - 350) * 0.3, 96, x, 118, col === A ? A : M, { w: 1.8, op: col === A ? 1 : 0.6 })
      }
    },
  },
}
export default scenes
