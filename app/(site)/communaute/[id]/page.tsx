'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Heart, MessageCircle, Send, ShoppingBag } from 'lucide-react'

import { communityPosts, formatFCFA, productsByIds } from '@/lib/data'
import { formatDate } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const mockComments = [
  { author: '@yasmine.ci', text: 'Magnifique ! Où as-tu trouvé ça ?' },
  { author: '@steph_abj', text: 'J’adore la couleur 😍' },
  { author: '@boris.street', text: 'Le rendu est top, bravo !' },
]

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const post = communityPosts.find((p) => p.id === id)
  if (!post) notFound()

  const products = productsByIds(post.productIds)
  const [liked, setLiked] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(mockComments)

  function submitComment(e: React.FormEvent) {
    e.preventDefault()
    if (!comment.trim()) return
    setComments((prev) => [...prev, { author: 'Vous', text: comment.trim() }])
    setComment('')
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 lg:px-10 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="aspect-square overflow-hidden rounded-xl bg-muted">
          <img src={post.image} alt={post.caption} className="h-full w-full object-cover" />
        </div>

        <div>
          <div className="flex items-center gap-3">
            <img src={post.authorPhoto} alt="" className="size-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold text-foreground">{post.handle}</p>
              <p className="text-xs text-muted-foreground">{post.author} · {formatDate(post.createdAt)}</p>
            </div>
          </div>
          <p className="mt-4 leading-7 text-foreground">{post.caption}</p>
          <Badge variant="outline" className="mt-3">{post.category}</Badge>

          <div className="mt-6 flex items-center gap-5 border-y border-border py-4">
            <button type="button" onClick={() => setLiked((v) => !v)} className={cn('flex items-center gap-1.5 text-sm', liked && 'text-accent')}>
              <Heart className={cn('size-5', liked && 'fill-accent')} /> {post.likes + (liked ? 1 : 0)}
            </button>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MessageCircle className="size-5" /> {comments.length}
            </p>
          </div>

          {products.length > 0 && (
            <div className="mt-6">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <ShoppingBag className="size-3.5" /> Shop ce look
              </p>
              <ul className="mt-3 divide-y divide-border border-y border-border">
                {products.map((p) => (
                  <li key={p.id} className="flex items-center gap-3 py-3">
                    <img src={p.images[0]} alt={p.name} className="size-12 shrink-0 rounded-lg object-cover" />
                    <Link href={`/produits/${p.slug}`} className="min-w-0 flex-1 truncate text-sm font-medium text-foreground hover:text-accent">
                      {p.name}
                    </Link>
                    <p className="shrink-0 text-sm text-muted-foreground">{formatFCFA(p.price)}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Commentaires</p>
            <ul className="mt-3 space-y-3">
              {comments.map((c, i) => (
                <li key={i} className="text-sm">
                  <span className="font-semibold text-foreground">{c.author}</span> <span className="text-muted-foreground">{c.text}</span>
                </li>
              ))}
            </ul>
            <form onSubmit={submitComment} className="mt-4 flex gap-2">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ajouter un commentaire…"
                className="h-11 flex-1 rounded-lg border border-border bg-background px-3.5 text-sm outline-none focus-visible:border-primary"
              />
              <Button type="submit" size="icon-lg" aria-label="Envoyer">
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
