import { attr, color, defineBlock, icon, inline } from '../core'

// Группы респондентов (серия gruppy): значок на цветной плашке, название, критерий отбора, что проверяем и кто попал.
// Приставка «Проверяем:» ставится стилем (::before), поэтому в тексте страницы её нет — как было в посте
export default defineBlock({
  tag: 'gruppy-groups',
  title: 'Группы респондентов',
  doc: 'Карточки групп в две колонки: значок цвета группы, название, порог отбора, вопрос и имена.',
  slots: {
    group: {
      doc: 'группа; внутри — что она помогает проверить',
      required: true,
      attrs: {
        icon: { doc: 'значок', required: true },
        color: { doc: 'цвет плашки: токен или CSS-цвет', required: true },
        t: { doc: 'название', required: true },
        c: { doc: 'критерий отбора (моноширинной плашкой)', required: true },
        p: { doc: 'кто попал: имена', required: true },
      },
    },
  },
  render: ({ slots, l }) => `<div class="bk-gruppy-groups">${slots.group.map((s) =>
    `<div class="bk-gruppy-groups-g"><span class="bk-gruppy-groups-ico" style="background:${color(s.attrs.color)}">${icon(s.attrs.icon, '2.2')}</span><div><div class="bk-gruppy-groups-t">${s.attrs.t}</div><span class="bk-gruppy-groups-c">${s.attrs.c}</span><div class="bk-gruppy-groups-q" data-k="${attr(l('Проверяем: ', 'Testing: '))}">${inline(s.html)}</div><div class="bk-gruppy-groups-p">${s.attrs.p}</div></div></div>`).join('')}</div>`,
  example: {
    ru: '<b-gruppy-groups>\n  <group icon="code-alt" color="c-code" t="Самые активные в коде" c="код &gt; $200 / 3 мес" p="Hana Sato, Luis Moreno">чего не хватает в разработке</group>\n  <group icon="slash" color="c-none" t="Неактивные" c="0 сообщ. и $0 за период" p="Pavel Novak, Sara Quinn">как решают свои задачи</group>\n</b-gruppy-groups>',
    en: '<b-gruppy-groups>\n  <group icon="code-alt" color="c-code" t="Most active in code" c="code &gt; $200 / 3 mo" p="Hana Sato, Luis Moreno">what is missing in development</group>\n  <group icon="slash" color="c-none" t="Inactive" c="0 msgs and $0 for the period" p="Pavel Novak, Sara Quinn">how they solve their tasks</group>\n</b-gruppy-groups>',
  },
})
