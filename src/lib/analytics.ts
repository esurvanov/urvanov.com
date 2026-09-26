// Счётчики подключены в index.html (ID берутся из analytics.json при сборке).
// SPA не перезагружает страницу, поэтому переходы между разделами отправляем вручную.
declare global {
  interface Window {
    ym?: (id: number, action: string, url?: string) => void
    gtag?: (...args: unknown[]) => void
    __ANALYTICS__?: { ym?: number; gtag?: string }
  }
}

let first = true

export function trackPageView(path: string) {
  if (first) {
    first = false // первый просмотр уже отправлен самими сниппетами
    return
  }
  const ids = window.__ANALYTICS__
  if (!ids) return
  const url = location.origin + path
  if (ids.ym && window.ym) window.ym(ids.ym, 'hit', url)
  if (ids.gtag && window.gtag) window.gtag('event', 'page_view', { page_path: path, page_location: url, page_title: document.title })
}
