import { attr, color, defineBlock } from '../core'

// Карта направлений в начале отчёта: карточки-ссылки на разделы. В карточке — номер и цветная метка, маленькая
// картинка (схема art или вложенные блоки: <b-mini-funnel>, <b-csv-check>, <b-dot-grid>), крупная цифра и решение
export default defineBlock({
  tag: 'dir-map',
  title: 'Карта направлений',
  doc: 'Карточки-ссылки на разделы: картинка, крупная цифра, какое решение даёт раздел.',
  attrs: { label: { doc: 'подпись для скринридера (aria-label)', required: true } },
  slots: {
    dir: {
      doc: 'карточка; внутри — картинка (блоки), если нет art',
      required: true,
      attrs: {
        href: { doc: 'ссылка на раздел', required: true },
        n: { doc: 'номер: 01', required: true },
        color: { doc: 'цвет метки', required: true },
        t: { doc: 'название раздела', required: true },
        big: { doc: 'крупная цифра', required: true },
        sub: { doc: 'подпись под цифрой', required: true },
        dec: { doc: 'какое решение даёт раздел', required: true },
        art: { doc: 'схема <iso-art> вместо вложенных блоков' },
      },
    },
  },
  render: ({ attrs, slots, l }) => `<div class="bk-dir-map-map" aria-label="${attr(attrs.label)}">${slots.dir.map((d) =>
    `<a class="bk-dir-map" href="${attr(d.attrs.href)}"><div class="bk-dir-map-h"><span class="bk-dir-map-n">${d.attrs.n}</span><i style="background:${color(d.attrs.color)}"></i>${d.attrs.t}</div>`
    + `<div class="bk-dir-map-viz">${d.attrs.art ? `<iso-art name="${attr(d.attrs.art)}"></iso-art>` : d.html}</div>`
    + `<div class="bk-dir-map-big">${d.attrs.big}<small>${d.attrs.sub}</small></div><div class="bk-dir-map-dec" data-k="${attr(l('Решение', 'Decision'))}">${d.attrs.dec}</div></a>`).join('')}</div>`,
  example: {
    ru: '<b-dir-map label="Направления анализа">\n  <dir href="#demo-chapter" n="01" color="c-chat" t="Общая картина" big="21%" sub="Пользуются каждую неделю" dec="Куда вкладывать обучение"><b-mini-funnel><seg w="82%" color="d-rare" ink="d-rare-t">82%</seg><seg w="47%" color="d-reg" ink="d-reg-t">47%</seg><seg w="21%" color="d-week" ink="d-week-t">21%</seg></b-mini-funnel></dir>\n  <dir href="#demo-chapter" n="02" color="c-work" t="Природа работы" big="70%" sub="Подключений дают Slack и Notion" dec="Какой инструмент покупать" art="chatgpt-enterprise-usage-report/map-donut"></dir>\n  <dir href="#demo-chapter" n="03" color="c-code" t="Проверка" big="±2%" sub="Допуск сверки выгрузок" dec="Можно ли верить цифрам"><b-csv-check><file color="c-chat">CHAT</file><file color="c-work">WORK</file><file color="c-code">CODEX</file></b-csv-check></dir>\n  <dir href="#demo-chapter" n="04" color="c-proj" t="Отбор людей" big="16" sub="Из 340 — на интервью" dec="С кем говорить до покупки"><b-dot-grid n="120" on="5,31,58,77,96"></b-dot-grid></dir>\n</b-dir-map>',
    en: '<b-dir-map label="Areas of analysis">\n  <dir href="#demo-chapter" n="01" color="c-chat" t="Big picture" big="21%" sub="Use it every week" dec="Where to invest in training"><b-mini-funnel><seg w="82%" color="d-rare" ink="d-rare-t">82%</seg><seg w="47%" color="d-reg" ink="d-reg-t">47%</seg><seg w="21%" color="d-week" ink="d-week-t">21%</seg></b-mini-funnel></dir>\n  <dir href="#demo-chapter" n="02" color="c-work" t="Nature of work" big="70%" sub="Of connections are Slack and Notion" dec="Which tool to buy" art="chatgpt-enterprise-usage-report/map-donut"></dir>\n  <dir href="#demo-chapter" n="03" color="c-code" t="Verification" big="±2%" sub="Export reconciliation tolerance" dec="Can the numbers be trusted"><b-csv-check><file color="c-chat">CHAT</file><file color="c-work">WORK</file><file color="c-code">CODEX</file></b-csv-check></dir>\n  <dir href="#demo-chapter" n="04" color="c-proj" t="People selection" big="16" sub="Of 340 — to interviews" dec="Whom to talk to before buying"><b-dot-grid n="120" on="5,31,58,77,96"></b-dot-grid></dir>\n</b-dir-map>',
  },
})
