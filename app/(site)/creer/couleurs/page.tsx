'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { FlaskConical, Save } from 'lucide-react'

import { formatFCFA, getBoutique, products } from '@/lib/data'
import { useCreations } from '@/lib/store'
import { SectionHeading } from '@/components/site/section-heading'
import { Button } from '@/components/ui/button'

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '')
  const num = parseInt(clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')
}

function mix(hexA: string, hexB: string): string {
  const [r1, g1, b1] = hexToRgb(hexA)
  const [r2, g2, b2] = hexToRgb(hexB)
  return rgbToHex([(r1 + r2) / 2, (g1 + g2) / 2, (b1 + b2) / 2])
}

function distance(hexA: string, hexB: string): number {
  const [r1, g1, b1] = hexToRgb(hexA)
  const [r2, g2, b2] = hexToRgb(hexB)
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)
}

const shadeProducts = products.filter((p) => p.shade)

export default function ColorLabPage() {
  const [colorA, setColorA] = useState('#B96F55')
  const [colorB, setColorB] = useState('#D8C29D')
  const { add: addCreation } = useCreations()
  const [saved, setSaved] = useState(false)

  const mixed = mix(colorA, colorB)

  const closest = useMemo(
    () => [...shadeProducts].sort((a, b) => distance(a.shade!.hex, mixed) - distance(b.shade!.hex, mixed)).slice(0, 3),
    [mixed],
  )

  function saveColor() {
    addCreation({ type: 'couleur', title: 'Ma teinte KÔSMÉA', summary: `${colorA} + ${colorB} → ${mixed}`, config: { colorA, colorB, mixed } })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="Beauty Color Lab" title="Mixez vos propres teintes" description="Choisissez deux couleurs et découvrez la teinte obtenue, puis les produits KÔSMÉA qui s’en rapprochent le plus." />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr_1.2fr]">
        <div className="border border-border bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Couleur A</p>
          <input type="color" value={colorA} onChange={(e) => setColorA(e.target.value)} className="mt-3 h-32 w-full rounded-lg border border-border" />
          <div className="mt-3 flex flex-wrap gap-2">
            {shadeProducts.slice(0, 6).map((p) => (
              <button key={p.id} type="button" onClick={() => setColorA(p.shade!.hex)} className="size-7 rounded-full border border-border" style={{ backgroundColor: p.shade!.hex }} aria-label={p.shade!.name} />
            ))}
          </div>
        </div>
        <div className="border border-border bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Couleur B</p>
          <input type="color" value={colorB} onChange={(e) => setColorB(e.target.value)} className="mt-3 h-32 w-full rounded-lg border border-border" />
          <div className="mt-3 flex flex-wrap gap-2">
            {shadeProducts.slice(6, 12).map((p) => (
              <button key={p.id} type="button" onClick={() => setColorB(p.shade!.hex)} className="size-7 rounded-full border border-border" style={{ backgroundColor: p.shade!.hex }} aria-label={p.shade!.name} />
            ))}
          </div>
        </div>
        <div className="border border-border bg-obsidian p-6 text-white">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-champagne">
            <FlaskConical className="size-3.5" /> Your color
          </p>
          <div className="mt-3 h-32 w-full rounded-lg border border-white/20" style={{ backgroundColor: mixed }} />
          <p className="mt-3 font-mono text-sm text-white/80">{mixed}</p>
          <Button variant="secondary" className="mt-4 w-full gap-2" onClick={saveColor}>
            <Save className="size-4" /> {saved ? 'Teinte enregistrée ✓' : 'Save this color'}
          </Button>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="font-serif text-2xl">Matching products</h2>
        <p className="mt-1 text-sm text-muted-foreground">Recommandation indicative — pas une garantie de correspondance exacte.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {closest.map((p) => {
            const boutique = getBoutique(p.boutiqueId)
            return (
              <Link key={p.id} href={`/produits/${p.slug}`} className="flex items-center gap-3 border border-border bg-card p-4 transition-colors hover:border-primary">
                <span className="size-10 shrink-0 rounded-full border border-border" style={{ backgroundColor: p.shade!.hex }} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFCFA(p.price)} · {boutique?.name}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
