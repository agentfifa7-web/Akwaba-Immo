'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Building2, Home, MapPin, X } from 'lucide-react'

import { projects, properties, propertyPriceDisplay, villesCouvertes, formatFCFA } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { cn } from '@/lib/utils'

type PinItem =
  | { kind: 'property'; id: string; title: string; href: string; sub: string; x: number; y: number }
  | { kind: 'project'; id: string; title: string; href: string; sub: string; x: number; y: number }

// Position pseudo-géographique déterministe par ville (proportions dans le panneau)
const cityPositions: Record<string, { x: number; y: number }> = {
  Cocody: { x: 58, y: 40 },
  Riviera: { x: 66, y: 34 },
  Angré: { x: 70, y: 24 },
  Marcory: { x: 55, y: 58 },
  Plateau: { x: 46, y: 48 },
  Yopougon: { x: 20, y: 46 },
  'Port-Bouët': { x: 50, y: 74 },
  Bingerville: { x: 80, y: 46 },
  'Grand-Bassam': { x: 88, y: 70 },
  Assinie: { x: 92, y: 82 },
  Songon: { x: 12, y: 30 },
  Yamoussoukro: { x: 35, y: 10 },
  Bouaké: { x: 45, y: 4 },
  'San-Pédro': { x: 15, y: 90 },
}

function jitter(seed: number) {
  return ((seed * 37) % 10) - 5
}

export default function CartePage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [activePin, setActivePin] = useState<PinItem | null>(null)

  const countsByCity = useMemo(() => {
    const map = new Map<string, number>()
    villesCouvertes.forEach((v) => {
      const nb =
        properties.filter((p) => p.city === v || p.district === v).length +
        projects.filter((p) => p.city === v || p.district === v).length
      map.set(v, nb)
    })
    return map
  }, [])

  const pins: PinItem[] = useMemo(() => {
    const cities = selectedCity ? [selectedCity] : villesCouvertes
    const items: PinItem[] = []
    cities.forEach((city) => {
      const base = cityPositions[city] ?? { x: 50, y: 50 }
      const matchingProps = properties.filter((p) => p.city === city || p.district === city)
      const matchingProjects = projects.filter((p) => p.city === city || p.district === city)
      matchingProps.forEach((p, i) => {
        items.push({
          kind: 'property',
          id: p.id,
          title: p.title,
          href: `/biens/${p.slug}`,
          sub: propertyPriceDisplay(p),
          x: Math.min(96, Math.max(4, base.x + jitter(i + 1))),
          y: Math.min(94, Math.max(6, base.y + jitter(i + 3))),
        })
      })
      matchingProjects.forEach((p, i) => {
        items.push({
          kind: 'project',
          id: p.id,
          title: p.name,
          href: `/projets/${p.slug}`,
          sub: `À partir de ${formatFCFA(p.priceFrom)}`,
          x: Math.min(96, Math.max(4, base.x + jitter(i + 5))),
          y: Math.min(94, Math.max(6, base.y + jitter(i + 7))),
        })
      })
    })
    return items
  }, [selectedCity])

  return (
    <div>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
          <SectionHeading
            eyebrow="Explorer l’immobilier"
            title="La carte immobilière de la Côte d’Ivoire"
            description="Sélectionnez une ville pour découvrir les biens et programmes disponibles dans la zone."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* LISTE VILLES */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setSelectedCity(null)
                setActivePin(null)
              }}
              className={cn(
                'flex items-center justify-between border px-4 py-3 text-sm font-semibold transition-colors',
                selectedCity === null ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary hover:text-primary',
              )}
            >
              Toutes les villes
              <span className="text-xs">{properties.length + projects.length}</span>
            </button>
            {villesCouvertes.map((v) => (
              <button
                key={v}
                onClick={() => {
                  setSelectedCity(v)
                  setActivePin(null)
                }}
                className={cn(
                  'flex items-center justify-between gap-2 border px-4 py-3 text-sm transition-colors',
                  selectedCity === v ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary hover:text-primary',
                )}
              >
                <span className="flex items-center gap-2">
                  <MapPin className="size-3.5 shrink-0" /> {v}
                </span>
                <span className="text-xs">{countsByCity.get(v) ?? 0}</span>
              </button>
            ))}
          </div>

          {/* PANNEAU CARTE */}
          <div className="relative min-h-[500px] overflow-hidden border border-border bg-[radial-gradient(circle_at_30%_20%,var(--secondary),var(--background)_70%)]">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            {pins.map((pin) => (
              <button
                key={`${pin.kind}-${pin.id}`}
                onClick={() => setActivePin(pin)}
                aria-label={pin.title}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                className={cn(
                  'absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white shadow-lg transition-transform hover:scale-110',
                  pin.kind === 'property' ? 'bg-primary text-primary-foreground' : 'bg-graphite text-graphite-foreground',
                  activePin?.id === pin.id && activePin.kind === pin.kind && 'ring-4 ring-primary/30',
                )}
              >
                {pin.kind === 'property' ? <Home className="size-3.5" /> : <Building2 className="size-3.5" />}
              </button>
            ))}

            {activePin && (
              <div
                style={{ left: `${Math.min(activePin.x, 72)}%`, top: `${Math.min(activePin.y + 6, 78)}%` }}
                className="absolute z-10 w-64 -translate-x-1/2 border border-border bg-card p-4 shadow-2xl"
              >
                <button
                  onClick={() => setActivePin(null)}
                  aria-label="Fermer"
                  className="absolute right-2 top-2 flex size-6 items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
                <p className="pr-6 text-xs font-semibold uppercase tracking-wider text-primary">
                  {activePin.kind === 'property' ? 'Bien' : 'Programme'}
                </p>
                <h3 className="mt-1 font-serif text-base leading-snug">{activePin.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{activePin.sub}</p>
                <Link href={activePin.href} className="mt-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary underline underline-offset-4">
                  Voir la fiche
                </Link>
              </div>
            )}

            {pins.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-center text-sm text-muted-foreground">
                Aucun bien ni programme référencé dans cette zone pour le moment.
              </div>
            )}

            <p className="absolute bottom-3 left-3 max-w-xs text-[10px] leading-4 text-muted-foreground">
              Représentation schématique à des fins d’illustration — non contractuelle. Positions indicatives par zone.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
