'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import { Heart, Bookmark, Share2 } from 'lucide-react'

import { formatFCFA, getLookBySlug, lookTotal, productsByIds } from '@/lib/data'
import { useCart, useWishlist } from '@/lib/store'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function LookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const look = getLookBySlug(slug)
  if (!look) notFound()

  const items = productsByIds(look.productIds)
  const total = lookTotal(look)
  const { add } = useCart()
  const { isSaved, toggle } = useWishlist('looks')
  const saved = isSaved(look.id)
  const router = useRouter()

  function buyCompleteLook() {
    items.forEach((p) => add(p.id, 1, p.colors?.[0], p.sizes?.[0]))
    router.push('/panier')
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 lg:px-10 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-[4/5] overflow-hidden rounded-xl bg-muted">
          <img src={look.cover} alt={look.title} className="h-full w-full object-cover" />
        </div>
        <div>
          <Badge>{look.category}</Badge>
          <h1 className="mt-3 font-serif text-4xl leading-tight">{look.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Par <span className="font-semibold text-foreground">{look.author}</span> · {look.authorType}
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Heart className="size-4" /> {look.likes.toLocaleString('fr-FR')}</span>
            <span className="flex items-center gap-1"><Bookmark className="size-4" /> {look.saves.toLocaleString('fr-FR')}</span>
          </div>

          <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Complete the look</h2>
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-4 py-3">
                <img src={item.images[0]} alt={item.name} className="size-14 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <Link href={`/produits/${item.slug}`} className="truncate text-sm font-medium text-foreground hover:text-accent">{item.name}</Link>
                  <p className="text-xs text-muted-foreground">{item.subcategory}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-foreground">{formatFCFA(item.price)}</p>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between pt-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Total</p>
            <p className="font-serif text-2xl text-foreground">{formatFCFA(total)}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" className="flex-1" onClick={buyCompleteLook}>
              Acheter le look complet
            </Button>
            <Button size="lg" variant="outline" onClick={() => toggle(look.id)}>
              <Bookmark className={cn('size-4', saved && 'fill-accent text-accent')} /> {saved ? 'Enregistré' : 'Enregistrer'}
            </Button>
            <Button size="lg" variant="outline" aria-label="Partager">
              <Share2 className="size-4" />
            </Button>
          </div>
          <Link href="/stylistes" className="mt-4 block text-xs font-semibold uppercase tracking-wider text-accent hover:underline">
            Demander à un styliste de recréer ce look →
          </Link>
        </div>
      </div>
    </div>
  )
}
