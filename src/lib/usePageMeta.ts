import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { metaFor, SITE_URL } from '@/data/seo'
import { trackPageView } from '@/lib/analytics'

function setTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

// Статичный HTML уже содержит нужные теги; хук обновляет их при переходах внутри SPA.
export function usePageMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const m = metaFor(pathname.replace(/\/$/, '') || '/')
    if (m) {
      document.title = m.title
      setTag('meta[name="description"]', () => Object.assign(document.createElement('meta'), { name: 'description' }), 'content', m.description)
      setTag('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', SITE_URL + (m.path.endsWith('/') ? m.path : m.path + '/'))
    }
    trackPageView(pathname)
  }, [pathname])
}
