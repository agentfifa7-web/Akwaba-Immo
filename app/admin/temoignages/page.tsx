'use client'

import { useState } from 'react'
import { Pencil, Plus, Star, Trash2, X } from 'lucide-react'

import { testimonials, type Testimonial } from '@/lib/data'
import { useAdminCollection } from '@/lib/store'
import { PageHeader, TableShell, Th, Td, EmptyState } from '@/components/admin/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const DEFAULT_PHOTO = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=85'

interface FormState {
  name: string
  role: string
  city: string
  rating: string
  quote: string
}

const emptyForm: FormState = { name: '', role: '', city: '', rating: '5', quote: '' }

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn('size-3.5', i < rating ? 'fill-primary text-primary' : 'text-border')} />
      ))}
    </div>
  )
}

export default function AdminTemoignagesPage() {
  const { items, add, update, remove, hydrated } = useAdminCollection<Testimonial>('testimonials', testimonials)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  function openEdit(t: Testimonial) {
    setEditingId(t.id)
    setForm({ name: t.name, role: t.role ?? '', city: t.city, rating: String(t.rating), quote: t.quote })
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.quote.trim()) return

    if (editingId) {
      update(editingId, { name: form.name, role: form.role || undefined, city: form.city, rating: Number(form.rating), quote: form.quote })
    } else {
      const newTestimonial: Testimonial = {
        id: `admin-${Date.now()}`,
        name: form.name,
        role: form.role || undefined,
        city: form.city,
        rating: Number(form.rating),
        quote: form.quote,
        photo: DEFAULT_PHOTO,
      }
      add(newTestimonial)
    }
    closeForm()
  }

  function handleRemove(t: Testimonial) {
    const isSeed = testimonials.some((s) => s.id === t.id)
    if (confirm(`Supprimer le témoignage de « ${t.name} » ?`)) remove(t.id, isSeed)
  }

  return (
    <div>
      <PageHeader
        title="Témoignages"
        description="Modération des avis clients affichés sur le site public."
        action={
          <Button onClick={showForm ? closeForm : openCreate}>
            {showForm ? <X /> : <Plus />}
            {showForm ? 'Fermer' : 'Ajouter un témoignage'}
          </Button>
        }
      />

      {showForm ? (
        <form onSubmit={handleSubmit} className="mb-8 border border-border bg-card p-5">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            {editingId ? 'Modifier le témoignage' : 'Nouveau témoignage'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Label htmlFor="name">Nom</Label>
              <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="role">Rôle (optionnel)</Label>
              <Input id="role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Propriétaire, Investisseuse…" />
            </div>
            <div>
              <Label htmlFor="city">Ville</Label>
              <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="rating">Note</Label>
              <Select id="rating" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}>
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>{r} / 5</option>
                ))}
              </Select>
            </div>
            <div className="sm:col-span-2 lg:col-span-4">
              <Label htmlFor="quote">Témoignage</Label>
              <Textarea id="quote" required value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} />
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <Button type="submit">{editingId ? 'Enregistrer les modifications' : 'Publier le témoignage'}</Button>
            <Button type="button" variant="outline" onClick={closeForm}>Annuler</Button>
          </div>
        </form>
      ) : null}

      {!hydrated ? (
        <EmptyState />
      ) : items.length === 0 ? (
        <EmptyState label="Aucun témoignage." />
      ) : (
        <TableShell>
          <thead>
            <tr>
              <Th>Client</Th>
              <Th>Note</Th>
              <Th>Témoignage</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <tr key={t.id}>
                <Td>
                  <div className="flex flex-col">
                    <span className="font-medium">{t.name}</span>
                    <span className="text-xs text-muted-foreground">{t.role ? `${t.role} · ` : ''}{t.city}</span>
                  </div>
                </Td>
                <Td><Stars rating={t.rating} /></Td>
                <Td className="max-w-[360px] truncate text-muted-foreground" title={t.quote}>{t.quote}</Td>
                <Td>
                  <div className="flex justify-end gap-2">
                    <Button size="icon-sm" variant="outline" aria-label="Modifier" onClick={() => openEdit(t)}>
                      <Pencil />
                    </Button>
                    <Button size="icon-sm" variant="destructive" aria-label="Supprimer" onClick={() => handleRemove(t)}>
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
