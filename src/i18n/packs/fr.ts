// Пакет языка «fr»: всё, что нужно для его страниц, одним куском сборки (грузится, только если открыта страница на этом языке)
import { registerLang } from '@/i18n'

registerLang('fr', {
  json: import.meta.glob('/src/i18n/fr/*.json', { eager: true, import: 'default' }),
  posts: import.meta.glob('/content/blog/*.fr.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>,
  texts: import.meta.glob('/content/blog-text/*.fr.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>,
})
