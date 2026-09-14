'use client'

import { formatDate } from '@/lib/data'
import { useAppointments, type AppointmentStatus } from '@/lib/store'
import { EmptyState, PageHeader, TableShell, Td, Th } from '@/components/admin/ui'
import { Select } from '@/components/ui/select'

const statuses: AppointmentStatus[] = ['en_attente', 'confirme', 'termine', 'annule']

export default function ProAppointmentsPage() {
  const { items, updateStatus, hydrated } = useAppointments()

  return (
    <div>
      <PageHeader title="Réservations" description="Rendez-vous pris par vos clientes et clients." />
      {!hydrated ? (
        <EmptyState />
      ) : items.length === 0 ? (
        <EmptyState label="Aucune réservation pour le moment." />
      ) : (
        <TableShell>
          <thead><tr><Th>Client</Th><Th>Service</Th><Th>Date</Th><Th>Contact</Th><Th>Statut</Th></tr></thead>
          <tbody>
            {items.map((a) => (
              <tr key={a.id}>
                <Td className="font-medium">{a.name}</Td>
                <Td>{a.serviceName}</Td>
                <Td className="text-muted-foreground">{formatDate(a.date)} · {a.time}</Td>
                <Td className="text-muted-foreground">{a.phone}</Td>
                <Td>
                  <Select value={a.status} onChange={(e) => updateStatus(a.id, e.target.value as AppointmentStatus)} className="h-9 w-40 text-xs">
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      )}
    </div>
  )
}
