'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { LogIn } from 'lucide-react'

import { useAuth } from '@/lib/store'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ConnexionPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Merci de renseigner votre email et votre mot de passe.')
      return
    }
    setError('')
    login(email.trim(), password)
    router.push('/mon-espace')
  }

  return (
    <section className="mx-auto max-w-md px-5 py-20 lg:px-10 lg:py-28">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Espace client</p>
      <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Connexion</h1>
      <p className="mt-5 leading-7 text-muted-foreground">
        Accédez à vos favoris, vos rendez-vous et vos documents depuis votre espace personnel Akwaba Immobilier.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 border border-border bg-card p-7 lg:p-9">
        <div>
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
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="mt-4 text-sm text-primary">{error}</p>}

        <button
          type="submit"
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0"
        >
          <LogIn className="size-4" /> Se connecter
        </button>

        <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
          Ceci est une démonstration : aucune vérification réelle n’est effectuée, votre session est simplement
          enregistrée sur cet appareil.
        </p>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Pas encore de compte ?{' '}
        <Link href="/inscription" className="font-semibold text-foreground underline decoration-primary underline-offset-4">
          Créer un compte
        </Link>
      </p>
    </section>
  )
}
