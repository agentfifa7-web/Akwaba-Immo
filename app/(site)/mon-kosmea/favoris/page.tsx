'use client'

import { useState } from 'react'
import Link from 'next/link'

import { boutiques, courses, formatFCFA, looks, productsByIds, stylists } from '@/lib/data'
import { useWishlist, type WishlistType } from '@/lib/store'
import { Tabs } from '@/components/ui/tabs'

const tabs: { value: WishlistType; label: string }[] = [
  { value: 'produits', label: 'Produits' },
  { value: 'looks', label: 'Looks' },
  { value: 'stylistes', label: 'Stylistes' },
  { value: 'boutiques', label: 'Boutiques' },
  { value: 'cours', label: 'Formations' },
]

export default function FavoritesPage() {
  const [tab, setTab] = useState<WishlistType>('produits')
  const { ids } = useWishlist(tab)

  return (
    <div>
      <h2 className="font-serif text-2xl">Mes favoris</h2>
      <div className="mt-4"><Tabs items={tabs} value={tab} onChange={(v) => setTab(v as WishlistType)} /></div>

      {ids.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">Rien dans cette catégorie pour le moment.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {tab === 'produits' && productsByIds(ids).map((p) => (
            <Link key={p.id} href={`/produits/${p.slug}`} className="border border-border p-2 hover:border-primary">
              <div className="aspect-square overflow-hidden rounded-lg bg-muted"><img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" /></div>
              <p className="mt-2 truncate text-xs font-medium">{p.name}</p>
              <p className="text-[11px] text-muted-foreground">{formatFCFA(p.price)}</p>
            </Link>
          ))}
          {tab === 'looks' && looks.filter((l) => ids.includes(l.id)).map((l) => (
            <Link key={l.id} href={`/looks/${l.slug}`} className="border border-border p-2 hover:border-primary">
              <div className="aspect-square overflow-hidden rounded-lg bg-muted"><img src={l.cover} alt={l.title} className="h-full w-full object-cover" /></div>
              <p className="mt-2 truncate text-xs font-medium">{l.title}</p>
            </Link>
          ))}
          {tab === 'stylistes' && stylists.filter((s) => ids.includes(s.id)).map((s) => (
            <Link key={s.id} href={`/stylistes/${s.slug}`} className="border border-border p-2 hover:border-primary">
              <div className="aspect-square overflow-hidden rounded-lg bg-muted"><img src={s.photo} alt={s.name} className="h-full w-full object-cover" /></div>
              <p className="mt-2 truncate text-xs font-medium">{s.name}</p>
            </Link>
          ))}
          {tab === 'boutiques' && boutiques.filter((b) => ids.includes(b.id)).map((b) => (
            <Link key={b.id} href={`/boutiques/${b.slug}`} className="border border-border p-2 hover:border-primary">
              <div className="aspect-square overflow-hidden rounded-lg bg-muted"><img src={b.cover} alt={b.name} className="h-full w-full object-cover" /></div>
              <p className="mt-2 truncate text-xs font-medium">{b.name}</p>
            </Link>
          ))}
          {tab === 'cours' && courses.filter((c) => ids.includes(c.id)).map((c) => (
            <Link key={c.id} href={`/academy/${c.slug}`} className="border border-border p-2 hover:border-primary">
              <div className="aspect-square overflow-hidden rounded-lg bg-muted"><img src={c.cover} alt={c.title} className="h-full w-full object-cover" /></div>
              <p className="mt-2 truncate text-xs font-medium">{c.title}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
