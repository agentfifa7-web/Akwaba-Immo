'use client'

import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'

import { properties, type PropertyCategory, type TransactionType } from '@/lib/data'
import { PropertyCard } from '@/components/site/property-card'
import { Select } from '@/components/ui/select'

const categoryLabels: Record<PropertyCategory, string> = {
  villa: 'Villa',
  maison: 'Maison',
  appartement: 'Appartement',
  terrain: 'Terrain',
  bureau: 'Bureau',
  commerce: 'Commerce',
  immeuble: 'Immeuble',
}

const sortOptions = [
  { value: 'pertinence', label: 'Pertinence' },
  { value: 'prix-croissant', label: 'Prix croissant' },
  { value: 'prix-decroissant', label: 'Prix décroissant' },
  { value: 'recent', label: 'Plus récent' },
  { value: 'superficie', label: 'Grande superficie' },
] as const
type SortValue = (typeof sortOptions)[number]['value']

export default function RecherchePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-5 py-28 lg:px-10" />}>
      <RechercheContent />
    </Suspense>
  )
}

function RechercheContent() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') ?? searchParams.get('localisation') ?? ''
  const transaction = (searchParams.get('transaction') as TransactionType | null) ?? undefined
  const categorie = (searchParams.get('type') as PropertyCategory | null) ?? (searchParams.get('categorie') as PropertyCategory | null) ?? undefined
  const budgetMax = searchParams.get('budget') ? Number(searchParams.get('budget')) : undefined

  const [sort, setSort] = useState<SortValue>('pertinence')

  const results = useMemo(() => {
    let list = properties.filter((p) => {
      if (transaction && p.transaction !== transaction) return false
      if (categorie && p.category !== categorie) return false
      if (budgetMax && p.price > budgetMax) return false
      if (q) {
        const needle = q.toLowerCase()
        const haystack = `${p.title} ${p.city} ${p.district} ${p.category}`.toLowerCase()
        if (!haystack.includes(needle)) return false
      }
      return true
    })
    list = [...list]
    switch (sort) {
      case 'prix-croissant':
        list.sort((a, b) => a.price - b.price)
        break
      case 'prix-decroissant':
        list.sort((a, b) => b.price - a.price)
        break
      case 'recent':
        list.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        break
      case 'superficie':
        list.sort((a, b) => b.surface - a.surface)
        break
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured))
    }
    return list
  }, [q, transaction, categorie, budgetMax, sort])

  return (
    <div>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-16">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            <Search className="size-3.5" /> Résultats de recherche
          </p>
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
            {q ? `Résultats pour « ${q} »` : 'Résultats de recherche'}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {[transaction ? (transaction === 'vente' ? 'À vendre' : 'À louer') : null, categorie ? categoryLabels[categorie] : null, budgetMax ? `Budget max. ${budgetMax.toLocaleString('fr-FR')} FCFA` : null]
              .filter(Boolean)
              .join(' · ') || 'Tous les biens du catalogue'}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-16">
        <div className="flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-serif text-2xl text-foreground">{results.length}</span>{' '}
            bien{results.length > 1 ? 's' : ''} correspondant{results.length > 1 ? 's' : ''} à vos critères
          </p>
          <Select value={sort} onChange={(e) => setSort(e.target.value as SortValue)} className="w-auto min-w-[190px]">
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                Trier : {opt.label}
              </option>
            ))}
          </Select>
        </div>

        {results.length === 0 ? (
          <div className="mt-16 border border-dashed border-border py-20 text-center">
            <p className="font-serif text-2xl">Aucun résultat pour cette recherche.</p>
            <p className="mt-3 text-sm text-muted-foreground">Essayez d’élargir vos critères ou parcourez l’ensemble du catalogue.</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {results.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
