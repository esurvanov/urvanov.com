import { color, defineBlock, icon, inline } from '../core'

// Этапы разговора (серия gruppy): колонки <b-gruppy-phase> с цветной шапкой и пунктами «что — зачем»
export default [
  defineBlock({
    tag: 'gruppy-phases',
    title: 'Этапы разговора',
    doc: 'Ряд колонок <b-gruppy-phase>: четыре в ряд, на планшете две, на телефоне одна.',
    render: ({ children }) => `<div class="bk-gruppy-phases-gtl">${children.trim()}</div>`,
    example: {
      ru: '<b-gruppy-phases>\n  <b-gruppy-phase icon="list-dotted" color="c-chat" t="Задача">\n    <item t="Последняя рабочая задача">Что нужно было получить и для кого</item>\n  </b-gruppy-phase>\n  <b-gruppy-phase icon="trend-up" color="c-work" t="Удачный случай">\n    <item t="Когда получилось хорошо">Что тогда было иначе</item>\n  </b-gruppy-phase>\n</b-gruppy-phases>',
      en: '<b-gruppy-phases>\n  <b-gruppy-phase icon="list-dotted" color="c-chat" t="Task">\n    <item t="The latest work task">What had to be produced and for whom</item>\n  </b-gruppy-phase>\n  <b-gruppy-phase icon="trend-up" color="c-work" t="A good case">\n    <item t="When it went well">What was different then</item>\n  </b-gruppy-phase>\n</b-gruppy-phases>',
    },
  }),
  defineBlock({
    tag: 'gruppy-phase',
    title: 'Этап разговора',
    doc: 'Колонка внутри <b-gruppy-phases>: цветная шапка со значком и пункты <item>.',
    attrs: {
      icon: { doc: 'значок в шапке', required: true },
      color: { doc: 'цвет шапки: токен или CSS-цвет', required: true },
      t: { doc: 'название этапа', required: true },
    },
    slots: { item: { doc: 'пункт; внутри — пояснение', required: true, attrs: { t: { doc: 'что узнать', required: true } } } },
    render: ({ attrs, slots }) => `<div class="bk-gruppy-phases"><div class="bk-gruppy-phases-h" style="background:${color(attrs.color)}">${icon(attrs.icon, '2.2')}${attrs.t}</div><ul>${slots.item.map((s) =>
      `<li><b>${s.attrs.t}</b><span>${inline(s.html)}</span></li>`).join('')}</ul></div>`,
    example: {
      ru: '<b-gruppy-phase icon="log-out" color="c-code" t="Отказ и переключение">\n  <item t="Бросали или меняли инструмент">На что перешли и почему</item>\n</b-gruppy-phase>',
      en: '<b-gruppy-phase icon="log-out" color="c-code" t="Dropping and switching">\n  <item t="Dropped or switched a tool">What they moved to and why</item>\n</b-gruppy-phase>',
    },
  }),
]
