'use client'

import { useState, type FormEvent } from 'react'
import { Briefcase, CheckCircle2, GraduationCap, HeartHandshake, MapPin, TrendingUp } from 'lucide-react'

import { jobOpenings, metiers } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const raisons = [
  { icon: TrendingUp, title: 'Une entreprise en croissance', text: 'Plus de 15 ans d’expertise et une expansion continue à travers la Côte d’Ivoire.' },
  { icon: GraduationCap, title: 'Formation continue', text: 'Un accompagnement pour développer vos compétences, dans tous les métiers de l’immobilier.' },
  { icon: HeartHandshake, title: 'Une culture d’équipe', text: 'Un environnement collaboratif où chaque collaborateur est écouté et valorisé.' },
  { icon: Briefcase, title: 'Des parcours diversifiés', text: 'Commercial, technique, juridique, gestion, communication : de nombreuses trajectoires possibles.' },
]

export default function CarrieresPage() {
  const [submitted, setSubmitted] = useState(false)
  const [poste, setPoste] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-graphite pb-14 pt-40 lg:min-h-[480px]">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2400&q=90"
          alt="Équipe Akwaba Immobilier au travail"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Carrières</p>
          <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl">
            Rejoignez l’aventure Akwaba Immobilier.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 lg:text-lg">
            Nous recrutons des talents passionnés par l’immobilier, prêts à contribuer à la transformation du secteur
            en Côte d’Ivoire.
          </p>
        </div>
      </section>

      {/* NOS METIERS TEASER */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
        <SectionHeading eyebrow="Six métiers, une seule vocation" title="Des opportunités dans tous nos pôles" />
        <div className="mt-10 flex flex-wrap gap-2.5">
          {metiers.map((m) => (
            <Badge key={m.id} variant="outline" className="px-4 py-2.5 text-xs normal-case">
              {m.title}
            </Badge>
          ))}
        </div>
      </section>

      {/* POURQUOI NOUS REJOINDRE */}
      <section className="bg-graphite text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <SectionHeading eyebrow="Pourquoi nous rejoindre" title="Une aventure humaine et professionnelle" light />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {raisons.map((r) => (
              <div key={r.title} className="border border-white/15 p-7">
                <r.icon className="size-7 text-primary" />
                <h3 className="mt-5 font-serif text-lg">{r.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFRES */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Postes ouverts" title="Nos offres d’emploi" />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {jobOpenings.map((job, i) => (
            <Reveal key={job.id} delay={i * 60} className="flex flex-col justify-between border border-border bg-card p-7">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="graphite">{job.department}</Badge>
                  <Badge variant="outline">{job.contract}</Badge>
                </div>
                <h3 className="mt-4 font-serif text-xl">{job.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
                  <MapPin className="size-3.5" /> {job.location}
                </p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{job.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setPoste(job.title)}
                className="mt-6 flex w-fit items-center gap-2 border border-border px-5 py-3 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Postuler à cette offre
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CANDIDATURE SPONTANEE */}
      <section className="border-t border-border bg-secondary/60">
        <div className="mx-auto max-w-3xl px-5 py-20 lg:px-10 lg:py-28">
          <SectionHeading eyebrow="Candidature spontanée" title="Vous ne trouvez pas l’offre qui vous correspond ?" align="center" className="mx-auto" />
          <div className="mt-10 border border-border bg-card p-8 lg:p-10">
            {submitted ? (
              <div className="flex flex-col items-center py-6 text-center">
                <CheckCircle2 className="size-10 text-primary" />
                <h3 className="mt-6 font-serif text-2xl">Candidature envoyée</h3>
                <p className="mt-3 max-w-md leading-7 text-muted-foreground">
                  Merci pour votre intérêt. Notre équipe RH étudiera votre profil et vous recontactera si une
                  opportunité correspond à votre parcours.
                </p>
                <Button className="mt-8" onClick={() => setSubmitted(false)}>
                  Envoyer une autre candidature
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="cand-name">Nom complet</Label>
                    <Input id="cand-name" required placeholder="Votre nom et prénom" />
                  </div>
                  <div>
                    <Label htmlFor="cand-phone">Téléphone</Label>
                    <Input id="cand-phone" required placeholder="+225 07 00 00 00 00" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cand-email">Adresse e-mail</Label>
                  <Input id="cand-email" type="email" required placeholder="vous@email.com" />
                </div>
                <div>
                  <Label htmlFor="cand-poste">Poste souhaité</Label>
                  <Select id="cand-poste" value={poste} onChange={(e) => setPoste(e.target.value)}>
                    <option value="">Candidature spontanée</option>
                    {jobOpenings.map((j) => (
                      <option key={j.id} value={j.title}>
                        {j.title}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cand-message">Votre message et parcours</Label>
                  <Textarea id="cand-message" required placeholder="Présentez-vous, votre expérience et vos motivations..." />
                </div>
                <p className="text-xs text-muted-foreground">
                  Vous pouvez également joindre votre CV en mentionnant un lien de téléchargement dans votre message.
                </p>
                <Button type="submit" size="lg" className="w-full px-6 py-6 text-xs font-semibold uppercase tracking-wider">
                  Envoyer ma candidature
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
