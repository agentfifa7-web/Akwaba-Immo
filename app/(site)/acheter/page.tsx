import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { properties, type PropertyCategory } from '@/lib/data'
import { PropertyCard } from '@/components/site/property-card'
import { SectionHeading } from '@/components/site/section-heading'

const groups: { category: PropertyCategory; title: string; description: string }[] = [
  { category: 'terrain', title: 'Terrains', description: 'Parcelles viabilisées et sécurisées, idéales pour bâtir ou investir.' },
  { category: 'villa', title: 'Villas', description: 'Villas contemporaines et résidences de standing partout en Côte d’Ivoire.' },
  { category: 'maison', title: 'Maisons', description: 'Maisons familiales dans des quartiers calmes et bien desservis.' },
  { category: 'appartement', title: 'Appartements', description: 'Appartements et penthouses en résidences sécurisées.' },
  { category: 'immeuble', title: 'Immeubles de rapport', description: 'Immeubles à fort rendement locatif pour les investisseurs.' },
]

const forSale = properties.filter((p) => p.transaction === 'vente')

export default function AcheterPage() {
  return (
    <div>
      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-graphite pb-14 pt-32">
        <img
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=85"
          alt="Acquisition immobilière en Côte d’Ivoire"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Devenir propriétaire</p>
          <h1 className="max-w-2xl font-serif text-5xl leading-[1.02] text-white sm:text-6xl">
            Acheter en toute confiance, partout en Côte d’Ivoire.
          </h1>
          <p className="mt-5 max-w-xl leading-7 text-white/75">
            {forSale.length} biens à vendre vérifiés par nos équipes juridiques et foncières : terrains, villas, maisons, appartements et immeubles.
          </p>
          <Link href="/biens?transaction=vente" className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
            Voir tous les biens à vendre <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {groups.map((group) => {
        const items = forSale.filter((p) => p.category === group.category)
        if (items.length === 0) return null
        return (
          <section key={group.category} className="mx-auto max-w-7xl border-b border-border px-5 py-16 last:border-b-0 lg:px-10 lg:py-20">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <SectionHeading eyebrow={`${items.length} bien${items.length > 1 ? 's' : ''} disponible${items.length > 1 ? 's' : ''}`} title={group.title} description={group.description} />
              <Link
                href={`/biens?transaction=vente&categorie=${group.category}`}
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
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Un projet d’achat précis en tête ?</h2>
            <p className="mt-5 leading-7 text-white/70">Nos conseillers vous aident à affiner votre recherche selon votre budget et vos critères.</p>
          </div>
          <Link href="/contact" className="bg-primary px-8 py-5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
            Parler à un conseiller
          </Link>
        </div>
      </section>
    </div>
  )
}
