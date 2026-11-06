// Схемы поста «Теорема Райса простыми словами». Развилка CAP и проверки: пока время не ограничено, есть ровно два
// взаимоисключающих выхода — ждать или ответить сейчас; ограничение времени снимает саму развилку.
// Цвета по ролям: серый — данные и вопрос, синий — проверка и верный ответ, оранжевый — риск (нет ответа или неверный ответ).
import { type Scene, A, M, W } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  'cap-fork': {
    ru: 'Пока время ожидания не ограничено, выход один из двух: ждать и, возможно, не ответить никогда, или ответить сейчас и, возможно, ошибиться. Ограничение времени снимает саму развилку: после предела «никогда» становится известно',
    en: 'While waiting time is unbounded there is one of two ways out: wait and maybe never answer, or answer now and maybe be wrong. Bounding the time removes the fork itself: after the limit, “never” becomes known',
    viewBox: [0, 0, 700, 400],
    draw: (c, l) => {
      // Верх: вопрос при неограниченном времени
      c.text(350, 22, l('время ожидания не ограничено', 'waiting time is unbounded'), M, { size: 12, w: 700 })
      c.card(215, 34, 270, 56, M, { lines: [{ t: l('пришёл ли ответ соседа?', 'has the neighbour answered?'), dy: 23, size: 12.5, w: 800 }, { t: l('закончится ли программа?', 'will the program finish?'), dy: 42, size: 12.5, w: 800 }] })
      c.arrow(300, 92, 175, 130, M, { w: 2 }); c.arrow(400, 92, 525, 130, M, { w: 2 })
      c.text(350, 122, l('выбрать одно из двух', 'pick one of two'), M, { size: 11, w: 700 })
      // Две взаимоисключающие ветки
      c.card(30, 134, 290, 92, W, { lines: [{ t: l('ждать', 'wait'), dy: 24, size: 14, w: 800 }, { t: l('ответ будет верным,', 'the answer will be right,'), dy: 48, size: 11.5, w: 600 }, { t: l('но может не прийти никогда', 'but it may never come'), dy: 66, size: 11.5, w: 700 }] })
      c.card(380, 134, 290, 92, W, { lines: [{ t: l('ответить сейчас', 'answer now'), dy: 24, size: 14, w: 800 }, { t: l('ответ есть всегда,', 'there is always an answer,'), dy: 48, size: 11.5, w: 600 }, { t: l('но может быть неверным', 'but it may be wrong'), dy: 66, size: 11.5, w: 700 }] })
      c.text(350, 186, '×', W, { size: 22, w: 800 })
      c.text(350, 244, l('одно исключает другое', 'one rules out the other'), W, { size: 11.5, w: 700 })
      // Низ: ограничить время — меняет условие, развилки нет
      c.line([[30, 262], [670, 262]], M, { w: 1, op: 0.4, dash: '3 5' })
      c.text(350, 284, l('или изменить само условие', 'or change the condition itself'), A, { size: 12, w: 800 })
      c.card(110, 298, 480, 86, A, { lines: [{ t: l('ограничить время: ждать не дольше предела', 'bound the time: wait no longer than a limit'), dy: 26, size: 13, w: 800 }, { t: l('после предела «никогда» уже известно —', 'after the limit, “never” is already known,'), dy: 50, size: 11.5, w: 600 }, { t: l('ответ и приходит, и верный', 'so the answer both comes and is right'), dy: 68, size: 11.5, w: 700 }] })
    },
  },
}

export default scenes
