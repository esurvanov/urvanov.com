// Посадочные страницы игр: текст, который видит поисковик (сама игра — холст, его не прочитать).
// Содержимое страниц лежит в репозитории игр: <игра>/docs/page/page.json. Сборка забирает его (scripts/pull-game-pages.mjs) в games.generated.json.
// Правки текста — в репозитории игры, не здесь. Сама игра живёт на отдельном адресе (play) и открывается кнопкой «Играть».
import type { L } from '@/lib/i18n'

export interface GameShot { file: string; w?: number; h?: number; alt: L<string> }
export interface GamePage {
  slug: string
  play: string                       // адрес самой игры (как в GAMES из seo.ts)
  repoDir: string                    // папка в github.com/esurvanov/awesome-games
  name: L<string>
  tagline: L<string>
  genre: L<string>
  // <meta description> и сниппет: 140–160 символов
  description: L<string>
  intro: L<string[]>
  features: L<string[]>
  controls: L<[string, string][]>
  facts: L<[string, string][]>
  faq: L<[string, string][]>
  shots: GameShot[]
  related: string[]
  keywords: L<string[]>
  // статья об архитектуре в блоге (из <игра>/docs/architecture/post.json); путь — папка статьи в репозитории игр
  architecture?: { slug: string; path: string }
}

import raw from './games.generated.json'

// порядок на сайте; игра, которой тут нет, встаёт в конец
const ORDER = ['chronicles-of-kingdoms', 'berezovka', 'sibiria', 'echo-of-the-rift', 'northern-rift', 'skhodka', 'zhitie']
const rank = (slug: string) => { const i = ORDER.indexOf(slug); return i < 0 ? ORDER.length : i }
export const GAME_PAGES: GamePage[] = [...(raw as unknown as GamePage[])].sort((a, b) => rank(a.slug) - rank(b.slug))

export const gamePage = (slug: string) => GAME_PAGES.find((g) => g.slug === slug)
export const gamePageByPlay = (play: string) => GAME_PAGES.find((g) => g.play === play)
