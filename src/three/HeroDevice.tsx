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
              color="#0f2a52"
              metalness={0.55}
              roughness={0.28}
              clearcoat={1}
              clearcoatRoughness={0.15}
              reflectivity={0.5}
            />
          </RoundedBox>

          {/* Screen */}
          <mesh position={[0, 0.05, 0.082]}>
            <planeGeometry args={[1.32, 2.75]} />
            <meshPhysicalMaterial
              color="#0b1f3a"
              emissive="#0b63f6"
              emissiveIntensity={0.28}
              metalness={0.2}
              roughness={0.35}
              clearcoat={0.6}
            />
          </mesh>

          {/* Lime accent band */}
          <mesh position={[0, -0.55, 0.083]}>
            <planeGeometry args={[1.32, 0.1]} />
            <meshStandardMaterial color="#a3e635" metalness={0.4} roughness={0.35} emissive="#6ea621" emissiveIntensity={0.12} />
          </mesh>
        </group>
      </FloatWrap>

      {/* Case, floating rear-left */}
      <FloatWrap enabled={!reducedMotion} speed={0.8} amplitude={0.4} rotationAmp={0.3}>
        <group position={[-1.7, -0.6, -0.9]} rotation={[0.3, 0.6, 0.15]}>
          <RoundedBox args={[1.2, 2.3, 0.1]} radius={0.13} smoothness={4}>
            <meshPhysicalMaterial color="#ffffff" metalness={0.05} roughness={0.65} clearcoat={0.3} />
          </RoundedBox>
        </group>
      </FloatWrap>

      {/* Earbuds */}
      <FloatWrap enabled={!reducedMotion} speed={1.4} amplitude={0.5} rotationAmp={0.6}>
        <group position={[1.85, 0.75, -0.4]}>
          <mesh position={[-0.16, 0, 0]} rotation={[0, 0, 0.15]}>
            <capsuleGeometry args={[0.14, 0.22, 4, 12]} />
            <meshPhysicalMaterial color="#ffffff" metalness={0.1} roughness={0.25} clearcoat={0.8} />
          </mesh>
          <mesh position={[0.16, -0.05, 0.05]} rotation={[0, 0, -0.1]}>
            <capsuleGeometry args={[0.14, 0.22, 4, 12]} />
            <meshPhysicalMaterial color="#ffffff" metalness={0.1} roughness={0.25} clearcoat={0.8} />
          </mesh>
        </group>
      </FloatWrap>

      {/* Cable coil */}
      <FloatWrap enabled={!reducedMotion} speed={0.9} amplitude={0.3} rotationAmp={0.4}>
        <mesh position={[0.9, -1.55, -0.6]} rotation={[1.3, 0.2, 0]}>
          <torusGeometry args={[0.38, 0.045, 12, 48]} />
          <meshStandardMaterial color="#0b63f6" metalness={0.5} roughness={0.35} />
        </mesh>
      </FloatWrap>

      {/* Ambient particles */}
      <Sparkles
        count={reducedMotion ? 0 : 35}
        scale={[6, 5, 4]}
        size={1.6}
        speed={reducedMotion ? 0 : 0.25}
        opacity={0.4}
        color="#a3e635"
      />

      {/* Reflective studio floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.35, 0]}>
        <circleGeometry args={[8, 48]} />
        <MeshReflectorMaterial
          blur={[200, 60]}
          resolution={256}
          mixBlur={1}
          mixStrength={4}
          roughness={1}
          depthScale={1}
          minDepthThreshold={0.85}
          color="#eef3fb"
          metalness={0.15}
        />
      </mesh>
    </group>
  )
}
