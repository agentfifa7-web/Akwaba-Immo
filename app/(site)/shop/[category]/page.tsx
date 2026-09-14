'use client'

import { use, useMemo, useState } from 'react'
import { notFound } from 'next/navigation'

import { categories, products, type ProductCategory } from '@/lib/data'
import { ProductCard } from '@/components/site/product-card'
import { SectionHeading } from '@/components/site/section-heading'
import { cn } from '@/lib/utils'

export default function ShopCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params)
  const cat = categories.find((c) => c.id === category)
  const [subcategory, setSubcategory] = useState<string | null>(null)

  if (!cat) notFound()

  const filtered = useMemo(() => {
    return products.filter((p) => p.category === (category as ProductCategory) && (!subcategory || p.subcategory === subcategory))
  }, [category, subcategory])

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="Marketplace KÔSMÉA" title={cat.label} description={`${products.filter((p) => p.category === category).length} produits dans cette catégorie.`} />

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSubcategory(null)}
          className={cn('rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors', !subcategory ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}
        >
          Tout
        </button>
        {cat.subcategories.map((sub) => (
          <button
            key={sub}
            type="button"
            onClick={() => setSubcategory(sub)}
            className={cn('rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors', subcategory === sub ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}
          >
            {sub}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {filtered.length === 0 ? (
          <div className="border border-dashed border-border p-16 text-center text-sm text-muted-foreground">
            Aucun produit dans cette sous-catégorie pour le moment.
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
