import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

import { articles, formatDate } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'Guide de l’investisseur — Akwaba Immobilier',
  description: 'Foncier, résidentiel, rendement locatif, financement, fiscalité : le guide complet pour investir sereinement en Côte d’Ivoire.',
}

const guideTopics: { title: string; description: string; articleSlug?: string }[] = [
  {
    title: 'Investir dans le foncier',
    description: 'Comment choisir un terrain sécurisé, vérifier ses documents et anticiper sa valorisation dans les zones en développement.',
    articleSlug: 'guide-achat-terrain-cote-ivoire',
  },
  {
    title: 'Investir dans une résidence',
    description: 'Appartements, villas et programmes neufs : les critères pour choisir un bien résidentiel à fort potentiel locatif ou patrimonial.',
    articleSlug: 'investir-immobilier-locatif-abidjan',
  },
  {
    title: 'Comprendre le rendement locatif',
    description: 'La méthode simple pour calculer la rentabilité brute et nette d’un bien avant de vous engager.',
    articleSlug: 'rendement-locatif-comment-calculer',
  },
  {
    title: 'Les étapes d’une acquisition',
    description: 'De la sélection du bien à la signature notariée : le parcours type d’un investisseur accompagné par Akwaba Immobilier.',
  },
  {
    title: 'Précautions avant d’investir',
    description: 'Documents à exiger, visite obligatoire, vérification du vendeur : les réflexes essentiels pour sécuriser votre capital.',
  },
  {
    title: 'Financer son investissement',
    description: 'Apport personnel, crédit bancaire, partenaires financiers : les options pour structurer le financement de votre projet.',
  },
  {
    title: 'Fiscalité immobilière',
    description: 'Un panorama des taxes et droits applicables à l’acquisition et à la détention d’un bien en Côte d’Ivoire.',
    articleSlug: 'fiscalite-immobiliere-guide',
  },
]

export default function GuidePage() {
  return (
    <>
      <section className="relative flex min-h-[380px] items-end overflow-hidden bg-graphite pb-14 pt-36 lg:min-h-[440px]">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=90"
          alt="Guide de l'investisseur immobilier"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            <BookOpen className="size-3.5" /> Guide de l’investisseur
          </p>
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl">
            Investir sereinement, étape par étape.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75">
            Sept dossiers pour comprendre les fondamentaux de l’investissement immobilier en Côte d’Ivoire, du choix
            du terrain à la fiscalité applicable.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Sept thématiques" title="Le guide de l’investisseur Akwaba." />
        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {guideTopics.map((topic, i) => {
            const article = topic.articleSlug ? articles.find((a) => a.slug === topic.articleSlug) : undefined
            const content = (
              <>
                <div>
                  <p className="text-sm text-muted-foreground">0{i + 1}</p>
                  <h3 className="mt-4 font-serif text-xl leading-snug transition-colors group-hover:text-primary">{topic.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{topic.description}</p>
                </div>
                {article ? (
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <Badge variant="outline">{article.category}</Badge>
                    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                      Lire l’article <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                ) : (
                  <p className="mt-6 border-t border-border pt-4 text-xs uppercase tracking-wider text-muted-foreground">
                    Article à venir
                  </p>
                )}
              </>
            )
            return (
              <Reveal key={topic.title} delay={i * 70}>
                {article ? (
                  <Link href={`/magazine/${article.slug}`} className="group flex h-full flex-col justify-between border border-border p-7 transition-colors hover:border-primary">
                    {content}
                  </Link>
                ) : (
                  <div className="group flex h-full flex-col justify-between border border-border p-7">{content}</div>
                )}
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="bg-graphite text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Prêt à passer à l’étape suivante ?</h2>
            <p className="mt-5 leading-7 text-white/70">Simulez votre investissement ou parcourez nos opportunités du moment.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/investir/simulateur" className="bg-primary px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-primary-foreground">
              Simuler mon investissement
            </Link>
            <Link href="/investir/opportunites" className="border border-white/30 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-white">
              Voir les opportunités
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
