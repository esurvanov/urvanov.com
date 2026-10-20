// Проверка вёрстки собранного сайта в headless Chrome: каждая страница из sitemap (+ витрина блоков) на 1280 и 390 px.
// Ищет «в покое», без наведения:
//   а) видимые всплывашки: ::before/::after с position:absolute, непрозрачным фоном и текстом; [role=tooltip] и *tip* на виду;
//   б) ссылки с двумя значками (стрелка из ::after + svg или стрелка в тексте) и стрелку внутри кнопок/чипсов;
//   в) горизонтальную прокрутку страницы и элементы, вылезающие за край экрана;
//   г) текст, обрезанный контейнером с overflow:hidden (scrollWidth заметно больше clientWidth) внутри <main>;
//   д) ошибки в консоли, необработанные исключения и 404 своих ресурсов.
//
//   npm run check:layout -- [--dist <dir>] [--only /blog/] [--pages /a/,/b/] [--concurrency 6] [--widths 1280,390]
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { parseArgs, ms, sitePages, serve, pool, launchChrome, isolatePage, FREEZE_CSS, EXTRA_PAGES } from './checks-lib.mjs'

const t0 = Date.now()
const args = parseArgs()
const DIST = args.dist || 'dist'
const ONLY = typeof args.only === 'string' ? args.only : ''
const WIDTHS = String(args.widths || '1280,390').split(',').map(Number)
const CONCURRENCY = Number(args.concurrency || 6)
const extra = [...EXTRA_PAGES, ...(typeof args.pages === 'string' ? args.pages.split(',') : [])]

if (!existsSync(join(DIST, 'sitemap.xml'))) {
  console.error(`Нет сборки: ${DIST}/sitemap.xml (сначала npm run build)`)
  process.exit(2)
}

const pages = sitePages(DIST, { only: ONLY, extra })
const server = await serve(DIST)
const browser = await launchChrome()

