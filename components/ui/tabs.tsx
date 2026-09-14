import { cn } from '@/lib/utils'

export interface TabItem {
  value: string
  label: string
}

/**
 * Premium pill-group tab switcher (segmented control style).
 * Controlled: pass `value` + `onChange`, no internal state.
 */
function Tabs({
  items,
  value,
  onChange,
  className,
  size = 'default',
}: {
  items: TabItem[]
  value: string
  onChange: (value: string) => void
  className?: string
  size?: 'default' | 'sm'
}) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex flex-wrap items-center gap-1 rounded-xl border border-border bg-card p-1 shadow-sm',
        className,
      )}
    >
      {items.map((item) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.value)}
            className={cn(
              'rounded-lg font-semibold uppercase tracking-wider transition-all duration-200',
              size === 'sm' ? 'px-3.5 py-2 text-[11px]' : 'px-4 py-2.5 text-xs',
              active
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

export { Tabs }
