import { useEffect, useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { blogListPath, findCategory, findPost, formatDate } from '@/data/blog'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'
import Toc from '@/components/site/Toc'
import { ICONS } from '@/components/site/icons'
import { otherLang, useT, withLang, withSlash } from '@/lib/i18n'
import { initHddGame } from '@/lib/hddGame'
import { findTerm, glossaryPath, linkTerms, postsSharingTerms, termForTag } from '@/data/glossary'

// Длинный заголовок «Суть: уточнение» — уточнение идёт второй строкой, мельче
function splitTitle(title: string): [string, string | null] {
  const i = title.indexOf(': ')
  if (i < 0) return [title, null]
  const sub = title.slice(i + 2)
  return [title.slice(0, i), sub.charAt(0).toUpperCase() + sub.slice(1)]
}

// Раздел «Дальше по теме» лежит внутри статьи; выносим его вниз, к блоку «С теми же терминами»
function splitNext(html: string): { body: string; next: string | null; rich: string } {
  const m = /<section class="chapter" id="next">[\s\S]*?<\/section>/.exec(html)
  if (!m) return { body: html, next: null, rich: '' }
  const rich = /<div class="(s-rich[^"]*)"/.exec(html)?.[1] ?? 's-rich'
  return { body: html.slice(0, m.index) + html.slice(m.index + m[0].length), next: m[0], rich }
}

export default function BlogPostView() {
  const { slug = '' } = useParams<{ slug: string }>()
  const { lang, t, to } = useT()
  const post = findPost(slug, lang)
  // Первое упоминание каждого термина в тексте — ссылка на глоссарий
  const linked = useMemo(() => (post ? linkTerms(post.html, lang, [], true) : null), [post, lang])
  // Интерактив в статье: HTML вставляется как есть, поэтому контейнер игры оживляем после отрисовки
  useEffect(() => {
    const el = document.querySelector<HTMLElement>('[data-hdd-game]')
    return el ? initHddGame(el) : undefined
  }, [post?.html, lang])
  // Кнопка «Копировать» у подсказок агенту: HTML статьи статичный, поэтому клик ловим на документе
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement | null)?.closest<HTMLButtonElement>('.pq-copy')
      const box = btn?.closest('.pq, .cb')
      const raw = box?.querySelector('.pq-text, code')?.textContent
      if (!btn || !raw) return
      // В буфер идут только команды: строки-комментарии и хвосты «# …» убираем
      const text = box?.classList.contains('cb')
        ? raw.split('\n').filter((l) => !/^\s*#/.test(l)).map((l) => l.replace(/\s+#\s.*$/, '').trimEnd()).join('\n').trim()
        : raw
      const done = () => {
        btn.dataset.state = 'done'
        btn.setAttribute('title', btn.dataset.done ?? '')
        window.setTimeout(() => { delete btn.dataset.state; btn.setAttribute('title', btn.dataset.label ?? '') }, 2500)
      }
      const fallback = () => {
        const area = document.createElement('textarea')
        area.value = text
        area.style.position = 'fixed'
        area.style.opacity = '0'
        document.body.appendChild(area)
        area.select()
        const ok = document.execCommand('copy')
        document.body.removeChild(area)
        if (ok) done()
      }
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, fallback)
      else fallback()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  if (!post) return <Navigate to={to('/blog')} replace />

  // Переключатель языка ведёт на перевод этого поста, а если его нет — в ленту блога
  const other = otherLang(lang)
  const alt = withSlash(findPost(slug, other) ? withLang(`/blog/${slug}`, other) : withLang('/blog', other))
  const author = t({ ru: 'Егор Урванов', en: 'Egor Urvanov' })
  const [main, sub] = splitTitle(post.title)
  const cat = findCategory(post.category)!
  const terms = linked!.found.map((f) => findTerm(f)!)
  const sharing = postsSharingTerms(post, linked!.found)
  const { body, next, rich } = splitNext(linked!.html)
  // Теги и термины — один ряд: термин ведёт в глоссарий, а тег того же термина не дублируем
  const leftTags = post.tags.filter((tag) => { const x = termForTag(tag, lang); return !(x && terms.some((y) => y.slug === x.slug)) })

  const article = (
    <article className="s-article" itemScope itemType="https://schema.org/BlogPosting">
      <header>
        <h1 className={`s-page-title${post.title.length > 40 ? ' is-long' : ''}`} itemProp="headline">
          {main}{sub && <span className="s-title-sub">{sub}</span>}
        </h1>
        {post.wide && post.description && <p className="s-lead" itemProp="description" dangerouslySetInnerHTML={{ __html: linkTerms(post.description.replace(/&/g, '&amp;').replace(/</g, '&lt;'), lang).html }} />}
        <p className="s-card-text">
          <time dateTime={post.date} itemProp="datePublished">{formatDate(post.date, lang)}</time>
          {post.updated && post.updated !== post.date && <>{' · '}<span>{t({ ru: 'обновлено', en: 'updated' })} <time dateTime={post.updated} itemProp="dateModified">{formatDate(post.updated, lang)}</time></span></>}
          {' · '}{post.minutes} {t({ ru: 'мин', en: 'min' })} · <span itemProp="author">{author}</span>
          {' · '}<Link className="s-post-cat" to={to(blogListPath(cat.slug))} itemProp="articleSection" data-track="cta" data-track-id="blog_category" data-track-label={cat.slug}>{ICONS[cat.icon]}{t(cat.name)}</Link>
        </p>
      </header>
      <div className="s-prose" itemProp="articleBody" dangerouslySetInnerHTML={{ __html: body }} />
      {(next || sharing.length > 0) && (
        <div className="s-prose">
          <div className={`${rich || 's-rich'} s-next-wrap`}>
            {next
              ? <div dangerouslySetInnerHTML={{ __html: next }} />
              : <h2 className="s-next-h">{t({ ru: 'Дальше по теме', en: 'Next' })}</h2>}
            {sharing.length > 0 && (
              <div className="s-next-same">
                <p className="s-card-text s-terms-posts">{t({ ru: 'С теми же терминами', en: 'Same terms' })}</p>
                <ul className="s-chips" aria-label={t({ ru: 'Статьи с теми же терминами', en: 'Posts with the same terms' })}>
                  {sharing.map((p) => <li key={p.slug}><Link className="s-chip" to={to(`/blog/${p.slug}`)}>{p.title.split(': ')[0]}</Link></li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      {(terms.length > 0 || post.tags.length > 0) && (
        <footer>
          <ul className="s-chips" aria-label={t({ ru: 'Термины и теги', en: 'Terms and tags' })}>
            {terms.map((x) => <li key={x.slug}><Link className="s-chip" to={to(glossaryPath(x.slug))}>{t(x.name)}</Link></li>)}
            {leftTags.map((tag) => {
              const term = termForTag(tag, lang)
              return term
                ? <li key={tag}><Link className="s-chip" to={to(glossaryPath(term.slug))}>{tag}</Link></li>
                : <li key={tag} className="s-chip s-chip-static">{tag}</li>
            })}
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
