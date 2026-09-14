'use client'

import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

import { boutiques, categories, products } from '@/lib/data'
import { PageHeader, StatCard } from '@/components/admin/ui'
import { Eye, MousePointerClick, Percent, ShoppingCart } from 'lucide-react'

const COLORS = ['#171310', '#b96f55', '#d8c29d', '#3a1f32']

const categoryData = categories.map((c) => ({ name: c.label, value: products.filter((p) => p.category === c.id).length }))
const topBoutiques = [...boutiques].sort((a, b) => b.reviewsCount - a.reviewsCount).slice(0, 6).map((b) => ({ name: b.name, avis: b.reviewsCount }))

export default function AdminStatsPage() {
  return (
    <div>
      <PageHeader title="Statistiques" description="Analytics de la marketplace, du Virtual Beauty Studio et de la communauté." />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Taux de conversion" value="3,4%" hint="Visite → achat" icon={Percent} />
        <StatCard label="Panier moyen" value="34 500 FCFA" hint="30 derniers jours" icon={ShoppingCart} />
        <StatCard label="Pages vues" value="182 400" hint="30 derniers jours" icon={Eye} />
        <StatCard label="Taux d’engagement Try-On" value="21%" hint="Visiteurs → essayage" icon={MousePointerClick} />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="border border-border bg-card p-5">
          <h2 className="font-serif text-lg font-semibold">Répartition du catalogue</h2>
          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2}>
                  {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 0 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border border-border bg-card p-5">
          <h2 className="font-serif text-lg font-semibold">Boutiques les mieux notées</h2>
          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer>
              <BarChart data={topBoutiques} layout="vertical" margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis type="category" dataKey="name" fontSize={11} width={140} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 0 }} />
                <Bar dataKey="avis" name="Avis" fill="#b96f55" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
