import { motion } from 'motion/react'
import { useMemo } from 'react'
import { cn } from '../../lib/cn'
import { CIRCLE_PATH, VIEWBOX, WAVE_COLLAPSED_PATH, WAVE_PATH } from '../../motion/paths'
import { breatheTransition } from '../../motion/springs'
import type { WakeupPhase } from '../../motion/timing'
import { useDualMorph } from '../../motion/usePathMorph'

type GlowOrbProps = {
  phase: WakeupPhase
  morphProgress: number
  className?: string
}

export function GlowOrb({ phase, morphProgress, className }: GlowOrbProps) {
  const isBreathing =
    phase === 'wave-breathing' || phase === 'circle-breathing'

  const pathD = useDualMorph(WAVE_PATH, WAVE_COLLAPSED_PATH, CIRCLE_PATH, morphProgress)

  const resolvedPath = useMemo(() => {
    if (phase === 'wave-breathing') return WAVE_PATH
    if (phase === 'circle-breathing' || phase === 'text' || phase === 'interface') {
      return CIRCLE_PATH
    }
    return pathD
  }, [phase, pathD])

  return (
    <div
      className={cn(
        'relative flex items-center justify-center',
        className,
      )}
    >
      <motion.svg
        viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
        className="h-64 w-64 md:h-80 md:w-80"
        animate={
          isBreathing
            ? {
                scale: [0.98, 1.02, 0.98],
                opacity: [0.75, 1, 0.75],
              }
            : { scale: 1, opacity: 1 }
        }
        transition={isBreathing ? breatheTransition : { duration: 0.4 }}
      >
        <defs>
          <filter id="glow-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-wide" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="16" result="wideBlur" />
            <feColorMatrix
              in="wideBlur"
              type="matrix"
              values="1 0 0 0 0  0 0.7 0 0 0  0 0 0.4 0 0  0 0 0 0.6 0"
            />
          </filter>
          <linearGradient id="stroke-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF5EB" />
            <stop offset="45%" stopColor="#FFD4A8" />
            <stop offset="100%" stopColor="#FFB86C" />
          </linearGradient>
        </defs>

        {/* Wide ambient glow */}
        <motion.path
          d={resolvedPath}
          fill="none"
          stroke="url(#stroke-gradient)"
          strokeWidth={12}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow-wide)"
          animate={
            isBreathing
              ? { opacity: [0.35, 0.55, 0.35] }
              : { opacity: 0.45 }
          }
          transition={isBreathing ? breatheTransition : { duration: 0.4 }}
        />

        {/* Core stroke */}
        <motion.path
          d={resolvedPath}
          fill="none"
          stroke="url(#stroke-gradient)"
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow-soft)"
          animate={
            isBreathing
              ? { opacity: [0.8, 1, 0.8] }
              : { opacity: 1 }
          }
          transition={isBreathing ? breatheTransition : { duration: 0.4 }}
        />
      </motion.svg>
    </div>
  )
}
