'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, LogOut, Package, CalendarClock, ShoppingBag } from 'lucide-react'

import { cn } from '@/lib/utils'

const navItems = [
  { href: '/pro', label: 'Vue d’ensemble', icon: LayoutDashboard },
  { href: '/pro/produits', label: 'Produits', icon: Package },
  { href: '/pro/commandes', label: 'Commandes', icon: ShoppingBag },
  { href: '/pro/reservations', label: 'Réservations', icon: CalendarClock },
]

export default function ProLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-obsidian text-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 lg:px-10">
          <Link href="/pro" className="font-serif text-lg tracking-[0.15em]">KÔSMÉA <span className="text-champagne">PRO</span></Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => {
              const active = item.href === '/pro' ? pathname === '/pro' : pathname.startsWith(item.href)
              return (
                <Link key={item.href} href={item.href} className={cn('flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold uppercase tracking-wider', active ? 'bg-white/15 text-white' : 'text-white/60 hover:text-white')}>
                  <item.icon className="size-3.5" /> {item.label}
                </Link>
              )
            })}
          </nav>
          <Link href="/" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white">
            <LogOut className="size-3.5" /> Site public
          </Link>
        </div>
        <nav className="flex items-center gap-1 overflow-x-auto px-5 pb-3 sm:hidden">
          {navItems.map((item) => {
            const active = item.href === '/pro' ? pathname === '/pro' : pathname.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href} className={cn('shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider', active ? 'bg-white/15 text-white' : 'text-white/60')}>
                {item.label}
              </Link>
            )
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-[1600px] px-5 py-10 lg:px-10">{children}</main>
    </div>
  )
}
