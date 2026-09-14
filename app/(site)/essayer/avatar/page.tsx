'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Camera, CheckCircle2, RotateCcw, Sparkles, Upload } from 'lucide-react'

import { useAvatar, type PhotoMode } from '@/lib/store'
import { mannequins } from '@/lib/mannequins'
import { skinTones } from '@/lib/skin-tones'
import { readFileAsDataUrl, resizeAndCompressImage } from '@/lib/image'
import { AvatarPreview } from '@/components/site/avatar-preview'
import { SectionHeading } from '@/components/site/section-heading'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const faceShapes = ['Ovale', 'Ronde', 'Carrée', 'Cœur', 'Allongée']
const hairLengths = ['Courte', 'Mi-longue', 'Longue']
const bodyTypes = ['Silhouette fine', 'Silhouette moyenne', 'Silhouette généreuse', 'Silhouette athlétique']
const heights = ['1,50 m', '1,55 m', '1,60 m', '1,65 m', '1,70 m', '1,75 m', '1,80 m', '1,85 m']
const clothingSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function MyAvatarPage() {
  const { config, update, reset, hydrated } = useAvatar()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [justValidated, setJustValidated] = useState(false)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setUploadError('Merci de choisir un fichier image (JPG, PNG…).')
      return
    }
    setUploading(true)
    setUploadError(null)
    try {
      const raw = await readFileAsDataUrl(file)
      const compressed = await resizeAndCompressImage(raw)
      update({ customPhoto: compressed, photoMode: 'photo', validated: false })
    } catch {
      setUploadError('Impossible de traiter cette photo. Réessayez avec une autre image.')
    } finally {
      setUploading(false)
    }
  }

  function setMode(mode: PhotoMode) {
    update({ photoMode: mode, validated: false })
  }

  function validate() {
    update({ validated: true })
    setJustValidated(true)
    setTimeout(() => setJustValidated(false), 3000)
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading
        eyebrow="My Avatar"
        title="Créez votre mannequin KÔSMÉA"
        description="Uploadez votre propre photo tête-aux-pieds ou choisissez un mannequin KÔSMÉA. Une fois validé, il sera utilisé automatiquement pour tous vos essayages — vous n’aurez plus jamais à le recréer."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[380px_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <AvatarPreview config={config} className="aspect-[3/4] w-full" />

          {config.validated && (
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <CheckCircle2 className="size-3.5" /> Mannequin validé — utilisé partout sur KÔSMÉA
            </p>
          )}

          <Button className="mt-4 w-full gap-2" onClick={validate}>
            <Sparkles className="size-4" /> {justValidated ? 'Mannequin validé ✓' : 'Valider mon mannequin'}
          </Button>
          <Button variant="outline" className="mt-2 w-full gap-2" onClick={reset}>
            <RotateCcw className="size-4" /> Réinitialiser
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
            <div className="mt-4 flex gap-1 rounded-lg border border-border p-1 sm:w-fit">
              <button
                type="button"
                onClick={() => setMode('photo')}
                className={cn('flex items-center gap-1.5 rounded-md px-4 py-2.5 text-xs font-semibold uppercase tracking-wider', config.photoMode === 'photo' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground')}
              >
                <Camera className="size-3.5" /> Ma photo
              </button>
              <button
                type="button"
                onClick={() => setMode('mannequin')}
                className={cn('flex items-center gap-1.5 rounded-md px-4 py-2.5 text-xs font-semibold uppercase tracking-wider', config.photoMode === 'mannequin' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground')}
              >
                Mannequins KÔSMÉA
              </button>
            </div>

            {config.photoMode === 'photo' ? (
              <div className="mt-5">
                <p className="text-xs leading-5 text-muted-foreground">
                  Pour un résultat fidèle : photo prise de face, debout, tête et pieds visibles, sur fond neutre. Votre
                  photo reste privée — stockée uniquement sur votre appareil.
                </p>
                <div className="relative mt-4 aspect-[3/4] max-w-xs overflow-hidden rounded-xl border-2 border-dashed border-border bg-secondary/60">
                  {config.customPhoto ? (
                    <img src={config.customPhoto} alt="Ma photo" className="h-full w-full object-cover object-[center_8%]" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
                      <Upload className="size-6 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Aucune photo pour le moment</p>
                    </div>
                  )}
                  {/* Guide d'alignement */}
                  <div className="pointer-events-none absolute inset-x-[10%] top-[4%] border-t border-dashed border-accent/70" />
                  <p className="pointer-events-none absolute left-[11%] top-[5%] text-[9px] font-semibold uppercase tracking-wider text-accent">Tête</p>
                  <div className="pointer-events-none absolute inset-x-[10%] bottom-[3%] border-t border-dashed border-accent/70" />
                  <p className="pointer-events-none absolute left-[11%] bottom-[4%] text-[9px] font-semibold uppercase tracking-wider text-accent">Pieds</p>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <Button variant="outline" className="mt-4 gap-2" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                  <Upload className="size-4" /> {uploading ? 'Traitement…' : config.customPhoto ? 'Changer la photo' : 'Uploader ma photo'}
                </Button>
                {uploadError && <p className="mt-2 text-xs text-destructive">{uploadError}</p>}
              </div>
            ) : (
              <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6">
                {mannequins.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => update({ mannequinId: m.id, skinTone: m.skinTone })}
                    className={cn('overflow-hidden rounded-xl border-2 text-left transition-colors', config.mannequinId === m.id ? 'border-primary' : 'border-transparent hover:border-primary/40')}
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-muted">
                      <img src={m.photo} alt={m.name} className="h-full w-full object-cover object-[center_22%]" />
                    </div>
                    <p className="px-1.5 py-1.5 text-center text-[11px] font-medium text-foreground">{m.name}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="font-serif text-xl">Teint</h3>
            <p className="mt-1 text-xs text-muted-foreground">Sert à personnaliser vos essayages et à vous recommander les bonnes teintes de fond de teint.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {skinTones.map((tone) => (
                <button
                  key={tone.id}
                  type="button"
                  onClick={() => update({ skinToneId: tone.id, skinTone: tone.hex })}
                  className={cn('flex flex-col items-center gap-1.5', config.skinToneId === tone.id && 'scale-105')}
                  title={tone.name}
                >
                  <span className={cn('size-9 rounded-full border-2', config.skinToneId === tone.id ? 'border-primary' : 'border-transparent')} style={{ backgroundColor: tone.hex }} />
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
