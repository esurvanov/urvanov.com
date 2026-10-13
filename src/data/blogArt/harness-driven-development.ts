// Схемы поста «Harness-driven development» (цвета задаёт CSS поста по классам)
import { type Scene, marker } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Петля: задача → агент → результат → датчики; ошибка → новое правило в харнессе → следующая задача
  loop: {
    ru: 'Петля: задача, агент, результат, датчики; если найдена ошибка — новое правило в харнессе, и следующая задача идёт уже с ним', en: 'Loop: task, agent, result, sensors; if a mistake is found, a new rule goes into the harness and the next task runs with it',
    viewBox: [0, 0, 900, 400],
    legend: false,
    cls: 'lp',
    style: '',
    draw: (c, l) => {
      c.title(l('Задача → агент → результат → датчики → ошибка → правило в харнессе → следующая задача', 'Task → agent → result → sensors → mistake → rule in the harness → next task'))
      c.defs(marker('lp-ar', { cls: 'lp-arh' }))
      c.box(250, 20, 400, 360, { cls: 'lp-h', rx: 28 })
      c.label(450, 52, l('харнесс', 'harness'), { cls: 'lp-ht', anchor: 'middle' })
      const node = (x: number, y: number, w: number, h: number, t: string, cls = '') => {
        c.box(x, y, w, h, { cls: `lp-n${cls ? ' ' + cls : ''}`, rx: 8 })
        c.label(x + w / 2, y + 36, t, { cls: 'lp-t', anchor: 'middle' })
      }
      node(30, 165, 150, 60, l('Задача', 'Task'))
      node(300, 80, 150, 60, l('Агент', 'Agent'), 'key')
      node(720, 80, 150, 60, l('Результат', 'Result'))
      node(520, 165, 150, 60, l('Датчики', 'Sensors'), 'sen')
      c.box(300, 280, 200, 64, { cls: 'lp-n rule', rx: 8 })
      c.label(400, 310, l('Новое правило', 'New rule'), { cls: 'lp-t', anchor: 'middle' })
      c.label(400, 331, l('инструкция · тест · хук', 'instruction · test · hook'), { cls: 'lp-s', anchor: 'middle' })
      c.circ(795, 290, 26, { cls: 'lp-ok' })
      c.edge('M783,290 l8,8 l16,-17', { cls: 'lp-okm' })
      const e = (d: string, cls = '') => c.edge(d, { cls: `lp-e${cls ? ' ' + cls : ''}`, marker: 'lp-ar' })
      const el = (x: number, y: number, t: string, anchor: 'start' | 'middle' | 'end', cls = '') => c.label(x, y, t, { cls: `lp-el${cls ? ' ' + cls : ''}`, anchor })
      e('M180,195 C 230,195 250,110 298,110')
      e('M450,110 L718,110')
      el(585, 100, l('делает', 'produces'), 'middle')
      e('M760,140 C 740,170 700,190 672,195')
      el(742, 180, l('проверить', 'check'), 'start')
      e('M670,210 C 720,250 750,270 767,282', 'ok')
      el(712, 262, l('прошло', 'passed'), 'end', 'ok')
      e('M560,225 C 540,270 520,300 502,308', 'bad')
      el(555, 270, l('ошибка', 'mistake'), 'start', 'bad')
      e('M340,280 C 330,230 350,170 370,142', 'fix')
      el(372, 236, l('больше не повторится', "won't happen again"), 'start', 'fix')
    },
  },
  // Одна ошибка, три уровня исправления (промпт, контекст, харнесс) и как исправление держится в запусках 1–4
  'fix-levels': {
    ru: 'Одна ошибка — агент правит код и не запускает тесты — и три способа её исправить: в промпте, в контексте и в харнессе. В следующих запусках исправление работает только при починке харнесса', en: 'One mistake, the agent edits code and does not run the tests, and three ways to fix it: in the prompt, in the context and in the harness. In later runs the fix holds reliably only when it is made in the harness',
    viewBox: [0, 0, 960, 372],
    legend: false,
    style: '',
    draw: (c, l) => {
      c.box(20, 8, 920, 40, { cls: 'herr', rx: 20 })
      c.label(480, 34, l('ОДНА ОШИБКА · агент правит код и не запускает тесты', 'ONE MISTAKE · the agent edits code and does not run the tests'), { cls: 'hb herrt', anchor: 'middle' })
      c.label(40, 86, l('ЧТО МЕНЯЕМ', 'WHAT WE CHANGE'), { cls: 'hc0' })
      c.label(190, 86, l('КАК ЧИНИМ', 'HOW WE FIX IT'), { cls: 'hc0' })
      c.label(500, 86, l('ГДЕ ЖИВЁТ ИСПРАВЛЕНИЕ', 'WHERE THE FIX LIVES'), { cls: 'hc0' })
      c.label(772, 86, l('ЗАПУСК АГЕНТА', 'AGENT RUN'), { cls: 'hc0' })
      for (let i = 0; i < 4; i++) c.label(772 + 48 * i, 104, String(i + 1), { cls: 'hc0 hn1', anchor: 'middle' })
      const glyph = { ok: '✓', no: '✗', mid: '~' } as const
      const rows: [string, string, [string, string], [string, string], (keyof typeof glyph)[]][] = [
        [l('① Промпт', '① Prompt'), l('слова запроса', 'the request wording'), [l('Дописать в запрос:', 'Add to the request:'), l('«запусти тесты после правки»', '“run the tests after the edit”')], [l('Только в этом запросе:', 'Only in this request:'), l('следующий запрос начнётся заново', 'the next request starts from scratch')], ['ok', 'no', 'no', 'no']],
        [l('② Контекст', '② Context'), l('что знает модель', 'what the model knows'), [l('Записать в инструкцию проекта:', 'Write into the project instructions:'), l('«после правки запускай тесты»', '“run the tests after each edit”')], [l('В файле инструкций: модель читает,', 'In the instructions file: the model reads it,'), l('но выполнять не обязана', 'but is not forced to follow it')], ['ok', 'ok', 'mid', 'ok']],
        [l('③ Харнесс', '③ Harness'), l('среда вокруг агента', 'the agent’s environment'), [l('Поставить хук: тесты запускаются', 'Add a hook: the tests run on their own'), l('сами после каждой правки', 'after every edit')], [l('В среде: выполняется без участия', 'In the environment: runs without the model'), l('модели и блокирует результат при сбое', 'and blocks the result if it fails')], ['ok', 'ok', 'ok', 'ok']],
      ]
      rows.forEach(([name, sub, how, where, runs], i) => {
        const y = 118 + 76 * i, r = `r${i + 1}`
        c.box(20, y, 920, 66, { cls: `row ${r}`, rx: 10 })
        c.box(20, y, 6, 66, { cls: `bar ${r}`, rx: 3 })
        c.label(42, y + 30, name, { cls: 'hb' })
        c.label(42, y + 50, sub, { cls: 'hs' })
        how.forEach((t, j) => c.label(190, y + 28 + 19 * j, t, { cls: 'ht1' }))
        where.forEach((t, j) => c.label(500, y + 28 + 19 * j, t, { cls: 'ht2' }))
        runs.forEach((k, j) => {
          c.circ(772 + 48 * j, y + 33, 14, { cls: `ck ck-${k}` })
          c.label(772 + 48 * j, y + 38, glyph[k], { cls: `cg ck-${k}`, anchor: 'middle' })
        })
      })
      c.label(940, 360, l('✓ тесты запущены · ~ модель может пропустить · ✗ забыто', '✓ tests run · ~ the model may skip it · ✗ forgotten'), { cls: 'hs hleg', anchor: 'end' })
    },
  },
}
export default scenes
