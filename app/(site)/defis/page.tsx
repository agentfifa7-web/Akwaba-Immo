import Link from 'next/link'
import { Flame, Gift, Trophy, Users } from 'lucide-react'

import { challenges, formatDate } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Badge } from '@/components/ui/badge'

export default function ChallengesPage() {
  const active = challenges.filter((c) => c.status === 'actif')
  const ended = challenges.filter((c) => c.status === 'termine')

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="Look Challenges" title="Les défis de la semaine" description="Créez votre look, la communauté vote, les meilleurs gagnent des bons d’achat, des produits et des séances stylistes." />

      <h2 className="mt-12 flex items-center gap-2 font-serif text-2xl">
        <Flame className="size-5 text-accent" /> En cours
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {active.map((c) => (
          <div key={c.id} className="overflow-hidden border border-border bg-card">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img src={c.cover} alt={c.title} className="h-full w-full object-cover" />
              <Badge className="absolute left-3 top-3">Actif</Badge>
            </div>
            <div className="p-5">
              <h3 className="font-serif text-lg">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.theme}</p>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground"><Gift className="size-3.5 text-accent" /> {c.prize}</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><Users className="size-3.5" /> {c.entriesCount} participations · jusqu’au {formatDate(c.deadline)}</p>
              <Link href="/creer/look" className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-accent hover:underline">
                Participer avec mon look →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-16 flex items-center gap-2 font-serif text-2xl">
        <Trophy className="size-5 text-champagne" /> Défis passés
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ended.map((c) => (
          <div key={c.id} className="overflow-hidden border border-border bg-card opacity-80">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img src={c.cover} alt={c.title} className="h-full w-full object-cover grayscale" />
              <Badge variant="muted" className="absolute left-3 top-3">Terminé</Badge>
            </div>
            <div className="p-5">
              <h3 className="font-serif text-lg">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.theme}</p>
              <p className="mt-3 text-xs text-muted-foreground">{c.entriesCount} participations</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
