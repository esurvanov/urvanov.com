import { renderTex } from '@/lib/math'

/** Формула: KaTeX, тот же набор, что в статьях блога. display — отдельной строкой по центру */
export default function Formula({ tex, display = false }: { tex: string; display?: boolean }) {
  return display
    ? <div className="bk-math" dangerouslySetInnerHTML={{ __html: renderTex(tex, true) }} />
    : <span className="g-math" dangerouslySetInnerHTML={{ __html: renderTex(tex, false) }} />
}
