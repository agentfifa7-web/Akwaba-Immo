import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        graphite: 'bg-graphite text-graphite-foreground',
        outline: 'border border-border bg-background text-foreground',
        muted: 'bg-muted text-muted-foreground',
        white: 'bg-white text-foreground shadow-sm',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant, className }))} {...props} />
}

export { Badge, badgeVariants }
