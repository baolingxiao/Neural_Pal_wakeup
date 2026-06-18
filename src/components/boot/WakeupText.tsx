import { motion } from 'motion/react'
import { cn } from '../../lib/cn'
import { fadeTransition } from '../../motion/springs'

type WakeupTextProps = {
  visible: boolean
  name?: string
  className?: string
}

export function WakeupText({
  visible,
  name = 'Jin',
  className,
}: WakeupTextProps) {
  return (
    <motion.div
      className={cn(
        'pointer-events-none absolute inset-x-0 top-[58%] z-20 flex justify-center',
        className,
      )}
      initial={{ opacity: 0, y: 12 }}
      animate={
        visible
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 12 }
      }
      transition={fadeTransition}
    >
      <p className="text-center text-4xl font-light tracking-tight text-foreground md:text-5xl">
        Hello, {name}.
      </p>
    </motion.div>
  )
}
