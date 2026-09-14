'use client'

import Link from 'next/link'
import { Heart, Bookmark } from 'lucide-react'

import type { Look } from '@/lib/data'
import { formatFCFA, lookTotal } from '@/lib/data'
import { useWishlist } from '@/lib/store'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function LookCard({ look, className }: { look: Look; className?: string }) {
  const { isSaved, toggle } = useWishlist('looks')
  const saved = isSaved(look.id)
  const total = lookTotal(look)

  return (
    <article className={cn('group', className)}>
      <Link href={`/looks/${look.slug}`} className="relative block aspect-[3/4] overflow-hidden rounded-xl bg-muted">
        <img src={look.cover} alt={look.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/85 via-obsidian/10 to-transparent p-4">
          <Badge variant="white" className="mb-2">{look.category}</Badge>
          <h3 className="font-serif text-lg text-white">{look.title}</h3>
          <p className="mt-1 text-xs uppercase tracking-wider text-white/70">{look.author}</p>
        </div>
        <button
          type="button"
          aria-label={saved ? 'Retirer ce look' : 'Enregistrer ce look'}
          onClick={(e) => {
            e.preventDefault()
            toggle(look.id)
          }}
          className={cn('absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/95 text-foreground', saved && 'text-accent')}
        >
          <Bookmark className={cn('size-4', saved && 'fill-accent')} />
        </button>
      </Link>
      <div className="flex items-center justify-between py-3">
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Heart className="size-3.5" /> {look.likes.toLocaleString('fr-FR')}
        </p>
        <p className="text-sm font-semibold text-foreground">{formatFCFA(total)}</p>
      </div>
    </article>
  )
}
