// Схемы поста «Промпты для работы: примеры» (цвета задаёт CSS поста по классам dm-*)
import { type Scene, marker } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Карта: задача → промпт из шести частей (данные из источников целиком) → модель → ответ → получатель; проверка уточняет промпт, удачный — в шаблон
  'prompt-map': {
    ru: 'Схема: задача описывается промптом из шести частей, данные из источников попадают в него целиком, модель даёт ответ, получатель принимает по нему решение, проверка возвращает к уточнению промпта, удачный промпт сохраняется шаблоном в проекте и используется для следующей задачи',
    en: 'Diagram: a task is described by a six-part prompt, data from sources goes into it whole, the model answers, the reader makes a decision, a check loops back to refine the prompt, a good prompt is saved as a template in a project and reused for the next task',
    viewBox: [0, 0, 980, 410], legend: false, cls: 'dm', style: '',
    draw: (c, l) => {
      c.title(l('Схема: задача описывается промптом из шести частей, данные из источников попадают в него целиком, модель даёт ответ, получатель принимает по нему решение, проверка возвращает к уточнению промпта, удачный промпт сохраняется шаблоном в проекте и используется для следующей задачи',
        'Diagram: a task is described by a six-part prompt, data from sources goes into it whole, the model answers, the reader makes a decision, a check loops back to refine the prompt, a good prompt is saved as a template in a project and reused for the next task'))
      c.defs(marker('dm-ar', { cls: 'dm-arh' }))
      c.box(200, 16, 300, 286, { cls: 'dm-box', rx: 8 })
      c.label(220, 44, l('Промпт', 'Prompt'), { cls: 'dm-bt' })
      // шесть частей промпта: синяя полоска слева бледнеет сверху вниз
      const parts = [l('Роль', 'Role'), l('Кому и зачем', 'Audience and goal'), l('Данные целиком', 'The whole data'), l('Пример · 1–3', 'Example · 1–3'), l('Формат', 'Format'), l('Вопрос в конце', 'Question last')]
      parts.forEach((t, i) => {
        const y = 58 + 38 * i, op = +(1 - 0.12 * i).toFixed(2)
        c.box(218, y, 264, 30, { cls: 'dm-p', rx: 4 })
        c.box(218, y, 6, 30, { rx: 2, style: `fill:var(--accent)${i ? `;fill-opacity:${op}` : ''}` })
        c.label(236, y + 20, t, { cls: 'dm-pt' })
      })
      const node = (x: number, y: number, w: number, h: number, t: string, cls = '') => {
        c.box(x, y, w, h, { cls: `dm-n${cls ? ' ' + cls : ''}`, rx: 6 })
        c.label(x + w / 2, y + h / 2 + 5, t, { cls: 'dm-t', anchor: 'middle' })
      }
      node(20, 70, 140, 52, l('Задача', 'Task'), 'key')
      node(12, 336, 176, 52, l('Шаблон в проекте', 'Template in a project'))
      node(560, 70, 120, 52, l('Модель', 'Model'))
      node(720, 70, 110, 52, l('Ответ', 'Answer'))
      node(860, 70, 110, 52, l('Получатель', 'Reader'))
      node(860, 172, 110, 46, l('Решение', 'Decision'))
      node(720, 172, 110, 46, l('Проверка', 'Check'))
      c.box(220, 336, 260, 52, { cls: 'dm-n', rx: 6 })
      c.label(350, 360, l('Источники', 'Sources'), { cls: 'dm-t', anchor: 'middle' })
      c.label(350, 377, l('переписка · документ · таблица', 'thread · document · table'), { cls: 'dm-s', anchor: 'middle' })
      const e = (d: string, cls = '') => c.edge(d, { cls: `dm-e${cls ? ' ' + cls : ''}`, marker: 'dm-ar' })
      const el = (x: number, y: number, t: string, anchor: 'start' | 'middle' | 'end', cls = '') => c.label(x, y, t, { cls: `dm-el${cls ? ' ' + cls : ''}`, anchor })
      e('M160,96 L198,96'); el(194, 62, l('описывает', 'describes'), 'end')
      e('M500,96 L558,96'); el(508, 62, l('отправить', 'send'), 'start')
      e('M680,96 L718,96'); el(699, 62, l('отвечает', 'answers'), 'middle')
      e('M830,96 L858,96')
      e('M915,122 L915,170'); el(922, 150, l('принимает', 'makes'), 'start')
      e('M775,122 L775,170'); el(782, 150, l('сверить', 'check'), 'start')
      e('M720,206 C 640,206 600,250 502,250', 'dash bad'); el(610, 268, l('не подошло — уточнить', 'missed — refine'), 'middle', 'bad')
      e('M350,336 L350,304'); el(358, 324, l('целиком', 'whole'), 'start')
      e('M200,280 C 140,300 110,310 100,334'); el(150, 314, l('сохранить', 'save'), 'end')
      e('M36,336 C 10,260 10,180 40,124', 'dash'); el(34, 236, l('следующая задача', 'next task'), 'start')
      el(845, 62, l('читает', 'reads'), 'middle')
    },
  },
}
export default scenes
