'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { RotateCcw, Save, ShoppingBag, Sparkles } from 'lucide-react'

import { formatFCFA, products, type Product } from '@/lib/data'
import { useAvatar, useCart, useCreations } from '@/lib/store'
import { AvatarPreview } from '@/components/site/avatar-preview'
import { SectionHeading } from '@/components/site/section-heading'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const steps: { key: 'foundationShade' | 'blushShade' | 'eyeshadowShade' | 'lipstickShade'; label: string; subcategory: string }[] = [
  { key: 'foundationShade', label: 'Fond de teint', subcategory: 'Fond de teint' },
  { key: 'blushShade', label: 'Blush', subcategory: 'Blush' },
  { key: 'eyeshadowShade', label: 'Fard à paupières', subcategory: 'Fard à paupières' },
  { key: 'lipstickShade', label: 'Rouge à lèvres', subcategory: 'Rouge à lèvres' },
]

export default function MakeupTryOnPage() {
  const { config, update, reset } = useAvatar()
  const { add } = useCart()
  const { add: addCreation } = useCreations()
  const [selection, setSelection] = useState<Record<string, Product | undefined>>({})
  const [saved, setSaved] = useState(false)

  const shadeProducts = useMemo(
    () => Object.fromEntries(steps.map((s) => [s.subcategory, products.filter((p) => p.subcategory === s.subcategory && p.shade)])),
    [],
  )

  const selectedProducts = Object.values(selection).filter((p): p is Product => Boolean(p))
  const total = selectedProducts.reduce((sum, p) => sum + p.price, 0)

  function pick(step: (typeof steps)[number], product: Product) {
    if (!product.shade) return
    update({ [step.key]: product.shade.hex } as Partial<typeof config>)
    setSelection((prev) => ({ ...prev, [step.subcategory]: product }))
  }

  function shopTheLook() {
    selectedProducts.forEach((p) => add(p.id, 1))
  }

  function saveLook() {
    addCreation({
      type: 'maquillage',
      title: 'Mon maquillage KÔSMÉA',
      summary: selectedProducts.map((p) => p.name).join(', ') || 'Look maquillage personnalisé',
      cover: selectedProducts[0]?.images[0],
      config: { foundationShade: config.foundationShade, blushShade: config.blushShade, eyeshadowShade: config.eyeshadowShade, lipstickShade: config.lipstickShade },
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="Makeup Studio" title="Essayage maquillage virtuel" description="Composez votre maquillage à partir des produits réellement disponibles sur la marketplace, puis achetez le look complet." />

      <div className="mt-12 grid gap-10 lg:grid-cols-[380px_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <AvatarPreview config={config} className="aspect-[3/4] w-full" />
          <div className="mt-4 flex gap-2">
            <Button variant="outline" className="flex-1 gap-2" onClick={reset}>
              <RotateCcw className="size-4" /> Réinitialiser
            </Button>
            <Button variant="outline" className="flex-1 gap-2" onClick={saveLook}>
              <Save className="size-4" /> {saved ? 'Enregistré ✓' : 'Save Look'}
            </Button>
          </div>
          <div className="mt-6 border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Votre sélection</p>
            {selectedProducts.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">Choisissez une teinte dans chaque étape pour composer votre look.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {selectedProducts.map((p) => (
                  <li key={p.id} className="flex items-center justify-between text-sm">
                    <span className="truncate pr-2 text-foreground">{p.name}</span>
                    <span className="shrink-0 text-muted-foreground">{formatFCFA(p.price)}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total</p>
              <p className="font-serif text-xl text-foreground">{formatFCFA(total)}</p>
            </div>
            <Button className="mt-4 w-full gap-2" disabled={selectedProducts.length === 0} onClick={shopTheLook}>
              <ShoppingBag className="size-4" /> Shop this look
            </Button>
          </div>
        </div>

        <div className="space-y-10">
          {steps.map((step) => (
            <div key={step.key}>
              <h3 className="flex items-center gap-2 font-serif text-xl">
                <Sparkles className="size-4 text-accent" /> {step.label}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {shadeProducts[step.subcategory]?.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => pick(step, p)}
                    className={cn(
                      'flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-colors',
                      selection[step.subcategory]?.id === p.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40',
                    )}
                  >
                    <span className="size-10 rounded-full border border-border" style={{ backgroundColor: p.shade?.hex }} />
                    <p className="text-xs font-medium leading-snug text-foreground">{p.shade?.name}</p>
                    <p className="text-[10px] text-muted-foreground">{formatFCFA(p.price)}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
          <Link href="/creer/couleurs" className="block text-xs font-semibold uppercase tracking-wider text-accent hover:underline">
            Essayez le Color Lab pour mélanger vos propres teintes →
          </Link>
        </div>
      </div>
    </div>
  )
}
