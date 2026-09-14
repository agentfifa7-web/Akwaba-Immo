import { liveSessions } from '@/lib/data'
import { formatDate } from '@/lib/data'
import { PageHeader, StatusPill, TableShell, Td, Th } from '@/components/admin/ui'

export default function AdminLivePage() {
  return (
    <div>
      <PageHeader title="Live Shopping" description="Sessions KÔSMÉA Live programmées, en cours et passées." />
      <TableShell>
        <thead><tr><Th>Session</Th><Th>Hôte</Th><Th>Date</Th><Th>Spectateurs</Th><Th>Statut</Th></tr></thead>
        <tbody>
          {liveSessions.map((l) => (
            <tr key={l.id}>
              <Td className="font-medium">{l.title}</Td>
              <Td>{l.host}</Td>
              <Td className="text-muted-foreground">{formatDate(l.scheduledAt.slice(0, 10))}</Td>
              <Td>{l.viewers.toLocaleString('fr-FR')}</Td>
              <Td><StatusPill status={l.status === 'live' ? 'actif' : l.status === 'a_venir' ? 'en_attente' : 'termine'} /></Td>
            </tr>
          ))}
        </tbody>
      </TableShell>
    </div>
  )
}
