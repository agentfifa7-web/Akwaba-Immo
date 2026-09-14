import Link from 'next/link'
import { Play } from 'lucide-react'

import { liveSessions } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/data'

export default function LivePage() {
  const live = liveSessions.filter((l) => l.status === 'live')
  const upcoming = liveSessions.filter((l) => l.status === 'a_venir')
  const past = liveSessions.filter((l) => l.status === 'termine')

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="KÔSMÉA Live" title="Le shopping en direct" description="Boutiques et créateurs présentent leurs collections en direct : essayez, réagissez, achetez en temps réel." />

      {[
        { title: 'En direct maintenant', items: live },
        { title: 'À venir', items: upcoming },
        { title: 'Replays', items: past },
      ].map((group) =>
        group.items.length === 0 ? null : (
          <section key={group.title} className="mt-14">
            <h2 className="font-serif text-2xl">{group.title}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((live) => (
                <Link key={live.id} href={`/live/${live.slug}`} className="group relative block aspect-video overflow-hidden rounded-xl bg-muted">
                  <img src={live.cover} alt={live.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/10 to-transparent" />
                  {live.status === 'live' && <Badge className="absolute left-3 top-3 bg-destructive text-white">● EN DIRECT · {live.viewers} spectateurs</Badge>}
                  {live.status === 'a_venir' && <Badge variant="white" className="absolute left-3 top-3">{formatDate(live.scheduledAt.slice(0, 10))}</Badge>}
                  {live.status === 'termine' && <Badge variant="muted" className="absolute left-3 top-3">Replay</Badge>}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="flex items-center gap-2 text-xs text-white/70"><Play className="size-3.5" /> {live.host}</p>
                    <h3 className="mt-1 font-serif text-lg text-white">{live.title}</h3>
                    {live.discount && <p className="mt-1 text-xs font-semibold text-champagne">{live.discount}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ),
      )}
    </div>
  )
}
