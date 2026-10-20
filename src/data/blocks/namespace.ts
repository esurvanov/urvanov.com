// Пространство имён классов блоков. Все стили блоков лежат в одном общем CSS, поэтому одинаковое имя класса
// в двух блоках (bk-on, bk-chip, bk-tbl…) значит, что правила одного блока молча меняют вид другого.
// Инвариант, который здесь проверяется при сборке:
//   1. Класс bk-<x> принадлежит блоку, чья метка — самый длинный префикс <x>: bk-probe-check-i → <b-probe-check>.
//      Класс без такого блока (bk-on, bk-k, bk-tbl) — ошибка. Владелец — файл defs/<имя>.ts с этой меткой.
//   2. Блок рендерит (и пост пишет внутри блока) только классы своего файла или общие классы других блоков —
//      их владелец перечисляет в shared (bk-chip, bk-lane…).
//   3. Каждый селектор в defs/<имя>.css содержит класс своего файла, и стилизуемый элемент — этот элемент или
//      его потомок (не сосед через + / ~). Чужой класс в селекторе — только как уточнение внутри своего блока
//      (.bk-probe-check-rules .bk-chip) или как место своего блока в чужом (.bk-chapter > h2 + .bk-art).
//      Значит, базовый вид класса задаёт только css владельца, а правила любого файла не выходят за свой блок.
// Нарушение — ошибка сборки с файлом и селектором.
import type { Block } from './core'

/** Файл блока по метке и общие классы каждого файла */
export interface Registry {
  fileOf: Record<string, string>
  shared: Record<string, string[]>
}

export function makeRegistry(byFile: Record<string, Block[]>): Registry {
  const fileOf: Record<string, string> = {}
  const shared: Record<string, string[]> = {}
  for (const [file, blocks] of Object.entries(byFile)) {
    for (const b of blocks) {
      fileOf[b.tag] = file
      for (const c of b.shared ?? []) (shared[file] ??= []).push(c)
    }
  }
  return { fileOf, shared }
}

const tagsByLength = new WeakMap<Registry, string[]>()

/** Файл-владелец класса bk-…: по самой длинной метке-префиксу; null — у класса нет блока */
export function ownerOf(reg: Registry, cls: string): string | null {
  let tags = tagsByLength.get(reg)
  if (!tags) tagsByLength.set(reg, (tags = Object.keys(reg.fileOf).sort((a, b) => b.length - a.length)))
  const x = cls.slice(3)
  for (const t of tags) if (x === t || x.startsWith(t + '-')) return reg.fileOf[t]
  return null
}

const isShared = (reg: Registry, file: string, cls: string): boolean =>
  (reg.shared[file] ?? []).some((p) => (p.endsWith('*') ? cls.startsWith(p.slice(0, -1)) : cls === p))

/** Классы bk-* из атрибутов class="…" в HTML */
export function htmlClasses(html: string): string[] {
  const out: string[] = []
  for (const m of html.matchAll(/\sclass\s*=\s*"([^"]*)"/g)) for (const c of m[1].split(/\s+/)) if (c.startsWith('bk-')) out.push(c)
  return out
}

/** Может ли файл file выводить класс cls в HTML: свой класс или общий класс другого блока */
export function renderError(reg: Registry, file: string, cls: string): string | null {
  const own = ownerOf(reg, cls)
  if (!own) return `класс «${cls}» не принадлежит ни одному блоку — классы блока начинаются с bk-<его метка>-`
  if (own === file || isShared(reg, own, cls)) return null
  return `класс «${cls}» принадлежит defs/${own}.ts — свой класс начните с префикса своего блока или добавьте «${cls}» в shared блока-владельца`
}

// ── CSS ─────────────────────────────────────────────────────────────────────────────────────────────────────

/** Разбить по разделителю на верхнем уровне (не внутри скобок) */
function splitTop(s: string, sep: (ch: string) => boolean): string[] {
  const out: string[] = []
  let depth = 0, cur = ''
  for (const ch of s) {
    if (ch === '(' || ch === '[') depth++
    else if (ch === ')' || ch === ']') depth--
    if (!depth && sep(ch)) { out.push(cur); cur = ''; continue }
    cur += ch
  }
  out.push(cur)
  return out
}

