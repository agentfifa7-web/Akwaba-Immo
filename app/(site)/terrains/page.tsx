'use client'

import { useMemo, useState } from 'react'

import { properties, villesCouvertes } from '@/lib/data'
import { PropertyCard } from '@/components/site/property-card'
import { SectionHeading } from '@/components/site/section-heading'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const terrains = properties.filter((p) => p.category === 'terrain')

const statuses = [
  { value: 'all', label: 'Tous statuts' },
  { value: 'disponible', label: 'Disponible' },
  { value: 'programme', label: 'Programme en cours' },
] as const

export default function TerrainsPage() {
  const [ville, setVille] = useState('all')
  const [surfaceMin, setSurfaceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [status, setStatus] = useState<(typeof statuses)[number]['value']>('all')

  const villesWithTerrains = useMemo(
    () => villesCouvertes.filter((v) => terrains.some((t) => t.city === v || t.district === v)),
    [],
  )

  const filtered = useMemo(() => {
    return terrains.filter((t) => {
      if (ville !== 'all' && t.city !== ville && t.district !== ville) return false
      if (surfaceMin && t.surface < Number(surfaceMin)) return false
      if (priceMax && t.price > Number(priceMax)) return false
      if (status === 'programme' && !t.programStatus) return false
      if (status === 'disponible' && t.programStatus) return false
      return true
    })
  }, [ville, surfaceMin, priceMax, status])

  return (
    <div>
      <section className="relative flex min-h-[380px] items-end overflow-hidden bg-graphite pb-14 pt-32">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=85"
          alt="Terrains viabilisés en Côte d’Ivoire"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Foncier sécurisé</p>
          <h1 className="max-w-2xl font-serif text-5xl leading-[1.02] text-white sm:text-6xl">Bâtissez sur un terrain sécurisé.</h1>
          <p className="mt-5 max-w-xl leading-7 text-white/75">
            Parcelles viabilisées, titres fonciers vérifiés : trouvez le terrain qui accueillera votre prochain projet.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
        <div className="border border-border bg-card p-5 lg:p-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Label>Localisation</Label>
              <Select value={ville} onChange={(e) => setVille(e.target.value)}>
                <option value="all">Toutes les localisations</option>
                {villesWithTerrains.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Superficie min. (m²)</Label>
              <Input type="number" min={0} placeholder="Ex: 500" value={surfaceMin} onChange={(e) => setSurfaceMin(e.target.value)} />
            </div>
            <div>
              <Label>Budget max. (FCFA)</Label>
              <Input type="number" min={0} placeholder="Ex: 30 000 000" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
            </div>
            <div>
              <Label>Statut</Label>
              <Select value={status} onChange={(e) => setStatus(e.target.value as (typeof statuses)[number]['value'])}>
                {statuses.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <div className="mt-10 border-b border-border pb-5">
          <SectionHeading
            eyebrow={`${filtered.length} terrain${filtered.length > 1 ? 's' : ''} correspondant${filtered.length > 1 ? 's' : ''}`}
            title="Terrains disponibles"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 border border-dashed border-border py-20 text-center">
            <p className="font-serif text-2xl">Aucun terrain ne correspond à ces critères.</p>
            <p className="mt-3 text-sm text-muted-foreground">Contactez notre pôle foncier pour être alerté des prochaines opportunités.</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
