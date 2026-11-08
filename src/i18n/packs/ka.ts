// Пакет языка «ka»: всё, что нужно для его страниц, одним куском сборки (грузится, только если открыта страница на этом языке)
import { registerLang } from '@/i18n'

registerLang('ka', {
  json: import.meta.glob('/src/i18n/ka/*.json', { eager: true, import: 'default' }),
  posts: import.meta.glob('/content/blog/*.ka.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>,
  texts: import.meta.glob('/content/blog-text/*.ka.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>,
})
