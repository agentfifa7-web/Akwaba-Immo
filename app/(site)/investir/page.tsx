import Link from 'next/link'
import { ArrowRight, Building2, Calculator, Landmark, MapPinned, Shield, TrendingUp } from 'lucide-react'

import { formatFCFA, projects, properties } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'Investir — Akwaba Immobilier',
  description: 'Transformez votre capital en patrimoine : terrains, immobilier locatif, programmes et projets d’investissement en Côte d’Ivoire.',
}

const whyInvest = [
  {
    icon: TrendingUp,
    title: 'Un marché en croissance',
    description: 'Portée par une démographie dynamique et une urbanisation soutenue, la demande immobilière ivoirienne reste structurellement forte, à Abidjan comme dans les villes secondaires.',
  },
  {
    icon: Shield,
    title: 'Des opportunités sécurisées',
    description: 'Chaque terrain et chaque programme proposé fait l’objet d’une vérification documentaire par notre pôle foncier et juridique avant sa mise en marché.',
  },
  {
    icon: MapPinned,
    title: 'Un accompagnement à distance',
    description: 'Visites virtuelles, suivi digitalisé, procuration : une large part de nos investisseurs pilotent leur projet depuis l’étranger.',
  },
  {
    icon: Landmark,
    title: 'Un partenaire unique',
    description: 'Foncier, construction, gestion locative et revente : nous vous accompagnons sur l’ensemble du cycle de vie de votre investissement.',
  },
]

const opportunityTypes = [
  {
    id: 'terrain',
    title: 'Terrain',
    tag: 'Foncier',
    description: 'La base de tout patrimoine : des parcelles loties, sécurisées et bien situées, avec un fort potentiel de plus-value.',
    indicative: 'Plus-value indicative : 5-8 %/an',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85',
    example: properties.find((p) => p.category === 'terrain'),
  },
  {
    id: 'locatif',
    title: 'Immobilier locatif',
    tag: 'Rendement',
    description: 'Appartements, villas meublées et immeubles de rapport : générez un revenu locatif régulier dans les quartiers à forte demande.',
    indicative: 'Rendement locatif estimé : 6-9 %/an',
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=85',
    example: properties.find((p) => p.id === 'p10'),
  },
  {
    id: 'programme',
    title: 'Programme immobilier',
    tag: 'Sur plan',
    description: 'Investissez dès la phase de commercialisation dans nos résidences et lotissements, avec des prix d’appel avantageux.',
    indicative: 'Plus-value à la livraison : 10-15 %',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    example: projects.find((p) => p.status === 'en_commercialisation'),
  },
  {
    id: 'projet',
    title: 'Projet d’investissement',
    tag: 'Structuré',
    description: 'Participez à des projets d’envergure — résidences, lotissements balnéaires — pensés pour l’investisseur exigeant.',
    indicative: 'Horizon recommandé : 5 ans et plus',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=85',
    example: projects.find((p) => p.status === 'a_venir'),
  },
]

export default function InvestirPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[560px] items-end overflow-hidden bg-graphite pb-16 pt-40 lg:min-h-[640px]">
        <img
          src="https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=2400&q=90"
          alt="Investissement immobilier en Côte d'Ivoire"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Construire son patrimoine</p>
          <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Transformez votre capital en patrimoine.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 lg:text-lg">
            Terrains, immobilier locatif, programmes neufs et projets structurés : nous identifions avec vous
            l’opportunité d’investissement qui correspond à vos objectifs et à votre horizon de temps.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/investir/opportunites" className="bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
              Voir les opportunités
            </Link>
            <Link href="/investir/simulateur" className="border border-white/30 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:border-primary hover:bg-primary">
              Simuler mon investissement
            </Link>
          </div>
        </div>
      </section>

      {/* POURQUOI INVESTIR */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Pourquoi investir avec nous" title="Un marché solide, un accompagnement complet." />
        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {whyInvest.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <item.icon className="size-7 text-primary" />
              <h3 className="mt-5 font-serif text-xl leading-snug">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TYPES D'OPPORTUNITES */}
      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Quatre voies d’investissement" title="Quel type d’opportunité vous correspond ?" />
            <Link href="/investir/opportunites" className="text-sm font-semibold uppercase tracking-wider underline decoration-primary underline-offset-8">
              Toutes les opportunités
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {opportunityTypes.map((type, i) => (
              <Reveal key={type.id} delay={i * 80}>
                <Link href={`/investir/opportunites#${type.id}`} className="group block h-full overflow-hidden rounded-xl bg-card">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img src={type.image} alt={type.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <Badge className="absolute left-4 top-4">{type.tag}</Badge>
                  </div>
                  <div className="border border-t-0 border-border p-6">
                    <h3 className="font-serif text-xl transition-colors group-hover:text-primary">{type.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{type.description}</p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">{type.indicative}</p>
                    {type.example && (
                      <p className="mt-3 text-xs text-muted-foreground">
                        Ex. {'title' in type.example ? type.example.title : type.example.name} —{' '}
                        {formatFCFA('price' in type.example ? type.example.price : type.example.priceFrom)}
                      </p>
                    )}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-xs leading-5 text-muted-foreground">
            Les indications de rendement ou de plus-value ci-dessus sont fournies à titre illustratif et ne constituent
            pas une garantie. Consultez notre simulateur et nos conseillers pour une étude personnalisée.
          </p>
        </div>
      </section>

      {/* CTA ROW */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Passez à l’action" title="Trois outils pour construire votre projet." align="center" className="mx-auto" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Link href="/investir/opportunites" className="group flex flex-col justify-between border border-border p-8 transition-colors hover:border-primary">
            <div>
              <Building2 className="size-7 text-primary" />
              <h3 className="mt-5 font-serif text-xl">Les opportunités</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Parcourez notre sélection de terrains, biens locatifs et programmes ouverts à l’investissement.
              </p>
            </div>
            <span className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              Découvrir <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          <Link href="/investir/simulateur" className="group flex flex-col justify-between border border-border p-8 transition-colors hover:border-primary">
            <div>
              <Calculator className="size-7 text-primary" />
              <h3 className="mt-5 font-serif text-xl">Le simulateur</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Estimez, en quelques clics, la valorisation indicative de votre investissement selon votre capital et votre durée.
              </p>
            </div>
            <span className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              Simuler <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          <Link href="/investir/guide" className="group flex flex-col justify-between border border-border p-8 transition-colors hover:border-primary">
            <div>
              <Shield className="size-7 text-primary" />
              <h3 className="mt-5 font-serif text-xl">Le guide investisseur</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Foncier, résidentiel, fiscalité, financement : tout ce qu’il faut savoir avant de vous lancer.
              </p>
            </div>
            <span className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              Consulter <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-graphite text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Un projet d’investissement en tête ?</h2>
            <p className="mt-5 leading-7 text-white/70">
              Nos conseillers étudient avec vous votre capital, votre horizon et vos objectifs pour construire une
              stratégie sur mesure.
            </p>
          </div>
          <Link href="/contact" className="bg-primary px-8 py-5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
            Parler à un conseiller
          </Link>
        </div>
      </section>
    </>
  )
}
