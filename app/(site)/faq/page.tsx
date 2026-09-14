'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'

import { faqs } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Input } from '@/components/ui/input'

export default function FaqPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return faqs
    return faqs.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q) || f.category.toLowerCase().includes(q))
  }, [query])

  const grouped = useMemo(() => {
    const map = new Map<string, typeof faqs>()
    for (const item of filtered) {
      const list = map.get(item.category) ?? []
      list.push(item)
      map.set(item.category, list)
    }
    return Array.from(map.entries())
  }, [filtered])

  return (
    <>
      <section className="relative flex min-h-[380px] items-end overflow-hidden bg-graphite pb-14 pt-40 lg:min-h-[440px]">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2400&q=90"
          alt="Questions fréquentes Akwaba Immobilier"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Besoin d’aide ?</p>
          <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl">
            Foire aux questions.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Toutes vos questions" title="Comment pouvons-nous vous aider ?" align="center" className="mx-auto" />

        <div className="relative mx-auto mt-10 max-w-xl">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une question, un mot-clé..."
            className="pl-10"
          />
        </div>

        <div className="mt-14 space-y-12">
          {grouped.map(([category, items]) => (
            <div key={category}>
              <h2 className="font-serif text-2xl">{category}</h2>
              <div className="mt-5 divide-y divide-border border-y border-border">
                {items.map((item) => (
                  <details key={item.id} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-foreground marker:content-none">
                      {item.question}
                      <ChevronDown className="size-4 shrink-0 text-primary transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 pr-8 text-sm leading-6 text-muted-foreground">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}

          {grouped.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              Aucune question ne correspond à « {query} ». Essayez un autre mot-clé.
            </p>
          )}
        </div>

        <div className="mt-16 border border-border bg-secondary/60 p-8 text-center">
          <p className="font-serif text-2xl">Vous ne trouvez pas de réponse ?</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Notre équipe est disponible pour répondre à toutes vos questions.</p>
          <Link href="/contact" className="mt-6 inline-block rounded-lg bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0">
            Contacter un conseiller
          </Link>
        </div>
      </section>
    </>
  )
}
