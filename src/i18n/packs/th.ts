// Пакет языка «th»: всё, что нужно для его страниц, одним куском сборки (грузится, только если открыта страница на этом языке)
import { registerLang } from '@/i18n'

registerLang('th', {
  json: import.meta.glob('/src/i18n/th/*.json', { eager: true, import: 'default' }),
  posts: import.meta.glob('/content/blog/*.th.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>,
  texts: import.meta.glob('/content/blog-text/*.th.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>,
})
