import { useEffect, type RefObject } from 'react'

const LINK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>'
const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'

const slugify = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'section'

/** Каждому заголовку раздела (h2–h4) на странице даёт id и кнопку «скопировать ссылку на раздел» */
export function useHeadingAnchors(ref: RefObject<HTMLElement | null>, label: string, done: string) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const enhance = () => {
      const used = new Set<string>(Array.from(root.querySelectorAll('[id]')).map((e) => e.id))
      root.querySelectorAll<HTMLElement>('h2, h3, h4').forEach((h) => {
        if (h.dataset.anchor || h.closest('details:not([open]) summary')) return
        const sec = h.closest('section[id]')
        let target = h.id
        if (!target && sec && sec.querySelector('h2, h3, h4') === h) target = sec.id
        if (!target) {
          const base = slugify(h.textContent ?? '')
          target = base; for (let i = 2; used.has(target); i++) target = `${base}-${i}`
          used.add(target); h.id = target
        }
        h.dataset.anchor = '1'
        const b = document.createElement('button')
        b.type = 'button'; b.className = 's-anchor'; b.title = label; b.setAttribute('aria-label', label); b.innerHTML = LINK
        b.addEventListener('click', async (e) => {
          e.preventDefault(); e.stopPropagation()
          const url = `${location.origin}${location.pathname}${location.search}#${target}`
          try { await navigator.clipboard.writeText(url) } catch {
            const ta = document.createElement('textarea'); ta.value = url; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy') } catch { /* нет доступа к буферу */ } ta.remove()
          }
          history.replaceState(null, '', `#${target}`)
          b.innerHTML = CHECK; b.dataset.done = done
          setTimeout(() => { b.innerHTML = LINK; delete b.dataset.done }, 1600)
        })
        h.appendChild(b)
      })
    }
    enhance()
    let raf = 0
    const mo = new MutationObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(enhance) })
    mo.observe(root, { childList: true, subtree: true })
    return () => { mo.disconnect(); cancelAnimationFrame(raf) }
  }, [ref, label, done])
}
