import { PageHeader, StatusPill, TableShell, Td, Th } from '@/components/admin/ui'

const notifications = [
  { id: 'n1', title: 'Votre commande est prête', audience: 'Clients', channel: 'Push + E-mail', status: 'actif' },
  { id: 'n2', title: 'Nouvelle collection disponible', audience: 'Abonnés boutique', channel: 'Push', status: 'actif' },
  { id: 'n3', title: 'Votre styliste a répondu', audience: 'Clients', channel: 'Push + SMS', status: 'actif' },
  { id: 'n4', title: 'Live dans 15 minutes', audience: 'Abonnés créateur', channel: 'Push', status: 'en_attente' },
  { id: 'n5', title: 'Article de votre wishlist de retour en stock', audience: 'Clients', channel: 'E-mail', status: 'actif' },
  { id: 'n6', title: 'Nouveau cours disponible', audience: 'Élèves Academy', channel: 'E-mail', status: 'brouillon' },
]

export default function AdminNotificationsPage() {
  return (
    <div>
      <PageHeader title="Notifications" description="Modèles de notifications envoyées aux utilisateurs de la plateforme." />
      <TableShell>
        <thead><tr><Th>Notification</Th><Th>Audience</Th><Th>Canal</Th><Th>Statut</Th></tr></thead>
        <tbody>
          {notifications.map((n) => (
            <tr key={n.id}>
              <Td className="font-medium">{n.title}</Td>
              <Td>{n.audience}</Td>
              <Td className="text-muted-foreground">{n.channel}</Td>
              <Td><StatusPill status={n.status} /></Td>
            </tr>
          ))}
        </tbody>
      </TableShell>
    </div>
  )
}
