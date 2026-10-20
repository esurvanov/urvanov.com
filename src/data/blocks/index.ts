// Библиотека блоков статей. В тексте поста вместо ручной вёрстки стоят короткие метки <b-имя атрибут="…">…</b-имя>,
// при сборке они разворачиваются в готовый HTML (как <iso-art> в ../blogArt): страница и её текст для поисковиков —
// обычный статический HTML. Блок — один файл в ./defs (и, если нужно, свой .css рядом): реестр собирается сам,
// общего списка нет. Неизвестная метка, лишний или недостающий атрибут — ошибка сборки с понятным сообщением.
import type { Block, BlockCtx, Lang, SlotItem } from './core'

const modules = import.meta.glob('./defs/*.ts', { eager: true, import: 'default' }) as Record<string, Block | Block[]>

export const BLOCKS: Record<string, Block> = {}
for (const [path, mod] of Object.entries(modules)) {
  for (const b of Array.isArray(mod) ? mod : [mod]) {
    // Два файла с одной меткой — ошибка: иначе один молча перекрыл бы другой
    if (BLOCKS[b.tag]) throw new Error(`blocks: метка <b-${b.tag}> объявлена дважды (${path})`)
    BLOCKS[b.tag] = b
  }
}

/** Блоки по алфавиту — для витрины и README */
export const blockList = (): Block[] => Object.values(BLOCKS).sort((a, b) => a.tag.localeCompare(b.tag))

// Все имена вложенных элементов: встретился такой вне своего блока — ошибка, а не тег в HTML страницы
const SLOT_NAMES = new Set(Object.values(BLOCKS).flatMap((b) => Object.keys(b.slots ?? {})))

type Node =
  | { kind: 'text'; value: string }
  | { kind: 'block'; block: Block; attrs: Record<string, string>; children: Node[]; raw: string; line: number }
  | { kind: 'slot'; name: string; attrs: Record<string, string>; children: Node[]; line: number }

const TAG = /<(\/?)([a-z][a-z0-9-]*)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:"[^"]*"|'[^']*'))?)*)\s*(\/?)>/g
const ATTR = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'))?/g

function parseAttrs(s: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const m of s.matchAll(ATTR)) out[m[1]] = m[2] ?? m[3] ?? ''
  return out
}

/** Разбор текста поста в дерево: структурные только метки b-* и вложенные элементы открытого блока, остальное — текст */
function parse(src: string, where: string, line0: number): Node[] {
  const root: Node[] = []
  const stack: Extract<Node, { kind: 'block' | 'slot' }>[] = []
  const lineAt = (i: number) => line0 + src.slice(0, i).split('\n').length
  const fail = (i: number, msg: string): never => { throw new Error(`blocks: ${where}, строка ${lineAt(i)}: ${msg}`) }
  const out = () => (stack.length ? stack[stack.length - 1].children : root)
  const pushText = (s: string) => { if (s) out().push({ kind: 'text', value: s }) }
  let last = 0
  TAG.lastIndex = 0
  for (let m = TAG.exec(src); m; m = TAG.exec(src)) {
    const [whole, close, name, attrSrc, selfClose] = m
    const top = stack[stack.length - 1]
    const isBlock = name.startsWith('b-')
    const isSlot = !isBlock && top?.kind === 'block' && !!top.block.slots?.[name]
    const closesSlot = !isBlock && close && top?.kind === 'slot' && top.name === name
    if (!isBlock && !isSlot && !closesSlot) {
      // Вложенный элемент вне своего блока: <item> посреди текста — почти наверняка опечатка в разметке
      if (!close && SLOT_NAMES.has(name)) fail(m.index, `<${name}> вне блока, которому он принадлежит`)
      continue
    }
    pushText(src.slice(last, m.index))
    last = m.index + whole.length
    if (close) {
      const want = isBlock ? name.slice(2) : name
      const open = top?.kind === 'block' ? top.block.tag : top?.name
      if (!top || open !== want) fail(m.index, `лишний </${name}>${top ? ` — открыт <${top.kind === 'block' ? 'b-' + top.block.tag : top.name}>` : ''}`)
      stack.pop()
      continue
    }
    const attrs = parseAttrs(attrSrc)
    if (isBlock) {
      const block = BLOCKS[name.slice(2)]
      if (!block) fail(m.index, `неизвестный блок <${name}> (src/data/blocks/defs)`)
      const node: Node = { kind: 'block', block, attrs, children: [], raw: '', line: lineAt(m.index) }
      out().push(node)
      if (selfClose) continue
      if (block.raw) {
        // Сырой блок: содержимое до закрывающей метки — без разбора (в промпте могут быть любые скобки)
        const end = src.indexOf(`</${name}>`, last)
        if (end < 0) fail(m.index, `не закрыт <${name}>`)
        node.raw = src.slice(last, end)
        last = end + name.length + 3
        TAG.lastIndex = last
        continue
      }
      stack.push(node)
    } else {
      const node: Node = { kind: 'slot', name, attrs, children: [], line: lineAt(m.index) }
      out().push(node)
      if (!selfClose) stack.push(node)
    }
  }
  pushText(src.slice(last))
  if (stack.length) {
    const t = stack[stack.length - 1]
    throw new Error(`blocks: ${where}, строка ${t.line}: не закрыт <${t.kind === 'block' ? 'b-' + t.block.tag : t.name}>`)
  }
  return root
}

