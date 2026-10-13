// Схемы поста «Требования: источники, факты, предположения»
import { type Scene, A, M, W } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Три пометки к пункту: источник, предположение модели, статус факта
  marks: {
    ru: 'Три пометки к каждому пункту: источник, предположение модели и статус факта', en: 'Three marks on every item: the source, the model’s assumption and the fact status',
    viewBox: [0, 0, 700, 236],
    draw: (c, l) => {
      const i1 = c.iso(120, 128, 26)
      i1.tile(-1.5, -1.5, 3, 3)
      i1.doc(-0.7, -0.55, 0, 1.4, 1.1, A, 3)
      const i2 = c.iso(350, 128, 26)
      i2.tile(-1.5, -1.5, 3, 3)
      i2.doc(-0.7, -0.55, 0, 1.4, 1.1, A, 3)
      const i3 = c.iso(580, 128, 26)
      i3.tile(-1.5, -1.5, 3, 3)
      i3.doc(-0.7, -0.55, 0, 1.4, 1.1, A, 3)
      c.badge(120, 64, A, '↗')
      c.badge(350, 64, W, '?')
      c.badge(580, 64, A, '✓')
      c.text(120, 196, l('Источник', 'Source'), A, { size: 12, w: 700 })
      c.text(120, 211, l('ссылка и цитата', 'link and quote'), M)
      c.text(350, 196, l('Предположение', 'Assumption'), W, { size: 12, w: 700 })
      c.text(350, 211, l('что додумала модель', 'what the model inferred'), M)
      c.text(580, 196, l('Статус', 'Status'), A, { size: 12, w: 700 })
      c.text(580, 211, l('факт или не факт', 'fact or not a fact'), M)
    },
  },
  // Запись встречи → агент → требования с пометками
  pipeline: {
    ru: 'Запись встречи проходит через агента и превращается в требования, где у каждого пункта есть источник, предположение и статус', en: 'A meeting record goes through the agent and becomes requirements where every item has a source, an assumption and a status',
    viewBox: [0, 0, 700, 240],
    draw: (c, l) => {
      const i1 = c.iso(110, 128, 26)
      i1.tile(-1.5, -1.5, 3, 3)
      i1.doc(0, -0.9, 0, 1, 0.8, M, 3)
      i1.person(-0.6, 0.5, M, '')
      const i2 = c.iso(350, 128, 26)
      i2.tile(-1.5, -1.5, 3, 3)
      i2.agent(-0.4, -0.4, A, 1, '')
      const i3 = c.iso(590, 128, 26)
      i3.tile(-1.5, -1.5, 3, 3)
      i3.doc(-0.8, -0.6, 0, 1.6, 1.2, A, 3, true)
      c.arrow(190, 134, 272, 134, A)
      c.arrow(430, 134, 512, 134, A)
      c.badge(560, 72, A, '↗', { r: 9 })
      c.badge(592, 64, W, '?', { r: 9 })
      c.badge(624, 72, A, '✓', { r: 9 })
      c.text(110, 200, l('Запись встречи', 'Meeting record'), M, { size: 12, w: 700 })
      c.text(110, 215, l('слова людей', 'what people said'), M)
      c.text(350, 200, l('Агент', 'Agent'), A, { size: 12, w: 700 })
      c.text(350, 215, l('разбирает и помечает', 'parses and marks'), M)
      c.text(590, 200, l('Требования', 'Requirements'), A, { size: 12, w: 700 })
      c.text(590, 215, l('с пометками', 'with marks'), M)
    },
  },
  // Требование раскладывается на три кейса, мажорная правка задевает один (баг)
  'use-cases': {
    ru: 'Одно требование раскладывается на кейсы использования, и мажорная правка затрагивает один из них', en: 'One requirement splits into use cases, and a major edit touches one of them',
    viewBox: [0, 0, 700, 318],
    draw: (c, l) => {
      const i1 = c.iso(110, 160, 26)
      i1.tile(-1.7, -1.7, 3.4, 3.4)
      i1.doc(-0.9, -0.7, 0, 1.8, 1.4, A, 3, true)
      const i2 = c.iso(430, 58, 26)
      i2.tile(-1.2, -1.2, 2.4, 2.4)
      i2.person(0, 0.1, M, '')
      const i3 = c.iso(430, 160, 26)
      i3.tile(-1.2, -1.2, 2.4, 2.4)
      c.bug(427.7, 156.3, M)
      const i4 = c.iso(430, 262, 26)
      i4.tile(-1.2, -1.2, 2.4, 2.4)
      i4.doc(-0.5, -0.4, 0, 1, 0.8, A, 2)
      c.arrow(190, 160, 352, 62, A, { w: 1.6, dash: '4 4' })
      c.arrow(190, 160, 352, 164, A, { w: 1.6, dash: '4 4' })
      c.arrow(190, 160, 352, 266, A, { w: 1.6, dash: '4 4' })
      c.text(110, 236, l('Требование', 'Requirement'), A, { size: 12, w: 700 })
      c.text(110, 251, l('«Оплата картой»', '“Card payment”'), M)
      c.text(520, 56, l('Обычная оплата', 'Normal payment'), A, { size: 12.5, w: 700, anchor: 'start' })
      c.text(520, 72, l('клиент платит с первого раза', 'the customer pays at once'), M, { size: 11.5, anchor: 'start' })
      c.text(520, 158, l('Отказ банка', 'Bank decline'), A, { size: 12.5, w: 700, anchor: 'start' })
      c.text(520, 174, l('ошибка и повтор', 'error and retry'), M, { size: 11.5, anchor: 'start' })
      c.text(520, 260, l('Повторный платёж', 'Repeat payment'), A, { size: 12.5, w: 700, anchor: 'start' })
      c.text(520, 276, l('защита от двойного списания', 'double-charge protection'), M, { size: 11.5, anchor: 'start' })
      c.badge(402, 262, W, '!', { r: 9 })
    },
  },
  // Версии требования: v1.0 → v1.1 (мелкая правка, смысл тот же) → v2.0 (меняет поведение)
  versions: {
    ru: 'Версии требования: мелкая правка меняет второе число, существенная меняет первое', en: 'Requirement versions: a small edit changes the second number, a significant one changes the first',
    viewBox: [0, 0, 700, 252],
    legend: false,
    draw: (c, l) => {
      const ver: [number, string, string, string, string][] = [
        [120, 'v1.0', M, l('Исходная версия', 'Original version'), ''],
        [350, 'v1.1', A, l('Минорное', 'Minor'), l('смысл тот же', 'same meaning')],
        [580, 'v2.0', W, l('Мажорное', 'Major'), l('меняет поведение', 'changes behavior')],
      ]
      for (const [x] of ver) {
        const i = c.iso(x, 140, 26)
        i.tile(-1.6, -1.6, 3.2, 3.2)
        i.box(-0.6, -0.6, 0, 1.2, 1.2, 0.9, M)
        // что добавила правка: маленький блок (минорная) или большой (мажорная)
        if (x === 350) i.box(-0.2, -0.2, 0.9, 0.4, 0.4, 0.4, A)
        if (x === 580) i.box(-0.55, -0.55, 0.9, 1.1, 1.1, 1.1, W)
      }
      c.arrow(190, 146, 280, 146, A)
      c.arrow(420, 146, 510, 146, A)
      for (const [x, v, col, name, sub] of ver) {
        c.text(x, 34, v, col, { size: 14, w: 700 })
        c.text(x, 214, name, col, { size: 12, w: 700 })
        if (sub) c.text(x, 229, sub, M)
      }
    },
  },
}
export default scenes
