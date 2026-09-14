'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Sparkles, X } from 'lucide-react'

import type { Product } from '@/lib/data'
import { useAvatar, useCart } from '@/lib/store'
import { applyProductToAvatar } from '@/lib/try-on'
import { AvatarPreview } from './avatar-preview'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Bouton d'essayage ambiant : ouvre instantanément un aperçu du produit sur
 * le mannequin déjà validé par l'utilisateur, sans quitter la page. C'est
 * le cœur de l'expérience KÔSMÉA — essayer n'importe quel produit, n'importe
 * où sur la plateforme, sur son propre mannequin permanent.
 */
export function TryOnButton({ product, className, compact }: { product: Product; className?: string; compact?: boolean }) {
  const [open, setOpen] = useState(false)
  const { config, hydrated } = useAvatar()
  const { add } = useCart()

  if (!hydrated) return null
  const previewConfig = applyProductToAvatar(product, config)

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen(true)
        }}
        className={cn(
          compact
            ? 'flex items-center justify-center gap-1 rounded-lg bg-white/95 px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur'
            : 'flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary',
          className,
        )}
      >
        <Sparkles className="size-3.5" /> Voir sur mon mannequin
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/70 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-sm rounded-2xl bg-background p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <p className="font-serif text-lg">Sur votre mannequin</p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Fermer">
                <X className="size-5" />
              </button>
            </div>
            <AvatarPreview config={previewConfig} className="mt-4 aspect-[3/4] w-full" />
            <p className="mt-3 text-center text-sm font-medium text-foreground">{product.name}</p>
            {!config.validated && (
              <p className="mt-1 text-center text-[11px] text-muted-foreground">
                Vous utilisez un mannequin par défaut.{' '}
                <Link href="/essayer/avatar" className="text-accent hover:underline">Créez le vôtre →</Link>
              </p>
            )}
            <div className="mt-4 flex gap-2">
              <Button className="flex-1 gap-2" onClick={() => add(product.id, 1)}>
                <ShoppingBag className="size-4" /> Ajouter au panier
              </Button>
              <Link href="/essayer/avatar" className="flex-1">
                <Button variant="outline" className="w-full">Mon mannequin</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
