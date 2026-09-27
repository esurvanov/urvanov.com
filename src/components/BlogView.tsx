import { Link } from 'react-router-dom'
import { postsFor, formatDate } from '@/data/blog'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'
import { useT } from '@/lib/i18n'

export default function BlogView() {
  const { lang, t, to } = useT()
  const posts = postsFor(lang)
  return (
    <Page>
      <Crumbs items={[{ to: to('/'), label: t({ ru: 'Главная', en: 'Home' }) }, { label: t({ ru: 'Блог', en: 'Blog' }) }]} />
      <header>
        <h1 className="s-page-title">{t({ ru: 'Блог', en: 'Blog' })}</h1>
        <p className="s-lead">{t({ ru: 'AI-разработка, инженерное управление, сообщества.', en: 'AI development, engineering management, communities.' })}</p>
        <p><a className="s-pill" href={lang === 'en' ? '/en/rss.xml' : '/rss.xml'}>RSS</a></p>
      </header>
      {posts.length === 0 ? (
        <p className="s-lead">{t({ ru: 'Первые посты скоро.', en: 'First posts coming soon.' })}</p>
      ) : (
        <ol className="s-posts">
          {posts.map((p) => (
            <li key={p.slug}>
              <article className="s-card s-post" itemScope itemType="https://schema.org/BlogPosting">
                <time className="s-step-year" dateTime={p.date} itemProp="datePublished">{formatDate(p.date, lang)}</time>
                <h2 className="s-card-title" itemProp="headline">
                  <Link to={to(`/blog/${p.slug}`)} itemProp="url">{p.title}</Link>
                </h2>
                <p className="s-card-text" itemProp="description">{p.description}</p>
                <span className="s-card-text">{p.minutes} {t({ ru: 'мин', en: 'min' })}</span>
              </article>
            </li>
          ))}
        </ol>
      )}
    </Page>
  )
}
