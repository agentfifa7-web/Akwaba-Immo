import Link from 'next/link'
import { Calendar, Download, FileText, Mic, Newspaper } from 'lucide-react'

import { formatDate } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'Espace presse — Akwaba Immobilier',
  description: 'Communiqués de presse, interviews et actualités d’Akwaba Immobilier. Téléchargez notre dossier de presse.',
}

const communiques = [
  {
    id: 'cp1', title: 'Akwaba Immobilier lance Cité Atlantide, son plus grand programme résidentiel',
    date: '2026-09-10',
    excerpt: 'Le groupe annonce l’ouverture à la commercialisation de son programme phare de 180 lots à Bingerville, une étape majeure dans son développement en périphérie d’Abidjan.',
  },
  {
    id: 'cp2', title: 'Akwaba Immobilier franchit le cap des 3 400 clients accompagnés',
    date: '2026-08-15',
    excerpt: 'Un bilan qui confirme la dynamique de croissance de l’agence depuis sa création en 2011, portée par l’extension de son offre de services.',
  },
  {
    id: 'cp3', title: 'Ouverture d’une nouvelle agence à Grand-Bassam',
    date: '2026-06-02',
    excerpt: 'Le groupe renforce sa présence sur le littoral ivoirien avec l’ouverture d’une agence dédiée à l’offre balnéaire et à l’investissement locatif saisonnier.',
  },
  {
    id: 'cp4', title: 'Akwaba Immobilier lance son assistant intelligent Akwaba AI',
    date: '2026-03-20',
    excerpt: 'Une nouvelle expérience de recherche immobilière conversationnelle, pensée pour accompagner les acheteurs et investisseurs à distance.',
  },
  {
    id: 'cp5', title: 'Partenariat renforcé avec les principales banques de la place',
    date: '2026-01-14',
    excerpt: 'De nouveaux accords facilitant l’accès au financement immobilier pour les clients d’Akwaba Immobilier, en partenariat avec NSIA Banque et Ecobank Côte d’Ivoire.',
  },
]

const interviews = [
  { id: 'iv1', title: 'Aïcha Koffi : « L’immobilier ivoirien vit une transformation profonde »', outlet: 'Fraternité Matin', date: '2026-07-05' },
  { id: 'iv2', title: 'Yves Brou revient sur le chantier Andou-M’Batto', outlet: 'Radio Côte d’Ivoire', date: '2026-05-18' },
  { id: 'iv3', title: 'Comment sécuriser son achat foncier ? Fatou Diabaté répond', outlet: 'Le Patriote', date: '2026-02-27' },
]

export default function PressePage() {
  return (
    <>
      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-graphite pb-14 pt-40 lg:min-h-[480px]">
        <img
          src="https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=2400&q=90"
          alt="Espace presse Akwaba Immobilier"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Espace presse</p>
          <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl">
            Actualités presse d’Akwaba Immobilier.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 lg:text-lg">
            Communiqués, interviews et prises de parole de nos dirigeants dans les médias ivoiriens.
          </p>
        </div>
      </section>

      {/* DOSSIER DE PRESSE */}
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center bg-graphite text-graphite-foreground">
              <FileText className="size-5" />
            </span>
            <div>
              <p className="font-serif text-xl">Notre dossier de presse</p>
              <p className="text-sm text-muted-foreground">Chiffres clés, historique et visuels haute résolution.</p>
            </div>
          </div>
          <button
            type="button"
            disabled
            className="flex shrink-0 items-center gap-2 rounded-lg bg-graphite px-6 py-4 text-xs font-semibold uppercase tracking-wider text-graphite-foreground shadow-sm shadow-black/20 transition-all duration-200 opacity-60 hover:-translate-y-0.5 hover:bg-graphite/90 hover:shadow-lg hover:shadow-black/25 active:translate-y-0"
          >
            <Download className="size-4" /> Télécharger le dossier de presse (PDF)
          </button>
        </div>
      </section>

      {/* COMMUNIQUES */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Actualités" title="Communiqués de presse" />
        <div className="mt-12 space-y-6">
          {communiques.map((c, i) => (
            <Reveal key={c.id} delay={i * 50} className="border border-border bg-card p-7">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="outline">
                  <Newspaper className="mr-1 size-3" /> Communiqué
                </Badge>
                <p className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
                  <Calendar className="size-3.5" /> {formatDate(c.date)}
                </p>
              </div>
              <h3 className="mt-4 font-serif text-xl leading-snug">{c.title}</h3>
              <p className="mt-3 leading-6 text-muted-foreground">{c.excerpt}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INTERVIEWS */}
      <section className="border-t border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <SectionHeading eyebrow="Ils parlent de nous" title="Interviews & prises de parole" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {interviews.map((iv) => (
              <div key={iv.id} className="border border-border bg-card p-6">
                <Mic className="size-6 text-primary" />
                <h3 className="mt-4 font-serif text-lg leading-snug">{iv.title}</h3>
                <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
                  {iv.outlet} · {formatDate(iv.date)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENEMENTS TEASER */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
        <div className="flex flex-col items-start gap-8 border border-border bg-card p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">Retrouvez-nous lors de nos prochains événements</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Inaugurations, salons professionnels, conférences : suivez notre agenda d’événements.
            </p>
          </div>
          <Link href="/evenements" className="shrink-0 rounded-lg bg-primary px-7 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0">
            Voir nos événements
          </Link>
        </div>
      </section>

      {/* CONTACT PRESSE */}
      <section className="bg-graphite text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Vous êtes journaliste ?</h2>
            <p className="mt-5 leading-7 text-white/70">
              Contactez notre service communication pour toute demande d’interview, de visuel ou d’information.
            </p>
          </div>
          <a href="mailto:presse@akwaba-immobilier.ci" className="rounded-lg bg-primary px-8 py-5 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0">
            presse@akwaba-immobilier.ci
          </a>
        </div>
      </section>
    </>
  )
}
