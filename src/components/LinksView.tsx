import { useNavigate } from 'react-router-dom'

import { LINK_SECTIONS } from '@/data/links'
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
        {LINK_SECTIONS.map((section) => (
          <div key={section.title} className="links-section">
            <h2 className="links-section-title">{section.title}</h2>
            <ul className="links-list">
              {section.items.map((item) => (
                <li key={item.url} className="links-item">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="links-link">
                    {item.label}
                  </a>
                  {item.comment && <span className="links-comment">{item.comment}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
