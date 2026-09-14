'use client'

import { Trash2 } from 'lucide-react'

import { formatDate } from '@/lib/data'
import { useAppointments, type AppointmentStatus } from '@/lib/store'
import { PageHeader, TableShell, Th, Td, EmptyState, StatusPill } from '@/components/admin/ui'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const statusOptions: AppointmentStatus[] = ['en_attente', 'confirme', 'annule', 'termine']
const statusLabels: Record<AppointmentStatus, string> = {
  en_attente: 'En attente',
  confirme: 'Confirmé',
  annule: 'Annulé',
  termine: 'Terminé',
}

export default function AdminRendezVousPage() {
  const { items, updateStatus, remove, hydrated } = useAppointments()
  const sorted = [...items].sort((a, b) => (a.date + a.time < b.date + b.time ? 1 : -1))

  function handleRemove(id: string, name: string) {
    if (confirm(`Supprimer le rendez-vous de « ${name} » ?`)) remove(id)
  }

  return (
    <div>
      <PageHeader
        title="Rendez-vous"
        description="Agenda des visites, consultations et estimations planifiées depuis le site public."
      />

      {!hydrated ? (
        <EmptyState />
      ) : sorted.length === 0 ? (
        <EmptyState label="Aucun rendez-vous planifié." />
      ) : (
        <TableShell>
          <thead>
            <tr>
              <Th>Client</Th>
              <Th>Type</Th>
              <Th>Bien / objet</Th>
              <Th>Date & heure</Th>
              <Th>Conseiller</Th>
              <Th>Statut</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((a) => (
              <tr key={a.id}>
                <Td>
                  <div className="flex flex-col">
                    <span className="font-medium">{a.name}</span>
                    <span className="text-xs text-muted-foreground">{a.email} · {a.phone}</span>
                  </div>
                </Td>
                <Td>{a.type}</Td>
                <Td className="text-muted-foreground">{a.propertyTitle ?? '—'}</Td>
                <Td className="text-muted-foreground">{formatDate(a.date)} · {a.time}</Td>
                <Td className="text-muted-foreground">{a.advisor ?? '—'}</Td>
                <Td>
                  <div className="flex flex-col gap-1.5">
                    <StatusPill status={a.status} />
                    <Select
                      className="h-8 w-36 text-xs"
                      value={a.status}
                      onChange={(e) => updateStatus(a.id, e.target.value as AppointmentStatus)}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{statusLabels[s]}</option>
                      ))}
                    </Select>
                  </div>
                </Td>
                <Td>
                  <div className="flex justify-end">
                    <Button size="icon-sm" variant="destructive" aria-label="Supprimer" onClick={() => handleRemove(a.id, a.name)}>
                      <Trash2 />
                    </Button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      )}
    </div>
  )
}
