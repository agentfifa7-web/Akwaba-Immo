import Link from 'next/link'
import { Calendar } from 'lucide-react'

import { projects, type ProgramStatus } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Badge } from '@/components/ui/badge'

const statusLabels: Record<ProgramStatus, string> = {
  en_commercialisation: 'En commercialisation',
  en_construction: 'En construction',
  a_venir: 'À venir',
  livre: 'Livré',
}

const tracked = projects.filter((p) => p.status !== 'a_venir')

export default function AvancementPage() {
  return (
    <div>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
          <SectionHeading
            eyebrow="Transparence chantier"
            title="Suivez l’avancement de nos programmes"
            description="Nos équipes techniques actualisent régulièrement l’état d’avancement et les photos de chantier de chaque programme en cours."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
        <div className="flex flex-col gap-16">
          {tracked.map((project) => (
            <div key={project.id} className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="grid gap-0 lg:grid-cols-[1fr_1.3fr]">
                <div className="grid grid-cols-2 gap-1 p-1">
                  {project.images.slice(0, 4).map((img, i) => (
                    <div key={img + i} className={`overflow-hidden rounded-lg bg-muted ${project.images.length === 1 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}>
                      <img src={img} alt={`Chantier ${project.name}`} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <Badge variant="outline">{statusLabels[project.status]}</Badge>
                      <h2 className="mt-3 font-serif text-2xl">
                        <Link href={`/projets/${project.slug}`} className="transition-colors hover:text-primary">
                          {project.name}
                        </Link>
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">{project.district}, {project.city}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                      <Calendar className="size-3.5" /> Livraison {project.deliveryDate}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-4">
                    {project.progress.map((step) => (
                      <div key={step.label}>
                        <div className="flex items-center justify-between text-sm">
                          <p className="font-medium">{step.label}</p>
                          <p className="font-mono text-xs font-semibold text-primary">{step.percent}%</p>
                        </div>
                        <div className="mt-2 h-2 w-full bg-secondary">
                          <div className="h-2 bg-primary transition-all" style={{ width: `${step.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="mt-6 text-xs leading-5 text-muted-foreground">
                    Photos de chantier régulièrement actualisées par notre pôle technique. Dernière mise à jour visible sur la fiche complète du programme.
                  </p>
                  <Link href={`/projets/${project.slug}`} className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-primary underline underline-offset-4">
                    Voir la fiche complète
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
