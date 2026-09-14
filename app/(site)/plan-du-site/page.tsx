import Link from 'next/link'

import { SectionHeading } from '@/components/site/section-heading'

export const metadata = {
  title: 'Plan du site — Akwaba Immobilier',
  description: 'Retrouvez l’ensemble des pages et rubriques du site Akwaba Immobilier.',
}

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: 'Site institutionnel',
    links: [
      { href: '/', label: 'Accueil' },
      { href: '/a-propos', label: 'À propos' },
      { href: '/nos-metiers', label: 'Nos métiers' },
      { href: '/equipe', label: 'Notre équipe' },
      { href: '/agences', label: 'Nos agences' },
      { href: '/contact', label: 'Contact' },
      { href: '/faq', label: 'FAQ' },
      { href: '/carrieres', label: 'Carrières' },
      { href: '/partenaires', label: 'Partenaires' },
      { href: '/engagements', label: 'Nos engagements' },
      { href: '/temoignages', label: 'Témoignages' },
      { href: '/presse', label: 'Espace presse' },
    ],
  },
  {
    title: 'Catalogue',
    links: [
      { href: '/biens', label: 'Tous les biens' },
      { href: '/acheter', label: 'Acheter' },
      { href: '/louer', label: 'Louer' },
      { href: '/terrains', label: 'Terrains' },
      { href: '/programmes', label: 'Programmes immobiliers' },
      { href: '/carte', label: 'Carte immobilière' },
      { href: '/recherche', label: 'Recherche avancée' },
    ],
  },
  {
    title: 'Nos projets',
    links: [
      { href: '/projets', label: 'Tous les projets' },
      { href: '/projets/avancement', label: 'Avancement des projets' },
      { href: '/projets/livres', label: 'Projets livrés' },
      { href: '/projets/a-venir', label: 'Projets à venir' },
    ],
  },
  {
    title: 'Investissement',
    links: [
      { href: '/investir', label: 'Investir' },
      { href: '/investir/opportunites', label: 'Opportunités d’investissement' },
      { href: '/investir/simulateur', label: 'Simulateur d’investissement' },
      { href: '/investir/guide', label: 'Guide de l’investisseur' },
    ],
  },
  {
    title: 'Services',
    links: [
      { href: '/services/construction', label: 'Construction' },
      { href: '/services/gestion', label: 'Gestion immobilière' },
      { href: '/services/renovation', label: 'Réhabilitation & rénovation' },
      { href: '/services/estimation', label: 'Estimation immobilière' },
      { href: '/services/conseil', label: 'Conseil & accompagnement' },
      { href: '/services/juridique', label: 'Accompagnement juridique' },
    ],
  },
  {
    title: 'Contenus',
    links: [
      { href: '/magazine', label: 'Magazine' },
      { href: '/tv', label: 'Akwaba TV' },
      { href: '/actualites', label: 'Actualités' },
      { href: '/evenements', label: 'Événements' },
    ],
  },
  {
    title: 'Intelligence artificielle',
    links: [
      { href: '/assistant', label: 'Akwaba AI — Assistant' },
      { href: '/recherche-intelligente', label: 'Recherche intelligente' },
    ],
  },
  {
    title: 'Espace client',
    links: [
      { href: '/connexion', label: 'Connexion' },
      { href: '/inscription', label: 'Inscription' },
      { href: '/mon-espace', label: 'Mon espace' },
    ],
  },
]

export default function PlanDuSitePage() {
  return (
    <>
      <section className="relative flex min-h-[340px] items-end overflow-hidden bg-graphite pb-14 pt-40 lg:min-h-[380px]">
        <img
          src="https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=2400&q=90"
          alt="Plan du site Akwaba Immobilier"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/60 to-graphite/20" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Navigation</p>
          <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl">
            Plan du site.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Toutes nos rubriques" title="Retrouvez rapidement une page" />
        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-5 border-b border-border pb-3 text-xs font-semibold uppercase tracking-wider text-primary">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm leading-6 text-foreground transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
