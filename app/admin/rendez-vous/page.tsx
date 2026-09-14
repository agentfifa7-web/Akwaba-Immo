'use client'

import { formatDate } from '@/lib/data'
import { useAppointments, useCustomRequests, type AppointmentStatus } from '@/lib/store'
import { EmptyState, PageHeader, StatusPill, TableShell, Td, Th } from '@/components/admin/ui'
import { Select } from '@/components/ui/select'

const statuses: AppointmentStatus[] = ['en_attente', 'confirme', 'termine', 'annule']

export default function AdminAppointmentsPage() {
  const { items, updateStatus, hydrated } = useAppointments()
  const { items: requests, hydrated: requestsHydrated } = useCustomRequests()

  return (
    <div>
      <PageHeader title="Réservations" description="Rendez-vous stylistes & professionnels beauté, et demandes de création sur mesure." />

      <h2 className="mb-3 font-serif text-lg font-semibold">Rendez-vous</h2>
      {!hydrated ? <EmptyState /> : items.length === 0 ? <EmptyState label="Aucun rendez-vous pour le moment." /> : (
        <TableShell>
          <thead><tr><Th>Client</Th><Th>Prestataire</Th><Th>Service</Th><Th>Date</Th><Th>Statut</Th></tr></thead>
          <tbody>
            {items.map((a) => (
              <tr key={a.id}>
                <Td className="font-medium">{a.name}</Td>
                <Td>{a.providerName} <span className="text-muted-foreground">({a.providerType})</span></Td>
                <Td>{a.serviceName}</Td>
                <Td className="text-muted-foreground">{formatDate(a.date)} · {a.time}</Td>
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

      <h2 className="mb-3 mt-10 font-serif text-lg font-semibold">Demandes de création sur mesure</h2>
      {!requestsHydrated ? <EmptyState /> : requests.length === 0 ? <EmptyState label="Aucune demande pour le moment." /> : (
        <TableShell>
          <thead><tr><Th>Client</Th><Th>Styliste</Th><Th>Demande</Th><Th>Budget</Th><Th>Statut</Th></tr></thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <Td className="font-medium">{r.name}</Td>
                <Td>{r.stylistName}</Td>
                <Td className="max-w-xs truncate">{r.title}</Td>
                <Td>{r.budget ? r.budget.toLocaleString('fr-FR') + ' FCFA' : '—'}</Td>
                <Td><StatusPill status={r.status} /></Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      )}
    </div>
  )
}
