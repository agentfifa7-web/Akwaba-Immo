'use client'

import { useState } from 'react'
import { Pencil, Plus, Trash2, X } from 'lucide-react'

import { agents, type TeamMember, type Department } from '@/lib/data'
import { useAdminCollection } from '@/lib/store'
import { PageHeader, TableShell, Th, Td, EmptyState } from '@/components/admin/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const departments: Department[] = ['direction', 'commercial', 'foncier', 'technique', 'juridique', 'gestion', 'communication']
const departmentLabels: Record<Department, string> = {
  direction: 'Direction',
  commercial: 'Commercial',
  foncier: 'Foncier',
  technique: 'Technique',
  juridique: 'Juridique',
  gestion: 'Gestion',
  communication: 'Communication',
}

const DEFAULT_PHOTO = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=85'

interface FormState {
  name: string
  role: string
  department: Department
  specialty: string
  phone: string
  email: string
  bio: string
  photo: string
}

const emptyForm: FormState = {
  name: '', role: '', department: 'commercial', specialty: '', phone: '', email: '', bio: '', photo: '',
}

export default function AdminAgentsPage() {
  const { items, add, update, remove, hydrated } = useAdminCollection<TeamMember>('agents', agents)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  function openEdit(a: TeamMember) {
    setEditingId(a.id)
    setForm({ name: a.name, role: a.role, department: a.department, specialty: a.specialty, phone: a.phone, email: a.email, bio: a.bio, photo: a.photo })
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return

    const patch = {
      name: form.name,
      role: form.role,
      department: form.department,
      specialty: form.specialty,
      phone: form.phone,
      email: form.email,
      bio: form.bio,
      photo: form.photo || DEFAULT_PHOTO,
    }

    if (editingId) {
      update(editingId, patch)
    } else {
      const newAgent: TeamMember = { id: `admin-${Date.now()}`, ...patch }
      add(newAgent)
    }
    closeForm()
  }

  function handleRemove(a: TeamMember) {
    const isSeed = agents.some((s) => s.id === a.id)
    if (confirm(`Supprimer la fiche de « ${a.name} » ?`)) remove(a.id, isSeed)
  }

  return (
    <div>
      <PageHeader
        title="Agents"
        description="Équipe AKWABA IMMOBILIER : direction, conseillers commerciaux et pôles d’expertise."
        action={
          <Button onClick={showForm ? closeForm : openCreate}>
            {showForm ? <X /> : <Plus />}
            {showForm ? 'Fermer' : 'Ajouter un agent'}
          </Button>
        }
      />

      {showForm ? (
        <form onSubmit={handleSubmit} className="mb-8 border border-border bg-card p-5">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            {editingId ? 'Modifier l’agent' : 'Nouvel agent'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="role">Fonction</Label>
              <Input id="role" required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Conseillère Immobilière" />
            </div>
            <div>
              <Label htmlFor="department">Département</Label>
              <Select id="department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value as Department })}>
                {departments.map((d) => (
                  <option key={d} value={d}>{departmentLabels[d]}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="specialty">Spécialité</Label>
              <Input id="specialty" value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+225 07 00 00 00 00" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <Label htmlFor="photo">URL de la photo (optionnel)</Label>
              <Input id="photo" value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} placeholder="https://…" />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <Label htmlFor="bio">Biographie courte</Label>
              <Textarea id="bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <Button type="submit">{editingId ? 'Enregistrer les modifications' : 'Créer l’agent'}</Button>
            <Button type="button" variant="outline" onClick={closeForm}>Annuler</Button>
          </div>
        </form>
      ) : null}

      {!hydrated ? (
        <EmptyState />
      ) : items.length === 0 ? (
        <EmptyState label="Aucun agent enregistré." />
      ) : (
        <TableShell>
          <thead>
            <tr>
              <Th>Agent</Th>
              <Th>Fonction</Th>
              <Th>Département</Th>
              <Th>Spécialité</Th>
              <Th>Contact</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={a.id}>
                <Td>
                  <div className="flex items-center gap-3">
                    <img src={a.photo} alt={a.name} className="size-10 shrink-0 rounded-full object-cover" />
                    <span className="font-medium">{a.name}</span>
                  </div>
                </Td>
                <Td>{a.role}</Td>
                <Td>{departmentLabels[a.department]}</Td>
                <Td className="text-muted-foreground">{a.specialty}</Td>
                <Td>
                  <div className="flex flex-col text-xs text-muted-foreground">
                    <span>{a.email}</span>
                    <span>{a.phone}</span>
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
