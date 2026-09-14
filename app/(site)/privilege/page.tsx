'use client'

import { Check, Crown, Gem, Sparkle } from 'lucide-react'

import { usePoints } from '@/lib/store'
import { SectionHeading } from '@/components/site/section-heading'
import { cn } from '@/lib/utils'

const tiers = [
  {
    name: 'Silver', icon: Sparkle, threshold: 0,
    benefits: ['Accès à la marketplace complète', 'Points KÔSMÉA sur chaque achat', 'Newsletter exclusive'],
  },
  {
    name: 'Gold', icon: Crown, threshold: 2000,
    benefits: ['Livraison privilégiée', 'Accès anticipé aux collections', 'Offres privées mensuelles', '1 consultation styliste offerte par an'],
  },
  {
    name: 'Diamond', icon: Gem, threshold: 6000,
    benefits: ['Tous les avantages Gold', 'Stylistes premium dédiés', 'Invitations aux événements KÔSMÉA', 'Cadeaux exclusifs à chaque saison', 'Support prioritaire 7j/7'],
  },
]

export default function PrivilegePage() {
  const { total, level, nextThreshold, hydrated } = usePoints()

  return (
    <div>
      <section className="bg-plum text-white">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center lg:px-10 lg:py-28">
          <p className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-champagne">
            <Crown className="size-4" /> KÔSMÉA Privilège
          </p>
          <h1 className="font-serif text-5xl leading-tight sm:text-6xl">Silver. Gold. Diamond.</h1>
          <p className="mx-auto mt-6 max-w-xl leading-7 text-white/70">
            Un programme de fidélité pensé pour récompenser chaque achat, chaque avis, chaque look partagé. Plus vous
            interagissez avec KÔSMÉA, plus votre expérience devient exclusive.
          </p>
          {hydrated && (
            <div className="mx-auto mt-10 max-w-sm rounded-xl bg-white/10 p-6 text-left backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wider text-champagne">Votre statut actuel</p>
              <p className="mt-1 font-serif text-3xl">{level}</p>
              <p className="mt-2 text-sm text-white/70">{total.toLocaleString('fr-FR')} points KÔSMÉA</p>
              {nextThreshold && (
                <>
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/20">
                    <div className="h-full rounded-full bg-champagne" style={{ width: `${Math.min(100, (total / nextThreshold) * 100)}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-white/60">{nextThreshold - total} points avant le niveau suivant</p>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Trois niveaux" title="Choisissez votre expérience" align="center" className="mx-auto" />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => {
            const active = level === tier.name
            return (
              <div key={tier.name} className={cn('border p-8', active ? 'border-primary bg-primary/5' : 'border-border')}>
                <tier.icon className="size-8 text-champagne" />
                <h3 className="mt-4 font-serif text-2xl">{tier.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {tier.threshold === 0 ? 'Dès votre inscription' : `À partir de ${tier.threshold.toLocaleString('fr-FR')} points`}
                </p>
                <ul className="mt-6 space-y-3">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" /> {b}
                    </li>
                  ))}
                </ul>
                {active && <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-primary">Votre niveau actuel</p>}
              </div>
            )
          })}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/60">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center lg:px-10">
          <h2 className="font-serif text-3xl">Comment gagner des points KÔSMÉA ?</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { label: 'Achat', points: '+100' },
              { label: 'Avis laissé', points: '+20' },
              { label: 'Cours terminé', points: '+50' },
              { label: 'Look publié', points: '+30' },
              { label: 'Défi remporté', points: '+100' },
              { label: 'Parrainage', points: '+250' },
            ].map((item) => (
              <div key={item.label} className="border border-border bg-card p-5">
                <p className="font-serif text-2xl text-primary">{item.points}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
