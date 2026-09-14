'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { GraduationCap } from 'lucide-react'

import { courses } from '@/lib/data'
import { CourseCard } from '@/components/site/course-card'
import { SectionHeading } from '@/components/site/section-heading'
import { cn } from '@/lib/utils'

const levels = ['Débutant', 'Intermédiaire', 'Professionnel'] as const
const categories = Array.from(new Set(courses.map((c) => c.category)))

export default function AcademyPage() {
  const [level, setLevel] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)

  const filtered = useMemo(
    () => courses.filter((c) => (!level || c.level === level) && (!category || c.category === category)),
    [level, category],
  )

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="Beauty Academy" title="Apprenez la beauté et la mode" description="Vidéos, tutoriels, quiz et certificats : progressez du débutant au professionnel." />

      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        {levels.map((l) => (
          <Link
            key={l}
            href="#catalogue"
            onClick={() => setLevel((prev) => (prev === l ? null : l))}
            className={cn('border p-6 text-center transition-colors', level === l ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40')}
          >
            <GraduationCap className="mx-auto size-6 text-accent" />
            <p className="mt-3 font-serif text-lg">{l}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {l === 'Débutant' && '« Je découvre le maquillage »'}
              {l === 'Intermédiaire' && '« Je perfectionne mon maquillage »'}
              {l === 'Professionnel' && '« Je veux devenir Makeup Artist »'}
            </p>
          </Link>
        ))}
      </div>

      <div id="catalogue" className="mt-14 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory(null)}
          className={cn('rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider', !category ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}
        >
          Toutes catégories
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn('rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider', category === c ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  )
}
