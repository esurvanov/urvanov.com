// Какие новые языки имеют страницу, пока их пакет не загружен: переключатель языка на английской странице
// должен предлагать и испанский, не скачав его переводов. Список адресов (без текстов) пишет сборка:
// scripts/i18n-pages.mjs → src/i18n/pages.generated.json вида { "/blog/openspec": "vi,es,fr" } (адрес без языкового префикса).
import { isLangLoaded, isNewLang, type NewLang } from '@/lib/i18n'

const generated = import.meta.glob('./pages.generated.json', { eager: true, import: 'default' }) as Record<string, Record<string, string>>
const PAGE_LANGS: Record<string, string> = Object.values(generated)[0] ?? {}

/** Новые языки, на которых есть страница `bare` (адрес без префикса языка), но чей пакет ещё не загружен */
export const unloadedLangsOf = (bare: string): NewLang[] =>
  (PAGE_LANGS[bare]?.split(',') ?? []).filter((l): l is NewLang => isNewLang(l) && !isLangLoaded(l))
