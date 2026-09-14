'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Image as ImageIcon, MapPinned, Video, X } from 'lucide-react'

import { getPropertyBySlug, propertyPriceDisplay } from '@/lib/data'

type Mode = 'photos' | 'video' | 'plan'

export default function VirtualTourPage() {
  const { slug } = useParams<{ slug: string }>()
  const property = getPropertyBySlug(slug)
  const [activeImage, setActiveImage] = useState(0)
  const [mode, setMode] = useState<Mode>('photos')

  if (!property) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-graphite px-5 text-center text-white">
        <h1 className="font-serif text-3xl">Bien introuvable</h1>
        <Link href="/biens" className="bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
          Retour au catalogue
        </Link>
      </div>
    )
  }

  const images = property.images
  const modes: { id: Mode; label: string; icon: typeof ImageIcon; available: boolean }[] = [
    { id: 'photos', label: 'Photos', icon: ImageIcon, available: true },
    { id: 'video', label: 'Vidéo', icon: Video, available: Boolean(property.videoUrl) },
    { id: 'plan', label: 'Plan', icon: MapPinned, available: true },
  ]

  return (
    <div className="min-h-screen bg-graphite text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 lg:px-10">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">Visite immersive</p>
          <h1 className="font-serif text-xl sm:text-2xl">{property.title}</h1>
        </div>
        <Link href={`/biens/${property.slug}`} aria-label="Fermer la visite" className="flex size-10 items-center justify-center border border-white/20 transition-colors hover:border-primary hover:text-primary">
          <X className="size-5" />
        </Link>
      </div>

      <div className="flex justify-center gap-2 border-b border-white/10 px-5 py-4 lg:px-10">
        {modes.map((m) => (
          <button
            key={m.id}
            disabled={!m.available}
            onClick={() => setMode(m.id)}
            className={`flex items-center gap-2 border px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              mode === m.id ? 'border-primary bg-primary text-primary-foreground' : 'border-white/20 text-white/70 hover:border-white/50 hover:text-white'
            } ${!m.available ? 'cursor-not-allowed opacity-30' : ''}`}
          >
            <m.icon className="size-3.5" /> {m.label}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-6xl px-5 py-8 lg:px-10 lg:py-12">
        {mode === 'photos' && (
          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-black">
              <img src={images[activeImage]} alt={property.title} className="h-full w-full object-contain" />
              {images.length > 1 && (
                <>
                  <button
                    aria-label="Image précédente"
                    onClick={() => setActiveImage((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    aria-label="Image suivante"
                    onClick={() => setActiveImage((i) => (i + 1) % images.length)}
                    className="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}
              <div className="absolute bottom-4 right-4 bg-black/60 px-3 py-1.5 text-xs font-semibold">
                {activeImage + 1} / {images.length}
              </div>
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
                {images.map((img, i) => (
                  <button
                    key={img + i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-[4/3] overflow-hidden rounded-lg border-2 transition-colors ${i === activeImage ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {mode === 'video' && property.videoUrl && (
          <div className="aspect-video overflow-hidden bg-black">
            <iframe src={property.videoUrl} title={`Vidéo — ${property.title}`} className="h-full w-full" allowFullScreen />
          </div>
        )}

        {mode === 'plan' && (
          <div className="flex aspect-[16/9] flex-col items-center justify-center gap-3 border border-dashed border-white/20 bg-white/5 text-center">
            <MapPinned className="size-8 text-primary" />
            <p className="font-serif text-2xl">Plan disponible sur demande</p>
            <p className="max-w-sm text-sm text-white/60">
              Le plan architectural détaillé de ce bien peut vous être transmis par votre conseiller.
            </p>
            <Link href={`/biens/${property.slug}/contact`} className="mt-3 bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
              Demander le plan
            </Link>
          </div>
        )}

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <div>
            <p className="text-sm text-white/60">{property.district}, {property.city}</p>
            <p className="font-serif text-2xl text-primary">{propertyPriceDisplay(property)}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={`/visite/${property.slug}`} className="bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
              Prendre rendez-vous
            </Link>
            <Link href={`/biens/${property.slug}`} className="border border-white/30 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-primary hover:text-primary">
              Fiche complète du bien
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
