'use client'

import { useState } from 'react'
import { Plus, Trash2, X } from 'lucide-react'

import { formatDate } from '@/lib/data'
import { useAdminCollection } from '@/lib/store'
import { PageHeader, TableShell, Th, Td, EmptyState } from '@/components/admin/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

type ClientType = 'Acheteur' | 'Locataire' | 'Investisseur' | 'Propriétaire'

interface Client {
  id: string
  name: string
  email: string
  phone: string
  city: string
  clientSince: string
  type: ClientType
}

const clientTypes: ClientType[] = ['Acheteur', 'Locataire', 'Investisseur', 'Propriétaire']

const seedClients: Client[] = [
  { id: 'cl-1', name: 'Jean-Marc Kouadio', email: 'jm.kouadio@gmail.com', phone: '+225 07 45 12 30 88', city: 'Cocody', clientSince: '2024-02-10', type: 'Acheteur' },
  { id: 'cl-2', name: 'Sylvie Adjoua', email: 'sylvie.adjoua@yahoo.fr', phone: '+225 05 12 88 40 21', city: 'Marcory', clientSince: '2023-11-05', type: 'Locataire' },
  { id: 'cl-3', name: 'Kouassi Yao Éric', email: 'eric.kouassi@outlook.com', phone: '+225 01 67 90 22 15', city: 'Riviera', clientSince: '2025-01-22', type: 'Investisseur' },
  { id: 'cl-4', name: 'Adjoua Béatrice N’Dri', email: 'beatrice.ndri@gmail.com', phone: '+225 07 88 34 61 09', city: 'Bingerville', clientSince: '2022-06-18', type: 'Propriétaire' },
  { id: 'cl-5', name: 'Mamadou Cissé', email: 'mamadou.cisse@hotmail.com', phone: '+225 05 22 71 43 90', city: 'Plateau', clientSince: '2025-03-30', type: 'Acheteur' },
  { id: 'cl-6', name: 'Affoué Clarisse Tanoh', email: 'clarisse.tanoh@gmail.com', phone: '+225 01 44 09 78 32', city: 'Angré', clientSince: '2024-09-14', type: 'Locataire' },
  { id: 'cl-7', name: 'Ousmane Diarrassouba', email: 'o.diarrassouba@gmail.com', phone: '+225 07 30 55 12 64', city: 'Grand-Bassam', clientSince: '2023-04-02', type: 'Investisseur' },
  { id: 'cl-8', name: 'Marie-Paule Gnahoré', email: 'mp.gnahore@yahoo.fr', phone: '+225 05 90 17 28 46', city: 'Yamoussoukro', clientSince: '2022-12-11', type: 'Propriétaire' },
]

const emptyForm = { name: '', email: '', phone: '', city: '', type: 'Acheteur' as ClientType }

export default function AdminClientsPage() {
  const { items, add, remove, hydrated } = useAdminCollection<Client>('clients', seedClients)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return
    add({
      id: `admin-${Date.now()}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      city: form.city,
      clientSince: new Date().toISOString().slice(0, 10),
      type: form.type,
    })
    setForm(emptyForm)
    setShowForm(false)
  }

  function handleRemove(c: Client) {
    const isSeed = seedClients.some((s) => s.id === c.id)
    if (confirm(`Supprimer la fiche client de « ${c.name} » ?`)) remove(c.id, isSeed)
  }

  return (
    <div>
      <PageHeader
        title="Clients"
        description="Carnet d’adresses des clients particuliers et investisseurs suivis par les équipes commerciales."
        action={
          <Button onClick={() => setShowForm((v) => !v)}>
            {showForm ? <X /> : <Plus />}
            {showForm ? 'Fermer' : 'Ajouter un contact'}
          </Button>
        }
      />

      {showForm ? (
        <form onSubmit={handleSubmit} className="mb-8 border border-border bg-card p-5">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">Nouveau contact</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+225 07 00 00 00 00" />
            </div>
            <div>
              <Label htmlFor="city">Ville</Label>
              <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="type">Profil</Label>
              <Select id="type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as ClientType })}>
                {clientTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Select>
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <Button type="submit">Ajouter le contact</Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Annuler</Button>
          </div>
        </form>
      ) : null}

      {!hydrated ? (
        <EmptyState />
      ) : items.length === 0 ? (
        <EmptyState label="Aucun client enregistré." />
      ) : (
        <TableShell>
          <thead>
            <tr>
              <Th>Nom</Th>
              <Th>Contact</Th>
              <Th>Ville</Th>
              <Th>Profil</Th>
              <Th>Client depuis</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.id}>
                <Td className="font-medium">{c.name}</Td>
                <Td>
                  <div className="flex flex-col text-xs text-muted-foreground">
                    <span>{c.email}</span>
                    <span>{c.phone}</span>
                  </div>
                </Td>
                <Td>{c.city}</Td>
                <Td><Badge variant="muted">{c.type}</Badge></Td>
                <Td className="text-muted-foreground">{formatDate(c.clientSince)}</Td>
                <Td>
                  <div className="flex justify-end">
                    <Button size="icon-sm" variant="destructive" aria-label="Supprimer" onClick={() => handleRemove(c)}>
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
