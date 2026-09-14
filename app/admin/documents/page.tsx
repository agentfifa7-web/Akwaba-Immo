'use client'

import { useState } from 'react'
import { Plus, Trash2, X } from 'lucide-react'

import { formatDate } from '@/lib/data'
import { useAdminCollection } from '@/lib/store'
import { PageHeader, TableShell, Th, Td, EmptyState, StatusPill } from '@/components/admin/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'

type DocStatus = 'disponible' | 'en_attente'

interface AdminDocument {
  id: string
  label: string
  type: string
  category: string
  date: string
  status: DocStatus
}

const categories = ['Foncier', 'Contrats', 'Programmes', 'Juridique', 'Gestion locative', 'Communication']
const docTypes = ['PDF', 'DOCX', 'XLSX', 'JPG']

const seedDocs: AdminDocument[] = [
  { id: 'ad-1', label: 'Titre foncier — Villa Riviera Golf', type: 'PDF', category: 'Foncier', date: '2026-08-20', status: 'disponible' },
  { id: 'ad-2', label: 'Masterplan — Cité Atlantide', type: 'PDF', category: 'Programmes', date: '2026-08-01', status: 'disponible' },
  { id: 'ad-3', label: 'Modèle de contrat de réservation', type: 'DOCX', category: 'Contrats', date: '2026-07-15', status: 'disponible' },
  { id: 'ad-4', label: 'Grille des prix — Résidence Andou-M’Batto', type: 'XLSX', category: 'Programmes', date: '2026-07-02', status: 'disponible' },
  { id: 'ad-5', label: 'Attestation villageoise — Songon', type: 'PDF', category: 'Foncier', date: '2026-09-05', status: 'en_attente' },
  { id: 'ad-6', label: 'Modèle d’état des lieux', type: 'DOCX', category: 'Gestion locative', date: '2026-06-10', status: 'disponible' },
  { id: 'ad-7', label: 'Charte graphique Akwaba TV', type: 'PDF', category: 'Communication', date: '2026-05-28', status: 'disponible' },
  { id: 'ad-8', label: 'Note juridique — Fiscalité foncière 2026', type: 'PDF', category: 'Juridique', date: '2026-09-01', status: 'en_attente' },
]

const emptyForm = { label: '', type: 'PDF', category: categories[0], status: 'disponible' as DocStatus }

export default function AdminDocumentsPage() {
  const { items, add, remove, hydrated } = useAdminCollection<AdminDocument>('documents', seedDocs)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.label.trim()) return
    add({
      id: `admin-${Date.now()}`,
      label: form.label,
      type: form.type,
      category: form.category,
      date: new Date().toISOString().slice(0, 10),
      status: form.status,
    })
    setForm(emptyForm)
    setShowForm(false)
  }

  function handleRemove(d: AdminDocument) {
    const isSeed = seedDocs.some((s) => s.id === d.id)
    if (confirm(`Supprimer le document « ${d.label} » ?`)) remove(d.id, isSeed)
  }

  return (
    <div>
      <PageHeader
        title="Documents"
        description="Bibliothèque documentaire interne : titres fonciers, contrats types, brochures et notes juridiques."
        action={
          <Button onClick={() => setShowForm((v) => !v)}>
            {showForm ? <X /> : <Plus />}
            {showForm ? 'Fermer' : 'Ajouter un document'}
          </Button>
        }
      />

      {showForm ? (
        <form onSubmit={handleSubmit} className="mb-8 border border-border bg-card p-5">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">Nouveau document</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <Label htmlFor="label">Intitulé</Label>
              <Input id="label" required value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="type">Format</Label>
              <Select id="type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                {docTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="category">Catégorie</Label>
              <Select id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Statut</Label>
              <Select id="status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as DocStatus })}>
                <option value="disponible">Disponible</option>
                <option value="en_attente">En attente</option>
              </Select>
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <Button type="submit">Ajouter le document</Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Annuler</Button>
          </div>
        </form>
      ) : null}

      {!hydrated ? (
        <EmptyState />
      ) : items.length === 0 ? (
        <EmptyState label="Aucun document." />
      ) : (
        <TableShell>
          <thead>
            <tr>
              <Th>Document</Th>
              <Th>Format</Th>
              <Th>Catégorie</Th>
              <Th>Date</Th>
              <Th>Statut</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {items.map((d) => (
              <tr key={d.id}>
                <Td className="font-medium">{d.label}</Td>
                <Td>{d.type}</Td>
                <Td>{d.category}</Td>
                <Td className="text-muted-foreground">{formatDate(d.date)}</Td>
                <Td><StatusPill status={d.status} /></Td>
                <Td>
                  <div className="flex justify-end">
                    <Button size="icon-sm" variant="destructive" aria-label="Supprimer" onClick={() => handleRemove(d)}>
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
