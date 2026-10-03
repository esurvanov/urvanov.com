import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import PatternsView from '@/components/PatternsView'
import PatternsCategoryView from '@/components/PatternsCategoryView'
import LinksView from '@/components/LinksView'
import HomeView from '@/components/HomeView'
import AboutView from '@/components/AboutView'
import BlogView from '@/components/BlogView'
import BlogPostView from '@/components/BlogPostView'
import TalkView from '@/components/TalkView'
import NotFoundView from '@/components/NotFoundView'
import { MaterialsView, PresentationsView, GamesView, InteractiveView } from '@/components/MaterialsView'
import { GameView } from '@/components/GameView'
import ArchitectureView from '@/components/ArchitectureView'
import { LabView } from '@/components/LabView'
import { usePageMeta } from '@/lib/usePageMeta'
import { useSmoothNavigation } from '@/lib/useSmoothNavigation'

// Презентация тянет за собой все слайды и подсветку кода: грузим только когда её открыли
const SlideView = lazy(() => import('@/components/SlideView'))
const PresenterView = lazy(() => import('@/components/PresenterView'))

export default function App() {
  usePageMeta()
  useSmoothNavigation()
  return (
    <Suspense fallback={null}>
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/about" element={<AboutView />} />
      <Route path="/blog" element={<BlogView />} />
      <Route path="/blog/page/:page" element={<BlogView />} />
      <Route path="/blog/category/:category" element={<BlogView />} />
      <Route path="/blog/category/:category/page/:page" element={<BlogView />} />
      <Route path="/blog/:slug" element={<BlogPostView />} />
      <Route path="/materials" element={<MaterialsView />} />
      <Route path="/materials/presentations" element={<PresentationsView />} />
      <Route path="/materials/games" element={<GamesView />} />
      <Route path="/materials/games/:slug" element={<GameView />} />
      <Route path="/materials/games/:slug/architecture" element={<ArchitectureView />} />
      <Route path="/materials/interactive" element={<InteractiveView />} />
      <Route path="/materials/interactive/:slug" element={<LabView />} />
      <Route path="/links" element={<LinksView />} />
      <Route path="/talk/spec-driven-development" element={<TalkView />} />
      <Route path="/en" element={<HomeView />} />
      <Route path="/en/about" element={<AboutView />} />
      <Route path="/en/blog" element={<BlogView />} />
      <Route path="/en/blog/page/:page" element={<BlogView />} />
      <Route path="/en/blog/category/:category" element={<BlogView />} />
      <Route path="/en/blog/category/:category/page/:page" element={<BlogView />} />
      <Route path="/en/blog/:slug" element={<BlogPostView />} />
      <Route path="/en/materials" element={<MaterialsView />} />
      <Route path="/en/materials/presentations" element={<PresentationsView />} />
      <Route path="/en/materials/games" element={<GamesView />} />
      <Route path="/en/materials/games/:slug" element={<GameView />} />
      <Route path="/en/materials/games/:slug/architecture" element={<ArchitectureView />} />
      <Route path="/en/materials/interactive" element={<InteractiveView />} />
      <Route path="/en/materials/interactive/:slug" element={<LabView />} />
      <Route path="/en/links" element={<LinksView />} />
      <Route path="/en/talk/spec-driven-development" element={<TalkView />} />
      <Route path="/slide/:index" element={<SlideView />} />
      <Route path="/presenter" element={<PresenterView />} />
      <Route path="/patterns" element={<PatternsView />} />
      <Route path="/patterns/:categoryId" element={<PatternsCategoryView />} />
      <Route path="*" element={<NotFoundView />} />
    </Routes>
    </Suspense>
  )
}
