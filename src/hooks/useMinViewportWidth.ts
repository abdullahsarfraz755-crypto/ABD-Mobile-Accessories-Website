import { useEffect, useState } from 'react'

/**
 * Gates heavy WebGL scenes off small/narrow viewports. Below this width the
 * scenes fall back to a static poster — deliberate for battery/performance
 * on phones, and a safety net given how easily WebGL context/GPU quirks on
 * small devices can silently produce a blank canvas.
 */
export function useMinViewportWidth(threshold = 560): boolean {
  const [ok, setOk] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= threshold : true,
  )

  useEffect(() => {
    const handler = () => setOk(window.innerWidth >= threshold)
    handler()
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [threshold])

  return ok
}
