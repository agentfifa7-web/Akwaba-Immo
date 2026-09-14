'use client'

import { useState } from 'react'
import { Pencil, Plus, Trash2, X } from 'lucide-react'

import { properties, agents, formatFCFA, type Property, type TransactionType, type PropertyCategory } from '@/lib/data'
import { useAdminCollection } from '@/lib/store'
import { PageHeader, TableShell, Th, Td, EmptyState, slugify } from '@/components/admin/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

const transactions: TransactionType[] = ['vente', 'location']
const categories: PropertyCategory[] = ['villa', 'maison', 'appartement', 'terrain', 'bureau', 'commerce', 'immeuble']

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'

interface FormState {
  title: string
  transaction: TransactionType
  category: PropertyCategory
  city: string
  district: string
  price: string
  surface: string
  description: string
}

const emptyForm: FormState = {
  title: '',
  transaction: 'vente',
  category: 'villa',
  city: '',
  district: '',
  price: '',
  surface: '',
  description: '',
}

export default function AdminBiensPage() {
  const { items, add, update, remove, hydrated } = useAdminCollection<Property>('properties', properties)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  function openEdit(p: Property) {
    setEditingId(p.id)
    setForm({
      title: p.title,
      transaction: p.transaction,
      category: p.category,
      city: p.city,
      district: p.district,
      price: String(p.price),
      surface: String(p.surface),
      description: p.description,
    })
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim() || !form.city.trim()) return

    if (editingId) {
      update(editingId, {
        title: form.title,
        transaction: form.transaction,
        category: form.category,
        city: form.city,
        district: form.district,
        address: `${form.district}, ${form.city}`,
        price: Number(form.price) || 0,
        surface: Number(form.surface) || 0,
        description: form.description,
      })
    } else {
      const newProperty: Property = {
        id: `admin-${Date.now()}`,
        slug: `${slugify(form.title)}-${Date.now().toString().slice(-5)}`,
        title: form.title,
        transaction: form.transaction,
        category: form.category,
        city: form.city,
        district: form.district,
        address: `${form.district}, ${form.city}`,
        price: Number(form.price) || 0,
        surface: Number(form.surface) || 0,
        badges: [],
        images: [DEFAULT_IMAGE],
        description: form.description,
        features: [],
        documents: [],
        agentId: agents[0].id,
        coordinates: { lat: 5.34, lng: -4.02 },
        createdAt: new Date().toISOString(),
      }
      add(newProperty)
    }
    closeForm()
  }

  function handleRemove(p: Property) {
    const isSeed = properties.some((s) => s.id === p.id)
    if (confirm(`Supprimer définitivement « ${p.title} » ?`)) remove(p.id, isSeed)
  }

  return (
    <div>
      <PageHeader
        title="Biens"
        description="Gérez le catalogue de biens à la vente et à la location publié sur le site."
        action={
          <Button onClick={showForm ? closeForm : openCreate}>
            {showForm ? <X /> : <Plus />}
            {showForm ? 'Fermer' : 'Ajouter un bien'}
          </Button>
        }
      />

      {showForm ? (
        <form onSubmit={handleSubmit} className="mb-8 border border-border bg-card p-5">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            {editingId ? 'Modifier le bien' : 'Nouveau bien'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-2 lg:col-span-3">
              <Label htmlFor="title">Titre du bien</Label>
              <Input id="title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Ex. Villa contemporaine Riviera Golf" />
            </div>
            <div>
              <Label htmlFor="transaction">Transaction</Label>
              <Select id="transaction" value={form.transaction} onChange={(e) => setForm({ ...form, transaction: e.target.value as TransactionType })}>
                {transactions.map((t) => (
                  <option key={t} value={t}>{t === 'vente' ? 'Vente' : 'Location'}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="category">Catégorie</Label>
              <Select id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as PropertyCategory })}>
                {categories.map((c) => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="city">Ville</Label>
              <Input id="city" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Abidjan" />
            </div>
            <div>
              <Label htmlFor="district">Quartier</Label>
              <Input id="district" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} placeholder="Cocody" />
            </div>
            <div>
              <Label htmlFor="price">Prix (FCFA)</Label>
              <Input id="price" type="number" min={0} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="45000000" />
            </div>
            <div>
              <Label htmlFor="surface">Surface (m²)</Label>
              <Input id="surface" type="number" min={0} value={form.surface} onChange={(e) => setForm({ ...form, surface: e.target.value })} placeholder="150" />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Présentation détaillée du bien…" />
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <Button type="submit">{editingId ? 'Enregistrer les modifications' : 'Créer le bien'}</Button>
            <Button type="button" variant="outline" onClick={closeForm}>Annuler</Button>
          </div>
        </form>
      ) : null}

      {!hydrated ? (
        <EmptyState />
      ) : items.length === 0 ? (
        <EmptyState label="Aucun bien dans le catalogue." />
      ) : (
        <TableShell>
          <thead>
            <tr>
              <Th>Bien</Th>
              <Th>Ville</Th>
              <Th>Catégorie</Th>
              <Th>Transaction</Th>
              <Th>Prix</Th>
              <Th>Badges</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <Td className="font-medium">{p.title}</Td>
                <Td>{p.city} — {p.district}</Td>
                <Td className="capitalize">{p.category}</Td>
                <Td className="capitalize">{p.transaction}</Td>
                <Td>{formatFCFA(p.price)}</Td>
                <Td>
                  <div className="flex flex-wrap gap-1">
                    {p.badges.length === 0 ? <span className="text-muted-foreground">—</span> : p.badges.map((b) => <Badge key={b} variant="muted">{b}</Badge>)}
                  </div>
                </Td>
                <Td>
                  <div className="flex justify-end gap-2">
                    <Button size="icon-sm" variant="outline" aria-label="Modifier" onClick={() => openEdit(p)}>
                      <Pencil />
                    </Button>
                    <Button size="icon-sm" variant="destructive" aria-label="Supprimer" onClick={() => handleRemove(p)}>
                      <Trash2 />
                    </Button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      )}
    </div>
  )
}
