'use client'

import Link from 'next/link'
import { Shirt } from 'lucide-react'

import { productsByIds, formatFCFA } from '@/lib/data'
import { useOrders, useWishlist } from '@/lib/store'
import { Button } from '@/components/ui/button'

export default function DressingPage() {
  const { items: orders } = useOrders()
  const { ids: wishlistIds } = useWishlist('produits')

  const ownedIds = Array.from(new Set(orders.flatMap((o) => o.items.map((i) => i.productId))))
  const owned = productsByIds(ownedIds)
  const saved = productsByIds(wishlistIds).filter((p) => !ownedIds.includes(p.id))

  return (
    <div>
      <div className="flex items-center gap-2">
        <Shirt className="size-5 text-accent" />
        <h2 className="font-serif text-2xl">Mon dressing digital</h2>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Retrouvez vos achats et vos coups de cœur, et recréez un look en un clic.</p>

      <section className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Mes achats ({owned.length})</p>
        {owned.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">Vos achats apparaîtront ici après votre première commande.</p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {owned.map((p) => (
              <Link key={p.id} href={`/produits/${p.slug}`} className="border border-border p-2 hover:border-primary">
                <div className="aspect-square overflow-hidden rounded-lg bg-muted"><img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" /></div>
                <p className="mt-2 truncate text-xs font-medium">{p.name}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Mes envies ({saved.length})</p>
        {saved.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">Ajoutez des produits à vos favoris pour les retrouver ici.</p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {saved.map((p) => (
              <Link key={p.id} href={`/produits/${p.slug}`} className="border border-border p-2 hover:border-primary">
                <div className="aspect-square overflow-hidden rounded-lg bg-muted"><img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" /></div>
                <p className="mt-2 truncate text-xs font-medium">{p.name}</p>
                <p className="text-[11px] text-muted-foreground">{formatFCFA(p.price)}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Link href="/creer/look" className="mt-8 block">
        <Button className="w-full sm:w-auto">Créer un look avec ces articles</Button>
      </Link>
    </div>
  )
}
