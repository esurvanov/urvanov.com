import { useEffect, useState } from 'react'
import { slides } from '@/data/slides'
import { SECTION_TITLES } from '@/types/slide'
import { useSlideChannel, readInitialSlideIndex } from '@/hooks/useSlideChannel'
import Timer from './Timer'
import Progress from './Progress'
import SlideErrorBoundary from './SlideErrorBoundary'

// Страница не пререндерится (нет в data/seo.ts) и закрыта в robots.txt, но боты, которые
// не читают robots.txt и заходят по прямой ссылке, всё равно должны увидеть noindex
function useNoindex() {
  useEffect(() => {
    let meta = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
    const prev = meta?.getAttribute('content') ?? null
    if (!meta) {
      meta = Object.assign(document.createElement('meta'), { name: 'robots' })
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', 'noindex, nofollow')
    return () => {
      if (prev !== null) meta.setAttribute('content', prev)
    }
  }, [])
}

export default function PresenterView() {
  useNoindex()
  const total = slides.length
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    return readInitialSlideIndex() ?? 1
  })
  const [resetSignal, setResetSignal] = useState(0)

  const sendToChannel = useSlideChannel('presenter', (msg) => {
    if (msg.index !== currentIndex) {
      setCurrentIndex(msg.index)
    }
  })

  useEffect(() => {
    function handler(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey) return
      const goTo = (next: number) => {
        const clamped = Math.max(1, Math.min(total, next))
        if (clamped !== currentIndex) {
          setCurrentIndex(clamped)
          sendToChannel(clamped)
        }
      }
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          event.preventDefault()
          goTo(currentIndex + 1)
          break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          event.preventDefault()
          goTo(currentIndex - 1)
          break
        case 'Home':
          event.preventDefault()
          goTo(1)
          break
        case 'End':
          event.preventDefault()
          goTo(total)
          break
        case 'r':
        case 'R':
          event.preventDefault()
          setResetSignal((n) => n + 1)
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [currentIndex, total, sendToChannel])

  const currentEntry = slides[currentIndex - 1]
  const nextEntry = slides[currentIndex] ?? null

  if (!currentEntry) {
    return <div className="slide-root"><div className="slide-error-title">Нет слайда {currentIndex}</div></div>
  }

  const { Component: Current, meta } = currentEntry

  return (
    <div className="presenter-root">
      <div className="presenter-current">
        <div className="presenter-slot-label">
          Текущий · раздел {meta.section} · {SECTION_TITLES[meta.section]}
        </div>
        <div className="presenter-slot-preview">
          <MiniSlide>
            <SlideErrorBoundary slideIndex={currentIndex}>
              <Current />
            </SlideErrorBoundary>
          </MiniSlide>
        </div>
      </div>

      <div className="presenter-next">
        <div className="presenter-slot-label">Следующий</div>
        <div className="presenter-slot-preview">
          {nextEntry ? (
            <MiniSlide>
              <SlideErrorBoundary slideIndex={currentIndex + 1}>
                <nextEntry.Component />
              </SlideErrorBoundary>
            </MiniSlide>
          ) : (
            <div className="slide-container slide-muted">— Конец презентации —</div>
          )}
        </div>
      </div>

      <div className="presenter-notes">
        <strong>Заметки:</strong> {meta.notes || '—'}
      </div>

      <div className="presenter-status">
        <Timer resetSignal={resetSignal} />
        <Progress current={currentIndex} total={total} />
      </div>
    </div>
  )
}

function MiniSlide({ children }: { children: React.ReactNode }) {
  // Scale down the slide to fit preview area
  return (
    <div
      style={{
        transform: 'scale(0.5)',
        transformOrigin: 'top left',
        width: '200%',
        height: '200%',
        pointerEvents: 'none',
      }}
    >
      {children}
    </div>
  )
}
