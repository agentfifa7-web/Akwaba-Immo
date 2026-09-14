'use client'

import { Eye, Package, ShoppingBag, TrendingUp, Users } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

import { formatFCFA, getBoutique, productsByBoutique } from '@/lib/data'
import { useOrders } from '@/lib/store'
import { PageHeader, StatCard, TableShell, Th, Td } from '@/components/admin/ui'

const MY_BOUTIQUE_ID = 'bq-1'
const trend = [
  { day: 'Lun', ventes: 42000 }, { day: 'Mar', ventes: 68000 }, { day: 'Mer', ventes: 51000 },
  { day: 'Jeu', ventes: 88000 }, { day: 'Ven', ventes: 121000 }, { day: 'Sam', ventes: 156000 }, { day: 'Dim', ventes: 98000 },
]

export default function ProDashboardPage() {
  const boutique = getBoutique(MY_BOUTIQUE_ID)
  const myProducts = productsByBoutique(MY_BOUTIQUE_ID)
  const { items: orders } = useOrders()
  const topProducts = [...myProducts].sort((a, b) => b.rating - a.rating).slice(0, 5)

  return (
    <div>
      <PageHeader title={`Bonjour, ${boutique?.name}`} description="Vue d’ensemble de votre activité sur la marketplace KÔSMÉA." />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Ventes du jour" value={formatFCFA(98000)} hint="+12% vs hier" icon={TrendingUp} />
        <StatCard label="Commandes" value={String(orders.length)} hint="Toutes plateformes" icon={ShoppingBag} />
        <StatCard label="Produits" value={String(myProducts.length)} hint="Catalogue actif" icon={Package} />
        <StatCard label="Clients" value={boutique?.followers.toLocaleString('fr-FR') ?? '—'} hint="Abonnés boutique" icon={Users} />
        <StatCard label="Vues boutique" value="3 240" hint="7 derniers jours" icon={Eye} />
      </div>

      <div className="mt-8 border border-border bg-card p-5">
        <h2 className="font-serif text-lg font-semibold">Ventes — 7 derniers jours</h2>
        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer>
            <LineChart data={trend} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" fontSize={12} stroke="var(--muted-foreground)" />
              <YAxis fontSize={12} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 0 }} formatter={(v) => formatFCFA(Number(v))} />
              <Line type="monotone" dataKey="ventes" stroke="#b96f55" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-3 font-serif text-lg font-semibold">Meilleurs produits</h2>
        <TableShell>
          <thead><tr><Th>Produit</Th><Th>Prix</Th><Th>Note</Th><Th>Stock</Th></tr></thead>
          <tbody>
            {topProducts.map((p) => (
              <tr key={p.id}>
                <Td className="font-medium">{p.name}</Td>
                <Td>{formatFCFA(p.price)}</Td>
                <Td>{p.rating.toFixed(1)} ★</Td>
                <Td>{p.stock}</Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </div>
    </div>
  )
}
