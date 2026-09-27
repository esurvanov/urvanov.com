import { LINK_GROUPS, itemText, type LinkItem } from '@/data/links'
import { useT, withLang, type Lang } from '@/lib/i18n'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'

const TINTS = ['s-tint-coral', 's-tint-amber', 's-tint-violet', 's-tint-mint']

// Внутренние ссылки открываем в той же вкладке и на том же языке, внешние — в новой
const linkProps = (url: string) =>
  url.startsWith('/') ? {} : { target: '_blank', rel: 'noopener noreferrer' }
const hrefFor = (url: string, lang: Lang) => (url.startsWith('/') ? withLang(url, lang) : url)

function Cards({ items, lang }: { items: LinkItem[]; lang: Lang }) {
  return (
    <div className="s-bento">
      {items.map((item, i) => {
        const x = itemText(item, lang)
        return (
          <a key={item.label} href={hrefFor(item.url, lang)} {...linkProps(item.url)} className={`s-card s-span-4 ${TINTS[i % TINTS.length]}`}>
            <span className="s-card-title">{x.label}</span>
            {x.comment && <span className="s-card-text">{x.comment}</span>}
          </a>
        )
      })}
    </div>
  )
}

function List({ items, lang }: { items: LinkItem[]; lang: Lang }) {
  return (
    <ul className="s-list">
      {items.map((item) => {
        const x = itemText(item, lang)
        return (
          <li key={item.label} className="s-row">
            <a href={hrefFor(item.url, lang)} {...linkProps(item.url)}>
              {x.label}
            </a>
            {x.comment && <span>{x.comment}</span>}
          </li>
        )
      })}
    </ul>
  )
}

function Pills({ items, lang }: { items: LinkItem[]; lang: Lang }) {
  return (
    <div className="s-pills">
      {items.map((item) => (
        <a key={item.label} href={hrefFor(item.url, lang)} {...linkProps(item.url)} className="s-pill">
          {itemText(item, lang).label}
        </a>
      ))}
    </div>
  )
}

export default function LinksView() {
  const { lang, t, to } = useT()

  return (
    <Page>
      <Crumbs items={[{ to: to('/'), label: t({ ru: 'Главная', en: 'Home' }) }, { label: t({ ru: 'Ссылки', en: 'Links' }) }]} />
      <h1 className="s-page-title">{t({ ru: 'Ссылки', en: 'Links' })}</h1>

      {LINK_GROUPS.map((group) => (
        <section key={group.title} className="s-group">
          <h2 className="s-label">{lang === 'en' ? group.titleEn : group.title}</h2>
          {group.blocks.map((block, i) => (
            <div key={block.title ?? i} className="s-block">
              {block.title && <h3 className="s-step-name">{lang === 'en' ? block.titleEn : block.title}</h3>}
              {block.variant === 'cards' && <Cards items={block.items} lang={lang} />}
              {block.variant === 'list' && <List items={block.items} lang={lang} />}
              {block.variant === 'pills' && <Pills items={block.items} lang={lang} />}
            </div>
          ))}
        </section>
      ))}
    </Page>
  )
}
