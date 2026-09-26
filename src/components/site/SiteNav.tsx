import { Link, NavLink } from 'react-router-dom'

const ITEMS = [
  { to: '/about', label: 'Обо мне' },
  { to: '/blog', label: 'Блог' },
  { to: '/materials', label: 'Материалы' },
  { to: '/links', label: 'Ссылки' },
  { to: '/jaiora', label: 'Jaiora' },
]

export default function SiteNav() {
  return (
    <header className="s-nav">
      <Link to="/" className="s-nav-home">Егор Урванов</Link>
      <nav aria-label="Разделы">
        {ITEMS.map((i) => (
          <NavLink key={i.to} to={i.to} className={({ isActive }) => `s-nav-link${isActive ? ' is-active' : ''}`}>
            {i.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
