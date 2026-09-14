'use client'

import { useState, type FormEvent } from 'react'
import { Check, MapPin, Sparkles } from 'lucide-react'

import { projects } from '@/lib/data'
import { useRequests } from '@/lib/store'
import { SectionHeading } from '@/components/site/section-heading'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'

const upcoming = projects.filter((p) => p.status === 'a_venir')

export default function ProjetsAVenirPage() {
  const { add } = useRequests()
  const [selected, setSelected] = useState(upcoming[0]?.name ?? '')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    add({
      type: 'Information',
      subject: `Pré-inscription — ${selected}`,
      message: `Je souhaite être informé(e) en priorité du lancement de la commercialisation du programme « ${selected} ».`,
      name,
      email,
      phone,
      propertyTitle: selected,
    })
    setSubmitted(true)
  }

  return (
    <div>
      <section className="relative flex min-h-[380px] items-end overflow-hidden bg-graphite pb-14 pt-32">
        {upcoming[0] && (
          <img src={upcoming[0].images[0]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/60 to-graphite/20" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            <Sparkles className="size-3.5" /> Prochainement
          </p>
          <h1 className="max-w-2xl font-serif text-5xl leading-[1.02] text-white sm:text-6xl">
            Soyez parmi les premiers à découvrir nos prochains projets.
          </h1>
          <p className="mt-5 max-w-xl leading-7 text-white/75">
            Inscrivez-vous pour recevoir en priorité les prix de lancement, les plans et les dates de pré-réservation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
        <SectionHeading eyebrow="En préparation" title="Nos futurs programmes" />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {upcoming.map((project) => (
            <div key={project.id} className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                <img src={project.images[0]} alt={project.name} className="h-full w-full object-cover" />
                <Badge className="absolute left-4 top-4">À venir</Badge>
              </div>
              <div className="p-6">
                <h2 className="font-serif text-2xl">{project.name}</h2>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" /> {project.district}, {project.city}
                </p>
                <p className="mt-4 leading-6 text-muted-foreground">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 border-t border-border pt-4 text-xs uppercase tracking-wider text-muted-foreground">
                  <span>{project.lots} lots prévus</span>
                  <span>Livraison {project.deliveryDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FORMULAIRE */}
        <div className="mt-16 border-t border-border pt-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Je veux être informé</p>
            <h2 className="font-serif text-3xl">Recevez les informations en avant-première</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Laissez-nous vos coordonnées : nous vous contactons dès l’ouverture de la commercialisation du programme choisi.
            </p>
          </div>

          {submitted ? (
            <div className="mx-auto mt-10 flex max-w-lg flex-col items-center gap-4 border border-border bg-card py-14 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="size-7" />
              </div>
              <h3 className="font-serif text-2xl">Inscription confirmée</h3>
              <p className="max-w-sm text-sm text-muted-foreground">
                Merci {name || ''} ! Vous serez informé(e) en priorité des actualités du programme « {selected} ».
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-lg flex-col gap-5 border border-border bg-card p-6 lg:p-8">
              <div>
                <Label htmlFor="project">Programme concerné</Label>
                <Select id="project" value={selected} onChange={(e) => setSelected(e.target.value)}>
                  {upcoming.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom et prénom" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+225 07 00 00 00 00" />
                </div>
              </div>
              <button type="submit" className="mt-2 rounded-lg bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0">
                Je veux être informé
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
