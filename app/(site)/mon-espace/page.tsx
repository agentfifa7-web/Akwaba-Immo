'use client'

import Link from 'next/link'
import { ArrowRight, CalendarDays, FileText, Heart, MessageSquare } from 'lucide-react'

import { formatDate } from '@/lib/data'
import { useAppointments, useClientDocuments, useFavorites, useRequests } from '@/lib/store'

export default function MonEspaceDashboardPage() {
  const { ids: favoriteIds, hydrated: favHydrated } = useFavorites()
  const { items: appointments, hydrated: apptHydrated } = useAppointments()
  const { items: requests, hydrated: reqHydrated } = useRequests()
  const { items: documents, hydrated: docHydrated } = useClientDocuments()

  const nextAppointment = [...appointments]
    .filter((a) => a.status !== 'annule')
    .sort((a, b) => (a.date + a.time < b.date + b.time ? -1 : 1))[0]

  const widgets = [
    {
      href: '/mon-espace/favoris',
      icon: Heart,
      label: 'Mes favoris',
      value: favHydrated ? favoriteIds.length : '—',
      hint: favHydrated
        ? favoriteIds.length > 0
          ? `${favoriteIds.length} bien${favoriteIds.length > 1 ? 's' : ''} enregistré${favoriteIds.length > 1 ? 's' : ''}`
          : 'Aucun bien enregistré'
        : '',
    },
    {
      href: '/mon-espace/rendez-vous',
      icon: CalendarDays,
      label: 'Mes rendez-vous',
      value: apptHydrated ? appointments.length : '—',
      hint: apptHydrated
        ? nextAppointment
          ? `Prochain : ${formatDate(nextAppointment.date)} à ${nextAppointment.time}`
          : 'Aucun rendez-vous programmé'
        : '',
    },
    {
      href: '/mon-espace/demandes',
      icon: MessageSquare,
      label: 'Mes demandes',
      value: reqHydrated ? requests.length : '—',
      hint: reqHydrated
        ? requests.filter((r) => r.status === 'nouvelle' || r.status === 'en_cours').length > 0
          ? `${requests.filter((r) => r.status === 'nouvelle' || r.status === 'en_cours').length} en cours de traitement`
          : 'Aucune demande en cours'
        : '',
    },
    {
      href: '/mon-espace/documents',
      icon: FileText,
      label: 'Mes documents',
      value: docHydrated ? documents.length : '—',
      hint: docHydrated
        ? `${documents.filter((d) => d.status === 'disponible').length} disponible${documents.filter((d) => d.status === 'disponible').length > 1 ? 's' : ''}`
        : '',
    },
  ]

  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Tableau de bord</p>
      <h2 className="font-serif text-2xl leading-tight sm:text-3xl">Bienvenue dans votre espace</h2>
      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
        Retrouvez en un coup d’œil vos biens favoris, vos rendez-vous à venir, vos demandes en cours et vos
        documents personnels.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {widgets.map((widget) => {
          const Icon = widget.icon
          return (
            <Link
              key={widget.href}
              href={widget.href}
              className="group flex flex-col justify-between border border-border p-6 transition-colors hover:border-primary"
            >
              <div className="flex items-start justify-between">
                <Icon className="size-5 text-primary" />
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <div className="mt-8">
                <p className="font-serif text-3xl">{widget.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-foreground">{widget.label}</p>
                <p className="mt-2 min-h-8 text-xs leading-5 text-muted-foreground">{widget.hint}</p>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-10 flex flex-col gap-3 border border-border bg-secondary/40 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-lg">Un projet en tête ?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Parcourez notre catalogue ou contactez un conseiller pour être accompagné dans votre projet.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link
            href="/biens"
            className="bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voir les biens
          </Link>
          <Link
            href="/contact"
            className="border border-border px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-primary hover:text-primary"
          >
            Contacter un conseiller
          </Link>
        </div>
      </div>
    </div>
  )
}
