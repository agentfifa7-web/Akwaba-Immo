'use client'

import { use, useState } from 'react'
import { notFound } from 'next/navigation'
import { CalendarCheck, MessageSquareText, Star } from 'lucide-react'

import { formatFCFA, getStylistBySlug } from '@/lib/data'
import { useAppointments, useCustomRequests } from '@/lib/store'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export default function StylistProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const stylist = getStylistBySlug(slug)
  if (!stylist) notFound()

  const { add: addAppointment } = useAppointments()
  const { add: addRequest } = useCustomRequests()
  const [tab, setTab] = useState<'reserver' | 'sur-mesure'>('reserver')
  const [service, setService] = useState(stylist.services[0]?.name)
  const [confirmed, setConfirmed] = useState(false)
  const [requestSent, setRequestSent] = useState(false)

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    addAppointment({
      providerName: stylist.name,
      providerType: 'Styliste',
      serviceName: String(form.get('service')),
      date: String(form.get('date')),
      time: String(form.get('time')),
      name: String(form.get('name')),
      phone: String(form.get('phone')),
      email: String(form.get('email')),
    })
    setConfirmed(true)
  }

  const handleCustomRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    addRequest({
      stylistName: stylist.name,
      title: String(form.get('title')),
      description: String(form.get('description')),
      budget: Number(form.get('budget')) || undefined,
      name: String(form.get('name')),
      phone: String(form.get('phone')),
      email: String(form.get('email')),
    })
    setRequestSent(true)
  }

  return (
    <div>
      <div className="relative h-64 overflow-hidden bg-muted sm:h-80">
        <img src={stylist.cover} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-obsidian/10 to-transparent" />
      </div>
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="-mt-14 flex items-end gap-4">
          <img src={stylist.photo} alt={stylist.name} className="size-24 shrink-0 rounded-full border-4 border-background object-cover shadow-lg" />
          <div>
            {stylist.badge && <Badge variant="graphite">{stylist.badge}</Badge>}
            <h1 className="mt-2 font-serif text-3xl">{stylist.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{stylist.city} · {stylist.specialties.join(' · ')}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="flex flex-wrap gap-6 border-y border-border py-5 text-sm">
              <p className="flex items-center gap-1.5"><Star className="size-4 fill-champagne text-champagne" /> {stylist.rating.toFixed(1)} ({stylist.reviewsCount} avis)</p>
              <p className="text-muted-foreground">{stylist.completedProjects} projets réalisés</p>
              <p className="text-muted-foreground">Réponse {stylist.responseTime}</p>
            </div>
            <p className="mt-6 leading-7 text-muted-foreground">{stylist.bio}</p>

            <h2 className="mt-10 font-serif text-2xl">Services</h2>
            <div className="mt-4 divide-y divide-border border-y border-border">
              {stylist.services.map((s) => (
                <div key={s.name} className="flex items-center justify-between py-3.5">
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.duration}</p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{formatFCFA(s.price)}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 font-serif text-2xl">Portfolio</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {stylist.portfolio.map((img) => (
                <div key={img} className="aspect-square overflow-hidden rounded-lg bg-muted">
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>

            <h2 className="mt-10 font-serif text-2xl">Disponibilités</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {stylist.availability.map((d) => (
                <span key={d} className="rounded-full bg-muted px-3.5 py-1.5 text-xs font-medium text-foreground">{d}</span>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border bg-card p-6">
              <div className="flex gap-1 rounded-lg border border-border p-1">
                <button type="button" onClick={() => setTab('reserver')} className={cn('flex-1 rounded-md py-2 text-xs font-semibold uppercase tracking-wider', tab === 'reserver' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground')}>
                  Réserver
                </button>
                <button type="button" onClick={() => setTab('sur-mesure')} className={cn('flex-1 rounded-md py-2 text-xs font-semibold uppercase tracking-wider', tab === 'sur-mesure' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground')}>
                  Sur mesure
                </button>
              </div>

              {tab === 'reserver' ? (
                confirmed ? (
                  <div className="mt-6 flex flex-col items-center gap-3 py-8 text-center">
                    <CalendarCheck className="size-8 text-accent" />
                    <p className="font-serif text-lg">Demande envoyée !</p>
                    <p className="text-sm text-muted-foreground">{stylist.name} vous confirmera votre rendez-vous sous peu.</p>
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="mt-6 space-y-4">
                    <div>
                      <Label>Service</Label>
                      <Select name="service" value={service} onChange={(e) => setService(e.target.value)}>
                        {stylist.services.map((s) => <option key={s.name}>{s.name}</option>)}
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Date</Label>
                        <Input type="date" name="date" required />
                      </div>
                      <div>
                        <Label>Heure</Label>
                        <Input type="time" name="time" required />
                      </div>
                    </div>
                    <div>
                      <Label>Nom complet</Label>
                      <Input name="name" required placeholder="Votre nom" />
                    </div>
                    <div>
                      <Label>Téléphone</Label>
                      <Input name="phone" required placeholder="+225 07 00 00 00 00" />
                    </div>
                    <div>
                      <Label>E-mail</Label>
                      <Input type="email" name="email" required placeholder="vous@email.com" />
                    </div>
                    <Button type="submit" className="w-full">Confirmer la demande</Button>
                  </form>
                )
              ) : requestSent ? (
                <div className="mt-6 flex flex-col items-center gap-3 py-8 text-center">
                  <MessageSquareText className="size-8 text-accent" />
                  <p className="font-serif text-lg">Demande envoyée !</p>
                  <p className="text-sm text-muted-foreground">{stylist.name} va étudier votre demande et vous proposer un devis.</p>
                </div>
              ) : (
                <form onSubmit={handleCustomRequest} className="mt-6 space-y-4">
                  <div>
                    <Label>Titre de la demande</Label>
                    <Input name="title" required placeholder="Ex : Robe personnalisée pour mariage" />
                  </div>
                  <div>
                    <Label>Décrivez votre besoin</Label>
                    <Textarea name="description" required placeholder="Je voudrais cette robe mais adaptée à ma morphologie…" />
                  </div>
                  <div>
                    <Label>Budget indicatif (FCFA)</Label>
                    <Input type="number" name="budget" placeholder="150000" />
                  </div>
                  <div>
                    <Label>Nom complet</Label>
                    <Input name="name" required />
                  </div>
                  <div>
                    <Label>Téléphone</Label>
                    <Input name="phone" required />
                  </div>
                  <div>
                    <Label>E-mail</Label>
                    <Input type="email" name="email" required />
                  </div>
                  <Button type="submit" className="w-full">Envoyer la demande</Button>
                </form>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
