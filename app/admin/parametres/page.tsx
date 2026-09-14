'use client'

import { useState } from 'react'

import { PageHeader } from '@/components/admin/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false)

  return (
    <div>
      <PageHeader title="Paramètres" description="Configuration générale de la plateforme KÔSMÉA." />

      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSaved(true)
          setTimeout(() => setSaved(false), 2000)
        }}
        className="grid max-w-2xl gap-6"
      >
        <div><Label>Nom de la plateforme</Label><Input defaultValue="KÔSMÉA" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><Label>Devise</Label><Select defaultValue="XOF"><option value="XOF">FCFA (XOF)</option><option value="EUR">Euro (EUR)</option><option value="USD">Dollar (USD)</option></Select></div>
          <div><Label>Langue par défaut</Label><Select defaultValue="fr"><option value="fr">Français</option><option value="en">English</option></Select></div>
        </div>
        <div><Label>Commission vendeur par défaut (%)</Label><Input type="number" defaultValue={12} /></div>
        <div><Label>E-mail support</Label><Input type="email" defaultValue="support@kosmea.africa" /></div>
        <div><Label>Marché initial</Label><Input defaultValue="Côte d’Ivoire" disabled /></div>
        <Button type="submit" className="w-fit">{saved ? 'Enregistré ✓' : 'Enregistrer les modifications'}</Button>
      </form>
    </div>
  )
}
