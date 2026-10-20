import { attr, color, defineBlock, icon } from '../core'

// Типы инструментов карточками со стрелками: номер, название-ссылка, схема <iso-art> и список проблем.
// Проблемы общие для всех карточек (<prob>, подсказка — title); у карточки on — какие из них есть (номера с 1),
// остальные показаны снятыми (галочка, приглушённо)
export default defineBlock({
  tag: 'tool-types',
  title: 'Типы инструментов',
  doc: 'Карточки инструментов со схемой и списком проблем: есть (✕) или снята (✓).',
  slots: {
    prob: { doc: 'проблема (общая для всех карточек); внутри — название', required: true, attrs: { title: { doc: 'подсказка при наведении', required: true } } },
    tool: {
      doc: 'карточка инструмента',
      required: true,
      attrs: {
        n: { doc: 'номер', required: true },
        href: { doc: 'ссылка на продукт', required: true },
        t: { doc: 'название', required: true },
        color: { doc: 'цвет карточки', required: true },
        art: { doc: 'схема «пост/ключ»', required: true },
        on: { doc: 'какие проблемы есть: номера с 1 через запятую (пусто — все сняты)', required: true },
      },
    },
  },
  render: ({ slots, l }) => {
    const card = (t: (typeof slots.tool)[number]) => {
      const on = new Set(t.attrs.on.split(',').filter(Boolean).map(Number))
      const probs = slots.prob.map((p, i) => {
        const has = on.has(i + 1)
        return `<span role="listitem" class="bk-tt-pc${has ? ' bk-on' : ''}" title="${attr(p.attrs.title)}" aria-label="${attr(`${p.html}: ${has ? l('есть', 'present') : l('снята', 'removed')}`)}">${icon(has ? 'close-alt' : 'check-thin', '2.4')}${p.html}</span>`
      }).join('')
      return `<div class="bk-tt-c" style="--c:${color(t.attrs.color)}"><div class="bk-tt-h"><span class="bk-tt-n">${t.attrs.n}</span><a href="${attr(t.attrs.href)}" target="_blank" rel="noopener">${t.attrs.t}</a></div>`
        + `<iso-art name="${attr(t.attrs.art)}"></iso-art><div class="bk-tt-ps" role="list" aria-label="${l('Проблемы', 'Problems')}">${probs}</div></div>`
    }
    return `<div class="bk-tt">${slots.tool.map(card).join(`<span class="bk-tt-ar" aria-hidden="true">${icon('arrow-right')}</span>`)}</div>`
  },
  example: {
    ru: '<b-tool-types>\n  <prob title="много сообщений на одну задачу">Промпт</prob>\n  <prob title="подключений к приложениям мало">Галлюцинации</prob>\n  <tool n="1" href="https://openai.com/chatgpt/enterprise/" color="c-chat" t="Chat" art="chatgpt-enterprise-usage-report/tool-chat" on="1,2"></tool>\n  <tool n="2" href="https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex" color="c-work" t="Work" art="chatgpt-enterprise-usage-report/tool-work" on="2"></tool>\n  <tool n="3" href="https://openai.com/codex/" color="c-code" t="Codex" art="chatgpt-enterprise-usage-report/tool-codex" on=""></tool>\n</b-tool-types>',
    en: '<b-tool-types>\n  <prob title="many messages per task">Prompt</prob>\n  <prob title="few app connections">Hallucinations</prob>\n  <tool n="1" href="https://openai.com/chatgpt/enterprise/" color="c-chat" t="Chat" art="chatgpt-enterprise-usage-report/tool-chat" on="1,2"></tool>\n  <tool n="2" href="https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex" color="c-work" t="Work" art="chatgpt-enterprise-usage-report/tool-work" on="2"></tool>\n  <tool n="3" href="https://openai.com/codex/" color="c-code" t="Codex" art="chatgpt-enterprise-usage-report/tool-codex" on=""></tool>\n</b-tool-types>',
  },
})
