import { useEffect, useRef } from 'react'
import { cn } from '../../lib/cn'
import {
  ROSE_TWO_CONFIG,
  getRoseFrame,
  type RoseTwoConfig,
} from '../../motion/roseTwo'

type RoseTwoProps = {
  className?: string
  config?: RoseTwoConfig
  /** Epoch ms — defaults to mount time */
  startedAt?: number
}

const PARTICLE_INDICES = Array.from(
  { length: ROSE_TWO_CONFIG.particleCount },
  (_, index) => index,
)

export function RoseTwo({ className, config = ROSE_TWO_CONFIG, startedAt }: RoseTwoProps) {
  const groupRef = useRef<SVGGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const particleRefs = useRef<(SVGCircleElement | null)[]>([])
  const startRef = useRef(startedAt ?? performance.now())

  useEffect(() => {
    if (startedAt !== undefined) {
      startRef.current = startedAt
    }
  }, [startedAt])

  useEffect(() => {
    let raf = 0

    const render = (now: number) => {
      const time = now - startRef.current
      const frame = getRoseFrame(time, config)

      groupRef.current?.setAttribute(
        'transform',
        `rotate(${frame.rotation} ${config.center} ${config.center})`,
      )
      pathRef.current?.setAttribute('d', frame.path)

      frame.particles.forEach((particle, index) => {
        const node = particleRefs.current[index]
        if (!node) return
        node.setAttribute('cx', particle.x.toFixed(2))
        node.setAttribute('cy', particle.y.toFixed(2))
        node.setAttribute('r', particle.radius.toFixed(2))
        node.setAttribute('opacity', particle.opacity.toFixed(3))
      })

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)
    return () => cancelAnimationFrame(raf)
  }, [config])

  return (
    <div
      className={cn(
        'grid aspect-square w-[min(72vmin,420px)] place-items-center text-foreground',
        className,
      )}
    >
      <svg viewBox="0 0 100 100" fill="none" aria-hidden className="h-full w-full overflow-visible">
        <g ref={groupRef}>
          <path
            ref={pathRef}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={config.strokeWidth}
            opacity={0.1}
          />
          {PARTICLE_INDICES.map((index) => (
            <circle
              key={index}
              ref={(node) => {
                particleRefs.current[index] = node
              }}
              fill="currentColor"
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
