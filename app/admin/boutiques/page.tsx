import { boutiques, productsByBoutique } from '@/lib/data'
import { PageHeader, StatusPill, TableShell, Td, Th } from '@/components/admin/ui'

export default function AdminBoutiquesPage() {
  return (
    <div>
      <PageHeader title="Boutiques" description={`${boutiques.length} boutiques partenaires sur la marketplace.`} />
      <TableShell>
        <thead><tr><Th>Boutique</Th><Th>Ville</Th><Th>Catégories</Th><Th>Produits</Th><Th>Note</Th><Th>Statut</Th></tr></thead>
        <tbody>
          {boutiques.map((b) => (
            <tr key={b.id}>
              <Td className="font-medium">{b.name}</Td>
              <Td>{b.district}, {b.city}</Td>
              <Td className="capitalize">{b.categories.join(', ')}</Td>
              <Td>{productsByBoutique(b.id).length}</Td>
              <Td>{b.rating.toFixed(1)} ★ ({b.reviewsCount})</Td>
              <Td><StatusPill status={b.badge} /></Td>
            </tr>
          ))}
        </tbody>
      </TableShell>
    </div>
  )
}
