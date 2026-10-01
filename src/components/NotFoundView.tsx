import { Link } from 'react-router-dom'
import Page from '@/components/site/Page'
import { NAV_ITEMS } from '@/data/nav'

// Единая страница на все несуществующие адреса (GitHub Pages отдаёт её как 404.html для любого
// пути), поэтому язык посетителя заранее не известен — текст и ссылки идут сразу на двух языках.
export default function NotFoundView() {
  return (
    <Page nav={false}>
      <header className="s-section" style={{ borderTop: 'none' }}>
        <p className="s-eyebrow">404</p>
        <h1 className="s-page-title">Страница не найдена / Page not found</h1>
        <p className="s-lead">
          Такой страницы нет — возможно, ссылка устарела или в адресе опечатка. Ниже — главные разделы сайта.
          <br />
          This page does not exist — the link may be outdated or mistyped. Here are the site’s main sections.
        </p>
      </header>

      <nav aria-label="Разделы / Sections">
        <ol className="s-index">
          {[{ to: '/', label: 'Главная / Home' }, ...NAV_ITEMS.filter((s) => !s.external).map((s) => ({ to: s.to, label: `${s.label.ru} / ${s.label.en}` })), { to: '/en/', label: 'English version' }].map((s, i) => (
            <li key={s.to}>
              <Link to={s.to.endsWith('/') ? s.to : `${s.to}/`}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <span className="t">{s.label}</span>
                <span className="ar" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </Page>
  )
}
