'use client'

import { useState } from 'react'
import { Pencil, Plus, Trash2, X } from 'lucide-react'

import { videos, formatDate, type VideoItem } from '@/lib/data'
import { useAdminCollection } from '@/lib/store'
import { PageHeader, TableShell, Th, Td, EmptyState, slugify } from '@/components/admin/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const DEFAULT_THUMB = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
const DEFAULT_EMBED = 'https://www.youtube.com/embed/dQw4w9WgXcQ'

interface FormState {
  title: string
  category: string
  thumbnail: string
  embedUrl: string
  description: string
  date: string
}

const emptyForm: FormState = { title: '', category: '', thumbnail: '', embedUrl: '', description: '', date: new Date().toISOString().slice(0, 10) }

export default function AdminTvPage() {
  const { items, add, update, remove, hydrated } = useAdminCollection<VideoItem>('videos', videos)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  function openEdit(v: VideoItem) {
    setEditingId(v.id)
    setForm({ title: v.title, category: v.category, thumbnail: v.thumbnail, embedUrl: v.embedUrl, description: v.description, date: v.date })
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) return

    if (editingId) {
      update(editingId, {
        title: form.title,
        category: form.category,
        thumbnail: form.thumbnail || DEFAULT_THUMB,
        embedUrl: form.embedUrl || DEFAULT_EMBED,
        description: form.description,
        date: form.date,
      })
    } else {
      const newVideo: VideoItem = {
        id: `admin-${Date.now()}`,
        slug: `${slugify(form.title)}-${Date.now().toString().slice(-5)}`,
        title: form.title,
        category: form.category || 'Actualités',
        thumbnail: form.thumbnail || DEFAULT_THUMB,
        embedUrl: form.embedUrl || DEFAULT_EMBED,
        description: form.description,
        date: form.date,
      }
      add(newVideo)
    }
    closeForm()
  }

  function handleRemove(v: VideoItem) {
    const isSeed = videos.some((s) => s.id === v.id)
    if (confirm(`Supprimer la vidéo « ${v.title} » ?`)) remove(v.id, isSeed)
  }

  const sorted = [...items].sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <div>
      <PageHeader
        title="Akwaba TV"
        description="Vidéothèque : visites guidées, interviews, reportages chantier et témoignages clients."
        action={
          <Button onClick={showForm ? closeForm : openCreate}>
            {showForm ? <X /> : <Plus />}
            {showForm ? 'Fermer' : 'Ajouter une vidéo'}
          </Button>
        }
      />

      {showForm ? (
        <form onSubmit={handleSubmit} className="mb-8 border border-border bg-card p-5">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            {editingId ? 'Modifier la vidéo' : 'Nouvelle vidéo'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-4">
              <Label htmlFor="title">Titre</Label>
              <Input id="title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="category">Catégorie</Label>
              <Input id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Visites, Interviews…" />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="thumbnail">URL de la vignette</Label>
              <Input id="thumbnail" value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} placeholder="https://…" />
            </div>
            <div>
              <Label htmlFor="embedUrl">URL d’intégration (embed)</Label>
              <Input id="embedUrl" value={form.embedUrl} onChange={(e) => setForm({ ...form, embedUrl: e.target.value })} placeholder="https://www.youtube.com/embed/…" />
            </div>
            <div className="sm:col-span-2 lg:col-span-4">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <Button type="submit">{editingId ? 'Enregistrer les modifications' : 'Publier la vidéo'}</Button>
            <Button type="button" variant="outline" onClick={closeForm}>Annuler</Button>
          </div>
        </form>
      ) : null}

      {!hydrated ? (
        <EmptyState />
      ) : sorted.length === 0 ? (
        <EmptyState label="Aucune vidéo publiée." />
      ) : (
        <TableShell>
          <thead>
            <tr>
              <Th>Vidéo</Th>
              <Th>Catégorie</Th>
              <Th>Date</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((v) => (
              <tr key={v.id}>
                <Td>
                  <div className="flex items-center gap-3">
                    <img src={v.thumbnail} alt={v.title} className="h-10 w-16 shrink-0 object-cover" />
                    <span className="font-medium">{v.title}</span>
                  </div>
                </Td>
                <Td>{v.category}</Td>
                <Td className="text-muted-foreground">{formatDate(v.date)}</Td>
                <Td>
                  <div className="flex justify-end gap-2">
                    <Button size="icon-sm" variant="outline" aria-label="Modifier" onClick={() => openEdit(v)}>
                      <Pencil />
                    </Button>
                    <Button size="icon-sm" variant="destructive" aria-label="Supprimer" onClick={() => handleRemove(v)}>
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
