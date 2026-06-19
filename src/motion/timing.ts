/** Cinematic easing — Apple-quality deceleration */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const

/** Master timeline (seconds) */
export const TIMELINE = {
  roseEnd: 4.8,
  textEnd: 5.8,
  interfaceEnd: 7.0,
} as const

export const DURATIONS = {
  textFade: TIMELINE.textEnd - TIMELINE.roseEnd,
  interfaceReveal: TIMELINE.interfaceEnd - TIMELINE.textEnd,
} as const

export type WakeupPhase = 'rose' | 'text' | 'interface'

export function phaseAtTime(elapsed: number): WakeupPhase {
  if (elapsed < TIMELINE.roseEnd) return 'rose'
  if (elapsed < TIMELINE.textEnd) return 'text'
  return 'interface'
}
