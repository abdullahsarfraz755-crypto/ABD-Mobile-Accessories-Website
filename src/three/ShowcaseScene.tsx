import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { ShowcaseDevice } from './ShowcaseDevice'
import { ShowcaseCameraRig } from './ShowcaseCameraRig'
import { SceneErrorBoundary } from './SceneErrorBoundary'
import { ScenePoster } from './ScenePoster'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useWebGLSupport } from '../hooks/useWebGLSupport'
import { useInView } from '../hooks/useInView'
import { useMinViewportWidth } from '../hooks/useMinViewportWidth'

interface ShowcaseSceneProps {
  progressRef: React.MutableRefObject<{ value: number }>
  sectionEl: HTMLElement | null
}

export function ShowcaseScene({ progressRef, sectionEl }: ShowcaseSceneProps) {
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
        frameloop={inView ? 'always' : 'never'}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault fov={36} position={[0, 0.3, 6.4]} />
          <ShowcaseCameraRig progressRef={progressRef} reducedMotion={reducedMotion} />
          <fog attach="fog" args={['#050506', 7, 14]} />
          <ShowcaseDevice progressRef={progressRef} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </SceneErrorBoundary>
  )
}
