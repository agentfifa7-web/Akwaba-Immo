'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Heart, MapPin, MessageCircle, Play, Sparkles, Star } from 'lucide-react'

import {
  articles,
  boutiques,
  categories,
  communityPosts,
  courses,
  formatDate,
  formatFCFA,
  keyStats,
  liveSessions,
  lookTotal,
  looks,
  products,
  stylists,
  testimonials,
} from '@/lib/data'
import { ProductCard } from '@/components/site/product-card'
import { LookCard } from '@/components/site/look-card'
import { BoutiqueCard } from '@/components/site/boutique-card'
import { ProviderCard } from '@/components/site/provider-card'
import { CourseCard } from '@/components/site/course-card'
import { PostCard } from '@/components/site/post-card'
import { SectionHeading } from '@/components/site/section-heading'
import { StatCounter } from '@/components/site/stat-counter'
import { TestimonialCard } from '@/components/site/testimonial-card'
import { Reveal } from '@/components/site/reveal'
import { Badge } from '@/components/ui/badge'

const heroLooks = looks.filter((l) => l.featured)
const trendingLooks = [...looks].sort((a, b) => b.likes - a.likes).slice(0, 6)
const newArrivals = [...products].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 8)
const africanFashion = products.filter((p) => p.tags.includes('wax') || p.subcategory === 'Mode africaine' || p.subcategory === 'Mode traditionnelle').slice(0, 4)
const hairProducts = products.filter((p) => p.category === 'cheveux').slice(0, 4)
const featuredBoutiques = [...boutiques].sort((a, b) => b.rating - a.rating).slice(0, 4)
const popularStylists = [...stylists].filter((s) => s.badge).slice(0, 4)
const academyPicks = courses.slice(0, 3)
const communityPicks = communityPosts.slice(0, 4)
const liveNow = liveSessions.filter((l) => l.status === 'live')
const upcomingLive = liveSessions.filter((l) => l.status === 'a_venir').slice(0, 2)
const latestArticles = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3)

