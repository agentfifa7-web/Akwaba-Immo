'use client'

import { use } from 'react'
import Link from 'next/link'
import { CheckCircle2, Heart, Printer, ShieldCheck } from 'lucide-react'

import { formatFCFA, products } from '@/lib/data'
import { useAdminCollection } from '@/lib/store'
import type { Certificate } from '@/lib/certificates'
import { Button } from '@/components/ui/button'

export default function CertificatePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params)
  const { items, hydrated } = useAdminCollection<Certificate>('certificats', [])
  const certificate = items.find((c) => c.code.toLowerCase() === decodeURIComponent(code).toLowerCase())
  const product = certificate ? products.find((p) => p.id === certificate.productId) : undefined

  if (!hydrated) {
    return <div className="mx-auto max-w-2xl px-5 py-24 text-center text-sm text-muted-foreground">Vérification du certificat…</div>
  }

  if (!certificate) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-5 py-24 text-center">
        <ShieldCheck className="size-10 text-muted-foreground" />
        <h1 className="font-serif text-2xl">Certificat introuvable</h1>
        <p className="text-sm text-muted-foreground">
          Ce code ne correspond à aucun certificat KÔSMÉA enregistré. Vérifiez le QR code imprimé sur votre produit ou contactez notre
          service client.
        </p>
        <Link href="/"><Button variant="outline">Retour à l’accueil</Button></Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 lg:py-24 print:py-6">
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="flex flex-col items-center gap-2 bg-obsidian px-8 py-10 text-center text-white">
          <p className="font-serif text-2xl font-semibold tracking-[0.15em]">
            KÔSMÉA<span className="text-accent">.</span>
          </p>
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
            <ShieldCheck className="size-3.5" /> Certificat d’authenticité
          </p>
        </div>

        <div className="space-y-8 px-8 py-10">
          <div className="text-center">
            <CheckCircle2 className="mx-auto size-8 text-accent" />
            <h1 className="mt-3 font-serif text-2xl">Pièce authentique KÔSMÉA</h1>
            <p className="mt-1 text-sm text-muted-foreground">Certificat n° {certificate.code}</p>
          </div>

          {product && (
            <div className="flex items-center gap-4 rounded-xl border border-border bg-secondary/50 p-4">
              <img src={product.images[0]} alt={product.name} className="size-16 rounded-lg object-cover" />
              <div>
                <p className="font-medium text-foreground">{product.name}</p>
                <p className="text-xs text-muted-foreground">{formatFCFA(product.price)}</p>
              </div>
            </div>
          )}

          <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Dédicace personnalisée</p>
            <p className="mt-3 font-serif text-xl">
              Pour {certificate.customerFirstName} {certificate.customerLastName}
            </p>
            {certificate.message && <p className="mt-4 text-sm leading-6 text-foreground/90">« {certificate.message} »</p>}
          </div>

          <div className="flex items-start gap-3 border-t border-border pt-6">
            <Heart className="mt-0.5 size-4 shrink-0 text-accent" />
            <p className="text-sm leading-6 text-muted-foreground">{certificate.thankYou}</p>
          </div>

          <div className="flex flex-col items-center gap-1 border-t border-border pt-6 text-center print:hidden">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Émis le {new Date(certificate.issuedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <Button variant="outline" className="mt-3 gap-2" onClick={() => window.print()}>
              <Printer className="size-4" /> Imprimer ce certificat
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
