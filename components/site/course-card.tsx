import Link from 'next/link'
import { Star, PlayCircle } from 'lucide-react'

import type { Course } from '@/lib/data'
import { formatFCFA } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function CourseCard({ course, className }: { course: Course; className?: string }) {
  return (
    <Link href={`/academy/${course.slug}`} className={cn('group block overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg', className)}>
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img src={course.cover} alt={course.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 flex items-center justify-center bg-obsidian/0 transition-colors group-hover:bg-obsidian/20">
          <PlayCircle className="size-10 text-white opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <Badge variant="white" className="absolute left-3 top-3">{course.level}</Badge>
      </div>
      <div className="p-5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-accent">{course.category}</p>
        <h3 className="mt-1 font-serif text-base leading-snug transition-colors group-hover:text-accent">{course.title}</h3>
        <p className="mt-2 text-xs text-muted-foreground">Par {course.instructor} · {course.duration} · {course.lessons.length} leçons</p>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-champagne text-champagne" /> {course.rating.toFixed(1)} · {course.studentsCount.toLocaleString('fr-FR')} élèves
          </p>
          <p className="text-xs font-semibold text-foreground">{course.price === 0 ? 'Gratuit' : formatFCFA(course.price)}</p>
        </div>
      </div>
    </Link>
  )
}
