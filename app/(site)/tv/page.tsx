'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Play } from 'lucide-react'

import { formatDate, videos } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const categories = ['Toutes', ...Array.from(new Set(videos.map((v) => v.category)))]
const sorted = [...videos].sort((a, b) => (a.date < b.date ? 1 : -1))

export default function TvPage() {
  const [active, setActive] = useState('Toutes')

  const filtered = useMemo(
    () => (active === 'Toutes' ? sorted : sorted.filter((v) => v.category === active)),
    [active],
  )

  return (
    <>
      <section className="relative flex min-h-[380px] items-end overflow-hidden bg-graphite pb-14 pt-36 lg:min-h-[440px]">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90"
          alt="Akwaba TV"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Akwaba TV</p>
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Visites, interviews et reportages en vidéo.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75">
            Découvrez nos biens, nos projets et notre équipe en images : visites guidées, témoignages clients et
            reportages de chantier.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-6 lg:px-10">
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={cn(
                  'border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors',
                  active === cat
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary hover:text-primary',
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow={`${filtered.length} vidéo${filtered.length > 1 ? 's' : ''}`} title={active === 'Toutes' ? 'Toutes nos vidéos' : active} />
        <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((video, i) => (
            <Reveal key={video.id} delay={(i % 6) * 60}>
              <Link href={`/tv/${video.slug}`} className="group block">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
                  <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-center justify-center bg-graphite/20 transition-colors group-hover:bg-graphite/35">
                    <span className="flex size-14 items-center justify-center rounded-full bg-white/90 text-graphite transition-transform group-hover:scale-110">
                      <Play className="ml-0.5 size-6 fill-current" />
                    </span>
                  </div>
                  <Badge className="absolute left-4 top-4">{video.category}</Badge>
                </div>
                <div className="border-b border-border py-5">
                  <h3 className="font-serif text-lg leading-snug transition-colors group-hover:text-primary">{video.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground line-clamp-2">{video.description}</p>
                  <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{formatDate(video.date)}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
