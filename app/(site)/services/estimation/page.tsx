'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'

import { useRequests } from '@/lib/store'
import { SectionHeading } from '@/components/site/section-heading'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const proprieteTypes = ['Terrain', 'Maison', 'Villa', 'Appartement', 'Bureau', 'Commerce', 'Immeuble']
const etats = ['Neuf', 'Bon état', 'À rénover']

export default function EstimationPage() {
  const { add } = useRequests()
  const [submitted, setSubmitted] = useState(false)

  const [typeBien, setTypeBien] = useState(proprieteTypes[1])
  const [localisation, setLocalisation] = useState('')
  const [superficie, setSuperficie] = useState<number | ''>('')
  const [pieces, setPieces] = useState<number | ''>('')
  const [etat, setEtat] = useState(etats[1])
  const [nom, setNom] = useState('')
  const [telephone, setTelephone] = useState('')
  const [email, setEmail] = useState('')
  const [complement, setComplement] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const message = [
      `Type de bien : ${typeBien}`,
      `Localisation : ${localisation}`,
      `Superficie : ${superficie ? `${superficie} m²` : 'non précisée'}`,
      `Nombre de pièces : ${pieces || 'non précisé'}`,
      `État : ${etat}`,
      complement ? `Informations complémentaires : ${complement}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    add({
      type: 'Estimation',
      subject: 'Demande d’estimation',
      message,
      name: nom,
      phone: telephone,
      email,
    })
    setSubmitted(true)
  }

  return (
    <>
      <section className="relative flex min-h-[380px] items-end overflow-hidden bg-graphite pb-14 pt-36 lg:min-h-[440px]">
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=90"
          alt="Estimation immobilière"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Nos services</p>
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Estimation en 3 minutes.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75">
            Renseignez quelques informations sur votre bien : un conseiller Akwaba Immobilier revient vers vous avec
            une estimation indicative, avant une visite pour affiner la valeur.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Formulaire" title="Parlez-nous de votre bien" />
            <p className="mt-5 max-w-md leading-7 text-muted-foreground">
              Plus les informations sont précises, plus notre estimation initiale sera pertinente. Un expert humain
              valide systématiquement chaque estimation avant qu’elle ne vous soit communiquée.
            </p>

            <div className="mt-8 flex items-start gap-4 border border-border bg-secondary/60 p-6">
              <Sparkles className="mt-0.5 size-5 shrink-0 text-primary" />
              <p className="text-sm leading-6 text-muted-foreground">
                Une couche d’intelligence artificielle pourra, à l’avenir, préqualifier votre estimation à partir des
                données du marché. Un expert Akwaba Immobilier valide toujours la valeur finale avant transmission.
              </p>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="flex h-full flex-col items-start justify-center gap-4 border border-border bg-card p-8 text-center sm:items-center sm:text-center">
                <CheckCircle2 className="size-10 text-primary" />
                <h3 className="font-serif text-2xl">Demande envoyée !</h3>
                <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                  Merci, votre demande d’estimation a bien été enregistrée. Un conseiller Akwaba Immobilier vous
                  recontacte sous 24 à 48h ouvrées avec une première estimation indicative.
                </p>
                <Link href="/" className="mt-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary underline underline-offset-4">
                  Retour à l’accueil <ArrowRight className="size-3.5" />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 border border-border bg-card p-7">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="typeBien">Type de bien</Label>
                    <Select id="typeBien" value={typeBien} onChange={(e) => setTypeBien(e.target.value)}>
                      {proprieteTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="etat">État du bien</Label>
                    <Select id="etat" value={etat} onChange={(e) => setEtat(e.target.value)}>
                      {etats.map((e) => (
                        <option key={e} value={e}>{e}</option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="localisation">Localisation</Label>
                  <Input
                    id="localisation"
                    placeholder="Cocody, Bingerville, Yamoussoukro..."
                    value={localisation}
                    onChange={(e) => setLocalisation(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="superficie">Superficie (m²)</Label>
                    <Input
                      id="superficie"
                      type="number"
                      min={0}
                      value={superficie}
                      onChange={(e) => setSuperficie(e.target.value ? Number(e.target.value) : '')}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pieces">Nombre de pièces</Label>
                    <Input
                      id="pieces"
                      type="number"
                      min={0}
                      value={pieces}
                      onChange={(e) => setPieces(e.target.value ? Number(e.target.value) : '')}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="complement">Informations complémentaires</Label>
                  <Textarea
                    id="complement"
                    placeholder="Année de construction, travaux récents, particularités du bien..."
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="nom">Nom complet</Label>
                    <Input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input id="telephone" type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Demander mon estimation <ArrowRight className="size-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
