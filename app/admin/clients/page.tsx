import { PageHeader, StatusPill, TableShell, Td, Th } from '@/components/admin/ui'

const users = [
  { id: 'u1', name: 'Marie-Claire Kouassi', email: 'marie.kouassi@email.com', type: 'client', points: 1240, status: 'actif' },
  { id: 'u2', name: 'Nadège Aka', email: 'nadege.aka@email.com', type: 'client', points: 6420, status: 'actif' },
  { id: 'u3', name: 'Ismaël Sanogo', email: 'ismael.sanogo@email.com', type: 'client', points: 380, status: 'actif' },
  { id: 'u4', name: 'Éclat de Cocody', email: 'contact@eclatdecocody.ci', type: 'vendeur', points: 0, status: 'actif' },
  { id: 'u5', name: 'Aïcha Styling', email: 'aicha.styling@email.com', type: 'styliste', points: 0, status: 'actif' },
  { id: 'u6', name: 'Linda Makeup', email: 'linda.makeup@email.com', type: 'professionnel', points: 0, status: 'actif' },
  { id: 'u7', name: 'Boris D.', email: 'boris.d@email.com', type: 'client', points: 95, status: 'inactif' },
  { id: 'u8', name: 'Grace N.', email: 'grace.n@email.com', type: 'client', points: 2140, status: 'actif' },
]

export default function AdminUsersPage() {
  return (
    <div>
      <PageHeader title="Utilisateurs" description="Clients, boutiques, stylistes et professionnels inscrits sur KÔSMÉA." />
      <TableShell>
        <thead><tr><Th>Nom</Th><Th>E-mail</Th><Th>Type de compte</Th><Th>Points</Th><Th>Statut</Th></tr></thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <Td className="font-medium">{u.name}</Td>
              <Td className="text-muted-foreground">{u.email}</Td>
              <Td className="capitalize">{u.type}</Td>
              <Td>{u.points.toLocaleString('fr-FR')}</Td>
              <Td><StatusPill status={u.status} /></Td>
            </tr>
          ))}
        </tbody>
      </TableShell>
    </div>
  )
}
