'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import { Award, CheckCircle2, Circle, PlayCircle, Star } from 'lucide-react'

import { courses, formatFCFA, getCourseBySlug } from '@/lib/data'
import { useCourseProgress, useEnrolledCourses, usePoints } from '@/lib/store'
import { CourseCard } from '@/components/site/course-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const course = getCourseBySlug(slug)
  if (!course) notFound()

  const { completedLessons, toggleLesson, hydrated } = useCourseProgress(course.id)
  const { isEnrolled, enroll } = useEnrolledCourses()
  const { addPoints } = usePoints()
  const enrolled = isEnrolled(course.id)
  const progressPercent = hydrated ? Math.round((completedLessons.length / course.lessons.length) * 100) : 0
  const completed = progressPercent === 100
  const related = courses.filter((c) => c.id !== course.id && c.category === course.category).slice(0, 3)

  const handleToggle = (index: number, wasCompleted: boolean) => {
    toggleLesson(index)
    if (!wasCompleted) addPoints(`Leçon terminée — ${course.title}`, 5)
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 lg:px-10 lg:py-20">
      <div className="aspect-video overflow-hidden rounded-xl bg-muted">
        <img src={course.cover} alt={course.title} className="h-full w-full object-cover" />
      </div>

      <div className="mt-8 flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="flex flex-wrap gap-1.5">
            <Badge>{course.level}</Badge>
            <Badge variant="outline">{course.category}</Badge>
          </div>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl">{course.title}</h1>
          <p className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Star className="size-4 fill-champagne text-champagne" /> {course.rating.toFixed(1)}</span>
            <span>{course.studentsCount.toLocaleString('fr-FR')} élèves</span>
            <span>{course.duration}</span>
          </p>
          <div className="mt-4 flex items-center gap-3">
            <img src={course.instructorPhoto} alt={course.instructor} className="size-9 rounded-full object-cover" />
            <p className="text-sm text-foreground">Par <span className="font-semibold">{course.instructor}</span></p>
          </div>
        </div>
        <div className="shrink-0 border border-border bg-card p-5 text-right">
          <p className="font-serif text-2xl">{course.price === 0 ? 'Gratuit' : formatFCFA(course.price)}</p>
          {!enrolled ? (
            <Button className="mt-3" onClick={() => enroll(course.id)}>S’inscrire au cours</Button>
          ) : (
            <p className="mt-3 flex items-center justify-end gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <CheckCircle2 className="size-4" /> Inscrit·e
            </p>
          )}
        </div>
      </div>

      <p className="mt-8 max-w-2xl leading-7 text-muted-foreground">{course.description}</p>

      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl">Leçons</h2>
          <p className="text-sm text-muted-foreground">{progressPercent}% terminé</p>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {course.lessons.map((lesson, i) => {
            const isDone = completedLessons.includes(i)
            const locked = !lesson.free && !enrolled
            return (
              <button
                key={lesson.title}
                type="button"
                disabled={locked}
                onClick={() => !locked && handleToggle(i, isDone)}
                className={cn('flex w-full items-center gap-3 py-4 text-left', locked && 'opacity-50')}
              >
                {isDone ? <CheckCircle2 className="size-5 shrink-0 text-accent" /> : <Circle className="size-5 shrink-0 text-muted-foreground" />}
                <PlayCircle className="size-4 shrink-0 text-muted-foreground" />
                <span className="flex-1 text-sm text-foreground">{lesson.title}</span>
                {lesson.free && <Badge variant="outline">Gratuit</Badge>}
                <span className="shrink-0 text-xs text-muted-foreground">{lesson.duration}</span>
              </button>
            )
          })}
        </div>
      </section>

      {completed && (
        <section className="mt-10 flex flex-col items-center gap-3 border border-champagne bg-champagne/10 p-10 text-center">
          <Award className="size-10 text-champagne" />
          <p className="font-serif text-2xl">Félicitations, cours terminé !</p>
          <p className="max-w-md text-sm text-muted-foreground">Votre certificat KÔSMÉA Academy est disponible dans Mon KÔSMÉA &gt; Mes formations.</p>
          <Badge>Certificat débloqué</Badge>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="font-serif text-2xl">Autres cours {course.category}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {related.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
