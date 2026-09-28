import { useEffect, useLayoutEffect } from 'react'
import { flushSync } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'

type VTDocument = Document & { startViewTransition?: (update: () => void) => unknown }

// Переходы между страницами без рывков:
// 1) новая страница открывается с начала (или сразу на якоре), а не с прокрутки прошлой;
// 2) там, где браузер умеет View Transitions, старая страница плавно перетекает в новую,
//    а шапка сайта плавно меняет ширину (у широких постов она шире).
export function useSmoothNavigation() {
  const navigate = useNavigate()
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
    // hash — только для первого входа на страницу с якорем, дальше якоря листает браузер
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    const doc = document as VTDocument
    if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      // только ссылки роутера (у них data-discover): игры и мастерская — отдельные сайты, их не трогаем
      const a = (e.target as Element | null)?.closest?.('a[data-discover]') as HTMLAnchorElement | null
      if (!a || (a.target && a.target !== '_self')) return
      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return
      // Link роутера сам не переходит, если событие уже отменено; аналитика кликов при этом срабатывает как обычно
      e.preventDefault()
      doc.startViewTransition!(() => flushSync(() => navigate(url.pathname + url.search + url.hash)))
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [navigate])
}
