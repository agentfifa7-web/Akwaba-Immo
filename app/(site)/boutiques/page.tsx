'use client'

import { useMemo, useState } from 'react'

import { boutiques, categories, type ProductCategory } from '@/lib/data'
import { BoutiqueCard } from '@/components/site/boutique-card'
import { SectionHeading } from '@/components/site/section-heading'
import { cn } from '@/lib/utils'

export default function BoutiquesPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(null)

  const filtered = useMemo(
    () => boutiques.filter((b) => !activeCategory || b.categories.includes(activeCategory)),
    [activeCategory],
  )

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="Marketplace multi-boutiques" title="Nos boutiques partenaires" description="Chaque boutique est vérifiée par notre équipe avant sa mise en ligne : logo, catalogue, avis, localisation et livraison." />

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={cn('rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider', !activeCategory ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}
        >
          Toutes
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={cn('rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider', activeCategory === cat.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((b) => (
          <BoutiqueCard key={b.id} boutique={b} />
        ))}
      </div>
    </div>
  )
}
