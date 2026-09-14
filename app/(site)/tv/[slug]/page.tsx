'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Play } from 'lucide-react'

import { formatDate, getVideoBySlug, videos } from '@/lib/data'
import { Badge } from '@/components/ui/badge'

export default function VideoPage() {
  const params = useParams<{ slug: string }>()
  const slug = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : ''
  const video = getVideoBySlug(slug)

  if (!video) {
    return (
      <section className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-32 lg:px-10">
        <h1 className="font-serif text-3xl">Contenu introuvable</h1>
        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          Cette vidéo n’existe pas ou a été déplacée. Découvrez plutôt l’ensemble d’Akwaba TV.
        </p>
        <Link href="/tv" className="flex items-center gap-2 bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
          <ArrowLeft className="size-4" /> Retour à Akwaba TV
        </Link>
      </section>
    )
  }

  const related = videos
    .filter((v) => v.slug !== video.slug)
    .sort((a, b) => (a.category === video.category ? -1 : 0) - (b.category === video.category ? -1 : 0))
    .slice(0, 3)

  return (
    <>
      <section className="bg-graphite pt-28 pb-4 lg:pt-32">
        <div className="mx-auto max-w-5xl px-5 lg:px-10">
          <Link href="/tv" className="flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70 transition-colors hover:text-primary">
            <ArrowLeft className="size-3.5" /> Akwaba TV
          </Link>
        </div>
      </section>

      <section className="bg-graphite pb-14">
        <div className="mx-auto max-w-5xl px-5 lg:px-10">
          <div className="aspect-video w-full overflow-hidden bg-black">
            <iframe
              src={video.embedUrl}
              title={video.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14 lg:px-10 lg:py-16">
        <Badge>{video.category}</Badge>
        <h1 className="mt-5 font-serif text-3xl leading-tight sm:text-4xl">{video.title}</h1>
        <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{formatDate(video.date)}</p>
        <p className="mt-6 max-w-3xl leading-7 text-muted-foreground">{video.description}</p>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/60">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
            <h2 className="font-serif text-3xl leading-tight">Vidéos associées</h2>
            <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-3">
              {related.map((v) => (
                <Link key={v.id} href={`/tv/${v.slug}`} className="group block">
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
                    <img src={v.thumbnail} alt={v.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center bg-graphite/20 transition-colors group-hover:bg-graphite/35">
                      <span className="flex size-12 items-center justify-center rounded-full bg-white/90 text-graphite">
                        <Play className="ml-0.5 size-5 fill-current" />
                      </span>
                    </div>
                  </div>
                  <div className="py-5">
                    <Badge variant="outline">{v.category}</Badge>
                    <h3 className="mt-3 font-serif text-lg leading-snug transition-colors group-hover:text-primary">{v.title}</h3>
                    <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{formatDate(v.date)}</p>
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
