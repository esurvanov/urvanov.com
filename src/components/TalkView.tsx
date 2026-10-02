import { ActionLink } from '@/components/site/Links'
import { ICONS } from '@/components/site/icons'
import Page from '@/components/site/Page'
import Crumbs from '@/components/site/Crumbs'
import { config } from '@/data/config'
import { slides } from '@/data/slides'
import { SECTION_TITLES, type SectionNumber } from '@/types/slide'
import { useT } from '@/lib/i18n'

// Обложки — чисто визуальные (без текста, у одной абсолютное позиционирование под весь экран
// слайда) — на текстовой странице их незачем показывать, страница и так начинается с h1
const SKIP_SLIDES = new Set(['podlodka-cover', 'cover'])
const CONTENT_SLIDES = slides.filter((s) => !SKIP_SLIDES.has(s.meta.id))

const SECTION_TITLES_EN: Record<SectionNumber, string> = {
  0: '',
  1: 'Industry',
  2: 'Problem → theory → solution',
  3: 'OpenSpec workshop',
}

// Начало нового раздела — по смене meta.section у соседних слайдов (без мутации во время рендера)
const SLIDE_ROWS = CONTENT_SLIDES.map((s, i) => ({
  ...s,
  showSectionHeader: i === 0 || CONTENT_SLIDES[i - 1].meta.section !== s.meta.section,
}))

// Текст всех слайдов — не переписан руками, а собран программно: страница рендерит реальные
// компоненты слайдов (src/slides/**) через data/slides.ts, поэтому не расходится с презентацией
export default function TalkView() {
  const { lang, t, to } = useT()

  return (
    <Page>
      <Crumbs
        items={[
          { to: to('/'), label: t({ ru: 'Главная', en: 'Home' }) },
          { to: to('/materials'), label: t({ ru: 'Материалы', en: 'Materials' }) },
          { to: to('/materials/presentations'), label: t({ ru: 'Презентации', en: 'Presentations' }) },
          { label: t({ ru: config.talkTitle, en: config.talkTitleEn }) },
        ]}
      />
      <header className="s-section">
        <p className="s-eyebrow">{config.conferenceName}</p>
        <h1 className="s-page-title">{t({ ru: config.talkTitle, en: config.talkTitleEn })}</h1>
        <p className="s-lead">
          {t({
            ru: 'Доклад о Spec-Driven Development: как с помощью спецификаций заставить AI-агентов писать код по замыслу, а не только по инструкции. Ниже — текст всех слайдов доклада: индустрия, теория и практический воркшоп по OpenSpec.',
            en: 'A talk about Spec-Driven Development: using specifications to make AI agents write code that matches intent, not just instructions. Below is the full slide text of the talk — the state of AI development, the theory, and a hands-on OpenSpec workshop (in Russian).',
          })}
        </p>
        <p className="g-actions">
          <ActionLink primary to="/slide/1/" icon={ICONS.play} data-track="cta" data-track-id="open_presentation">
            {t({ ru: 'Открыть презентацию', en: 'Open the slide deck (in Russian)' })}
          </ActionLink>
        </p>
      </header>

      <div className="s-talk-deck">
        {SLIDE_ROWS.map(({ meta, Component, showSectionHeader }) => {
          const sectionTitle = lang === 'en' ? SECTION_TITLES_EN[meta.section] : SECTION_TITLES[meta.section]
          return (
            <div key={meta.id}>
              {showSectionHeader && sectionTitle && (
                <h2 className="s-label s-talk-section" id={`section-${meta.section}`}>
                  {t({ ru: 'Раздел', en: 'Section' })} {meta.section} · {sectionTitle}
                </h2>
              )}
              <section className="slide-container s-talk-slide" aria-label={meta.title}>
                <Component />
              </section>
            </div>
          )
        })}
      </div>
    </Page>
  )
}