/** Правила файла: селекторы (с раскрытием @media/@supports) и имена @keyframes */
function cssRules(css: string): { selectors: string[]; keyframes: string[] } {
  const selectors: string[] = [], keyframes: string[] = []
  const walk = (s: string) => {
    let pos = 0
    while (pos < s.length) {
      const open = s.indexOf('{', pos)
      if (open < 0) break
      const head = s.slice(pos, open).trim()
      let depth = 1, end = open + 1
      while (end < s.length && depth) { if (s[end] === '{') depth++; else if (s[end] === '}') depth--; end++ }
      if (/^@(media|supports|container|layer)\b/.test(head)) walk(s.slice(open + 1, end - 1))
      else if (/^@(-webkit-)?keyframes\b/.test(head)) keyframes.push(head.split(/\s+/)[1])
      else if (!head.startsWith('@')) selectors.push(...splitTop(head, (ch) => ch === ',').map((x) => x.trim()).filter(Boolean))
      pos = end
    }
  }
  walk(css.replace(/\/\*[\s\S]*?\*\//g, ''))
  return { selectors, keyframes }
}

/** Составные части селектора и комбинатор перед каждой: [{ text, comb }] */
function compounds(sel: string): { text: string; comb: string }[] {
  const out: { text: string; comb: string }[] = []
  let depth = 0, cur = '', comb = ''
  const flush = () => { if (cur.trim()) { out.push({ text: cur.trim(), comb }); comb = '' } cur = '' }
  for (const ch of sel) {
    if (ch === '(' || ch === '[') depth++
    else if (ch === ')' || ch === ']') depth--
    if (!depth && /[\s>+~]/.test(ch)) {
      flush()
      if (ch !== ' ' && ch !== '\n' && ch !== '\t') comb = ch
      else if (!comb && out.length) comb = ' '
      continue
    }
    cur += ch
  }
  flush()
  return out
}

// Атрибут data-bk-<x> (ссылка без класса, чтобы осталась общая стрелка сайта) считается так же, как класс bk-<x>
const classesIn = (s: string): string[] => [...s.matchAll(/(?:\.|\[data-)(bk-[a-z0-9-]+)/g)].map((m) => m[1])
/** Классы, которые сужают выбор: без содержимого :not(…) */
const qualifying = (s: string): string[] => classesIn(s.replace(/:not\((?:[^()]|\([^()]*\))*\)/g, ''))

/** Ошибки CSS одного файла defs/<file>.css */
export function cssErrors(reg: Registry, file: string, css: string): string[] {
  const errors: string[] = []
  const where = `src/data/blocks/defs/${file}.css`
  const { selectors, keyframes } = cssRules(css)
  for (const k of keyframes) {
    const own = k.startsWith('bk-') ? ownerOf(reg, k) : null
    if (own !== file) errors.push(`${where}: @keyframes ${k} — имя анимации общее на весь сайт, начните его с bk-<метка блока>-`)
  }
  for (const sel of selectors) {
    const fail = (msg: string) => errors.push(`${where}, селектор «${sel}»: ${msg}`)
    if (!sel.includes('.s-rich.bk')) { fail('селектор блока начинается с .s-rich.bk'); continue }
    let bad = false
    for (const c of classesIn(sel)) if (!ownerOf(reg, c)) { fail(`класс «${c}» не принадлежит ни одному блоку — классы начинаются с bk-<метка>-`); bad = true }
    if (bad) continue
    const parts = compounds(sel)
    let last = -1
    parts.forEach((p, i) => { if (qualifying(p.text).some((c) => ownerOf(reg, c) === file)) last = i })
    if (last < 0) {
      const foreign = [...new Set(classesIn(sel))].map((c) => `${c} (defs/${ownerOf(reg, c)}.css)`).join(', ')
      fail(`нет ни одного класса блоков этого файла${foreign ? ` — стили чужих классов ${foreign} задаёт только их файл; здесь их можно уточнять только внутри своего блока` : ''}`)
      continue
    }
    if (parts.slice(last + 1).some((p) => p.comb === '+' || p.comb === '~')) fail('правило выходит за свой блок: после своего класса стоит соседний селектор (+ или ~) — стилизуйте только свой элемент и его потомков')
  }
  return errors
}
