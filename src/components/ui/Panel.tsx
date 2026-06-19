import { cn } from '../../lib/cn'
import type { HTMLAttributes } from 'react'

type PanelProps = HTMLAttributes<HTMLDivElement> & {
  glow?: boolean
}

export function Panel({ className, glow = false, children, ...props }: PanelProps) {
  return (
    <div
      className={cn(
        'rounded-[14px] border border-border bg-surface backdrop-blur-sm',
        glow && 'shadow-[0_0_60px_-12px_rgba(255,255,255,0.08)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
