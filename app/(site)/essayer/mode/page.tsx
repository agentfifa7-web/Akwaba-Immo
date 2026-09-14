'use client'

import { useMemo, useState } from 'react'
import { Ruler, ShoppingBag, X } from 'lucide-react'

import { formatFCFA, products, type Product } from '@/lib/data'
import { useAvatar, useCart } from '@/lib/store'
import { AvatarPreview } from '@/components/site/avatar-preview'
import { SectionHeading } from '@/components/site/section-heading'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { colorNameToHex, cn } from '@/lib/utils'

const bodyTypes = ['Silhouette fine', 'Silhouette moyenne', 'Silhouette généreuse', 'Silhouette athlétique']
const heights = ['1,55 m', '1,60 m', '1,65 m', '1,70 m', '1,75 m', '1,80 m']
const clothingSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const fashionProducts = products.filter((p) => p.category === 'mode')

export default function FashionFittingRoomPage() {
  const { config, update } = useAvatar()
  const { add } = useCart()
  const [tryOn, setTryOn] = useState<Product | null>(null)
  const [compare, setCompare] = useState<Product[]>([])

  const filtered = useMemo(
    () => fashionProducts.filter((p) => !p.sizes || p.sizes.includes(config.clothingSize)),
    [config.clothingSize],
  )

  function handleTryOn(product: Product) {
    setTryOn(product)
    update({ outfitColor: colorNameToHex(product.colors?.[0]) })
  }

  function toggleCompare(product: Product) {
    setCompare((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev.filter((p) => p.id !== product.id)
      if (prev.length >= 3) return prev
      return [...prev, product]
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="Virtual Fashion Fitting Room" title="Essayage mode virtuel" description="Configurez votre silhouette, essayez des tenues et comparez jusqu’à 3 looks côte à côte." />

      <div className="mt-10 grid gap-6 border border-border bg-card p-6 sm:grid-cols-4">
        <label className="flex flex-col gap-1.5">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"><Ruler className="size-3.5" /> Taille</span>
          <Select value={config.height} onChange={(e) => update({ height: e.target.value })}>
            {heights.map((h) => <option key={h}>{h}</option>)}
          </Select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Morphologie</span>
          <Select value={config.bodyType} onChange={(e) => update({ bodyType: e.target.value })}>
            {bodyTypes.map((b) => <option key={b}>{b}</option>)}
          </Select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Taille de vêtement</span>
          <Select value={config.clothingSize} onChange={(e) => update({ clothingSize: e.target.value })}>
            {clothingSizes.map((s) => <option key={s}>{s}</option>)}
          </Select>
        </label>
        <p className="self-end text-[11px] leading-5 text-muted-foreground">
          Ces informations personnalisent uniquement votre expérience d’essayage et de taille — elles ne sont jamais utilisées comme critère de beauté.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[340px_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <AvatarPreview config={config} className="aspect-[3/4] w-full" />
          {tryOn && (
            <div className="mt-4 border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">En cours d’essayage</p>
              <p className="mt-1 font-serif text-lg">{tryOn.name}</p>
              <p className="text-sm text-muted-foreground">{formatFCFA(tryOn.price)}</p>
              <Button className="mt-3 w-full gap-2" onClick={() => add(tryOn.id, 1, tryOn.colors?.[0], config.clothingSize)}>
                <ShoppingBag className="size-4" /> Acheter cette tenue
              </Button>
            </div>
          )}
        </div>

        <div>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => {
              const inCompare = compare.some((c) => c.id === p.id)
              return (
                <article key={p.id} className="group">
                  <button type="button" onClick={() => handleTryOn(p)} className="relative block aspect-[4/5] w-full overflow-hidden rounded-xl bg-muted">
                    <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute inset-x-3 bottom-3 rounded-lg bg-obsidian/90 py-2.5 text-center text-[10px] font-semibold uppercase tracking-wider text-white opacity-0 transition-opacity group-hover:opacity-100">
                      Try On
                    </span>
                  </button>
                  <div className="py-3">
                    <p className="font-serif text-base">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{formatFCFA(p.price)}</p>
                    <button
                      type="button"
                      onClick={() => toggleCompare(p)}
                      className={cn('mt-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider', inCompare ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground hover:border-primary/40')}
                    >
                      {inCompare ? 'Ajouté au comparatif ✓' : 'Comparer (3 max)'}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>

      {compare.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-5 backdrop-blur lg:bottom-4 lg:left-1/2 lg:w-fit lg:-translate-x-1/2 lg:rounded-xl lg:border lg:shadow-2xl">
          <div className="mx-auto flex max-w-4xl items-center gap-4 overflow-x-auto">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Compare 3 looks</p>
            {compare.map((p) => (
              <div key={p.id} className="relative flex shrink-0 items-center gap-2 rounded-lg border border-border p-2">
                <img src={p.images[0]} alt={p.name} className="size-12 rounded-md object-cover" />
                <div>
                  <p className="max-w-28 truncate text-xs font-medium">{p.name}</p>
                  <p className="text-[10px] text-muted-foreground">{formatFCFA(p.price)}</p>
                </div>
                <button type="button" onClick={() => toggleCompare(p)} className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-obsidian text-white">
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
