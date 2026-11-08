import { PATTERN_CATEGORIES } from '@/data/patterns'
import { POSTS, BLOG_CATEGORIES, blogListPath, findCategory, pageCount, postsFor, postsIn } from '@/data/blog'
import { config } from '@/data/config'
import { GAME_PAGES } from '@/data/games'
import { ARCHITECTURES, architecturePath } from '@/data/architecture'
import { ARCHITECTURE_EXTRA } from '@/data/architectureExtra'
import { LAB_PAGES } from '@/data/labs'
import { ALL_TERMS, glossaryPath, postsWithTerm, setOfTerm } from '@/data/glossary'
import { AI_OFFERS } from '@/data/aiOffers'
import { TERM_DATES } from '@/data/termDates'
import { NEW_LANGS, isNewLang, onLangLoaded, setPageIndex, tr, ui, withLang, type BaseLang, type Lang, type L, type NewLang } from '@/lib/i18n'
import { moduleReady, seoMeta, unitReady } from '@/i18n'

export const SITE_URL = 'https://www.urvanov.com'
export const SITE_NAME = 'Егор Урванов'

// Единая карточка человека — @id, по которому её собирают в один узел на любой странице
// (сама карточка строится один раз в scripts/lib.mjs и добавляется в каждую страницу через headTags)
export const PERSON_ID = `${SITE_URL}/#person`
export const JAIORA_ORG_ID = 'https://jaiora.me/#org'

export interface PageMeta {
  path: string
  lang: Lang
  title: string
  description: string
  type?: 'website' | 'article'
  noindex?: boolean
  date?: string
  // Дата последней содержательной правки: lastmod в карте сайта и article:modified_time
  modified?: string
  // Картинка превью (абсолютный путь от корня сайта); без неё — фото автора
  image?: string
  // Заголовок для соцсетей, если в <title> стоит короткая версия
  ogTitle?: string
  // Короткое имя страницы для хлебных крошек в разметке (иначе берётся начало title)
  crumb?: string
  jsonLd?: Record<string, unknown>
  // Дополнительные узлы разметки (например FAQPage) рядом с основным
  jsonLdExtra?: Record<string, unknown>[]
  // Файлы/данные, из которых реально собрана страница — источник честной даты lastmod в sitemap.xml
  sources?: string[]
  // Та же страница на других языках: для hreflang
  alternates: { lang: Lang; path: string }[]
  // Соседние страницы ленты блога: <link rel="prev/next">
  prev?: string
  next?: string
}

// Первый абзац поста — прямой ответ на вопрос заголовка: отдаём его в разметке (abstract), чтобы поисковики и ИИ-чаты брали ответ целиком
const stripTags = (h: string) => h.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim()
const leadOf = (html: string): string | undefined => {
  const m = html.match(/<p[^>]*>([\s\S]*?)<\/p>/)
  return m ? stripTags(m[1]) : undefined
}
// Вопросы и ответы блока <b-faq-cards> — в разметку FAQPage рядом с основным узлом
const faqOf = (html: string): { q: string; a: string }[] => {
  const start = html.indexOf('<div class="bk-faq-cards">')
  if (start < 0) return []
  const out: { q: string; a: string }[] = []
  // Блок — подряд идущие <div><h3 class="bk-faq-cards-q">вопрос</h3>ответ</div> (раньше — <div><b>вопрос</b><br>ответ</div>)
  const re = /<div>(?:<h3 class="bk-faq-cards-q">([\s\S]*?)<\/h3>|<b>([\s\S]*?)<\/b><br>)([\s\S]*?)<\/div>/y
  re.lastIndex = start + '<div class="bk-faq-cards">'.length
  for (let m = re.exec(html); m; m = re.exec(html)) out.push({ q: stripTags(m[1] ?? m[2]), a: stripTags(m[3]) })
  return out.filter((x) => x.q && x.a)
}

// Ссылка на канонический Person (полностью описан один раз в scripts/lib.mjs и добавляется
// в @graph каждой страницы автоматически — здесь только связываем через @id, без повтора полей)
const person = () => ({ '@id': PERSON_ID })

const url = (path: string) => SITE_URL + (path === '/' ? '/' : path.endsWith('/') ? path : path + '/')

