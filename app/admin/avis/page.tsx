import { boutiques, testimonials } from '@/lib/data'
import { PageHeader, StatusPill, TableShell, Td, Th } from '@/components/admin/ui'

export default function AdminReviewsPage() {
  return (
    <div>
      <PageHeader title="Avis" description="Avis clients et notation des boutiques partenaires." />

      <h2 className="mb-3 font-serif text-lg font-semibold">Notation des boutiques</h2>
      <TableShell>
        <thead><tr><Th>Boutique</Th><Th>Note moyenne</Th><Th>Nombre d’avis</Th><Th>Statut</Th></tr></thead>
        <tbody>
          {boutiques.map((b) => (
            <tr key={b.id}>
              <Td className="font-medium">{b.name}</Td>
              <Td>{b.rating.toFixed(1)} ★</Td>
              <Td>{b.reviewsCount}</Td>
              <Td><StatusPill status="publie" /></Td>
            </tr>
          ))}
        </tbody>
      </TableShell>

      <h2 className="mb-3 mt-10 font-serif text-lg font-semibold">Témoignages mis en avant</h2>
      <TableShell>
        <thead><tr><Th>Client</Th><Th>Ville</Th><Th>Note</Th><Th>Extrait</Th></tr></thead>
        <tbody>
          {testimonials.map((t) => (
            <tr key={t.id}>
              <Td className="font-medium">{t.name}</Td>
              <Td>{t.city}</Td>
              <Td>{t.rating} ★</Td>
              <Td className="max-w-md truncate text-muted-foreground">{t.quote}</Td>
            </tr>
          ))}
        </tbody>
      </TableShell>
    </div>
  )
}
