import { readFileSync } from 'node:fs'

export const SITE_URL = 'https://www.urvanov.com'
// Pages отдаёт разделы как /путь/, поэтому канонический адрес — со слэшем
export const urlOf = (path) => SITE_URL + (path.endsWith('/') ? path : path + '/')
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const cfg = JSON.parse(readFileSync(new URL('../analytics.json', import.meta.url), 'utf8'))

// Метатеги верификации, счётчики Яндекс.Метрики и Google-тега. Пустой ID — блок не выводится.
export function analyticsHead() {
  const out = []
  if (cfg.googleVerification) out.push(`<meta name="google-site-verification" content="${esc(cfg.googleVerification)}" />`)
  if (cfg.yandexVerification) out.push(`<meta name="yandex-verification" content="${esc(cfg.yandexVerification)}" />`)
  const ids = {}
  if (cfg.yandexMetrika) ids.ym = Number(cfg.yandexMetrika)
  if (cfg.googleTag) ids.gtag = cfg.googleTag
  if (ids.ym || ids.gtag) out.push(`<script>window.__ANALYTICS__=${JSON.stringify(ids)}</script>`)
  if (ids.gtag) {
    out.push(
      `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(ids.gtag)}"></script>`,
      `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${esc(ids.gtag)}');</script>`,
    )
  }
  if (ids.ym) {
    out.push(
      `<script>(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${ids.ym},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});</script>`,
      `<noscript><div><img src="https://mc.yandex.ru/watch/${ids.ym}" style="position:absolute;left:-9999px" alt="" /></div></noscript>`,
    )
  }
  return out.join('\n    ')
}

export function headTags({ title, description, path, type = 'website', noindex = false, jsonLd, date }) {
  const url = urlOf(path)
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}" />`,
    `<meta property="og:site_name" content="Егор Урванов" />`,
    `<meta property="og:locale" content="ru_RU" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE_URL}/egor.jpg" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<link rel="alternate" type="application/rss+xml" title="Блог — Егор Урванов" href="/rss.xml" />`,
  ]
  if (type === 'article' && date) tags.push(`<meta property="article:published_time" content="${date}" />`)
  if (jsonLd) {
    tags.push(`<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': jsonLd }).replace(/</g, '\\u003c')}</script>`)
  }
  return tags.join('\n    ')
}
