'use client'

import { useMemo, useState } from 'react'

import { projects, type ProgramStatus } from '@/lib/data'
import { ProjectCard } from '@/components/site/project-card'
import { SectionHeading } from '@/components/site/section-heading'
import { Tabs } from '@/components/ui/tabs'

const tabs: { value: ProgramStatus; label: string }[] = [
  { value: 'en_commercialisation', label: 'En commercialisation' },
  { value: 'en_construction', label: 'En construction' },
  { value: 'a_venir', label: 'À venir' },
  { value: 'livre', label: 'Livrés' },
]

export default function ProgrammesPage() {
  const [active, setActive] = useState<ProgramStatus>('en_commercialisation')

  const filtered = useMemo(() => projects.filter((p) => p.status === active), [active])

  return (
    <div>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
          <SectionHeading
            eyebrow="Nos programmes immobiliers"
            title="Des programmes pensés pour durer."
            description="Lotissements, résidences et villas en programme : découvrez nos réalisations, classées par statut d’avancement."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
        <div className="border-b border-border pb-8">
          <Tabs
            items={tabs.map((tab) => ({
              value: tab.value,
              label: `${tab.label} (${projects.filter((p) => p.status === tab.value).length})`,
            }))}
            value={active}
            onChange={(v) => setActive(v as ProgramStatus)}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 border border-dashed border-border py-20 text-center">
            <p className="font-serif text-2xl">Aucun programme dans cette catégorie pour le moment.</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
