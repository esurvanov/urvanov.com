// Счётчики подключены в index.html (ID берутся из analytics.json при сборке).
// Здесь: просмотры страниц при SPA-переходах и события (клики, интерес к секциям, глубина прокрутки).
// Список событий и настройка отчётов — docs/analytics.md.
declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
    __ANALYTICS__?: { ym?: number; gtag?: string }
  }
}

type Params = Record<string, string | number | undefined>

// Игры выкладываются рядом с сайтом отдельными страницами
const GAME_PATHS = ['age-of-empires', 'berezovka', 'sibiria', 'ekho-razloma', 'severny-razlom', 'skhodka', 'work-programmer']

const clip = (s: string, n = 100) => (s.length > n ? s.slice(0, n) : s)
const pageOf = (path = location.pathname) => path.replace(/\/+$/, '') || '/'

// Одно событие в обе системы. Без счётчиков (блокировщик, нет ID) — тихо ничего не делает.
export function track(name: string, params: Params = {}, opts: { beacon?: boolean } = {}) {
  const ids = typeof window === 'undefined' ? undefined : window.__ANALYTICS__
  if (!ids) return
  const p: Record<string, string | number> = {}
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === '') continue
    p[k] = typeof v === 'string' ? clip(v) : v
  }
  try {
    if (ids.ym && typeof window.ym === 'function') window.ym(ids.ym, 'reachGoal', name, p)
  } catch {
    /* счётчик не должен ломать сайт */
  }
  try {
    if (ids.gtag && typeof window.gtag === 'function') window.gtag('event', name, opts.beacon ? { ...p, transport_type: 'beacon' } : p)
  } catch {
    /* счётчик не должен ломать сайт */
  }
}

let first = true

function trackPageView(path: string) {
  if (first) {
    first = false // первый просмотр уже отправлен самими сниппетами
    return
  }
  const ids = window.__ANALYTICS__
  if (!ids) return
  const url = location.origin + path
  try {
    if (ids.ym && typeof window.ym === 'function') window.ym(ids.ym, 'hit', url)
    if (ids.gtag && typeof window.gtag === 'function') window.gtag('event', 'page_view', { page_path: path, page_location: url, page_title: document.title })
  } catch {
    /* счётчик не должен ломать сайт */
  }
}

// ——— Где на странице: ближайшая размеченная секция ———

// Имя секции у самого элемента: data-track-section, id, aria-labelledby у <section>
function ownSection(el: Element): string | undefined {
  const d = el.getAttribute('data-track-section')
  if (d) return d
  if (el.id && el.id !== 'root') return el.id
  if (el.tagName === 'SECTION') return el.getAttribute('aria-labelledby') ?? undefined
  return undefined
}

// Без разметки — по ближайшему header / nav / footer, иначе main
function sectionOf(el: Element | null): string {
  let fallback = ''
  for (let n = el; n && n !== document.body; n = n.parentElement) {
    const s = ownSection(n)
    if (s) return s
    const tag = n.tagName
    if (!fallback && (tag === 'HEADER' || tag === 'FOOTER' || tag === 'NAV')) fallback = tag.toLowerCase()
    if (tag === 'MAIN') break
  }
  return fallback || 'main'
}

const labelOf = (el: Element) =>
  clip((el.getAttribute('data-track-label') || el.getAttribute('aria-label') || el.textContent || '').replace(/[↗→↓]/g, '').replace(/\s+/g, ' ').trim(), 60)

// ——— Клики: один обработчик на весь документ ———

