import { Routes, Route, Navigate } from 'react-router-dom'
import SlideView from '@/components/SlideView'
import PresenterView from '@/components/PresenterView'
import PatternsView from '@/components/PatternsView'
import PatternsCategoryView from '@/components/PatternsCategoryView'
import LinksView from '@/components/LinksView'
import HomeView from '@/components/HomeView'
import JaioraView from '@/components/JaioraView'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/slide/:index" element={<SlideView />} />
      <Route path="/presenter" element={<PresenterView />} />
      <Route path="/patterns" element={<PatternsView />} />
      <Route path="/patterns/:categoryId" element={<PatternsCategoryView />} />
      <Route path="/jaiora" element={<JaioraView />} />
      <Route path="/links" element={<LinksView />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
