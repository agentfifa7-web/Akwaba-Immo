import { CalendarDays, MapPin } from 'lucide-react'

import { events, formatDate } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'Événements — Akwaba Immobilier',
  description: 'Inaugurations, salons, conférences et visites de chantier : retrouvez tous les événements Akwaba Immobilier.',
}

const today = new Date('2026-09-14')
const sorted = [...events].sort((a, b) => (a.date < b.date ? -1 : 1))
const upcoming = sorted.filter((e) => new Date(e.date) >= today)
const past = sorted.filter((e) => new Date(e.date) < today).reverse()

function EventCard({ event }: { event: (typeof events)[number] }) {
  return (
    <div className="border border-border">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
        <Badge className="absolute left-4 top-4">{event.category}</Badge>
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl leading-snug">{event.title}</h3>
        <p className="mt-3 flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
          <CalendarDays className="size-3.5" /> {formatDate(event.date)}
        </p>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
          <MapPin className="size-3.5" /> {event.location}
        </p>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{event.description}</p>
      </div>
    </div>
  )
}

export default function EvenementsPage() {
  return (
    <>
      <section className="relative flex min-h-[380px] items-end overflow-hidden bg-graphite pb-14 pt-36 lg:min-h-[440px]">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2400&q=90"
          alt="Événements Akwaba Immobilier"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Événements</p>
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Retrouvons-nous.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75">
            Inaugurations, salons de l’habitat, conférences et visites de chantier : venez échanger avec nos équipes
            lors de nos prochains événements.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow={`${upcoming.length} événement${upcoming.length > 1 ? 's' : ''}`} title="À venir" />
        <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((event, i) => (
            <Reveal key={event.id} delay={i * 80}>
              <EventCard event={event} />
            </Reveal>
          ))}
          {upcoming.length === 0 && <p className="text-sm text-muted-foreground">Aucun événement à venir pour le moment.</p>}
        </div>
      </section>

      {past.length > 0 && (
        <section className="border-t border-border bg-secondary/60">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
            <SectionHeading eyebrow="Retour en images" title="Événements passés" />
            <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {past.map((event, i) => (
                <Reveal key={event.id} delay={i * 80}>
                  <div className="opacity-80">
                    <EventCard event={event} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
