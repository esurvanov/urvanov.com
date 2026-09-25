import { useNavigate } from 'react-router-dom'

import { LINK_GROUPS, LINK_SECTIONS } from '@/data/links'
import { closeTarget } from '@/lib/closeTarget'

export default function LinksView() {
  const navigate = useNavigate()

  return (
    <div className="links-page">
      <div className="links-header">
        <span className="links-title">Ссылки</span>
        <button className="links-close" onClick={() => navigate(closeTarget())}>✕</button>
      </div>
      <div className="links-content">
        {LINK_GROUPS.map((group) => (
          <div key={group.title} className="links-group">
            <h1 className="links-group-title">{group.title}</h1>
            {group.sections.map((title) => LINK_SECTIONS.find((sec) => sec.title === title)).filter(Boolean).map((section) => (
              <div key={section!.title} className="links-section">
                {group.sections.length > 1 && <h2 className="links-section-title">{section!.title}</h2>}
                <ul className="links-list">
                  {section!.items.map((item) => (
                    <li key={item.url} className="links-item">
                      <a
                        href={item.url}
                        {...(item.url.startsWith('/') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                        className="links-link"
                      >
                        {item.label}
                      </a>
                      {item.comment && <span className="links-comment">{item.comment}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
