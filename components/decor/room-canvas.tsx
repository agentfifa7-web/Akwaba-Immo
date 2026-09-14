'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, type ThreeEvent } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'

import type { PlacedItem } from '@/lib/decor'
import { getCatalogItem } from '@/lib/decor'
import { FURNITURE_COMPONENTS } from './furniture'

function Room({
  width,
  depth,
  height,
  wallColor,
  floorColor,
  onFloorPointerMove,
  onFloorPointerUp,
  onFloorClick,
}: {
  width: number
  depth: number
  height: number
  wallColor: string
  floorColor: string
  onFloorPointerMove: (e: ThreeEvent<PointerEvent>) => void
  onFloorPointerUp: () => void
  onFloorClick: () => void
}) {
  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        onPointerMove={onFloorPointerMove}
        onPointerUp={onFloorPointerUp}
        onClick={onFloorClick}
      >
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color={floorColor} roughness={0.85} />
      </mesh>
      <mesh position={[0, height / 2, -depth / 2]} receiveShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} />
      </mesh>
      <mesh position={[-width / 2, height / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} />
      </mesh>
    </group>
  )
}

function PlacedFurniture({
  item,
  selected,
  onSelect,
  onDragStart,
}: {
  item: PlacedItem
  selected: boolean
  onSelect: () => void
  onDragStart: () => void
}) {
  const Comp = FURNITURE_COMPONENTS[item.type]
  const footprint = getCatalogItem(item.type).footprint
  const ringRadius = Math.max(footprint[0], footprint[1]) / 2 + 0.12

  return (
    <group position={[item.x, 0, item.z]} rotation={[0, item.rotationY, 0]}>
      {selected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]}>
          <ringGeometry args={[ringRadius - 0.03, ringRadius, 48]} />
          <meshBasicMaterial color="#b3261e" transparent opacity={0.85} />
        </mesh>
      )}
      <group
        onPointerDown={(e) => {
          e.stopPropagation()
          onSelect()
          onDragStart()
        }}
      >
        <Comp color={item.color} />
      </group>
    </group>
  )
}

export function RoomCanvas({
  width,
  depth,
  height,
  wallColor,
  floorColor,
  items,
  selectedId,
  onSelect,
  onMoveItem,
  onCanvasReady,
}: {
  width: number
  depth: number
  height: number
  wallColor: string
  floorColor: string
  items: PlacedItem[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  onMoveItem: (id: string, x: number, z: number) => void
  onCanvasReady?: (canvas: HTMLCanvasElement) => void
}) {
  const draggingId = useRef<string | null>(null)
  const [controlsEnabled, setControlsEnabled] = useState(true)

  const clamp = (v: number, footprintSize: number, room: number) => {
    const half = room / 2 - footprintSize / 2 - 0.05
    return Math.max(-half, Math.min(half, v))
  }

  const endDrag = () => {
    draggingId.current = null
    setControlsEnabled(true)
  }

  useEffect(() => {
    window.addEventListener('pointerup', endDrag)
    return () => window.removeEventListener('pointerup', endDrag)
  }, [])

  const handleFloorPointerMove = (e: ThreeEvent<PointerEvent>) => {
    const id = draggingId.current
    if (!id) return
    const item = items.find((it) => it.id === id)
    if (!item) return
    const footprint = getCatalogItem(item.type).footprint
    const x = clamp(e.point.x, footprint[0], width)
    const z = clamp(e.point.z, footprint[1], depth)
    onMoveItem(id, x, z)
  }

  return (
    <Canvas
      shadows
      gl={{ preserveDrawingBuffer: true }}
      camera={{ position: [width * 0.9, height * 1.6, depth * 1.1], fov: 45 }}
      onPointerMissed={() => onSelect(null)}
      onCreated={(state) => onCanvasReady?.(state.gl.domElement)}
    >
      <color attach="background" args={['#efeae1']} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[width, height * 3, depth]} intensity={1.2} castShadow shadow-mapSize={[1536, 1536]} />
      <directionalLight position={[-width, height * 2, -depth]} intensity={0.45} />
      <hemisphereLight args={['#fff7ec', '#3a332c', 0.4]} />

      <Room
        width={width}
        depth={depth}
        height={height}
        wallColor={wallColor}
        floorColor={floorColor}
        onFloorPointerMove={handleFloorPointerMove}
        onFloorPointerUp={endDrag}
        onFloorClick={() => onSelect(null)}
      />

      {items.map((item) => (
        <PlacedFurniture
          key={item.id}
          item={item}
          selected={item.id === selectedId}
          onSelect={() => onSelect(item.id)}
          onDragStart={() => {
            draggingId.current = item.id
            setControlsEnabled(false)
          }}
        />
      ))}

      <ContactShadows position={[0, 0.001, 0]} opacity={0.35} scale={Math.max(width, depth) * 1.5} blur={2} far={height} />

      <OrbitControls
        enabled={controlsEnabled}
        makeDefault
        target={[0, height * 0.35, 0]}
        minDistance={1.5}
        maxDistance={Math.max(width, depth) * 2.5}
        maxPolarAngle={Math.PI / 2 - 0.03}
      />
    </Canvas>
  )
}
