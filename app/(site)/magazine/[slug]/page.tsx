'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Facebook, Linkedin, Twitter } from 'lucide-react'

import { articles, formatDate, getArticleBySlug } from '@/lib/data'
import { Badge } from '@/components/ui/badge'

export default function ArticlePage() {
  const params = useParams<{ slug: string }>()
  const slug = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : ''
  const article = getArticleBySlug(slug)

  if (!article) {
    return (
      <section className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-32 lg:px-10">
        <h1 className="font-serif text-3xl">Contenu introuvable</h1>
        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          Cet article n’existe pas ou a été déplacé. Découvrez plutôt l’ensemble de nos publications.
        </p>
        <Link href="/magazine" className="flex items-center gap-2 bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
          <ArrowLeft className="size-4" /> Retour au magazine
        </Link>
      </section>
    )
  }

  const related = articles
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => (a.category === article.category ? -1 : 0) - (b.category === article.category ? -1 : 0))
    .slice(0, 3)

  return (
    <>
      <section className="relative flex min-h-[440px] items-end overflow-hidden bg-graphite pb-14 pt-36 lg:min-h-[520px]">
        <img src={article.image} alt={article.title} className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/55 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-4xl px-5 lg:px-10">
          <Badge>{article.category}</Badge>
          <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 text-xs uppercase tracking-wider text-white/70">
            Par {article.author} · {formatDate(article.date)}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 lg:px-10 lg:py-20">
        <p className="font-serif text-xl leading-relaxed text-foreground">{article.excerpt}</p>
        <div className="mt-8 space-y-5">
          {article.content.map((paragraph, i) => (
            <p key={i} className="leading-7 text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        {/* SHARE */}
        <div className="mt-12 flex items-center gap-4 border-y border-border py-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Partager</span>
          <div className="flex gap-2">
            {[Facebook, Twitter, Linkedin].map((Icon, i) => (
              <button
                key={i}
                type="button"
                aria-label="Partager cet article"
                className="flex size-9 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/60">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
            <h2 className="font-serif text-3xl leading-tight">Articles associés</h2>
            <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-3">
              {related.map((a) => (
                <Link key={a.id} href={`/magazine/${a.slug}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img src={a.image} alt={a.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="py-5">
                    <Badge variant="outline">{a.category}</Badge>
                    <h3 className="mt-3 font-serif text-lg leading-snug transition-colors group-hover:text-primary">{a.title}</h3>
                    <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{formatDate(a.date)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
