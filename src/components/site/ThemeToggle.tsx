import { useSyncExternalStore } from 'react'
import { useT } from '@/lib/i18n'

type Mode = 'light' | 'dark'
const KEY = 'urv-theme'

// Тема, которая сейчас на экране: выбранная кнопкой или системная
function currentMode(): Mode {
  const set = document.documentElement.getAttribute('data-theme')
  if (set === 'light' || set === 'dark') return set
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Подписка на смену темы: кнопкой на странице или в настройках системы
const listeners = new Set<() => void>()
function subscribe(cb: () => void) {
  listeners.add(cb)
  const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
  mq?.addEventListener('change', cb)
  return () => { listeners.delete(cb); mq?.removeEventListener('change', cb) }
}

// Кнопка светлой и тёмной темы. Выбор запоминается в браузере, до выбора работает системная тема
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { t } = useT()
  // На сервере темы нет: до гидрации рисуем луну, затем — реальное состояние
  const mode = useSyncExternalStore<Mode | null>(subscribe, currentMode, () => null)

  const toggle = () => {
    const next: Mode = currentMode() === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem(KEY, next) } catch { /* приватный режим: тема не запомнится */ }
    listeners.forEach((l) => l())
  }

  const label = t({ ru: 'Сменить тему', en: 'Toggle theme' })
  return (
    <button type="button" className={`s-nav-lang s-theme ${className}`} onClick={toggle} aria-label={label} title={label}
      data-track="cta" data-track-id="theme_toggle" data-track-label={mode === 'dark' ? 'light' : 'dark'}>
      {mode === 'dark' ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /></svg>
      )}
    </button>
  )
}
