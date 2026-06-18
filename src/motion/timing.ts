/** Cinematic easing — Apple-quality deceleration */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const

/** Master timeline (seconds) */
export const TIMELINE = {
  waveBreathingEnd: 1.2,
  morphEnd: 3.8,
  circleBreathingEnd: 4.8,
  textEnd: 5.8,
  interfaceEnd: 7.0,
} as const

export const DURATIONS = {
  morph: TIMELINE.morphEnd - TIMELINE.waveBreathingEnd,
  textFade: TIMELINE.textEnd - TIMELINE.circleBreathingEnd,
  interfaceReveal: TIMELINE.interfaceEnd - TIMELINE.textEnd,
  breatheCycle: 2.4,
} as const

export type WakeupPhase =
  | 'wave-breathing'
  | 'morphing'
  | 'circle-breathing'
  | 'text'
  | 'interface'

export function phaseAtTime(elapsed: number): WakeupPhase {
  if (elapsed < TIMELINE.waveBreathingEnd) return 'wave-breathing'
  if (elapsed < TIMELINE.morphEnd) return 'morphing'
  if (elapsed < TIMELINE.circleBreathingEnd) return 'circle-breathing'
  if (elapsed < TIMELINE.textEnd) return 'text'
  return 'interface'
}
