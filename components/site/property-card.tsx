'use client'

import Link from 'next/link'
import { Heart, Share2 } from 'lucide-react'

import type { Property } from '@/lib/data'
import { propertyPriceDisplay } from '@/lib/data'
import { useFavorites } from '@/lib/store'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function PropertyCard({ property, className }: { property: Property; className?: string }) {
  const { isFavorite, toggle } = useFavorites()
  const fav = isFavorite(property.id)

  return (
    <article className={cn('group', className)}>
      <Link href={`/biens/${property.slug}`} className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-muted">
        <img
          src={property.images[0]}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge>{property.transaction === 'vente' ? 'À vendre' : 'À louer'}</Badge>
          {property.badges.map((badge) => (
            <Badge key={badge} variant="graphite">
              {badge}
            </Badge>
          ))}
        </div>
        <div className="absolute right-4 top-4 flex gap-2">
          <button
            type="button"
            aria-label={fav ? `Retirer ${property.title} des favoris` : `Ajouter ${property.title} aux favoris`}
            onClick={(e) => {
              e.preventDefault()
              toggle(property.id)
            }}
            className={cn(
              'flex size-9 items-center justify-center rounded-full bg-white/95 text-foreground transition-colors hover:text-primary',
              fav && 'text-primary',
            )}
          >
            <Heart className={cn('size-4', fav && 'fill-primary')} />
          </button>
          <button
            type="button"
            aria-label={`Partager ${property.title}`}
            onClick={(e) => e.preventDefault()}
            className="flex size-9 items-center justify-center rounded-full bg-white/95 text-foreground transition-colors hover:text-primary"
          >
            <Share2 className="size-4" />
          </button>
        </div>
      </Link>
      <div className="border-b border-border py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link href={`/biens/${property.slug}`}>
              <h3 className="font-serif text-lg leading-snug transition-colors group-hover:text-primary">{property.title}</h3>
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              {property.district}, {property.city}
            </p>
          </div>
          <p className="whitespace-nowrap text-right text-sm font-semibold text-primary">{propertyPriceDisplay(property)}</p>
        </div>
        <p className="mt-5 text-xs uppercase tracking-wider text-muted-foreground">
          {[
            `${property.surface} m²`,
            property.bedrooms ? `${property.bedrooms} ch.` : null,
            property.bathrooms ? `${property.bathrooms} sdb` : null,
          ]
            .filter(Boolean)
            .join(' · ')}
        </p>
      </div>
    </article>
  )
}
