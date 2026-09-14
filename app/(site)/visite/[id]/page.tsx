'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { Calendar, Check, Clock, MapPin } from 'lucide-react'

import { getProjectBySlug, getPropertyBySlug, propertyPriceDisplay } from '@/lib/data'
import { useAppointments, type AppointmentType } from '@/lib/store'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'

const appointmentTypes: AppointmentType[] = [
  'Visite immobilière',
  'Consultation',
  'Estimation',
  'Projet de construction',
  'Projet foncier',
  'Gestion immobilière',
]

const timeSlots = ['08:30', '10:00', '11:30', '14:00', '15:30', '17:00']

export default function AppointmentPage() {
  const { id } = useParams<{ id: string }>()
  const property = getPropertyBySlug(id)
  const project = property ? undefined : getProjectBySlug(id)
  const context = property ?? project
  const contextTitle = property ? property.title : project ? project.name : undefined

  const { add } = useAppointments()

  const [type, setType] = useState<AppointmentType>(project ? 'Projet foncier' : 'Visite immobilière')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState<{ date: string; time: string; type: AppointmentType } | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!date || !time) return
    add({
      type,
      propertyTitle: contextTitle,
      date,
      time,
      name,
      phone,
      email,
    })
    setSubmitted({ date, time, type })
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-10 lg:py-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Prise de rendez-vous</p>
      <h1 className="font-serif text-4xl leading-tight">Planifiez votre rendez-vous</h1>
      <p className="mt-4 leading-7 text-muted-foreground">
        Choisissez une date, un créneau et le type de rendez-vous souhaité : un conseiller Akwaba Immobilier confirmera votre demande sous 24h.
      </p>

      {context && (
        <div className="mt-8 flex items-center gap-4 border border-border bg-secondary/50 p-5">
          {'images' in context && (
            <img src={context.images[0]} alt={contextTitle} className="size-20 shrink-0 rounded-lg object-cover" />
          )}
          <div>
            <h2 className="font-serif text-lg leading-snug">{contextTitle}</h2>
            {property && (
              <>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" /> {property.district}, {property.city}
                </p>
                <p className="mt-1 text-sm font-semibold text-primary">{propertyPriceDisplay(property)}</p>
              </>
            )}
            {project && (
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5" /> {project.district}, {project.city}
              </p>
            )}
          </div>
        </div>
      )}

      {submitted ? (
        <div className="mt-10 flex flex-col items-center gap-4 border border-border bg-card py-16 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Check className="size-7" />
          </div>
          <h2 className="font-serif text-2xl">Rendez-vous demandé avec succès</h2>
          <div className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">Type :</span> {submitted.type}
            </p>
            <p>
              <span className="font-semibold text-foreground">Date :</span>{' '}
              {new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(submitted.date))} à {submitted.time}
            </p>
            {contextTitle && (
              <p>
                <span className="font-semibold text-foreground">Concernant :</span> {contextTitle}
              </p>
            )}
          </div>
          <p className="mt-2 max-w-sm text-xs text-muted-foreground">
            Un conseiller vous contactera pour confirmer ce rendez-vous. Vous pouvez suivre son statut depuis votre espace client.
          </p>
          <Link href="/mon-espace/rendez-vous" className="mt-4 rounded-lg border border-foreground/20 px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-sm">
            Voir mes rendez-vous
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6 border border-border bg-card p-6 lg:p-8">
          <div>
            <Label htmlFor="type">Type de rendez-vous</Label>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value as AppointmentType)}>
              {appointmentTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="date" className="flex items-center gap-1.5">
                <Calendar className="size-3.5" /> Date souhaitée
              </Label>
              <Input id="date" type="date" required min={new Date().toISOString().slice(0, 10)} value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <Label className="flex items-center gap-1.5">
                <Clock className="size-3.5" /> Créneau horaire
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTime(slot)}
                    className={`border px-2 py-2.5 text-xs font-semibold transition-colors ${
                      time === slot ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:border-primary hover:text-primary'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom et prénom" />
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+225 07 00 00 00 00" />
            </div>
          </div>
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.com" />
          </div>

          <button type="submit" disabled={!date || !time} className="mt-2 rounded-lg bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50">
            Confirmer ma demande de rendez-vous
          </button>
        </form>
      )}
    </div>
  )
}
