import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { NeuralInterface } from './NeuralInterface'
import { RoseTwo } from './RoseTwo'
import { WakeupText } from './WakeupText'
import { EASE_OUT_EXPO, TIMELINE, phaseAtTime, type WakeupPhase } from '../../motion/timing'

type NeuralWakeupProps = {
  userName?: string
  onComplete?: () => void
  autoStart?: boolean
}

export function NeuralWakeup({
  userName = 'Jin',
  onComplete,
  autoStart = true,
}: NeuralWakeupProps) {
  const [phase, setPhase] = useState<WakeupPhase>('rose')
  const [elapsed, setElapsed] = useState(0)
  const [roseStartedAt, setRoseStartedAt] = useState<number | null>(null)
  const completeRef = useRef(false)

  useEffect(() => {
    if (!autoStart) return

    let cancelled = false
    let raf = 0
    const start = performance.now()
    setRoseStartedAt(start)

    const tick = (now: number) => {
      if (cancelled) return

      const t = (now - start) / 1000
      setElapsed(t)
      setPhase(phaseAtTime(t))

      if (t < TIMELINE.interfaceEnd) {
        raf = requestAnimationFrame(tick)
      } else if (!completeRef.current) {
        completeRef.current = true
        onComplete?.()
      }
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [autoStart, onComplete])

  const showText = phase === 'text' || phase === 'interface'
  const showInterface = phase === 'interface'
  const roseFaded = showInterface

  return (
    <div className="relative flex min-h-full flex-col items-center justify-center overflow-hidden bg-background">
      <motion.div
        className="relative flex flex-col items-center justify-center gap-5"
        animate={roseFaded ? { opacity: 0.35, scale: 0.92 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
      >
        {roseStartedAt !== null && <RoseTwo startedAt={roseStartedAt} />}
        <div className="pointer-events-none text-center">
          <p className="text-[22px] font-bold tracking-tight text-foreground">Rose Two</p>
          <p className="mt-1.5 text-[13px] uppercase tracking-[0.18em] text-muted">
            r = a cos(2θ)
          </p>
        </div>
      </motion.div>

      <WakeupText visible={showText} name={userName} />

      <NeuralInterface visible={showInterface} />

      {import.meta.env.DEV && (
        <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] text-muted/50">
          {elapsed.toFixed(1)}s · {phase}
        </div>
      )}
    </div>
  )
}