export const GAMES = [
  {
    // Реальная страница игры: index.html — только редирект (см. scripts/patch-games.mjs)
    path: '/age-of-empires/web/',
    title: 'Хроники Королевств',
    titleEn: 'Chronicles of Kingdoms',
    text: 'Стратегия в духе Age of Empires II · 14 цивилизаций',
    long: 'Браузерная стратегия в реальном времени в духе Age of Empires II: 14 цивилизаций, строительство, добыча ресурсов и сражения. Играть можно прямо в браузере.',
    longEn: 'A browser real-time strategy in the spirit of Age of Empires II: 14 civilizations, building, gathering resources, and battles. Play right in the browser.',
  },
  {
    path: '/berezovka/',
    title: 'Березовка',
    titleEn: 'Berezovka',
    text: '3D-игра в браузере · заснеженная деревня',
    long: '3D-игра в браузере: заснеженная русская деревня Березовка, исследование и атмосфера зимы. Запускается без установки.',
    longEn: 'A 3D browser game: the snowy Russian village of Berezovka, exploration, and winter atmosphere. Runs without installation.',
  },
  {
    path: '/sibiria/',
    title: 'Сибирь',
    titleEn: 'Siberia',
    text: '2D-выживание · тайга, 1993',
    long: '2D-игра на выживание в сибирской тайге, 1993 год. Играть можно в браузере без установки.',
    longEn: 'A 2D survival game in the Siberian taiga, 1993. Play in the browser, no installation.',
  },
  {
    path: '/ekho-razloma/',
    title: 'Эхо Разлома',
    titleEn: 'Echo of the Rift',
    text: '3D открытый мир с сюжетом · полярный остров',
    long: '3D-игра с открытым миром и сюжетом: пилот разбился на полярном острове под северным сиянием. Станция, отшельник, три кристальных шпиля, поющий разлом во льду, снег, который помнит каждый шаг, и два финала. Играть в браузере без установки.',
    longEn: 'A 3D open-world story game: a pilot crashes on a polar island under the northern lights. A station, a hermit, three crystal spires, a singing rift in the ice, snow that remembers every step, and two endings. Play in the browser, no installation.',
  },
  {
    path: '/severny-razlom/',
    title: 'Северный Разлом',
    titleEn: 'Northern Rift',
    text: '3D-аркада · полёт по ледяному каньону',
    long: '3D-аркада в браузере: маленький корабль летит по бесконечному ледяному каньону под северным сиянием. Собирай осколки, копи энергию, пробивай ледяные стены и держи множитель до ×8. Один файл, без установки.',
    longEn: 'A 3D browser arcade: a small ship flies down an endless ice canyon under the northern lights. Collect shards, build energy, burst through the ice walls and keep a combo of up to ×8. One file, no installation.',
  },
  {
    path: '/skhodka/',
    title: 'Сходка',
    titleEn: 'Skhodka',
    text: '3D · субботняя IT-сходка в баре Батуми',
    long: '3D-игра в браузере: субботний вечер IT-сообщества в баре SushiGO в Батуми, с 19:00 до 01:00. Знакомься с гостями, находи общие темы, обменивайся контактами и своди тех, кто нужен друг другу. Саксофон, караоке, дождь и общее фото в конце. Играть в браузере без установки.',
    longEn: 'A 3D browser game: a Saturday evening of the IT community at the SushiGO bar in Batumi, 19:00 to 01:00. Meet the guests, find common topics, swap contacts and introduce people who need each other. Sax, karaoke, rain and a group photo at the end. Play in the browser, no installation.',
  },
  {
    path: '/zhitie/',
    title: 'Житьё',
    titleEn: 'Zhitiyo',
    text: 'Симулятор жизни в духе The Sims · район из десяти семей',
    long: 'Браузерная симуляция жизни в духе The Sims 1: изометрическое 3D в low-poly, район из десяти семей, потребности, карьера, навыки и отношения. Обставляй и достраивай дом в режимах «Покупка» и «Стройка». Играть можно прямо в браузере.',
    longEn: 'A browser life sim in the spirit of The Sims 1: isometric low-poly 3D, a neighbourhood of ten households, needs, careers, skills, and relationships. Furnish and extend the house in Buy and Build modes. Play right in the browser.',
  },
  {
    path: '/work-programmer/',
    title: 'Аптайм',
    titleEn: 'Uptime',
    text: 'Игра про работу инженера · собери сервис и переживи аварии',
    long: 'Игра в браузере про работу инженера: собери сервис из блоков, пусти поток пользователей и посмотри, что сломается первым. 43 уровня от одного сервера до распила монолита: кэши, очереди, Kubernetes, мультирегион, мониторинг. Разбор решения после каждого уровня. Без установки.',
    longEn: 'A browser game about an engineer’s job: build a service from blocks, send a stream of users through it and see what breaks first. 43 levels from a single server to splitting a monolith: caches, queues, Kubernetes, multi-region, monitoring. A debrief of your decision after every level. No installation.',
  },
]

// Интерактивные учебные страницы: живут в отдельном репозитории project-euler и копируются при выкладке
// (см. .github/workflows/pages.yml и scripts/patch-games.mjs)
export const LABS = [
  {
    path: '/methods-lab/',
    title: 'Мастерская методов',
    titleEn: 'Methods workshop',
    long: '60 приёмов решения математических и алгоритмических задач в 3D, шаг за шагом: задача, решение в лоб, что замечаем и как решаем быстрее. На русском и английском, прямо в браузере.',
    longEn: '60 problem-solving methods from maths and algorithms in step-by-step 3D: the task, the head-on way, what we notice and how to solve it faster. In Russian and English, right in the browser.',
    source: {
      ru: 'Приёмы собраны из решения задач Project Euler+ на HackerRank',
      en: 'Methods drawn from solving Project Euler+ on HackerRank',
      links: [
        { href: 'https://www.hackerrank.com/contests/projecteuler/leaderboard', ru: 'HackerRank · 6-е место из ≈256 000', en: 'HackerRank · 6th of ≈256,000' },
        { href: 'https://github.com/esurvanov/project-euler', ru: 'Решения на GitHub', en: 'Solutions on GitHub' },
      ],
    },
  },
]

