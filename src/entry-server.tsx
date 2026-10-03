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

export { allPages, SITE_URL, SITE_NAME, GAMES, LABS, PERSON_ID, JAIORA_ORG_ID } from './data/seo'
export { POSTS } from './data/blog'
export { GAME_PAGES } from './data/games'
export { ARCHITECTURES, architecturePath } from './data/architecture'
export { config } from './data/config'
// Данные для llms-full.txt (prerender.mjs): собираем текст «Обо мне» и Jaiora из тех же
// источников, что рендерит React — чтобы файл не расходился со страницами при правках
export { MILESTONES, ABOUT_LEAD } from './data/about'
export { PLACES } from './data/places'
export { LINK_GROUPS, itemText, CITY_CHATS, THEME_CHATS } from './data/links'
export { CURRENT_ROLE, CITIES, TOPICS, BIO } from './data/profile'
