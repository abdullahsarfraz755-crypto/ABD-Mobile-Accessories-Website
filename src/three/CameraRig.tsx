import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { ensureGsap } from '../lib/gsap'

interface CameraRigProps {
  sectionEl: HTMLElement | null
  reducedMotion: boolean
}

export function CameraRig({ sectionEl, reducedMotion }: CameraRigProps) {
  const { camera } = useThree()

  useEffect(() => {
    if (!sectionEl || reducedMotion) return
    const { gsap, ScrollTrigger } = ensureGsap()

    const ctx = gsap.context(() => {
      gsap.set(camera.position, { x: 0, y: 0.4, z: 6.2 })

      gsap.to(camera.position, {
        z: 4.6,
        y: -0.1,
        x: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
    })

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionEl) st.kill()
      })
    }
  }, [camera, sectionEl, reducedMotion])

  return null
}
