import { useParams } from 'react-router-dom'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'
import NotFoundView from '@/components/NotFoundView'
import { CardLinks, Faq, Fold, More, TextLink } from '@/components/site/Links'
import { ICONS } from '@/components/site/icons'
import { GAME_PAGES, gamePage } from '@/data/games'
import { CITY_CHATS, JAIORA_URL } from '@/data/links'
import { useT } from '@/lib/i18n'
import { plural } from '@/lib/plural'

const REPO = 'https://github.com/esurvanov/awesome-games/tree/main/'

// Игры, у которых есть живой прототип в сообществе Jaiora: ссылка на сообщество и чат города (данные — из links.ts)
const COMMUNITY: Record<string, string> = { skhodka: 'Батуми' }   // игра → город из CITY_CHATS

// Посадочная страница игры: всё, что поисковик может прочитать (описание, особенности, управление, FAQ, скриншоты).
// Сама игра — на своём адресе; сюда попадают из поиска и отсюда запускают игру кнопкой.
export function GameView() {
  const { slug } = useParams()
  const g = slug ? gamePage(slug) : undefined
  const { lang, t, to } = useT()
  if (!g) return <NotFoundView />
  const [hero, ...rest] = g.shots
  const chat = COMMUNITY[g.slug] ? CITY_CHATS.find((c) => c.label === COMMUNITY[g.slug]) : undefined
  const related = g.related.map((s) => gamePage(s)).filter((x): x is NonNullable<typeof x> => !!x)
  const img = (s: typeof hero, eager = false) => (
    <img src={`/games/${g.slug}/${s.file}`} alt={t(s.alt)} width={s.w} height={s.h} loading={eager ? 'eager' : 'lazy'} decoding="async" />
  )
  const keys = (
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
  )
  return (
    <Page>
      <Crumbs items={[{ to: to('/'), label: t({ ru: 'Главная', en: 'Home' }) }, { to: to('/materials'), label: t({ ru: 'Материалы', en: 'Materials' }) }, { to: to('/materials/games'), label: t({ ru: 'Игры', en: 'Games' }) }, { label: t(g.name) }]} />
      <h1 className="s-page-title is-long">{t(g.name)}</h1>
      <p className="s-lead">{t(g.tagline)}</p>
      <p className="g-actions">
        <a className="g-play" href={g.play} data-track-label={`play_${g.slug}`}>▶ {t({ ru: 'Играть в браузере', en: 'Play in your browser' })}</a>
        {g.architecture && <TextLink to={to(`/blog/${g.architecture.slug}`)} icon={ICONS.doc}>{t({ ru: 'Архитектура игры', en: 'Game architecture' })}</TextLink>}
        <TextLink href={REPO + g.repoDir} icon={ICONS.github}>{t({ ru: 'Исходный код (MIT)', en: 'Source code (MIT)' })}</TextLink>
      </p>
      <p className="g-genre">{t(g.genre)} · {t({ ru: 'бесплатно, без установки и регистрации', en: 'free, no install, no sign-up' })}</p>
      {chat && (
        <p className="g-community">
          {t({ ru: 'Прототип — IT-сообщество ', en: 'Inspired by the ' })}
          <TextLink href={JAIORA_URL}>Jaiora</TextLink>
          {t({ ru: ` в ${chat.label}`, en: ` IT community in ${chat.en?.label ?? chat.label}` })}
          <a className="s-pill s-pill-icon" href={chat.url} target="_blank" rel="noopener" data-track-label={`chat_${g.slug}`}>
            {ICONS.telegram}{t({ ru: `Чат ${chat.label}`, en: `${chat.en?.label ?? chat.label} chat` })}
          </a>
        </p>
      )}
      <figure className="g-hero">{img(hero, true)}</figure>

      <section className="s-section" aria-labelledby="g-about">
        <h2 className="s-label" id="g-about">{t({ ru: 'Об игре', en: 'About the game' })}</h2>
        <div className="s-prose">
          <p>{t(g.intro)[0]}</p>
          {t(g.intro).length > 1 && (
            <More label={t({ ru: 'Подробнее', en: 'More' })}>{t(g.intro).slice(1).map((p) => <p key={p}>{p}</p>)}</More>
          )}
        </div>
      </section>

      <section className="s-section" aria-labelledby="g-features">
        <h2 className="s-label" id="g-features">{t({ ru: 'Особенности', en: 'Features' })}</h2>
        <ul className="g-list">{t(g.features).slice(0, 5).map((f) => <li key={f}>{f}</li>)}</ul>
        {t(g.features).length > 5 && (
          <More label={t({ ru: `Ещё ${t(g.features).length - 5}`, en: `${t(g.features).length - 5} more` })}><ul className="g-list">{t(g.features).slice(5).map((f) => <li key={f}>{f}</li>)}</ul></More>
        )}
      </section>

      {rest.length > 0 && (
        <section className="s-section" aria-labelledby="g-shots">
          <h2 className="s-label" id="g-shots">{t({ ru: 'Скриншоты', en: 'Screenshots' })}</h2>
          <div className="g-shots">{rest.map((s) => <figure key={s.file}>{img(s)}<figcaption>{t(s.alt)}</figcaption></figure>)}</div>
        </section>
      )}

      <section className="s-section" aria-labelledby="g-controls">
        {t(g.controls).length > 6 ? (
          <Fold id="g-controls" title={t({ ru: 'Управление', en: 'Controls' })} hint={plural(t(g.controls).length, lang, ['действие', 'действия', 'действий'], ['action', 'actions'])}>{keys}</Fold>
        ) : (
          <><h2 className="s-label" id="g-controls">{t({ ru: 'Управление', en: 'Controls' })}</h2>{keys}</>
        )}
      </section>

      <section className="s-section" aria-labelledby="g-facts">
        <h2 className="s-label" id="g-facts">{t({ ru: 'Коротко', en: 'At a glance' })}</h2>
        <dl className="g-facts">{t(g.facts).slice(0, 5).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </section>

      <section className="s-section" aria-labelledby="g-faq">
        <h2 className="s-label" id="g-faq">{t({ ru: 'Вопросы и ответы', en: 'FAQ' })}</h2>
        <Faq items={t(g.faq)} />
      </section>

      <section className="s-section" aria-labelledby="g-more">
        <h2 className="s-label" id="g-more">{t({ ru: 'Другие игры', en: 'More games' })}</h2>
        <CardLinks items={[
          ...related.map((r) => ({ to: to(`/materials/games/${r.slug}`), k: t(r.genre), t: t(r.name), d: t(r.tagline) })),
          { to: to('/materials/games'), k: t({ ru: 'Ещё', en: 'More' }), t: t({ ru: 'Все игры', en: 'All games' }), d: plural(GAME_PAGES.length, lang, ['игра', 'игры', 'игр'], ['game', 'games']) },
        ]} />
      </section>
    </Page>
  )
}
