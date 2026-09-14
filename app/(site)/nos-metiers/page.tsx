import Link from 'next/link'
import { ArrowRight, ClipboardList, HardHat, Hammer, Home, KeyRound, Trees } from 'lucide-react'

import { metiers } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'

export const metadata = {
  title: 'Nos métiers — Akwaba Immobilier',
  description: 'Achat-vente, location, construction, aménagement foncier, réhabilitation, gestion : découvrez les six métiers d’Akwaba Immobilier.',
}

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Home, KeyRound, HardHat, Trees, Hammer, ClipboardList,
}

const details: Record<
  string,
  {
    image: string
    long: string
    services: string[]
    ctaHref: string
    ctaLabel: string
  }
> = {
  'achat-vente': {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    long: 'Notre pôle transaction accompagne particuliers et investisseurs à chaque étape d’un achat ou d’une vente : définition du besoin, sélection des biens, négociation, sécurisation juridique et signature chez le notaire. Chaque bien mis en marché fait l’objet d’une vérification documentaire préalable par notre équipe foncière et juridique.',
    services: [
      'Recherche et sélection de biens sur mesure',
      'Estimation et mise en valeur des biens à vendre',
      'Négociation et accompagnement jusqu’à la signature',
      'Vérification documentaire et sécurisation juridique',
      'Visites virtuelles et accompagnement à distance',
      'Mise en relation avec notaires et partenaires bancaires',
    ],
    ctaHref: '/biens',
    ctaLabel: 'Voir les biens à vendre',
  },
  location: {
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85',
    long: 'Que vous cherchiez un studio, un appartement meublé, une villa ou des bureaux, notre pôle location vous accompagne dans la recherche, la visite et la signature du bail. Pour les propriétaires, nous assurons la mise en location rapide et sécurisée de leur bien, avec sélection rigoureuse des locataires.',
    services: [
      'Mise en location de biens résidentiels et professionnels',
      'Sélection et vérification des locataires',
      'Rédaction et signature des baux',
      'État des lieux d’entrée et de sortie',
      'Accompagnement des expatriés et professionnels',
      'Location saisonnière (Assinie, Grand-Bassam)',
    ],
    ctaHref: '/louer',
    ctaLabel: 'Voir les biens à louer',
  },
  construction: {
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85',
    long: 'De la conception architecturale à la remise des clés, notre pôle technique pilote la construction de votre maison, villa ou immeuble. Un conducteur de travaux dédié assure le suivi de chantier, le respect des délais et des budgets, avec un reporting régulier.',
    services: [
      'Étude de sol et conception architecturale',
      'Dépôt et suivi du permis de construire',
      'Sélection d’entreprises qualifiées et supervision de chantier',
      'Suivi budgétaire et reporting régulier',
      'Contrôle qualité à chaque phase des travaux',
      'Réception des travaux et remise des clés',
    ],
    ctaHref: '/services/construction',
    ctaLabel: 'Découvrir notre offre construction',
  },
  'amenagement-foncier': {
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85',
    long: 'Notre pôle foncier crée et développe des lotissements sécurisés, de l’acquisition des terres à la viabilisation complète. Nous accompagnons également les particuliers dans la régularisation, la sécurisation et la vérification de titres fonciers avant tout achat.',
    services: [
      'Prospection et acquisition foncière',
      'Régularisation et sécurisation de titres',
      'Aménagement et viabilisation de lotissements',
      'Bornage et plans de morcellement',
      'Vérification documentaire avant acquisition',
      'Accompagnement des projets de lotissement pour promoteurs',
    ],
    ctaHref: '/terrains',
    ctaLabel: 'Voir les terrains disponibles',
  },
  rehabilitation: {
    image: 'https://images.unsplash.com/photo-1503387837-b154d5074bd2?auto=format&fit=crop&w=1600&q=85',
    long: 'Nous redonnons vie et valeur aux bâtiments existants : rénovation d’appartements, réhabilitation de villas anciennes, transformation d’usage. Notre équipe technique établit un diagnostic complet avant de proposer un plan de rénovation adapté à votre budget et à vos objectifs.',
    services: [
      'Diagnostic technique et étude de faisabilité',
      'Rénovation intérieure et extérieure',
      'Mise aux normes électriques et sanitaires',
      'Transformation et changement d’usage',
      'Valorisation avant mise en vente ou en location',
      'Suivi de chantier de A à Z',
    ],
    ctaHref: '/services/renovation',
    ctaLabel: 'Découvrir notre offre rénovation',
  },
  gestion: {
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=85',
    long: 'Notre pôle gestion locative prend en charge, pour le compte des propriétaires, l’ensemble de la gestion quotidienne de leur patrimoine : recherche de locataires, encaissement des loyers, entretien et reporting mensuel, pour une tranquillité d’esprit totale.',
    services: [
      'Recherche et sélection de locataires',
      'Encaissement et reversement des loyers',
      'États des lieux et suivi des sinistres',
      'Entretien préventif et gestion des travaux',
      'Reporting mensuel digitalisé au propriétaire',
      'Gestion de copropriétés et d’immeubles de rapport',
    ],
    ctaHref: '/services/gestion',
    ctaLabel: 'Découvrir notre offre gestion',
  },
}

export default function NosMetiersPage() {
  return (
    <>
      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-graphite pb-14 pt-40 lg:min-h-[480px]">
        <img
          src="https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=2400&q=90"
          alt="Nos métiers immobiliers"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Une expertise à chaque étape</p>
          <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl">
            Six métiers, un seul partenaire.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 lg:text-lg">
            Achat-vente, location, construction, aménagement foncier, réhabilitation et gestion : nous couvrons tout
            le cycle de vie de votre projet immobilier.
          </p>
        </div>
      </section>

      {/* SOMMAIRE RAPIDE */}
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-6 lg:px-10">
          <div className="flex flex-wrap gap-2.5">
            {metiers.map((m) => (
              <a
                key={m.id}
                href={`#${m.id}`}
                className="border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {m.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {metiers.map((metier, index) => {
        const Icon = icons[metier.icon] ?? Home
        const detail = details[metier.id]
        const reverse = index % 2 === 1
        return (
          <section key={metier.id} id={metier.id} className="scroll-mt-24 border-b border-border">
            <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
              <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <Reveal>
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img src={detail.image} alt={metier.title} className="h-full w-full object-cover" />
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-muted-foreground">0{index + 1}</span>
                    <Icon className="size-6 text-primary" />
                  </div>
                  <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">{metier.title}</h2>
                  <p className="mt-5 leading-7 text-muted-foreground">{detail.long}</p>
                  <ul className="mt-6 space-y-2.5">
                    {detail.services.map((s) => (
                      <li key={s} className="flex items-start gap-3 text-sm leading-6 text-foreground">
                        <span className="mt-2 size-1.5 shrink-0 bg-primary" /> {s}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={detail.ctaHref}
                    className="mt-8 flex w-fit items-center gap-2 bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {detail.ctaLabel} <ArrowRight className="size-4" />
                  </Link>
                </Reveal>
              </div>
            </div>
          </section>
        )
      })}

      <section className="bg-graphite text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Un projet immobilier en tête ?</h2>
            <p className="mt-5 leading-7 text-white/70">Nos conseillers vous orientent vers le métier adapté à votre besoin.</p>
          </div>
          <Link href="/contact" className="bg-primary px-8 py-5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
            Parler à un conseiller
          </Link>
        </div>
      </section>
    </>
  )
}
