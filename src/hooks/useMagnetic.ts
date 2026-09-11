import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useReducedMotion } from './useReducedMotion'

const STRENGTH = 0.35
const MAX_OFFSET = 14

export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion) return
    if (window.matchMedia('(hover: none)').matches) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - (rect.left + rect.width / 2)
      const relY = e.clientY - (rect.top + rect.height / 2)
      const x = gsap.utils.clamp(-MAX_OFFSET, MAX_OFFSET, relX * STRENGTH)
      const y = gsap.utils.clamp(-MAX_OFFSET, MAX_OFFSET, relY * STRENGTH)
      gsap.to(el, { x, y, duration: 0.4, ease: 'power3.out' })
    }

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)

    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [reducedMotion])

  return ref
}
