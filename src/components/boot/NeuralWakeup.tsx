import { animate, motion, type AnimationPlaybackControls } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { GlowOrb } from './GlowOrb'
import { NeuralInterface } from './NeuralInterface'
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
  const [phase, setPhase] = useState<WakeupPhase>('wave-breathing')
  const [morphProgress, setMorphProgress] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const completeRef = useRef(false)

  useEffect(() => {
    if (!autoStart) return

    let cancelled = false
    let raf = 0
    let morphAnimation: AnimationPlaybackControls | null = null
    const start = performance.now()
    let morphStarted = false

    const tick = (now: number) => {
      if (cancelled) return

      const t = (now - start) / 1000
      setElapsed(t)
      setPhase(phaseAtTime(t))

      if (t >= TIMELINE.waveBreathingEnd && t < TIMELINE.morphEnd) {
        if (!morphStarted) {
          morphStarted = true
          morphAnimation = animate(0, 1, {
            duration: TIMELINE.morphEnd - TIMELINE.waveBreathingEnd,
            ease: EASE_OUT_EXPO,
            onUpdate: (v) => setMorphProgress(v),
          })
        }
      } else if (t >= TIMELINE.morphEnd) {
        setMorphProgress(1)
      }

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
      morphAnimation?.stop()
    }
  }, [autoStart, onComplete])

  const showText = phase === 'text' || phase === 'interface'
  const showInterface = phase === 'interface'
  const orbFaded = showInterface

  return (
    <div className="relative flex min-h-full flex-col items-center justify-center overflow-hidden bg-background">
      <motion.div
        className="relative flex flex-col items-center justify-center"
        animate={orbFaded ? { opacity: 0.35, scale: 0.92 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
      >
        <GlowOrb phase={phase} morphProgress={morphProgress} />
      </motion.div>

      <WakeupText visible={showText} name={userName} />

      <NeuralInterface visible={showInterface} />

      {import.meta.env.DEV && (
        <div className="pointer-events-none absolute bottom-3 left-3 text-[10px] text-muted/40">
          {elapsed.toFixed(1)}s · {phase}
        </div>
      )}
    </div>
  )
}
