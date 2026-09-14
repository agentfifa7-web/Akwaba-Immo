'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import { MapPin, MessageCircle, Star, Truck } from 'lucide-react'

import { getBoutiqueBySlug, productsByBoutique } from '@/lib/data'
import { ProductCard } from '@/components/site/product-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function BoutiquePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const boutique = getBoutiqueBySlug(slug)
  if (!boutique) notFound()

  const boutiqueProducts = productsByBoutique(boutique.id)

  return (
    <div>
      <div className="relative h-64 overflow-hidden bg-muted sm:h-80">
        <img src={boutique.cover} alt={boutique.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-obsidian/10 to-transparent" />
      </div>
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="-mt-14 flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <img src={boutique.logo} alt="" className="size-24 shrink-0 rounded-full border-4 border-background object-cover shadow-lg" />
            <div>
              <Badge variant="graphite">{boutique.badge}</Badge>
              <h1 className="mt-2 font-serif text-3xl">{boutique.name}</h1>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4" /> {boutique.district}, {boutique.city}
              </p>
            </div>
          </div>
          <a href={`https://wa.me/${boutique.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">
            <Button size="lg" className="gap-2">
              <MessageCircle className="size-4" /> Contacter sur WhatsApp
            </Button>
          </a>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="leading-7 text-muted-foreground">{boutique.story}</p>
            <h2 className="mt-10 font-serif text-2xl">Catalogue ({boutiqueProducts.length})</h2>
            <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {boutiqueProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="border border-border bg-card p-6">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Star className="size-4 fill-champagne text-champagne" /> {boutique.rating.toFixed(1)} ({boutique.reviewsCount} avis)
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{boutique.followers.toLocaleString('fr-FR')} abonnés</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Horaires</p>
              <p className="mt-1 text-sm text-foreground">{boutique.openingHours}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Livraison</p>
              <ul className="mt-1 space-y-1">
                {boutique.delivery.map((d) => (
                  <li key={d} className="flex items-center gap-1.5 text-sm text-foreground">
                    <Truck className="size-3.5 text-accent" /> {d}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sur KÔSMÉA depuis</p>
              <p className="mt-1 text-sm text-foreground">{boutique.since}</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
