'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Save, ShoppingBag, UserSearch } from 'lucide-react'

import { formatFCFA, products, type Product } from '@/lib/data'
import { useAvatar, useCart, useCreations, type Creation } from '@/lib/store'
import { AvatarPreview } from '@/components/site/avatar-preview'
import { SectionHeading } from '@/components/site/section-heading'
import { Button } from '@/components/ui/button'
import { colorNameToHex, cn } from '@/lib/utils'

const slots = [
  { key: 'cheveux', label: 'Cheveux', filter: (p: Product) => p.category === 'cheveux', creationTypes: [] as Creation['type'][] },
  { key: 'maquillage', label: 'Maquillage', filter: (p: Product) => p.subcategory === 'Rouge à lèvres', creationTypes: ['maquillage', 'couleur'] as Creation['type'][] },
  { key: 'tenue', label: 'Tenue', filter: (p: Product) => p.category === 'mode', creationTypes: ['tenue'] as Creation['type'][] },
  { key: 'chaussures', label: 'Chaussures', filter: (p: Product) => p.subcategory === 'Chaussures', creationTypes: [] as Creation['type'][] },
  { key: 'sac', label: 'Sac', filter: (p: Product) => p.subcategory === 'Sacs', creationTypes: [] as Creation['type'][] },
  { key: 'bijoux', label: 'Bijoux', filter: (p: Product) => p.subcategory === 'Bijoux', creationTypes: [] as Creation['type'][] },
] as const

type SlotKey = (typeof slots)[number]['key']
type SlotSelection = { kind: 'product'; item: Product } | { kind: 'creation'; item: Creation }

export default function CreateLookPage() {
  const { config, update } = useAvatar()
  const { add } = useCart()
  const { add: addCreation, items: myCreations } = useCreations()
  const [selection, setSelection] = useState<Partial<Record<SlotKey, SlotSelection>>>({})
  const [source, setSource] = useState<Partial<Record<SlotKey, 'marketplace' | 'creations'>>>({})
  const [saved, setSaved] = useState(false)

  const productItems = Object.values(selection).filter((s): s is { kind: 'product'; item: Product } => s?.kind === 'product')
  const total = productItems.reduce((sum, s) => sum + s.item.price, 0)

  function pickProduct(slotKey: SlotKey, product: Product) {
    setSelection((prev) => ({ ...prev, [slotKey]: { kind: 'product', item: product } }))
    if (slotKey === 'tenue') update({ outfitColor: colorNameToHex(product.colors?.[0]) })
    if (slotKey === 'cheveux') update({ hairstyle: product.name })
    if (slotKey === 'maquillage' && product.shade) update({ lipstickShade: product.shade.hex })
  }

  function pickCreation(slotKey: SlotKey, creation: Creation) {
    setSelection((prev) => ({ ...prev, [slotKey]: { kind: 'creation', item: creation } }))
    if (slotKey === 'tenue' && creation.config.couleur) update({ outfitColor: colorNameToHex(creation.config.couleur) })
    if (slotKey === 'maquillage') {
      const shade = creation.config.lipstickShade ?? creation.config.mixed
      if (shade) update({ lipstickShade: shade })
    }
  }

  function saveDesign() {
    addCreation({
      type: 'look',
      title: 'Mon look KÔSMÉA',
      summary: Object.values(selection).map((s) => (s?.kind === 'product' ? s.item.name : s?.item.title)).filter(Boolean).join(', ') || 'Look personnalisé',
      cover: productItems[0]?.item.images[0],
      config: Object.fromEntries(Object.entries(selection).map(([k, v]) => [k, v?.kind === 'product' ? v.item.id : v ? `creation:${v.item.id}` : ''])),
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="Create My Look" title="Composez votre look complet" description="Cheveux + maquillage + tenue + chaussures + sac + bijoux : piochez dans la marketplace ou dans vos propres créations." />

      <div className="mt-12 grid gap-10 lg:grid-cols-[340px_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <AvatarPreview config={config} className="aspect-[3/4] w-full" />
          <div className="mt-4 border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total du look</p>
            <p className="mt-1 font-serif text-2xl">{formatFCFA(total)}</p>
            {Object.values(selection).some((s) => s?.kind === 'creation') && (
              <p className="mt-1 text-[11px] text-muted-foreground">Vos créations personnelles ne sont pas incluses dans le total — demandez-les à un styliste.</p>
            )}
            <div className="mt-4 flex flex-col gap-2">
              <Button className="w-full gap-2" disabled={productItems.length === 0} onClick={() => productItems.forEach((s) => add(s.item.id, 1))}>
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
            const slotCreations = slot.creationTypes.length ? myCreations.filter((c) => slot.creationTypes.includes(c.type)) : []
            const activeSource = source[slot.key] ?? 'marketplace'
            const selected = selection[slot.key]

            return (
              <div key={slot.key}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-serif text-xl">{slot.label}</h3>
                  {slot.creationTypes.length > 0 && (
                    <div className="flex gap-1 rounded-lg border border-border p-1">
                      <button
                        type="button"
                        onClick={() => setSource((prev) => ({ ...prev, [slot.key]: 'marketplace' }))}
                        className={cn('rounded-md px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider', activeSource === 'marketplace' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground')}
                      >
                        Marketplace
                      </button>
                      <button
                        type="button"
                        onClick={() => setSource((prev) => ({ ...prev, [slot.key]: 'creations' }))}
                        className={cn('rounded-md px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider', activeSource === 'creations' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground')}
                      >
                        Mes créations {slotCreations.length > 0 && `(${slotCreations.length})`}
                      </button>
                    </div>
                  )}
                </div>

                {activeSource === 'marketplace' || slot.creationTypes.length === 0 ? (
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {options.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => pickProduct(slot.key, p)}
                        className={cn(
                          'overflow-hidden rounded-xl border text-left transition-colors',
                          selected?.kind === 'product' && selected.item.id === p.id ? 'border-primary' : 'border-border hover:border-primary/40',
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
                ) : slotCreations.length === 0 ? (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Aucune création dans cette catégorie pour le moment.{' '}
                    <Link href={slot.key === 'tenue' ? '/creer/tenue' : '/creer/couleurs'} className="text-accent hover:underline">
                      Créer une {slot.key === 'tenue' ? 'tenue' : 'couleur'} →
                    </Link>
                  </p>
                ) : (
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {slotCreations.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => pickCreation(slot.key, c)}
                        className={cn(
                          'overflow-hidden rounded-xl border text-left transition-colors',
                          selected?.kind === 'creation' && selected.item.id === c.id ? 'border-primary' : 'border-border hover:border-primary/40',
                        )}
                      >
                        <div className="aspect-square overflow-hidden bg-muted">
                          {c.cover ? (
                            <img src={c.cover} alt={c.title} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full" style={{ backgroundColor: c.config.mixed ?? c.config.couleur ?? '#D8C29D' }} />
                          )}
                        </div>
                        <div className="p-2.5">
                          <p className="truncate text-xs font-medium text-foreground">{c.title}</p>
                          <p className="truncate text-[10px] text-muted-foreground">Ma création</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
