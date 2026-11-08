// Пакет языка «es»: всё, что нужно для его страниц, одним куском сборки (грузится, только если открыта страница на этом языке)
import { registerLang } from '@/i18n'

registerLang('es', {
  json: import.meta.glob('/src/i18n/es/*.json', { eager: true, import: 'default' }),
  posts: import.meta.glob('/content/blog/*.es.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>,
  texts: import.meta.glob('/content/blog-text/*.es.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>,
})
