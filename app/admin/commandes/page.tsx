'use client'

import { formatDate, formatFCFA } from '@/lib/data'
import { useOrders, type OrderStatus } from '@/lib/store'
import { EmptyState, PageHeader, TableShell, Td, Th } from '@/components/admin/ui'
import { Select } from '@/components/ui/select'

const statuses: OrderStatus[] = ['recue', 'paiement_confirme', 'preparation', 'prete', 'expediee', 'en_livraison', 'livree']

export default function AdminOrdersPage() {
  const { items, updateStatus, hydrated } = useOrders()

  return (
    <div>
      <PageHeader title="Commandes" description="Toutes les commandes passées sur la marketplace KÔSMÉA." />
      {!hydrated ? <EmptyState /> : items.length === 0 ? <EmptyState label="Aucune commande pour le moment." /> : (
        <TableShell>
          <thead><tr><Th>Commande</Th><Th>Articles</Th><Th>Total</Th><Th>Livraison</Th><Th>Date</Th><Th>Statut</Th></tr></thead>
          <tbody>
            {items.map((o) => (
              <tr key={o.id}>
                <Td className="font-medium">#{o.id}</Td>
                <Td>{o.items.length}</Td>
                <Td>{formatFCFA(o.total)}</Td>
                <Td className="text-muted-foreground">{o.deliveryMethod}</Td>
                <Td className="text-muted-foreground">{formatDate(o.createdAt)}</Td>
                <Td>
                  <Select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value as OrderStatus)} className="h-9 w-44 text-xs">
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
