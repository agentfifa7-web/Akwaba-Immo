'use client'

import Link from 'next/link'
import { Boxes, Trash2 } from 'lucide-react'

import { useDecorProjects } from '@/lib/store'
import { formatDate } from '@/lib/data'

export default function MesProjetsDecoPage() {
  const { items: projects, remove, hydrated } = useDecorProjects()

  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Espace client</p>
      <h2 className="font-serif text-2xl leading-tight sm:text-3xl">Mes projets de décoration</h2>
      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
        Retrouvez vos pièces meublées virtuellement : reprenez un projet là où vous l’avez laissé, ou lancez-en un nouveau.
      </p>

      <Link
        href="/decoration"
        className="mt-6 inline-flex rounded-lg bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0"
      >
        Nouveau projet de décoration
      </Link>

      {!hydrated && <div className="mt-10 h-48 animate-pulse rounded-xl bg-muted" />}

      {hydrated && projects.length === 0 && (
        <div className="mt-10 flex flex-col items-start gap-4 rounded-xl border border-dashed border-border p-10 text-center sm:items-center">
          <Boxes className="size-8 text-muted-foreground" />
          <p className="font-serif text-xl">Aucun projet de décoration pour le moment</p>
          <p className="max-w-md leading-7 text-muted-foreground">
            Ouvrez le décorateur virtuel 3D pour meubler une pièce, changer les couleurs des murs et vous projeter dans votre futur
            intérieur.
          </p>
        </div>
      )}

      {hydrated && projects.length > 0 && (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="flex flex-col justify-between rounded-xl border border-border bg-card p-5">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <p className="font-serif text-lg leading-tight">{project.name}</p>
                  <button onClick={() => remove(project.id)} aria-label="Supprimer le projet" className="text-muted-foreground hover:text-primary">
                    <Trash2 className="size-4" />
                  </button>
                </div>
                {project.propertyTitle && <p className="mt-1 text-xs text-muted-foreground">Lié à : {project.propertyTitle}</p>}
                <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
                  {project.width.toFixed(1)} × {project.depth.toFixed(1)} m · {project.items.length} élément(s)
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Modifié le {formatDate(project.updatedAt)}</p>
              </div>
              <Link
                href={`/decoration?projet=${project.id}`}
                className="mt-5 rounded-lg border border-foreground/20 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-sm"
              >
                Ouvrir
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
