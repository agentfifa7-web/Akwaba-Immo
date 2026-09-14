'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Save, Sparkles, UserSearch } from 'lucide-react'

import { formatFCFA, products } from '@/lib/data'
import { categoryProductKeywords, findGarments } from '@/lib/garments'
import { useAvatar, useCreations, useCustomRequests } from '@/lib/store'
import { AvatarPreview } from '@/components/site/avatar-preview'
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
  const { config: avatarConfig } = useAvatar()
  const router = useRouter()
  const [saved, setSaved] = useState(false)
  const [showOnAvatar, setShowOnAvatar] = useState(false)

  const candidates = useMemo(() => findGarments(choices.categorie, choices.coupe), [choices.categorie, choices.coupe])
  const [selectedGarmentId, setSelectedGarmentId] = useState(candidates[0]?.id)

  // Quand la catégorie change, on revient au modèle le plus pertinent pour la nouvelle sélection.
  useEffect(() => {
    setSelectedGarmentId(candidates[0]?.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choices.categorie])

  const garment = candidates.find((g) => g.id === selectedGarmentId) ?? candidates[0]

  const relatedProducts = useMemo(() => {
    const keywords = categoryProductKeywords[choices.categorie] ?? []
    return products
      .filter((p) => p.category === 'mode' && keywords.some((k) => p.name.toLowerCase().includes(k) || p.subcategory.toLowerCase().includes(k) || p.tags.some((t) => t.toLowerCase().includes(k))))
      .slice(0, 3)
  }, [choices.categorie])

  function set<K extends keyof Choices>(key: K, value: string) {
    setChoices((prev) => ({ ...prev, [key]: value }))
  }

  function saveDesign() {
    addCreation({
      type: 'tenue',
      title: `${choices.categorie} ${choices.tissu} ${choices.couleur}`,
      summary: `${choices.coupe}, manches ${choices.manches.toLowerCase()}, col ${choices.col.toLowerCase()}, motif ${choices.motif.toLowerCase()} — pour ${choices.occasion.toLowerCase()}`,
      cover: garment?.photo,
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
      <SectionHeading eyebrow="Fashion Designer" title="Créez votre tenue sur mesure" description="Sélectionnez chaque détail : un modèle réel s’affiche et se teinte selon vos choix, puis faites-le réaliser par un créateur." />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px]">
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
          {showOnAvatar ? (
            <>
              <AvatarPreview config={{ ...avatarConfig, outfitColor: colorNameToHex(choices.couleur) }} className="aspect-[3/4] w-full" />
              <p className="mt-2 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
                {choices.categorie} {choices.tissu} {choices.couleur} sur votre mannequin — rendu indicatif
              </p>
            </>
          ) : (
            garment && (
              <>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary">
                  <img src={garment.photo} alt={garment.label} className="absolute inset-0 h-full w-full object-cover" />
                  <div
                    className="absolute inset-0 mix-blend-multiply"
                    style={{ backgroundColor: colorNameToHex(choices.couleur), opacity: 0.4 }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/85 via-obsidian/10 to-transparent p-4">
                    <p className="font-serif text-lg text-white">{choices.categorie} {choices.coupe}</p>
                    <p className="text-xs uppercase tracking-wider text-white/70">{choices.tissu} · {choices.motif}</p>
                  </div>
                </div>
                <p className="mt-2 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
                  {garment.label} — teinte {choices.couleur} appliquée · rendu indicatif
                </p>
              </>
            )
          )}

          <Button variant="outline" className="mt-3 w-full gap-2" onClick={() => setShowOnAvatar((v) => !v)}>
            <Sparkles className="size-4" /> {showOnAvatar ? 'Voir le modèle' : 'Essayer sur mon mannequin'}
          </Button>

          {!showOnAvatar && candidates.length > 1 && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {candidates.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedGarmentId(c.id)}
                  className={cn('overflow-hidden rounded-lg border-2', c.id === selectedGarmentId ? 'border-primary' : 'border-transparent')}
                >
                  <div className="relative aspect-square">
                    <img src={c.photo} alt={c.label} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 mix-blend-multiply" style={{ backgroundColor: colorNameToHex(choices.couleur), opacity: 0.4 }} />
                  </div>
                </button>
              ))}
            </div>
          )}

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

          {relatedProducts.length > 0 && (
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Produits similaires disponibles</p>
              <div className="mt-3 space-y-2">
                {relatedProducts.map((p) => (
                  <Link key={p.id} href={`/produits/${p.slug}`} className="flex items-center gap-3 border border-border bg-card p-2.5 transition-colors hover:border-primary">
                    <img src={p.images[0]} alt={p.name} className="size-12 shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-foreground">{p.name}</p>
                      <p className="text-[11px] text-muted-foreground">{formatFCFA(p.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
