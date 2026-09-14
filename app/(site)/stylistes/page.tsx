'use client'

import { useMemo, useState } from 'react'

import { stylists, villesCouvertes } from '@/lib/data'
import { ProviderCard } from '@/components/site/provider-card'
import { SectionHeading } from '@/components/site/section-heading'
import { Select } from '@/components/ui/select'

export default function StylistsPage() {
  const [city, setCity] = useState('Toutes les villes')
  const specialties = Array.from(new Set(stylists.flatMap((s) => s.specialties))).sort()
  const [specialty, setSpecialty] = useState('Toutes les spécialités')

  const filtered = useMemo(
    () =>
      stylists.filter(
        (s) => (city === 'Toutes les villes' || s.city === city) && (specialty === 'Toutes les spécialités' || s.specialties.includes(specialty)),
      ),
    [city, specialty],
  )

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="Marketplace stylistes" title="Trouvez votre styliste" description="Mariage, soirée, bureau, mode africaine : réservez une consultation ou une création sur mesure." />

      <div className="mt-8 flex flex-wrap gap-3">
        <Select value={city} onChange={(e) => setCity(e.target.value)} className="w-52">
          <option>Toutes les villes</option>
          {villesCouvertes.map((v) => <option key={v}>{v}</option>)}
        </Select>
        <Select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="w-60">
          <option>Toutes les spécialités</option>
          {specialties.map((s) => <option key={s}>{s}</option>)}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 border border-dashed border-border p-16 text-center text-sm text-muted-foreground">Aucun styliste ne correspond à ces filtres.</div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <ProviderCard
              key={s.id}
              href={`/stylistes/${s.slug}`}
              photo={s.photo}
              name={s.name}
              subtitle={s.specialties[0]}
              city={s.city}
              specialties={s.specialties}
              rating={s.rating}
              reviewsCount={s.reviewsCount}
              priceFrom={s.priceFrom}
              badge={s.badge}
            />
          ))}
        </div>
      )}
    </div>
  )
}
