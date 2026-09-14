'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import {
  Armchair,
  Bath,
  Bed,
  Building2,
  Calendar,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Images,
  Mail,
  MapPin,
  Maximize,
  MessageCircle,
  Phone,
  Rotate3d,
  Ruler,
  ShieldCheck,
  Sparkles,
  Trees,
  Video,
  X,
} from 'lucide-react'

import {
  getAgentById,
  getPropertyBySlug,
  hasVerifiedDocumentation,
  propertyPriceDisplay,
  similarProperties,
  type PropertyCategory,
} from '@/lib/data'
import { PropertyCard } from '@/components/site/property-card'
import { PropertyMap } from '@/components/site/property-map'
import { SectionHeading } from '@/components/site/section-heading'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const categoryLabels: Record<PropertyCategory, string> = {
  villa: 'Villa',
  maison: 'Maison',
  appartement: 'Appartement',
  terrain: 'Terrain',
  bureau: 'Bureau',
  commerce: 'Commerce',
  immeuble: 'Immeuble',
}

const featureGroups = [
  {
    label: 'Sécurité & foncier',
    icon: ShieldCheck,
    keywords: ['sécur', 'gardien', 'clôtur', 'titre foncier', 'certificat', 'attestation', 'lotissement'],
  },
  {
    label: 'Confort & intérieur',
    icon: Armchair,
    keywords: ['climat', 'cuisine', 'domotique', 'meublé', 'internet', 'jacuzzi', 'cave', 'balcon', 'ascenseur'],
  },
  {
    label: 'Extérieur & loisirs',
    icon: Trees,
    keywords: ['piscine', 'jardin', 'ponton', 'vue', 'aire de jeux', 'espaces verts', 'plage', 'terrasse'],
  },
  {
    label: 'Stationnement & équipements',
    icon: Car,
    keywords: ['parking', 'groupe électrogène', 'fibre', 'réserve', 'salle de réunion', 'vitrine'],
  },
] as const

interface FeatureGroup {
  label: string
  icon: typeof Sparkles
  items: string[]
}

function groupFeatures(features: string[]): FeatureGroup[] {
  const groups: FeatureGroup[] = featureGroups.map((g) => ({ label: g.label, icon: g.icon, items: [] }))
  const other: string[] = []
  for (const feature of features) {
    const lower = feature.toLowerCase()
    const match = featureGroups.find((g) => g.keywords.some((k) => lower.includes(k)))
    if (match) groups.find((g) => g.label === match.label)!.items.push(feature)
    else other.push(feature)
  }
  const result = groups.filter((g) => g.items.length > 0)
  if (other.length > 0) result.push({ label: 'Autres équipements', icon: Sparkles, items: other })
  return result
}

const navAnchors = [
  { id: 'apercu', label: 'Aperçu' },
  { id: 'caracteristiques', label: 'Caractéristiques' },
  { id: 'localisation', label: 'Localisation' },
  { id: 'documents', label: 'Documents' },
]

