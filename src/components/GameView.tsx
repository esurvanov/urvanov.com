import { Link, useParams } from 'react-router-dom'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'
import NotFoundView from '@/components/NotFoundView'
import { GAME_PAGES, gamePage } from '@/data/games'
import { useT } from '@/lib/i18n'

const REPO = 'https://github.com/esurvanov/awesome-games/tree/main/'

// Посадочная страница игры: всё, что поисковик может прочитать (описание, особенности, управление, FAQ, скриншоты).
// Сама игра — на своём адресе; сюда попадают из поиска и отсюда запускают игру кнопкой.
export function GameView() {
  const { slug } = useParams()
  const g = slug ? gamePage(slug) : undefined
  const { t, to } = useT()
  if (!g) return <NotFoundView />
  const [hero, ...rest] = g.shots
  const related = g.related.map((s) => gamePage(s)).filter((x): x is NonNullable<typeof x> => !!x)
  const img = (s: typeof hero, eager = false) => (
    <img src={`/games/${g.slug}/${s.file}`} alt={t(s.alt)} width={s.w} height={s.h} loading={eager ? 'eager' : 'lazy'} decoding="async" />
  )
  return (
    <Page>
      <Crumbs items={[{ to: to('/'), label: t({ ru: 'Главная', en: 'Home' }) }, { to: to('/materials'), label: t({ ru: 'Материалы', en: 'Materials' }) }, { to: to('/materials/games'), label: t({ ru: 'Игры', en: 'Games' }) }, { label: t(g.name) }]} />
      <h1 className="s-page-title is-long">{t(g.name)}</h1>
      <p className="s-lead">{t(g.tagline)}</p>
      <p className="g-actions">
        <a className="g-play" href={g.play} data-track-label={`play_${g.slug}`}>▶ {t({ ru: 'Играть в браузере', en: 'Play in your browser' })}</a>
        {g.architecture && <Link className="g-repo" to={to(`/blog/${g.architecture.slug}`)}>{t({ ru: 'Архитектура игры', en: 'Game architecture' })}</Link>}
        <a className="g-repo" href={REPO + g.repoDir} target="_blank" rel="noopener">{t({ ru: 'Исходный код (MIT)', en: 'Source code (MIT)' })}</a>
      </p>
      <p className="g-genre">{t(g.genre)} · {t({ ru: 'бесплатно, без установки и регистрации', en: 'free, no install, no sign-up' })}</p>
      <figure className="g-hero">{img(hero, true)}</figure>

      <section className="s-section" aria-labelledby="g-about">
        <h2 className="s-label" id="g-about">{t({ ru: 'Об игре', en: 'About the game' })}</h2>
        <div className="s-prose">
          <p>{t(g.intro)[0]}</p>
          {t(g.intro).length > 1 && (
            <details className="g-more"><summary>{t({ ru: 'Подробнее', en: 'More' })}</summary>{t(g.intro).slice(1).map((p) => <p key={p}>{p}</p>)}</details>
          )}
        </div>
      </section>

      <section className="s-section" aria-labelledby="g-features">
        <h2 className="s-label" id="g-features">{t({ ru: 'Особенности', en: 'Features' })}</h2>
        <ul className="g-list">{t(g.features).slice(0, 5).map((f) => <li key={f}>{f}</li>)}</ul>
        {t(g.features).length > 5 && (
          <details className="g-more"><summary>{t({ ru: 'Ещё особенности', en: 'More features' })}</summary><ul className="g-list">{t(g.features).slice(5).map((f) => <li key={f}>{f}</li>)}</ul></details>
        )}
      </section>

      {rest.length > 0 && (
        <section className="s-section" aria-labelledby="g-shots">
          <h2 className="s-label" id="g-shots">{t({ ru: 'Скриншоты', en: 'Screenshots' })}</h2>
          <div className="g-shots">{rest.map((s) => <figure key={s.file}>{img(s)}<figcaption>{t(s.alt)}</figcaption></figure>)}</div>
        </section>
      )}

      <section className="s-section" aria-labelledby="g-controls">
        <details className="g-fold"><summary><h2 className="s-label" id="g-controls">{t({ ru: 'Управление', en: 'Controls' })}</h2></summary>
        <ul className="g-keys">
          {t(g.controls).map(([k, v]) => (
            <li key={k}>
              <span className="g-k">
                {k.split(' · ').map((alt) => (
                  <span className="g-combo" key={alt}>
                    {alt.split(' + ').map((key, i) => <span key={key}>{i > 0 && <i>+</i>}<kbd>{key}</kbd></span>)}
                  </span>
                ))}
              </span>
              <span className="g-v">{v}</span>
            </li>
          ))}
        </ul>
        </details>
      </section>

      <section className="s-section" aria-labelledby="g-facts">
        <h2 className="s-label" id="g-facts">{t({ ru: 'Коротко', en: 'At a glance' })}</h2>
        <dl className="g-facts">{t(g.facts).slice(0, 5).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </section>

      <section className="s-section" aria-labelledby="g-faq">
        <details className="g-fold">
          <summary><h2 className="s-label" id="g-faq">{t({ ru: 'Вопросы и ответы', en: 'FAQ' })}</h2></summary>
          <div className="g-faq">{t(g.faq).map(([q, a]) => <div key={q}><h3>{q}</h3><p>{a}</p></div>)}</div>
        </details>
      </section>

      <section className="s-section" aria-labelledby="g-more">
        <h2 className="s-label" id="g-more">{t({ ru: 'Другие игры', en: 'More games' })}</h2>
        <ul className="g-list">
          {related.map((r) => <li key={r.slug}><Link to={to(`/materials/games/${r.slug}`)}>{t(r.name)}</Link> — {t(r.tagline)}</li>)}
          <li><Link to={to('/materials/games')}>{t({ ru: 'Все игры', en: 'All games' })}</Link> ({GAME_PAGES.length})</li>
        </ul>
      </section>
    </Page>
  )
}
