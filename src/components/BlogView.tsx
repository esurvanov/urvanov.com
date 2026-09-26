import { Link } from 'react-router-dom'
import { POSTS, formatDate } from '@/data/blog'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'

export default function BlogView() {
  return (
    <Page>
      <Crumbs items={[{ to: '/', label: 'Главная' }, { label: 'Блог' }]} />
      <header>
        <h1 className="s-page-title">Блог</h1>
        <p className="s-lead">AI-разработка, инженерное управление, сообщества.</p>
        <p><a className="s-pill" href="/rss.xml">RSS</a></p>
      </header>
      {POSTS.length === 0 ? (
        <p className="s-lead">Первые посты скоро.</p>
      ) : (
        <ol className="s-posts">
          {POSTS.map((p) => (
            <li key={p.slug}>
              <article className="s-card s-post" itemScope itemType="https://schema.org/BlogPosting">
                <time className="s-step-year" dateTime={p.date} itemProp="datePublished">{formatDate(p.date)}</time>
                <h2 className="s-card-title" itemProp="headline">
                  <Link to={`/blog/${p.slug}`} itemProp="url">{p.title}</Link>
                </h2>
                <p className="s-card-text" itemProp="description">{p.description}</p>
                <span className="s-card-text">{p.minutes} мин</span>
              </article>
            </li>
          ))}
        </ol>
      )}
    </Page>
  )
}
