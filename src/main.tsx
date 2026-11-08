import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { langOf } from '@/lib/i18n'
import { loadLang } from '@/i18n/packs'
import App from './App'
import 'katex/dist/katex.min.css'
import './styles/theme.css'
import './styles/site.css'
import './styles/rich-post.css'
import './styles/rich-post-harness.css'
import './styles/rich-post-prompts.css'
// Стили библиотеки блоков статей (src/data/blocks): после старых стилей серий
import './data/blocks/styles'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element #root not found in index.html')
}

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Страницы выложены готовым HTML: оживляем его; иначе (dev, 404) рисуем с нуля.
// Переводы языка страницы подгружаются до оживления: иначе разметка разойдётся с готовым HTML
loadLang(langOf(window.location.pathname)).then(() => {
  if (rootElement.hasChildNodes()) hydrateRoot(rootElement, app)
  else createRoot(rootElement).render(app)
})
