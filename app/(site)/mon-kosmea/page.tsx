'use client'

import Link from 'next/link'
import { CalendarDays, Crown, Heart, Package, Sparkles } from 'lucide-react'

import { formatDate, formatFCFA } from '@/lib/data'
import { useAppointments, useCart, useOrders, usePoints, useWishlist } from '@/lib/store'

export default function MonKosmeaDashboard() {
  const { items: orders } = useOrders()
  const { items: appointments } = useAppointments()
  const { ids: wishlistIds } = useWishlist('produits')
  const { total: points, level } = usePoints()

  const upcoming = appointments.filter((a) => a.status !== 'annule' && a.status !== 'termine').slice(0, 3)

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="border border-border p-5">
          <Crown className="size-5 text-champagne" />
          <p className="mt-3 font-serif text-2xl">{level}</p>
          <p className="text-xs text-muted-foreground">{points.toLocaleString('fr-FR')} points</p>
        </div>
        <div className="border border-border p-5">
          <Package className="size-5 text-accent" />
          <p className="mt-3 font-serif text-2xl">{orders.length}</p>
          <p className="text-xs text-muted-foreground">Commandes</p>
        </div>
        <div className="border border-border p-5">
          <Heart className="size-5 text-accent" />
          <p className="mt-3 font-serif text-2xl">{wishlistIds.length}</p>
          <p className="text-xs text-muted-foreground">Favoris</p>
        </div>
        <div className="border border-border p-5">
          <CalendarDays className="size-5 text-accent" />
          <p className="mt-3 font-serif text-2xl">{upcoming.length}</p>
          <p className="text-xs text-muted-foreground">Rendez-vous à venir</p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section>
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl">Dernières commandes</h2>
            <Link href="/mon-kosmea/commandes" className="text-xs font-semibold uppercase tracking-wider text-accent hover:underline">Tout voir</Link>
          </div>
          {orders.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Aucune commande pour le moment.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {orders.slice(0, 4).map((o) => (
                <li key={o.id} className="flex items-center justify-between py-3 text-sm">
                  <span>#{o.id}</span>
                  <span className="text-muted-foreground">{formatDate(o.createdAt)}</span>
                  <span className="font-medium">{formatFCFA(o.total)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl">Prochains rendez-vous</h2>
            <Link href="/mon-kosmea/rendez-vous" className="text-xs font-semibold uppercase tracking-wider text-accent hover:underline">Tout voir</Link>
          </div>
          {upcoming.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Aucun rendez-vous prévu.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {upcoming.map((a) => (
                <li key={a.id} className="py-3 text-sm">
                  <p className="font-medium">{a.serviceName} — {a.providerName}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(a.date)} à {a.time}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="mt-10 flex flex-wrap gap-3 border-t border-border pt-8">
        <Link href="/essayer" className="flex items-center gap-1.5 rounded-lg bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
          <Sparkles className="size-3.5" /> Essayer un nouveau look
        </Link>
        <Link href="/creer/mes-creations" className="rounded-lg border border-border px-5 py-3 text-xs font-semibold uppercase tracking-wider hover:border-primary">Mes créations</Link>
        <Link href="/academy" className="rounded-lg border border-border px-5 py-3 text-xs font-semibold uppercase tracking-wider hover:border-primary">Mes formations</Link>
      </div>
    </div>
  )
}
