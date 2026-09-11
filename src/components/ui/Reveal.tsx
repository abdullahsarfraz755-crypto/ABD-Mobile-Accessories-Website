import { createElement, useEffect, useRef } from 'react'
import type { ElementType, ReactNode } from 'react'
import { ensureGsap } from '../../lib/gsap'
import { EASE_OUT } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  delay?: number
  y?: number
  className?: string
  /** Stagger direct children instead of animating the wrapper as one block */
  stagger?: boolean
}

export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  y = 28,
  className,
  stagger = false,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reducedMotion) {
      gsapSetVisible(el, stagger)
      return
    }

    const { gsap, ScrollTrigger } = ensureGsap()
    const targets = stagger ? Array.from(el.children) : el

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: EASE_OUT,
          stagger: stagger ? 0.09 : 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        },
      )
    }, el)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [reducedMotion, delay, y, stagger])

  return createElement(Tag, { ref, className }, children)
}

function gsapSetVisible(el: HTMLElement, stagger: boolean) {
  if (stagger) {
    Array.from(el.children).forEach((child) => {
      ;(child as HTMLElement).style.opacity = '1'
      ;(child as HTMLElement).style.transform = 'none'
    })
  } else {
    el.style.opacity = '1'
    el.style.transform = 'none'
  }
}
