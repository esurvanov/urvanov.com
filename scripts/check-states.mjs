// Состояния интерактивов в постах против эталона: check:visual снимает страницу только как она открылась,
// а вкладки, переключатели видов и подсказки по наведению живут на :checked и :hover.
//   а) щелчок по каждой подписи радиокнопки (вкладки, переключатель вида) — снимок всей страницы;
//   б) наведение на ссылку-источник (data-quote), значок с подсказкой ([role=tooltip]) и ссылку с классом
//      (карточки, плашки) — снимок окна вокруг элемента.
// Цели берутся из текущей сборки, а щелчок и наведение в эталоне — в ту же точку страницы. Поэтому сначала
// check:visual: если страница по умолчанию уже отличается, точки не совпадут и сравнение состояний бессмысленно.
//
//   npm run check:states -- [--base <dir>] [--dist <dir>] [--only /blog/x/] [--widths 1280,390] [--threshold 0.1] [--out <dir>]
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'
import { DEFAULT_BASELINE, parseArgs, ms, serve, pool, launchChrome, isolatePage, FREEZE_CSS, outDir } from './checks-lib.mjs'

const t0 = Date.now()
const args = parseArgs()
const BASE = args.base || DEFAULT_BASELINE
const DIST = args.dist || 'dist'
const ONLY = typeof args.only === 'string' ? args.only : ''
const WIDTHS = String(args.widths || '1280').split(',').map(Number)
const THRESHOLD = Number(args.threshold ?? 0.1)
const OUT = outDir(args, 'states')
const VH = 900
for (const d of [BASE, DIST]) if (!d || !existsSync(join(d, 'sitemap.xml'))) { console.error(`Нет сборки: ${d}/sitemap.xml`); process.exit(2) }

const pages = []
for (const prefix of ['blog', 'en/blog']) {
  const d = join(DIST, prefix)
  if (existsSync(d)) for (const f of readdirSync(d)) if (f.endsWith('.md')) pages.push(`/${prefix}/${f.slice(0, -3)}/`)
}
const list = pages.filter((p) => p.startsWith(ONLY)).sort()

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })
const [srvBase, srvCur] = await Promise.all([serve(BASE), serve(DIST)])
const browser = await launchChrome()

// Цели в тексте поста (в координатах страницы): { kind, name, x, y }
function targets() {
  const root = document.querySelector('main') || document.body
  const out = []
  const at = (kind, name, el) => {
    const r = el.getBoundingClientRect()
    if (r.width && r.height) out.push({ kind, name, x: r.x + r.width / 2, y: r.y + r.height / 2 + scrollY })
  }
  root.querySelectorAll('input[type=radio]').forEach((inp, i) => {
    const label = (inp.id && root.querySelector(`label[for="${CSS.escape(inp.id)}"]`)) || inp.closest('label')
    if (label) at('click', `radio ${i} «${label.textContent.trim().slice(0, 30)}»`, label)
  })
  root.querySelectorAll('a[data-quote]').forEach((a, i) => at('hover', `источник ${i}`, a))
  root.querySelectorAll('[role=tooltip]').forEach((t, i) => t.parentElement && at('hover', `подсказка ${i}`, t.parentElement))
  // Ссылки с классом: по одной на каждый вид (набор классов) — карточки одного блока ведут себя одинаково
  const kinds = new Set()
  root.querySelectorAll('.s-rich a[class][href]:not([data-quote])').forEach((a, i) => {
    if (kinds.has(a.className)) return
    kinds.add(a.className)
    at('hover', `ссылка ${i} ${a.getAttribute('href').slice(0, 40)}`, a)
  })
  return out
}

async function open(origin, path, width) {
  const page = await browser.newPage()
  await isolatePage(page, origin)
  await page.setViewport({ width, height: VH, deviceScaleFactor: 1, isMobile: width < 600, hasTouch: width < 600 })
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }, { name: 'prefers-color-scheme', value: 'light' }])
  await page.evaluateOnNewDocument((css) => {
    document.addEventListener('DOMContentLoaded', () => { const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s) })
  }, FREEZE_CSS)
  await page.goto(origin + path, { waitUntil: 'load', timeout: 30000 })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForNetworkIdle({ idleTime: 300, timeout: 4000 }).catch(() => {})
  return page
}

// Вся страница — склейкой снимков окна по прокрутке: снимок за пределами окна (captureBeyondViewport) на длинных
// страницах со схемами иногда повторяет куски. Липкие элементы попадают в каждый кусок — одинаково в обеих сборках
async function fullShot(page, width) {
  const height = await page.evaluate(() => Math.ceil(document.documentElement.scrollHeight))
  const out = new PNG({ width, height }); out.data.fill(255)
  for (let y = 0; y < height; y += VH) {
    const sy = await page.evaluate((y) => { window.scrollTo(0, y); return scrollY }, y)
    await new Promise((r) => setTimeout(r, 50))
    const part = PNG.sync.read(Buffer.from(await page.screenshot({ captureBeyondViewport: false })))
    // Внизу страница прокручивается не до y, а до края: берём строки начиная с y
    const from = y - sy, rows = Math.min(VH - from, height - y, part.height - from)
    part.data.copy(out.data, y * width * 4, from * width * 4, (from + rows) * width * 4)
  }
  return out
}

