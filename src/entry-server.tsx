// Сборка страниц видит все языки сразу: пакеты переводов подключаются здесь (в браузере их грузит src/main.tsx)
import './i18n/packs/th'
import './i18n/packs/ka'
import './i18n/packs/vi'
import './i18n/packs/es'
import './i18n/packs/fr'
import { checkI18nFiles } from './i18n'
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
export { ALL_TERMS, TERM_SETS } from './data/glossary'
export { TERM_DATES } from './data/termDates'
export { GAME_PAGES } from './data/games'
export { ARCHITECTURES, architecturePath } from './data/architecture'
export { config } from './data/config'
// Данные для llms-full.txt (prerender.mjs): собираем текст «Обо мне» и Jaiora из тех же
// источников, что рендерит React — чтобы файл не расходился со страницами при правках
export { MILESTONES, ABOUT_LEAD } from './data/about'
export { PLACES } from './data/places'
export { LINK_GROUPS, itemText, CITY_CHATS, THEME_CHATS } from './data/links'
export { CURRENT_ROLE, CITIES, TOPICS, BIO } from './data/profile'
// Новые языки: строки интерфейса для крошек в разметке, шрифты тайского и грузинского, ошибки файлов переводов и сводка покрытия
export { ui, NEW_LANGS, LOCALES } from './lib/i18n'
export { LANG_FONTS } from './lib/langFonts'
export { I18N_PROBLEMS, i18nStatus } from './i18n'
checkI18nFiles(Object.keys(import.meta.glob('/src/i18n/*/*.json')))
