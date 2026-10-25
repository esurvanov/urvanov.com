import { useParams } from 'react-router-dom'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'
import NotFoundView from '@/components/NotFoundView'
import { Link } from 'react-router-dom'
import { ActionLink } from '@/components/site/Links'
import { ICONS } from '@/components/site/icons'
import { noCode, ALL_TERMS, TERM_SETS, findTerm, glossaryPath, postsWithTerm, setOfTerm, splitTerms, termForTag, termShort } from '@/data/glossary'
import { findCategory, formatDate, type Post } from '@/data/blog'
import { TERM_DATES } from '@/data/termDates'
import { useT } from '@/lib/i18n'
import { plural } from '@/lib/plural'
import { termArt } from '@/lib/termArt'
import AgentMap from '@/components/AgentMap'
import LlmSteps from '@/components/LlmSteps'

// Список статей: первые несколько на виду, остальное под «ещё N»
function PostLinks({ posts, shown, className, linkClass }: { posts: Post[]; shown: number; className?: string; linkClass?: string }) {
  const { t, to } = useT()
  const link = (p: Post) => <Link key={p.slug} className={linkClass} to={to(`/blog/${p.slug}`)}>{p.title.split(': ')[0]}</Link>
  const rest = posts.slice(shown)
  return (
    <span className={className}>
      <span className="g-ic" title={t({ ru: 'Статьи', en: 'Articles' })}>{ICONS.doc}</span>
      {posts.slice(0, shown).map(link)}
      {rest.length > 0 && (
        <details className="g-more">
          <summary>{t({ ru: 'ещё', en: 'more' })} {rest.length}</summary>
          {rest.map(link)}
        </details>
      )}
    </span>
  )
}

// Текст термина: первое упоминание другого термина — ссылка на него
// `так` в тексте — код: имена файлов, команды, флаги; ссылкой внутри кода становится только файл-термин вроде CLAUDE.md
function TermText({ text, self }: { text: string; self: string }) {
  const { lang, to } = useT()
  const words = (part: string, k: number) => splitTerms(part, lang, [self]).map((c, i) => c.slug
    ? <Link key={`${k}-${i}`} className="s-term" to={to(glossaryPath(c.slug))} title={noCode(termShort(findTerm(c.slug)!, lang))}>{c.text}</Link>
    : <span key={`${k}-${i}`}>{c.text}</span>)
  return <>{text.split('`').map((part, k) => k % 2 ? <code key={k} className="g-code">{/^[\w.-]+\.md$/.test(part) ? words(part, k) : part}</code> : words(part, k))}</>
}

const termWord = (n: number, lang: 'ru' | 'en') => plural(n, lang, ['термин', 'термина', 'терминов'], ['term', 'terms'])

