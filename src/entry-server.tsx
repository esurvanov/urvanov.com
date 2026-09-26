import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}

export { allPages, SITE_URL, SITE_NAME, GAMES } from './data/seo'
export { POSTS } from './data/blog'
