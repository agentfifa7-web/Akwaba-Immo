'use client'

import { useMemo, useState } from 'react'
import { Building2, Home, MapPin } from 'lucide-react'

import { projects, properties, propertyPriceDisplay, villesCouvertes, formatFCFA } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { PropertyMap, type MapPin as MapPinData } from '@/components/site/property-map'
import { cn } from '@/lib/utils'

export default function CartePage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [kindFilter, setKindFilter] = useState<'tous' | 'property' | 'project'>('tous')

  const countsByCity = useMemo(() => {
    const map = new Map<string, number>()
    villesCouvertes.forEach((v) => {
      const nb =
        properties.filter((p) => p.city.includes(v) || p.district.includes(v)).length +
        projects.filter((p) => p.city.includes(v) || p.district.includes(v)).length
      map.set(v, nb)
    })
    return map
  }, [])

  const pins: MapPinData[] = useMemo(() => {
    const matchesCity = (city: string, district: string) =>
      !selectedCity || city.includes(selectedCity) || district.includes(selectedCity)

    const propertyPins: MapPinData[] =
      kindFilter === 'project'
        ? []
        : properties
            .filter((p) => matchesCity(p.city, p.district))
            .map((p) => ({
              id: p.id,
              lat: p.coordinates.lat,
              lng: p.coordinates.lng,
              title: p.title,
              subtitle: `${p.district}, ${p.city}`,
              price: propertyPriceDisplay(p),
              href: `/biens/${p.slug}`,
              kind: 'property' as const,
              badge: p.transaction === 'vente' ? 'À vendre' : 'À louer',
            }))

    const projectPins: MapPinData[] =
      kindFilter === 'property'
        ? []
        : projects
            .filter((p) => matchesCity(p.city, p.district))
            .map((p) => ({
              id: p.id,
              lat: p.coordinates.lat,
              lng: p.coordinates.lng,
              title: p.name,
              subtitle: `${p.district}, ${p.city}`,
              price: `À partir de ${formatFCFA(p.priceFrom)}`,
              href: `/projets/${p.slug}`,
              kind: 'project' as const,
              badge: 'Programme',
            }))

    return [...propertyPins, ...projectPins]
  }, [selectedCity, kindFilter])

  return (
    <div>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
          <SectionHeading
            eyebrow="Explorer l’immobilier"
            title="La carte immobilière de la Côte d’Ivoire"
            description="Naviguez, zoomez et cliquez sur un repère pour découvrir les biens et programmes disponibles, partout dans le pays."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* LISTE VILLES */}
          <div className="flex flex-col gap-5">
            <div className="flex gap-1 rounded-lg border border-border bg-card p-1 shadow-sm">
              {(
                [
                  { value: 'tous', label: 'Tout', icon: MapPin },
                  { value: 'property', label: 'Biens', icon: Home },
                  { value: 'project', label: 'Projets', icon: Building2 },
                ] as const
              ).map((f) => (
                <button
                  key={f.value}
                  onClick={() => setKindFilter(f.value)}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-2 text-[11px] font-semibold uppercase tracking-wider transition-all duration-200',
                    kindFilter === f.value ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <f.icon className="size-3.5" /> {f.label}
                </button>
              ))}
            </div>

            <div className="flex max-h-[560px] flex-col gap-2 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCity(null)}
                className={cn(
                  'flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-semibold transition-all duration-200',
                  selectedCity === null
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                    : 'border-border hover:border-primary hover:text-primary',
                )}
              >
                Toute la Côte d’Ivoire
                <span className="text-xs">{properties.length + projects.length}</span>
              </button>
              {villesCouvertes.map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedCity(v)}
                  className={cn(
                    'flex items-center justify-between gap-2 rounded-lg border px-4 py-3 text-sm transition-all duration-200',
                    selectedCity === v
                      ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                      : 'border-border hover:border-primary hover:text-primary',
                  )}
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="size-3.5 shrink-0" /> {v}
                  </span>
                  <span className="text-xs">{countsByCity.get(v) ?? 0}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CARTE */}
          <div className="flex flex-col gap-3">
            <PropertyMap pins={pins} height="640px" fitToPins />
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block size-3 rounded-full bg-primary" /> Biens
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block size-3 rounded-full bg-graphite" /> Programmes
                </span>
              </div>
              <p>
                {pins.length} résultat{pins.length > 1 ? 's' : ''} affiché{pins.length > 1 ? 's' : ''} · fond de carte ©
                OpenStreetMap
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
