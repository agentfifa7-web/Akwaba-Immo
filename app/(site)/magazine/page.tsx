'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import { articles, formatDate } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const categories = ['Tous', ...Array.from(new Set(articles.map((a) => a.category)))]
const sorted = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1))

export default function MagazinePage() {
  const [active, setActive] = useState('Tous')

  const filtered = useMemo(
    () => (active === 'Tous' ? sorted : sorted.filter((a) => a.category === active)),
    [active],
  )

  return (
    <>
      <section className="relative flex min-h-[380px] items-end overflow-hidden bg-graphite pb-14 pt-36 lg:min-h-[440px]">
        <img
          src="https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=2400&q=90"
          alt="Akwaba Magazine"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Akwaba Magazine</p>
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Conseils, tendances et actualités immobilières.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75">
            Foncier, construction, investissement, marché : nos experts partagent leur regard sur l’immobilier en
            Côte d’Ivoire.
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
        <SectionHeading eyebrow={`${filtered.length} article${filtered.length > 1 ? 's' : ''}`} title={active === 'Tous' ? 'Tous nos articles' : active} />
        <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article, i) => (
            <Reveal key={article.id} delay={(i % 6) * 60}>
              <Link href={`/magazine/${article.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img src={article.image} alt={article.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="border-b border-border py-5">
                  <Badge variant="outline">{article.category}</Badge>
                  <h3 className="mt-3 font-serif text-lg leading-snug transition-colors group-hover:text-primary">{article.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground line-clamp-2">{article.excerpt}</p>
                  <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
                    {article.author} · {formatDate(article.date)}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        {filtered.length === 0 && <p className="text-sm text-muted-foreground">Aucun article dans cette catégorie pour le moment.</p>}
      </section>
    </>
  )
}
