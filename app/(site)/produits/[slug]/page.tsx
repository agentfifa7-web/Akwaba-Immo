'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Heart, Share2, Sparkles, Star, Truck, RotateCcw, ShieldCheck } from 'lucide-react'

import { formatFCFA, getBoutique, getProductBySlug, looks, similarProducts } from '@/lib/data'
import { useCart, useFavorites } from '@/lib/store'
import { ProductCard } from '@/components/site/product-card'
import { LookCard } from '@/components/site/look-card'
import { SectionHeading } from '@/components/site/section-heading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const boutique = getBoutique(product.boutiqueId)
  const { add } = useCart()
  const { isSaved, toggle } = useFavorites()
  const [activeImage, setActiveImage] = useState(0)
  const [color, setColor] = useState(product.colors?.[0])
  const [size, setSize] = useState(product.sizes?.[0])
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const relatedLook = looks.find((l) => l.productIds.includes(product.id))
  const related = similarProducts(product, 4)
  const fav = isSaved(product.id)

  const handleAdd = () => {
    add(product.id, quantity, color, size)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-10 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* GALERIE */}
        <div>
          <div className="aspect-[4/5] overflow-hidden rounded-xl bg-muted">
            <img src={product.images[activeImage]} alt={product.name} className="h-full w-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={cn('size-16 overflow-hidden rounded-lg border-2', i === activeImage ? 'border-primary' : 'border-transparent')}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INFOS */}
        <div>
          <div className="flex flex-wrap gap-1.5">
            {product.badges.map((b) => (
              <Badge key={b}>{b}</Badge>
            ))}
          </div>
          {boutique && (
            <Link href={`/boutiques/${boutique.slug}`} className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent hover:underline">
              {product.brand} · {boutique.badge}
            </Link>
          )}
          <h1 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">{product.name}</h1>
          <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="size-4 fill-champagne text-champagne" /> {product.rating.toFixed(1)} · {product.reviewsCount} avis · {product.stock} en stock
          </p>

          <div className="mt-5 flex items-baseline gap-3">
            <p className="font-serif text-3xl text-foreground">{formatFCFA(product.price)}</p>
            {product.previousPrice && <p className="text-lg text-muted-foreground line-through">{formatFCFA(product.previousPrice)}</p>}
          </div>

          <p className="mt-5 leading-7 text-muted-foreground">{product.description}</p>

          {product.shade && (
            <div className="mt-6 flex items-center gap-3">
              <span className="size-8 rounded-full border border-border" style={{ backgroundColor: product.shade.hex }} />
              <p className="text-sm text-foreground">Teinte : {product.shade.name}</p>
            </div>
          )}

          {product.colors && (
            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Couleur</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={cn('rounded-full border px-4 py-2 text-xs font-medium', color === c ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Taille</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={cn('min-w-11 rounded-full border px-3.5 py-2 text-xs font-medium', size === s ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-lg border border-border">
              <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3.5 py-3 text-sm">−</button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button type="button" onClick={() => setQuantity((q) => q + 1)} className="px-3.5 py-3 text-sm">+</button>
            </div>
            <Button size="lg" className="flex-1" onClick={handleAdd}>
              {added ? 'Ajouté au panier ✓' : 'Ajouter au panier'}
            </Button>
            <Button size="lg" variant="outline" onClick={() => toggle(product.id)} aria-label="Ajouter aux favoris">
              <Heart className={cn('size-4', fav && 'fill-accent text-accent')} />
            </Button>
            <Button size="lg" variant="outline" aria-label="Partager">
              <Share2 className="size-4" />
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link href={`/panier`} onClick={handleAdd} className="flex-1">
              <Button size="lg" variant="secondary" className="w-full">Acheter maintenant</Button>
            </Link>
            <Link href={`/essayer?produit=${product.slug}`} className="flex-1">
              <Button size="lg" variant="outline" className="w-full gap-2">
                <Sparkles className="size-4" /> Essayer virtuellement
              </Button>
            </Link>
          </div>

          <div className="mt-8 grid gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:grid-cols-3">
            <p className="flex items-center gap-2"><Truck className="size-4 shrink-0 text-accent" /> {boutique?.delivery[0] ?? 'Livraison disponible'}</p>
            <p className="flex items-center gap-2"><RotateCcw className="size-4 shrink-0 text-accent" /> Retours selon la boutique</p>
            <p className="flex items-center gap-2"><ShieldCheck className="size-4 shrink-0 text-accent" /> Paiement sécurisé</p>
          </div>
        </div>
      </div>

      {relatedLook && (
        <section className="mt-20 border-t border-border pt-14">
          <SectionHeading eyebrow="Shop the look" title="Complétez le look" description={`Ce produit fait partie du look « ${relatedLook.title} ».`} />
          <div className="mt-8 max-w-sm">
            <LookCard look={relatedLook} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-20 border-t border-border pt-14">
          <SectionHeading eyebrow="Vous pourriez aimer" title="Produits similaires" />
          <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
