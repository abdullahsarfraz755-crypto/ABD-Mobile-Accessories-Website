import { useEffect, useRef } from 'react'
import { ensureGsap } from '../lib/gsap'

/**
 * Tracks scroll progress (0-1) through `triggerEl` in a ref (no re-render
 * per frame) plus a discrete "stage" index for React-driven UI like captions.
 */
export function useScrollProgress(
  triggerEl: HTMLElement | null,
  stageCount: number,
  onStageChange: (stage: number) => void,
  disabled = false,
) {
  const progressRef = useRef({ value: 0 })

  useEffect(() => {
    if (!triggerEl || disabled) return
    const { ScrollTrigger } = ensureGsap()
    let lastStage = -1

    const st = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        progressRef.current.value = self.progress
        const stage = Math.min(stageCount - 1, Math.floor(self.progress * stageCount))
        if (stage !== lastStage) {
          lastStage = stage
          onStageChange(stage)
        }
      },
    })

    return () => st.kill()
  }, [triggerEl, disabled, stageCount, onStageChange])

  return progressRef
}
