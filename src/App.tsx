import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PatternsView from '@/components/PatternsView'
import PatternsCategoryView from '@/components/PatternsCategoryView'
import LinksView from '@/components/LinksView'
import HomeView from '@/components/HomeView'
import JaioraView from '@/components/JaioraView'
import AboutView from '@/components/AboutView'
import BlogView from '@/components/BlogView'
import BlogPostView from '@/components/BlogPostView'
import { MaterialsView, PresentationsView, GamesView } from '@/components/MaterialsView'
import { usePageMeta } from '@/lib/usePageMeta'

// Презентация тянет за собой все слайды и подсветку кода: грузим только когда её открыли
const SlideView = lazy(() => import('@/components/SlideView'))
const PresenterView = lazy(() => import('@/components/PresenterView'))

export default function App() {
  usePageMeta()
  return (
    <Suspense fallback={null}>
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/about" element={<AboutView />} />
      <Route path="/blog" element={<BlogView />} />
      <Route path="/blog/:slug" element={<BlogPostView />} />
      <Route path="/materials" element={<MaterialsView />} />
      <Route path="/materials/presentations" element={<PresentationsView />} />
      <Route path="/materials/games" element={<GamesView />} />
      <Route path="/slide/:index" element={<SlideView />} />
      <Route path="/presenter" element={<PresenterView />} />
      <Route path="/patterns" element={<PatternsView />} />
      <Route path="/patterns/:categoryId" element={<PatternsCategoryView />} />
      <Route path="/jaiora" element={<JaioraView />} />
      <Route path="/links" element={<LinksView />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </Suspense>
  )
}
