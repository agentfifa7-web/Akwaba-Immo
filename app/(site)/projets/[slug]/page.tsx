'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Calendar, Check, ChevronLeft, ChevronRight, Download, Layers, MapPin } from 'lucide-react'

import { formatFCFA, getProjectBySlug, type ProgramStatus } from '@/lib/data'
import { PropertyMap } from '@/components/site/property-map'
import { Badge } from '@/components/ui/badge'

const statusLabels: Record<ProgramStatus, string> = {
  en_commercialisation: 'En commercialisation',
  en_construction: 'En construction',
  a_venir: 'À venir',
  livre: 'Livré',
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProjectBySlug(slug)
  const [activeImage, setActiveImage] = useState(0)

  if (!project) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-32 text-center lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Erreur 404</p>
        <h1 className="font-serif text-4xl">Projet introuvable</h1>
        <p className="max-w-md text-sm text-muted-foreground">Ce programme n’existe plus ou n’est plus accessible.</p>
        <Link href="/projets" className="mt-4 rounded-lg bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0">
          Retour aux projets
        </Link>
      </div>
    )
  }

  const images = project.images
  const soldPercent = Math.round(((project.lots - project.availableLots) / project.lots) * 100)

  return (
    <div>
      {/* HERO */}
      <section className="relative flex min-h-[480px] items-end overflow-hidden bg-graphite pb-14 pt-32">
        <img src={images[0]} alt={project.name} className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <Badge>{statusLabels[project.status]}</Badge>
          <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-[1.02] text-white sm:text-6xl">{project.name}</h1>
          <p className="mt-4 flex items-center gap-1.5 text-sm text-white/75">
            <MapPin className="size-4" /> {project.district}, {project.city}
          </p>
          <p className="mt-4 max-w-xl leading-7 text-white/80">{project.summary}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.7fr_1fr]">
          <div>
            {/* GALERIE */}
            {images.length > 1 && (
              <div>
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
                  <img src={images[activeImage]} alt={project.name} className="h-full w-full object-cover" />
                  <button
                    aria-label="Image précédente"
                    onClick={() => setActiveImage((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center bg-white/90 text-foreground transition-colors hover:bg-white"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    aria-label="Image suivante"
                    onClick={() => setActiveImage((i) => (i + 1) % images.length)}
                    className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center bg-white/90 text-foreground transition-colors hover:bg-white"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
                  {images.map((img, i) => (
                    <button
                      key={img + i}
                      onClick={() => setActiveImage(i)}
                      className={`aspect-[4/3] overflow-hidden rounded-lg border-2 transition-colors ${i === activeImage ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PRESENTATION */}
            <div className="mt-12">
              <h2 className="font-serif text-2xl">Présentation & concept</h2>
              <p className="mt-4 leading-7 text-muted-foreground">{project.description}</p>
            </div>

            {/* INFORMATIONS */}
            <div className="mt-12 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
              {[
                { label: 'Lots au total', value: `${project.lots}` },
                { label: 'Lots disponibles', value: `${project.availableLots}` },
                { label: 'À partir de', value: formatFCFA(project.priceFrom) },
                { label: 'Superficie dès', value: `${project.surfaceFrom} m²` },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-2 bg-card p-4">
                  <p className="text-sm font-semibold">{item.value}</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>

            {/* EQUIPEMENTS */}
            {project.equipments.length > 0 && (
              <div className="mt-12">
                <h2 className="font-serif text-2xl">Équipements & prestations</h2>
                <div className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {project.equipments.map((eq) => (
                    <p key={eq} className="flex items-center gap-2.5 text-sm">
                      <Check className="size-4 shrink-0 text-primary" /> {eq}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* AVANCEMENT */}
            {project.progress.length > 0 && (
              <div className="mt-12">
                <h2 className="flex items-center gap-2 font-serif text-2xl">
                  <Layers className="size-5 text-primary" /> Avancement du chantier
                </h2>
                <div className="mt-6 flex flex-col gap-5">
                  {project.progress.map((step) => (
                    <div key={step.label}>
                      <div className="flex items-center justify-between text-sm">
                        <p className="font-medium">{step.label}</p>
                        <p className="font-semibold text-primary">{step.percent}%</p>
                      </div>
                      <div className="mt-2 h-2 w-full bg-secondary">
                        <div className="h-2 bg-primary transition-all" style={{ width: `${step.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CALENDRIER */}
            <div className="mt-12 flex items-center gap-4 rounded-xl border border-border bg-secondary/50 p-6">
              <Calendar className="size-6 shrink-0 text-primary" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Livraison prévisionnelle</p>
                <p className="font-serif text-xl">{project.deliveryDate}</p>
              </div>
            </div>

            {/* LOCALISATION */}
            <div className="mt-12">
              <h2 className="font-serif text-2xl">Localisation</h2>
              <PropertyMap
                pins={[
                  {
                    id: project.id,
                    lat: project.coordinates.lat,
                    lng: project.coordinates.lng,
                    title: project.name,
                    subtitle: `${project.district}, ${project.city}`,
                    price: `À partir de ${formatFCFA(project.priceFrom)}`,
                    href: `/projets/${project.slug}`,
                    kind: 'project',
                    badge: 'Programme',
                  },
                ]}
                height="320px"
                zoom={14}
                className="mt-5"
              />
            </div>

            {/* DOCUMENTS */}
            {project.documents.length > 0 && (
              <div className="mt-12">
                <h2 className="font-serif text-2xl">Documents</h2>
                <div className="mt-5 flex flex-col divide-y divide-border border-y border-border">
                  {project.documents.map((doc) => (
                    <div key={doc.label} className="flex items-center justify-between gap-4 py-4">
                      <p className="text-sm font-medium">{doc.label}</p>
                      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                        <Download className="size-3.5" /> {doc.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <div className="border border-border bg-card p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Commercialisation</p>
              <div className="flex items-center justify-between text-sm">
                <p>Lots vendus</p>
                <p className="font-semibold text-primary">{soldPercent}%</p>
              </div>
              <div className="mt-2 h-2 w-full bg-secondary">
                <div className="h-2 bg-primary" style={{ width: `${soldPercent}%` }} />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {project.availableLots} lot{project.availableLots > 1 ? 's' : ''} encore disponible{project.availableLots > 1 ? 's' : ''} sur {project.lots}
              </p>
            </div>

            <div className="flex flex-col gap-3 border border-border bg-card p-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact commercial</p>
              <Link href={`/visite/${project.slug}`} className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0">
                <Calendar className="size-4" /> Prendre rendez-vous
              </Link>
              <a
                href={`https://wa.me/2250700000000?text=${encodeURIComponent(`Bonjour, je souhaite des informations sur le programme « ${project.name} »`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-white shadow-sm shadow-[#25D366]/25 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-lg active:translate-y-0"
              >
                Contacter par WhatsApp
              </a>
              <Link href="/contact" className="flex items-center justify-center gap-2 rounded-lg border border-foreground/20 px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-sm">
                Parler à un conseiller
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
