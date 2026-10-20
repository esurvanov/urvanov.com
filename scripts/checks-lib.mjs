// Общие помощники для проверок перед выкладкой (check-text / check-layout / check-visual):
// разбор аргументов, статический сервер для dist/, список страниц из sitemap, пул параллельных задач, запуск Chrome.
import { createServer } from 'node:http'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { extname, join, resolve, sep } from 'node:path'
import { tmpdir } from 'node:os'

export const DEFAULT_BASELINE = process.env.BASELINE_DIST
  || '/private/tmp/claude-501/-Users-egurvanov-python-urvanov-com/4724df9c-7c7a-4b1f-bbb9-a2d0c36b974b/scratchpad/baseline-dist'

// Страницы вне sitemap, которые тоже стоит проверять (витрина блоков появляется вместе с библиотекой блоков)
export const EXTRA_PAGES = ['/materials/blocks/', '/en/materials/blocks/']

// --key value / --flag → { key: value, flag: true }
export function parseArgs(argv = process.argv.slice(2)) {
  const out = {}
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (!a.startsWith('--')) continue
    const key = a.slice(2)
    const next = argv[i + 1]
    if (next === undefined || next.startsWith('--')) out[key] = true
    else { out[key] = next; i++ }
  }
  return out
}

export const ms = (t0) => `${((Date.now() - t0) / 1000).toFixed(1)} с`

// Пути страниц из sitemap.xml (без домена), плюс дополнительные, если они есть в сборке
export function sitePages(dist, { only, extra = EXTRA_PAGES } = {}) {
  const xml = readFileSync(join(dist, 'sitemap.xml'), 'utf8')
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
  for (const p of extra) if (!paths.includes(p) && existsSync(join(dist, p, 'index.html'))) paths.push(p)
  return only ? paths.filter((p) => p.startsWith(only)) : paths
}

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.xml': 'application/xml',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.wasm': 'application/wasm', '.pdf': 'application/pdf',
}

// Простой статический сервер, ведёт себя как GitHub Pages: /x/ → /x/index.html, /x → /x/index.html или /x.html, иначе 404.html
export function serve(dir) {
  const root = resolve(dir)
  const server = createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname)
    let file = join(root, p)
    if (!file.startsWith(root + sep) && file !== root) { res.writeHead(403); return res.end() }
    const isFile = (f) => existsSync(f) && statSync(f).isFile()
    if (!isFile(file)) {
      if (isFile(join(file, 'index.html'))) file = join(file, 'index.html')
      else if (isFile(file + '.html')) file = file + '.html'
      else {
        res.writeHead(404, { 'content-type': TYPES['.html'] })
        return res.end(isFile(join(root, '404.html')) ? readFileSync(join(root, '404.html')) : 'not found')
      }
    }
    res.writeHead(200, { 'content-type': TYPES[extname(file).toLowerCase()] || 'application/octet-stream' })
    res.end(readFileSync(file))
  })
  return new Promise((ok) => server.listen(0, '127.0.0.1', () => ok({ origin: `http://127.0.0.1:${server.address().port}`, close: () => server.close() })))
}

// Выполняет fn над всеми элементами, не больше limit одновременно
export async function pool(items, limit, fn) {
  const results = new Array(items.length)
  let next = 0
  const worker = async () => {
    while (next < items.length) {
      const i = next++
      results[i] = await fn(items[i], i)
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return results
}

export async function launchChrome() {
  const { default: puppeteer } = await import('puppeteer-core')
  const executablePath = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  return puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--font-render-hinting=none', '--disable-lcd-text'],
  })
}

// Внешние запросы (счётчики, внешние картинки) отвечаем пустышкой: быстро, стабильно и без визитов в аналитику.
// Шрифты Google пропускаем (через кэш ниже) — без них вёрстка другая.
const ALLOWED_HOSTS = new Set(['fonts.googleapis.com', 'fonts.gstatic.com'])
// Шрифты Google скачиваем один раз за запуск и дальше отдаём из памяти: сотни страниц не ждут сеть,
// а медленный ответ Google не роняет загрузку страницы по таймауту
const fontCache = new Map() // url → Promise<{ status, contentType, body }>
async function respondCached(req, url) {
  if (!fontCache.has(url)) {
    fontCache.set(url, fetch(url, { headers: { 'user-agent': req.headers()['user-agent'] || 'Mozilla/5.0' }, signal: AbortSignal.timeout(15000) })
      .then(async (r) => ({ status: r.status, contentType: r.headers.get('content-type') || 'application/octet-stream', body: Buffer.from(await r.arrayBuffer()) }))
      .catch(() => ({ status: 200, contentType: 'text/plain', body: Buffer.alloc(0) })))
  }
  const r = await fontCache.get(url)
  return req.respond({ status: r.status, contentType: r.contentType, body: r.body, headers: { 'access-control-allow-origin': '*' } })
}

export async function isolatePage(page, origin) {
  await page.setRequestInterception(true)
  page.on('request', (req) => {
    const url = req.url()
    if (url.startsWith(origin) || url.startsWith('data:') || url.startsWith('blob:')) return req.continue()
    let host = ''
    try { host = new URL(url).host } catch { /* не URL */ }
    if (ALLOWED_HOSTS.has(host)) return respondCached(req, url)
    const type = req.resourceType()
    const contentType = type === 'script' ? 'text/javascript' : type === 'stylesheet' ? 'text/css' : 'text/plain'
    return req.respond({ status: 200, contentType, body: '' })
  })
}

// Стили, которые убирают анимации, переходы и мигающий курсор — для стабильных скриншотов и замеров
export const FREEZE_CSS = `*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;animation-iteration-count:1!important;transition:none!important;caret-color:transparent!important;scroll-behavior:auto!important}`

export function outDir(args, name) {
  if (args.out) return resolve(args.out)
  const cache = join(process.cwd(), 'node_modules', '.cache')
  return existsSync(join(process.cwd(), 'node_modules')) ? join(cache, 'site-checks', name) : join(tmpdir(), 'site-checks', name)
}