interface Base {
  path: string
  ru: { title: string; description: string }
  en?: { title: string; description: string }
  noindex?: L<boolean>
  jsonLd?: (lang: Lang) => Record<string, unknown>
  // Файлы/данные страницы — для честного lastmod (см. scripts/prerender.mjs, gitDate)
  sources: string[]
  // Новые языки: страница есть, если в src/i18n/<язык>/seo.json есть её title и description,
  // переведены все модули из needs (src/i18n/index.ts, MODULES) и выполнено ready. newLangs: false — только ru/en.
  needs?: string[]
  ready?: (lang: NewLang) => boolean
  newLangs?: false
}

const BASE_LANGS: BaseLang[] = ['ru', 'en']
// Имя автора в заголовках: по-русски на русских страницах, латиницей на остальных
const siteName = (l: Lang) => (l === 'ru' ? SITE_NAME : 'Egor Urvanov')
const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ''))

// Готовность единиц на новых языках (правило — в src/i18n/index.ts и src/i18n/README.md)
const termReady = (slug: string, l: Lang) => !isNewLang(l) || (unitReady('glossary', slug, l) && unitReady('glossarySets', setOfTerm(slug).slug, l))
const glossaryReady = (l: Lang) => !isNewLang(l) || (!!seoMeta('/materials/glossary', l) && moduleReady('glossarySets', l) && ALL_TERMS.some((x) => termReady(x.slug, l)))
const aiReady = (l: Lang) => !isNewLang(l) || moduleReady('ai', l)
const offerReady = (slug: string, l: Lang) => aiReady(l) && (!isNewLang(l) || unitReady('aiOffers', slug, l))
const aiHubReady = (l: Lang) => !isNewLang(l) || (!!seoMeta('/ai', l) && aiReady(l) && AI_OFFERS.some((o) => offerReady(o.slug, l)))
const blogReady = (l: Lang) => !isNewLang(l) || (!!seoMeta('/blog', l) && moduleReady('blog', l))
/** Языки, на которых есть единица: ru и en всегда, новые — по правилу ready */
const langsWhere = (ready: (l: NewLang) => boolean): Lang[] => [...BASE_LANGS, ...NEW_LANGS.filter(ready)]

