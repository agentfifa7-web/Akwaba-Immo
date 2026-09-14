'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LogOut, Menu as MenuIcon, X } from 'lucide-react'

import { adminNav } from '@/lib/admin-nav'
import { cn } from '@/lib/utils'

function BrandMark() {
  return (
    <Link href="/admin" className="flex items-center gap-2.5 px-1">
      <span className="flex size-8 shrink-0 items-center justify-center bg-primary text-sm font-bold text-primary-foreground">
        K
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-sm font-semibold tracking-wide text-white">KÔSMÉA</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">Admin</span>
      </span>
    </Link>
  )
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-5 overflow-y-auto px-3 py-6">
      {adminNav.map((group, i) => (
        <div key={group.label ?? `group-${i}`}>
          {group.label ? (
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">{group.label}</p>
          ) : null}
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors',
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'text-white/70 hover:bg-white/10 hover:text-white',
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-obsidian text-obsidian-foreground lg:flex">
        <div className="border-b border-white/10 px-4 py-5">
          <BrandMark />
        </div>
        <NavLinks pathname={pathname} />
        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut className="size-4" />
            Retour au site public
          </Link>
        </div>
      </aside>

      {/* Top bar mobile */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-obsidian px-4 py-3 text-obsidian-foreground lg:hidden">
        <BrandMark />
        <button
          type="button"
          aria-label="Ouvrir le menu"
          onClick={() => setMobileOpen(true)}
          className="flex size-9 items-center justify-center border border-white/15 text-white"
        >
          <MenuIcon className="size-5" />
        </button>
      </div>

      {/* Drawer mobile */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-obsidian text-obsidian-foreground shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-5">
              <BrandMark />
              <button
                type="button"
                aria-label="Fermer le menu"
                onClick={() => setMobileOpen(false)}
                className="flex size-8 items-center justify-center border border-white/15 text-white"
              >
                <X className="size-4" />
              </button>
            </div>
            <NavLinks pathname={pathname} onNavigate={() => setMobileOpen(false)} />
            <div className="border-t border-white/10 p-3">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <LogOut className="size-4" />
                Retour au site public
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {/* Contenu */}
      <div className="lg:pl-64">
        <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  )
}
