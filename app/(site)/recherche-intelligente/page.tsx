'use client'

import { Suspense, useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Sparkles } from 'lucide-react'

import { describeQuery, matchProperties, parseQuery, type ParsedQuery } from '@/lib/ai-search'
import { PropertyCard } from '@/components/site/property-card'
import { Reveal } from '@/components/site/reveal'
import { Badge } from '@/components/ui/badge'

const examplePrompts = [
  'Montrez-moi les terrains de moins de 20 millions autour de Bingerville',
  'Une villa à vendre à Cocody, budget 200 millions',
  'Un appartement à louer à Marcory',
  'Un local commercial à Yopougon',
]

function RechercheIntelligenteContent() {
  const searchParams = useSearchParams()
  const [input, setInput] = useState('')
  const [query, setQuery] = useState<ParsedQuery | null>(null)

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      setInput(q)
      setQuery(parseQuery(q))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    setQuery(parseQuery(input))
  }

  const results = query ? matchProperties(query, 24) : []
  const filters = query ? describeQuery(query) : []

  return (
    <>
      <section className="relative flex min-h-[380px] items-end overflow-hidden bg-graphite pb-14 pt-36 lg:min-h-[440px]">
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=90"
          alt="Recherche intelligente"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            <Sparkles className="size-3.5" /> Recherche intelligente
          </p>
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Décrivez votre bien idéal.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75">
            Écrivez librement ce que vous recherchez : nous analysons votre phrase pour retrouver les biens
            correspondants dans notre catalogue.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10">
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl items-center gap-3 border border-border bg-card p-2 shadow-sm">
          <Search className="ml-2 size-5 shrink-0 text-muted-foreground" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Montrez-moi les terrains de moins de 20 millions autour de Bingerville..."
            className="flex-1 bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground sm:text-base"
          />
          <button
            type="submit"
            className="shrink-0 bg-primary px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Rechercher
          </button>
        </form>

        <div className="mx-auto mt-4 flex max-w-3xl flex-wrap gap-2">
          {examplePrompts.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setInput(p)
                setQuery(parseQuery(p))
              }}
              className="border border-border px-3.5 py-2 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      {query && (
        <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-10 lg:pb-28">
          <div className="border-t border-border pt-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Filtres détectés :</span>
              {filters.length > 0 ? (
                filters.map((f) => (
                  <Badge key={f} variant="outline">{f}</Badge>
                ))
              ) : (
                <Badge variant="muted">Aucun critère précis détecté — résultats les plus récents</Badge>
              )}
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              {results.length} bien{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''} pour « {query.raw} »
            </p>

            {results.length > 0 ? (
              <div className="mt-8 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                {results.map((property, i) => (
                  <Reveal key={property.id} delay={(i % 6) * 60}>
                    <PropertyCard property={property} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="mt-8 border border-border bg-secondary/60 p-8 text-center">
                <p className="text-sm leading-6 text-muted-foreground">
                  Aucun résultat ne correspond à cette recherche pour le moment. Essayez d’élargir vos critères de
                  budget, de ville ou de type de bien.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}

export default function RechercheIntelligentePage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-graphite" />}>
      <RechercheIntelligenteContent />
    </Suspense>
  )
}
