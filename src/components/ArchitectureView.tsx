import { Navigate, useParams } from 'react-router-dom'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'
import Toc from '@/components/site/Toc'
import Dates from '@/components/site/Dates'
import { architecturePath, findArchitecture } from '@/data/architecture'
import { gamePage } from '@/data/games'
import { ARCHITECTURE_EXTRA } from '@/data/architectureExtra'
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
  // Заголовок: суть до двоеточия, подзаголовок — из дополнений сайта (что именно разобрано) или из самого разбора
  const ex = ARCHITECTURE_EXTRA[slug]
  const i = a.title.indexOf(': ')
  const main = i > 0 ? a.title.slice(0, i) : a.title
  const subRaw = ex ? t(ex.sub) : i > 0 ? a.title.slice(i + 2) : ''
  const sub = subRaw && subRaw.charAt(0).toUpperCase() + subRaw.slice(1)
  // Первый абзац разбора — ответ на вопрос заголовка: ставим его под заголовок вместо анонса (анонс остаётся в метаданных)
  const leadM = /^\s*(<p\b[^>]*>[\s\S]*?<\/p>)/.exec(a.html)
  const lead = leadM ? leadM[1].replace(/^<p\b[^>]*>/, '').replace(/<\/p>$/, '') : null
  const body = leadM ? a.html.slice(leadM[0].length) : a.html

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
            <h1 className={`s-page-title${main.length > 40 ? ' is-long' : ''}`}>{main}{sub && <span className="s-title-sub">{sub}</span>}</h1>
            {lead ? <p className="s-lead" dangerouslySetInnerHTML={{ __html: lead }} /> : a.description && <p className="s-lead">{a.description}</p>}
            {a.date && <div className="s-post-meta"><Dates created={a.date} updated={[a.date, ex?.updated].filter(Boolean).sort().pop()!} lang={lang} /></div>}
          </header>
          <div className="s-prose" dangerouslySetInnerHTML={{ __html: body }} />
          {ex && ex.faq.length > 0 && (
            <section className="s-section" aria-labelledby="a-faq">
              <h2 className="s-label" id="a-faq">{t({ ru: 'Частые вопросы', en: 'Frequently asked questions' })}</h2>
              <div className="s-rich bk"><div className="bk-faq-cards">
                {ex.faq.map((x) => <div key={t(x.q)}><h3 className="bk-faq-cards-q">{t(x.q)}</h3>{t(x.a)}</div>)}
              </div></div>
            </section>
          )}
        </article>
      </div>
    </Page>
  )
}
