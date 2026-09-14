'use client'

import { use, useState } from 'react'
import { notFound } from 'next/navigation'
import { CalendarCheck, MapPin, Star } from 'lucide-react'

import { formatFCFA, getProfessionalBySlug } from '@/lib/data'
import { useAppointments } from '@/lib/store'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'

export default function ProfessionalProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const pro = getProfessionalBySlug(slug)
  if (!pro) notFound()

  const { add: addAppointment } = useAppointments()
  const [confirmed, setConfirmed] = useState(false)

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    addAppointment({
      providerName: pro.name,
      providerType: pro.role,
      serviceName: String(form.get('service')),
      date: String(form.get('date')),
      time: String(form.get('time')),
      name: String(form.get('name')),
      phone: String(form.get('phone')),
      email: String(form.get('email')),
    })
    setConfirmed(true)
  }

  return (
    <div>
      <div className="relative h-64 overflow-hidden bg-muted sm:h-80">
        <img src={pro.cover} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-obsidian/10 to-transparent" />
      </div>
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="-mt-14 flex items-end gap-4">
          <img src={pro.photo} alt={pro.name} className="size-24 shrink-0 rounded-full border-4 border-background object-cover shadow-lg" />
          <div>
            {pro.badge && <Badge variant="graphite">{pro.badge}</Badge>}
            <h1 className="mt-2 font-serif text-3xl">{pro.name}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4" /> {pro.role} · {pro.district}, {pro.city}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="flex items-center gap-1.5 border-y border-border py-5 text-sm">
              <Star className="size-4 fill-champagne text-champagne" /> {pro.rating.toFixed(1)} ({pro.reviewsCount} avis)
            </p>
            <p className="mt-6 leading-7 text-muted-foreground">{pro.bio}</p>

            <h2 className="mt-10 font-serif text-2xl">Services &amp; tarifs</h2>
            <div className="mt-4 divide-y divide-border border-y border-border">
              {pro.services.map((s) => (
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
              {pro.portfolio.map((img) => (
                <div key={img} className="aspect-square overflow-hidden rounded-lg bg-muted">
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border bg-card p-6">
              <p className="font-serif text-lg">Réserver</p>
              {confirmed ? (
                <div className="mt-6 flex flex-col items-center gap-3 py-8 text-center">
                  <CalendarCheck className="size-8 text-accent" />
                  <p className="font-serif text-lg">Demande envoyée !</p>
                  <p className="text-sm text-muted-foreground">{pro.name} vous confirmera votre rendez-vous sous peu.</p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="mt-4 space-y-4">
                  <div>
                    <Label>Service</Label>
                    <Select name="service" defaultValue={pro.services[0]?.name}>
                      {pro.services.map((s) => <option key={s.name}>{s.name}</option>)}
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
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
