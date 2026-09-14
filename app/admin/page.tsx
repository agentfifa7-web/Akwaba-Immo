'use client'

import Link from 'next/link'
import { Eye, Inbox, CalendarClock, Building2, Building, TrendingUp } from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

import { properties, projects, formatDate } from '@/lib/data'
import { useRequests, useAppointments } from '@/lib/store'
import { PageHeader, StatCard, TableShell, Th, Td, StatusPill, EmptyState } from '@/components/admin/ui'

const RED = '#b3261e'
const GRAPHITE = '#2a2622'

// Tendance mensuelle simulée (aucune donnée d'analytics réelle disponible)
const trend = [
  { month: 'Avr', visiteurs: 8920, leads: 41 },
  { month: 'Mai', visiteurs: 9640, leads: 47 },
  { month: 'Juin', visiteurs: 10310, leads: 52 },
  { month: 'Juil', visiteurs: 11080, leads: 58 },
  { month: 'Août', visiteurs: 11750, leads: 63 },
  { month: 'Sept', visiteurs: 12480, leads: 69 },
]

export default function AdminDashboardPage() {
  const { items: requests, hydrated: requestsHydrated } = useRequests()
  const { items: appointments, hydrated: appointmentsHydrated } = useAppointments()

  const hydrated = requestsHydrated && appointmentsHydrated
  const conversionRate = requests.length > 0 ? Math.round((appointments.length / requests.length) * 100) : 0

  const recentRequests = [...requests]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, 5)
  const upcomingAppointments = [...appointments]
    .sort((a, b) => (a.date + a.time < b.date + b.time ? 1 : -1))
    .slice(0, 5)

  return (
    <div>
      <PageHeader
        title="Tableau de bord"
        description="Vue d’ensemble de l’activité commerciale et du catalogue AKWABA IMMOBILIER."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Visiteurs (mois)" value="12 480" hint="+6,2 % vs mois précédent" icon={Eye} />
        <StatCard label="Leads" value={hydrated ? String(requests.length) : '—'} hint="Demandes reçues" icon={Inbox} />
        <StatCard
          label="Rendez-vous"
          value={hydrated ? String(appointments.length) : '—'}
          hint="Tous statuts confondus"
          icon={CalendarClock}
        />
        <StatCard label="Biens" value={String(properties.length)} hint="Catalogue actif" icon={Building2} />
        <StatCard label="Projets" value={String(projects.length)} hint="Programmes immobiliers" icon={Building} />
        <StatCard
          label="Taux de conversion"
          value={hydrated ? `${conversionRate}%` : '—'}
          hint="Leads → rendez-vous"
          icon={TrendingUp}
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="border border-border bg-card p-5">
          <h2 className="font-serif text-lg font-semibold text-foreground">Visiteurs — 6 derniers mois</h2>
          <p className="mt-1 text-xs text-muted-foreground">Estimation basée sur le trafic du site public (mock).</p>
          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer>
              <LineChart data={trend} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
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
          <h2 className="font-serif text-lg font-semibold text-foreground">Leads générés — 6 derniers mois</h2>
          <p className="mt-1 text-xs text-muted-foreground">Volume mensuel de demandes entrantes (mock).</p>
          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer>
              <BarChart data={trend} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis fontSize={12} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 0 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="leads" name="Leads" fill={GRAPHITE} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-foreground">Demandes récentes</h2>
            <Link href="/admin/leads" className="text-xs font-semibold uppercase tracking-wider text-primary hover:underline">
              Voir tout
            </Link>
          </div>
          {!hydrated ? (
            <EmptyState />
          ) : recentRequests.length === 0 ? (
            <EmptyState label="Aucune demande pour le moment." />
          ) : (
            <TableShell>
              <thead>
                <tr>
                  <Th>Client</Th>
                  <Th>Type</Th>
                  <Th>Statut</Th>
                  <Th>Date</Th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((r) => (
                  <tr key={r.id}>
                    <Td className="font-medium">{r.name}</Td>
                    <Td>{r.type}</Td>
                    <Td>
                      <StatusPill status={r.status} />
                    </Td>
                    <Td className="text-muted-foreground">{formatDate(r.createdAt)}</Td>
                  </tr>
                ))}
              </tbody>
            </TableShell>
          )}
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-foreground">Rendez-vous à venir</h2>
            <Link href="/admin/rendez-vous" className="text-xs font-semibold uppercase tracking-wider text-primary hover:underline">
              Voir tout
            </Link>
          </div>
          {!hydrated ? (
            <EmptyState />
          ) : upcomingAppointments.length === 0 ? (
            <EmptyState label="Aucun rendez-vous pour le moment." />
          ) : (
            <TableShell>
              <thead>
                <tr>
                  <Th>Client</Th>
                  <Th>Type</Th>
                  <Th>Date</Th>
                  <Th>Statut</Th>
                </tr>
              </thead>
              <tbody>
                {upcomingAppointments.map((a) => (
                  <tr key={a.id}>
                    <Td className="font-medium">{a.name}</Td>
                    <Td>{a.type}</Td>
                    <Td className="text-muted-foreground">
                      {formatDate(a.date)} · {a.time}
                    </Td>
                    <Td>
                      <StatusPill status={a.status} />
                    </Td>
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
