import Link from 'next/link'

import { SectionHeading } from '@/components/site/section-heading'

const sections = [
  { title: 'Découvrir', links: [['/', 'Accueil'], ['/recherche', 'Recherche'], ['/assistant', 'KÔSMÉA AI'], ['/pres-de-moi', 'Près de moi']] },
  { title: 'Shop', links: [['/shop', 'Marketplace'], ['/shop/beaute', 'Beauté'], ['/shop/mode', 'Mode'], ['/shop/cheveux', 'Cheveux'], ['/shop/accessoires', 'Accessoires'], ['/boutiques', 'Boutiques']] },
  { title: 'Essayer', links: [['/essayer', 'Try-On Hub'], ['/essayer/maquillage', 'Maquillage'], ['/essayer/mode', 'Mode'], ['/essayer/coiffure', 'Coiffure'], ['/essayer/avatar', 'Mon Avatar']] },
  { title: 'Créer', links: [['/creer', 'Studio de création'], ['/creer/look', 'Créer mon look'], ['/creer/tenue', 'Créer ma tenue'], ['/creer/couleurs', 'Color Lab'], ['/creer/mes-creations', 'Mes créations']] },
  { title: 'Services', links: [['/stylistes', 'Stylistes'], ['/professionnels', 'Professionnels beauté'], ['/academy', 'Beauty Academy']] },
  { title: 'Communauté', links: [['/communaute', 'Feed'], ['/defis', 'Défis'], ['/live', 'Live']] },
  { title: 'Mon compte', links: [['/connexion', 'Connexion'], ['/inscription', 'Inscription'], ['/mon-kosmea', 'Mon KÔSMÉA'], ['/panier', 'Panier'], ['/privilege', 'Privilège']] },
  { title: 'Espaces pro', links: [['/pro', 'Espace vendeur'], ['/admin', 'Administration']] },
  { title: 'À propos', links: [['/a-propos', 'À propos'], ['/contact', 'Contact'], ['/faq', 'FAQ']] },
]

export default function SitemapPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="Navigation" title="Plan du site" />
      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{section.title}</p>
            <ul className="mt-3 space-y-2">
              {section.links.map(([href, label]) => (
                <li key={href}><Link href={href} className="text-sm text-foreground hover:text-accent">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
