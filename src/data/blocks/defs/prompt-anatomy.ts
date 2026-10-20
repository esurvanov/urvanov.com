import { attr, defineBlock, icon } from '../core'

// Устройство промпта картинкой: окно с частями промпта сверху вниз, у каждой — значок, название, условная
// картинка содержимого (вид задаёт kind) и источники; справа — шкала «порядок» и отдельная плашка про теги.
// Подсказка части (tip) всплывает при наведении и читается скринридером
const BARS = [92, 78, 88, 64, 84, 70, 90, 58, 80]
const KINDS = ['role', 'who', 'data', 'ex', 'fmt', 'q']

function visual(kind: string, a: Record<string, string>): string {
  const tag = (s: string) => `<span class="bk-prompt-anatomy-tag">&lt;${s}&gt;</span>`
  const note = a.note ? `<small>${a.note}</small>` : ''
  switch (kind) {
    case 'role': return '<span class="bk-prompt-anatomy-l"><i style="width:55%"></i></span>'
    case 'who': return `<span class="bk-prompt-anatomy-flow"><span class="bk-prompt-anatomy-doc">${icon('file-text')}</span>${icon('arrow-right')}<span class="bk-prompt-anatomy-ppl">${icon('users')}</span></span>`
    case 'data': return `${tag(a.tag)}<span class="bk-prompt-anatomy-l bk-prompt-anatomy-tall">${BARS.map((w) => `<i style="width:${w}%"></i>`).join('')}</span>${tag('/' + a.tag)}`
    case 'ex': return `${tag(a.tag)}<span class="bk-prompt-anatomy-cards"><i></i><i></i><i class="bk-prompt-anatomy-opt"></i></span>${tag('/' + a.tag)}${note}`
    case 'fmt': return `<span class="bk-prompt-anatomy-list">${'<i></i>'.repeat(5)}</span>${note}`
    default: return '<span class="bk-prompt-anatomy-l"><i style="width:40%"></i></span><span class="bk-prompt-anatomy-qm">?</span>'
  }
}

export default defineBlock({
  tag: 'prompt-anatomy',
  title: 'Устройство промпта',
  doc: 'Окно промпта с частями <part> и боковая шкала «порядок» с плашкой про теги <tags>.',
  attrs: { label: { doc: 'вся схема словами для скринридера', required: true }, order: { doc: 'подпись шкалы порядка', required: true } },
  slots: {
    part: {
      doc: 'часть промпта; внутри — значки источников <b-proof>',
      required: true,
      attrs: {
        kind: { doc: 'вид картинки содержимого', required: true, values: KINDS },
        icon: { doc: 'значок', required: true },
        t: { doc: 'название', required: true },
        tip: { doc: 'подсказка при наведении', required: true },
        tag: { doc: 'имя тега для data и ex: «данные»' },
        note: { doc: 'подпись справа для ex и fmt: «1–3»' },
      },
    },
    tags: { doc: 'плашка про теги; внутри — источники', required: true, attrs: { t: { doc: 'подпись', required: true }, tip: { doc: 'подсказка', required: true } } },
  },
  render: ({ attrs, slots }) => {
    const parts = slots.part.map((s) => {
      const a = s.attrs
      return `<div class="bk-prompt-anatomy-b bk-prompt-anatomy-${a.kind}" title="${attr(a.tip)}" aria-label="${attr(a.tip)}"><span class="bk-prompt-anatomy-i">${icon(a.icon)}</span><b>${a.t}</b><div class="bk-prompt-anatomy-v">${visual(a.kind, a)}</div><span class="bk-prompt-anatomy-p">${s.html}</span></div>`
    }).join('')
    const t = slots.tags[0]
    return `<div class="bk-prompt-anatomy" role="img" aria-label="${attr(attrs.label)}"><div class="bk-prompt-anatomy-win"><div class="bk-prompt-anatomy-bar"><i></i><i></i><i></i></div>${parts}</div>`
      + `<div class="bk-prompt-anatomy-rail"><span class="bk-prompt-anatomy-down">${icon('arrow-down')}</span><small>${attrs.order}</small><div class="bk-prompt-anatomy-side" title="${attr(t.attrs.tip)}" aria-label="${attr(t.attrs.tip)}"><span class="bk-prompt-anatomy-tag bk-prompt-anatomy-big">&lt;…&gt;</span><small>${t.attrs.t}</small><span class="bk-prompt-anatomy-p">${t.html}</span></div></div></div>`
  },
  example: {
    ru: '<b-prompt-anatomy label="Устройство промпта: роль, данные, формат, вопрос в конце" order="порядок">\n  <part kind="role" icon="user-round" t="Роль" tip="Роль: одна фраза задаёт тон"><b-proof href="https://example.com/" quote="Источник: цитата"></b-proof></part>\n  <part kind="who" icon="target" t="Кому и зачем" tip="Кто прочитает результат"></part>\n  <part kind="data" icon="file-text" t="Данные целиком" tip="Данные целиком" tag="данные"></part>\n  <part kind="ex" icon="card-text" t="Пример" tip="Один-три образца" tag="пример" note="1–3"></part>\n  <part kind="fmt" icon="list-dots" t="Формат" tip="5 пунктов" note="5 пунктов"></part>\n  <part kind="q" icon="help" t="Вопрос в конце" tip="Вопрос после данных"></part>\n  <tags t="теги" tip="Теги для частей"></tags>\n</b-prompt-anatomy>',
    en: '<b-prompt-anatomy label="Prompt anatomy: role, data, format, question last" order="order">\n  <part kind="role" icon="user-round" t="Role" tip="Role: one sentence sets the tone"><b-proof href="https://example.com/" quote="Source: a quote"></b-proof></part>\n  <part kind="who" icon="target" t="Audience and goal" tip="Who reads the result"></part>\n  <part kind="data" icon="file-text" t="The whole data" tip="The whole data" tag="data"></part>\n  <part kind="ex" icon="card-text" t="Example" tip="One to three samples" tag="example" note="1–3"></part>\n  <part kind="fmt" icon="list-dots" t="Format" tip="5 points" note="5 points"></part>\n  <part kind="q" icon="help" t="Question last" tip="The question after the data"></part>\n  <tags t="tags" tip="Tags for parts"></tags>\n</b-prompt-anatomy>',
  },
})