const BASE: Base[] = [
  {
    path: '/',
    ru: { title: `${SITE_NAME} — CTO, AI, нетворк`, description: 'Егор Урванов: CTO, AI-разработка, менторство, Jaiora — оффлайн-LinkedIn, блог, доклады, каталог AI-паттернов и браузерные игры.' },
    en: { title: 'Egor Urvanov — CTO, AI, networking', description: 'Egor Urvanov: CTO, AI development, mentoring, Jaiora — offline LinkedIn, blog, talks, an AI patterns catalog, and browser games.' },
    jsonLd: (l) => ({ '@type': 'WebSite', name: siteName(l), url: url(withLang('/', l)), inLanguage: l, author: person() }),
    sources: ['src/components/HomeView.tsx', 'src/data/nav.ts', 'src/data/profile.ts'],
    needs: ['nav', 'profile'],
  },
  {
    path: '/about',
    ru: { title: `Обо мне — ${SITE_NAME}`, description: 'Егор Урванов: CTO, машинное обучение, AI-разработка. Путь от инженера до CTO, победитель соревнований, автор статьи на arXiv, ментор №1 на GetMentor, основатель Jaiora.' },
    en: { title: 'About — Egor Urvanov', description: 'Egor Urvanov: CTO, machine learning, AI development. Career from engineer to CTO, competition winner, arXiv author, #1 mentor on GetMentor, founder of Jaiora.' },
    jsonLd: () => ({ '@type': 'ProfilePage', mainEntity: person() }),
    sources: ['src/components/AboutView.tsx', 'src/data/about.ts', 'src/data/links.ts', 'src/data/places.ts'],
    needs: ['about', 'places', 'links'],
  },
  {
    path: '/blog',
    ru: { title: `Блог: мнение и опыт автора — ${SITE_NAME}`, description: 'Личный блог: мнение и опыт автора про AI-разработку, Spec-Driven Development, инженерное управление и сообщества.' },
    en: { title: 'Blog: the author’s views and experience — Egor Urvanov', description: 'A personal blog: the author’s views and experience on AI development, Spec-Driven Development, engineering management and communities.' },
    noindex: { ru: POSTS.filter((p) => p.lang === 'ru').length === 0, en: POSTS.filter((p) => p.lang === 'en').length === 0 },
    jsonLd: (l) => ({ '@type': 'Blog', name: l === 'ru' ? `Блог — ${SITE_NAME}` : `${ui(l, 'Blog')} — Egor Urvanov`, url: url(withLang('/blog', l)), inLanguage: l, author: person() }),
    sources: ['src/data/blog.ts', 'content/blog'],
    needs: ['blog'],
    ready: (l) => postsFor(l).length > 0,
  },
  {
    path: '/links',
    ru: { title: `Ссылки — ${SITE_NAME}`, description: 'Профили, проекты, выступления и телеграм-каналы Егора Урванова в одном месте.' },
    en: { title: 'Links — Egor Urvanov', description: 'Profiles, projects, talks, and Telegram channels of Egor Urvanov in one place.' },
    sources: ['src/components/LinksView.tsx', 'src/data/links.ts'],
    needs: ['links'],
  },
  {
    path: '/materials',
    ru: { title: `Материалы — ${SITE_NAME}`, description: 'Презентации, каталог AI-паттернов, мастерская методов в 3D и браузерные игры.' },
    en: { title: 'Materials — Egor Urvanov', description: 'Presentations, an AI patterns catalog, a 3D methods workshop, and browser games.' },
    sources: ['src/components/MaterialsView.tsx'],
  },
  {
    path: '/materials/presentations',
    ru: { title: `Презентации — ${SITE_NAME}`, description: `${config.conferenceName}: «Работа AI-агента: архитектура, защита, экономика», «${config.talkTitle}» и каталог паттернов разработки с AI-агентами.` },
    en: { title: 'Presentations — Egor Urvanov', description: `${config.conferenceName}: “Spec-Driven Development in practice” (in Russian) and a catalog of AI-agent development patterns.` },
    sources: ['src/components/MaterialsView.tsx', 'src/data/config.ts'],
  },
  {
    path: '/materials/games',
    ru: { title: `Игры в браузере — ${SITE_NAME}`, description: 'Восемь бесплатных браузерных игр без установки: стратегия Хроники Королевств, выживание Сибирь, 3D-миры Эхо Разлома и Березовка, 3D-аркада Северный Разлом, головоломка Аптайм, симулятор жизни Житьё и социальная симуляция Сходка.' },
    en: { title: 'Browser games — Egor Urvanov', description: 'Eight free browser games, no install: the RTS Chronicles of Kingdoms, the survival game Sibiria, 3D worlds Echo of the Rift and Berezovka, the 3D arcade Northern Rift, the puzzle Uptime, the life sim Zhitiyo and the social sim Skhodka.' },
    sources: ['src/components/MaterialsView.tsx', 'src/data/seo.ts', 'src/data/games.ts'],
    needs: ['games'],
  },
  {
    path: '/materials/interactive',
    ru: { title: `Интерактивы — ${SITE_NAME}`, description: 'Интерактивные страницы: приёмы решения задач в 3D, шаг за шагом, прямо в браузере.' },
    en: { title: 'Interactive — Egor Urvanov', description: 'Interactive pages: problem-solving methods in step-by-step 3D, right in the browser.' },
    sources: ['src/components/MaterialsView.tsx', 'src/data/labs.ts'],
    needs: ['labs'],
  },
  {
    path: '/materials/glossary',
    ru: { title: `Глоссарий AI-разработки — ${SITE_NAME}`, description: 'Термины AI-разработки по наборам: агенты, харнесс, MCP, спеки, промпты. У каждого термина определение и статьи, где он разобран.' },
    en: { title: 'AI development glossary — Egor Urvanov', description: 'AI development terms by set: agents, harness, MCP, specs, prompts. Each term has a definition and the articles that cover it.' },
    jsonLd: (l) => ({
      '@type': 'DefinedTermSet', name: l === 'ru' ? 'Глоссарий AI-разработки' : ui(l, 'AI development glossary'), inLanguage: l, url: url(withLang('/materials/glossary', l)),
      author: person(), hasDefinedTerm: ALL_TERMS.filter((x) => termReady(x.slug, l)).map((x) => ({ '@type': 'DefinedTerm', name: tr(x.name, l), url: url(withLang(glossaryPath(x.slug), l)) })),
    }),
    sources: ['src/components/GlossaryView.tsx', 'src/data/glossary.ts'],
    needs: ['glossarySets'],
    ready: (l) => glossaryReady(l),
  },
  {
    // Витрина блоков статей: служебная страница для проверки вёрстки — не в поиске, не в sitemap и llms.txt
    path: '/materials/blocks',
    ru: { title: `Блоки статей — ${SITE_NAME}`, description: 'Витрина библиотеки блоков статей блога: каждый блок, его метка, атрибуты и пример.' },
    en: { title: 'Article blocks — Egor Urvanov', description: 'Showcase of the blog article block library: every block, its tag, attributes and an example.' },
    noindex: { ru: true, en: true },
    sources: ['src/components/BlocksView.tsx', 'src/data/blocks'],
    newLangs: false,
  },
  {
    path: '/talk/spec-driven-development',
    ru: {
      title: `${config.talkTitle} — ${config.conferenceName}`,
      description: `Доклад «${config.talkTitle}» на ${config.conferenceName}: полный текст всех слайдов — индустрия AI-разработки, теория Spec-Driven Development и воркшоп по OpenSpec.`,
    },
    en: {
      title: `${config.talkTitleEn} — ${config.conferenceName}`,
      description: `The talk “${config.talkTitleEn}” at ${config.conferenceName} (in Russian): full slide text, from the state of AI development to Spec-Driven Development theory and an OpenSpec workshop.`,
    },
    jsonLd: (l) => ({
      '@type': 'PresentationDigitalDocument',
      name: l === 'en' ? config.talkTitleEn : config.talkTitle,
      description: l === 'en'
        ? `A talk on Spec-Driven Development at ${config.conferenceName}, given by Egor Urvanov (in Russian).`
        : `Доклад о Spec-Driven Development на ${config.conferenceName}, автор — Егор Урванов.`,
      author: person(),
      about: ['Spec-Driven Development', 'AI agents', 'OpenSpec'],
      inLanguage: 'ru',
      isPartOf: url(withLang('/materials/presentations', l)),
    }),
    sources: ['src/components/TalkView.tsx', 'src/data/slides.ts', 'src/slides'],
    // Доклад — слайды на русском и их английский текст: на новые языки не переводится
    newLangs: false,
  },
]

