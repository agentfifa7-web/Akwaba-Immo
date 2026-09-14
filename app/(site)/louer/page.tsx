import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { properties, type PropertyCategory } from '@/lib/data'
import { PropertyCard } from '@/components/site/property-card'
import { SectionHeading } from '@/components/site/section-heading'

const groups: { category: PropertyCategory; title: string; description: string }[] = [
  { category: 'appartement', title: 'Appartements', description: 'Studios, T2, T3 et penthouses meublés ou non meublés, en résidences sécurisées.' },
  { category: 'villa', title: 'Villas', description: 'Villas meublées avec piscine, idéales pour la famille ou les séjours de standing.' },
  { category: 'maison', title: 'Maisons', description: 'Maisons familiales dans des quartiers résidentiels calmes.' },
  { category: 'bureau', title: 'Bureaux', description: 'Espaces professionnels modulables au cœur des zones d’affaires.' },
  { category: 'commerce', title: 'Commerces', description: 'Locaux commerciaux à forte visibilité pour développer votre activité.' },
]

const forRent = properties.filter((p) => p.transaction === 'location')

export default function LouerPage() {
  return (
    <div>
      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-graphite pb-14 pt-32">
        <img
          src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2400&q=85"
          alt="Location immobilière en Côte d’Ivoire"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Trouver un logement</p>
          <h1 className="max-w-2xl font-serif text-5xl leading-[1.02] text-white sm:text-6xl">
            Louer rapidement, en toute sérénité.
          </h1>
          <p className="mt-5 max-w-xl leading-7 text-white/75">
            {forRent.length} biens disponibles à la location : appartements, villas, maisons, bureaux et commerces.
          </p>
          <Link href="/biens?transaction=location" className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
            Voir tous les biens à louer <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {groups.map((group) => {
        const items = forRent.filter((p) => p.category === group.category)
        if (items.length === 0) return null
        return (
          <section key={group.category} className="mx-auto max-w-7xl border-b border-border px-5 py-16 last:border-b-0 lg:px-10 lg:py-20">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <SectionHeading eyebrow={`${items.length} bien${items.length > 1 ? 's' : ''} disponible${items.length > 1 ? 's' : ''}`} title={group.title} description={group.description} />
              <Link
                href={`/biens?transaction=location&categorie=${group.category}`}
                className="shrink-0 text-sm font-semibold uppercase tracking-wider underline decoration-primary underline-offset-8"
              >
                Voir tout
              </Link>
            </div>
            <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {items.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </section>
        )
      })}

      <section className="bg-graphite text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Propriétaire ? Confiez-nous la gestion de votre bien.</h2>
            <p className="mt-5 leading-7 text-white/70">Recherche de locataires, état des lieux, encaissement des loyers : notre pôle gestion s’occupe de tout.</p>
          </div>
          <Link href="/services/gestion" className="bg-primary px-8 py-5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
            Découvrir la gestion locative
          </Link>
        </div>
      </section>
    </div>
  )
}
