'use client'

import Link from 'next/link'
import { Package, ShoppingBag, Store, TrendingUp, Users, CalendarClock } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

import { boutiques, formatDate, formatFCFA, products, stylists } from '@/lib/data'
import { useAppointments, useOrders } from '@/lib/store'
import { PageHeader, StatCard, TableShell, Th, Td, StatusPill, EmptyState } from '@/components/admin/ui'

const TERRACOTTA = '#b96f55'
const OBSIDIAN = '#171310'

const trend = [
  { month: 'Avr', gmv: 18_400_000, commandes: 620 },
  { month: 'Mai', gmv: 21_100_000, commandes: 705 },
  { month: 'Juin', gmv: 24_800_000, commandes: 812 },
  { month: 'Juil', gmv: 27_300_000, commandes: 890 },
  { month: 'Août', gmv: 31_900_000, commandes: 980 },
  { month: 'Sept', gmv: 35_200_000, commandes: 1_070 },
]

export default function AdminDashboardPage() {
  const { items: orders, hydrated: ordersHydrated } = useOrders()
  const { items: appointments, hydrated: appointmentsHydrated } = useAppointments()
  const hydrated = ordersHydrated && appointmentsHydrated

  const recentOrders = [...orders].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 5)
  const upcomingAppointments = [...appointments].sort((a, b) => (a.date + a.time < b.date + b.time ? 1 : -1)).slice(0, 5)

  return (
    <div>
      <PageHeader title="Tableau de bord" description="Vue d’ensemble de l’activité de la marketplace KÔSMÉA." />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        <StatCard label="GMV (mois)" value={formatFCFA(35_200_000)} hint="+10,4 % vs mois précédent" icon={TrendingUp} />
        <StatCard label="Commandes" value={hydrated ? String(orders.length) : '—'} hint="Toutes boutiques" icon={ShoppingBag} />
        <StatCard label="Produits" value={String(products.length)} hint="Catalogue actif" icon={Package} />
        <StatCard label="Boutiques" value={String(boutiques.length)} hint="Vendeurs vérifiés" icon={Store} />
        <StatCard label="Stylistes & pros" value={String(stylists.length)} hint="Prestataires actifs" icon={Users} />
        <StatCard label="Réservations" value={hydrated ? String(appointments.length) : '—'} hint="Tous statuts" icon={CalendarClock} />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="border border-border bg-card p-5">
          <h2 className="font-serif text-lg font-semibold text-foreground">GMV — 6 derniers mois</h2>
          <p className="mt-1 text-xs text-muted-foreground">Valeur brute des transactions sur la marketplace (mock).</p>
          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer>
              <LineChart data={trend} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis fontSize={12} stroke="var(--muted-foreground)" tickFormatter={(v) => `${v / 1_000_000}M`} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 0 }} formatter={(v) => formatFCFA(Number(v))} />
                <Line type="monotone" dataKey="gmv" name="GMV" stroke={TERRACOTTA} strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border border-border bg-card p-5">
          <h2 className="font-serif text-lg font-semibold text-foreground">Commandes — 6 derniers mois</h2>
          <p className="mt-1 text-xs text-muted-foreground">Volume mensuel de commandes (mock).</p>
          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer>
              <BarChart data={trend} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis fontSize={12} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 0 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="commandes" name="Commandes" fill={OBSIDIAN} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-foreground">Commandes récentes</h2>
            <Link href="/admin/commandes" className="text-xs font-semibold uppercase tracking-wider text-primary hover:underline">Voir tout</Link>
          </div>
          {!hydrated ? <EmptyState /> : recentOrders.length === 0 ? <EmptyState label="Aucune commande pour le moment." /> : (
            <TableShell>
              <thead><tr><Th>Commande</Th><Th>Total</Th><Th>Statut</Th><Th>Date</Th></tr></thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id}>
                    <Td className="font-medium">#{o.id}</Td>
                    <Td>{formatFCFA(o.total)}</Td>
                    <Td><StatusPill status={o.status} /></Td>
                    <Td className="text-muted-foreground">{formatDate(o.createdAt)}</Td>
                  </tr>
                ))}
              </tbody>
            </TableShell>
          )}
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-foreground">Réservations à venir</h2>
            <Link href="/admin/rendez-vous" className="text-xs font-semibold uppercase tracking-wider text-primary hover:underline">Voir tout</Link>
          </div>
          {!hydrated ? <EmptyState /> : upcomingAppointments.length === 0 ? <EmptyState label="Aucune réservation pour le moment." /> : (
            <TableShell>
              <thead><tr><Th>Client</Th><Th>Prestataire</Th><Th>Date</Th><Th>Statut</Th></tr></thead>
              <tbody>
                {upcomingAppointments.map((a) => (
                  <tr key={a.id}>
                    <Td className="font-medium">{a.name}</Td>
                    <Td>{a.providerName}</Td>
                    <Td className="text-muted-foreground">{formatDate(a.date)} · {a.time}</Td>
                    <Td><StatusPill status={a.status} /></Td>
                  </tr>
                ))}
              </tbody>
            </TableShell>
          )}
        </section>
      </div>
    </div>
  )
}
