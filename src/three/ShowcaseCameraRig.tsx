import { useFrame } from '@react-three/fiber'

interface ShowcaseCameraRigProps {
  progressRef: React.MutableRefObject<{ value: number }>
  reducedMotion: boolean
}

export function ShowcaseCameraRig({ progressRef, reducedMotion }: ShowcaseCameraRigProps) {
  useFrame(({ camera }) => {
    const p = reducedMotion ? 0 : progressRef.current.value
    camera.position.z = 6.4 - p * 2.6
    camera.position.x = Math.sin(p * Math.PI) * 0.9
    camera.position.y = 0.3 - p * 0.2
    camera.lookAt(0, 0, 0)
  })

  return null
}
