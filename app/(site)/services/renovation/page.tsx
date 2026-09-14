import Link from 'next/link'
import { ArrowRight, ClipboardCheck, Hammer, Key, Search, Sparkles } from 'lucide-react'

import { SectionHeading } from '@/components/site/section-heading'

export const metadata = {
  title: 'Réhabilitation & rénovation — Akwaba Immobilier',
  description: 'Diagnostic, conception, rénovation et suivi de chantier : notre pôle technique redonne vie et valeur à votre bien.',
}

const steps = [
  {
    icon: Search,
    title: 'Diagnostic',
    description: 'Visite technique complète : état de la structure, des réseaux électriques et sanitaires, estimation des travaux nécessaires.',
  },
  {
    icon: Sparkles,
    title: 'Conception',
    description: 'Proposition d’un plan de rénovation adapté à votre budget, vos usages et vos ambitions de valorisation.',
  },
  {
    icon: Hammer,
    title: 'Rénovation',
    description: 'Travaux de second œuvre, mise aux normes, transformation d’usage : nos équipes qualifiées interviennent avec exigence.',
  },
  {
    icon: ClipboardCheck,
    title: 'Suivi de chantier',
    description: 'Visites régulières, contrôle qualité et reporting photographique pour suivre l’avancement en toute transparence.',
  },
  {
    icon: Key,
    title: 'Livraison',
    description: 'Réception des travaux et remise du bien rénové, prêt à être habité, loué ou revalorisé pour la vente.',
  },
]

export default function RenovationPage() {
  return (
    <>
      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-graphite pb-14 pt-40 lg:min-h-[480px]">
        <img
          src="https://images.unsplash.com/photo-1503387837-b154d5074bd2?auto=format&fit=crop&w=2400&q=90"
          alt="Réhabilitation et rénovation immobilière"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Nos services</p>
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Réhabilitation & rénovation.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75">
            Nous redonnons vie et valeur aux bâtiments existants : rénovation d’appartements, réhabilitation de villas
            anciennes, transformation d’usage. Un diagnostic complet précède toujours nos recommandations.
          </p>
        </div>
      </section>

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

      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1503387837-b154d5074bd2?auto=format&fit=crop&w=1200&q=85"
                alt="Chantier de rénovation"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Pourquoi rénover avec nous</p>
              <h2 className="font-serif text-3xl leading-tight sm:text-4xl">Valoriser votre patrimoine existant.</h2>
              <p className="mt-5 leading-7 text-muted-foreground">
                Qu’il s’agisse de préparer un bien à la vente, d’améliorer son confort locatif ou de transformer son
                usage, notre équipe technique établit un chiffrage précis avant tout engagement et assure un suivi de
                chantier rigoureux jusqu’à la livraison.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  'Diagnostic technique gratuit et sans engagement',
                  'Devis détaillé et transparent avant travaux',
                  'Entreprises qualifiées et supervisées',
                  'Valorisation optimisée avant mise en vente ou en location',
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm leading-6 text-foreground">
                    <span className="mt-2 size-1.5 shrink-0 bg-primary" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-graphite text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Un bien à rénover ?</h2>
            <p className="mt-5 leading-7 text-white/70">Obtenez un premier diagnostic gratuit avec l’un de nos experts techniques.</p>
          </div>
          <Link href="/contact" className="flex items-center gap-2 rounded-lg bg-primary px-8 py-5 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0">
            Parler à un expert <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
