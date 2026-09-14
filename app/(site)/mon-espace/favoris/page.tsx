'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'

import { properties } from '@/lib/data'
import { useFavorites } from '@/lib/store'
import { PropertyCard } from '@/components/site/property-card'

export default function MesFavorisPage() {
  const { ids, hydrated } = useFavorites()
  const favoriteProperties = ids
    .map((id) => properties.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Espace client</p>
      <h2 className="font-serif text-2xl leading-tight sm:text-3xl">Mes favoris</h2>
      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
        Retrouvez ici tous les biens que vous avez enregistrés en cliquant sur le cœur depuis leur fiche.
      </p>

      {!hydrated && <div className="mt-10 h-48 animate-pulse bg-muted" />}

      {hydrated && favoriteProperties.length === 0 && (
        <div className="mt-10 flex flex-col items-start gap-4 border border-dashed border-border p-10 text-center sm:items-center">
          <Heart className="size-8 text-muted-foreground" />
          <p className="font-serif text-xl">Vous n’avez pas encore de favoris</p>
          <p className="max-w-md leading-7 text-muted-foreground">
            Parcourez notre catalogue et cliquez sur le cœur d’un bien pour l’ajouter ici.
          </p>
          <Link
            href="/biens"
            className="mt-2 bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Découvrir les biens
          </Link>
        </div>
      )}

      {hydrated && favoriteProperties.length > 0 && (
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {favoriteProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}
