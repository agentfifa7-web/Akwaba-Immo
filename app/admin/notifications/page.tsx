'use client'

import { Inbox, CalendarClock, Mail, MessageCircle, Smartphone } from 'lucide-react'

import { formatDate } from '@/lib/data'
import { useRequests, useAppointments } from '@/lib/store'
import { PageHeader, EmptyState } from '@/components/admin/ui'

interface FeedEntry {
  id: string
  title: string
  detail: string
  date: string
  icon: typeof Inbox
}

export default function AdminNotificationsPage() {
  const { items: requests, hydrated: h1 } = useRequests()
  const { items: appointments, hydrated: h2 } = useAppointments()
  const hydrated = h1 && h2

  const feed: FeedEntry[] = [
    ...requests.map((r) => ({
      id: `req-${r.id}`,
      title: `Nouvelle demande de ${r.name}`,
      detail: `${r.type} — ${r.subject}`,
      date: r.createdAt,
      icon: Inbox,
    })),
    ...appointments.map((a) => ({
      id: `apt-${a.id}`,
      title: `Nouveau rendez-vous — ${a.type}`,
      detail: `${a.name} · le ${formatDate(a.date)} à ${a.time}`,
      date: a.createdAt,
      icon: CalendarClock,
    })),
  ].sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Journal d’activité consolidant les demandes et rendez-vous entrants depuis le site public."
      />

      <div className="mb-6 flex items-start gap-3 border border-primary/30 bg-primary/5 p-4 text-sm text-foreground">
        <MessageCircle className="mt-0.5 size-4 shrink-0 text-primary" />
        <p>
          Ce journal est actuellement affiché en lecture seule dans le back-office. Une fois les intégrations connectées,
          chaque événement pourra être routé automatiquement par <strong>Email</strong>, <strong>SMS</strong> et{' '}
          <strong>WhatsApp</strong> vers les conseillers concernés.
          <span className="ml-2 inline-flex items-center gap-2 align-middle text-muted-foreground">
            <Mail className="size-3.5" /> <Smartphone className="size-3.5" /> <MessageCircle className="size-3.5" />
          </span>
        </p>
      </div>

      {!hydrated ? (
        <EmptyState />
      ) : feed.length === 0 ? (
        <EmptyState label="Aucune activité récente." />
      ) : (
        <ol className="flex flex-col gap-0 border border-border bg-card">
          {feed.map((entry, i) => {
            const Icon = entry.icon
            return (
              <li key={entry.id} className={`flex items-start gap-4 px-5 py-4 ${i !== feed.length - 1 ? 'border-b border-border' : ''}`}>
                <div className="flex size-9 shrink-0 items-center justify-center bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{entry.title}</p>
                  <p className="text-sm text-muted-foreground">{entry.detail}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{formatDate(entry.date)}</span>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
