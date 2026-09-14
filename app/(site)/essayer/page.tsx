import Link from 'next/link'
import { Palette, Shirt, Scissors, Sparkles, Wand2 } from 'lucide-react'

import { looks } from '@/lib/data'
import { LookCard } from '@/components/site/look-card'
import { SectionHeading } from '@/components/site/section-heading'

const tiles = [
  { href: '/essayer/maquillage', label: 'Maquillage', icon: Palette, description: 'Fond de teint, blush, fard, rouge à lèvres — composez votre maquillage.' },
  { href: '/essayer/mode', label: 'Mode', icon: Shirt, description: 'Essayez robes, tenues et vêtements selon votre morphologie.' },
  { href: '/essayer/coiffure', label: 'Coiffure', icon: Scissors, description: 'Perruques, tresses, couleurs — trouvez votre coiffure idéale.' },
  { href: '/essayer/avatar', label: 'Mon Avatar', icon: Wand2, description: 'Créez et personnalisez votre avatar KÔSMÉA.' },
]

const featuredLooks = looks.filter((l) => l.featured)

export default function TryOnHubPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading
        eyebrow="Virtual Beauty Studio"
        title="Que voulez-vous essayer ?"
        description="Une simulation indicative pour vous aider à visualiser un look avant d’acheter — toujours annoncée comme telle, jamais présentée comme un rendu photo-réel garanti."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile, i) => (
          <Link
            key={tile.href}
            href={tile.href}
            className="group flex flex-col justify-between gap-8 border border-border bg-card p-7 transition-colors hover:border-primary"
          >
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

      <section className="mt-20">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-accent" />
          <h2 className="font-serif text-2xl">Looks complets à essayer</h2>
        </div>
        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featuredLooks.map((look) => (
            <LookCard key={look.id} look={look} />
          ))}
        </div>
      </section>
    </div>
  )
}
