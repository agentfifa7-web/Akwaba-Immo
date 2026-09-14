'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { MapPin, Star } from 'lucide-react'

import { boutiques, professionals, stylists } from '@/lib/data'
import { LocationMap, CI_CENTER, type MapPin as Pin } from '@/components/site/location-map'
import { SectionHeading } from '@/components/site/section-heading'
import { cn } from '@/lib/utils'

function haversine(a: [number, number], b: [number, number]) {
  const R = 6371
  const dLat = ((b[0] - a[0]) * Math.PI) / 180
  const dLng = ((b[1] - a[1]) * Math.PI) / 180
  const lat1 = (a[0] * Math.PI) / 180
  const lat2 = (b[0] * Math.PI) / 180
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
}

type Filter = 'tous' | 'boutiques' | 'stylistes' | 'professionnels'

export default function NearMePage() {
  const [filter, setFilter] = useState<Filter>('tous')
  const reference = CI_CENTER

  const entries = useMemo(() => {
    // Décalage déterministe (pas aléatoire) pour éviter tout écart entre le
    // rendu serveur et le rendu client : les stylistes/professionnels n'ont
    // pas de coordonnées propres dans les données mock, on les répartit donc
    // de façon stable autour du centre d'Abidjan.
    const spread = (index: number, total: number): [number, number] => {
      const angle = (index / total) * Math.PI * 2
      const radius = 0.03 + (index % 3) * 0.015
      return [5.35 + Math.sin(angle) * radius, -4.0 + Math.cos(angle) * radius]
    }
    const b = boutiques.map((x) => ({ kind: 'boutique' as const, id: x.id, name: x.name, subtitle: `${x.district}, ${x.city}`, coords: [x.coordinates.lat, x.coordinates.lng] as [number, number], href: `/boutiques/${x.slug}`, rating: x.rating, badge: x.badge }))
    const s = stylists.map((x, i) => ({ kind: 'styliste' as const, id: x.id, name: x.name, subtitle: x.city, coords: spread(i, stylists.length), href: `/stylistes/${x.slug}`, rating: x.rating, badge: x.badge }))
    const p = professionals.map((x, i) => ({ kind: 'professionnel' as const, id: x.id, name: x.name, subtitle: `${x.role} — ${x.district}`, coords: spread(i + 1, professionals.length), href: `/professionnels/${x.slug}`, rating: x.rating, badge: x.badge }))
    return [...b, ...s, ...p].map((e) => ({ ...e, distance: haversine(reference, e.coords) })).sort((a, b2) => a.distance - b2.distance)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtered = entries.filter((e) => filter === 'tous' || (filter === 'boutiques' && e.kind === 'boutique') || (filter === 'stylistes' && e.kind === 'styliste') || (filter === 'professionnels' && e.kind === 'professionnel'))

  const pins: Pin[] = filtered.slice(0, 30).map((e) => ({
    id: e.id, lat: e.coords[0], lng: e.coords[1], title: e.name, subtitle: e.subtitle,
    meta: `${e.distance.toFixed(1)} km`, href: e.href,
    kind: e.kind === 'boutique' ? 'boutique' : e.kind === 'styliste' ? 'styliste' : 'professionnel',
  }))

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="Géolocalisation intelligente" title="Près de moi" description="Boutiques, stylistes et professionnels beauté autour de vous, à Abidjan et ses environs." />

      <div className="mt-8 flex flex-wrap gap-2">
        {(['tous', 'boutiques', 'stylistes', 'professionnels'] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn('rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider capitalize', filter === f ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <LocationMap pins={pins} height="560px" />
        <div className="max-h-[560px] space-y-3 overflow-y-auto">
          {filtered.slice(0, 20).map((e) => (
            <Link key={e.id} href={e.href} className="flex items-center gap-3 border border-border bg-card p-4 transition-colors hover:border-primary">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{e.name}</p>
                <p className="truncate text-xs text-muted-foreground">{e.subtitle}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="flex items-center gap-1 text-xs text-muted-foreground"><Star className="size-3 fill-champagne text-champagne" /> {e.rating.toFixed(1)}</p>
                <p className="text-xs font-semibold text-accent">{e.distance.toFixed(1)} km</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
