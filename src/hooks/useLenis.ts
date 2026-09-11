import { useEffect } from 'react'
import Lenis from 'lenis'
import { ensureGsap } from '../lib/gsap'
import { useReducedMotion } from './useReducedMotion'

export function useLenis() {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const { gsap, ScrollTrigger } = ensureGsap()

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    })

    document.documentElement.classList.add('has-lenis')

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      document.documentElement.classList.remove('has-lenis')
    }
  }, [reducedMotion])
}
