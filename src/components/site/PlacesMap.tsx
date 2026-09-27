import { PLACES } from '@/data/places'
import { WORLD_LAT0, WORLD_LON0, WORLD_MASK, WORLD_STEP } from '@/data/worldmask'
import { useT } from '@/lib/i18n'

const W = WORLD_MASK[0].length * WORLD_STEP
const H = WORLD_MASK.length * WORLD_STEP

// Суша — один путь из точек нулевой длины с круглыми концами: лёгкий SVG без картинок и библиотек
const LAND = WORLD_MASK.flatMap((row, r) =>
  [...row].flatMap((c, i) => (c === '#' ? [`M${i * WORLD_STEP + WORLD_STEP / 2} ${r * WORLD_STEP + WORLD_STEP / 2}h0`] : [])),
).join('')

const px = (lon: number) => lon - WORLD_LON0
const py = (lat: number) => WORLD_LAT0 - lat

export default function PlacesMap({ active, onActive }: { active: number | null; onActive: (i: number | null) => void }) {
  const { t } = useT()
  return (
    <svg className="s-map" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t({ ru: 'Карта мест, где бывал Егор', en: 'Map of places Egor has been' })}>
      <path className="s-map-land" d={LAND} />
      {PLACES.map((p, i) => (
        <g key={p.name.ru} className={`s-map-pin${p.key ? ' is-key' : ''}${active === i ? ' is-active' : ''}`} onMouseEnter={() => onActive(i)} onMouseLeave={() => onActive(null)}>
          <circle className="s-map-halo" cx={px(p.lon)} cy={py(p.lat)} r={p.key ? 7 : 5} />
          <circle className="s-map-dot" cx={px(p.lon)} cy={py(p.lat)} r={p.key ? 2.6 : 1.6} />
          <title>{t(p.name)}</title>
        </g>
      ))}
      {active !== null && (
        <text className="s-map-label" x={px(PLACES[active].lon)} y={py(PLACES[active].lat) - 7} textAnchor="middle">
          {t(PLACES[active].name)}
        </text>
      )}
    </svg>
  )
}
