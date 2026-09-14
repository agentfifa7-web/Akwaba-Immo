'use client'

import { useState } from 'react'
import { Pencil, Plus, Trash2, X } from 'lucide-react'

import { projects, formatFCFA, type Project, type ProgramStatus } from '@/lib/data'
import { useAdminCollection } from '@/lib/store'
import { PageHeader, TableShell, Th, Td, EmptyState, StatusPill, slugify } from '@/components/admin/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const statuses: ProgramStatus[] = ['en_commercialisation', 'en_construction', 'a_venir', 'livre']
const statusLabels: Record<ProgramStatus, string> = {
  en_commercialisation: 'En commercialisation',
  en_construction: 'En construction',
  a_venir: 'À venir',
  livre: 'Livré',
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'

interface FormState {
  name: string
  city: string
  district: string
  status: ProgramStatus
  summary: string
  description: string
  lots: string
  availableLots: string
  priceFrom: string
  surfaceFrom: string
  deliveryDate: string
}

const emptyForm: FormState = {
  name: '',
  city: '',
  district: '',
  status: 'en_commercialisation',
  summary: '',
  description: '',
  lots: '',
  availableLots: '',
  priceFrom: '',
  surfaceFrom: '',
  deliveryDate: '',
}

export default function AdminProjetsPage() {
  const { items, add, update, remove, hydrated } = useAdminCollection<Project>('projects', projects)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  function openEdit(p: Project) {
    setEditingId(p.id)
    setForm({
      name: p.name,
      city: p.city,
      district: p.district,
      status: p.status,
      summary: p.summary,
      description: p.description,
      lots: String(p.lots),
      availableLots: String(p.availableLots),
      priceFrom: String(p.priceFrom),
      surfaceFrom: String(p.surfaceFrom),
      deliveryDate: p.deliveryDate,
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
    if (!form.name.trim() || !form.city.trim()) return

    if (editingId) {
      update(editingId, {
        name: form.name,
        city: form.city,
        district: form.district,
        status: form.status,
        summary: form.summary,
        description: form.description,
        lots: Number(form.lots) || 0,
        availableLots: Number(form.availableLots) || 0,
        priceFrom: Number(form.priceFrom) || 0,
        surfaceFrom: Number(form.surfaceFrom) || 0,
        deliveryDate: form.deliveryDate,
      })
    } else {
      const newProject: Project = {
        id: `admin-${Date.now()}`,
        slug: `${slugify(form.name)}-${Date.now().toString().slice(-5)}`,
        name: form.name,
        city: form.city,
        district: form.district,
        status: form.status,
        summary: form.summary,
        description: form.description,
        images: [DEFAULT_IMAGE],
        lots: Number(form.lots) || 0,
        availableLots: Number(form.availableLots) || 0,
        priceFrom: Number(form.priceFrom) || 0,
        surfaceFrom: Number(form.surfaceFrom) || 0,
        equipments: [],
        progress: [],
        deliveryDate: form.deliveryDate || 'À déterminer',
        documents: [],
        coordinates: { lat: 5.34, lng: -4.02 },
      }
      add(newProject)
    }
    closeForm()
  }

  function handleRemove(p: Project) {
    const isSeed = projects.some((s) => s.id === p.id)
    if (confirm(`Supprimer définitivement « ${p.name} » ?`)) remove(p.id, isSeed)
  }

  return (
    <div>
      <PageHeader
        title="Projets"
        description="Programmes immobiliers neufs : lotissements, résidences et projets en commercialisation."
        action={
          <Button onClick={showForm ? closeForm : openCreate}>
            {showForm ? <X /> : <Plus />}
            {showForm ? 'Fermer' : 'Ajouter un projet'}
          </Button>
        }
      />

      {showForm ? (
        <form onSubmit={handleSubmit} className="mb-8 border border-border bg-card p-5">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            {editingId ? 'Modifier le projet' : 'Nouveau projet'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-2 lg:col-span-3">
              <Label htmlFor="name">Nom du programme</Label>
              <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex. Cité Atlantide" />
            </div>
            <div>
              <Label htmlFor="city">Ville</Label>
              <Input id="city" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Bingerville" />
            </div>
            <div>
              <Label htmlFor="district">Quartier</Label>
              <Input id="district" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} placeholder="Route de Bingerville" />
            </div>
            <div>
              <Label htmlFor="status">Statut</Label>
              <Select id="status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ProgramStatus })}>
                {statuses.map((s) => (
                  <option key={s} value={s}>{statusLabels[s]}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="lots">Nombre de lots</Label>
              <Input id="lots" type="number" min={0} value={form.lots} onChange={(e) => setForm({ ...form, lots: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="availableLots">Lots disponibles</Label>
              <Input id="availableLots" type="number" min={0} value={form.availableLots} onChange={(e) => setForm({ ...form, availableLots: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="priceFrom">Prix à partir de (FCFA)</Label>
              <Input id="priceFrom" type="number" min={0} value={form.priceFrom} onChange={(e) => setForm({ ...form, priceFrom: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="surfaceFrom">Surface à partir de (m²)</Label>
              <Input id="surfaceFrom" type="number" min={0} value={form.surfaceFrom} onChange={(e) => setForm({ ...form, surfaceFrom: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="deliveryDate">Livraison</Label>
              <Input id="deliveryDate" value={form.deliveryDate} onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })} placeholder="2027" />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <Label htmlFor="summary">Accroche</Label>
              <Input id="summary" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} placeholder="Phrase d’accroche courte" />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Présentation détaillée du programme…" />
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <Button type="submit">{editingId ? 'Enregistrer les modifications' : 'Créer le projet'}</Button>
            <Button type="button" variant="outline" onClick={closeForm}>Annuler</Button>
          </div>
        </form>
      ) : null}

      {!hydrated ? (
        <EmptyState />
      ) : items.length === 0 ? (
        <EmptyState label="Aucun projet enregistré." />
      ) : (
        <TableShell>
          <thead>
            <tr>
              <Th>Programme</Th>
              <Th>Ville</Th>
              <Th>Statut</Th>
              <Th>Lots dispo.</Th>
              <Th>Prix à partir de</Th>
              <Th>Livraison</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <Td className="font-medium">{p.name}</Td>
                <Td>{p.city} — {p.district}</Td>
                <Td><StatusPill status={p.status} /></Td>
                <Td>{p.availableLots} / {p.lots}</Td>
                <Td>{formatFCFA(p.priceFrom)}</Td>
                <Td className="text-muted-foreground">{p.deliveryDate}</Td>
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
