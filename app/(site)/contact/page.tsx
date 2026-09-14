'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

import { agencies } from '@/lib/data'
import { useRequests, type RequestType } from '@/lib/store'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const motifs: { value: RequestType; label: string }[] = [
  { value: 'Achat', label: 'Acheter un bien' },
  { value: 'Location', label: 'Louer un bien' },
  { value: 'Vente', label: 'Vendre un bien' },
  { value: 'Estimation', label: 'Faire estimer mon bien' },
  { value: 'Terrain', label: 'Acheter un terrain' },
  { value: 'Construction', label: 'Construire' },
  { value: 'Investissement', label: 'Investir' },
  { value: 'Gestion', label: 'Faire gérer un bien' },
  { value: 'Autre', label: 'Autre demande' },
]

export default function ContactPage() {
  const { add } = useRequests()
  const [submitted, setSubmitted] = useState(false)
  const [type, setType] = useState<RequestType>('Achat')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    add({
      type,
      subject: motifs.find((m) => m.value === type)?.label ?? 'Autre demande',
      message,
      name,
      phone,
      email,
    })
    setSubmitted(true)
  }

  return (
    <>
      <section className="relative flex min-h-[380px] items-end overflow-hidden bg-graphite pb-14 pt-40 lg:min-h-[440px]">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2400&q=90"
          alt="Conseiller Akwaba Immobilier"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Parlons de votre projet</p>
          <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl">
            Contactez Akwaba Immobilier.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          {/* FORMULAIRE */}
          <Reveal className="border border-border bg-card p-8 lg:p-10">
            {submitted ? (
              <div className="flex flex-col items-start py-10">
                <CheckCircle2 className="size-10 text-primary" />
                <h2 className="mt-6 font-serif text-3xl">Votre demande a bien été envoyée</h2>
                <p className="mt-4 max-w-md leading-7 text-muted-foreground">
                  Merci {name || ''}, un conseiller Akwaba Immobilier vous recontactera très prochainement à l’adresse{' '}
                  {email || 'indiquée'}.
                </p>
                <Button className="mt-8" onClick={() => setSubmitted(false)}>
                  Envoyer une nouvelle demande
                </Button>
              </div>
            ) : (
              <>
                <h2 className="font-serif text-3xl">Envoyez-nous votre demande</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Un conseiller dédié vous recontacte sous 24h ouvrées.
                </p>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div>
                    <Label htmlFor="type">Je souhaite</Label>
                    <Select id="type" value={type} onChange={(e) => setType(e.target.value as RequestType)}>
                      {motifs.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Nom complet</Label>
                      <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom et prénom" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+225 07 00 00 00 00" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Adresse e-mail</Label>
                    <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="message">Votre message</Label>
                    <Textarea id="message" required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Décrivez votre projet en quelques mots..." />
                  </div>
                  <Button type="submit" size="lg" className="w-full px-6 py-6 text-xs font-semibold uppercase tracking-wider">
                    Envoyer ma demande
                  </Button>
                </form>
              </>
            )}
          </Reveal>

          {/* CONTACTS RAPIDES */}
          <div>
            <SectionHeading eyebrow="Un contact plus direct ?" title="Écrivez-nous ou appelez-nous" />
            <div className="mt-8 space-y-3">
              <a
                href="https://wa.me/2250700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 border border-border p-5 transition-colors hover:border-primary"
              >
                <span className="flex size-11 items-center justify-center bg-[#25D366] text-white">
                  <MessageCircle className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">WhatsApp</p>
                  <p className="text-xs text-muted-foreground">+225 07 00 00 00 00</p>
                </div>
              </a>
              <a href="tel:+2252722000000" className="flex items-center gap-4 border border-border p-5 transition-colors hover:border-primary">
                <span className="flex size-11 items-center justify-center bg-graphite text-graphite-foreground">
                  <Phone className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Téléphone</p>
                  <p className="text-xs text-muted-foreground">+225 27 22 00 00 00</p>
                </div>
              </a>
              <a href="mailto:contact@akwaba-immobilier.ci" className="flex items-center gap-4 border border-border p-5 transition-colors hover:border-primary">
                <span className="flex size-11 items-center justify-center bg-graphite text-graphite-foreground">
                  <Mail className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">E-mail</p>
                  <p className="text-xs text-muted-foreground">contact@akwaba-immobilier.ci</p>
                </div>
              </a>
            </div>

            <p className="mt-10 mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nos agences</p>
            <div className="space-y-4">
              {agencies.map((agency) => (
                <div key={agency.id} className="flex items-start gap-3 border-b border-border pb-4 text-sm">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">{agency.city}</p>
                    <p className="text-muted-foreground">{agency.address}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/agences" className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider underline decoration-primary underline-offset-8">
              Voir toutes nos agences
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
