// Схемы постов блога из общей библиотеки инфографики. Один файл — один пост (имя файла = slug поста),
// в нём рецепты сцен на двух языках. В тексте поста вместо картинки стоит метка <iso-art name="slug/ключ"></iso-art>,
// при сборке она заменяется готовым <svg>, так что правка библиотеки сразу доходит до всех постов.
import { type Lang, type Scene, renderScene } from '@/lib/infographic'
import { termArt } from '@/lib/termArt'

const modules = import.meta.glob('./*.ts', { eager: true, import: 'default' }) as Record<string, Record<string, Scene>>
export const BLOG_ART: Record<string, Record<string, Scene>> = Object.fromEntries(
  Object.entries(modules).filter(([p]) => !p.endsWith('/index.ts')).map(([p, m]) => [p.slice(2, -3), m]),
)

export function blogArt(name: string, lang: Lang, o: { legend?: boolean } = {}): string {
  // term:<slug> — схема термина из глоссария: одно понятие выглядит одинаково и в глоссарии, и в постах
  if (name.startsWith('term:')) {
    const art = termArt(name.slice(5), lang)
    if (!art) throw new Error(`blogArt: у термина «${name.slice(5)}» нет схемы (src/lib/termArt.ts)`)
    return art.svg
  }
  const [post, key] = name.split('/')
  const sc = BLOG_ART[post]?.[key]
  // Неизвестная метка — ошибка сборки, а не пустое место в посте
  if (!sc) throw new Error(`blogArt: нет сцены «${name}» (src/data/blogArt/${post}.ts)`)
  return renderScene(sc, lang, o)
}

/** Заменить метки <iso-art name="…"></iso-art> в HTML поста готовыми схемами */
export const withBlogArt = (html: string, lang: Lang) => html.replace(/<iso-art name="([^"]+)"><\/iso-art>/g, (_, name: string) => blogArt(name, lang))
