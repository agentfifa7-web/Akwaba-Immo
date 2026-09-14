import Link from 'next/link'
import { ArrowRight, FileCheck2, Scale, ShieldCheck, TriangleAlert } from 'lucide-react'

import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'

export const metadata = {
  title: 'Accompagnement juridique — Akwaba Immobilier',
  description: 'Un appui juridique tout au long de vos opérations immobilières, en complément des professionnels du droit habilités.',
}

const services = [
  {
    icon: FileCheck2,
    title: 'Vérification documentaire',
    description: 'Contrôle des titres fonciers, ACD, certificats et pièces contractuelles avant toute transaction.',
  },
  {
    icon: Scale,
    title: 'Rédaction contractuelle',
    description: 'Préparation et relecture des compromis, baux et conventions, en amont de leur passage devant notaire.',
  },
  {
    icon: ShieldCheck,
    title: 'Sécurisation des transactions',
    description: 'Coordination avec notaires et études habilitées pour fluidifier et sécuriser chaque étape de votre opération.',
  },
]

export default function JuridiquePage() {
  return (
    <>
      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-graphite pb-14 pt-40 lg:min-h-[480px]">
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2400&q=90"
          alt="Accompagnement juridique immobilier"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Nos services</p>
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Accompagnement juridique.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75">
            Notre pôle juridique sécurise chaque opération immobilière sur le plan contractuel, en lien étroit avec
            les professionnels du droit habilités.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Notre appui" title="Un accompagnement en trois volets." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="flex h-full flex-col border border-border p-7">
                <s.icon className="size-7 text-primary" />
                <h3 className="mt-5 font-serif text-xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{s.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* DISCLAIMER */}
        <div className="mt-12 flex gap-4 border border-primary/30 bg-primary/5 p-7">
          <TriangleAlert className="mt-0.5 size-6 shrink-0 text-primary" />
          <div>
            <h3 className="font-serif text-lg">Un accompagnement, pas une substitution</h3>
            <p className="mt-3 text-sm leading-6 text-foreground">
              L’accompagnement juridique d’Akwaba Immobilier ne remplace en aucun cas l’intervention d’un notaire ou
              d’un avocat. Certains actes (signature authentique, actes notariés, procédures contentieuses) requièrent
              obligatoirement l’intervention d’un professionnel du droit habilité. Notre équipe juridique vous oriente
              et vous met en relation avec nos partenaires notaires et avocats pour ces démarches.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-graphite text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Une question juridique sur votre projet ?</h2>
            <p className="mt-5 leading-7 text-white/70">Notre pôle juridique vous répond et vous oriente vers le bon interlocuteur.</p>
          </div>
          <Link href="/contact" className="flex items-center gap-2 bg-primary px-8 py-5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
            Parler à un expert <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
