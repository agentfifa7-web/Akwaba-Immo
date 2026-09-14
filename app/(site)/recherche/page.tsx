'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, Sparkles, X } from 'lucide-react'

import { boutiques, formatFCFA, looks, products, stylists } from '@/lib/data'
import { describeQuery, parseQuery } from '@/lib/assistant'
import { useLocalStorageState } from '@/lib/store'
import { Badge } from '@/components/ui/badge'

const popularSearches = ['Rouge à lèvres nude', 'Lace wig bouclée', 'Robe wax mariage', 'Maquilleuse Cocody', 'Sac en cuir']

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [recent, setRecent] = useLocalStorageState<string[]>('kosmea_recent_searches', [])

  const parsed = useMemo(() => parseQuery(query), [query])
  const filters = describeQuery(parsed)
  const lower = query.trim().toLowerCase()

  const results = useMemo(() => {
    if (!lower) return { products: [], looks: [], boutiques: [], stylists: [] }
    return {
      products: products.filter((p) => p.name.toLowerCase().includes(lower) || p.brand.toLowerCase().includes(lower) || p.tags.some((t) => t.toLowerCase().includes(lower)) || p.subcategory.toLowerCase().includes(lower)).slice(0, 8),
      looks: looks.filter((l) => l.title.toLowerCase().includes(lower) || l.category.toLowerCase().includes(lower)).slice(0, 4),
      boutiques: boutiques.filter((b) => b.name.toLowerCase().includes(lower)).slice(0, 4),
      stylists: stylists.filter((s) => s.name.toLowerCase().includes(lower) || s.specialties.some((sp) => sp.toLowerCase().includes(lower))).slice(0, 4),
    }
  }, [lower])

  function commitSearch(term: string) {
    if (!term.trim()) return
    setQuery(term)
    setRecent((prev) => [term, ...prev.filter((r) => r !== term)].slice(0, 6))
  }

  const hasResults = results.products.length + results.looks.length + results.boutiques.length + results.stylists.length > 0

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 lg:px-10 lg:py-20">
      <h1 className="font-serif text-3xl">Recherche</h1>
      <p className="mt-2 text-sm text-muted-foreground">Recherche classique et recherche IA en langage naturel, sur toute la marketplace.</p>

      <div className="mt-8 flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-1">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && commitSearch(query)}
          placeholder="Ex : « robe rouge élégante pour un mariage à moins de 100 000 FCFA »"
          className="h-12 flex-1 bg-transparent text-sm outline-none"
        />
        {query && (
          <button type="button" onClick={() => setQuery('')} aria-label="Effacer">
            <X className="size-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {filters.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <Sparkles className="size-3.5 text-accent" />
          {filters.map((f) => <Badge key={f} variant="outline">{f}</Badge>)}
        </div>
      )}

      {!query && (
        <div className="mt-10 space-y-8">
          {recent.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recherches récentes</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {recent.map((r) => (
                  <button key={r} type="button" onClick={() => commitSearch(r)} className="rounded-full border border-border px-3.5 py-2 text-xs text-foreground hover:border-primary">{r}</button>
                ))}
              </div>
            </div>
          )}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recherches populaires</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {popularSearches.map((r) => (
                <button key={r} type="button" onClick={() => commitSearch(r)} className="rounded-full border border-border px-3.5 py-2 text-xs text-foreground hover:border-primary">{r}</button>
              ))}
            </div>
          </div>
          <Link href="/assistant" className="block border border-dashed border-border p-6 text-center text-sm text-muted-foreground hover:border-primary">
            Besoin d’un look complet ? Essayez <span className="font-semibold text-accent">KÔSMÉA AI</span> →
          </Link>
        </div>
      )}

      {query && !hasResults && (
        <div className="mt-10 border border-dashed border-border p-16 text-center text-sm text-muted-foreground">
          Aucun résultat pour « {query} ». Essayez l’assistant KÔSMÉA AI pour une recherche plus précise.
        </div>
      )}

      {query && hasResults && (
        <div className="mt-10 space-y-10">
          {results.products.length > 0 && (
            <section>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Produits</p>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {results.products.map((p) => (
                  <Link key={p.id} href={`/produits/${p.slug}`} className="border border-border p-3 hover:border-primary">
                    <div className="aspect-square overflow-hidden rounded-lg bg-muted"><img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" /></div>
                    <p className="mt-2 truncate text-xs font-medium">{p.name}</p>
                    <p className="text-[11px] text-muted-foreground">{formatFCFA(p.price)}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
          {results.looks.length > 0 && (
            <section>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Looks</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {results.looks.map((l) => <Link key={l.id} href={`/looks/${l.slug}`} className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary">{l.title}</Link>)}
              </div>
            </section>
          )}
          {results.boutiques.length > 0 && (
            <section>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Boutiques</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {results.boutiques.map((b) => <Link key={b.id} href={`/boutiques/${b.slug}`} className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary">{b.name}</Link>)}
              </div>
            </section>
          )}
          {results.stylists.length > 0 && (
            <section>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Stylistes</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {results.stylists.map((s) => <Link key={s.id} href={`/stylistes/${s.slug}`} className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary">{s.name}</Link>)}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
