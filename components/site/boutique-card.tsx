import Link from 'next/link'
import { Star } from 'lucide-react'

import type { Boutique } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function BoutiqueCard({ boutique, className }: { boutique: Boutique; className?: string }) {
  return (
    <Link href={`/boutiques/${boutique.slug}`} className={cn('group block overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg', className)}>
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <img src={boutique.cover} alt={boutique.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <Badge variant="white" className="absolute left-3 top-3">{boutique.badge}</Badge>
      </div>
      <div className="flex items-center gap-3 p-5">
        <img src={boutique.logo} alt="" className="size-12 shrink-0 rounded-full border border-border object-cover" />
        <div className="min-w-0">
          <h3 className="truncate font-serif text-base leading-snug transition-colors group-hover:text-accent">{boutique.name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{boutique.district}, {boutique.city}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-champagne text-champagne" /> {boutique.rating.toFixed(1)} ({boutique.reviewsCount})
          </p>
        </div>
      </div>
    </Link>
  )
}
