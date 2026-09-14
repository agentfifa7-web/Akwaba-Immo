import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  light,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  light?: boolean
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className={cn('mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent')}>{eyebrow}</p>
      )}
      <h2 className={cn('font-serif text-4xl leading-tight tracking-tight sm:text-5xl', light ? 'text-white' : 'text-foreground')}>
        {title}
      </h2>
      {description && (
        <p className={cn('mt-5 leading-7', light ? 'text-white/70' : 'text-muted-foreground')}>{description}</p>
      )}
    </div>
  )
}
