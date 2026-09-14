'use client'

import { useState } from 'react'
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

import { SectionHeading } from '@/components/site/section-heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="Contact" title="Une question ? Parlons-en." description="Notre équipe vous répond sous 24h ouvrées." />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
            <p className="text-sm text-muted-foreground">Cocody, Abidjan — Côte d’Ivoire</p>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 size-5 shrink-0 text-accent" />
            <p className="text-sm text-muted-foreground">+225 07 00 00 00 00</p>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 size-5 shrink-0 text-accent" />
            <p className="text-sm text-muted-foreground">bonjour@kosmea.africa</p>
          </div>
          <a href="https://wa.me/2250700000000" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
            <MessageCircle className="size-4" /> Discuter sur WhatsApp
          </a>
        </div>

        <div className="border border-border bg-card p-6 lg:p-8">
          {sent ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <CheckCircle2 className="size-10 text-accent" />
              <p className="font-serif text-xl">Message envoyé !</p>
              <p className="text-sm text-muted-foreground">Nous revenons vers vous très vite.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label>Nom</Label><Input required placeholder="Votre nom" /></div>
                <div><Label>E-mail</Label><Input type="email" required placeholder="vous@email.com" /></div>
              </div>
              <div><Label>Sujet</Label><Input placeholder="Objet de votre message" /></div>
              <div><Label>Message</Label><Textarea required placeholder="Votre message…" /></div>
              <Button type="submit" size="lg" className="w-full sm:w-auto">Envoyer le message</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
