'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

import { formatFCFA, productsByBoutique, type Product } from '@/lib/data'
import { useAdminCollection } from '@/lib/store'
import { PageHeader, StatusPill, TableShell, Td, Th, slugify } from '@/components/admin/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const MY_BOUTIQUE_ID = 'bq-1'
const seed = productsByBoutique(MY_BOUTIQUE_ID)

export default function ProProductsPage() {
  const { items, add, remove, hydrated } = useAdminCollection<Product>('pro_products', seed)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !price) return
    const slug = slugify(name)
    add({
      id: `pd-pro-${Date.now()}`, slug, name, brand: 'Ma boutique', category: 'beaute', subcategory: 'Maquillage',
      price: Number(price), images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=85'],
      description: '', stock: 10, rating: 0, reviewsCount: 0, boutiqueId: MY_BOUTIQUE_ID, badges: ['NOUVEAU'], tags: [], createdAt: new Date().toISOString(),
    })
    setName('')
    setPrice('')
    setShowForm(false)
  }

  return (
    <div>
      <PageHeader
        title="Mes produits"
        description="Gérez le catalogue de votre boutique sur la marketplace KÔSMÉA."
        action={<Button onClick={() => setShowForm((v) => !v)} className="gap-1.5"><Plus className="size-4" /> Ajouter un produit</Button>}
      />

      {showForm && (
        <form onSubmit={handleAdd} className="mb-6 grid gap-4 border border-border bg-card p-5 sm:grid-cols-3">
          <div><Label>Nom du produit</Label><Input value={name} onChange={(e) => setName(e.target.value)} required /></div>
          <div><Label>Prix (FCFA)</Label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required /></div>
          <div className="flex items-end"><Button type="submit" className="w-full">Enregistrer</Button></div>
        </form>
      )}

      {!hydrated ? (
        <p className="text-sm text-muted-foreground">Chargement…</p>
      ) : (
        <TableShell>
          <thead>
            <tr><Th>Produit</Th><Th>Catégorie</Th><Th>Prix</Th><Th>Stock</Th><Th>Statut</Th><Th>Actions</Th></tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <Td className="font-medium">{p.name}</Td>
                <Td className="capitalize">{p.category} · {p.subcategory}</Td>
                <Td>{formatFCFA(p.price)}</Td>
                <Td>{p.stock}</Td>
                <Td><StatusPill status={p.stock > 0 ? 'actif' : 'inactif'} /></Td>
                <Td>
                  <button type="button" onClick={() => remove(p.id, seed.some((s) => s.id === p.id))} aria-label="Supprimer" className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="size-4" />
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      )}
    </div>
  )
}
