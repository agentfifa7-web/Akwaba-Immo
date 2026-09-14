import { Globe2, Heart, Layers, Sparkles } from 'lucide-react'

import { keyStats } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { StatCounter } from '@/components/site/stat-counter'

const layers = [
  { title: 'Marketplace', description: 'Produits, boutiques, commandes et paiement — le cœur de la plateforme.' },
  { title: 'Virtual Experience', description: 'Essayage vêtements, maquillage, coiffure et création de looks.' },
  { title: 'Services', description: 'Stylistes, maquilleuses, coiffeurs, créateurs à réserver en ligne.' },
  { title: 'Education', description: 'Beauty Academy, tutoriels et masterclass pour progresser.' },
  { title: 'Community', description: 'Lives, défis, créateurs, influenceurs et inspiration au quotidien.' },
]

export default function AboutPage() {
  return (
    <div>
      <section className="bg-obsidian text-white">
        <div className="mx-auto max-w-5xl px-5 py-24 text-center lg:px-10">
          <p className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-champagne">
            <Sparkles className="size-4" /> Discover. Try. Create. Shop.
          </p>
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
            La première destination digitale ivoirienne dédiée à la beauté, à la mode et au style.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl leading-7 text-white/70">
            Où chacun peut découvrir, apprendre, créer, essayer virtuellement et acheter — avec une identité
            résolument africaine, contemporaine et technologique.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Notre architecture" title="Cinq grandes couches" align="center" className="mx-auto" />
        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {layers.map((layer, i) => (
            <div key={layer.title} className="border border-border p-6">
              <p className="text-xs text-muted-foreground">CŒUR {i + 1}</p>
              <Layers className="mt-3 size-5 text-accent" />
              <h3 className="mt-3 font-serif text-lg">{layer.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{layer.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                <Heart className="size-4" /> Notre ADN
              </p>
              <h2 className="font-serif text-3xl leading-tight sm:text-4xl">Beauté africaine, mode africaine, créateurs ivoiriens.</h2>
              <p className="mt-5 leading-7 text-muted-foreground">
                KÔSMÉA n’est pas un clone d’une plateforme internationale. Nous mettons en avant le wax, le pagne,
                les styles africains contemporains, les coiffures africaines et des cosmétiques pensés pour la
                diversité des carnations de notre clientèle.
              </p>
            </div>
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                <Globe2 className="size-4" /> Ambition panafricaine
              </p>
              <h2 className="font-serif text-3xl leading-tight sm:text-4xl">De la Côte d’Ivoire à l’Afrique.</h2>
              <p className="mt-5 leading-7 text-muted-foreground">
                Lancée à Abidjan, KÔSMÉA est conçue pour une expansion vers le Sénégal, le Cameroun, le Bénin, le
                Togo, la Guinée, le Mali, le Burkina Faso, le Gabon, le Congo et la RDC.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
        <div className="grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-3 lg:grid-cols-6">
          {keyStats.map((stat) => (
            <StatCounter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>
    </div>
  )
}
