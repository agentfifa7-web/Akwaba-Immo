import Link from 'next/link'

import { keyStats, testimonials } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { StatCounter } from '@/components/site/stat-counter'
import { TestimonialCard } from '@/components/site/testimonial-card'
import { Reveal } from '@/components/site/reveal'

export const metadata = {
  title: 'Témoignages clients — Akwaba Immobilier',
  description: 'Découvrez les avis et témoignages de nos clients acheteurs, locataires, investisseurs et propriétaires bailleurs.',
}

export default function TemoignagesPage() {
  return (
    <>
      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-graphite pb-14 pt-40 lg:min-h-[480px]">
        <img
          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=2400&q=90"
          alt="Client satisfait Akwaba Immobilier"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Ils nous font confiance</p>
          <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl">
            Ce que disent nos clients.
          </h1>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {keyStats.map((stat) => (
              <StatCounter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Avis vérifiés" title="Toute la satisfaction de nos clients" align="center" className="mx-auto" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 60}>
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-graphite text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Vous aussi, vivez l’expérience Akwaba.</h2>
            <p className="mt-5 leading-7 text-white/70">Rejoignez les milliers de clients qui nous ont fait confiance pour leur projet immobilier.</p>
          </div>
          <Link href="/contact" className="rounded-lg bg-primary px-8 py-5 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0">
            Démarrer mon projet
          </Link>
        </div>
      </section>
    </>
  )
}
