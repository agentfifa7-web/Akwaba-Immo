import { Star } from 'lucide-react'

import type { Testimonial } from '@/lib/data'

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex h-full flex-col justify-between border border-border bg-card p-7">
      <div>
        <div className="flex gap-0.5 text-champagne">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`size-3.5 ${i < testimonial.rating ? 'fill-champagne' : 'fill-none text-border'}`} />
          ))}
        </div>
        <p className="mt-5 font-serif text-lg leading-relaxed text-foreground">“{testimonial.quote}”</p>
      </div>
      <div className="mt-8 flex items-center gap-3">
        <img src={testimonial.photo} alt={testimonial.name} className="size-11 rounded-full object-cover" />
        <div>
          <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">
            {testimonial.role ? `${testimonial.role} · ` : ''}
            {testimonial.city}
          </p>
        </div>
      </div>
    </div>
  )
}
