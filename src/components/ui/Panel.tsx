import { cn } from '../../lib/cn'
import type { HTMLAttributes } from 'react'

type PanelProps = HTMLAttributes<HTMLDivElement> & {
  glow?: boolean
}

export function Panel({ className, glow = false, children, ...props }: PanelProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-border bg-surface/80 backdrop-blur-sm',
        glow && 'shadow-[0_0_60px_-12px_rgba(255,184,108,0.25)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
