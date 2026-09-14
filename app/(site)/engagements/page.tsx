import Link from 'next/link'
import { Eye, HandHeart, Leaf, ScrollText, ShieldCheck, Smile, Wrench } from 'lucide-react'

import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'

export const metadata = {
  title: 'Nos engagements — Akwaba Immobilier',
  description: 'Transparence, qualité, accompagnement, conformité, satisfaction client, développement durable, responsabilité sociale : nos engagements chez Akwaba Immobilier.',
}

const engagements = [
  {
    icon: Eye,
    title: 'Transparence',
    text: 'Prix, frais, délais, statut documentaire : nous communiquons toutes les informations utiles à votre décision, sans zone d’ombre. Aucune commission cachée, aucun montage flou.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=85',
  },
  {
    icon: ShieldCheck,
    title: 'Qualité',
    text: 'Chaque bien, chaque programme, chaque contrat fait l’objet d’un contrôle rigoureux. Nos équipes techniques et juridiques valident chaque étape avant qu’elle ne vous soit proposée.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
  },
  {
    icon: HandHeart,
    title: 'Accompagnement',
    text: 'Un conseiller dédié vous suit de bout en bout, de la première prise de contact jusqu’à la remise des clés — et au-delà, pour la gestion de votre patrimoine.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=85',
  },
  {
    icon: ScrollText,
    title: 'Conformité',
    text: 'Nos transactions respectent scrupuleusement la réglementation foncière et immobilière ivoirienne. Notre pôle juridique veille à la conformité de chaque dossier.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=85',
  },
  {
    icon: Smile,
    title: 'Satisfaction client',
    text: 'Nous mesurons la satisfaction de nos clients à chaque étape et ajustons continuellement nos pratiques pour offrir une expérience irréprochable.',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=1400&q=85',
  },
  {
    icon: Leaf,
    title: 'Développement durable',
    text: 'Nos programmes intègrent des principes d’aménagement responsable : espaces verts préservés, gestion raisonnée de l’eau et matériaux durables lorsque cela est possible.',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85',
  },
  {
    icon: Wrench,
    title: 'Responsabilité sociale',
    text: 'Nous privilégions l’emploi local sur nos chantiers, soutenons la formation de jeunes artisans et contribuons au développement économique des zones où nous opérons.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=85',
  },
]

export default function EngagementsPage() {
  return (
    <>
      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-graphite pb-14 pt-40 lg:min-h-[480px]">
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2400&q=90"
          alt="Engagements Akwaba Immobilier"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Une exigence que nous tenons</p>
          <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl">
            Nos engagements.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 lg:text-lg">
            Sept engagements qui guident chacune de nos actions, du premier rendez-vous à la remise des clés — et
            au-delà.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="space-y-16 lg:space-y-24">
          {engagements.map((e, i) => {
            const reverse = i % 2 === 1
            return (
              <div key={e.title} className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <Reveal>
                  <div className="aspect-[16/10] overflow-hidden rounded-xl bg-muted">
                    <img src={e.image} alt={e.title} className="h-full w-full object-cover" />
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <e.icon className="size-8 text-primary" />
                  <h2 className="mt-5 font-serif text-3xl leading-tight sm:text-4xl">{e.title}</h2>
                  <p className="mt-5 max-w-lg leading-7 text-muted-foreground">{e.text}</p>
                </Reveal>
              </div>
            )
          })}
        </div>
      </section>

      <section className="bg-graphite text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Des engagements, pas des promesses.</h2>
            <p className="mt-5 leading-7 text-white/70">
              Découvrez comment nous les appliquons au quotidien, à travers nos équipes et nos réalisations.
            </p>
          </div>
          <Link href="/a-propos" className="rounded-lg bg-primary px-8 py-5 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0">
            Découvrir Akwaba Immobilier
          </Link>
        </div>
      </section>
    </>
  )
}
