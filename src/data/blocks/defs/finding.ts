import { defineBlock, inline } from '../core'

// «Вывод» главы: три части — что в этом примере, что в общем случае, что сделать. Подписи частей стандартные,
// у части можно задать свою (k="Причина")
const part = (cls: string, k: string, html: string) => `<div class="${cls}"><span class="bk-fk">${k}</span>${inline(html)}</div>`

export default defineBlock({
  tag: 'finding',
  title: 'Вывод',
  doc: 'Итог главы: пример → общее правило → что сделать.',
  attrs: { title: { doc: 'своя подпись вместо «Вывод» / «Takeaway»' } },
  slots: {
    ex: { doc: '«В этом примере»', attrs: { k: { doc: 'своя подпись части' } } },
    gen: { doc: '«В общем случае»', attrs: { k: { doc: 'своя подпись части' } } },
    do: { doc: '«Что сделать»', attrs: { k: { doc: 'своя подпись части' } } },
  },
  render: ({ attrs, slots, l }) => {
    const one = (name: string, cls: string, ru: string, en: string) =>
      (slots[name] ?? []).map((s) => part(cls, s.attrs.k ?? l(ru, en), s.html)).join('')
    return `<div class="bk-finding"><b>${attrs.title ?? l('Вывод', 'Takeaway')}</b>${one('ex', 'bk-fc', 'В этом примере', 'In this example')}${one('gen', 'bk-fg', 'В общем случае', 'In general')}${one('do', 'bk-fa', 'Что сделать', 'Next step')}</div>`
  },
  example: {
    ru: '<b-finding>\n  <ex>Ревью нашло два случая, которых не было в задании.</ex>\n  <gen>Найденный пропуск записывают в исходный запрос<b-proof href="https://example.com/" quote="Источник: цитата из руководства — example.com"></b-proof>.</gen>\n  <do>Допишите найденное в запрос и перезапустите цикл.</do>\n</b-finding>',
    en: '<b-finding>\n  <ex>The review found two cases missing from the task.</ex>\n  <gen>A found gap goes into the original request<b-proof href="https://example.com/" quote="Source: a quote from a guide — example.com"></b-proof>.</gen>\n  <do>Add the finding to the request and rerun the loop.</do>\n</b-finding>',
  },
})
