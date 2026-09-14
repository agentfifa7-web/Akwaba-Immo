import Link from 'next/link'
import { Compass, Eye, Heart, ShieldCheck, Sparkles, Target } from 'lucide-react'

import { agencies, agents, keyStats } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { StatCounter } from '@/components/site/stat-counter'
import { Reveal } from '@/components/site/reveal'
import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'À propos — Akwaba Immobilier',
  description: 'Découvrez l’histoire, la mission et les valeurs d’Akwaba Immobilier, acteur de référence de l’immobilier en Côte d’Ivoire.',
}

const direction = agents.filter((a) => a.department === 'direction')

const valeurs = [
  { icon: ShieldCheck, title: 'Confiance', text: 'Chaque dossier est vérifié, chaque engagement est tenu. La confiance se gagne au quotidien, sur le terrain.' },
  { icon: Sparkles, title: 'Excellence', text: 'Nous visons la rigueur et la qualité à chaque étape, de la première visite à la remise des clés.' },
  { icon: Heart, title: 'Proximité', text: 'Une équipe locale, disponible et à l’écoute, qui connaît chaque quartier et chaque marché.' },
  { icon: Compass, title: 'Intégrité', text: 'Une transparence totale sur les prix, les documents et les process, sans mauvaise surprise.' },
]

const timeline = [
  { year: '2011', title: 'Création d’Akwaba Immobilier', text: 'Fondation de l’agence à Cocody avec une équipe de 4 personnes, spécialisée dans la transaction résidentielle.' },
  { year: '2014', title: 'Ouverture du pôle Foncier', text: 'Structuration d’une cellule dédiée à la sécurisation et à la régularisation des titres fonciers.' },
  { year: '2017', title: 'Lancement du pôle Construction', text: 'Premiers programmes immobiliers en maîtrise d’ouvrage déléguée à Bingerville et Anyama.' },
  { year: '2019', title: 'Extension à Yamoussoukro', text: 'Ouverture d’une deuxième agence hors d’Abidjan pour accompagner la demande dans le district de la Vallée du Bandama.' },
  { year: '2021', title: 'Pôle Gestion locative', text: 'Création du service de gestion locative complète pour les propriétaires bailleurs, avec reporting digitalisé.' },
  { year: '2023', title: 'Ouverture à Grand-Bassam', text: 'Développement de l’offre balnéaire et lancement des premiers programmes en bord de mer.' },
  { year: '2025', title: 'Plateforme digitale Akwaba', text: 'Lancement du site et de l’assistant intelligent pour accompagner la recherche et l’investissement en ligne.' },
  { year: '2026', title: 'Cité Atlantide', text: 'Lancement de notre plus grand programme résidentiel intégré, 180 lots à Bingerville.' },
]

const engagements = [
  'Vérification documentaire systématique avant toute mise en marché',
  'Accompagnement personnalisé par un conseiller dédié',
  'Transparence totale sur les prix, frais et délais',
  'Reporting régulier pour tout mandat de gestion ou de vente',
]

