'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { Check, MapPin } from 'lucide-react'

import { getPropertyBySlug, propertyPriceDisplay } from '@/lib/data'
import { useRequests } from '@/lib/store'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function PropertyContactPage() {
  const { slug } = useParams<{ slug: string }>()
  const property = getPropertyBySlug(slug)
  const { add } = useRequests()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(
    property ? `Bonjour, je souhaite obtenir plus d’informations sur « ${property.title} ». Merci de me recontacter.` : '',
  )
  const [submitted, setSubmitted] = useState(false)

  if (!property) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-32 text-center lg:px-10">
        <h1 className="font-serif text-4xl">Bien introuvable</h1>
        <Link href="/biens" className="mt-4 bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
          Retour au catalogue
        </Link>
      </div>
    )
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!property) return
    add({
      type: 'Information',
      subject: `Demande d’information — ${property.title}`,
      message,
      name,
      phone,
      email,
      propertyTitle: property.title,
    })
    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-10 lg:py-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Demande d’information</p>
      <h1 className="font-serif text-4xl leading-tight">Un renseignement sur ce bien ?</h1>
      <p className="mt-4 leading-7 text-muted-foreground">
        Complétez le formulaire ci-dessous, un conseiller Akwaba Immobilier vous recontacte sous 24h ouvrées.
      </p>

      <div className="mt-8 flex items-center gap-4 border border-border bg-secondary/50 p-5">
        <img src={property.images[0]} alt={property.title} className="size-20 shrink-0 rounded-lg object-cover" />
        <div>
          <h2 className="font-serif text-lg leading-snug">{property.title}</h2>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5" /> {property.district}, {property.city}
          </p>
          <p className="mt-1 text-sm font-semibold text-primary">{propertyPriceDisplay(property)}</p>
        </div>
      </div>

      {submitted ? (
        <div className="mt-10 flex flex-col items-center gap-4 border border-border bg-card py-16 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Check className="size-7" />
          </div>
          <h2 className="font-serif text-2xl">Votre demande a bien été envoyée</h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Merci {name || ''}, un conseiller Akwaba Immobilier vous recontacte très prochainement au sujet de « {property.title} ».
          </p>
          <Link href={`/biens/${property.slug}`} className="mt-4 border border-foreground/20 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-primary hover:text-primary">
            Retour à la fiche du bien
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5 border border-border bg-card p-6 lg:p-8">
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
          <div>
            <Label htmlFor="message">Votre message</Label>
            <Textarea id="message" required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <button type="submit" className="mt-2 bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90">
            Envoyer ma demande
          </button>
        </form>
      )}
    </div>
  )
}
