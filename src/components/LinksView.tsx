import { useNavigate } from 'react-router-dom'
import { LINK_GROUPS, type LinkItem } from '@/data/links'
import { closeTarget } from '@/lib/closeTarget'

const TINTS = ['s-tint-coral', 's-tint-amber', 's-tint-violet', 's-tint-mint']

// Внутренние ссылки открываем в той же вкладке, внешние — в новой
const linkProps = (url: string) =>
  url.startsWith('/') ? {} : { target: '_blank', rel: 'noopener noreferrer' }

function Cards({ items }: { items: LinkItem[] }) {
  return (
    <div className="s-bento">
      {items.map((item, i) => (
        <a key={item.label} href={item.url} {...linkProps(item.url)} className={`s-card s-span-4 ${TINTS[i % TINTS.length]}`}>
          <span className="s-card-title">{item.label}</span>
          {item.comment && <span className="s-card-text">{item.comment}</span>}
        </a>
      ))}
    </div>
  )
}

function List({ items }: { items: LinkItem[] }) {
  return (
    <ul className="s-list">
      {items.map((item) => (
        <li key={item.label} className="s-row">
          <a href={item.url} {...linkProps(item.url)}>
            {item.label}
          </a>
          {item.comment && <span>{item.comment}</span>}
        </li>
      ))}
    </ul>
  )
}

function Pills({ items }: { items: LinkItem[] }) {
  return (
    <div className="s-pills">
      {items.map((item) => (
        <a key={item.label} href={item.url} {...linkProps(item.url)} className="s-pill">
          {item.label}
        </a>
      ))}
    </div>
  )
}

export default function LinksView() {
  const navigate = useNavigate()

  return (
    <div className="site">
      <div className="s-wrap">
        <button className="s-back" onClick={() => navigate(closeTarget())}>
          ← Назад
        </button>
        <h1 className="s-page-title">Ссылки</h1>

        {LINK_GROUPS.map((group) => (
          <section key={group.title} className="s-group">
            <h2 className="s-label">{group.title}</h2>
            {group.blocks.map((block, i) => (
              <div key={block.title ?? i} className="s-block">
                {block.title && <h3 className="s-step-name">{block.title}</h3>}
                {block.variant === 'cards' && <Cards items={block.items} />}
                {block.variant === 'list' && <List items={block.items} />}
                {block.variant === 'pills' && <Pills items={block.items} />}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}
