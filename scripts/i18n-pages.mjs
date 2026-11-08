// Пишет src/i18n/pages.generated.json: для каждой страницы — новые языки, на которых она есть (только адреса, без текстов).
// Нужен браузеру, чтобы переключатель языка знал о переводах, чьи пакеты ещё не загружены (src/i18n/pageLangs.ts).
// Запускается между серверной и клиентской сборкой (npm run build) и берёт данные из серверной сборки dist-ssr.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const { allPages, NEW_LANGS } = await import(pathToFileURL(join(process.cwd(), 'dist-ssr', 'entry-server.js')).href)
const map = {}
for (const p of allPages()) {
  if (!NEW_LANGS.includes(p.lang)) continue
  const bare = p.path.replace(new RegExp(`^/${p.lang}(?=/|$)`), '') || '/'
  ;(map[bare] ??= []).push(p.lang)
}
const out = Object.fromEntries(Object.keys(map).sort().map((k) => [k, map[k].join(',')]))
writeFileSync('src/i18n/pages.generated.json', JSON.stringify(out) + '\n')
console.log(`i18n-pages: ${Object.keys(out).length} адресов с переводами`)
