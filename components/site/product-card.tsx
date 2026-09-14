'use client'

import Link from 'next/link'
import { Heart, Star } from 'lucide-react'

import type { Product } from '@/lib/data'
import { formatFCFA } from '@/lib/data'
import { useCart, useFavorites } from '@/lib/store'
import { Badge } from '@/components/ui/badge'
import { TryOnButton } from '@/components/site/try-on-panel'
import { cn } from '@/lib/utils'

const badgeVariant: Record<string, 'default' | 'graphite' | 'outline' | 'muted' | 'white'> = {
  'NOUVEAU': 'graphite',
  'PROMOTION': 'default',
  'EXCLUSIVITÉ': 'white',
  'BEST-SELLER': 'white',
}

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { isSaved, toggle } = useFavorites()
  const { add } = useCart()
  const fav = isSaved(product.id)

  return (
    <article className={cn('group', className)}>
      <Link href={`/produits/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden rounded-xl bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badges.map((badge) => (
            <Badge key={badge} variant={badgeVariant[badge] ?? 'outline'} className={badge === 'NOUVEAU' ? 'bg-obsidian text-obsidian-foreground' : undefined}>
              {badge}
            </Badge>
          ))}
        </div>
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            type="button"
            aria-label={fav ? `Retirer ${product.name} des favoris` : `Ajouter ${product.name} aux favoris`}
            onClick={(e) => {
              e.preventDefault()
              toggle(product.id)
            }}
            className={cn(
              'flex size-9 items-center justify-center rounded-full bg-white/95 text-foreground transition-colors hover:text-accent',
              fav && 'text-accent',
            )}
          >
            <Heart className={cn('size-4', fav && 'fill-accent')} />
          </button>
        </div>
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              add(product.id, 1)
            }}
            className="flex-1 rounded-lg bg-obsidian/95 px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-obsidian-foreground backdrop-blur"
          >
            Ajouter
          </button>
          <TryOnButton product={product} compact className="flex-1" />
        </div>
      </Link>
      <div className="py-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{product.brand}</p>
        <Link href={`/produits/${product.slug}`}>
          <h3 className="mt-1 font-serif text-base leading-snug transition-colors group-hover:text-accent">{product.name}</h3>
        </Link>
        <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-champagne text-champagne" />
          {product.rating.toFixed(1)} · {product.reviewsCount} avis
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-sm font-semibold text-foreground">{formatFCFA(product.price)}</p>
          {product.previousPrice && (
            <p className="text-xs text-muted-foreground line-through">{formatFCFA(product.previousPrice)}</p>
          )}
        </div>
      </div>
    </article>
  )
}
