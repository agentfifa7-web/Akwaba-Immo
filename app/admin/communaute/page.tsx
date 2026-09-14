import { challenges, communityPosts, formatDate } from '@/lib/data'
import { PageHeader, StatusPill, TableShell, Td, Th } from '@/components/admin/ui'

export default function AdminCommunityPage() {
  return (
    <div>
      <PageHeader title="Communauté" description="Modération des publications et des défis de la communauté KÔSMÉA." />

      <h2 className="mb-3 font-serif text-lg font-semibold">Publications récentes</h2>
      <TableShell>
        <thead><tr><Th>Auteur</Th><Th>Catégorie</Th><Th>Likes</Th><Th>Commentaires</Th><Th>Date</Th><Th>Statut</Th></tr></thead>
        <tbody>
          {communityPosts.map((p) => (
            <tr key={p.id}>
              <Td className="font-medium">{p.handle}</Td>
              <Td>{p.category}</Td>
              <Td>{p.likes}</Td>
              <Td>{p.comments}</Td>
              <Td className="text-muted-foreground">{formatDate(p.createdAt)}</Td>
              <Td><StatusPill status="publie" /></Td>
            </tr>
          ))}
        </tbody>
      </TableShell>

      <h2 className="mb-3 mt-10 font-serif text-lg font-semibold">Défis de looks</h2>
      <TableShell>
        <thead><tr><Th>Défi</Th><Th>Thème</Th><Th>Participations</Th><Th>Échéance</Th><Th>Statut</Th></tr></thead>
        <tbody>
          {challenges.map((c) => (
            <tr key={c.id}>
              <Td className="font-medium">{c.title}</Td>
              <Td className="max-w-xs truncate">{c.theme}</Td>
              <Td>{c.entriesCount}</Td>
              <Td className="text-muted-foreground">{formatDate(c.deadline)}</Td>
              <Td><StatusPill status={c.status === 'actif' ? 'actif' : 'inactif'} /></Td>
            </tr>
          ))}
        </tbody>
      </TableShell>
    </div>
  )
}
