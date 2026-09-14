import { products, formatFCFA } from '@/lib/data'
import { PageHeader, StatusPill, TableShell, Td, Th } from '@/components/admin/ui'

const promoted = products.filter((p) => p.badges.includes('PROMOTION'))

export default function AdminPromotionsPage() {
  return (
    <div>
      <PageHeader title="Promotions" description="Produits actuellement en promotion sur la marketplace." />
      <TableShell>
        <thead><tr><Th>Produit</Th><Th>Prix promo</Th><Th>Prix initial</Th><Th>Réduction</Th><Th>Statut</Th></tr></thead>
        <tbody>
          {promoted.map((p) => {
            const discount = p.previousPrice ? Math.round(100 - (p.price / p.previousPrice) * 100) : 0
            return (
              <tr key={p.id}>
                <Td className="font-medium">{p.name}</Td>
                <Td>{formatFCFA(p.price)}</Td>
                <Td className="text-muted-foreground line-through">{p.previousPrice ? formatFCFA(p.previousPrice) : '—'}</Td>
                <Td>-{discount}%</Td>
                <Td><StatusPill status="actif" /></Td>
              </tr>
            )
          })}
        </tbody>
      </TableShell>
    </div>
  )
}
