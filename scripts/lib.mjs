import { readFileSync } from 'node:fs'

export const SITE_URL = 'https://www.urvanov.com'
// Pages отдаёт разделы как /путь/, поэтому канонический адрес — со слэшем
export const urlOf = (path) => SITE_URL + (path === '/' || path.endsWith('/') ? path : path + '/')
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Единая карточка человека — одна и та же на каждой странице (сюда её добавляет headTags),
// а не описывается заново в каждом компоненте. Факты — как в src/data/profile.ts, держать в согласии.
export const PERSON_ID = `${SITE_URL}/#person`
export const JAIORA_ORG_ID = `${SITE_URL}/jaiora/#org`

function person(lang) {
  const ru = lang !== 'en'
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: ru ? 'Егор Урванов' : 'Egor Urvanov',
    alternateName: ru ? 'Egor Urvanov' : 'Егор Урванов',
    url: `${SITE_URL}/`,
    image: { '@type': 'ImageObject', url: `${SITE_URL}/egor.jpg`, width: 320, height: 320 },
    jobTitle: 'CTO',
    description: ru
      ? 'CTO в iGaming-компании (NDA): AI-разработка, управление командами, Python, Go и экосистема Telegram. Живёт между городами Батуми, Дананг и Бангкок. Основатель сообщества Jaiora — оффлайн-нетворкинга на 10 000 человек в 11 городах.'
      : 'CTO at an iGaming company (NDA): AI development, team management, Python, Go, and the Telegram ecosystem. Lives between Batumi, Da Nang, and Bangkok. Founder of Jaiora, an offline networking community of 10,000 people across 11 cities.',
    knowsAbout: ru
      ? ['AI-разработка', 'управление командами', 'нетворкинг', 'Python', 'Go', 'экосистема Telegram']
      : ['AI development', 'team management', 'networking', 'Python', 'Go', 'the Telegram ecosystem'],
    homeLocation: ['Batumi', 'Da Nang', 'Bangkok'].map((name) => ({ '@type': 'Place', name })),
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: ru ? 'МГУ имени М. В. Ломоносова, ВМК' : 'Lomonosov Moscow State University, Faculty of CMC' },
      { '@type': 'CollegeOrUniversity', name: ru ? 'Независимый московский университет' : 'Independent University of Moscow' },
      { '@type': 'CollegeOrUniversity', name: ru ? 'Московский авиационный институт' : 'Moscow Aviation Institute (MAI)' },
    ],
    memberOf: { '@id': JAIORA_ORG_ID },
    sameAs: [
      'https://t.me/eurvanov',
      'https://www.linkedin.com/in/eurvanov/',
      'https://github.com/esurvanov/',
      'https://getmentor.dev/mentor/egor-urvanov-1077',
      'https://ru.stackoverflow.com/users/188116/eurvanov',
    ],
  }
}

const cfg = JSON.parse(readFileSync(new URL('../analytics.json', import.meta.url), 'utf8'))

// Метатеги верификации, счётчики Яндекс.Метрики и Google-тега. Пустой ID — блок не выводится.
export function analyticsHead() {
  const out = []
  // Несколько кодов через запятую: по одному на каждый адрес сайта (с www и без)
  for (const v of String(cfg.googleVerification).split(',').filter(Boolean)) out.push(`<meta name="google-site-verification" content="${esc(v.trim())}" />`)
  for (const v of String(cfg.yandexVerification).split(',').filter(Boolean)) out.push(`<meta name="yandex-verification" content="${esc(v.trim())}" />`)
  const ids = {}
  if (cfg.yandexMetrika) ids.ym = Number(cfg.yandexMetrika)
  if (cfg.googleTag) ids.gtag = cfg.googleTag
  if (ids.ym || ids.gtag) out.push(`<script>window.__ANALYTICS__=${JSON.stringify(ids)}</script>`)
  // Функции-обёртки (gtag/ym) готовы сразу — клики, переходы и первый просмотр страницы ничего не теряют
  // (это их штатная очередь: dataLayer у gtag, m[i].a у ym). Загрузку самих тяжёлых скриптов счётчиков
  // откладываем до простоя браузера, чтобы они не соревновались за сеть/поток с первой отрисовкой.
  const deferred = []
  if (ids.gtag) {
    out.push(`<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${esc(ids.gtag)}');</script>`)
    deferred.push(`(function(){var s=document.createElement("script");s.async=1;s.src="https://www.googletagmanager.com/gtag/js?id=${esc(ids.gtag)}";document.head.appendChild(s)})();`)
  }
  if (ids.ym) {
    out.push(
      `<script>(function(m,e,t,i){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date()})(window,document,"script","ym");ym(${ids.ym},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true});</script>`,
      `<noscript><div><img src="https://mc.yandex.ru/watch/${ids.ym}" style="position:absolute;left:-9999px" alt="" /></div></noscript>`,
    )
    deferred.push(`(function(){var r="https://mc.yandex.ru/metrika/tag.js";for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return}}var k=document.createElement("script"),a=document.getElementsByTagName("script")[0];k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})();`)
  }
  if (deferred.length) {
    out.push(`<script>(function(){function load(){${deferred.join('')}}if("requestIdleCallback" in window){requestIdleCallback(load,{timeout:2000})}else{setTimeout(load,1800)}})();</script>`)
  }
  return out.join('\n    ')
}

export function headTags({ title, description, path, type = 'website', noindex = false, jsonLd, date, lang = 'ru', alternates = [], canonical = true }) {
  const url = urlOf(path)
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}" />`,
    `<meta property="og:site_name" content="Егор Урванов" />`,
    `<meta property="og:locale" content="${lang === 'en' ? 'en_US' : 'ru_RU'}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:image" content="${SITE_URL}/egor.jpg" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<link rel="alternate" type="application/rss+xml" title="${lang === 'en' ? 'Blog — Egor Urvanov' : 'Блог — Егор Урванов'}" href="${lang === 'en' ? '/en/rss.xml' : '/rss.xml'}" />`,
  ]
  // canonical/og:url — не для страниц без реального адреса (404: canonical на /404/ был бы мусорным сигналом)
  if (canonical) {
    tags.splice(2, 0, `<link rel="canonical" href="${url}" />`)
    tags.push(`<meta property="og:url" content="${url}" />`)
  }
  // hreflang: все языковые версии страницы и x-default (русская)
  if (alternates.length > 1) {
    for (const a of alternates) tags.push(`<link rel="alternate" hreflang="${a.lang}" href="${urlOf(a.path)}" />`)
    const ru = alternates.find((a) => a.lang === 'ru')
    if (ru) tags.push(`<link rel="alternate" hreflang="x-default" href="${urlOf(ru.path)}" />`)
  }
  if (type === 'article' && date) tags.push(`<meta property="article:published_time" content="${date}" />`)
  // Карточка человека — одинаковая на каждой странице, добавляется сюда один раз, а не в каждом jsonLd вызывающего кода
  if (jsonLd) {
    const graph = [person(lang), ...jsonLd.filter((node) => node && node['@type'] !== 'Person')]
    tags.push(`<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`)
  }
  return tags.join('\n    ')
}
