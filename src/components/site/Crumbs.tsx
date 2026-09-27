import { Link } from 'react-router-dom'

export interface Crumb { to?: string; label: string }

export default function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="s-crumbs" data-track-section="crumbs" aria-label="Хлебные крошки">
      <ol>
        {items.map((c, i) => (
          <li key={c.label}>
            {c.to && i < items.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
