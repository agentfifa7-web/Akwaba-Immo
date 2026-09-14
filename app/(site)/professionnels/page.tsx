'use client'

import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { professionals, type ProfessionalRole } from '@/lib/data'
import { ProviderCard } from '@/components/site/provider-card'
import { SectionHeading } from '@/components/site/section-heading'
import { cn } from '@/lib/utils'

const roles: ProfessionalRole[] = ['Maquilleuse', 'Coiffeur·se', 'Onglerie', 'Salon de beauté', 'Photographe beauté', 'Barbier']

function ProfessionalsList() {
  const searchParams = useSearchParams()
  const [activeRole, setActiveRole] = useState<ProfessionalRole | null>((searchParams.get('role') as ProfessionalRole) ?? null)

  const filtered = useMemo(() => professionals.filter((p) => !activeRole || p.role === activeRole), [activeRole])

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="Professionnels beauté" title="Maquilleuses, coiffeurs, salons & plus" description="Réservez un service beauté près de chez vous en quelques clics." />

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveRole(null)}
          className={cn('rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider', !activeRole ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}
        >
          Tous
        </button>
        {roles.map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => setActiveRole(role)}
            className={cn('rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider', activeRole === role ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}
          >
            {role}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 border border-dashed border-border p-16 text-center text-sm text-muted-foreground">Aucun professionnel dans cette catégorie pour le moment.</div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProviderCard
              key={p.id}
              href={`/professionnels/${p.slug}`}
              photo={p.photo}
              name={p.name}
              subtitle={p.role}
              city={`${p.district}, ${p.city}`}
              specialties={p.specialties}
              rating={p.rating}
              reviewsCount={p.reviewsCount}
              priceFrom={p.priceFrom}
              badge={p.badge}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProfessionalsPage() {
  return (
    <Suspense fallback={null}>
      <ProfessionalsList />
    </Suspense>
  )
}