// Список страниц считается один раз: его читают и сборка, и SPA при каждом переходе (metaFor, реестр страниц)
let cached: PageMeta[] | undefined
export function allPages(): PageMeta[] {
  return (cached ??= buildPages())
}

// Реестр существующих адресов: по нему ссылки на новых языках решают, вести на перевод или на английскую страницу
let pathSet: Set<string> | undefined
setPageIndex((path) => (pathSet ??= new Set(allPages().map((p) => p.path))).has(path))
// В браузере переводы языка приходят позже основной сборки (src/i18n/packs): со словом о новом пакете список страниц считается заново
onLangLoaded(() => { cached = undefined; pathSet = undefined })

function buildPages(): PageMeta[] {
  const pages: PageMeta[] = []
  for (const b of BASE) {
    const metas = new Map<Lang, { title: string; description: string }>([['ru', b.ru]])
    if (b.en) {
      metas.set('en', b.en)
      if (b.newLangs !== false) {
        for (const l of NEW_LANGS) {
          const m = seoMeta(b.path, l)
          if (m && (b.needs ?? []).every((n) => moduleReady(n, l)) && (b.ready?.(l) ?? true)) metas.set(l, m)
        }
      }
    }
    const alternates = [...metas.keys()].map((l) => ({ lang: l, path: withLang(b.path, l) }))
    for (const [l, m] of metas) {
      pages.push({ path: withLang(b.path, l), lang: l, title: m.title, description: m.description, noindex: isNewLang(l) ? undefined : b.noindex?.[l], jsonLd: b.jsonLd?.(l), sources: b.sources, alternates })
    }
  }
  {
    const hubLangs = langsWhere(aiHubReady)
    pages.push(
      ...langsWhere(aiReady).flatMap((l) => {
        const hub = seoMeta('/ai', l as NewLang)
        return [
          ...(hubLangs.includes(l) ? [{
            path: withLang('/ai', l), lang: l, alternates: hubLangs.map((x) => ({ lang: x, path: withLang('/ai', x) })), sources: ['src/components/AiOfferView.tsx', 'src/data/aiOffers.ts'],
            title: l === 'en' ? 'AI at work: training and adoption — Egor Urvanov' : l === 'ru' ? `AI на работе: обучение и внедрение — ${SITE_NAME}` : hub!.title,
            description: l === 'en' ? 'AI training and adoption for companies, teams by role, and individuals.' : l === 'ru' ? 'Обучение AI и внедрение: для компаний, команд по ролям и лично.' : hub!.description,
          }] : []),
          ...AI_OFFERS.filter((o) => offerReady(o.slug, l)).map((o) => ({
            path: withLang(`/ai/${o.slug}`, l), lang: l, sources: ['src/components/AiOfferView.tsx', 'src/data/aiOffers.ts'],
            alternates: langsWhere((x) => offerReady(o.slug, x)).map((x) => ({ lang: x, path: withLang(`/ai/${o.slug}`, x) })),
            title: `${tr(o.name, l)} — ${siteName(l)}`,
            description: `${tr(o.hook, l)}. ${tr(o.outcomes, l).slice(0, 2).join('; ')}.`,
          })),
        ]
      }),
    )
  }
  // Слайды и каталог паттернов только на русском
  pages.push(
    { path: '/patterns', lang: 'ru', title: `Каталог AI-паттернов разработки — ${SITE_NAME}`, description: 'Паттерны разработки с AI-агентами по категориям: описание, когда применять, примеры.', sources: ['src/data/patterns.ts'], alternates: [{ lang: 'ru', path: '/patterns' }] },
    { path: '/slide/1', lang: 'ru', title: `${config.talkTitle} — ${config.conferenceName}`, description: `Презентация доклада «${config.talkTitle}» на ${config.conferenceName}.`, sources: ['src/data/slides.ts', 'src/slides'], alternates: [{ lang: 'ru', path: '/slide/1' }] },
  )
  for (const c of PATTERN_CATEGORIES) {
    pages.push({ path: `/patterns/${c.id}`, lang: 'ru', title: `${c.title} — паттерны AI-разработки`, description: c.description, sources: ['src/data/patterns.ts'], alternates: [{ lang: 'ru', path: `/patterns/${c.id}` }] })
  }
  for (const p of pages) {
    if (p.path === withLang('/blog', p.lang) && pageCount(postsIn(p.lang).length) > 1) p.next = withLang(blogListPath(undefined, 2), p.lang)
  }
  pages.push(...blogListPages())
  for (const p of POSTS) {
    // Все языковые версии поста: сначала сама страница, затем остальные в порядке языков сайта
    const versions = POSTS.filter((x) => x.slug === p.slug && x.lang !== p.lang)
    const alternates = [{ lang: p.lang, path: withLang(`/blog/${p.slug}`, p.lang) }, ...LANGS_ORDER.flatMap((l) => versions.filter((x) => x.lang === l)).map((x) => ({ lang: x.lang, path: withLang(`/blog/${p.slug}`, x.lang) }))]
    // Русская версия — оригинал, остальные — переводы
    const translations = versions.map((x) => ({ '@id': url(withLang(`/blog/${p.slug}`, x.lang)) + '#main' }))
    const original = versions.find((x) => x.lang === 'ru')
    pages.push({
      path: withLang(`/blog/${p.slug}`, p.lang),
      lang: p.lang,
      // В выдаче длинный заголовок обрезается: в <title> — суть до двоеточия, полный — в соцсетях и разметке
      title: `${p.title.split(': ')[0]} — ${siteName(p.lang)}`,
      ogTitle: p.title,
      description: p.description,
      type: 'article',
      date: p.date,
      modified: p.updated,
      image: p.image,
      alternates,
      jsonLdExtra: faqOf(p.html).length ? [{ '@type': 'FAQPage', mainEntity: faqOf(p.html).map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })) }] : undefined,
      jsonLd: {
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.description,
        ...(leadOf(p.html) ? { abstract: leadOf(p.html) } : {}),
        datePublished: p.date,
        dateModified: p.updated ?? p.date,
        inLanguage: p.lang,
        keywords: p.tags.join(', '),
        articleSection: tr(findCategory(p.category)!.name, p.lang),
        wordCount: p.words,
        timeRequired: `PT${p.minutes}M`,
        isAccessibleForFree: true,
        author: person(),
        publisher: person(),
        mainEntityOfPage: url(withLang(`/blog/${p.slug}`, p.lang)),
        image: p.image ? { '@type': 'ImageObject', url: `${SITE_URL}${p.image}`, width: 1200, height: 630 } : `${SITE_URL}/egor.jpg`,
        ...(p.mentions.length ? { mentions: p.mentions.map((name) => ({ '@type': 'Thing', name })) } : {}),
        ...(p.toc.length ? { hasPart: p.toc.map((t) => ({ '@type': 'WebPageElement', name: t.label, url: `${url(withLang(`/blog/${p.slug}`, p.lang))}#${t.id}` })) } : {}),
        ...(p.lang === 'ru'
          ? translations.length ? { workTranslation: translations.length === 1 ? translations[0] : translations } : {}
          : original ? { translationOfWork: { '@id': url(withLang(`/blog/${p.slug}`, 'ru')) + '#main' } } : {}),
      },
    })
  }
  // Посадочные страницы игр: текст для поиска + разметка VideoGame/WebApplication + FAQPage (сама игра на отдельном адресе)
  for (const g of GAME_PAGES) {
    const langs = langsWhere((l) => unitReady('games', g.slug, l))
    const alternates = langs.map((l) => ({ lang: l, path: withLang(`/materials/games/${g.slug}`, l) }))
    for (const l of langs) {
      const path = withLang(`/materials/games/${g.slug}`, l), pageUrl = url(path), image = `/games/${g.slug}/${g.shots[0].file}`
      pages.push({
        path, lang: l,
        title: g.title ? tr(g.title, l) : l === 'en' ? `${g.name.en} — play free in your browser` : l === 'ru' ? `${g.name.ru} — играть онлайн в браузере` : `${tr(g.name, l)} — ${ui(l, 'play free in your browser')}`,
        description: tr(g.description, l),
        image, alternates, sources: ['src/data/games.ts', 'src/components/GameView.tsx'],
        jsonLd: {
          '@type': ['VideoGame', 'WebApplication'],
          name: tr(g.name, l), description: tr(g.description, l), url: pageUrl, image: SITE_URL + image,
          screenshot: g.shots.map((s) => ({ '@type': 'ImageObject', contentUrl: `${SITE_URL}/games/${g.slug}/${s.file}`, caption: tr(s.alt, l) })),
          genre: tr(g.genre, l), keywords: tr(g.keywords, l).join(', '), applicationCategory: 'GameApplication', gamePlatform: 'Web browser', operatingSystem: 'Any (web browser)',
          playMode: 'SinglePlayer', inLanguage: l, isAccessibleForFree: true, license: 'https://opensource.org/licenses/MIT',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          author: person(), publisher: person(), isPartOf: { '@id': `${SITE_URL}/#person` },
          sameAs: [`https://github.com/esurvanov/awesome-games/tree/main/${g.repoDir}`],
          potentialAction: { '@type': 'PlayAction', target: SITE_URL + g.play },
          mainEntityOfPage: pageUrl,
        },
        jsonLdExtra: [{
          '@type': 'FAQPage',
          mainEntity: tr(g.faq, l).map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
        }],
      })
    }
  }
  // Архитектура игры: страница рядом с игрой (не пост блога), разметка TechArticle. Только ru/en: текст приходит из репозитория игр
  for (const a of ARCHITECTURES) {
    const g = GAME_PAGES.find((x) => x.slug === a.game)
    if (!g) continue
    const tra = ARCHITECTURES.find((x) => x.game === a.game && x.lang !== a.lang)
    const alternates = [{ lang: a.lang, path: withLang(architecturePath(a.game), a.lang) }, ...(tra ? [{ lang: tra.lang, path: withLang(architecturePath(a.game), tra.lang) }] : [])]
    const path = withLang(architecturePath(a.game), a.lang), pageUrl = url(path)
    const image = `/games/${g.slug}/${g.shots[0].file}`
    const ex = ARCHITECTURE_EXTRA[a.game]
    const fullTitle = ex ? `${a.title.split(': ')[0]}: ${tr(ex.sub, a.lang)}` : a.title
    // Дата правки: разбор или дополнения сайта к нему — что позже
    const modified = [a.date, ex?.updated].filter(Boolean).sort().pop() || undefined
    pages.push({
      path, lang: a.lang,
      title: `${a.title.split(': ')[0]} — ${siteName(a.lang)}`,
      ogTitle: fullTitle,
      description: a.description,
      type: 'article',
      date: a.date || undefined,
      modified,
      jsonLdExtra: ex ? [{ '@type': 'FAQPage', mainEntity: ex.faq.map((f) => ({ '@type': 'Question', name: tr(f.q, a.lang), acceptedAnswer: { '@type': 'Answer', text: tr(f.a, a.lang) } })) }] : undefined,
      image,
      alternates,
      sources: ['src/data/architecture.ts', 'src/components/ArchitectureView.tsx'],
      jsonLd: {
        '@type': 'TechArticle',
        headline: fullTitle,
        description: a.description,
        ...(a.date ? { datePublished: a.date } : {}),
        ...(modified ? { dateModified: modified } : {}),
        inLanguage: a.lang,
        keywords: a.tags.join(', '),
        wordCount: a.words,
        isAccessibleForFree: true,
        author: person(),
        publisher: person(),
        about: { '@type': 'VideoGame', name: tr(g.name, a.lang), url: url(withLang(`/materials/games/${g.slug}`, a.lang)) },
        mainEntityOfPage: pageUrl,
        image: `${SITE_URL}${image}`,
        ...(a.mentions.length ? { mentions: a.mentions.map((name) => ({ '@type': 'Thing', name })) } : {}),
        ...(a.toc.length ? { hasPart: a.toc.map((t) => ({ '@type': 'WebPageElement', name: t.label, url: `${pageUrl}#${t.id}` })) } : {}),
      },
    })
  }
  // Посадочные страницы интерактивов: индексируется она, а не сам интерактив (он на отдельном адресе)
  for (const x of LAB_PAGES) {
    const langs = langsWhere((l) => unitReady('labs', x.slug, l))
    const alternates = langs.map((l) => ({ lang: l, path: withLang(`/materials/interactive/${x.slug}`, l) }))
    for (const l of langs) {
      const pageUrl = url(withLang(`/materials/interactive/${x.slug}`, l))
      pages.push({
        path: withLang(`/materials/interactive/${x.slug}`, l), lang: l,
        title: l === 'en' ? `${x.name.en} — interactive, in your browser` : l === 'ru' ? `${x.name.ru} — интерактив в браузере` : `${tr(x.name, l)} — ${ui(l, 'interactive, in your browser')}`,
        description: tr(x.description, l), alternates, sources: ['src/data/labs.ts', 'src/components/LabView.tsx'],
        jsonLd: {
          '@type': 'LearningResource', '@id': `${pageUrl}#main`, name: tr(x.name, l), description: tr(x.description, l), url: pageUrl,
          inLanguage: ['ru', 'en'], learningResourceType: 'Interactive visualization', isAccessibleForFree: true,
          author: person(), isPartOf: url(withLang('/materials/interactive', l)),
          potentialAction: { '@type': 'ViewAction', target: SITE_URL + x.play },
        },
      })
    }
  }
  // Термины глоссария: страница на термин, разметка DefinedTerm внутри набора
  for (const x of ALL_TERMS) {
    const set = setOfTerm(x.slug)
    const langs = langsWhere((l) => termReady(x.slug, l))
    const alternates = langs.map((l) => ({ lang: l, path: withLang(glossaryPath(x.slug), l) }))
    for (const l of langs) {
      const pageUrl = url(withLang(glossaryPath(x.slug), l))
      const name = tr(x.name, l), def = tr(x.def, l)
      pages.push({
        path: withLang(glossaryPath(x.slug), l), lang: l, crumb: name,
        title: x.seo ? tr(x.seo.title, l) : l === 'en' ? `${x.name.en}: what it is — AI development glossary` : l === 'ru' ? `${x.name.ru}: что это — глоссарий AI-разработки` : fill(ui(l, '{name}: what it is — AI development glossary'), { name }),
        description: x.seo ? tr(x.seo.description, l) : def.replace(/`/g, ''), alternates, sources: ['src/data/glossary.ts', 'src/components/GlossaryView.tsx'],
        // Даты термина (scripts/term-dates.py): создание и последняя правка — lastmod в карте сайта и dateModified в разметке
        date: TERM_DATES[x.slug]?.[0], modified: TERM_DATES[x.slug]?.[1],
        jsonLdExtra: [
          ...(TERM_DATES[x.slug] ? [{ '@type': 'WebPage', '@id': pageUrl + '#page', url: pageUrl, inLanguage: l, datePublished: TERM_DATES[x.slug][0], dateModified: TERM_DATES[x.slug][1] }] : []),
          ...(x.faq ? [{ '@type': 'FAQPage', mainEntity: x.faq.map((f) => ({ '@type': 'Question', name: tr(f.q, l), acceptedAnswer: { '@type': 'Answer', text: tr(f.a, l).replace(/`/g, '') } })) }] : []),
        ],
        jsonLd: {
          '@type': 'DefinedTerm', name, description: def.replace(/`/g, ''), url: pageUrl, inLanguage: l,
          ...(x.aka ? { alternateName: tr(x.aka, l) } : {}),
          ...(x.source && /wikipedia\.org/.test(x.source.url) ? { sameAs: x.source.url } : {}),
          // Набор терминов — страница глоссария на этом языке, если она есть, иначе английская
          inDefinedTermSet: { '@type': 'DefinedTermSet', name: tr(set.name, l), url: url(withLang('/materials/glossary', glossaryReady(l) ? l : 'en')) },
          subjectOf: postsWithTerm(x.slug, l).map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: url(withLang(`/blog/${p.slug}`, l)) })),
        },
      })
    }
  }
  return pages
}

const LANGS_ORDER: Lang[] = [...BASE_LANGS, ...NEW_LANGS]

// Лента блога: страницы 2…N и рубрики (со своими страницами). Первая страница ленты — '/blog' из BASE.
// У каждой страницы canonical на себя, prev/next — на соседей; /page/1/ не существует (первая — без номера).
// На новом языке лента есть, если есть посты на нём и переведены '/blog' в seo.json и модуль blog (рубрики).
function blogListPages(): PageMeta[] {
  const pages: PageMeta[] = []
  const lists: (typeof BLOG_CATEGORIES[number] | undefined)[] = [undefined, ...BLOG_CATEGORIES]
  const exists = (l: Lang, cat: string | undefined, page: number) => {
    const total = postsIn(l, cat).length
    return total > 0 && pageCount(total) >= page && blogReady(l)
  }
  for (const cat of lists) {
    for (const l of LANGS_ORDER) {
      if (!exists(l, cat?.slug, 1)) continue
      const n = pageCount(postsIn(l, cat?.slug).length)
      for (let page = 1; page <= n; page++) {
        // первая страница самой ленты уже есть в BASE (rel=next ей дописывает allPages)
        if (!cat && page === 1) continue
        const path = withLang(blogListPath(cat?.slug, page), l)
        const prev = page > 1 ? withLang(blogListPath(cat?.slug, page - 1), l) : undefined
        const next = page < n ? withLang(blogListPath(cat?.slug, page + 1), l) : undefined
        const alternates = [{ lang: l, path }, ...LANGS_ORDER.filter((o) => o !== l && exists(o, cat?.slug, page)).map((o) => ({ lang: o, path: withLang(blogListPath(cat?.slug, page), o) }))]
        const ru = l === 'ru'
        const head = cat ? tr(cat.name, l) : ru ? 'Блог' : ui(l, 'Blog')
        const pageSuffix = page > 1 ? (ru ? `, страница ${page}` : fill(ui(l, ', page {n}'), { n: page })) : ''
        const blogOf = ru ? 'блог Егора Урванова' : ui(l, 'blog of Egor Urvanov')
        pages.push({
          path,
          lang: l,
          title: cat ? `${head}${pageSuffix} — ${blogOf}` : `${head}${pageSuffix} — ${siteName(l)}`,
          description: (cat ? tr(cat.description, l) : ru ? 'Заметки про AI-разработку, Spec-Driven Development, инженерное управление и сообщества.' : ui(l, 'Notes on AI development, Spec-Driven Development, engineering management, and communities.'))
            + (page > 1 ? (ru ? ` Страница ${page} из ${n}.` : fill(ui(l, ' Page {n} of {total}.'), { n: page, total: n })) : ''),
          prev,
          next,
          alternates,
          jsonLd: {
            '@type': 'CollectionPage',
            name: cat ? tr(cat.name, l) : head,
            url: url(path),
            inLanguage: l,
            isPartOf: { '@type': 'Blog', url: url(withLang('/blog', l)) },
          },
          sources: ['src/data/blog.ts', 'content/blog'],
        })
      }
    }
  }
  return pages
}

export const metaFor = (path: string): PageMeta | undefined => allPages().find((p) => p.path === path)
