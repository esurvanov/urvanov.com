// Выкладка игр: дописывает в их index.html описание, canonical, разметку VideoGame и счётчики.
// Запускается в workflow после копирования игр в dist/.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { analyticsHead, headTags, esc, SITE_URL } from './lib.mjs'

// entry — страница, где на самом деле идёт игра (если index.html лишь перенаправляет)
const GAMES = [
  { dir: 'age-of-empires', title: 'Хроники Королевств — стратегия в браузере в духе Age of Empires II', description: 'Браузерная стратегия в реальном времени в духе Age of Empires II: 14 цивилизаций, строительство, добыча ресурсов и сражения. Без установки.', genre: 'Стратегия в реальном времени', entry: 'web/index.html' },
  { dir: 'berezovka', title: 'Березовка — 3D-игра в браузере: заснеженная деревня', description: '3D-игра в браузере: заснеженная русская деревня Березовка. Запускается без установки.', genre: 'Приключение' },
  { dir: 'sibiria', title: 'Сибирь — 2D-выживание в тайге, 1993', description: '2D-игра на выживание в сибирской тайге, 1993 год. Играть можно в браузере без установки.', genre: 'Выживание' },
  { dir: 'lars', title: 'Ларс — 3D-игра от первого лица: очередь на Верхнем Ларсе, 2022', description: '3D-игра от первого лица о сентябре 2022 года: живая очередь на КПП Верхний Ларс в Дарьяльском ущелье, слухи, цены, холод и выборы без правильных ответов. Играть в браузере без установки.', genre: 'Симулятор' },
]

// Теги — сразу после <head>. У некоторых игр нет <head>: тогда после <html> или <!doctype>
// (перед doctype страница ушла бы в режим совместимости), иначе в начало файла — браузер сам отнесёт их к head
// <meta charset> переносим в самое начало: браузер ищет кодировку только в первых 1024 байтах
function injectHead(html, block) {
  const charset = html.match(/<meta[^>]+charset=[^>]*>/i)
  if (charset) {
    html = html.replace(charset[0], '')
    block = `${charset[0]}\n    ${block}`
  }
  for (const re of [/<head[^>]*>/i, /<html[^>]*>/i, /^\s*<!doctype[^>]*>/i]) {
    if (re.test(html)) return html.replace(re, (m) => `${m}\n    ${block}`)
  }
  return `${block}\n${html}`
}

// Учёт игры: старт, активное время, рубежи и итог сессии. Игры — не React, поэтому автономный скрипт.
// Время считается тиками по 5 с: только пока вкладка видна и игрок что-то делал за последние 60 с.
// Без счётчиков (блокировщик) скрипт просто ничего не отправляет. Описание событий — docs/analytics.md.
function gameTracker(game) {
  return `<script>(function(){try{
var G=${JSON.stringify(game)},A=window.__ANALYTICS__||{},TICK=5000,IDLE=60000;
var MARKS=[[60,'game_play_1m'],[300,'game_play_5m'],[900,'game_play_15m'],[1800,'game_play_30m']];
var started=false,last=0,sec=0,reported=0,hit={};
function send(n,p,beacon){
  try{if(A.ym&&typeof window.ym==='function')window.ym(A.ym,'reachGoal',n,p)}catch(e){}
  try{if(A.gtag&&typeof window.gtag==='function'){var q={};for(var k in p)q[k]=p[k];if(beacon)q.transport_type='beacon';window.gtag('event',n,q)}}catch(e){}
}
function bucket(s){var m=s/60;return m<1?'0-1':m<5?'1-5':m<15?'5-15':m<30?'15-30':'30+'}
function touch(){last=Date.now();if(!started){started=true;send('game_start',{game:G})}}
function activity(){if(started)last=Date.now()}
['pointerdown','keydown','touchstart'].forEach(function(t){window.addEventListener(t,touch,{capture:true,passive:true})});
['pointermove','wheel'].forEach(function(t){window.addEventListener(t,activity,{capture:true,passive:true})});
setInterval(function(){
  if(!started||document.visibilityState!=='visible'||Date.now()-last>IDLE)return;
  sec+=TICK/1000;
  for(var i=0;i<MARKS.length;i++)if(sec>=MARKS[i][0]&&!hit[MARKS[i][1]]){hit[MARKS[i][1]]=1;send(MARKS[i][1],{game:G})}
},TICK);
function end(){
  if(sec<=reported)return;
  var d=sec-reported;reported=sec;
  send('game_session_end',{game:G,seconds:d,total_seconds:sec,minutes_bucket:bucket(sec)},true);
  try{if(A.ym&&typeof window.ym==='function'){var gs={};gs[G]=d;window.ym(A.ym,'params',{game_seconds:gs})}}catch(e){}
}
document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')end()});
window.addEventListener('pagehide',end);
}catch(e){}})();</script>`
}

