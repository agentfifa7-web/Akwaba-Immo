'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, Sparkles, ShoppingBag, User } from 'lucide-react'

import { useCart } from '@/lib/store'
import { cn } from '@/lib/utils'

const items = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/communaute', label: 'Explore', icon: Compass },
  { href: '/essayer', label: 'Try', icon: Sparkles, emphasized: true },
  { href: '/shop', label: 'Shop', icon: ShoppingBag },
  { href: '/mon-kosmea', label: 'Profile', icon: User },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const { totalCount, hydrated } = useCart()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-border bg-background/95 backdrop-blur lg:hidden">
      {items.map((item) => {
        const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
        const Icon = item.icon
        if (item.emphasized) {
          return (
            <Link key={item.href} href={item.href} className="relative flex flex-1 flex-col items-center gap-1 py-2 text-[10px] uppercase tracking-wide text-primary">
              <span className="-mt-5 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                <Icon className="size-5" />
              </span>
              {item.label}
            </Link>
          )
        }
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] uppercase tracking-wide text-muted-foreground',
              active && 'text-primary',
            )}
          >
            <Icon className="size-5" />
            {item.label === 'Shop' && hydrated && totalCount > 0 && (
              <span className="absolute right-[calc(50%-16px)] top-1 flex size-3.5 items-center justify-center rounded-full bg-accent text-[8px] text-accent-foreground">
                {totalCount}
              </span>
            )}
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
