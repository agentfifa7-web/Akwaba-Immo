'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, UserSearch } from 'lucide-react'

import { useCreations, useCustomRequests } from '@/lib/store'
import { SectionHeading } from '@/components/site/section-heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { colorNameToHex, cn } from '@/lib/utils'

const options = {
  categorie: ['Robe', 'Ensemble', 'Tenue traditionnelle', 'Tailleur', 'Chemise'],
  occasion: ['Mariage', 'Soirée', 'Bureau', 'Cérémonie', 'Casual'],
  couleur: ['Terracotta', 'Champagne', 'Plum', 'Ivoire', 'Émeraude', 'Noir'],
  tissu: ['Wax', 'Dentelle', 'Mousseline', 'Satin', 'Lin', 'Bazin'],
  coupe: ['Sirène', 'Évasée', 'Droite', 'Cintrée', 'Ample'],
  manches: ['Sans manches', 'Courtes', 'Longues', 'Ballon'],
  col: ['Rond', 'V', 'Bateau', 'Montant'],
  longueur: ['Courte', 'Mi-longue', 'Longue'],
  motif: ['Uni', 'Floral', 'Géométrique', 'Bogolan'],
}

type Choices = { [K in keyof typeof options]: string }

const initialChoices: Choices = {
  categorie: options.categorie[0],
  occasion: options.occasion[0],
  couleur: options.couleur[0],
  tissu: options.tissu[0],
  coupe: options.coupe[0],
  manches: options.manches[0],
  col: options.col[0],
  longueur: options.longueur[0],
  motif: options.motif[0],
}

export default function FashionDesignerPage() {
  const [choices, setChoices] = useState<Choices>(initialChoices)
  const { add: addCreation } = useCreations()
  const { add: addRequest } = useCustomRequests()
  const router = useRouter()
  const [saved, setSaved] = useState(false)

  function set<K extends keyof Choices>(key: K, value: string) {
    setChoices((prev) => ({ ...prev, [key]: value }))
  }

  function saveDesign() {
    addCreation({
      type: 'tenue',
      title: `${choices.categorie} ${choices.tissu} ${choices.couleur}`,
      summary: `${choices.coupe}, manches ${choices.manches.toLowerCase()}, col ${choices.col.toLowerCase()}, motif ${choices.motif.toLowerCase()} — pour ${choices.occasion.toLowerCase()}`,
      config: choices,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function requestCreation() {
    addRequest({
      stylistName: 'Créateur KÔSMÉA (à assigner)',
      title: `${choices.categorie} sur mesure — ${choices.occasion}`,
      description: `Tissu : ${choices.tissu} · Couleur : ${choices.couleur} · Coupe : ${choices.coupe} · Manches : ${choices.manches} · Col : ${choices.col} · Longueur : ${choices.longueur} · Motif : ${choices.motif}`,
      name: 'Vous',
      phone: '',
      email: '',
    })
    router.push('/mon-kosmea')
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="Fashion Designer" title="Créez votre tenue sur mesure" description="Sélectionnez chaque détail pour obtenir un concept visuel, puis faites-le réaliser par un créateur." />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-6 sm:grid-cols-2">
          {(Object.keys(options) as (keyof typeof options)[]).map((key) => (
            <div key={key}>
              <Label className="capitalize">{key}</Label>
              <Select value={choices[key]} onChange={(e) => set(key, e.target.value)}>
                {options[key].map((o) => <option key={o}>{o}</option>)}
              </Select>
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-border">
            <div
              className="flex aspect-[3/4] items-end p-6"
              style={{ backgroundColor: colorNameToHex(choices.couleur), backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)' }}
            >
              <div className="rounded-lg bg-white/95 p-4">
                <p className="font-serif text-lg leading-tight">{choices.categorie} {choices.coupe}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{choices.tissu} · {choices.motif}</p>
              </div>
            </div>
          </div>
          <p className="mt-2 text-center text-[10px] uppercase tracking-wider text-muted-foreground">Concept visuel — simulation illustrative</p>

          <div className="mt-4 space-y-2 border border-border bg-card p-5 text-sm">
            <p><span className="text-muted-foreground">Occasion :</span> {choices.occasion}</p>
            <p><span className="text-muted-foreground">Manches :</span> {choices.manches} · <span className="text-muted-foreground">Col :</span> {choices.col}</p>
            <p><span className="text-muted-foreground">Longueur :</span> {choices.longueur}</p>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <Button className="w-full gap-2" onClick={saveDesign}>
              <Save className="size-4" /> {saved ? 'Design enregistré ✓' : 'Save Design'}
            </Button>
            <Button variant="secondary" className="w-full gap-2" onClick={requestCreation}>
              <UserSearch className="size-4" /> Request Custom Creation
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
