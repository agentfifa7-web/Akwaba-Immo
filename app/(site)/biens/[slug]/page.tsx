'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import {
  Bath,
  Bed,
  Building2,
  Calendar,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  MapPin,
  Maximize,
  MessageCircle,
  Ruler,
  Video,
} from 'lucide-react'

import {
  getAgentById,
  getPropertyBySlug,
  propertyPriceDisplay,
  similarProperties,
  type PropertyCategory,
} from '@/lib/data'
import { PropertyCard } from '@/components/site/property-card'
import { SectionHeading } from '@/components/site/section-heading'
import { Badge } from '@/components/ui/badge'

const categoryLabels: Record<PropertyCategory, string> = {
  villa: 'Villa',
  maison: 'Maison',
  appartement: 'Appartement',
  terrain: 'Terrain',
  bureau: 'Bureau',
  commerce: 'Commerce',
  immeuble: 'Immeuble',
}

export default function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const property = getPropertyBySlug(slug)
  const [activeImage, setActiveImage] = useState(0)

  if (!property) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-32 text-center lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Erreur 404</p>
        <h1 className="font-serif text-4xl">Bien introuvable</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Ce bien n’existe plus ou a été retiré de la vente. Découvrez notre catalogue actualisé.
        </p>
        <Link href="/biens" className="mt-4 bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
          Retour au catalogue
        </Link>
      </div>
    )
  }

  const agent = getAgentById(property.agentId)
  const similar = similarProperties(property, 3)
  const images = property.images

  const infoItems = [
    { icon: Maximize, label: 'Superficie', value: `${property.surface} m²` },
    property.landSurface ? { icon: Ruler, label: 'Terrain', value: `${property.landSurface} m²` } : null,
    property.bedrooms ? { icon: Bed, label: 'Chambres', value: `${property.bedrooms}` } : null,
    property.bathrooms ? { icon: Bath, label: 'Salles de bain', value: `${property.bathrooms}` } : null,
    property.parkings ? { icon: Car, label: 'Parkings', value: `${property.parkings}` } : null,
    property.yearBuilt ? { icon: Calendar, label: 'Année', value: `${property.yearBuilt}` } : null,
  ].filter(Boolean) as { icon: typeof Maximize; label: string; value: string }[]

  return (
    <div>
      {/* GALERIE */}
      <section className="bg-graphite">
        <div className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
            <img src={images[activeImage]} alt={property.title} className="h-full w-full object-cover" />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <Badge>{property.transaction === 'vente' ? 'À vendre' : 'À louer'}</Badge>
              {property.badges.map((b) => (
                <Badge key={b} variant="graphite">
                  {b}
                </Badge>
              ))}
            </div>
            {images.length > 1 && (
              <>
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
                <div className="absolute bottom-4 right-4 bg-black/60 px-3 py-1.5 text-xs font-semibold text-white">
                  {activeImage + 1} / {images.length}
                </div>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
              {images.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-[4/3] overflow-hidden border-2 transition-colors ${i === activeImage ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.7fr_1fr]">
          {/* CONTENU PRINCIPAL */}
          <div>
            <div className="flex flex-col justify-between gap-4 border-b border-border pb-8 sm:flex-row sm:items-end">
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  <MapPin className="size-3.5" /> {property.district}, {property.city}
                </p>
                <h1 className="font-serif text-3xl leading-tight sm:text-4xl">{property.title}</h1>
                <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                  {categoryLabels[property.category]} · {property.transaction === 'vente' ? 'À vendre' : 'À louer'}
                </p>
              </div>
              <p className="whitespace-nowrap font-serif text-3xl text-primary">{propertyPriceDisplay(property)}</p>
            </div>

            {/* INFO GRID */}
            <div className="mt-8 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
              {infoItems.map((item) => (
                <div key={item.label} className="flex flex-col items-start gap-2 bg-card p-4">
                  <item.icon className="size-4 text-primary" />
                  <p className="text-sm font-semibold">{item.value}</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>

            {/* DESCRIPTION */}
            <div className="mt-12">
              <h2 className="font-serif text-2xl">Description</h2>
              <p className="mt-4 leading-7 text-muted-foreground">{property.description}</p>
            </div>

            {/* CARACTERISTIQUES */}
            {property.features.length > 0 && (
              <div className="mt-12">
                <h2 className="font-serif text-2xl">Caractéristiques & équipements</h2>
                <div className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {property.features.map((feature) => (
                    <p key={feature} className="flex items-center gap-2.5 text-sm">
                      <Check className="size-4 shrink-0 text-primary" /> {feature}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* LOCALISATION */}
            <div className="mt-12">
              <h2 className="font-serif text-2xl">Localisation</h2>
              <div className="mt-5 flex flex-col justify-between gap-5 border border-border bg-secondary/50 p-6 sm:flex-row sm:items-center">
                <div>
                  <p className="flex items-center gap-2 font-serif text-lg">
                    <MapPin className="size-4 text-primary" /> {property.address}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    Coordonnées indicatives : {property.coordinates.lat.toFixed(4)}, {property.coordinates.lng.toFixed(4)}
                  </p>
                </div>
                <Link href="/carte" className="shrink-0 border border-foreground/20 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider transition-colors hover:border-primary hover:text-primary">
                  Voir sur la carte
                </Link>
              </div>
            </div>

            {/* VIDEO */}
            {property.videoUrl && (
              <div className="mt-12">
                <h2 className="flex items-center gap-2 font-serif text-2xl">
                  <Video className="size-5 text-primary" /> Vidéo de présentation
                </h2>
                <div className="mt-5 aspect-video overflow-hidden bg-muted">
                  <iframe src={property.videoUrl} title={`Vidéo — ${property.title}`} className="h-full w-full" allowFullScreen />
                </div>
              </div>
            )}

            {/* VISITE VIRTUELLE */}
            {property.virtualTourUrl && (
              <div className="mt-12 flex flex-col items-start justify-between gap-5 bg-graphite p-8 text-white sm:flex-row sm:items-center">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Immersion 360°</p>
                  <h3 className="font-serif text-2xl">Visite virtuelle 360°</h3>
                  <p className="mt-2 max-w-md text-sm text-white/70">Explorez chaque pièce du bien comme si vous y étiez, directement depuis chez vous.</p>
                </div>
                <Link href={`/biens/${property.slug}/visite`} className="shrink-0 bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
                  Démarrer la visite
                </Link>
              </div>
            )}

            {/* DOCUMENTS */}
            {property.documents.length > 0 && (
              <div className="mt-12">
                <h2 className="font-serif text-2xl">Documents</h2>
                <div className="mt-5 flex flex-col divide-y divide-border border-y border-border">
                  {property.documents.map((doc) => (
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
            {agent && (
              <div className="border border-border bg-card p-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Votre conseiller</p>
                <div className="flex items-center gap-4">
                  <img src={agent.photo} alt={agent.name} className="size-16 shrink-0 object-cover" />
                  <div>
                    <p className="font-serif text-lg leading-tight">{agent.name}</p>
                    <p className="text-xs text-muted-foreground">{agent.role}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-2.5">
                  <a href={`mailto:${agent.email}`} className="flex items-center gap-2.5 border border-foreground/20 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-primary hover:text-primary">
                    <Mail className="size-3.5" /> Contacter par e-mail
                  </a>
                  <a href="https://wa.me/2250700000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 bg-[#25D366] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90">
                    <MessageCircle className="size-3.5" /> WhatsApp
                  </a>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 border border-border bg-card p-6">
              <Link href={`/visite/${property.slug}`} className="flex items-center justify-center gap-2 bg-primary px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
                <Calendar className="size-4" /> Prendre rendez-vous
              </Link>
              <Link href={`/biens/${property.slug}/contact`} className="flex items-center justify-center gap-2 border border-foreground/20 px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider transition-colors hover:border-primary hover:text-primary">
                Demander une information
              </Link>
              <a
                href={`https://wa.me/2250700000000?text=${encodeURIComponent(`Bonjour, je suis intéressé(e) par « ${property.title} »`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-graphite px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-graphite-foreground transition-colors hover:bg-graphite/90"
              >
                <MessageCircle className="size-4" /> Contacter par WhatsApp
              </a>
            </div>

            <div className="flex items-start gap-3 border border-border bg-secondary/50 p-5 text-xs leading-5 text-muted-foreground">
              <Building2 className="size-4 shrink-0 text-primary" />
              Bien vérifié par notre équipe juridique et foncière. Nous recommandons une visite physique avant toute décision d’achat.
            </div>
          </div>
        </div>

        {/* BIENS SIMILAIRES */}
        {similar.length > 0 && (
          <div className="mt-20 border-t border-border pt-16">
            <SectionHeading eyebrow="Vous pourriez aussi aimer" title="Biens similaires" />
            <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
