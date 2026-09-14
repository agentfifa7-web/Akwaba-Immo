// AKWABA ADMIN — petits composants d'interface partagés par les modules du back-office
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h1>
        {description ? <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string
  value: string
  hint?: string
  icon?: LucideIcon
}) {
  return (
    <div className="flex items-start justify-between gap-3 border border-border bg-card p-5">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-2 font-serif text-2xl font-semibold text-foreground sm:text-3xl">{value}</p>
        {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      {Icon ? (
        <div className="flex size-10 shrink-0 items-center justify-center bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
      ) : null}
    </div>
  )
}

export function Th({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <th
      className={cn(
        'border-b border-border px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground',
        className,
      )}
    >
      {children}
    </th>
  )
}

export function Td({ className, children }: { className?: string; children: React.ReactNode }) {
  return <td className={cn('border-b border-border px-3 py-3 align-middle text-sm text-foreground', className)}>{children}</td>
}

export function TableShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto border border-border bg-card">
      <table className="w-full min-w-[720px] border-collapse">{children}</table>
    </div>
  )
}

export function EmptyState({ label = 'Chargement…' }: { label?: string }) {
  return <div className="border border-dashed border-border bg-card px-6 py-16 text-center text-sm text-muted-foreground">{label}</div>
}

const statusTones: Record<string, string> = {
  // demandes / leads
  nouvelle: 'bg-primary/10 text-primary',
  en_cours: 'bg-amber-500/10 text-amber-600',
  traitee: 'bg-emerald-500/10 text-emerald-600',
  cloturee: 'bg-muted text-muted-foreground',
  // rendez-vous
  en_attente: 'bg-amber-500/10 text-amber-600',
  confirme: 'bg-emerald-500/10 text-emerald-600',
  annule: 'bg-destructive/10 text-destructive',
  termine: 'bg-muted text-muted-foreground',
  // documents
  disponible: 'bg-emerald-500/10 text-emerald-600',
  // générique
  actif: 'bg-emerald-500/10 text-emerald-600',
  inactif: 'bg-muted text-muted-foreground',
}

const statusLabels: Record<string, string> = {
  nouvelle: 'Nouvelle',
  en_cours: 'En cours',
  traitee: 'Traitée',
  cloturee: 'Clôturée',
  en_attente: 'En attente',
  confirme: 'Confirmé',
  annule: 'Annulé',
  termine: 'Terminé',
  disponible: 'Disponible',
  actif: 'Actif',
  inactif: 'Inactif',
}

export function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap',
        statusTones[status] ?? 'bg-muted text-muted-foreground',
      )}
    >
      {statusLabels[status] ?? status}
    </span>
  )
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
