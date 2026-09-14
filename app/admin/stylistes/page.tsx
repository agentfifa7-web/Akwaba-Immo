import { formatFCFA, stylists } from '@/lib/data'
import { PageHeader, StatusPill, TableShell, Td, Th } from '@/components/admin/ui'

export default function AdminStylistsPage() {
  return (
    <div>
      <PageHeader title="Stylistes" description={`${stylists.length} stylistes référencés sur la marketplace.`} />
      <TableShell>
        <thead><tr><Th>Styliste</Th><Th>Ville</Th><Th>Spécialités</Th><Th>Dès</Th><Th>Note</Th><Th>Statut</Th></tr></thead>
        <tbody>
          {stylists.map((s) => (
            <tr key={s.id}>
              <Td className="font-medium">{s.name}</Td>
              <Td>{s.city}</Td>
              <Td>{s.specialties.slice(0, 2).join(', ')}</Td>
              <Td>{formatFCFA(s.priceFrom)}</Td>
              <Td>{s.rating.toFixed(1)} ★ ({s.reviewsCount})</Td>
              <Td>{s.badge ? <StatusPill status={s.badge} /> : <StatusPill status="actif" />}</Td>
            </tr>
          ))}
        </tbody>
      </TableShell>
    </div>
  )
}
