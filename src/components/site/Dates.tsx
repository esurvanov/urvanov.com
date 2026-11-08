import { ICONS } from '@/components/site/icons'
import { LOCALES, ui, type Lang } from '@/lib/i18n'

// Даты создания и обновления — один компонент для статей блога и терминов глоссария:
// две плашки со значками, обе видны всегда. Без даты обновления компонент не собрать (оба поля обязательны).
const shortDate = (iso: string, lang: Lang) =>
  new Date(iso).toLocaleDateString(LOCALES[lang], { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).replace(' г.', '')

export default function Dates({ created, updated, lang, schema = false }: { created: string; updated: string; lang: Lang; schema?: boolean }) {
  const ru = lang === 'ru'
  return (
    <ul className="s-gdates">
      <li className="s-gdate" title={ru ? 'Дата создания' : ui(lang, 'Created')}>{ICONS.created}<time dateTime={created} itemProp={schema ? 'datePublished' : undefined}>{shortDate(created, lang)}</time></li>
      <li className="s-gdate" title={ru ? 'Дата обновления' : ui(lang, 'Updated')}>{ICONS.updated}<time dateTime={updated} itemProp={schema ? 'dateModified' : undefined}>{shortDate(updated, lang)}</time></li>
    </ul>
  )
}
