'use client'

import { useState } from 'react'
import { Pencil, Plus, Trash2, X } from 'lucide-react'

import { agencies, type Agency } from '@/lib/data'
import { useAdminCollection } from '@/lib/store'
import { PageHeader, TableShell, Th, Td, EmptyState } from '@/components/admin/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FormState {
  city: string
  address: string
  hours: string
  phone: string
  email: string
  manager: string
}

const emptyForm: FormState = { city: '', address: '', hours: '', phone: '', email: '', manager: '' }

export default function AdminAgencesPage() {
  const { items, add, update, remove, hydrated } = useAdminCollection<Agency>('agencies', agencies)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  function openEdit(a: Agency) {
    setEditingId(a.id)
    setForm({ city: a.city, address: a.address, hours: a.hours, phone: a.phone, email: a.email, manager: a.manager })
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.city.trim() || !form.address.trim()) return

    if (editingId) {
      update(editingId, { city: form.city, address: form.address, hours: form.hours, phone: form.phone, email: form.email, manager: form.manager })
    } else {
      const newAgency: Agency = {
        id: `admin-${Date.now()}`,
        city: form.city,
        address: form.address,
        hours: form.hours,
        phone: form.phone,
        email: form.email,
        manager: form.manager,
        coordinates: { lat: 5.34, lng: -4.02 },
      }
      add(newAgency)
    }
    closeForm()
  }

  function handleRemove(a: Agency) {
    const isSeed = agencies.some((s) => s.id === a.id)
    if (confirm(`Supprimer l’agence « ${a.city} » ?`)) remove(a.id, isSeed)
  }

  return (
    <div>
      <PageHeader
        title="Agences"
        description="Réseau d’agences AKWABA IMMOBILIER en Côte d’Ivoire."
        action={
          <Button onClick={showForm ? closeForm : openCreate}>
            {showForm ? <X /> : <Plus />}
            {showForm ? 'Fermer' : 'Ajouter une agence'}
          </Button>
        }
      />

      {showForm ? (
        <form onSubmit={handleSubmit} className="mb-8 border border-border bg-card p-5">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            {editingId ? 'Modifier l’agence' : 'Nouvelle agence'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <Label htmlFor="city">Ville / nom de l’agence</Label>
              <Input id="city" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Abidjan — Cocody" />
            </div>
            <div className="lg:col-span-2">
              <Label htmlFor="address">Adresse</Label>
              <Input id="address" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="hours">Horaires</Label>
              <Input id="hours" value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} placeholder="Lun – Ven : 8h30 – 18h" />
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+225 27 22 00 00 00" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="manager">Responsable</Label>
              <Input id="manager" value={form.manager} onChange={(e) => setForm({ ...form, manager: e.target.value })} />
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <Button type="submit">{editingId ? 'Enregistrer les modifications' : 'Créer l’agence'}</Button>
            <Button type="button" variant="outline" onClick={closeForm}>Annuler</Button>
          </div>
        </form>
      ) : null}

      {!hydrated ? (
        <EmptyState />
      ) : items.length === 0 ? (
        <EmptyState label="Aucune agence enregistrée." />
      ) : (
        <TableShell>
          <thead>
            <tr>
              <Th>Agence</Th>
              <Th>Adresse</Th>
              <Th>Responsable</Th>
              <Th>Contact</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={a.id}>
                <Td className="font-medium">{a.city}</Td>
                <Td className="text-muted-foreground">{a.address}</Td>
                <Td>{a.manager}</Td>
                <Td>
                  <div className="flex flex-col text-xs text-muted-foreground">
                    <span>{a.phone}</span>
                    <span>{a.email}</span>
                  </div>
                </Td>
                <Td>
                  <div className="flex justify-end gap-2">
                    <Button size="icon-sm" variant="outline" aria-label="Modifier" onClick={() => openEdit(a)}>
                      <Pencil />
                    </Button>
                    <Button size="icon-sm" variant="destructive" aria-label="Supprimer" onClick={() => handleRemove(a)}>
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
