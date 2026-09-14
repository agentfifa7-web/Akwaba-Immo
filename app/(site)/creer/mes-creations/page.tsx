'use client'

import Link from 'next/link'
import { Trash2 } from 'lucide-react'

import { formatDate } from '@/lib/data'
import { useCreations, type CreationType } from '@/lib/store'
import { SectionHeading } from '@/components/site/section-heading'
import { Badge } from '@/components/ui/badge'

const typeLabels: Record<CreationType, string> = {
  look: 'Look',
  tenue: 'Tenue',
  couleur: 'Couleur',
  maquillage: 'Maquillage',
}

export default function MyCreationsPage() {
  const { items, remove, hydrated } = useCreations()

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="My Creations" title="Mes créations" description="Tous vos looks, tenues, maquillages et teintes enregistrés depuis le studio de création." />

      {!hydrated ? (
        <div className="mt-10 h-40 animate-kosmea-shimmer rounded-xl" />
      ) : items.length === 0 ? (
        <div className="mt-10 border border-dashed border-border p-16 text-center">
          <p className="text-sm text-muted-foreground">Vous n’avez pas encore de création enregistrée.</p>
          <Link href="/creer" className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-accent hover:underline">
            Commencer à créer →
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((creation) => (
            <div key={creation.id} className="group relative overflow-hidden border border-border bg-card">
              {creation.cover ? (
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img src={creation.cover} alt={creation.title} className="h-full w-full object-cover" />
                </div>
              ) : (
                <div
                  className="aspect-[4/3]"
                  style={{ backgroundColor: creation.config.mixed ?? creation.config.outfitColor ?? '#D8C29D' }}
                />
              )}
              <div className="p-5">
                <Badge variant="outline">{typeLabels[creation.type]}</Badge>
                <h3 className="mt-2 font-serif text-lg leading-snug">{creation.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{creation.summary}</p>
                <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{formatDate(creation.createdAt)}</p>
              </div>
              <button
                type="button"
                onClick={() => remove(creation.id)}
                aria-label="Supprimer cette création"
                className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/95 text-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
