import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { formatFCFA, projects, properties } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { PropertyCard } from '@/components/site/property-card'
import { ProjectCard } from '@/components/site/project-card'
import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'Opportunités d’investissement — Akwaba Immobilier',
  description: 'Terrains, immobilier locatif, programmes et projets structurés : découvrez nos opportunités d’investissement en Côte d’Ivoire.',
}

const terrains = properties.filter((p) => p.category === 'terrain')
const locatifs = properties.filter((p) => p.transaction === 'location' || p.category === 'immeuble')
const programmes = projects.filter((p) => p.status === 'en_commercialisation' || p.status === 'en_construction')
const projetsAVenir = projects.filter((p) => p.status === 'a_venir')

const sections = [
  {
    id: 'terrain',
    eyebrow: 'Foncier sécurisé',
    title: 'Investir dans le terrain',
    description: 'La base de tout patrimoine immobilier : des parcelles loties, viabilisées et documentées, avec un fort potentiel de valorisation à mesure que les zones se développent.',
    indicative: 'Plus-value indicative observée : 5 à 8 % par an selon la localisation.',
  },
  {
    id: 'locatif',
    eyebrow: 'Revenus réguliers',
    title: 'Investir dans l’immobilier locatif',
    description: 'Appartements meublés, villas et immeubles de rapport dans les quartiers à forte demande locative : Plateau, Cocody, Marcory, Riviera.',
    indicative: 'Rendement locatif brut estimé : 6 à 9 % par an.',
  },
]

export default function OpportunitesPage() {
  return (
    <>
      <section className="relative flex min-h-[380px] items-end overflow-hidden bg-graphite pb-14 pt-36 lg:min-h-[440px]">
        <img
          src="https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=2400&q=90"
          alt="Opportunités d'investissement"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Investir</p>
          <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Nos opportunités d’investissement.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75">
            Une sélection vivante, tirée de notre catalogue de biens et de programmes, pensée pour les investisseurs
            particuliers comme pour les porteurs de projets d’envergure.
          </p>
        </div>
      </section>

      {/* SOMMAIRE */}
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-6 lg:px-10">
          <div className="flex flex-wrap gap-2.5">
            {[
              { id: 'terrain', label: 'Terrain' },
              { id: 'locatif', label: 'Immobilier locatif' },
              { id: 'programme', label: 'Programme immobilier' },
              { id: 'projet', label: 'Projet d’investissement' },
            ].map((s) => (
              <a key={s.id} href={`#${s.id}`} className="border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {sections.map((section) => {
        const list = section.id === 'terrain' ? terrains : locatifs
        return (
          <section key={section.id} id={section.id} className="scroll-mt-24 mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">{section.eyebrow}</p>
              <h2 className="font-serif text-3xl leading-tight sm:text-4xl">{section.title}</h2>
              <p className="mt-4 leading-7 text-muted-foreground">{section.description}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">{section.indicative} (indicatif, non garanti)</p>
            </div>
            <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {list.slice(0, 6).map((property, i) => (
                <Reveal key={property.id} delay={i * 80}>
                  <PropertyCard property={property} />
                </Reveal>
              ))}
              {list.length === 0 && (
                <p className="text-sm text-muted-foreground">Aucune opportunité disponible pour le moment dans cette catégorie.</p>
              )}
            </div>
          </section>
        )
      })}

      {/* PROGRAMME */}
      <section id="programme" className="scroll-mt-24 border-t border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Sur plan</p>
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">Investir dans un programme immobilier</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Nos résidences et lotissements en commercialisation ou en cours de construction : des prix d’appel
              avantageux et un potentiel de plus-value à la livraison.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
              Plus-value indicative à la livraison : 10 à 15 % (indicatif, non garanti).
            </p>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-3">
            {programmes.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* PROJET STRUCTURE */}
      <section id="projet" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Investissement structuré</p>
          <h2 className="font-serif text-3xl leading-tight sm:text-4xl">Projets d’investissement à venir</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Des projets d’envergure en phase de conception, ouverts à la pré-réservation pour les investisseurs
            souhaitant se positionner en amont.
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
            Horizon recommandé : 5 ans et plus (indicatif, non garanti).
          </p>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-3">
          {projetsAVenir.map((project) => (
            <div key={project.id} className="overflow-hidden rounded-xl border border-border">
              <div className="relative aspect-[16/11] overflow-hidden bg-muted">
                <img src={project.images[0]} alt={project.name} className="h-full w-full object-cover" />
                <Badge className="absolute left-4 top-4">À venir</Badge>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl">{project.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{project.district}, {project.city}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.summary}</p>
                <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">
                  À partir de {formatFCFA(project.priceFrom)} · Livraison {project.deliveryDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-graphite text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Besoin d’aide pour choisir ?</h2>
            <p className="mt-5 leading-7 text-white/70">Simulez votre investissement ou échangez directement avec un conseiller.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/investir/simulateur" className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0">
              Simuler mon investissement <ArrowRight className="size-4" />
            </Link>
            <Link href="/contact" className="flex items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:shadow-lg">
              Parler à un conseiller
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
