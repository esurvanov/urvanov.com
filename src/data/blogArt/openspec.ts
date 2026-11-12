// Схемы поста «Что такое OpenSpec». Цвета по словарю сайта: серый — люди и данные, синий — агент и программы, оранжевый — риск
import { type Scene, A, M, W } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Было/стало: замысел живёт в чате и теряется → замысел лежит файлами рядом с кодом, агент и человек читают одно и то же
  'chat-vs-files': {
    ru: 'Слева план живёт в переписке с агентом: через неделю непонятно, почему код сделан так. Справа план лежит файлами рядом с кодом: человек проверяет его, агент пишет по нему код',
    en: 'On the left the plan lives in a chat with the agent: a week later nobody knows why the code is the way it is. On the right the plan sits in files next to the code: a person reviews it, the agent writes code from it',
    viewBox: [0, 0, 700, 270],
    draw: (c, l) => {
      c.caps(175, 20, l('ПЛАН В ЧАТЕ', 'PLAN IN A CHAT'), W)
      c.caps(525, 20, l('ПЛАН В ФАЙЛАХ', 'PLAN IN FILES'), A)
      // Слева: человек и агент переписываются, план — в облачках, код получился, через неделю «почему?»
      const a = c.iso(175, 150, 24)
      a.tile(-2.8, -2.8, 5.6, 5.6)
      a.person(-1.7, 1.2, M, '')
      a.agent(1.0, -1.6, A, 0.9, '')
      for (let k = 0; k < 2; k++) a.doc(0.9, 0.7, k * 0.22, 1.3, 1.0, A, 3)
      c.bubble(92, 62, 78, 24, M, { tail: [18, 6, 9, 12] })
      c.text(131, 78, l('сделай так…', 'do it like…'), M, { size: 10.5, w: 700 })
      c.bubble(168, 40, 70, 24, M, { op: 0.55, tail: [18, 6, 9, 12] })
      c.text(203, 56, l('а ещё…', 'and also…'), M, { size: 10.5, w: 700, op: 0.6 })
      c.badge(316, 100, W, '?', { r: 12, size: 15 })
      c.text(316, 128, l('через неделю:', 'a week later:'), W, { size: 10.5, w: 700 })
      c.text(316, 142, l('почему так?', 'why like this?'), W, { size: 10.5, w: 700 })
      c.text(208, 232, l('код', 'code'), A, { size: 11, w: 700 })
      c.text(110, 222, l('вы', 'you'), M, { size: 11, w: 700 })
      // Справа: стопка файлов плана рядом с кодом, человек смотрит план, агент пишет код по плану
      const b = c.iso(525, 150, 24)
      b.tile(-2.8, -2.8, 5.6, 5.6, { edge: A })
      for (let k = 0; k < 4; k++) b.doc(-2.0, -1.4, k * 0.22, 1.5, 1.1, M, 3)
      for (let k = 0; k < 2; k++) b.doc(0.9, 0.7, k * 0.22, 1.3, 1.0, A, 3)
      b.agent(1.4, -1.8, A, 0.8, '')
      b.person(-1.9, 1.4, M, '')
      c.eye(452, 196, M)
      c.text(468, 62, l('план: зачем, что, как, шаги', 'plan: why, what, how, steps'), M, { size: 10.5, w: 700 })
      c.text(580, 236, l('код по плану', 'code from the plan'), A, { size: 11, w: 700 })
      c.text(456, 226, l('вы проверяете', 'you review'), M, { size: 11, w: 700 })
    },
  },
  // Установка: программа на компьютере → папка openspec/ в проекте → команды у агентов
  install: {
    ru: 'Программа openspec ставится один раз на компьютер. Команда openspec init создаёт в проекте папку openspec с действующими спеками и изменениями и добавляет агентам скиллы OpenSpec',
    en: 'The openspec program is installed once per computer. The openspec init command creates an openspec folder with live specs and changes in the project and adds OpenSpec skills to the agents',
    viewBox: [0, 0, 700, 250],
    draw: (c, l) => {
      c.caps(110, 22, l('1. КОМПЬЮТЕР', '1. COMPUTER'), A)
      c.caps(350, 22, l('2. ПРОЕКТ', '2. PROJECT'), A)
      c.caps(590, 22, l('3. АГЕНТЫ', '3. AGENTS'), A)
      // Компьютер с терминалом
      const p = c.iso(110, 135, 24)
      p.tile(-1.9, -1.9, 3.8, 3.8)
      p.monitor(0, 0, 1.4, A)
      c.text(110, 212, l('установка openspec', 'install openspec'), A, { size: 11, w: 700 })
      c.text(110, 227, l('один раз', 'once'), M, { size: 10.5, w: 600 })
      // Проект: папка openspec/ с двумя подпапками
      const f = c.iso(350, 135, 24)
      f.tile(-2.2, -2.2, 4.4, 4.4, { edge: A })
      f.doc(-1.4, -1.0, 0, 1.3, 1.0, M, 3)
      f.doc(-1.4, -1.0, 0.22, 1.3, 1.0, M, 3)
      f.doc(0.4, 0.3, 0, 1.3, 1.0, M, 2)
      f.doc(0.4, 0.3, 0.22, 1.3, 1.0, M, 2)
      c.text(398, 110, 'specs', M, { size: 11, w: 700, halo: true })
      c.text(304, 168, 'changes', M, { size: 11, w: 700, halo: true })
      c.text(350, 212, 'openspec init', A, { size: 11, w: 700 })
      c.text(350, 227, l('папка openspec/ в проекте', 'an openspec/ folder in the project'), M, { size: 10.5, w: 600 })
      // Агенты с новыми командами
      const g = c.iso(590, 135, 24)
      g.tile(-1.9, -1.9, 3.8, 3.8)
      g.agent(-0.9, -0.5, A, 0.8, '')
      g.agent(0.6, 0.7, A, 0.8, '')
      c.pill(536, 62, 110, 20, A, { fillOp: 0.12 })
      c.text(591, 76, '/openspec-propose', A, { size: 10, w: 700 })
      c.text(590, 212, l('скиллы у агентов', 'skills in the agents'), A, { size: 11, w: 700 })
      c.text(590, 227, 'Claude Code · Codex · Cursor', M, { size: 10.5, w: 600 })
      c.arrow(186, 135, 262, 135, A, { w: 1.6, dash: '4 4' })
      c.arrow(438, 135, 516, 135, A, { w: 1.6, dash: '4 4' })
    },
  },
  // Круг из трёх команд: план → ваша проверка → код → слияние в спеки → следующее изменение
  loop: {
    ru: 'Круг работы: агент пишет план, вы его проверяете, агент пишет код по задачам, затем требования вливаются в общие спеки, и следующее изменение начинается уже от них',
    en: 'The work loop: the agent writes a plan, you review it, the agent writes code by the tasks, then the requirements merge into the shared specs, and the next change starts from them',
    viewBox: [0, 0, 700, 360],
    draw: (c, l) => {
      const st = (x: number, y: number, n: number, t: string, sub: string, draw: (I: ReturnType<typeof c.iso>) => void, edge = M) => {
        const I = c.iso(x, y, 22); I.tile(-1.7, -1.7, 3.4, 3.4, { edge }); draw(I)
        c.stepTag(x - 70, y - 68, n, t, A)
        c.text(x, y + 60, sub, M, { size: 10.5, w: 600 })
      }
      st(175, 95, 1, '/openspec-propose', l('агент пишет план', 'the agent writes a plan'), (I) => { for (let k = 0; k < 3; k++) I.doc(-0.7, -0.5, k * 0.22, 1.4, 1.0, M, 3) })
      st(525, 95, 2, l('проверка', 'review'), l('вы читаете и правите план', 'you read and edit the plan'), (I) => { I.person(-0.5, 0.3, M, ''); I.doc(0.3, -0.9, 0, 1.1, 0.8, M, 2) })
      st(525, 280, 3, '/openspec-apply-change', l('агент пишет код по задачам', 'the agent writes code by the tasks'), (I) => { I.agent(-0.9, -0.6, A, 0.8, ''); I.doc(0.2, 0.2, 0, 1.2, 0.9, A, 3); I.doc(0.2, 0.2, 0.22, 1.2, 0.9, A, 3) }, A)
      st(175, 280, 4, '/openspec-archive-change', l('требования вливаются в спеки', 'requirements merge into the specs'), (I) => { I.cyl(0, 0, 0, 0.7, 0.9, M) })
      c.arrow(262, 88, 438, 88, A, { w: 1.6, dash: '4 4' })
      c.arrow(600, 166, 600, 200, A, { w: 1.6, dash: '4 4' })
      c.arrow(438, 277, 262, 277, A, { w: 1.6, dash: '4 4' })
      c.arrow(250, 200, 250, 166, A, { w: 1.6, dash: '4 4' })
      c.text(350, 182, l('следующее изменение', 'the next change'), A, { size: 11, w: 700 })
      c.text(350, 197, l('начинается от свежих спек', 'starts from fresh specs'), A, { size: 10.5, w: 600 })
    },
  },
}

export default scenes
