'use client'

import Link from 'next/link'
import { properties, formatFCFA, type Property, type ProgramStatus } from '@/lib/data'
import { useAdminCollection } from '@/lib/store'
import { PageHeader, TableShell, Th, Td, EmptyState } from '@/components/admin/ui'
import { Select } from '@/components/ui/select'

const suiviOptions: { value: ProgramStatus; label: string }[] = [
  { value: 'a_venir', label: 'À qualifier' },
  { value: 'en_commercialisation', label: 'En commercialisation' },
  { value: 'en_construction', label: 'Dossier en instruction' },
  { value: 'livre', label: 'Vendu / clôturé' },
]

export default function AdminTerrainsPage() {
  const { items, update, hydrated } = useAdminCollection<Property>('properties', properties)
  const terrains = items.filter((p) => p.category === 'terrain')

  return (
    <div>
      <PageHeader
        title="Terrains"
        description={
          "Vue filtrée du catalogue « Biens » dédiée au suivi foncier. Cette liste ne contient que les biens de catégorie " +
          "terrain — pour créer ou modifier une fiche, utilisez le module Biens."
        }
        action={
          <Link href="/admin/biens" className="text-xs font-semibold uppercase tracking-wider text-primary hover:underline">
            Gérer dans « Biens »
          </Link>
        }
      />

      {!hydrated ? (
        <EmptyState />
      ) : terrains.length === 0 ? (
        <EmptyState label="Aucun terrain dans le catalogue." />
      ) : (
        <TableShell>
          <thead>
            <tr>
              <Th>Parcelle</Th>
              <Th>Ville</Th>
              <Th>Surface</Th>
              <Th>Transaction</Th>
              <Th>Prix</Th>
              <Th>Suivi foncier</Th>
            </tr>
          </thead>
          <tbody>
            {terrains.map((p) => (
              <tr key={p.id}>
                <Td className="font-medium">{p.title}</Td>
                <Td>{p.city} — {p.district}</Td>
                <Td>{p.surface} m²</Td>
                <Td className="capitalize">{p.transaction}</Td>
                <Td>{formatFCFA(p.price)}</Td>
                <Td>
                  <Select
                    className="h-9 w-56"
                    value={p.programStatus ?? 'a_venir'}
                    onChange={(e) => update(p.id, { programStatus: e.target.value as ProgramStatus })}
                  >
                    {suiviOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
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
