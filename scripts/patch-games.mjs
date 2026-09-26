// Выкладка игр: дописывает в их index.html описание, canonical, разметку VideoGame и счётчики.
// Запускается в workflow после копирования игр в dist/.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { analyticsHead, headTags, esc, SITE_URL } from './lib.mjs'

const GAMES = [
  { dir: 'age-of-empires', title: 'Хроники Королевств — стратегия в браузере в духе Age of Empires II', description: 'Браузерная стратегия в реальном времени в духе Age of Empires II: 14 цивилизаций, строительство, добыча ресурсов и сражения. Без установки.', genre: 'Стратегия в реальном времени' },
  { dir: 'berezovka', title: 'Березовка — 3D-игра в браузере: заснеженная деревня', description: '3D-игра в браузере: заснеженная русская деревня Березовка. Запускается без установки.', genre: 'Приключение' },
  { dir: 'sibiria', title: 'Сибирь — 2D-выживание в тайге, 1993', description: '2D-игра на выживание в сибирской тайге, 1993 год. Играть можно в браузере без установки.', genre: 'Выживание' },
]

for (const g of GAMES) {
  const file = `dist/${g.dir}/index.html`
  if (!existsSync(file)) { console.warn(`нет ${file}`); continue }
  const path = `/${g.dir}/`
  let html = readFileSync(file, 'utf8')
  html = html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta[^>]+name=["']description["'][^>]*>/gi, '')
    .replace(/<link[^>]+rel=["']canonical["'][^>]*>/gi, '')
  const head = headTags({
    title: g.title, description: g.description, path,
    jsonLd: [
      { '@type': 'VideoGame', name: g.title.split(' — ')[0], description: g.description, url: SITE_URL + path, genre: g.genre, inLanguage: 'ru', applicationCategory: 'Game', operatingSystem: 'Web browser', playMode: 'SinglePlayer', author: { '@type': 'Person', name: 'Егор Урванов', url: SITE_URL }, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL + '/' },
        { '@type': 'ListItem', position: 2, name: 'Игры', item: SITE_URL + '/materials/games' },
        { '@type': 'ListItem', position: 3, name: g.title.split(' — ')[0], item: SITE_URL + path } ] },
    ],
  })
  const block = `${head}\n    ${analyticsHead()}`
  // У некоторых игр нет <head>: тогда просто ставим теги в начало файла, браузер сам отнесёт их к head
  html = /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, (m) => `${m}\n    ${block}`) : `${block}\n${html}`
  // Текст для тех, кто не выполняет скрипты (краулеры, ИИ)
  const fallback = `<noscript><h1>${esc(g.title)}</h1><p>${esc(g.description)}</p><p><a href="/materials/games">Все игры</a> · <a href="/">Егор Урванов</a></p></noscript>`
  html = /<\/body>/i.test(html) ? html.replace(/<\/body>/i, `${fallback}\n</body>`) : `${html}\n${fallback}\n`
  writeFileSync(file, html)
  console.log(`patched ${file}`)
}
