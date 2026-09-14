'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Heart, CalendarDays, Menu } from 'lucide-react'

import { useFavorites } from '@/lib/store'
import { cn } from '@/lib/utils'

const items = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/biens', label: 'Rechercher', icon: Search },
  { href: '/mon-espace/favoris', label: 'Favoris', icon: Heart },
  { href: '/mon-espace/rendez-vous', label: 'RDV', icon: CalendarDays },
  { href: '/plan-du-site', label: 'Menu', icon: Menu },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const { ids, hydrated } = useFavorites()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-border bg-background/95 backdrop-blur lg:hidden">
      {items.map((item) => {
        const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] uppercase tracking-wide text-muted-foreground',
              active && 'text-primary',
            )}
          >
            <Icon className={cn('size-5', active && 'fill-primary/10')} />
            {item.label === 'Favoris' && hydrated && ids.length > 0 && (
              <span className="absolute right-[calc(50%-16px)] top-1 flex size-3.5 items-center justify-center rounded-full bg-primary text-[8px] text-primary-foreground">
                {ids.length}
              </span>
            )}
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
