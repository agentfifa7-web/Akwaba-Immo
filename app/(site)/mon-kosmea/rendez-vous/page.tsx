'use client'

import { formatDate } from '@/lib/data'
import { useAppointments } from '@/lib/store'
import { Badge } from '@/components/ui/badge'

const statusVariant: Record<string, 'default' | 'outline' | 'muted'> = {
  en_attente: 'outline',
  confirme: 'default',
  annule: 'muted',
  termine: 'muted',
}
const statusLabels: Record<string, string> = {
  en_attente: 'En attente', confirme: 'Confirmé', annule: 'Annulé', termine: 'Terminé',
}

export default function AppointmentsPage() {
  const { items } = useAppointments()

  return (
    <div>
      <h2 className="font-serif text-2xl">Mes rendez-vous</h2>
      {items.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">Aucun rendez-vous réservé. Explorez nos <a href="/stylistes" className="text-accent hover:underline">stylistes</a> ou <a href="/professionnels" className="text-accent hover:underline">professionnels beauté</a>.</p>
      ) : (
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {items.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div>
                <p className="font-medium text-foreground">{a.serviceName}</p>
                <p className="text-sm text-muted-foreground">{a.providerName} · {a.providerType}</p>
                <p className="mt-1 text-xs text-muted-foreground">{formatDate(a.date)} à {a.time}</p>
              </div>
              <Badge variant={statusVariant[a.status]}>{statusLabels[a.status]}</Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
