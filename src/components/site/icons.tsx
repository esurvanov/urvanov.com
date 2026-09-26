import type { ReactNode } from 'react'

// Однотонные линейные значки (stroke = currentColor), сетка 24×24
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export const ICONS = {
  jaiora: (
    <Icon>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
    </Icon>
  ),
  patterns: (
    <Icon>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19a2 2 0 0 1 2-2h13M9 7h6" />
    </Icon>
  ),
  talk: (
    <Icon>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 21l4-5 4 5" />
    </Icon>
  ),
  game: (
    <Icon>
      <path d="M6 8h12a4 4 0 0 1 4 4v3a3 3 0 0 1-5.2 2L15 15H9l-1.8 2A3 3 0 0 1 2 15v-3a4 4 0 0 1 4-4zM7 11v3M5.5 12.5h3M16 11.5h.01M18 13.5h.01" />
    </Icon>
  ),
  taiga: (
    <Icon>
      <path d="M12 3l4 6h-2.5l3.5 5h-3l3 5H7l3-5H7l3.5-5H8zM12 19v3" />
    </Icon>
  ),
}
