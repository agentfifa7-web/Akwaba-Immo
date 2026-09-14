import Link from 'next/link'
import { Handshake } from 'lucide-react'

import { partners } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'

export const metadata = {
  title: 'Nos partenaires — Akwaba Immobilier',
  description: 'Banques, assurances, notaires, architectes, entreprises de construction : découvrez le réseau de partenaires d’Akwaba Immobilier.',
}

export default function PartenairesPage() {
  const grouped = Array.from(new Set(partners.map((p) => p.category))).map((category) => ({
    category,
    items: partners.filter((p) => p.category === category),
  }))

  return (
    <>
      <section className="relative flex min-h-[380px] items-end overflow-hidden bg-graphite pb-14 pt-40 lg:min-h-[440px]">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=90"
          alt="Partenariat Akwaba Immobilier"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Un écosystème de confiance</p>
          <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl">
            Nos partenaires.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 lg:text-lg">
            Banques, assurances, notaires, architectes, entreprises de construction et promoteurs : nous avançons
            entourés de partenaires sélectionnés pour leur sérieux et leur fiabilité.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Un réseau solide" title="Des partenaires de confiance, à chaque étape" />

        <div className="mt-14 space-y-14">
          {grouped.map((group, i) => (
            <Reveal key={group.category} delay={i * 60}>
              <h2 className="font-serif text-2xl">{group.category}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((partner) => (
                  <div key={partner.id} className="flex items-center gap-4 border border-border bg-card p-6">
                    <span className="flex size-11 shrink-0 items-center justify-center bg-secondary text-primary">
                      <Handshake className="size-5" />
                    </span>
                    <p className="font-serif text-lg leading-snug">{partner.name}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-graphite text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Vous souhaitez devenir partenaire ?</h2>
            <p className="mt-5 leading-7 text-white/70">
              Banque, notaire, architecte, entreprise de construction ou promoteur : rejoignez notre réseau de
              partenaires de confiance.
            </p>
          </div>
          <Link href="/contact" className="bg-primary px-8 py-5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
            Devenir partenaire
          </Link>
        </div>
      </section>
    </>
  )
}
