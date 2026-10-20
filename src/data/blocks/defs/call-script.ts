import { attr, color, defineBlock, inline } from '../core'

// Сценарий звонка по блокам: цветной номер (цвет — как у отрезка в полосе минут), название блока, вопрос ведущего
// и что уточнить. Подпись «Уточнить:» ставится сама
export default defineBlock({
  tag: 'call-script',
  title: 'Сценарий звонка',
  doc: 'Нумерованные блоки разговора: вопрос ведущего и что уточнить.',
  slots: {
    step: {
      doc: 'блок сценария; внутри — что уточнить (можно пусто)',
      required: true,
      attrs: {
        t: { doc: 'название блока', required: true },
        q: { doc: 'вопрос ведущего', required: true },
        color: { doc: 'цвет номера: токен или CSS-цвет', required: true },
        ink: { doc: 'цвет цифры (по умолчанию белый)' },
      },
    },
  },
  render: ({ slots, l }) => `<ol class="bk-call-script">${slots.step.map((s, i) =>
    `<li><span class="bk-call-script-sn" style="background:${color(s.attrs.color)}${s.attrs.ink ? `;color:${color(s.attrs.ink)}` : ''}">${i + 1}</span><div><div class="bk-call-script-st-t">${s.attrs.t}</div><div class="bk-call-script-q">${s.attrs.q}</div>${s.html ? `<div class="bk-call-script-fu" data-k="${attr(l('Уточнить: ', 'Follow up: '))}">${inline(s.html)}</div>` : ''}</div></li>`).join('')}</ol>`,
  example: {
    ru: '<b-call-script>\n  <step color="c-none" ink="ink" t="Вступление" q="«Я изучаю, как в компании решают рабочие задачи. Это не оценка вас»"></step>\n  <step color="c-chat" t="Последняя рабочая задача" q="«Вспомните последнюю задачу, которая заняла заметное время»">Какими средствами располагали · что выбрали и почему</step>\n</b-call-script>',
    en: '<b-call-script>\n  <step color="c-none" ink="ink" t="Intro" q="“I’m studying how work tasks actually get done here. This isn’t an evaluation of you”"></step>\n  <step color="c-chat" t="Last work task" q="“Think of the last task that took noticeable time”">What tools you had · what you chose and why</step>\n</b-call-script>',
  },
})
