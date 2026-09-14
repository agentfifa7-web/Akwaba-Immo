'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, UserSearch } from 'lucide-react'

import { formatFCFA, products, type Product } from '@/lib/data'
import { useAvatar, useCart } from '@/lib/store'
import { AvatarPreview } from '@/components/site/avatar-preview'
import { SectionHeading } from '@/components/site/section-heading'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const hairColors = [
  { name: 'Noir profond', hex: '#171310' },
  { name: 'Brun chocolat', hex: '#4a2e1c' },
  { name: 'Auburn', hex: '#7a3b23' },
  { name: 'Blond miel', hex: '#c99a52' },
  { name: 'Bordeaux', hex: '#5a1f2b' },
]

const hairProducts = products.filter((p) => p.category === 'cheveux')

export default function HairTryOnPage() {
  const { config, update } = useAvatar()
  const { add } = useCart()
  const [selected, setSelected] = useState<Product | null>(null)

  function tryStyle(product: Product) {
    setSelected(product)
    update({ hairstyle: product.name, hairLength: product.sizes?.[product.sizes.length - 1] ?? config.hairLength })
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="Hair Studio" title="Essayage coiffure virtuel" description="Essayez perruques, tresses et couleurs avant d’acheter, ou trouvez un coiffeur près de vous." />

      <div className="mt-12 grid gap-10 lg:grid-cols-[340px_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <AvatarPreview config={config} className="aspect-[3/4] w-full" />
          <div className="mt-4 border border-border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Couleur</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {hairColors.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => update({ hairColor: c.hex })}
                  className={cn('size-9 rounded-full border-2', config.hairColor === c.hex ? 'border-primary' : 'border-transparent')}
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.name}
                />
              ))}
            </div>
            {selected && (
              <div className="mt-4 border-t border-border pt-4">
                <p className="font-serif text-lg">{selected.name}</p>
                <p className="text-sm text-muted-foreground">{formatFCFA(selected.price)}</p>
                <Button className="mt-3 w-full gap-2" onClick={() => add(selected.id, 1)}>
                  <ShoppingBag className="size-4" /> Acheter cette coiffure
                </Button>
              </div>
            )}
            <Link href="/professionnels?role=Coiffeur·se" className="mt-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent hover:underline">
              <UserSearch className="size-3.5" /> Trouver un coiffeur
            </Link>
          </div>
        </div>

        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {hairProducts.map((p) => (
            <article key={p.id} className="group">
              <button type="button" onClick={() => tryStyle(p)} className="relative block aspect-[4/5] w-full overflow-hidden rounded-xl bg-muted">
                <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-3 bottom-3 rounded-lg bg-obsidian/90 py-2.5 text-center text-[10px] font-semibold uppercase tracking-wider text-white opacity-0 transition-opacity group-hover:opacity-100">
                  Essayer
                </span>
              </button>
              <div className="py-3">
                <p className="font-serif text-base">{p.name}</p>
                <p className="text-sm text-muted-foreground">{formatFCFA(p.price)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
