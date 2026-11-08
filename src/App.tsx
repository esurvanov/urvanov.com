import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import type { ReactElement } from 'react'
import { NEW_LANGS, hasPage, isNewLang, langOf, stripLang } from '@/lib/i18n'
import PatternsView from '@/components/PatternsView'
import PatternsCategoryView from '@/components/PatternsCategoryView'
import LinksView from '@/components/LinksView'
import HomeView from '@/components/HomeView'
import AboutView from '@/components/AboutView'
import BlogView from '@/components/BlogView'
import BlogPostView from '@/components/BlogPostView'
import TalkView from '@/components/TalkView'
import NotFoundView from '@/components/NotFoundView'
import { GlossaryView, TermView } from '@/components/GlossaryView'
import { MaterialsView, PresentationsView, GamesView, InteractiveView } from '@/components/MaterialsView'
import { AiHubView, AiOfferView } from '@/components/AiOfferView'
import { GameView } from '@/components/GameView'
import ArchitectureView from '@/components/ArchitectureView'
import { LabView } from '@/components/LabView'
import BlocksView from '@/components/BlocksView'
import { usePageMeta } from '@/lib/usePageMeta'
import { useSmoothNavigation } from '@/lib/useSmoothNavigation'

// Презентация тянет за собой все слайды и подсветку кода: грузим только когда её открыли
const SlideView = lazy(() => import('@/components/SlideView'))
const PresenterView = lazy(() => import('@/components/PresenterView'))

const PAGES: [string, ReactElement][] = [
  ['/', <HomeView />],
  ['/about', <AboutView />],
  ['/blog', <BlogView />],
  ['/blog/page/:page', <BlogView />],
  ['/blog/category/:category', <BlogView />],
  ['/blog/category/:category/page/:page', <BlogView />],
  ['/blog/:slug', <BlogPostView />],
  ['/materials', <MaterialsView />],
  ['/materials/presentations', <PresentationsView />],
  ['/materials/games', <GamesView />],
  ['/materials/games/:slug', <GameView />],
  ['/materials/games/:slug/architecture', <ArchitectureView />],
  ['/materials/glossary', <GlossaryView />],
  ['/materials/glossary/:slug', <TermView />],
  ['/materials/interactive', <InteractiveView />],
  ['/materials/interactive/:slug', <LabView />],
  ['/materials/blocks', <BlocksView />],
  ['/ai', <AiHubView />],
  ['/ai/:slug', <AiOfferView />],
  ['/links', <LinksView />],
  ['/talk/spec-driven-development', <TalkView />],
]

// Старые английские адреса /en/… ведут в корень; русские — под /ru/
function EnAlias() {
  const { pathname, search, hash } = useLocation()
  return <Navigate replace to={stripLang(pathname) + search + hash} />
}

// Новые языки (/th/, /ka/, …): адрес есть, только если страница переведена (src/i18n/README.md).
// Непереведённый адрес не рисуем английским текстом под чужим языком — это 404, как и в готовой сборке.
function Translated({ children }: { children: ReactElement }) {
  const { pathname } = useLocation()
  const lang = langOf(pathname)
  return isNewLang(lang) && !hasPage(pathname) ? <NotFoundView /> : children
}

export default function App() {
  usePageMeta()
  useSmoothNavigation()
  return (
    <Suspense fallback={null}>
    <Routes>
      {['', '/ru'].flatMap((pre) => PAGES.map(([p, el]) => <Route key={pre + p} path={p === '/' ? pre || '/' : pre + p} element={el} />))}
      {NEW_LANGS.map((l) => `/${l}`).flatMap((pre) => PAGES.map(([p, el]) => <Route key={pre + p} path={p === '/' ? pre : pre + p} element={<Translated>{el}</Translated>} />))}
      <Route path="/en" element={<EnAlias />} />
      <Route path="/en/*" element={<EnAlias />} />
      <Route path="/slide/:index" element={<SlideView />} />
      <Route path="/presenter" element={<PresenterView />} />
      <Route path="/patterns" element={<PatternsView />} />
      <Route path="/patterns/:categoryId" element={<PatternsCategoryView />} />
      <Route path="*" element={<NotFoundView />} />
    </Routes>
    </Suspense>
  )
}
