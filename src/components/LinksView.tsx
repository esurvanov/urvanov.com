import { useNavigate } from 'react-router-dom'
import { LINK_GROUPS, type LinkItem } from '@/data/links'
import { closeTarget } from '@/lib/closeTarget'

// Внутренние ссылки открываем в той же вкладке, внешние — в новой
const linkProps = (url: string) =>
  url.startsWith('/') ? {} : { target: '_blank', rel: 'noopener noreferrer' }

function Cards({ items }: { items: LinkItem[] }) {
  return (
    <div className="lk-cards">
      {items.map((item) => (
        <a key={item.label} href={item.url} {...linkProps(item.url)} className="home-metric lk-card">
          <span className="lk-card-title">{item.label}</span>
          {item.comment && <span className="home-metric-label">{item.comment}</span>}
        </a>
      ))}
    </div>
  )
}

function List({ items }: { items: LinkItem[] }) {
  return (
    <ul className="lk-list">
      {items.map((item) => (
        <li key={item.label} className="lk-row">
          <a href={item.url} {...linkProps(item.url)} className="lk-row-link">
            {item.label}
          </a>
          {item.comment && <span className="lk-row-comment">{item.comment}</span>}
        </li>
      ))}
    </ul>
  )
}

function Pills({ items }: { items: LinkItem[] }) {
  return (
    <div className="home-contacts">
      {items.map((item) => (
        <a key={item.label} href={item.url} {...linkProps(item.url)} className="home-contact">
          {item.label}
        </a>
      ))}
    </div>
  )
}

export default function LinksView() {
  const navigate = useNavigate()

  return (
    <div className="home-page lk-page">
      <button className="jaiora-back" onClick={() => navigate(closeTarget())}>
        ← Назад
      </button>
      <h1 className="lk-title">Ссылки</h1>

      {LINK_GROUPS.map((group) => (
        <section key={group.title} className="lk-group">
          <h2 className="jaiora-h2">{group.title}</h2>
          {group.blocks.map((block, i) => (
            <div key={block.title ?? i} className="lk-block">
              {block.title && <h3 className="home-group-title">{block.title}</h3>}
              {block.variant === 'cards' && <Cards items={block.items} />}
              {block.variant === 'list' && <List items={block.items} />}
              {block.variant === 'pills' && <Pills items={block.items} />}
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
