'use client'

import { formatDate, formatFCFA, products } from '@/lib/data'
import { useOrders, type OrderStatus } from '@/lib/store'
import { Badge } from '@/components/ui/badge'

const statusLabels: Record<OrderStatus, string> = {
  recue: 'Commande reçue',
  paiement_confirme: 'Paiement confirmé',
  preparation: 'Préparation',
  prete: 'Prête',
  expediee: 'Expédiée',
  en_livraison: 'En livraison',
  livree: 'Livrée',
}

const trackingSteps: OrderStatus[] = ['recue', 'paiement_confirme', 'preparation', 'prete', 'expediee', 'en_livraison', 'livree']

export default function OrdersPage() {
  const { items: orders } = useOrders()

  return (
    <div>
      <h2 className="font-serif text-2xl">Mes commandes</h2>
      {orders.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">Vous n’avez pas encore passé de commande.</p>
      ) : (
        <div className="mt-6 space-y-8">
          {orders.map((order) => {
            const stepIndex = trackingSteps.indexOf(order.status)
            return (
              <div key={order.id} className="border border-border p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-serif text-lg">#{order.id}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)} · {order.deliveryMethod}</p>
                  </div>
                  <Badge>{statusLabels[order.status]}</Badge>
                </div>

                <div className="mt-5 flex items-center gap-1">
                  {trackingSteps.map((s, i) => (
                    <div key={s} className="flex flex-1 items-center gap-1">
                      <span className={`size-2.5 rounded-full ${i <= stepIndex ? 'bg-primary' : 'bg-border'}`} />
                      {i < trackingSteps.length - 1 && <span className={`h-0.5 flex-1 ${i < stepIndex ? 'bg-primary' : 'bg-border'}`} />}
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground">{statusLabels[trackingSteps[Math.min(stepIndex + 1, trackingSteps.length - 1)]]}{stepIndex < trackingSteps.length - 1 ? ' — étape suivante' : ''}</p>

                <ul className="mt-5 divide-y divide-border border-y border-border">
                  {order.items.map((item, i) => {
                    const product = products.find((p) => p.id === item.productId)
                    return (
                      <li key={i} className="flex items-center justify-between py-2.5 text-sm">
                        <span>{product?.name ?? item.productId} × {item.quantity}</span>
                        <span className="text-muted-foreground">{formatFCFA(item.price * item.quantity)}</span>
                      </li>
                    )
                  })}
                </ul>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{order.address}</p>
                  <p className="font-serif text-lg">{formatFCFA(order.total)}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
