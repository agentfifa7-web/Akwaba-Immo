'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useRef, useState } from 'react'
import {
  Archive,
  Armchair,
  BedDouble,
  Briefcase,
  Camera,
  ChevronLeft,
  FolderOpen,
  Palette,
  Plus,
  RotateCcw,
  RotateCw,
  Save,
  Sofa,
  Sparkles,
  Trash2,
  Tv,
  UtensilsCrossed,
} from 'lucide-react'

import { getPropertyBySlug } from '@/lib/data'
import {
  floorColorPresets,
  furnitureCatalog,
  furnitureCategories,
  getCatalogItem,
  roomPresets,
  wallColorPresets,
  type DecorProject,
  type FurnitureCategory,
  type PlacedItem,
} from '@/lib/decor'
import { useDecorProjects } from '@/lib/store'
import { RoomCanvas } from '@/components/decor/room-canvas'
import { SectionHeading } from '@/components/site/section-heading'
import { Tabs } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const categoryIcons: Record<FurnitureCategory, React.ComponentType<{ className?: string }>> = {
  Salon: Sofa,
  'Salle à manger': UtensilsCrossed,
  Chambre: BedDouble,
  Bureau: Briefcase,
  Multimédia: Tv,
  Rangement: Archive,
  Déco: Sparkles,
}

const swatchChoices = ['#b3261e', '#241f1a', '#8a5a3c', '#5b3d28', '#8a9a7e', '#2c3e50', '#c99a4b', '#e8e2d8', '#f5f1e8', '#3a332c']

function newProjectDefaults() {
  const preset = roomPresets[1]
  return {
    width: preset.width,
    depth: preset.depth,
    height: preset.height,
    wallColor: wallColorPresets[0].value,
    floorColor: floorColorPresets[0].value,
  }
}

