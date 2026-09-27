import type { ReactNode } from 'react'
import SiteNav from '@/components/site/SiteNav'
import { useT } from '@/lib/i18n'

export default function Page({ children, className = '', nav = true, alt }: { children: ReactNode; className?: string; nav?: boolean; alt?: string }) {
  const { t } = useT()
  return (
    <div className={`site ${className}`}>
      <div className="s-wrap">
        {nav && <SiteNav alt={alt} />}
        <main className="s-main">{children}</main>
        <footer className="s-foot">
          <small>© {new Date().getFullYear()} {t({ ru: 'Егор Урванов', en: 'Egor Urvanov' })}</small>
        </footer>
      </div>
    </div>
  )
}
