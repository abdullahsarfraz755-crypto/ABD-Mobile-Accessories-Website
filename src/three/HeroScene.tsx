import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { HeroDevice } from './HeroDevice'
import { CameraRig } from './CameraRig'
import { SceneErrorBoundary } from './SceneErrorBoundary'
import { ScenePoster } from './ScenePoster'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useWebGLSupport } from '../hooks/useWebGLSupport'
import { useInView } from '../hooks/useInView'
import { useMinViewportWidth } from '../hooks/useMinViewportWidth'

interface HeroSceneProps {
  sectionEl: HTMLElement | null
}

export function HeroScene({ sectionEl }: HeroSceneProps) {
  const reducedMotion = useReducedMotion()
  const webglSupported = useWebGLSupport()
  const inView = useInView(sectionEl)
  const wideEnough = useMinViewportWidth(560)

  if (webglSupported === false || !wideEnough) {
    return <ScenePoster />
  }

  return (
    <SceneErrorBoundary fallback={<ScenePoster />}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
        frameloop={inView ? 'always' : 'never'}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault fov={38} position={[0, 0.4, 6.2]} />
          <CameraRig sectionEl={sectionEl} reducedMotion={reducedMotion} />

          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 4, 4]} intensity={1.3} color="#ffffff" />
          <pointLight position={[-4, 1, -2]} intensity={0.5} color="#0b63f6" />
          <pointLight position={[0, -1.5, 3]} intensity={0.4} color="#a3e635" />

          <fog attach="fog" args={['#ffffff', 7, 13]} />

          <HeroDevice reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </SceneErrorBoundary>
  )
}
