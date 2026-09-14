import { cn } from '@/lib/utils'

function Select({ className, children, ...props }: React.ComponentProps<'select'>) {
  return (
    <select
      data-slot="select"
      className={cn(
        'flex h-11 w-full appearance-none border border-border bg-background px-3.5 py-2 text-sm text-foreground outline-none transition-colors focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
}

export { Select }
