'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Heart, Play, Send, ShoppingBag, Users } from 'lucide-react'

import { formatFCFA, liveSessions, products } from '@/lib/data'
import { useCart } from '@/lib/store'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const seedComments = [
  { author: '@aya.style', text: 'La collection est magnifique 😍' },
  { author: '@fabrice.suit', text: 'Le prix pour la robe ?' },
  { author: '@grace.nails', text: 'Livraison possible à Yopougon ?' },
]

export default function LiveSessionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const live = liveSessions.find((l) => l.slug === slug)
  if (!live) notFound()

  const featured = live.featuredProductId ? products.find((p) => p.id === live.featuredProductId) : undefined
  const { add } = useCart()
  const [comments, setComments] = useState(seedComments)
  const [message, setMessage] = useState('')
  const [viewers, setViewers] = useState(live.viewers)

  useEffect(() => {
    if (live.status !== 'live') return
    const interval = setInterval(() => setViewers((v) => v + Math.floor(Math.random() * 3)), 4000)
    return () => clearInterval(interval)
  }, [live.status])

  function sendComment(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return
    setComments((prev) => [...prev, { author: 'Vous', text: message.trim() }])
    setMessage('')
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-10 lg:py-14">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="relative aspect-video overflow-hidden rounded-xl bg-obsidian">
            <img src={live.cover} alt={live.title} className="h-full w-full object-cover opacity-80" />
            {live.status === 'live' ? (
              <Badge className="absolute left-4 top-4 bg-destructive text-white">● EN DIRECT</Badge>
            ) : (
              <Badge variant="white" className="absolute left-4 top-4">{live.status === 'a_venir' ? 'À venir' : 'Replay'}</Badge>
            )}
            <p className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-obsidian/70 px-3 py-1.5 text-xs text-white">
              <Users className="size-3.5" /> {viewers.toLocaleString('fr-FR')}
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="size-14 text-white/80" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h1 className="font-serif text-2xl">{live.title}</h1>
              <p className="text-sm text-muted-foreground">Diffusé par {live.host}</p>
            </div>
            {live.discount && <Badge>{live.discount}</Badge>}
          </div>

          {featured && (
            <div className="mt-6 flex items-center gap-4 border border-border bg-card p-4">
              <img src={featured.images[0]} alt={featured.name} className="size-16 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">Produit en vedette</p>
                <Link href={`/produits/${featured.slug}`} className="truncate font-serif text-lg hover:text-accent">{featured.name}</Link>
                <p className="text-sm text-muted-foreground">{formatFCFA(featured.price)}</p>
              </div>
              <Button className="shrink-0 gap-2" onClick={() => add(featured.id, 1)}>
                <ShoppingBag className="size-4" /> Ajouter
              </Button>
            </div>
          )}
        </div>

        <div className="flex h-[480px] flex-col border border-border bg-card lg:h-auto">
          <p className="border-b border-border px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Commentaires en direct</p>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {comments.map((c, i) => (
              <p key={i} className="text-sm"><span className="font-semibold text-foreground">{c.author}</span> <span className="text-muted-foreground">{c.text}</span></p>
            ))}
          </div>
          <form onSubmit={sendComment} className="flex gap-2 border-t border-border p-3">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrire un commentaire…"
              className="h-10 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-primary"
            />
            <Button type="submit" size="icon" aria-label="Envoyer">
              <Send className="size-4" />
            </Button>
            <Button type="button" variant="outline" size="icon" aria-label="Réagir">
              <Heart className="size-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