/**
 * Пробелы в тексте между метками — как в JSX: перенос строки с отступом между метками исчезает, поэтому метки можно
 * писать с отступами, а HTML получается сплошной строкой, как раньше. В блоках-«потоках» (глава, пост) пустая строка
 * сохраняется: так между метками можно писать обычный markdown абзацами.
 */
function normText(s: string, flow: boolean): string {
  if (!s.includes('\n')) return s
  const edge = (ws: string) => (!ws.includes('\n') ? ws : flow && /\n[ \t]*\n/.test(ws) ? '\n\n' : '')
  const lead = /^\s*/.exec(s)![0], trail = /\s*$/.exec(s)![0]
  if (lead.length === s.length) return edge(s)
  const core = s.slice(lead.length, s.length - trail.length)
  const body = flow
    ? core.split(/\n[ \t]*\n\s*/).map((p) => p.split('\n').map((x) => x.trim()).join('\n')).join('\n\n')
    : core.split('\n').map((x) => x.trim()).filter(Boolean).join(' ')
  return edge(lead) + body + edge(trail)
}

function checkAttrs(attrs: Record<string, string>, spec: Block['attrs'], what: string, fail: (msg: string) => never) {
  const known = spec ?? {}
  for (const k of Object.keys(attrs)) if (!known[k]) fail(`у ${what} нет атрибута «${k}» (есть: ${Object.keys(known).join(', ') || 'никаких'})`)
  for (const [k, s] of Object.entries(known)) {
    if (s.required && !(k in attrs)) fail(`у ${what} не хватает атрибута «${k}»: ${s.doc}`)
    if (s.values && k in attrs && !s.values.includes(attrs[k])) fail(`${what} ${k}="${attrs[k]}" — можно: ${s.values.join(', ')}`)
  }
}

function render(nodes: Node[], lang: Lang, flow: boolean, where: string): string {
  return nodes.map((n) => {
    if (n.kind === 'text') return normText(n.value, flow)
    const fail = (msg: string): never => { throw new Error(`blocks: ${where}, строка ${n.line}: ${msg}`) }
    if (n.kind === 'slot') return fail(`<${n.name}> здесь не к месту`)
    const b = n.block
    const name = `<b-${b.tag}>`
    checkAttrs(n.attrs, b.attrs, name, fail)
    const slots: Record<string, SlotItem[]> = {}
    const rest: Node[] = []
    for (const c of n.children) {
      if (c.kind !== 'slot') { rest.push(c); continue }
      checkAttrs(c.attrs, b.slots![c.name].attrs, `<${c.name}> в ${name}`, fail)
      ;(slots[c.name] ??= []).push({ attrs: c.attrs, html: render(c.children, lang, false, where).trim() })
    }
    for (const [k, s] of Object.entries(b.slots ?? {})) if (s.required && !slots[k]) fail(`в ${name} нужен хотя бы один <${k}>: ${s.doc}`)
    const ctx: BlockCtx = {
      lang,
      attrs: n.attrs,
      children: render(rest, lang, !!b.flow, where),
      slots,
      raw: n.raw,
      l: (ru, en) => (lang === 'en' ? en : ru),
    }
    const html = b.render(ctx)
    // Пустая строка внутри HTML оборвала бы HTML-блок для markdown: в обычных блоках её не бывает
    return b.flow ? html : html.replace(/\n[ \t]*\n/g, '\n')
  }).join('')
}

/** Развернуть метки блоков в тексте поста (до markdown). Без меток текст возвращается как есть; line0 — строк до текста (фронтматтер) */
export function withBlocks(src: string, lang: Lang, where = 'пост', line0 = 0): string {
  if (!src.includes('<b-')) return src
  return render(parse(src, where, line0), lang, true, where)
}
