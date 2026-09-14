'use client'

// Bibliothèque de mobilier procédural pour le décorateur 3D AKWABA.
// Chaque composant prend uniquement `{ color }` et se positionne lui-même
// à partir du sol (y = 0), centré sur son empreinte au sol (voir
// `furnitureCatalog` dans lib/decor.ts pour les dimensions). Aucune
// ressource externe (glTF, texture) n'est chargée : tout est généré avec
// des primitives Three.js, ce qui garde la scène légère et sans dépendance
// réseau ou de licence.

import type { FurnitureType } from '@/lib/decor'
import { Block, Legs, METAL, WOOD_DARK } from './primitives'

const CREAM = '#f5f1e8'

export function Fauteuil({ color }: { color: string }) {
  return (
    <group>
      <Legs width={0.6} depth={0.65} height={0.12} />
      <Block size={[0.68, 0.18, 0.6]} position={[0, 0.21, 0]} color={color} />
      <Block size={[0.68, 0.52, 0.14]} position={[0, 0.43, -0.23]} color={color} />
      <Block size={[0.14, 0.32, 0.6]} position={[0.27, 0.28, 0]} color={color} />
      <Block size={[0.14, 0.32, 0.6]} position={[-0.27, 0.28, 0]} color={color} />
    </group>
  )
}

export function Canape({ color }: { color: string }) {
  return (
    <group>
      <Legs width={1.9} depth={0.8} height={0.12} />
      <Block size={[1.9, 0.2, 0.75]} position={[0, 0.22, 0]} color={color} />
      <Block size={[1.9, 0.5, 0.16]} position={[0, 0.45, -0.3]} color={color} />
      <Block size={[0.16, 0.35, 0.75]} position={[0.87, 0.29, 0]} color={color} />
      <Block size={[0.16, 0.35, 0.75]} position={[-0.87, 0.29, 0]} color={color} />
    </group>
  )
}

export function TableBasse({ color }: { color: string }) {
  return (
    <group>
      <Legs width={1.0} depth={0.45} height={0.35} radius={0.02} />
      <Block size={[1.1, 0.06, 0.55]} position={[0, 0.38, 0]} color={color} radius={0.02} roughness={0.35} metalness={0.1} />
    </group>
  )
}

export function TableManger({ color }: { color: string }) {
  return (
    <group>
      <Legs width={1.5} depth={0.8} height={0.42} radius={0.03} />
      <Block size={[1.6, 0.06, 0.9]} position={[0, 0.45, 0]} color={color} radius={0.02} roughness={0.35} metalness={0.1} />
    </group>
  )
}

export function Chaise({ color }: { color: string }) {
  return (
    <group>
      <Legs width={0.38} depth={0.4} height={0.45} radius={0.018} />
      <Block size={[0.42, 0.05, 0.42]} position={[0, 0.475, 0]} color={color} />
      <Block size={[0.42, 0.45, 0.05]} position={[0, 0.7, -0.185]} color={color} />
    </group>
  )
}

export function Lit({ color }: { color: string }) {
  return (
    <group>
      <Block size={[1.6, 0.3, 2.0]} position={[0, 0.15, 0]} color={WOOD_DARK} roughness={0.6} />
      <Block size={[1.5, 0.22, 1.9]} position={[0, 0.41, 0]} color={CREAM} roughness={0.9} />
      <Block size={[0.6, 0.12, 0.35]} position={[0.4, 0.58, -0.7]} color="#ffffff" roughness={0.9} />
      <Block size={[0.6, 0.12, 0.35]} position={[-0.4, 0.58, -0.7]} color="#ffffff" roughness={0.9} />
      <Block size={[1.6, 0.7, 0.12]} position={[0, 0.5, -1.02]} color={color} />
    </group>
  )
}

export function Armoire({ color }: { color: string }) {
  return (
    <group>
      <Block size={[1.2, 0.08, 0.6]} position={[0, 0.04, 0]} color={WOOD_DARK} />
      <Block size={[1.2, 1.85, 0.6]} position={[0, 0.98, 0]} color={color} />
      <Block size={[0.03, 1.7, 0.03]} position={[0, 0.98, 0.3]} color={WOOD_DARK} roughness={0.4} metalness={0.3} />
    </group>
  )
}

export function Bureau({ color }: { color: string }) {
  return (
    <group>
      <Legs width={1.1} depth={0.5} height={0.72} radius={0.025} />
      <Block size={[1.2, 0.05, 0.6]} position={[0, 0.745, 0]} color={color} roughness={0.4} metalness={0.1} />
      <Block size={[0.36, 0.4, 0.55]} position={[0.4, 0.52, 0]} color={WOOD_DARK} />
    </group>
  )
}

export function Bibliotheque({ color }: { color: string }) {
  const bookColors = ['#b3261e', '#8a9a7e', '#c99a4b', '#2c3e50', '#6b4a33']
  return (
    <group>
      <Block size={[0.9, 1.8, 0.35]} position={[0, 0.9, 0]} color={color} />
      {[0.45, 0.9, 1.35].map((y, i) => (
        <Block key={i} size={[0.82, 0.03, 0.3]} position={[0, y, 0]} color={WOOD_DARK} />
      ))}
      {bookColors.map((c, i) => (
        <Block
          key={c}
          size={[0.1, 0.28, 0.2]}
          position={[-0.32 + i * 0.16, 1.06, 0.02]}
          color={c}
          radius={0.01}
          roughness={0.8}
        />
      ))}
    </group>
  )
}

export function MeubleTv({ color }: { color: string }) {
  return (
    <group>
      <Block size={[1.4, 0.08, 0.4]} position={[0, 0.04, 0]} color={WOOD_DARK} />
      <Block size={[1.4, 0.4, 0.38]} position={[0, 0.28, 0]} color={color} />
    </group>
  )
}

export function Television({ color }: { color: string }) {
  return (
    <group>
      <Block size={[0.32, 0.03, 0.16]} position={[0, 0.015, 0]} color={METAL} roughness={0.4} metalness={0.4} />
      <mesh position={[0, 0.11, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.16, 10]} />
        <meshStandardMaterial color={METAL} roughness={0.4} metalness={0.5} />
      </mesh>
      <Block size={[1.05, 0.6, 0.04]} position={[0, 0.49, 0]} color={color} roughness={0.3} metalness={0.2} />
      <Block size={[0.95, 0.5, 0.01]} position={[0, 0.49, 0.021]} color="#0d1a2b" roughness={0.15} metalness={0.1} />
    </group>
  )
}

export function Tapis({ color }: { color: string }) {
  return <Block size={[2.2, 0.02, 1.5]} position={[0, 0.01, 0]} color={color} radius={0.02} roughness={0.95} metalness={0} />
}

export function Lampe({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, 0.015, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.2, 0.03, 20]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.68, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1.3, 10]} />
        <meshStandardMaterial color={METAL} roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, 1.48, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.22, 0.35, 20, 1, true]} />
        <meshStandardMaterial color={color} roughness={0.6} emissive={color} emissiveIntensity={0.18} side={2} />
      </mesh>
    </group>
  )
}

export const FURNITURE_COMPONENTS: Record<FurnitureType, React.ComponentType<{ color: string }>> = {
  fauteuil: Fauteuil,
  canape: Canape,
  'table-basse': TableBasse,
  'table-manger': TableManger,
  chaise: Chaise,
  lit: Lit,
  armoire: Armoire,
  bureau: Bureau,
  bibliotheque: Bibliotheque,
  'meuble-tv': MeubleTv,
  television: Television,
  tapis: Tapis,
  lampe: Lampe,
}
