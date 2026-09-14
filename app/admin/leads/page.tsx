'use client'

import { useState } from 'react'

import { formatDate } from '@/lib/data'
import { useRequests, type RequestStatus } from '@/lib/store'
import { PageHeader, TableShell, Th, Td, EmptyState, StatusPill } from '@/components/admin/ui'
import { Select } from '@/components/ui/select'
import { cn } from '@/lib/utils'

const statusOptions: RequestStatus[] = ['nouvelle', 'en_cours', 'traitee', 'cloturee']
const statusLabels: Record<RequestStatus, string> = {
  nouvelle: 'Nouvelle',
  en_cours: 'En cours',
  traitee: 'Traitée',
  cloturee: 'Clôturée',
}

export default function AdminLeadsPage() {
  const { items, updateStatus, hydrated } = useRequests()
  const [filter, setFilter] = useState<RequestStatus | 'toutes'>('toutes')

  const filtered = filter === 'toutes' ? items : items.filter((r) => r.status === filter)
  const sorted = [...filtered].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))

  return (
    <div>
      <PageHeader
        title="Leads"
        description="Demandes reçues via les formulaires du site public (achat, location, estimation, investissement…)."
      />

      <div className="mb-5 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('toutes')}
          className={cn(
            'px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors',
            filter === 'toutes' ? 'bg-graphite text-graphite-foreground' : 'border border-border text-muted-foreground hover:text-foreground',
          )}
        >
          Toutes ({items.length})
        </button>
        {statusOptions.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              'px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors',
              filter === s ? 'bg-graphite text-graphite-foreground' : 'border border-border text-muted-foreground hover:text-foreground',
            )}
          >
            {statusLabels[s]} ({items.filter((r) => r.status === s).length})
          </button>
        ))}
      </div>

      {!hydrated ? (
        <EmptyState />
      ) : sorted.length === 0 ? (
        <EmptyState label="Aucune demande pour ce filtre." />
      ) : (
        <TableShell>
          <thead>
            <tr>
              <Th>Client</Th>
              <Th>Type</Th>
              <Th>Sujet</Th>
              <Th>Bien concerné</Th>
              <Th>Date</Th>
              <Th>Statut</Th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => (
              <tr key={r.id}>
                <Td>
                  <div className="flex flex-col">
                    <span className="font-medium">{r.name}</span>
                    <span className="text-xs text-muted-foreground">{r.email} · {r.phone}</span>
                  </div>
                </Td>
                <Td>{r.type}</Td>
                <Td className="max-w-[240px] truncate" title={r.subject}>{r.subject}</Td>
                <Td className="text-muted-foreground">{r.propertyTitle ?? '—'}</Td>
                <Td className="text-muted-foreground">{formatDate(r.createdAt)}</Td>
                <Td>
                  <div className="flex flex-col gap-1.5">
                    <StatusPill status={r.status} />
                    <Select
                      className="h-8 w-40 text-xs"
                      value={r.status}
                      onChange={(e) => updateStatus(r.id, e.target.value as RequestStatus)}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{statusLabels[s]}</option>
                      ))}
                    </Select>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      )}
    </div>
  )
}
