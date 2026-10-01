// После выкладки: сообщает Яндексу (и всем поисковикам IndexNow) об адресах из живого sitemap.xml,
// чтобы робот пришёл сразу, а не ждал планового обхода. Ключ лежит в public/<ключ>.txt.
const SITE = 'https://www.urvanov.com'
const KEY = '07073cd4a99b241da20dd19204b72d1b'

const xml = await fetch(`${SITE}/sitemap.xml`).then((r) => r.text())
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (!urlList.length) throw new Error('sitemap.xml пуст — нечего отправлять')

const res = await fetch('https://yandex.com/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
})
console.log(`indexnow: ${urlList.length} адресов → HTTP ${res.status} ${await res.text()}`)