function onClick(e: MouseEvent) {
  const el = (e.target as Element | null)?.closest?.('a[href], button, [data-track]')
  if (!el) return
  const page = pageOf()
  const section = sectionOf(el)
  const label = labelOf(el)

  // Явная разметка заметных кнопок: data-track="cta" + data-track-id
  const kind = el.getAttribute('data-track')
  if (kind === 'cta') track('cta_click', { id: el.getAttribute('data-track-id') ?? label, label, section, page })

  const network = el.getAttribute('data-track-network')
  if (network) track('contact_click', { network, section, page }, { beacon: true })

  if (el.tagName !== 'A') return
  const href = el.getAttribute('href') ?? ''
  if (href.startsWith('#')) return
  if (/^(mailto|tel):/i.test(href)) {
    if (!network) track('contact_click', { network: href.split(':')[0].toLowerCase(), section, page })
    return
  }
  let url: URL
  try {
    url = new URL(href, location.href)
  } catch {
    return
  }
  if (!/^https?:$/.test(url.protocol)) return

  if (url.host !== location.host) {
    // Без query и hash: там бывают метки и токены
    track('outbound_click', { url: url.origin + url.pathname, host: url.host.replace(/^www\./, ''), label, section, page }, { beacon: true })
    return
  }
  const to = pageOf(url.pathname)
  const game = GAME_PATHS.find((g) => to === '/' + g || to.startsWith('/' + g + '/'))
  if (game) {
    track('game_open', { game, from: page, section }, { beacon: true })
    return
  }
  if (kind === 'cta') return // переключатель языка и т. п. — уже учтён как cta_click
  track(el.closest('nav') ? 'nav_click' : 'material_click', { target: to, label, section, page })
}

// ——— Интерес: какие секции смотрели и насколько глубоко листали ———

let io: IntersectionObserver | null = null
const timers = new Map<Element, number>()
let seenSections = new Set<string>()
let depths = new Set<number>()
let current = ''

function observeSections() {
  io?.disconnect()
  timers.forEach((t) => clearTimeout(t))
  timers.clear()
  if (typeof IntersectionObserver === 'undefined') return
  const page = current
  io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        const el = en.target
        const name = ownSection(el)
        if (!name || seenSections.has(name)) continue
        // Видна на 50% — или занимает больше половины экрана (длинные секции целиком не помещаются)
        const vh = en.rootBounds?.height || window.innerHeight
        const visible = en.isIntersecting && (en.intersectionRatio >= 0.5 || en.intersectionRect.height >= vh / 2)
        if (visible && !timers.has(el)) {
          timers.set(el, window.setTimeout(() => {
            timers.delete(el)
            if (seenSections.has(name) || current !== page) return
            seenSections.add(name)
            track('section_view', { section: name, page })
            io?.unobserve(el)
          }, 1000))
        } else if (!visible && timers.has(el)) {
          clearTimeout(timers.get(el))
          timers.delete(el)
        }
      }
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1] },
  )
  // Только содержимое страницы: шапка, крошки и прочая навигация видны всегда и ничего не говорят об интересе
  document.querySelectorAll('main section[id], main section[aria-labelledby], main [data-track-section]:not(nav)').forEach((el) => io?.observe(el))
}

let scrollQueued = false
function onScroll() {
  if (scrollQueued) return
  scrollQueued = true
  requestAnimationFrame(() => {
    scrollQueued = false
    const doc = document.documentElement
    if (doc.scrollHeight <= window.innerHeight) return
    const pct = ((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100
    for (const d of [25, 50, 75, 100]) {
      if (pct >= (d === 100 ? 98 : d) && !depths.has(d)) {
        depths.add(d)
        track('scroll_depth', { depth: d, page: current })
      }
    }
  })
}

let listening = false

// Вызывается на каждом просмотре страницы (первом и при SPA-переходах)
export function startPage(path: string) {
  if (typeof window === 'undefined') return
  trackPageView(path)
  if (!listening) {
    listening = true
    document.addEventListener('click', onClick, true)
    window.addEventListener('scroll', onScroll, { passive: true })
  }
  current = pageOf(path)
  seenSections = new Set()
  depths = new Set()
  // Дать React дорисовать новую страницу
  window.setTimeout(observeSections, 0)
}
