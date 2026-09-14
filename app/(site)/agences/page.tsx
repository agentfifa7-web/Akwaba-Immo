import Link from 'next/link'
import { Clock, Mail, MapPin, Navigation, Phone, User } from 'lucide-react'

import { agencies } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'

export const metadata = {
  title: 'Nos agences — Akwaba Immobilier',
  description: 'Retrouvez toutes les agences Akwaba Immobilier à Abidjan, Yamoussoukro et Grand-Bassam, avec leurs coordonnées et horaires.',
}

export default function AgencesPage() {
  return (
    <>
      <section className="relative flex min-h-[380px] items-end overflow-hidden bg-graphite pb-14 pt-40 lg:min-h-[440px]">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2400&q=90"
          alt="Agence Akwaba Immobilier"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Proche de vous</p>
          <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl">
            Nos agences en Côte d’Ivoire.
          </h1>
        </div>
      </section>

      {/* VILLES CHIPS / MAP TEASER */}
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex flex-wrap gap-2.5">
              {agencies.map((a) => (
                <span key={a.id} className="flex items-center gap-1.5 border border-border bg-background px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-foreground">
                  <MapPin className="size-3.5 text-primary" /> {a.city}
                </span>
              ))}
            </div>
            <Link href="/carte" className="flex shrink-0 items-center gap-2 text-sm font-semibold uppercase tracking-wider underline decoration-primary underline-offset-8">
              Carte détaillée disponible sur /carte
            </Link>
          </div>
        </div>
      </section>

      {/* LISTE AGENCES */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Toutes nos implantations" title="4 agences, une même exigence de service" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {agencies.map((agency, i) => (
            <Reveal key={agency.id} delay={i * 60} className="flex flex-col border border-border bg-card p-8">
              <h3 className="font-serif text-2xl">{agency.city}</h3>
              <div className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
                <p className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" /> {agency.address}
                </p>
                <p className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-primary" /> {agency.hours}
                </p>
                <p className="flex items-start gap-3">
                  <User className="mt-0.5 size-4 shrink-0 text-primary" /> Responsable : {agency.manager}
                </p>
                <a href={`tel:${agency.phone.replace(/\s/g, '')}`} className="flex items-start gap-3 font-semibold text-foreground transition-colors hover:text-primary">
                  <Phone className="mt-0.5 size-4 shrink-0 text-primary" /> {agency.phone}
                </a>
                <a href={`mailto:${agency.email}`} className="flex items-start gap-3 font-semibold text-foreground transition-colors hover:text-primary">
                  <Mail className="mt-0.5 size-4 shrink-0 text-primary" /> {agency.email}
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-6">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${agency.coordinates.lat},${agency.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-graphite px-5 py-3 text-xs font-semibold uppercase tracking-wider text-graphite-foreground shadow-sm shadow-black/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-graphite/90 hover:shadow-lg hover:shadow-black/25 active:translate-y-0"
                >
                  <Navigation className="size-3.5" /> Itinéraire
                </a>
                <Link href="/contact" className="flex items-center gap-2 border border-border px-5 py-3 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary">
                  Prendre rendez-vous
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-graphite text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Aucune agence près de chez vous ?</h2>
            <p className="mt-5 leading-7 text-white/70">Nos conseillers vous accompagnent aussi à distance, où que vous soyez.</p>
          </div>
          <Link href="/contact" className="rounded-lg bg-primary px-8 py-5 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0">
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  )
}
