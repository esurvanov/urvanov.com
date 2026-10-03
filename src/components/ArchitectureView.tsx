import { Navigate, useParams } from 'react-router-dom'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'
import Toc from '@/components/site/Toc'
import { architecturePath, findArchitecture } from '@/data/architecture'
import { gamePage } from '@/data/games'
import { otherLang, useT, withLang, withSlash } from '@/lib/i18n'

// Архитектура игры: страница живёт рядом с игрой (ссылка с её страницы) и обновляется вместе с ней, это не пост блога
export default function ArchitectureView() {
  const { slug = '' } = useParams<{ slug: string }>()
  const { lang, t, to } = useT()
  const g = gamePage(slug)
  const a = findArchitecture(slug, lang)
  if (!g || !a) return <Navigate to={to(g ? `/materials/games/${g.slug}` : '/materials/games')} replace />

  // Язык переключается на перевод этой же страницы, а если его нет — на страницу игры
  const other = otherLang(lang)
  const alt = withSlash(withLang(findArchitecture(slug, other) ? architecturePath(slug) : `/materials/games/${slug}`, other))
  const gameName = t(g.name)

  return (
    <Page alt={alt} className="s-wide">
      <Crumbs items={[
        { to: to('/'), label: t({ ru: 'Главная', en: 'Home' }) },
        { to: to('/materials'), label: t({ ru: 'Материалы', en: 'Materials' }) },
        { to: to('/materials/games'), label: t({ ru: 'Игры', en: 'Games' }) },
        { to: to(`/materials/games/${g.slug}`), label: gameName },
        { label: t({ ru: 'Архитектура', en: 'Architecture' }) },
      ]} />
      <div className="s-post-layout">
        {a.toc.length > 0 && <Toc items={a.toc} label={t({ ru: 'Содержание', en: 'Contents' })} />}
        <article className="s-article">
          <header>
            <h1 className={`s-page-title${a.title.length > 40 ? ' is-long' : ''}`}>{a.title}</h1>
            {a.description && <p className="s-lead">{a.description}</p>}
          </header>
          <div className="s-prose" dangerouslySetInnerHTML={{ __html: a.html }} />
        </article>
      </div>
    </Page>
  )
}
