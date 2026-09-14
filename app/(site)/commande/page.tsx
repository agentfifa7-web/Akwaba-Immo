'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, MapPin, Smartphone, Truck } from 'lucide-react'

import { formatFCFA } from '@/lib/data'
import { useCart, useOrders } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const steps = ['Adresse', 'Livraison', 'Paiement', 'Récapitulatif'] as const
const deliveryOptions = [
  { id: 'express', label: 'Livraison express Abidjan', price: 2500, eta: 'Sous 3h' },
  { id: 'standard', label: 'Livraison standard', price: 1500, eta: '2 à 4 jours' },
  { id: 'retrait', label: 'Retrait en boutique', price: 0, eta: 'Selon disponibilité' },
]
const paymentOptions = [
  { id: 'orange', label: 'Orange Money' },
  { id: 'mtn', label: 'MTN Mobile Money' },
  { id: 'wave', label: 'Wave' },
  { id: 'carte', label: 'Carte bancaire' },
  { id: 'cod', label: 'Paiement à la livraison' },
]

export default function CheckoutPage() {
  const { lines, totalPrice, clear, hydrated } = useCart()
  const { add: addOrder } = useOrders()
  const [step, setStep] = useState(0)
  const [address, setAddress] = useState('')
  const [delivery, setDelivery] = useState(deliveryOptions[0].id)
  const [payment, setPayment] = useState(paymentOptions[0].id)
  const [orderId, setOrderId] = useState<string | null>(null)

  const deliveryFee = deliveryOptions.find((d) => d.id === delivery)?.price ?? 0
  const total = totalPrice + deliveryFee

  if (!hydrated) return null

  if (orderId) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center lg:px-10">
        <CheckCircle2 className="mx-auto size-12 text-accent" />
        <h1 className="mt-4 font-serif text-3xl">Commande confirmée !</h1>
        <p className="mt-2 text-muted-foreground">Votre commande <span className="font-semibold text-foreground">#{orderId}</span> a été reçue et est en cours de traitement.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/mon-kosmea/commandes"><Button size="lg">Suivre ma commande</Button></Link>
          <Link href="/shop"><Button size="lg" variant="outline">Continuer mes achats</Button></Link>
        </div>
      </div>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center lg:px-10">
        <p className="text-muted-foreground">Votre panier est vide.</p>
        <Link href="/shop" className="mt-4 inline-block"><Button>Explorer le shop</Button></Link>
      </div>
    )
  }

  function confirmOrder() {
    const order = addOrder({
      items: lines.map((l) => ({ productId: l.productId, quantity: l.quantity, color: l.color, size: l.size, price: l.product.price })),
      total,
      deliveryMethod: deliveryOptions.find((d) => d.id === delivery)?.label ?? '',
      address: address || 'Adresse non renseignée',
    })
    setOrderId(order.id)
    clear()
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 lg:px-10 lg:py-20">
      <h1 className="font-serif text-3xl">Commande</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <div key={s} className={cn('flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider', i === step ? 'border-primary bg-primary text-primary-foreground' : i < step ? 'border-accent text-accent' : 'border-border text-muted-foreground')}>
              {i + 1}. {s}
            </div>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="border border-border bg-card p-6">
          {step === 0 && (
            <div>
              <h2 className="flex items-center gap-2 font-serif text-xl"><MapPin className="size-4 text-accent" /> Adresse de livraison</h2>
              <div className="mt-5 space-y-4">
                <div><Label>Adresse complète</Label><Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Rue, quartier, ville" required /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Ville</Label><Input placeholder="Abidjan" /></div>
                  <div><Label>Téléphone</Label><Input placeholder="+225 07 00 00 00 00" /></div>
                </div>
              </div>
            </div>
          )}
          {step === 1 && (
            <div>
              <h2 className="flex items-center gap-2 font-serif text-xl"><Truck className="size-4 text-accent" /> Mode de livraison</h2>
              <div className="mt-5 space-y-3">
                {deliveryOptions.map((d) => (
                  <button key={d.id} type="button" onClick={() => setDelivery(d.id)} className={cn('flex w-full items-center justify-between border px-4 py-3.5 text-left', delivery === d.id ? 'border-primary bg-primary/5' : 'border-border')}>
                    <div>
                      <p className="text-sm font-medium text-foreground">{d.label}</p>
                      <p className="text-xs text-muted-foreground">{d.eta}</p>
                    </div>
                    <p className="text-sm font-semibold">{d.price === 0 ? 'Gratuit' : formatFCFA(d.price)}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="flex items-center gap-2 font-serif text-xl"><Smartphone className="size-4 text-accent" /> Paiement</h2>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {paymentOptions.map((p) => (
                  <button key={p.id} type="button" onClick={() => setPayment(p.id)} className={cn('border px-4 py-3.5 text-sm font-medium', payment === p.id ? 'border-primary bg-primary/5' : 'border-border')}>
                    {p.label}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">Paiement sécurisé via nos prestataires partenaires. Architecture prête pour l’intégration de fournisseurs de paiement supplémentaires.</p>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="font-serif text-xl">Récapitulatif</h2>
              <ul className="mt-5 divide-y divide-border border-y border-border">
                {lines.map((l) => (
                  <li key={`${l.productId}-${l.color}-${l.size}`} className="flex items-center justify-between py-3 text-sm">
                    <span>{l.product.name} × {l.quantity}</span>
                    <span className="font-medium">{formatFCFA(l.product.price * l.quantity)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">{address || 'Adresse non renseignée'} · {deliveryOptions.find((d) => d.id === delivery)?.label} · {paymentOptions.find((p) => p.id === payment)?.label}</p>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Précédent</Button>
            {step < steps.length - 1 ? (
              <Button onClick={() => setStep((s) => s + 1)}>Continuer</Button>
            ) : (
              <Button onClick={confirmOrder}>Confirmer la commande</Button>
            )}
          </div>
        </div>

        <aside className="h-fit border border-border bg-card p-6">
          <p className="font-serif text-lg">Total</p>
          <div className="mt-3 flex items-center justify-between text-sm"><span className="text-muted-foreground">Sous-total</span><span>{formatFCFA(totalPrice)}</span></div>
          <div className="mt-2 flex items-center justify-between text-sm"><span className="text-muted-foreground">Livraison</span><span>{deliveryFee === 0 ? 'Gratuit' : formatFCFA(deliveryFee)}</span></div>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4"><span className="text-xs font-semibold uppercase tracking-wider">Total</span><span className="font-serif text-2xl">{formatFCFA(total)}</span></div>
        </aside>
      </div>
    </div>
  )
}
