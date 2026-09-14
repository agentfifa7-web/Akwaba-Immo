import Link from 'next/link'
import { ArrowRight, BarChart3, ClipboardList, FileSearch, ShieldCheck, Users } from 'lucide-react'

import { SectionHeading } from '@/components/site/section-heading'

export const metadata = {
  title: 'Gestion locative — Akwaba Immobilier',
  description: 'Confiez la gestion locative de votre bien à Akwaba Immobilier : recherche de locataires, entretien, administration et reporting mensuel.',
}

const steps = [
  {
    icon: Users,
    title: 'Recherche de locataires',
    description: 'Diffusion large, visites organisées et sélection rigoureuse des candidats (solvabilité, garanties, références).',
  },
  {
    icon: FileSearch,
    title: 'Suivi locatif',
    description: 'États des lieux détaillés, rédaction du bail, relances et gestion des renouvellements ou des préavis.',
  },
  {
    icon: ClipboardList,
    title: 'Entretien',
    description: 'Coordination des interventions techniques, suivi des sinistres et entretien préventif pour préserver la valeur du bien.',
  },
  {
    icon: ShieldCheck,
    title: 'Administration',
    description: 'Encaissement des loyers, reversement au propriétaire, gestion des charges et des relations avec la copropriété.',
  },
  {
    icon: BarChart3,
    title: 'Reporting',
    description: 'Un tableau de bord mensuel digitalisé : loyers perçus, charges, travaux réalisés et suivi de rentabilité.',
  },
]

const benefits = [
  'Un interlocuteur dédié pour chaque propriétaire',
  'Un suivi possible à distance, idéal pour les propriétaires à l’étranger',
  'Une sélection rigoureuse des locataires pour limiter les impayés',
  'Un reporting mensuel clair et transparent',
]

export default function GestionPage() {
  return (
    <>
      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-graphite pb-14 pt-40 lg:min-h-[480px]">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2400&q=90"
          alt="Gestion locative de biens immobiliers"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Nos services</p>
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Gestion locative pour propriétaires.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75">
            Vous êtes propriétaire d’un appartement, d’une villa ou d’un immeuble ? Confiez-nous la gestion
            quotidienne de votre bien pour une location sereine, sans les tracas administratifs.
          </p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Notre méthode" title="Une gestion complète, de A à Z." />
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

      {/* BENEFITS */}
      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Pourquoi nous confier votre bien</p>
              <h2 className="font-serif text-3xl leading-tight sm:text-4xl">La tranquillité d’esprit, au quotidien.</h2>
              <p className="mt-5 leading-7 text-muted-foreground">
                Notre pôle gestion accompagne déjà de nombreux propriétaires à Abidjan comme à l’étranger, avec un
                objectif simple : sécuriser vos revenus locatifs sans vous imposer de charge de gestion.
              </p>
              <ul className="mt-6 space-y-2.5">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm leading-6 text-foreground">
                    <span className="mt-2 size-1.5 shrink-0 bg-primary" /> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1200&q=85"
                alt="Gestionnaire locatif au travail"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-graphite text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Un bien à faire gérer ?</h2>
            <p className="mt-5 leading-7 text-white/70">Parlons de votre bien et de vos objectifs avec notre pôle gestion locative.</p>
          </div>
          <Link href="/contact" className="flex items-center gap-2 rounded-lg bg-primary px-8 py-5 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0">
            Faire gérer mon bien <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
