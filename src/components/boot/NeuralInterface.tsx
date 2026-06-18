import { motion } from 'motion/react'
import { cn } from '../../lib/cn'
import { Panel } from '../ui/Panel'
import { revealTransition } from '../../motion/springs'

type NeuralInterfaceProps = {
  visible: boolean
  className?: string
}

export function NeuralInterface({ visible, className }: NeuralInterfaceProps) {
  return (
    <motion.div
      className={cn('absolute inset-0 z-30 flex items-end justify-center pb-16 md:pb-24', className)}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={revealTransition}
    >
      <Panel glow className="mx-6 w-full max-w-md p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-medium tracking-tight text-foreground">
              Neural Pal
            </h1>
            <p className="mt-0.5 text-sm text-muted">Ready</p>
          </div>
          <StatusOrb />
        </div>

        <label className="sr-only" htmlFor="neural-input">
          Message Neural Pal
        </label>
        <div className="relative">
          <input
            id="neural-input"
            type="text"
            placeholder="Ask anything…"
            className={cn(
              'w-full rounded-2xl border border-border bg-background/60 px-4 py-3.5',
              'text-sm text-foreground placeholder:text-muted/70',
              'outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(255,212,168,0.35)]',
            )}
          />
        </div>
      </Panel>
    </motion.div>
  )
}

function StatusOrb() {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center">
      <motion.span
        className="absolute inset-0 rounded-full bg-glow/30 blur-md"
        animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
      />
      <span className="relative h-3 w-3 rounded-full bg-gradient-to-br from-glow-core to-glow-warm shadow-[0_0_12px_rgba(255,184,108,0.6)]" />
    </div>
  )
}
