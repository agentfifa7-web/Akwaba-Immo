'use client'

import { useState } from 'react'
import { Pencil, Plus, Trash2, X } from 'lucide-react'

import { faqs, type FaqItem } from '@/lib/data'
import { useAdminCollection } from '@/lib/store'
import { PageHeader, EmptyState } from '@/components/admin/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface FormState {
  category: string
  question: string
  answer: string
}

const emptyForm: FormState = { category: '', question: '', answer: '' }

export default function AdminFaqPage() {
  const { items, add, update, remove, hydrated } = useAdminCollection<FaqItem>('faqs', faqs)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  function openEdit(f: FaqItem) {
    setEditingId(f.id)
    setForm({ category: f.category, question: f.question, answer: f.answer })
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.question.trim() || !form.answer.trim()) return

    if (editingId) {
      update(editingId, { category: form.category || 'Général', question: form.question, answer: form.answer })
    } else {
      const newFaq: FaqItem = {
        id: `admin-${Date.now()}`,
        category: form.category || 'Général',
        question: form.question,
        answer: form.answer,
      }
      add(newFaq)
    }
    closeForm()
  }

  function handleRemove(f: FaqItem) {
    const isSeed = faqs.some((s) => s.id === f.id)
    if (confirm('Supprimer cette question ?')) remove(f.id, isSeed)
  }

  const grouped = items.reduce<Record<string, FaqItem[]>>((acc, f) => {
    acc[f.category] = acc[f.category] ? [...acc[f.category], f] : [f]
    return acc
  }, {})

  return (
    <div>
      <PageHeader
        title="FAQ"
        description="Questions fréquentes affichées sur le site public, organisées par catégorie."
        action={
          <Button onClick={showForm ? closeForm : openCreate}>
            {showForm ? <X /> : <Plus />}
            {showForm ? 'Fermer' : 'Ajouter une question'}
          </Button>
        }
      />

      {showForm ? (
        <form onSubmit={handleSubmit} className="mb-8 border border-border bg-card p-5">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            {editingId ? 'Modifier la question' : 'Nouvelle question'}
          </h2>
          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="category">Catégorie</Label>
                <Input id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Achat, Location, Terrain…" />
              </div>
              <div>
                <Label htmlFor="question">Question</Label>
                <Input id="question" required value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
              </div>
            </div>
            <div>
              <Label htmlFor="answer">Réponse</Label>
              <Textarea id="answer" required value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <Button type="submit">{editingId ? 'Enregistrer les modifications' : 'Publier la question'}</Button>
            <Button type="button" variant="outline" onClick={closeForm}>Annuler</Button>
          </div>
        </form>
      ) : null}

      {!hydrated ? (
        <EmptyState />
      ) : items.length === 0 ? (
        <EmptyState label="Aucune question." />
      ) : (
        <div className="flex flex-col gap-8">
          {Object.entries(grouped).map(([category, list]) => (
            <div key={category}>
              <h2 className="mb-3 font-serif text-lg font-semibold text-foreground">{category}</h2>
              <div className="flex flex-col gap-3">
                {list.map((f) => (
                  <div key={f.id} className="flex items-start justify-between gap-4 border border-border bg-card p-4">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{f.question}</p>
                      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{f.answer}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <Button size="icon-sm" variant="outline" aria-label="Modifier" onClick={() => openEdit(f)}>
                        <Pencil />
                      </Button>
                      <Button size="icon-sm" variant="destructive" aria-label="Supprimer" onClick={() => handleRemove(f)}>
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
