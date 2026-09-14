'use client'

import { useMemo, useState } from 'react'
import { Mail, Phone } from 'lucide-react'

import { agents, type Department } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { cn } from '@/lib/utils'

const departmentLabels: Record<Department, string> = {
  direction: 'Direction',
  commercial: 'Commercial',
  foncier: 'Foncier',
  technique: 'Technique',
  juridique: 'Juridique',
  gestion: 'Gestion',
  communication: 'Communication',
}

const filters: (Department | 'tous')[] = ['tous', 'direction', 'commercial', 'foncier', 'technique', 'juridique', 'gestion', 'communication']

export default function EquipePage() {
  const [filter, setFilter] = useState<Department | 'tous'>('tous')

  const filtered = useMemo(
    () => (filter === 'tous' ? agents : agents.filter((a) => a.department === filter)),
    [filter],
  )

  return (
    <>
      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-graphite pb-14 pt-40 lg:min-h-[480px]">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2400&q=90"
          alt="Équipe Akwaba Immobilier"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Nos équipes</p>
          <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl">
            Des experts à votre écoute, dans chaque métier.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 lg:text-lg">
            Direction, commercial, foncier, technique, juridique, gestion, communication : une équipe pluridisciplinaire
            réunie pour faire avancer vos projets.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Toute l’équipe" title="Trouvez le bon interlocuteur" />

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                'border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors',
                filter === f
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-primary',
              )}
            >
              {f === 'tous' ? 'Tous' : departmentLabels[f]}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((member, i) => (
            <Reveal key={member.id} delay={i * 50} className="border border-border bg-card">
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <img src={member.photo} alt={member.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg leading-snug">{member.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-primary">{member.role}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{member.specialty}</p>
                <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4">
                  <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-xs font-semibold text-foreground transition-colors hover:text-primary">
                    <Phone className="size-3.5" /> {member.phone}
                  </a>
                  <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-xs font-semibold text-foreground transition-colors hover:text-primary">
                    <Mail className="size-3.5" /> Contacter
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-sm text-muted-foreground">Aucun collaborateur dans ce département pour le moment.</p>
        )}
      </section>
    </>
  )
}
