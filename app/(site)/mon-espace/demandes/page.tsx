'use client'

import Link from 'next/link'
import { MessageSquare } from 'lucide-react'

import { formatDate } from '@/lib/data'
import { useRequests, type RequestStatus } from '@/lib/store'
import { Badge } from '@/components/ui/badge'

const statusMeta: Record<RequestStatus, { label: string; variant: 'default' | 'outline' | 'muted' | 'graphite' }> = {
  nouvelle: { label: 'Nouvelle', variant: 'default' },
  en_cours: { label: 'En cours', variant: 'outline' },
  traitee: { label: 'Traitée', variant: 'graphite' },
  cloturee: { label: 'Clôturée', variant: 'muted' },
}

export default function MesDemandesPage() {
  const { items, hydrated } = useRequests()
  const sorted = [...items].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))

  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Espace client</p>
      <h2 className="font-serif text-2xl leading-tight sm:text-3xl">Mes demandes</h2>
      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
        Retrouvez l’historique de vos demandes d’information, d’estimation ou d’accompagnement.
      </p>

      {!hydrated && <div className="mt-10 h-48 animate-pulse bg-muted" />}

      {hydrated && sorted.length === 0 && (
        <div className="mt-10 flex flex-col items-start gap-4 border border-dashed border-border p-10 text-center sm:items-center">
          <MessageSquare className="size-8 text-muted-foreground" />
          <p className="font-serif text-xl">Vous n’avez pas encore de demande</p>
          <p className="max-w-md leading-7 text-muted-foreground">
            Contactez-nous pour une estimation, une information sur un bien ou tout autre projet immobilier.
          </p>
          <Link
            href="/contact"
            className="mt-2 bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Contacter un conseiller
          </Link>
        </div>
      )}

      {hydrated && sorted.length > 0 && (
        <div className="mt-10 flex flex-col divide-y divide-border border border-border">
          {sorted.map((request) => {
            const meta = statusMeta[request.status]
            return (
              <div key={request.id} className="flex flex-col gap-2 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="outline">{request.type}</Badge>
                    <p className="font-serif text-lg">{request.subject}</p>
                  </div>
                  <Badge variant={meta.variant}>{meta.label}</Badge>
                </div>
                {request.propertyTitle && (
                  <p className="text-sm text-muted-foreground">Concerne : {request.propertyTitle}</p>
                )}
                <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{request.message}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {formatDate(request.createdAt)}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
