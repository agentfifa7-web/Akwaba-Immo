'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, Calculator, TriangleAlert } from 'lucide-react'

import { formatFCFA } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

type InvestmentType = 'terrain' | 'maison' | 'location' | 'programme'

const durations = [1, 3, 5, 10] as const

const assumptions: Record<InvestmentType, { label: string; appreciationRate: number; rentalYield: number; note: string }> = {
  terrain: {
    label: 'Terrain',
    appreciationRate: 0.06,
    rentalYield: 0,
    note: 'Hypothèse : appréciation moyenne du foncier de 6 % par an (moyenne indicative Cocody/Bingerville/Songon).',
  },
  maison: {
    label: 'Maison / Villa',
    appreciationRate: 0.045,
    rentalYield: 0,
    note: 'Hypothèse : appréciation moyenne du bâti de 4,5 % par an, hors revenus locatifs.',
  },
  location: {
    label: 'Immobilier locatif',
    appreciationRate: 0.03,
    rentalYield: 0.07,
    note: 'Hypothèse : appréciation du bien de 3 %/an + rendement locatif brut de 7 %/an, réinvesti.',
  },
  programme: {
    label: 'Programme immobilier',
    appreciationRate: 0.05,
    rentalYield: 0,
    note: 'Hypothèse : plus-value moyenne de 5 % par an entre la réservation et la livraison.',
  },
}

export default function SimulateurPage() {
  const [capital, setCapital] = useState<number>(25_000_000)
  const [duree, setDuree] = useState<(typeof durations)[number]>(5)
  const [type, setType] = useState<InvestmentType>('terrain')

  const result = useMemo(() => {
    const { appreciationRate, rentalYield } = assumptions[type]
    const annualRate = appreciationRate + rentalYield
    const futureValue = capital * Math.pow(1 + annualRate, duree)
    const gain = futureValue - capital
    return { annualRate, futureValue, gain }
  }, [capital, duree, type])

  return (
    <>
      <section className="relative flex min-h-[340px] items-end overflow-hidden bg-graphite pb-14 pt-36 lg:min-h-[380px]">
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=90"
          alt="Simulateur d'investissement"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/55 to-graphite/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            <Calculator className="size-3.5" /> Simulateur d’investissement
          </p>
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl">
            Estimez la valorisation de votre investissement.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* FORM */}
          <div>
            <SectionHeading eyebrow="Vos paramètres" title="Paramétrez votre simulation" />
            <div className="mt-10 space-y-6 border border-border bg-card p-7">
              <div>
                <Label htmlFor="capital">Capital disponible (FCFA)</Label>
                <Input
                  id="capital"
                  type="number"
                  min={1_000_000}
                  step={500_000}
                  value={capital}
                  onChange={(e) => setCapital(Math.max(0, Number(e.target.value) || 0))}
                />
                <p className="mt-2 text-xs text-muted-foreground">{formatFCFA(capital)}</p>
              </div>

              <div>
                <Label htmlFor="duree">Durée du placement</Label>
                <Select id="duree" value={duree} onChange={(e) => setDuree(Number(e.target.value) as (typeof durations)[number])}>
                  {durations.map((d) => (
                    <option key={d} value={d}>
                      {d} an{d > 1 ? 's' : ''}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Type d’investissement</Label>
                <Select id="type" value={type} onChange={(e) => setType(e.target.value as InvestmentType)}>
                  {Object.entries(assumptions).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.label}
                    </option>
                  ))}
                </Select>
              </div>

              <p className="border-t border-border pt-5 text-xs leading-5 text-muted-foreground">{assumptions[type].note}</p>
            </div>
          </div>

          {/* RESULTS */}
          <div>
            <SectionHeading eyebrow="Résultat indicatif" title="Votre simulation" />
            <div className="mt-10 border border-border bg-graphite p-8 text-white lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Taux de croissance annuel retenu</p>
              <p className="mt-2 font-serif text-3xl">{(result.annualRate * 100).toFixed(1)} % / an</p>

              <div className="mt-8 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Valeur estimée à terme</p>
                  <p className="mt-2 font-serif text-3xl text-primary">{formatFCFA(result.futureValue)}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Gain estimé</p>
                  <p className="mt-2 font-serif text-3xl">{formatFCFA(result.gain)}</p>
                </div>
              </div>

              <p className="mt-8 border-t border-white/15 pt-6 text-xs leading-5 text-white/60">
                Calcul : Capital × (1 + taux annuel retenu)<sup>durée</sup>. Capital de départ : {formatFCFA(capital)} sur{' '}
                {duree} an{duree > 1 ? 's' : ''}.
              </p>
            </div>

            {/* WARNING BOX */}
            <div className="mt-6 flex gap-4 border border-primary/30 bg-primary/5 p-6">
              <TriangleAlert className="mt-0.5 size-5 shrink-0 text-primary" />
              <p className="text-sm leading-6 text-foreground">
                Les projections financières affichées sont des estimations indicatives et ne constituent en aucun cas
                une garantie de rendement. Elles reposent sur des hypothèses simplifiées et ne prennent pas en compte
                l’ensemble des frais, taxes et aléas de marché. Consultez un conseiller Akwaba Immobilier pour une
                étude personnalisée.
              </p>
            </div>

            <Link
              href="/contact"
              className="mt-6 flex w-fit items-center gap-2 bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Obtenir une étude personnalisée <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