export default function HomePage() {
  const [activeLook, setActiveLook] = useState(0)
  const look = heroLooks[activeLook]

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[760px] items-end overflow-hidden bg-obsidian pb-16 pt-40 lg:min-h-[860px] lg:pb-24">
        <img
          key={look.id}
          src={look.cover}
          alt={look.title}
          className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-champagne">
              <Sparkles className="size-3.5" /> Discover. Try. Create. Shop.
            </p>
            <h1 className="font-serif text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-[5.2rem]">
              Votre beauté. Votre style. Votre univers.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/75 lg:text-lg">
              La première super-plateforme ivoirienne dédiée à la beauté, à la mode et au style : marketplace,
              essayage virtuel, stylistes, Beauty Academy et communauté — tout en un seul endroit.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/essayer" className="bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
                Essayer mon look
              </Link>
              <Link href="/shop" className="border border-white/30 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:border-accent hover:bg-accent">
                Explorer la boutique
              </Link>
              <Link href="/creer/look" className="border border-white/30 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:border-accent hover:bg-accent">
                Créer mon style
              </Link>
            </div>
          </div>

          {/* Look switcher interactif */}
          <div className="mt-12 max-w-2xl rounded-xl bg-white/95 p-4 shadow-2xl backdrop-blur">
            <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Changez de look en un clic
            </p>
            <div className="mt-3 flex items-center gap-3 overflow-x-auto px-1 pb-1">
              {heroLooks.map((l, i) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setActiveLook(i)}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-2 py-1.5 pr-4 text-xs font-medium transition-colors ${
                    i === activeLook ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:border-primary/40'
                  }`}
                >
                  <img src={l.cover} alt="" className="size-8 rounded-full object-cover" />
                  {l.title}
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-border px-1 pt-3">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{look.title}</span> · {formatFCFA(lookTotal(look))}
              </p>
              <Link href={`/looks/${look.slug}`} className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-accent">
                Shop this look <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <SectionHeading eyebrow="La marketplace KÔSMÉA" title="Achetez par univers" align="center" className="mx-auto" />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 80}>
              <Link href={`/shop/${cat.id}`} className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                <img src={cat.cover} alt={cat.label} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-serif text-2xl text-white">{cat.label}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-white/70">{cat.subcategories.length} sous-catégories</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VIRTUAL BEAUTY STUDIO CTA */}
      <section className="bg-plum text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-champagne">
              <Sparkles className="size-3.5" /> Fonctionnalité signature
            </p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Le Virtual Beauty Studio</h2>
            <p className="mt-5 leading-7 text-white/70">
              Créez votre avatar, essayez maquillage, coiffures et tenues, puis achetez instantanément tous les
              produits de votre look. Une simulation indicative, toujours annoncée comme telle.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/essayer/avatar" className="bg-champagne px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-champagne-foreground">
              Créer mon avatar
            </Link>
            <Link href="/essayer" className="border border-white/30 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10">
              Découvrir le Try-On Hub
            </Link>
          </div>
        </div>
      </section>

      {/* TRENDING LOOKS */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Ce que la communauté aime" title="Looks tendance" />
          <Link href="/creer/look" className="text-sm font-semibold uppercase tracking-wider underline decoration-accent underline-offset-8">
            Créer mon propre look
          </Link>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {trendingLooks.map((l, i) => (
            <Reveal key={l.id} delay={i * 70}>
              <LookCard look={l} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* AI STYLIST TEASER */}
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-between gap-8 border border-border bg-card p-8 lg:p-10">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">Nouveautés</p>
            <h3 className="font-serif text-3xl leading-tight">Fraîchement arrivé sur la marketplace.</h3>
            <p className="mt-4 leading-7 text-muted-foreground">
              Découvrez les dernières pépites de nos boutiques partenaires, du maquillage aux créations wax en
              passant par les lace wigs premium.
            </p>
          </div>
          <Link href="/shop?tri=nouveautes" className="flex w-fit items-center gap-2 bg-obsidian px-6 py-4 text-xs font-semibold uppercase tracking-wider text-obsidian-foreground transition-colors hover:bg-obsidian/90">
            Voir les nouveautés <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="flex flex-col justify-between gap-8 border border-border bg-obsidian p-8 text-white lg:p-10">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-champagne">
              <Sparkles className="size-3.5" /> KÔSMÉA AI
            </p>
            <h3 className="font-serif text-3xl leading-tight">Quel look pour votre prochaine occasion ?</h3>
            <p className="mt-4 leading-7 text-white/70">
              « Je vais à un mariage samedi, budget 100 000 FCFA. » Notre assistant compose un look complet à partir
              des produits réellement disponibles sur la marketplace.
            </p>
          </div>
          <Link href="/assistant" className="flex w-fit items-center gap-2 bg-champagne px-6 py-4 text-xs font-semibold uppercase tracking-wider text-champagne-foreground transition-colors hover:bg-champagne/90">
            Discuter avec KÔSMÉA AI <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Fraîchement arrivés" title="Nouveautés de la semaine" />
          <Link href="/shop" className="text-sm font-semibold uppercase tracking-wider underline decoration-accent underline-offset-8">
            Voir tout le shop
          </Link>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* AFRICAN DESIGNERS */}
      <section className="bg-obsidian text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="L’ADN ivoirien" title="Créateurs et mode africaine" light description="Wax, pagne, styles africains contemporains : des créateurs ivoiriens qui réinventent la mode." />
            <Link href="/shop/mode?filtre=africaine" className="text-sm font-semibold uppercase tracking-wider text-white underline decoration-accent underline-offset-8">
              Découvrir la mode africaine
            </Link>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {africanFashion.map((p) => (
              <div key={p.id} className="[&_.text-muted-foreground]:text-white/60 [&_h3]:text-white">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HAIR & WIGS */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Cheveux & perruques" title="Sublimez votre texture" />
          <Link href="/shop/cheveux" className="text-sm font-semibold uppercase tracking-wider underline decoration-accent underline-offset-8">
            Explorer la catégorie cheveux
          </Link>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {hairProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* FEATURED BOUTIQUES */}
      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Nos vendeurs" title="Boutiques à la une" />
            <Link href="/boutiques" className="text-sm font-semibold uppercase tracking-wider underline decoration-accent underline-offset-8">
              Toutes les boutiques
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredBoutiques.map((b) => (
              <BoutiqueCard key={b.id} boutique={b} />
            ))}
          </div>
        </div>
      </section>

      {/* STYLISTS */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Marketplace stylistes" title="Nos stylistes les plus demandés" />
          <Link href="/stylistes" className="text-sm font-semibold uppercase tracking-wider underline decoration-accent underline-offset-8">
            Voir tous les stylistes
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularStylists.map((s) => (
            <ProviderCard
              key={s.id}
              href={`/stylistes/${s.slug}`}
              photo={s.photo}
              name={s.name}
              subtitle={s.specialties[0]}
              city={s.city}
              specialties={s.specialties}
              rating={s.rating}
              reviewsCount={s.reviewsCount}
              priceFrom={s.priceFrom}
              badge={s.badge}
            />
          ))}
        </div>
      </section>

      {/* BEAUTY ACADEMY */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Apprenez avec KÔSMÉA" title="Beauty Academy" description="Maquillage, soins, coiffure, business : des formations en vidéo, avec quiz et certificats." />
            <Link href="/academy" className="text-sm font-semibold uppercase tracking-wider underline decoration-accent underline-offset-8">
              Explorer la Beauty Academy
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {academyPicks.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      </section>

      {/* LIVE SHOPPING */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="KÔSMÉA Live" title="Le shopping en direct" />
          <Link href="/live" className="text-sm font-semibold uppercase tracking-wider underline decoration-accent underline-offset-8">
            Voir tous les lives
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...liveNow, ...upcomingLive].map((live) => (
            <Link key={live.id} href={`/live/${live.slug}`} className="group relative block aspect-video overflow-hidden rounded-xl bg-muted">
              <img src={live.cover} alt={live.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/10 to-transparent" />
              {live.status === 'live' ? (
                <Badge className="absolute left-3 top-3 bg-destructive text-white">● EN DIRECT</Badge>
              ) : (
                <Badge variant="white" className="absolute left-3 top-3">À venir</Badge>
              )}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="flex items-center gap-2 text-xs text-white/70">
                  <Play className="size-3.5" /> {live.host}
                </p>
                <h3 className="mt-1 font-serif text-lg text-white">{live.title}</h3>
                {live.discount && <p className="mt-1 text-xs font-semibold text-champagne">{live.discount}</p>}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* COMMUNITY LOOKS */}
      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Communauté KÔSMÉA" title="Des looks à shopper" />
            <Link href="/communaute" className="text-sm font-semibold uppercase tracking-wider underline decoration-accent underline-offset-8">
              Explorer la communauté
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {communityPicks.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* EXCLUSIVE / VIP */}
      <section className="bg-plum text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-champagne">
              <Star className="size-3.5 fill-champagne" /> KÔSMÉA Privilège
            </p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Silver, Gold, Diamond.</h2>
            <p className="mt-5 leading-7 text-white/70">
              Livraison privilégiée, accès anticipé aux collections, consultations stylistes offertes et événements
              exclusifs. Gagnez des points KÔSMÉA à chaque achat, avis ou look publié.
            </p>
          </div>
          <Link href="/privilege" className="bg-champagne px-8 py-5 text-xs font-semibold uppercase tracking-wider text-champagne-foreground transition-colors hover:bg-champagne/90">
            Découvrir Privilège
          </Link>
        </div>
      </section>

      {/* KEY STATS */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
        <div className="grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-3 lg:grid-cols-6">
          {keyStats.map((stat) => (
            <StatCounter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <SectionHeading eyebrow="Elles et ils nous font confiance" title="Ce que dit la communauté." align="center" className="mx-auto" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* NEAR ME */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Découverte locale" title="Boutiques et professionnels près de vous" />
          <Link href="/pres-de-moi" className="text-sm font-semibold uppercase tracking-wider underline decoration-accent underline-offset-8">
            Explorer la carte
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap gap-2.5">
          {boutiques.slice(0, 8).map((b) => (
            <Link
              key={b.id}
              href={`/boutiques/${b.slug}`}
              className="flex items-center gap-1.5 border border-border px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <MapPin className="size-3.5" /> {b.district}
            </Link>
          ))}
        </div>
      </section>

      {/* MAGAZINE / INSPIRATION */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="KÔSMÉA Inspiration" title="Nos derniers articles" />
          <Link href="/communaute" className="text-sm font-semibold uppercase tracking-wider underline decoration-accent underline-offset-8">
            Plus d’inspiration
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {latestArticles.map((article) => (
            <div key={article.id} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                <img src={article.image} alt={article.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="py-5">
                <Badge variant="outline">{article.category}</Badge>
                <h3 className="mt-3 font-serif text-lg leading-snug transition-colors group-hover:text-accent">{article.title}</h3>
                <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{formatDate(article.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-5 py-16 text-center lg:px-10">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            <MessageCircle className="size-3.5" /> Restons en contact
          </p>
          <h2 className="font-serif text-3xl leading-tight sm:text-4xl">Recevez nos nouveautés et inspirations</h2>
          <form className="mt-2 flex w-full max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="Votre adresse e-mail"
              className="h-12 flex-1 rounded-lg border border-border bg-background px-4 text-sm outline-none focus-visible:border-primary"
            />
            <button type="submit" className="h-12 shrink-0 rounded-lg bg-primary px-6 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
              S’inscrire
            </button>
          </form>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-obsidian text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Prêt·e à découvrir votre style KÔSMÉA ?</h2>
            <p className="mt-5 leading-7 text-white/70">
              <Heart className="mr-1 inline size-4 text-accent" /> Rejoignez 85 000+ membres qui découvrent, essaient,
              créent et achètent la beauté et la mode africaine autrement.
            </p>
          </div>
          <Link href="/inscription" className="bg-primary px-8 py-5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
            Créer mon compte KÔSMÉA
          </Link>
        </div>
      </section>
    </>
  )
}
