import { defineBlock, icon } from '../core'

// Возможности среды агента: сверху пара «среда A ≈ среда B», ниже — карточки возможностей по три в ряд,
// у каждой — что будет без неё («без этого → …»)
export default defineBlock({
  tag: 'env-caps',
  title: 'Возможности среды',
  doc: 'Пара сред <side> через «≈» и карточки возможностей <cap> с последствием, если её нет.',
  slots: {
    side: {
      doc: 'среда в паре сверху; внутри — подпись под названием',
      attrs: { icon: { doc: 'значок', required: true }, t: { doc: 'название', required: true }, sw: { doc: 'толщина линии значка' } },
    },
    cap: {
      doc: 'возможность; внутри — что будет без неё',
      required: true,
      attrs: { icon: { doc: 'значок', required: true }, t: { doc: 'название', required: true } },
    },
  },
  render: ({ slots, l }) => {
    const pair = slots.side ? `<div class="bk-env-caps-pair">${slots.side.map((s) =>
      `<div class="bk-env-caps-pp">${icon(s.attrs.icon, s.attrs.sw)}<b>${s.attrs.t}</b><small>${s.html}</small></div>`).join('<span class="bk-env-caps-eq">≈</span>')}</div>` : ''
    return `${pair}<div class="bk-env-caps">${slots.cap.map((s) =>
      `<div class="bk-env-caps-c"><span class="bk-env-caps-i">${icon(s.attrs.icon)}</span><b>${s.attrs.t}</b><small><span>${l('без этого →', 'without it →')}</span> ${s.html}</small></div>`).join('')}</div>`
  },
  example: {
    ru: '<b-env-caps>\n  <side icon="hub" sw="1.6" t="кластер">среда контроллера</side>\n  <side icon="terminal-screen" sw="1.8" t="харнесс">среда агента</side>\n  <cap icon="play" t="Запуск кода">догадки вместо фактов</cap>\n  <cap icon="flask" t="Тесты">MUST не проверить</cap>\n  <cap icon="database" t="Тестовые данные">проверка на пустом</cap>\n</b-env-caps>',
    en: '<b-env-caps>\n  <side icon="hub" sw="1.6" t="cluster">the controller’s environment</side>\n  <side icon="terminal-screen" sw="1.8" t="harness">the agent’s environment</side>\n  <cap icon="play" t="Run code">guesses instead of facts</cap>\n  <cap icon="flask" t="Tests">MUST can’t be checked</cap>\n  <cap icon="database" t="Test data">checks on empty data</cap>\n</b-env-caps>',
  },
})