export default function AProposPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[520px] items-end overflow-hidden bg-graphite pb-14 pt-40 lg:min-h-[600px] lg:pb-20">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2400&q=90"
          alt="Équipe Akwaba Immobilier au bureau"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Qui sommes-nous</p>
          <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
            15 ans à bâtir la confiance immobilière en Côte d’Ivoire.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 lg:text-lg">
            Depuis 2011, Akwaba Immobilier accompagne particuliers, investisseurs et institutions dans l’achat, la
            vente, la location, la construction, l’aménagement foncier et la gestion de patrimoine.
          </p>
        </div>
      </section>

      {/* NOTRE HISTOIRE */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Notre histoire</p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Née à Abidjan, tournée vers tout le pays.</h2>
            <p className="mt-6 leading-7 text-muted-foreground">
              Akwaba Immobilier est née en 2011 d’une conviction simple : l’immobilier ivoirien méritait un acteur
              capable d’allier expertise locale et exigence de service. Partis d’une petite agence à Cocody, nous
              avons progressivement structuré tous les métiers de l’immobilier — transaction, foncier, construction,
              réhabilitation et gestion — pour offrir à nos clients un accompagnement complet, du premier contact à la
              remise des clés.
            </p>
            <p className="mt-4 leading-7 text-muted-foreground">
              Aujourd’hui implantés à Abidjan, Yamoussoukro et Grand-Bassam, nous accompagnons chaque année des
              centaines de familles, d’investisseurs et de promoteurs partenaires, avec la même exigence de
              transparence et de rigueur documentaire qui a fait notre réputation.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85" alt="Programme immobilier Akwaba" className="aspect-[3/4] w-full rounded-xl object-cover" />
              <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=85" alt="Équipe Akwaba Immobilier" className="mt-8 aspect-[3/4] w-full rounded-xl object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="bg-graphite text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:grid-cols-2 lg:px-10 lg:py-28">
          <Reveal className="border border-white/15 p-8 lg:p-10">
            <Target className="size-8 text-primary" />
            <h3 className="mt-6 font-serif text-2xl">Notre mission</h3>
            <p className="mt-4 leading-7 text-white/70">
              Rendre l’immobilier ivoirien accessible, sécurisé et rentable pour tous : particuliers, investisseurs et
              institutions, en proposant une offre intégrée et un accompagnement de confiance à chaque étape.
            </p>
          </Reveal>
          <Reveal delay={100} className="border border-white/15 p-8 lg:p-10">
            <Eye className="size-8 text-primary" />
            <h3 className="mt-6 font-serif text-2xl">Notre vision</h3>
            <p className="mt-4 leading-7 text-white/70">
              Devenir la référence de l’immobilier en Côte d’Ivoire et en Afrique de l’Ouest, reconnue pour la
              qualité de ses réalisations et l’exemplarité de sa relation client.
            </p>
          </Reveal>
        </div>
      </section>

      {/* VALEURS */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Ce qui nous anime" title="Nos valeurs" align="center" className="mx-auto" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valeurs.map((v) => (
            <div key={v.title} className="border border-border p-7">
              <v.icon className="size-7 text-primary" />
              <h3 className="mt-5 font-serif text-xl">{v.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CHIFFRES CLES */}
      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {keyStats.map((stat) => (
              <StatCounter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Notre parcours" title="15 ans d’évolution, étape par étape." />
        <div className="mt-14 border-l border-border pl-8 sm:pl-10">
          {timeline.map((step, i) => (
            <Reveal key={step.year} delay={i * 60} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[41px] top-1 flex size-5 items-center justify-center bg-primary sm:-left-[49px]">
                <span className="size-1.5 bg-primary-foreground" />
              </span>
              <p className="font-serif text-2xl text-primary">{step.year}</p>
              <h3 className="mt-1 font-serif text-xl">{step.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DIRECTION */}
      <section className="bg-secondary/60 border-y border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Notre comité de direction" title="Une gouvernance expérimentée" />
            <Link href="/equipe" className="text-sm font-semibold uppercase tracking-wider underline decoration-primary underline-offset-8">
              Toute l’équipe
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {direction.map((member) => (
              <div key={member.id} className="overflow-hidden rounded-xl bg-card border border-border">
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  <img src={member.photo} alt={member.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg">{member.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-primary">{member.role}</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPLANTATION */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Présents sur le terrain" title="Notre implantation" />
          <Link href="/agences" className="text-sm font-semibold uppercase tracking-wider underline decoration-primary underline-offset-8">
            Toutes nos agences
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap gap-2.5">
          {agencies.map((agency) => (
            <Badge key={agency.id} variant="outline" className="px-4 py-2.5 text-xs normal-case">
              {agency.city}
            </Badge>
          ))}
        </div>
      </section>

      {/* ENGAGEMENTS TEASER */}
      <section className="bg-graphite text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Nos engagements</p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Une exigence que nous tenons, au quotidien.</h2>
            <ul className="mt-6 space-y-3">
              {engagements.map((e) => (
                <li key={e} className="flex items-start gap-3 text-sm leading-6 text-white/75">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" /> {e}
                </li>
              ))}
            </ul>
          </div>
          <Link href="/engagements" className="shrink-0 rounded-lg bg-primary px-7 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0">
            Découvrir nos engagements
          </Link>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
        <div className="flex flex-col items-start gap-8 border border-border bg-card p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">Envie de nous rencontrer ?</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Nos équipes vous reçoivent dans nos agences ou vous accompagnent à distance, où que vous soyez.
            </p>
          </div>
          <Link href="/contact" className="rounded-lg bg-primary px-8 py-5 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0">
            Contacter un conseiller
          </Link>
        </div>
      </section>
    </>
  )
}