// Выполняется в странице. Возвращает найденные проблемы по типам.
function inspect() {
  const W = document.documentElement.clientWidth
  const out = { popover: [], tooltip: [], doubleIcon: [], arrowInButton: [], overflow: [], outside: [], clipped: [] }
  const ARROW = /[↗→↘↓↑←⟶➜➔›»⇢↪⤴]/
  // В тексте ссылки кавычки «» — не значок, поэтому отдельный набор без них
  const TEXT_ARROW = /[↗→↘↓↑←⟶➜➔⇢↪⤴]/

  // Короткий селектор для отчёта: tag.class1.class2 у элемента и двух предков
  const name = (el) => {
    const one = (e) => e.tagName.toLowerCase() + (e.id ? `#${e.id}` : '') + [...e.classList].slice(0, 2).map((c) => `.${c}`).join('')
    const parts = []
    for (let e = el, i = 0; e && e !== document.body && i < 3; e = e.parentElement, i++) parts.unshift(one(e))
    return parts.join(' > ')
  }
  const alpha = (c) => {
    if (!c || c === 'transparent') return 0
    const m = c.match(/rgba?\(([^)]+)\)/)
    if (!m) return 1
    const p = m[1].split(/[ ,/]+/).filter(Boolean)
    return p.length > 3 ? parseFloat(p[3]) * (p[3].endsWith('%') ? 0.01 : 1) : 1
  }
  const hasContent = (cs) => cs.content && cs.content !== 'none' && cs.content !== 'normal'
  const textContent = (cs) => hasContent(cs) && cs.content !== '""' && cs.content !== "''"
  const shown = (cs) => cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0.05
    && cs.transform !== 'matrix(0, 0, 0, 0, 0, 0)' && !/scale\(0\)/.test(cs.transform) && cs.clipPath === 'none'
  const px = (v) => parseFloat(v) || 0
  const short = (s) => (s.length > 50 ? s.slice(0, 49) + '…' : s)

  const all = document.body.querySelectorAll('*')
  const main = document.querySelector('main') || document.body

  for (const el of all) {
    if (el.closest('svg') && el.tagName.toLowerCase() !== 'svg') continue
    if (!el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue
    const cs = getComputedStyle(el)

    // а) псевдоэлементы-всплывашки: абсолют, непрозрачный фон, есть текст, заметный размер
    for (const pseudo of ['::before', '::after']) {
      const ps = getComputedStyle(el, pseudo)
      if (!textContent(ps) || !shown(ps)) continue
      if (!/absolute|fixed/.test(ps.position)) continue
      if (alpha(ps.backgroundColor) < 0.5 && ps.backgroundImage === 'none') continue
      const w = px(ps.width), h = px(ps.height)
      if (w > 60 && h > 14) out.popover.push(`${name(el)}${pseudo} ${Math.round(w)}×${Math.round(h)} «${short(ps.content.replace(/^"|"$/g, ''))}»`)
    }

    // а) элементы-подсказки, которые должны быть скрыты до наведения
    const cls = typeof el.className === 'string' ? el.className : ''
    if (el.getAttribute('role') === 'tooltip' || /(^|[\s_-])(tip|tooltip|popover)([\s_-]|$)|tooltip|popover/i.test(cls)) {
      if (/absolute|fixed/.test(cs.position) && alpha(cs.backgroundColor) >= 0.5 && el.textContent.trim() && el.getBoundingClientRect().width > 60) {
        out.tooltip.push(`${name(el)} «${short(el.textContent.trim())}»`)
      }
    }

    // б) ссылки: значок из ::after/::before вдобавок к своему значку; стрелка в кнопке/чипсе
    if (el.tagName === 'A') {
      const icons = ['::before', '::after'].map((p) => getComputedStyle(el, p)).filter((ps) => shown(ps) && hasContent(ps)
        && (ARROW.test(ps.content) || (!textContent(ps) && (ps.maskImage !== 'none' || ps.webkitMaskImage !== 'none' || ps.backgroundImage !== 'none') && px(ps.width) <= 24)))
      if (icons.length) {
        const txt = el.textContent.trim()
        const own = el.querySelector('svg, img') ? 'svg/img' : TEXT_ARROW.test(txt.slice(-2)) || TEXT_ARROW.test(txt.slice(0, 2)) ? `текст «${short(txt)}»` : ''
        if (own) out.doubleIcon.push(`${name(el)}: псевдо «${icons[0].content.replace(/^"|"$/g, '')}» + ${own}`)
        const buttonish = /^(inline-)?(flex|block|grid)$|inline-block/.test(cs.display)
          && (alpha(cs.backgroundColor) >= 0.5 || (px(cs.borderTopWidth) > 0 && px(cs.borderTopLeftRadius) >= 6) || /btn|button|chip|pill|tag|badge/i.test(cls))
        if (buttonish && !own) out.arrowInButton.push(`${name(el)} «${short(el.textContent.trim())}» + «${icons[0].content.replace(/^"|"$/g, '')}»`)
      }
    }

    // в) вылезает за край экрана (кроме случаев, когда внутренний контейнер обрезает или прокручивает)
    const r = el.getBoundingClientRect()
    if (r.width > 0 && r.height > 0 && (r.right > W + 1 || r.left < -1) && cs.position !== 'fixed') {
      let clippedBy = null
      for (let p = el.parentElement; p && p !== document.body && p !== document.documentElement; p = p.parentElement) {
        if (getComputedStyle(p).overflowX !== 'visible') { clippedBy = p; break }
      }
      // визуально скрытые элементы для скринридеров
      const srOnly = r.width <= 2 || r.height <= 2 || cs.clip !== 'auto'
      if (!clippedBy && !srOnly) {
        const parent = el.parentElement?.getBoundingClientRect()
        const parentOut = parent && (parent.right > W + 1 || parent.left < -1) && el.parentElement !== document.body
        if (!parentOut) out.outside.push(`${name(el)} ${Math.round(r.left)}…${Math.round(r.right)} при ширине ${W}`)
      }
    }

    // г) обрезанный по ширине текст внутри <main>
    if (main.contains(el) && /hidden|clip/.test(cs.overflowX) && el.scrollWidth > el.clientWidth + 24 && el.clientWidth > 2 && el.clientHeight > 2
      && cs.textOverflow !== 'ellipsis' && el.textContent.trim().length > 3) {
      out.clipped.push(`${name(el)} ${el.scrollWidth}>${el.clientWidth} «${short(el.textContent.trim().replace(/\s+/g, ' '))}»`)
    }
  }

  const sw = document.documentElement.scrollWidth
  if (sw > W + 1) out.overflow.push(`ширина документа ${sw} при экране ${W}`)
  return out
}

