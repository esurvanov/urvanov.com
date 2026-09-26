import type { ReactNode } from 'react'
import SiteNav from '@/components/site/SiteNav'

export default function Page({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`site ${className}`}>
      <div className="s-wrap">
        <SiteNav />
        <main className="s-main">{children}</main>
        <footer className="s-foot">
          <small>© {new Date().getFullYear()} Егор Урванов</small>
        </footer>
      </div>
    </div>
  )
}
