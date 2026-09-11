import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { Color, type Group, type DirectionalLight } from 'three'

interface ShowcaseDeviceProps {
  progressRef: React.MutableRefObject<{ value: number }>
  reducedMotion: boolean
}

const COLOR_STAGES = ['#f2dfa8', '#e8e6e0', '#9db4d9'].map((c) => new Color(c))

export function ShowcaseDevice({ progressRef, reducedMotion }: ShowcaseDeviceProps) {
  const groupRef = useRef<Group>(null)
  const keyLightRef = useRef<DirectionalLight>(null)
  const tmpColor = useRef(new Color())

  useFrame(() => {
    const p = reducedMotion ? 0 : progressRef.current.value
    if (groupRef.current) {
      // Sweep front -> 3/4 view only (never a full spin) so the thin edge
      // of the device never faces the camera and goes visually "invisible".
      groupRef.current.rotation.y = p * Math.PI * 0.42
      groupRef.current.rotation.x = Math.sin(p * Math.PI) * 0.08
      groupRef.current.position.y = Math.sin(p * Math.PI) * 0.15
    }
    if (keyLightRef.current) {
      const stageF = p * (COLOR_STAGES.length - 1)
      const i = Math.min(COLOR_STAGES.length - 2, Math.floor(stageF))
      const t = stageF - i
      tmpColor.current.copy(COLOR_STAGES[i]).lerp(COLOR_STAGES[i + 1], t)
      keyLightRef.current.color.copy(tmpColor.current)
    }
  })

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight ref={keyLightRef} position={[3, 3, 4]} intensity={1.6} />
      <pointLight position={[-4, -1, -2]} intensity={0.5} color="#b6904f" />

      <group ref={groupRef} position={[0, 0, 0]}>
        <RoundedBox args={[1.9, 3.85, 0.2]} radius={0.17} smoothness={4}>
          <meshPhysicalMaterial
            color="#16161a"
            metalness={0.78}
            roughness={0.18}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </RoundedBox>

        <mesh position={[0, 0.06, 0.105]}>
          <planeGeometry args={[1.62, 3.36]} />
          <meshPhysicalMaterial
            color="#0d0d10"
            emissive="#3a2f1a"
            emissiveIntensity={0.3}
            metalness={0.2}
            roughness={0.35}
          />
        </mesh>

        <mesh position={[0, -0.68, 0.106]}>
          <planeGeometry args={[1.62, 0.12]} />
          <meshStandardMaterial color="#d9b876" metalness={0.9} roughness={0.25} />
        </mesh>

        {/* Back camera detail */}
        <mesh position={[-0.55, 1.35, -0.11]}>
          <boxGeometry args={[0.55, 0.55, 0.02]} />
          <meshStandardMaterial color="#0a0a0c" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>

      {/* Static studio floor — a cheap emissive gradient plane instead of a
          second live-reflection render target, since HeroDevice already
          carries the one real-time reflector on this page. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]}>
        <circleGeometry args={[7, 48]} />
        <meshStandardMaterial color="#0a0a0c" metalness={0.2} roughness={0.9} />
      </mesh>
    </>
  )
}
