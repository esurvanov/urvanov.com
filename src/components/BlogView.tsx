import { Link, Navigate, useParams } from 'react-router-dom'
import { BLOG_CATEGORIES, PER_PAGE, blogListPath, findCategory, formatDate, pageCount, postsIn } from '@/data/blog'
import Page from '@/components/site/Page'
import Crumbs, { type Crumb } from '@/components/site/Crumbs'
import NotFoundView from '@/components/NotFoundView'
import { ICONS } from '@/components/site/icons'
import { useT } from '@/lib/i18n'

// Номера страниц: первая, последняя и соседи текущей, остальное — «…»
function pageItems(cur: number, total: number): (number | null)[] {
  const out: (number | null)[] = []
  for (let n = 1; n <= total; n++) {
    if (n === 1 || n === total || Math.abs(n - cur) <= 1) out.push(n)
    else if (out[out.length - 1] !== null) out.push(null)
  }
  return out
}

// Лента блога: /blog/, /blog/page/N/, /blog/category/<рубрика>/ и /blog/category/<рубрика>/page/N/ (+ /en)
export default function BlogView() {
  const { category: catParam, page: pageParam } = useParams<{ category?: string; page?: string }>()
  const { lang, t, to } = useT()
  const cat = findCategory(catParam)
  if (catParam && !cat) return <NotFoundView />

  const all = postsIn(lang)
  const posts = postsIn(lang, cat?.slug)
  const total = pageCount(posts.length)
  const page = pageParam === undefined ? 1 : /^\d+$/.test(pageParam) ? Number(pageParam) : NaN
  // /page/1/ — дубль первой страницы: уводим на адрес без номера
  if (page === 1 && pageParam !== undefined) return <Navigate to={to(blogListPath(cat?.slug))} replace />
  if (!(page >= 1 && page <= total)) return <NotFoundView />
  const shown = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const href = (n: number) => to(blogListPath(cat?.slug, n))

  const crumbs: Crumb[] = [{ to: to('/'), label: t({ ru: 'Главная', en: 'Home' }) }, { to: to('/blog'), label: t({ ru: 'Блог', en: 'Blog' }) }]
  if (cat) crumbs.push({ to: to(blogListPath(cat.slug)), label: t(cat.name) })
  if (page > 1) crumbs.push({ label: t({ ru: `Стр. ${page}`, en: `Page ${page}` }) })

  const chips = [
    { slug: 'all', icon: ICONS.all, label: t({ ru: 'Все', en: 'All' }), n: all.length, path: blogListPath(), on: !cat },
    ...BLOG_CATEGORIES.map((c) => ({ slug: c.slug, icon: ICONS[c.icon], label: t(c.name), n: postsIn(lang, c.slug).length, path: blogListPath(c.slug), on: cat?.slug === c.slug })),
  ].filter((c) => c.n > 0)

  return (
    <Page>
      <Crumbs items={crumbs} />
      <header className="s-blog-head">
        <h1 className="s-page-title">{cat ? t(cat.name) : t({ ru: 'Блог', en: 'Blog' })}</h1>
        <p className="s-lead">{cat ? t(cat.description) : t({ ru: 'AI-разработка, инженерное управление, сообщества.', en: 'AI development, engineering management, communities.' })}</p>
        <p><a className="s-pill" href={lang === 'en' ? '/en/rss.xml' : '/rss.xml'}>RSS</a></p>
      </header>
      {all.length === 0 ? (
        <p className="s-lead">{t({ ru: 'Первые посты скоро.', en: 'First posts coming soon.' })}</p>
      ) : (
        <div className="s-blog">
          <nav className="s-cats" data-track-section="blog_categories" aria-label={t({ ru: 'Рубрики', en: 'Categories' })}>
            <ul className="s-chips">
              {chips.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={to(c.path)}
                    className={`s-chip s-cat${c.on ? ' is-active' : ''}`}
                    aria-current={c.on ? 'page' : undefined}
                    data-track="cta"
                    data-track-id="blog_category"
                    data-track-label={c.slug}
                  >
                    {c.icon}<span>{c.label}</span><span className="s-cat-n">{c.n}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ol className="s-posts">
            {shown.map((p) => {
              const pc = findCategory(p.category)!
              return (
                <li key={p.slug}>
                  <article className="s-card s-post" itemScope itemType="https://schema.org/BlogPosting">
                    <p className="s-post-meta">
                      <time dateTime={p.date} itemProp="datePublished">{formatDate(p.date, lang)}</time>
                      <span>{p.minutes} {t({ ru: 'мин', en: 'min' })}</span>
                      {!cat && (
                        <Link className="s-post-cat" to={to(blogListPath(pc.slug))} data-track="cta" data-track-id="blog_category" data-track-label={pc.slug}>
                          {ICONS[pc.icon]}{t(pc.name)}
                        </Link>
                      )}
                    </p>
                    <h2 className="s-card-title" itemProp="headline">
                      <Link to={to(`/blog/${p.slug}`)} itemProp="url">{p.title}</Link>
                    </h2>
                    <p className="s-card-text" itemProp="description">{p.description}</p>
                    {p.tags.length > 0 && <p className="s-post-tags" itemProp="keywords">{p.tags.map((tag) => <span key={tag}>#{tag}</span>)}</p>}
                  </article>
                </li>
              )
            })}
          </ol>
          {total > 1 && (
            <nav className="s-pager" data-track-section="blog_pagination" aria-label={t({ ru: 'Страницы', en: 'Pages' })}>
              {page > 1 ? (
                <Link to={href(page - 1)} rel="prev" className="s-pager-btn" aria-label={t({ ru: 'Назад', en: 'Previous' })} data-track="cta" data-track-id="blog_page" data-track-label={String(page - 1)}>{ICONS.prev}</Link>
              ) : (
                <span className="s-pager-btn is-off" aria-hidden="true">{ICONS.prev}</span>
              )}
              {pageItems(page, total).map((n, i) =>
                n === null ? (
                  <span key={`gap${i}`} className="s-pager-gap">…</span>
                ) : n === page ? (
                  <span key={n} className="s-pager-btn is-active" aria-current="page">{n}</span>
                ) : (
                  <Link key={n} to={href(n)} className="s-pager-btn" data-track="cta" data-track-id="blog_page" data-track-label={String(n)}>{n}</Link>
                ),
              )}
              {page < total ? (
                <Link to={href(page + 1)} rel="next" className="s-pager-btn" aria-label={t({ ru: 'Вперёд', en: 'Next' })} data-track="cta" data-track-id="blog_page" data-track-label={String(page + 1)}>{ICONS.next}</Link>
              ) : (
                <span className="s-pager-btn is-off" aria-hidden="true">{ICONS.next}</span>
              )}
            </nav>
          )}
        </div>
      )}
    </Page>
  )
}
