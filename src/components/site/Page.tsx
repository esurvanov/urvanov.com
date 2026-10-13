import { useRef, type ReactNode } from 'react'
import { useHeadingAnchors } from '@/hooks/useHeadingAnchors'
import SiteNav from '@/components/site/SiteNav'
import { useT } from '@/lib/i18n'

export default function Page({ children, className = '', nav = true, alt }: { children: ReactNode; className?: string; nav?: boolean; alt?: string }) {
  const { t } = useT()
  const main = useRef<HTMLElement>(null)
  useHeadingAnchors(main, t({ ru: 'Скопировать ссылку на раздел', en: 'Copy link to this section' }), t({ ru: 'Ссылка скопирована', en: 'Link copied' }))
  return (
    <div className={`site ${className}`}>
      <div className="s-wrap">
        {nav && <SiteNav alt={alt} />}
        <main className="s-main" ref={main}>{children}</main>
        <footer className="s-foot">
          <small>© {new Date().getFullYear()} {t({ ru: 'Егор Урванов', en: 'Egor Urvanov' })}</small>
        </footer>
      </div>
    </div>
  )
}