export default function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const property = getPropertyBySlug(slug)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!property) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-32 text-center lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Erreur 404</p>
        <h1 className="font-serif text-4xl">Bien introuvable</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Ce bien n’existe plus ou a été retiré de la vente. Découvrez notre catalogue actualisé.
        </p>
        <Link href="/biens" className="mt-4 rounded-lg bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
          Retour au catalogue
        </Link>
      </div>
    )
  }

  const agent = getAgentById(property.agentId)
  const similar = similarProperties(property, 3)
  const images = property.images
  const grouped = groupFeatures(property.features)
  const hasDocs = property.documents.length > 0

  const infoItems = [
    { icon: Maximize, label: 'Superficie', value: `${property.surface} m²` },
    property.landSurface ? { icon: Ruler, label: 'Terrain', value: `${property.landSurface} m²` } : null,
    property.bedrooms ? { icon: Bed, label: 'Chambres', value: `${property.bedrooms}` } : null,
    property.bathrooms ? { icon: Bath, label: 'Salles de bain', value: `${property.bathrooms}` } : null,
    property.parkings ? { icon: Car, label: 'Parkings', value: `${property.parkings}` } : null,
    property.yearBuilt ? { icon: Calendar, label: 'Année', value: `${property.yearBuilt}` } : null,
  ].filter(Boolean) as { icon: typeof Maximize; label: string; value: string }[]

  const openLightbox = (i: number) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const nextImage = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length))
  const prevImage = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))

  return (
    <div>
      {/* MOSAIQUE PHOTO */}
      <section className="mx-auto max-w-7xl px-5 pt-6 lg:px-10 lg:pt-8">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl sm:gap-3" style={{ aspectRatio: '16 / 8' }}>
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="group relative col-span-4 row-span-2 overflow-hidden rounded-xl bg-muted sm:col-span-2"
          >
            <img src={images[0]} alt={property.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </button>
          {images.slice(1, 5).map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => openLightbox(i + 1)}
              className="group relative hidden overflow-hidden rounded-xl bg-muted sm:block"
            >
              <img src={img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              {i === 3 && images.length > 5 && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-semibold text-white">
                  +{images.length - 5} photos
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <Badge>{property.transaction === 'vente' ? 'À vendre' : 'À louer'}</Badge>
            {property.badges.map((b) => (
              <Badge key={b} variant="graphite">
                {b}
              </Badge>
            ))}
            {hasVerifiedDocumentation(property) && (
              <Badge variant="white">
                <ShieldCheck className="size-3 text-primary" /> Dossier vérifié
              </Badge>
            )}
            {property.virtualTourUrl && (
              <Badge variant="white">
                <Rotate3d className="size-3 text-primary" /> Visite 360°
              </Badge>
            )}
          </div>
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-primary hover:text-primary"
          >
            <Images className="size-4" /> Voir les {images.length} photos
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-10 lg:py-16">
        <div className="grid gap-14 lg:grid-cols-[1.7fr_1fr]">
          {/* CONTENU PRINCIPAL */}
          <div>
            <div id="apercu" className="scroll-mt-28 border-b border-border pb-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
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

              {/* QUICK NAV */}
              <div className="mt-6 flex flex-wrap gap-2">
                {navAnchors.map((a) => (
                  <a
                    key={a.id}
                    href={`#${a.id}`}
                    className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {a.label}
                  </a>
                ))}
              </div>
            </div>

            {/* INFO GRID */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {infoItems.map((item) => (
                <div key={item.label} className="flex flex-col items-start gap-2 rounded-xl border border-border bg-card p-4">
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

            {/* CARACTERISTIQUES GROUPEES */}
            {grouped.length > 0 && (
              <div id="caracteristiques" className="mt-12 scroll-mt-28">
                <h2 className="font-serif text-2xl">Caractéristiques & équipements</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {grouped.map((group) => (
                    <div key={group.label} className="rounded-xl border border-border bg-card p-5">
                      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                        <group.icon className="size-4" /> {group.label}
                      </p>
                      <div className="flex flex-col gap-2">
                        {group.items.map((feature) => (
                          <p key={feature} className="flex items-center gap-2.5 text-sm">
                            <Check className="size-4 shrink-0 text-primary" /> {feature}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LOCALISATION */}
            <div id="localisation" className="mt-12 scroll-mt-28">
              <h2 className="font-serif text-2xl">Localisation</h2>
              <div className="mt-5 overflow-hidden rounded-xl border border-border">
                <PropertyMap
                  pins={[
                    {
                      id: property.id,
                      lat: property.coordinates.lat,
                      lng: property.coordinates.lng,
                      title: property.title,
                      subtitle: `${property.district}, ${property.city}`,
                      price: propertyPriceDisplay(property),
                      href: `/biens/${property.slug}`,
                      kind: 'property',
                      badge: property.transaction === 'vente' ? 'À vendre' : 'À louer',
                    },
                  ]}
                  height="320px"
                  zoom={15}
                  className="rounded-none border-0"
                />
                <div className="flex flex-col justify-between gap-5 bg-card p-6 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-serif text-lg">{property.address}</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                      Coordonnées : {property.coordinates.lat.toFixed(4)}, {property.coordinates.lng.toFixed(4)}
                    </p>
                  </div>
                  <Link
                    href="/carte"
                    className="shrink-0 rounded-lg border border-foreground/20 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider transition-colors hover:border-primary hover:text-primary"
                  >
                    Voir sur la carte
                  </Link>
                </div>
              </div>
            </div>

            {/* VIDEO */}
            {property.videoUrl && (
              <div className="mt-12">
                <h2 className="flex items-center gap-2 font-serif text-2xl">
                  <Video className="size-5 text-primary" /> Vidéo de présentation
                </h2>
                <div className="mt-5 aspect-video overflow-hidden rounded-xl bg-muted">
                  <iframe src={property.videoUrl} title={`Vidéo — ${property.title}`} className="h-full w-full" allowFullScreen />
                </div>
              </div>
            )}

            {/* VISITE VIRTUELLE */}
            {property.virtualTourUrl && (
              <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-xl bg-graphite p-8 text-white sm:flex-row sm:items-center">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Immersion 360°</p>
                  <h3 className="font-serif text-2xl">Visite virtuelle 360°</h3>
                  <p className="mt-2 max-w-md text-sm text-white/70">Explorez chaque pièce du bien comme si vous y étiez, directement depuis chez vous.</p>
                </div>
                <Link
                  href={`/biens/${property.slug}/visite`}
                  className="shrink-0 rounded-lg bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Démarrer la visite
                </Link>
              </div>
            )}

            {/* DOCUMENTS */}
            {hasDocs && (
              <div id="documents" className="mt-12 scroll-mt-28">
                <h2 className="flex items-center gap-2 font-serif text-2xl">
                  Documents disponibles
                  {hasVerifiedDocumentation(property) && (
                    <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary">
                      <ShieldCheck className="size-4" /> Dossier vérifié
                    </span>
                  )}
                </h2>
                <div className="mt-5 flex flex-col gap-2.5">
                  {property.documents.map((doc) => (
                    <div key={doc.label} className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4">
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
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {property.transaction === 'vente' ? 'Prix de vente' : 'Loyer'}
              </p>
              <p className="mt-2 font-serif text-3xl text-primary">{propertyPriceDisplay(property)}</p>
              <div className="mt-5 flex flex-col gap-2.5">
                <Link
                  href={`/visite/${property.slug}`}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Calendar className="size-4" /> Prendre rendez-vous
                </Link>
                <Link
                  href={`/biens/${property.slug}/contact`}
                  className="flex items-center justify-center gap-2 rounded-lg border border-foreground/20 px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider transition-colors hover:border-primary hover:text-primary"
                >
                  Demander une information
                </Link>
                <a
                  href={`https://wa.me/2250700000000?text=${encodeURIComponent(`Bonjour, je suis intéressé(e) par « ${property.title} »`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
                >
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
              </div>
            </div>

            {agent && (
              <div className="rounded-xl border border-border bg-card p-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact de l’annonce</p>
                <div className="flex items-center gap-4">
                  <img src={agent.photo} alt={agent.name} className="size-16 shrink-0 rounded-full object-cover" />
                  <div>
                    <p className="font-serif text-lg leading-tight">{agent.name}</p>
                    <p className="text-xs text-muted-foreground">{agent.role}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-2.5">
                  <a
                    href={`tel:${agent.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2.5 rounded-lg bg-graphite px-4 py-3 text-xs font-semibold uppercase tracking-wider text-graphite-foreground transition-colors hover:bg-graphite/90"
                  >
                    <Phone className="size-3.5" /> {agent.phone}
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center gap-2.5 rounded-lg border border-foreground/20 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-primary hover:text-primary"
                  >
                    <Mail className="size-3.5" /> Envoyer un message
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/50 p-5 text-xs leading-5 text-muted-foreground">
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

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex flex-col bg-graphite/98 text-white">
          <div className="flex items-center justify-between px-5 py-5 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
              {lightboxIndex + 1} / {images.length}
            </p>
            <button type="button" onClick={closeLightbox} aria-label="Fermer" className="flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <X className="size-5" />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4 pb-4">
            <img src={images[lightboxIndex]} alt={property.title} className="max-h-full max-w-full rounded-xl object-contain" />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Image précédente"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="Image suivante"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto px-5 pb-6 lg:px-10">
              {images.map((img, i) => (
                <button
                  key={img + i}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className={cn(
                    'aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors',
                    i === lightboxIndex ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100',
                  )}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
