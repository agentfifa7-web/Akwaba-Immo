'use client'

import { useState } from 'react'

import { formatFCFA, getBoutique, products, type Product } from '@/lib/data'
import { useAdminCollection } from '@/lib/store'
import { EmptyState, PageHeader, StatusPill, TableShell, Td, Th } from '@/components/admin/ui'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

export default function AdminProductsPage() {
  const { items, remove, hydrated } = useAdminCollection<Product>('produits', products)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Toutes')

  const filtered = items.filter(
    (p) => (category === 'Toutes' || p.category === category) && (!search || p.name.toLowerCase().includes(search.toLowerCase())),
  )

  return (
    <div>
      <PageHeader title="Produits" description={`${products.length} produits référencés sur la marketplace.`} />

      <div className="mb-5 flex flex-wrap gap-3">
        <Input placeholder="Rechercher un produit…" value={search} onChange={(e) => setSearch(e.target.value)} className="w-64" />
        <Select value={category} onChange={(e) => setCategory(e.target.value)} className="w-48">
          <option>Toutes</option>
          <option value="beaute">Beauté</option>
          <option value="mode">Mode</option>
          <option value="cheveux">Cheveux</option>
          <option value="accessoires">Accessoires</option>
        </Select>
      </div>

      {!hydrated ? (
        <EmptyState />
      ) : filtered.length === 0 ? (
        <EmptyState label="Aucun produit ne correspond à cette recherche." />
      ) : (
        <TableShell>
          <thead><tr><Th>Produit</Th><Th>Boutique</Th><Th>Catégorie</Th><Th>Prix</Th><Th>Stock</Th><Th>Statut</Th></tr></thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <Td className="font-medium">{p.name}</Td>
                <Td>{getBoutique(p.boutiqueId)?.name}</Td>
                <Td className="capitalize">{p.category}</Td>
                <Td>{formatFCFA(p.price)}</Td>
                <Td>{p.stock}</Td>
                <Td><StatusPill status={p.stock > 0 ? 'actif' : 'inactif'} /></Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      )}
    </div>
  )
}