function DecorationTool() {
  const searchParams = useSearchParams()
  const bienSlug = searchParams.get('bien')
  const projetIdParam = searchParams.get('projet')
  const { items: projects, create, update, remove } = useDecorProjects()

  const [projectId, setProjectId] = useState<string | null>(null)
  const [projectName, setProjectName] = useState('Mon projet de décoration')
  const [propertyId, setPropertyId] = useState<string | undefined>(undefined)
  const [propertyTitle, setPropertyTitle] = useState<string | undefined>(undefined)
  const [room, setRoom] = useState(newProjectDefaults())
  const [placed, setPlaced] = useState<PlacedItem[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [tab, setTab] = useState<'piece' | 'mobilier'>('mobilier')
  const [showProjects, setShowProjects] = useState(false)
  const [savedNotice, setSavedNotice] = useState(false)
  const canvasElRef = useRef<HTMLCanvasElement | null>(null)
  const initializedFromProperty = useRef(false)
  const initializedFromProject = useRef(false)

  useEffect(() => {
    if (bienSlug && !initializedFromProperty.current) {
      const property = getPropertyBySlug(bienSlug)
      if (property) {
        setProjectName(`Décoration — ${property.title}`)
        setPropertyId(property.id)
        setPropertyTitle(property.title)
        const preset = (property.bedrooms ?? 0) >= 4 ? roomPresets[4] : roomPresets[1]
        setRoom((r) => ({ ...r, width: preset.width, depth: preset.depth, height: preset.height }))
      }
      initializedFromProperty.current = true
    }
  }, [bienSlug])

  useEffect(() => {
    if (projetIdParam && !initializedFromProject.current) {
      const project = projects.find((p) => p.id === projetIdParam)
      if (project) loadProject(project)
      initializedFromProject.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projetIdParam, projects])

  const selected = placed.find((p) => p.id === selectedId) ?? null

  function addItem(type: (typeof furnitureCatalog)[number]['type']) {
    const catalogItem = getCatalogItem(type)
    const jitterX = (Math.random() - 0.5) * room.width * 0.3
    const jitterZ = (Math.random() - 0.5) * room.depth * 0.3
    const item: PlacedItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type,
      x: Math.max(-room.width / 2 + catalogItem.footprint[0] / 2, Math.min(room.width / 2 - catalogItem.footprint[0] / 2, jitterX)),
      z: Math.max(-room.depth / 2 + catalogItem.footprint[1] / 2, Math.min(room.depth / 2 - catalogItem.footprint[1] / 2, jitterZ)),
      rotationY: 0,
      color: catalogItem.defaultColor,
    }
    setPlaced((prev) => [...prev, item])
    setSelectedId(item.id)
    setTab('mobilier')
  }

  function updateSelected(patch: Partial<PlacedItem>) {
    if (!selectedId) return
    setPlaced((prev) => prev.map((p) => (p.id === selectedId ? { ...p, ...patch } : p)))
  }

  function deleteSelected() {
    if (!selectedId) return
    setPlaced((prev) => prev.filter((p) => p.id !== selectedId))
    setSelectedId(null)
  }

  function moveItem(id: string, x: number, z: number) {
    setPlaced((prev) => prev.map((p) => (p.id === id ? { ...p, x, z } : p)))
  }

  function resetProject() {
    setProjectId(null)
    setProjectName('Mon projet de décoration')
    setPropertyId(undefined)
    setPropertyTitle(undefined)
    setRoom(newProjectDefaults())
    setPlaced([])
    setSelectedId(null)
  }

  function loadProject(project: DecorProject) {
    setProjectId(project.id)
    setProjectName(project.name)
    setPropertyId(project.propertyId)
    setPropertyTitle(project.propertyTitle)
    setRoom({ width: project.width, depth: project.depth, height: project.height, wallColor: project.wallColor, floorColor: project.floorColor })
    setPlaced(project.items)
    setSelectedId(null)
    setShowProjects(false)
  }

  function saveProject() {
    const data = {
      name: projectName || 'Projet sans nom',
      propertyId,
      propertyTitle,
      width: room.width,
      depth: room.depth,
      height: room.height,
      wallColor: room.wallColor,
      floorColor: room.floorColor,
      items: placed,
    }
    if (projectId) {
      update(projectId, data)
    } else {
      const created = create(data)
      setProjectId(created.id)
    }
    setSavedNotice(true)
    setTimeout(() => setSavedNotice(false), 2200)
  }

  function captureImage() {
    if (!canvasElRef.current) return
    const url = canvasElRef.current.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = `${(projectName || 'decoration-akwaba').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.png`
    a.click()
  }

  return (
    <div className="flex min-h-[calc(100vh-1px)] flex-col bg-secondary/30">
      {/* BARRE SUPERIEURE */}
      <div className="border-b border-border bg-background px-4 py-3 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary">
              <ChevronLeft className="size-4" /> Site
            </Link>
            <div className="h-5 w-px bg-border" />
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-48 rounded-lg border border-transparent bg-transparent px-2 py-1.5 font-serif text-lg outline-none transition-colors hover:border-border focus:border-primary sm:w-64"
              aria-label="Nom du projet"
            />
            {propertyTitle && (
              <span className="hidden rounded-full bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:inline">
                {propertyTitle}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {savedNotice && <span className="text-xs font-semibold text-primary">Projet enregistré ✓</span>}
            <button
              onClick={resetProject}
              className="rounded-lg border border-border px-3 py-2 text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
            >
              Nouveau
            </button>
            <button
              onClick={() => setShowProjects((v) => !v)}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
            >
              <FolderOpen className="size-3.5" /> Mes projets ({projects.length})
            </button>
            <button
              onClick={captureImage}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
            >
              <Camera className="size-3.5" /> Capturer
            </button>
            <button
              onClick={saveProject}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg"
            >
              <Save className="size-3.5" /> Enregistrer
            </button>
          </div>
        </div>
        {showProjects && (
          <div className="mt-3 flex flex-col gap-2 rounded-lg border border-border bg-card p-3">
            {projects.length === 0 && <p className="text-xs text-muted-foreground">Aucun projet enregistré pour le moment.</p>}
            {projects.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 hover:bg-muted">
                <button onClick={() => loadProject(p)} className="flex-1 text-left text-sm">
                  <span className="font-medium">{p.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{p.items.length} élément(s)</span>
                </button>
                <button onClick={() => remove(p.id)} aria-label="Supprimer" className="text-muted-foreground hover:text-primary">
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ZONE PRINCIPALE */}
      <div className="flex flex-1 flex-col gap-4 p-4 lg:flex-row lg:p-6">
        <div className="h-[55vh] flex-1 overflow-hidden rounded-xl border border-border shadow-sm lg:h-auto">
          <RoomCanvas
            key={`${room.width}-${room.depth}-${room.height}`}
            width={room.width}
            depth={room.depth}
            height={room.height}
            wallColor={room.wallColor}
            floorColor={room.floorColor}
            items={placed}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onMoveItem={moveItem}
            onCanvasReady={(canvas) => (canvasElRef.current = canvas)}
          />
        </div>

        {/* PANNEAU LATERAL */}
        <div className="flex w-full flex-col gap-4 lg:w-80">
          {selected && (
            <div className="rounded-xl border border-primary/30 bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="font-serif text-lg">{getCatalogItem(selected.type).label}</p>
                <button onClick={deleteSelected} aria-label="Supprimer l’élément" className="text-muted-foreground hover:text-primary">
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => updateSelected({ rotationY: selected.rotationY - Math.PI / 4 })}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-primary hover:text-primary"
                >
                  <RotateCcw className="size-3.5" /> Pivoter
                </button>
                <button
                  onClick={() => updateSelected({ rotationY: selected.rotationY + Math.PI / 4 })}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-primary hover:text-primary"
                >
                  <RotateCw className="size-3.5" /> Pivoter
                </button>
              </div>
              <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Couleur</p>
              <div className="flex flex-wrap gap-2">
                {swatchChoices.map((c) => (
                  <button
                    key={c}
                    onClick={() => updateSelected({ color: c })}
                    aria-label={`Couleur ${c}`}
                    className={cn(
                      'size-7 rounded-full border-2 transition-transform hover:scale-110',
                      selected.color === c ? 'border-primary' : 'border-transparent',
                    )}
                    style={{ backgroundColor: c }}
                  />
                ))}
                <input
                  type="color"
                  value={selected.color}
                  onChange={(e) => updateSelected({ color: e.target.value })}
                  className="size-7 cursor-pointer rounded-full border-2 border-border bg-transparent p-0"
                  aria-label="Couleur personnalisée"
                />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Glissez l’élément directement dans la scène pour le déplacer.</p>
            </div>
          )}

          <div className="flex-1 overflow-hidden rounded-xl border border-border bg-card">
            <div className="border-b border-border p-3">
              <Tabs
                items={[
                  { value: 'mobilier', label: 'Mobilier' },
                  { value: 'piece', label: 'Pièce' },
                ]}
                value={tab}
                onChange={(v) => setTab(v as typeof tab)}
                size="sm"
                className="w-full border-none bg-transparent p-0 shadow-none [&>button]:flex-1"
              />
            </div>

            {tab === 'mobilier' && (
              <div className="max-h-[50vh] overflow-y-auto p-4">
                {furnitureCategories.map((category) => {
                  const Icon = categoryIcons[category]
                  const catItems = furnitureCatalog.filter((f) => f.category === category)
                  return (
                    <div key={category} className="mb-5">
                      <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                        <Icon className="size-3.5" /> {category}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {catItems.map((item) => (
                          <button
                            key={item.type}
                            onClick={() => addItem(item.type)}
                            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-left text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-sm"
                          >
                            <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: item.defaultColor }} />
                            <span className="flex-1 leading-tight">{item.label}</span>
                            <Plus className="size-3.5 shrink-0 text-primary" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {tab === 'piece' && (
              <div className="max-h-[50vh] overflow-y-auto p-4">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Modèle de pièce</p>
                <div className="mb-5 grid gap-2">
                  {roomPresets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setRoom((r) => ({ ...r, width: preset.width, depth: preset.depth, height: preset.height }))}
                      className={cn(
                        'rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors',
                        room.width === preset.width && room.depth === preset.depth
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary hover:text-primary',
                      )}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Dimensions personnalisées
                </p>
                <div className="mb-5 flex flex-col gap-3">
                  <label className="flex flex-col gap-1 text-xs text-muted-foreground">
                    Largeur : {room.width.toFixed(1)} m
                    <input
                      type="range"
                      min={2.5}
                      max={9}
                      step={0.1}
                      value={room.width}
                      onChange={(e) => setRoom((r) => ({ ...r, width: parseFloat(e.target.value) }))}
                      className="accent-primary"
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-xs text-muted-foreground">
                    Profondeur : {room.depth.toFixed(1)} m
                    <input
                      type="range"
                      min={2.5}
                      max={9}
                      step={0.1}
                      value={room.depth}
                      onChange={(e) => setRoom((r) => ({ ...r, depth: parseFloat(e.target.value) }))}
                      className="accent-primary"
                    />
                  </label>
                </div>

                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <Palette className="size-3.5" /> Couleur des murs
                </p>
                <div className="mb-5 flex flex-wrap gap-2">
                  {wallColorPresets.map((c) => (
                    <button
                      key={c.value}
                      title={c.label}
                      onClick={() => setRoom((r) => ({ ...r, wallColor: c.value }))}
                      className={cn(
                        'size-7 rounded-full border-2 transition-transform hover:scale-110',
                        room.wallColor === c.value ? 'border-primary' : 'border-transparent',
                      )}
                      style={{ backgroundColor: c.value }}
                    />
                  ))}
                  <input
                    type="color"
                    value={room.wallColor}
                    onChange={(e) => setRoom((r) => ({ ...r, wallColor: e.target.value }))}
                    className="size-7 cursor-pointer rounded-full border-2 border-border bg-transparent p-0"
                  />
                </div>

                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <Palette className="size-3.5" /> Couleur du sol
                </p>
                <div className="flex flex-wrap gap-2">
                  {floorColorPresets.map((c) => (
                    <button
                      key={c.value}
                      title={c.label}
                      onClick={() => setRoom((r) => ({ ...r, floorColor: c.value }))}
                      className={cn(
                        'size-7 rounded-full border-2 transition-transform hover:scale-110',
                        room.floorColor === c.value ? 'border-primary' : 'border-transparent',
                      )}
                      style={{ backgroundColor: c.value }}
                    />
                  ))}
                  <input
                    type="color"
                    value={room.floorColor}
                    onChange={(e) => setRoom((r) => ({ ...r, floorColor: e.target.value }))}
                    className="size-7 cursor-pointer rounded-full border-2 border-border bg-transparent p-0"
                  />
                </div>
              </div>
            )}
          </div>

          <p className="text-[11px] leading-4 text-muted-foreground">
            Astuce : cliquez sur un meuble pour le sélectionner, puis faites-le glisser dans la pièce. Orbitez la caméra avec le clic
            droit ou en tirant hors des meubles.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function DecorationPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
          <SectionHeading eyebrow="Décorateur virtuel" title="Chargement de l’atelier 3D…" />
        </div>
      }
    >
      <DecorationTool />
    </Suspense>
  )
}
