'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Bot, Search, Send, Sparkles, User } from 'lucide-react'

import { describeQuery, matchProperties, parseQuery } from '@/lib/ai-search'
import { PropertyCard } from '@/components/site/property-card'
import { Badge } from '@/components/ui/badge'

interface Message {
  id: string
  role: 'user' | 'assistant'
  text: string
  properties?: ReturnType<typeof matchProperties>
  filters?: string[]
}

const examplePrompts = [
  'Je cherche une villa à Cocody avec un budget de 150 millions',
  'Un appartement à louer à Marcory',
  'Terrain à Bingerville, budget 30 millions',
  'Un bureau à louer au Plateau',
]

const introMessage: Message = {
  id: 'intro',
  role: 'assistant',
  text: 'Bonjour, je suis Akwaba AI. Décrivez-moi le bien que vous recherchez (type, ville, budget, achat ou location) et je fouille notre catalogue pour vous.',
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([introMessage])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const handleSend = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMessage: Message = { id: `u-${Date.now()}`, role: 'user', text: trimmed }

    const query = parseQuery(trimmed)
    const results = matchProperties(query, 3)
    const filters = describeQuery(query)

    let reply: string
    if (results.length > 0) {
      reply =
        filters.length > 0
          ? `Voici ${results.length} bien${results.length > 1 ? 's' : ''} qui correspond${results.length > 1 ? 'ent' : ''} à votre recherche (${filters.join(', ')}) :`
          : `Voici ${results.length} bien${results.length > 1 ? 's' : ''} de notre catalogue qui pourrai${results.length > 1 ? 'ent' : 't'} vous intéresser :`
    } else {
      reply =
        filters.length > 0
          ? `Aucun résultat ne correspond exactement à « ${filters.join(', ')} » dans notre catalogue actuel. Essayez d’élargir vos critères (budget, ville ou type de bien), ou parlez-en directement à un conseiller.`
          : 'Je n’ai pas trouvé de bien correspondant précisément à votre demande. Essayez de préciser un type de bien (villa, appartement, terrain...), une ville ou un budget.'
    }

    const assistantMessage: Message = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      text: reply,
      properties: results.length > 0 ? results : undefined,
      filters: filters.length > 0 ? filters : undefined,
    }

    setMessages((prev) => [...prev, userMessage, assistantMessage])
    setInput('')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleSend(input)
  }

  return (
    <section className="mx-auto flex max-w-4xl flex-col px-5 pb-16 pt-32 lg:px-10 lg:pt-36">
      <div className="mb-8">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          <Sparkles className="size-3.5" /> Akwaba AI
        </p>
        <h1 className="font-serif text-3xl leading-tight sm:text-4xl">Que recherchez-vous ?</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          Un assistant qui recherche pour vous dans notre catalogue existant, à partir de mots-clés simples : type de
          bien, ville, budget, achat ou location. Aucune donnée n’est envoyée à un service externe.
        </p>
      </div>

      {/* CHAT WINDOW */}
      <div ref={scrollRef} className="flex h-[52vh] min-h-[360px] flex-col gap-5 overflow-y-auto border border-border bg-card p-5 lg:p-7">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <span className={`flex size-8 shrink-0 items-center justify-center ${m.role === 'user' ? 'bg-graphite text-graphite-foreground' : 'bg-primary text-primary-foreground'}`}>
              {m.role === 'user' ? <User className="size-4" /> : <Bot className="size-4" />}
            </span>
            <div className={`max-w-[85%] ${m.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-3`}>
              <div className={`px-4 py-3 text-sm leading-6 ${m.role === 'user' ? 'bg-graphite text-graphite-foreground' : 'bg-secondary text-foreground'}`}>
                {m.text}
              </div>
              {m.filters && (
                <div className="flex flex-wrap gap-1.5">
                  {m.filters.map((f) => (
                    <Badge key={f} variant="outline">{f}</Badge>
                  ))}
                </div>
              )}
              {m.properties && (
                <div className="grid w-full gap-4 sm:grid-cols-2">
                  {m.properties.map((p) => (
                    <div key={p.id} className="text-sm [&_h3]:text-base">
                      <PropertyCard property={p} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* EXAMPLE PROMPTS */}
      <div className="mt-5 flex flex-wrap gap-2">
        {examplePrompts.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setInput(p)}
            className="border border-border px-3.5 py-2 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {p}
          </button>
        ))}
      </div>

      {/* INPUT */}
      <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-3 border border-border bg-background p-2">
        <Search className="ml-2 size-4 shrink-0 text-muted-foreground" />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Je cherche une villa de 4 chambres à Cocody avec un budget de 100 millions..."
          className="flex-1 bg-transparent py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          aria-label="Envoyer"
          className="flex size-10 shrink-0 items-center justify-center bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Send className="size-4" />
        </button>
      </form>

      <p className="mt-4 text-xs leading-5 text-muted-foreground">
        Akwaba AI recherche exclusivement parmi les biens de notre catalogue. Il ne s’agit pas d’un conseiller
        automatisé : pour toute décision, échangez avec un{' '}
        <Link href="/contact" className="text-primary underline underline-offset-4">conseiller Akwaba Immobilier</Link>.
      </p>
    </section>
  )
}
