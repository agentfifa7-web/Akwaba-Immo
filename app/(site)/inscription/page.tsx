'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useAuth, type AccountType } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const accountTypes: { value: AccountType; label: string; description: string }[] = [
  { value: 'client', label: 'Client·e', description: 'Découvrir, essayer et acheter' },
  { value: 'vendeur', label: 'Boutique', description: 'Vendre sur la marketplace' },
  { value: 'styliste', label: 'Styliste', description: 'Proposer mes services' },
  { value: 'professionnel', label: 'Professionnel·le beauté', description: 'Maquilleuse, coiffeur, salon…' },
]

export default function RegisterPage() {
  const { register } = useAuth()
  const router = useRouter()
  const [accountType, setAccountType] = useState<AccountType>('client')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    register({ name, email, phone, accountType })
    router.push(accountType === 'client' ? '/mon-kosmea' : '/pro')
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-5 py-20 lg:px-10">
      <h1 className="font-serif text-3xl">Créer un compte KÔSMÉA</h1>
      <p className="mt-2 text-sm text-muted-foreground">Rejoignez la première super-plateforme beauté & mode ivoirienne.</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {accountTypes.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => setAccountType(type.value)}
            className={cn('border p-4 text-left transition-colors', accountType === type.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40')}
          >
            <p className="text-sm font-semibold text-foreground">{type.label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{type.description}</p>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <Label>Nom complet</Label>
          <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom" />
        </div>
        <div>
          <Label>E-mail</Label>
          <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@email.com" />
        </div>
        <div>
          <Label>Téléphone</Label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+225 07 00 00 00 00" />
        </div>
        <Button type="submit" size="lg" className="w-full">Créer mon compte</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Déjà inscrit·e ? <Link href="/connexion" className="font-semibold text-accent hover:underline">Se connecter</Link>
      </p>
    </div>
  )
}
