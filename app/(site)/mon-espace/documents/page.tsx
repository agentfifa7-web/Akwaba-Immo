'use client'

import { Download, FileText } from 'lucide-react'

import { formatDate } from '@/lib/data'
import { useClientDocuments } from '@/lib/store'
import { Badge } from '@/components/ui/badge'

export default function MesDocumentsPage() {
  const { items, hydrated } = useClientDocuments()
  const sorted = [...items].sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Espace client</p>
      <h2 className="font-serif text-2xl leading-tight sm:text-3xl">Mes documents</h2>
      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
        Retrouvez ici vos contrats, rapports d’estimation, quittances et autres documents liés à vos dossiers.
      </p>

      {!hydrated && <div className="mt-10 h-48 animate-pulse bg-muted" />}

      {hydrated && sorted.length === 0 && (
        <div className="mt-10 flex flex-col items-start gap-4 border border-dashed border-border p-10 text-center sm:items-center">
          <FileText className="size-8 text-muted-foreground" />
          <p className="font-serif text-xl">Aucun document pour le moment</p>
          <p className="max-w-md leading-7 text-muted-foreground">
            Vos documents apparaîtront ici dès qu’ils seront mis à disposition par votre conseiller.
          </p>
        </div>
      )}

      {hydrated && sorted.length > 0 && (
        <div className="mt-10 flex flex-col divide-y divide-border border border-border">
          {sorted.map((doc) => {
            const available = doc.status === 'disponible'
            return (
              <div key={doc.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <FileText className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-serif text-base leading-snug">{doc.label}</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                      {doc.type} · {formatDate(doc.date)}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3 pl-9 sm:pl-0">
                  <Badge variant={available ? 'default' : 'outline'}>
                    {available ? 'Disponible' : 'En attente'}
                  </Badge>
                  <button
                    type="button"
                    disabled={!available}
                    className="flex items-center gap-2 border border-border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground"
                  >
                    <Download className="size-3.5" /> Télécharger
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
