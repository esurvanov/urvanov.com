import { Navigate, useParams } from 'react-router-dom'
import { POSTS, formatDate } from '@/data/blog'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'

export default function BlogPostView() {
  const { slug } = useParams<{ slug: string }>()
  const post = POSTS.find((p) => p.slug === slug)
  if (!post) return <Navigate to="/blog" replace />

  return (
    <Page>
      <Crumbs items={[{ to: '/', label: 'Главная' }, { to: '/blog', label: 'Блог' }, { label: post.title }]} />
      <article className="s-article" itemScope itemType="https://schema.org/BlogPosting">
        <header>
          <h1 className="s-page-title" itemProp="headline">{post.title}</h1>
          <p className="s-card-text">
            <time dateTime={post.date} itemProp="datePublished">{formatDate(post.date)}</time>
            {' · '}{post.minutes} мин · <span itemProp="author">Егор Урванов</span>
          </p>
        </header>
        <div className="s-prose" itemProp="articleBody" dangerouslySetInnerHTML={{ __html: post.html }} />
        {post.tags.length > 0 && (
          <footer>
            <ul className="s-chips" aria-label="Теги">
              {post.tags.map((t) => <li key={t} className="s-chip s-chip-static">{t}</li>)}
            </ul>
          </footer>
        )}
      </article>
    </Page>
  )
}