for (const g of GAMES) {
  const redirectFile = `dist/${g.dir}/index.html`
  if (!existsSync(redirectFile)) { console.warn(`нет ${redirectFile}`); continue }
  // У игр с entry index.html — только meta-refresh редирект без контента: описание, canonical
  // и разметка должны стоять на реальной посадочной странице, куда попадает бот (см. entry)
  const path = g.entry ? `/${g.dir}/${g.entry.replace(/index\.html$/, '')}` : `/${g.dir}/`
  const landingFile = g.entry ? `dist/${g.dir}/${g.entry}` : redirectFile
  if (g.entry && !existsSync(landingFile)) { console.warn(`нет ${landingFile}`); continue }

  const head = headTags({
    title: g.title, description: g.description, path,
    jsonLd: [
      { '@type': 'VideoGame', name: g.title.split(' — ')[0], description: g.description, url: SITE_URL + path, genre: g.genre, inLanguage: 'ru', applicationCategory: 'Game', operatingSystem: 'Web browser', playMode: 'SinglePlayer', author: { '@type': 'Person', name: 'Егор Урванов', url: SITE_URL }, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL + '/' },
        { '@type': 'ListItem', position: 2, name: 'Игры', item: SITE_URL + '/materials/games/' },
        { '@type': 'ListItem', position: 3, name: g.title.split(' — ')[0], item: SITE_URL + path } ] },
    ],
  })
  const fallback = `<noscript><h1>${esc(g.title)}</h1><p>${esc(g.description)}</p><p><a href="/materials/games/">Все игры</a> · <a href="/">Егор Урванов</a></p></noscript>`

  // Посадочная страница (сама игра, либо index.html, если редиректа нет): полная разметка + трекер + fallback
  let landingHtml = readFileSync(landingFile, 'utf8')
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta[^>]+name=["']description["'][^>]*>/gi, '')
    .replace(/<link[^>]+rel=["']canonical["'][^>]*>/gi, '')
  landingHtml = injectHead(landingHtml, `${head}\n    ${analyticsHead()}\n    ${gameTracker(g.dir)}`)
  landingHtml = /<\/body>/i.test(landingHtml) ? landingHtml.replace(/<\/body>/i, `${fallback}\n</body>`) : `${landingHtml}\n${fallback}\n`
  writeFileSync(landingFile, landingHtml)
  console.log(`patched ${landingFile}`)

  // Отдельная страница-редирект (meta refresh на посадочную): только canonical на неё + счётчики,
  // без дублирования title/description/JSON-LD (иначе canonical «на себя» противоречит редиректу)
  if (g.entry) {
    const redirectHtml = injectHead(
      readFileSync(redirectFile, 'utf8').replace(/<link[^>]+rel=["']canonical["'][^>]*>/gi, ''),
      `<link rel="canonical" href="${SITE_URL}${path}" />\n    ${analyticsHead()}`,
    )
    writeFileSync(redirectFile, redirectHtml)
    console.log(`patched ${redirectFile} (redirect → ${path})`)
  }
}

// Честный lastmod игр в sitemap.xml: дата последнего коммита в их отдельном репозитории
// (главный prerender.mjs здесь ставит дату сборки — у него нет доступа к games/, он собирается раньше)
const sitemapFile = 'dist/sitemap.xml'
if (existsSync(sitemapFile) && existsSync('games')) {
  let sitemap = readFileSync(sitemapFile, 'utf8')
  for (const g of GAMES) {
    let date = null
    try {
      date = execSync(`git -C games log -1 --format=%cI -- ${g.dir}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim().slice(0, 10) || null
    } catch { /* нет git-истории игр — оставляем дату сборки */ }
    if (!date) continue
    const path = g.entry ? `/${g.dir}/${g.entry.replace(/index\.html$/, '')}` : `/${g.dir}/`
    const loc = (SITE_URL + path).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    sitemap = sitemap.replace(new RegExp(`(<url><loc>${loc}</loc><lastmod>)[^<]+(</lastmod>)`), `$1${date}$2`)
  }
  writeFileSync(sitemapFile, sitemap)
  console.log('sitemap.xml: даты игр обновлены из games/.git')
}