// Состояние цели в странице: щелчок — снимок всей страницы, наведение — снимок окна с элементом посередине
async function state(page, t, width) {
  const top = Math.max(0, Math.round(t.y - VH / 2))
  await page.evaluate((y) => window.scrollTo(0, y), top)
  const sy = await page.evaluate(() => scrollY)
  if (t.kind === 'click') {
    await page.mouse.click(t.x, t.y - sy)
    await new Promise((r) => setTimeout(r, 150))
    return fullShot(page, width)
  }
  await page.mouse.move(t.x, t.y - sy)
  await new Promise((r) => setTimeout(r, 150))
  const img = PNG.sync.read(Buffer.from(await page.screenshot({ captureBeyondViewport: false, optimizeForSpeed: true })))
  await page.mouse.move(0, 0)
  return img
}

function diff(A, B) {
  const w = Math.max(A.width, B.width), h = Math.max(A.height, B.height)
  const pad = (P) => { if (P.width === w && P.height === h) return P; const o = new PNG({ width: w, height: h }); o.data.fill(255); for (let r = 0; r < P.height; r++) P.data.copy(o.data, r * w * 4, r * P.width * 4, (r + 1) * P.width * 4); return o }
  const a = pad(A), b = pad(B), d = new PNG({ width: w, height: h })
  const n = pixelmatch(a.data, b.data, d.data, w, h, { threshold: 0.1, includeAA: false, alpha: 0.3 })
  return { pct: (n / (w * h)) * 100, a, b, d }
}

const tasks = list.flatMap((p) => WIDTHS.map((w) => ({ path: p, width: w })))
const rows = []
await pool(tasks, 4, async ({ path, width }) => {
  let pa, pb
  try {
    [pa, pb] = await Promise.all([open(srvBase.origin, path, width), open(srvCur.origin, path, width)])
    const ts = await pb.evaluate(targets)
    for (const t of ts) {
      let [ia, ib] = await Promise.all([state(pa, t, width), state(pb, t, width)])
      // Снимок страницы со схемами и 3D-сценами изредка выходит с мусором (недорисованные тайлы, сцена ещё грузится):
      // при отличии щелчок повторяется на новых вкладках, в зачёт идёт меньшее отличие
      if (t.kind === 'click' && diff(ia, ib).pct > THRESHOLD) {
        await Promise.all([pa.close(), pb.close()])
        ;[pa, pb] = await Promise.all([open(srvBase.origin, path, width), open(srvCur.origin, path, width)])
        const [ja, jb] = await Promise.all([state(pa, t, width), state(pb, t, width)])
        if (diff(ja, jb).pct < diff(ia, ib).pct) [ia, ib] = [ja, jb]
      }
      // После щелчка страница в другом состоянии: следующая цель — с новой вкладки (при reload браузер
      // восстанавливает выбранные радиокнопки, и состояние прошлой цели переезжает в следующую)
      if (t.kind === 'click') {
        await Promise.all([pa.close(), pb.close()])
        ;[pa, pb] = await Promise.all([open(srvBase.origin, path, width), open(srvCur.origin, path, width)])
      }
      const r = diff(ia, ib)
      rows.push({ path, width, t: t.name, kind: t.kind, pct: r.pct })
      if (r.pct > THRESHOLD) {
        const name = `${path.replace(/^\/|\/$/g, '').replace(/\//g, '__')}@${width}.${t.name.replace(/[^a-zа-яё0-9-]+/gi, '_').slice(0, 60)}`
        writeFileSync(join(OUT, `${name}.base.png`), PNG.sync.write(r.a)); writeFileSync(join(OUT, `${name}.cur.png`), PNG.sync.write(r.b)); writeFileSync(join(OUT, `${name}.diff.png`), PNG.sync.write(r.d))
      }
    }
  } catch (e) {
    rows.push({ path, width, t: '—', error: String(e.message || e).slice(0, 160) })
  } finally {
    await pa?.close().catch(() => {}); await pb?.close().catch(() => {})
  }
})
await browser.close(); srvBase.close(); srvCur.close()

const bad = rows.filter((r) => r.error || r.pct > THRESHOLD)
const n = (k) => rows.filter((r) => r.kind === k).length
if (bad.length) {
  console.log(`\nОтличаются (> ${THRESHOLD}%):`)
  for (const r of bad) console.log(`  ${r.error ? '✗ ' + r.error : r.pct.toFixed(2).padStart(6) + '%'}  ${r.path} @${r.width}  ${r.t}`)
}
console.log(`\ncheck:states — ${rows.length} состояний (щелчков ${n('click')}, наведений ${n('hover')}) на ${list.length} стр., время ${ms(t0)}`)
if (bad.length) { console.log(`  картинки (base / cur / diff): ${OUT}\n  ✗ отличий: ${bad.length}`); process.exit(1) }
console.log('  ✓ состояния совпадают с эталоном')
