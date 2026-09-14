'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    login(email, password)
    router.push('/mon-kosmea')
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-20 lg:px-10">
      <h1 className="font-serif text-3xl">Connexion</h1>
      <p className="mt-2 text-sm text-muted-foreground">Accédez à votre dressing, vos favoris et vos rendez-vous KÔSMÉA.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <Label>E-mail</Label>
          <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@email.com" />
        </div>
        <div>
          <Label>Mot de passe</Label>
          <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <Button type="submit" size="lg" className="w-full">Se connecter</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Pas encore de compte ? <Link href="/inscription" className="font-semibold text-accent hover:underline">Créer un compte</Link>
      </p>
    </div>
  )
}
