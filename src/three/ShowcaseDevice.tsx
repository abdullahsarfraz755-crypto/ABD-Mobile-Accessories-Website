import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, useTexture } from '@react-three/drei'
import { Color, SRGBColorSpace, type Group, type DirectionalLight } from 'three'

interface ShowcaseDeviceProps {
  progressRef: React.MutableRefObject<{ value: number }>
  reducedMotion: boolean
}

const COLOR_STAGES = ['#0b63f6', '#4f8dff', '#a3e635'].map((c) => new Color(c))

/** One real back-sheet design, used as the texture on the phone's back panel. */
const BACK_SHEET_TEXTURE_PATH = '/assets/products/back-sheet/design-2-map-color.jpg'

export function ShowcaseDevice({ progressRef, reducedMotion }: ShowcaseDeviceProps) {
  const groupRef = useRef<Group>(null)
  const keyLightRef = useRef<DirectionalLight>(null)
  const tmpColor = useRef(new Color())
  const sheetTexture = useTexture(BACK_SHEET_TEXTURE_PATH)
  sheetTexture.colorSpace = SRGBColorSpace

  useFrame(() => {
    const p = reducedMotion ? 0 : progressRef.current.value
    if (groupRef.current) {
      // Sweep front -> 3/4 back view (never a full spin) so the design on
      // the back panel comes into view without the device ever going
      // edge-on and visually "disappearing".
      groupRef.current.rotation.y = Math.PI * 0.15 + p * Math.PI * 0.85
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
      <ambientLight intensity={0.75} />
      <directionalLight ref={keyLightRef} position={[3, 3, 4]} intensity={1.4} />
      <pointLight position={[-4, -1, -2]} intensity={0.4} color="#a3e635" />

      <group ref={groupRef} position={[0, 0, 0]}>
        <RoundedBox args={[1.9, 3.85, 0.2]} radius={0.17} smoothness={4}>
          <meshPhysicalMaterial
            color="#eef3fb"
            metalness={0.15}
            roughness={0.3}
            clearcoat={0.8}
            clearcoatRoughness={0.15}
          />
        </RoundedBox>

        {/* Front screen */}
        <mesh position={[0, 0.06, 0.105]}>
          <planeGeometry args={[1.62, 3.36]} />
          <meshPhysicalMaterial
            color="#0b1f3a"
            emissive="#0b63f6"
            emissiveIntensity={0.22}
            metalness={0.2}
            roughness={0.35}
          />
        </mesh>

        {/* Back panel — real design applied as a texture */}
        <mesh position={[0, 0, -0.105]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.7, 3.5]} />
          <meshStandardMaterial map={sheetTexture} roughness={0.4} metalness={0.05} />
        </mesh>

        {/* Camera detail on the back */}
        <mesh position={[-0.55, 1.35, -0.108]}>
          <boxGeometry args={[0.55, 0.55, 0.02]} />
          <meshStandardMaterial color="#0b1f3a" metalness={0.5} roughness={0.4} />
        </mesh>
      </group>

      {/* Static studio floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]}>
        <circleGeometry args={[7, 48]} />
        <meshStandardMaterial color="#eef3fb" metalness={0.1} roughness={0.9} />
      </mesh>
    </>
  )
}
