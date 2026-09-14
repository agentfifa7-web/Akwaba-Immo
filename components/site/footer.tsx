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
function TiktokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6 5.1c-.5-.5-.8-1.2-.9-2H12.9v13.2a2.6 2.6 0 1 1-1.8-2.5V10a5.8 5.8 0 1 0 4.9 5.8V9.4a7.8 7.8 0 0 0 4.5 1.4V7.9a4.6 4.6 0 0 1-3-2.8Z" />
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
    title: 'Marketplace',
    links: [
      { href: '/shop', label: 'Tout le shop' },
      { href: '/shop/beaute', label: 'Beauté' },
      { href: '/shop/mode', label: 'Mode' },
      { href: '/shop/cheveux', label: 'Cheveux' },
      { href: '/shop/accessoires', label: 'Accessoires' },
      { href: '/boutiques', label: 'Toutes les boutiques' },
    ],
  },
  {
    title: 'Essayer & Créer',
    links: [
      { href: '/essayer', label: 'Try-On Hub' },
      { href: '/essayer/avatar', label: 'Mon Avatar' },
      { href: '/creer/look', label: 'Créer mon look' },
      { href: '/creer/couleurs', label: 'Color Lab' },
      { href: '/creer/mes-creations', label: 'Mes créations' },
    ],
  },
  {
    title: 'Services',
    links: [
      { href: '/stylistes', label: 'Stylistes' },
      { href: '/professionnels', label: 'Professionnels beauté' },
      { href: '/academy', label: 'Beauty Academy' },
      { href: '/pres-de-moi', label: 'Près de moi' },
      { href: '/live', label: 'KÔSMÉA Live' },
    ],
  },
  {
    title: 'Communauté',
    links: [
      { href: '/communaute', label: 'Feed communauté' },
      { href: '/defis', label: 'Défis de looks' },
      { href: '/privilege', label: 'KÔSMÉA Privilège' },
      { href: '/a-propos', label: 'À propos' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Mon compte',
    links: [
      { href: '/connexion', label: 'Connexion' },
      { href: '/inscription', label: 'Inscription' },
      { href: '/mon-kosmea', label: 'Mon KÔSMÉA' },
      { href: '/assistant', label: 'KÔSMÉA AI' },
      { href: '/plan-du-site', label: 'Plan du site' },
    ],
  },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-obsidian text-obsidian-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.1fr_2.6fr]">
          <div>
            <p className="font-serif text-3xl tracking-[0.15em]">
              KÔSMÉA<span className="text-accent">.</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
              Discover. Try. Create. Shop. La première super-plateforme ivoirienne dédiée à la beauté, à la mode et
              au style — marketplace, essayage virtuel, stylistes et Beauty Academy.
            </p>
            <div className="mt-6 flex gap-3">
              {[FacebookIcon, InstagramIcon, TiktokIcon, YoutubeIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Réseau social KÔSMÉA"
                  className="flex size-9 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
            <div className="mt-8 space-y-1 text-sm text-white/60">
              <p>Cocody, Abidjan — Côte d’Ivoire</p>
              <p>+225 07 00 00 00 00</p>
              <p>bonjour@kosmea.africa</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">{col.title}</p>
                <ul className="space-y-2.5 text-sm text-white/70">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="transition-colors hover:text-accent">
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
          <p>© {new Date().getFullYear()} KÔSMÉA. Tous droits réservés.</p>
          <p>Côte d’Ivoire · Ambition panafricaine</p>
        </div>
      </div>
    </footer>
  )
}
