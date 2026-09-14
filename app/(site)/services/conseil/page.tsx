import Link from 'next/link'
import { ArrowRight, Briefcase, Home, Key, TrendingUp, Users } from 'lucide-react'

import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'

export const metadata = {
  title: 'Conseil & accompagnement — Akwaba Immobilier',
  description: 'Acquisition, vente, location, investissement, immobilier professionnel : un conseil personnalisé à chaque étape de votre projet.',
}

const benefits = [
  {
    icon: Home,
    title: 'Acquisition',
    description: 'Cadrage du besoin, sélection ciblée de biens et négociation : nous vous aidons à acheter au juste prix, sans précipitation.',
  },
  {
    icon: TrendingUp,
    title: 'Vente',
    description: 'Estimation, mise en valeur, diffusion large et sélection des acquéreurs sérieux pour vendre dans de bonnes conditions.',
  },
  {
    icon: Key,
    title: 'Location',
    description: 'Recherche ou mise en location, rédaction du bail et accompagnement jusqu’à la remise des clés.',
  },
  {
    icon: Users,
    title: 'Investissement',
    description: 'Analyse de vos objectifs, de votre capital et de votre horizon pour orienter votre stratégie d’investissement.',
  },
  {
    icon: Briefcase,
    title: 'Immobilier professionnel',
    description: 'Bureaux, commerces, locaux d’activité : un accompagnement dédié aux entreprises et professionnels.',
  },
]

export default function ConseilPage() {
  return (
    <>
      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-graphite pb-14 pt-40 lg:min-h-[480px]">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2400&q=90"
          alt="Conseil et accompagnement immobilier"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Nos services</p>
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Conseil & accompagnement.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75">
            Quel que soit votre projet — acheter, vendre, louer, investir ou implanter votre activité — un conseiller
            dédié vous accompagne avec une vision claire et objective de vos options.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Un conseil pour chaque projet" title="Cinq domaines d’accompagnement." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 70}>
              <div className="flex h-full flex-col border border-border p-7">
                <b.icon className="size-7 text-primary" />
                <h3 className="mt-5 font-serif text-xl">{b.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{b.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-graphite text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Un projet à clarifier ?</h2>
            <p className="mt-5 leading-7 text-white/70">Échangez avec un conseiller pour poser les bases de votre projet immobilier.</p>
          </div>
          <Link href="/contact" className="flex items-center gap-2 bg-primary px-8 py-5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
            Parler à un expert <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
