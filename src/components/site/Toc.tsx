import { useEffect, useState } from 'react'

// Оглавление сбоку: подсвечивает раздел, который сейчас на экране
export default function Toc({ items, label }: { items: { id: string; label: string }[]; label: string }) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-20% 0px -70% 0px' },
    )
    items.forEach((it) => { const el = document.getElementById(it.id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [items])
  return (
    <nav className="s-toc" aria-label={label}>
      <div className="s-toc-t">{label}</div>
      <ol>
        {items.map((it) => (
          <li key={it.id}><a href={`#${it.id}`} className={active === it.id ? 'is-on' : undefined}>{it.label}</a></li>
        ))}
      </ol>
    </nav>
  )
}
