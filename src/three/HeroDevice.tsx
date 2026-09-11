import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox, Sparkles, MeshReflectorMaterial } from '@react-three/drei'
import type { Group } from 'three'

interface HeroDeviceProps {
  reducedMotion: boolean
}

function FloatWrap({
  enabled,
  children,
  speed = 1,
  amplitude = 0.3,
  rotationAmp = 0.15,
}: {
  enabled: boolean
  children: React.ReactNode
  speed?: number
  amplitude?: number
  rotationAmp?: number
}) {
  if (!enabled) return <group>{children}</group>
  return (
    <Float speed={speed} floatIntensity={amplitude} rotationIntensity={rotationAmp}>
      {children}
    </Float>
  )
}

export function HeroDevice({ reducedMotion }: HeroDeviceProps) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.25 + 0.15
  })

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      {/* Primary device */}
      <FloatWrap enabled={!reducedMotion} speed={1.1} amplitude={0.35} rotationAmp={0.12}>
        <group rotation={[0.06, 0.35, -0.03]}>
          <RoundedBox args={[1.55, 3.15, 0.16]} radius={0.14} smoothness={4}>
            <meshPhysicalMaterial
              color="#141417"
              metalness={0.75}
              roughness={0.22}
              clearcoat={1}
              clearcoatRoughness={0.12}
              reflectivity={0.5}
            />
          </RoundedBox>

          {/* Screen */}
          <mesh position={[0, 0.05, 0.082]}>
            <planeGeometry args={[1.32, 2.75]} />
            <meshPhysicalMaterial
              color="#0d0d10"
              emissive="#3a2f1a"
              emissiveIntensity={0.35}
              metalness={0.2}
              roughness={0.35}
              clearcoat={0.6}
            />
          </mesh>

          {/* Gold accent band */}
          <mesh position={[0, -0.55, 0.083]}>
            <planeGeometry args={[1.32, 0.1]} />
            <meshStandardMaterial color="#d9b876" metalness={0.9} roughness={0.28} emissive="#3a2f16" emissiveIntensity={0.15} />
          </mesh>
        </group>
      </FloatWrap>

      {/* Case, floating rear-left */}
      <FloatWrap enabled={!reducedMotion} speed={0.8} amplitude={0.4} rotationAmp={0.3}>
        <group position={[-1.7, -0.6, -0.9]} rotation={[0.3, 0.6, 0.15]}>
          <RoundedBox args={[1.2, 2.3, 0.1]} radius={0.13} smoothness={4}>
            <meshPhysicalMaterial color="#1c1c20" metalness={0.15} roughness={0.75} clearcoat={0.2} />
          </RoundedBox>
        </group>
      </FloatWrap>

      {/* Earbuds */}
      <FloatWrap enabled={!reducedMotion} speed={1.4} amplitude={0.5} rotationAmp={0.6}>
        <group position={[1.85, 0.75, -0.4]}>
          <mesh position={[-0.16, 0, 0]} rotation={[0, 0, 0.15]}>
            <capsuleGeometry args={[0.14, 0.22, 4, 12]} />
            <meshPhysicalMaterial color="#f5f3ee" metalness={0.1} roughness={0.3} clearcoat={0.8} />
          </mesh>
          <mesh position={[0.16, -0.05, 0.05]} rotation={[0, 0, -0.1]}>
            <capsuleGeometry args={[0.14, 0.22, 4, 12]} />
            <meshPhysicalMaterial color="#f5f3ee" metalness={0.1} roughness={0.3} clearcoat={0.8} />
          </mesh>
        </group>
      </FloatWrap>

      {/* Cable coil */}
      <FloatWrap enabled={!reducedMotion} speed={0.9} amplitude={0.3} rotationAmp={0.4}>
        <mesh position={[0.9, -1.55, -0.6]} rotation={[1.3, 0.2, 0]}>
          <torusGeometry args={[0.38, 0.045, 12, 48]} />
          <meshStandardMaterial color="#b6904f" metalness={0.6} roughness={0.4} />
        </mesh>
      </FloatWrap>

      {/* Ambient particles */}
      <Sparkles
        count={reducedMotion ? 0 : 35}
        scale={[6, 5, 4]}
        size={1.6}
        speed={reducedMotion ? 0 : 0.25}
        opacity={0.35}
        color="#d9b876"
      />

      {/* Reflective studio floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.35, 0]}>
        <circleGeometry args={[8, 48]} />
        <MeshReflectorMaterial
          blur={[200, 60]}
          resolution={256}
          mixBlur={1}
          mixStrength={12}
          roughness={1}
          depthScale={1}
          minDepthThreshold={0.85}
          color="#0a0a0c"
          metalness={0.4}
        />
      </mesh>
    </group>
  )
}
