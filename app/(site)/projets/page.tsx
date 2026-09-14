'use client'

import { useMemo, useState } from 'react'

import { projects, type ProgramStatus } from '@/lib/data'
import { ProjectCard } from '@/components/site/project-card'
import { SectionHeading } from '@/components/site/section-heading'
import { Select } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

const statusLabels: Record<ProgramStatus, string> = {
  en_commercialisation: 'En commercialisation',
  en_construction: 'En construction',
  a_venir: 'À venir',
  livre: 'Livré',
}

const budgets = [
  { value: 'all', label: 'Tous budgets' },
  { value: '30', label: 'Jusqu’à 30M FCFA' },
  { value: '50', label: 'Jusqu’à 50M FCFA' },
  { value: '100', label: 'Jusqu’à 100M FCFA' },
] as const

export default function ProjetsPage() {
  const [ville, setVille] = useState('all')
  const [status, setStatus] = useState<ProgramStatus | 'all'>('all')
  const [budget, setBudget] = useState<(typeof budgets)[number]['value']>('all')

  const villes = useMemo(() => Array.from(new Set(projects.map((p) => p.city))), [])

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (ville !== 'all' && p.city !== ville) return false
      if (status !== 'all' && p.status !== status) return false
      if (budget !== 'all' && p.priceFrom > Number(budget) * 1_000_000) return false
      return true
    })
  }, [ville, status, budget])

  return (
    <div>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
          <SectionHeading
            eyebrow="Bâtir les territoires de demain"
            title="Tous nos projets immobiliers"
            description="Lotissements, résidences et villas en programme, portés par Akwaba Immobilier partout en Côte d’Ivoire."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
        <div className="border border-border bg-card p-5 lg:p-6">
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <Label>Localisation</Label>
              <Select value={ville} onChange={(e) => setVille(e.target.value)}>
                <option value="all">Toutes les villes</option>
                {villes.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Statut</Label>
              <Select value={status} onChange={(e) => setStatus(e.target.value as ProgramStatus | 'all')}>
                <option value="all">Tous statuts</option>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Budget d’entrée</Label>
              <Select value={budget} onChange={(e) => setBudget(e.target.value as (typeof budgets)[number]['value'])}>
                {budgets.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <div className="mt-10 border-b border-border pb-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-serif text-2xl text-foreground">{filtered.length}</span> programme{filtered.length > 1 ? 's' : ''} correspondant{filtered.length > 1 ? 's' : ''}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 border border-dashed border-border py-20 text-center">
            <p className="font-serif text-2xl">Aucun programme ne correspond à ces critères.</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
