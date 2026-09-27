import { Navigate, useParams } from 'react-router-dom'
import { findPost, formatDate } from '@/data/blog'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'
import { otherLang, useT, withLang } from '@/lib/i18n'

export default function BlogPostView() {
  const { slug = '' } = useParams<{ slug: string }>()
  const { lang, t, to } = useT()
  const post = findPost(slug, lang)
  if (!post) return <Navigate to={to('/blog')} replace />

  // Переключатель языка ведёт на перевод этого поста, а если его нет — в ленту блога
  const other = otherLang(lang)
  const alt = findPost(slug, other) ? withLang(`/blog/${slug}`, other) : withLang('/blog', other)
  const author = t({ ru: 'Егор Урванов', en: 'Egor Urvanov' })

  return (
    <Page alt={alt}>
      <Crumbs items={[{ to: to('/'), label: t({ ru: 'Главная', en: 'Home' }) }, { to: to('/blog'), label: t({ ru: 'Блог', en: 'Blog' }) }, { label: post.title }]} />
      <article className="s-article" itemScope itemType="https://schema.org/BlogPosting">
        <header>
          <h1 className="s-page-title" itemProp="headline">{post.title}</h1>
          <p className="s-card-text">
            <time dateTime={post.date} itemProp="datePublished">{formatDate(post.date, lang)}</time>
            {' · '}{post.minutes} {t({ ru: 'мин', en: 'min' })} · <span itemProp="author">{author}</span>
          </p>
        </header>
        <div className="s-prose" itemProp="articleBody" dangerouslySetInnerHTML={{ __html: post.html }} />
        {post.tags.length > 0 && (
          <footer>
            <ul className="s-chips" aria-label={t({ ru: 'Теги', en: 'Tags' })}>
              {post.tags.map((tag) => <li key={tag} className="s-chip s-chip-static">{tag}</li>)}
            </ul>
          </footer>
        )}
      </article>
    </Page>
  )
}
