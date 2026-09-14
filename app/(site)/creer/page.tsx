import Link from 'next/link'
import { Palette, Shirt, Sparkles, FolderHeart } from 'lucide-react'

import { SectionHeading } from '@/components/site/section-heading'

const tiles = [
  { href: '/creer/look', label: 'Créer mon look', icon: Sparkles, description: 'Assemblez cheveux, maquillage, tenue et accessoires en un look complet.' },
  { href: '/creer/tenue', label: 'Créer ma tenue', icon: Shirt, description: 'Studio de création : catégorie, coupe, tissu, couleur — concevez votre pièce.' },
  { href: '/creer/couleurs', label: 'Color Lab', icon: Palette, description: 'Mélangez des teintes et trouvez les produits qui s’en rapprochent le plus.' },
  { href: '/creer/mes-creations', label: 'Mes créations', icon: FolderHeart, description: 'Retrouvez tous vos looks, tenues et couleurs enregistrés.' },
]

export default function CreateHubPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="Studio de création" title="Créez votre style" description="Composez vos propres looks et tenues à partir de la marketplace KÔSMÉA, ou faites-les réaliser par un créateur." />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => (
          <Link key={tile.href} href={tile.href} className="group flex flex-col justify-between gap-8 border border-border bg-card p-7 transition-colors hover:border-primary">
            <div>
              <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <tile.icon className="size-5" />
              </span>
              <h3 className="mt-5 font-serif text-xl">{tile.label}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{tile.description}</p>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Commencer →</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
