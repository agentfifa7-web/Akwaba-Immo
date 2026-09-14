import Link from 'next/link'

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46A21 21 0 0 0 14.1 4.3c-2.25 0-3.79 1.37-3.79 3.89v2.25H7.75v2.96h2.56V21h3.19Z" />
    </svg>
  )
}
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 8.5H4.06V20h2.88V8.5ZM5.5 4a1.67 1.67 0 1 0 0 3.34A1.67 1.67 0 0 0 5.5 4ZM20 13.28c0-3.14-1.68-4.6-3.92-4.6a3.39 3.39 0 0 0-3.08 1.7V8.5H10.1c.04.86 0 11.5 0 11.5h2.9v-6.42c0-.34.02-.69.13-.94.28-.68.93-1.4 2-1.4 1.42 0 2 1.08 2 2.66V20H20v-6.72Z" />
    </svg>
  )
}
function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.6 7.6a2.7 2.7 0 0 0-1.9-1.9C18 5.2 12 5.2 12 5.2s-6 0-7.7.5A2.7 2.7 0 0 0 2.4 7.6 28 28 0 0 0 2 12a28 28 0 0 0 .4 4.4 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.4ZM10 15V9l5.2 3-5.2 3Z" />
    </svg>
  )
}

const columns = [
  {
    title: 'Catalogue',
    links: [
      { href: '/biens', label: 'Tous les biens' },
      { href: '/acheter', label: 'Acheter' },
      { href: '/louer', label: 'Louer' },
      { href: '/terrains', label: 'Terrains' },
      { href: '/programmes', label: 'Programmes immobiliers' },
      { href: '/carte', label: 'Carte immobilière' },
    ],
  },
  {
    title: 'Projets & Investir',
    links: [
      { href: '/projets', label: 'Nos projets' },
      { href: '/projets/avancement', label: 'Avancement des projets' },
      { href: '/projets/livres', label: 'Projets livrés' },
      { href: '/investir', label: 'Investir' },
      { href: '/investir/simulateur', label: 'Simulateur d’investissement' },
    ],
  },
  {
    title: 'Contenus',
    links: [
      { href: '/magazine', label: 'Magazine' },
      { href: '/tv', label: 'Akwaba TV' },
      { href: '/actualites', label: 'Actualités' },
      { href: '/evenements', label: 'Événements' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { href: '/a-propos', label: 'À propos' },
      { href: '/nos-metiers', label: 'Nos métiers' },
      { href: '/equipe', label: 'Nos équipes' },
      { href: '/agences', label: 'Nos agences' },
      { href: '/carrieres', label: 'Carrières' },
      { href: '/partenaires', label: 'Partenaires' },
    ],
  },
  {
    title: 'Espace client',
    links: [
      { href: '/connexion', label: 'Connexion' },
      { href: '/inscription', label: 'Inscription' },
      { href: '/mon-espace', label: 'Mon espace' },
      { href: '/assistant', label: 'Akwaba AI' },
      { href: '/decoration', label: 'Décorateur virtuel 3D' },
      { href: '/plan-du-site', label: 'Plan du site' },
    ],
  },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-graphite text-graphite-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.1fr_2.4fr]">
          <div>
            <p className="font-serif text-3xl">
              AKWABA <span className="text-primary">IMMOBILIER</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
              Votre partenaire de confiance pour acheter, louer, construire, investir et faire gérer votre patrimoine
              immobilier en Côte d’Ivoire.
            </p>
            <div className="mt-6 flex gap-3">
              {[FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Réseau social Akwaba Immobilier"
                  className="flex size-9 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
            <div className="mt-8 space-y-1 text-sm text-white/60">
              <p>Cocody, Abidjan — Côte d’Ivoire</p>
              <p>+225 27 22 00 00 00</p>
              <p>contact@akwaba-immobilier.ci</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">{col.title}</p>
                <ul className="space-y-2.5 text-sm text-white/70">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="transition-colors hover:text-primary">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Akwaba Immobilier. Tous droits réservés.</p>
          <p>Abidjan · Yamoussoukro · Grand-Bassam · Côte d’Ivoire</p>
        </div>
      </div>
    </footer>
  )
}
