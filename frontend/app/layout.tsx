import type { ReactNode } from 'react'

// Minimal passthrough — each route group ((site) and (payload)) provides its own html/body
export default function RootLayout({ children }: { children: ReactNode }): ReactNode {
  return children
}
