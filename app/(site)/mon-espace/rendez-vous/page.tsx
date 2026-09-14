'use client'

import Link from 'next/link'
import { CalendarDays } from 'lucide-react'

import { formatDate } from '@/lib/data'
import { useAppointments, type AppointmentStatus } from '@/lib/store'
import { Badge } from '@/components/ui/badge'

const statusMeta: Record<AppointmentStatus, { label: string; dot: string; variant: 'default' | 'outline' | 'muted' | 'graphite' }> = {
  en_attente: { label: 'En attente', dot: '🟡', variant: 'outline' },
  confirme: { label: 'Confirmé', dot: '🟢', variant: 'default' },
  annule: { label: 'Annulé', dot: '🔴', variant: 'muted' },
  termine: { label: 'Terminé', dot: '🔵', variant: 'graphite' },
}

export default function MesRendezVousPage() {
  const { items, updateStatus, hydrated } = useAppointments()
  const sorted = [...items].sort((a, b) => (a.date + a.time < b.date + b.time ? 1 : -1))

  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Espace client</p>
      <h2 className="font-serif text-2xl leading-tight sm:text-3xl">Mes rendez-vous</h2>
      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
        Suivez vos visites, consultations et rendez-vous pris avec nos conseillers.
      </p>

      {!hydrated && <div className="mt-10 h-48 animate-pulse bg-muted" />}

      {hydrated && sorted.length === 0 && (
        <div className="mt-10 flex flex-col items-start gap-4 border border-dashed border-border p-10 text-center sm:items-center">
          <CalendarDays className="size-8 text-muted-foreground" />
          <p className="font-serif text-xl">Vous n’avez pas encore de rendez-vous</p>
          <p className="max-w-md leading-7 text-muted-foreground">
            Prenez rendez-vous depuis la fiche d’un bien ou notre page contact pour planifier une visite.
          </p>
          <Link
            href="/biens"
            className="mt-2 bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voir les biens
          </Link>
        </div>
      )}

      {hydrated && sorted.length > 0 && (
        <div className="mt-10 flex flex-col divide-y divide-border border border-border">
          {sorted.map((appointment) => {
            const meta = statusMeta[appointment.status]
            return (
              <div key={appointment.id} className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-serif text-lg">{appointment.type}</p>
                    <Badge variant={meta.variant}>
                      {meta.dot} {meta.label}
                    </Badge>
                  </div>
                  {appointment.propertyTitle && (
                    <p className="mt-1 text-sm text-muted-foreground">{appointment.propertyTitle}</p>
                  )}
                  <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                    {formatDate(appointment.date)} à {appointment.time}
                    {appointment.advisor ? ` · Conseiller : ${appointment.advisor}` : ''}
                  </p>
                </div>
                {appointment.status === 'en_attente' && (
                  <button
                    type="button"
                    onClick={() => updateStatus(appointment.id, 'annule')}
                    className="shrink-0 border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    Annuler
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