const TYPES = {
  popover: '🟥 Видимые всплывашки из ::before/::after без наведения',
  tooltip: '🟥 Видимые подсказки ([role=tooltip], *tip*) без наведения',
  doubleIcon: '🟧 Ссылки с двумя значками',
  arrowInButton: '🟧 Стрелка ссылки внутри кнопки/чипса',
  overflow: '🟧 Горизонтальная прокрутка страницы',
  outside: '🟨 Элементы за краем экрана',
  clipped: '🟨 Обрезанный текст (overflow:hidden) в <main>',
  console: '🟥 Ошибки в консоли / 404 ресурсов',
  load: '🟥 Страница не открылась',
}
const found = Object.fromEntries(Object.keys(TYPES).map((k) => [k, []])) // тип → [{ page, width, items }]

const tasks = pages.flatMap((p) => WIDTHS.map((w) => ({ path: p, width: w })))
let done = 0
await pool(tasks, CONCURRENCY, async ({ path, width }) => {
  const page = await browser.newPage()
  const errors = []
  try {
    await isolatePage(page, server.origin)
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1, isMobile: width < 600, hasTouch: width < 600 })
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }, { name: 'prefers-color-scheme', value: 'light' }])
    await page.evaluateOnNewDocument((css) => {
      document.addEventListener('DOMContentLoaded', () => { const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s) })
    }, FREEZE_CSS)
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)) })
    page.on('pageerror', (e) => errors.push(`исключение: ${String(e.message || e).slice(0, 200)}`))
    page.on('response', (r) => { if (r.status() >= 400 && r.url().startsWith(server.origin) && r.url() !== server.origin + path) errors.push(`${r.status()} ${r.url().slice(server.origin.length)}`) })
    const res = await page.goto(server.origin + path, { waitUntil: 'load', timeout: 30000 })
    if (!res || res.status() >= 400) found.load.push({ page: path, width, items: [`HTTP ${res?.status()}`] })
    await page.evaluate(() => document.fonts.ready)
    await new Promise((r) => setTimeout(r, 250)) // гидратация React и отложенные эффекты
    const r = await page.evaluate(inspect)
    for (const [k, items] of Object.entries(r)) if (items.length) found[k].push({ page: path, width, items })
    // «404» без адреса дублирует строку из response — оставляем только адресные
    const errs = [...new Set(errors.filter((e) => !/^Failed to load resource: the server responded with a status of 404/.test(e)))]
    if (errs.length) found.console.push({ page: path, width, items: errs })
  } catch (e) {
    found.load.push({ page: path, width, items: [String(e.message || e).slice(0, 200)] })
  } finally {
    await page.close().catch(() => {})
    if (++done % 100 === 0) process.stderr.write(`  … ${done}/${tasks.length}\n`)
  }
})
await browser.close()
server.close()

// ---------- отчёт: тип проблемы → страницы ----------
let problems = 0
for (const [k, title] of Object.entries(TYPES)) {
  const list = found[k]
  if (!list.length) continue
  const byPage = new Map()
  for (const f of list) {
    const e = byPage.get(f.page) ?? { widths: [], items: new Set() }
    e.widths.push(f.width)
    for (const i of f.items) e.items.add(i)
    byPage.set(f.page, e)
  }
  problems += byPage.size
  console.log(`\n${title}: ${byPage.size} стр.`)
  for (const [p, e] of [...byPage].sort()) {
    const items = [...e.items]
    console.log(`  ${p} @${e.widths.sort((a, b) => b - a).join('/')}`)
    for (const i of items.slice(0, args.full ? Infinity : 3)) console.log(`      ${i}`)
    if (items.length > 3 && !args.full) console.log(`      … ещё ${items.length - 3} (--full)`)
  }
}
console.log(`\ncheck:layout — ${DIST}: ${pages.length} стр. × ${WIDTHS.join('/')} px, время ${ms(t0)}`)
if (problems) {
  console.log(`  ✗ проблем: ${problems} (страница × тип)`)
  process.exit(1)
}
console.log('  ✓ проблем нет')
