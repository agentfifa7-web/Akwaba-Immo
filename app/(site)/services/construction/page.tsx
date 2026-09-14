import Link from 'next/link'
import { ArrowRight, ClipboardCheck, Hammer, Key, PencilRuler, Users } from 'lucide-react'

import { formatFCFA, projects } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { ProjectCard } from '@/components/site/project-card'

export const metadata = {
  title: 'Construction — Akwaba Immobilier',
  description: 'De la conception à la livraison, notre pôle technique pilote la construction de votre maison, villa ou immeuble en Côte d’Ivoire.',
}

const steps = [
  {
    icon: PencilRuler,
    title: 'Conception',
    description: 'Étude de sol, plans architecturaux et dépôt du permis de construire, adaptés à votre budget et à vos usages.',
  },
  {
    icon: Users,
    title: 'Accompagnement',
    description: 'Sélection d’entreprises qualifiées, cadrage budgétaire et mise en place d’un planning de chantier réaliste.',
  },
  {
    icon: Hammer,
    title: 'Construction',
    description: 'Terrassement, gros œuvre, second œuvre : un conducteur de travaux dédié supervise chaque corps de métier.',
  },
  {
    icon: ClipboardCheck,
    title: 'Suivi de chantier',
    description: 'Visites régulières, contrôle qualité et reporting photographique tenu à jour pour un suivi transparent.',
  },
  {
    icon: Key,
    title: 'Livraison',
    description: 'Réception contradictoire des travaux, levée des réserves et remise des clés accompagnée.',
  },
]

const showcase = projects.filter((p) => p.status === 'en_construction' || p.status === 'en_commercialisation').slice(0, 3)

export default function ConstructionPage() {
  return (
    <>
      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-graphite pb-14 pt-40 lg:min-h-[480px]">
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=90"
          alt="Construction de maisons et villas"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Nos services</p>
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Construction & suivi de chantier.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75">
            De l’étude de sol à la remise des clés, notre pôle technique construit avec vous une maison, une villa ou
            un immeuble qui vous ressemble, avec un suivi rigoureux et transparent.
          </p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Notre méthode" title="Un accompagnement en 5 étapes." />
        <div className="mt-12 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step.title} className="border-b border-r border-border p-7">
              <p className="text-sm text-muted-foreground">0{index + 1}</p>
              <step.icon className="mt-6 size-6 text-primary" />
              <h3 className="mt-4 font-serif text-lg leading-snug">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <SectionHeading eyebrow="Nos réalisations" title="Des chantiers pilotés avec exigence." />
          <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-3">
            {showcase.map((project, i) => (
              <Reveal key={project.id} delay={i * 80}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            Exemples de programmes pilotés par nos équipes techniques, à partir de {formatFCFA(showcase[0]?.priceFrom ?? 0)}.
          </p>
        </div>
      </section>

      <section className="bg-graphite text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Un projet de construction en tête ?</h2>
            <p className="mt-5 leading-7 text-white/70">Parlons de votre terrain, de votre budget et de vos envies avec un conseiller technique.</p>
          </div>
          <Link href="/contact" className="flex items-center gap-2 bg-primary px-8 py-5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
            Parler à un expert <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
