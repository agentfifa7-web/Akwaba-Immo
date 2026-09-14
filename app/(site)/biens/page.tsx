'use client'

import Link from 'next/link'
import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { LayoutGrid, List, MapPin, SlidersHorizontal } from 'lucide-react'

import { properties, propertyPriceDisplay, villesCouvertes, type PropertyCategory, type TransactionType } from '@/lib/data'
import { PropertyCard } from '@/components/site/property-card'
import { SectionHeading } from '@/components/site/section-heading'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

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
type ViewMode = 'grille' | 'liste' | 'carte'

export default function BiensPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-5 py-28 lg:px-10" />}>
      <BiensContent />
    </Suspense>
  )
}

function BiensContent() {
  const searchParams = useSearchParams()

  const [transaction, setTransaction] = useState<TransactionType | 'all'>(
    (searchParams.get('transaction') as TransactionType | null) ?? 'all',
  )
  const [category, setCategory] = useState<PropertyCategory | 'all'>(
    (searchParams.get('categorie') as PropertyCategory | null) ?? 'all',
  )
  const [ville, setVille] = useState<string>(searchParams.get('ville') ?? 'all')
  const [priceMin, setPriceMin] = useState(searchParams.get('prixMin') ?? '')
  const [priceMax, setPriceMax] = useState(searchParams.get('prixMax') ?? '')
  const [bedroomsMin, setBedroomsMin] = useState(searchParams.get('chambres') ?? 'all')
  const [sort, setSort] = useState<SortValue>('pertinence')
  const [view, setView] = useState<ViewMode>('grille')

  const filtered = useMemo(() => {
    let list = properties.filter((p) => {
      if (transaction !== 'all' && p.transaction !== transaction) return false
      if (category !== 'all' && p.category !== category) return false
      if (ville !== 'all' && p.city !== ville && p.district !== ville) return false
      if (priceMin && p.price < Number(priceMin)) return false
      if (priceMax && p.price > Number(priceMax)) return false
      if (bedroomsMin !== 'all' && (p.bedrooms ?? 0) < Number(bedroomsMin)) return false
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
  }, [transaction, category, ville, priceMin, priceMax, bedroomsMin, sort])

  const groupedByCity = useMemo(() => {
    const map = new Map<string, typeof properties>()
    filtered.forEach((p) => {
      const key = p.city
      map.set(key, [...(map.get(key) ?? []), p])
    })
    return Array.from(map.entries())
  }, [filtered])

  return (
    <div>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
          <SectionHeading eyebrow="Catalogue Akwaba" title="Tous nos biens immobiliers" description="Villas, appartements, maisons, terrains, bureaux et commerces partout en Côte d’Ivoire." />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-10 lg:py-16">
        {/* FILTRES */}
        <div className="border border-border bg-card p-5 lg:p-6">
          <div className="flex items-center gap-2 border-b border-border pb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <SlidersHorizontal className="size-4" /> Filtrer les biens
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            <div className="self-start lg:col-span-2">
              <Tabs
                items={[
                  { value: 'all', label: 'Tous' },
                  { value: 'vente', label: 'Acheter' },
                  { value: 'location', label: 'Louer' },
                ]}
                value={transaction}
                onChange={(v) => setTransaction(v as typeof transaction)}
              />
            </div>

            <div>
              <Label>Type de bien</Label>
              <Select value={category} onChange={(e) => setCategory(e.target.value as PropertyCategory | 'all')}>
                <option value="all">Tous les types</option>
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label>Ville / quartier</Label>
              <Select value={ville} onChange={(e) => setVille(e.target.value)}>
                <option value="all">Toutes les villes</option>
                {villesCouvertes.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label>Chambres min.</Label>
              <Select value={bedroomsMin} onChange={(e) => setBedroomsMin(e.target.value)}>
                <option value="all">Indifférent</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}+ chambres
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label>Budget min. (FCFA)</Label>
              <Input type="number" min={0} placeholder="Ex: 20 000 000" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
            </div>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-start-6">
              <Label>Budget max. (FCFA)</Label>
              <Input type="number" min={0} placeholder="Ex: 150 000 000" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
            </div>
          </div>
        </div>

        {/* RESULTATS HEADER */}
        <div className="mt-10 flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-serif text-2xl text-foreground">{filtered.length}</span>{' '}
            bien{filtered.length > 1 ? 's' : ''} correspondant{filtered.length > 1 ? 's' : ''} à vos critères
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Select value={sort} onChange={(e) => setSort(e.target.value as SortValue)} className="w-auto min-w-[190px]">
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  Trier : {opt.label}
                </option>
              ))}
            </Select>
            <div className="flex gap-1 rounded-lg border border-border bg-card p-1 shadow-sm">
              <button
                type="button"
                aria-label="Vue liste"
                onClick={() => setView('liste')}
                className={cn('flex size-8 items-center justify-center rounded-md transition-all duration-200', view === 'liste' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}
              >
                <List className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Vue grille"
                onClick={() => setView('grille')}
                className={cn('flex size-8 items-center justify-center rounded-md transition-all duration-200', view === 'grille' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}
              >
                <LayoutGrid className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Vue carte"
                onClick={() => setView('carte')}
                className={cn('flex size-8 items-center justify-center rounded-md transition-all duration-200', view === 'carte' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}
              >
                <MapPin className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* RESULTATS */}
        {filtered.length === 0 ? (
          <div className="mt-16 border border-dashed border-border py-20 text-center">
            <p className="font-serif text-2xl">Aucun bien ne correspond à ces critères.</p>
            <p className="mt-3 text-sm text-muted-foreground">Essayez d’élargir votre recherche ou contactez un conseiller.</p>
          </div>
        ) : view === 'grille' ? (
          <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : view === 'liste' ? (
          <div className="mt-10 flex flex-col divide-y divide-border border-t border-border">
            {filtered.map((property) => (
              <Link key={property.id} href={`/biens/${property.slug}`} className="group flex flex-col gap-5 py-6 sm:flex-row">
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:w-64">
                  <img src={property.images[0]} alt={property.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {property.transaction === 'vente' ? 'À vendre' : 'À louer'} · {categoryLabels[property.category]}
                    </p>
                    <h3 className="mt-2 font-serif text-xl transition-colors group-hover:text-primary">{property.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{property.district}, {property.city}</p>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{property.description}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {[`${property.surface} m²`, property.bedrooms ? `${property.bedrooms} ch.` : null, property.bathrooms ? `${property.bathrooms} sdb` : null]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                    <p className="text-base font-semibold text-primary">{propertyPriceDisplay(property)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <div className="relative overflow-hidden border border-border bg-[linear-gradient(135deg,var(--secondary)_25%,transparent_25%),linear-gradient(225deg,var(--secondary)_25%,transparent_25%),linear-gradient(45deg,var(--secondary)_25%,transparent_25%),linear-gradient(315deg,var(--secondary)_25%,var(--card)_25%)] bg-[length:40px_40px] p-6 lg:p-10">
              <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Répartition géographique · {groupedByCity.length} ville{groupedByCity.length > 1 ? 's' : ''}
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {groupedByCity.map(([city, list]) => (
                  <div key={city} className="border border-border bg-background/90 p-5 backdrop-blur">
                    <p className="flex items-center gap-2 font-serif text-lg">
                      <MapPin className="size-4 text-primary" /> {city}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{list.length} bien{list.length > 1 ? 's' : ''}</p>
                    <ul className="mt-4 space-y-2.5">
                      {list.slice(0, 4).map((p) => (
                        <li key={p.id}>
                          <Link href={`/biens/${p.slug}`} className="flex items-center justify-between gap-3 text-sm hover:text-primary">
                            <span className="truncate">{p.title}</span>
                            <span className="shrink-0 text-xs text-muted-foreground">{propertyPriceDisplay(p)}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-center text-xs text-muted-foreground">
                Carte interactive détaillée disponible sur notre page{' '}
                <Link href="/carte" className="text-primary underline underline-offset-4">
                  Explorer l’immobilier
                </Link>
                .
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
