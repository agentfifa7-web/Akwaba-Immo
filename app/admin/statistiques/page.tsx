'use client'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

import { properties } from '@/lib/data'
import { useRequests } from '@/lib/store'
import { PageHeader, EmptyState } from '@/components/admin/ui'

const RED = '#b3261e'
const GRAPHITE = '#2a2622'
const LIGHT = '#c9c2b8'
const PALETTE = [RED, GRAPHITE, LIGHT, '#8a7f6e', '#e0a39c', '#5a5147']

const visitorsTrend = [
  { month: 'Avr', visiteurs: 8920 },
  { month: 'Mai', visiteurs: 9640 },
  { month: 'Juin', visiteurs: 10310 },
  { month: 'Juil', visiteurs: 11080 },
  { month: 'Août', visiteurs: 11750 },
  { month: 'Sept', visiteurs: 12480 },
]

const categoryLabels: Record<string, string> = {
  villa: 'Villas', maison: 'Maisons', appartement: 'Appartements', terrain: 'Terrains',
  bureau: 'Bureaux', commerce: 'Commerces', immeuble: 'Immeubles',
}

export default function AdminStatistiquesPage() {
  const { items: requests, hydrated } = useRequests()

  const leadsByType = Object.entries(
    requests.reduce<Record<string, number>>((acc, r) => {
      acc[r.type] = (acc[r.type] ?? 0) + 1
      return acc
    }, {}),
  ).map(([name, value]) => ({ name, value }))

  const biensByCategory = Object.entries(
    properties.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] ?? 0) + 1
      return acc
    }, {}),
  ).map(([category, value]) => ({ name: categoryLabels[category] ?? category, value }))

  return (
    <div>
      <PageHeader
        title="Statistiques"
        description="Analyse du trafic, des demandes entrantes et de la répartition du catalogue."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="border border-border bg-card p-5">
          <h2 className="font-serif text-lg font-semibold text-foreground">Trafic visiteurs — 6 derniers mois</h2>
          <p className="mt-1 text-xs text-muted-foreground">Estimation mensuelle du trafic du site public (mock).</p>
          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer>
              <LineChart data={visitorsTrend} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis fontSize={12} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 0 }} />
                <Line type="monotone" dataKey="visiteurs" name="Visiteurs" stroke={RED} strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border border-border bg-card p-5">
          <h2 className="font-serif text-lg font-semibold text-foreground">Répartition du catalogue par catégorie</h2>
          <p className="mt-1 text-xs text-muted-foreground">Nombre de biens actifs par type de bien.</p>
          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer>
              <BarChart data={biensByCategory} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" fontSize={11} stroke="var(--muted-foreground)" interval={0} angle={-20} textAnchor="end" height={50} />
                <YAxis fontSize={12} stroke="var(--muted-foreground)" allowDecimals={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 0 }} />
                <Bar dataKey="value" name="Biens" fill={GRAPHITE} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border border-border bg-card p-5 xl:col-span-2">
          <h2 className="font-serif text-lg font-semibold text-foreground">Leads par type de demande</h2>
          <p className="mt-1 text-xs text-muted-foreground">Répartition des demandes reçues via les formulaires du site.</p>
          <div className="mt-4 h-80 w-full">
            {!hydrated ? (
              <EmptyState />
            ) : leadsByType.length === 0 ? (
              <EmptyState label="Aucune demande enregistrée pour le moment." />
            ) : (
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={leadsByType} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} label>
                    {leadsByType.map((entry, i) => (
                      <Cell key={entry.name} fill={PALETTE[i % PALETTE.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 0 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
