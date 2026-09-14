'use client'

import Link from 'next/link'
import { Star } from 'lucide-react'

import { formatFCFA } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export interface ProviderCardProps {
  href: string
  photo: string
  name: string
  subtitle: string
  city: string
  specialties: string[]
  rating: number
  reviewsCount: number
  priceFrom: number
  badge?: string
  className?: string
}

export function ProviderCard({ href, photo, name, subtitle, city, specialties, rating, reviewsCount, priceFrom, badge, className }: ProviderCardProps) {
  return (
    <Link href={href} className={cn('group block overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg', className)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img src={photo} alt={name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {badge && (
          <Badge variant="white" className="absolute left-3 top-3">
            {badge}
          </Badge>
        )}
      </div>
      <div className="p-5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-accent">{subtitle}</p>
        <h3 className="mt-1 font-serif text-lg leading-snug transition-colors group-hover:text-accent">{name}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{city}</p>
        <p className="mt-3 flex flex-wrap gap-1.5">
          {specialties.slice(0, 3).map((s) => (
            <span key={s} className="rounded-full bg-muted px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
              {s}
            </span>
          ))}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-champagne text-champagne" /> {rating.toFixed(1)} ({reviewsCount})
          </p>
          <p className="text-xs font-semibold text-foreground">Dès {formatFCFA(priceFrom)}</p>
        </div>
      </div>
    </Link>
  )
}
