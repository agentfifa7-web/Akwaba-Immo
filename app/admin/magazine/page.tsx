'use client'

import { useState } from 'react'
import { Pencil, Plus, Trash2, X } from 'lucide-react'

import { articles, formatDate, type Article } from '@/lib/data'
import { useAdminCollection } from '@/lib/store'
import { PageHeader, TableShell, Th, Td, EmptyState, slugify } from '@/components/admin/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'

interface FormState {
  title: string
  category: string
  author: string
  date: string
  image: string
  excerpt: string
  content: string
}

const emptyForm: FormState = { title: '', category: '', author: '', date: new Date().toISOString().slice(0, 10), image: '', excerpt: '', content: '' }

export default function AdminMagazinePage() {
  const { items, add, update, remove, hydrated } = useAdminCollection<Article>('articles', articles)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  function openEdit(a: Article) {
    setEditingId(a.id)
    setForm({ title: a.title, category: a.category, author: a.author, date: a.date, image: a.image, excerpt: a.excerpt, content: a.content.join('\n') })
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
    const content = form.content.split('\n').map((p) => p.trim()).filter(Boolean)

    if (editingId) {
      update(editingId, {
        title: form.title,
        category: form.category,
        author: form.author,
        date: form.date,
        image: form.image || DEFAULT_IMAGE,
        excerpt: form.excerpt,
        content,
      })
    } else {
      const newArticle: Article = {
        id: `admin-${Date.now()}`,
        slug: `${slugify(form.title)}-${Date.now().toString().slice(-5)}`,
        title: form.title,
        category: form.category || 'Actualités',
        author: form.author || 'Rédaction Akwaba',
        date: form.date,
        image: form.image || DEFAULT_IMAGE,
        excerpt: form.excerpt,
        content: content.length ? content : [form.excerpt],
      }
      add(newArticle)
    }
    closeForm()
  }

  function handleRemove(a: Article) {
    const isSeed = articles.some((s) => s.id === a.id)
    if (confirm(`Supprimer l’article « ${a.title} » ?`)) remove(a.id, isSeed)
  }

  const sorted = [...items].sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <div>
      <PageHeader
        title="Magazine"
        description="Articles publiés sur le magazine du site : conseils, marché, actualités et investissement."
        action={
          <Button onClick={showForm ? closeForm : openCreate}>
            {showForm ? <X /> : <Plus />}
            {showForm ? 'Fermer' : 'Ajouter un article'}
          </Button>
        }
      />

      {showForm ? (
        <form onSubmit={handleSubmit} className="mb-8 border border-border bg-card p-5">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            {editingId ? 'Modifier l’article' : 'Nouvel article'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-4">
              <Label htmlFor="title">Titre</Label>
              <Input id="title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="category">Catégorie</Label>
              <Input id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Foncier, Marché…" />
            </div>
            <div>
              <Label htmlFor="author">Auteur</Label>
              <Input id="author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="date">Date de publication</Label>
              <Input id="date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="image">URL de l’image</Label>
              <Input id="image" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://…" />
            </div>
            <div className="sm:col-span-2 lg:col-span-4">
              <Label htmlFor="excerpt">Chapô (résumé court)</Label>
              <Textarea id="excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="min-h-16" />
            </div>
            <div className="sm:col-span-2 lg:col-span-4">
              <Label htmlFor="content">Contenu (un paragraphe par ligne)</Label>
              <Textarea id="content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="min-h-40" />
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <Button type="submit">{editingId ? 'Enregistrer les modifications' : 'Publier l’article'}</Button>
            <Button type="button" variant="outline" onClick={closeForm}>Annuler</Button>
          </div>
        </form>
      ) : null}

      {!hydrated ? (
        <EmptyState />
      ) : sorted.length === 0 ? (
        <EmptyState label="Aucun article publié." />
      ) : (
        <TableShell>
          <thead>
            <tr>
              <Th>Article</Th>
              <Th>Catégorie</Th>
              <Th>Auteur</Th>
              <Th>Date</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((a) => (
              <tr key={a.id}>
                <Td className="font-medium">{a.title}</Td>
                <Td>{a.category}</Td>
                <Td>{a.author}</Td>
                <Td className="text-muted-foreground">{formatDate(a.date)}</Td>
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
