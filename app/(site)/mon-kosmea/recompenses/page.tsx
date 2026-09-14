'use client'

import Link from 'next/link'
import { Crown } from 'lucide-react'

import { usePoints } from '@/lib/store'

export default function RewardsPage() {
  const { transactions, total, level, nextThreshold } = usePoints()

  return (
    <div>
      <h2 className="font-serif text-2xl">Mes récompenses</h2>
      <div className="mt-6 flex flex-col gap-6 border border-border bg-secondary/40 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent"><Crown className="size-3.5" /> Statut KÔSMÉA Privilège</p>
          <p className="mt-1 font-serif text-3xl">{level}</p>
          <p className="mt-1 text-sm text-muted-foreground">{total.toLocaleString('fr-FR')} points KÔSMÉA</p>
        </div>
        <Link href="/privilege" className="text-xs font-semibold uppercase tracking-wider text-accent hover:underline">Voir les avantages →</Link>
      </div>
      {nextThreshold && (
        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, (total / nextThreshold) * 100)}%` }} />
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">{nextThreshold - total} points avant le niveau suivant</p>
        </div>
      )}

      <h3 className="mt-10 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Historique</h3>
      <ul className="mt-3 divide-y divide-border border-y border-border">
        {transactions.map((t) => (
          <li key={t.id} className="flex items-center justify-between py-3 text-sm">
            <span>{t.label}</span>
            <span className="font-semibold text-accent">+{t.points}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
