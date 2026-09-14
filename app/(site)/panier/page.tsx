'use client'

import Link from 'next/link'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'

import { formatFCFA, getBoutique } from '@/lib/data'
import { useCart } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/site/section-heading'

export default function CartPage() {
  const { linesByBoutique, totalPrice, totalCount, updateQuantity, remove, hydrated } = useCart()
  const boutiqueIds = Object.keys(linesByBoutique)

  if (!hydrated) return <div className="mx-auto max-w-5xl px-5 py-20"><div className="h-40 animate-kosmea-shimmer rounded-xl" /></div>

  if (totalCount === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center lg:px-10">
        <ShoppingBag className="mx-auto size-10 text-muted-foreground" />
        <h1 className="mt-4 font-serif text-3xl">Votre panier est vide</h1>
        <p className="mt-2 text-muted-foreground">Découvrez la marketplace et ajoutez vos premiers coups de cœur.</p>
        <Link href="/shop" className="mt-6 inline-block"><Button size="lg">Explorer le shop</Button></Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 lg:px-10 lg:py-20">
      <SectionHeading eyebrow={`${totalCount} article${totalCount > 1 ? 's' : ''}`} title="Mon panier" />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          {boutiqueIds.map((boutiqueId) => {
            const boutique = getBoutique(boutiqueId)
            const lines = linesByBoutique[boutiqueId]
            return (
              <div key={boutiqueId}>
                <Link href={`/boutiques/${boutique?.slug}`} className="text-sm font-semibold uppercase tracking-wider text-accent hover:underline">
                  {boutique?.name}
                </Link>
                <div className="mt-4 divide-y divide-border border-y border-border">
                  {lines.map((line) => (
                    <div key={`${line.productId}-${line.color}-${line.size}`} className="flex items-center gap-4 py-4">
                      <img src={line.product.images[0]} alt={line.product.name} className="size-20 shrink-0 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <Link href={`/produits/${line.product.slug}`} className="truncate font-medium text-foreground hover:text-accent">{line.product.name}</Link>
                        <p className="text-xs text-muted-foreground">{[line.color, line.size].filter(Boolean).join(' · ')}</p>
                        <p className="mt-1 text-sm font-semibold text-foreground">{formatFCFA(line.product.price)}</p>
                      </div>
                      <div className="flex shrink-0 items-center rounded-lg border border-border">
                        <button type="button" onClick={() => updateQuantity(line.productId, line.quantity - 1, line.color, line.size)} className="p-2.5"><Minus className="size-3.5" /></button>
                        <span className="w-6 text-center text-sm">{line.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(line.productId, line.quantity + 1, line.color, line.size)} className="p-2.5"><Plus className="size-3.5" /></button>
                      </div>
                      <button type="button" onClick={() => remove(line.productId, line.color, line.size)} aria-label="Retirer" className="shrink-0 text-muted-foreground hover:text-destructive">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <aside className="h-fit border border-border bg-card p-6">
          <p className="font-serif text-lg">Récapitulatif</p>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Sous-total</span>
            <span className="font-medium text-foreground">{formatFCFA(totalPrice)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Livraison</span>
            <span className="text-muted-foreground">Calculée à l’étape suivante</span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="font-semibold uppercase tracking-wider text-xs">Total</span>
            <span className="font-serif text-2xl">{formatFCFA(totalPrice)}</span>
          </div>
          <Link href="/commande" className="mt-5 block"><Button size="lg" className="w-full">Passer commande</Button></Link>
        </aside>
      </div>
    </div>
  )
}
