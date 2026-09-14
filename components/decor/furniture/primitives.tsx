'use client'

// Petits blocs de construction partagés par tous les meubles procéduraux du
// décorateur 3D. Chaque meuble est composé uniquement de primitives
// géométriques (boîtes arrondies, cylindres) — aucun modèle 3D externe requis.

import { RoundedBox } from '@react-three/drei'

export const WOOD_DARK = '#2b2016'
export const METAL = '#3a3a3a'

export function Legs({
  width,
  depth,
  height,
  color = WOOD_DARK,
  inset = 0.05,
  radius = 0.025,
}: {
  width: number
  depth: number
  height: number
  color?: string
  inset?: number
  radius?: number
}) {
  const x = width / 2 - inset
  const z = depth / 2 - inset
  const positions: [number, number][] = [
    [x, z],
    [-x, z],
    [x, -z],
    [-x, -z],
  ]
  return (
    <group>
      {positions.map(([px, pz], i) => (
        <mesh key={i} position={[px, height / 2, pz]} castShadow receiveShadow>
          <cylinderGeometry args={[radius, radius * 0.85, height, 12]} />
          <meshStandardMaterial color={color} roughness={0.5} metalness={0.15} />
        </mesh>
      ))}
    </group>
  )
}

export function Block({
  size,
  position,
  color,
  radius = 0.04,
  roughness = 0.75,
  metalness = 0.05,
}: {
  size: [number, number, number]
  position: [number, number, number]
  color: string
  radius?: number
  roughness?: number
  metalness?: number
}) {
  return (
    <RoundedBox args={size} radius={radius} smoothness={2} position={position} castShadow receiveShadow>
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </RoundedBox>
  )
}