// /materials/glossary/ — наборы терминов; у каждого термина своя страница со статьями, где он встречается
export function GlossaryView() {
  const { lang, t, to } = useT()
  return (
    <Page>
      <Crumbs items={[{ to: to('/'), label: t({ ru: 'Главная', en: 'Home' }) }, { to: to('/materials'), label: t({ ru: 'Материалы', en: 'Materials' }) }, { label: t({ ru: 'Глоссарий', en: 'Glossary' }) }]} />
      <h1 className="s-page-title">{t({ ru: 'Глоссарий', en: 'Glossary' })}</h1>
      <p className="s-lead">{termWord(ALL_TERMS.length, lang)} · {TERM_SETS.length} {t({ ru: 'наборов', en: 'sets' })}</p>
      <ul className="s-chips g-glos-nav" aria-label={t({ ru: 'Наборы терминов', en: 'Term sets' })}>
        {TERM_SETS.map((s) => <li key={s.slug}><a className="s-chip" href={`#${s.slug}`}>{ICONS[s.icon]}{t(s.name)}</a></li>)}
      </ul>
      {TERM_SETS.map((s) => (
        <section className="s-section" id={s.slug} key={s.slug} aria-labelledby={`h-${s.slug}`}>
          <h2 className="s-label" id={`h-${s.slug}`}>{ICONS[s.icon]} {t(s.name)} · {s.terms.length}</h2>
          <dl className="g-glos">
            {s.terms.map((x) => (
              <div key={x.slug}>
                <dt><Link to={to(glossaryPath(x.slug))}>{t(x.name)}</Link></dt>
                <dd>
                  <TermText text={termShort(x, lang)} self={x.slug} />
                  <PostLinks posts={postsWithTerm(x.slug, lang)} shown={3} className="g-glos-posts" />
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </Page>
  )
}

export function TermView() {
  const { slug } = useParams()
  const term = findTerm(slug)
  const { lang, t, to } = useT()
  if (!term) return <NotFoundView />
  const set = setOfTerm(term.slug)
  const posts = postsWithTerm(term.slug, lang)
  const art = termArt(term.slug, lang)
  return (
    <Page className="s-gterm">
      <Crumbs items={[{ to: to('/'), label: t({ ru: 'Главная', en: 'Home' }) }, { to: to('/materials'), label: t({ ru: 'Материалы', en: 'Materials' }) }, { to: to('/materials/glossary'), label: t({ ru: 'Глоссарий', en: 'Glossary' }) }, { label: t(term.name) }]} />
      <h1 className="s-page-title">{t(term.name)}</h1>
      <p className="s-card-text">{ICONS[set.icon]} {t(set.name)}{term.aka && <> · {t(term.aka)}</>}</p>
      {TERM_DATES[term.slug] && <p className="s-card-text">{t({ ru: 'создано', en: 'created' })} <time dateTime={TERM_DATES[term.slug][0]}>{formatDate(TERM_DATES[term.slug][0], lang)}</time> · {t({ ru: 'обновлено', en: 'updated' })} <time dateTime={TERM_DATES[term.slug][1]}>{formatDate(TERM_DATES[term.slug][1], lang)}</time></p>}
      <p className="s-lead"><TermText text={t(term.def)} self={term.slug} /></p>
      {art?.map && <AgentMap svg={art.svg} wide={art.wide} />}
      {art?.steps ? <LlmSteps /> : null}
      {art && !art.map && !art.steps && <div className={art.wide ? 's-art s-art-wide' : 's-art'} dangerouslySetInnerHTML={{ __html: art.svg }} />}

      {term.table && (
        <section className="s-section" aria-labelledby="t-tbl">
          <h2 className="s-label" id="t-tbl">{ICONS.links} {t(term.table.title)}</h2>
          <table className="g-table">
            <thead>
              <tr><th scope="col"></th>{t(term.table.head).map((h) => <th scope="col" key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {term.table.rows.map((r) => {
                const [label, ...cells] = t(r)
                return <tr key={label}><th scope="row">{label}</th>{cells.map((c, i) => <td key={i}><TermText text={c} self={term.slug} /></td>)}</tr>
              })}
            </tbody>
          </table>
        </section>
      )}

      {term.compare && (
        <section className="s-section" aria-labelledby="t-cmp">
          <h2 className="s-label" id="t-cmp">{ICONS.links} {t(term.compare.title)}</h2>
          {(() => {
            // Колонка самого термина (заголовок совпадает с названием) подсвечена
            const head = t(term.compare.head)
            const name = t(term.name).toLowerCase()
            const own = head.findIndex((h) => h.toLowerCase() === name || name.startsWith(h.toLowerCase()))
            return (
              <div className="g-cmp-wrap">
                <table className={`g-table g-cmp g-cmp-${head.length}`}>
                  <thead>
                    <tr><th scope="col"></th>{head.map((h, hi) => { const sl = term.compare!.headSlugs?.[hi]; return <th scope="col" key={h} className={hi === own ? 'is-own' : undefined}>{sl && sl !== term.slug ? <Link className="s-term" to={to(glossaryPath(sl))}>{h}</Link> : h}</th> })}</tr>
                  </thead>
                  <tbody>
                    {term.compare!.rows.map((r) => {
                      const row = t(r)
                      return <tr key={row[0]}><th scope="row">{term.compare!.linkRows ? <TermText text={row[0]} self={term.slug} /> : row[0]}</th>{row.slice(1).map((c, ci) => <td key={ci} className={ci === own ? 'is-own' : undefined}><TermText text={c} self={term.slug} /></td>)}</tr>
                    })}
                  </tbody>
                </table>
              </div>
            )
          })()}
        </section>
      )}

      {term.matrix && (
        <section className="s-section" aria-labelledby="t-mx">
          <h2 className="s-label" id="t-mx">{ICONS.links} {t(term.matrix.title)}</h2>
          <table className="g-table g-matrix">
            <thead>
              <tr><th scope="col"></th>{t(term.matrix.head).map((h, hi) => { const sl = term.matrix!.headSlugs?.[hi]; return <th scope="col" key={h}>{sl && sl !== term.slug ? <Link className="s-term" to={to(glossaryPath(sl))}>{h}</Link> : h}</th> })}</tr>
            </thead>
            <tbody>
              {term.matrix.rows.map((r, ri) => {
                const [label, ...cells] = t(r)
                const slugs = [...(term.matrix!.slugs?.[ri] ?? [])]
                const one = term.matrix!.rowSlugs?.[ri]
                if (!slugs.length && one) slugs.push(one)
                const parts = slugs.length && !one ? slugs.map((sl) => t(findTerm(sl)!.name)) : [label]
                return (
                  <tr key={label}>
                    <th scope="row">{parts.map((part, pi) => (
                      <span key={part}>{pi > 0 && ', '}{slugs[pi] ? <Link className="s-term" to={to(glossaryPath(slugs[pi]))}>{part}</Link> : part}</span>
                    ))}</th>
                    {cells.map((c, i) => (
                      <td key={i} className={`g-mx g-mx-${c}`} aria-label={c === 'yes' ? t({ ru: 'есть', en: 'has' }) : c === 'part' ? t({ ru: 'заготовки', en: 'blocks' }) : t({ ru: 'нет', en: 'none' })}>{c === 'yes' ? '✓' : c === 'part' ? '◐' : '✗'}</td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p className="s-card-text g-legend">
            {t(term.matrix.legend).split(/\s+(?=[✓◐✗])/u).map((part, i) => {
              const m = /^([✓◐✗])\s*(.*)$/u.exec(part)
              if (!m) return <span key={i}>{part.replace(/\s*·\s*$/u, '')}</span>
              const c = m[1] === '✓' ? 'yes' : m[1] === '◐' ? 'part' : 'no'
              return <span key={i} className="g-legend-i"><b className={`g-mx g-mx-${c}`}>{m[1]}</b>{m[2].replace(/\s*·\s*$/u, '')}</span>
            })}
          </p>
        </section>
      )}

      {term.notes && (
        <section className="s-section" aria-labelledby="t-notes">
          <h2 className="s-label" id="t-notes">{ICONS.links} {t(term.notes.title)}</h2>
          <ul className="g-list">
            {term.notes.items.map((x) => { const nt = termForTag(t(x.name), lang); return <li key={t(x.name)}>{nt && nt.slug !== term.slug ? <Link className="s-term" to={to(glossaryPath(nt.slug))}>{t(x.name)}</Link> : <b>{t(x.name)}</b>} <span className="s-card-text">· <TermText text={t(x.text)} self={term.slug} /></span></li> })}
          </ul>
        </section>
      )}

      {term.parts && (
        <section className="s-section" aria-labelledby="t-parts">
          <h2 className="s-label" id="t-parts">{ICONS.links} {t(term.parts.title)} · {term.parts.slugs.length}</h2>
          <ul className="g-list g-links">
            {term.parts.slugs.map((sl) => findTerm(sl)!).map((x) => <li key={x.slug}><Link className="s-term" to={to(glossaryPath(x.slug))}>{t(x.name)}</Link> <span className="s-card-text">· {termShort(x, lang)}</span></li>)}
          </ul>
        </section>
      )}

      {term.source && (
        <p className="g-actions">
          <a className="s-link" href={term.source.url} target="_blank" rel="noopener noreferrer">{ICONS.ext} {t({ ru: 'Источник', en: 'Source' })}: {t(term.source.label)}</a>
        </p>
      )}

      {term.more && (
        <p className="g-actions">
          <ActionLink to={to(`/blog/${term.more.post}`)} icon={ICONS.doc} primary>{t({ ru: 'Подробнее', en: 'Read more' })}: {t(term.more.label)}</ActionLink>
          {term.also?.map((x) => <ActionLink key={x.post} to={to(`/blog/${x.post}`)} icon={ICONS.doc}>{t(x.label)}</ActionLink>)}
        </p>
      )}

      {posts.length > 0 && (
        <section className="s-section" aria-labelledby="t-posts">
          <h2 className="s-label" id="t-posts">{ICONS.doc} {t({ ru: 'Где встречается', en: 'Where it appears' })} · {posts.length}</h2>
          <ul className="g-list g-links">
            {posts.slice(0, 5).map((p) => <li key={p.slug}><Link className="s-link" to={to(`/blog/${p.slug}`)}>{p.title.split(': ')[0]}</Link> <span className="s-card-text">· {t(findCategory(p.category)!.name)}</span></li>)}
          </ul>
          {posts.length > 5 && (
            <details className="g-more g-more-block">
              <summary>{t({ ru: 'Ещё', en: 'More' })} {posts.length - 5}</summary>
              <ul className="g-list g-links">
                {posts.slice(5).map((p) => <li key={p.slug}><Link className="s-link" to={to(`/blog/${p.slug}`)}>{p.title.split(': ')[0]}</Link> <span className="s-card-text">· {t(findCategory(p.category)!.name)}</span></li>)}
              </ul>
            </details>
          )}
        </section>
      )}

      {term.related.length > 0 && (
        <section className="s-section" aria-labelledby="t-rel">
          <h2 className="s-label" id="t-rel">{ICONS.links} {t({ ru: 'Связанные термины', en: 'Related terms' })}</h2>
          <ul className="s-chips">
            {term.related.map((r) => findTerm(r)!).map((x) => <li key={x.slug}><Link className="s-chip" to={to(glossaryPath(x.slug))}>{t(x.name)}</Link></li>)}
          </ul>
        </section>
      )}

      <p className="g-actions">
        <ActionLink to={to('/materials/glossary')} icon={ICONS.prev}>{t({ ru: 'Весь глоссарий', en: 'Whole glossary' })}</ActionLink>
      </p>
    </Page>
  )
}
