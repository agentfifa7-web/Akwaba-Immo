import Link from 'next/link'

import type { Project } from '@/lib/data'
import { formatFCFA } from '@/lib/data'
import { Badge } from '@/components/ui/badge'

const statusLabel: Record<Project['status'], string> = {
  en_commercialisation: 'En commercialisation',
  en_construction: 'En construction',
  a_venir: 'À venir',
  livre: 'Livré',
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projets/${project.slug}`} className="group block">
      <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-muted">
        <img
          src={project.images[0]}
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <Badge className="absolute left-4 top-4">{statusLabel[project.status]}</Badge>
      </div>
      <div className="border-b border-border py-5">
        <h3 className="font-serif text-xl transition-colors group-hover:text-primary">{project.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {project.district}, {project.city}
        </p>
        <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">
          À partir de {formatFCFA(project.priceFrom)} · {project.availableLots}/{project.lots} lots disponibles
        </p>
      </div>
    </Link>
  )
}
