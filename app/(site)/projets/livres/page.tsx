import Link from 'next/link'
import { MapPin } from 'lucide-react'

import { formatFCFA, projects } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Badge } from '@/components/ui/badge'

const delivered = projects.filter((p) => p.status === 'livre')

export default function ProjetsLivresPage() {
  return (
    <div>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
          <SectionHeading
            eyebrow="Notre savoir-faire"
            title="Projets livrés"
            description="Des programmes menés à terme, remis à leurs propriétaires et occupants : la preuve concrète de notre expertise en promotion immobilière."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
        {delivered.length === 0 ? (
          <div className="border border-dashed border-border py-20 text-center">
            <p className="font-serif text-2xl">Aucun projet livré référencé pour le moment.</p>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-14 md:grid-cols-2">
            {delivered.map((project) => (
              <Link key={project.id} href={`/projets/${project.slug}`} className="group block overflow-hidden rounded-xl border border-border bg-card">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img src={project.images[0]} alt={project.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <Badge variant="graphite" className="absolute left-4 top-4">Livré</Badge>
                </div>
                <div className="p-6">
                  <h2 className="font-serif text-2xl transition-colors group-hover:text-primary">{project.name}</h2>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-3.5" /> {project.district}, {project.city}
                  </p>
                  <p className="mt-4 leading-6 text-muted-foreground">{project.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 border-t border-border pt-4 text-xs uppercase tracking-wider text-muted-foreground">
                    <span>{project.lots} lots livrés</span>
                    <span>Dès {formatFCFA(project.priceFrom)}</span>
                    <span>{project.deliveryDate}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
