import { useMemo } from 'react'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'
import { iconCount, showcase } from '@/data/blocks/showcase'
import { useT } from '@/lib/i18n'
import '@/styles/blocks-showcase.css'

// Витрина блоков статей: каждый блок — его метка, атрибуты и живой пример. Служебная страница (noindex):
// по ней видно всю библиотеку разом и на ней же автоматически проверяется вёрстка блоков
export default function BlocksView() {
  const { lang, t, to } = useT()
  const items = useMemo(() => showcase(lang), [lang])
  return (
    <Page className="s-wide">
      <Crumbs items={[{ to: to('/'), label: t({ ru: 'Главная', en: 'Home' }) }, { to: to('/materials'), label: t({ ru: 'Материалы', en: 'Materials' }) }, { label: t({ ru: 'Блоки статей', en: 'Article blocks' }) }]} />
      <article className="s-article bk-show">
        <header>
          <h1 className="s-page-title">{t({ ru: 'Блоки статей', en: 'Article blocks' })}</h1>
          <p className="s-card-text">{items.length} {t({ ru: 'блоков', en: 'blocks' })} · {iconCount()} {t({ ru: 'значков', en: 'icons' })}</p>
        </header>
        <nav className="bk-show-nav" aria-label={t({ ru: 'Блоки', en: 'Blocks' })}>
          {items.map((b) => <a key={b.tag} className="bk-show-chip" href={`#b-${b.tag}`}>{`<b-${b.tag}>`}</a>)}
        </nav>
        {items.map((b) => (
          <section key={b.tag} id={`b-${b.tag}`} className="bk-show-item" data-block={b.tag}>
            <h2 className="bk-show-h">{b.title} <code>{`<b-${b.tag}>`}</code></h2>
            <p className="bk-show-doc">{b.doc}</p>
            {(b.attrs.length > 0 || b.slots.length > 0) && (
              <ul className="bk-show-attrs">
                {b.attrs.map((a) => <li key={a.name}><code>{a.name}{a.required ? '*' : ''}</code> {a.doc}</li>)}
                {b.slots.map((s) => <li key={s.name}><code>{`<${s.name}${s.attrs.length ? ' ' + s.attrs.join(' ') : ''}>`}</code> {s.doc}</li>)}
              </ul>
            )}
            <div className="s-prose bk-show-demo">
              <div className="s-rich bk bk-post-prompts" data-block-demo={b.tag} dangerouslySetInnerHTML={{ __html: b.html }} />
            </div>
          </section>
        ))}
      </article>
    </Page>
  )
}
