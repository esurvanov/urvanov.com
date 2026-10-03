import { Link, Navigate, useParams } from 'react-router-dom'
import { blogListPath, findCategory, findPost, formatDate } from '@/data/blog'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'
import Toc from '@/components/site/Toc'
import { ICONS } from '@/components/site/icons'
import { otherLang, useT, withLang, withSlash } from '@/lib/i18n'

// Длинный заголовок «Суть: уточнение» — уточнение идёт второй строкой, мельче
function splitTitle(title: string): [string, string | null] {
  const i = title.indexOf(': ')
  if (i < 0) return [title, null]
  const sub = title.slice(i + 2)
  return [title.slice(0, i), sub.charAt(0).toUpperCase() + sub.slice(1)]
}

export default function BlogPostView() {
  const { slug = '' } = useParams<{ slug: string }>()
  const { lang, t, to } = useT()
  const post = findPost(slug, lang)
  if (!post) return <Navigate to={to('/blog')} replace />

  // Переключатель языка ведёт на перевод этого поста, а если его нет — в ленту блога
  const other = otherLang(lang)
  const alt = withSlash(findPost(slug, other) ? withLang(`/blog/${slug}`, other) : withLang('/blog', other))
  const author = t({ ru: 'Егор Урванов', en: 'Egor Urvanov' })
  const [main, sub] = splitTitle(post.title)
  const cat = findCategory(post.category)!

  const article = (
    <article className="s-article" itemScope itemType="https://schema.org/BlogPosting">
      <header>
        <h1 className={`s-page-title${post.title.length > 40 ? ' is-long' : ''}`} itemProp="headline">
          {main}{sub && <span className="s-title-sub">{sub}</span>}
        </h1>
        {post.wide && post.description && <p className="s-lead" itemProp="description">{post.description}</p>}
        <p className="s-card-text">
          <time dateTime={post.date} itemProp="datePublished">{formatDate(post.date, lang)}</time>
          {' · '}{post.minutes} {t({ ru: 'мин', en: 'min' })} · <span itemProp="author">{author}</span>
          {' · '}<Link className="s-post-cat" to={to(blogListPath(cat.slug))} itemProp="articleSection" data-track="cta" data-track-id="blog_category" data-track-label={cat.slug}>{ICONS[cat.icon]}{t(cat.name)}</Link>
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
  )

  return (
    <Page alt={alt} className={post.wide ? 's-wide' : ''}>
      <Crumbs items={[{ to: to('/'), label: t({ ru: 'Главная', en: 'Home' }) }, { to: to('/blog'), label: t({ ru: 'Блог', en: 'Blog' }) }, { label: main }]} />
      {post.wide ? (
        <div className="s-post-layout">
          {post.toc.length > 0 && <Toc items={post.toc} label={t({ ru: 'Содержание', en: 'Contents' })} />}
          {article}
        </div>
      ) : article}
    </Page>
  )
}
