import { useEffect, useState } from 'react'

/** Tracks whether `el` is within (an expanded) viewport, for gating expensive work like a 3D render loop. */
export function useInView(el: HTMLElement | null, rootMargin = '50% 0px'): boolean {
  const [inView, setInView] = useState(true)

  useEffect(() => {
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [el, rootMargin])

  return inView
}
