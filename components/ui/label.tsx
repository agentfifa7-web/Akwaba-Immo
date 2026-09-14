import { cn } from '@/lib/utils'

function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label
      data-slot="label"
      className={cn('mb-2 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground', className)}
      {...props}
    />
  )
}

export { Label }
