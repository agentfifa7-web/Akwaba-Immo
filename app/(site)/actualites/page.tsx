import Link from 'next/link'
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'

import { articles, events, formatDate } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'Actualités — Akwaba Immobilier',
  description: 'Toute l’actualité d’Akwaba Immobilier : lancements de programmes, vie de l’entreprise et événements à venir.',
}

const newsArticles = [...articles]
  .filter((a) => ['Actualités', 'Marché'].includes(a.category))
  .concat(articles.filter((a) => !['Actualités', 'Marché'].includes(a.category)))
  .sort((a, b) => (a.date < b.date ? 1 : -1))
const upcoming = [...events].sort((a, b) => (a.date < b.date ? -1 : 1)).slice(0, 4)

export default function ActualitesPage() {
  return (
    <>
      <section className="relative flex min-h-[380px] items-end overflow-hidden bg-graphite pb-14 pt-36 lg:min-h-[440px]">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90"
          alt="Actualités Akwaba Immobilier"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Actualités</p>
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
            La vie d’Akwaba Immobilier.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75">
            Lancements de programmes, nouveautés et temps forts de l’entreprise : suivez notre actualité au fil de
            l’eau.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          {/* FEED */}
          <div>
            <SectionHeading eyebrow="Fil d’actualité" title="Dernières publications" />
            <div className="mt-10 divide-y divide-border border-t border-border">
              {newsArticles.map((article, i) => (
                <Reveal key={article.id} delay={(i % 6) * 50}>
                  <Link href={`/magazine/${article.slug}`} className="group flex flex-col gap-5 py-7 sm:flex-row sm:items-center">
                    <div className="aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:w-48">
                      <img src={article.image} alt={article.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div>
                      <Badge variant="outline">{article.category}</Badge>
                      <h3 className="mt-3 font-serif text-xl leading-snug transition-colors group-hover:text-primary">{article.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground line-clamp-2">{article.excerpt}</p>
                      <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{formatDate(article.date)}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="h-fit border border-border bg-card p-7">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">À ne pas manquer</p>
            <h3 className="font-serif text-xl">Événements à venir</h3>
            <div className="mt-6 space-y-6">
              {upcoming.map((event) => (
                <div key={event.id} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                  <Badge variant="graphite">{event.category}</Badge>
                  <h4 className="mt-3 font-serif text-base leading-snug">{event.title}</h4>
                  <p className="mt-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
                    <CalendarDays className="size-3.5" /> {formatDate(event.date)}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
                    <MapPin className="size-3.5" /> {event.location}
                  </p>
                </div>
              ))}
            </div>
            <Link href="/evenements" className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              Tous les événements <ArrowRight className="size-3.5" />
            </Link>
          </aside>
        </div>
      </section>
    </>
  )
}
