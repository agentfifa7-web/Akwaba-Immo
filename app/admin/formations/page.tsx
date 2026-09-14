import { courses, formatFCFA } from '@/lib/data'
import { PageHeader, StatusPill, TableShell, Td, Th } from '@/components/admin/ui'

export default function AdminCoursesPage() {
  return (
    <div>
      <PageHeader title="Formations" description={`${courses.length} formations disponibles sur la Beauty Academy.`} />
      <TableShell>
        <thead><tr><Th>Cours</Th><Th>Catégorie</Th><Th>Niveau</Th><Th>Instructeur</Th><Th>Prix</Th><Th>Élèves</Th></tr></thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id}>
              <Td className="font-medium">{c.title}</Td>
              <Td>{c.category}</Td>
              <Td><StatusPill status="actif" /> <span className="ml-1 text-xs text-muted-foreground">{c.level}</span></Td>
              <Td>{c.instructor}</Td>
              <Td>{c.price === 0 ? 'Gratuit' : formatFCFA(c.price)}</Td>
              <Td>{c.studentsCount.toLocaleString('fr-FR')}</Td>
            </tr>
          ))}
        </tbody>
      </TableShell>
    </div>
  )
}
