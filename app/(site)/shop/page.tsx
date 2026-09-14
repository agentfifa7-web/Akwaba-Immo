'use client'

import Link from 'next/link'
import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal } from 'lucide-react'

import { categories, products, type ProductCategory } from '@/lib/data'
import { ProductCard } from '@/components/site/product-card'
import { SectionHeading } from '@/components/site/section-heading'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
import { cn } from '@/lib/utils'

type SortMode = 'pertinence' | 'nouveautes' | 'prix_asc' | 'prix_desc' | 'notes'

function ShopContent() {
  const searchParams = useSearchParams()
  const initialSort = (searchParams.get('tri') as SortMode) ?? 'pertinence'
  const [activeCategories, setActiveCategories] = useState<ProductCategory[]>([])
  const [maxPrice, setMaxPrice] = useState(100000)
  const [sort, setSort] = useState<SortMode>(initialSort)

  const toggleCategory = (id: ProductCategory) => {
    setActiveCategories((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]))
  }

  const filtered = useMemo(() => {
    let list = products.filter((p) => (activeCategories.length === 0 || activeCategories.includes(p.category)) && p.price <= maxPrice)
    switch (sort) {
      case 'nouveautes':
        list = [...list].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        break
      case 'prix_asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'prix_desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'notes':
        list = [...list].sort((a, b) => b.rating - a.rating)
        break
      default:
        list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
    return list
  }, [activeCategories, maxPrice, sort])

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="Marketplace KÔSMÉA" title="Tout le shop" description="Beauté, mode, cheveux et accessoires : découvrez les produits de nos boutiques partenaires vérifiées." />

      <div className="mt-10 flex flex-col gap-10 lg:flex-row">
        <aside className="shrink-0 lg:w-64">
          <div className="sticky top-24 space-y-8">
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <SlidersHorizontal className="size-3.5" /> Catégories
              </p>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={cn(
                      'flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-left text-sm transition-colors',
                      activeCategories.includes(cat.id) ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40',
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Budget maximum</p>
              <input
                type="range"
                min={2000}
                max={100000}
                step={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <p className="mt-2 text-sm font-semibold text-foreground">{new Intl.NumberFormat('fr-FR').format(maxPrice)} FCFA</p>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">{filtered.length} produits</p>
            <Select value={sort} onChange={(e) => setSort(e.target.value as SortMode)} className="w-56">
              <option value="pertinence">Pertinence</option>
              <option value="nouveautes">Nouveautés</option>
              <option value="prix_asc">Prix croissant</option>
              <option value="prix_desc">Prix décroissant</option>
              <option value="notes">Mieux notés</option>
            </Select>
          </div>
          {filtered.length === 0 ? (
            <div className="border border-dashed border-border p-16 text-center text-sm text-muted-foreground">
              Aucun produit ne correspond à ces filtres pour le moment.
            </div>
          ) : (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/shop/${cat.id}`}>
            <Badge variant="outline">{cat.label} →</Badge>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopContent />
    </Suspense>
  )
}
