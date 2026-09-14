'use client'

import Link from 'next/link'
import { RotateCcw } from 'lucide-react'

import { useAvatar } from '@/lib/store'
import { mannequins } from '@/lib/mannequins'
import { AvatarPreview } from '@/components/site/avatar-preview'
import { SectionHeading } from '@/components/site/section-heading'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const faceShapes = ['Ovale', 'Ronde', 'Carrée', 'Cœur', 'Allongée']
const hairLengths = ['Courte', 'Mi-longue', 'Longue']
const bodyTypes = ['Silhouette fine', 'Silhouette moyenne', 'Silhouette généreuse', 'Silhouette athlétique']
const heights = ['1,55 m', '1,60 m', '1,65 m', '1,70 m', '1,75 m', '1,80 m']
const clothingSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function MyAvatarPage() {
  const { config, update, reset, hydrated } = useAvatar()

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="My Avatar" title="Créez votre avatar KÔSMÉA" description="Personnalisez votre avatar pour des essayages plus précis. Ces informations restent privées et servent uniquement à votre expérience d’essayage." />

      <div className="mt-12 grid gap-10 lg:grid-cols-[380px_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <AvatarPreview config={config} className="aspect-[3/4] w-full" />
          <Button variant="outline" className="mt-4 w-full gap-2" onClick={reset}>
            <RotateCcw className="size-4" /> Réinitialiser l’avatar
          </Button>
          {hydrated && (
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/essayer/maquillage"><Button variant="secondary" className="w-full">Essayer un maquillage</Button></Link>
              <Link href="/essayer/mode"><Button variant="secondary" className="w-full">Essayer une tenue</Button></Link>
              <Link href="/essayer/coiffure"><Button variant="secondary" className="w-full">Essayer une coiffure</Button></Link>
            </div>
          )}
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="font-serif text-xl">Mon mannequin</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Choisissez la photo qui servira de base à vos essayages — maquillage, coiffure et tenues s’appliqueront dessus.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {mannequins.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => update({ mannequinId: m.id, skinTone: m.skinTone })}
                  className={cn(
                    'overflow-hidden rounded-xl border-2 text-left transition-colors',
                    config.mannequinId === m.id ? 'border-primary' : 'border-transparent hover:border-primary/40',
                  )}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-muted">
                    <img src={m.photo} alt={m.name} className="h-full w-full object-cover object-[center_22%]" />
                  </div>
                  <p className="px-1.5 py-1.5 text-center text-[11px] font-medium text-foreground">{m.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl">Visage</h3>
            <div className="mt-4">
              <Label>Forme du visage</Label>
              <Select value={config.faceShape} onChange={(e) => update({ faceShape: e.target.value })}>
                {faceShapes.map((f) => <option key={f}>{f}</option>)}
              </Select>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl">Cheveux</h3>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div>
                <Label>Longueur</Label>
                <Select value={config.hairLength} onChange={(e) => update({ hairLength: e.target.value })}>
                  {hairLengths.map((h) => <option key={h}>{h}</option>)}
                </Select>
              </div>
              <div>
                <Label>Couleur</Label>
                <input type="color" value={config.hairColor} onChange={(e) => update({ hairColor: e.target.value })} className="h-11 w-full rounded-lg border border-border" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl">Silhouette</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Utilisée uniquement pour personnaliser l’essayage et la taille — jamais comme critère de beauté.
            </p>
            <div className="mt-4 grid gap-6 sm:grid-cols-3">
              <div>
                <Label>Taille</Label>
                <Select value={config.height} onChange={(e) => update({ height: e.target.value })}>
                  {heights.map((h) => <option key={h}>{h}</option>)}
                </Select>
              </div>
              <div>
                <Label>Morphologie</Label>
                <Select value={config.bodyType} onChange={(e) => update({ bodyType: e.target.value })}>
                  {bodyTypes.map((b) => <option key={b}>{b}</option>)}
                </Select>
              </div>
              <div>
                <Label>Taille de vêtement</Label>
                <Select value={config.clothingSize} onChange={(e) => update({ clothingSize: e.target.value })}>
                  {clothingSizes.map((s) => <option key={s}>{s}</option>)}
                </Select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl">Tenue</h3>
            <div className="mt-4">
              <Label>Couleur de la tenue</Label>
              <input type="color" value={config.outfitColor} onChange={(e) => update({ outfitColor: e.target.value })} className="h-11 w-32 rounded-lg border border-border" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
