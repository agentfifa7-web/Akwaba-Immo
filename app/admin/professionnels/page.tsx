import { formatFCFA, professionals } from '@/lib/data'
import { PageHeader, StatusPill, TableShell, Td, Th } from '@/components/admin/ui'

export default function AdminProfessionalsPage() {
  return (
    <div>
      <PageHeader title="Professionnels beauté" description={`${professionals.length} maquilleuses, coiffeurs et salons référencés.`} />
      <TableShell>
        <thead><tr><Th>Nom</Th><Th>Rôle</Th><Th>Ville</Th><Th>Dès</Th><Th>Note</Th><Th>Statut</Th></tr></thead>
        <tbody>
          {professionals.map((p) => (
            <tr key={p.id}>
              <Td className="font-medium">{p.name}</Td>
              <Td>{p.role}</Td>
              <Td>{p.district}, {p.city}</Td>
              <Td>{formatFCFA(p.priceFrom)}</Td>
              <Td>{p.rating.toFixed(1)} ★ ({p.reviewsCount})</Td>
              <Td>{p.badge ? <StatusPill status={p.badge} /> : <StatusPill status="actif" />}</Td>
            </tr>
          ))}
        </tbody>
      </TableShell>
    </div>
  )
}
