'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Send, Sparkles, ShoppingBag } from 'lucide-react'

import { formatFCFA } from '@/lib/data'
import { assistantSuggestions, buildLookProposals, describeQuery, matchProducts, parseQuery, type LookProposal } from '@/lib/assistant'
import type { Product } from '@/lib/data'
import { useCart } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Message {
  role: 'user' | 'assistant'
  text: string
  filters?: string[]
  proposals?: LookProposal[]
  products?: Product[]
}

const initialMessage: Message = {
  role: 'assistant',
  text: 'Bonjour, je suis KÔSMÉA AI ✨ Décrivez-moi votre occasion, votre budget ou le produit que vous cherchez, et je vous proposerai un look à partir de notre marketplace.',
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([initialMessage])
  const [input, setInput] = useState('')
  const { add } = useCart()

  function ask(text: string) {
    if (!text.trim()) return
    const query = parseQuery(text)
    const filters = describeQuery(query)

    let response: Message
    if (query.occasion) {
      const proposals = buildLookProposals(query, 2)
      response = {
        role: 'assistant',
        text: proposals.length
          ? `Voici ${proposals.length > 1 ? 'des looks' : 'un look'} composé${proposals.length > 1 ? 's' : ''} à partir de produits réellement disponibles sur la marketplace.`
          : 'Je n’ai pas trouvé de look correspondant exactement, mais voici des produits qui pourraient vous plaire.',
        filters,
        proposals: proposals.length ? proposals : undefined,
        products: proposals.length ? undefined : matchProducts(query, 6),
      }
    } else {
      const found = matchProducts(query, 6)
      response = {
        role: 'assistant',
        text: found.length ? 'Voici ce que j’ai trouvé sur la marketplace KÔSMÉA.' : 'Je n’ai rien trouvé de correspondant pour le moment — essayez une autre recherche.',
        filters,
        products: found,
      }
    }

    setMessages((prev) => [...prev, { role: 'user', text }, response])
    setInput('')
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 lg:px-10 lg:py-20">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-full bg-obsidian text-white">
          <Sparkles className="size-5" />
        </span>
        <div>
          <h1 className="font-serif text-2xl">KÔSMÉA AI</h1>
          <p className="text-xs text-muted-foreground">Assistant beauté & style basé sur le catalogue réel de la marketplace</p>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'flex justify-end' : ''}>
            <div className={m.role === 'user' ? 'max-w-md rounded-2xl rounded-br-sm bg-primary px-5 py-3 text-sm text-primary-foreground' : 'max-w-2xl'}>
              {m.role === 'assistant' && (
                <div className="rounded-2xl rounded-bl-sm bg-card border border-border px-5 py-4">
                  <p className="text-sm text-foreground">{m.text}</p>
                  {m.filters && m.filters.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {m.filters.map((f) => <Badge key={f} variant="outline">{f}</Badge>)}
                    </div>
                  )}
                </div>
              )}
              {m.role === 'user' && m.text}
            </div>

            {m.proposals?.map((proposal, pi) => (
              <div key={pi} className="mt-3 max-w-2xl border border-border bg-card p-5">
                <p className="font-serif text-lg">LOOK {String(pi + 1).padStart(2, '0')} — {proposal.look.title}</p>
                <ul className="mt-3 divide-y divide-border border-y border-border">
                  {proposal.items.map((item) => (
                    <li key={item.id} className="flex items-center justify-between py-2.5 text-sm">
                      <Link href={`/produits/${item.slug}`} className="text-foreground hover:text-accent">{item.name}</Link>
                      <span className="text-muted-foreground">{formatFCFA(item.price)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex items-center justify-between">
                  <p className="font-serif text-xl">TOTAL : {formatFCFA(proposal.total)}</p>
                  {!proposal.withinBudget && <Badge variant="outline">Légèrement au-dessus du budget</Badge>}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" className="gap-1.5" onClick={() => proposal.items.forEach((p) => add(p.id, 1))}>
                    <ShoppingBag className="size-3.5" /> Acheter le look
                  </Button>
                  <Link href={`/looks/${proposal.look.slug}`}><Button size="sm" variant="outline">Voir le look</Button></Link>
                  <Link href="/stylistes"><Button size="sm" variant="outline">Ask a Stylist</Button></Link>
                </div>
              </div>
            ))}

            {m.products && m.products.length > 0 && (
              <div className="mt-3 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
                {m.products.map((p) => (
                  <Link key={p.id} href={`/produits/${p.slug}`} className="border border-border bg-card p-3 transition-colors hover:border-primary">
                    <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                      <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                    </div>
                    <p className="mt-2 truncate text-xs font-medium text-foreground">{p.name}</p>
                    <p className="text-[11px] text-muted-foreground">{formatFCFA(p.price)}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {messages.length <= 1 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {assistantSuggestions.map((s) => (
            <button key={s} type="button" onClick={() => ask(s)} className="rounded-full border border-border px-3.5 py-2 text-xs text-muted-foreground hover:border-primary hover:text-foreground">
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          ask(input)
        }}
        className="sticky bottom-4 mt-10 flex gap-2 rounded-xl border border-border bg-background p-2 shadow-lg"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Décrivez votre occasion, budget ou produit recherché…"
          className="h-11 flex-1 rounded-lg bg-transparent px-3 text-sm outline-none"
        />
        <Button type="submit" size="icon-lg" aria-label="Envoyer">
          <Send className="size-4" />
        </Button>
      </form>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        KÔSMÉA AI recommande uniquement des produits réellement disponibles sur la marketplace.
      </p>
    </div>
  )
}
