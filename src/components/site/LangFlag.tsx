import type { ReactElement } from 'react'
import type { Lang } from '@/lib/i18n'

// Флаги языков в переключателе. Рисуем сами (SVG 3:2), а не эмодзи: на Windows эмодзи-флаги показываются буквами.
// Английский — флаг Великобритании, остальные — страны языка.
const W = 18, H = 12

function Stripes({ colors, vertical = false, weights }: { colors: string[]; vertical?: boolean; weights?: number[] }) {
  const ws = weights ?? colors.map(() => 1)
  const sum = ws.reduce((a, b) => a + b, 0)
  let at = 0
  return (
    <>
      {colors.map((c, i) => {
        const size = (ws[i] / sum) * (vertical ? W : H)
        const r = vertical ? <rect key={i} x={at} y={0} width={size} height={H} fill={c} /> : <rect key={i} x={0} y={at} width={W} height={size} fill={c} />
        at += size
        return r
      })}
    </>
  )
}

const FLAGS: Record<Lang, () => ReactElement> = {
  en: () => (
    <>
      <rect width={W} height={H} fill="#012169" />
      <path d="M0 0L18 12M18 0L0 12" stroke="#fff" strokeWidth={2.4} />
      <path d="M0 0L18 12M18 0L0 12" stroke="#C8102E" strokeWidth={0.9} />
      <path d="M9 0V12M0 6H18" stroke="#fff" strokeWidth={4} />
      <path d="M9 0V12M0 6H18" stroke="#C8102E" strokeWidth={2.4} />
    </>
  ),
  ru: () => <Stripes colors={['#fff', '#0039A6', '#D52B1E']} />,
  th: () => <Stripes colors={['#A51931', '#F4F5F8', '#2D2A4A', '#F4F5F8', '#A51931']} weights={[1, 1, 2, 1, 1]} />,
  ka: () => (
    <>
      <rect width={W} height={H} fill="#fff" />
      <path d="M9 0V12M0 6H18" stroke="#FF0000" strokeWidth={2} />
      {[[4.5, 3], [13.5, 3], [4.5, 9], [13.5, 9]].map(([x, y]) => (
        <path key={`${x}-${y}`} d={`M${x} ${y - 1.4}V${y + 1.4}M${x - 1.4} ${y}H${x + 1.4}`} stroke="#FF0000" strokeWidth={0.9} />
      ))}
    </>
  ),
  vi: () => (
    <>
      <rect width={W} height={H} fill="#DA251D" />
      <path d="M9 2.6l.95 2.93h3.08l-2.49 1.81.95 2.93L9 8.46l-2.49 1.81.95-2.93-2.49-1.81h3.08z" fill="#FFFF00" />
    </>
  ),
  es: () => <Stripes colors={['#AA151B', '#F1BF00', '#AA151B']} weights={[1, 2, 1]} />,
  fr: () => <Stripes colors={['#002395', '#fff', '#ED2939']} vertical />,
}

export default function LangFlag({ lang }: { lang: Lang }) {
  const F = FLAGS[lang]
  return (
    <svg className="s-flag" viewBox={`0 0 ${W} ${H}`} width={W} height={H} aria-hidden="true" focusable="false">
      <F />
    </svg>
  )
}
