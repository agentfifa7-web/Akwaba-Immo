'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { UserPlus } from 'lucide-react'

import { useAuth, type AuthUser } from '@/lib/store'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export default function InscriptionPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [accountType, setAccountType] = useState<AuthUser['accountType']>('client')
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Merci de renseigner au moins votre nom et votre email.')
      return
    }
    setError('')
    register({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      accountType,
    })
    router.push('/mon-espace')
  }

  return (
    <section className="mx-auto max-w-md px-5 py-20 lg:px-10 lg:py-28">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Espace client</p>
      <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Créer un compte</h1>
      <p className="mt-5 leading-7 text-muted-foreground">
        Créez votre espace Akwaba Immobilier pour suivre vos favoris, vos rendez-vous et vos demandes en un seul
        endroit.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 border border-border bg-card p-7 lg:p-9">
        <div>
          <Label>Vous êtes</Label>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                { value: 'client', label: 'Client' },
                { value: 'professionnel', label: 'Professionnel / Partenaire' },
              ] as const
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setAccountType(option.value)}
                className={cn(
                  'border px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider transition-colors',
                  accountType === option.value
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-foreground',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <Label htmlFor="name">Nom complet</Label>
          <Input id="name" autoComplete="name" placeholder="Votre nom et prénom" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mt-5">
          <Label htmlFor="email">Adresse email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="vous@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <Label htmlFor="phone">Téléphone (optionnel)</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+225 07 00 00 00 00"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {error && <p className="mt-4 text-sm text-primary">{error}</p>}

        <button
          type="submit"
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0"
        >
          <UserPlus className="size-4" /> Créer mon compte
        </button>

        <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
          Ceci est une démonstration : aucune donnée n’est transmise à un serveur, elle reste enregistrée sur cet
          appareil.
        </p>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Déjà un compte ?{' '}
        <Link href="/connexion" className="font-semibold text-foreground underline decoration-primary underline-offset-4">
          Se connecter
        </Link>
      </p>
    </section>
  )
}
