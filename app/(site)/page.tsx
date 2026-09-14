'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, MapPin, Sparkles } from 'lucide-react'

import {
  agencies,
  articles,
  formatDate,
  keyStats,
  metiers,
  projects,
  properties,
  testimonials,
  villesCouvertes,
} from '@/lib/data'
import { PropertyCard } from '@/components/site/property-card'
import { ProjectCard } from '@/components/site/project-card'
import { SectionHeading } from '@/components/site/section-heading'
import { StatCounter } from '@/components/site/stat-counter'
import { TestimonialCard } from '@/components/site/testimonial-card'
import { Reveal } from '@/components/site/reveal'
import { Badge } from '@/components/ui/badge'
import { Tabs } from '@/components/ui/tabs'

const featuredProperties = properties.filter((p) => p.featured).slice(0, 6)
const showcaseProjects = projects.filter((p) => p.status !== 'a_venir').slice(0, 3)
const latestArticles = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3)

export default function HomePage() {
  const [searchMode, setSearchMode] = useState<'Acheter' | 'Louer' | 'Investir'>('Acheter')

  return (
    <>
      {/* HERO */}
      <section id="accueil" className="relative flex min-h-[720px] items-end overflow-hidden bg-graphite pb-16 pt-40 lg:min-h-[820px] lg:pb-24">
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=90"
          alt="Villa contemporaine lumineuse en Côte d'Ivoire"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/40 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              L’immobilier qui fait avancer votre vie
            </p>
            <h1 className="font-serif text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
              Votre prochaine adresse commence ici.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/75 lg:text-lg">
              Terrains, maisons, appartements, construction, gestion et investissement : nous construisons avec vous
              un patrimoine qui a du sens, partout en Côte d’Ivoire.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/biens" className="bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
                Trouver mon bien
              </Link>
              <Link href="/contact" className="border border-white/30 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:border-primary hover:bg-primary">
                Parler à un conseiller
              </Link>
            </div>
          </div>

          <div className="mt-10 max-w-5xl rounded-xl bg-white p-3 shadow-2xl lg:flex lg:items-center lg:gap-3 lg:p-4">
            <div className="shrink-0 border-b border-border pb-3 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
              <Tabs
                items={[
                  { value: 'Acheter', label: 'Acheter' },
                  { value: 'Louer', label: 'Louer' },
                  { value: 'Investir', label: 'Investir' },
                ]}
                value={searchMode}
                onChange={(v) => setSearchMode(v as typeof searchMode)}
                className="border-none bg-transparent p-0 shadow-none"
              />
            </div>
            <div className="grid flex-1 gap-3 py-3 sm:grid-cols-3 lg:py-0">
              <label className="flex flex-col gap-1 border-b border-border px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:border-b-0 sm:border-r sm:pb-0">
                Type de bien
                <select className="bg-transparent pt-1 text-sm font-normal normal-case tracking-normal text-foreground outline-none">
                  <option>Maison, villa, terrain...</option>
                  <option>Appartement</option>
                  <option>Villa</option>
                  <option>Terrain</option>
                  <option>Bureau</option>
                  <option>Commerce</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 border-b border-border px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:border-b-0 sm:border-r sm:pb-0">
                Localisation
                <input placeholder="Cocody, Bingerville..." className="bg-transparent pt-1 text-sm font-normal normal-case tracking-normal text-foreground outline-none placeholder:text-muted-foreground" />
              </label>
              <label className="flex flex-col gap-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Budget maximum
                <input placeholder="Votre budget en FCFA" className="bg-transparent pt-1 text-sm font-normal normal-case tracking-normal text-foreground outline-none placeholder:text-muted-foreground" />
              </label>
            </div>
            <Link
              href="/biens"
              className="flex w-full items-center justify-center bg-primary px-7 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 lg:w-auto"
            >
              Rechercher
            </Link>
          </div>
        </div>
      </section>

      {/* OPPORTUNITÉS */}
      <section id="biens" className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Sélection Akwaba" title="Nos opportunités" />
            <Link href="/biens" className="text-sm font-semibold uppercase tracking-wider underline decoration-primary underline-offset-8">
              Voir tous les biens
            </Link>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property, i) => (
            <Reveal key={property.id} delay={i * 80}>
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJETS */}
      <section id="projets" className="bg-graphite text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Des projets qui transforment nos villes" title="Bâtir les territoires de demain." light />
            <Link href="/projets" className="text-sm font-semibold uppercase tracking-wider text-white underline decoration-primary underline-offset-8">
              Découvrir tous les projets
            </Link>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-3">
            {showcaseProjects.map((project) => (
              <div key={project.id} className="bg-graphite [&_.text-muted-foreground]:text-white/60 [&_h3]:text-white">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOS METIERS */}
      <section id="metiers" className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Une expertise à chaque étape" title="Un partenaire, tous vos projets." />
        <div className="mt-12 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {metiers.map((metier, index) => (
            <Link
              key={metier.id}
              href={`/nos-metiers#${metier.id}`}
              className="group border-b border-r border-border p-7 transition-colors hover:bg-primary hover:text-primary-foreground lg:p-9"
            >
              <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/70">0{index + 1}</p>
              <h3 className="mt-14 font-serif text-2xl">{metier.title}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground group-hover:text-primary-foreground/80">
                {metier.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* INVESTIR */}
      <section id="investir" className="border-y border-border bg-secondary/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Construire son patrimoine</p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Investissez dans l’immobilier ivoirien.</h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              Terrains, programmes et immobilier locatif : identifions ensemble l’opportunité qui correspond à vos
              objectifs, avec un simulateur d’investissement indicatif.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/investir/simulateur" className="bg-primary px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-primary-foreground">
              Simuler mon investissement
            </Link>
            <Link href="/investir/guide" className="border border-foreground/20 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
              Découvrir le guide
            </Link>
          </div>
        </div>
      </section>

      {/* ESTIMATION + IA */}
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-between gap-8 border border-border bg-card p-8 lg:p-10">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Estimez votre bien</p>
            <h3 className="font-serif text-3xl leading-tight">Une estimation fiable en 3 minutes.</h3>
            <p className="mt-4 leading-7 text-muted-foreground">
              Type de bien, localisation, superficie, état : notre équipe vous propose une estimation indicative,
              validée par un expert.
            </p>
          </div>
          <Link href="/services/estimation" className="flex w-fit items-center gap-2 bg-graphite px-6 py-4 text-xs font-semibold uppercase tracking-wider text-graphite-foreground transition-colors hover:bg-graphite/90">
            Demander mon estimation <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="flex flex-col justify-between gap-8 border border-border bg-graphite p-8 text-white lg:p-10">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              <Sparkles className="size-3.5" /> Akwaba AI
            </p>
            <h3 className="font-serif text-3xl leading-tight">Que recherchez-vous ?</h3>
            <p className="mt-4 leading-7 text-white/70">
              « Je cherche une villa de 4 chambres à Cocody avec un budget de 100 millions. » Notre assistant
              immobilier recherche pour vous dans tout le catalogue.
            </p>
          </div>
          <Link href="/assistant" className="flex w-fit items-center gap-2 bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
            Discuter avec Akwaba AI <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* CARTE */}
      <section id="carte" className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Explorer l’immobilier" title="La carte immobilière de la Côte d’Ivoire." />
          <Link href="/carte" className="text-sm font-semibold uppercase tracking-wider underline decoration-primary underline-offset-8">
            Explorer la carte
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap gap-2.5">
          {villesCouvertes.map((ville) => (
            <Link
              key={ville}
              href={`/biens?ville=${encodeURIComponent(ville)}`}
              className="flex items-center gap-1.5 border border-border px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <MapPin className="size-3.5" /> {ville}
            </Link>
          ))}
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <SectionHeading eyebrow="Ils nous font confiance" title="Ce que disent nos clients." align="center" className="mx-auto" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CHIFFRES CLES */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
        <div className="grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-3 lg:grid-cols-6">
          {keyStats.map((stat) => (
            <StatCounter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      {/* AGENCES */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Proche de vous" title="Nos agences" />
          <Link href="/agences" className="text-sm font-semibold uppercase tracking-wider underline decoration-primary underline-offset-8">
            Toutes nos agences
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {agencies.map((agency) => (
            <div key={agency.id} className="border border-border p-6">
              <p className="font-serif text-lg">{agency.city}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{agency.address}</p>
              <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{agency.hours}</p>
              <p className="mt-4 text-sm font-semibold text-primary">{agency.phone}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MAGAZINE */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Akwaba Magazine" title="Nos derniers articles" />
          <Link href="/magazine" className="text-sm font-semibold uppercase tracking-wider underline decoration-primary underline-offset-8">
            Tout le magazine
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {latestArticles.map((article) => (
            <Link key={article.id} href={`/magazine/${article.slug}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                <img src={article.image} alt={article.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="py-5">
                <Badge variant="outline">{article.category}</Badge>
                <h3 className="mt-3 font-serif text-lg leading-snug transition-colors group-hover:text-primary">{article.title}</h3>
                <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{formatDate(article.date)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-graphite text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Prêt à démarrer votre projet immobilier ?</h2>
            <p className="mt-5 leading-7 text-white/70">
              Nos conseillers vous accompagnent, de la première visite à la remise des clés.
            </p>
          </div>
          <Link href="/contact" className="bg-primary px-8 py-5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
            Contacter un conseiller
          </Link>
        </div>
      </section>
    </>
  )
}
