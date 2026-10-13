// Схемы поста «AI в коде: харнесс и инструменты»
import { type Scene, circlePath, clip } from '@/lib/infographic'

const scenes: Record<string, Scene> = {
  // Венн: модели Claude и GPT, продукты по кругам, Hermes Agent поверх, всё в рамке харнесса (цвета — CSS поста)
  venn: {
    ru: 'Два круга — модели Claude и модели GPT; Claude Code только в круге Claude, Codex только в круге GPT; на пересечении Cursor и чат; Hermes Agent целиком содержит Cursor и чат, частично пересекается с Claude Code и Codex и выходит за пределы обоих кругов; всё внутри рамки харнесса',
    en: 'Two circles, Claude models and GPT models; Claude Code only in the Claude circle, Codex only in the GPT circle; Cursor and chat in the overlap; Hermes Agent fully contains Cursor and chat, partly overlaps Claude Code and Codex and extends beyond both circles; all inside the harness frame',
    viewBox: [0, 0, 920, 540],
    legend: false,
    style: '',
    draw: (c, l) => {
      const xor = `hxXor-${c.lang}`, gpt = `hxGpt-${c.lang}`
      c.defs(clip(xor, `<path clip-rule="evenodd" d="${circlePath(425, 270, 150)} ${circlePath(495, 270, 150)}"/>`), clip(gpt, '<circle cx="495" cy="270" r="150"/>'))
      c.box(6, 6, 908, 528, { cls: 'rg v-h', rx: 36 })
      const big = (x: number, y: number, t: string) => c.label(x, y, t, { cls: 'vtl', anchor: 'middle' })
      const small = (x: number, y: number, t: string) => c.label(x, y, t, { cls: 'vts', anchor: 'middle' })
      c.label(890, 40, l('харнесс — у всех', 'every product has a harness'), { cls: 'vts', anchor: 'end' })
      c.clipped(xor, () => c.circ(425, 270, 150, { cls: 'rg v-cc' }))
      c.clipped(xor, () => c.circ(495, 270, 150, { cls: 'rg v-cx' }))
      c.clipped(gpt, () => c.circ(425, 270, 150, { cls: 'rg v-sh' }))
      c.oval(460, 340, 230, 130, { cls: 'rg v-hm' })
      c.circ(460, 265, 42, { cls: 'rg v-cu' })
      c.circ(460, 365, 44, { cls: 'rg v-ch' })
      // выноски к Claude Code и Codex
      c.circ(340, 175, 5, { cls: 'vpt' })
      c.edge('M336,168 L200,100', { cls: 'vld' })
      big(190, 72, 'Claude Code')
      small(190, 90, l('только модели Claude', 'Claude models only'))
      c.circ(580, 175, 5, { cls: 'vpt' })
      c.edge('M584,168 L720,100', { cls: 'vld' })
      big(730, 72, 'Codex')
      small(730, 90, l('только модели GPT', 'GPT models only'))
      big(460, 263, 'Cursor')
      small(460, 281, l('редактор', 'editor'))
      big(460, 358, 'ChatGPT')
      big(460, 376, 'Claude')
      small(460, 393, l('чат', 'chat'))
      small(300, 505, l('модели Claude', 'Claude models'))
      small(620, 505, l('модели GPT', 'GPT models'))
      big(460, 440, 'Hermes Agent')
      small(460, 458, l('любые модели', 'any model'))
    },
  },
}
export default scenes
