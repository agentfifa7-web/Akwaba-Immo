'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Save, ShoppingBag, UserSearch } from 'lucide-react'

import { formatFCFA, products, type Product } from '@/lib/data'
import { useAvatar, useCart, useCreations } from '@/lib/store'
import { AvatarPreview } from '@/components/site/avatar-preview'
import { SectionHeading } from '@/components/site/section-heading'
import { Button } from '@/components/ui/button'
import { colorNameToHex, cn } from '@/lib/utils'

const slots = [
  { key: 'cheveux', label: 'Cheveux', filter: (p: Product) => p.category === 'cheveux' },
  { key: 'maquillage', label: 'Maquillage', filter: (p: Product) => p.subcategory === 'Rouge à lèvres' },
  { key: 'tenue', label: 'Tenue', filter: (p: Product) => p.category === 'mode' },
  { key: 'chaussures', label: 'Chaussures', filter: (p: Product) => p.subcategory === 'Chaussures' },
  { key: 'sac', label: 'Sac', filter: (p: Product) => p.subcategory === 'Sacs' },
  { key: 'bijoux', label: 'Bijoux', filter: (p: Product) => p.subcategory === 'Bijoux' },
] as const

export default function CreateLookPage() {
  const { config, update } = useAvatar()
  const { add } = useCart()
  const { add: addCreation } = useCreations()
  const [selection, setSelection] = useState<Partial<Record<(typeof slots)[number]['key'], Product>>>({})
  const [saved, setSaved] = useState(false)

  const items = Object.values(selection).filter((p): p is Product => Boolean(p))
  const total = items.reduce((sum, p) => sum + p.price, 0)

  function pick(slotKey: (typeof slots)[number]['key'], product: Product) {
    setSelection((prev) => ({ ...prev, [slotKey]: product }))
    if (slotKey === 'tenue') update({ outfitColor: colorNameToHex(product.colors?.[0]) })
    if (slotKey === 'cheveux') update({ hairstyle: product.name })
    if (slotKey === 'maquillage' && product.shade) update({ lipstickShade: product.shade.hex })
  }

  function saveDesign() {
    addCreation({
      type: 'look',
      title: 'Mon look KÔSMÉA',
      summary: items.map((p) => p.name).join(', ') || 'Look personnalisé',
      cover: items[0]?.images[0],
      config: Object.fromEntries(Object.entries(selection).map(([k, v]) => [k, v?.id ?? ''])),
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="Create My Look" title="Composez votre look complet" description="Cheveux + maquillage + tenue + chaussures + sac + bijoux : assemblez un look 100 % shoppable." />

      <div className="mt-12 grid gap-10 lg:grid-cols-[340px_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <AvatarPreview config={config} className="aspect-[3/4] w-full" />
          <div className="mt-4 border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total du look</p>
            <p className="mt-1 font-serif text-2xl">{formatFCFA(total)}</p>
            <div className="mt-4 flex flex-col gap-2">
              <Button className="w-full gap-2" disabled={items.length === 0} onClick={() => items.forEach((p) => add(p.id, 1))}>
                <ShoppingBag className="size-4" /> Acheter le look
              </Button>
              <Button variant="outline" className="w-full gap-2" onClick={saveDesign}>
                <Save className="size-4" /> {saved ? 'Design enregistré ✓' : 'Save Design'}
              </Button>
              <Link href="/stylistes" className="flex items-center justify-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary">
                <UserSearch className="size-3.5" /> Find a Stylist
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          {slots.map((slot) => {
            const options = products.filter(slot.filter).slice(0, 8)
            return (
              <div key={slot.key}>
                <h3 className="font-serif text-xl">{slot.label}</h3>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {options.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => pick(slot.key, p)}
                      className={cn(
                        'overflow-hidden rounded-xl border text-left transition-colors',
                        selection[slot.key]?.id === p.id ? 'border-primary' : 'border-border hover:border-primary/40',
                      )}
                    >
                      <div className="aspect-square overflow-hidden bg-muted">
                        <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="p-2.5">
                        <p className="truncate text-xs font-medium text-foreground">{p.name}</p>
                        <p className="text-[10px] text-muted-foreground">{formatFCFA(p.price)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
